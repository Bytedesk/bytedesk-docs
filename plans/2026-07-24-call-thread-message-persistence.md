# 分机通话对话持久化规划

> 日期：2026-07-24
> 状态：**已实施**（已完成代码落地与编译验证）
> 关联 TODO：[TODO-2026.md](../TODO-2026.md) "将跟 ExtensionEntity 中 extensionNumber 分机号对话过程中的所有对话都持久化"

## 1. 目标

为实时媒体桥（`QwenRealtimeMediaWebSocketHandler`）中每通电话生成 `ThreadEntity`（类型 `CALLCENTER`），并将通话中所有对话内容（用户语音转文字、AI 回复、KB 命中回复、系统事件）落为 `MessageEntity`，最终在 Desktop 客服端和管理后台可查看。

## 2. 状态分析

### 2.1 已具备的基础设施

| 能力 | 位置 | 说明 |
| ------ | ------ | ------ |
| `ThreadTypeEnum.CALLCENTER` | `modules/core/.../ThreadTypeEnum.java` | 枚举值 19，已存在 |
| `CdrEntity.threadUid` | `enterprise/call/.../CdrEntity.java` | CDR 到 Thread 的关联字段已预留 |
| `MessageEntity` | `modules/core/.../MessageEntity.java` | 消息实体完整 |
| `MessagePersistService` | `modules/core/.../MessagePersistService.java` | 消息异步持久化服务，接受 `MessageProtobuf` JSON |
| `MessageUtils` | `modules/core/.../utils/MessageUtils.java` | 静态方法构造各类 `MessageProtobuf`（系统消息、通知等） |
| `UidUtils` | `modules/core/.../UidUtils.java` | 生成唯一 UID |
| `UserUtils.getSystemUser()` | `modules/core/.../UserUtils.java` | 获取系统用户 `UserProtobuf` |
| `ThreadRepository` | `modules/core/.../ThreadRepository.java` | JPA Repository，可直接 `save()` |
| `UserService.findByUid()` | `modules/core/.../UserService.java` | 可获取系统用户 `UserEntity` 作为 Thread owner |
| `ChannelEnum.PHONE` | `modules/core/.../ChannelEnum.java` | 现有电话通道枚举，本次 Thread/Message 统一使用 |

### 2.2 当前通话链路中已有的数据

实时媒体桥（`QwenRealtimeMediaWebSocketHandler.BridgeSession`）：

| 数据 | 来源 | 当前用途 |
| ------ | ------ | ---------- |
| `uuid` | `setMetadata()` → `metadata.uuid` | ESL broadcast 目标 |
| `caller` | `setMetadata()` → `metadata.caller` | 主叫号码，Lua 已透传 |
| `botDid` | `setMetadata()` → `metadata.botDid` | 分机号（如 `1100`） |
| `orgUid` | `setMetadata()` → `metadata.orgUid` | 租户 ID |
| `conversationId` | `setMetadata()` → `metadata.conversationId` | 通话会话 ID |
| 用户转写文本 | `input_audio_transcription.completed` | KB 检索 + 日志 |
| AI 回复转写 | `response.audio_transcript.done` | TTS 播报 |
| KB 命中回复 | `handleInputTranscriptCompleted()` | 注入 assistant message + TTS |

### 2.3 实施结果

- `QwenRealtimeMediaWebSocketHandler` 已注入 `ThreadRepository`、`UserService`、`MessagePersistService`、`UidUtils`
- realtime hotline 已按 `call-thread-{uuid}` 幂等创建 `ThreadEntity`
- 用户转写、AI 回复、KB 回复、系统事件已落库为 `MessageEntity`
- `BridgeSession` 已持有 `threadUid`、`callerNumber`，并在创建 Thread 后写回 ESL channel variable `thread_uid`
- `CdrEslSyncService` 已补齐 `thread_uid` / `variable_thread_uid` 到 `CdrRequest.threadUid` 的映射
- visitor 端主聊天视图已补 `EVENT` 渲染分支，避免事件消息落入默认文本渲染
- desktop 端主聊天视图已补 `EVENT → NoticeMsg` 分发
- 新增 `EventContent` 内容模型，EVENT 消息 content 不再使用匿名 Map/JSON
- 新增 `SystemContent` 内容模型，SYSTEM / AGENT_CLOSED / AUTO_CLOSED / LEAVE_MSG 消息 content 已统一为结构化 JSON
- `ThreadMessageUtil`、`MessageUtils`、`TicketThreadRoutingStrategy` 中系统类消息已切换为 `SystemContent`
- `NotificationRealtimeService` 中工单通知实时链路（NOTICE）已将内层 content 升级为 `SystemContent` JSON
- 回合制 `/turn` 路径（`QwenRealtimeVoiceAgentService`）仍未持久化，维持为本次不涉及范围

## 3. 改动范围

本次实施涉及以下文件：

**后端核心改动：**

```text
enterprise/call/src/main/java/com/bytedesk/call/visitor/QwenRealtimeMediaWebSocketHandler.java
enterprise/call/src/main/java/com/bytedesk/call/cdr/CdrEslSyncService.java
```

**后端内容模型新增：**

```text
modules/core/src/main/java/com/bytedesk/core/message/content/EventContent.java
modules/core/src/main/java/com/bytedesk/core/message/content/SystemContent.java
```

**后端系统消息出口改造：**

```text
modules/service/src/main/java/com/bytedesk/service/utils/ThreadMessageUtil.java
modules/core/src/main/java/com/bytedesk/core/message/utils/MessageUtils.java
modules/ticket/src/main/java/com/bytedesk/ticket/routing_strategy/TicketThreadRoutingStrategy.java
modules/core/src/main/java/com/bytedesk/core/notification/NotificationRealtimeService.java
channels/wechat/src/main/java/com/bytedesk/wechat/work/kefu/session/WeChatWorkSessionApiService.java
```

**后端回归测试：**

```text
modules/service/src/test/java/com/bytedesk/service/utils/ThreadMessageUtilTest.java
modules/core/src/test/java/com/bytedesk/core/notification/NotificationRealtimeServiceTest.java
enterprise/call/src/test/java/com/bytedesk/call/cdr/CdrEslSyncServiceTest.java
```

**前端类型定义：**

```text
frontend/apps/visitor/src/@types/core/message.d.ts
frontend/apps/desktop/src/@types/core/message.d.ts
frontend/apps/visitor/src/@types/core/notice.d.ts
frontend/apps/desktop/src/@types/core/notice.d.ts
```

**前端渲染入口：**

```text
frontend/apps/visitor/src/pages/Chat/components/MessageRenderer.tsx
frontend/apps/desktop/src/pages/Dashboard/Home/Chat/components/MessageRenderer.tsx
```

**前端系统消息/通知组件：**

```text
frontend/apps/visitor/src/components/ChatUI/components/Message/SystemMessage.tsx
frontend/apps/desktop/src/components/ChatUI/components/Message/SystemMessage.tsx
frontend/apps/visitor/src/components/Bubbles/LeaveMsg/index.tsx
frontend/apps/desktop/src/components/Bubbles/LeaveMsgBubble/index.tsx
frontend/apps/visitor/src/components/Bubbles/NoticeMsg/index.tsx
frontend/apps/desktop/src/components/Bubbles/NoticeMsg/GeneralNotice.tsx
frontend/apps/desktop/src/components/Bubbles/NoticeMsg/index.tsx
```

说明：

- `QwenRealtimeMediaWebSocketHandler` 负责创建 Thread、落 Message、写入 channel variable `thread_uid`
- `CdrEslSyncService` 负责从 ESL headers 中读取 `thread_uid` / `variable_thread_uid` 并写入 `CdrRequest.threadUid`
- `EventContent` 是 EVENT 消息的正式内容模型（`type`/`title`/`content`），替代原先匿名 Map 拼 JSON
- `SystemContent` 是 SYSTEM / AGENT_CLOSED / AUTO_CLOSED / LEAVE_MSG 的正式内容模型
- `ThreadMessageUtil` / `MessageUtils` / `TicketThreadRoutingStrategy` / `WeChatWorkSessionApiService` 中原先用纯字符串写入系统消息的出口已统一迁移为 `SystemContent`
- `NotificationRealtimeService` 中 NOTICE 实时推送的内层 content 已升级为 `SystemContent` JSON
- visitor 和 desktop 的 `MessageRenderer` 均已显式处理 `EVENT → NoticeMsg` 分发
- visitor 和 desktop 的 `SystemMessage` 与 `LeaveMsg` 气泡已兼容解析结构化 `SystemContent`
- visitor 和 desktop 的 `NoticeMsg` / `GeneralNotice` 已兼容解包内层 `SystemContent`/`EventContent`
- 不使用 `ThreadRestService.create()` 创建 Thread，因为该方法依赖当前登录用户；realtime hotline 属于后台通话链路，应通过 `ThreadRepository.save()` 直接持久化系统 Thread

## 4. 详细设计

### 4.1 ThreadEntity 创建

**时机**：`setMetadata()` 首次解析到有效 `botDid` + `orgUid` + `uuid` 时（幂等，只创建一次）。

**字段映射**：

| Thread 字段 | 值 | 来源/说明 |
| ------------- | ----- | ----------- |
| `uid` | `call-thread-{uuid}` | 使用通话 UUID 派生，保证同一通电话重连时可复用同一 Thread |
| `type` | `CALLCENTER` | 固定 |
| `topic` | `call/{botDid}/{uuid}` | 三段式，便于查询和展示 |
| `status` | `CHATTING` | 通话进行中 |
| `orgUid` | `metadata.orgUid` | 从元数据获取 |
| `user` | `{"uid":"caller_{uuid}","type":"VISITOR","nickname":"{callerNumber}"}` | 主叫号码构造为访客 `UserProtobuf`；`callerNumber` 固定取 `metadata.caller` |
| `agent` | `{}` | 留空 JSON，无人工坐席 |
| `robot` | `{"uid":"bot_{botDid}","type":"ROBOT","nickname":"语音助手({botDid})"}` | 构造虚拟机器人 `UserProtobuf` |
| `channel` | `PHONE` | 使用现有 `ChannelEnum.PHONE`，当前没有 `CALL` 枚举 |
| `owner` | 系统用户 `UserEntity` | 通过 `userService.findByUid(BytedeskConsts.DEFAULT_SYSTEM_UID)` 获取；该用户在 `UserInitializer` 中已初始化 |
| `extra` | `{"callUuid":"{uuid}","conversationId":"{conversationId}","botDid":"{botDid}"}` | 补充通话侧追踪信息 |

**幂等性**：优先通过稳定 `threadUid=call-thread-{uuid}` 复用 Thread；其次通过 `ThreadRepository.findFirstByTopicAndDeletedOrderByCreatedAtDesc(topic, false)` 兼容历史或异常数据。当前 `thread_topic` 只有索引，不是唯一约束，不能单靠 topic 保证并发重连幂等。

**创建方式**：直接构造 `ThreadEntity.builder()` 并调用 `ThreadRepository.save()`，不走 `ThreadRestService.create()`，避免后台链路缺少认证上下文时触发 `authService.getUser()`。

**Thread UID 规范**：`uuid` 取 FreeSWITCH call uuid，生成前需要 `trim()`；如果未来发现 call uuid 包含不适合作为业务 uid 的字符，可统一做白名单归一化，但仍保持同一 call uuid 派生出同一 Thread uid。

### 4.2 MessageEntity 落库

所有消息通过 `MessagePersistService.persist(messageJSON)` 异步持久化。

| 触发事件 | 消息类型 | 发送者 (`user`) | 内容 (`content`) |
| ---------- | --------- | ----------------- | ------------------ |
| Thread 创建成功 | `EVENT` | system | 结构化 JSON：`{"type":"CALL_START","title":"通话开始","content":"通话开始，主叫 {caller}，被叫 {botDid}"}` |
| `input_audio_transcription.completed` | `VOICE` | visitor（主叫号码） | 结构化 `VoiceContent` JSON，当前至少包含 `text`、`label`、`played` |
| `response.audio_transcript.done` | `ROBOT` | robot（虚拟机器人） | 结构化 `RobotContent` JSON，当前至少包含 `answer` |
| KB 命中 → `handleInputTranscriptCompleted` | `ROBOT` | robot | 结构化 `RobotContent` JSON，当前包含 `questionUid` + `answer` |
| 桥接关闭（正常） | `EVENT` | system | 结构化 JSON：`{"type":"CALL_END","title":"通话结束","content":"通话结束"}` |
| 桥接关闭（异常/超时） | `EVENT` | system | 结构化 JSON：`{"type":"CALL_END_ERROR","title":"通话异常结束","content":"通话异常结束: {reason}"}` |

#### 4.2.1 MessageProtobuf 最小契约

每条待持久化消息至少必须包含以下字段，否则会被 `MessagePersistService` 丢弃或落库不完整：

| 字段 | 是否必填 | 说明 |
| ------ | ---------- | ------ |
| `uid` | 是 | 消息唯一 ID，用于幂等去重 |
| `type` | 是 | 使用现有 `MessageTypeEnum` |
| `status` | 是 | 建议统一写 `SENDING`，持久化层会转为 `SUCCESS` |
| `channel` | 是 | 与 Thread 保持一致，固定为 `ChannelEnum.PHONE` |
| `thread.uid` | 是 | `MessagePersistService` 依赖此字段关联 Thread |
| `user.uid` | 是 | 会写入 `MessageEntity.userUid` |
| `user.type` | 是 | 发送者身份，visitor / robot / system |
| `user.nickname` | 建议 | 便于前端展示 |
| `content` | 是 | 需符合消息类型自己的内容结构；`VOICE` / `ROBOT` / `EVENT` 不能再保存为裸文本 |
| `extra.orgUid` | 建议 | 便于后续按组织查询和审计 |
| `extra.conversationId` | 建议 | 便于和通话侧日志串联 |
| `extra.callUuid` | 建议 | 便于和 CDR 及 ESL 日志串联 |

`MessageExtra` 当前只定义了 `orgUid` 等少量字段，但 `MessageEntity.extra` 会保留原始 JSON 字符串。因此消息 extra 建议直接构造原始 JSON：

```json
{
  "orgUid": "{orgUid}",
  "conversationId": "{conversationId}",
  "callUuid": "{uuid}",
  "botDid": "{botDid}",
  "source": "qwen-realtime-media"
}
```

这样既能让 `MessagePersistService` 解析 `orgUid`，也能保留 `conversationId` / `callUuid` 供后续排查和展示。

#### 4.2.1.1 前端解析兼容约束

本次实施后补充确认了 visitor 端真实消费契约：

- `VOICE`： [frontend/apps/visitor/src/components/Bubbles/VoiceBubble/index.tsx](frontend/apps/visitor/src/components/Bubbles/VoiceBubble/index.tsx) 优先 `JSON.parse(content)`，失败时才退回把原始字符串当作 url
- `ROBOT`： [frontend/apps/visitor/src/components/Bubbles/RobotBubble/index.tsx](frontend/apps/visitor/src/components/Bubbles/RobotBubble/index.tsx) 直接按 `MESSAGE.RobotContent` 解析 `content`
- `EVENT`：历史/未读抽屉已按结构化对象渲染；主聊天视图原先缺少 `EVENT` 分支，现已在 [frontend/apps/visitor/src/pages/Chat/components/MessageRenderer.tsx](frontend/apps/visitor/src/pages/Chat/components/MessageRenderer.tsx) 中补齐 `NoticeMsg` 分发

因此热线持久化消息的 `content` 需要满足以下最小结构：

```json
// VOICE
{
  "text": "用户转写文本",
  "label": "语音消息",
  "played": false
}
```

```json
// ROBOT
{
  "questionUid": "call-user:{uuid}:{itemId}",
  "answer": "AI 或 KB 回复文本"
}
```

```json
// EVENT（由 EventContent 序列化）
{
  "type": "CALL_START | CALL_END | CALL_END_ERROR | CALL_EVENT",
  "title": "通话开始 / 通话结束 / 通话异常结束 / 事件消息",
  "content": "事件说明文本"
}
```

`EVENT` 消息的后端 content 现已由正式模型 `EventContent`（`modules/core/.../content/EventContent.java`）序列化，字段为 `type`/`title`/`content`；前端 `NoticeMsg` 组件已兼容解析该结构。

#### 4.2.2 消息 UID 规则

`MessagePersistService` 以 `uid` 判重，因此本规划必须显式定义可复算的 uid 规则：

| 场景 | uid 规则 |
| ------ | ---------- |
| 通话开始事件 | `call-start:{uuid}` |
| 通话结束事件 | `call-end:{uuid}` |
| 通话异常结束事件 | `call-end-error:{uuid}` |
| 用户转写 | `call-user:{uuid}:{itemId}` |
| AI 转写 | `call-ai:{uuid}:{activeResponseId}`；`activeResponseId` 在 `response.created` 时已写入，`response.done` 后清零；若为 null 回退为 `call-ai:{uuid}:{sha1(transcript)}` |
| KB 回复 | `call-kb:{uuid}:{itemId}` |

说明：

- 不使用随机 uid，否则 WebSocket 重连、重复 close、上游事件重放时无法去重
- `response.audio_transcript.done` 的去重不能只依赖“每个 response 理论上只触发一次”，必须有 uid 规则兜底
- 若后续确认上游事件稳定包含更合适的 item id / response output id，可再收敛规则，但实现前需先按上表落地

**消息去重**：

- `input_audio_transcription.completed`：已通过 `handledInputItemIds` 去重，同一条 `itemId` 仅处理一次
- `response.audio_transcript.done`：除事件侧自然唯一性外，仍按上述 `uid` 规则做持久化层去重
- 系统消息：按固定 uid 规则去重，不再依赖运行时内存状态

### 4.3 BridgeSession 新增字段和方法

```java
// 新增字段
private volatile String threadUid;      // ThreadEntity.uid，创建后写入
private volatile String callerNumber;   // 主叫号码，固定取 metadata.caller

// 新增方法
private void ensureThread();            // 幂等创建 ThreadEntity
private void persistEvent(String content);       // 发送 EVENT 类型系统消息
private void persistCallMessage(MessageTypeEnum type, UserProtobuf sender, String content); // 通用落库
private void closeThread(String reason); // 将 Thread 标记为 CLOSED，并设置 closeType
```

### 4.4 依赖注入

在 `QwenRealtimeMediaWebSocketHandler` 中新增：

```java
private final ThreadRepository threadRepository;      // 查/存 Thread
private final UserService userService;                // 获取系统 owner
private final MessagePersistService messagePersistService; // 异步持久化 Message
private final UidUtils uidUtils;                      // 生成 UID
```

注意：`ThreadRestService.create()` 会读取当前认证用户，不适合 FreeSWITCH / WebSocket 后台回调链路；本次只复用 repository 和实体模型。

### 4.5 CdrEntity 关联

现有 `CdrEntity.threadUid` 字段已存在。`EslService` 已有 `uuidSetVar(String uuid, String var, String value)`。

**方案**分两段：

1. 在 `ensureThread()` 创建 Thread 后，立即调用：

```java
eslService.uuidSetVar(callUuid, "thread_uid", threadUid);
```

若 `eslService` 不可用（`ObjectProvider.getIfAvailable()` 返回 null），仅记录 warn 日志，不阻塞 Thread 创建和后续消息持久化。

1. 在 `CdrEslSyncService.upsertFromEvent()` 构造 `CdrRequest` 时补充：

```java
request.setThreadUid(getHeader(headers,
  "thread_uid",
  "variable_thread_uid"));
```

理由：

- `CdrEslSyncService` 在 `CHANNEL_HANGUP_COMPLETE` 事件中读取 `candidateHeaders`（包含所有 channel variables）
- 但当前代码尚未把 `thread_uid` / `variable_thread_uid` 映射到 `CdrRequest.threadUid`
- 只有 Handler 写 variable + CDR 同步服务读 variable 两端都补齐，`CdrEntity.threadUid` 才会真正落库

### 4.6 Thread 关闭规则

通话结束时不能只落一条结束消息，还需要更新 Thread 自身状态，避免通话列表长期显示为进行中。

| 场景 | Thread 字段更新 | 结束消息 |
| ------ | ------ | ------ |
| 正常结束 | `status=CLOSED`, `closeType=SYSTEM` | `EVENT` / `call-end:{uuid}` |
| 异常/超时结束 | `status=CLOSED`, `closeType=SYSTEM` | `EVENT` / `call-end-error:{uuid}` |
| Thread 尚未创建 | 不强行补建 Thread | 不落结束消息 |

说明：

- `close()` 可能被重复调用，Thread 状态更新和结束消息持久化都必须幂等
- 若 Thread 已经是 `CLOSED`，不重复更新状态，也不重复生成结束消息
- 当前 realtime hotline bridge 无法可靠区分“访客主动挂断”和“系统侧关闭”，默认使用 `ThreadCloseTypeEnum.SYSTEM`；后续若 ESL 事件能透传明确 hangup owner，可再细化为 `VISITOR` / `SYSTEM`

## 5. 实施步骤

### 第 1 步：注入依赖 + 新增字段

在 `QwenRealtimeMediaWebSocketHandler` 中：

- 添加 `ThreadRepository`、`UserService`、`MessagePersistService`、`UidUtils` 依赖注入
- `BridgeSession` 新增 `threadUid`、`callerNumber` 字段
- `setMetadata()` 中解析 `caller`
- `callerNumber` 的唯一来源固定为 `metadata.caller`，缺失时回退为空字符串或 `unknown`

### 第 2 步：实现 Thread 创建

- 实现 `ensureThread()`，在 `setMetadata()` 完成后调用
- `threadUid` 由 `callUuid` 派生为 `call-thread-{uuid}`
- 构造 caller 和 robot 的 `UserProtobuf`
- 先按 `threadUid` 查询，再按 topic 查询，处理 thread 已存在的情况（如重连）
- 创建新 Thread 时使用 `ThreadRepository.save()`，owner 通过 `UserService.findByUid(DEFAULT_SYSTEM_UID)` 获取

### 第 3 步：实现 Message 落库

- 实现 `persistCallMessage()` 通用方法
- 组装满足 `MessagePersistService` 最小契约的 `MessageProtobuf`
- 为每类消息按约定生成稳定 uid
- 在 5 个事件点插入调用：
  1. Thread 创建后 → `EVENT`（通话开始）
  2. `input_audio_transcription.completed` → `VOICE`（用户说话）
  3. `response.audio_transcript.done` → `ROBOT`（AI 回复）
  4. KB 命中路径 → `ROBOT`（KB 答案）
  5. `close()` 中 → `EVENT`（通话结束）

### 第 4 步：CDR 关联

- 在 `ensureThread()` 中 Thread 保存成功后，调用 `eslService.uuidSetVar(callUuid, "thread_uid", threadUid)`；若 ESL 不可用则仅记录 warn 日志
- 在 `CdrEslSyncService` 中补充 `request.setThreadUid(getHeader(headers, "thread_uid", "variable_thread_uid"))`
- CDR 同步时将 channel variable 中的 `thread_uid` 写入 `CdrEntity.threadUid`

### 第 5 步：Thread 关闭

- 在 `close()` 中调用 `closeThread(reason)`
- 若 `threadUid` 已存在且 Thread 未关闭，则设置 `status=CLOSED`、`closeType=SYSTEM` 后保存
- 结束消息仍按固定 uid 规则走 `MessagePersistService.persist()`，避免重复 close 产生重复记录

### 第 6 步：验证

```bash
./starter/mvnw -f pom.xml -pl enterprise/call -am -DskipTests compile
```

已完成验证：

- `enterprise/call` 定向编译通过：`BUILD SUCCESS`
- `modules/core` 定向编译通过：`BUILD SUCCESS`
- `modules/ticket` 定向编译通过：`BUILD SUCCESS`
- `CdrEslSyncServiceTest` 已通过，覆盖 `thread_uid` / `variable_thread_uid` 映射
- `ThreadMessageUtilTest` 已通过，覆盖 SYSTEM / LEAVE_MSG 结构化内容
- `NotificationRealtimeServiceTest` 已通过，覆盖 NOTICE 内层 SystemContent 包装
- 所有编辑文件的诊断均为 `No errors found`

## 6. 不涉及的范围（后续 PR）

| 项目 | 说明 |
| ------ | ------ |
| 回合制 `/turn` 路径 | `QwenRealtimeVoiceAgentService` — 可后续单独规划 |
| 欢迎语持久化 | 欢迎语由 FreeSWITCH Lua 侧播放，不经过 Java Handler |
| IVR 按键历史 | 暂无回调机制 |
| 转人工事件 | 当前实时媒体桥无转人工能力，后续补充 |
| Desktop 客服端展示 | 目前仅完成消息内容结构兼容；如需新增呼叫会话列表/详情页，后续单独规划 |
| callAdmin 管理后台展示 | 后续单独规划 |

## 7. 实现约束与边界

### 7.1 本次不改变的运行语义

- 不改变现有 KB 命中优先于 `response.create` 的行为
- 不改变现有 TTS 播报链路，只增加持久化旁路
- 不引入同步数据库调用到音频收发热路径之外的额外阻塞逻辑

### 7.2 关闭事件处理约束

- `close()` 可能被多次触发，因此结束类消息必须依赖固定 uid 去重
- 正常结束与异常结束只能保留一条结束事件，推荐以首次落库成功者为准
- 如 Thread 已创建，关闭时应尽量补一条结束消息；如 Thread 尚未创建，则不强行补建 Thread

### 7.3 人工客服消息边界

- 本次“人工客服回复等所有消息持久化”仅覆盖 realtime hotline bridge 当前实际经过本 Handler 的消息
- 由于当前链路尚无转人工后的消息回流到该 Handler，本次不会新增人工客服消息落库实现
- 文档中保留该目标，但实现范围以“当前技术链路可观测到的消息” 为准，避免承诺超出实际输入源

## 8. 风险与注意事项

1. ~~**系统用户不存在**~~ ✅ 已确认。`UserUtils.getSystemUser()` 使用 `DEFAULT_SYSTEM_UID`（`df_sys_uid`），该用户已在 `UserInitializer.initBuiltinSystemUsers()` 中于应用启动时创建为 `UserEntity`。`ThreadEntity.owner` 可通过 `userService.findByUid(DEFAULT_SYSTEM_UID)` 获取 `UserEntity` 引用。
2. **消息量**：一次通话可能产生多条 `VOICE`/`ROBOT` 消息（取决于用户说了几轮），需确保异步持久化不会阻塞音频处理主循环。
3. **幂等性**：如果同一次通话的 WebSocket 重连，需防重复创建 Thread 和 Message。Thread 侧优先依赖稳定 `threadUid`，topic 仅作兼容查询；Message 侧依赖稳定消息 uid 和 `handledInputItemIds`。
4. **CDR 映射补齐**：`EslService.uuidSetVar()` 已存在，但 `CdrEslSyncService` 仍需显式把 `thread_uid` / `variable_thread_uid` 映射到 `CdrRequest.threadUid`，否则不会真正落库。
5. **通道枚举**：当前 `ChannelEnum` 中没有 `CALL`，本次应统一使用 `PHONE`，否则后续 `ChannelEnum.fromValue()` 或 ModelMapper 映射可能失败。
6. **topic 非唯一约束**：`thread_topic` 当前只有索引，不是唯一约束；重连幂等必须优先依赖稳定 `threadUid`，topic 只作为兼容查询条件。
7. **前端契约漂移**：`VOICE` / `ROBOT` / `EVENT` 的 `content` 结构已与当前 visitor 端解析方式对齐；后续若 Bubble 组件字段要求变化，热线持久化结构也需同步调整。

## 9. 当前落地状态

已完成：

- realtime hotline Thread 创建与关闭状态维护
- 用户、AI、KB、系统事件消息持久化（VOICE / ROBOT / EVENT 均使用正式内容模型）
- `EventContent` 内容模型（`type`/`title`/`content`），EVENT 不再使用匿名 Map
- `SystemContent` 内容模型，SYSTEM / AGENT_CLOSED / AUTO_CLOSED / LEAVE_MSG 消息均已结构化
- `ThreadMessageUtil` / `MessageUtils` / `TicketThreadRoutingStrategy` / `WeChatWorkSessionApiService` 系统消息出口迁移
- `NotificationRealtimeService` 工单 NOTICE 实时推送内层升级为 `SystemContent`
- `thread_uid` 写入 ESL channel variable 并同步到 CDR
- visitor + desktop 主聊天视图 `EVENT` 消息渲染兼容
- visitor + desktop `SystemMessage` / `LeaveMsg` / `NoticeMsg` 组件兼容结构化内容
- 回归测试：`CdrEslSyncServiceTest`、`ThreadMessageUtilTest`、`NotificationRealtimeServiceTest` 均通过

当前剩余工作：

- 做一次真实热线呼叫后的端到端验证，确认数据库中 `MessageEntity.content` 与前端实际展示完全一致
- desktop 端现有 jest 运行时 (`_moduleMocker.clearMocksOnScope is not a function`) 需独立修复后方可跑前端测试
