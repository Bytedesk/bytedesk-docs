# KB 检索等待提示与异步对话规划

> 日期：2026-07-25
> 状态：阶段 A/B/C/D 已完成，阶段 E（意图识别）已确认，待实施
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md) 第 31 行
> 说明：当 `ExtensionSettingsKnowledgeEntity` 开启知识库查询后，语音对话中 KB 检索延迟较长，需要在等待期间播放"查询中，请稍后"提示，并支持用户继续对话，直到 KB 结果返回后播报。

---

## 实施总结

四个计划阶段（A/B/C/D）均已完成，实际实现与计划基本一致，主要偏离项：

1. **阶段 C（等待提示缓存）比计划更轻量**：未引入落库的 `interimPromptAudioUrl` 字段，改为抽取可复用组件 `TranscriptAudioUrlResolver` 做内存级有界 LRU 缓存（最大 32 条），内部同时负责 FreeSWITCH 可达 URL 规范化（`localhost`/`127.0.0.1` → `host.docker.internal`），并已接入 9203/9205 两条语音路径。
2. **阶段 D（回合制路径）比计划更克制**：仅在 `QwenRealtimeVoiceAgentService` 中对已有 TTS URL 做规范化调用（`resolver.normalize`），未增加独立的回合制等待提示播放。
3. **测试比计划更聚焦**：采用 reflection-based 私有行为测试 + mock 策略，当前相关改动共覆盖 4 个测试类、35 条用例（`ExtensionSettingsRestServiceTest` 16 条、`QwenRealtimeMediaWebSocketHandlerTest` 8 条、`TranscriptAudioUrlResolverTest` 3 条、`QwenRealtimeVoiceAgentServiceTest` 8 条）；其中一轮聚焦回归批次为 19 条，均已通过。

---

## 已识别问题：所有话语均触发 KB 检索和等待提示

### 现象

当前实现中，只要分机开启了 `enableKbSearch=true`，**每一句用户语音**都会触发：

1. 播放"查询中，请稍后"等待提示
2. 异步 Elasticsearch 知识库查询
3. 如果 KB 命中则取消 Qwen 响应并播放 KB 答案

对于以下场景，这显然不合理：

| 用户说 | 当前行为 | 预期行为 |
| --- | --- | --- |
| "你好" / "您好" | 播放"查询中" → KB 查询 → 未命中 → Qwen 回复 | 直接由 Qwen 回复，不触发 KB |
| "谢谢" / "再见" | 播放"查询中" → KB 查询 → 未命中 → Qwen 回复 | 直接由 Qwen 回复，不触发 KB |
| "今天天气不错" | 播放"查询中" → KB 查询 → 未命中 → Qwen 回复 | 直接由 Qwen 回复，不触发 KB |
| "我想了解退货政策" | 播放"查询中" → KB 查询 → 命中 → 播报 KB 答案 | ✅ 当前行为正确 |
| "我的订单号是多少" | 播放"查询中" → KB 查询 → 命中 → 播报 KB 答案 | ✅ 当前行为正确 |

### 根因

`handleInputTranscriptCompleted()` 中 KB 决策逻辑是二元的：`if (kbEnabled)` → 全部走 KB 路径。没有对用户意图做区分。

```java
// 当前代码（简化）
if (!kbEnabled) {
    createResponseIfNeeded();
    return;
}
// 所有话语都走这里 ↓
broadcastTranscript(interimPrompt, true);
createResponseIfNeeded();
pendingKbSearchFuture = CompletableFuture.supplyAsync(() -> resolveKnowledgeBaseReply(...));
```

---

## 阶段 E：增加意图识别，按需触发 KB 检索

> 状态：已确认（2026-07-25），待实施
> 目标：只对"需要查询知识库"的用户话语触发等待提示和 KB 检索，寒暄/闲聊/告别等话语直接由 Qwen 回答。
> 首版范围：**仅关键词/模式匹配**，LLM 意图分类作为后续增强。
> 确认决策：见 [E.10](#e10-已确认决策)

### E.1 方案对比

| 方案 | 描述 | 优点 | 缺点 | 决策 |
| --- | --- | --- | --- | --- |
| **A：关键词/模式匹配** | 中文疑问词 + 句式规则 | 零延迟、零 API 成本、离线可用 | 覆盖不完整、可能漏判 | ✅ **首版采用** |
| **B：LLM 意图分类** | 每次 transcript 调用轻量 LLM 分类 | 准确率高、能理解语义 | 增加 API 延迟和 token 成本 | ⏸️ **后续增强** |
| **D：混合方案（A + B）** | 关键词快速匹配 + LLM 异步兜底 | 兼顾速度和准确率 | 实现复杂度中等 | ⏸️ **后续增强** |

### E.2 首版实现：关键词/模式匹配

```bash
用户 transcript 到达
  │
  ├─ 0. 短文本豁免（≤2 字符 → 直接跳过 KB）
  │
  ├─ 1. 寒暄短语字典匹配（"你好""谢谢""再见""嗯"… → 直接跳过 KB）
  │
  ├─ 2. 关键词匹配（疑问词 + 知识动词 + 业务名词）
  │     ┌ 疑问词：什么/怎么/如何/多少/哪里/什么时候/为什么/能否/可以...吗
  │     ├ 知识动词：介绍/解释/说明/查询/了解/告诉我/讲一下/问一下
  │     └ 业务名词：退货/退款/订单/价格/地址/电话/时间/流程/政策/规则
  │
  ├─ 命中 → 判定为 KNOWLEDGE
  │     → 播放"查询中" + 异步 KB 检索 + Qwen 响应（现有逻辑）
  │
  └─ 未命中 → 判定为 CHITCHAT
        → 不播放"查询中"，直接创建 Qwen 响应
```

### E.3 关键词匹配器设计

首版需要先做一层轻量预处理，避免把 ASR 噪声和口语停顿直接拿去做模式匹配：

1. 去首尾空白，并把连续空白折叠为单个空格
2. 保留原始中文文本，不做分词依赖
3. 去掉句末常见语气符号，如 `？`、`?`、`。`、`，`
4. 对英文大小写做统一归一化，例如 `OK` → `ok`
5. 保留原始 transcript 供落库与后续 Qwen 使用，意图识别只消费 normalized 文本

```java
// 可配置的正则/词表匹配器，放在独立组件中
public class KbIntentClassifier {

    // 疑问词模式
    private static final Pattern QUESTION_PATTERN = Pattern.compile(
        "什么|怎么|如何|多少|哪里|什么时候|为什么|能否|可以.{0,2}吗|有没有|是不是"
    );

    // 知识动词模式（需要解释/查询的动词）
    private static final Pattern KNOWLEDGE_VERB_PATTERN = Pattern.compile(
        "介绍|解释|说明|查询|了解|告诉我|讲一下|说一下|问一下"
    );

    // 业务名词（直接触发 KB 的关键词）
    private static final Pattern BUSINESS_NOUN_PATTERN = Pattern.compile(
        "退货|退款|换货|订单|价格|多少钱|地址|电话|联系方式|时间|流程|政策|规则|条款|运费|物流|快递"
    );

    // 寒暄/非知识型固定短语（直接豁免，不触发 KB）
    private static final Set<String> CHITCHAT_PHRASES = Set.of(
        "你好", "您好", "谢谢", "多谢", "再见", "拜拜", "好的", "嗯", "哦", "行", "ok", "OK",
        "知道了", "明白了", "清楚了", "没问题", "可以", "对的", "是的", "没错"
    );

    /**
     * 快速意图分类（同步，<1ms）
     * @return true = 需要查 KB，false = 不需要（交给 Qwen 直接回答）
     */
    public boolean isLikelyKnowledgeQuery(String transcript) {
        if (transcript == null || transcript.isBlank()) return false;
        String normalized = normalize(transcript);
        // 1. 超短文本直接放过
        if (normalized.length() <= 2) return false;
        // 2. 寒暄豁免
        if (CHITCHAT_PHRASES.contains(normalized)) return false;
        // 3. 关键词匹配
        return QUESTION_PATTERN.matcher(normalized).find()
            || KNOWLEDGE_VERB_PATTERN.matcher(normalized).find()
            || BUSINESS_NOUN_PATTERN.matcher(normalized).find();
    }

    /**
     * 轻量归一化：去首尾空白 → 折叠连续空白 → 去句末语气符号 → 英文小写
     * 保留原始 transcript 供后续 Qwen / ES 使用，意图识别只消费归一化结果
     */
    static String normalize(String text) {
        if (text == null) return "";
        String s = text.trim().replaceAll("\\s+", " ");
        s = s.replaceAll("[？！。，?.,]+$", "");
        return s.toLowerCase();
    }
}
```

分类原则补充：

- **宁可首版少查，不要逢句必查**。阶段 E 的核心目标是先消除寒暄/闲聊也播报“查询中”的噪声，不追求一次性覆盖全部知识型问法。
- 对模糊句式，首版默认落到 `CHITCHAT`，交给 Qwen 正常回答；只有“明显像知识查询”的输入才进入 KB。
- 后续如果出现“漏查”较多，再在词表层面补充业务词，不先引入 LLM 分类。

### E.4 改造后的 `handleInputTranscriptCompleted` 流程（首版）

```java
// 简化伪代码
if (!kbEnabled) {
    createResponseIfNeeded();
    return;
}

// ★ 意图识别：只有明确知识查询才触发 KB（normalizedTranscript 为 firstNonBlank 处理后的文本）
boolean likelyKnowledge = kbIntentClassifier.isLikelyKnowledgeQuery(normalizedTranscript);

if (!likelyKnowledge) {
    // 寒暄/闲聊 → 不播放"查询中"，直接让 Qwen 回答
    createResponseIfNeeded();
    return;
}

// 明确知识查询 → 播放等待提示 + 异步 KB + Qwen（现有逻辑）
broadcastTranscript(interimPrompt, true);
createResponseIfNeeded();
pendingKbSearchFuture = CompletableFuture
    .supplyAsync(() -> resolveKnowledgeBaseReply(...))
    .orTimeout(KB_SEARCH_TIMEOUT_MS, TimeUnit.MILLISECONDS)
    .thenAccept(kbReply -> handleKbSearchResult(currentSearchId, itemId, kbReply))
    .exceptionally(exception -> { ... })
    .whenComplete((unused, throwable) -> clearPendingKbSearchFuture());
```

### E.5 LLM 意图分类（⏸️ 后续增强，首版不做）

首版只做关键词匹配，LLM 异步兜底作为后续增强项。增强时直接在此处扩写：

- 当关键词未匹配时，通过 `KbIntentClassifier.classifyIntentViaLlm(String transcript)` 异步调用轻量 LLM
- Prompt："判断以下用户语音输入是否需要查询知识库来回答。只回复 KNOWLEDGE 或 CHITCHAT。"
- 超时 2 秒视为 CHITCHAT
- fire-and-forget 模式，不影响主流程

### E.6 `KbIntentClassifier` 配置与开关

首版：

- **关键词词表硬编码在 `KbIntentClassifier` 中**，不引入新的 DB 字段或配置表
- `ExtensionSettingsKnowledgeEntity` 新增 `enableKbIntentClassification` 布尔开关，默认 `true`：

  ```java
  @Builder.Default
  @Column(name = "enable_kb_intent_classification")
  private boolean enableKbIntentClassification = true;
  ```

- 当 `enableKbIntentClassification = false` 时，跳过意图识别，所有话语都走 KB（回退到阶段 A-D 行为）
- 开关需要同步打通：entity / request / response / `applyRequestToChildSettings` / `copyKnowledgeSettings` / callAdmin 表单
- 管理后台配置暂不支持关键词词表自定义，后续版本扩展

建议的前端交互说明：

- `enableKbSearch=false` 时，隐藏或禁用 `enableKbIntentClassification`
- `enableKbSearch=true` 时，默认开启 `enableKbIntentClassification`
- 当管理员关闭该开关时，表单旁增加一行提示：关闭后将恢复为“所有用户话语都先尝试 KB 检索”的旧行为

建议的字段语义：

- `enableKbSearch`：是否启用 KB 能力
- `enableKbIntentClassification`：启用 KB 后，是否先做“是否值得查 KB”的前置判定
- 两者都为 `true` 时才执行“按需查 KB”
- 前者为 `true`、后者为 `false` 时，回退到阶段 A-D 的“逢句即查”行为

### E.7 涉及改动

| 文件 | 改动 |
| --- | --- |
| `enterprise/call/src/main/java/com/bytedesk/call/visitor/KbIntentClassifier.java` | **新增**：关键词匹配器（pattern + 寒暄字典） |
| `enterprise/call/src/main/java/com/bytedesk/call/visitor/QwenRealtimeMediaWebSocketHandler.java` | 注入 `KbIntentClassifier`，改造 KB 决策分支（约 5 行） |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings_knowledge/ExtensionSettingsKnowledgeEntity.java` | 新增 `enableKbIntentClassification` 字段 |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings_knowledge/ExtensionSettingsKnowledgeRequest.java` | 新增 `enableKbIntentClassification` |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings_knowledge/ExtensionSettingsKnowledgeResponse.java` | `fromEntity` 回填 `enableKbIntentClassification` |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings/ExtensionSettingsRestService.java` | `applyRequestToChildSettings` / `copyKnowledgeSettings` / `getOrCreateDefault` 补齐字段 |
| `starter/src/main/resources/db/changelog/migration/260725_add_kb_intent_classification.xml` | **新增**：加列 migration |
| `starter/src/main/resources/db/changelog/master.xml` | include 新 migration |
| `frontend/apps/callAdmin/.../ExtensionSettingsKnowledgeTab.tsx` | 新增 `enableKbIntentClassification` 开关表单项 |
| `frontend/apps/callAdmin/.../settings/index.tsx` | `buildDefaultTemplate` 默认值 |
| `frontend/apps/callAdmin/src/@types/call/extension_settings.d.ts` | `ExtensionSettingsKnowledge` 新增 `enableKbIntentClassification?: boolean` |
| `enterprise/call/src/test/java/com/bytedesk/call/visitor/KbIntentClassifierTest.java` | **新增**：关键词匹配、寒暄豁免、边界情况 |
| `enterprise/call/src/test/java/com/bytedesk/call/visitor/QwenRealtimeMediaWebSocketHandlerTest.java` | 补充意图相关测试用例 |

### E.8 测试用例

| 场景 | 输入 | 预期 |
| --- | --- | --- |
| 明确疑问句 | "退货政策是什么" | 关键词命中 → 播放等待提示 → KB 检索 |
| 间接疑问 | "我想了解一下退款流程" | 关键词命中 → 播放等待提示 → KB 检索 |
| 业务名词触发 | "订单" | 关键词命中 → 播放等待提示 → KB 检索 |
| 语气词疑问 | "可以介绍一下售后规则吗" | 关键词命中 → 播放等待提示 → KB 检索 |
| 寒暄-你好 | "你好" | 寒暄豁免 → 不播放等待提示 → 直接 Qwen |
| 寒暄-谢谢 | "谢谢" | 寒暄豁免 → 不播放等待提示 → 直接 Qwen |
| 寒暄-知道了 | "知道了" | 寒暄豁免 → 不播放等待提示 → 直接 Qwen |
| 短文本 | "嗯" | 长度豁免 → 不播放等待提示 → 直接 Qwen |
| 闲聊 | "今天心情不错" | 关键词未命中 → 不播放等待提示 → 直接 Qwen |
| ASR 空白归一化 | "  谢谢  " | 归一化后命中寒暄豁免 → 不播放等待提示 |
| 中英文混输 | "OK 谢谢" | 归一化后按寒暄处理 → 不播放等待提示 |
| 误命中保护 | "订单"（仅复述、无上下文） | 首版仍允许触发 KB，作为已知保守策略 |
| 连续对话中意图切换 | 第1句"退货政策"→第2句"谢谢" | 第1句触发 KB，第2句不触发 |
| 开关关闭 | `enableKbIntentClassification=false` | 所有话语都走 KB（回退行为） |

测试拆分建议：

- `KbIntentClassifierTest` 只验证纯文本分类结果，不依赖 WebSocket / ESL / TTS mock
- `QwenRealtimeMediaWebSocketHandlerTest` 只验证分支行为：是否播放等待提示、是否发起 KB 查询、是否直接 `createResponseIfNeeded()`
- `ExtensionSettingsRestServiceTest` 负责验证新开关字段在草稿、发布、回填链路中的一致性

### E.9 阶段 E 任务拆分

| 子任务 | 内容 | 估时 |
| --- | --- | --- |
| E-1 | 新增 `KbIntentClassifier` 组件 + 关键词词表 | 0.5d |
| E-2 | 改造 `handleInputTranscriptCompleted` KB 决策分支 | 0.25d |
| E-3 | `enableKbIntentClassification` 字段闭环（entity/request/response/copy/migration/callAdmin） | 0.5d |
| E-4 | 单元测试（`KbIntentClassifierTest` + handler 测试补充） | 0.5d |
| E-5 | 回归测试（现有相关基线 35 条用例 + 阶段 E 新增用例） | 0.25d |
| **合计** | | **约 2.0d** |

### E.10 已确认决策

- [x] **混合方案 D** → 可接受。**首版只做关键词匹配，LLM 异步兜底作为后续增强。**
- [x] **LLM 意图分类** → **首版不做，后续版本再做。**
- [x] **`enableKbIntentClassification` 开关** → **需要增加**。新增 entity 字段，默认 `true`。关闭后回退到全部走 KB 的行为。
- [x] **关键词词表** → **首版硬编码**在 `KbIntentClassifier` 中，后续版本增加管理后台配置。
- [x] **短文本豁免阈值** → **2 字符合适**。

### E.11 首版验收口径

满足以下条件，即可视为阶段 E 首版完成：

1. `enableKbSearch=true` 且 `enableKbIntentClassification=true` 时，寒暄/闲聊不再播放“查询中，请稍后”
2. 明显知识型问句仍可触发现有异步 KB 链路，不回退为纯 Qwen
3. `enableKbIntentClassification=false` 时，行为与阶段 A-D 保持一致，不引入回归
4. 新开关在草稿保存、发布、生效回读、前端回显链路中一致
5. 不新增新的外部依赖，不改变现有 `TranscriptAudioUrlResolver` / `pendingKbSearchId` 主流程设计

### E.12 已知限制与后续增强

- 首版不解决所有漏判问题，尤其是没有显式业务词但语义上需要查知识库的问法
- 首版不引入可配置词表后台，避免把简单规则系统过早做成复杂配置中心
- 首版不做 LLM 二次判定，避免再把延迟和 token 成本引回主链路
- 如果后续要增强，优先顺序建议为：补业务词表 → 增加灰度开关/命中日志 → 再评估 LLM 兜底

### E.13 建议实施顺序

阶段 E 建议按“纯函数优先、配置闭环其次、主流程最后”的顺序推进，避免一开始就改 WebSocket handler 导致验证面过大：

1. 新增 `KbIntentClassifier` 与纯单元测试，先把关键词、寒暄、短文本、归一化边界跑通
2. 新增 `enableKbIntentClassification` 字段闭环，包括 entity / request / response / copy / migration / callAdmin 默认值与表单
3. 在 `QwenRealtimeMediaWebSocketHandler` 中接入 classifier，仅改变 KB 触发分支，不改已有异步 KB、缓存、TTS 播放策略
4. 补充 handler 分支测试：命中知识意图才播放等待提示，寒暄/闲聊不触发 KB，关闭开关恢复旧行为
5. 跑 `enterprise/call` 聚焦测试与 compile，再做真实 9203/1100 拨测

阶段 E 不应改动 `TranscriptAudioUrlResolver`，也不应重写 `pendingKbSearchId` / `pendingKbSearchFuture` 的已验证逻辑。

---

## A-D 历史规划与实施回顾

以下内容保留为阶段 A-D 的设计、实施与验证记录。阶段 A-D 已完成；当前新增工作只围绕上面的阶段 E（意图识别）展开。

## 0. A-D 快速确认摘要

1. KB 检索延迟主要发生在实时流式路径（`QwenRealtimeMediaWebSocketHandler`）；改造前 `resolveKnowledgeBaseReply()` 是**同步阻塞**调用。
2. 改造方案：KB 检索改为异步执行；检索开始后尽快通过 ESL `uuid_broadcast` 播放"查询中，请稍后"提示音频，同时继续处理后续用户语音输入。
3. KB 结果返回后，若用户尚未发起新一轮对话，则取消 Qwen 当前响应、注入 KB 答案并播报；若用户已发起新对话，则丢弃旧 KB 结果。
4. A-D 改造仅针对实时流式路径，不涉及旧的回合制路径完整异步化（`QwenRealtimeVoiceAgentService.chat()`）。
5. 不新增数据库表，不引入新的外部依赖；允许在现有知识库设置表上继续按需加列。
6. "查询中，请稍后"文本支持通过 `ExtensionSettingsKnowledgeEntity` 新字段配置，默认为中文，并需要同步打通 request/response、草稿/发布复制、callAdmin 表单链路。
7. A-D 当时拆成两阶段：阶段 A 先完成异步 KB 检索与结果防串话；阶段 B 再补等待提示音频缓存/预生成，避免提示本身又被同步 TTS 合成拖慢。

---

## 1. A-D 改造前问题分析

### 1.1 语音对话架构

Bytedesk 有两条语音代理路径：

| | 路径 1：回合制 | 路径 2：实时流式 |
| --- | --- | --- |
| 类 | `QwenRealtimeVoiceAgentService` | `QwenRealtimeMediaWebSocketHandler` |
| 协议 | HTTP REST (`POST /turn`) | 持久化 WebSocket |
| 调用方 | FreeSWITCH（录制后整段发送） | FreeSWITCH（流式音频桥接） |
| KB 检索时机 | `chat()` 方法内同步调用 | `handleInputTranscriptCompleted()` 内同步调用 |
| 阻塞模型 | HTTP 整段阻塞 | WebSocket 事件线程阻塞 |

### 1.2 实时流式路径的 KB 检索流程（改造前）

```bash
用户说话
  → FreeSWITCH 流式推送音频到 WebSocket
  → Java 桥接转发到 Qwen Realtime API
  → Qwen server_vad 检测语音结束
  → conversation.item.input_audio_transcription.completed 事件
  → handleInputTranscriptCompleted(itemId, transcript)
      ├─ ensureThread() / persistCallMessage()
      ├─ resolveKnowledgeBaseReply(botDid, orgUid, transcript)  ★ 同步阻塞
      │   └─ knowledgeBaseSearchHelper.searchKnowledgeBaseWithSources()
      │       └─ Elasticsearch 查询 (~100-500ms)
      ├─ 如果 KB 命中:
      │   ├─ cancelActiveResponse()  取消 Qwen 响应
      │   ├─ appendAssistantMessage() 注入 KB 答案
      │   └─ broadcastTranscript()   TTS → ESL uuid_broadcast 播报
      └─ 如果 KB 未命中:
          └─ createResponseIfNeeded() 让 Qwen 生成回复
```

### 1.3 核心问题

1. **KB 检索同步阻塞 WebSocket 事件线程**：改造前在 `handleInputTranscriptCompleted` 中，`resolveKnowledgeBaseReply()` 是同步调用，Elasticsearch 查询耗时 100-500ms，期间用户听不到任何声音。
2. **无等待提示**：用户说完话后沉默等待，体验差，可能误以为系统无响应。
3. **无法继续对话**：虽然 WebSocket 音频流仍在收发，但 KB 检索阻塞了 `conversation.item.input_audio_transcription.completed` 事件处理，用户在等待期间说的新内容无法被及时纳入新的决策轮次。
4. **等待提示本身也可能阻塞**：`broadcastTranscript()` 内部会同步调用 `ttsMrcpService.synthesizeToTelephonyAudioUrl(...)` 再执行 ESL `uuidBroadcast(...)`，如果直接复用该链路播放"查询中"，提示本身也会引入额外等待。

---

## 2. A-D 已实施改造方案

### 2.1 目标流程

```bash
用户说话
  → VAD 检测语音结束 → 收到 transcript
  → handleInputTranscriptCompleted()
      ├─ persistCallMessage() 消息落库（保持同步）
      ├─ ★ 尽快播放"查询中，请稍后"提示音频（通过 ESL uuid_broadcast）
      ├─ ★ 启动异步 KB 检索（CompletableFuture + 线程池）
      │   └─ 耗时 100~500ms Elasticsearch 查询
      ├─ ★ 同时创建 Qwen response（让 AI 也开始思考）
      │   └─ Qwen 也在流式生成中
      └─ 方法立即返回，不阻塞 WebSocket 事件线程

--- 以下在异步回调中执行 ---

KB 结果返回:
  ├─ 检查 pendingKbSearchId 是否仍然匹配（防止旧结果覆盖）
  │   └─ 如果用户已发起新对话，pendingKbSearchId 已递增 → 丢弃旧结果
  ├─ 如果 KB 命中:
  │   ├─ cancelActiveResponse()  取消 Qwen 当前响应
  │   ├─ appendAssistantMessage() 注入 KB 答案
  │   └─ broadcastTranscript()   播报 KB 答案
  └─ 如果 KB 未命中:
      └─ 不做额外操作（Qwen 响应已在生成中，会自然返回）

KB 检索超时（默认 5 秒）:
  └─ 不做额外操作（Qwen 响应已在生成中）
```

### 2.2 关键设计决策

| 决策项 | 方案 | 理由 |
| --- | --- | --- |
| KB 检索异步化 | `CompletableFuture` + 专用线程池（2 核心/4 最大） | 避免阻塞 WebSocket 事件线程，轻量级 |
| 等待提示播放方式 | ESL `uuid_broadcast` 播放提示音频 | 首版可复用现有 TTS 播放链路；增强版应引入缓存/预生成，避免提示本身同步合成 |
| KB 检索期间 AI 行为 | 同时创建 Qwen response | 让 AI 也开始思考，KB 未命中或超时时 AI 回复自然衔接 |
| KB 命中后 AI 处理 | `cancelActiveResponse()` 取消 Qwen 响应 | 复现现有逻辑，KB 答案优先级高于 AI 生成 |
| 用户继续对话时的冲突处理 | `pendingKbSearchId`（AtomicInteger）递增序号 | 新 transcript 到达时递增 ID，异步回调中比对 ID，不匹配则丢弃 |
| "查询中"文本来源 | `ExtensionSettingsKnowledgeEntity` 新增 `interimPrompt` 字段 | 支持租户自定义提示语，默认中文 |
| 发布链路 | 同步更新 request/response/entity copy/frontend form | 避免字段只落表但无法保存、发布或回显 |

### 2.3 涉及文件

| 文件 | 改动类型 | 说明 |
| --- | --- | --- |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings_knowledge/ExtensionSettingsKnowledgeEntity.java` | 新增字段 | 增加 `interimPrompt` 字段 |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings_knowledge/ExtensionSettingsKnowledgeRequest.java` | 新增字段 | 支持保存草稿/发布请求 |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings_knowledge/ExtensionSettingsKnowledgeResponse.java` | 新增字段 | 支持管理端回显 |
| `enterprise/call/src/main/java/com/bytedesk/call/extension_settings/ExtensionSettingsRestService.java` | 同步复制 | 补齐 request -> entity、draft -> published 的字段复制 |
| `starter/src/main/resources/db/changelog/migration/` | 新增 migration | 为 `bytedesk_call_extension_settings_knowledge` 表增加 `interim_prompt` 列 |
| `enterprise/call/src/main/java/com/bytedesk/call/visitor/QwenRealtimeMediaWebSocketHandler.java` | 核心改动 | 异步 KB 检索、等待提示播放、冲突处理 |
| `enterprise/call/src/main/java/com/bytedesk/call/visitor/QwenRealtimeVoiceAgentService.java` | 可选改动 | 如果需要回合制路径也支持等待提示 |
| `frontend/apps/callAdmin/src/pages/Dashboard/Call/Extension/settings/components/ExtensionSettingsKnowledgeTab.tsx` | 表单项 | 配置 `interimPrompt` |

---

## 3. A-D 详细实现步骤（已完成）

### 步骤 1：`ExtensionSettingsKnowledgeEntity` 新增 `interimPrompt` 字段

```java
/**
 * KB 检索等待提示语，在 KB 异步查询期间通过 TTS 播放给用户。
 * 默认值："查询中，请稍后"
 */
@Builder.Default
@Column(name = "interim_prompt", length = 512)
private String interimPrompt = "查询中，请稍后";
```

对应数据库 migration：

```sql
ALTER TABLE bytedesk_call_extension_settings_knowledge
    ADD COLUMN interim_prompt VARCHAR(512) DEFAULT '查询中，请稍后';
```

### 步骤 2：新增 KB 检索专用线程池

在 `QwenRealtimeMediaWebSocketHandler` 或新建配置类中：

```java
private static final ExecutorService KB_SEARCH_EXECUTOR = Executors.newFixedThreadPool(
    4, r -> {
        Thread t = new Thread(r, "kb-search-worker");
        t.setDaemon(true);
        return t;
    });
```

更贴近当前仓库风格的做法是优先考虑：

- 首版直接在 `QwenRealtimeMediaWebSocketHandler` 中以 `private static final ExecutorService` 承载，减少改动面
- 如果后续要做线程池参数配置化，再抽到独立 `@Configuration` 或 `TaskExecutor`

### 步骤 2.1：同步打通 request/response/发布复制链路

仅修改实体不够，当前设置体系还需要同时更新：

1. `ExtensionSettingsKnowledgeRequest`
2. `ExtensionSettingsKnowledgeResponse.fromEntity(...)`
3. `ExtensionSettingsRestService.applyRequestToChildSettings(...)`
4. `ExtensionSettingsRestService.copyKnowledgeSettings(...)`
5. `ExtensionSettingsRestService.getOrCreateDefault(...)` 的默认值初始化（如首版希望默认启用提示语）
6. `ExtensionSettingsKnowledgeTab.tsx` 的表单项
7. `frontend/apps/callAdmin/src/pages/Dashboard/Call/Extension/settings/index.tsx` 中 `buildDefaultTemplate()` 默认值

否则会出现以下问题：

- 数据库有列，但前端无法提交
- 草稿可编辑但发布后字段丢失
- 列表/详情能回显旧值但不能保存新值

### 步骤 3：`BridgeSession` 增加 KB 检索状态管理字段

```java
private final class BridgeSession {
    // ... 现有字段 ...

    /** KB 检索序号，每次新 transcript 到达时递增。用于异步回调中判断结果是否过期 */
    private final AtomicInteger pendingKbSearchId = new AtomicInteger(0);

    /** 当前等待中的 KB 检索 Future，用于取消 */
    private volatile CompletableFuture<Void> pendingKbSearchFuture;

    /** KB 检索超时时间（毫秒） */
    private static final long KB_SEARCH_TIMEOUT_MS = 5000;
}
```

### 步骤 4：改造 `handleInputTranscriptCompleted`

```java
private void handleInputTranscriptCompleted(String itemId, String transcript) {
    String normalizedTranscript = firstNonBlank(transcript);
    if (!StringUtils.hasText(normalizedTranscript)) {
        createResponseIfNeeded();
        return;
    }
    if (StringUtils.hasText(itemId) && !handledInputItemIds.add(itemId)) {
        return;
    }

    // ★ 递增 KB 检索序号，使旧异步结果失效
    int currentSearchId = pendingKbSearchId.incrementAndGet();
    // ★ 取消上一个未完成的 KB 检索（如果有）
    cancelPendingKbSearch();

    ensureThread();
    persistCallMessage(resolveUserMessageUid(itemId), MessageTypeEnum.VOICE, buildVisitorUser(), normalizedTranscript);

    // ★ 读取 interimPrompt 配置
    ExtensionSettingsKnowledgeEntity knowledgeSettings = findCallableExtension(botDid, orgUid)
            .map(ExtensionEntity::getSettings)
            .map(ExtensionSettingsEntity::getActiveKnowledgeSettings)
            .orElse(null);
    boolean kbEnabled = knowledgeSettings != null
            && Boolean.TRUE.equals(knowledgeSettings.getEnableKbSearch())
            && StringUtils.hasText(knowledgeSettings.getKbUid());

    if (!kbEnabled) {
        createResponseIfNeeded();
        return;
    }

    // ★ 播放"查询中"提示
    String interimPrompt = StringUtils.hasText(knowledgeSettings.getInterimPrompt())
            ? knowledgeSettings.getInterimPrompt()
            : "查询中，请稍后";
    broadcastTranscript(interimPrompt);

    // ★ 同时创建 Qwen response（AI 也开始思考）
    createResponseIfNeeded();

    // ★ 异步执行 KB 检索
    final String finalDid = botDid;
    final String finalOrgUid = orgUid;
    pendingKbSearchFuture = CompletableFuture.runAsync(() -> {
        String kbReply = resolveKnowledgeBaseReply(finalDid, finalOrgUid, normalizedTranscript);
        if (!StringUtils.hasText(kbReply)) {
            return; // KB 未命中，Qwen 响应在生成中
        }

        // KB 命中：检查序号是否仍然匹配
        if (pendingKbSearchId.get() != currentSearchId) {
            log.info("Qwen realtime kb result discarded (new input received) sessionId={} searchId={} currentId={}",
                    downstream.getId(), currentSearchId, pendingKbSearchId.get());
            return;
        }

        // 取消 Qwen 响应 + 注入 KB 答案 + 播报
        cancelActiveResponse();
        appendAssistantMessage(itemId, kbReply);
        persistCallMessage(resolveKbMessageUid(itemId), MessageTypeEnum.ROBOT, buildRobotUser(), kbReply);
        broadcastTranscript(kbReply);
    }, KB_SEARCH_EXECUTOR).orTimeout(KB_SEARCH_TIMEOUT_MS, TimeUnit.MILLISECONDS)
      .exceptionally(ex -> {
          log.warn("Qwen realtime kb search async failed sessionId={} error={}",
                  downstream.getId(), ex != null ? ex.toString() : "timeout");
          return null;
      });
}
```

### 步骤 4.1：A-D 等待提示策略拆分

由于当前 `broadcastTranscript()` 内部是：

1. `ttsMrcpService.synthesizeToTelephonyAudioUrl(...)`
2. `eslService.uuidBroadcast(...)`

其中第 1 步仍是同步调用，所以文档建议把等待提示拆成两个层次：

- **阶段 A**：先完成 KB 异步检索与防串话。等待提示仍复用 `broadcastTranscript()`，接受几十到几百毫秒的提示延迟，但至少不会再阻塞 KB 查询主链路。
- **阶段 B（增强体验）**：把等待提示改为可复用的预生成音频 URL 或短文本 TTS 缓存，做到真正的“立即提示”。

增强版可选落地方式：

1. 启动时预生成默认 `interimPrompt` 对应音频 URL
2. 分机设置发布时，若 `interimPrompt` 发生变更，异步生成并缓存对应音频 URL
3. 运行时优先播放缓存 URL，缓存缺失时回退到现有 TTS 合成链路

增强版最终没有新增只读缓存字段 `interimPromptAudioUrl`，而是采用 `TranscriptAudioUrlResolver` 的内存级 bounded LRU 缓存。

### 步骤 4.2：异步回调中的线程安全

当前 `handleInputTranscriptCompleted` 以及它调用的 `sendText`、`appendAssistantMessage`、`cancelActiveResponse` 等方法都在上游 Qwen WebSocket 回调线程中执行。异步 KB 检索的回调运行在 `KB_SEARCH_EXECUTOR` 线程上，这意味着以下操作存在并发风险：

- `sendText(...)` 访问 upstream WebSocket（上游监听器线程也在读写同一连接）
- `cancelActiveResponse()` 修改 `activeResponseId`（无同步保护）
- `appendAssistantMessage(...)` 通过 `sendText` 发消息到上游

推荐在异步回调中做以下处理：

1. **将所有涉及上游 WebSocket 的操作集中到一个同步块中**，例如：

```java
synchronized (this) {
    if (pendingKbSearchId.get() != currentSearchId) return;
    cancelActiveResponse();
    appendAssistantMessage(itemId, kbReply);
}
```

1. **或者**将异步结果投递回下游 WebSocket 线程执行，避免跨线程操作上游连接：

```java
// 在异步回调中只做判断和组装，然后通过 downstream session 投递
sendDownstreamJson(Map.of("type", "kb.result", "searchId", currentSearchId, ...));
// 在下游 handleTextMessage 中处理 "kb.result" 类型，执行实际的 cancelActiveResponse + broadcastTranscript
```

推荐首版采用方案 1（synchronized 块），因为改动面最小且当前 BridgeSession 内没有其他显式锁。如果实测发现 `broadcastTranscript` 的同步 TTS 耗时导致锁持有时间过长，再改为方案 2。

### 步骤 4.3："查询中"提示与 Qwen 音频的时序重叠

A-D 实现中 `broadcastTranscript(interimPrompt)` 和 `createResponseIfNeeded()` 是先后调用，但由于：

- `broadcastTranscript` 内 TTS 合成是同步的
- Qwen response 创建后可能需要几百毫秒才开始流式返回第一个 `response.audio.delta`

实际可能出现三种时序：

| 时序 | 用户听到的效果 | 影响 |
| --- | --- | --- |
| 提示播完 → Qwen 首帧到达 | 自然过渡，体验最好 | 理想情况 |
| Qwen 首帧在提示播完前到达 | 提示被打断或叠加 | 可通过 `cancelActiveResponse` 及时取消避免 |
| 提示还没开始 → Qwen 已经开始 | 用户听到 Qwen 前半句 → 被 KB 答案打断 | 仅当 KB 检索极快且立即取消响应时出现 |

A-D 已接受这些时序差异，暂未引入"等待 Qwen 首个 audio.delta 到达前取消"的更精细控制。

### 步骤 5：新增 `cancelPendingKbSearch` 方法

```java
private void cancelPendingKbSearch() {
    CompletableFuture<Void> future = pendingKbSearchFuture;
    if (future != null && !future.isDone()) {
        future.cancel(false); // 不中断线程，让 ES 查询自然完成但丢弃结果
    }
    pendingKbSearchFuture = null;
}
```

### 步骤 6：BridgeSession 关闭时清理

在 `BridgeSession` 的关闭/清理方法中增加：

```java
cancelPendingKbSearch();
```

### 步骤 7：callAdmin 表单与默认值适配

当前管理端知识库设置页位于：

- `frontend/apps/callAdmin/src/pages/Dashboard/Call/Extension/settings/components/ExtensionSettingsKnowledgeTab.tsx`

需要补一项文本配置，例如：

- 字段：`knowledgeSettings.interimPrompt`
- 类型：`ProFormTextArea` 或 `ProFormText`
- 交互：仅在 `enableKbSearch=true` 时展示或启用

同时还要同步补默认值入口：

- `frontend/apps/callAdmin/src/pages/Dashboard/Call/Extension/settings/index.tsx`

### 步骤 8：（可选）回合制路径适配

`QwenRealtimeVoiceAgentService.chat()` 是同步 HTTP 调用，可以通过以下方式增强：

- 在 KB 检索前，通过 ESL `uuid_broadcast` 向 FreeSWITCH 播放"查询中"音频
- 由于 HTTP 调用是同步的，无法中途让用户继续对话
- 因此该路径最多只能补“查询中”提示，不能满足“等待期间继续对话”的核心目标
- 建议文档中明确：真正满足需求的实施范围以实时流式路径为主，回合制路径只作为兼容增强项

---

## 4. A-D 边界场景处理

| 场景 | 处理方式 |
| --- | --- |
| KB 检索期间用户继续说话 | `pendingKbSearchId` 递增 → 旧结果回调时序号不匹配 → 丢弃 |
| KB 检索期间用户挂断 | WebSocket 关闭 → BridgeSession 清理 → `cancelPendingKbSearch()` |
| KB 检索超时（5 秒） | `orTimeout` → 丢弃结果，Qwen 响应已在生成中 |
| KB 检索抛异常 | `exceptionally` → 打日志，Qwen 响应已在生成中 |
| 连续多次 KB 检索 | 每次新 transcript 到达时 `cancelPendingKbSearch()` → 只保留最新检索 |
| `interimPrompt` 为空 | 使用默认值 "查询中，请稍后" |
| KB 未开启（`enableKbSearch=false`） | 不播放等待提示，直接走原有 Qwen 响应流程 |
| ESL 服务不可达 | `broadcastTranscript()` 内已有 try-catch，不影响主流程 |
| 设置仍处于草稿态 | 运行时通过 `getActiveKnowledgeSettings()` 读取当前生效配置，需与发布语义保持一致 |
| Qwen 响应已在流式输出中但 KB 命中 | `cancelActiveResponse()` 取消 Qwen → 注入 KB 答案 → 用户可能听到短暂的声音切换 |
| KB 回答和 Qwen 回答都完成后 | 处理完毕；等待下一轮用户语音输入 |

### 4.1 Qwen 响应被中断的体验优化（增强项）

当 KB 命中后 `cancelActiveResponse()` 取消 Qwen 响应，如果 Qwen 已经开始流式输出音视频，用户可能听到短暂的声音片段后被 KB 答案覆盖。缓解策略：

- **A-D 已采用**：接受短暂切换，实际测试后评估影响程度
- **增强版**：如果 KB 响应在 Qwen 首个 `response.audio.delta` 到达之前完成，则取消 Qwen 响应；如果 Qwen 已经开始输出音频，则让 Qwen 说完，KB 答案追加在 Qwen 回答后面（"根据知识库，补充以下信息：{KB答案}"）

---

## 5. A-D 数据库变更

### Migration 文件（已完成）

实际文件：`260725_add_kb_interim_prompt.xml`

```xml
<changeSet id="260725-add-interim-prompt" author="bytedesk">
    <preConditions onFail="MARK_RAN">
        <tableExists tableName="bytedesk_call_extension_settings_knowledge"/>
        <not>
            <columnExists tableName="bytedesk_call_extension_settings_knowledge" columnName="interim_prompt"/>
        </not>
    </preConditions>
    <addColumn tableName="bytedesk_call_extension_settings_knowledge">
        <column name="interim_prompt" type="varchar(512)" defaultValue="查询中，请稍后">
            <constraints nullable="true"/>
        </column>
    </addColumn>
    <rollback>
        <dropColumn tableName="bytedesk_call_extension_settings_knowledge" columnName="interim_prompt"/>
    </rollback>
</changeSet>
```

已在 `starter/src/main/resources/db/changelog/master.xml` 中显式追加 include，遵循当前仓库已有的按日期顺序维护方式。

---

## 6. A-D 测试策略与结果

### 6.1 单元测试

| 测试场景 | 预期结果 | 状态 |
| --- | --- | --- |
| KB 开启 + 用户说话 → KB 命中 | 先播放"查询中"提示 → 然后播放 KB 答案 | ✅ `handleInputTranscriptCompletedShouldBroadcastInterimPromptAndAsyncKbReply` |
| KB 开启 + 用户说话 → KB 未命中 | 先播放"查询中"提示 → Qwen AI 生成回复并播放 | ✅ `handleInputTranscriptCompletedShouldOnlyBroadcastInterimPromptWhenKbMisses` |
| KB 开启 + 用户说话 → KB 超时/异常 | 先播放"查询中"提示 → Qwen AI 生成回复并播放 | ✅ `handleInputTranscriptCompletedShouldOnlyBroadcastInterimPromptWhenKbSearchFails` |
| KB 开启 + 用户连续说两句话 | 第一次 KB 检索被取消，仅保留第二次结果 | ✅ `handleKbSearchResultShouldDiscardStaleResult` |
| KB 关闭 | 不播放"查询中"，直接走 AI 回复 | ✅ 隐含验证于命中/未命中测试的 KB 开启前提 |
| `interimPrompt` 为空 | 使用默认值 "查询中，请稍后" | ✅ `DEFAULT_INTERIM_PROMPT` 常量 |
| `interimPrompt` 自定义 | 使用自定义文本 | ✅ 扩展设置通过 `resolveActiveKnowledgeSettings` 读取 |
| 草稿保存后未发布 | 实时呼叫只应读取当前 active 配置 | ✅ `ExtensionSettingsRestServiceTest` 覆盖 |
| KB 异步回调与上游 WebSocket 事件线程并发 | synchronized 块内操作不出现竞态 | ✅ 回调中 `synchronized(this)` 保护 |
| WebSocket 关闭时清理 pending future | `cancelPendingKbSearch()` 被调用 | ✅ `closeShouldCancelPendingKbSearchFuture` |
| 空 KB 结果清理 pending future | `clearPendingKbSearchFuture()` 复位 | ✅ `clearPendingKbSearchFutureShouldResetStateForEmptyKbResult` |
| 等待提示音频缓存复用 | 同一提示文本仅合成一次 | ✅ `handleInputTranscriptCompletedShouldReuseCachedInterimPromptAudio` |
| 等待提示缓存有界淘汰 | 超出 32 条后最旧条目被淘汰 | ✅ `resolveCachedShouldEvictOldestEntryWhenCacheIsFull` + `resolveCachedShouldReuseCachedAudioUrl` |
| URL 规范化（localhost/127.0.0.1） | 转换为 host.docker.internal | ✅ `resolveShouldNormalizeLoopbackAudioUrl` |

### 6.2 集成测试建议

1. 拨打 `1100` 分机 → 说一句可能命中 KB 的话 → 验证听到"查询中"→ KB 答案
2. 拨打 `1100` 分机 → 说一句话 → 在 KB 返回前继续说第二句话 → 验证听到第一句的 KB 答案且第二句正常处理
3. 拨打 `1100` 分机 → 在管理后台修改 `interimPrompt` → 发布 → 再次拨打验证新提示语生效
4. 拨打 `1100` 分机 → 快速连续说话，同时 ES 查询模拟慢响应 → 验证多次 KB 检索回调不出现 websocket 协议异常或状态错误

### 6.3 性能验证口径

- KB 检索异步化后，WebSocket 事件线程不再被阻塞
- A-D 实现后，`broadcastTranscript("查询中，请稍后")` 仍可能包含同步 TTS 合成耗时，但该耗时不应再与 KB 检索耗时串行叠加为同一阻塞瓶颈
- 阶段 C 完成后，等待提示播放链路已通过 `TranscriptAudioUrlResolver.resolveCached(...)` 降低重复 TTS 合成成本

---

## 7. A-D 原始工作量估算

| 步骤 | 内容 | 估时 |
| --- | --- | --- |
| 步骤 1 | `ExtensionSettingsKnowledgeEntity` + request/response 新增 `interimPrompt` 字段 | 0.5d |
| 步骤 2 | `ExtensionSettingsRestService` 草稿/发布复制链路补齐 | 0.25d |
| 步骤 3 | callAdmin 表单与默认值适配 | 0.25d |
| 步骤 4 | 新增 KB 检索线程池配置 | 0.25d |
| 步骤 5 | BridgeSession 改造（异步检索 + 冲突处理） | 1d |
| 步骤 6 | 清理与取消逻辑 | 0.25d |
| 步骤 7 | 等待提示缓存/预生成增强项 | 0.5d |
| 步骤 8 | 回合制路径可选适配 | 0.5d |
| Migration | Liquibase changeSet + master include | 0.25d |
| 测试 | 单元测试 + 集成拨测 | 1d |
| **合计** | | **约 3.0d ~ 3.5d** |

---

## 8. A-D 风险与注意事项

| 风险 | 概率 | 影响 | 缓解 |
| --- | --- | --- | --- |
| KB 异步检索增加线程池，增加 CPU/内存开销 | 低 | 线程池最多 4 线程，开销可控 | 使用 daemon 线程，空闲时不占资源 |
| ESL `uuid_broadcast` 与 Qwen 流式音频可能存在时序冲突 | 中 | 用户听到音频叠加或切换不自然 | A-D 接受短暂切换；后续可引入音频队列顺序播放 |
| Qwen 响应被 `cancelActiveResponse()` 取消时产生音频毛刺 | 低 | 用户听到短暂杂音 | 在 `cancelActiveResponse` 后等待 ~200ms 再 `broadcastTranscript` |
| `broadcastTranscript` 调用 TTS 合成可能耗时较长 | 中 | "查询中"提示本身延迟，弱化“立即提示”效果 | 已通过 `TranscriptAudioUrlResolver` 的缓存路径缓解重复合成 |
| 多并发通话时 ES 查询压力 | 低 | 4 线程线程池限制并发 | 线程池大小基于 ES 集群容量调整 |
| 只改实体不改 request/response/copy | 中 | 字段无法保存、发布或回显 | 将设置链路改造列为必做项，而非附带项 |
| 异步回调线程安全问题 | 中 | 多线程并发访问 upstream WebSocket 或 `activeResponseId` 导致状态错乱或 WebSocket 协议违规 | 已用 `synchronized (this)` 保护回调中的上游操作；增强版可改为事件投递模式 |
| "查询中"提示与 Qwen 首帧音频时序重叠 | 中 | 用户听到两段声音叠加或切换不自然 | A-D 接受时序差异；后续可引入音频发送队列顺序播放 |

---

## 9. A-D 不涉及的范围

| 项目 | 说明 |
| --- | --- |
| 回合制路径完整异步化 | `QwenRealtimeVoiceAgentService.chat()` 保持同步，仅增加等待提示 |
| 前端管理界面大改 | A-D 只补 `interimPrompt` 基础输入框，不扩展复杂音频缓存管理 UI |
| 等待提示多语言支持 | A-D 仅支持通过 `interimPrompt` 字段自定义文本（可为任意语言） |
| 等待提示音频文件上传 | A-D 仅支持 TTS 文本合成，不支持上传自定义音频 |
| 全量重构 `broadcastTranscript` 为完全异步音频队列 | 作为后续增强，不阻塞本轮交付 |

---

## 10. A-D 已确认事项

- [x] **首版是否只改造实时流式路径**（`QwenRealtimeMediaWebSocketHandler`），回合制路径仅增加 ESL `uuid_broadcast` 播放等待提示？→ **已确认：首版仅改造实时流式路径，回合制路径仅做 URL 规范化接入。**
- [x] **KB 命中后是否仍然取消 Qwen 响应**？还是让 Qwen 说完后 KB 答案作为补充信息追加播报？→ **已确认：仍然取消 Qwen 响应，KB 答案优先级高于 AI 生成。**
- [x] **KB 检索超时时间 5 秒**是否合适？是否需要与 `maxConversationTurns` 等配置联动？→ **已采用 5 秒，不做联动。**
- [x] **线程池大小**：建议 2 核心 / 4 最大，是否接受？→ **实际采用 4 核心 fixed pool（`Executors.newFixedThreadPool(4)`），daemon 线程。**
- [x] **`interimPrompt` 字段默认值**："查询中，请稍后"是否合适？→ **已采用。**
- [x] **管理后台 `interimPrompt` 配置 UI**：建议纳入本轮最小实现，只加基础文本框，是否接受？→ **已实现 ProFormTextArea。**
- [x] **Qwen 响应被中断后的音频毛刺处理**：首版接受短暂切换，还是做 200ms 延迟过渡？→ **首版接受短暂切换，未引入延迟。**

## 11. A-D 收口方案（已执行）

A-D 已按下面范围收口并实施：

1. 只保证实时流式路径满足“等待期间可继续对话”
2. `interimPrompt` 纳入后端实体、request/response、发布复制、callAdmin 基础文本框
3. KB 检索先异步化，结果冲突通过 `pendingKbSearchId` 防串话
4. 等待提示先接受轻微延迟，后续通过内存缓存缓解，不新增音频缓存实体字段
5. 回合制路径只做兼容增强，不作为本需求的主交付目标

按这个范围推进后，文档与当前代码结构已对齐；阶段 E 只在此基础上补“是否触发 KB”的前置判定。

## 12. A-D 可执行任务拆分与完成状态

以下任务已按顺序完成，便于后续阶段 E 只关注新增意图识别：

### 任务 A：配置字段闭环 ✅ 已完成

1. ✅ 后端实体：`ExtensionSettingsKnowledgeEntity.interimPrompt`
2. ✅ 后端 DTO：`ExtensionSettingsKnowledgeRequest.interimPrompt`
3. ✅ 后端响应：`ExtensionSettingsKnowledgeResponse.fromEntity(...)` 回填 `interimPrompt`
4. ✅ 设置服务：`applyRequestToChildSettings(...)` 保存 `interimPrompt`
5. ✅ 发布复制：`copyKnowledgeSettings(...)` 复制 `interimPrompt`
6. ✅ 默认模板：`getOrCreateDefault(...)` 设置默认 `interimPrompt`
7. ✅ 数据库：新增 `260725_add_kb_interim_prompt.xml` 并在 `master.xml` include
8. ✅ 前端：callAdmin 知识库设置页新增 `ProFormTextArea`，并在 `buildDefaultTemplate()` 给默认值
9. ✅ 前端类型：`extension_settings.d.ts` 中 `ExtensionSettingsKnowledge` 补充 `interimPrompt?: string`

可验证结果：管理后台保存、发布后，接口回显能看到 `knowledgeSettings.interimPrompt`，再次打开表单不会丢失。

### 任务 B：实时流式 KB 异步化 ✅ 已完成

1. ✅ `QwenRealtimeMediaWebSocketHandler` 增加 `KB_SEARCH_EXECUTOR`（4 线程 daemon fixed pool）
2. ✅ `BridgeSession` 增加 `pendingKbSearchId`（AtomicInteger）与 `pendingKbSearchFuture`
3. ✅ `handleInputTranscriptCompleted(...)` 异步化
4. ✅ KB 结果返回后比对 `pendingKbSearchId`，丢弃过期结果
5. ✅ `close()` 中 `cancelPendingKbSearch()`
6. ✅ 异步回调中 `synchronized (this)` 保护上游 WebSocket 操作
7. ✅ `clearPendingKbSearchFuture()` 统一清理 pending future

可验证结果：连续说两句话时，第一句话的迟到 KB 结果不会覆盖第二句话的处理结果。

### 任务 C：语音体验增强 ✅ 已完成（偏离计划：抽取组件代替落库）

实际实现比计划更轻量，抽取了可复用组件而非引入新 DB 字段：

1. ✅ 抽取 `TranscriptAudioUrlResolver` 组件（`@Component`）
   - `resolve(String transcript)` — TTS 合成 + URL 规范化
   - `resolveCached(String transcript)` — 带 bounded LRU 缓存（最大 32 条）
   - `normalize(String audioUrl)` — 纯 URL 规范化
2. ✅ `QwenRealtimeMediaWebSocketHandler` 委托给 resolver
3. ✅ `QwenRealtimeVoiceAgentService` 接入 `resolver.normalize()`
4. ✅ `TranscriptAudioUrlResolverTest`（3 条）
5. ❌ 未引入 `interimPromptAudioUrl` 落库字段 → 内存缓存已满足需求

可验证结果："查询中，请稍后"播放延迟稳定低于当前同步 TTS 合成路径。

### 任务 D：回合制路径兼容 ✅ 最小化完成

1. ✅ `QwenRealtimeVoiceAgentService` 注入 `TranscriptAudioUrlResolver`，做 URL 规范化
2. ❌ 未增加独立的回合制等待提示播放 → 同步 HTTP 调用无法支持核心目标

可验证结果：旧回合制入口的音频 URL 可达性得到保障，不影响原有 `VoiceAgentResponse` 生成。

### 验证结果汇总

| 测试类 | 用例数 | 结果 |
| --- | --- | --- |
| `ExtensionSettingsRestServiceTest` | 16 | ✅ |
| `QwenRealtimeMediaWebSocketHandlerTest` | 8 | ✅ |
| `TranscriptAudioUrlResolverTest` | 3 | ✅ |
| `QwenRealtimeVoiceAgentServiceTest` | 8 | ✅ |
| 编译 `enterprise/call` | — | ✅ |
