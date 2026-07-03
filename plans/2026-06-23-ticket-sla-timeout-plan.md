# 工单 SLA 超时处理完整规划

## 1. 背景与目标

当前工单模块已经具备 Flowable BPMN 流程、TicketBuilder 可视化流程编辑、工单通知、邮件/短信/APNs 推送、工单统计等基础能力。但 SLA 超时处理仍不完整：SLA 时限分散在多个地方硬编码，BPMN 默认流程没有接入真实超时定时器，现有 Delegate 多数只记录日志或修改流程变量，缺少落库、通知、统计、可视化配置与运行态追踪。

本规划目标是建设一套可配置、可追踪、可统计、可扩展的工单 SLA 超时处理体系，覆盖新工单待领取、首次响应、解决时限、客户确认/补充信息超时等核心场景，并与 TicketBuilder 流程编排能力、TicketSettings 发布机制、通知体系和统计体系保持一致。

## 2. 当前问题

### 2.1 SLA 时限来源不统一

当前 SLA 逻辑至少分散在三处：

- `TicketEventListener` 根据优先级硬编码 `slaTime`。
- `TicketSLAService` 通过 DMN 决策表查询 SLA。
- `enterprise/ticket` 中的统计服务按优先级硬编码判断是否达标。

这些值并不完全一致，导致创建工单、运行时判断、统计结果可能出现口径不一致。

### 2.2 BPMN 默认流程未真正接入 SLA

默认 `ticket-process.bpmn20.xml` 当前主流程大致为：

```text
start -> createTicket -> waitClaim -> processTicket -> customerVerify -> verifyGateway -> end/loop
```

但关键任务节点没有挂载 SLA boundary timer，也没有近超时预警 timer。现有 `TicketSLATimeoutNotificationDelegate`、`TicketEscalateDelegate` 等类存在，但未形成完整运行闭环。

### 2.3 Delegate 未完成业务落库与通知

当前部分 Delegate 的问题：

- 只写日志，不发送通知。
- 只修改流程变量，不更新 `TicketEntity`。
- 修改了内存对象但未持久化。
- 未考虑重复触发、服务重启、Flowable job 重试时的幂等问题。

### 2.4 缺少 SLA 运行态记录

只依赖 Flowable 流程变量无法满足以下需求：

- 工单列表展示剩余时间。
- 按 SLA 状态筛选：正常、即将超时、已超时、暂停中。
- 工单详情展示 SLA 时间线。
- 统计首响达标率、解决达标率、超时数量。
- 排查某个工单为什么超时、什么时候暂停、何时恢复。

### 2.5 TicketBuilder 与 TicketSettings 职责需要明确

SLA 既是业务配置，也是流程运行能力。若只存在 TicketBuilder 的 `flowgramSchema` 中，后台设置、统计和运行态会不稳定。需要明确：

- `TicketSettings` 管业务级 SLA 配置。
- `TicketBuilder` 管流程可视化、节点级覆盖配置和 BPMN timer 生成。
- `TicketSlaRecord` 管每张工单实际 SLA 运行状态。

## 3. 设计原则

1. SLA 配置统一入口，运行时和统计口径一致。
2. TicketSettings 是业务配置源，TicketBuilder 是流程编排与可视化入口。
3. 每张工单必须有可查询、可统计的 SLA 运行记录。
4. BPMN timer 负责触发时点，业务服务负责状态变更、通知、统计数据落点。
5. Delegate 必须幂等，允许 Flowable job 重试、服务重启和重复消息。
6. SLA 支持暂停、恢复、完成、取消、重开策略。
7. 近超时和已超时分开处理，分别触发不同事件与通知。
8. 自动关闭只应用于适合自动关闭的阶段，例如等待客户确认或补充信息，不默认用于处理超时。
9. 第一阶段优先打通后端闭环，再逐步完善 TicketBuilder 和 Admin 的完整可视化配置。

## 4. SLA 类型范围

建议将 SLA 拆分为四类，而不是只做一个解决时限。

### 4.1 待领取 SLA

用于处理新工单创建后无人领取或无人分配的问题。

典型规则：

- 新工单创建后 10 分钟没人领取，触发即将超时或超时通知。
- 超时后通知运维、部门主管、工作组负责人。
- 可选动作：自动转派到兜底工作组、自动升级优先级。

### 4.2 首次响应 SLA

用于衡量客服领取或分配后，多久必须首次回复客户。

典型规则：

- 工单进入处理状态后开始计时。
- 客服第一次对访客发送回复时完成首响 SLA。
- 机器人回复是否算首响需要配置，默认人工客服回复才算首响。

### 4.3 解决 SLA

用于衡量工单从创建或进入处理后，多久必须解决。

典型规则：

- 以工单创建时间或领取时间作为开始点，可配置。
- 状态进入 `RESOLVED` / `CLOSED` 时完成。
- 等待客户补充时可暂停。

### 4.4 客户确认/补充 SLA

用于等待客户确认处理结果或补充信息的场景。

典型规则：

- 进入 `PENDING_CUSTOMER` 或 `CUSTOMER_VERIFY` 后开始计时。
- 客户回复后完成或恢复处理 SLA。
- 超时后可发送提醒，超过一定时间可自动关闭。

## 5. SLA 生命周期

SLA 运行态应支持以下状态：

```text
RUNNING -> WARNED -> BREACHED -> COMPLETED
   |         |          |
   v         v          v
 PAUSED    CANCELED   CANCELED
```

### 5.1 开始

常见开始点：

- 工单创建：启动待领取 SLA、解决 SLA。
- 工单领取/分配：启动首次响应 SLA。
- 进入处理节点：启动节点级 SLA。
- 进入客户确认节点：启动客户确认 SLA。

### 5.2 暂停

以下状态可暂停部分 SLA：

- 等待客户回复。
- 等待客户确认。
- 等待第三方系统或外部部门处理。
- 工单挂起。

是否暂停、暂停哪些 SLA，应由 SLA 设置控制。

### 5.3 恢复

以下事件可恢复 SLA：

- 客户回复。
- 工单重新进入处理节点。
- 取消挂起。
- 第三方处理完成。

恢复时需要扣除已暂停时长，重新计算剩余时间和下一次 warning/breach timer。

### 5.4 完成

以下事件可完成对应 SLA：

- 工单被领取：完成待领取 SLA。
- 客服首次回复：完成首次响应 SLA。
- 工单解决或关闭：完成解决 SLA。
- 客户确认或回复：完成客户确认 SLA。

### 5.5 取消

工单取消、流程终止、流程重置时，未完成 SLA 应标记为取消，避免 timer 后续误触发。

### 5.6 重开

工单重开时建议提供配置：

- 不重新计算 SLA，仅记录重开事件。
- 重新启动解决 SLA。
- 重新启动首次响应 SLA 与解决 SLA。
- 使用独立 reopen SLA 规则。

第一阶段建议：重开后重新启动解决 SLA，不重算已完成首响 SLA。

## 6. 核心领域模型

### 6.1 TicketSlaSettingsEntity

用于保存组织或工单设置下的 SLA 总体配置。

建议字段：

```text
uid
name
description
enabled
businessHoursEnabled
holidayCalendarUid
pauseWhenPendingCustomer
pauseWhenPendingExternal
reopenPolicy
defaultWarnBeforeMinutes
defaultWarnPercent
notifyAssigneeEnabled
notifyWorkgroupEnabled
notifyDepartmentManagerEnabled
notifyOpsEnabled
autoEscalateEnabled
autoCloseCustomerPendingEnabled
orgUid
createdAt
updatedAt
```

说明：

- `businessHoursEnabled` 后续可结合工作时间、节假日排除非工作时段。
- `defaultWarnBeforeMinutes` 与 `defaultWarnPercent` 二选一或同时支持，实际取更早触发点。
- `autoCloseCustomerPendingEnabled` 仅用于等待客户确认/补充，不建议默认用于处理超时。

### 6.2 TicketSlaRuleEntity

用于保存不同优先级、分类、部门、工作组下的具体时限规则。

建议字段：

```text
uid
settingsUid
ticketType
categoryUid
departmentUid
workgroupUid
priority
claimDuration
firstResponseDuration
resolutionDuration
customerVerifyDuration
warnBeforeMinutes
warnPercent
enabled
sortOrder
orgUid
```

匹配优先级建议：

```text
工单类型 + 分类 + 部门 + 工作组 + 优先级
工单类型 + 分类 + 优先级
工单类型 + 部门 + 优先级
工单类型 + 工作组 + 优先级
工单类型 + 优先级
默认规则
```

第一阶段可先实现按工单类型 + 优先级匹配，预留分类、部门、工作组字段。

### 6.3 TicketSlaRecordEntity

用于保存每张工单每类 SLA 的实际运行记录。

建议字段：

```text
uid
ticketUid
ticketNumber
slaType
slaRuleUid
status
startedAt
dueAt
warnAt
pausedAt
pausedDurationSeconds
warnedAt
breachedAt
completedAt
canceledAt
breachReason
pauseReason
completeReason
processInstanceId
processDefinitionId
executionId
timerJobId
idempotencyKey
orgUid
```

`slaType` 建议值：

```text
CLAIM
FIRST_RESPONSE
RESOLUTION
CUSTOMER_VERIFY
CUSTOM_NODE
```

`status` 建议值：

```text
RUNNING
PAUSED
WARNED
BREACHED
COMPLETED
CANCELED
```

### 6.4 TicketSlaActionLogEntity

可选但建议增加，用于审计 SLA 动作执行结果。

建议字段：

```text
uid
slaRecordUid
ticketUid
actionType
actionStatus
requestPayload
responsePayload
errorMessage
createdAt
orgUid
```

`actionType` 示例：

```text
NOTIFY_ASSIGNEE
NOTIFY_MANAGER
NOTIFY_OPS
PUSH_SYSTEM_MESSAGE
ESCALATE_PRIORITY
TRANSFER_ASSIGNEE
TRANSFER_WORKGROUP
AUTO_CLOSE
```

## 7. TicketSettings 与发布机制

建议在 `TicketSettingsEntity` 中增加：

```text
slaSettings
draftSlaSettings
```

并与现有设置保持一致：

- 草稿态编辑 `draftSlaSettings`。
- 发布后复制到 `slaSettings`。
- 运行时使用已发布配置。
- 未发布修改不影响已有运行流程。

这样可以避免管理员编辑 SLA 后立即影响线上工单。

## 8. TicketSLAService 统一入口

`TicketSLAService` 应成为唯一 SLA 计算和运行态维护入口。

建议方法：

```java
TicketSlaSettingsEntity resolveSettings(TicketEntity ticket);
TicketSlaRuleEntity resolveRule(TicketEntity ticket, TicketSlaType slaType);
Duration resolveDuration(TicketEntity ticket, TicketSlaType slaType);
ZonedDateTime calculateDueAt(TicketEntity ticket, TicketSlaType slaType, ZonedDateTime startedAt);
ZonedDateTime calculateWarnAt(TicketSlaRuleEntity rule, ZonedDateTime startedAt, ZonedDateTime dueAt);

List<TicketSlaRecordEntity> createInitialRecords(TicketEntity ticket);
TicketSlaRecordEntity startSla(TicketEntity ticket, TicketSlaType slaType);
void pauseSla(String ticketUid, TicketSlaPauseReason reason);
void resumeSla(String ticketUid, TicketSlaResumeReason reason);
void completeSla(String ticketUid, TicketSlaType slaType, String reason);
void cancelSla(String ticketUid, String reason);
void markWarned(String ticketUid, TicketSlaType slaType);
void markBreached(String ticketUid, TicketSlaType slaType);
boolean isCompliant(TicketEntity ticket, TicketSlaType slaType);
```

需要替换的旧逻辑：

- `TicketEventListener` 中根据优先级硬编码 `slaTime`。
- `TicketSLAService` 内部 DMN 与硬编码混用逻辑。
- 企业版统计中硬编码 SLA 达标判断。

DMN 可保留为高级规则模式，但默认应从 `TicketSlaSettingsEntity` 与 `TicketSlaRuleEntity` 读取。

## 9. BPMN 设计

### 9.1 默认流程改造

默认 `ticket-process.bpmn20.xml` 建议改造成：

```text
start
  -> createTicket
  -> waitClaim
       |-- claimWarningTimer -> ticketSlaNearBreachDelegate
       |-- claimBreachTimer  -> ticketSlaBreachDelegate -> ticketSlaEscalateDelegate
  -> processTicket
       |-- firstResponseWarningTimer -> ticketSlaNearBreachDelegate
       |-- firstResponseBreachTimer  -> ticketSlaBreachDelegate
       |-- resolutionWarningTimer    -> ticketSlaNearBreachDelegate
       |-- resolutionBreachTimer     -> ticketSlaBreachDelegate -> ticketSlaEscalateDelegate
  -> customerVerify
       |-- customerVerifyWarningTimer -> ticketSlaNearBreachDelegate
       |-- customerVerifyBreachTimer  -> ticketSlaBreachDelegate -> ticketSlaAutoCloseDelegate(optional)
  -> verifyGateway
       |-- verified=true  -> end
       |-- verified=false -> processTicket
```

### 9.2 Timer 表达式

BPMN 中不建议直接写固定时间，应使用流程变量：

```xml
<flowable:timeDuration>${claimSlaWarningDuration}</flowable:timeDuration>
<flowable:timeDuration>${claimSlaBreachDuration}</flowable:timeDuration>
<flowable:timeDuration>${resolutionSlaWarningDuration}</flowable:timeDuration>
<flowable:timeDuration>${resolutionSlaBreachDuration}</flowable:timeDuration>
```

这些变量由 `TicketSLAService` 在流程启动、领取、进入节点时计算并写入。

### 9.3 Flowable Timer 与 SLA Record 的关系

Flowable timer 负责按时触发，`TicketSlaRecordEntity` 负责记录事实状态。

触发 Delegate 时必须重新查询 `TicketSlaRecordEntity`：

- 若已完成，则忽略。
- 若已取消，则忽略。
- 若已暂停，则忽略或重新调度。
- 若已处理过同类动作，则忽略。
- 若仍运行中，则执行 warning/breach 动作。

## 10. Delegate 规划

### 10.1 Delegate 列表

建议新增或重构以下 Delegate：

```text
TicketSlaStartDelegate
TicketSlaPauseDelegate
TicketSlaResumeDelegate
TicketSlaCompleteDelegate
TicketSlaNearBreachDelegate
TicketSlaBreachDelegate
TicketSlaEscalateDelegate
TicketSlaAutoCloseDelegate
```

### 10.2 Delegate 职责边界

每个 Delegate 只做三件事：

1. 根据 `ticketUid + slaType + actionType` 做幂等校验。
2. 调用 `TicketSLAService` 更新 SLA 记录和必要的工单状态。
3. 调用通知、动态、转派等业务服务执行动作。

不要在 Delegate 中散落复杂业务判断。

### 10.3 幂等键设计

建议幂等键格式：

```text
ticketUid:slaType:actionType:processInstanceId
```

例如：

```text
TK_UID_001:RESOLUTION:BREACH:PROC_INST_001
TK_UID_001:CLAIM:WARN:PROC_INST_001
```

可通过 `TicketSlaActionLogEntity` 或 `TicketSlaRecordEntity` 状态字段防重复。

## 11. 通知与工单动态

### 11.1 事件类型

建议新增 SLA 事件键：

```text
SLA_CLAIM_NEAR_BREACH
SLA_CLAIM_BREACHED
SLA_FIRST_RESPONSE_NEAR_BREACH
SLA_FIRST_RESPONSE_BREACHED
SLA_RESOLUTION_NEAR_BREACH
SLA_RESOLUTION_BREACHED
SLA_CUSTOMER_VERIFY_NEAR_BREACH
SLA_CUSTOMER_VERIFY_BREACHED
SLA_ESCALATED
SLA_AUTO_CLOSED
```

### 11.2 通知对象

不同事件通知不同对象：

- 待领取近超时：工作组在线客服、工作组负责人、运维。
- 待领取已超时：工作组负责人、部门主管、运维。
- 首响近超时：处理人、工作组负责人。
- 首响已超时：处理人、部门主管、运维。
- 解决近超时：处理人、协作者、主管。
- 解决已超时：主管、运维，可选通知客户。
- 客户确认超时：客户、处理人，可选自动关闭。

### 11.3 通知渠道

复用现有通知能力：

- 邮件：通过 `EmailPushSendService`。
- 短信：通过 `SmsPushSendService`。
- APNs：通过现有移动端推送服务。
- WebSocket/站内通知：用于客服端实时提醒。
- 工单会话系统消息：将状态变更、SLA 预警、SLA 超时作为系统消息插入会话记录。

### 11.4 模板变量

建议 SLA 邮件/短信模板支持变量：

```text
${ticketNumber}
${ticketTitle}
${priority}
${slaType}
${dueAt}
${remainingMinutes}
${assigneeName}
${workgroupName}
${departmentName}
${ticketUrl}
${orgName}
```

## 12. TicketBuilder 规划

### 12.1 TicketBuilder 的职责

TicketBuilder 负责：

- 可视化配置流程中的 SLA 触发点。
- 节点级覆盖 SLA 时限。
- 生成 BPMN timer boundary event。
- 展示节点是否启用 SLA。
- 部署前校验 SLA timer、Delegate、动作配置是否完整。

TicketBuilder 不应成为唯一 SLA 配置源。全局 SLA 规则仍应保存在 TicketSettings 中。

### 12.2 节点属性扩展

在节点属性中增加 SLA 配置：

```text
enableSla
slaType
slaDurationSource: GLOBAL | NODE_CUSTOM
customDuration
warnBeforeMinutes
warnPercent
onNearBreachActions
onBreachActions
pausePreviousSla
completeSlaTypes
```

### 12.3 新增可选节点类型

建议新增：

```text
slaTimer
slaWarning
slaEscalation
```

第一阶段也可以不新增独立节点，只在现有任务节点属性中配置 SLA。后续再做独立 SLA 节点，降低第一阶段复杂度。

### 12.4 画布展示

可视化建议：

- 启用 SLA 的节点显示时钟角标。
- 节点下方展示 SLA 类型和时限，例如 `解决 SLA: 8h`。
- 近超时与已超时动作在属性面板中配置。
- 保存前展示流程级 SLA 校验结果。

### 12.5 FlowGram 到 BPMN 转换

转换器需要支持：

- 根据节点 SLA 属性生成 `<boundaryEvent>`。
- 根据 near breach 配置生成 warning timer。
- 根据 breach 配置生成 breach timer。
- 生成对应 service task 或 delegate expression。
- 写入流程变量名，而不是固定 duration。

## 13. Admin 设置规划

在管理后台工单设置中新增 `SLA 设置` Tab。

建议能力：

- 启用/停用 SLA。
- 配置按优先级的领取、首响、解决、客户确认时限。
- 预留按分类、部门、工作组覆盖。
- 配置近超时提醒阈值。
- 配置通知对象和渠道。
- 配置等待客户时是否暂停 SLA。
- 配置客户确认超时是否自动关闭。
- 支持 draft/publish。
- 支持测试通知模板。

## 14. Desktop/Admin 展示规划

### 14.1 工单列表

工单列表建议增加：

- SLA 状态：正常、即将超时、已超时、暂停中。
- 剩余时间。
- 最近一个即将到期 SLA 类型。
- 筛选条件：SLA 状态、SLA 类型、是否已超时。

### 14.2 工单详情

工单详情建议增加 SLA 时间线：

```text
2026-06-23 09:00 工单创建，启动待领取 SLA，截止 09:10
2026-06-23 09:08 工单被领取，待领取 SLA 达标
2026-06-23 09:08 启动首次响应 SLA，截止 09:23
2026-06-23 09:20 客服首次回复，首次响应 SLA 达标
2026-06-23 09:20 启动解决 SLA，截止 17:20
```

### 14.3 会话系统消息

当 SLA 近超时、已超时、升级、自动关闭时，建议插入系统消息：

```text
系统：工单 TK123456 即将在 30 分钟后超过解决时限。
系统：工单 TK123456 已超过解决时限，已通知部门主管。
系统：工单 TK123456 等待客户确认超过 7 天，已自动关闭。
```

## 15. 统计规划

企业版统计应从 `TicketSlaRecordEntity` 聚合，而不是重新硬编码计算。

建议指标：

- 待领取 SLA 达标率。
- 首次响应 SLA 达标率。
- 解决 SLA 达标率。
- 客户确认 SLA 自动关闭数。
- 即将超时工单数。
- 已超时工单数。
- 平均首次响应时间。
- 平均解决时间。
- 按客服、部门、工作组、分类、优先级聚合的 SLA 达标率。

统计口径：

- `COMPLETED` 且 `completedAt <= dueAt` 为达标。
- `BREACHED` 为未达标。
- `CANCELED` 不计入达标率，单独统计。
- `PAUSED` 期间不计入消耗时长。

## 16. 迁移与兼容

### 16.1 数据库迁移

通过 Liquibase 新增表，不修改历史字段含义：

```text
ticket_sla_settings
ticket_sla_rule
ticket_sla_record
ticket_sla_action_log(optional)
```

### 16.2 旧工单兼容

旧工单没有 SLA record 时：

- 列表显示 `未启用 SLA` 或 `无 SLA 记录`。
- 详情页可按需懒生成只读推导记录，但不建议影响统计。
- 新建工单默认创建 SLA record。

### 16.3 旧流程兼容

已部署旧流程不强制修改。

- 新建流程使用带 SLA 的默认模板。
- 重置默认流程时更新到带 SLA timer 的版本。
- 重新部署旧流程时进行 SLA 校验提示。

### 16.4 DMN 兼容

DMN 可保留作为高级规则来源：

- 默认使用 `TicketSlaRuleEntity`。
- 如果配置开启 `dmnEnabled`，则优先调用 DMN。
- DMN 返回结果仍需转换为统一 SLA rule DTO。

## 17. 分阶段实施计划

### 阶段 1：后端 SLA 基础闭环

目标：先让 SLA 数据、计算、记录、默认 timer 跑通。

任务：

1. 新增 SLA 配置实体和 SLA record 表。
2. 在默认设置初始化中创建默认 SLA 配置。
3. 重构 `TicketSLAService`，统一 SLA 时限计算。
4. 新建工单时创建 `TicketSlaRecordEntity`。
5. 修改 `TicketEventListener`，移除硬编码 SLA switch。
6. 默认 BPMN 增加待领取、解决时限 breach timer。
7. 实现 `TicketSlaBreachDelegate`，做到落库、通知、系统消息。
8. 企业版统计改为读取 SLA record。

验收标准：

- 新工单能生成 SLA record。
- 到期后 Flowable timer 能触发 Delegate。
- 超时后 SLA record 状态变为 `BREACHED`。
- 工单会话中出现系统消息。
- 邮件/短信/APNs 按现有配置发送或记录跳过原因。

### 阶段 2：近超时预警与暂停恢复

目标：补齐“即将超时”与等待客户场景。

任务：

1. 增加 warning timer。
2. 实现 `TicketSlaNearBreachDelegate`。
3. 实现 `pauseSla` / `resumeSla`。
4. 等待客户回复时暂停解决 SLA。
5. 客户回复后恢复解决 SLA。
6. 客户确认超时提醒与可选自动关闭。

验收标准：

- 工单即将超时时能通知运维/负责人。
- 等待客户时 SLA 暂停。
- 客户回复后 SLA 恢复并重新计算到期时间。
- 客户确认超时可自动关闭。

### 阶段 3：TicketBuilder 可视化配置

目标：在 TicketBuilder 中可视化编辑 SLA。

任务：

1. 节点属性增加 SLA 配置。
2. 画布节点显示 SLA 角标与时限。
3. FlowGram -> BPMN 转换支持 timer boundary event。
4. 部署前校验 SLA 配置。
5. 支持导入/导出 SLA 配置。

验收标准：

- 用户可在 TicketBuilder 中配置节点 SLA。
- 保存后 `flowgramSchema` 包含 SLA 属性。
- 部署后 BPMN XML 包含 timer boundary event。
- 运行时 timer 能触发对应 Delegate。

### 阶段 4：Admin SLA 设置

目标：管理员可以管理全局 SLA 策略。

任务：

1. `TicketSettingsDetailTab` 增加 SLA 设置页。
2. 支持按优先级配置四类 SLA。
3. 预留分类、部门、工作组覆盖。
4. 支持 draft/publish。
5. 支持通知模板测试。

验收标准：

- SLA 设置可编辑、保存草稿、发布。
- 新建工单使用已发布 SLA 配置。
- 未发布草稿不影响运行中配置。

### 阶段 5：列表、详情、统计完善

目标：形成完整运营视图。

任务：

1. Desktop/Admin 工单列表展示 SLA 状态和剩余时间。
2. 工单详情展示 SLA 时间线。
3. 支持按 SLA 状态筛选。
4. 企业版统计增加 SLA 达标率与超时分析。
5. 增加运维看板：新工单待领取、即将超时、已超时。

验收标准：

- 客服能看到自己即将超时的工单。
- 管理员能看到部门/工作组 SLA 达标率。
- 运维能收到新工单待领取、即将超时、已超时提醒。

## 18. 推荐第一批落地范围

建议第一批只做最小可用闭环：

1. 新增 `TicketSlaSettingsEntity`、`TicketSlaRuleEntity`、`TicketSlaRecordEntity`。
2. `TicketSLAService` 统一按已发布设置计算 SLA。
3. 新工单创建时生成 `CLAIM` 与 `RESOLUTION` 两类 SLA record。
4. 默认 BPMN 为 `waitClaim` 与 `processTicket` 增加 breach timer。
5. Delegate 触发后更新 SLA record、插入系统消息、调用通知服务。
6. 企业版统计改掉硬编码 SLA 达标判断。

第一批暂缓：

- TicketBuilder 独立 SLA 节点。
- 工作时间/节假日精确扣除。
- 分类、部门、工作组交叉规则。
- 复杂自动转派策略。

这样可以先解决当前最关键的问题：SLA 口径统一、超时能触发、状态能落库、通知能发出、统计能可信。

## 19. 风险与注意事项

1. Flowable timer 与 SLA record 可能出现状态不一致，需要 Delegate 每次触发时重新校验 record 状态。
2. 暂停/恢复 SLA 后，旧 timer 可能仍存在，需要取消旧 job 或通过幂等状态忽略旧 job。
3. 自动关闭必须谨慎，只建议用于等待客户确认/补充场景。
4. 工单流程自定义后，节点 key 可能变化，SLA 配置不能强绑定默认节点 ID。
5. 统计必须基于 SLA record，不应再重复按优先级硬编码计算。
6. 发送通知必须记录跳过原因，例如未配置模板、用户在线不发送、无手机号、无 APNs token。

## 20. 最终架构总结

最终职责划分如下：

```text
TicketSettings.slaSettings
  -> 管 SLA 业务配置、规则、通知策略

TicketBuilder
  -> 管流程可视化、节点 SLA 属性、BPMN timer 生成

TicketSlaRecordEntity
  -> 管每张工单每类 SLA 的运行事实

TicketSLAService
  -> 管 SLA 计算、开始、暂停、恢复、完成、超时、达标判断

Flowable BPMN Timer
  -> 管时间触发

TicketSla*Delegate
  -> 管幂等触发与调用业务服务

TicketNotificationService / Push Services
  -> 管邮件、短信、APNs、站内通知、系统消息

TicketStatisticService
  -> 从 SLA record 聚合统计，不再硬编码 SLA 口径
```

按这个规划落地后，工单 SLA 将具备生产可用的配置、运行、通知、审计和统计闭环，并能继续扩展到审批流、现场服务、跨部门转派等更复杂流程。
