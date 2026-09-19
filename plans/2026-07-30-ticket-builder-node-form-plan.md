# 工单工作流 — 节点表单（Node Form）改造规划文档

> 日期：2026-07-30
> 状态：**待确认**
> 关联：`frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/`
> 参考文档：[FlowGram.ai 节点表单](https://flowgram.ai/guide/form/form.html)
> 补充参考：[FlowGram.ai GitHub 仓库](https://github.com/bytedance/flowgram.ai)
> 本地参考仓库：`/Users/ningjinpeng/Desktop/Git/Github/open/flowgram.ai`
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md) 第 35 行

---

## 1. 概述

### 1.1 现状分析

当前 TicketBuilder 的节点编辑采用 **"属性抽屉 (PropertyDrawer) + 节点静态摘要 (NodeRender)"** 模式：

```text
┌─────────────────────────────────────────┐
│  画布 (Canvas)                           │
│  ┌──────────┐  ┌──────────┐             │
│  │ 审批节点  │  │ 通知节点  │             │
│  │ 仅显示摘要 │  │ 仅显示摘要 │             │
│  └──────────┘  └──────────┘             │
│         ↓ 点击齿轮图标                     │
│  ┌─────────────────────┐                 │
│  │ PropertyDrawer (抽屉) │  ← 在侧边栏编辑  │
│  │ 所有字段编辑都在这里   │                 │
│  └─────────────────────┘                 │
└─────────────────────────────────────────┘
```

**核心问题：**

| 问题 | 说明 |
| --- | --- |
| **编辑与预览分离** | 用户在 PropertyDrawer 中编辑属性，但看不到节点本身的实时变化 |
| **节点摘要信息有限** | `NodeRender.tsx` 中 `renderNodeSummary()` 只展示少量文本，例如"审批人: 张三"，不直观 |
| **未启用 FlowGram.ai 节点引擎** | `registries.ts` 中 `ticketNodeRegistries` 没有配置 `formMeta`（表单渲染/校验/副作用），未启用 `nodeEngine.enable` |
| **数据管理双轨** | 节点数据同时被 PropertyDrawer 手动 `setSchemaAndReload` 和编辑器 `onContentChange` 维护，存在竞态风险 |
| **缺少内联校验** | 节点字段校验完全依赖 PropertyDrawer 中的 Ant Design Form.validateFields()，没有画布级别的校验反馈 |

### 1.2 目标

利用 FlowGram.ai 的 **节点表单 (Node Form)** 引擎，实现：

1. **节点内联显示表单** — 简单字段（如名称、审批人）直接在节点上可读/可编辑
2. **保留 PropertyDrawer 用于复杂配置** — 复杂字段（如条件分支、HTTP 配置项）仍在抽屉中编辑
3. **逐步统一数据管理** — 首期让已迁移字段由 FlowGram.ai 节点引擎维护，复杂字段仍保留现有 schema/PropertyDrawer 路径，验证稳定后再收敛双轨
4. **内联校验与错误提示** — 对已迁移字段利用 `formMeta.validate` 实现节点级数据校验，错误直接显示在节点上
5. **节点摘要升级** — 未选中时显示精简摘要，hover/选中时可切换到表单视图

### 1.3 基于现有代码校核后的约束

结合当前真实实现，规划需要额外遵守以下约束：

| 约束 | 当前代码依据 | 规划含义 |
| --- | --- | --- |
| **节点尺寸固定且偏紧凑** | `NodeRender.tsx` 当前节点宽 `280`、最小高 `88` | 首期不能把整套抽屉表单平铺到节点内部，否则会明显挤压摘要信息与连线可读性 |
| **整张节点卡片当前是拖拽热区** | `WorkflowNodeRenderer` 当前整体 `cursor: 'move'` | 节点表单必须设计“摘要态 / 快速编辑态”或局部编辑区，不能默认整卡常驻输入控件 |
| **脏状态目前显式维护** | `index.tsx` 中 `setSchemaAndReload()` 手动 `setHasUnsavedChanges(true)`，保存后手动清零 | 首期不能假设开启 `nodeEngine` 后脏状态会自动接管，必须保留显式迁移步骤 |
| **画布直接编辑当前不会标脏** | `onContentChange` 目前只写 `latestSchemaRef` 和 `setSchema(nextSchema)`，没有调用 `setHasUnsavedChanges(true)` | Spike 必须先补齐或验证画布变更的脏状态，否则节点表单编辑可能不会提示保存 |
| **历史记录当前只开启基础能力** | `editorProps.history` 目前仅配置 `enable: true` | 若节点表单改值需要进入撤销/重做链路，需校核是否补充 `enableChangeNode: true` |
| **PropertyDrawer 逻辑很重** | 当前包含动作配置、条件分支、HTTP KeyValue、SLA、审批配置等大量 UI | 首期应以“抽屉瘦身”而不是“抽屉清空”为目标 |
| **条件分支不是普通表单字段** | `PropertyDrawer` 中 `addConditionBranch` / `updateConditionBranch` / `removeConditionBranch` 直接改 `schema.nodes` 与 `schema.edges` | 首期不要把 `conditions` 强行迁入 `FieldArray`，否则会同时触碰动态端口和边清理逻辑 |
| **workflow 已有表单渲染工具，但并非节点表单引擎** | `src/utils/formComponentRenderer.tsx` 是 Ant Design 预览渲染工具 | 可复用视觉风格和字段组件映射思路，但不能直接等同于 FlowGram `Field` / `FieldArray` |
| **ChatBuilder 已有较成熟的节点摘要模式** | `ChatBuilder/components/NodeRender.tsx` 已按节点类型做结构化摘要 | TicketBuilder 改造时优先保留摘要优势，再叠加节点表单能力，而不是直接放弃摘要 |
| **当前 FlowGram 依赖版本固定在 1.0.12 系列** | `frontend/apps/workflow/package.json` 中 `@flowgram.ai/free-layout-editor` 等依赖为 `^1.0.12` | 规划中的 `ValidateTrigger`、`DataEvent`、`nodeErrorRender` 等 API 在实施前必须以本仓库实际安装版本为准做类型校验 |
| **项目已安装 FlowGram 表单物料包** | `package.json` 中已列出 `@flowgram.ai/form-materials` 和 `@flowgram.ai/form-antd-materials`（均为 `^1.0.12`） | 首期可以评估直接复用其内置的 Ant Design 字段渲染器，而不是从零手写每个 `Field` 包裹；但同时需要验证这些物料包是否依赖 `@flowgram.ai/fixed-layout-editor` 或仅兼容 free-layout |
| **`setSchemaAndReload` 会强制编辑器重挂载** | `setSchemaAndReload` 内部调用 `setEditorKey((v) => v + 1)`，导致整个 FlowGram 编辑器实例销毁重建 | 节点表单编辑期间不能随意触发 `setSchemaAndReload`，否则文本焦点和表单状态会丢失；阶段 0 需要先确定节点表单自身能否在 `editorKey` 变化后存活 |

### 1.4 发现：已安装但未利用的表单物料包

`frontend/apps/workflow/package.json` 中已声明两个与表单相关的 FlowGram 依赖：

| 包名 | 版本 | 推测用途 | 首期建议 |
| --- | --- | --- | --- |
| `@flowgram.ai/form-materials` | `^1.0.12` | FlowGram 表单物料核心（`Field`、`FieldArray`、`useForm` 等运行时类型与渲染基类） | 阶段 0 先确认 free-layout-editor 是否需要单独安装此包，还是已内聚导出 |
| `@flowgram.ai/form-antd-materials` | `^1.0.12` | 针对 Ant Design 的现成 `Field` 渲染器（Input、Select、Switch 等） | 若可用，审批节点表单字段可以直接用其内置组件，减少大量手写 `Field` 包裹代码；但需要在阶段 0 验证其是否依赖 fixed-layout 上下文 |

若这两个物料包对 free-layout 完全可用，则规划中的 `ApprovalNodeForm` 等组件可以从"手写 Field 包裹"降级为"配置化字段列表 + 物料渲染器"，大幅降低首期工作量。

---

## 2. 核心概念对照

根据 [FlowGram.ai 节点表单文档](https://flowgram.ai/guide/form/form.html)：

| FlowGram.ai 概念 | 在 TicketBuilder 中对应 |
| --- | --- |
| `nodeEngine.enable` | 在 `editorProps` 中开启节点引擎（当前未开启） |
| `formMeta` | 配置在 `ticketNodeRegistries` 每项的 `formMeta` 上（当前未配置） |
| `formMeta.render` | 在选中/快速编辑态替代当前 `NodeRender` 中部分摘要内容，渲染可交互的表单 |
| `formMeta.validate` | 先替代已迁移字段的 Ant Design Form 校验规则，复杂字段仍保留抽屉校验 |
| `formMeta.effect` | 可用于字段联动，如"审批人类型"切换时清空"审批人"列表 |
| `Field` / `FieldArray` | FlowGram.ai 内置表单组件，替代 Ant Design `Form.Item` |
| `useNodeRender().form` | 在 `NodeRender` 中调用 `form?.render()` 替换当前的静态渲染 |
| `useWatch` / `useForm` | 在组件内跨字段监听数据变化 |

### 2.1 补充源码参考锚点

除官网文档外，本次规划额外参考了 FlowGram.ai 官方 GitHub 仓库以及本地克隆仓库中的真实源码实现，重点锚点如下：

| 来源 | 文件 | 规划结论 |
| --- | --- | --- |
| 官方 / 本地仓库 | `apps/demo-vite/src/hooks/use-editor-props.tsx` | free-layout demo 已真实演示 `nodeEngine.enable`、`getNodeDefaultRegistry().formMeta.render`、`useNodeRender().form` 的协作方式，和 TicketBuilder 的技术栈最接近 |
| 官方 / 本地仓库 | `packages/client/editor/src/preset/editor-props.ts` | `nodeEngine` 是编辑器级一等配置，且支持 `createDefaultFormMeta`，后续可评估全局默认表单元数据策略 |
| 官方 / 本地仓库 | `packages/canvas-engine/free-layout-core/src/hooks/use-node-render.tsx` | free-layout 内部已处理输入控件与拖拽冲突：`INPUT`、`TEXTAREA`、`.flow-canvas-not-draggable` 不参与拖拽，这对 TicketBuilder 的快速编辑区设计有直接参考价值 |
| 官方 / 本地仓库 | `apps/demo-fixed-layout-simple/src/components/base-node.tsx` | `form?.render()` 的节点渲染方式在官方 demo 中已被实际使用，且拖拽由单独的 `startDrag()` 管理，印证“表单与拖拽并存”是可行的 |
| 官方 / 本地仓库 | `apps/` 下的 `demo-vite`、`demo-free-layout*`、`demo-node-form` | 说明 FlowGram 官方已将“节点表单”作为核心能力单独展示，适合我们分阶段对照验证 |

### 2.2 对 TicketBuilder 最有价值的源码结论

1. TicketBuilder 当前使用的是 `@flowgram.ai/free-layout-editor`，因此应优先对照 `apps/demo-vite`、`demo-free-layout*` 这类 free-layout 示例，而不是以 fixed-layout 示例作为主要实现模板。
2. 官方 free-layout demo 的节点表单方案不是“整卡直接大表单”，而是 `WorkflowNodeRenderer + form?.render()` 的轻量嵌入，这与本规划中的“摘要态 + 快速编辑态”方向一致。
3. 官方 demo 在启用节点表单时还开启了 `history.enableChangeNode: true` 用于监听 Node Engine 数据变更；因此 TicketBuilder 若要支持节点表单改值后的撤销/重做，必须把这项校核纳入实施步骤。
4. free-layout 内部 `useNodeRender` 已显式规避了 `INPUT` / `TEXTAREA` 的拖拽冲突，这意味着首期可以优先验证“选中节点后显示少量输入控件”方案，而不是默认判定为不可行。
5. TicketBuilder 当前实际编辑字段以 `assigneeNames`、`channels`、`method`、`url` 等展示友好字段为主；`assigneeUids` 虽在类型中存在，但当前抽屉并未提供真实成员选择器，所以首期不应把 UID 选择器作为必交付项。

---

## 3. 改造策略

### 3.1 总体策略：渐进式迁移

不一次性替换整个 PropertyDrawer，而是**分阶段**将简单字段迁入节点内联表单，复杂配置保留在抽屉中：

```text
第一阶段（本次规划）：
  ┌─ 节点内联表单 ─────────────────────┐
  │  • 节点名称 / 少量关键字段（可编辑）   │
  │  • 审批人类型 / 审批人名称（快速编辑） │
  │  • SLA 状态摘要（暂不作为主编辑入口）  │
  │  • 通知渠道（多选标签）               │
  │  [更多设置 → 打开 PropertyDrawer]    │
  └────────────────────────────────────┘

第二阶段（后续）：
  ┌─ 节点内联表单（扩展）─────────────────┐
  │  • 条件分支编辑（需单独处理动态端口）   │
  │  • HTTP 配置项（内联 KeyValue 列表）   │
  │  PropertyDrawer 可逐步废弃            │
  └────────────────────────────────────┘
```

### 3.2 关键架构变更

```text
Before（当前）:
  NodeRender.tsx
    ├── 静态渲染：renderNodeSummary() → 只读摘要文本
    └── 工具栏按钮 → 打开 PropertyDrawer → 独立 Form 表单
  registries.ts
    └── 只有 meta.defaultPorts，无 formMeta

After（改造后）:
  NodeRender.tsx
    ├── 保留摘要视图作为默认态
    ├── 选中 / 显式进入快速编辑态时调用 form?.render()
    ├── 内联表单：Field(name="title"), Field(name="assigneeType"), Field(name="assigneeNames"), ...
    └── [更多设置] 按钮 → 打开 PropertyDrawer（仅复杂字段）
  registries.ts
    └── 每项增加 formMeta: { render, validate, validateTrigger, effect }
```

---

## 4. 详细设计

### 4.1 文件清单

| 文件 | 改动内容 | 复杂度 |
| --- | --- | --- |
| `config/registries.ts` | 为每种节点添加 `formMeta` 配置 | ⭐⭐⭐ |
| `components/NodeRender.tsx` | 从静态渲染切换为 `form?.render()` | ⭐⭐⭐ |
| `components/PropertyDrawer.tsx` | 精简为仅包含复杂字段；改为接收节点数据只读引用 | ⭐⭐ |
| `index.tsx` | `editorProps` 中开启 `nodeEngine.enable`；调整 `onContentChange` 逻辑 | ⭐⭐ |
| `config/nodes/*` | 各节点工厂函数确保 `data` 字段符合表单路径约定，例如 `approval.ts`、`condition.ts`、`http.ts` | ⭐ |
| `utils/formComponentRenderer.tsx` | 仅校对复用边界，不作为首期强依赖改造目标 | ⭐ |

### 4.1.1 当前实现事实清单

本规划后续实施需要以以下当前事实作为边界，避免把方案写得比代码基础更靠前：

| 事实 | 影响 |
| --- | --- |
| `TicketBuilder/index.tsx` 的 `onContentChange` 当前不会设置 `hasUnsavedChanges` | 阶段 0 必须验证节点表单改值后保存提示是否出现，必要时先补 `setHasUnsavedChanges(true)` |
| `handlePropertySave` 通过 `{ ...n.data, ...values }` 合并抽屉表单值 | 首期节点表单和抽屉可以共存，但同一字段不能两边同时作为主编辑入口 |
| `PropertyDrawer` 当前用 `currentNode.data` 作为表单初始值，空值回退为空对象 | 若节点表单已改值，抽屉打开时必须从最新 `schema/currentNode` 读取，不能使用过期快照 |
| `condition` 分支编辑直接维护 `schema.nodes` 和 `schema.edges` | 条件分支字段迁移应单独立项，先不并入普通节点表单迁移 |
| `normalizeTicketWorkflowSchema` 会规范化旧 `assigneeType`、通知 `recipientType` 和条件分支 `outgoingEdgeId` | 节点表单写入值必须保持在规范化函数可识别的字段集合内 |
| 节点默认数据来自 `config/nodes/approval.ts` 等工厂文件 | 新增表单字段前必须同步检查默认值，避免 `Field` 初始值为 `undefined` 导致控件受控状态抖动 |

### 4.1.2 复用边界说明

- `src/utils/formComponentRenderer.tsx` 适合复用的部分：字段类型命名、占位符习惯、深色主题样式方向。
- `src/utils/formComponentRenderer.tsx` 不适合直接复用的部分：它返回的是独立 Ant Design 组件树，并未接入 FlowGram 节点表单的 `Field`、`FieldArray`、`useForm`、`useWatch` 数据模型。
- `ChatBuilder/components/NodeRender.tsx` 适合复用的部分：节点摘要信息分层展示方式，例如索引标签、摘要块、结构化次级信息。
- `flowgram.ai/apps/demo-vite/src/hooks/use-editor-props.tsx` 适合复用的部分：`getNodeDefaultRegistry`、`formMeta.render`、`useNodeRender().form` 的最小接入模式。
- `flowgram.ai/packages/canvas-engine/free-layout-core/src/hooks/use-node-render.tsx` 适合借鉴的部分：输入控件与拖拽冲突的控制思路，例如 `.flow-canvas-not-draggable`。
- 结论：首期优先复用“展示模式”和“字段词汇”，不强求复用实现代码。

### 4.2 节点注册表改造 (`registries.ts`)

为每种节点类型增加 `formMeta` 配置。以审批节点为例：

```typescript
// config/registries.ts (改造后示意)
import { ValidateTrigger, DataEvent } from '@flowgram.ai/free-layout-editor';

export const ticketNodeRegistries: WorkflowNodeRegistry[] = [
  {
    type: 'start',
    meta: { isStart: true, deleteDisable: true, copyDisable: true, defaultPorts: getDefaultPorts('start') },
    // start 节点无表单
  },
  {
    type: 'approval',
    meta: { defaultPorts: getDefaultPorts('approval') },
    formMeta: {
      validateTrigger: ValidateTrigger.onChange,
      validate: {
        title: ({ value }) => (value ? undefined : '节点名称不能为空'),
        'assigneeNames': ({ value, formValues }) => {
          if (formValues.assigneeType === 'user' && (!value || value.length === 0)) {
            return '请选择至少一个审批人';
          }
          return undefined;
        },
      },
      render: () => <ApprovalNodeForm />,
      effect: {
        'assigneeType': [{
          event: DataEvent.onValueChange,
          effect: ({ value, form }) => {
            // 切换审批人类型时清空旧选择，避免 user/department 数据串用
            // 注意：assigneeUids 的清理是兜底措施，当前抽屉实际未提供 UID 选择器
            if (value === 'reporter') {
              form.setValueIn('assigneeNames', []);
              // 如果节点数据中仍存在 assigneeUids 字段，一并清理
              if (formValues.assigneeUids !== undefined) {
                form.setValueIn('assigneeUids', []);
              }
            }
          },
        }],
      },
    },
  },
  // ... 其他节点类似
];
```

### 4.3 节点表单组件设计

#### 4.3.1 新建内联表单组件目录

```text
components/
  NodeForms/
    ApprovalNodeForm.tsx    # 审批/会签/或签 共用表单
    NotificationNodeForm.tsx # 通知节点表单
    ConditionNodeForm.tsx    # 条件分支表单
    HttpNodeForm.tsx         # HTTP 请求表单
    SubProcessNodeForm.tsx   # 子流程表单
    ParallelJoinEndForm.tsx  # 并行/合并/结束（仅名称+描述）
    shared/
      SlaFields.tsx          # SLA 字段复用组件
      AssigneeSelect.tsx     # 审批人选择器复用组件
      NodeTitleField.tsx     # 节点名称 + 描述通用字段
```

  > 说明：考虑到当前 `components/` 已承载 `NodeRender` 和 `PropertyDrawer`，首期更建议落在 `components/NodeForms/`，让 `config/registries.ts` 只负责注册引用，避免 UI 组件和节点配置混放。

#### 4.3.2 审批节点内联表单示例

```typescript
// components/NodeForms/ApprovalNodeForm.tsx (示例)
import { ClockCircleOutlined } from '@ant-design/icons';
import { Field, useWatch } from '@flowgram.ai/free-layout-editor';
import { Select, Input, Tag, Typography } from 'antd';

const ApprovalNodeForm: React.FC = () => {
  const assigneeType = useWatch('assigneeType');

  return (
    <div className="ticket-node-form">
      {/* 节点名称 — 可内联编辑 */}
      <Field name="title">
        {({ field, fieldState }) => (
          <div>
            <Typography.Text strong>
              <Input
                {...field}
                variant="borderless"
                placeholder="审批"
                status={fieldState?.invalid ? 'error' : undefined}
              />
            </Typography.Text>
            {fieldState?.invalid && <div style={{ color: 'red', fontSize: 11 }}>{fieldState.errors?.[0]}</div>}
          </div>
        )}
      </Field>

      {/* 审批人来源类型 */}
      <Field name="assigneeType">
        {({ field }) => (
          <Select {...field} size="small" style={{ width: '100%' }} options={[
            { label: '指定用户', value: 'user' },
            { label: '指定部门', value: 'department' },
            { label: '发起人', value: 'reporter' },
          ]} />
        )}
      </Field>

      {/* 审批人选择 — 根据 assigneeType 条件渲染 */}
      {assigneeType === 'user' && (
        <Field name="assigneeNames">
          {({ field, fieldState }) => (
            <Select {...field} mode="tags" size="small" placeholder="输入审批人名称" />
          )}
        </Field>
      )}

      {/* SLA 首期建议只做摘要展示，真正编辑仍保留在 PropertyDrawer */}
      <Tag icon={<ClockCircleOutlined />} color="warning">SLA</Tag>

      {/* 展开更多设置 → 打开 PropertyDrawer */}
      <a onClick={() => {/* 触发打开 PropertyDrawer */}}>更多设置...</a>
    </div>
  );
};
```

上面的代码仅表示 FlowGram 节点表单的组织方式，不代表首期就要把所有字段真正以内联输入框形式常驻显示。结合当前节点尺寸与拖拽方式，首期更推荐：

- 默认显示摘要态
- 选中节点后显示 1 到 3 个“快速编辑字段”：优先 `title`、`assigneeType`、`assigneeNames`，SLA 首期可先摘要展示不内联编辑
- 复杂字段仍通过“更多设置”进入 PropertyDrawer

### 4.4 NodeRender 改造

```typescript
// components/NodeRender.tsx (改造核心)
const TicketNodeRender = (props: WorkflowNodeProps) => {
  const { selected, form } = useNodeRender();
  // ...

  return (
    <div onMouseEnter={...} onMouseLeave={...}>
      {/* 工具栏按钮（不变） */}
      {/* ... */}

      <WorkflowNodeRenderer node={props.node} ...>
        {selected && form ? form.render() : (
          // 默认仍保留结构化摘要，避免节点变成大表单卡片
          <>
            <Typography.Text strong>{...}</Typography.Text>
            <Typography.Text type="secondary">{renderNodeSummary()}</Typography.Text>
          </>
        )}
      </WorkflowNodeRenderer>
    </div>
  );
};
```

### 4.5 PropertyDrawer 精简

PropertyDrawer 不再作为所有字段的编辑入口，而是作为 **"高级设置面板"**：

- **首期移除**：仅移除已经稳定迁入节点快速编辑区的字段，避免一次性搬空
- **保留**：条件分支管理、HTTP KeyValue 列表、动作配置（`availableActions`）、超时行为、加签/转办开关等复杂字段
- **数据同步**：首期允许抽屉仍通过现有 `onSchemaChange` / `onSave` 维持复杂字段更新；待节点表单稳定后，再收敛到统一写入路径
- **"更多设置..."入口**：节点内联表单中的"更多设置"链接需要能打开 PropertyDrawer 并定位到当前节点。建议通过 `TicketBuilderContext.setSelectedNodeId(nodeId)` 触发，因为 NodeRender 中齿轮按钮也是用同样的方式打开抽屉

### 4.5.1 首期不建议立即做的重构

以下动作应放到第二阶段或验证通过后再做：

- 立即删除 `handlePropertySave`
- 立即删除 `setSchemaAndReload`
- 立即要求 PropertyDrawer 全量改用 `form.setValueIn()`

原因：当前 TicketBuilder 的保存、导入、拖放新增节点、条件分支修改都依赖现有 `schema` 流程，首期更稳妥的做法是先证明节点表单可用，再收缩旧路径。

### 4.5.2 关键兼容性约束：`editorKey` 与编辑器重挂载

当前 `setSchemaAndReload` 的实现中有 `setEditorKey((v) => v + 1)`，这会强制 FlowGram 编辑器实例完全销毁重建。该行为在节点表单场景下有严重的副作用：

- 节点表单组件被卸载再重新挂载，选中状态、文本焦点、下拉框展开状态全部丢失
- 即使 `nodeEngine` 的数据变更不触发 `setSchemaAndReload`，其他操作（如新增节点、删除节点、条件分支修改）仍会经过 `setSchemaAndReload`，间接导致节点表单反复挂载

**阶段 0 必须先验证**：在当前 `editorKey` 机制下，`nodeEngine` 启用的审批节点是否能在编辑器重挂载后保持表单数据一致，以及是否有可行的替代方案（如把 `setEditorKey` 拆分为数据更新和视图更新两条路径）。

### 4.6 编辑器配置调整 (`index.tsx`)

```typescript
// 在 editorProps 中开启节点引擎
const editorProps = useMemo<FreeLayoutProps>(() => ({
  // ... 现有配置
  nodeEngine: {
    enable: true,  // ← 开启节点引擎
    materials: {
      // 可选：节点错误渲染
      nodeErrorRender: (props) => <div style={{ color: 'red' }}>{props.errors.join(', ')}</div>,
    },
  },
  history: {
    enable: true,
    enableChangeNode: true,
  },
  onContentChange: (ctx) => {
    // 节点引擎开启后，数据变更仍需要显式同步回本地 schema/ref
    const nextSchema = normalizeTicketWorkflowSchema(ctx.document.toJSON() as WorkflowJSON);
    latestSchemaRef.current = nextSchema;
    setSchema(nextSchema);
    setHasUnsavedChanges(true);
  },
}), [...]);
```

> 补充说明：`enableChangeNode: true` 来自 FlowGram 官方 free-layout demo 的真实配置，规划阶段应先验证当前 TicketBuilder 所用版本是否支持该选项，以及是否会影响现有历史栈行为。

### 4.6.1 节点表单数据写入路径说明

开启 `nodeEngine` 后，节点表单的数据流向如下：

```text
用户在节点上编辑 Field(name="title")
  → FlowGram 节点引擎内部 store 更新 node.data.title
  → (若 history.enableChangeNode=true) 推入历史栈
  → 触发 editorProps.onContentChange(ctx)
  → normalizeTicketWorkflowSchema(ctx.document.toJSON()) → 更新 latestSchemaRef / schema
  → (新增) setHasUnsavedChanges(true)
```

与当前 PropertyDrawer → `handlePropertySave` → `setSchemaAndReload` 路径的关键区别：

| 对比项 | 节点表单路径 | PropertyDrawer 路径 |
| --- | --- | --- |
| 写入入口 | FlowGram 内部 store，无需显式调用 | `handlePropertySave` 手动合并 `data` |
| schema 同步 | `onContentChange` 回调自动触发 | `setSchemaAndReload` 显式调用 |
| 编辑器重挂载 | 不会触发（除非其他操作触发 `setSchemaAndReload`） | 每次都触发 `setEditorKey` |
| 脏状态 | 需要在 `onContentChange` 中补齐 | `setSchemaAndReload` 中已设置 |

首期两条路径会同时存在：已迁移字段走节点表单路径，复杂字段仍走 PropertyDrawer 路径。阶段 3 再评估统一。

### 4.7 建议增加阶段 0：技术验证 Spike

在正式全面改造前，先做一个最小可逆验证，范围只覆盖 `approval` 节点：

| 验证项 | 成功标准 |
| --- | --- |
| `nodeEngine.enable` 可正常开启 | 编辑器可正常渲染、拖拽、保存，不出现白屏或节点丢失 |
| `useNodeRender().form` 可用 | 选中审批节点后可显示简单 `Field(name="title")` |
| 输入控件不破坏拖拽 | 节点仍可拖动，且输入框可正常聚焦编辑 |
| `onContentChange` 与脏状态链路未断 | 修改节点表单后 `hasUnsavedChanges` 正常变为 `true` |
| 历史记录链路未断 | 节点表单修改后可正常撤销 / 重做，或至少明确当前版本为何不能支持 |
| 抽屉读取最新值 | 节点表单修改 `title` 后打开 PropertyDrawer，抽屉显示最新值而不是旧快照 |
| 保存/刷新一致 | 保存后重新加载流程，节点表单字段值不丢失 |

### 4.7.1 阶段 0 额外校验：editorKey 重挂载兼容

| 验证项 | 成功标准 |
| --- | --- |
| 新增节点后审批节点表单不丢失 | 在已有的审批节点上编辑 `title`，然后在它后面新增一个通知节点；审批节点应保持编辑内容，不出现焦点丢失导致的数据回退 |
| 删除其他节点后表单不丢失 | 在审批节点上编辑 `title`，然后删除图中另一个不相关节点；审批节点表单应保持 |
| 条件分支修改后表单不丢失 | 如果 Spike 阶段条件分支仍在抽屉中编辑，验证修改分支标签后审批节点表单是否存活 |

只有阶段 0 通过，才进入后续批量迁移。

### 4.8 建议验证命令

阶段 0 和阶段 1 每次改完后，至少执行以下校验之一：

| 校验 | 命令 | 目的 |
| --- | --- | --- |
| 类型校验 | `cd frontend && pnpm exec tsc --noEmit -p apps/workflow/tsconfig.json` | 验证 `nodeEngine`、`formMeta`、`ValidateTrigger`、`DataEvent`、`history.enableChangeNode` 等 API 在当前依赖版本下可用 |
| 构建校验 | `cd frontend && pnpm --filter workflow build` | 验证 Vite/tsc 构建链路和实际打包导入均可通过 |
| 交互校验 | `cd frontend && pnpm --filter workflow dev` 后打开 TicketBuilder | 人工确认节点输入、拖拽、保存提示、抽屉同步、撤销/重做 |

如果 whole-app 类型校验因现有无关 TypeScript 问题失败，至少保留错误摘要，并用 VS Code Problems 或文件级诊断确认本次触碰文件没有新增错误。

---

## 5. 各节点类型表单字段规划

| 节点类型 | 内联表单字段 | 保留在 PropertyDrawer 的字段 |
| --- | --- | --- |
| **start** | 无（只读节点名称） | — |
| **approval** (审批) | 名称、审批人类型、审批人名称（tags）；SLA 先摘要展示 | 描述、分配策略、超时行为、SLA 编辑、转办/加签开关、意见必填、动作配置 |
| **countersign** (会签) | 名称、参与人名称（tags）；完成条件先只摘要展示 | 描述、完成条件编辑、顺序会签、分配策略、SLA 时长、转办/加签开关、动作配置 |
| **orSign** (或签) | 名称、参与人名称（tags） | 描述、分配策略、SLA 时长、动作配置 |
| **notification** (通知) | 名称、通知渠道（多选 Tags） | 描述、通知模板、接收人类型、动作配置 |
| **condition** (条件) | 名称；分支只摘要展示 | 分支标签、分支表达式编辑、添加/删除分支、动态端口/边维护 |
| **parallel** (并行) | 名称 | 描述 |
| **join** (合并) | 名称 | 描述 |
| **http** (HTTP) | 名称、请求方法、URL 摘要；URL 内联编辑放第二批 | 请求体、Headers、Query Params 列表编辑 |
| **subProcess** (子流程) | 名称、子流程名称摘要 | 描述、子流程 UID/选择器 |
| **end** (结束) | 名称 | 描述 |

---

## 6. 实施步骤

### 阶段 0：技术验证 Spike（预计 ~0.5d）

| 步骤 | 内容 |
| --- | --- |
| 0.1 | 在 `approval` 节点上最小接入 `nodeEngine.enable` + `formMeta.render` |
| 0.2 | 仅渲染 `title` 一个字段，验证输入、拖拽、保存、重载 |
| 0.3 | 验证 `hasUnsavedChanges`、`onContentChange`、导出/导入链路未断；当前 `onContentChange` 若不标脏，需要先补齐 |
| 0.4 | 验证 `history.enableChangeNode` 在当前 `@flowgram.ai/free-layout-editor@^1.0.12` 下是否通过类型检查并保持撤销/重做可用 |
| 0.5 | 打开 PropertyDrawer 校验抽屉是否读取节点表单写入后的最新值 |
| 0.6 | 根据结果决定首期采用“选中态快速编辑”还是“内联常驻编辑” |

### 阶段 1：基础架构（预计 ~1d）

| 步骤 | 内容 |
| --- | --- |
| 1.1 | 固化 `approval` 节点试点结果，建立 `NodeTitleField`、`QuickFieldSection` 等基础组件 |
| 1.2 | 修改 `NodeRender.tsx`，形成“摘要态 + 快速编辑态 + 更多设置入口”框架 |
| 1.3 | 为审批/会签/或签准备可复用的节点表单骨架，字段先限定在 `title`、`assigneeType`、`assigneeNames` |
| 1.4 | 检查 `config/nodes/*` 默认数据，补齐节点表单字段默认值 |
| 1.5 | 补齐首批校验反馈与错误展示样式 |

### 阶段 2：内联表单扩展（预计 ~1.5d）

| 步骤 | 内容 |
| --- | --- |
| 2.1 | 为审批/会签/或签节点添加 `formMeta.validate` 校验规则 |
| 2.2 | 为审批节点添加 `formMeta.effect`（审批人类型切换联动） |
| 2.3 | 实现通知节点 `NotificationNodeForm` |
| 2.4 | 实现 HTTP 节点 `HttpNodeForm`，首批只做 `method` 和 `url`，Headers / Query Params 保留在抽屉 |
| 2.5 | 评估条件节点是否只做标题级快速编辑；条件分支列表优先保留在抽屉 |
| 2.6 | 实现子流程节点 `SubProcessNodeForm` |
| 2.7 | 并行/合并/结束节点通用简单表单 |

### 阶段 3：PropertyDrawer 精简与衔接（预计 ~1d）

| 步骤 | 内容 |
| --- | --- |
| 3.1 | 从 PropertyDrawer 移除已稳定迁入快速编辑区的字段 |
| 3.2 | 仅对简单字段尝试统一写入路径；复杂字段先保持旧逻辑，避免一次性重构过大 |
| 3.3 | 节点上"更多设置..."链接对接 PropertyDrawer 打开 |
| 3.4 | 在保存/导入/新增节点链路稳定后，再评估是否移除 `handlePropertySave` 双轨逻辑 |

### 阶段 4：验收与清理（预计 ~0.5d）

| 步骤 | 内容 |
| --- | --- |
| 4.1 | 全节点类型回归测试（创建/编辑/删除/连线） |
| 4.2 | 保存/加载流程，确认数据一致性 |
| 4.3 | 移除废弃代码和冗余类型定义 |
| 4.4 | 更新 locale 文案（`i18n.ts` 各语言版本） |

---

## 7. 风险与注意事项

| 风险 | 缓解措施 |
| --- | --- |
| FlowGram.ai `nodeEngine.enable` 与现有 `onContentChange` 事件冲突 | 开启后先验证 `onContentChange` 回调仍正常触发 |
| 节点输入控件与拖拽热区冲突 | 默认使用“摘要态 + 选中态快速编辑”，必要时保留专门拖拽区域 |
| 节点尺寸不够容纳表单 | 首期只放 1 到 3 个快速字段，复杂项继续留在抽屉 |
| `@flowgram.ai/free-layout-editor` 当前版本导出能力与文档示例不完全一致 | 阶段 0 先做最小技术 Spike 验证 API 可用性 |
| `formMeta.render` 中无法直接使用 `useOrgStore` 等外部 store | 通过 Context 或 props 传递到表单组件，或使用 FlowGram.ai IOC 注入 |
| 审批人远程选择器在节点内联表单中的性能 | 使用 `Select` 的 `showSearch` + `onSearch` 懒加载，避免一次性加载大量成员 |
| PropertyDrawer 与节点表单的数据同步延迟 | 首期不强行统一所有写入路径，按字段类型逐步收敛 |
| 现有 `schema` → `setSchemaAndReload` 调用链需要调整 | 采用渐进式替换，每种节点改造后单独验证 |

---

## 8. 验收标准

首期规划完成后的实现验收，建议至少满足以下标准：

1. `approval`、`notification` 两类节点支持节点内快速编辑，且不破坏拖拽。
2. 修改节点内字段后，保存按钮可正确进入未保存状态。
3. 保存后刷新页面，节点内字段与 `flowgramSchema` 持久化结果一致。
4. 复杂字段仍可通过 PropertyDrawer 编辑，且不会与节点内快速编辑相互覆盖。
5. 节点未选中时，摘要信息不比当前版本更差，仍能快速读懂流程。

---

## 9. 不纳入本期的内容

- 不修改后端 Java 接口或数据库结构
- 不改变 BPMN XML 导出逻辑
- 不改变 AI 对话生成流程图的功能
- 不改变 IVRBuilder / ChatBuilder（本次仅改动 TicketBuilder）
- 不引入新的 npm 依赖（仅使用已有的 `@flowgram.ai/free-layout-editor` 内置能力）
