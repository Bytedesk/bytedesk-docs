# 工单工作流操作按钮 — 基于 ProcessEntity 配置动态显示

> 日期：2026-07-29
> 状态：**已实施（首期）**
> 最后校核：2026-07-29
> 关联：`ProcessEntity` → `TicketService.queryWorkflowActions` → `ChatTicketActions`

---

## 1. 概述

当前 `ChatTicketActions` 中操作按钮的显示不完全依赖 `ProcessEntity` 的流程配置，存在以下问题：

1. **TicketBuilder 未写入 `availableActions`**：后端 `TicketService.buildConfiguredWorkflowActions()` 已支持从 flowgram schema 的 `node.data.availableActions` 读取配置化动作，但 TicketBuilder 前端从未写入该字段，导致始终回退到硬编码全量动作。
2. **硬编码回退不考虑节点类型**：对所有可操作的 UserTask 节点返回完全相同的 10+ 个动作，审批、会签、或签等不同人工节点按钮无差异。
3. **规划边界容易误判**：`notification`、`http`、`subProcess` 在当前 JSON → BPMN 转换中对应 `serviceTask`，不会在客服端产生可点击任务按钮；真正会进入 `queryWorkflowActions()` 的是 `approval`、`countersign`、`orSign` 这类被转换为 `userTask` 的节点。
4. **`canChat` 权限判断不感知流程配置**：只看当前用户是否是 assignee/reporter，不考虑 ProcessEntity 中是否配置了特殊权限规则。

本次改进的核心目标是：**让 TicketBuilder 里设计的流程真正决定客服端看到的操作按钮**。

本轮校对后的关键边界：

- 首期只处理会生成 `userTask` 的 `approval`、`countersign`、`orSign` 节点。
- `notification`、`http`、`subProcess` 当前是自动执行/服务类节点，不开放客服端操作按钮配置。
- 现有 Desktop 统一转派弹窗已经支持目标处理人和目标部门，本期只做配置化兼容，不重做交互。
- 后端执行分支已支持委派、抄送、加签、退回、撤销，但 `resolveActionType()` 还需补齐映射，避免配置化动作被误标为 `complete`。

本次首期实施结果：

- 已在 `workflow` 侧为 `approval`、`countersign`、`orSign` 增加 `availableActions` 类型与属性面板勾选配置。
- 已在 `TicketService` 中补齐 `resolveActionType()` 标准动作映射，并把默认动作回退收敛为按 `nodeType` 生成。
- 已在 `ChatTicketActions` 中改为优先按配置化 `fields` 决定弹窗显示项，兼容“仅转派给人 / 仅转派给部门 / 两者都允许”。
- 本轮验证包含：`workflow` 构建通过、相关文件编辑器诊断通过。
- 本轮验证不包含：`desktop` 打包，以及 `modules/ticket` Maven 窄编译（按当前操作约束未执行）。

---

## 2. 改动范围

### 2.1 前端（TicketBuilder — workflow app）

| 文件 | 改动内容 |
| ------ | --------- |
| `types.ts` | 仅为 `approval` / `countersign` / `orSign` 节点数据类型增加 `availableActions?: TicketWorkflowActionConfig[]` 字段 |
| `components/PropertyDrawer.tsx` | 为真正会生成 `userTask` 的节点新增"可执行动作"配置区域，支持勾选每个节点允许的动作 |
| `components/PropertyDrawer.tsx` | `renderApprovalFields` / `renderCountersignFields` / `renderApprovalFields(供 orSign 复用)` 集成动作配置区域 |
| `locales/zh-CN/i18n.ts` | 新增动作配置相关 i18n key |
| `locales/en-US/i18n.ts` | 同上 |
| `locales/zh-TW/i18n.ts` | 同上 |

### 2.2 前端（Desktop — desktop app）

| 文件 | 改动内容 |
| ------ | --------- |
| `components/ChatTicketActions.tsx` | 保持当前"统一转派"交互，但改为更明确地消费来自流程配置的字段定义 |
| `utils/utils.ts` | 本期不改；仅记录第二期可扩展 ProcessEntity 权限感知 |

### 2.3 后端

| 文件 | 改动内容 |
| ------ | --------- |
| `ticket/TicketService.java` | 硬编码回退按 `nodeType` 差异化；补齐标准动作的 `resolveActionType()` 映射 |

### 2.4 不纳入范围

- 不改动 Flowable 引擎的任务生命周期
- 不新增数据库表或字段（复用 flowgram schema JSON 中的 `availableActions`）
- 不修改 `TicketController` / `TicketRestController` 的接口签名
- 首期不为 `notification` / `http` / `subProcess` 提供动作配置 UI，因为它们当前不会生成客服端任务按钮

---

## 3. 实际实现

### 3.1 类型定义扩展

已在 workflow 的类型定义中新增动作配置结构：

```typescript
/** 工作流动作配置 */
export type TicketWorkflowActionConfig = {
  /** 动作标识：CLAIM/ASSIGN/COMPLETE/HOLD/CLOSE/TRANSFER/TRANSFER_DEPARTMENT/DELEGATE/CC/ADDSIGN/ROLLBACK/REVOKE */
  key: string;
  /** 动作显示名称（可自定义，为空则用默认名称） */
  label?: string;
  /** 动作类型（claim/assign/complete/hold/close/transfer/transferDepartment/delegate/cc/addSign/rollback/revoke） */
  type?: string;
  /** 是否为危险操作（红色按钮） */
  danger?: boolean;
  /** 动作所需的额外字段配置 */
  fields?: TicketWorkflowActionFieldConfig[];
};

/** 动作字段配置 */
export type TicketWorkflowActionFieldConfig = {
  /** 字段名：targetAssigneeUid/targetDepartmentUid/delegateUid/ccUids/addSignUids/rollbackToActivityId/reason/processComment */
  name: string;
  /** 字段标签 */
  label?: string;
  /** 前端组件类型：memberSelect/departmentSelect/memberMultiSelect/textarea/input */
  component?: 'memberSelect' | 'departmentSelect' | 'memberMultiSelect' | 'textarea' | 'input';
  /** 是否必填 */
  required?: boolean;
  /** 占位提示 */
  placeholder?: string;
};
```

人工任务节点数据类型追加：

```typescript
export type ApprovalNodeData = {
  // ... 现有字段
  /** 此节点允许的操作动作列表。为空时后端按节点类型推断默认动作。 */
  availableActions?: TicketWorkflowActionConfig[];
};
```

`CountersignNodeData`、`OrSignNodeData` 同样追加；`NotificationNodeData`、`HttpNodeData`、`SubProcessNodeData` 暂不追加。

当前实现约束：

- 首期只给 `ApprovalNodeData`、`CountersignNodeData`、`OrSignNodeData` 增加 `availableActions`
- `NotificationNodeData`、`HttpNodeData`、`SubProcessNodeData` 暂不追加，避免前端配置了动作但运行时永远不显示，造成误导
- `availableActions` 里的 `key` 首期只允许后端已支持的集合：`CLAIM`、`ASSIGN`、`TRANSFER`、`TRANSFER_DEPARTMENT`、`COMPLETE`、`COMPLETE_VERIFIED`、`COMPLETE_REJECTED`、`HOLD`、`CLOSE`、`DELEGATE`、`DELEGATE_RESOLVE`、`CC`、`ADDSIGN`、`ROLLBACK`、`REVOKE`
- 若未来允许自定义动作 key，则必须同步填写 `type`；当前后端校验已明确要求这一点
- 对于标准动作 key，前端已写入 `type`，后端也已补齐 `resolveActionType()` 显式映射，保证查询接口展示和执行接口分支一致

### 3.2 PropertyDrawer 动作配置区

当前实现不是拖拽排序，也不是 `Form.List` 编辑器，而是固定动作模板 + `Checkbox.Group` 勾选写入 `availableActions`。`renderActionConfig()` 挂在真正会映射为 `userTask` 的节点渲染函数底部。

当前动作全集实际包含：

- `COMPLETE`
- `COMPLETE_VERIFIED`
- `COMPLETE_REJECTED`
- `HOLD`
- `CLOSE`
- `TRANSFER`
- `TRANSFER_DEPARTMENT`
- `DELEGATE`
- `DELEGATE_RESOLVE`
- `CC`
- `ADDSIGN`
- `ROLLBACK`
- `REVOKE`

当前实现同时内置了固定字段模板：

- `TRANSFER` -> `targetAssigneeUid`
- `TRANSFER_DEPARTMENT` -> `targetDepartmentUid`
- `DELEGATE` -> `delegateUid`
- `CC` -> `ccUids`
- `ADDSIGN` -> `addSignUids`
- `ROLLBACK` -> `rollbackToActivityId`
- `REVOKE` / `DELEGATE_RESOLVE` -> `reason`
- `COMPLETE` / `COMPLETE_VERIFIED` / `COMPLETE_REJECTED` / `HOLD` / `CLOSE` -> `processComment`

当前 UI 行为：

- 已使用简单稳定的 `Checkbox.Group`，未引入拖拽排序
- 动作顺序默认沿用后端/前端既定顺序：主动作在前，危险动作在后
- 每个动作右侧都有问号图标说明
- 默认全部未勾选 = "由系统自动推断"，与历史流程保持兼容
- 至少勾选一项后，只写入并展示被勾选的动作
- 未开放任意编辑 `fields` 数组，而是根据动作 key 自动生成字段模板，避免生成无法通过后端校验的配置

动作配置的真实边界需要写清楚：

- `approval`、`countersign`、`orSign` 在当前 `convertToBpmnXml()` 中都会生成 `userTask`，因此适合配置 `availableActions`
- `notification` 生成 `serviceTask`（`NotificationDelegate`）
- `http` 生成 `serviceTask`（`HttpDelegate`）
- `subProcess` 当前也不是客服端可操作 `userTask`
- 因此本规划的“操作按钮配置”是 **userTask 级能力**，不是“所有节点都可配置按钮”

### 3.3 后端默认动作回退与类型映射

当前 `TicketService.buildWorkflowActions()` 的行为已经分为四层：

1. 工单处于 `HOLDING` 时，只返回 `RESUME`
2. 节点存在 `availableActions` 配置时，优先返回配置化动作
3. 未认领任务时，只返回 `CLAIM`、`ASSIGN`
4. 其余场景按 `nodeType` 生成默认动作；若命中核实分支则返回 `COMPLETE_VERIFIED`、`COMPLETE_REJECTED`

按 `nodeType` 的默认动作集当前实际为：

```java
approval/orSign:
COMPLETE, HOLD, CLOSE, TRANSFER, TRANSFER_DEPARTMENT,
DELEGATE, CC, ADDSIGN, ROLLBACK, REVOKE

countersign:
COMPLETE, HOLD, CLOSE, TRANSFER, TRANSFER_DEPARTMENT,
CC, ADDSIGN, ROLLBACK, REVOKE
```

当前后端实现结果：

- `resolveActionType()` 已显式覆盖 `COMPLETE_VERIFIED`、`COMPLETE_REJECTED`、`DELEGATE`、`DELEGATE_RESOLVE`、`CC`、`ADDSIGN`、`ROLLBACK`、`REVOKE`
- `buildConfiguredWorkflowActions()` 会透传配置中的 `fields`
- 配置为空时仍然保持向后兼容的 fallback 行为

### 3.4 Desktop 端动作消费逻辑

#### 3.4.1 统一转派交互保持现状

当前 `ChatTicketActions` 仍保留统一转派弹窗，并新增了“优先读取配置化字段”的判断。

当前实际行为：

- 若 `action.fields` 同时包含 `targetAssigneeUid` 和 `targetDepartmentUid`，则仍按统一转派处理
- 若只包含其中一个字段，则弹窗只展示对应控件
- 必填校验优先读取配置化 `required`，否则再回退到旧逻辑

统一转派提交规则未变：

```typescript
填了目标处理人 -> 提交 TRANSFER
只填目标部门 -> 提交 TRANSFER_DEPARTMENT
```

#### 3.4.2 canChat 维持现状

当前 `canChat` 在 `fromTicketTab=true` 且工单未分配时返回 `true`（允许任意坐席操作），这个逻辑本身是合理的。如果未来流程配置中需要限制"只有特定角色的坐席才能认领"，可以在 `ProcessEntity` 的 flowgram schema 中扩展权限配置，再由 `canChat` 读取。

**本期不改动 `canChat`**，保持当前行为。

---

## 4. 实施结论

### 4.1 已完成项

- 已在 `types.ts` 中新增 `TicketWorkflowActionConfig`、`TicketWorkflowActionFieldConfig`
- 已仅在 `ApprovalNodeData`、`CountersignNodeData`、`OrSignNodeData` 中追加 `availableActions`
- 已在 `PropertyDrawer.tsx` 中增加动作勾选配置区，并为标准动作生成固定字段模板
- 已补齐 workflow 三套 locale 中的动作配置文案
- 已在 `TicketService.java` 中实现配置优先、节点类型 fallback、核实分支、未认领分支、委派处理中分支
- 已补齐 `resolveActionType()` 的标准动作映射
- 已在 `ChatTicketActions.tsx` 中优先依据 `action.fields` 控制弹窗显示和校验

### 4.2 未纳入本轮实现

- 未改动 `canChat` 权限逻辑
- 未为 `notification`、`http`、`subProcess` 增加动作配置 UI
- 未开放 `fields` 自由编辑
- 未调整 `TicketController` / `TicketRestController` 接口签名

### 4.3 已知限制

- `ROLLBACK` 当前字段模板仍要求手工输入 `rollbackToActivityId`，尚未做节点下拉选择
- 标准动作的字段模板目前写死在 workflow 前端，若后端字段协议扩展，需要同步维护
- 文档中提到的“特殊权限规则”仍未进入 schema，也未接入 `canChat`

### 4.4 验证结果

- 已通过 workflow 构建验证：`frontend/apps/workflow` 的 `pnpm build` 成功
- 已通过编辑器诊断验证：`types.ts`、`PropertyDrawer.tsx`、`TicketService.java`、`ChatTicketActions.tsx` 无错误
- 本轮未执行 `desktop` 打包
- 本轮未执行 `modules/ticket` Maven 窄编译

## 5. 风险与注意事项

1. **向后兼容**：`availableActions` 为空时，后端自动推断默认动作，已有流程不受影响。
2. **flowgram schema 膨胀**：每个节点增加动作配置后 JSON 体积会略有增大，但动作配置本身很小（通常 5-10 个 key），影响可忽略。
3. **动作配置与 BPMN 的一致性**：`availableActions` 存储在 flowgram schema 中，而 BPMN 由 flowgram 生成；但它本身不直接进入 BPMN XML，而是作为运行时附加配置被后端读取，因此仍需保证 flowgramSchema 被正确保存到 `ProcessEntity.flowgramSchema`。
4. **节点类型误配风险**：若把动作配置 UI 开放给 `serviceTask` 类节点，用户会看到可配置项但运行时永远不出按钮，这是本期必须避免的误导。
5. **动作字段配置风险**：后端 `validateActionFields()` 要求字段必须有 `name` 和 `component`。因此首期若开放自由编辑字段结构，极易产生无法部署/校验通过的流程；更稳妥的做法是首期使用预设字段模板。
6. **动作类型映射风险**：当前标准 key 已补齐映射；后续如果增加新的动作 key，仍需同步补齐 `resolveActionType()` 与 desktop 消费逻辑。

---

## 6. 后续建议

1. 若要继续第二期，可以把 `ROLLBACK` 的目标节点从文本输入改为“当前流程可退回节点”下拉选择。
2. 若要把按钮权限也配置化，需要单独设计 schema 中的“动作可见/可执行权限”并接入 `canChat`。
3. 若后续要支持更复杂动作参数，再考虑开放 `fields` 的受控编辑，而不是直接开放自由 JSON。
