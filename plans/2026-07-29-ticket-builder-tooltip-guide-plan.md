# 工单工作流节点 & 属性面板 — 新手引导 Tooltip 规划文档

> 日期：2026-07-29
> 状态：**已实施（首期）**
> 最后校核：2026-07-29
> 关联：`frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/`

---

## 1. 概述

当前 TicketBuilder 的节点面板（`PaletteSider`）和属性抽屉（`PropertyDrawer`）缺乏对工作流小白的上手指引：

- **PaletteSider**：列出了 10 种可拖拽节点，但每种节点的含义、适用场景没有额外说明。
- **PropertyDrawer**：每个字段只显示了 label，没有解释该字段的用途和填写方式。

本次改进在以上两处增加 `?` 图标 + Tooltip 悬浮提示，同时为 `TICKET_PALETTE_ITEMS` 配置增加详细的 JSDoc 注释，帮助新手快速理解每个节点和每个字段。

此次规划已基于当前 `workflow` 应用的真实结构进行校对，确认：

- `workflow` 应用使用独立的 locale 文件：`src/locales/zh-CN/i18n.ts`、`src/locales/en-US/i18n.ts`、`src/locales/zh-TW/i18n.ts`
- 当前页面已存在可复用的帮助提示样式：`InfoCircleOutlined` + `Tooltip`，例如 `TicketBuilderHeader` 和 `ProcessBuilderHeader`
- `PropertyDrawer` 当前字段较多，若直接在每个 `Form.Item` 内联 tooltip 文案，会让组件继续膨胀，因此需要在规划中明确复用策略

---

## 2. 改动范围

### 2.1 文件清单

| 文件 | 改动内容 |
| ------ | --------- |
| `config/palette.tsx` | 为 `TICKET_PALETTE_ITEMS` 每一项添加 `tooltip` 字段（详细中文说明）；增加 JSDoc 注释 |
| `types.ts` | `TicketPaletteItem` 类型增加 `tooltip?: string` 字段 |
| `components/PaletteSider.tsx` | 每个节点卡片右侧增加 `QuestionCircleOutlined` 图标，hover 显示 Tooltip（使用 `tooltip` 字段内容） |
| `components/PropertyDrawer.tsx` | 每个 `Form.Item` 的 `label` 改为带 `?` 图标的复合 label，hover 显示该字段的用途说明 |

### 2.1.1 可能追加但不作为首批必改项的文件

| 文件 | 用途 |
| ------ | ------ |
| `src/locales/zh-CN/i18n.ts` | 已补充属性面板与节点面板 Tooltip 中文文案 |
| `src/locales/en-US/i18n.ts` | 已补充对应英文 Tooltip 文案 |
| `src/locales/zh-TW/i18n.ts` | 已补充对应繁体 Tooltip 文案 |

### 2.2 不纳入范围

- 不增加后端接口
- 不改动节点拖拽、属性保存等核心逻辑

### 2.3 校对后的实现边界

本次改动以“增强说明能力”为目标，不顺带处理以下问题：

- `PaletteSider.tsx` 中与 Tooltip 无关的排版或交互重构
- 表单字段本身的数据结构调整
- 审批人、角色、部门等字段从手输升级为远程选择器
- 条件表达式编辑器从纯文本/JSON 输入升级为可视化规则编辑器

### 2.4 真实字段覆盖范围

基于当前 `PropertyDrawer.tsx`，首期需要覆盖的不只是 `Form.Item label`，还包括若干 `Typography.Text` 分组标题、`Form.List` 区域标题和分支输入框占位字段。

| 节点类型 | 当前 UI 字段 | 首期 Tooltip 覆盖建议 |
| ------ | ------ | ------ |
| 审批 / 或签 | 节点名称、描述、审批人类型、审批人、角色、分配策略、超时时间、超时行为、SLA 类型、SLA 时长、超时不中断任务、允许转办、允许加签、意见必填 | 全部覆盖（高价值：审批人类型、分配策略、超时、SLA；低价值：名称/描述用短文案） |
| 会签 | 节点名称、描述、审批人类型、参与人、角色、分配策略、完成条件、顺序会签、超时时间、SLA 字段 | 全部覆盖（高价值：完成条件、顺序会签；参与人文案应区别于单人审批） |
| 通知 | 节点名称、描述、通知渠道、通知模板、接收人类型 | 全部覆盖（高价值：通知模板、通知渠道） |
| 条件分支 | 节点名称、描述、分支条件标题、分支标签输入、条件表达式输入、添加分支按钮 | 覆盖分支标题和两个分支输入框（高价值：条件表达式）；按钮用 Tooltip title 说明即可 |
| HTTP 请求 | 节点名称、描述、请求方法、请求 URL、请求体、Headers、Query Params、Header/Query 的 Key/Value | 覆盖主字段和两个分组标题（高价值：请求方法、请求 URL、请求体）；Key/Value 用更明确的 placeholder 说明 |
| 子流程 | 节点名称、描述、选择流程 | 全部覆盖（高价值：选择流程） |
| 并行 / 合并 / 结束 | 节点名称、描述 | 通用短说明，不需要长文案（全部低价值） |

这张表是后续实现验收的主清单，避免只改了部分 `Form.Item` 而遗漏 `Typography.Text` 和 `Form.List` 区域。

---

## 3. 详细设计

### 3.1 `TicketPaletteItem` 类型扩展

```typescript
// types.ts
export type TicketPaletteItem = {
  type: Exclude<TicketNodeType, 'start'>;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  background: string;
  /** 新手引导悬浮提示（详细说明节点用途和场景） */
  tooltip?: string;
};
```

### 3.2 节点 Tooltip 文案

每个 `TICKET_PALETTE_ITEMS` 条目新增 `tooltip` 字段，内容比 `description` 更详尽，面向零基础用户：

| 节点 | tooltip |
| ------ | --------- |
| **审批** | 单人审批节点。拖动到画布后，可在属性面板中指定审批人（用户/角色/部门/发起人/直属上级）。审批人可以选择同意或拒绝，支持设置超时时间、转办、加签等功能。适用于请假、报销等需要上级确认的场景。 |
| **会签** | 多人审批节点，需要多人参与审批。可设置"全部同意才通过"或"按比例/按人数通过"。支持并行会签（多人同时审批）和顺序会签（按顺序依次审批）。适用于合同审批、多部门联审等场景。 |
| **或签** | 多人审批节点，任意一人审批即可通过。与"会签"的区别是：或签只需要一个人同意，会签需要多人同意。适用于只需要任一负责人确认的快速审批场景。 |
| **通知** | 消息通知节点，不涉及审批。可通过消息/邮件/短信等渠道通知指定人员。适用于流程中需要告知相关人员进度的场景，如"工单已创建，请及时处理"。 |
| **条件分支** | 根据条件表达式判断进入哪个分支。每个分支可以配置不同的判断条件，满足哪个条件就走哪个分支。适用于需要根据业务数据（如金额大小、部门归属）走不同流程的场景。 |
| **并行分支** | 同时触发多个下游分支并行执行。所有分支会同时开始，互不等待。适用于多个独立任务可以同时进行的场景，如同时通知多个部门处理。 |
| **合并** | 等待所有上游分支完成后再继续。通常与"并行分支"配对使用，确保所有并行任务都完成后才进入下一个节点。 |
| **HTTP 请求** | 调用外部 API 接口。支持 GET/POST/PUT/PATCH/DELETE 方法，可自定义 Headers 和 Query 参数。适用于需要自动调用第三方系统（如 CRM、ERP）的场景。 |
| **子流程** | 引用并执行另一个已发布的工作流。可以将复杂的流程拆分为多个子流程，实现流程复用。适用于大型流程需要模块化管理的场景。 |
| **结束** | 流程结束节点。流程到达此节点后即告完成。通常放在流程的最后。 |

### 3.3 PaletteSider 改造

在每个拖拽卡片的标题区域右侧增加一个 `QuestionCircleOutlined` 图标：

```tsx
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

// 在节点标题行中：
<div style={{ fontWeight: 600, fontSize: 13, color: isDarkTheme ? '#fff' : '#1f2937', display: 'flex', alignItems: 'center', gap: 6 }}>
  <span>{nodeTitle}</span>
  <Tooltip title={item.tooltip || item.description}>
    <QuestionCircleOutlined style={{ color: isDarkTheme ? '#666' : '#bfbfbf', fontSize: 12, cursor: 'help' }} />
  </Tooltip>
</div>
```

- 图标颜色使用 `#bfbfbf`（浅色模式）/ `#666`（深色模式），不干扰标题文字
- 使用 `Tooltip` 组件包裹，鼠标滑过时显示 `tooltip` 内容（回退到 `description`）

补充约束：

- 为保持 `workflow` 应用视觉一致性，优先复用当前页面已有的帮助提示风格：蓝色或中性帮助图标 + antd `Tooltip`
- 图标颜色：当前 `TicketBuilderHeader` 使用蓝色 `#1677ff`，本功能中建议保持此风格以统一视觉，或整体降级为中性灰色 `#8c8c8c` 以降低干扰——需要在实现前选定一种方案
- Tooltip 建议设置 `placement="right"` 或 `placement="topLeft"`，避免在侧边栏中遮挡标题文本
- 若节点卡片标题区域空间紧张，标题和问号图标应保持同一行，描述仍单独占下一行
- 帮助图标位于 `draggable` 节点卡片内部，实现时要确认点击或按住帮助图标不会误触发拖拽；必要时在图标容器上处理 `onMouseDown={(event) => event.stopPropagation()}`
- 当前 `PaletteSider.tsx` 存在与此功能无关的未使用导入（如折叠按钮相关导入），本期如编辑该文件，可顺手移除由本次触发的 lint 问题，但不做大范围重构

### 3.4 PropertyDrawer 改造

每个 `Form.Item` 的 `label` 改造为复合节点（label 文字 + `?` 图标 + Tooltip）。

为了方便复用，抽取一个 `LabelWithTooltip` 辅助组件：

```tsx
const LabelWithTooltip: React.FC<{ label: string; tooltip: string }> = ({ label, tooltip }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
    <span>{label}</span>
    <Tooltip title={tooltip}>
      <QuestionCircleOutlined style={{ color: '#bfbfbf', fontSize: 11, cursor: 'help' }} />
    </Tooltip>
  </span>
);
```

进一步收敛策略：

- `LabelWithTooltip` 不建议只接收纯字符串；更稳妥的签名应允许传入 `ReactNode` label，避免后续 label 里混入高亮、状态标记时需要重构
- Tooltip 公共样式建议在一个小工具函数或常量中统一，如 `overlayStyle={{ maxWidth: 360 }}`，避免不同字段出现尺寸漂移
- 对于重复字段（如“节点名称”“描述”“审批人类型”），不要在多个 render 函数中复制相同 tooltip 文案；应统一复用同一组 message id 或配置映射
- 对于非 `Form.Item` 的标题（如“分支条件”“Headers”“Query Params”），应提供同等的 `LabelWithTooltip` 或 `HelpTextLabel` 包装，而不是只覆盖表单 label
- 对于 `Form.List` 内部的 `Key` / `Value` 输入框，优先通过更明确的 placeholder 或小范围 Tooltip 说明，避免每一行都出现重复问号图标造成视觉噪音

推荐的收敛形式：

```tsx
type HelpLabelProps = {
  label: React.ReactNode;
  tooltip: React.ReactNode;
};
```

然后在每个 `Form.Item` 中使用：

```tsx
<Form.Item
  name="assigneeType"
  label={
    <LabelWithTooltip
      label={intl.formatMessage({ id: 'ticket.property.approval.assigneeType', defaultMessage: '审批人类型' })}
      tooltip={intl.formatMessage({ id: 'ticket.property.approval.assigneeType.tooltip', defaultMessage: '选择审批人的来源方式：指定用户（手动输入具体人员）、指定角色（按角色分配）、指定部门（按部门分配）、发起人（由工单创建者审批）、直属上级（由发起人的直属上级审批）。' })}
    />
  }
>
```

### 3.5 各字段 Tooltip 文案

### 3.5.1 文案设计原则

- 面向第一次接触工作流配置的管理员，避免使用纯术语堆砌
- 每段说明尽量回答三个问题：这个字段是什么、什么时候填、填错会影响什么
- 避免承诺当前系统尚未提供的能力；若某字段目前仍偏“技术型输入”（如 `roleUid`、条件 JSON 表达式），文案应明确说明这是进阶字段

#### 审批 / 会签 / 或签 共用字段

| 字段 | tooltip |
| ------ | --------- |
| 节点名称 | 给当前节点起一个便于识别的名称，如"主管审批"、"部门会签"。此名称会显示在流程画布和审批记录中。 |
| 描述 | 节点的补充说明，帮助其他管理员理解此节点的用途。 |
| 审批人类型 | 决定审批人的来源方式。指定用户：手动输入审批人名称。指定角色：按系统角色自动匹配审批人。指定部门：按组织架构自动匹配部门负责人。发起人：由工单创建者自己审批。直属上级：由工单发起人的直属上级审批。 |
| 审批人 / 参与人 | 输入具体的审批人或参与人名称。支持输入多个，用回车分隔。系统会根据"分配策略"从列表中选出一人。 |
| 角色 | 当审批人类型为"指定角色"时，填写角色的 UID。系统会自动找到属于该角色的成员来审批。 |
| 分配策略 | 当配置了多个候选审批人时，系统使用什么规则从中选出一人。继承全局：使用工单设置中的默认分配方式。轮询分配：按顺序轮流分配。最少活跃：分配给当前工作量最少的人。随机分配：随机选一人。一致性哈希：相同工单始终分配给同一人。最近活跃：分配给最近有操作的人。手动分配：由管理员手动指定。 |
| 超时时间（分钟） | 审批节点的最大等待时间。超过此时间后，系统会触发"超时行为"（如提醒或自动升级）。设为 0 表示不限时。 |
| 超时行为 | 审批超时后的处理方式。提醒：向审批人发送提醒通知。升级：将审批任务转交给更高级别的审批人。跳过：自动跳过此审批节点，进入下一步。 |
| 允许转办 | 开启后，当前审批人可以将审批任务转交给其他人处理。 |
| 允许加签 | 开启后，审批人可以额外邀请其他人参与审批。 |
| 意见必填 | 开启后，审批人在审批时必须填写审批意见，不能留空。 |
| SLA 类型 | 选择此节点对应的 SLA 指标。待领取 SLA：从任务创建到被认领的时间。首次响应 SLA：从任务创建到首次回复的时间。解决 SLA：从任务创建到解决的时间。客户确认 SLA：从解决到客户确认关闭的时间。 |
| SLA 时长（分钟） | 此节点单独设置的 SLA 时间要求。设为 0 则使用全局 SLA 设置。 |
| 超时不中断任务 | 开启后，即使 SLA 超时，任务也不会被自动关闭或强制流转。 |

补充修订建议：

- “审批人 / 参与人”文案里不要写死“系统会根据分配策略从列表中选出一人”，因为会签场景可能是多人同时参与；建议按节点类型分别表述
- “角色”字段建议明确当前是填写角色 UID，而不是角色名称，避免新手误填中文名称
- “直属上级”说明建议标注前提：需要组织关系中已维护直属上级数据，否则无法正确匹配

#### 会签专属字段

| 字段 | tooltip |
| ------ | --------- |
| 完成条件 | 全部同意：所有参与人都同意才算通过。按比例通过：设置一个百分比（如 60%），超过此比例同意即可通过。按人数通过：设置一个具体人数，达到即可通过。 |
| 顺序会签 | 开启后，参与人按顺序依次审批（一人审批完才轮到下一人）。关闭则为并行会签，所有人同时收到审批通知。 |

建议补充一条实现提醒：

- 如果后续代码中已存在 `passRatio` / `passCount` 但当前抽屉尚未渲染对应输入项，本期规划不要提前承诺为用户提供这两个字段的可见输入，除非同步把表单也补上

#### 通知节点字段

| 字段 | tooltip |
| ------ | --------- |
| 通知渠道 | 选择通知的发送方式。消息通知：通过系统消息推送。邮件通知：发送邮件。短信通知：发送短信。可以选择多个渠道同时通知。 |
| 通知模板 | 通知消息的内容模板。支持使用 {{变量名}} 插入动态内容，如 {{ticketTitle}} 表示工单标题、{{assignee}} 表示处理人等。 |
| 接收人类型 | 决定通知发送给谁。选项含义同"审批人类型"。 |

#### 条件分支字段

| 字段 | tooltip |
| ------ | --------- |
| 分支条件 | 每个分支对应一条表达式。表达式使用 JSON 格式描述判断条件，如 {"field":"amount","operator":"gt","value":1000} 表示金额大于 1000。满足哪个分支的条件就走哪个分支。至少保留一个默认分支。 |
| 分支标签 | 给分支起一个描述性名称，会在节点连线上显示。 |
| 条件表达式 | JSON 格式的判断条件。支持字段比较（大于/小于/等于/包含等）和逻辑组合（且/或）。 |
| 添加分支 | 点击新增一个条件分支。系统会根据分支数量自动生成对应的节点输出端口。 |

补充修订建议：

- 条件表达式当前实际体验更偏“高级配置”，tooltip 中应明确“建议按示例格式填写”，避免让新手误以为已有图形化条件编辑器
- 至少一个默认分支的描述建议放入 Tooltip 或字段说明中，避免用户误删到只剩异常路径

#### HTTP 请求字段

| 字段 | tooltip |
| ------ | --------- |
| 请求方法 | HTTP 请求的方法类型。GET：获取数据。POST：创建数据。PUT：更新数据。PATCH：部分更新。DELETE：删除数据。 |
| 请求 URL | 要调用的外部 API 地址，需要包含完整的协议（http:// 或 https://）。 |
| 请求体 | POST/PUT/PATCH 请求时发送的数据内容。通常为 JSON 格式。 |
| Headers | HTTP 请求头，如 Content-Type: application/json、Authorization: Bearer xxx 等。 |
| Query Params | URL 查询参数，会拼接到请求 URL 后面，如 ?page=1&size=10。 |
| Key / Value | Key 是请求头或查询参数的名称，Value 是对应的值。例如 Header 可填写 Key=Content-Type、Value=application/json。 |

补充修订建议：

- `Headers` 和 `Query Params` 应说明“键和值都需要手动填写”，因为当前 UI 没有预置模板
- `请求体` 说明建议明确：只有 `POST/PUT/PATCH` 常见需要填写，`GET` 通常留空

#### 通用节点字段

| 字段 | tooltip |
| ------ | --------- |
| 节点名称 | 给节点起一个便于识别的名称，会显示在画布节点和属性面板中。 |
| 描述 | 补充说明该节点的用途，方便后续维护流程的人理解为什么需要这个节点。 |

并行、合并、结束节点当前只有通用字段，首期不需要额外扩展配置说明。

#### 子流程字段

| 字段 | tooltip |
| ------ | --------- |
| 选择流程 | 从已发布的工作流列表中选择一个作为子流程。当前流程执行到此节点时，会自动触发子流程的执行。 |

### 3.5.2 i18n Key 命名规范

所有 tooltip i18n key 遵循现有 `ticket.property.*` 前缀体系，后缀追加 `.tooltip`：

```text
ticket.property.<fieldGroup>.<fieldName>.tooltip
```

具体分组：

| 分组 | key 前缀 | 适用范围 |
| ------ | ------ | ------ |
| nodeName | `ticket.property.nodeName.tooltip` | 所有节点的"节点名称"字段 |
| description | `ticket.property.description.tooltip` | 所有节点的"描述"字段 |
| approval | `ticket.property.approval.<field>.tooltip` | 审批/会签/或签共用字段 |
| countersign | `ticket.property.countersign.<field>.tooltip` | 会签专属字段 |
| notification | `ticket.property.notification.<field>.tooltip` | 通知节点字段 |
| condition | `ticket.property.condition.<field>.tooltip` | 条件分支字段 |
| http | `ticket.property.http.<field>.tooltip` | HTTP 请求字段 |
| subProcess | `ticket.property.subProcess.<field>.tooltip` | 子流程字段 |
| sla | `ticket.property.sla.<field>.tooltip` | SLA 相关字段 |

注意：

- 审批、会签、或签共用字段（如 `assigneeType`、`assignmentMode`）复用同一个 key，避免重复定义
- 或签（orSign）目前复用审批渲染函数，tooltip key 也直接复用审批分组的 key，不需要单独开 orSign 分组
- 节点面板的 tooltip key 沿用现有 `ticket.palette.node.<type>.title` / `description` 模式，tooltip 内容直接在 `palette.tsx` 的 `tooltip` 字段中写入

---

## 4. 实现步骤

### 4.0 首先进行轻量收敛

在正式改代码前，先把“帮助文案元数据”收敛为可维护结构，避免把几十段 tooltip 直接散落到 JSX 中。

推荐两种可选方式，首选 A：

1. A 方案：在 `PropertyDrawer.tsx` 顶部集中声明 tooltip 文案常量或小型映射
2. B 方案：抽到 `config/helpText.ts` 之类的同目录配置文件中

首期更建议 A 方案，因为改动最小，验证最快。

### 步骤 1：扩展 `TicketPaletteItem` 类型

在 `types.ts` 中为 `TicketPaletteItem` 增加 `tooltip?: string` 字段。

### 步骤 2：为 palette 配置添加 tooltip

在 `config/palette.tsx` 中为每个节点配置加上 `tooltip` 字段和 JSDoc 注释。

### 步骤 3：改造 PaletteSider

在 `PaletteSider.tsx` 中：

1. 引入 `QuestionCircleOutlined` 和 antd `Tooltip`
2. 节点标题行改为 flex 布局，右侧加 `?` 图标 + Tooltip
3. Tooltip 内容通过 `ticket.palette.node.{type}.tooltip` 的 locale key 读取，并以 `item.tooltip` 作为默认文案回退

### 步骤 4：改造 PropertyDrawer

在 `PropertyDrawer.tsx` 中：

1. 引入 `QuestionCircleOutlined` 和 antd `Tooltip`
2. 抽取 `LabelWithTooltip` 辅助组件
3. 将各渲染函数中的 `Form.Item` 的 `label` 属性改为 `LabelWithTooltip` 组件
4. 将 `Typography.Text` 分组标题（分支条件、Headers、Query Params）也纳入帮助提示
5. Tooltip 文案使用 `intl.formatMessage` + i18n id + `defaultMessage`

### 步骤 5：i18n 文案补充

当前已完成显式收口：

1. 属性面板 Tooltip key 已补入 `workflow` 的 `zh-CN/en-US/zh-TW` locale 文件
2. 节点面板 Tooltip key 也已补入同一组 locale 文件
3. 代码中仍保留 `defaultMessage` 作为运行时兜底，但不再长期依赖它承担正式文案来源

### 步骤 6：最小验证

本次实现完成后，已执行或应执行以下验证：

1. 打开 TicketBuilder，确认节点卡片的 tooltip 能正常显示
2. 打开不同类型节点的 PropertyDrawer，确认 label 右侧帮助图标显示正常
3. 深色模式下确认图标颜色和 tooltip 可读性
4. 在节点面板中按住节点卡片拖拽，确认帮助图标不会破坏拖拽体验
5. 条件分支、HTTP Headers、Query Params 这些非标准 `Form.Item label` 区域也要确认有说明入口
6. 运行 `get_errors` 或等价的前端类型/诊断检查，确保未引入 TS/JSX 错误
7. 运行 `pnpm build`（`frontend/apps/workflow`）进行 TypeScript + Vite 构建验证，确认 locale 与 JSX 改动未引入打包失败

---

## 5. 风险与注意事项

1. **Tooltip 内容较长**：部分 tooltip 文字较多（如"分配策略"），需确保 Tooltip 的 `maxWidth` 合理，建议设置 `overlayStyle={{ maxWidth: 360 }}`。
2. **性能影响**：Tooltip 组件在抽屉中有 20+ 个实例，需避免 overlay 渲染过多。antd Tooltip 默认 mouseenter 时才创建 overlay，性能影响可忽略。
3. **i18n 一致性**：所有 tooltip 文案必须通过 `intl.formatMessage` 渲染；locale 文件是正式文案来源，`defaultMessage` 仅作兜底。
4. **移动端适配**：Tooltip 在触屏设备上不可用，需确认 `PropertyDrawer` 主要在桌面端使用。
5. **文案与实际能力不匹配**：例如条件分支、角色 UID、直属上级等字段，如果 tooltip 讲得过于“产品化”，但当前交互仍偏技术配置，用户会产生预期落差。
6. **组件膨胀**：`PropertyDrawer.tsx` 已经较长，如果把所有 tooltip 直接内联，会进一步降低可维护性，因此需要在实现时控制结构化程度。
7. **拖拽冲突**：节点卡片本身可拖拽，帮助图标嵌在卡片里时需要确认 hover/click 不影响拖拽。
8. **过度解释**：每个字段都加长文案会降低阅读效率，首期应控制 Tooltip 长度，必要时用“用途 + 示例 + 注意点”的短结构。

---

## 6. 校对后建议

在现有规划基础上，建议采用以下取舍：

1. 首期只做桌面端 Tooltip，不扩展为点击气泡、抽屉内说明块或新手模式
2. 节点卡片使用简洁帮助 icon，避免把节点面板做成说明书，防止视觉噪音过大
3. `PropertyDrawer` 优先覆盖高价值字段：**审批人类型、分配策略、超时时间/超时行为、SLA 类型/时长、完成条件、顺序会签、通知模板、条件表达式、HTTP 请求方法/URL/请求体**；普通的"节点名称/描述"用较短的一句话说明即可
4. 当前代码已完成 locale 文件显式补充，后续如继续扩展字段，沿用同样的 key 先设计、三语同步补齐的方式

---

## 7. 确认清单

本清单对应的实现已完成，可作为验收项：

- [x] 已为 `TicketPaletteItem` 增加 `tooltip` 字段
- [x] 已补充节点 tooltip 文案内容
- [x] 已补充属性面板各字段 tooltip 文案内容
- [x] 已完成 PaletteSider 和 PropertyDrawer 的 UI 改动
- [x] 已完成 `zh-CN/en-US/zh-TW` locale 显式补充
- [x] 已优先覆盖高价值字段，并对通用字段使用短文案
- [x] 已选用蓝色帮助图标 `#1677ff` 以保持与现有页面帮助风格一致

---

## 8. 附录：Tooltip 文案与 i18n Key 完整映射

此附录按渲染函数分组，列出所有需要实现 tooltip 的字段及其 i18n key 和文案。实现时可以作为代码中 tooltip 映射表的直接参考。

### 8.1 审批 / 或签（renderApprovalFields）

| 字段名 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| title | `ticket.property.nodeName.tooltip` | 给当前节点起一个便于识别的名称，如"主管审批"。此名称会显示在流程画布和审批记录中。 |
| description | `ticket.property.description.tooltip` | 节点的补充说明，帮助其他管理员理解此节点的用途。 |
| assigneeType | `ticket.property.approval.assigneeType.tooltip` | 决定审批人的来源方式。指定用户：手动输入审批人名称。指定角色：按系统角色自动匹配审批人。指定部门：按组织架构自动匹配部门负责人。发起人：由工单创建者自己审批。直属上级：由工单发起人的直属上级审批（需要组织关系中已维护直属上级数据，否则无法正确匹配）。 |
| assigneeNames | `ticket.property.approval.assigneeNames.tooltip` | 输入具体的审批人名称。支持输入多个，用回车分隔。系统会根据"分配策略"从列表中选出一人。 |
| roleUid | `ticket.property.approval.roleUid.tooltip` | 当审批人类型为"指定角色"时，填写角色的 UID（不是角色名称）。系统会自动找到属于该角色的成员来审批。 |
| assignmentMode | `ticket.property.approval.assignmentMode.tooltip` | 当配置了多个候选审批人时，系统使用什么规则从中选出一人。继承全局：使用工单设置中的默认分配方式。轮询分配：按顺序轮流分配。最少活跃：分配给当前工作量最少的人。随机分配：随机选一人。一致性哈希：相同工单始终分配给同一人。最近活跃：分配给最近有操作的人。手动分配：由管理员手动指定。 |
| timeoutMinutes | `ticket.property.approval.timeout.tooltip` | 审批节点的最大等待时间。超过此时间后，系统会触发"超时行为"（如提醒或自动升级）。设为 0 表示不限时。 |
| timeoutAction | `ticket.property.approval.timeoutAction.tooltip` | 审批超时后的处理方式。提醒：向审批人发送提醒通知。升级：将审批任务转交给更高级别的审批人。跳过：自动跳过此审批节点，进入下一步。 |
| allowDelegate | `ticket.property.approval.allowDelegate.tooltip` | 开启后，当前审批人可以将审批任务转交给其他人处理。 |
| allowAddSign | `ticket.property.approval.allowAddSign.tooltip` | 开启后，审批人可以额外邀请其他人参与审批。 |
| commentRequired | `ticket.property.approval.commentRequired.tooltip` | 开启后，审批人在审批时必须填写审批意见，不能留空。 |
| slaType | `ticket.property.sla.type.tooltip` | 选择此节点对应的 SLA 指标。待领取 SLA：从任务创建到被认领的时间。首次响应 SLA：从任务创建到首次回复的时间。解决 SLA：从任务创建到解决的时间。客户确认 SLA：从解决到客户确认关闭的时间。 |
| slaDurationMinutes | `ticket.property.sla.duration.tooltip` | 此节点单独设置的 SLA 时间要求。设为 0 则使用全局 SLA 设置。 |
| slaNonInterrupting | `ticket.property.sla.nonInterrupting.tooltip` | 开启后，即使 SLA 超时，任务也不会被自动关闭或强制流转。 |

### 8.2 会签（renderCountersignFields）

会签共用字段复用审批分组的 key。额外字段如下：

| 字段名 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| assigneeNames | `ticket.property.countersign.participants.tooltip` | 输入参与会签的人员名称。支持输入多个，用回车分隔。所有参与人都会收到审批通知。 |
| completionType | `ticket.property.countersign.completionType.tooltip` | 全部同意：所有参与人都同意才算通过。按比例通过：设置一个百分比（如 60%），超过此比例同意即可通过。按人数通过：设置一个具体人数，达到即可通过。 |
| sequential | `ticket.property.countersign.sequential.tooltip` | 开启后，参与人按顺序依次审批（一人审批完才轮到下一人）。关闭则为并行会签，所有人同时收到审批通知。 |

### 8.3 通知（renderNotificationFields）

| 字段名 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| channels | `ticket.property.notification.channels.tooltip` | 选择通知的发送方式。消息通知：通过系统消息推送。邮件通知：发送邮件。短信通知：发送短信。可以选择多个渠道同时通知。 |
| template | `ticket.property.notification.template.tooltip` | 通知消息的内容模板。支持使用 {{变量名}} 插入动态内容，如 {{ticketTitle}} 表示工单标题、{{assignee}} 表示处理人等。 |
| recipientType | `ticket.property.notification.recipientType.tooltip` | 决定通知发送给谁，选项含义同"审批人类型"。 |

### 8.4 条件分支（renderConditionFields）

| UI 位置 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| 分支条件标题 | `ticket.property.condition.branches.tooltip` | 每个分支对应一条判断条件。满足哪个分支的条件就走哪个分支。至少保留一个分支作为默认路径，避免没有分支可走。 |
| 分支标签输入 | `ticket.property.condition.branch.label.tooltip` | 给分支起一个描述性名称，会在节点连线上显示。 |
| 条件表达式输入 | `ticket.property.condition.branch.expression.tooltip` | JSON 格式的判断条件，属于进阶配置。支持字段比较和逻辑组合。示例：{"field":"amount","operator":"gt","value":1000} 表示金额大于 1000。建议按此示例格式填写。 |
| 添加分支按钮 | 用 antd Button `title` 属性 | 点击新增一个条件分支 |

### 8.5 HTTP 请求（renderHttpFields）

| 字段名 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| method | `ticket.property.http.method.tooltip` | HTTP 请求的方法类型。GET：获取数据。POST：创建数据。PUT：更新数据。PATCH：部分更新。DELETE：删除数据。 |
| url | `ticket.property.http.url.tooltip` | 要调用的外部 API 地址，需要包含完整的协议（http:// 或 https://）。 |
| body | `ticket.property.http.body.tooltip` | POST/PUT/PATCH 请求时发送的数据内容，通常为 JSON 格式。GET 请求通常不需要填写此项。 |
| Headers 标题 | `ticket.property.http.headers.tooltip` | HTTP 请求头。键和值都需要手动填写，系统不会自动生成。常用示例：Content-Type=application/json、Authorization=Bearer xxx。 |
| Query Params 标题 | `ticket.property.http.queryParams.tooltip` | URL 查询参数。键和值都需要手动填写，会拼接到请求 URL 后面。示例：page=1&size=10。 |
| Key / Value 输入 | 通过 placeholder 说明 | Key 是参数名，Value 是对应的值 |

### 8.6 子流程（renderSubProcessFields）

| 字段名 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| processName | `ticket.property.subProcess.processName.tooltip` | 从已发布的工作流列表中选择一个作为子流程。当前流程执行到此节点时，会自动触发子流程的执行。 |

### 8.7 通用（renderCommonFields）

| 字段名 | i18n key (tooltip) | defaultMessage |
| ------ | ------ | ------ |
| title | `ticket.property.nodeName.tooltip` | 给节点起一个便于识别的名称，会显示在画布节点上。 |
| description | `ticket.property.description.tooltip` | 补充说明该节点的用途，方便后续维护流程的人理解。 |

### 8.8 节点面板（PaletteSider）

节点 tooltip 当前通过 react-intl key 取值，key 形如 `ticket.palette.node.{type}.tooltip`；`config/palette.tsx` 中的 `tooltip` 字段保留为默认文案回退。

| 节点类型 | i18n key (tooltip) | defaultMessage 来源 |
| ------ | ------ | ------ |
| approval | `ticket.palette.node.approval.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| countersign | `ticket.palette.node.countersign.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| orSign | `ticket.palette.node.orSign.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| notification | `ticket.palette.node.notification.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| condition | `ticket.palette.node.condition.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| parallel | `ticket.palette.node.parallel.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| join | `ticket.palette.node.join.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| http | `ticket.palette.node.http.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| subProcess | `ticket.palette.node.subProcess.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
| end | `ticket.palette.node.end.tooltip` | `TICKET_PALETTE_ITEMS[].tooltip` |
