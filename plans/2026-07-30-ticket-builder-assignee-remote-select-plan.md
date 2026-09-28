# 工单工作流 — 审批人/部门远程选择器规划文档

> 日期：2026-07-30
> 状态：**已确认，待实施**
> 关联：`frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/`
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md) 第 33 行

---

## 1. 概述

当前 `PropertyDrawer` 中审批节点（审批/会签/或签）的人员配置存在两个问题：

1. **UI 侧**：`审批人/参与人` 字段仍是 `Select mode="tags"` 纯文本输入框，用户只能手动输入名称，不能基于当前组织直接选择成员或部门。
2. **数据侧**：当前节点数据实际已经同时存在 `assigneeUids` 和 `assigneeNames` 两个字段：

- `assigneeUids`：后端运行时分配逻辑使用
- `assigneeNames`：前端节点摘要展示、默认模板说明、AI 流程提示词仍在使用

因此本次改进不能简单理解为“把 `assigneeNames` 改名为 `assigneeUids`”，而应改为：

- 在表单里根据 `assigneeType` 切换为 **远程搜索选择器**
- 保存时同时维护 `assigneeUids` 和 `assigneeNames`
- `reporter` 保持语义型配置，不需要真实拉取成员列表

根据当前真实代码，交互目标应调整为：

| assigneeType 值 | 加载的数据 | 选择器类型 | 选择后的值 |
| --- | --- | --- | --- |
| `user`（指定用户） | `MemberEntity` 列表（按 orgUid） | 多选远程搜索 Select，显示昵称 + 工号，值为 `member.uid` | `assigneeUids: string[]` + `assigneeNames: string[]` |
| `department`（指定部门） | `DepartmentEntity` 列表（按 orgUid） | 多选远程搜索 Select，显示部门名称，值为 `department.uid` | `assigneeUids: string[]` 存部门 uid + `assigneeNames: string[]` 存部门名；后端同步按节点部门分配 |
| `reporter`（发起人） | 无需远程加载 | 只读提示或禁用态说明 | 保持语义配置，可保留默认展示名 |

---

## 2. 改动范围

### 2.1 文件清单

| 文件 | 改动内容 |
| --- | --- |
| `frontend/apps/workflow/src/apis/team/department.ts` | **新建** — 添加 `queryDepartmentsByOrg` API（参考 admin 同路径文件） |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/index.tsx` | 向 `PropertyDrawer` 传递 `orgUid` prop |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/components/PropertyDrawer.tsx` | **核心改动** — `assigneeType` 联动远程搜索 Select；新增 `orgUid` prop；动态数据加载逻辑；同步维护 `assigneeUids/assigneeNames` |
| `frontend/apps/desktop/src/pages/Dashboard/Ticket/components/ChatTicketActions.tsx` | 校对并完善转派 / 委派动作弹窗中的成员选择体验，确保使用当前组织成员列表单选 |
| `frontend/apps/workflow/src/locales/zh-CN/ticket.ts` | 更新“审批人/参与人”相关 placeholder，避免继续提示“输入名称” |
| `frontend/apps/workflow/src/locales/en-US/ticket.ts` | 同步更新英文 placeholder |
| `frontend/apps/workflow/src/locales/zh-TW/ticket.ts` | 同步更新繁体 placeholder |
| `modules/ticket/src/main/java/com/bytedesk/ticket/ticket/assignment/TicketAssignmentService.java` | 调整 `assigneeType=department` 分支，支持优先读取节点配置的部门 uid |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/config/schema.ts` | 校对默认模板 / 示例 schema，确保审批节点与转派/委派字段说明和新选择器语义一致 |

### 2.1.1 只校对、不计划修改的关联文件

| 文件 | 原因 |
| --- | --- |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/components/NodeRender.tsx` | 当前节点摘要仍通过 `assigneeNames` 展示“审批人/参与人” |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/config/nodes/approval.ts` | 默认节点数据已包含 `assigneeUids` 和 `assigneeNames` |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/config/nodes/countersign.ts` | 同上 |
| `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/config/nodes/orSign.ts` | 同上 |
| `enterprise/ticket/src/main/java/com/bytedesk/ticket/process/ProcessAiService.java` | AI 提示词已把 `assigneeUids` 和 `assigneeNames` 都视为有效字段 |

### 2.2 不纳入范围

- 不修改后端 Java 接口 — 已有 `/api/v1/member/query/org` 和 `/api/v1/department/query/org` 可用
- 不推翻 `TicketWorkflowSchema` 现有字段结构；继续沿用 `assigneeUids` + `assigneeNames`
- 节点属性保存逻辑仍由 `handlePropertySave` 统一处理，不新增独立保存接口

### 2.2.1 本次确认纳入范围

- 审批 / 会签 / 或签 节点的成员、部门远程选择
- `transfer` 节点中的 `targetAssigneeUid`（目标处理人）远程单选
- `delegate` 节点中的 `delegateUid`（被委托人）远程单选
- 后端 `assigneeType=department` 的运行时语义同步修改，不再仅停留在前端可配置层面

> 注意：`targetAssigneeUid` / `delegateUid` 并不是 `PropertyDrawer` 中直接填写的节点主属性，而是流程节点 `availableActions.fields` 中配置出的动作字段。真正执行动作时，这些字段由 desktop 端 `ChatTicketActions` 弹窗渲染并提交给后端。

### 2.3 关键边界澄清

`currentProcess`（`TICKET_PROCESS.ProcessResponse`）当前不含 `orgUid` 字段，因此 orgUid 应统一从 `useOrgStore.currentOrg.uid` 获取。

当前后端 `TicketAssignmentService` 中：

- `assigneeType=user` 会读取节点 `assigneeUids`
- `assigneeType=reporter` 会忽略节点中的 uid/name，直接取工单 `reporter`
- `assigneeType=department` **当前不会读取节点里选中的部门 uid**，而是直接使用 `ticket.departmentUid`

该现状已确认需要在本次一并修改：`department` 不再只依赖 `ticket.departmentUid`，而应支持优先读取流程节点中明确选择的部门 uid，再按节点/全局分配策略选人。

---

## 3. 详细设计

### 3.1 数据流

```text
TicketBuilder (index.tsx)
  │  currentOrg.uid (来自 useOrgStore)
  │
  └─► PropertyDrawer
        │  props: orgUid
        │
          ├─► assigneeType === 'user'
          │     → 调用 queryMembersByOrg({ orgUid, pageNumber: 0, pageSize: 50, keyword? })
          │     → 选择后同时写入：
          │        assigneeUids: member.uid[]
          │        assigneeNames: member.nickname[]
        │
        ├─► assigneeType === 'department'
          │     → 调用 queryDepartmentsByOrg({ orgUid, pageNumber: 0, pageSize: 100 })
          │     → 前端本地过滤
          │     → 选择后同时写入：
          │        assigneeUids: department.uid[]
          │        assigneeNames: department.name[]
          │     → 后端运行时优先读取节点里选中的部门 uid 再做分配
        │
        └─► assigneeType === 'reporter'
            → 不显示远程选择器，显示“工单发起人”只读提示
            → 可选：自动回填 assigneeNames=['报告人' / i18n 文案]
```

### 3.2 PropertyDrawer 新增 Props

```typescript
type PropertyDrawerProps = {
  // ... 现有 props 保持不变 ...
  orgUid?: string;  // 新增：用于加载成员/部门列表
};
```

### 3.3 `assigneeUids` 与 `assigneeNames` 的兼容策略

当前真实代码中：

- `assigneeUids` 已存在于节点模板与后端分配逻辑中
- `assigneeNames` 已存在于节点模板、节点摘要展示、AI 提示词中

因此首期规划应采用“**双字段并存**”而不是“字段重命名替换”：

- **表单主字段**：继续保留 `assigneeUids`
- **展示辅助字段**：继续保留 `assigneeNames`
- **回填行为**：
  - 若旧节点只有 `assigneeNames`、没有 `assigneeUids`，表单可正常显示旧值，但应提示用户重新选择，以便生成可执行的 uid 配置
  - 若节点已同时存在 `assigneeUids` 和 `assigneeNames`，优先按 uid 回填选中项，并用 names 做展示兜底
- **保存行为**：
  - `user`：选中成员后，同时更新 uid 列表和显示名列表
  - `department`：选中部门后，同时更新 uid 列表和显示名列表
  - `reporter`：不要求真实 uid 选择，可保留默认 `assigneeNames`

### 3.4 Member 选择器 UI

```tsx
// assigneeType === 'user' 时
<Select
  mode="multiple"
  showSearch
  filterOption={false}
  onSearch={handleMemberSearch}
  placeholder="搜索并选择成员"
  notFoundContent={fetching ? <Spin /> : null}
  options={memberOptions}          // [{ label: '张三 (G001)', value: 'uid-xxx' }]
/>
```

**搜索逻辑**：

- 首次切换到 `user` 时加载前 50 条
- 输入搜索词后 debounce 300ms 调 `queryMembersByOrg({ orgUid, pageNumber: 0, pageSize: 50, keyword })`
- `MemberRequest` 后端已存在 `keyword` 字段，可优先走后端搜索
- option label 格式：`{nickname} ({jobNo})`，如 `张三 (G001)`

**保存结果**：

- `assigneeUids = selectedMembers.map(item => item.value)`
- `assigneeNames = selectedMembers.map(item => item.labelText)`

### 3.5 Department 选择器 UI

```tsx
// assigneeType === 'department' 时
<Select
  mode="multiple"
  showSearch
  filterOption
  placeholder="搜索并选择部门"
  notFoundContent={fetching ? <Spin /> : null}
  options={departmentOptions}     // [{ label: '技术部', value: 'uid-xxx' }]
/>
```

**搜索逻辑**：

- 首次切换到 `department` 时加载前 100 条
- `DepartmentRequest` 当前只有 `name/description/parentUid`，未看到专门 `keyword` 字段
- 已确认首期使用：请求当前组织下部门列表后，使用前端 `filterOption` 或本地过滤
- 不要求本次补后端 `keyword` 搜索参数

**保存结果**：

- `assigneeUids = selectedDepartments.map(item => item.value)`
- `assigneeNames = selectedDepartments.map(item => item.labelText)`

### 3.5.1 Department 运行时语义调整

本次确认后端同步修改，目标行为如下：

- `resolveFromWorkflowNode` 在 `assigneeType=department` 时，将节点数据中的 `assigneeUids`（此时为部门 uid 列表）传入分配方法
- 若节点配置了一个或多个部门 uid，则合并这些部门的成员集合（去重），按节点分配策略 / 全局分配策略选出处理人
- 若节点未配置部门 uid，则回退到当前 `ticket.departmentUid`
- 若节点配置的部门下无有效成员，应返回明确的 unresolved 原因，方便排查流程配置问题

**当前代码与目标差异**：

- 当前 `resolveFromWorkflowNode` 在 `department` 分支只调用了 `resolveDepartmentMemberWithStrategy(ticket, nodeAssignmentMode)`，没有把节点的 `assigneeUids` 传过去
- 当前 `resolveDepartmentMemberWithStrategy` 只用 `ticket.departmentUid`（单值），不支持节点级多部门

**重构要点**：

1. 新增私有方法 `resolveNodeDepartment(JSONArray assigneeUids, TicketEntity ticket, String nodeAssignmentMode)`
2. `assigneeUids` 非空 → 遍历每个 uid → `memberRepository.findByDeptUidAndDeletedFalse(uid)` → 合并去重 → 按策略分配
3. `assigneeUids` 为空 → 退回到当前 `resolveDepartmentMemberWithStrategy(ticket, nodeAssignmentMode)` 逻辑
4. `resolveFromWorkflowNode` 的 `department` 分支改为调用新方法并传入 `assigneeUids`

### 3.6 新增 API 文件

**`frontend/apps/workflow/src/apis/team/department.ts`**（新建）：

```typescript
import { HTTP_CHANNEL } from "@/utils/constants";
import request from "@/apis/request";

export async function queryDepartmentsByOrg(pageParam: DEPARTMENT.PageParams) {
  return request<DEPARTMENT.HttpPageResult>("/api/v1/department/query/org", {
    method: "GET",
    params: {
      ...pageParam,
      channel: HTTP_CHANNEL,
    },
  });
}
```

### 3.7 `reporter` 的 UI 语义

`reporter` 不应再显示成员或部门列表，而应明确为“语义型配置”：

- 表单展示只读说明：当前节点处理人为工单发起人
- 可保留一个只读 tag 或 secondary text，帮助用户理解不是“固定选择某个人”
- 若从 `user/department` 切换到 `reporter`，需要清理掉之前临时选中的表单值，避免保存脏数据

### 3.8 审批人类型下拉选项去除

当前 `ASSIGNEE_TYPE_OPTIONS` 已为精简后的 3 项：

```typescript
const ASSIGNEE_TYPE_OPTIONS = [
  { label: '指定用户', value: 'user' },
  { label: '指定部门', value: 'department' },
  { label: '发起人', value: 'reporter' },
];
```

**确认不需要再修改**（TODO 之前已去掉"指定角色"和"直属上级"）。

### 3.9 转派 / 委派字段同步改造

本次确认同步纳入以下单选字段：

- `TRANSFER` 动作字段中的 `targetAssigneeUid`
- `DELEGATE` 动作字段中的 `delegateUid`

前端目标：

- workflow 端：继续通过 `availableActions.fields` 配置动作字段，不把 `targetAssigneeUid` / `delegateUid` 作为审批节点主表单字段
- desktop 端：执行动作弹窗中基于当前组织成员列表进行单选，保持 `value=member.uid`、`label=nickname/jobNo` 的展示规则
- 若当前 `ChatTicketActions` 已经加载了 `memberOptions` / `departmentOptions`，本次重点校对 option label、空态、orgUid 来源和必填校验，而不是重复创建一套选择器

本次仅要求前端选择体验统一，不额外调整这两个字段在后端 `TicketService` 中的业务语义；它们当前本身就是按成员 uid 处理的。

---

## 4. 会签/或签节点同步改动

`renderCountersignFields` 和 `renderApprovalFields`（或签复用审批表单）使用同一套审批人配置字段，因此远程选择器逻辑应抽成公共渲染片段，避免在两个表单分支里重复维护：

- 审批节点：审批人
- 会签节点：参与人
- 或签节点：复用审批节点渲染

---

## 5. 实施步骤

| 步骤 | 文件 | 操作 |
| --- | --- | --- |
| 1 | `apis/team/department.ts` | 新建 department API |
| 2 | `PropertyDrawer.tsx` — Props 类型 | `PropertyDrawerProps` 增加 `orgUid?: string` |
| 3 | `PropertyDrawer.tsx` — 状态 & 数据 | 添加 `memberOptions`/`departmentOptions`/`fetching` 状态；实现 `useEffect` 监听 `assigneeType` 变化加载数据 |
| 4 | `PropertyDrawer.tsx` — 回填兼容 | 处理旧节点仅有 `assigneeNames` 时的表单回填与提示 |
| 5 | `PropertyDrawer.tsx` — UI | 将当前纯文本 tags 改为条件渲染的远程搜索 Select / 只读说明 |
| 6 | `PropertyDrawer.tsx` — 保存逻辑 | 选择时同步维护 `assigneeUids` 和 `assigneeNames` |
| 7 | `ticket.ts` i18n | 更新 placeholder/文案，避免继续提示“输入名称” |
| 8 | `index.tsx` | 向 `PropertyDrawer` 传递 `orgUid={currentOrg?.uid}`（`ProcessResponse` 不含 `orgUid`） |
| 9 | `TicketAssignmentService.java` | 改造 `assigneeType=department` 的部门解析逻辑，优先读取节点配置部门 uid |
| 10 | `config/schema.ts` | 校对默认动作字段模板，保持 `memberSelect` / `departmentSelect` 语义清晰 |
| 11 | `ChatTicketActions.tsx` | 校对转派 / 委派动作弹窗的成员选择、部门选择、必填校验和空态提示 |

---

## 6. 风险 & 注意事项

1. **成员/部门搜索能力不对称**：`MemberRequest` 有 `keyword`，`DepartmentRequest` 当前未见 `keyword`，两者搜索实现不应假设完全一致
2. **旧数据兼容**：已有节点可能只有 `assigneeNames`，没有 `assigneeUids`。已确认本次不做自动迁移，而是在 UI 上提示重新选择后保存
3. **orgUid 为空的兜底**：当 `orgUid` 为空时不发起请求，显示 placeholder 提示“请先选择组织”
4. **department 多部门语义**：当前节点字段仍复用 `assigneeUids` 存部门 uid，需要在后端明确“这是部门 uid 列表而非成员 uid 列表”的解释边界，避免后续再次混淆
5. **`availableActions.fields` 与执行端渲染分离**：workflow 端配置字段模板，desktop 端渲染执行动作弹窗。规划和实现都需要同时校对两端，否则会出现"流程里配置了字段，但客服执行动作时体验没有变化"的断层
6. **desktop 端已预加载成员/部门数据**：`ChatTicketActions` 已导入 `queryMembersByOrg`、`queryDepartmentsByOrg`。本次校对重点：option label 格式、orgUid 来源、空态/加载态、必填校验，而不重新创建数据管线
7. **多部门分配语义**：后端新增方法需要处理 `assigneeUids` 在 `department` 场景下是部门 uid 列表（而非成员 uid 列表），合并成员时必须去重，且要处理某个部门无成员的边界情况

---

## 7. 已确认的实施策略

### 7.1 本次实施范围

- 在 `PropertyDrawer` 中把审批/会签/或签节点的人员配置改成基于组织的远程选择
- `user` 选择成员，`department` 选择部门，`reporter` 展示语义说明
- 同步维护 `assigneeUids` 与 `assigneeNames`
- 同步修改后端 `assigneeType=department` 分配算法
- 同时改造 `transfer` / `delegate` 的成员选择字段

### 7.2 本次明确不做的事

- 不新增后端部门关键字搜索参数
- 不自动迁移历史旧节点的 `assigneeNames` 为 `assigneeUids`
- 不调整 `reporter` 的运行时语义

## 8. 验证策略

### 8.1 前端验证

- workflow：`PropertyDrawer` 中审批 / 会签 / 或签节点切换 `user`、`department`、`reporter`，确认表单显示、选择结果、保存后的 `assigneeUids/assigneeNames` 正确
- workflow：旧节点仅有 `assigneeNames` 时能展示提示，不自动伪造 uid
- desktop：转派、委派动作弹窗能显示成员选项，并提交正确的 `targetAssigneeUid` / `delegateUid`
- desktop：转派部门动作仍能选择部门，且可选目标同事保持可选语义
- desktop：动作弹窗在成员/部门数据尚未加载完成时，输入框不为空时不崩溃或错误提交

### 8.2 后端验证

- `assigneeType=user`：仍按节点 `assigneeUids` 精确分配
- `assigneeType=department`：优先按节点中选择的部门 uid 查找成员并应用分配策略
- `assigneeType=department`：节点未配置部门 uid 时，回退到 `ticket.departmentUid`
- `assigneeType=reporter`：行为不变，继续取工单发起人
- 多部门：一个审批节点选多个部门时，能合并部门成员并按策略分配合法候选人
- department 成员为空：legacy `ticket.departmentUid` 可能已失效（config 删了），新逻辑需处理其中一个部门 uid 找不到成员的边界情况

## 9. 确认项

- [x] 本次不仅做前端远程选择与 schema 保存，同时把后端“指定部门”运行时语义一并改掉
- [x] `department` 首期接受“本地过滤部门列表”，暂不要求后端 `keyword` 搜索
- [x] 旧节点若只有 `assigneeNames`、没有 `assigneeUids`，接受在 UI 中提示“需重新选择后保存”，不做自动迁移
- [x] 成员 option label 采用 `{nickname} ({jobNo})`；若无 `jobNo` 则退化为仅显示昵称
- [x] 同时改造 `transfer`（转派给人）和 `delegate`（委派）节点的处理人字段，不限制在审批类节点
