# 9205 及任意分机号多并发 AI 对话与多人工坐席转接规划

> 日期：2026-07-20
> 最后更新：2026-07-24（欢迎语已同时贯通 HTTAPI 首轮与实时 `mod_audio_stream` 媒体桥，且 `1100` / `1101` 已实拨命中各自配置，见 §2.1、§3.4）
> 状态：已选型并完成当前实现落地（入口层首选 `CallRoute + xml_curl`，欢迎语能力已交付并完成实时链路验证）
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)

## 1. 结论

一个分机号，例如 `9205`，可以支持多个人同时拨打并分别与 AI 对话。关键前提不是“号码是否能复用”，而是每通电话必须拥有独立的通话标识、媒体文件、会话状态和 AI 上下文，例如 `callUuid`、`conversationId`、录音路径、ASR/TTS 任务和转人工状态。

同样的能力不应只绑定在 `9205` 这样的固定示例号码上，而应绑定在 `ExtensionEntity.extensionNumber + ExtensionSettingsEntity` 这组关系上。也就是说，像 `1100` 这样任意一个分机号，只要：

1. 存在 `ExtensionEntity(extensionNumber=1100)`；
2. 该分机关联了已发布的 `ExtensionSettingsEntity`；
3. FreeSWITCH 能把拨入 `1100` 的来电命中到“AI/IVR 热线入口主控”；

就可以获得与 `9205` 同类的能力：AI 接待、知识库检索、转人工、IVR、留言、排队。

这里要明确一个边界：

- **`ExtensionSettingsEntity` 决定“命中入口之后如何处理”**。
- **dialplan / xml_curl / CallRoute 决定“这通电话能否先命中入口”**。

因此，`freeswitch/conf` 中**没有像 9205 那样手写的静态 dialplan**，并不等于不能实现；它只意味着需要补一层**动态入口命中机制**。本规划在本轮确认后，正式选择：

- **首选方案**：通过 `CallRoute + xml_curl` 动态生成入口拨号计划；
- **辅助方案**：通过统一的“AI 分机模板”生成可复用 XML 片段；
- **回退/覆盖方案**：必要时写入数据库 `DialplanEntity(CUSTOM_XML)`，作为低层覆盖或兼容出口，而不是主入口模型。

同一个分机号也可以支持对应多个 `modules/service` 模块中的 `AgentEntity` 人工坐席。推荐模型不是让 `ExtensionEntity` 直接保存多个 `AgentEntity`，而是：

```text
ExtensionEntity(9205)
  -> ExtensionSettingsEntity
  -> ExtensionEntity.queueUid（从分机实体读取，而非 settings.routingSettings）
  -> CallQueueEntity(9205 专属队列)
  -> CallQueueAgentEntity(多个 AgentEntity 坐席成员)
  -> CallQueueMemberEntity(排队中的来电成员)
  -> ACD/Handoff 决策按队列挑选可用坐席
```

这样 `9205` 既可以作为一个稳定的 AI 入口号码，也可以在用户说“转人工”后进入该号码绑定的人工坐席队列，支持多个坐席同时接待不同来电。

用 `1100` 表达时，推荐理解为：

```text
ExtensionEntity(1100)
  -> queueUid = CallQueueEntity(1100 专属队列)
  -> settings = ExtensionSettingsEntity(“AI 热线模板”或“1100 专属模板”)
  -> settings.knowledgeSettings.kbUid = 1100 绑定知识库
  -> settings.routingSettings 决定欢迎语、转人工开关、留言、IVR 策略
  -> settings.voiceSettings 决定语音相关配置
```

`1100` 是否可用，核心不在“是否照抄一份 92-ai-bot.xml”，而在“是否存在一条可维护的入口路由，把 1100 命中到这套主控能力”。

## 2. 当前现状

### 2.1 已具备的基础

- `ExtensionEntity` 已支持 `extensionNumber`、`settings`、`userContext`、`orgUid` 等字段，可表达 `9205` 这类入口号码。
- `ExtensionSettingsEntity` 已拆分出知识库、路由、语音等子设置。
- `ExtensionSettingsRoutingEntity` 已有 `enableHumanHandoff`、`humanHandoffKeywords`、`queueUid`、`timeConditionUid`、`overflowAction`、`ringTimeoutSeconds`。
- `CallQueueSyncService` 已能为分机自动同步一个同名 `CallQueueEntity`，例如 `9205` 对应一个 9205 专属队列。
- `QwenRealtimeVoiceAgentService` 已能按 `did + orgUid` 查找已发布的 `ExtensionSettingsEntity`，并在命中转人工关键词后调用 `HotlineHandoffDecisionService`。
- `HotlineHandoffDecisionService` 已能根据工作时间、是否允许排队、组织内是否有可用 ACD 坐席返回 `ACD_ENQUEUE` 或 `LEAVE_MESSAGE`。
- **AI 多并发隔离基础已就绪**：`VoiceAgentRequest` / `VoiceAgentResponse` 已定义 `conversationId` 字段；`HttapiController.secondTurnVoiceAgent()` 已从 FreeSWITCH `uuid`（即 channel UUID）取值并通过 `VoiceAgentHttpClient` 传递给语音服务。每通电话天然隔离。
- **动态 dialplan 基础已部分具备**：系统已有 `CallRouteDialplanXmlCurlProvider`、`DatabaseDialplanXmlCurlProvider`、`DialplanRestService`。其中 `CallRouteDialplanXmlCurlProvider` 已支持组织隔离、时间条件、EXACT/PREFIX/REGEX 匹配和目标类型分发，适合作为正式入口层；`DatabaseDialplanXmlCurlProvider` 更适合作为底层 XML 覆盖或兼容回退层。
- **欢迎语数据模型与前端已就绪**：`ExtensionSettingsKnowledgeEntity` 已定义 `welcomeType`（`ExtensionSettingsKnowledgeWelcomeTypeEnum`：`TTS` / `AUDIO`）、`welcomeText`（TTS 播报文本）和 `welcomeAudioUrl`（预录音频 URL）。前端 `ExtensionSettingsKnowledgeTab` 已支持欢迎语类型切换（TTS 播报 / 语音文件）及音频文件上传。
- **欢迎语运行时已贯通**（2026-07-24 最新状态）：`welcomeType` 已补全 request/response 持久化链路；`QwenRealtimeVoiceAgentService.resolveWelcomePrompt()` 按 `did + orgUid` 解析已发布欢迎语配置；`VoiceAgentRestControllerVisitor` 新增 `/welcome` 端点；回合制首轮 `HttapiController.firstTurnVoiceAgent()` 与实时媒体桥 `deploy/freeswitch/scripts/qwen_realtime_media_start.lua` 均优先调用欢迎语解析接口：`AUDIO` 模式直接 `playback` 预录音频 URL，`TTS` 模式走现有 TTS/MRCP 播报，失败时降级为 beep 或默认文案；数据库已通过 Liquibase `260722_add_extension_settings_knowledge_welcome_type.xml` 新增 `welcome_type` 列并默认回填 `TTS`。当前 `1100`、`1101` 已在动态 AI 热线入口下实拨验证，能够分别命中各自的欢迎语配置。
- **实时模型与 TTS 模型分离架构已就绪**：`ExtensionSettingsKnowledgeEntity` 区分 `realtimeModel/realtimeVoice`（Qwen-Audio Realtime WebSocket 双向语音对话）与 `ttsModel/ttsVoice`（DashScope CosyVoice 文字→电话音频合成），详见 §2.3。两套模型/音色均在 `QwenRealtimeVoiceAgentService.chat()` 中根据「请求参数 > 知识库配置 > 硬编码默认值」三级优先级解析并实际使用。

### 2.2 主要缺口

- ~~**欢迎语尚未接入运行时**~~ ✅ 已解决（2026-07-22）：`HttapiController.firstTurnVoiceAgent()` 已按 `did + orgUid` 调 `/welcome` 端点解析欢迎语配置，支持 TTS 播报与音频文件直播放，失败降级 beep。静态 `92-ai-bot.xml` 和动态 `AiHotlineDialplanTemplateBuilder` 入口均通过同一 HTTAPI 首轮路径覆盖。
- **任意号码入口层尚未产品化**：`QwenRealtimeVoiceAgentService` 已能按 `did + orgUid` 驱动运行时能力，但当前 `9205` 仍主要依赖 `92-ai-bot.xml` 的固定入口，`1100` 这种号码尚无“自动生成 AI 入口 dialplan”的正式闭环。
- **能力层与入口层尚未清晰解耦**：当前容易误以为“有 `ExtensionSettingsEntity` 就能直接接电话”。实际上还需要 `CallRoute / Dialplan / xml_curl` 把该号码导入 HTTAPI / voice-agent 主控。
- **缺少 AI 分机通用模板**：目前 9205 的回合制录音、HTTAPI 回调、继续/转人工/留言路由，仍主要体现在专用 XML 中，没有沉淀为“任意 extensionNumber 可复用”的模板生成器。
- **IVR 资源与分机设置之间缺少桥接层**：当前 `IvrMenuEntity` 是独立资源，只包含 `type`、`extensionNumber`、`workflowUid` 等 IVR 入口与工作流绑定信息；而 `ExtensionSettingsEntity` 还没有 `ivrSettings/draftIvrSettings` 这样的子设置来表达“这个 AI 热线是否启用 IVR、绑定哪一套 IVR、AI 与 IVR 谁优先、未命中时如何降级”。结果是“IVR 流程定义”与“分机运行策略”分散在两套模型中，管理员无法在分机设置页完成闭环配置。
- `CallQueueAgentEntity` 已补齐 `queueUid`、`agentUid`、`agentExtension`、优先级、权重、容量、启用状态、`lastAssignedAt` 等队列坐席成员字段，并已通过服务层校验队列与坐席组织一致性。
- `HotlineHandoffDecisionService` 已支持按 `queueUid` 过滤该队列下的可用坐席成员；未携带 `queueUid` 的旧调用路径仍保留组织级回退。
- `AcdAgentStateEntity` 当前用 `extension` 表达坐席话机分机，但未和 `AgentEntity.uid` 建立清晰映射。
- 转人工后的 ACD 分配策略仍需要补齐：最长空闲、轮询、技能优先、优先级、坐席容量、忙闲状态等。
- `ExtensionSettingsRoutingEntity.overflowAction` 已接入 `HotlineHandoffDecisionService`，用于决定无可用坐席时排队或留言。
- **坐席状态机后端主链路已初步打通**：ACD 接通、挂断、振铃超时/拒接、话后整理倒计时已由 FreeSWITCH 事件驱动；Desktop 端显式“完成整理”动作仍未实现。
- **CDR 队列/坐席关联已补齐基础字段**：`CdrEntity`、DTO、ESL 同步服务与数据库迁移已支持 `queueUid`、`agentUid`，用于追踪转人工后的队列与坐席归属。
- **Desktop 客服端接听链路缺失**：ACD 选中坐席后，如何让 Desktop 客户端振铃、弹窗、接听、挂断的全流程尚未设计。

### 2.3 实时模型（Realtime）与 TTS 模型的架构分离

`ExtensionSettingsKnowledgeEntity` 同时包含 `realtimeModel/realtimeVoice` 和 `ttsModel/ttsVoice` 两组字段，这并非冗余设计，而是对应呼叫流程中两个职责完全不同的阶段。

#### 2.3.1 字段定义与默认值

| 字段 | 类型 | 数据库默认值 | 代码默认值 | 用途 |
| --- | --- | --- | --- | --- |
| `realtimeModel` | `String` | `"qwen-audio-3.0-realtime-plus"` | 同左 | Qwen-Audio Realtime 模型标识 |
| `realtimeVoice` | `String` | `"longanqian"` | 同左 | Qwen Realtime 侧音色 |
| `ttsModel` | `String` | `null` | `"cosyvoice-v3-flash"` | DashScope CosyVoice TTS 模型 |
| `ttsVoice` | `String` | `null` | `"longanhuan"` | CosyVoice TTS 合成音色 |

> **注意**：`ttsModel`/`ttsVoice` 在实体中无默认值（数据库列为 `null`），运行时若管理员未配置，会降级到 `QwenRealtimeVoiceAgentService` 中硬编码的 `DEFAULT_TTS_MODEL="cosyvoice-v3-flash"` 和 `DEFAULT_TTS_VOICE="longanhuan"`。前端默认模板也未设置这两个字段，因此对管理员属于不透明字段。

#### 2.3.2 应用场景

**Realtime 模型（`realtimeModel` + `realtimeVoice`）**：用于 **Qwen-Audio Realtime WebSocket 全双工语音对话**。

- 负责：实时语音转写（ASR）、意图理解、文字回复生成
- 方式：通过 `QwenAudioRealtimeAdapter.converse(pcmBytes, realtimeModel, realtimeVoice, instructions)` 建立 WebSocket 双向流
- 场景：每一轮用户语音输入都经过 Realtime 模型处理，产出 `assistantTranscript`（AI 文字回复）

**TTS 模型（`ttsModel` + `ttsVoice`）**：用于 **将 AI 文字回复合成为电话可播放的音频文件**。

- 负责：文字 → WAV 电话音频（8kHz/16kHz PCM）合成
- 方式：通过 `TtsMrcpService.synthesizeToTelephonyAudioUrl(replyText, ttsModel, ttsVoice, null)` 调用 DashScope CosyVoice
- 场景：Realtime 模型产出的文字回复，必须经 TTS 合成后才能通过 FreeSWITCH `playback` 播放给来电用户

#### 2.3.3 呼叫流程中的实际使用

```text
来电用户语音
  │
  ▼
┌─────────────────────────────────────────────────┐
│  QwenAudioRealtimeAdapter (WebSocket)           │
│  .converse(pcmBytes,                            │
│            realtimeModel,  ← 来自知识库配置      │
│            realtimeVoice,  ← 来自知识库配置      │
│            instructions)                         │
│                                                 │
│  输出: userTranscript + assistantTranscript     │
└──────────────────────┬──────────────────────────┘
                       │ assistantTranscript (文字)
                       ▼
┌─────────────────────────────────────────────────┐
│  TtsMrcpService (DashScope CosyVoice)           │
│  .synthesizeToTelephonyAudioUrl(                │
│      replyText,                                 │
│      ttsModel,  ← 来自知识库配置                 │
│      ttsVoice,  ← 来自知识库配置                 │
│      null)                                      │
│                                                 │
│  输出: .wav 音频文件 URL                         │
└──────────────────────┬──────────────────────────┘
                       │ 音频 URL
                       ▼
              FreeSWITCH playback
```

这是一个**两阶段流水线**，而非端到端实时音频输出。Qwen-Audio Realtime 模型本身可以输出音频，但当前实现将其用于文字转写 + 理解，然后通过独立的 CosyVoice TTS 重新合成，以精确匹配电话编码要求。

#### 2.3.4 配置优先级

`QwenRealtimeVoiceAgentService.chat()` 中的解析逻辑（第 133–136 行）：

```java
String realtimeModel = firstNonBlank(request.getRealtimeModel(),
    knowledgeSettings.getRealtimeModel(), DEFAULT_REALTIME_MODEL);
String realtimeVoice = firstNonBlank(request.getRealtimeVoice(),
    knowledgeSettings.getRealtimeVoice(), DEFAULT_REALTIME_VOICE);
String ttsModel = firstNonBlank(request.getTtsModel(),
    knowledgeSettings.getTtsModel(), DEFAULT_TTS_MODEL);
String ttsVoice = firstNonBlank(request.getTtsVoice(),
    knowledgeSettings.getTtsVoice(), DEFAULT_TTS_VOICE);
```

优先级：**请求参数 > ExtensionSettingsKnowledgeEntity 数据库配置 > 硬编码默认值**。

这意味着：

- 管理员可在后台为每个分机号独立配置模型和音色
- 单次请求可通过 `VoiceAgentRequest` 覆盖配置（例如 A/B 测试不同模型）
- 即使管理员从未配置 `ttsModel`/`ttsVoice`，运行时也能正确降级

#### 2.3.5 与欢迎语的边界

欢迎语播放（`/welcome` 端点）**不使用** `realtimeModel`/`ttsModel` 配置。欢迎语仅根据 `welcomeType` 决定：

- `TTS`：直接合成 `welcomeText`（走现有 TTS 管线，但欢迎语内容是预设文本而非 AI 生成）
- `AUDIO`：直接播放 `welcomeAudioUrl`

#### 2.3.6 运行状态确认

| 检查项 | 状态 |
| --- | --- |
| `realtimeModel/realtimeVoice` 在呼叫中实际使用 | ✅ 已贯通（`QwenAudioRealtimeAdapter.converse()`） |
| `ttsModel/ttsVoice` 在呼叫中实际使用 | ✅ 已贯通（`TtsMrcpService.synthesizeToTelephonyAudioUrl()`） |
| REST API 读写 (`ExtensionSettingsRestService`) | ✅ 已贯通 |
| 前端管理界面 (`ExtensionSettingsKnowledgeTab`) | ✅ 已贯通（4 个 `ProFormText`） |
| `VoiceAgentRequest` 透传全部 4 个字段 | ✅ 已贯通 |
| `HttapiController` 从 FreeSWITCH 通道变量读取并传递 | ✅ 已贯通 |
| 运行时降级（管理员未配置 `ttsModel/ttsVoice`） | ✅ 生效 |
| 前端默认模板设置 `ttsModel/ttsVoice` 默认值 | ⚠️ 未设置（依赖运行时降级） |

### 2.4 Entity/Tab 命名重构：VoiceEntity ↔ KnowledgeEntity 字段错位修正

> 实施日期：2026-07-22

#### 2.4.1 问题诊断

当前三层子 Entity 的字段分布存在命名与职责错位：

| 子 Entity | 当前包含字段 | 实际语义 | Tab 名称 |
| --- | --- | --- | --- |
| `ExtensionSettingsKnowledgeEntity` | 知识库 + 欢迎语 + **语音模型/音色**（`realtimeModel/realtimeVoice/ttsModel/ttsVoice`） | 知识库 + 语音 | "知识库" |
| `ExtensionSettingsVoiceEntity` | **留言**（`enableVoicemail/voicemailPrompt/maxRecordSeconds`）+ DTMF（`enableDtmfMenu/dtmfEscapeDigit`） | 留言 | "语音与留言" |

核心问题：

1. **`VoiceEntity` 名不副实**：名为 "Voice"（语音），实际只存留言和 DTMF 字段，没有任何语音模型、音色相关配置。
2. **`KnowledgeEntity` 职责过重**：同时承载知识库检索（`kbUid/systemPrompt/enableKbSearch`）和语音模型选择（`realtimeModel/realtimeVoice/ttsModel/ttsVoice`）两类不相关的配置。
3. **前端 Tab 标签误导**：第三个 Tab 名为"语音与留言"，但语音模型配置在第一个 Tab "知识库"中，管理员需要在"知识库"Tab 中寻找语音模型配置。

#### 2.4.2 重构方案

```text
重构前:
  KnowledgeEntity: 知识库 + 欢迎语 + 语音模型/音色     → Tab "知识库"
  VoiceEntity:     留言 + DTMF                       → Tab "语音与留言"

重构后:
  KnowledgeEntity: 知识库 + 欢迎语                     → Tab "知识库"
  VoiceEntity:     语音模型/音色 + 欢迎语音频配置       → Tab "语音设置"
  VoicemailEntity: 留言 + DTMF（新建）                 → Tab "留言设置"
```

**字段迁移矩阵**：

| 字段 | 迁移方向 | 说明 |
| --- | --- | --- |
| `realtimeModel` | KnowledgeEntity → VoiceEntity | 实时语音对话模型 |
| `realtimeVoice` | KnowledgeEntity → VoiceEntity | 实时语音对话音色 |
| `ttsModel` | KnowledgeEntity → VoiceEntity | TTS 合成模型 |
| `ttsVoice` | KnowledgeEntity → VoiceEntity | TTS 合成音色 |
| `enableVoicemail` | VoiceEntity → VoicemailEntity（新建） | 留言开关 |
| `voicemailPrompt` | VoiceEntity → VoicemailEntity（新建） | 留言提示语 |
| `maxRecordSeconds` | VoiceEntity → VoicemailEntity（新建） | 最大录音秒数 |
| `enableDtmfMenu` | VoiceEntity → VoicemailEntity（新建） | DTMF 按键降级 |
| `dtmfEscapeDigit` | VoiceEntity → VoicemailEntity（新建） | 转义按键 |

**保留不动**：欢迎语字段（`welcomeType/welcomeText/welcomeAudioUrl`）留在 `KnowledgeEntity`，因为欢迎语与知识库系统提示词（`systemPrompt`）属于同一"对话入口配置"上下文。

#### 2.4.3 影响面

| 层 | 影响 |
| --- | --- |
| **数据库** | 新建 `bytedesk_call_extension_settings_voicemail` 表（5 列）；`bytedesk_call_extension_settings_voice` 新增 4 列（realtime 模型/音色）；`bytedesk_call_extension_settings_knowledge` 删 4 列（realtime 模型/音色）；`bytedesk_call_extension_settings` 新增 2 列（voicemail 外键） |
| **Java Entity** | 新建 `ExtensionSettingsVoicemailEntity`；修改 `VoiceEntity`（+4 字段）、`KnowledgeEntity`（-4 字段）、`ExtensionSettingsEntity`（+voicemail 引用） |
| **DTO** | 新建 `VoicemailRequest/Response`；修改 `VoiceRequest/Response`（+4）、`KnowledgeRequest/Response`（-4）、`ExtensionSettingsRequest/Response`（+voicemail） |
| **RestService** | `ExtensionSettingsRestService` 中所有 copy/apply/clone/convert/validate 方法补全 voicemail 链路 |
| **运行时** | `QwenRealtimeVoiceAgentService.chat()`/`resolveWelcomePrompt()` 改为从 `voiceSettings` 而非 `knowledgeSettings` 读取模型/音色 |
| **前端** | 新建 `ExtensionSettingsVoicemailTab`；`KnowledgeTab` 移除 4 个语音字段；`VoiceTab` 改为语音模型/音色 Tab；`ExtensionSettingsTab` 新增第 4 个 Tab |

#### 2.4.4 任务拆解

| # | 任务 | 涉及文件 |
| --- | --- | --- |
| 1 | 新建 `ExtensionSettingsVoicemailEntity` + Request/Response DTO | 3 个新文件 |
| 2 | `VoiceEntity` 新增 `realtimeModel/realtimeVoice/ttsModel/ttsVoice` | Entity + Request + Response |
| 3 | `KnowledgeEntity` 移除 `realtimeModel/realtimeVoice/ttsModel/ttsVoice` | Entity + Request + Response |
| 4 | `ExtensionSettingsEntity` 新增 `voicemailSettings/draftVoicemailSettings` | Entity + Request + Response |
| 5 | `ExtensionSettingsRestService` 补全 voicemail 的 copy/apply/clone/convert/promote 链路 | 1 个文件，约 8 处方法 |
| 6 | `QwenRealtimeVoiceAgentService` 改为从 `voiceSettings` 读取 | 1 个文件，约 6 处引用 |
| 7 | Liquibase 迁移：建 voicemail 表、voice 表加列、knowledge 表删列、settings 表加外键 | 1 个新 migration + master.xml |
| 8 | 前端：新建 `VoicemailTab`，修改 `VoiceTab`/`KnowledgeTab`/`ExtensionSettingsTab` | 4 个前端文件 |
| 9 | 编译验证 | `enterprise/call` + `starter` |

### 2.5 IVR 配置缺口：IvrMenu 是资源，但 ExtensionSettings 还没有 IVR 子设置

当前系统已经具备一套独立的 IVR 资源模型，但它还没有被纳入 `ExtensionSettingsEntity` 的已发布/草稿配置体系。

#### 2.5.1 现有 IvrMenu 的角色定位

从当前前后端实现看，`IvrMenu` 更像“可复用 IVR 资源入口”，而不是某个分机设置的内嵌子对象：

| 现有对象 | 当前字段/行为 | 说明 |
| --- | --- | --- |
| `IvrMenuEntity` | `name`、`description`、`type`、`extensionNumber`、`workflowUid` | 负责描述一个 IVR 入口号码及其绑定工作流 |
| `IvrMenuTable` | 支持按组织 CRUD、展示 `extensionNumber`、打开 `workflowUid` 对应工作流 | 说明前端已把 IVR 当成独立资源管理 |
| `IvrMenuRestService` | 提供 `findByExtensionNumber(...)`、`findByExtensionNumberAndOrgUid(...)` | 说明运行时已支持按 IVR 入口号码查找资源 |

这套模型本身没有 draft/published 语义，也没有表达“它和某个 AI 分机设置之间是什么关系”。因此不能直接拿 `IvrMenuEntity` 充当 `ExtensionSettingsEntity` 的等价子实体。

#### 2.5.2 当前真正缺的不是 IVR 实体，而是 IVR 桥接策略

当前缺口不在“有没有 IVR 表”，而在“AI 分机如何声明自己要不要用 IVR，以及何时切到 IVR”。至少缺以下能力：

1. 在分机设置中显式启用/关闭 IVR。
2. 绑定一个已经存在的 `IvrMenuEntity` 作为该分机的 IVR 入口资源。
3. 定义 AI 与 IVR 的优先关系，例如“AI 优先，失败后转 IVR”或“先进入 IVR，再按键/工作流转 AI”。
4. 定义 no-input / no-match / DTMF 逃生 / 人工忙线 等场景下是否回到 IVR、继续 AI、转人工还是留言。

换句话说，`IvrMenuEntity` 解决的是“IVR 长什么样、走哪条 workflow”；`ExtensionSettingsIvrEntity` 应该解决的是“这个分机什么时候调用这套 IVR，以及和 AI/转人工/留言如何编排”。

## 3. 目标能力

### 3.0 从“9205 样板”提升为“任意分机号能力模板”

目标不是继续把能力写死在 `9205`，而是把 `9205` 视为首个样板，然后支持任意分机号，例如 `1100`：

1. 管理员新建或导入 `ExtensionEntity(extensionNumber=1100)`。
2. 管理员为 `1100` 绑定 `ExtensionSettingsEntity`。
3. 系统自动为 `1100` 生成或发布对应的入口路由，**首选 `CallRoute + xml_curl`**，必要时辅以模板化 XML 或数据库 `DialplanEntity` 覆盖。
4. 用户拨打 `1100` 后，运行时按 `1100 + orgUid` 加载配置。
5. 同一套配置模型驱动 AI 接待、知识库、转人工、IVR、排队、留言。

首期推荐把“任意号码能力模板”限定在**组织内热线/测试 DID/平台分机池**场景，不直接承诺所有外部运营商入线都自动具备该能力；外线接入仍需要已有的 `CallRoute` 或网关映射把 DID 导到目标分机号。

### 3.1 多人同时拨打 9205 与 AI 对话

目标行为：

1. A、B、C 三个用户同时拨打 `9205`。
2. FreeSWITCH 为每通电话产生独立 `uuid`。
3. 后端为每通电话生成或透传独立 `conversationId`。
4. 每通电话独立执行：录音、ASR、知识库检索、LLM 回复、TTS 播报。
5. 任一用户转人工或挂断，不影响其他用户的 AI 对话。

实现原则：

- `9205` 只是入口号码，不是会话状态容器。
- AI 会话状态必须按 `callUuid/conversationId` 隔离。
- 语音文件、临时 PCM 文件、TTS 音频 URL 均按通话维度生成。
- 若使用实时媒体桥，WebSocket session 也必须按 FreeSWITCH channel UUID 绑定。

### 3.2 同一个 9205 对应多个人工坐席

目标行为：

1. 管理员在后台为 `9205` 对应的队列添加多个 `AgentEntity`。
2. 用户拨打 `9205` 后先进入 AI 对话。
3. 用户说“转人工”时，系统读取 `ExtensionEntity.queueUid`。
4. ACD 只在该 `queueUid` 的成员中选择在线、可接待且未满员的坐席。
5. 多个用户同时转人工时，可以分配给不同坐席；坐席满员时进入排队或留言。

### 3.3 以 1100 为例的“无静态 dialplan”目标行为

目标行为：

1. 平台不存在手写的 `92-ai-bot.xml` 中 `1100` 专属分支。
1. 管理员在后台创建 `ExtensionEntity(1100)`，绑定已发布的 `ExtensionSettingsEntity`。
1. 系统自动创建 `CallRoute(match=1100)`，由 xml_curl 运行时按 `destination_number=1100` 动态返回 AI 热线入口 XML。
1. 如遇兼容场景或局部覆盖，再按需写入 `DialplanEntity(destinationNumber=1100, type=CUSTOM_XML)`。

1. 用户拨打 `1100`，FreeSWITCH 命中该动态入口。
1. 后续执行链路与 9205 一致：欢迎语 -> 实时媒体桥或录音/HTTAPI -> AI / KB / Handoff -> 排队 / 留言 / 挂断。

验收标准：

- `1100` 不需要额外手工编辑 `deploy/freeswitch/conf/dialplan/default/*.xml`。
- 删除或停用 `1100` 的入口配置后，电话不再进入 AI 主控。

### 3.4 欢迎语 TTS 播报与语音文件播放

目标：接通来电后，根据 `ExtensionSettingsKnowledgeEntity.welcomeType` 自动选择欢迎语播放方式，并且无论走 HTTAPI 首轮还是实时 `mod_audio_stream` 媒体桥，均按当前分机号自己的欢迎语配置执行。

#### 3.4.1 两种模式

| welcomeType | 行为 | 依赖字段 |
| --- | --- | --- |
| `TTS`（默认） | 使用 TTS 引擎将 `welcomeText` 转为语音播报 | `welcomeText` |
| `AUDIO` | 直接播放 `welcomeAudioUrl` 指向的预录音频文件 | `welcomeAudioUrl` |

#### 3.4.2 运行时行为

```text
来电接通
  -> 解析 did + orgUid 对应的已发布 ExtensionSettingsKnowledgeEntity
  -> 读取 welcomeType
  -> TTS 模式：调用 TTS / MRCP 播报 welcomeText
  -> AUDIO 模式：播放 welcomeAudioUrl（HTTP 回放或 FreeSWITCH playback）
  -> 回合制路径：进入录音 / HTTAPI / AI 对话主循环
  -> 实时路径：启动 uuid_audio_stream / mod_audio_stream 后进入实时 AI 对话
```

#### 3.4.3 接入点（截至 2026-07-24）

- **HTTAPI 首轮统一入口**（`HttapiController.firstTurnVoiceAgent()`）：动态模板和静态 `92-ai-bot.xml` 均通过 HTTAPI `turn=1` 进入同一首轮逻辑。`firstTurnVoiceAgent()` 先调用 `/visitor/api/v1/call/voice-agent/welcome` 解析欢迎语配置（`QwenRealtimeVoiceAgentService.resolveWelcomePrompt()`，按 `did + orgUid` 读取已发布 `ExtensionSettingsKnowledgeEntity`），再根据 `welcomeType` 选择播放方式：`AUDIO` → 直接 `playback` 音频 URL；`TTS` → 继续走现有 `voiceAgentHttpClient.speak()` 合成。
- **实时媒体桥入口**（`deploy/freeswitch/scripts/qwen_realtime_media_start.lua`）：动态 AI 热线经 `AiHotlineDialplanTemplateBuilder` 设置 `bot_did`、`org_uid`、`voice_agent_ai_bot_base_url` 等通道变量后，由 Lua 脚本在启动 `uuid_audio_stream` 前调用同一个 `/visitor/api/v1/call/voice-agent/welcome` 接口。`AUDIO` 模式直接 `playback welcomeAudioUrl`，`TTS` 模式走 `session:execute("speak", "unimrcp:...")` 播报 `welcomeText`，随后再启动实时 `mod_audio_stream` 媒体桥并 `park`。
- **企业侧解析**（`QwenRealtimeVoiceAgentService.resolveWelcomePrompt()`）：从已发布 `ExtensionSettingsEntity.getActiveKnowledgeSettings()` 读取 `welcomeType` / `welcomeText` / `welcomeAudioUrl`，返回 `WelcomePrompt` 记录供 HTTAPI 消费。
- **欢迎语播放异常降级**：HTTAPI 首轮解析失败、TTS 合成失败或音频 URL 不可用时，播放默认 beep 提示音（`tone_stream://%(300,1000,440);loops=1`）后继续进入对话循环；实时媒体桥路径解析失败时，Lua 侧降级为默认 TTS 文案后继续开桥，不阻塞后续 AI 对话。

#### 3.4.4 实施任务（2026-07-22 已完成）

| # | 任务 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | `welcomeType` DTO/持久化贯通 | ✅ 已完成 | `ExtensionSettingsKnowledgeRequest/Response` 新增 `welcomeType` 字段；`ExtensionSettingsRestService` 的 `applyRequestToChildSettings` / `copyKnowledgeSettings` / `getOrCreateDefault` 均已补全 `welcomeType` 读写。 |
| 2 | 企业侧欢迎语解析接口 | ✅ 已完成 | `QwenRealtimeVoiceAgentService.resolveWelcomePrompt()` 按 `did + orgUid` 查已发布设置并返回 `WelcomePrompt(welcomeType, welcomeText, welcomeAudioUrl)`；`VoiceAgentRestControllerVisitor` 新增 `POST /welcome` 端点。 |
| 3 | 模块侧 HTTAPI 首轮调用 | ✅ 已完成 | `HttapiController.firstTurnVoiceAgent()` 改为先调 `voiceAgentHttpClient.welcome()` 解析欢迎语；`AUDIO` 直接 `playback`，`TTS` 走 `speak()` 合成；均失败降级 beep。`VoiceAgentHttpClient` 新增 `welcome()` 与 `VoiceAgentWelcomeResult`。 |
| 4 | 数据库迁移 | ✅ 已完成 | Liquibase `260722_add_extension_settings_knowledge_welcome_type.xml`：新增 `welcome_type varchar(32) default 'TTS'`，存量数据回填 `TTS`，已挂入 `master.xml`。 |
| 5 | 单测 | ✅ 已完成 | `HttapiControllerTest` 新增 `firstTurnShouldPlaybackConfiguredWelcomeAudioDirectly`（AUDIO 直播放验证）；保留原有 TTS 路径 `firstTurnShouldUseVoiceAgentGreetingForImplicit9205Did` 并通过 `welcome()` mock 适配。 |
| 6 | 9205 静态 XML 欢迎语 | ⏳ 无需单独处理 | 静态 `92-ai-bot.xml` 入口同样走 `HttapiController.firstTurnVoiceAgent()`，已自动覆盖。 |
| 7 | 实时 `mod_audio_stream` 欢迎语对齐 | ✅ 已完成 | `qwen_realtime_media_start.lua` 已在开桥前调用 `/welcome` 接口，并在 FreeSWITCH 侧按 `welcomeType` 播放 `welcomeText` 或 `welcomeAudioUrl`；移除了对容器内缺失 Lua JSON 库的运行时依赖。 |

验收状态：

- ✅ `welcomeType=TTS` 时，来电接通后先 TTS 播报 `welcomeText`。
- ✅ `welcomeType=AUDIO` 时，来电接通后先播放 `welcomeAudioUrl` 音频文件。
- ✅ 欢迎语播放失败时不阻塞后续 AI 对话流程（降级 beep + `bot_continue=1`）。
- ✅ 实时 `mod_audio_stream` 路径已在 FreeSWITCH 拨测验证，可在开桥前命中分机自己的欢迎语配置。
- ✅ `1100`、`1101` 已实拨验证，二者均能命中各自独立的欢迎语配置。

## 4. 推荐数据模型

### 4.1 Extension 与设置关系

调整后的方向（queueUid 从 ExtensionSettingsRoutingEntity 迁移到 ExtensionEntity）：

```text
ExtensionEntity
  extensionNumber = 9205
  queueUid -> CallQueueEntity.uid          ← 每个分机号独立绑定队列
  settings   -> ExtensionSettingsEntity    ← 知识库、路由、语音等通用配置

ExtensionSettingsEntity
  routingSettings -> ExtensionSettingsRoutingEntity

ExtensionSettingsRoutingEntity
  enableHumanHandoff                       ← 只保留转人工策略相关字段
  humanHandoffKeywords
  timeConditionUid
  offHourAction
  overflowAction
  ringTimeoutSeconds
  // queueUid 已迁出，不再在此层持有
```

**设计变更理由**：

- 一个 `ExtensionSettingsEntity` 模板可以被多个分机号共享（如 1100、1101 都绑定同一个 AI 热线模板）。
- 但每个分机号应有自己独立的人工队列（1100 → queue_A，1101 → queue_B），否则多号码共享同一队列会导致路由混乱。
- 因此 `queueUid` 应放在 `ExtensionEntity` 上，确保"一分机一队列"。

不建议在 `ExtensionEntity` 上直接增加 `agentUids` 字段。原因：

- 一个队列可被 IVR、热线、AI 分机等多个入口复用。
- 队列成员需要优先级、技能、容量、启停、排班等复杂属性，直接放在分机上会很快失控。
- 分机 ↔ 队列是 1:1，队列 ↔ 坐席是 1:N，层次清晰。

### 4.1.1 IVR 子设置建议：在 ExtensionSettingsEntity 下新增独立桥接层

建议不要把完整 IVR 定义直接塞进 `ExtensionSettingsEntity`，而是沿用当前聚合模式，新增一层独立的 `ExtensionSettingsIvrEntity`：

```text
ExtensionEntity
  extensionNumber = 1100
  queueUid -> CallQueueEntity.uid
  settings -> ExtensionSettingsEntity

ExtensionSettingsEntity
  knowledgeSettings
  routingSettings
  voiceSettings
  voicemailSettings
  ivrSettings          -> ExtensionSettingsIvrEntity
  draftIvrSettings     -> ExtensionSettingsIvrEntity

ExtensionSettingsIvrEntity
  enabled
  ivrMode
  ivrMenuUid
  noInputAction
  noMatchAction
  allowReturnToAi
  maxRetryCount

IvrMenuEntity
  extensionNumber
  workflowUid
```

推荐字段职责：

| 字段 | 用途 | 是否建议进入 `ExtensionSettingsIvrEntity` |
| --- | --- | --- |
| `enabled` | 是否启用 IVR 能力 | 是 |
| `ivrMode` | AI 与 IVR 的优先关系，例如 `AI_FIRST`、`IVR_FIRST`、`AI_FALLBACK_TO_IVR` | 是 |
| `ivrMenuUid` | 绑定哪一个现有 `IvrMenuEntity` | 是 |
| `noInputAction` | 用户无输入时走 `CONTINUE_AI / REPLAY_IVR / HUMAN_HANDOFF / LEAVE_MESSAGE / HANGUP` | 是 |
| `noMatchAction` | 用户意图未命中时的降级策略 | 是 |
| `allowReturnToAi` | 经过 IVR 后是否允许回到 AI 对话 | 是 |
| `maxRetryCount` | IVR 菜单重试次数 | 是 |
| `workflowUid` | IVR 工作流 UID | 否，保留在 `IvrMenuEntity` |
| `extensionNumber` | IVR 独立入口号码 | 否，保留在 `IvrMenuEntity` |

这样拆分的好处是：

1. `IvrMenuEntity` 继续作为可复用 IVR 资源存在，可被多个热线入口共享。
2. `ExtensionSettingsEntity` 继续保持“每个能力块一个 child settings + draft/published 成对管理”的统一风格。
3. 分机设置页可以只暴露“选哪套 IVR、何时进入 IVR、失败时怎么降级”，而不把完整 workflow 设计器硬塞进分机配置表单。

不建议直接在 `ExtensionSettingsEntity` 上只加一个裸字段 `ivrMenuUid`。原因：

1. 这无法表达 `AI_FIRST / IVR_FIRST / FALLBACK` 等运行策略。
2. 这无法承载 no-input / no-match / retry 等运行时分支策略。
3. 这会让 IVR 成为唯一一个不走 child settings + draft/published 模式的能力块，后续发布逻辑会很别扭。

### 4.2 CallQueueAgent 建议字段（队列坐席）

> 职责分离：`CallQueueAgentEntity` 存储队列中的坐席成员（谁可以接听），`CallQueueMemberEntity` 存储排队中的来电成员（谁在等待）。本节描述坐席侧模型。

将 `CallQueueAgentEntity` 从通用占位模型升级为队列坐席模型：

| 字段 | 用途 |
| --- | --- |
| `queueUid` | 关联 `CallQueueEntity.uid` |
| `agentUid` | 关联 `AgentEntity.uid` |
| `agentExtension` | 坐席 SIP 分机号或话机分机号 |
| `memberType` | `AGENT`、后续可扩展 `EXTERNAL_PHONE`、`WORKGROUP` |
| `priority` | 坐席优先级，数字越小或越大按约定排序 |
| `weight` | 权重分配，用于加权轮询 |
| `skillTags` | 技能标签，逗号或 JSON 存储 |
| `maxConcurrentCalls` | 电话并发上限，默认 1 |
| `enabled` | 是否参与分配 |
| `lastAssignedAt` | 轮询/最长空闲策略辅助字段 |
| `activeCallCount` | 当前通话数，与 `maxConcurrentCalls` 比较判断是否满员 |

推荐唯一性：

```text
orgUid + queueUid + agentUid + deleted=false 唯一
```

实施修订（2026-07-22）：`CallQueueAgentEntity` 已从占位模型补齐队列坐席字段：`queueUid`、`agentUid`、`agentExtension`、`memberType`、`priority`、`weight`、`skillTags`、`maxConcurrentCalls`、`activeCallCount`、`enabled`、`lastAssignedAt`，并新增 Liquibase 迁移 `260722_add_call_queue_agent_member_fields.xml`。`CallQueueAgentRestService` 已改为按 `orgUid + queueUid + agentUid` 做唯一约束校验，并在创建/更新时校验 `CallQueueEntity` 与 `AgentEntity` 属于同一组织且坐席启用。`HotlineHandoffDecisionService` 已在请求携带 `queueUid` 时按队列成员与 ACD `AVAILABLE` 状态联合判断可用坐席；未携带 `queueUid` 的旧路径仍回退到组织级可用坐席判断。`AcdRouteRequest`、`AcdQueueEntry`、`AcdQueueEntryEntity` 和 `acd_dispatcher` 已贯通 `queueUid`，`AcdService.chooseNextAgent(...)` 已在存在 `queueUid` 时按 `CallQueueAgentEntity` 成员关系收窄实际派发候选，并支持 `LONGEST_IDLE / ROUND_ROBIN / PRIORITY` 三种最小策略。

### 4.3 ACD 坐席状态建议

`AcdAgentStateEntity` 建议补充或统一以下映射：

| 字段 | 用途 |
| --- | --- |
| `agentUid` | 绑定 `AgentEntity.uid` |
| `agentExtension` | 当前注册或接听用分机 |
| `status` | `AVAILABLE`、`RINGING`、`BUSY`、`OFFLINE`、`REST` |
| `currentQueueEntryUid` | 当前处理的队列项 |
| `activeCallCount` | 当前通话数，支持并发容量判断 |
| `lastIdleAt` | 最长空闲优先 |
| `wrapUpUntil` | 话后整理截止时间，在此之前不参与分配 |
| `statusChangedAt` | 状态变更时间戳，用于统计和超时判断 |

### 4.4 坐席状态机

```text
            ┌──────────┐
            │ OFFLINE  │  (未登录 / 签出)
            └────┬─────┘
        签入/上线 │
                 ▼
            ┌──────────┐
    ┌──────►│AVAILABLE │◄──────────────┐
    │       └────┬─────┘               │
    │     ACD分配│                     │
    │            ▼                     │
    │       ┌──────────┐    超时/拒接  │
    │       │ RINGING  │──────────────►│
    │       └────┬─────┘               │
    │      接听  │                     │
    │            ▼                     │
    │       ┌──────────┐               │
    │       │  BUSY    │               │
    │       └────┬─────┘               │
    │      挂断  │                     │
    │            ▼                     │
    │       ┌──────────┐               │
    │       │ WRAP_UP  │  (话后整理)   │
    │       └────┬─────┘               │
    │    整理完成│                     │
    └───────────┘                     │
                                       │
            ┌──────────┐               │
            │  REST    │──────────────►│(休息结束→AVAILABLE)
            └──────────┘               │
                                       │
            ┌──────────┐               │
            │  ERROR   │ (异常断线等)  │
            └──────────┘──────────────►│
```

状态转换触发方式：

- `OFFLINE → AVAILABLE`：坐席在 Desktop 客户端点击"签入"或"上线"；或 SIP 成功注册后自动触发。
- `AVAILABLE → RINGING`：ACD 分配此坐席，FreeSWITCH 发起 `originate`，channel state 变为 `ringing`。
- `RINGING → BUSY`：坐席接听，FreeSWITCH CHANNEL_ANSWER 事件触发。
- `RINGING → AVAILABLE`：振铃超时或坐席拒接，通过 FreeSWITCH CHANNEL_HANGUP 事件（billsec=0）触发。
- `BUSY → WRAP_UP`：通话挂断，CHANNEL_HANGUP_COMPLETE 事件触发，系统自动切入话后整理。
- `WRAP_UP → AVAILABLE`：倒计时结束 或 坐席手动点击"完成整理"。
- `AVAILABLE → REST`：坐席手动点击"休息"。
- `REST → AVAILABLE`：坐席手动点击"恢复"。

短期可以先通过 `agentExtension` 与现有 `extension` 字段兼容，但中期应补齐 `agentUid`，避免只靠分机号找人。

## 5. 呼叫流程设计

### 5.0 能力层与入口层分离

为了避免后续每增加一个号码都复制一份静态 XML，本规划把呼叫链路拆成两层：

```text
入口层
  FreeSWITCH destination_number 命中
  -> CallRoute / xml_curl
  -> 必要时 Database Dialplan 作为回退或覆盖层
  -> transfer / httapi 到统一 AI 热线主控

能力层
  统一 AI 热线主控
  -> 按 did + orgUid 加载 ExtensionSettingsEntity
  -> 知识库 / 转人工 / IVR / 留言 / 排队
```

其中：

- **入口层负责把 1100、9205、9300 等号码接进来**；
- **能力层负责这些号码进来之后怎么处理**。

只要入口层可动态化，能力层就不再依赖某个固定号码。

### 5.1 AI 多并发流程

```text
Caller A/B/C -> 9205
  -> FreeSWITCH channel uuid 各自独立
  -> HTTAPI / voice-agent 请求携带 callUuid + did=9205 + orgUid
  -> QwenRealtimeVoiceAgentService
       - resolve ExtensionSettings by did/orgUid
       - conversationId = request.conversationId 或 callUuid
       - ASR/KB/LLM/TTS 均按 conversationId 隔离
  -> 返回各自 replyAudioUrl 和 nextActionType
```

首期建议把 `conversationId` 固定为 `callUuid`，除非前端或 FreeSWITCH 已提供稳定会话 ID。这样最容易排查日志和话单。

### 5.1.2 AI 与 IVR 的协同入口流程

在补齐 `ExtensionSettingsIvrEntity` 后，分机入口流程应明确由 `ivrMode` 决定：

```text
Caller -> 1100/9205
  -> 命中 ExtensionEntity + ExtensionSettingsEntity
  -> 读取 activeIvrSettings
      ├─ enabled=false 或 ivrMenuUid 为空
      │    -> 继续当前 AI 主链路
      ├─ ivrMode=AI_FIRST
      │    -> 先 AI 对话
      │    -> 命中 no-match / no-input / 指定 DTMF / 显式转 IVR 意图
      │    -> 转到 IvrMenuEntity.workflowUid 对应 IVR runtime
      ├─ ivrMode=IVR_FIRST
      │    -> 首轮先进入 IvrMenu runtime
      │    -> 某节点再转 AI / 转人工 / 留言
      └─ ivrMode=AI_FALLBACK_TO_IVR
           -> AI 优先
           -> 达到失败阈值后自动降级到 IVR
```

这里要刻意区分两层：

1. `IvrMenuEntity.workflowUid` 决定 IVR 具体节点编排。
2. `ExtensionSettingsIvrEntity` 决定这个分机在什么时机进入这套 IVR。

这样 `1100` 和 `1101` 可以复用同一套 `IvrMenuEntity`，但仍然拥有不同的 AI/IVR 切换策略。

### 5.1.1 以 1100 为例的动态入口流程

```text
Caller -> 1100
  -> FreeSWITCH 收到 destination_number=1100
  -> CallRoute 命中 1100
  -> xml_curl 按路由动态生成入口 XML
  -> 如有特殊兼容需求，DatabaseDialplan 再做低层覆盖
  -> 返回或生成“AI 热线模板 XML”
  -> HTTAPI / voice-agent 请求携带 did=1100 + orgUid + uuid
  -> QwenRealtimeVoiceAgentService.findExtensionSettings(did=1100, orgUid)
  -> 加载 1100 绑定的 ExtensionSettingsEntity
  -> 按 1100 的知识库 / 转人工 / 留言 / IVR 策略执行
```

这条链路说明：`did=1100` 只是运行时查配置的键；它不要求 1100 必须事先写死在某个本地 XML 文件里。

### 5.2 AI 转人工流程

```text
用户说“转人工”
  -> QwenRealtimeVoiceAgentService.containsHandoffKeyword
  -> ExtensionEntity.queueUid（从分机实体读取，而非 settings.routingSettings）
  -> HotlineHandoffDecisionService.decide(queueUid, orgUid, callUuid)
  -> ACD 按 queueUid 查询 CallQueueAgent
  -> 过滤可用 AgentEntity/AcdAgentState
  -> 选择目标坐席
  -> FreeSWITCH bridge / originate / fifo 或 ACD dispatcher
```

分配失败时：

- 非工作时间：进入留言。
- 无可用坐席且允许排队：进入该 `queueUid` 对应队列等待。
- 不允许排队：进入留言。
- 坐席振铃超时：尝试下一坐席；达到 `maxAttempts` 后留言或继续排队。

### 与本规划相关的已有规划

- [2026-07-17-9205-kb-ivr-human-plan.md](./2026-07-17-9205-kb-ivr-human-plan.md)：9205 的知识库对接、IVR、排队、留言主链路规划（**执行中**）。本规划是其多并发维度的补充，两者共享 `ExtensionSettingsEntity` 和 `CallQueueEntity` 数据模型。
- [2026-07-13-hotline-ivr-human-queue-plan.md](./2026-07-13-hotline-ivr-human-queue-plan.md)：已归并到 2026-07-17 主文档，保留为历史引用。

## 6. 分阶段实施计划

### 阶段 0-补充：先补 ExtensionSettings 与 IvrMenu 的桥接建模

在继续扩展“任意分机号模板”之前，建议先补齐 IVR 配置桥接层，否则规划里的“AI 接待、IVR、留言、排队”仍然会停留在文档口径一致、数据模型不一致的状态。

任务建议：

1. 新建 `ExtensionSettingsIvrEntity`、`ExtensionSettingsIvrRequest`、`ExtensionSettingsIvrResponse`。
2. 在 `ExtensionSettingsEntity` 增加 `ivrSettings/draftIvrSettings`，延续现有 child settings 发布模式。
3. 在 `ExtensionSettingsRestService` 中补齐 IVR child settings 的 copy/apply/clone/promote/convert。
4. 在 callAdmin 的 `ExtensionSettingsTab` 中新增 “IVR 设置” tab，支持选择现有 `IvrMenu`，而不是在分机设置页直接编辑 workflow。
5. 运行时补 `resolveActiveIvrSettings(...)` 策略层，让 `QwenRealtimeVoiceAgentService`、`HttapiController` 或统一热线模板可以按 `ivrMode` 决策是否转入 IVR。
6. 补一条 Liquibase 迁移，为 `bytedesk_call_extension_settings` 增加 `ivr_settings_uid` 与 `draft_ivr_settings_uid` 外键，并新建 `bytedesk_call_extension_settings_ivr` 表。

验收标准：

1. 管理员可在单个分机设置中明确看见“本分机绑定哪一套 IVR”。
2. 同一套 `IvrMenuEntity` 可被多个分机复用，但每个分机可有不同的 `ivrMode`。
3. 发布 `ExtensionSettingsEntity` 后，IVR 绑定与降级策略随 published 配置一起生效。
4. 不再需要靠 `IvrMenu.extensionNumber` 与 AI 分机号做隐式约定来表达绑定关系。

### 阶段 0：先补任意分机号入口抽象

目标：把“9205 特例入口”抽象成“任意 extensionNumber 可发布的 AI 热线入口”。

选型结论：**入口层采用 `CallRoute + xml_curl` 作为主方案，`DialplanEntity(CUSTOM_XML)` 只承担低层覆盖、兼容回退和少量系统模板职责。**

当前代码现实：

- `ExtensionRestService` 已通过 `ApplicationEventPublisher` 发布 `ExtensionCreateEvent / ExtensionUpdateEvent / ExtensionDeleteEvent`。
- `CallQueueEventListener` 已使用 `@TransactionalEventListener(AFTER_COMMIT)` 证明“分机变更 -> 事务后同步衍生资源”的模式在仓库内已成立。
- `CallRouteRestService` 已具备 `createSystemRoute(...)`、路由唯一键查询、缓存失效能力，适合承接“系统自动建 AI 热线入口路由”。
- `CallRouteDialplanXmlCurlProvider` 已具备 `EXACT/PREFIX/REGEX` 匹配、组织隔离、时间条件和多目标类型分发。
- `ExtensionSettingsEventListener` 当前还是空实现，这意味着**仅靠发布配置还不会自动刷新入口层**，阶段 0 必须把这条链补上。

任务：

1. 约定 `ExtensionEntity` 哪些类型允许发布为 AI 热线入口，例如 `INBOUND` / `HOTLINE` / 测试分机池。
1. 定义入口配置来源：

- `ExtensionEntity.extensionNumber`
- `ExtensionEntity.userContext`
- `ExtensionEntity.settingsUid`
- `ExtensionSettingsEntity.status=PUBLISHED`

1. 定义撤销策略：停用分机、解绑设置、撤销发布后，入口是否自动失效。
1. 以 `1100` 作为首个“非 9205 静态号码”验收样例。
1. 定义入口优先级：`静态专用 XML > 数据库 Dialplan 覆盖 > CallRoute+xml_curl 动态入口` 或反向收敛为单一入口，避免一号多入口竞合；首期推荐对 AI 热线号码**禁用静态专用 XML**，仅保留 `CallRoute+xml_curl`。

建议拆成以下可执行工作包：

#### 阶段 0A：定义 AI 热线入口资格规则

目标：明确哪些 `ExtensionEntity` 可以自动生成 AI 热线入口，避免普通坐席分机被误发布为外呼入口。

建议规则：

- 分机必须属于组织级或平台测试分机池，且 `deleted=false`、`enabled=true`。
- 分机必须绑定 `settingsUid`，且对应 `ExtensionSettingsEntity.status=PUBLISHED`。
- 分机 `userContext` 必须可被 xml_curl dialplan 请求命中，默认优先 `default`。
- 首期建议只放开明确的入口用途类型，例如新增 `HOTLINE` 或复用现有入线类类型；不要让普通 `agentExtension` 默认参与。

实施修订（2026-07-22）：当前 `ExtensionTypeEnum` 仅有 `FXO/FXS`，没有可直接复用的 `INBOUND/HOTLINE` 语义。阶段 0 第一批实现先采用软资格规则：`enabled=true`、绑定 settings、settings 已发布且启用、`extensionNumber/userContext/orgUid` 完整；`HOTLINE` 或更细的入口用途类型作为后续收紧项，避免首批同时牵动枚举、前端和导入逻辑。

代码落点建议：

- 在 `ExtensionRestService` 增加 `isEligibleForAiHotlineRoute(ExtensionEntity extension)` 之类的判定方法。
- 如需更强约束，可在 `ExtensionTypeEnum` 中补一个更明确的热线入口类型，而不是长期复用 `FXS/FXO` 语义。

#### 阶段 0B：新增 AI 热线入口同步服务

目标：把“某个分机应不应该拥有动态 AI 入口”集中到一个同步器里，而不是散落在多个控制器和监听器中。

建议新增：

- `AiHotlineRouteSyncService` 或同类命名服务。

职责：

- 根据 `ExtensionEntity + ExtensionSettingsEntity` 判断是否应存在入口路由。
- 若应存在，则 upsert 一条系统 `CallRoute`。
- 若不应存在，则停用或删除对应系统 `CallRoute`。
- 必要时清理对应 `DialplanCacheService` 缓存，确保 xml_curl 下次请求命中新配置。

建议最小接口：

- `syncForExtension(ExtensionEntity extension)`
- `syncForSettings(ExtensionSettingsEntity settings)`
- `markDeletedForExtension(ExtensionEntity extension)`
- `markUnpublishedForSettings(ExtensionSettingsEntity settings)`

#### 阶段 0C：建立 Extension 事件驱动入口同步

目标：让分机新增、编辑、删除后，入口路由自动跟着变，而不是靠人工补路由。

建议沿用现有模式：

- 参考 `CallQueueEventListener`，新增 `AiHotlineRouteEventListener`。
- 监听 `ExtensionCreateEvent / ExtensionUpdateEvent / ExtensionDeleteEvent`。
- 使用 `@TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)`，避免在事务未提交时提前生成入口路由。

触发矩阵：

| 触发动作 | 期望结果 |
| --- | --- |
| 新建 `ExtensionEntity(1100)` 且已绑定已发布设置 | 自动创建/启用 `CallRoute(matchValue=1100)` |
| 修改 `extensionNumber` / `userContext` | 原入口撤销，新入口重建 |
| 解绑 `settingsUid` | 入口撤销 |
| 分机 `enabled=false` | 入口撤销或停用 |
| 删除分机 | 入口标记删除 |

#### 阶段 0D：建立 ExtensionSettings 发布驱动入口同步

目标：解决“分机早已存在，但设置从 DRAFT 切换到 PUBLISHED 后入口仍不生效”的问题。

这是阶段 0 的关键补丁点，因为当前 `ExtensionSettingsEventListener` 还是空的。

建议补充：

- 在 `ExtensionSettingsRestService.publish(...)` 成功后发布 `ExtensionSettingsUpdateEvent` 或专门的 `ExtensionSettingsPublishEvent`。
- 在 `ExtensionSettingsEventListener` 中根据 `settingsUid` 反查所有绑定该设置的 `ExtensionEntity`。
- 对这些分机逐个调用 `AiHotlineRouteSyncService.syncForExtension(...)`。

触发矩阵：

| 设置动作 | 期望结果 |
| --- | --- |
| DRAFT 发布为 `PUBLISHED` | 所有关联分机入口自动生效 |
| 已发布设置被停用 | 所有关联分机入口自动撤销 |
| 已发布设置更换关键字段（如类型/启用态） | 所有关联分机入口自动重算 |

注意：

- `ExtensionSettingsEntity` 是 many-to-one，多个分机可能共用一个模板；事件监听器必须按“设置 -> 分机列表” fan-out，同步所有绑定分机。
- 如果未来支持“共享模板 + per-extension override”，入口资格判断仍应以分机实体为主，设置只提供能力配置。

#### 阶段 0E：约定系统 CallRoute 的生成规则

目标：保证自动生成的入口路由可识别、可重放、可幂等。

建议约定：

- `matchType = EXACT`
- `matchValue = extensionNumber`
- `context = extension.userContext`，首期默认 `default`
- `targetType` 不直接写死为某个静态 XML 分机，而是指向统一 AI 热线模板入口
- `sourceType = EXTENSION` 或新增更明确的 `AI_HOTLINE_EXTENSION`
- `sourceUid = extension.uid`
- `name` 使用可预测规则，例如 `ai-hotline:${orgUid}:${extensionNumber}`
- `uid` 使用可预测规则，确保重复同步时是 upsert 而不是新增垃圾路由

实现建议：

- 优先复用 `CallRouteRestService.createSystemRoute(...)`
- 补一个 `findBySourceTypeAndSourceUid` 或“按 route key + sourceUid”查询，避免只靠 `matchValue` 误判
- 保持“系统生成路由”和“人工维护路由”在命名、来源、权限上可区分

#### 阶段 0F：定义统一 AI 热线模板入口

目标：CallRoute 命中后，不再把业务塞回一堆静态 XML，而是命中一份统一模板，由模板把 `did/orgUid/uuid` 送入 HTTAPI 主控。

建议模板职责：

- 设置 `conversation_id=${uuid}`
- 透传 `did=${destination_number}`
- 首轮问候 / 录音 / HTTAPI 调用 / 继续对话
- 接收 `CONTINUE / ACD_ENQUEUE / LEAVE_MESSAGE / HANGUP`
- 与 `QwenRealtimeVoiceAgentService`、`HotlineHandoffDecisionService` 对接

关键原则：

- 模板中不得再写死 `9205`
- 业务差异全部回收至 `ExtensionSettingsEntity`
- 静态 `92-ai-bot.xml` 可暂时保留给 9205 兼容，但不再作为新号码的主路径

#### 阶段 0G：定义撤销与优先级策略

目标：避免 `1100` 同时被静态 XML、数据库 Dialplan、CallRoute 三套入口争用。

首期建议：

- 对 AI 热线号码，禁止再配置同号静态专用 XML。
- `CallRoute+xml_curl` 作为正式入口。
- `DialplanEntity(CUSTOM_XML)` 仅在明确标记为覆盖模式时才允许生效。

撤销策略建议：

- 分机删除：删除系统 `CallRoute`
- 分机停用：停用系统 `CallRoute`
- 设置解绑：停用系统 `CallRoute`
- 设置取消发布或停用：停用所有关联分机的系统 `CallRoute`
- 分机号变更：旧号路由删除，新号路由创建

#### 阶段 0H：补运行开关、冲突检测与并发幂等

目标：避免阶段 0 一上线就影响现有 9205 或人工维护路由。这里补的是生产落地前必须明确的保护栏。

##### 运行开关

建议新增配置开关，默认先关闭或仅灰度开启：

- `bytedesk.call.ai-hotline-route-sync.enabled`
- `bytedesk.call.ai-hotline-route-sync.dry-run`

首期行为建议：

- `enabled=false`：监听器不生成或修改系统 `CallRoute`
- `dry-run=true`：只打印将要生成/撤销的 route，不落库
- 灰度组织可通过后续 org 级配置扩展，不进入阶段 0 最小闭环

实施修订（2026-07-22）：`AiHotlineRouteSyncService` 已接入 `bytedesk.call.ai-hotline-route-sync.enabled` 与 `bytedesk.call.ai-hotline-route-sync.dry-run`。首期默认 `enabled=false`，测试中显式打开；`dry-run=true` 时会完成资格和冲突判断，但不会写入或修改 `CallRoute`。

##### 路由冲突检测

同步 `1100` 前必须检查同组织、同 context、同 match 号码是否已有非系统路由：

```text
orgUid + context + matchType=EXACT + matchValue=1100
```

冲突处理建议：

- 如果已有 `managedBySystem=true` 且 `sourceUid=extension.uid`：允许 upsert
- 如果已有人工 `CallRoute`：不覆盖，记录冲突状态，callAdmin 展示“同号人工路由冲突”
- 如果已有 `DialplanEntity(CUSTOM_XML)` 覆盖：不自动生成入口，提示“数据库 dialplan 覆盖中”
- 静态 XML 冲突无法可靠由数据库感知，阶段 0 只在文档和运维检查中声明禁止同号静态专用 XML

##### xml_curl 提供器优先级

需要在实现前确认 xml_curl provider 的实际调用顺序：

- `CallRouteDialplanXmlCurlProvider`
- `DatabaseDialplanXmlCurlProvider`
- 其他 provider 或默认 fallback

首期建议：

- `CallRoute` 是正式业务入口
- `DatabaseDialplan(CUSTOM_XML)` 是显式覆盖入口
- 如果两者同时命中同一个 `destination_number`，必须有确定优先级，不能依赖 provider 注册顺序的偶然结果

##### 组织解析与多租户边界

`CallRouteDialplanXmlCurlProvider` 匹配时需要拿到 `orgUid/context/domain/destination_number`。阶段 0 必须明确：

- `orgUid` 从 xml_curl 请求域名、domain 记录或已有关联规则解析
- 不能跨组织按 `extensionNumber` 裸匹配
- 同一个 `1100` 在不同组织允许各自生成独立系统 route

如果 `orgUid` 解析失败：

- 不应回退到全局扫描所有组织
- 应返回未命中或进入现有默认 fallback

##### 并发幂等

分机更新事件和设置发布事件可能同时触发同一个 `extension` 的同步。同步器需要保证：

- 同一事务后重复调用 `syncForExtension(1100)` 不产生重复 route
- 同步时先按 `sourceType/sourceUid` 找系统路由，再检查同号冲突
- 保存前后都清理 xml_curl / dialplan cache
- 如果检测到多条历史系统路由，保留最新一条，其他标记删除或停用，并记录告警日志

阶段 0 不强制引入分布式锁；如果后续发现并发写入冲突，再考虑数据库唯一索引或应用级锁。

#### 阶段 0I：callAdmin 最小管理面

目标：让管理员看到“这个分机是否已生成 AI 热线入口”，避免后台配置成功但入口层未生效。

首期最小展示建议：

- 在分机详情或 `ExtensionSettings` 页面展示：
  - 当前 `settingsUid`
  - 发布状态 `PUBLISHED/DRAFT`
  - 自动生成的 `CallRoute.uid`
  - 入口状态：已生效 / 待发布 / 已停用 / 配置缺失
- 在发布按钮附近增加阻断提示：
  - 绑定设置未发布
  - 分机类型不允许做 AI 热线入口
  - `userContext` 缺失
  - 同号存在静态/覆盖路由冲突

#### 阶段 0 实施顺序（建议按此开发）

下面把 0A-0H 收敛成一条可执行任务链，目标是先做出 `1100` 自动生成入口的最小闭环，再逐步补管理面和边界控制。

##### 任务 0-1：补入口资格判定与系统路由规则

目标：先把“什么分机可以生成 AI 热线入口”收敛成一套单点规则，避免后续监听器和同步服务各自实现一份。

建议影响文件：

- `enterprise/call/.../extension/ExtensionRestService.java`
- `enterprise/call/.../extension/ExtensionTypeEnum.java`（如需新增 `HOTLINE`）
- `enterprise/call/.../call_route/CallRouteEntity.java`
- `enterprise/call/.../call_route/CallRouteRequest.java`
- `enterprise/call/.../call_route/enums/CallRouteTargetTypeEnum.java`（如需新增统一 AI 热线模板目标类型）

输出：

- 一个统一资格判定方法，例如 `isEligibleForAiHotlineRoute(...)`
- 一套系统 `CallRoute` 生成规则：`matchType=EXACT`、`matchValue=extensionNumber`、`context=userContext`、`sourceUid=extension.uid`
- 一个明确的 `sourceType` 约定，建议 `AI_HOTLINE_EXTENSION`
- 一个明确的 `targetType/targetValue` 约定，避免后续在同步器里临时拼接字符串

实施修订（2026-07-22）：首批不改 `ExtensionTypeEnum`，入口资格先收敛在 `AiHotlineRouteSyncService` 内部；待 `HOTLINE` 类型在管理端、导入端和历史数据迁移策略明确后，再把类型判定加入资格规则。

建议先写的测试：

- `ExtensionRestServiceTest.shouldRecognizeEligibleAiHotlineExtension()`
- `ExtensionRestServiceTest.shouldRejectRegularAgentExtensionForAiHotlineRoute()`

验证点：

- 符合条件的 `1100` 能生成预期 route key
- 不符合条件的普通坐席分机不会被识别为 AI 热线入口

##### 任务 0-2：新增 `AiHotlineRouteSyncService`

目标：把入口 upsert / disable / delete 逻辑集中到一个服务，作为后续所有事件监听器的唯一落点。

建议影响文件：

- 新增 `enterprise/call/.../call_route/AiHotlineRouteSyncService.java`
- `enterprise/call/.../call_route/CallRouteRestService.java`
- `enterprise/call/.../call_route/CallRouteRepository.java`
- `enterprise/call/.../dialplan/DialplanCacheService.java`

输出：

- `syncForExtension(ExtensionEntity extension)`
- `syncForSettings(ExtensionSettingsEntity settings)`
- `markDeletedForExtension(ExtensionEntity extension)`
- `markUnpublishedForSettings(ExtensionSettingsEntity settings)`

建议补充仓库查询：

- `findByOrgUidAndSourceTypeAndSourceUidAndDeletedFalse(...)`
- 或 `findAllByOrgUidAndSourceTypeAndSourceUidAndDeletedFalse(...)`

原因：

- 当前 `CallRouteRepository` 只有按 `orgUid + context + matchType + matchValue` 查路由的能力。
- 对系统自动生成入口来说，只靠 `matchValue=1100` 不足以区分“人工路由”和“AI 热线系统路由”，也不利于处理改号时的旧路由清理。

建议先写的测试：

- `AiHotlineRouteSyncServiceTest.shouldUpsertSystemRouteForEligibleExtension()`
- `AiHotlineRouteSyncServiceTest.shouldDisableRouteWhenExtensionLosesEligibility()`
- `AiHotlineRouteSyncServiceTest.shouldMoveRouteWhenExtensionNumberChanges()`

验证点：

- 同一个 `1100` 重复同步不会产生多条垃圾路由
- 分机号变更时旧 route 能清理、新 route 能补齐
- route 更新后 xml_curl 缓存不会继续命中旧入口

##### 任务 0-3：接通分机事件链

目标：在新增、编辑、删除分机后自动刷新入口，而不是要求人工维护 `CallRoute`。

建议影响文件：

- 新增 `enterprise/call/.../call_route/AiHotlineRouteEventListener.java`
- `enterprise/call/.../extension/ExtensionRestService.java`

实现方式：

- 参考 `CallQueueEventListener`
- 使用 `@TransactionalEventListener(phase = AFTER_COMMIT)`
- 对 `create/update/delete` 分别调用同步服务对应接口

说明：

- `ExtensionCreateEvent / ExtensionUpdateEvent / ExtensionDeleteEvent` 结构已存在，首期大概率不需要改事件类本身。
- 真正新增的是监听器和对同步器的调用。

已补测试覆盖：

- `AiHotlineRouteEventListenerTest.shouldSyncRouteWhenExtensionCreated()`
- `AiHotlineRouteEventListenerTest.shouldSyncRouteWhenExtensionUpdated()`
- `AiHotlineRouteEventListenerTest.shouldDeleteRouteWhenExtensionDeleted()`
- `AiHotlineRouteEventListenerTest.shouldIgnoreNullEvents()`

验证点：

- 新建 `ExtensionEntity(1100)` 且绑定已发布设置后，自动生成 route
- `settingsUid` 被清空或 `enabled=false` 后，route 自动失效
- 删除分机后，route 自动标记删除

##### 任务 0-4：接通设置发布事件链

目标：解决“分机早已存在，但设置从 DRAFT 发布后入口仍不生效”的关键缺口。

建议影响文件：

- `enterprise/call/.../extension_settings/ExtensionSettingsRestService.java`
- `enterprise/call/.../extension_settings/ExtensionSettingsEventListener.java`
- `enterprise/call/.../extension_settings/event/ExtensionSettingsUpdateEvent.java`
- `enterprise/call/.../extension/ExtensionRepository.java`

实现方式：

- 在 `publish(...)` 成功保存后发布设置变更事件
- 监听器按 `settingsUid` 反查所有绑定该设置的分机
- fan-out 调用 `AiHotlineRouteSyncService.syncForExtension(...)`

建议仓库复用：

- `ExtensionRepository.findBySettingsUidAndDeletedFalse(settingsUid)` 已存在，可直接作为 fan-out 数据源。

已补测试覆盖：

- `AiHotlineRouteSyncServiceTest.shouldSyncAllExtensionsBoundToPublishedSettings()`
- `AiHotlineRouteSyncServiceTest.shouldDisableAllManagedRoutesWhenSettingsUnpublished()`
- `ExtensionSettingsRestServiceTest.updateShouldPersistNestedSettings()` 断言发布 settings update 事件
- `ExtensionSettingsRestServiceTest.deleteShouldPublishSettingsDeletedEvent()`
- `ExtensionSettingsEventListenerTest` 覆盖 update/delete/null event 消费

验证点：

- 先建 `1100` 再发布设置，route 能延迟生效
- 停用已发布设置后，所有关联分机 route 自动失效
- 一个共享模板绑定多个分机时，多个 route 能同时刷新

##### 任务 0-5：落统一 AI 热线模板入口

目标：让 `CallRoute+xml_curl` 命中的不是号码专属 XML，而是一份对任意 `did` 通用的 AI 热线模板。

建议影响文件：

- `enterprise/call/.../xml_curl/CallRouteDialplanXmlCurlProvider.java`
- 可能新增模板提供器或模板构造器，例如 `AiHotlineDialplanTemplateBuilder`
- `modules/call/.../httapi/HttapiController.java`
- `enterprise/call/.../visitor/QwenRealtimeVoiceAgentService.java`

建议实现拆分：

- 不建议把整段模板 XML 继续硬编码进 `CallRouteDialplanXmlCurlProvider`。
- 建议新增一个专门 builder，例如 `AiHotlineDialplanTemplateBuilder`，由 provider 只负责“选择目标类型 -> 调 builder 产出 XML”。

实施修订（2026-07-22）：已新增 `AiHotlineDialplanTemplateBuilder` 承担 `AI_HOTLINE` action XML 渲染；`CallRouteDialplanXmlCurlProvider` 仍负责路由匹配、黑名单拼接和完整 dialplan 包装。

建议先写的测试：

- `AiHotlineDialplanTemplateBuilderTest.shouldRenderDidAndConversationIdVariables()`
- `CallRouteDialplanXmlCurlProviderTest.shouldGenerateAiHotlineXmlFor1100()`
- `QwenRealtimeVoiceAgentServiceTest.shouldResolveSettingsByDid1100()`

当前覆盖：`CallRouteDialplanXmlCurlProviderTest` 已覆盖 1100 入口、录音循环、`ACD_ENQUEUE`、`LEAVE_MESSAGE` 输出；后续如果 builder 继续扩展策略分支，再补直接的 builder 单测。

输出：

- 模板必须透传 `did=${destination_number}` 和 `conversation_id=${uuid}`
- 模板必须支持 `CONTINUE / ACD_ENQUEUE / LEAVE_MESSAGE / HANGUP`
- 模板中不再写死 `9205`

实施修订（2026-07-22）：现有静态 `92-ai-bot.xml` 的 9205 回合制兜底实际只完成 `CONTINUE/HANGUP` 循环，尚未在 dialplan 层对 `ACD_ENQUEUE/LEAVE_MESSAGE` 做完整分流。动态 `AI_HOTLINE` 模板采用虚拟目的号分流：二轮 HTTAPI 后转到 `${did}r${bot_route}`，再由 xml_curl 为 `${did}rCONTINUE`、`${did}rACD_ENQUEUE`、`${did}rLEAVE_MESSAGE`、`${did}rHANGUP` 生成对应动作；这让新号码先具备动态分流能力，同时不改动 9205 静态兼容路径。

验证点：

- `1100` 和 `9205` 都能进入同一套主控入口
- 运行时按 `did` 分别加载各自的 `ExtensionSettingsEntity`

##### 任务 0-6：补最小测试与管理面可观测性

目标：在开始真实拨测前，先把入口自动生成链路做成可验证、可观测的能力。

建议影响文件：

- 新增或扩展：
  - `enterprise/call/.../call_route/*Test.java`
  - `enterprise/call/.../extension/*Test.java`
  - `enterprise/call/.../extension_settings/*Test.java`
- 前端：
  - `frontend/apps/callAdmin/src/pages/.../Extension/...`
  - `frontend/apps/callAdmin/src/pages/.../Extension/settings/...`

建议测试点：

- `AiHotlineRouteSyncServiceTest`：已覆盖 upsert、disable、delete、rename、重复系统 route 清理、settings fan-out
- `AiHotlineRouteEventListenerTest`：已覆盖分机 create/update/delete/null event 消费
- `ExtensionSettingsEventListenerTest`：已覆盖 settings update/delete/null event 消费
- `CallRouteDialplanXmlCurlProviderTest`：已覆盖 `destination_number=1100` 动态入口、循环、ACD、留言分支
- 端到端最小用例：`1100` 无静态 XML 仍可进入 AI 主控

建议前端最小展示：

- 分机页面显示：`settingsUid`、发布态、route UID、入口状态
- 设置发布后给出“入口已同步/待同步/冲突”提示

建议真实开发依赖顺序：

1. 先补 `CallRouteRepository` 的 source 查询能力，否则 `AiHotlineRouteSyncService` 无法可靠地做幂等 upsert/disable。
2. 再落 `AiHotlineRouteSyncService`，并先用单测把 route 生命周期钉住。
3. 然后接 `Extension` 事件监听。
4. 再接 `ExtensionSettings` 发布事件监听。
5. 最后替换统一 AI 热线模板入口，并补 xml_curl/HTTAPI 端到端验证。

建议第一批先写的测试集合：

1. `AiHotlineRouteSyncServiceTest`
2. `ExtensionSettingsEventListenerTest`
3. `CallRouteDialplanXmlCurlProviderTest`

原因：

- 这三组测试分别钉住“路由生命周期”“设置发布 fan-out”“运行时入口生成”，能最早暴露设计是否可行。

阶段 0 的推荐编码顺序：

1. 先做任务 0-1 和 0-2，先把规则和同步器定型。
2. 再做任务 0-3 和 0-4，把分机事件、设置发布事件都接入同步器。
3. 然后做任务 0-5，把统一入口模板替换掉号码专属路径。
4. 最后做任务 0-6，把测试和 callAdmin 可观测性补齐。

#### 阶段 0 补充：接口与字段级别草案

这一节不是最终代码，而是为了在正式开发前把 `CallRoute` 模型缺口一次性说清，避免实现过程中反复返工。

##### 0-X1：`CallRouteEntity` 建议新增字段

当前 `CallRouteEntity` 只有“匹配谁、命中后去哪”的字段，没有“这条路由是谁自动生成的”这一层标识。对 AI 热线系统路由来说，这会直接影响幂等更新、旧号清理、冲突识别。

建议新增：

- `sourceType`：系统路由来源类型，例如 `AI_HOTLINE_EXTENSION`
- `sourceUid`：来源实体 UID，首期建议保存 `ExtensionEntity.uid`
- `managedBySystem`：是否系统生成，便于前后台区分手工路由与自动路由

建议字段草案：

```java
@Column(name = "source_type")
private String sourceType;

@Column(name = "source_uid")
private String sourceUid;

@Builder.Default
@Column(name = "managed_by_system")
private Boolean managedBySystem = Boolean.FALSE;
```

首期约定：

- AI 热线系统路由固定写入 `sourceType=AI_HOTLINE_EXTENSION`
- `sourceUid=extension.uid`
- `managedBySystem=true`

这样做的直接收益：

- `1100` 改成 `1101` 时，可以先按 `sourceUid` 找到旧路由再更新，而不是依赖旧号码反查
- 同号存在人工 `CallRoute` 时，系统路由仍能被稳定识别
- 后台可以明确展示“这条入口是系统托管生成的”

##### 0-X2：`CallRouteRequest` 建议同步补字段

如果后端服务层通过 `CallRouteRequest` 传递 upsert 数据，则 DTO 也要带上 source 维度，避免服务层再做二次拼装。

建议新增：

```java
private String sourceType;

private String sourceUid;

private Boolean managedBySystem;
```

约束建议：

- 普通人工新增路由时，这三个字段允许为空
- 系统同步入口时，这三个字段必须成组出现
- `managedBySystem=true` 的路由，后台编辑页首期建议只读或限制部分字段可编辑

##### 0-X2b：`CallRouteResponse` / `CallRouteExcel` 影响确认

当前 `CallRouteRestService.convertToResponse(...)` 和 `convertToExcel(...)` 直接通过 `modelMapper.map(entity, ...)` 映射，所以一旦 `CallRouteEntity` 新增 `sourceType / sourceUid / managedBySystem`，这三个字段会自动透出到 API 响应和 Excel 导出。

建议实施前确认：

- 前台是否需要展示 `sourceType / sourceUid` 以区分系统路由和人工路由
- 如果前台暂时不展示，仍可以让字段自然透出（不会破坏已有页面），但需要和前端约定不依赖这些字段做业务判断
- `CallRouteResponse` / `CallRouteExcel` 不需要立即新增同名字段，除非未来需要对前端做展示层定制

首期建议：

- 先不改 Response/Excel DTO
- 自然透出即可
- 等 callAdmin 最小管理面（阶段 0I）落地后，再决定是否要在 response 层做显式字段控制

##### 0-X3：`CallRouteTargetTypeEnum` 建议新增统一入口类型

当前枚举只有 `IVR_MENU / EXTENSION / VOICEMAIL / WORKFLOW / QUEUE / BRIDGE / PLAYBACK / HANGUP`，没有“AI 热线统一模板入口”这种目标类型。

建议新增：

```java
AI_HOTLINE
```

原因：

- 不建议把 AI 热线模板伪装成 `WORKFLOW` 或 `PLAYBACK`，语义会变脏
- `CallRouteDialplanXmlCurlProvider` 可以按 `targetType=AI_HOTLINE` 直达模板 builder，控制面更清晰
- 后续如果 AI 热线还要分 `realtime / non-realtime / MRCP` 模式，也有明确扩展点

首期 `targetValue` 建议：

- 可以为空，由 builder 按 `did/orgUid` 运行时解析
- 如果确实需要模板版本标识，可约定固定值，例如 `DEFAULT`

##### 0-X4：`CallRouteRepository` 建议新增查询方法

当前仓库只有：

- `findByOrgUidAndContextAndMatchTypeAndMatchValueAndDeletedFalse(...)`
- `findAllByOrgUidAndContextAndEnabledTrueAndDeletedFalseOrderByPriorityAscUpdatedAtDesc(...)`

这不足以支撑系统同步。

建议新增：

```java
Optional<CallRouteEntity> findByOrgUidAndSourceTypeAndSourceUidAndDeletedFalse(
  String orgUid,
  String sourceType,
  String sourceUid);

List<CallRouteEntity> findAllByOrgUidAndSourceTypeAndDeletedFalse(
  String orgUid,
  String sourceType);
```

如首期想更保守，也至少要有：

```java
List<CallRouteEntity> findAllByOrgUidAndSourceTypeAndSourceUidAndDeletedFalse(
  String orgUid,
  String sourceType,
  String sourceUid);
```

用途对应：

- `syncForExtension(...)`：按 `sourceUid` 查唯一系统路由，做 upsert
- `markDeletedForExtension(...)`：按 `sourceUid` 标记删除
- 后台筛查：按 `sourceType=AI_HOTLINE_EXTENSION` 统计所有自动入口

##### 0-X5：`AiHotlineRouteSyncService` 建议方法签名

首期不建议一上来做很泛化的“任意系统路由同步框架”，先把 AI 热线入口做成一套窄接口，逻辑更稳。

建议服务接口：

```java
public interface AiHotlineRouteSyncService {

  void syncForExtension(ExtensionEntity extension);

  void syncForSettings(ExtensionSettingsEntity settings);

  void markDeletedForExtension(ExtensionEntity extension);

  void markUnpublishedForSettings(ExtensionSettingsEntity settings);
}
```

建议内部私有方法：

```java
private boolean isEligibleForAiHotlineRoute(ExtensionEntity extension, ExtensionSettingsEntity settings);

private CallRouteRequest buildAiHotlineRouteRequest(ExtensionEntity extension, ExtensionSettingsEntity settings);

private void disableManagedRoute(CallRouteEntity route, String reason);
```

这里建议把“资格判定”和“构造请求”集中在同步器内部或其 helper 中，不要散落在 listener / rest service / provider 三处。

##### 0-X6：分机与设置事件的最小发布草案

首期建议继续沿用现有事件模型，不额外发明一套新的总线结构。

建议：

- `ExtensionRestService` 继续发布现有 `ExtensionCreateEvent / ExtensionUpdateEvent / ExtensionDeleteEvent`
- `AiHotlineRouteEventListener` 在 `AFTER_COMMIT` 阶段消费这些事件并调用同步器
- `ExtensionSettingsRestService.publish(...)` 成功后补发 `ExtensionSettingsUpdateEvent`
- `ExtensionSettingsEventListener` 中按 `settingsUid` fan-out 到全部绑定分机

最小调用链：

```text
发布 ExtensionSettings
  -> 发送 ExtensionSettingsUpdateEvent
  -> ExtensionSettingsEventListener
  -> ExtensionRepository.findBySettingsUidAndDeletedFalse(settingsUid)
  -> AiHotlineRouteSyncService.syncForExtension(extension)
```

##### 0-X7：首批测试先写到什么粒度

如果只允许先写 3 组测试，建议按下面顺序落：

1. `AiHotlineRouteSyncServiceTest`
2. `ExtensionSettingsEventListenerTest`
3. `CallRouteDialplanXmlCurlProviderTest`

每组至少先覆盖一个核心用例：

- `AiHotlineRouteSyncServiceTest.shouldCreateManagedAiHotlineRouteFor1100()`
- `AiHotlineRouteSyncServiceTest.shouldDisableManagedRouteWhenSettingsUnpublished()`
- `ExtensionSettingsEventListenerTest.shouldFanOutPublishedSettingsToAllBoundExtensions()`
- `CallRouteDialplanXmlCurlProviderTest.shouldRenderAiHotlineTemplateForDestination1100()`

不建议首批就先写：

- 大而全的 Starter 级集成测试
- 依赖 FreeSWITCH 真机的拨测脚本
- callAdmin 前端联调用例

原因很直接：

- 阶段 0 的核心不在 SIP/FreeSWITCH，而在“系统路由是否被正确生成、更新、失效”
- 先把 `CallRoute` 生命周期钉住，后续拨测失败时才能快速判断是入口生成问题，还是运行时模板问题

##### 0-X8：数据库迁移建议

从现有仓库看，`bytedesk_call_route` 已经在用 Liquibase 增量演进，现有样例是 `260604_add_call_route_time_condition_uid.xml` 这种“对已有表直接 `addColumn` + `createIndex`”的方式。因此本次不建议重建表，也不建议引入破坏性迁移。

首期建议新增一个独立 changelog，例如：

- `starter/src/main/resources/db/changelog/migration/260721_add_call_route_source_fields.xml`

建议内容：

1. `addColumn source_type VARCHAR(64)`
2. `addColumn source_uid VARCHAR(64)`
3. `addColumn managed_by_system BOOLEAN default false`
4. 为 `source_type` 建普通索引
5. 为 `source_uid` 建普通索引
6. 为 `org_uid + source_type + source_uid + deleted` 建组合索引

建议不要首期直接做数据库唯一约束，原因：

- 当前表里可能已经存在手工维护的同号路由，直接上唯一约束更容易在升级时炸历史数据
- 首期可以先由 `AiHotlineRouteSyncService` 保证“同一 `sourceType/sourceUid` 只维护一条有效系统路由”
- 等首轮数据清洗完成后，再考虑把系统路由约束收紧为唯一索引

如果后续确认线上历史数据足够干净，再考虑第二阶段补：

- 唯一索引：`org_uid + source_type + source_uid + deleted`

但这一步不建议进入阶段 0 的最小交付。

##### 0-X9：字段约束与空值策略

建议把 AI 热线系统路由的字段约束写清楚，避免实现时出现一半靠数据库默认、一半靠业务代码猜测的状态。

对 `managedBySystem=true` 的路由，建议满足：

- `sourceType` 必填
- `sourceUid` 必填
- `matchType=EXACT`
- `matchValue=extensionNumber` 必填
- `context=userContext` 必填
- `targetType=AI_HOTLINE` 必填
- `status=ACTIVE`
- `enabled=true`

对人工路由，允许：

- `sourceType/sourceUid/managedBySystem` 为空或 `false`
- 继续使用现有 `IVR_MENU / BRIDGE / QUEUE / PLAYBACK` 等目标类型

建议首期由服务层校验这些约束，而不是靠数据库 `NOT NULL` 一刀切，原因：

- 同一张表同时承载人工路由和系统路由
- 直接把 `sourceType/sourceUid` 设成全表非空，会破坏现有人工路由模型

##### 0-X10：和 `ExtensionSettingsEntity` 的绑定约束

这一轮不建议在 `ExtensionSettingsEntity` 上新增“专属 extensionNumber”字段。

原因很明确：

- 当前 `ExtensionEntity` 已通过 `settings_uid` 多对一关联到 `ExtensionSettingsEntity`
- 这天然支持“一个 settings 模板绑定多个分机”
- 当前 `ExtensionRepository.findBySettingsUidAndDeletedFalse(...)` 已足够支撑设置发布后的 fan-out 刷新

也就是说，`1100 -> settingsA`、`1101 -> settingsA`、`9205 -> settingsA` 这种共享模板关系，本来就是现有模型允许的，不需要再把分机号回写进 `ExtensionSettingsEntity`。

真正应该落约束的是“入口资格”，而不是“设置唯一绑定”：

- 不是所有绑定了 `settingsA` 的分机都自动生成 AI 热线入口
- 只有满足入口资格规则的分机，才会生成系统 `CallRoute`
- `ExtensionSettingsEntity` 继续负责“命中入口后怎么处理”，不负责“哪些号码一定要生成入口”

##### 0-X11：和 `ExtensionSettingsRoutingEntity` 的关系约定（已修订）

> **2026-07-22 修订**：`queueUid` 已从 `ExtensionSettingsRoutingEntity` 迁出至 `ExtensionEntity`，原因见 4.1 节。

现有 `ExtensionSettingsRoutingEntity` 保留字段：

- `enableHumanHandoff`
- `humanHandoffKeywords`
- `timeConditionUid`
- `offHourAction`
- `overflowAction`
- `ringTimeoutSeconds`

~~`queueUid`~~ — 已迁至 `ExtensionEntity.queueUid`，确保"一分机一队列"。`ExtensionSettingsRoutingEntity` 中旧字段标记 `@Deprecated`，运行时优先从 `ExtensionEntity.queueUid` 读取。

因此阶段 0 不建议再在 `CallRouteEntity` 上复制一套 AI 业务字段。

职责划分建议保持：

- `CallRouteEntity` 只负责"入口命中"和"进入统一 AI 热线模板"
- `ExtensionEntity.queueUid` 负责"转人工时去哪个队列"
- `ExtensionSettingsRoutingEntity` 负责"转人工策略配置（关键词、时间窗、溢出动作、振铃超时等）"

这样可以避免多个地方同时存 `queueUid` 的冲突。注意：

- `CallRouteEntity.timeConditionUid` 仍然可以保留给"入口层是否生效"的场景
- 但 AI 热线首期建议优先复用 `ExtensionSettingsRoutingEntity.timeConditionUid` 做业务层判断
- 如果未来确实需要"号码入口层时间窗"和"AI 业务层时间窗"分离，再单独扩展，不要阶段 0 一次做满

##### 0-X12：阶段 0 的 migration 验收标准

数据库侧最小验收建议：

1. Liquibase 能在已有 `bytedesk_call_route` 表上平滑执行，不依赖空库。
2. 旧人工路由数据在升级后不需要补 `sourceType/sourceUid` 也能正常读取。
3. 新生成的 AI 热线系统路由具备 `sourceType/sourceUid/managedBySystem`。
4. `AiHotlineRouteSyncService` 能仅凭 `orgUid + sourceType + sourceUid` 定位并更新系统路由。
5. 回滚视角下，即使 migration 已执行但功能未启用，也不会影响已有 `9205` 或普通路由的运行。

#### 阶段 0 实施前检查表

这一节只保留真正开工前需要对照的顺序，不再重复解释背景。

##### A. 先改哪些类

第一批直接改：

1. `CallRouteEntity`
2. `CallRouteRequest`
3. `CallRouteRepository`
4. `CallRouteTargetTypeEnum`
5. Liquibase `master.xml` 与新增 migration 文件

第二批再改：

1. 新增 `AiHotlineRouteSyncService`
2. `CallRouteRestService`
3. `ExtensionRestService`
4. 新增 `AiHotlineRouteEventListener`

第三批再改：

1. `ExtensionSettingsRestService.publish(...)`
2. `ExtensionSettingsEventListener`
3. `CallRouteDialplanXmlCurlProvider`
4. 新增 `AiHotlineDialplanTemplateBuilder`
5. `QwenRealtimeVoiceAgentService`

这样切分的目的：

- 先把数据模型和查询能力补齐
- 再做系统路由生命周期
- 最后才接运行时入口模板

##### B. migration 何时落

建议时序：

1. 先改 Java 模型草案。
2. 紧接着同一批次补 Liquibase migration。
3. 再写依赖新字段的 repository / service 代码。

不建议把 migration 拖到最后，原因：

- 后续 `Repository`、`ModelMapper`、系统 route upsert 都会默认这些字段已经是正式模型
- 如果 migration 滞后，开发期间很容易出现“代码假定字段存在，但本地库没有同步”的假阳性问题

##### C. 第一轮测试顺序

建议严格按这个顺序写和跑：

1. `AiHotlineRouteSyncServiceTest`
2. `ExtensionSettingsEventListenerTest`
3. `AiHotlineRouteEventListenerTest`
4. `CallRouteDialplanXmlCurlProviderTest`
5. `QwenRealtimeVoiceAgentServiceTest`

顺序原因：

- 前 3 个先把“自动生成、自动失效、发布 fan-out”钉住
- 第 4 个再确认 xml_curl 命中后能生成统一入口
- 第 5 个最后确认能力层按 `did` 正确读取 settings

##### D. 每一批改完要跑什么

第一批改完后至少验证：

- `get_errors` 无新增编译错误
- `enterprise/call` 针对性单测可开始依赖新字段

第二批改完后至少验证：

- `AiHotlineRouteSyncServiceTest`
- `ExtensionSettingsEventListenerTest`
- `AiHotlineRouteEventListenerTest`

第三批改完后至少验证：

- `CallRouteDialplanXmlCurlProviderTest`
- `QwenRealtimeVoiceAgentServiceTest`
- 如有最小集成测试，再补一个 `1100` 动态入口链路用例

##### E. 阶段 0 开工时禁止混入的内容

阶段 0 先不要顺手做：

1. `CallQueueAgent` 大规模结构重构
2. ACD 分配策略增强
3. FreeSWITCH 新增一套 `1100.xml` 静态拨号计划
4. `ExtensionSettingsEntity` 回写分机号字段
5. callAdmin 大页面重构

原因：

- 这些都不属于“1100 无静态 XML 自动生成 AI 热线入口”的最小闭环
- 混进阶段 0 会掩盖真正的入口层缺口

##### F. 阶段 0 完成前必须人工确认的 5 个问题

1. `AI_HOTLINE` 是否作为正式 `CallRouteTargetTypeEnum` 发布，而不是复用 `WORKFLOW`。
2. `sourceUid` 是否固定使用 `ExtensionEntity.uid`，而不是 `extensionNumber` 或 `settingsUid`。
3. `managedBySystem=true` 的路由后台是否允许人工编辑。
4. 首期是否只做软幂等，不加数据库唯一约束。
5. `CallRoute.timeConditionUid` 与 `ExtensionSettingsRouting.timeConditionUid` 首期是否坚持单一职责，不做双写。

如果这 5 个问题不先定，代码实现时最容易反复返工。

##### G. 最终开工判定

下面条件都成立，才建议从文档切到代码：

1. `CallRoute` 新字段、targetType、repository 查询签名已经在文档中冻结。
2. Liquibase migration 文件命名与索引策略已确认。
3. 首批 3 组测试的断言目标已经写清楚。
4. 已确认阶段 0 不修改 `ExtensionSettingsEntity` 的绑定模型。
5. 已确认不新增 `1100` 静态 FreeSWITCH XML，而是走 `CallRoute+xml_curl`。

验收：

- `1100` 可在不修改 `deploy/freeswitch/conf/dialplan/default/92-ai-bot.xml` 的前提下进入 AI 主控。
- 入口层与能力层职责清晰，不再要求每个号码复制一份静态 XML。
- `1100` 的正式入口记录落在 `CallRoute`，而不是散落在手工 XML 文件中。

阶段 0 完成判定：

- 新建 `ExtensionEntity(1100)` 并绑定已发布设置后，无需人工加 XML、无需人工加路由，即可自动生成入口。
- 取消发布、解绑或停用后，入口自动失效。
- `9205` 和 `1100` 最终都能走同一套模板化入口，而不是复制两份号码专属 XML。

##### 第一批改动的现有代码影响面

改 `CallRouteEntity` 新增三个字段后，以下已有方法不需要改签名，但需要确认不影响编译：

- `CallRouteRestService.convertToResponse / convertToExcel`：modelMapper 自动映射，无需改
- `CallRouteRestService.initCallRoutes(...)`：构建 `CallRouteRequest.builder()` 时不 set 新字段，由于字段允许为空，已有逻辑不受影响
- `CallRouteSpecification.search(...)`：JPA Specification 按已有字段过滤，新字段不会自动参与过滤，无需改
- `CallRouteDialplanXmlCurlProvider.provideDialplanXml(...)`：不依赖 source 字段，无需改

如果后续 `createSystemRoute(...)` 内部对 `CallRouteRequest` 做了非空校验，则可能需要在系统路由构建请求时显式 set 新字段。首期建议先不做硬校验，只由同步服务保证约束。

##### 系统路由回填策略

阶段 0 上线后，已有组织内可能已经存在绑定了已发布 settings 的分机（如 9205、1200 等），但这些分机在数据库里并没有对应的系统 `CallRoute`。

建议首期不做自动回填，原因：

- 已有 9205 仍在走静态 `92-ai-bot.xml`，自动回填可能引入同号冲突
- 回填逻辑如果写错，会一次性污染所有组织的数据

回填时机建议：

- 阶段 0 稳定后，提供一个手动或管理员触发的"补建入口"操作
- 或者在下一次管理员编辑/发布 ExtensionSettings 时，事件链自动触发同步

如果确实需要批量回填，建议分组织灰度：先测试组织 → 确认无冲突 → 逐组织执行，每次回填前先检查同号是否已有非系统路由冲突。

##### xml_curl 缓存失效确认

当前 `CallRouteDialplanXmlCurlProvider` 依赖的缓存失效方式需要在实现前确认。如果缓存基于定时刷新或 LRU，同步器生成/停用系统路由后，`1100` 入口可能不会立即生效。

建议实现 `AiHotlineRouteSyncService` 时：

- 每次 upsert / disable 系统路由后，显式调用缓存失效
- 如果 `DialplanCacheService` 存在且提供按 route key 精准失效的能力，优先使用
- 否则至少保证本组织对应 context 的路由列表缓存被清除
- 记录日志：`cache invalidated for orgUid=X, context=Y, reason=Z`

如果缓存失效是异步的，同步器在返回前应保证失效指令已发出，不要依赖定时刷新在若干秒后自动生效。

### 阶段 1：验证多并发 AI 会话隔离并补充测试

目标：确认多个用户同时拨打 `9205` 时不会共享 AI 上下文。

> 基础链路已经就绪：`VoiceAgentRequest.conversationId`、`VoiceAgentResponse.conversationId`、`HttapiController` 对 FreeSWITCH `uuid` 的透传均已存在。阶段 1 的重点是**验证而非从零构建**。

任务：

1. 在 `QwenRealtimeVoiceAgentService` 中统一打印 `did/orgUid/callUuid/conversationId` 日志（当前日志缺少 `callUuid`）。
2. 增加单测：两个不同 `conversationId`、相同 `did=9205` 的请求并发调用，验证返回的 `nextActionType` 互不影响。
3. 增加集成测试：模拟两个语音 turn 请求携带不同 `conversationId`，验证 AI 回复不串上下文。
4. 增加一个 `did=1100` 的同构用例，证明能力层并未写死 `9205`。

实施修订（2026-07-22）：`QwenRealtimeVoiceAgentService` 日志已补 `conversationId`，并将已解析的 `conversationId` 传入 `HotlineHandoffDecisionRequest.callUuid`，避免请求未显式传值时 handoff 链路拿到 `null`。已补 `QwenRealtimeVoiceAgentServiceTest.chatShouldResolvePublishedSettingsByDid1100()` 与 `chatShouldKeepDifferentConversationIdsIsolatedForSameDid()`；集成测试和真实并发拨测仍待后续环境验证。

验收：

- 两个并发请求使用同一个 `did=9205`，但 `conversationId` 不同，AI 回复、转人工状态互不影响。
- 任一通话触发 `ACD_ENQUEUE` 不会改变另一通话的 `nextActionType`。

### 阶段 2：补齐 CallQueueAgent 与 AgentEntity 绑定

目标：支持一个 `CallQueueEntity` 下配置多个 `AgentEntity`（坐席）。

> 迁移策略：当前 `CallQueueAgentEntity` 仅含 `name/description/type` 三个业务字段，表大概率是空的或仅有测试数据。推荐直接在现表上 ALTER TABLE 加列（`queueUid`、`agentUid`、`agentExtension`、`priority`、`weight`、`enabled`、`activeCallCount` 等），不需要新建表。

任务：

1. 扩展 `CallQueueAgentEntity` 字段：`queueUid`、`agentUid`、`agentExtension`、`memberType`、`priority`、`weight`、`skillTags`、`maxConcurrentCalls`、`enabled`、`activeCallCount`、`lastAssignedAt`。
2. 补 Liquibase migration（ALTER TABLE 方式）。
3. 扩展 `CallQueueAgentRequest/Response/RestService/Specification`。
4. 保存坐席时校验：队列、坐席必须属于同一 `orgUid`，且未删除、启用。
5. 增加唯一性保护：`orgUid + queueUid + agentUid + deleted=false` 唯一（同队列同坐席不可重复）。
6. 更新 `CallQueueAgentRestService` 现有查询（当前按 `name + orgUid + type` 查唯一键，改为按 `queueUid + agentUid`）。

验收：

- 一个 9205 专属队列可以添加多个 `AgentEntity`。
- 删除或禁用成员后不参与后续分配。
- 同队列重复添加同一坐席被拒绝。

### 阶段 3：按队列过滤人工坐席

目标：转人工时只在 `queueUid` 对应成员中选择坐席。

任务：

1. 修改 `HotlineHandoffDecisionService.hasAvailableAgent()`，从"组织内任意可用 ACD 坐席"改为"队列内可用 ACD 坐席"：
   - 先按 `queueUid` 查 `CallQueueAgentEntity` 列表。
   - 再通过 `agentUid` / `agentExtension` 匹配 `AcdAgentStateEntity`。
   - 过滤 `status=AVAILABLE` 且 `activeCallCount < maxConcurrentCalls` 的坐席。
2. 将 `ExtensionSettingsRoutingEntity.overflowAction` 接入 `HotlineHandoffDecisionService`（当前该字段只在调用方硬编码使用，决策服务内部未读取）。
3. 增加 `AcdAgentSelector` 服务，封装可用坐席筛选和排序。
4. 支持最小策略：`LONGEST_IDLE`（按 `AcdAgentStateEntity.lastIdleAt`）、`ROUND_ROBIN`（按 `CallQueueAgentEntity.lastAssignedAt`）、`PRIORITY`（按 `priority`）。
5. 满员或无可用坐席时按 `overflowAction` 返回排队或留言。

实施修订（2026-07-22）：第 1、2、3、4、5 项已完成。`AcdAgentSelector` 已抽离为独立服务，封装了按 `queueUid` 收窄候选、`LINEAR/ROUND_ROBIN/PRIORITY/LONGEST_IDLE` 四种策略排序、`markAssigned` 和 `resolveAgentUid`；`AcdService` 只负责队列编排和事件分发。当前 `HotlineHandoffDecisionService` 已直接读取 `overflowAction`，不再只依赖调用方布尔透传；`AcdService` 已按 `queueUid` 收窄候选，并基于 `AcdAgentStateEntity.lastIdleAt`、`CallQueueAgentEntity.lastAssignedAt`、`CallQueueAgentEntity.priority` 实现 `LONGEST_IDLE / ROUND_ROBIN / PRIORITY` 排序。

验收：

- `queueUid=9205队列` 中有 A、B 两个坐席时，只会分配给 A/B。
- 组织内其他可用坐席不在该队列时不会被分配。
- A 忙线后，下一通可分配给 B 或进入排队。

### 阶段 4：ACD 队列执行与 FreeSWITCH 桥接闭环

目标：`ACD_ENQUEUE` 后能够实际振铃坐席、接通、失败重试、留言。

> 复用已有的 `DialplanRestService` 中 `acd_dispatcher` / `leave_msg_dispatcher` 通用模板，不新增 9205 专用 dialplan。

任务：

1. 补齐 `AcdQueueEntryEntity` 字段：
   - 新增 `queueUid`（替代只靠 `queueName` 匹配，消除队列歧义）。
   - 保留现有 `domain`、`skill`、`strategy`、`mohSound`、`maxAttempts`、`attempts` 字段，不做破坏性删除。
   - 明确 `domain` 在多租户场景下与 `orgUid` 的映射关系。
2. ACD dispatcher 根据 `AcdQueueEntryEntity` 选择坐席并发起 `bridge` 或 `originate` 到 `user/{agentExtension}@{domain}`。
3. 坐席接起后：
   - `AcdAgentStateEntity.status = BUSY`、`activeCallCount++`。
   - `AcdQueueEntryEntity.status = ANSWERED`、`bridgedAt = now`。
4. 坐席挂断后：
   - `AcdAgentStateEntity.status = WRAP_UP`、`wrapUpUntil = now + 话后整理时长`。
   - `AcdQueueEntryEntity.status = COMPLETED`。
   - 记录 CdrEntity（话单）与 `queueUid`、`agentUid` 关联。
5. 振铃超时后：尝试下一坐席（`attempts++`）；达到 `maxAttempts` 后转留言。
6. 坐席拒接后：`AcdAgentStateEntity.status = AVAILABLE`（快速恢复）。

实施修订（2026-07-22）：第 1、2、3、4、5、6 项主链路已初步打通。`AcdService.handleCallEvent(...)` 现在会在接通时把 `AcdAgentStateEntity.status` 切到 `BUSY` 并同步 `CallQueueAgentEntity.activeCallCount++`；通话挂断后先进入 `AFTER_CALL_WORK` 状态，并通过新增迁移 `260722_add_acd_agent_wrap_up_until.xml` 持久化 `wrapUpUntil`，定时任务到期后再回 `AVAILABLE`。振铃超时与拒接路径会直接恢复到 `AVAILABLE`。`AcdService` 发起坐席腿时已透传 `hotline_queue_uid` 与 `acd_agent_uid`，`CdrEntity`、`CdrRequest/Response`、`CdrEslSyncService` 和新增迁移 `260722_add_cdr_queue_agent_fields.xml` 已补齐 `queueUid/agentUid` 关联落库。仍未完成的是 Desktop 端的显式“完成整理”动作。

### 4.4 补充：Desktop 客服端接听流程

从 ACD 选中坐席到坐席 Desktop 客户端接听的完整链路：

```text
ACD 选中坐席 (agentExtension=1006)
  -> FreeSWITCH originate user/1006@default
  -> 坐席 SIP 终端 / Desktop 客户端振铃
  -> Desktop 弹窗提示来电（主叫号码、队列名、等候时长）
  -> 坐席点击"接听"或桌面话机摘机
  -> FreeSWITCH bridge 接通 → 用户 ↔ 坐席通话
  -> 坐席挂断 → CHANNEL_HANGUP_COMPLETE
  -> AcdAgentState.status = WRAP_UP (自动进入话后整理)
  -> 坐席点击"完成整理"或倒计时结束 → status = AVAILABLE
```

要求：

1. 坐席必须先完成 SIP 注册（extensionNumber + password）才能被 ACD 分配。
2. Desktop 客户端需要监听 WebSocket / SIP 事件，在收到来电时展示弹窗。
3. 坐席忙线时（`status != AVAILABLE`）不再分配新来电。

验收：

- 多个用户同时转人工时，可分别振铃不同坐席。
- 坐席状态能按 `AVAILABLE → RINGING → BUSY → WRAP_UP → AVAILABLE` 正确流转。
- 超时、拒接、挂断均有明确状态和话单记录。

### 阶段 5：callAdmin 配置界面

目标：让管理员在后台完成 `9205 -> 队列 -> 多坐席` 配置。

任务：

1. 在 Destination / ExtensionSettings 页面中展示当前分机绑定的 `queueUid`。
2. 将 `CallQueueTable` 作为 tab 添加到 `DestinationPage` 中 `ExtensionSettings` tab 的右侧。
3. 增加队列成员管理入口：选择多个 `AgentEntity` 加入队列。
4. 在发布 `ExtensionSettings` 时校验 `queueUid` 存在且至少有一个启用成员。
5. 对 `9205` 默认初始化队列和默认成员给出空状态提示，而不是静默失败。

实施修订（2026-07-22）：第 1、3、4 项的后端与最小管理面已完成。`ExtensionSettingsRestService.publish(...)` 在启用人工转接且该设置已绑定到分机时，会校验分机 `queueUid` 非空、队列存在、队列与设置同组织且未删除，并要求队列下至少有一个启用成员。未绑定分机的共享模板仍允许先发布，避免破坏模板预配置流程。callAdmin 已在分机列表展示绑定队列 UID 及启用成员数量/无成员风险，在呼叫队列列表支持展开查看队列坐席成员，并可新增、编辑、删除队列成员；空成员时提示发布会被拦截。更完整的设置页详情提示和空状态体验仍待实现。

验收：

- 管理员可以在同一页面看到分机、设置、队列、队列成员。
- `9205` 启用转人工但队列没有成员时，发布或运行时给出明确提示。

### 阶段 6：并发与容量控制

目标：在真实多路电话下稳定运行。

实施修订（2026-07-22）：AI 侧并发守护已初步落地。`AiSessionConcurrencyManager` 提供按组织维度的活跃 AI 会话计数、超限拒绝（返回 `HANGUP` + `AI_CONCURRENCY_LIMIT`）、会话结束自动释放，以及定时清理僵死会话的兜底机制。`QwenRealtimeVoiceAgentService.chat()` 在入口处检测超限，在 `nextActionType != CONTINUE` 时释放槽位。属性 `bytedesk.call.ai-session.max-concurrency-per-org`（默认 10）、`bytedesk.call.ai-session.stale-ttl-minutes`（默认 30）、`bytedesk.call.ai-session.sweep-interval-ms`（默认 60000）。坐席侧容量控制（`CallQueueAgentEntity.maxConcurrentCalls` + `activeCallCount`）已在阶段 4 打通。队列侧等待人数/最长等待时间、ASR/TTS 等指标采集与压测脚本仍待后续补齐。

目标：在真实多路电话下稳定运行。

任务：

1. 对 AI 侧设置并发上限：按组织、按号码、按模型供应商分别限流。
2. 对坐席侧设置并发上限：默认每个电话坐席 `maxConcurrentCalls=1`。
3. 对队列侧设置等待人数、最长等待时间、溢出动作。
4. 增加指标：AI 并发数、ASR/TTS 耗时、转人工量、排队量、接通率、留言量。
5. 增加压测脚本或模拟测试，覆盖 10/50/100 路并发拨打 `9205`。

验收：

- 超过 AI 并发上限时返回忙线/排队/留言策略，而不是拖垮服务。
- 坐席容量准确生效，同一坐席不会被重复分配超出上限。

## 7. 测试计划

### 7.1 单元测试

- `QwenRealtimeVoiceAgentServiceTest`：两个不同 `conversationId` 的请求互不影响。
- `HotlineHandoffDecisionServiceTest`：按 `queueUid` 判断可用坐席。
- `CallQueueAgentRestServiceTest`：同队列重复坐席阻断、跨组织阻断、禁用坐席不参与分配。
- `AcdAgentSelectorTest`：最长空闲、优先级、轮询策略。

### 7.2 集成测试

- 模拟 `9205` 三路同时呼入，分别得到独立回复。
- 模拟两路同时转人工，分配给两个不同坐席。
- 模拟一个坐席忙线、一个坐席可用，确认只分配可用坐席。
- 模拟所有坐席离线，确认进入排队或留言。

### 7.3 真实拨测

- 两部手机同时拨打 `9205`，确认 AI 对话互不串音、互不串上下文。
- 两通电话同时说“转人工”，确认两个坐席分别响铃。
- 坐席全部忙线时确认进入等待或留言。

## 8. 风险与注意事项

- **不要把 `ExtensionSettingsEntity` 误当成入口本身**：它解决的是“命中后如何处理”，不是“FreeSWITCH 如何先命中 1100”。如果入口层未打通，再完整的设置也不会生效。
- **静态 XML 与动态入口并存的竞合**：如果 `92-ai-bot.xml`、数据库 `DialplanEntity`、`CallRoute xml_curl` 同时都匹配 `1100`，可能出现命中顺序不一致。需要先定义优先级，避免一号多入口。
- **`DialplanEntity(CUSTOM_XML)` 的使用边界**：它适合做底层覆盖、系统模板和兼容补丁，不适合作为 AI 热线入口的主配置源；否则会把业务入口重新打散到 XML 文本层，削弱 `CallRoute` 的可治理性。
- **共享模板与专属模板的边界**：`ExtensionSettingsEntity` 是 many-to-one 绑定，一个模板可能被多个分机共用。若 `1100` 需要专属 `kbUid`，要么为其创建专属模板，要么引入 per-extension override，不能直接在共享模板上改出副作用；`queueUid` 已迁至 `ExtensionEntity`，每个分机号天然拥有独立队列。
- **AI 模型并发限制**：供应商侧可能限制 QPS 或并发会话数，需要做限流和降级。
- **FreeSWITCH 媒体资源**：多路录音、播放、转码会占用 CPU 和磁盘 IO，需要清理临时文件。
- **状态一致性**：坐席振铃、接起、挂断等事件必须可靠回写，否则会出现坐席一直忙线。
- **队列歧义**：`queueName` 可能重复，运行时应优先使用 `queueUid`。
- **在线客服与电话客服状态差异**：`AgentEntity.status` 和 `AcdAgentStateEntity.status` 需要明确同步规则，不能简单等同。
- **多租户隔离**：队列、坐席、分机设置、知识库必须同 `orgUid`，跨租户引用必须阻断。
- **FreeSWITCH `fifo` 模块与自定义 ACD dispatcher 的竞合**：当前 `92-ai-bot.xml` 中 9205 的 `ACD_ENQUEUE` 路由可能同时触及 `fifo` 模块和 `acd_dispatcher` 模板。如果两套排队机制并存，同一通电话可能被重复入队。建议明确：9205 首期只使用自定义 `acd_dispatcher`，显式禁用或绕过 `fifo`。
- **`AgentEntity.status`（在线客服状态）与 `AcdAgentStateEntity.status`（电话 ACD 状态）同步**：当前两者独立存储且含义不同——前者表示在线客服是否在线，后者表示电话坐席是否可接听。必须避免一个字段覆盖另一个，建议：`AgentEntity.status` 继续表达在线客服在线/离线；`AcdAgentStateEntity.status` 专注电话 ACD 状态；仅在 `AcdAgentStateEntity` 写入时同步更新 `AgentEntity` 的 `extra` 字段用于前台展示。

## 9. 推荐先做的最小闭环

首个可交付闭环建议控制在以下范围：

1. 先让 `1100` 在**无静态专属 XML** 的前提下，通过 `CallRoute+xml_curl` 命中统一 AI 热线入口；仅在确有兼容需求时使用 `DialplanEntity` 覆盖。
2. 确认 `9205`、`1100` 多路 AI 请求都按 `conversationId=callUuid` 隔离。
3. 扩展 `CallQueueAgentEntity`，支持 `queueUid + agentUid + agentExtension`（坐席侧）；`CallQueueMemberEntity` 用于存储排队中的来电成员。
4. 修改转人工决策，只判断 `queueUid` 下的可用坐席。
5. callAdmin 支持在同一入口配置中完成：分机绑定设置、查看队列、维护队列成员。
6. 完成“两路同时拨打 1100 或 9205，两路同时转人工，两个坐席分别接起”的端到端验证。

确认该最小闭环后，再进入更完整的 ACD 策略、容量控制、排队统计和报表建设。

## 10. 1100 示例落地建议

为了避免讨论停留在抽象层，下面给出 `1100` 的推荐落地方式。

### 10.1 数据侧

```text
ExtensionEntity
  extensionNumber = 1100
  userContext = default
  settingsUid = ext_settings_1100
  queueUid = queue_1100                    ← 每个分机号独立绑定队列

ExtensionSettingsEntity(ext_settings_1100)
  status = PUBLISHED
  knowledgeSettings.kbUid = kb_1100
  routingSettings.enableHumanHandoff = true
  routingSettings.timeConditionUid = tc_workhours_1100
  routingSettings.overflowAction = QUEUE
  voiceSettings.enableVoicemail = true
  // queueUid 不在此层，已在 ExtensionEntity.queueUid
```

### 10.2 入口侧

推荐优先级：

1. **首选**：`CallRoute + xml_curl`，因为更符合现有动态路由方向。
1. **次选**：自动写入 `DialplanEntity(CUSTOM_XML)`，但仅用于局部覆盖、兼容回退或少量系统模板。
1. **不推荐长期使用**：继续为每个号码手工追加 `92-ai-bot.xml` 静态分支。

选择理由：

- `CallRoute` 已具备组织隔离、优先级、匹配模式、时间条件等业务语义，适合作为后台可治理的入口配置源。
- `xml_curl` 已经是运行时 XML 生成机制，适合把“号码 -> 入口模板”动态化，而不把业务散落到静态文件。
- `DatabaseDialplanXmlCurlProvider` 当前本质是“按 context + destinationNumber 取 XML 文本”，更像低层覆盖层，不适合承载 AI 热线的主业务模型。

### 10.3 运行时侧

`1100` 的运行时与 `9205` 保持一致：

```text
拨打 1100
  -> 统一 AI 热线模板入口
  -> did=1100
  -> findPublishedSettingsByExtensionNumberAndOrgUid(1100, orgUid)
  -> Knowledge / Handoff / Queue / Voicemail / IVR
```

### 10.4 是否能够实现

答案是：**可以实现，但要补“动态入口层”而不是只补设置页面**。

如果只做 `ExtensionSettingsEntity` 绑定，而不做 `1100 -> AI 主控` 的入口路由，那么用户拨打 `1100` 时 FreeSWITCH 根本不会进入这套能力链路。

如果把 `1100` 的入口也纳入 `CallRoute/xml_curl/DialplanEntity` 统一生成，则 `1100` 与 `9205` 在能力层上没有本质区别。
