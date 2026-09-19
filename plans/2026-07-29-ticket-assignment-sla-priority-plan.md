# 工单分配策略与 SLA 优先级处理 — 分析与实施规划

> 状态：实施中（阶段 A、B、C、D 关键项已完成，阶段 E 持续收尾中） | 日期：2026-07-29

## 0. 当前实施摘要

截至 2026-07-29，本规划中最关键的运行时改造已经落地，当前代码状态如下：

1. **分配策略默认值与继承语义已统一**
   - `TicketAssignmentService` 与 `TicketThreadRoutingStrategy` 已统一 fallback 到 `ROUND_ROBIN`
   - 节点 `assignmentMode` 为空时，部门/角色分配会真正继承全局 `TicketBasicSettingsEntity.assignmentMode`

2. **旧入口与工作流入口的关键 SLA 行为已补齐**
   - `claimTicket` / `transferTicket` / `resolveTicket` / `verifyTicket` / `unclaimTicket` 已补齐主要 SLA 生命周期、流程变量同步和人工分配日志
   - `cancelTicket` / `revokeTicket` 已补齐 `cancelOpenRecords(...)`，避免流程实例删除后 SLA record 悬挂

3. **节点级 SLA 已从“只有 BPMN timer”推进到“有持久化记录 + 生命周期”**
   - `TicketSlaRecordEntity` 已扩展 `slaSource`、`taskId`、`taskDefinitionKey`
   - `TicketSLAService` 已支持节点级 record 的 create / complete / pause / resume / cancel / breach
   - `TicketSLATimeoutNotificationDelegate` 已优先按节点 `taskDefinitionKey` 命中节点 SLA record

4. **静态流程的任务监听器已绑定，动态流程依赖前端编辑器输出**
   - 静态 `ticket-process.bpmn20.xml` 中 `waitClaim` 与 `processTicket` 已绑定 `ticketTaskListener`（`create` / `assignment` / `complete` / `delete`）
   - `customerVerify` 节点目前仅有 `executionListener`（end 事件），未绑定 `ticketTaskListener`
   - 通过前端可视化编辑器（TicketBuilder）新建的流程，其 taskListener 绑定取决于编辑器是否在输出 BPMN XML 时写入对应元素；后端不会在部署时自动注入监听器

5. **接口与前端可见性已补齐到最小闭环**
   - 工单接口中的 `slaRecords` 已返回 `slaSource`、`taskId`、`taskDefinitionKey`
   - admin 详情页可区分“全局 SLA / 节点 SLA”并显示节点 key
   - admin 列表 SLA 摘要在存在节点记录时已优先基于节点记录计算

6. **旧入口源码层调用方已基本收口**
   - 前端 app 级 ticket API 中旧动作导出已清理，源码层主调用方已迁到 `workflow/actions` + `workflow/action`
   - 当前仓库内显式旧动作 URL 残留主要只剩生成物：`starter/src/main/resources/static/agenth5/assets/*.js` 与 `swagger-openapi.json`
   - 这两处更适合通过“找到 agenth5 上游源码并重建产物 / 重新导出 OpenAPI 契约”来完成最终收口，而不是直接手改生成文件

仍未完成或仍需确认的部分：

- `slaNonInterrupting` 目前仍主要停留在 BPMN boundary timer 的 `cancelActivity` 语义，尚未进入 SLA record / monitor 的统一策略模型
- `WEIGHTED_RANDOM` / `FASTEST_RESPONSE` / `BROADCAST` / `LLM` 仍未实现真实策略（`applyStrategy()` switch 中落于 `default → candidates.get(0).getUid()`，而非文义上的随机/广播/LLM 分配）
- 已实现的分配策略：`ROUND_ROBIN`、`LEAST_ACTIVE`、`RANDOM`、`CONSISTENT_HASH`、`RECENT`（共 5 个）
- `TicketBasicSettingsEntity.assignmentMode` 数据库列默认值为 `MANUAL`，但 `TicketAssignmentService` 与 `TicketThreadRoutingStrategy` 在 settings 缺失/未配置时会 fallback 到 `ROUND_ROBIN`——这意味着**未显式配置分配策略的组织默认启用轮询自动分配**
- 静态 BPMN 中 `customerVerify` 节点未绑定 `ticketTaskListener`，因此该节点不会在任务激活时创建节点级 SLA record
- 旧入口虽然仍对外保留兼容，但源码层前端主要调用方已完成清理，`TicketController` 已补弃用声明并从 OpenAPI 暴露面隐藏；剩余工作转为第三方/文档/API 最终收口，以及生成物重建
- 规划文档以下章节已按当前代码状态修正，但保留了“剩余改造项”以供继续迭代

## 一、背景

在 bytedesk 工单系统中，**分配策略** 和 **SLA 设置** 在两个层级同时存在，但当前代码里这两套配置并没有完全打通：

| 设置项 | 全局（TicketSettings） | 节点级（ProcessEntity.flowgramSchema） |
| --- | --- | --- |
| **分配策略** | `TicketBasicSettingsEntity.assignmentMode` | PropertyDrawer 中 `assigneeType` + `assignmentMode` |
| **SLA 时限** | `TicketSlaSettingsEntity.rules` (按优先级 × 类别匹配) | PropertyDrawer 中 `slaType` + `slaDurationMinutes` + `slaNonInterrupting` |

本文档分为三层内容：

1. **当前真实行为**：以现有代码为准，不把设计意图当作已实现行为。
2. **问题与缺口**：指出前后端配置、运行时逻辑、数据模型之间的不一致。
3. **实施状态与剩余路径**：哪些内容已经落地，哪些还需要继续推进。

---

## 二、现状分析

### 2.1 分配策略：当前实际有两条链路

当前需要明确区分两条不同链路，否则后续实现很容易把“工单处理人分配”和“会话接待客服分配”混为一谈：

1. **工作流任务分配链路**
   - 入口：`TicketEventListener.handleTicketCreateEvent()`、`TicketService.completeWorkflowTask()`
   - 核心服务：`TicketAssignmentService`
   - 作用对象：`TicketEntity.assignee` + Flowable 当前 `Task.assignee`

2. **工单会话接待分配链路**
   - 入口：`TicketThreadRoutingStrategy.handleTicketThreadNew()`
   - 核心服务：`WorkgroupRoutingService.selectAgent(...)`
   - 作用对象：`ThreadEntity.agent`，并在成功时回写 `TicketEntity.assignee`

这两条链路都读取 `TicketBasicSettingsEntity.assignmentMode`，但候选池、默认值、触发时机都不完全相同。

#### 2.1.1 当前实现

```text
工作流任务分配：

TicketEventListener (工单创建) / TicketService.completeWorkflowTask (任务完成后)
   └─ ticketAssignmentService.autoAssign(ticket, processInstanceId)
          ├─ Level 1: resolveFromWorkflowNode(ticket, taskDefinitionKey)
          │      读取 flowgramSchema JSON → node.data.assigneeType
          │      ├─ "user"       → resolveSpecificUser(assigneeUids)
          │      ├─ "department" → resolveDepartmentMemberWithStrategy(deptUid, nodeAssignmentMode)
          │      ├─ "role"       → resolveRoleMember(roleUid, nodeAssignmentMode)
          │      ├─ "reporter"   → resolveReporter()
          │      └─ "leader"     → resolveLeader()
          │      成功 → 设置 assignee
          │      失败 → 进入 Level 2
          └─ Level 2: resolveByStrategy(ticket)
                     读取 TicketBasicSettingsEntity.assignmentMode
                     从 ticket.departmentUid 的成员池中按策略选人

工单会话接待分配：

TicketThreadRoutingStrategy.handleTicketThreadNew
   └─ ensureThreadAgentAssigned(thread, ticket)
          ├─ 读取 TicketBasicSettingsEntity.assignmentMode
          ├─ 调用 workgroupRoutingService.selectAgent(workgroup, thread, assignmentMode)
          └─ 成功后写入 ThreadEntity.agent，并尝试同步 TicketEntity.assignee/status
```

补充说明：

- PropertyDrawer 当前前端暴露的 `assigneeType` 只有 `user`、`department`、`reporter` 三种。
- 后端 `TicketAssignmentService.resolveFromWorkflowNode()` 还支持 `role`、`leader`，但这两种当前不是现行 UI 主路径。
- 前端 schema 规范化逻辑会把旧版 `role + ${departmentUid}` 收敛成 `department`；其余旧的 `role/leader` 值会被前端回退显示为 `user`，避免表单出现无效选项。

#### 2.1.2 发现的问题

| # | 问题 | 位置 | 严重度 |
| --- | ------ | ------ | -------- |
| 1 | **默认值已统一**：`TicketAssignmentService.getAssignmentMode()` 与 `TicketThreadRoutingStrategy.getTicketAssignmentMode()` 均已统一 fallback 到 `ROUND_ROBIN`（均引用 `TicketAssignmentModeEnum.DEFAULT`）。注意：`TicketBasicSettingsEntity.assignmentMode` 数据库列默认值为 `MANUAL`，但服务层在 settings 缺失/未配置时回退到 `ROUND_ROBIN` | `TicketAssignmentService.java:66` / `TicketThreadRoutingStrategy.java:86` / `TicketBasicSettingsEntity.java:62` | 已修复 |
| 2 | **节点级 `assignmentMode` 为空时已正确继承全局**：`resolveDepartmentMemberWithStrategy` 与 `resolveRoleMember` 在节点 `assignmentMode` 为空时均调用 `getAssignmentMode(ticket)`，从 `TicketBasicSettingsEntity.assignmentMode`（或服务层 `ROUND_ROBIN` 回退）读取全局策略 | `TicketAssignmentService.java:307, 346` | 已修复 |
| 3 | **全局 fallback 候选池仅限部门成员**：`getCandidates()` 只按 `ticket.departmentUid` 查成员，如果工单没有部门，候选池为空 | `TicketAssignmentService.java:117-124` | 🟡 中 |
| 4 | **前后端节点语义不完全对齐**：前端主路径只支持 `user/department/reporter`，后端还支持 `role/leader`，会导致旧流程可运行但在可视化编辑器里不能被稳定表达 | `PropertyDrawer.tsx` / `config/schema.ts` / `TicketAssignmentService.java` | 🟡 中 |
| 5 | **前端审批人字段存在 UID/名称落差**：PropertyDrawer 当前编辑的是 `assigneeNames`，但 BPMN 转换和后端节点解析主要消费 `assigneeUids`，如果没有额外选择器或映射逻辑，指定用户分配可能只保存了名称而没有可执行 UID | `PropertyDrawer.tsx` / `config/schema.ts` | 🟡 中 |
| 6 | **`WEIGHTED_RANDOM`/`FASTEST_RESPONSE`/`BROADCAST`/`LLM` 四种模式已声明但未实现真实策略**，目前会落到 `applyStrategy()` 的默认分支，行为更接近“取候选列表第一个”，不是文义上的 `ROUND_ROBIN` | `TicketAssignmentModeEnum.java` / `TicketAssignmentService.applyStrategy()` | 🟢 低 |
| 7 | **旧版非工作流方法 (`claimTicket`/`transferTicket`/`resolveTicket` 等) 仍对外暴露**，虽然关键 SLA / 日志 / 变量行为已补齐，且前端源码层主要调用方已清理、Controller 已补 `@Deprecated` 并从 OpenAPI 隐藏，但第三方/历史集成调用方仍待继续盘点，`agenth5` 静态产物与 `swagger-openapi.json` 也仍待重建 | `TicketController.java` / `TicketService.java:1061-1850` | 🟡 中 |

### 2.2 SLA 设置：BPMN 定时器部分生效，但持久化 SLA 未节点级化

#### 2.2.1 当前实现

```text
初始化：

TicketEventListener.handleTicketCreateEvent
   ├─ ticketSLAService.buildProcessVariables(ticket)
   │    └─ 仅根据 TicketSlaSettingsEntity.rules / fallback 生成 4 组 ISO Duration 流程变量
   └─ ticketSLAService.initializeSlaRecords(ticket)
          ├─ 创建 CLAIM / FIRST_RESPONSE / RESOLUTION 三条 SLA 记录
          ├─ resolveDurationMinutes(ticket, slaType)
          │    ├─ 1. 读取 TicketSlaSettingsEntity.rules
          │    │     按 slaType + priority + categoryUid 精确匹配
          │    └─ 2. Fallback: 按优先级硬编码默认值
          └─ 计算 dueAt（支持工作时间/节假日）

运行期：

TicketSLAService 各场景:
   - 认领 (completeClaim)                         → 完成 CLAIM record
   - 首次回复 (completeFirstResponse)             → 完成 FIRST_RESPONSE record
   - 解决 (completeResolution)                    → 完成 RESOLUTION record
   - 客户验证 (startCustomerVerify / completeCustomerVerify) → CUSTOMER_VERIFY
   - 挂起/恢复 (pauseOpenRecords / resumePausedRecords)       → 所有 RUNNING record 暂停/恢复

定时监控：

TicketSlaMonitorTask (@Scheduled, 默认 60s)
   ├─ markBreachedDueRecords()
   ├─ markWarningRecords()
   └─ autoCloseBreachedCustomerVerifyRecords()

BPMN 部署方式：

ProcessRestService.deployProcess(processUid)
   ├─ 读取 ProcessEntity.schema（BPMN 20 XML 字符串，由前端 TicketBuilder 可视化编辑器产出并保存）
   ├─ 重写 BPMN <process id> 为运行时可用的 processDefinitionKey
   └─ 直接部署到 Flowable 引擎（不经过 flowgramSchema → BPMN 的 Java 转换）

运行时节点元数据读取：

TicketAssignmentService.resolveFromWorkflowNode / TicketSLAService.ensureNodeSlaRecord
   ├─ 解析 ProcessEntity.flowgramSchema（flowgram.ai JSON，仅用于读取节点级 assigneeType / assignmentMode / slaDurationMinutes / slaType）
   └─ 不生成 BPMN XML
```

因此，节点级 SLA 的 boundary timer 效果取决于前端编辑器在 BPMN XML 中是否生成了对应节点上的 timer 定义；后端不会在部署时为节点自动注入 SLA timer。当前缺口主要在 **SLA record 持久化、统计、告警、升级与节点实例之间没有一一对应关系**。

#### 2.2.2 发现的问题

| # | 问题 | 位置 | 严重度 |
| --- | ------ | ------ | -------- |
| 1 | **节点级 SLA 只在 BPMN timer 层部分生效**：前端 TicketBuilder 编辑器可在节点上配置 `slaType`/`slaDurationMinutes`/`slaNonInterrupting`（影响生成的 BPMN XML 中的 boundary timer），后端 `TicketSLAService.resolveDurationMinutes()` 不读取 `flowgramSchema`（节点 SLA 由 `TicketTaskListener` 在任务 create 时通过 `ensureNodeSlaRecord` 单独创建 NODE record，读取 flowgramSchema 中的节点配置） | `config/schema.ts` / `TicketSLAService.java:682-701` | 已部分修复：显式节点时长已创建 NODE record |
| 2 | **当前 SLA 记录模型是“工单级 SLA 类型”而不是“节点实例级 SLA”**：`TicketSlaRecordEntity` 只记录 `ticketUid/processInstanceId/slaType/priority/categoryUid/durationMinutes`，没有 `taskDefinitionKey`、`taskId`、`nodeId`，因此节点级 SLA 不能仅靠“给 initializeSlaRecords 传 taskDefinitionKey”落地 | `TicketSlaRecordEntity` / `TicketSLAService.createRecord()` | 已修复（已新增 `slaSource/taskId/taskDefinitionKey`） |
| 3 | **BPMN timer 与 SLA record 可能出现口径不一致**：节点配置 `slaDurationMinutes=30` 时，Flowable timer 可能按 30 分钟触发，但 SLA record 的 `dueAt/durationMinutes` 仍可能来自全局规则 | `config/schema.ts` / `TicketSLAService.java` | 已部分修复：显式节点时长口径已对齐，`slaDurationMinutes=0` 仍走全局 |
| 4 | **`slaNonInterrupting` 只影响 BPMN boundary timer 的 cancelActivity**：当前它不会进入 `TicketSlaRecordEntity`，也不会影响 `TicketSlaMonitorTask` 的告警、升级和自动关闭逻辑 | `config/schema.ts` / `TicketSlaMonitorTask.java` / `TicketSLAService.java` | 🟡 中 |
| 5 | **静态 BPMN 中 `customerVerify` 未绑定 `ticketTaskListener`**：`waitClaim` 与 `processTicket` 已绑定 `ticketTaskListener`（create/assignment/complete/delete），但 `customerVerify` 仅有 `executionListener`（end 事件），不会在任务激活时创建节点 SLA record。通过前端编辑器新建的流程，taskListener 绑定取决于编辑器输出，后端部署时不自动注入 | `ticket-process.bpmn20.xml` / `TicketTaskListener.java` | 🟡 中（静态流程的 customerVerify 监听仍缺） |
| 6 | **SLA 升级转派不经过分配策略**：当 SLA 超时触发 `autoEscalateEnabled` 时，后端直接把当前活动任务和 `ticket.assignee` 设为 `escalateAssigneeUid`，不会进入 `TicketAssignmentService` | `TicketSLAService.escalateIfEnabled()` | 🟢 低 |
| 7 | **旧版非工作流方法仍不调用 SLA 服务**：与工作流动作接口并存，可能导致相同业务在不同入口下 SLA 记录不一致 | `TicketController.java` / `TicketService.java:1061-1850` | 已部分修复：关键生命周期已补齐，仍待入口收口 |

---

## 三、目标设计

### 3.1 分配策略优先级（建议实现）

```text
分配策略优先级（从高到低）：

1. 流程节点级 — node.data.assigneeType + node.data.assignmentMode
   - assigneeType="user"       → 直接指定成员（忽略 assignmentMode）
   - assigneeType="department" → 按节点 assignmentMode 从部门成员池选人
   - assigneeType="reporter"   → 使用工单上报人
   - assigneeType="role"       → 作为兼容能力保留，需明确是否继续开放到前端
   - assigneeType="leader"     → 作为兼容能力保留，需明确是否继续开放到前端

2. 节点回退 — 当节点 assignmentMode 为空或为 "INHERIT" 时
   → 读取 TicketBasicSettingsEntity.assignmentMode（全局分配策略）
   → 从 ticket.departmentUid 成员池中按全局策略选人

3. 全局回退 — 当全局 assignmentMode 为 MANUAL 时
   → 不自动分配，等待人工认领

4. 会话接待链路与工作流链路的关系
   → 本次建议先统一“默认值与语义”，但不强行合并两条实现链
   → `TicketThreadRoutingStrategy` 仍然面向 `ThreadEntity.agent` 的客服接待分配
   → `TicketAssignmentService` 仍然面向 Flowable `Task.assignee` / `TicketEntity.assignee`
```

### 3.2 SLA 优先级（建议实现）

```text
SLA 时限优先级（从高到低）：

1. 流程节点级 — node.data.slaDurationMinutes > 0
   → 使用节点配置的时长
   → 节点未配置 slaType 时，根据当前任务阶段自动匹配 SLA 类型
   → 前提：SLA 记录模型需能标识具体节点/任务实例

2. 全局规则级 — TicketSlaSettingsEntity.rules
   → 按 slaType + priority + categoryUid 精确匹配
   → 规则中的 warningMinutes 优先于全局 warningPercent

3. 系统默认值 — 硬编码 fallback
   → RESOLUTION: CRITICAL=60m, URGENT=120m, HIGH=240m, MEDIUM=480m, LOW=1440m
   → 其他类型:      CRITICAL=30m, URGENT=60m,  HIGH=120m, MEDIUM=240m, LOW=480m
```

### 3.3 节点级 SLA 的当前落地方式与后续方向

节点级 SLA 不建议直接复用当前“工单级 CLAIM/FIRST_RESPONSE/RESOLUTION/CUSTOMER_VERIFY 三条固定记录”模型硬塞进去，否则会产生语义冲突：

- 一个工单可能经过多个人工节点，但当前只会有一条 `RESOLUTION` 记录。
- 节点级 SLA 更接近“任务实例级 SLA”，需要知道对应 `taskDefinitionKey`、`taskId`、`nodeId`。
- `slaType` 既可能表示全局业务指标，也可能表示节点局部约束，二者不能继续混用而不区分来源。

当前代码已经完成第一轮落地，不再只是“建议”：

1. **已落地：引入最小任务实例级 SLA 记录能力**
   - `TicketSlaRecordEntity` 已增加 `slaSource(GLOBAL/NODE)`、`taskId`、`taskDefinitionKey`
   - 在 userTask `create` 时创建节点 record，在 `complete/delete` 时完成或取消 record
   - 在 `hold/resume` 时，节点 SLA 仅作用于当前仍活跃的任务记录
   - 在取消/撤销工单时，GLOBAL 与 NODE 的打开中/暂停中记录都会被统一取消

2. **仍待继续：把节点 SLA 进一步升级为完整策略模型**
   - 如需支持 `timeoutAction`、节点升级转派、节点级非中断告警，需要继续扩展 record/monitor 语义
   - 如需更强表达能力，可继续增加 `nodeType`、`timeoutAction`、`slaNonInterrupting` 等字段或独立表
   - 当前实现已经够支撑“显式节点时长 + 生命周期记录 + 前端可见”，但还不是最终策略平台

### 3.4 节点级 SLA 超时行为（建议）

节点级 SLA 超时后的行为，建议在“任务实例级 SLA”模型建立后再启用：

```text
当 node.data.slaDurationMinutes 配置的节点超时：
   - slaNonInterrupting = false (默认) → 自动流转到既定超时分支，或执行显式 timeoutAction
   - slaNonInterrupting = true        → 仅发送告警通知，不中断任务
   - 若启用升级 → 优先明确是“按节点 timeoutAction 升级”还是“沿用全局 escalateAssigneeUid”

注意：

- 不建议直接 `taskService.complete()` 作为通用超时处理，因为这会绕过很多业务动作语义。
- 更稳妥的做法是把超时行为建模为明确策略：`remind` / `escalate` / `skip` / `routeToNode`。
```

---

## 四、实施规划

### 阶段 A：先校正分配策略语义与默认值 🔴 高优先级

**文件**:

- `modules/ticket/.../assignment/TicketAssignmentService.java`
- `modules/ticket/.../routing_strategy/TicketThreadRoutingStrategy.java`

**改动**:

1. **统一默认值**：
   - `TicketAssignmentService.getAssignmentMode()` 与 `TicketThreadRoutingStrategy.getTicketAssignmentMode()` 统一到同一常量
   - 默认值是否取 `ROUND_ROBIN` 需要按业务确认；当前文档建议与会话接待链路对齐为 `ROUND_ROBIN`

2. **节点 assignmentMode 为空时真正"继承全局"**：
   - `resolveDepartmentMemberWithStrategy`: 当 `nodeAssignmentMode` 为空时，调用 `getAssignmentMode(ticket)` 获取全局策略
   - `resolveRoleMember`: 同上

3. **补齐文档化边界**：
   - 明确 `user/department/reporter` 是当前前端支持主路径
   - 明确 `role/leader` 是兼容能力还是继续演进能力

4. **统一默认常量**：

   ```java
   public static final String DEFAULT_ASSIGNMENT_MODE = "ROUND_ROBIN";
   ```

**预计工时**: 0.5d

---

### 阶段 B：先收敛 SLA 语义，明确 BPMN timer 与 record 边界 🔴 高优先级

**状态**: 已完成，且已超出原阶段目标

**文件**:

- `modules/ticket/.../ticket/TicketSLAService.java`
- `modules/ticket/.../ticket/TicketEventListener.java`
- `frontend/apps/workflow/.../PropertyDrawer.tsx`

**改动**:

1. **明确现阶段生效来源**：
   - 前端 TicketBuilder 编辑器在 BPMN XML 中为节点生成的 boundary timer 会消费 `slaType` / `slaDurationMinutes` / `slaNonInterrupting`
   - `TicketSLAService` 持久化 record 继续仅以 `TicketSlaSettingsEntity.rules` + fallback 为生效来源
   - 前端说明 `slaDurationMinutes=0` 表示 timer 沿用全局流程变量，但不会创建节点级 SLA record

2. **补充诊断/文档注释**：
   - 在规划和代码注释里区分“工单级 SLA”与“节点级 SLA 预留字段”
   - 避免后续维护者误以为已有节点级 SLA 完整链路

3. **保留向后兼容**：
   - `TicketSlaMonitorTask` 仍继续复用，没有新增并行调度器
   - 前端编辑器现有 boundary timer 生成逻辑保留
   - 实际实现中已经进一步扩展了 `TicketSlaRecordEntity` 表结构，以支撑最小节点级 record 闭环

**预计工时**: 0.5d

---

### 阶段 C：设计并落地任务实例级 SLA 模型 🟡 中优先级

**状态**: 已完成第一轮落地

**文件**:

- `modules/ticket/.../ticket_sla_record/*`
- `modules/ticket/.../ticket/TicketSLAService.java`
- `modules/ticket/.../ticket/TicketEventListener.java`
- `frontend/apps/workflow/.../PropertyDrawer.tsx`

**改动**:

1. **扩展 SLA record 模型**，至少满足以下能力：
   - 能识别对应的 `taskDefinitionKey` / `taskId` / `nodeType`
   - 能区分 `slaSource=GLOBAL` 与 `slaSource=NODE`
   - 能兼容现有工单级 `CLAIM/FIRST_RESPONSE/RESOLUTION/CUSTOMER_VERIFY`

2. **在任务激活时创建节点级记录**：
   - 已采用 `TicketTaskListener`（绑定在 BPMN userTask 的 create/complete/delete 事件上）的方案
   - 静态 `ticket-process.bpmn20.xml` 中 `waitClaim` 与 `processTicket` 已绑定；`customerVerify` 尚未绑定
   - 当前在 userTask `create` 时按节点 `flowgramSchema` 中的 `slaDurationMinutes` 创建 NODE record，在 `complete/delete` 时驱动状态收口

3. **在定时任务中消费节点级超时策略**：
   - 当前已经复用现有 `TicketSlaMonitorTask`
   - 当前已支持节点 record 的 warning / breach 基本收口，但 `slaNonInterrupting` / `timeoutAction` 仍未进入统一策略

4. **前端和后端字段对齐**：
   - `slaType`、`slaDurationMinutes` 的最小运行语义已打通（通过 `TicketTaskListener.ensureNodeSlaRecord` 读取 flowgramSchema）
   - 静态 BPMN 中 `waitClaim`/`processTicket` 的 taskListener 已补齐，`customerVerify` 仍待补齐
   - `timeoutAction` 等更强节点策略仍待后续明确

**预计工时**: 1.5d

---

### 阶段 D：清理双入口，降低行为分叉 🟡 中优先级

**状态**: 已完成关键行为补齐与源码层主调用方收口，未完成生成物和外部调用方最终收口

**文件**:

- `modules/ticket/.../ticket/TicketService.java`

**改动**:

1. 盘点旧版 `claimTicket`/`transferTicket`/`resolveTicket` 等接口真实调用方：
   - 前端页面层与主要 API 封装层已完成清理，当前主链路已迁到 `workflow/actions` + `workflow/action`
   - 仍需确认第三方接入、文档示例、脚本或历史客户端是否仍直连旧端点
   - 当前仓库内残留的显式旧动作 URL 已缩小到 `agenth5` 构建产物与 `swagger-openapi.json`，需通过重建/重导出完成清理
   - 若仅历史兼容，则继续标记迁移路径并逐步收口到 `executeWorkflowAction`

2. 在旧版方法中，如决定继续保留：
   - 增加 SLA 记录完成调用（`ticketSLAService.completeClaim` 等）
   - 增加 assignment log 记录（`ticketAssignmentService.writeManualAssignmentLog`）

3. 已完成：`TicketController` 旧动作端点已标记 `@Deprecated`，补充迁移说明，并从 OpenAPI 契约暴露面隐藏；后续目标是决定最终下线窗口

**预计工时**: 0.5d

---

### 阶段 E：前端配置表达与后端语义对齐 🟢 低优先级

**状态**: 已部分完成

**文件**:

- `frontend/apps/workflow/src/pages/Dashboard/TicketBuilder/components/PropertyDrawer.tsx`

**改动**:

1. admin 工单详情与列表摘要已能区分节点 SLA / 全局 SLA
2. SLA 字段的配置提示、`slaDurationMinutes=0` 的 UI 表达、`slaNonInterrupting` 的产品文案仍待继续完善
3. `role/leader` 是否重新开放到 UI，仍需产品与实现共同确认
4. 审批人选择的 `assigneeNames/assigneeUids` 语义仍建议继续收敛

**预计工时**: 0.25d

---

## 五、实施顺序

| 顺序 | 阶段 | 依赖 | 预计工时 |
| ------ | ------ | ------ | ---------- |
| 1 | **阶段 A**：修正分配策略默认值与继承语义 | 无 | 已完成 |
| 2 | **阶段 D**：旧接口盘点（仅盘点调用方、标记迁移路径） | 阶段 A | 已完成前端源码层主调用方盘点与清理，生成物/外部调用方待继续 |
| 3 | **阶段 B**：先收敛 SLA timer 与 record 边界 | 无 | 已完成 |
| 4 | **阶段 C**：任务实例级 SLA 模型设计与落地 | 阶段 B | 已完成第一轮落地 |
| 5 | **阶段 D 实施**：补齐旧接口 SLA / assignment log 行为 | 阶段 A | 已完成关键项 |
| 6 | **阶段 E**：前端表达与后端语义最终对齐 | 阶段 C | 部分完成 |

**当前结论**: 运行时主链路已经可用，后续工作主要转为“文案/配置语义/旧入口外部调用方治理 + 生成物重建”的收尾阶段。

> 阶段 D 拆为两段：第一段只做调用方盘点（放在阶段 A 之后、B 之前），第二段补齐旧接口行为（可并行于阶段 C 或在其后执行）。拆分依据见第七节。

---

## 六、风险与注意事项

1. **默认值统一会影响接待链路**：阶段 A 不是只改 workflow，还会影响 `TicketThreadRoutingStrategy` 的客服接待分配默认行为
2. **节点级 SLA 不能只靠方法签名修改**：真正落地需要先决定 record 模型是否扩展，否则会产生“一个 RESOLUTION 记录代表多个节点”的语义冲突
3. **BPMN timer 与 SLA record 仍有一个保留差异**：当节点 `slaDurationMinutes=0` 且仅配置 `slaType` 时，timer 仍沿用全局流程变量，`TicketTaskListener` 当前不会为 `slaDurationMinutes=0` 的节点创建 NODE record
4. **SLA 定时任务已存在**：阶段 C 应优先复用 `TicketSlaMonitorTask`，不要重复新增并行调度器
5. **flowgramSchema 解析复用**：`loadFlowgramSchema` / `findFlowgramNode` 已在 `TicketService` 中存在，可抽到共享工具类，避免 `TicketAssignmentService`、`TicketSLAService` 重复实现
6. **测试覆盖**：每个阶段需补充单元测试，尤其是默认值一致性、节点继承语义、BPMN timer 生成、旧接口兼容和 SLA record 状态迁移
7. **旧接口仍对外暴露**：前端源码层主调用方已基本收口，但若不继续盘点第三方/历史客户端，并同步重建 `agenth5` bundle 与 `swagger-openapi.json`，仍可能出现“同一业务从旧入口走出另一套结果”或“契约/产物仍指向旧接口”
8. **历史已部署流程定义不会自动带上新监听器**：静态 `ticket-process.bpmn20.xml` 的 `waitClaim`/`processTicket` 已具备 `create/assignment/complete/delete` 监听，`customerVerify` 尚未绑定；通过前端编辑器新建的流程其监听器取决于编辑器输出；存量部署定义如需节点 SLA 能力，需重新编辑并部署流程

---

## 七、后续建议顺序

在当前代码基础上，后续更适合按“收尾与治理”顺序继续推进：

1. 先做 **阶段 D 的外部盘点部分**，确认还有哪些第三方接入、历史客户端、脚本或文档示例仍在走旧版 `claimTicket` / `startTicket` / `transferTicket` / `resolveTicket`，并定位 `agenth5` 上游源码以便重建静态产物。
2. 再做 **阶段 E 的剩余项**，把配置文案、`slaDurationMinutes=0` 的前端表达、`slaNonInterrupting` 说明补齐。
3. 然后视业务需要决定是否继续扩展 **节点超时策略模型**，把 `timeoutAction` / 非中断告警 / 节点升级转派纳入统一实现。
4. 然后补做 **契约与静态产物重建**，重新导出 `swagger-openapi.json` 并清理 `agenth5` 产物中的旧动作 URL。
5. 最后评估 **历史流程定义重部署与 customerVerify 监听补齐**，确保 task listener 覆盖静态流程的全部 userTask，并通过前端编辑器重新部署线上需要的流程版本。

---

> 本文档已根据 2026-07-29 当日实际代码改造结果更新，可作为后续收尾工作的基线。
