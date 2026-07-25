# 热线智能语音入口统一规划（以 9205 为示例）

> 日期：2026-07-17
> 状态：**执行中**（最后更新：2026-07-18）
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md) 第 23 行

## 0. 执行状态总览

> 更新时间：2026-07-18

| 工作包 | 名称 | 状态 | 完成度 | 备注 |
| ------ | ------ | ------ | ------ | ------ |
| A | 9205 配置与热线数据底座 | ✅ 已完成 | ~95% | ExtensionSettings 全部文件已创建，Liquibase 已注册，VoicemailEntity 字段已补齐；仅缺 `package-info.java`（非阻塞） |
| B | 通用热线 workflow 与 Java 决策底座 | ⚠️ 部分完成 | ~85% | 节点类型枚举、HotlineHandoffDecisionService、IvrMenuHttapiController 的 human_handoff / acd_enqueue / leave_message / voice_bot / business_http 运行时均已落地，且针对 IvrMenuHttapiController 的 11 条单测已通过；默认 schema 发布治理仍待补齐 |
| C | FreeSWITCH 通用模板与 9205 拨号计划 | ⚠️ 部分完成 | ~85% | 9205 回合制 dialplan 已完成 ACD_ENQUEUE / LEAVE_MESSAGE / HANGUP 路由和留言录音；acd_dispatcher / leave_msg_dispatcher 已在 DialplanRestService 中初始化，通用模板基本落地 |
| D | 9205 AI 知识库与转人工主链路 | ✅ 已完成 | ~90% | QwenRealtimeVoiceAgentService 已集成 KB 检索、转人工决策、instructions 装配；HttapiController 透传参数 |
| E | callAdmin 页面与发布阻断能力 | ⚠️ 部分完成 | ~92% | 前端 CRUD 页面与最小发布入口已完成（表格+抽屉+路由+发布按钮）；后端已补 `status/publishedVersion` 字段、“运行时只读 PUBLISHED 配置”约束、显式 `/publish` 入口、最小引用阻断校验、对应 Liquibase 字段迁移，以及“编辑已发布配置时转入 DRAFT 副本、发布时归档旧 PUBLISHED”语义；组织查询已按 `botDid + orgUid + type` 聚合为当前工作副本视图，并补充 `timeConditionUid` 启用态阻断；剩余缺口主要是更细粒度引用状态校验与版本管理 |
| F | 测试与端到端验证 | ⚠️ 已开始 | ~75% | IvrMenuHttapiController 定向单测 11/11 已通过；QwenRealtimeVoiceAgentService 新增 3 条主链路单测已通过（知识库命中、转人工留言、默认组织 published 配置回退）；ExtensionSettingsRestService 新增 11 条单测已通过（含发布成功、跨租户阻断、编辑已发布配置生成 DRAFT、副本发布归档旧线上态、timeCondition 启用态阻断、列表聚合优先 DRAFT）；callAdmin 留言管理页已补 DID、队列、留言原因、回呼状态、录音地址、转写内容与处理时间展示；真实拨测与端到端场景仍未补齐 |

### 已完成的关键交付物

**后端 (enterprise/call)**：

- `ai_bot/ExtensionSettingsEntity.java` — 完整实体，包含运行时字段与 `status/publishedVersion` 发布态字段
- `ai_bot/ExtensionSettingsRepository.java`
- `ai_bot/ExtensionSettingsRequest.java` / `ExtensionSettingsResponse.java`
- `ai_bot/ExtensionSettingsRestService.java` — 含 `findByBotDidAndOrgUid()`、`findPublishedByBotDidAndOrgUid()`、`getOrCreateDefault()`、`publish()`，并在更新已发布配置时自动分流到 DRAFT 副本，组织查询按当前工作副本聚合
- `ai_bot/ExtensionSettingsRestController.java` — 完整 CRUD + 导出 API (`/api/v1/ai/bot/settings`)
- `ai_bot/ExtensionSettingsInitializer.java` — 默认 9205 配置初始化
- `ai_bot/ExtensionSettingsPermissions.java` — 权限定义
- `ai_bot/ExtensionSettingsExcel.java` — 导出 Excel 定义
- `ai_bot/ExtensionSettingsEventListener.java` / `ExtensionSettingsEntityListener.java`
- `ai_bot/ExtensionSettingsSpecification.java`

**数据库**：

- `starter/src/main/resources/db/changelog/migration/260717_add_ai_bot_settings.xml` — 完整建表，已包含 `settings_status` / `published_version`
- `starter/src/main/resources/db/changelog/migration/260718_add_ai_bot_settings_publish_fields.xml` — 兼容已存在表的发布态字段补丁
- `starter/src/main/resources/db/changelog/master.xml` — 已注册

**Voicemail 扩展**：

- `VoicemailEntity` 已有 `callUuid`, `didNumber`, `queueUid`, `leaveReason`, `callbackStatus`, `recordingUrl`, `transcriptionText`, `callbackAgentUid`, `relatedIvrRecordUid`, `handledAt` 等全部热线字段

**Workflow 节点**：

- `WorkflowNodeTypeEnum` 已新增 `HUMAN_HANDOFF`, `ACD_ENQUEUE`, `LEAVE_MESSAGE`, `VOICE_BOT`, `BUSINESS_HTTP`

**9205 AI 主链路 (QwenRealtimeVoiceAgentService)**：

- `findExtensionSettings()` — 按 botDid + orgUid 加载已发布配置
- `resolveKnowledgeBaseReply()` — 知识库检索 + 阈值判断
- `resolveHandoffDecision()` — 转人工意图识别 + 调用 HotlineHandoffDecisionService
- `buildInstructions()` — systemPrompt 装配
- `containsHandoffKeyword()` — 转人工关键词匹配
- 返回 `VoiceAgentResponse` 含 `nextActionType`（CONTINUE/ACD_ENQUEUE/LEAVE_MESSAGE/HANGUP）、`queueName`、`queueUid`、`leaveReason`、`promptText`、`maxRecordSeconds`、`ringTimeoutSeconds`

**FreeSWITCH (92-ai-bot.xml)**：

- 9205 回合制循环：92050 → record → httapi → 92052{route}
- 路由分支：CONTINUE（继续对话）、ACD_ENQUEUE（fifo 入队）、LEAVE_MESSAGE（转移留言）、HANGUP（挂断）
- 留言录制与回调：92053 → record → httapi save leave-message

**前端 (callAdmin)**：

- `pages/Dashboard/Call/ExtensionSettings/index.tsx` — 页面入口
- `pages/Dashboard/Call/ExtensionSettings/ExtensionSettingsTable.tsx` — ProTable 列表（含测试呼叫、发布按钮、状态/发布版本展示）
- `pages/Dashboard/Call/ExtensionSettings/ExtensionSettingsDrawer.tsx` — ProForm 表单（含知识库/队列/时间条件下拉选择）
- `pages/Dashboard/Call/Voicemail/VoicemailTable.tsx` — 留言管理列表已展示 DID、队列、留言原因、回呼状态、录音地址、转写内容、处理时间
- `apis/call/ai_bot_settings.ts` — API 调用（含 `/publish`）
- `@types/call/ai_bot_settings.d.ts` — TypeScript 类型定义（含 `status` / `publishedVersion`）
- `@types/call/voicemail.d.ts` — TypeScript 类型定义已补热线扩展字段
- `config/routes.ts` — 路由 `/call/ai-bot-settings` 已注册
- `access.ts` — `canExtensionSettings` 权限已定义
- `utils/authorities.ts` — `AI_BOT_SETTINGS` 权限常量

### 待完成的关键事项

**阻塞级**：

- [ ] 工作包 F：补齐 9205 端到端测试验证（排队、后台配置生效、真实 HTTAPI 回合制链路）
- [ ] 发布阻断增强：补齐队列发布态模型、更多引用对象状态校验，以及更完整的引用完整性校验
- [x] 为 `ExtensionSettings` / `QwenRealtimeVoiceAgentService` 增加最小可执行测试，覆盖查询、默认 9205 配置读取、更新、知识库命中与转人工分支
- [x] 为 `92-ai-bot.xml -> /ai-bot -> /visitor/api/v1/call/voice-agent/turn` 的 9205 回合制路由补充最小单测，覆盖 `ACD_ENQUEUE` / `LEAVE_MESSAGE` 返回值到 `bot_route`、队列、留言变量的映射

**重要级**：

- [x] `ExtensionSettings` 的 Liquibase migration 补齐 `settings_status` / `published_version` 字段
- [x] `VoicemailEntity` 的 Liquibase migration 已包含热线扩展字段
- [x] callAdmin 留言管理页面已对接扩展后的 `VoicemailEntity` 主要展示字段
- [ ] `package-info.java` 补充

**后续增强**：

- [ ] 多语言播报资源管理
- [ ] 配置版本/修订历史
- [ ] 统计报表与实时大屏
- [ ] TtsRealtime 前端对接知识库

本规划将“通用热线 IVR / 转人工 / 排队 / 留言能力”与“9205 AI 语音入口增强”合并为一份统一文档，并以 9205 作为首个落地示例。

统一目标分成两层：

1. **通用热线能力层**：沉淀 IVR、转人工、排队、留言、发布回滚、通用 dialplan 模板、后台配置模型。
2. **9205 示例入口层**：在通用热线能力上，增加 AI 语音对话、知识库优先、大模型兜底、语义转人工和按键降级。

对 9205 这个首个示例来说，目标是把该号码从一个"纯 AI 语音对话机器人"升级为"AI 知识库语音助手 + 可转人工/排队/留言"的完整电话客服入口：

1. **知识库对接**：AI 回答优先查询微语知识库，命中常见问题时直接播报知识库答案；未命中时回退到大模型通用回答。
2. **后台可编辑**：管理员可在 callAdmin 后台配置 9205 的提示词、知识库绑定、欢迎语、语音模型、转人工策略等参数。
3. **转人工**：用户在对话中说"转人工"/"人工客服"等意图词时，自动转入人工队列。
4. **IVR 融合**：AI 无法解决时，可降级到按键式 IVR 菜单导航。
5. **排队**：人工坐席全部忙线时，用户进入排队等待并播报排队状态。
6. **留言**：非工作时间／坐席不在线／振铃超时，自动引导用户留言。

一句话：以 9205 为样板，收敛出一条“通用热线能力 + AI 智能入口增强”的正式电话接待链路。

## 2. 现状分析

### 2.1 9205 当前架构

```text
用户拨打 9205
  → FreeSWITCH dialplan (92-ai-bot.xml)
  → HTTAPI 回调 → HttapiController
  → voice_agent=true 分支
  → VoiceAgentHttpClient → /visitor/api/v1/call/voice-agent/turn
  → QwenRealtimeVoiceAgentService.chat()
     ├─ 下载录音文件 → PCM 16k
     ├─ Qwen-Audio-Realtime ASR → 转写文本
     ├─ Qwen-Audio-Realtime LLM → 回复文本
     ├─ TTS (CosyVoice) → 音频 URL
     └─ 返回 {transcript, replyText, replyAudioUrl}
  → FreeSWITCH playback 播报回复音频
  → 循环：record → HTTAPI → playback → record ...
```

**核心局限**：

- 无知识库检索，LLM 回答不包含组织私有知识。
- 不支持转人工、排队、留言。
- 无 callAdmin 管理后台配置界面。
- 配置散落在 FreeSWITCH XML dialplan 和 HttapiController 代码中。

### 2.2 已有可复用能力

| 能力 | 位置 | 复用方式 |
| ------ | ------ | ---------- |
| 知识库检索 | `FaqElasticService.searchFaq()` | 在语音对话流程中先查知识库，命中则直接播报 |
| IVR 工作流 | `IvrMenuHttapiController` + `WorkflowInitData` | 复用通用热线 workflow 节点和默认 schema |
| ACD 排队 | `AcdService.enqueue()` | 转人工时调用 ACD 入队 |
| 热线留言 | `HotlineLeaveMessageService` + `VoicemailEntity` | 复用现有热线留言落库逻辑，继续写入 `VoicemailEntity` |
| 热线决策 | `HotlineHandoffDecisionService` | 复用现有服务时间/坐席状态判断逻辑 |
| 管理后台 | `frontend/apps/callAdmin/` | 新增 9205 设置页面 |

### 2.3 9205 作为统一示例的特殊性

本次不再把“通用热线规划”和“9205 规划”拆成两份并行文档，而是直接在同一份文档中表达：通用热线能力是底座，9205 是首个 AI 优先入口示例。9205 相对普通热线的特殊性在于：

- **AI 优先**：默认进入 AI 语音对话，而不是按键 IVR 菜单。
- **知识库驱动**：AI 回答优先检索组织知识库。
- **智能路由**：用户说"转人工"时自动切换，不需要按键。
- **降级 IVR**：AI 无法处理时，可降级到按键式 IVR。

因此，文档中凡是“通用热线能力”部分，后续其他号码也可复用；凡是“9205 示例专属”部分，仅在 AI 优先入口场景下启用。

### 2.4 首期实施边界

本规划首期只覆盖 **9205 的 HTTAPI 回合制链路**，不同时改造实时媒体桥链路：

1. 首期能力生效路径：`92-ai-bot.xml` 中 9205 的 `record -> httapi -> playback -> loop` 回合制流程。
2. 首期不覆盖路径：`mod_audio_stream + QwenRealtimeMediaWebSocketHandler` 实时媒体桥模式。
3. 部署要求：首期上线时，9205 应保持或切换为回合制模式，避免出现“后台已配置但实时媒体桥未生效”的双轨行为。
4. 后续若需要同时支持实时媒体桥，应单独增加第二阶段规划，把 `ExtensionSettings` 同步接入实时媒体桥的 `model / voice / instructions / handoff` 逻辑。

同时需要明确，首期提到的 `human_handoff / leave_message / keyboard` 仅表示**复用热线 workflow 的节点语义与已有服务能力**，并不表示 9205 会在首期直接切换为 `IvrMenuHttapiController` 驱动的 workflow 运行时：

1. 首期主控运行时仍然是 9205 当前的 `HttapiController + QwenRealtimeVoiceAgentService` 回合制链路。
2. 首期“转人工/留言/按键降级”是从 9205 回合制链路中按需调用现有热线能力，而不是把整通电话移交给通用 IVR workflow 引擎。
3. 只有在后续明确要把 9205 统一收敛进标准 IVR workflow 时，才单独规划“9205 切换到 IvrMenu runtime”的迁移步骤。

## 3. 目标架构

```text
用户拨打 9205
  → CallRoute 命中 9205
  → 加载 9205 配置（ExtensionSettings）
  → AI 语音对话循环：
      │
      ├─ 1. TTS 播报欢迎语（可配置）
      ├─ 2. 录音 → ASR 转写
      ├─ 3. 意图识别（转人工 / 查知识 / 普通对话）
      │      │
      │      ├─ [转人工意图] → HotlineHandoffDecisionService 决策
      │      │      ├─ 工作时间 + 坐席在线 → ACD 入队 → 振铃 → 接通
      │      │      ├─ 工作时间 + 坐席满员 → 排队等待
      │      │      ├─ 非工作时间 → 留言
      │      │      └─ 振铃超时 → 留言
      │      │
      │      ├─ [查知识意图] → 检索知识库 (FaqElasticService)
      │      │      ├─ 命中高置信度 → 播报 FAQ 答案
      │      │      └─ 低置信度 → 回退大模型
      │      │
      │      └─ [普通对话] → 大模型 + 知识库上下文增强
      │
      └─ 循环至用户挂断
```

### 3.1 通用热线能力抽象

不考虑 9205 的 AI 特性时，统一热线底座应抽象为：

```text
运营商/网关来电
  → CallRoute 命中入口号码
  → transfer 到 IVR 分机或 AI 入口分机
  → 进入 workflow / AI 对话主控运行时
  → 收集用户意图
  → 命中自助业务 / 机器人 / 转人工 / 留言 / 结束
  → 如需人工：HotlineHandoffDecisionService
    1. 是否工作时间
    2. 队列是否启用
    3. 是否存在在线且可接待坐席
    4. 当前是否满员
    5. 是否允许排队
  → 分支结果
    a. 入人工队列并振铃坐席
    b. 队列等待
    c. 非工作时间留言
    d. 振铃超时留言
    e. 忙线溢出留言
    f. 回退主菜单或机器人
```

9205 的差异仅在于“主控运行时”优先走 AI 回合制链路，而普通热线优先走 `IvrMenuHttapiController`。

## 4. 分阶段实施计划

### 4.0 实施原则

为了避免 9205 单独再长出一套平行实现，本次实施遵循以下原则：

1. **优先复用现有热线服务**：转人工决策复用 `HotlineHandoffDecisionService`，留言落库复用 `HotlineLeaveMessageService`。
2. **首期只改 9205 专属语音链路**：优先修改 `QwenRealtimeVoiceAgentService`，不把 9205 的知识库和转人工逻辑直接塞进所有通用 `VoiceAgentService` 场景。
3. **只在必要处修改通用入口**：`HttapiController` 仅负责装配 9205 配置并把参数传到下游，不承担过多 9205 专属业务状态。
4. **workflow 先复用语义、不直接切 runtime**：首期可参考热线 workflow 的节点定义和配置模型，但 9205 仍由当前回合制链路驱动执行。
5. **所有业务配置都放在应用层**：FreeSWITCH 只保留通用模板和原子动作，不承载任何业务特定配置。
6. **一份文档双层结构**：通用热线能力是平台层规则，9205 只是首个示例，不再维护第二份平行总规划。

## 5. 通用热线能力模型（以 9205 为示例映射）

本节是统一后的平台层规划，后续其他热线号码也应遵循同一模型。

### 5.1 模块边界

| 模块 | 职责 | 9205 映射 |
| ------ | ------ | ----------- |
| `enterprise/call` | 热线运行时主编排、热线决策、留言、队列适配 | 新增 `ExtensionSettings`，复用热线服务 |
| `modules/core` | workflow 节点类型、默认 schema、通用流程模型 | 继续作为 IVR/workflow 节点定义底座 |
| `modules/service` | 服务时间、通知、回呼、工单等联动能力 | 继续作为通用支撑服务 |
| `enterprise/ai` | ASR/TTS、机器人接待、意图识别、失败回退 | 9205 首期主要落在这里 |
| `deploy/freeswitch` | 通用 IVR / ACD / 留言模板与原子动作 | 9205 首期只改 `92-ai-bot.xml` 和必要模板接入 |

### 5.2 通用 workflow 节点

#### human_handoff

用途：统一执行“转人工前决策”。

必填字段：

1. `queueUid`
2. `timeConditionUid`

选填字段及默认值：

1. `allowQueue`：默认 `true`
2. `maxRingSeconds`：默认继承队列配置，否则回退系统默认 `30`
3. `offlineAction`：默认 `leave_message`
4. `overflowAction`：默认 `acd_enqueue`
5. `noAnswerAction`：默认 `leave_message`
6. `failPrompt`：默认系统提示语
7. `fallbackNodeId`：默认空

发布校验：

1. `queueUid`、`timeConditionUid` 必须属于当前 `orgUid`
2. `maxRingSeconds` 取值范围建议为 `5-120`
3. `offlineAction`、`overflowAction`、`noAnswerAction` 只能引用允许的节点类型：`acd_enqueue`、`leave_message`、`end`、`keyboard`
4. `fallbackNodeId` 若存在，必须在同一 workflow 且不能形成自循环

9205 映射：首期不直接运行该 workflow 节点，但 `ExtensionSettings.queueUid / timeConditionUid / ringTimeoutSeconds` 与它语义对齐，并最终组装为 `HotlineHandoffDecisionRequest`。

#### acd_enqueue

用途：显式把当前呼叫送入人工队列。

必填字段：

1. `queueUid`

选填字段及默认值：

1. `ringTimeoutSeconds`：默认继承队列配置
2. `queueTimeoutSeconds`：默认继承租户热线配置，否则回退系统默认 `300`
3. `mohUid` 或 `mohFile`：默认使用系统 MOH
4. `overflowNodeId`：默认空
5. `noAgentNodeId`：默认空

发布校验：

1. `queueUid` 必须存在且已发布
2. `ringTimeoutSeconds` 不能大于 `queueTimeoutSeconds`
3. `mohUid` 与 `mohFile` 二选一
4. `overflowNodeId` / `noAgentNodeId` 若配置，目标节点必须可达且不能跨 workflow

9205 映射：AI 转人工成功后，最终仍复用同一套 ACD 入队与排队行为。

#### leave_message

用途：进入电话留言流程。

必填字段：

1. `prompt`

选填字段及默认值：

1. `beepPrompt`：默认系统提示音
2. `maxRecordSeconds`：默认系统配置 `120`
3. `transcribe`：默认 `false`
4. `notifyTargetType`：默认 `QUEUE_ADMIN`
5. `notifyTargetValue`：默认空
6. `createTicket`：默认 `false`
7. `callbackRequired`：默认 `true`

发布校验：

1. `maxRecordSeconds` 取值范围建议为 `10-600`
2. `notifyTargetType=USER` 时 `notifyTargetValue` 必填
3. `createTicket=true` 时需校验工单能力或保留降级路径

9205 映射：`ExtensionSettings.voicemailPrompt / maxRecordSeconds / enableVoicemail` 与该节点语义保持一致。

#### voice_bot

用途：接入语音机器人或 AI 导航。

必填字段：

1. `agentUid` 或 `robotUid`

选填字段及默认值：

1. `maxTurns`：默认系统配置 `5`
2. `interruptible`：默认 `true`
3. `dtmfEscapeDigits`：默认 `0,*`
4. `handoffIntentNames`：默认包含“转人工、人工客服、人工”
5. `fallbackNodeId`：默认空
6. `returnToMenuNodeId`：默认 workflow 主菜单节点

发布校验：

1. `agentUid` 与 `robotUid` 至少填写一个
2. `maxTurns` 取值范围建议为 `1-20`
3. `returnToMenuNodeId` 必须指向 `keyboard` 或主菜单类节点

9205 映射：9205 首期不通过该 workflow 节点执行，而是直接由 `ExtensionSettings` + `QwenRealtimeVoiceAgentService` 驱动，但字段语义应尽量对齐。

#### business_http

用途：执行业务自助 HTTP 节点。

必填字段：

1. `requestTemplate`
2. `responseTemplate`

选填字段及默认值：

1. `failurePrompt`：默认系统失败提示
2. `continueToMenu`：默认 `true`
3. `nextNodeIdOnSuccess`：默认空
4. `nextNodeIdOnFailure`：默认空

发布校验：

1. HTTP 目标地址必须来自白名单或已登记服务域名
2. 模板变量只允许引用声明的上下文字段，如 `callerIdNumber`、`digits`、`orgUid`
3. `continueToMenu=true` 时 `nextNodeIdOnSuccess` 可为空，否则必须显式指定下一节点

### 5.3 数据模型与主对象复用

建议优先复用现有实体，不再开第二套平行对象：

1. IVR 执行轨迹继续落到 `IvrRecordEntity`
2. 电话留言继续扩展 `VoicemailEntity`
3. 队列配置优先复用 `CallQueue`
4. 时间策略优先复用 `TimeCondition`

`VoicemailEntity` 建议继续补充以下热线字段：

1. `orgUid`
2. `callUuid`
3. `callerIdNumber`
4. `destinationNumber`
5. `didNumber`
6. `ivrMenuUid`
7. `workflowUid`
8. `queueUid`
9. `leaveReason`
10. `recordingUrl` 或 `filePath`
11. `transcriptionText`
12. `callbackStatus`
13. `callbackAgentUid`
14. `relatedIvrRecordUid`
15. `handledAt`

### 5.4 管理后台最小配置面

首批必须上线：

1. CallRoute 入口绑定：`didNumber`、`orgUid`、`ivrMenuUid`、发布状态
2. IVR 菜单基础配置：`name`、`extensionNumber`、`workflowUid`、默认语言、默认异常兜底提示
3. Workflow Builder：支持 `human_handoff`、`acd_enqueue`、`leave_message`、`business_http` 字段编辑、草稿保存、发布前校验
4. 队列基础配置：`queueUid`、名称、最大等待秒数、振铃超时秒数、是否允许排队、满员兜底动作
5. 热线留言管理：主叫号码、留言时间、关联队列、留言原因、录音播放、回呼状态

后续增强：

1. 多语言播报资源管理
2. 机器人配置面板与提示词版本管理
3. 统计报表与实时大屏

### 5.5 配置发布、回滚与覆盖规则

建议新增或复用以下状态：

1. `DRAFT`
2. `PUBLISHED`
3. `DISABLED`
4. `ARCHIVED`

适用对象：

1. CallRoute
2. IvrMenu
3. Workflow schema
4. TimeCondition
5. CallQueue / ACD 策略
6. 通用 Dialplan 模板

发布前阻断校验：

1. CallRoute → IvrMenu → Workflow 的引用链必须完整且同租户
2. Workflow 必须存在唯一入口节点，且所有可达节点都能到达显式结束、留言或转人工分支
3. `human_handoff` 必须能解析到有效 `queueUid` 与 `timeConditionUid`
4. `acd_enqueue` 指向的队列必须处于已发布状态
5. `leave_message` 若启用录音保存，必须校验录音路径或对象存储配置存在
6. 任意跨租户引用一律阻断发布
7. 若存在循环节点，必须标识为允许循环，否则阻断

配置解析顺序固定为：

1. 节点显式配置
2. IVR 菜单级默认配置
3. 租户级热线配置
4. 系统级 `application properties` 默认值

### 5.6 FreeSWITCH 侧最少化原则

FreeSWITCH 侧不新增任何业务相关 dialplan 文件。所有热线逻辑由 Java 侧通过 HTTAPI / XML Curl 动态决定。

通用模板建议统一由应用层初始化为 `DialplanEntity(CUSTOM_XML)`：

1. 通用 IVR 入口模板
2. 通用 ACD 调度模板，如 `acd_dispatcher`
3. 通用留言模板，如 `leave_msg_dispatcher`
4. 坐席分机通用桥接模板

明确不允许：

1. 按 DID 创建业务 dialplan 文件
2. 按 IVR/队列创建业务 dialplan 文件
3. 在 XML 中写死工作时间、坐席策略、留言分支逻辑
4. 在 XML 中写死 TTS/ASR profile

9205 映射：首期仍保留 `92-ai-bot.xml`，但只允许它承载 9205 这个过渡期 AI 入口所需的最小回合制编排；长期目标仍是向“应用层配置 + 通用模板”收敛。

## 6. 9205 示例专属实施计划

### 阶段 1：后台配置能力（ExtensionSettingsEntity）

**目标**：让 9205 的参数可在 callAdmin 后台编辑，不再硬编码。

**新增实体**：`ExtensionSettingsEntity`（在 `enterprise/call` 模块）

| 字段 | 类型 | 说明 |
| ------ | ------ | ------ |
| `botDid` | String | 号码（如 "9205"） |
| `welcomeText` | String | 欢迎语文本 |
| `welcomeAudioUrl` | String | 欢迎语音频 URL（可选，优先于文本 TTS） |
| `kbUid` | String | 绑定的知识库 UID |
| `systemPrompt` | String | 大模型系统提示词 |
| `realtimeModel` | String | 实时语音模型（默认 qwen-audio-3.0-realtime-plus） |
| `realtimeVoice` | String | 实时语音音色（默认 longanqian） |
| `ttsModel` | String | TTS 模型 |
| `ttsVoice` | String | TTS 音色 |
| `enableKbSearch` | boolean | 是否启用知识库检索 |
| `kbSearchThreshold` | double | 知识库命中阈值（默认 0.7） |
| `maxConversationTurns` | int | 最大对话轮数（默认 20） |
| `enableHumanHandoff` | boolean | 是否启用转人工 |
| `humanHandoffKeywords` | String | 转人工触发词（逗号分隔，默认"转人工,人工客服,人工"） |
| `queueUid` | String | 目标队列 UID |
| `timeConditionUid` | String | 绑定时间条件 |
| `offHourAction` | String | 非工作时间行为（LEAVE_MESSAGE / HANGUP / PLAY_NOTICE） |
| `overflowAction` | String | 满员行为（QUEUE / LEAVE_MESSAGE） |
| `ringTimeoutSeconds` | int | 振铃超时秒数 |
| `enableVoicemail` | boolean | 是否启用留言 |
| `voicemailPrompt` | String | 留言提示语 |
| `maxRecordSeconds` | int | 最大录音时长 |
| `enableDtmfMenu` | boolean | 是否启用 DTMF 按键菜单降级 |
| `dtmfEscapeDigit` | String | 按键菜单转义键（如 "*"） |

**新增文件**：

- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsEntity.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRepository.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRequest.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsResponse.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRestController.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRestService.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsInitializer.java`（初始化默认 9205 配置）
- `starter/src/main/resources/db/liquibase/changelog/260717_add_ai_bot_settings.xml`

**前端新增**：

- `frontend/apps/callAdmin/src/pages/ExtensionSettings/` 管理页面
- 路由注册与菜单入口

### 阶段 2：知识库检索集成

**目标**：AI 语音对话时，先查知识库再回答。

**修改 `modules/call` 中的 `HttapiController`**：

```text
secondTurnVoiceAgent():
  现有流程: ASR 转写 → LLM 对话 → TTS 播报
  新流程:   ASR 转写
            → 意图识别（是否为查知识类问题）
            → 如果 kbSearchEnabled：
                → FaqElasticService.searchFaq(transcript, kbUid, orgUid, 3)
                → 如果 topResult.score >= kbSearchThreshold：
                    → 直接播报 FAQ 答案（TTS 合成）
                → 否则：
                    → 将 top FAQ 作为上下文注入 LLM prompt
                    → LLM 综合知识库 + 自身知识回答
            → 如果不启用 kbSearch：
                → 现有 LLM 对话流程
```

**修改 `QwenRealtimeVoiceAgentService`，必要时最小化补充 `VoiceAgentHttpClient` 入参传递**：

- 新增 `searchKbaseAndAugment()` 方法
- 注入 `FaqElasticService` 依赖，用于 `9205 -> QwenRealtimeVoiceAgentService` 专属链路的知识库增强
- 非 9205 的通用 visitor 语音场景暂不改造，避免扩大影响面

### 阶段 3：转人工 / IVR / 排队 / 留言集成

**目标**：用户在 AI 对话中说"转人工"时，接通人工；无人时进入排队或留言。

#### 3.1 意图识别增强

在 `HttapiController.secondTurnVoiceAgent()` 中增加转人工意图检测，并调用现有热线决策服务：

```java
// 检测转人工意图
if (ExtensionSettings.isEnableHumanHandoff() && containsHumanHandoffIntent(transcript)) {
  // 不再继续 AI 对话，转而进入现有热线转人工决策
    return buildHumanHandoffResponse(xml, vars, request, ExtensionSettings);
}
```

#### 3.2 转人工决策流程

优先复用现有 `HotlineHandoffDecisionService`，不要新增平行的 `AiBotHandoffService`：

```text
HotlineHandoffDecisionService.decide():
  1. 查询 timeCondition → 判断是否工作时间
  2. 查询 CallQueue → 判断队列状态
  3. 查询 AcdAgentState → 判断坐席可用性
  4. 决策分支：
     ├─ 工作时间 + 在线可接待 → AcdService.enqueue() → transfer 到队列
     ├─ 工作时间 + 满员可排队 → AcdService.enqueue(allowQueue=true) → 播报排队提示
     ├─ 非工作时间/无坐席 → leave_message 节点 → 提示留言
     └─ 振铃超时无应答 → leave_message 节点 → 提示留言
```

  9205 只需要补一层适配，把 `ExtensionSettings` 中的 `queueUid / queueName / timeConditionUid / ringTimeoutSeconds / allowQueue` 组装成 `HotlineHandoffDecisionRequest` 即可。

**FreeSWITCH 侧变更**：

需要在 `92-ai-bot.xml` 中 9205 的 dialplan 增加 transfer 分支，使 `bot_continue=0` 且 `bot_handoff_target` 有值时，可以 transfer 到队列或留言分机。

#### 3.3 留言能力

- 优先复用现有 `HotlineLeaveMessageService.saveLeaveMessage()`，继续落库到 `VoicemailEntity`。
- 若 9205 场景仍缺字段，再补充 `VoicemailEntity` 字段，而不是单独新建 9205 留言对象。
- 留言录音完成后沿用现有热线留言保存逻辑，再补充通知 / 创建工单扩展点。

#### 3.4 DTMF 按键降级菜单（可选）

- 在 AI 对话中，用户按 `*` 键可以进入按键菜单。
- 按键菜单首期只复用现有 IVR Workflow 的菜单语义与提示词结构（`hotline-keyboard-main` 风格），不直接切换到通用 `IvrMenuHttapiController` 运行时。
- 在 `92-ai-bot.xml` 中通过 `bind_digit_action` 或 `barge` 实现。

### 阶段 4：管理后台前端

**目标**：在 callAdmin 后台提供 9205 的完整配置界面。

**前端页面**：`frontend/apps/callAdmin/src/pages/ExtensionSettings/`

- **基本设置**：号码、欢迎语、绑定知识库、最大轮数
- **AI 设置**：模型选择、音色选择、系统提示词编辑
- **知识库设置**：启用/禁用、命中阈值
- **转人工设置**：启用/禁用、触发词配置、目标队列、时间条件
- **留言设置**：启用/禁用、提示语、最大录音时长

## 7. 涉及模块

| 模块 | 变更范围 | 说明 |
| ------ | ---------- | ------ |
| `enterprise/call` | 新增 ExtensionSettingsEntity + 服务类 | 核心配置实体 |
| `enterprise/call` | 修改 QwenRealtimeVoiceAgentService | 9205 专属知识库增强与提示词装配 |
| `enterprise/call` | 复用 HotlineHandoffDecisionService / HotlineLeaveMessageService | 转人工、排队、留言复用现有热线能力 |
| `modules/call` | 修改 HttapiController / VoiceAgentHttpClient | 加载配置、透传参数、触发 9205 专属分支 |
| `modules/kbase` | 依赖注入 FaqElasticService | 提供知识库检索 API（已存在，无需改） |
| `deploy/freeswitch` | 修改 92-ai-bot.xml | 增加 transfer/留言分支支持 |
| `frontend/apps/callAdmin` | 新增 ExtensionSettings 配置页 | 后台管理界面 |
| `starter` | Liquibase changelog | 新增 ai_bot_settings 表 |

## 8. 数据流示例

### 6.1 AI 知识库对话

```text
用户说："你们公司地址在哪？"
  → ASR 转写："你们公司地址在哪？"
  → FaqElasticService.searchFaq("你们公司地址在哪？", kbUid=..., orgUid=...)
  → 命中 result: { question: "公司地址在哪", answer: "我们公司在北京市朝阳区...", score: 0.92 }
  → score >= 0.7，直接播报
  → TTS: "我们公司在北京市朝阳区..."
  → 用户听到回答
```

### 6.2 转人工

```text
用户说："转人工"
  → ASR 转写："转人工"
  → containsHumanHandoffIntent("转人工") → true
  → HotlineHandoffDecisionService.decide()
  → TimeCondition: 当前在工作时间内
  → CallAgentAvailability: 坐席 A 在线可接待
  → AcdService.enqueue(customerUuid, queueName="default")
  → HTTAPI 返回 <transfer>default_queue XML default</transfer>
  → FreeSWITCH transfer 到队列
  → 坐席 A 振铃 → 接听
```

### 6.3 留言

```text
用户说："转人工"
  → HotlineHandoffDecisionService.decide()
  → TimeCondition: 当前非工作时间（已过 18:00）
  → 决策：OFF_HOURS → LEAVE_MESSAGE
  → HTTAPI 返回：playback beep → record → save voicemail
  → TTS: "当前为非工作时间，请在滴声后留言，我们会尽快回复您。"
  → 开始录音...
  → 录音结束 → HotlineLeaveMessageService.saveLeaveMessage() → 保存 VoicemailEntity → 触发通知
```

## 9. 验收标准

首批交付至少满足以下可验证场景：

1. **知识库命中**：用户提问命中指定知识库 FAQ，高置信度时直接播报知识库答案，不走通用大模型回复。
2. **知识库未命中**：用户提问未命中 FAQ，系统回退到大模型回答，且回答可携带知识库候选上下文。
3. **转人工成功**：用户说“转人工”后，工作时间内存在可用坐席时，进入 ACD 并成功振铃人工。
4. **排队成功**：无可用坐席但允许排队时，用户进入队列并听到排队提示。
5. **留言成功**：非工作时间或无可用坐席且不允许排队时，用户可完成留言，后台能查到留言记录与录音。
6. **后台配置生效**：在 callAdmin 修改欢迎语、知识库、转人工关键词后，新呼入 9205 能读取到最新配置。
7. **回归边界清晰**：当 9205 仍使用实时媒体桥模式时，系统明确提示该模式尚未接入本次配置能力，或在部署时明确关闭该模式。

## 10. Liquibase 变更概要

```xml
<changeSet id="260717_add_ai_bot_settings" author="jackning">
    <createTable tableName="bytedesk_call_ai_bot_settings">
        <column name="id" type="bigint" autoIncrement="true">
            <constraints primaryKey="true" nullable="false"/>
        </column>
        <column name="uid" type="varchar(64)">
            <constraints nullable="false" unique="true"/>
        </column>
        <column name="bot_did" type="varchar(32)">
            <constraints nullable="false" unique="true"/>
        </column>
        <column name="welcome_text" type="varchar(512)"/>
        <column name="welcome_audio_url" type="varchar(1024)"/>
        <column name="kb_uid" type="varchar(64)"/>
        <column name="system_prompt" type="text"/>
        <column name="realtime_model" type="varchar(128)"/>
        <column name="realtime_voice" type="varchar(128)"/>
        <column name="tts_model" type="varchar(128)"/>
        <column name="tts_voice" type="varchar(128)"/>
        <column name="enable_kb_search" type="boolean" defaultValue="true"/>
        <column name="kb_search_threshold" type="double" defaultValue="0.7"/>
        <column name="max_conversation_turns" type="int" defaultValue="20"/>
        <column name="enable_human_handoff" type="boolean" defaultValue="true"/>
        <column name="human_handoff_keywords" type="varchar(512)" defaultValue="转人工,人工客服,人工"/>
        <column name="queue_uid" type="varchar(64)"/>
        <column name="time_condition_uid" type="varchar(64)"/>
        <column name="off_hour_action" type="varchar(32)" defaultValue="LEAVE_MESSAGE"/>
        <column name="overflow_action" type="varchar(32)" defaultValue="QUEUE"/>
        <column name="ring_timeout_seconds" type="int" defaultValue="20"/>
        <column name="enable_voicemail" type="boolean" defaultValue="true"/>
        <column name="voicemail_prompt" type="varchar(512)"/>
        <column name="max_record_seconds" type="int" defaultValue="60"/>
        <column name="enable_dtmf_menu" type="boolean" defaultValue="false"/>
        <column name="dtmf_escape_digit" type="varchar(8)" defaultValue="*"/>
        <!-- BaseEntity fields -->
        <column name="org_uid" type="varchar(64)"/>
        <column name="level" type="varchar(32)"/>
        <column name="platform" type="varchar(32)"/>
        <column name="created_at" type="datetime"/>
        <column name="updated_at" type="datetime"/>
        <column name="deleted" type="boolean" defaultValue="false"/>
    </createTable>
</changeSet>
```

## 11. 风险与注意事项

1. **知识库检索性能**：语音对话是实时交互，知识库检索（Elasticsearch）必须在 200ms 内完成。建议对搜索结果做本地缓存。
2. **转人工断点续接**：从 AI 对话转人工时，需要将对话上下文传递给坐席端（可在 `MessageEntity` 中增加 bot 对话摘要字段）。
3. **双链路一致性风险**：当前 9205 有实时媒体桥（mod_audio_stream）和 HTTAPI 回合制两套模式。首期只覆盖回合制，因此部署时必须明确选择回合制链路，避免后台配置与运行链路不一致。
4. **DTMF 按键检测**：在 AI 对话中检测 DTMF 按键需要 FreeSWITCH 的 `bind_digit_action`，可能在对话录音中产生干扰。建议先在回合间检测（每轮对话结束后短暂等待 DTMF 输入）。
5. **留言录音存储**：需确定存储方案（本地文件 / MinIO / 云存储），建议复用现有文件存储基础设施。

## 12. 通用热线首批范围与后续边界

首批统一范围：

1. 通用热线多级按键 IVR
2. `business_http` 自助节点
3. `human_handoff` 节点与 `HotlineHandoffDecisionService`
4. 工作时间判断
5. ACD 入队与排队等待
6. 电话留言落库与“热线留言管理”后台页面
7. 基础事件追踪与发布回滚模型
8. 9205 作为 AI 优先示例，接入知识库、大模型、转人工、留言、按键降级

首批暂不纳入：

1. 复杂多轮语音机器人
2. 实时媒体桥模式下的 9205 配置接入
3. last agent、最长等待优先、技能等级等高级分配策略
4. 全量统计报表与 BI 图表
5. TtsRealtime 前端侧改造

## 13. 首批实施任务清单

以下任务清单已压缩为 6 个适合直接开工的工作包。原则是每个工作包完成后都应能独立编译，并至少具备一个清晰的可验证结果。

### 13.1 工作包 A：9205 配置与热线数据底座 &nbsp; ✅ 已完成 (~95%)

> 状态：ExtensionSettings 全部 12 个文件已创建，Liquibase 已注册，VoicemailEntity 热线字段已补齐。仅缺 `package-info.java`（非阻塞）。

目标：先把 9205 配置对象和热线留言主对象补齐，为后续运行时改造提供稳定输入。

包含内容：

1. 新增 `ExtensionSettingsEntity`、Repository、Request/Response、RestService、RestController。
2. 增加 Liquibase `bytedesk_call_ai_bot_settings` 表。
3. 增加默认 9205 初始化数据。
4. 补齐 `VoicemailEntity` 的 `callUuid`、`didNumber`、`queueUid`、`leaveReason`、`callbackStatus` 等热线扩展字段。
5. 保持与现有 `HotlineLeaveMessageService` 兼容，不新建第二套留言对象。

完成标志：

1. 后端可通过 API 查询和保存 9205 配置。
2. 数据库启动后自动具备默认 9205 配置记录。
3. 留言记录可区分非工作时间、振铃超时、排队溢出等来源。

#### 13.1.1 文件级改动清单

基于当前仓库状态，工作包 A 不再是“全部新增”。其中 `Voicemail` 相关基础结构已经存在，`ExtensionSettings` 相关结构尚不存在。

预计新增文件：

1. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsEntity.java`
2. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRepository.java`
3. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRequest.java`
4. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsResponse.java`
5. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRestService.java`
6. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsRestController.java`
7. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsInitializer.java`
8. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/ExtensionSettingsPermissions.java`
9. `enterprise/call/src/main/java/com/bytedesk/call/ai_bot/package-info.java`
10. `starter/src/main/resources/db/changelog/migration/260717_add_ai_bot_settings.xml`

预计修改文件：

1. `starter/src/main/resources/db/changelog/master.xml`
  目的：注册 `260717_add_ai_bot_settings.xml` migration。
2. `enterprise/call/src/main/java/com/bytedesk/call/voicemail/VoicemailEntity.java`
  现状：`callUuid`、`didNumber`、`queueUid`、`leaveReason`、`callbackStatus` 等热线字段已存在。
  任务：核对是否还缺 `orgUid` 以外的热线必需字段，以及字段长度/类型是否满足 9205 留言场景。
3. `enterprise/call/src/main/java/com/bytedesk/call/voicemail/VoicemailRequest.java`
  现状：已同步大部分热线字段。
  任务：核对是否需要补充与 9205 留言落库相关的请求字段。
4. `enterprise/call/src/main/java/com/bytedesk/call/voicemail/VoicemailResponse.java`
  现状：已同步大部分热线字段。
  任务：核对后台查询留言时是否还缺展示字段。
5. `enterprise/call/src/main/java/com/bytedesk/call/voicemail/VoicemailRestService.java`
  现状：已处理大部分热线字段映射与 optimistic locking 合并。
  任务：核对创建/更新路径是否还需补热线默认值、回呼状态默认值或 9205 相关字段保护。
6. `enterprise/call/src/main/java/com/bytedesk/call/voicemail/VoicemailRestController.java`
  任务：一般不需要结构性改动，仅在后续若新增 9205 专用查询接口时再评估。
7. `enterprise/call/src/main/java/com/bytedesk/call/voicemail/VoicemailInitializer.java`
  任务：参考其权限初始化模式，为 `ExtensionSettingsInitializer` 提供实现样式。

建议实现顺序：

1. 先新增 `ai_bot` 包下实体、请求响应、Repository、Service、Controller、Initializer、Permissions。
2. 再增加 migration 文件并挂到 `master.xml`。
3. 最后回看 `Voicemail*` 一组文件，只做缺口补齐，不重构既有结构。

工作包 A 的本地判断结论：

1. `ExtensionSettings` 线是新增为主。
2. `Voicemail` 线是核对与补齐为主。
3. migration 实际目录是 `starter/src/main/resources/db/changelog/migration/`，不是旧草案里写的 `db/liquibase/changelog/`。

### 13.2 工作包 B：通用热线 workflow 与 Java 决策底座 &nbsp; ⚠️ 部分完成 (~60%)

> 状态：WorkflowNodeTypeEnum 五种节点类型已定义；HotlineHandoffDecisionService 已实现。IvrMenuHttapiController 增强、默认 workflow schema、字段校验规则待确认。

包含内容：

1. 在 `modules/core` 中补 `human_handoff`、`acd_enqueue`、`leave_message`、`voice_bot`、`business_http` 节点定义。
2. 增加默认热线 workflow schema。
3. 落地字段级校验规则。
4. 扩展 `IvrMenuHttapiController`，增加 `resolveHumanHandoffStep()`、`resolveAcdEnqueueStep()`、`resolveLeaveMessageStep()`，并增强 `resolveHttpStep()`。
5. 扩展 `HotlineHandoffDecisionService`，统一输出人工、排队、留言分支。
6. 按复杂度决定是否拆出 `CallAgentAvailabilityService`。
7. 扩展 `HotlineLeaveMessageService`，写入新增热线字段。

完成标志：

1. Workflow 模型可表达热线主流程。
2. 普通热线入口可通过 workflow 跑通“按键 → 自助 → 转人工/留言”链路。
3. Java 侧完成工作时间、队列、坐席、留言的完整闭环判断。

### 13.3 工作包 C：FreeSWITCH 通用模板与 9205 拨号计划改造 &nbsp; ⚠️ 部分完成 (~70%)

> 状态：9205 回合制 dialplan 已完成路由分支（CONTINUE / ACD_ENQUEUE / LEAVE_MESSAGE / HANGUP）和留言录制回调。通用模板（acd_dispatcher、leave_msg_dispatcher、通用 IVR 入口）初始化状态待确认。

包含内容：

1. 初始化或补齐通用 IVR 入口模板。
2. 初始化 `acd_dispatcher` 通用模板。
3. 初始化 `leave_msg_dispatcher` 通用模板。
4. 明确模板版本更新与重建策略。
5. 修改 `92-ai-bot.xml`，支持 handoff transfer、留言分支和必要通道变量传递。
6. 保持实时媒体桥模式不受本次改动影响。

完成标志：

1. 不依赖按 DID/队列命名的静态业务 XML。
2. XML Curl 能返回所需通用模板。
3. 9205 在回合制链路下能从 AI 对话切到人工或留言。

### 13.4 工作包 D：9205 AI 知识库与转人工主链路 &nbsp; ✅ 已完成 (~90%)

> 状态：QwenRealtimeVoiceAgentService 已完成 KB 检索、转人工决策、instructions 装配、handoff 路由返回。HttapiController 透传 voice_agent 参数。核心链路已打通。

包含内容：

1. 在 `HttapiController` 的 `secondTurnVoiceAgent()` 或等效入口加载 `ExtensionSettings`。
2. 透传 `kbUid`、知识库阈值、人工队列、留言配置等参数。
3. 保证非 9205 的通用 visitor 语音场景不受影响。
4. 在 `QwenRealtimeVoiceAgentService` 中新增知识库搜索与 prompt 增强逻辑。
5. 高置信度命中时直接返回 FAQ 答案；未命中时把候选 FAQ 注入大模型上下文。
6. 增加人工意图识别。
7. 组装 `HotlineHandoffDecisionRequest`。
8. 将决策结果映射为 transfer、排队提示或留言提示。
9. 必要时增加 DTMF 降级入口。

完成标志：

1. 9205 每轮语音请求都能读取最新后台配置。
2. 9205 提问命中 FAQ 与未命中回退两条路径都可稳定运行。
3. 9205 能在 AI 对话中说“转人工”并正确进入人工、排队或留言。

### 13.5 工作包 E：callAdmin 页面与发布阻断能力 &nbsp; ⚠️ 部分完成 (~92%)

> 状态：前端 CRUD 页面与最小发布入口（表格+抽屉+路由+权限+发布按钮）已完成；后端已补 `status/publishedVersion`、显式 `/publish` 入口、运行时只读 `PUBLISHED` 约束、最小引用阻断、Liquibase 字段迁移，以及“编辑已发布配置转入 DRAFT 副本、发布时归档旧线上态”的最小分离语义；组织查询也已聚合为当前工作副本视图，避免同 DID 同时展示多条状态记录。剩余缺口主要是更细粒度引用状态校验与版本管理。

包含内容：

1. 新增 ExtensionSettings 页面。
2. 支持基本设置、AI 设置、知识库设置、转人工设置、留言设置。
3. 支持保存、读取、基础表单校验。
4. 补齐 `DRAFT / PUBLISHED / DISABLED / ARCHIVED` 流程。进行中，后端最小 `DRAFT -> PUBLISHED` 已完成。
5. 在发布前执行节点、队列、时间条件、录音配置、跨租户引用校验。进行中，已完成 `kbUid` / `queueUid` / `timeConditionUid` 最小存在性与同租户阻断。
6. 保证运行时只读取 `PUBLISHED` 版本。

完成标志：

1. 后台可直接管理 9205 全部首批参数。
2. 后台不能把半成品配置直接发布到生产呼叫链路。

### 13.6 工作包 F：测试与端到端验证 &nbsp; ⚠️ 已开始 (~75%)

> 状态：已完成后端最小验证集。`enterprise/call` 已补 `ExtensionSettingsRestService`、`QwenRealtimeVoiceAgentService`、`IvrMenuHttapiController` 定向单测；`modules/call` 已补 `HttapiController` 的 9205 回合制路由映射单测；其中 `ExtensionSettingsRestService` 已新增发布成功、跨租户阻断、编辑已发布配置生成 DRAFT、发布归档旧线上态、timeCondition 启用态阻断和列表聚合优先 DRAFT 验证，`QwenRealtimeVoiceAgentService` 已新增“租户无已发布配置时回退默认组织 published 配置”验证；callAdmin 留言管理页也已接入热线扩展字段展示。真实拨测、排队与留言端到端场景仍待执行。

包含内容：

1. `ExtensionSettings` API 查询、默认 9205 配置创建、更新、已有配置复用、发布成功、跨租户阻断、编辑已发布配置生成 DRAFT、发布归档旧线上态、timeCondition 启用态阻断、列表聚合优先 DRAFT 验证。已完成。
2. `QwenRealtimeVoiceAgentService` 知识库命中 / 转人工留言分支 / 默认组织 published 配置回退验证。已完成。
3. `IvrMenuHttapiController` 通用 IVR 收号、转人工、转接、静态 voice_bot 验证。已完成。
4. `HttapiController` 对 9205 回合制 `ACD_ENQUEUE` / `LEAVE_MESSAGE` 路由变量映射验证。已完成。
5. 拨打 9205，验证欢迎语、知识库命中、普通大模型回复。待执行。
6. 验证“转人工”在工作时间可进入振铃。待执行。
7. 验证坐席满员进入排队。待执行。
8. 验证非工作时间进入留言。待执行。
9. 验证后台修改配置后新呼入生效。待执行。

完成标志：

1. 平台层和 9205 示例层都有可执行验证证据。
2. 至少完成一次真实 9205 呼入的排队或留言链路拨测。

建议实际执行顺序：

1. 工作包 A → 工作包 D
2. 工作包 B → 工作包 C
3. 工作包 E → 工作包 F

如果要进一步压到真正的首轮编码顺序，建议先只开 3 个并行面：

1. A：数据与配置对象
2. D：9205 AI 主链路
3. C：9205 回合制 dialplan 最小改造

## 14. 待确认事项

1. **知识库范围**：9205 查询知识库时，是查整个组织的知识库，还是可以单独指定某个知识库？→ 建议支持在 ExtensionSettings 中指定 kbUid。
2. **DTMF 菜单**：是否需要在 AI 对话中支持按键菜单降级？→ 建议作为阶段 4 可选能力，不阻塞知识库 + 转人工主链路。
3. **留言通知方式**：留言后如何通知管理员？→ 建议通过站内通知 + 服务号推送 + 可选项。
4. **与 TtsRealtime 的关系**：TODO 中还提到"修改 TtsRealtime 实时语音对话支持对接微语知识库"。9205 的改动是否同时覆盖 TtsRealtime？→ 建议本次专注于 9205 电话侧，TtsRealtime 前端侧作为后续独立需求。
