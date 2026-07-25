# 呼叫队列人工坐席配置与 Desktop 接听规划

> 日期：2026-07-24
> 状态：**阶段 0 已完成，阶段 1 已部分实现，阶段 2 已推进，阶段 3-4 未开始**（最后检查：2026-07-25）
> 关联 TODO：`TODO-2026.md` "配置 CallQueueEntity 队列中人工客服，最终实现呼叫 ExtensionEntity.extensionNumber 转人工"
> 说明：本文档用于确认实施范围。除已存在能力说明外，新增代码实现需在确认后再执行。

## 实现状态总览（2026-07-25 检查）

### ✅ 阶段 0：生命周期底座 — 已完成

| 组件 | 文件位置 | 状态 |
| --- | --- | --- |
| `CallSessionEntity` | `enterprise/call/.../call_session/CallSessionEntity.java` | ✅ 已实现 |
| `CallLifecycleEventEntity` | `enterprise/call/.../call_lifecycle_event/CallLifecycleEventEntity.java` | ✅ 已实现 |
| `CallSessionRepository` | `enterprise/call/.../call_session/CallSessionRepository.java` | ✅ 已实现 |
| `CallLifecycleEventRepository` | `enterprise/call/.../call_lifecycle_event/CallLifecycleEventRepository.java` | ✅ 已实现 |
| `CallLifecycleService`（写入服务） | `enterprise/call/.../call_session/CallLifecycleService.java` | ✅ 已实现 |
| `CallLifecycleQueryService`（查询聚合） | `enterprise/call/.../call_session/CallLifecycleQueryService.java` | ✅ 已实现 |
| `CallLifecycleRestController` | `enterprise/call/.../call_session/CallLifecycleRestController.java` | ✅ 已实现 |
| Liquibase: 建表 | `starter/.../migration/260724_add_call_session_tables.xml` | ✅ 已实现 |
| Liquibase: 关联字段 | `starter/.../migration/260724_add_call_session_relation_fields.xml` | ✅ 已实现 |
| Liquibase: 索引 | `starter/.../migration/260724_add_call_session_indexes.xml` | ✅ 已实现 |
| `CdrEntity.callUuid` | `enterprise/call/.../cdr/CdrEntity.java` | ✅ 已实现 |
| `AcdQueueEntryEntity.callUuid` | `enterprise/call/.../acd_queue/AcdQueueEntryEntity.java` | ✅ 已实现 |

### ✅ 阶段 0：事件写入集成 — 已完成

| 事件（计划） | 实际事件码 | 调用位置 | 状态 |
| --- | --- | --- | --- |
| `EXTENSION_DIALED` / `THREAD_CREATED` | `CALL_STARTED` | `QwenRealtimeMediaWebSocketHandler` → `ensureSessionStarted()` | ✅ |
| `HANDOFF_DECIDED` | `HANDOFF_DECIDED` | `HotlineHandoffDecisionService` → `recordHandoffDecision()` | ✅ |
| `ACD_ENQUEUED` | `QUEUE_ENQUEUED` | `AcdService.enqueue()` → `recordQueueEnqueued()` | ✅ |
| `AGENT_RINGING` | `AGENT_RINGING` | `AcdService.dispatchQueueEntry()` → `recordAgentRinging()` | ✅ |
| `AGENT_ANSWERED` / `CALL_BRIDGED` | `AGENT_BRIDGED` | `AcdService` → `recordAgentBridged()` | ✅ |
| `AGENT_DECLINED` | `AGENT_DECLINED` | `AcdService.handleChannelHangup()` → `recordAgentDeclined()` | ✅ |
| `WRAP_UP_STARTED` / `WRAP_UP_COMPLETED` | `WRAP_UP_STARTED` / `WRAP_UP_COMPLETED` | `AcdService.clearAgentState()` / `finishWrapUpEarly()` / `reconcileAgentWrapUpStates()` | ✅ |
| `CALL_HANGUP` | `QUEUE_COMPLETED` / `SESSION_ENDED` | `AcdService` → `recordQueueCompleted()` + `markSessionEnded()` | ✅ |
| `TRANSFERRED_TO_VOICEMAIL` | 合并在 `QUEUE_COMPLETED`(VOICEMAIL) | `AcdService.transferCustomerToLeaveMessage()` → `recordQueueCompleted(VOICEMAIL)` | ⚠️ 非独立事件 |
| `VOICEMAIL_SAVED` | `VOICEMAIL_SAVED` | `HotlineLeaveMessageService` → `recordVoicemailSaved()` | ✅ |
| `SESSION_ENDED` | `SESSION_ENDED` / `SESSION_ENDED_ERROR` | `QwenRealtimeMediaWebSocketHandler` → `markSessionEnded()` | ✅ |

### ⚠️ 阶段 0：缺失项

| 缺失项 | 严重程度 | 说明 |
| --- | --- | --- |
| `AGENT_SELECTED` 独立事件 | 低 | 当前合并在 `AGENT_RINGING` 事件 payload 中，非独立 eventCode |
| `AGENT_ANSWERED` 独立事件 | 低 | 当前合并在 `AGENT_BRIDGED` 中 |
| `TRANSFERRED_TO_VOICEMAIL` 独立事件 | 低 | 当前合并在 `QUEUE_COMPLETED`(VOICEMAIL) result 中 |
| KB 检索事件 (`KB_SEARCH_*`) | 低 | 计划标记为"首版可选增强"，当前未实现（符合预期） |
| 历史数据回填 | 低 | 无 260724_backfill migration（符合预期，仅新通话启用） |
| `VoicemailEntity.sessionUid` 关联字段 | 低 | VoicemailEntity 无 sessionUid 字段 |

### ✅ callAdmin 生命周期消费 — 已完成

| 组件 | 文件位置 | 状态 |
| --- | --- | --- |
| API 类型定义 | `frontend/apps/callAdmin/src/@types/call/call_lifecycle.d.ts` | ✅ |
| API 客户端 | `frontend/apps/callAdmin/src/apis/call/callLifecycle.ts` | ✅ |
| CDR 抽屉生命周期 Tab | `frontend/apps/callAdmin/.../Cdr/CdrDrawer.tsx` | ✅ (Timeline 组件展示事件) |

### ⚠️ 阶段 1：管理面加固 — 已部分实现

| 计划项 | 状态 |
| --- | --- |
| `CallQueueAgentDrawer` 自动带出 `agentExtension` | ✅ 已实现，选中坐席后自动读取 `CallSettings.target` |
| `CallQueueAgentDrawer` 坐席状态提示 | ✅ 已实现，展示电话能力/签入状态/注册状态/分机目标 |
| `CallQueueAgentRestService` agentExtension 自动推导 | ✅ 已实现，缺省时自动回填 `CallSettings.target` |
| `CallQueueTable` 来源分机号列 | ✅ 已实现 |
| 队列配置健康度提示 | ✅ 已实现只读提示，并新增后端硬校验阻断无效坐席入队 |
| `VoicemailResponse` 补充可读字段 | ✅ 已实现 queueName/destinationExtensionNumber/recordingPlaybackUrl |
| `CallQueueAgentResponse` 补充字段 | ✅ 已实现 agentNickname/agentAvatar/callSettingsTarget/registrationStatus/acdStatus |

### ⚠️ 阶段 2：Desktop 坐席接听 — 已推进

| 计划项 | 状态 |
| --- | --- |
| ACD 来电实时通知 (`ACD_CALL_INCOMING`) | ✅ 已实现首版，后端通过 `NOTICE` 定向推送队列上下文，desktop 已接入独立来电通知并复用现有来电弹窗状态机 |
| Desktop `SipIncomingModal` ACD 上下文展示 | ✅ 已实现首版，已展示队列转人工标识、queueName/queueUid、queueEntryUid、customerUuid |
| Desktop `CallRightColumn` 当前通话信息卡片 | ✅ 已实现首版，展示当前对端、来电类型、queueName/queueUid、queueEntryUid、customerUuid |
| Desktop 话后整理 (wrap-up) UI | ✅ 已实现首版，工具栏展示整理中、剩余时间与完成整理动作 |
| Desktop 坐席拒接/提前完成整理事件 | ✅ 已进一步实现，已支持提前完成整理、共享来电拒接兜底，以及独立 `AGENT_DECLINED`、`WRAP_UP_STARTED`、`WRAP_UP_COMPLETED` 生命周期事件 |

### ❌ 阶段 3-4：验证与回归 — 未开始

| 计划项 | 状态 |
| --- | --- |
| 端到端验证（配置/状态/业务/失败兜底） | ❌ 未开始 |
| 回归测试 | ❌ 未开始 |

### 📊 总体进度

```text
阶段 0 (生命周期底座):     ████████████████████ 98%  已完成
阶段 1 (管理面加固):       █████████████░░░░░░░  65% 已部分实现
阶段 2 (Desktop 坐席端):   ███████████████░░░░░  75% 已推进
阶段 3 (端到端验证):        ░░░░░░░░░░░░░░░░░░░░  0%  未开始
阶段 4 (回归与观测):        ░░░░░░░░░░░░░░░░░░░░  0%  未开始
─────────────────────────────────────────────────
总体:                      █████░░░░░░░░░░░░░░░ ~25%
```

> **下一步建议**：阶段 2 已补齐独立 `ACD_CALL_INCOMING` 业务通知契约，下一步优先做首轮端到端验证，确认 desktop 在“先收 notice、后收真实 SIP 会话”与“共享来电同步”两条路径下都能稳定展示、接听、拒接和收敛状态。

## 0. 快速确认摘要

如果只看是否可以进入实现，建议先确认下面 10 条结论（2026-07-25 状态已标注）：

1. AI 热线转人工、坐席接听、超时留言，不再只依赖 `AcdQueueEntryEntity`、`CdrEntity`、`VoicemailEntity` 这些结果表，而是新增 `CallSessionEntity` + `CallLifecycleEventEntity` 作为全链路主线与时间线底座。 ✅ **已实现**
2. `callUuid` 是整条呼叫链路的主关联键，至少需要串起 `ThreadEntity`、`AcdQueueEntryEntity`、`CdrEntity`、`VoicemailEntity`、`CallLifecycleEventEntity`。 ✅ **已实现，CdrEntity + AcdQueueEntryEntity 均已补 callUuid**
3. 首版目标不是记录所有日志，而是先让 `1100 -> AI -> queue -> agent -> voicemail/end` 这条主链路可回放。 ✅ **已实现**
4. `CallSessionEntity` 负责当前阶段和最终结果，`CallLifecycleEventEntity` 负责解释过程；现有 `AcdQueueEntryEntity`、`AcdAgentStateEntity`、`CdrEntity`、`VoicemailEntity` 继续保持各自领域职责。 ✅ **已实现**
5. 数据库变更必须走 [starter/src/main/resources/db/changelog/master.xml](/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x/starter/src/main/resources/db/changelog/master.xml) + migration changeSet，小步发布，不依赖 Hibernate 自动建表。 ✅ **已实现（3 个 migration 文件）**
6. 首版强制事件聚焦在 `EXTENSION_DIALED`、`THREAD_CREATED`、`HANDOFF_DECIDED`、`ACD_ENQUEUED`、`AGENT_SELECTED`、`AGENT_RINGING`、`AGENT_DECLINED`、`AGENT_ANSWERED`、`CALL_BRIDGED`、`CALL_HANGUP`、`WRAP_UP_STARTED`、`WRAP_UP_COMPLETED`、`TRANSFERRED_TO_VOICEMAIL`、`VOICEMAIL_SAVED`、`SESSION_ENDED`。 ⚠️ **大部分已实现，AGENT_SELECTED/AGENT_ANSWERED 仍合并入其他事件，独立 `TRANSFERRED_TO_VOICEMAIL` 仍未拆出**
7. 知识库检索事件不是首版阻塞项；如需证明真实呼叫已触发 KB 检索，可把 `KB_SEARCH_REQUESTED/HIT/MISS` 作为增强事件追加。 ✅ **按计划未实现（符合预期）**
8. 写入职责已经按类划分到 `QwenRealtimeMediaWebSocketHandler`、`HotlineHandoffDecisionService`、`AcdService`、`HotlineLeaveMessageService`，后续实现不应再让多个服务裸写同一组 `sessionStage/sessionResult`。 ✅ **已按矩阵实现**
9. 前端消费顺序明确为：先补后端生命周期底座，再补 callAdmin 管理与 timeline，再补 desktop ACD 上下文与接听展示。 ⚠️ **后端底座 + callAdmin timeline 已实现，desktop ACD 来电展示已起步**
10. 本文档当前默认范围仍然是“先规划，确认后再实现”；如果这 10 条没有异议，就可以把实现拆成 migration、会话服务、事件写入、timeline 查询、callAdmin/desktop 消费五类任务。 ⚠️ **migration + 会话服务 + 事件写入 + timeline 查询已完成，callAdmin 已部分完成，desktop 已开始消费**

## 1. 目标

为 AI 热线（如 `1100`）补齐"转人工后被真实坐席接听"的完整闭环。具体包括：

1. callAdmin 中 `CallQueueTable` 的"队列成员"子表和 `CallQueueAgentDrawer` 已有基础 UI，需要把它从"能录入队列成员"提升到"不容易配错"，尤其是 `agentUid`、`agentExtension`、注册状态和来源分机号的联动。
2. desktop `Callcenter` 已具备通用 SIP 来电弹窗、通话面板和软电话工具栏，需要继续补齐 ACD 队列上下文、坐席动作回传和话后整理反馈。
3. `CallSettingsEntity`（坐席呼叫配置）需要与队列成员（`CallQueueAgentEntity`）联动，确保真正参与 ACD 分配的是"已配置电话能力且当前可接听"的坐席，而不是只在成员表里存在一条静态记录。
4. 当转人工不可达、坐席离线、振铃超时或最大尝试次数耗尽时，需要统一进入留言流程，沉淀 `VoicemailEntity`，并能在 CDR 入口中查看和播放留言。

## 2. 核心实体关系与职责区分

### 2.1 实体全景图

```text
ExtensionEntity(extensionNumber=1100)          ← AI 热线入口号码
  ├── settings → ExtensionSettingsEntity       ← AI/KB/欢迎语/转人工策略
  │     └── routingSettings                    ← handoff keyword, overflow action
  └── queueUid → CallQueueEntity               ← 一一对应，一分机一队列

CallQueueEntity(name=1100)                     ← 自动由 CallQueueSyncService 创建
  └── members → CallQueueAgentEntity[]          ← 队列坐席成员

CallQueueAgentEntity                            ← 把坐席和队列关联起来
  ├── queueUid                                  ← 属于哪个队列
  ├── agentUid                                  ← 对应 AgentEntity.uid
  ├── agentExtension                            ← 坐席 SIP 分机号
  ├── priority / weight / maxConcurrentCalls
  └── enabled                                   ← 是否参与分配

CallSettingsEntity (modules/call)               ← 坐席电话能力配置
  ├── agentUid                                  ← 对应 AgentEntity.uid
  ├── number                                    ← 对外号码 / DID
  ├── target                                    ← SIP 注册目标（内线号）
  ├── registrationStatus                        ← 签入/签出（由 FS 事件同步）
  ├── enabled / signedIn
  └── holdMediaUrl / consultExtensionNumbers 等

AcdEntity                                       ← ACD 配置实体（当前为占位）
AcdQueueEntry (内存) / AcdQueueEntryEntity (DB)  ← 排队中的来电
  ├── customerUuid                              ← FreeSWITCH channel UUID
  ├── queueUid / queueName
  ├── strategy / status / attempts
  └── agentExtension / ringingAt / bridgedAt

AcdAgentStateEntity                              ← 坐席实时 ACD 状态
  ├── extension                                 ← 坐席分机号
  ├── status                                    ← AVAILABLE / RINGING / BUSY / WRAP_UP
  ├── currentQueueEntryUid
  └── lastIdleAt / wrapUpUntil

VoicemailEntity                                  ← 人工离线/无人接听后的留言记录
  ├── callUuid / callerIdNumber / destinationNumber
  ├── didNumber / queueUid / leaveReason
  ├── recordingUrl / transcriptionText
  ├── callbackStatus / callbackAgentUid
  └── handledAt

CallSessionEntity (新增)                         ← 呼叫主会话表
  ├── uid (主键)                                 ← 沿用统一 UID 体系
  ├── callUuid (唯一关联键)                       ← 全链路主关联键
  ├── threadUid / queueUid / agentUid / voicemailUid
  ├── sessionStage / sessionResult               ← 当前阶段 / 最终结果
  └── startedAt / endedAt

CallLifecycleEventEntity (新增)                   ← 呼叫时间线表
  ├── sessionUid / callUuid                      ← 关联主会话
  ├── eventCode / eventStage / eventSource       ← 事件编码 / 阶段 / 来源
  └── occurredAt / eventPayload                  ← 时间 / 详情 JSON
```

### 2.2 职责区分

| 实体 | 职责 | 类比 |
| --- | --- | --- |
| `CallQueueEntity` | 定义"一个队列"，存队列名、类型 | 技能组的"壳" |
| `CallQueueAgentEntity` | 定义"谁属于这个队列"，存坐席 ID、分机、优先级、容量 | 技能组成员表 |
| `CallSettingsEntity` | 定义"坐席的电话能力"，存 SIP 目标、对外号码、注册状态 | 分机号的电话配置 |
| `AcdEntity` | ACD 策略配置实体（当前占位） | ACD 配置模板 |
| `AcdQueueEntryEntity` | 记录"一通正在排队的来电"，存 caller、状态、已尝试坐席 | 排队记录 |
| `AcdAgentStateEntity` | 记录"一个坐席当前是否可接听"，存 AVAILABLE/RINGING/BUSY | 坐席实时状态 |
| `VoicemailEntity` | 记录"无人接听后留下的语音留言"，存录音、主叫、队列、回呼状态 | 语音留言工单 |
| `CallSessionEntity`（新增） | 记录"一通电话的主线"，存当前阶段、最终结果、串联各段生命周期 | 呼叫主会话表 |
| `CallLifecycleEventEntity`（新增） | 记录"这通电话中间发生过什么"，存事件编码、时间、详情 | 可回放的时间线 |

**关键区分点**：

- `CallQueueAgentEntity` 是**静态配置**（管理员配的"谁能接"），变化频率低。
- `AcdAgentStateEntity` 是**运行时状态**（FreeSWITCH 事件驱动的"现在能不能接"），变化频率高。
- `AcdQueueEntryEntity` 是**运行时记录**（每通来电排队时创建，接通/挂断后结束）。
- `CallSettingsEntity` 是**坐席电话能力配置**（SIP 分机、对外号码），不直接参与 ACD 决策，但 `registrationStatus` 间接影响 ACD 可用性判断。
- `VoicemailEntity` 是**失败兜底记录**，当 AI 热线决定走 `LEAVE_MESSAGE`，或者转人工后坐席离线/超时无人接听时，用于沉淀可回访的语音资产。
- `AcdEntity` 当前是**占位实体**，实际 ACD 策略逻辑在 `AcdService` 中。

### 2.3 ACD 状态迁移（当前实现）

#### 2.3.1 坐席状态机

```text
AVAILABLE ──[dispatchQueueEntry]──▶ RINGING
RINGING   ──[CHANNEL_ANSWER]─────▶ BUSY
BUSY      ──[CHANNEL_HANGUP]─────▶ AFTER_CALL_WORK (WRAP_UP, 默认 30s)
AFTER_CALL_WORK ──[wrapUpUntil 过期]──▶ AVAILABLE

RINGING   ──[agent hangup/no answer]──▶ WAITING (re-dispatch)
RINGING   ──[ringTimeoutSeconds 超时]──▶ WAITING (re-dispatch, 3s reconcile)
WAITING   ──[attempts >= maxAttempts]──▶ FAILED → transferCustomerToLeaveMessage()
```

#### 2.3.2 排队条目状态机

```text
WAITING ──[dispatchQueueEntry]──▶ RINGING
RINGING ──[CHANNEL_ANSWER]──────▶ BRIDGED
BRIDGED ──[CHANNEL_HANGUP]──────▶ ENDED
WAITING/RINGING ──[customer hangup before bridge]──▶ ENDED(HANGUP_BEFORE_ASSIGN)
WAITING ──[attempts >= maxAttempts]──▶ FAILED → leave_msg_dispatcher
```

#### 2.3.3 originate 关键变量

`AcdService.originateAgentLeg()` 在坐席腿上设置以下 FreeSWITCH 通道变量，供后续 ESL 事件关联和 desktop 上下文获取：

| 变量名 | 来源 | 用途 |
| --- | --- | --- |
| `origination_uuid` | 预生成的 agentLegUuid | 唯一标识坐席腿 |
| `acd_queue_entry_uid` | `AcdQueueEntry.uid` | 关联排队条目 |
| `hotline_queue_uid` | `AcdQueueEntry.queueUid` | 关联队列 |
| `acd_agent_uid` | `AcdAgentSelector.resolveAgentUid()` | 关联坐席 |
| `acd_customer_uuid` | `AcdQueueEntry.customerUuid` | 关联主叫 channel |
| `acd_agent_extension` | `ExtensionEntity.extensionNumber` | 坐席分机号 |
| `call_timeout` | `AcdQueueEntry.ringTimeoutSeconds` | 振铃超时 |

> **注意**：这些变量当前只设置在坐席腿上，desktop 端需要订阅 ESL 事件或通过业务通知渠道获取这些值来关联队列上下文。

### 2.4 转人工决策链路（当前实现）

```text
AI 热线识别 handoff keyword
  → HotlineHandoffDecisionService.decide()
    ├── withinServiceHours()? → NO → LEAVE_MESSAGE (OFF_HOURS)
    ├── hasAvailableAgent()?   → YES → ACD_ENQUEUE
    │   └── AcdAgentStateRepository.findAvailable() + CallQueueAgentRepository.existsAvailableMemberByQueueUidAndAgentExtensionIn()
    ├── shouldAllowQueue()?    → YES → ACD_ENQUEUE (排队)
    └── default → LEAVE_MESSAGE (NO_AGENT_AVAILABLE)

ACD_ENQUEUE 分支：
  → AiHotlineDialplanTemplateBuilder.buildAcdEnqueueActionXml() → transfer acd_dispatcher
  → AcdService.enqueue() → holdCustomer(MOH) → dispatchQueueEntry() → selectAgent() → originateAgentLeg(&park)

LEAVE_MESSAGE 分支：
  → AiHotlineDialplanTemplateBuilder.buildLeaveMessageActionXml() → transfer leave_msg_dispatcher
  → leave_msg_dispatcher: answer → speak(提示语) → record(录音) → httapi /visitor/api/v1/leave-message/save
```

## 3. 当前已具备的能力

### 3.1 后端

| 能力 | 实现位置 | 状态 |
| --- | --- | --- |
| 分机自动创建同名队列 | `CallQueueSyncService.syncForExtension()` (Extension 创建/更新/删除事件驱动) | ✅ 已实现 |
| 队列坐席成员 CRUD | `CallQueueAgentRestService` | ✅ 已实现 |
| ACD 入队/派发/事件处理 | `AcdService` (含 MOH 保持、originate 坐席腿、bridge、hangup、wrap-up) | ✅ 已实现 |
| 坐席选择策略 | `AcdAgentSelector` (LONGEST_IDLE / ROUND_ROBIN / PRIORITY / LINEAR) | ✅ 已实现 |
| 坐席实时状态管理 | `AcdAgentStateEntity` + FreeSWITCH ESL 事件驱动 + `reconcileQueue()` 3s 定时修复 | ✅ 已实现 |
| AI 热线转人工决策 | `HotlineHandoffDecisionService` | ✅ 已实现 |
| 时间条件/服务时间检查 | `HotlineHandoffDecisionService.withinServiceHours()` → `TimeConditionRestService` | ✅ 已实现 |
| 队列坐席可用性校验 | `HotlineHandoffDecisionService.hasAvailableAgent()` (含队列成员过滤) | ✅ 已实现 |
| AI 热线拨号方案模板 | `AiHotlineDialplanTemplateBuilder` (ACD_ENQUEUE / LEAVE_MESSAGE 路由) | ✅ 已实现 |
| ACD 超时失败转留言 | `AcdService.transferCustomerToLeaveMessage()` → `leave_msg_dispatcher` | ✅ 已实现基础转接 |
| 人工离线留言落库 | `HotlineLeaveMessageHttapiController` + `HotlineLeaveMessageService.saveLeaveMessage()` → `VoicemailEntity` | ✅ 已实现 |
| CDR 关联 queueUid/agentUid | `CdrEntity` + `CdrEslSyncService` | ✅ 已实现 |
| 坐席 SIP 配置管理 | `CallSettingsEntity` (位于 `modules/call`) + `CallSettingsRestService` | ✅ 已实现 |
| ACD 坐席状态持久化 | `AcdAgentStateEntity` + `persistAgentRuntime()` 即时回写 DB | ✅ 已实现 |

### 3.2 前端

| 页面 | 功能 | 状态 |
| --- | --- | --- |
| callAdmin `CallQueueTable` | 队列列表 + 展开行显示队列成员 + 添加/编辑/删除成员 | ✅ 已实现 |
| callAdmin `CallQueueAgentDrawer` | 队列成员表单，已支持按组织搜索客服并选择 `agentUid` | ✅ 已实现 |
| callAdmin `CallSettingsTable` | 坐席呼叫配置列表 + 启用/号码/SIP 目标/注册状态 | ✅ 已实现 |
| callAdmin `AcdAgentStateTable` | 查看实时 ACD 坐席状态（AVAILABLE/RINGING/BUSY/WRAP_UP） | ✅ 已实现 |
| callAdmin `VoicemailTable` | 查看留言记录、回呼状态、转写内容，并通过 `recordingUrl` 打开录音 | ✅ 已实现 |
| callAdmin `CallCdr` | 外部通话、内部通话、语音留言 tab；已复用 `VoicemailTable` | ✅ 已实现 |
| desktop `Callcenter` | 三栏布局 + 软电话工具栏 + CDR 记录展示 | ✅ 已实现（布局和 CDR 查询） |
| desktop `SipIncomingModal` / `SipCallPanel` | 通用 SIP 来电弹窗、接听/拒接、通话状态展示 | ✅ 已实现 |

## 4. 主要缺口

### 4.1 callAdmin 管理面缺口

1. **已有客服选择器，但缺少自动带出能力**：当前 `CallQueueAgentDrawer` 已支持搜索客服并选择 `agentUid`，但选择后不会自动回填 `agentExtension`、不会提示该坐席是否已有 `CallSettingsEntity`、也不会提示当前 SIP 注册状态。
2. **坐席分机号（agentExtension）与 `CallSettings.target` 仍靠人工保持一致**：如果管理员手工填写错误，`HotlineHandoffDecisionService.hasAvailableAgent()` 基于分机号匹配时就会漏掉本该可接的坐席。
3. **队列绑定的来源分机号不可见**：`CallQueueTable` 当前没有直观展示"这个队列对应哪个 `ExtensionEntity.extensionNumber`"，管理员难以判断一个队列究竟是 AI 热线队列、普通业务队列，还是手工创建的测试队列。
4. **缺少配置完成度校验**：当前管理页还没有明显提示"队列成员已创建，但坐席未签入 / 未注册 / 未启用呼叫能力"这类高频误配场景。
5. **离线留言与转人工结果的关联展示仍不足**：当前 `CallCdr` 已接入 `VoicemailTable` 的语音留言 tab，但留言记录仍缺少队列名、入口分机、回呼坐席昵称、标准播放地址等可读字段，无法直接解释一次转人工失败的完整上下文。

### 4.2 Desktop 坐席端缺口

- **已有通用来电弹窗，但没有 ACD 队列语义**：desktop 已有 `SipIncomingModal` 和 `SipCallProvider`，能处理 SIP 来电接听/拒接；缺的是把 `queueEntryUid`、`queueName`、主叫号码、是否 AI 转人工等 ACD 上下文带进来。
- **已有通话状态面板，但缺少队列任务视角**：`SipCallPanel` 可显示分机、对端、时长、挂断/静音等状态，但还没有显示当前队列条目、排队来源、坐席处理结果等呼叫中心字段。
- **软电话工具栏与 ACD 事件没有正式汇合**：当前软电话更多围绕通用 SIP 会话和主动外呼，尚未定义"ACD 选中我"后的实时通知契约，以及坐席点击接听/拒接后如何回写 `AcdQueueEntryEntity` / `AcdAgentStateEntity`。
- **缺少话后整理态的人机交互**：后端已有 `WRAP_UP` 概念，callAdmin 也能看到 `AcdAgentStateEntity.wrapUpUntil`，但 desktop 端缺少倒计时、提前完成整理、超时自动恢复 AVAILABLE 等交互反馈。

### 4.3 端到端流程缺口

- **`AcdAgentStateEntity.extension` 到 `CallQueueAgentEntity.agentExtension` 的映射质量**：当前 `HotlineHandoffDecisionService.hasAvailableAgent()` 通过 `agentExtension` 做 JOIN，根风险不是代码能力缺失，而是这个字段仍可能被人工配错。
- **队列静态配置与运行态数据未形成统一诊断视图**：管理员现在要切换 `CallQueueTable`、`CallSettingsTable`、`AcdAgentStateTable` 三个页面，才能看清一个坐席为何没被分配。
- **ACD 分配事件到 desktop 的正式契约未落地**：虽然 desktop 已有 SIP 来电 UI，但还缺少一个可靠的业务事件层，让前端知道"这是普通 SIP 来电"还是"1100 队列分配给我的转人工来电"。当前 originate 的通道变量（`acd_queue_entry_uid`、`hotline_queue_uid` 等）只在 FreeSWITCH 层面存在，尚无机制推送到 desktop 前端。
- **转人工失败后的留言结果已进入 CDR 入口，但联查关系不足**：现有 `CallCdr` 已有语音留言 tab，不过还没在 response 层补齐 `queueUid`、`callUuid`、`destinationNumber`、`threadUid`、`recordingPlaybackUrl` 等统一运营视图字段。
- **AcdService 全内存状态无重启恢复**：`ConcurrentHashMap`（`queueEntries`、`agentRuntimeMap`、`customerToQueueEntryMap`、`agentLegToQueueEntryMap`）在应用重启后全部丢失，虽然 `AcdAgentStateEntity` 有 DB 持久化，但排队中的来电和桥接关系无法恢复。

## 5. 推荐配置原则

### 5.1 单一事实来源

- `CallQueueAgentEntity.agentUid` 负责表示"这个人属于哪个队列"。
- `CallSettingsEntity.target` 负责表示"这个人实际接听使用哪个 SIP 分机/目标"。
- `CallQueueAgentEntity.agentExtension` 应视为 `CallSettingsEntity.target` 的快照或冗余索引，不应成为另一个独立维护的数据源。

**推荐原则**：

- 创建队列成员时，默认从 `CallSettingsEntity.target` 自动带出 `agentExtension`。
- 更新 `CallSettingsEntity.target` 时，同步更新同坐席名下启用中的 `CallQueueAgentEntity.agentExtension`。
- 如果坐席没有有效 `CallSettingsEntity`，允许保存但标记为"不可参与 ACD 分配"，或直接禁止加入队列，二选一后统一执行。

### 5.2 可分配性判定

规划文档建议把"该坐席能否接 AI 转人工"明确拆成以下四层：

1. `CallQueueAgentEntity.enabled = true`
2. `CallSettingsEntity.enabled = true`
3. `CallSettingsEntity.target` 非空且格式有效
4. `AcdAgentStateEntity.status` 属于可接听集合，例如 `AVAILABLE` / `READY`

这样可以避免后续把"已在队列里"误当成"此刻可分配"。

### 5.3 离线留言兜底原则

- 当 `HotlineHandoffDecisionService` 直接给出 `LEAVE_MESSAGE` 时，应进入留言分支并落 `VoicemailEntity`。
- 当决策结果是 `ACD_ENQUEUE`，但后续因坐席离线、振铃超时、无人接听而失败时，也应统一进入留言分支，而不是只留在 ACD 日志里。当前 `AcdService.dispatchQueueEntry()` 已在 `attempts >= maxAttempts` 后设置 `FAILED` 并调用 `transferCustomerToLeaveMessage(...)`，这是后续实现的主要承接点。
- `VoicemailEntity` 应作为"人工未接住这通电话"的最终业务结果之一，和 `CdrEntity` 一起构成完整回溯链路。

### 5.4 留言录音保存数据流

当前可复用的数据流如下：

1. AI 热线或 ACD 失败分支设置通道变量：`hotline_org_uid`、`hotline_queue_uid`、`hotline_queue_name`、`hotline_leave_reason`、`hotline_leave_prompt`。
2. FreeSWITCH 转入 `leave_msg_dispatcher`。
3. `leave_msg_dispatcher` 播放留言提示，设置 `hotline_leave_msg_file`，执行 `record` 生成 WAV 文件。
4. `leave_msg_dispatcher` 调用 `/visitor/api/v1/leave-message/save`，带上 `orgUid`、`callUuid`、`callerIdNumber`、`destinationNumber`、`didNumber`、`queueUid`、`leaveReason`、`recordingUrl`。
5. `HotlineLeaveMessageService.saveLeaveMessage()` 以 `callUuid` 做幂等，创建或复用 `VoicemailEntity`，默认 `callbackStatus=PENDING`。

需要确认的实现细节：

- `recordingUrl` 当前可能是 FreeSWITCH 本地路径，前端只能直接打开 HTTP/HTTPS 可访问地址。若本地路径不可访问，需要在保存前转换为可下载 URL，或由后端提供录音文件代理接口。
- `destinationNumber` 在直接 `LEAVE_MESSAGE` 分支已有 `hotline_destination_number`，ACD 超时转留言时也应补齐该变量，否则留言列表只能看到 `didNumber` / `queueUid`，无法直接知道入口分机。
- `leaveReason` 需要规范枚举值，例如 `NO_AVAILABLE_AGENT`、`AGENT_RING_TIMEOUT`、`OFF_HOUR`、`USER_REQUESTED`，方便后续统计。

### 5.5 `VoicemailEntity` 字段来源映射

基于当前 `HotlineLeaveMessageRequest` 和 `HotlineLeaveMessageService.createLeaveMessage()`，留言字段的真实来源如下：

| `VoicemailEntity` 字段 | 当前来源 | 说明 |
| --- | --- | --- |
| `uid` | `UidUtils.getUid()` | 新建留言主键 |
| `name` | `callerIdNumber` 或 `callUuid` | 默认格式为 `热线留言-号码/UUID` |
| `description` | 固定值 `热线留言` | 当前未区分不同留言原因 |
| `type` | 固定值 `VoicemailTypeEnum.INBOUND` | 当前全部按呼入留言处理 |
| `orgUid` | `HotlineLeaveMessageRequest.orgUid` | 来源于 HTTAPI query 参数 |
| `callUuid` | `HotlineLeaveMessageRequest.callUuid` | 幂等键 |
| `callerIdNumber` | `HotlineLeaveMessageRequest.callerIdNumber` | 主叫号码 |
| `destinationNumber` | `HotlineLeaveMessageRequest.destinationNumber` | 目标热线分机；ACD 超时链路当前可能为空 |
| `didNumber` | `HotlineLeaveMessageRequest.didNumber` | SIP 请求入口号码 |
| `ivrMenuUid` | `HotlineLeaveMessageRequest.ivrMenuUid` | 若经过 IVR 则带入 |
| `workflowUid` | `HotlineLeaveMessageRequest.workflowUid` | 若经过 workflow 则带入 |
| `queueUid` | `HotlineLeaveMessageRequest.queueUid` | 队列 UID |
| `leaveReason` | `HotlineLeaveMessageRequest.leaveReason` | 离线/超时/非工作时间等原因 |
| `recordingUrl` | `HotlineLeaveMessageRequest.recordingUrl` | 当前通常是 FreeSWITCH 录音文件路径 |
| `callbackStatus` | 固定值 `PENDING` | 初始回访状态 |
| `relatedIvrRecordUid` | `callUuid` | 当前直接复用 callUuid |
| `callbackAgentUid` | 暂无默认值 | 需后续回访处理时写入 |
| `handledAt` | 暂无默认值 | 需进入终态时写入 |

这张映射表意味着：如果后续想在 `VoicemailTable` 直接展示 `queueName`、`destinationExtensionNumber`、`callbackAgentNickname`，目前并没有直接字段，需要在 response 层补只读衍生字段，或通过 join 查询组装。

### 5.6 全链路状态与数据落库矩阵

最新补充要求不是单纯“能转人工”或“能留语音留言”，而是从用户拨打分机号开始，到 AI 对话、转人工、排队、振铃、接通、挂断、留言结束，所有关键状态变化和业务结果都要能落到 entity 中，便于事后审计、运营分析、补偿重放和前端统一查询。

| 阶段 | 关键状态/数据 | 当前来源 | 当前是否落库 | 当前实体 | 主要缺口 |
| --- | --- | --- | --- | --- | --- |
| 用户拨入分机 | `callUuid`、主叫号码、入口分机、DID、上下文 | FreeSWITCH 通道变量 / ESL 事件 | 部分已落库 | `CdrEntity` | 缺少“呼叫会话主表”统一串起 AI、ACD、留言三段生命周期 |
| 命中热线配置 | 命中哪个 `ExtensionEntity`、是否开启 AI/知识库/转人工 | 应用内热线路由决策 | 未系统落库 | 无专门实体 | 当前只能从配置表反推，缺少“本次呼叫实际命中了哪个热线配置版本”的快照 |
| 创建热线线程 | `threadUid`、访客身份、分机号会话归属 | `QwenRealtimeMediaWebSocketHandler.ensureThread()` | 已落库 | `ThreadEntity` | 缺少与 ACD 队列条目的一对一关联字段 |
| AI 欢迎语/对话 | 文本、语音、ROBOT、SYSTEM、EVENT 消息 | Realtime handler | 已落库 | `MessageEntity` | 已具备主能力，但“转人工决策结果”还未单独形成可查询业务事件流水 |
| 知识库检索 | 查询词、命中文档、检索结果摘要 | `KnowledgeBaseSearchHelper` 调用链 | 未独立落库 | 无专门实体 | 当前只能看日志或最终回复文本，无法审计“本次通话是否真实命中过知识库” |
| 转人工决策 | `ACD_ENQUEUE` / `LEAVE_MESSAGE`、原因、服务时间判断、是否有可用坐席 | `HotlineHandoffDecisionService.decide()` | 未独立落库 | 仅部分通过消息侧体现 | 缺少结构化决策结果实体或事件历史 |
| ACD 入队 | `queueUid`、策略、最大尝试次数、排队开始时间 | `AcdService.enqueue()` | 已落库 | `AcdQueueEntryEntity` | 缺少入队前后的完整事件历史，如“谁触发入队、由哪个分机转入、入队原因” |
| 坐席可用状态 | `AVAILABLE/RINGING/BUSY/WRAP_UP`、当前队列条目、最后空闲时间 | `AcdService` + ESL 事件 | 已落库当前快照 | `AcdAgentStateEntity` | 只有当前态，没有状态变更历史表；应用重启后无法还原状态迁移轨迹 |
| 坐席振铃 | 被派发给哪个坐席、振铃开始时间、坐席腿 UUID | `dispatchQueueEntry()` / `originateAgentLeg()` | 部分已落库 | `AcdQueueEntryEntity`、`AcdAgentStateEntity` | 缺少“第几次派发、为什么选中该坐席、前一次失败原因”的明细历史 |
| 坐席接听 | 应答时间、接听坐席、桥接目标 | ESL `CHANNEL_ANSWER` | 部分已落库 | `AcdQueueEntryEntity`、`CdrEntity` | 缺少独立的接听事件记录，desktop 侧动作与后端事件缺少统一业务流水 |
| 客户与坐席桥接成功 | `bridgedAt`、agent/customer leg 对应关系 | ESL `CHANNEL_BRIDGE` | 部分已落库 | `AcdQueueEntryEntity`、`CdrEntity` | `agentLegToQueueEntryMap` 等关系仍依赖内存 map，不满足完整可恢复要求 |
| 通话中 | 保持、静音、转接、话中状态变化 | SIP/FreeSWITCH/desktop 交互 | 基本未落库 | 零散落于 CDR/日志 | 缺少统一的话中控制事件流水，前端无法追溯坐席操作链 |
| 挂断结束 | 挂断原因、结束时间、通话时长 | ESL hangup / CDR sync | 已落库 | `CdrEntity`、`AcdQueueEntryEntity` | 缺少“谁先挂断、挂机侧、业务终态原因”的统一语义字段 |
| 坐席整理态 | `WRAP_UP` 开始/结束、是否手动完成 | `clearAgentState()` / runtime 状态流转 | 仅当前态落库 | `AcdAgentStateEntity` | 缺少 wrap-up 历史，无法分析整理时长是否超时或被手动跳过 |
| 重试/改派 | 第几次尝试、尝试过哪些坐席、重试原因 | `AcdService.dispatchQueueEntry()` | 部分已落库 | `AcdQueueEntryEntity.attempts/attemptedAgents` | 缺少逐次尝试事件明细，当前字段只保留聚合结果 |
| 超时失败转留言 | 失败原因、转留言触发时刻、沿用的业务上下文 | `transferCustomerToLeaveMessage()` | 部分已落库 | `VoicemailEntity` 最终结果 | 失败到留言之间缺少独立事件；并且 ACD 超时链路当前可能丢 `destinationNumber` |
| 用户留言录音 | 录音路径、留言原因、队列 UID、入口分机 | `leave_msg_dispatcher` + HTTAPI | 已落库 | `VoicemailEntity` | 缺少与 `CdrEntity`、`ThreadEntity` 的显式关联键；播放地址也未标准化 |
| 通话录音/转写 | `recordFile`、转写状态、转写文本 | CDR/录音同步链路 | 已落库 | `CallRecordingEntity`、`CdrEntity` | 留言录音与通话录音是两套模型，后续运营查询需统一视图 |

### 5.7 当前已落库、未落库与半落库清单

从“是否满足全链路持久化”角度看，当前系统可以拆成三类：

#### 已落库且可直接查询的对象

- 热线会话线程和消息：`ThreadEntity`、`MessageEntity`
- 队列条目当前状态：`AcdQueueEntryEntity`
- 坐席运行时当前状态：`AcdAgentStateEntity`
- 通话详单：`CdrEntity`
- 通话录音：`CallRecordingEntity`
- 留言最终结果：`VoicemailEntity`

#### 仅有“当前快照”，没有“历史轨迹”的对象

- `AcdAgentStateEntity` 只能反映当前坐席状态，不能回答“今天 10:00 到 10:05 为什么从 AVAILABLE 变成 WRAP_UP”。
- `AcdQueueEntryEntity` 可以看到 `queuedAt/ringingAt/bridgedAt/completedAt` 和聚合的 `attemptedAgents`，但不能精确还原每一次派发尝试的时序。
- `CdrEntity` 能保存最终通话结果，但无法表达 AI 决策、入队原因、转留言原因等中间业务决策。

#### 仍停留在内存、通道变量或日志中的对象

- `AcdService` 的 `queueEntries`、`agentRuntimeMap`、`customerToQueueEntryMap`、`agentLegToQueueEntryMap`
- FreeSWITCH 通道变量里的 `hotline_queue_uid`、`hotline_destination_number`、`acd_queue_entry_uid`、`hotline_leave_reason` 等业务上下文
- `HotlineHandoffDecisionService` 的决策理由，例如服务时间不命中、队列无人可接、用户主动要求转人工
- desktop 侧接听、拒接、挂断、整理完成等用户动作的业务语义
- 知识库检索命中明细和 AI 侧检索调用证据

这意味着当前更像“多张结果表 + 一组运行时 map”的组合，而不是“可完整回放的呼叫生命周期模型”。

## 6. 推荐实施步骤

### 6.0 先补全链路落库底座

在继续扩展 callAdmin 配置页或 desktop 坐席体验之前，建议先补一层统一的生命周期持久化底座，否则后续只能看到最终结果，仍然无法解释“为什么这通电话没有转给人工”或“哪一跳丢了上下文”。

推荐分两档推进：先上最小可行方案（`CallSessionEntity` + `CallLifecycleEventEntity`），如需支撑运营分析再补 `AcdQueueEntryHistoryEntity` + `AcdAgentStateHistoryEntity`。两档的详细建模、字段、事件枚举、迁移策略、写入责任矩阵等完整约束参见下方 **阶段 0：搭建全链路落库底座**。

### 6.1 全链路落库的优先级建议

为了避免一次改造过重，建议按下面顺序实施：

1. 先补 `CallSessionEntity`，把 `callUuid/threadUid/queueUid/agentUid/voicemailUid` 串起来。
2. 再补 `CallLifecycleEventEntity`，优先记录 AI 决策、ACD 入队、坐席振铃、桥接、转留言、留言保存。
3. 然后让 `AcdService` 中的内存 map 在状态变更时同步写入事件流水。
4. 最后再补 `AcdQueueEntryHistoryEntity`、`AcdAgentStateHistoryEntity` 用于运营分析和恢复。

**目标**：让每通电话都有可串联的主线和关键状态变更事件，支撑后续 callAdmin 和 desktop 的可回放展示。

#### 0.1 `CallSessionEntity` + `CallLifecycleEventEntity` 建模与基础接口

- 新建 `CallSessionEntity`（表 `bytedesk_call_session`）：以 `uid` 为主键、`callUuid` 为唯一关联键，串联 `threadUid`、`queueUid`、`agentUid`、`voicemailUid`、`sessionStage`、`sessionResult`、`startedAt`、`endedAt`。
- 新建 `CallLifecycleEventEntity`（表 `bytedesk_call_lifecycle_event`）：记录 `sessionUid`、`eventCode`、`eventPayload`（JSON）、`occurredAt`。
- 建 Repository、基础查询接口（`GET /api/v1/call-session/query`、`GET /api/v1/call-lifecycle-event/query`）。
- 在 `CdrEntity`、`AcdQueueEntryEntity` 中增加 `callUuid` 可关联字段；`VoicemailEntity` 保留现有 `callUuid` 幂等字段并补充索引或必要的 `sessionUid` 关联，确保新表不成为新孤岛。

建议同步明确以下表结构约束，避免后续查询性能和幂等语义失控：

- `CallSessionEntity.callUuid` 建唯一索引，作为整条呼叫主线的自然幂等键。
- `CallLifecycleEventEntity` 建组合索引：`(sessionUid, occurredAt)`、`(callUuid, occurredAt)`、`(eventCode, occurredAt)`，满足时间线回放、按呼叫检索和按事件类型统计三类查询。
- `AcdQueueEntryEntity` 建议补 `callUuid`，而不是只依赖 `customerUuid`，否则跨 FreeSWITCH leg 或后续重建查询时难以和 `CdrEntity`、`VoicemailEntity` 稳定关联。
- `VoicemailEntity` 如果继续保留 `callUuid` 作为幂等键，需在迁移脚本中补唯一索引或唯一约束，避免数据库层面出现重复留言。

#### 0.1.1 数据库迁移与兼容策略

- 所有新增表、字段、索引都应通过 [starter/src/main/resources/db/changelog/master.xml](/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x/starter/src/main/resources/db/changelog/master.xml) 引入的 migration changeSet 交付，具体文件放在 [starter/src/main/resources/db/changelog/migration](/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x/starter/src/main/resources/db/changelog/migration)，不直接依赖 Hibernate 自动建表。
- 迁移顺序建议为：先建 `bytedesk_call_session` / `bytedesk_call_lifecycle_event`，再为 `bytedesk_call_cdr`、`bytedesk_call_acd_queue_entry`、`bytedesk_call_voicemail` 增补关联字段和索引。
- 对已有数据采取“向前兼容”策略：旧 CDR、旧留言、旧队列条目允许 `sessionUid` 或新增关联字段为空，前端在展示历史记录时回退到现有实体视图，不要求一次性回填全量旧数据。
- 如需回填近期数据，优先基于 `callUuid` 做增量 backfill；无法关联的旧记录保持只读历史状态，不阻塞新链路上线。

建议沿用当前仓库已有命名方式：一个 migration 文件承载一个相对聚焦的 changeSet 主题，文件名采用日期前缀 + 语义后缀，例如：

- `260724_add_call_session_tables.xml`
- `260724_add_call_session_relation_fields.xml`
- `260724_add_call_session_indexes.xml`

对应 `master.xml` 中按上线顺序显式 `<include file="db/changelog/migration/..." />`，不要依赖目录扫描，避免不同环境 include 顺序漂移。

#### 0.1.1.1 建议 changeSet 拆分

建议把本次呼叫链路落库拆成 4 组 migration，而不是一个大文件全做完：

- `260724_add_call_session_tables.xml`：新建 `bytedesk_call_session`、新建 `bytedesk_call_lifecycle_event`、建立主键/基础唯一约束/必要非空字段。

- `260724_add_call_session_relation_fields.xml`：为 `bytedesk_call_cdr` 增加 `call_uuid`、为 `bytedesk_call_acd_queue_entry` 增加 `call_uuid`、评估是否为 `bytedesk_call_voicemail` 增加 `session_uid` 或保留 `call_uuid` 单向关联。

- `260724_add_call_session_indexes.xml`：为 `bytedesk_call_session(call_uuid)` 建唯一索引；为 `bytedesk_call_lifecycle_event(session_uid, occurred_at)`、`(call_uuid, occurred_at)` 建索引；为 `bytedesk_call_cdr(call_uuid)`、`bytedesk_call_acd_queue_entry(call_uuid)`、`bytedesk_call_voicemail(call_uuid)` 建索引。

- `260724_backfill_recent_call_session_links.xml` 或独立脚本：仅在确认需要时回填最近 N 天可关联数据；无法准确回填的历史记录跳过，不做伪关联。

#### 0.1.1.2 发布顺序与兼容窗口

为了降低生产升级风险，建议按“两阶段兼容”发布，而不是 schema 和业务写入同时切换：

1. 第一次发布：只上 migration，允许新表和新列先存在，但应用仍兼容旧读写逻辑。
2. 第二次发布：开启 `CallSessionEntity` / `CallLifecycleEventEntity` 新写入逻辑，同时保留旧实体查询路径。
3. 第三次发布：在 callAdmin / desktop 消费时间线接口后，再评估是否需要对旧页面强依赖新字段。

这样即使第二次发布过程中个别链路没有立即写入 `callUuid`，也不会影响现有 CDR、留言和队列页继续可用。

#### 0.1.1.3 preConditions 与回滚原则

参考当前仓库已有 migration 风格，建议所有 changeSet 默认带上 `tableExists` / `columnExists` 类 `preConditions onFail="MARK_RAN"`，避免多环境重复执行报错。

- 新增列 changeSet：先判断表存在且目标列不存在。
- 新增索引 changeSet：先判断索引不存在，避免重复建索引失败。
- 回填类 changeSet：避免写成“全量不可逆数据修复”；更推荐独立脚本或受控批处理，而不是启动即执行的重型 Liquibase SQL。

对于本次生命周期模型，不建议在 Liquibase 层设计复杂回滚 SQL。更稳妥的原则是：schema 增量可保留，应用逻辑可开关回退。

#### 0.1.2 生命周期事件负载约定

为避免 `eventPayload` 最终退化成不可治理的随意 JSON，建议在规划阶段先收敛最小公共字段：

- 通用字段：`callUuid`、`threadUid`、`queueUid`、`agentUid`、`agentExtension`、`sourceExtensionNumber`、`occurredAt`、`eventSource`
- 决策类事件：`decision`、`decisionReason`、`matchedKeyword`、`withinServiceHours`、`availableAgentCount`
- ACD 类事件：`queueEntryUid`、`attemptNumber`、`selectedStrategy`、`attemptedAgents`、`ringTimeoutSeconds`
- 通话类事件：`agentLegUuid`、`customerUuid`、`hangupCause`、`hangupSide`
- 留言类事件：`leaveReason`、`recordingUrl`、`destinationNumber`

建议把 `eventPayload` 定义为“字段受控的 JSON 扩展区”，公共检索字段仍保留在实体列上，避免后续所有筛选都退化成 JSON 查询。

#### 0.1.3 `CallSessionEntity` 建议字段清单

建议首版字段控制在“能串联链路 + 能表达终局”这两个目标内，避免一开始把所有运行时细节都塞进主会话表：

| 字段 | 含义 | 说明 |
| --- | --- | --- |
| `uid` | 主键 | 继续沿用仓库现有实体 UID 风格 |
| `orgUid` | 组织 UID | 与现有通话、线程、留言按组织隔离 |
| `callUuid` | 呼叫唯一标识 | 全链路主关联键，建议唯一 |
| `threadUid` | 热线对话线程 | AI 对话存在时可关联 `ThreadEntity` |
| `queueUid` | 目标队列 UID | 进入 ACD 或留言前的目标队列 |
| `queueEntryUid` | 排队条目 UID | 一通电话可能只有一个主排队条目 |
| `agentUid` | 最终接听或最后尝试坐席 | 支撑运营检索和回访定位 |
| `agentExtension` | 坐席分机号 | 便于和 `CallSettingsEntity.target` 对齐 |
| `sourceExtensionNumber` | 用户拨打的分机号 | 对应热线入口，如 `1100` |
| `didNumber` | 外线 DID | 有外线入口时保留原始 DID |
| `sessionStage` | 当前阶段 | 建议值如 `AI_DIALOG`、`QUEUEING`、`RINGING`、`BRIDGED`、`WRAP_UP`、`VOICEMAIL`、`ENDED` |
| `sessionResult` | 最终结果 | 建议值如 `RESOLVED_BY_AI`、`ANSWERED_BY_AGENT`、`MISSED_TO_VOICEMAIL`、`HANGUP_BEFORE_ASSIGN` |
| `handoffSource` | 转人工来源 | 例如 `AI_HOTLINE`、`QUEUE_DIRECT`、`MANUAL_TRANSFER` |
| `voicemailUid` | 留言 UID | 进入留言后可直接关联 `VoicemailEntity` |
| `cdrUid` | 主 CDR UID | 若一个主会话只认一个主详单，可在此保留快捷关联 |
| `startedAt` | 开始时间 | 首次建会话时间 |
| `endedAt` | 结束时间 | 进入终态时写入 |

建议不要在 `CallSessionEntity` 首版直接存：`attemptedAgents`、完整 SIP headers、原始录音路径、原始 KB 检索全文。这些更适合保留在事件表或专门日志表。

#### 0.1.4 `CallLifecycleEventEntity` 建议字段清单

事件表要承担审计和回放职责，因此除了 `eventPayload` 外，还需要保留一批可索引、可聚合的顶层字段：

| 字段 | 含义 | 说明 |
| --- | --- | --- |
| `uid` | 主键 | 继续沿用统一 UID 体系 |
| `orgUid` | 组织 UID | 支撑组织级查询和归档 |
| `sessionUid` | 所属主会话 UID | 关联 `CallSessionEntity` |
| `callUuid` | 呼叫唯一标识 | 便于跳过 join 直接按通话检索时间线 |
| `threadUid` | 对话线程 UID | AI 相关事件需要 |
| `queueUid` | 队列 UID | ACD 事件需要 |
| `queueEntryUid` | 排队条目 UID | 串联单次排队尝试 |
| `agentUid` | 坐席 UID | 按人查询时使用 |
| `agentExtension` | 坐席分机号 | 便于比对 `CallSettingsEntity.target` |
| `eventCode` | 事件编码 | 例如 `ACD_ENQUEUED`、`CALL_BRIDGED` |
| `eventStage` | 事件所属阶段 | 如 `HANDOFF`、`ACD`、`CALL`、`VOICEMAIL` |
| `eventSource` | 事件来源 | 如 `QWEN_WS`、`HANDOFF_DECISION`、`ACD_SERVICE`、`ESL`、`VOICEMAIL_SERVICE` |
| `idempotencyKey` | 事件幂等键 | 支撑重复投递去重 |
| `occurredAt` | 事实发生时间 | 以业务事实时间为准 |
| `payloadVersion` | payload 版本 | 便于后续 JSON 结构演进 |
| `eventPayload` | 事件详情 JSON | 存放扩展信息 |

建议把 `eventCode` 视为稳定契约，而不是日志文案。也就是说，前端、报表、排障查询应依赖 `eventCode` 判断，不依赖 `eventPayload` 某个临时字段是否存在。

#### 0.1.5 首版建议事件枚举

为了避免实现阶段各处随手命名事件，建议在规划中先固定第一批事件编码：

- `EXTENSION_DIALED`
- `THREAD_CREATED`
- `HANDOFF_DECIDED`
- `ACD_ENQUEUED`
- `AGENT_SELECTED`
- `AGENT_RINGING`
- `AGENT_ANSWERED`
- `CALL_BRIDGED`
- `CALL_HANGUP`
- `WRAP_UP_STARTED`
- `WRAP_UP_COMPLETED`
- `TRANSFERRED_TO_VOICEMAIL`
- `VOICEMAIL_SAVED`
- `SESSION_ENDED`

建议首版不要把“每一次 AI token 输出”“每一条普通聊天消息”“每一个 SIP 心跳”都纳入生命周期事件，否则事件表会迅速膨胀且失去时间线可读性。

知识库检索相关事件建议作为“首版可选增强”而不是“首版强制事件”：

- 如果本次重点是先打通 `callUuid -> queue -> agent -> voicemail` 主链路，可暂不把 `KB_SEARCH_REQUESTED`、`KB_SEARCH_HIT`、`KB_SEARCH_MISS` 纳入首批必做事件。
- 如果需要证明 AI 热线在真实呼叫中确实触发了知识库检索，则可把这三类事件作为阶段 0 的增强项写入 `CallLifecycleEventEntity`，但不要阻塞主链路落库上线。

desktop 坐席动作类事件建议和阶段 2 同步确认。如果首版已经实现坐席主动拒接、提前完成话后整理等动作，则不应只停留在前端状态里：

- 坐席主动拒接建议追加 `AGENT_REJECTED`，并在 payload 中记录 `rejectReason`、`agentExtension`、`queueEntryUid`。
- 坐席振铃超时建议追加 `AGENT_NO_ANSWER`，用于区分“坐席明确拒接”和“无人应答”。
- 坐席提前结束话后整理不需要新增事件编码，可继续使用 `WRAP_UP_COMPLETED`，但 payload 中应带 `completionSource=AGENT|TIMEOUT`。

如果阶段 2 首版只展示 ACD 上下文、不开放拒接和提前完成整理按钮，则上述事件可以作为阶段 2 增强项，不影响阶段 0 主链路上线。

#### 0.1.6 字段归属矩阵

为了避免后续实现时把同一份业务事实散落到多张表、最后谁都不是权威来源，建议先明确“哪类字段应该落在哪张表”：

| 字段/信息 | 主归属实体 | 辅助归属实体 | 原则 |
| --- | --- | --- | --- |
| `callUuid` | `CallSessionEntity` | `CallLifecycleEventEntity`、`CdrEntity`、`AcdQueueEntryEntity`、`VoicemailEntity` | 作为全链路关联键，可复制到结果表，但以主会话表为主线入口 |
| `threadUid` | `CallSessionEntity` | `CallLifecycleEventEntity`、`CdrEntity` | 主会话表保存稳定关联，事件表仅做时间线检索辅助 |
| `queueUid` | `CallSessionEntity` | `CallLifecycleEventEntity`、`AcdQueueEntryEntity`、`VoicemailEntity` | 会话表保存“本次通话最终归属/目标队列”，队列条目表保存排队时快照 |
| `queueEntryUid` | `AcdQueueEntryEntity` | `CallSessionEntity`、`CallLifecycleEventEntity` | 排队条目是权威来源，会话表仅保存主关联 |
| `agentUid` | `CallSessionEntity` | `CallLifecycleEventEntity`、`AcdAgentStateEntity`、`CdrEntity`、`VoicemailEntity` | 会话表保存最终接听或最后处理坐席，事件表记录过程中的每次变化 |
| `agentExtension` | `CallSessionEntity` | `CallLifecycleEventEntity`、`AcdQueueEntryEntity` | 作为展示与排障字段保留，但权威配置仍来自 `CallSettingsEntity.target` |
| `sourceExtensionNumber` | `CallSessionEntity` | `CallLifecycleEventEntity`、`VoicemailEntity` | 入口分机号应可稳定回放，不应只留在 FreeSWITCH 通道变量 |
| `didNumber` | `CallSessionEntity` | `VoicemailEntity`、`CdrEntity` | 对外线入口场景保留一次即可，避免每张表都存不同版本 |
| `sessionStage` / `sessionResult` | `CallSessionEntity` | 无 | 主会话表是呼叫当前阶段与最终结果的权威来源 |
| `eventCode` / `occurredAt` / `eventPayload` | `CallLifecycleEventEntity` | 无 | 事件表是历史轨迹的唯一权威来源 |
| `attempts` / `attemptedAgents` | `AcdQueueEntryEntity` | `CallLifecycleEventEntity` | 队列条目保留聚合结果，逐次尝试细节进事件表 |
| `status`（坐席当前态） | `AcdAgentStateEntity` | `CallLifecycleEventEntity` | 当前态仍由 `AcdAgentStateEntity` 持有，历史跃迁靠事件表或后续 history 表 |
| `recordFile` / 通话录音结果 | `CdrEntity`、`CallRecordingEntity` | `CallLifecycleEventEntity` | 录音结果实体负责可消费数据，事件表只记录“何时生成/关联成功” |
| `leaveReason` / `recordingUrl` / `callbackStatus` | `VoicemailEntity` | `CallLifecycleEventEntity` | 留言结果与处理状态由留言实体负责，事件表仅补时间线 |

字段归属的核心原则是：

- `CallSessionEntity` 负责“这通电话最后变成了什么”。
- `CallLifecycleEventEntity` 负责“这通电话中间发生过什么”。
- `AcdQueueEntryEntity`、`AcdAgentStateEntity`、`CdrEntity`、`VoicemailEntity` 继续负责各自领域结果，不因为引入生命周期模型而丢失原本职责。

#### 0.1.7 权威来源与去重规则

当多个实体都带有相似字段时，必须提前约定谁是权威来源，否则前端与运营排障会出现“同一通电话多个答案”：

- 当前会话阶段、最终结果：以 `CallSessionEntity` 为准。
- 排队当前状态、累计尝试次数：以 `AcdQueueEntryEntity` 为准。
- 坐席当前在线/可接听状态：以 `AcdAgentStateEntity` 为准。
- 最终通话详单、时长、录音主结果：以 `CdrEntity` 为准。
- 留言结果、回访状态：以 `VoicemailEntity` 为准。
- 时间线回放、原因解释、调试证据：以 `CallLifecycleEventEntity` 为准。

建议进一步约束两个实现规则：

- 不把 `CallLifecycleEventEntity` 当成新的“万能结果表”；事件表负责解释过程，不负责替代领域结果表。
- 不要求所有表字段绝对实时双向同步；允许会话表和结果表在一个短事务窗口内逐步收敛，但查询接口必须明确优先读取权威来源。

#### 0.1.8 timeline 聚合时的字段拼装顺序

为了避免 `GET /api/v1/call-session/{callUuid}/timeline` 在聚合时拼出互相矛盾的数据，建议接口层按固定顺序取值：

1. 先读取 `CallSessionEntity`，得到 `callUuid`、`sessionStage`、`sessionResult`、`queueUid`、`agentUid` 等主线摘要。
2. 再读取 `CdrEntity`、`VoicemailEntity`、`AcdQueueEntryEntity` 的结果字段，补充“最终详单”“留言结果”“排队结果”。
3. 最后按 `occurredAt ASC` 读取 `CallLifecycleEventEntity`，生成时间线卡片和原因说明。

如果聚合层发现多个结果表之间字段冲突，建议展示策略如下：

- 页面主摘要优先显示权威来源字段。
- 冲突值仅保留在时间线事件详情中，供排障时查看。
- 不在列表页直接混用不同实体的同名字段，避免运营看到互相冲突的状态文本。

#### 0.1.9 写入责任矩阵

为了避免进入实现后出现“多个服务都能写主会话”“字段补一半没人兜底”的情况，建议先把写入职责固定到类级别：

| 类/服务 | 应负责写入的主会话字段 | 应负责写入的事件 | 不应承担的职责 |
| --- | --- | --- | --- |
| `QwenRealtimeMediaWebSocketHandler` | `callUuid`、`orgUid`、`threadUid`、`sourceExtensionNumber`、初始 `sessionStage=AI_DIALOG`、`startedAt` | `EXTENSION_DIALED`、`THREAD_CREATED` | 不直接写 ACD 分配结果、留言结果 |
| `KnowledgeBaseSearchHelper` 或其调用封装层 | 无主会话摘要字段 | 可选 `KB_SEARCH_REQUESTED`、`KB_SEARCH_HIT`、`KB_SEARCH_MISS` | 不更新 `sessionStage`、`sessionResult` |
| `HotlineHandoffDecisionService` | `queueUid`、`handoffSource`、必要时更新 `sessionStage=QUEUEING` 或终结为 `ENDED` | `HANDOFF_DECIDED` | 不创建 `AcdQueueEntryEntity`、不写 `VoicemailEntity` |
| `AcdService.enqueue()` | `queueUid`、`queueEntryUid`、`sessionStage=QUEUEING` | `ACD_ENQUEUED` | 不决定 `sessionResult` 终态 |
| `AcdService.dispatchQueueEntry()` | `agentUid`、`agentExtension`、`sessionStage=RINGING` | `AGENT_SELECTED`、`AGENT_RINGING` | 不直接写 CDR 终态和留言结果 |
| `AcdService.handleChannelAnswer()` / `handleChannelBridge()` | `agentUid`、`agentExtension`、`sessionStage=BRIDGED` | `AGENT_ANSWERED`、`CALL_BRIDGED` | 不负责落最终留言状态 |
| `AcdService.handleChannelHangup()` | 终结 `sessionStage=ENDED`、补 `endedAt`、必要时写 `sessionResult` | `CALL_HANGUP`、必要时 `SESSION_ENDED` | 不负责创建留言实体 |
| `AcdService.clearAgentState()` | 不改主会话终局，只可在仍存活场景下更新 `sessionStage=WRAP_UP` | `WRAP_UP_STARTED`、`WRAP_UP_COMPLETED` | 不覆盖 `CdrEntity` 或 `VoicemailEntity` 结果 |
| `AcdService.transferCustomerToLeaveMessage()` | `sessionStage=VOICEMAIL`、补 `queueUid`、`sourceExtensionNumber`、`destinationNumber` 上下文 | `TRANSFERRED_TO_VOICEMAIL` | 不直接把留言保存逻辑塞进会话服务之外的多个地方 |
| `HotlineLeaveMessageService.saveLeaveMessage()` | `voicemailUid`、终结 `sessionResult=MISSED_TO_VOICEMAIL`、补 `endedAt` | `VOICEMAIL_SAVED`、必要时 `SESSION_ENDED` | 不反向修改 ACD 历史过程 |
| `Cdr` 持久化链路 | `cdrUid`、必要时修正 `endedAt` | 可选 `CDR_SAVED`，若首版不需要可不记 | 不应主导 `sessionStage` 业务语义 |

建议遵循一个简单原则：

- 离业务决策最近的服务，负责写决策型事件。
- 离 FreeSWITCH/ESL 事实最近的服务，负责写通话事实事件。
- 离最终结果实体最近的服务，负责封口 `sessionResult`。

#### 0.1.10 会话字段更新优先级

即使已经有责任矩阵，运行时仍可能出现多个链路先后更新同一个 `CallSessionEntity`。因此还需要定义更新优先级，避免后写入的低价值状态覆盖高价值终态：

1. 终态优先于中间态：`ENDED`、`VOICEMAIL` 一旦确认，不应被后续迟到的 `RINGING`、`QUEUEING` 覆盖。
2. 桥接态优先于振铃态：如果 `CALL_BRIDGED` 已落库，迟到的 `AGENT_RINGING` 事件只能写时间线，不能回写主会话阶段。
3. 留言终局优先于排队失败中间态：一旦 `VOICEMAIL_SAVED` 成功，`sessionResult` 固定为 `MISSED_TO_VOICEMAIL`。
4. AI 已解决优先于空转人工尝试：如果未来支持“AI 已解决不转人工”，则 `RESOLVED_BY_AI` 不应再被默认改成 `HANGUP_BEFORE_ASSIGN`。

建议在实现时提供统一的 `CallSessionService.mergeStage(...)` 或等价封装，而不是让各业务类直接裸写 `sessionStage/sessionResult`。

#### 0.1.11 缺口字段的补写责任

结合当前已知现状，文档里已经暴露出几个“如果不指定责任人，实施时很容易漏掉”的字段：

- `sourceExtensionNumber`：优先由 `QwenRealtimeMediaWebSocketHandler` 在入口建会话时写入；如果 ACD/留言链路收到更完整值，可只做补齐，不做回退覆盖。
- `destinationNumber`：AI 热线入口与留言链路都可能使用，建议以 `transferCustomerToLeaveMessage()` 进入留言前的最终值为准。
- `queueUid`：优先由 `HotlineHandoffDecisionService` 或 `AcdService.enqueue()` 写入，不要求 `VoicemailEntity` 反向回填主会话主字段。
- `agentExtension`：由 `dispatchQueueEntry()` 在选中坐席时写入，不要等到 CDR 生成后再反推。
- `endedAt`：优先由 `CALL_HANGUP` 或 `VOICEMAIL_SAVED` 触发写入，取最可信的终结时刻。

如果这些字段在不同链路拿到值的时机不同，推荐策略是“先占位、后补齐、终态不回退”，而不是等所有字段都齐了才落第一条主会话记录。

#### 0.1.12 阶段 0 实施摘要

为了便于确认后直接进入实现，阶段 0 可以压缩成下面 8 条硬约束：

1. 新增 `CallSessionEntity` 作为主会话表，`callUuid` 为全链路主关联键。
2. 新增 `CallLifecycleEventEntity` 作为时间线表，首版只覆盖关键节点，不追求记录所有细粒度日志。
3. `CdrEntity`、`AcdQueueEntryEntity` 至少补 `callUuid`，`VoicemailEntity` 继续保留 `callUuid` 幂等语义。
4. 数据库变更通过 [starter/src/main/resources/db/changelog/master.xml](/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x/starter/src/main/resources/db/changelog/master.xml) 引入 migration 文件，按小步 changeSet 发布。
5. `CallSessionEntity` 负责当前阶段与最终结果，`CallLifecycleEventEntity` 负责解释过程，现有结果表继续各管各的领域结果。
6. 写入责任按类级别固定，避免多个服务裸写同一组 `sessionStage/sessionResult` 字段。
7. 聚合查询优先读权威来源字段，时间线接口只做展示聚合，不反向定义领域结果。
8. 首次上线以主链路可回放为目标，知识库检索事件、history 子表、复杂回填属于增强项，不阻塞主链路交付。

如果你确认阶段 0 按这 8 条收口，后续实现基本可以直接拆成 migration、会话服务、事件写入、timeline 查询、callAdmin/desktop 消费五类任务。

#### 0.2 在关键链路写入生命周期事件

在以下节点插入 `CallLifecycleEventEntity` 记录，同时更新或创建 `CallSessionEntity`：

- `QwenRealtimeMediaWebSocketHandler.ensureThread()` → `THREAD_CREATED`
- `HotlineHandoffDecisionService.decide()` → `HANDOFF_DECIDED`（记录决策结果、原因、命中策略）
- `AcdService.enqueue()` → `ACD_ENQUEUED`（记录队列 UID、策略）
- `AcdService.dispatchQueueEntry()` → `AGENT_SELECTED`、`AGENT_RINGING`（记录选中坐席、第几次尝试）
- `AcdService.handleChannelAnswer()` → `AGENT_ANSWERED`、`CALL_BRIDGED`
- `AcdService.handleChannelHangup()` → `CALL_HANGUP`（记录挂断方向、原因）
- `AcdService.clearAgentState()` → `WRAP_UP_STARTED` / `WRAP_UP_COMPLETED`
- `AcdService.transferCustomerToLeaveMessage()` → `TRANSFERRED_TO_VOICEMAIL`
- `HotlineLeaveMessageService.saveLeaveMessage()` → `VOICEMAIL_SAVED`

#### 0.3 生命周期写入幂等与失败补偿

新增事件链路后，必须提前规划幂等和补偿，否则最容易出现“主流程成功，事件漏写”或“重试导致重复事件”两类问题。

- `CallSessionEntity` 采用 `callUuid` 幂等 upsert 语义：同一通话重复进入相同节点时更新主线，不重复创建会话。
- `CallLifecycleEventEntity` 建议引入事件幂等键，例如 `callUuid + eventCode + legUuid + attemptNumber`，避免 ESL 重复投递时产生重复事件。
- 对非终态事件允许“至少一次”写入，但前端时间线展示时应按幂等键去重。
- 对终态事件，如 `CALL_HANGUP`、`VOICEMAIL_SAVED`，应保证数据库层可判重，避免同一通话出现多个终态。
- 如果事件写入失败，不应回滚核心通话链路；建议记录错误日志并进入异步补偿任务，而不是影响坐席接听或留言保存主流程。

#### 0.4 生命周期查询与展示优先级

为了避免新表落地后无人消费，建议在规划阶段就明确第一批消费方：

- callAdmin CDR 详情页：展示单通电话的事件时间线。
- callAdmin 留言详情页：展示“为什么转人工失败并最终留言”的路径。
- desktop `CallRightColumn`：展示当前通话最近几个关键事件，而不是全量原始 JSON。
- 排障场景：支持按 `callUuid` 一键串联 `ThreadEntity`、`MessageEntity`、`AcdQueueEntryEntity`、`CdrEntity`、`VoicemailEntity`、`CallLifecycleEventEntity`。

### 阶段 1：加固管理面（后端 + callAdmin）

**目标**：让管理员可以在 callAdmin 中为一键完成"分机 → 队列 → 坐席成员"的配置。

#### 1.1 `CallQueueAgentDrawer` 增加自动带出与状态提示

当前 drawer 已有坐席搜索能力，下一步重点不是重做选择器，而是补强选中后的联动：

- 选中坐席后，自动查询该坐席的 `CallSettingsEntity`
- 预填 `agentExtension = callSettings.target`
- 在表单中展示只读提示：`CallSettings.enabled`、`registrationStatus`、`signedIn`
- 如果没有 `CallSettingsEntity`，提示"该客服尚未配置桌面分机，保存后无法参与 ACD 分配"

#### 1.2 `CallQueueAgentRestService` 补充 `agentExtension` 自动推导

后端在创建 `CallQueueAgentEntity` 时：

- 如果请求中未提供 `agentExtension`，自动从 `CallSettingsRepository.findByAgentUidAndOrgUid()` 读取 `target` 字段填充
- 校验 `agentUid` 对应的 `AgentEntity` 存在且启用
- 可选增强：若请求传入的 `agentExtension` 与 `CallSettings.target` 不一致，默认以后者为准并记录 warn 日志，避免静默漂移

#### 1.3 `CallQueueTable` 增加"来源分机号"列

新增可选列（`extensionNumber`），展示该队列是由哪个分机号自动创建的：

- 可选方案 A：在 `CallQueueEntity` 增加来源分机字段，例如 `sourceExtensionUid` / `sourceExtensionNumber`
- 可选方案 B：保留现有表结构，通过 `ExtensionEntity.queueUid -> CallQueueEntity.uid` 反查来源分机

当前更推荐方案 B，原因是 `CallQueueEntity` 现有实体只有 `name`、`description`、`type` 等基础字段，没有通用 `extra` 字段；直接写成 `extra` 会和当前实现不一致。

#### 1.4 增加队列配置健康度提示

建议在 `CallQueueTable` 展开成员表时增加只读状态列或提示条，至少显示：

- 坐席是否存在 `CallSettingsEntity`
- `target` 是否为空
- `registrationStatus` 是否为空
- `AcdAgentStateEntity.status` 当前值

这样管理员不用切三张表就能判断为什么该成员不参与分配。

#### 1.5 加固留言结果在呼叫运营入口中的展示

当前 `CallCdr` 已经把 `VoicemailTable` 作为一个 tab，形成了统一运营入口：

- `外部通话`
- `内部通话`
- `语音留言`

下一步重点不是再新增 tab，而是让这个 tab 能解释“为什么 1100 没有转到人工”：

- 补充 `VoicemailResponse` 的只读展示字段：`queueName`、`destinationExtensionNumber`、`callbackAgentNickname`。
- 补充 `recordingPlaybackUrl`，让前端拿到可直接播放或下载的地址。
- 在查询条件中支持按 `callUuid`、`queueUid`、`destinationNumber` 过滤，方便从 CDR 或生命周期事件跳转过来。

### 阶段 2：打通 Desktop 坐席接听（前端 + 实时通信）

**目标**：坐席在 desktop `Callcenter` 中能看到 ACD 来电、振铃、接听、挂断。

#### 2.1 ACD 来电实时通知

`AcdService` 在 `originate` 坐席后，通过现有 `NotificationService` / websocket / MQTT 推送一条通知到目标坐席的 desktop 端：

```json
{
  "type": "ACD_CALL_INCOMING",
  "queueEntryUid": "entry-xxx",
  "callerIdNumber": "13800138000",
  "queueName": "1100",
  "agentLegUuid": "...",
  "sourceExtensionNumber": "1100",
  "handoffSource": "AI_HOTLINE"
}
```

desktop `Callcenter` 订阅该通知类型，弹出"来电接听"弹窗。

这里建议明确：

- SIP 来电本身仍由现有 `SipCallProvider` 负责接听控制。
- `ACD_CALL_INCOMING` 业务事件负责补齐队列上下文，而不是替代 SIP 信令。
- 前端应把两条信息合并显示：SIP 会话解决"能不能接"，ACD 事件解决"这通电话属于哪个队列任务"。

#### 2.2 `SoftphoneToolbar` 或 `CallMiddleColumn` 新增接听/拒接/挂断 UI

这一步不建议重做一套新弹窗，优先复用现有 `SipIncomingModal` / `SipOutgoingModal` / `SipCallPanel`，只在其上补 ACD 字段：

- **来电弹窗**：展示主叫号码、队列名、接听/拒接按钮
- **通话中面板**：展示通话信息 + 挂断按钮
- **话后整理面板**：倒计时 + "完成整理"按钮

底层通过 `uuid_answer` / `uuid_kill` 等 ESL 指令驱动 FreeSWITCH。

建议再补一个前端状态对象，例如：

```ts
type ActiveAcdAssignment = {
  queueEntryUid: string;
  queueUid: string;
  queueName: string;
  sourceExtensionNumber?: string;
  callerIdNumber?: string;
  handoffSource?: 'AI_HOTLINE' | 'QUEUE_DIRECT' | 'MANUAL_TRANSFER';
  agentLegUuid?: string;
};
```

该状态由 `Callcenter` 页面持有，再透传给 `SipIncomingModal` / `SipCallPanel` / `CallRightColumn`。

#### 2.3 `CallRightColumn` 增加"当前通话信息"卡片

在右侧面板中展示当前选中 CDR 对应通话的详情（主叫号码、坐席、通话时长、录音链接等）。

建议额外加入：

- 当前 `queueEntryUid`
- 当前 `AcdAgentState.status`
- 是否由 AI 热线触发转人工
- 转人工前的 threadUid 或 callUuid（如果当前后端上下文可取）

### 阶段 3：端到端验证

**目标**：真实拨测 `1100`，确认"AI 对话 → 转人工 → 坐席振铃 → 坐席接听 → 通话 → 挂断"全链路。

建议把验证拆成三层：

1. **配置层验证**：创建分机、自动生成队列、添加队列成员、确认 `agentExtension` 自动带出正确。
2. **状态层验证**：坐席 desktop 成功注册 SIP 后，`CallSettingsTable.registrationStatus` 与 `AcdAgentStateTable.status` 都能看到变化。
3. **业务层验证**：真实拨号到 `1100`，触发 AI 转人工后，desktop 收到 ACD 上下文并可完成接听、挂断、wrap-up 恢复。
4. **失败兜底验证**：让坐席保持离线或故意不接听，确认流程会落 `VoicemailEntity`，并且可以在 `CallCdr` 的 `语音留言` tab 中查看主叫、队列、回呼状态和录音链接。

### 阶段 4：回归与观测

**目标**：保证新配置和留言兜底不会破坏现有呼叫记录与软电话流程。

建议增加以下验证点：

1. `AcdService`：构造 `maxAttempts=1` 的队列条目，验证 RINGING 超时后状态变为 `FAILED`，并触发 `leave_msg_dispatcher` 转接。
2. `HotlineLeaveMessageService`：同一 `callUuid` 重复保存时不产生重复 `VoicemailEntity`。
3. `VoicemailTable`：无录音、HTTP 录音、本地路径录音三种记录都能正常展示；不可播放路径至少不能导致表格报错。
4. `CallCdr`：切换外部通话、内部通话、语音留言 tab 时互不影响各自查询参数。

## 7. 推荐接口与数据流补充

### 7.1 管理端接口建议

- `CallQueueAgentResponse` 建议补充只读字段：`agentNickname`、`agentAvatar`、`callSettingsTarget`、`registrationStatus`、`acdStatus`
- `CallQueueTable` 的查询接口建议补充：`sourceExtensionUid`、`sourceExtensionNumber`
- 如果不想在列表接口上做重 join，可单独提供 `queue health` 汇总接口给展开行使用
- `VoicemailResponse` 后续可按需补充只读字段：`queueName`、`destinationExtensionNumber`、`callbackAgentNickname`，减少运营人员手工比对 UID
- 若录音文件由 FreeSWITCH 本地保存，建议后端补充 `recordingPlaybackUrl` 或 `/api/v1/voicemail/{uid}/recording` 代理下载接口，避免前端直接暴露服务器文件路径。
- 生命周期查询接口建议默认返回“摘要 + 详情”两层结构：摘要字段用于表格筛选，事件详情用于时间线，避免 callAdmin 列表接口一次拉全量 JSON 事件。

### 7.2 Desktop 事件契约建议

除 SIP 信令外，建议新增或复用一个业务事件通道，至少覆盖：

- `ACD_CALL_INCOMING`
- `ACD_CALL_BRIDGED`
- `ACD_CALL_MISSED`
- `ACD_WRAP_UP_STARTED`
- `ACD_WRAP_UP_FINISHED`

这样 desktop 的呼叫中心页面可以把"软电话状态"和"队列任务状态"拆开管理，避免后续全部耦合到 sip.js 回调里。

### 7.3 生命周期事件接口建议

如果确认实施 `CallSessionEntity` + `CallLifecycleEventEntity`，建议同步规划三个只读查询接口：

- `GET /api/v1/call-session/query`：按 `callUuid`、`threadUid`、`queueUid`、`agentUid`、`sessionStage` 查询呼叫主线。
- `GET /api/v1/call-lifecycle-event/query`：按 `callUuid` 或 `sessionUid` 查询事件时间线。
- `GET /api/v1/call-session/{callUuid}/timeline`：返回面向前端展示的聚合结果，避免 callAdmin 和 desktop 各自重复拼装 `CdrEntity`、`VoicemailEntity`、`AcdQueueEntryEntity`。

这些接口不替代现有 `CdrEntity`、`AcdQueueEntryEntity`、`VoicemailEntity` 查询，而是用于把它们串成一条可回放链路。callAdmin 可在 CDR、队列条目、留言详情页展示“呼叫时间线”；desktop 可在当前通话面板中展示最近的 ACD 事件。

接口层建议补充两个约束：

- 查询接口默认按 `occurredAt ASC` 返回时间线，前端不自行猜测排序规则。
- 对 `eventPayload` 进行脱敏输出，避免把完整 SIP header、内部文件路径或潜在敏感上下文原样暴露到前端。

聚合时间线接口建议最少返回以下结构，便于 callAdmin 和 desktop 共用：

- `session`: `callUuid`、`threadUid`、`queueUid`、`agentUid`、`sessionStage`、`sessionResult`
- `cdr`: 主 CDR 摘要，如开始时间、结束时间、时长、录音状态
- `voicemail`: 留言摘要，如 `voicemailUid`、`leaveReason`、`callbackStatus`
- `events`: 已脱敏时间线数组，每项至少包含 `eventCode`、`eventStage`、`occurredAt`、`summary`

这样前端无需理解所有底层实体细节，也不会因为后端后续扩展字段而频繁改动页面拼装逻辑。

### 7.4 实施前需确认的决策项

为了避免进入实现后反复返工，建议先确认以下决策：

1. `CallQueueEntity` 是否允许新增来源分机字段，还是坚持通过 `ExtensionEntity.queueUid` 反查。
2. `CallQueueAgentDrawer` 在无 `CallSettingsEntity` 时是“允许保存但标黄警告”，还是“禁止保存”。
3. desktop ACD 上下文采用 ESL 事件透传，还是投入额外成本做 SIP header 方案。
4. `VoicemailTable` 在第一阶段是否只复用 `recordingUrl` 外链，还是同步实现后端录音代理接口。
5. `leaveReason` 是否要在本次实现中收敛为正式枚举常量，还是先沿用字符串约定。
6. `WRAP_UP` 时长是否保持 30 秒固定值，还是本次一并做成队列级/坐席级可配置项。
7. 全链路落库底座是否采用 `CallSessionEntity` + `CallLifecycleEventEntity` 两表方案，还是直接扩展 `CdrEntity` / `AcdQueueEntryEntity`。
8. 知识库检索明细是否纳入 `CallLifecycleEventEntity.eventPayload`，还是单独规划 `KnowledgeSearchLogEntity`。
9. 历史数据是否需要回填最近 N 天的 `CallSessionEntity`，还是只对新产生的呼叫启用生命周期模型。
10. `CallLifecycleEventEntity.eventPayload` 是否允许保存原始 `recordingUrl` / 本地路径，还是仅保存脱敏后的可展示字段。
11. desktop 坐席主动拒接、提前完成话后整理等动作，是否在本次作为 `CallLifecycleEventEntity` 事件落库，还是先只依赖 SIP/ESL 事实事件回写。

#### 7.4.1 当前是否已具备开工条件

结论：**可以开始实现，但应按“先开工非阻塞阶段，冻结少数阻塞决策”的方式推进。** 当前文档已经足够支持阶段 0 和阶段 1 开工，不必等所有增强项都确认完。

可直接按文档默认方案开工的事项：

1. 生命周期底座采用 `CallSessionEntity` + `CallLifecycleEventEntity` 两表方案，不再退回“只扩 `CdrEntity` / `AcdQueueEntryEntity`”路线。
2. `CallQueueTable` 的来源分机号首版按 `ExtensionEntity.queueUid` 反查，不先给 `CallQueueEntity` 加来源字段。
3. desktop ACD 上下文首版采用 ESL 事件透传，不走 SIP header 方案。
4. 知识库检索事件不是首版阻塞项，先不纳入必做事件集合。
5. 历史数据回填不是首版阻塞项，先只保证新产生呼叫写入生命周期模型。
6. `eventPayload` 默认按脱敏输出设计，不向前端直接暴露原始本地录音路径或完整 SIP 头。

仍会阻塞对应阶段启动的少数决策：

1. `CallQueueAgentDrawer` 在无 `CallSettingsEntity` 时是“允许保存但警告”还是“禁止保存”。
说明：这会影响阶段 1 表单交互和后端校验策略，建议首版采用“允许保存但警告”，避免误伤现有配置。
2. `VoicemailTable` 首版是直接复用 `recordingUrl` 外链，还是同步实现后端录音代理接口。
说明：这会影响阶段 1.5 的接口边界；如果录音路径多数仍是本地文件，建议直接把代理接口纳入首版，而不是继续依赖前端直连路径。
3. `leaveReason` 是否在本次收敛为正式枚举。
说明：这会影响阶段 0 事件 payload、阶段 1 留言查询和后续统计口径，建议首版就冻结枚举，避免后续回补成本。
4. desktop 坐席主动拒接、提前完成话后整理等动作是否在本次同步落生命周期事件。
说明：这不会阻塞阶段 0 和阶段 1，但会影响阶段 2 的前后端事件契约；若阶段 2 首版只做接听展示，可延后为增强项。

因此，若现在要正式进入实现，推荐按下面方式收口：

- 立即开工：阶段 0、阶段 1.1、阶段 1.2、阶段 1.3、阶段 1.4。
- 先补一轮实现前拍板：阶段 1.5 和阶段 2 相关决策。
- 作为增强项后置：KB 检索事件、历史回填、坐席主动拒接/提前结束整理的精细事件化。

### 7.5 Desktop 接收 ACD 事件的技术方案

当前 originate 时已在坐席腿上设置了 `acd_queue_entry_uid`、`hotline_queue_uid`、`acd_agent_uid` 等通道变量，但 desktop 无法直接读取 FreeSWITCH 通道变量。推荐以下两种方案之一：

#### 方案 A：ESL 事件透传（复用现有机制）

- `AcdService` 已有 ESL 事件监听 (`handleChannelAnswer` / `handleChannelBridge` / `handleChannelHangup`)
- 在 `handleChannelAnswer` 时，通过现有 websocket/MQTT 把 `AcdQueueEntry` 的上下文推送给目标坐席
- 优点：不新增 FreeSWITCH 依赖，事件源可靠
- 缺点：有一定延迟（ESL 事件 → Java → websocket → 前端）

#### 方案 B：SIP 消息头扩展

- 在 originate 时将 ACD 上下文注入 SIP INVITE 的自定义 header（如 `X-Acd-Queue-Name`）
- desktop sip.js 在 `invite` 事件中解析这些 header
- 优点：零额外延迟，SIP 信令自带上下文
- 缺点：依赖 sip.js 的 header 解析能力，需确认中间 SIP proxy/FreeSWITCH 不会丢弃自定义 header

推荐优先使用**方案 A**，因为现有 ESL 事件通道已成熟，且 SIP header 方案在不同网络拓扑下可靠性不可控。

### 7.6 留言处理状态建议

`VoicemailEntity.callbackStatus` 建议统一使用以下状态：

- `PENDING`：已留言，尚未回访
- `ASSIGNED`：已分配回访坐席
- `IN_PROGRESS`：正在回访或处理中
- `DONE`：已完成回访
- `FAILED`：回访失败或无需回访

`handledAt` 应只在进入终态时写入；`callbackAgentUid` 用于记录实际处理坐席。

## 8. 验收标准

1. 管理员在 `CallQueueTable` 中新增队列成员时，不再需要手动抄写 `agentUid` 和 `agentExtension` 才能形成有效配置。
2. 管理员能在 callAdmin 明确看到一个队列来源于哪个分机号，以及每个队列成员当前是否具备可分配条件。
3. desktop 坐席在收到 ACD 分配来电时，现有 SIP 来电弹窗能显示队列名、主叫号码和转人工来源。
4. 坐席接听、拒接、挂断后，`AcdQueueEntryEntity` 与 `AcdAgentStateEntity` 的状态变化能被前端感知并展示。
5. 一次真实 `1100` 转人工拨测结束后，管理员能在 callAdmin 和 desktop 两侧回放出完整状态链路，并能通过 `callUuid` 串联 `CallSessionEntity`、`CallLifecycleEventEntity`、`ThreadEntity`、`MessageEntity`、`AcdQueueEntryEntity`、`CdrEntity`、`VoicemailEntity`。
6. 当转人工失败且进入留言分支时，系统能生成 `VoicemailEntity`，并可在 `CallCdr` 的 `语音留言` tab 中直接查看和播放录音。
7. 留言记录的 `callUuid` 幂等有效，同一通电话重复调用保存接口不会产生重复留言。
8. 如果录音地址暂时不可访问，表格仍能显示留言元数据，并给出明确的不可播放状态。
9. 全链路落库底座实施后，关键事件至少覆盖 `EXTENSION_DIALED`、`THREAD_CREATED`、`HANDOFF_DECIDED`、`ACD_ENQUEUED`、`AGENT_SELECTED`、`AGENT_RINGING`、`AGENT_ANSWERED`、`CALL_BRIDGED`、`CALL_HANGUP`、`WRAP_UP_STARTED`、`WRAP_UP_COMPLETED`、`TRANSFERRED_TO_VOICEMAIL`、`VOICEMAIL_SAVED`、`SESSION_ENDED`。
10. `CallSessionEntity` 和 `CallLifecycleEventEntity` 的字段命名、事件编码、索引策略在首版上线前完成冻结，避免开发中途继续漂移。

## 9. 不涉及的范围

| 项目 | 说明 |
| --- | --- |
| 外线号码管理 | DID 购买、运营商对接不在本次范围 |
| IVR 嵌套转人工 | IVR 工作流内的转人工节点为后续规划 |
| 坐席排班 | 后续规划 |
| 多队列技能路由 | 后续规划 |
| 独立留言播放器 | 当前先复用 `recordingUrl` 打开录音，若需内嵌播放器再单独规划 |

## 10. 与现有规划的关系

- [2026-07-24-call-thread-message-persistence.md](./2026-07-24-call-thread-message-persistence.md)：通话 Thread/Message 持久化已在本次同步实施，Desktop 端展示呼叫消息时将自动受益于该基础。
- [2026-07-20-9205-concurrent-ai-human-handoff-plan.md](./2026-07-20-9205-concurrent-ai-human-handoff-plan.md)：描述了 AI 热线入口动态化、转人工决策、队列坐席模型和 ACD 策略。本规划是其 Desktop 坐席接听 UI + 管理面补全的子集，两者共享 `CallQueueEntity` / `CallQueueAgentEntity` / `AcdService` 等数据模型和运行时基础。

## 11. 风险与限制

### 11.1 已知限制

| 风险项 | 影响 | 缓解措施 |
| --- | --- | --- |
| `AcdService` 全内存状态（`ConcurrentHashMap`） | 应用重启后排队来电、桥接关系全部丢失，坐席状态需从 DB 重建 | 重启后依赖 `AcdAgentStateEntity` DB 记录恢复；排队中的来电无法恢复（FreeSWITCH channel 也已断开） |
| `CallSessionEntity` / `CallLifecycleEventEntity` 引入后与现有实体不一致 | 如果生命周期事件在 ACD 写入和 ESL 事件之间存在时序差，可能出现"事件说已桥接但 ACD 条目仍为 RINGING"的情况 | 事件写入以 ACD 条目状态变更成功为前提；`CallLifecycleEventEntity` 定义为"已发生事实"而非"权威状态" |
| `transferCustomerToLeaveMessage()` 缺少 `hotline_destination_number` | ACD 超时转留言时，`VoicemailEntity.destinationNumber` 为空，运营无法直接从留言记录知道入口分机 | 在 `transferCustomerToLeaveMessage` 中补充 `uuidSetVar("hotline_destination_number", ...)` |
| `recordingUrl` 可能是 FreeSWITCH 本地路径 | 前端无法直接播放或下载本地路径的 WAV 文件 | 后续增加录音代理接口 `/api/v1/voicemail/{uid}/recording` |
| `WRAP_UP` 时长硬编码 30s | 无法按业务场景配置话后整理时长 | 后续从 `CallQueueEntity` 或 `CallSettingsEntity` 读取可配置的 wrap-up 时长 |
| `CallQueueAgentEntity.agentExtension` 与 `CallSettingsEntity.target` 可能不一致 | 导致 `hasAvailableAgent()` 漏判可用坐席 | 实施阶段 1.2 的自动推导与同步机制 |
| desktop 跨 tab SIP 状态同步 (`sharedSipCallSync`) | 当前机制基于 `SharedSipCallUpdate` 事件，需要确认 ACD 事件是否需要纳入该同步机制 | 实施阶段 2 需先分析 `sharedSipCallSync` 的事件模型 |

### 11.2 实施风险

| 风险 | 概率 | 影响 | 缓解 |
| --- | --- | --- | --- |
| desktop sip.js 与 ACD 事件时序不一致 | 中 | desktop 先收到 SIP INVITE 再收到 ACD 业务事件，弹窗可能短暂缺少队列名 | 前端用 `queueEntryUid` 做关联键，先展示 SIP 来电基本信息，ACD 上下文到达后增量更新 |
| `CallQueueAgentDrawer` 改动影响现有配置流程 | 低 | 已有线上配置可能被新校验拦截 | 改动以"自动带出"为主，不强制校验失败阻止保存 |
| ESL 事件在高并发下丢失 | 低 | `AcdQueueEntry` 状态卡在 RINGING/BRIDGED | 已有 `reconcileQueue()` 3s 定时修复 RINGING 超时和 WRAP_UP 过期 |
| 生命周期事件写入过多导致表膨胀 | 中 | `bytedesk_call_lifecycle_event` 增长过快，时间线查询和统计性能下降 | 首版只记录关键事件；建立 `callUuid/occurredAt` 索引；按月归档或冷热分层 |
| `eventPayload` 结构失控 | 中 | 不同代码路径写入不同 JSON 结构，前端和统计逻辑难以复用 | 在规划阶段先定义最小公共字段和事件类型契约，新增字段走集中评审 |
| Liquibase 迁移和旧数据兼容处理不完整 | 中 | 生产升级时出现锁表、空字段或旧数据不可读 | 拆分小步 changeSet；先增字段再启用新写入；历史数据允许为空并回退旧视图 |

## 12. 工作量估算（仅供参考，待确认后细化）

| 阶段 | 内容 | 估时 | 依赖 |
| --- | --- | --- | --- |
| 阶段 0.1 | `CallSessionEntity` / `CallLifecycleEventEntity` 建模、Repository、Liquibase、索引、基础查询接口 | 2d | 决策项 7 |
| 阶段 0.2 | 在 AI 决策、ACD 入队、振铃、桥接、转留言、留言保存链路写入生命周期事件 | 2d | 阶段 0.1 |
| 阶段 0.3 | 生命周期时间线聚合接口、脱敏与幂等补偿 | 1d | 阶段 0.2 |
| 阶段 1.1 | `CallQueueAgentDrawer` 自动带出与状态提示 | 1d | 无 |
| 阶段 1.2 | `CallQueueAgentRestService` agentExtension 自动推导 | 0.5d | 无 |
| 阶段 1.3 | `CallQueueTable` 来源分机号列 | 0.5d | 方案确认：新增字段或 `ExtensionEntity.queueUid` 反查 |
| 阶段 1.4 | 队列配置健康度提示 | 1d | 阶段 1.1 |
| 阶段 1.5 | `VoicemailResponse` 补充 `queueName`、`destinationExtensionNumber`、`recordingPlaybackUrl` | 0.5d | 现有 `VoicemailTable` |
| 阶段 2.1 | ACD 来电实时通知（ESL → websocket → desktop） | 2d | 阶段 1（需要队列存在） |
| 阶段 2.2 | desktop 接听/拒接/挂断 UI 适配 ACD 字段 | 1.5d | 阶段 2.1 |
| 阶段 2.3 | `CallRightColumn` 当前通话信息卡片 | 1d | 阶段 2.1 |
| 阶段 3 | 端到端验证 | 1d | 全部前序阶段 |
| 阶段 4 | 回归与观测 | 0.5d | 阶段 3 |
| **合计** | | **约 14d** | |

> 以上估时基于单人全职开发，不含联调等待和 FreeSWITCH 环境问题排查。
