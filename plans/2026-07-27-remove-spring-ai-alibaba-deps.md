# 注释停用 spring-ai-alibaba 依赖并替换为 dashscope-sdk-java 规划

> 状态：阶段 1/2 已实施，阶段 3 关键链路已验证，待全量回归  
> 创建：2026-07-27  
> 实施：2026-07-30  
> 关联 TODO：`TODO-2026.md` 中"去掉 spring-ai-alibaba-starter-dashscope、spring-ai-alibaba-agent-framework 依赖"任务  
> 目标：解除 spring-ai-alibaba 1.1.2.2 对 Spring AI 1.x / Spring Boot 3.x 的版本锁定，为升级到 Spring Boot 4.x + Spring AI 2.x 扫清障碍  
> 实施记录：`dashscope-sdk-java` 已升级到 `2.22.24`；`modules/ai` 已切换到 `BytedeskDashScopeChatModel` / `BytedeskDashScopeEmbeddingModel`；`BytedeskDashScopeChatModel` 已将 DashScope `GenerationUsage` 映射到 Spring AI `ChatResponseMetadata` 和现有 `TokenUsageHelper` 使用的 `prompt_tokens` / `completion_tokens` / `total_tokens`；`modules/ai`、`enterprise/ai`、`enterprise/call` 中 spring-ai-alibaba 相关依赖已按阶段注释停用；`com.bytedesk.ai.alibaba` 与 `voice_agent` 中依赖 Alibaba Graph/WebSocket/AudioConfig 的演示适配通过 Maven 编译排除保留源码；语音坐席正式 REST/DTO/服务与 `enterprise/call` 入口保留编译。运行期已修复 DashScope SSE 404：根因是 native SDK 在显式传入 `baseHttpUrl` 时要求基础地址包含 `/api/v1`，不能只传域名根；现已通过 `DashScopeBaseUrlSupport` 将 DashScope 官方兼容模式地址统一归一化到 `https://dashscope.aliyuncs.com/api/v1`。已通过 `modules/ai` compile、`enterprise/ai` compile/test-compile、`enterprise/call` compile/test-compile、`starter -am` compile、`BytedeskDashScopeChatModelTest` token usage metadata 与 baseUrl 归一化单元测试，以及 `VoiceAgentServiceTest` / `QwenRealtimeVoiceAgentService*Test` 验证。
> 2026-07-31 修订：语音坐席确认为正式功能，不再整体停用 `com.bytedesk.ai.voice_agent`。正式保留 `VoiceAgentRequest`、`VoiceAgentResponse`、`VoiceAgentSpeakRequest`、`VoiceAgentSpeakResponse`、`VoiceAgentService`、`VoiceAgentRestControllerVisitor` 以及 `enterprise/call` 中 `VoiceAgentRestControllerVisitor` / `QwenRealtimeVoiceAgentService`；仅继续排除 `ReactAgent`、`GraphRunnerException`、`DashScopeAudio*`、WebSocket 演示适配相关文件。
> 2026-07-31 运行期修订：`/visitor/api/v1/message/sse` 已实测恢复。动态 provider 命中 `dashscope` 后可正常流式返回文本，并正确记录 `provider=dashscope`、`model=qwen-turbo` 与 token usage 统计；此前 404 并非账号或模型问题，而是 `baseUrl` 从兼容模式切换到 native SDK 时少了 `/api/v1` 前缀。

## 0. 背景与问题

### 0.1 当前依赖关系

```text
项目 (Spring Boot 3.5.16 + Spring AI 1.1.2)
  ├── spring-ai-alibaba-starter-dashscope:1.1.2.2
  │     └── 依赖 spring-ai 1.x（传递性）
  ├── spring-ai-alibaba-agent-framework:1.1.2.2
  │     └── 依赖 spring-ai-alibaba-graph-core → spring-ai 1.x（传递性）
  ├── spring-ai-alibaba-dashscope:1.1.2.2（enterprise/ai 独有）
    └── dashscope-sdk-java:2.22.18 → 2.22.24（目标版本，✅ 无 Spring 依赖）
```

### 0.2 升级阻塞链

```text
Spring Boot 4.x 需要 Spring AI 2.x
    → Spring AI 2.x 与 spring-ai-alibaba 1.1.2.2 不兼容（依赖 Spring AI 1.x API）
        → spring-ai-alibaba 有 2.0.0-M1.1 里程碑版本，但仍是 Milestone 且未验证稳定性
            → 更安全的方案：先注释停用 spring-ai-alibaba 相关依赖，直接使用 dashscope-sdk-java
```

### 0.3 可行性验证

`dashscope-sdk-java` 已在项目中**实际使用**（8 个文件），包括：

- TTS 语音合成（`CosyVoiceTtsService`、`QwenAudioTtsService`、`QwenTtsService`、`TtsMrcpService`）
- ASR 语音识别（`AsrService`、`AudioSpeechRelayWebSocketHandler`）
- OCR 图像识别（`DashScopeOcrService`）

这证明了 `dashscope-sdk-java` 可以在不依赖 spring-ai-alibaba 的情况下正常使用。

但需要明确：

- 上述“已验证可用”主要发生在 `enterprise/ai` 的 TTS / ASR / OCR 场景
- `modules/ai` 中的 Chat / Embedding 仍主要依赖 `spring-ai-alibaba` 提供的 Spring AI 适配层
- 因此本次迁移的真正工作重点，不是语音 SDK 接入，而是 **为 ChatModel / EmbeddingModel 补齐可替代的 Spring AI 适配层**

### 0.4 SDK 版本与本地源码参考

- 目标 SDK 版本：`dashscope-sdk-java:2.22.24`
- 项目版本属性：根 `pom.xml` 中 `${dashscope-sdk-java.version}` 需从 `2.22.18` 更新为 `2.22.24`
- 本地源码目录：`/Users/ningjinpeng/Desktop/Git/Github/open/dashscope-sdk-java`
- 本地源码仓库已存在 `v2.22.24` 标签；实施时应以该标签或 Maven artifact 为准，而不是以本地工作区当前更高版本为准

实施阶段应优先参考本地源码目录中的 `src/` 与 `samples/`，再结合 `dashscope-sdk-java:2.22.24` jar 进行最小编译验证，避免仅凭旧版 2.22.18 的方法签名实现适配层。

## 1. 受影响范围分析

### 1.1 依赖声明位置

| 模块 | 依赖 | 位置 |
| ------ | ------ | ------ |
| `modules/ai` | `spring-ai-alibaba-starter-dashscope` | `pom.xml` L314-316 |
| `modules/ai` | `spring-ai-alibaba-agent-framework` | `pom.xml` L320-323 |
| `modules/ai` | `spring-ai-alibaba-bom` (dependencyManagement) | `pom.xml` L412-415 |
| `enterprise/ai` | `spring-ai-alibaba-starter-dashscope` | `pom.xml` L120-123 |
| `enterprise/ai` | `spring-ai-alibaba-agent-framework` | `pom.xml` L127-130 |
| `enterprise/ai` | `spring-ai-alibaba-dashscope` | `pom.xml` L133-136 |
| `enterprise/ai` | `spring-ai-alibaba-bom` (dependencyManagement) | `pom.xml` L179-182 |
| `pom.xml` | `${spring-ai-alibaba.version}` 版本属性 | L43-44 |

### 1.2 Java 代码使用分类

当前静态扫描口径如下：

- `rg -l "com\.alibaba\.cloud\.ai\." modules/ai enterprise/ai enterprise/call`：36 个文件
- `rg -l "com\.alibaba\.cloud\.ai\.dashscope" modules/ai enterprise/ai enterprise/call`：11 个文件，其中 `modules/ai` 的 8 个文件是阶段 1 的真实阻塞点，`enterprise/ai` 的 3 个文件位于 `voice_agent` 演示包
- `rg -l "com\.alibaba\.cloud\.ai\.graph|ReactAgent|RunnableConfig|OverAllState|GraphRunnerException" modules/ai enterprise/ai enterprise/call`：26 个文件，均位于演示代码范围内

按处理策略分为两大类：

#### A 类：DashScope API 使用（8 个文件）— 需替换为 dashscope-sdk-java

##### 全部在 modules/ai

| # | 文件 | 使用的类 | 难度 |
| --- | ------ | ---------- | ------ |
| 1 | `springai/providers/dashscope/SpringAIDashscopeChatConfig.java` | `DashScopeApi`、`DashScopeChatModel`、`DashScopeChatOptions` | 中 |
| 2 | `springai/providers/dashscope/SpringAIDashscopeChatController.java` | `DashScopeChatOptions` | 低 |
| 3 | `springai/providers/dashscope/SpringAIDashscopeChatService.java` | `DashScopeChatOptions` | 低 |
| 4 | `springai/providers/dashscope/SpringAIDashscopeService.java` | `DashScopeChatModel`、`DashScopeChatOptions`、`DashScopeApi` | 中 |
| 5 | `springai/providers/dashscope/SpringAIDashscopeEmbeddingConfig.java` | `DashScopeApi`、`DashScopeEmbeddingModel`、`DashScopeEmbeddingOptions` | 中 |
| 6 | `embedding_settings/EmbeddingSettingsKbaseVectorStoreResolver.java` | `DashScopeApi`、`DashScopeEmbeddingModel`、`DashScopeEmbeddingOptions` | 中 |
| 7 | `embedding_settings/EmbeddingSettingsRestService.java` | `DashScopeApi`、`DashScopeEmbeddingModel`、`DashScopeEmbeddingOptions` | 中 |
| 8 | `service/EmbeddingModelInfoService.java` | `DashScopeEmbeddingModel` | 低 |

##### enterprise/ai（3 个文件）— 仅 Alibaba 音频/枚举依赖需要处理

| # | 文件 | 使用的类 | 处理 |
| --- | ------ | ---------- | ------ |
| 9 | `voice_agent/VoiceAgentAudioConfig.java` | `DashScopeAudioSpeechApi`、`DashScopeAudioTranscriptionApi`、`DashScopeAudioSpeechModel`、`DashScopeAudioSpeechOptions`、`DashScopeAudioTranscriptionModel`、`DashScopeAudioTranscriptionOptions`、`DashScopeModel` | ✅ 演示代码，注释掉 |
| 10 | `voice_agent/VoiceAgentRealtimeStreamService.java` | `DashScopeModel`（枚举） | ✅ 演示实时流适配，注释掉 |
| 11 | `voice_agent/VoiceAgentService.java` | `DashScopeModel`（枚举） | ✅ 正式语音坐席兜底服务，替换为本地模型字符串后保留 |

#### B 类：演示包代码 — 注释 Alibaba 示例与 voice_agent 演示适配

**已修订：`com.bytedesk.ai.alibaba` 包为演示/实验代码；`com.bytedesk.ai.voice_agent` 中只有 ReactAgent/WebSocket/AudioConfig 等 Alibaba 适配属于演示范围。** 语音坐席 REST/DTO/服务以及 `enterprise/call` 中的电话语音坐席入口是正式功能，必须保留编译。

##### 全部在 enterprise/ai

| 类别 | 文件数 | 关键依赖 | 判断 |
| ------ | -------- | ---------- | ------ |
| Alibaba 示例 Service + Controller | 5+5 | `ReactAgent`、`MemorySaver`、`RunnableConfig`、`OverAllState` | ✅ 演示代码，注释掉 |
| Hooks | 9 | `ModelHook`、`AgentHook`、`MessagesModelHook`、`JumpTo` | ✅ 演示代码，注释掉 |
| Interceptors | 8 | `ModelInterceptor`、`ToolInterceptor`、`ModelCallHandler` | ✅ 演示代码，注释掉 |
| Tools | 2 | `RunnableConfig`、`ToolContextConstants` | ✅ 演示代码（含 `WeatherForLocationTool`），注释掉 |
| Audio Relay WebSocket | 2 | `DashScopeAudioSpeechApi`、`DashScopeAudioTranscriptionApi` | ✅ 演示代码，注释掉 |
| VoiceAgent 演示适配 | 8 | `ReactAgent`、`GraphRunnerException`、`DashScopeAudioSpeechApi` 等 | ✅ 演示代码，注释掉 |
| VoiceAgent 正式 API/服务 | 6 + package-info | DTO、`ChatClient`、ASR/TTS 服务、REST 入口 | ✅ 正式功能，保留编译 |

> `spring-ai-alibaba-agent-framework` 只需要由 Alibaba 示例包和 voice_agent 的 ReactAgent 演示适配解除；正式语音坐席链路不依赖该框架。

### 1.3 代码分类（已确认）

经过代码审查，所有使用 spring-ai-alibaba 的业务代码均为演示/实验性质：

#### 全部为演示代码：`com.bytedesk.ai.alibaba`（42 个文件）

| 子包 | 文件数 | 说明 |
| ------ | -------- | ------ |
| `agents/` | 3 | `AlibabaAgentsService/Controller` |
| `weather/` | 4 | `AlibabaWeatherService/Controller/Response` |
| `memory/` | 3 | `AlibabaMemoryService/Controller` |
| `skills/` | 3 | `AlibabaSkillsService/Controller` |
| `struct_output/` | 6 | `AlibabaStructOutputService/Controller` + 3 个 DTO |
| `audio/` | 3 | `AudioSpeechRelayWebSocketHandler/Config` |
| `utils/hooks/` | 9 | 9 个 Hook 演示 |
| `utils/interceptors/` | 8 | 8 个 Interceptor 演示 |
| `utils/tools/` | 2 | `UserLocationTool` + `WeatherForLocationTool` |
| `package-info.java` | 1 | 包描述 |

#### `com.bytedesk.ai.voice_agent` 分类（15 个文件）

| 文件 | 说明 |
| ------ | ------ |
| `VoiceAgentConfig.java` | `ReactAgent` Bean 注册（演示用） |
| `VoiceAgentStreamService.java` | `ReactAgent.streamMessages()` 文本流式（演示用） |
| `VoiceAgentRealtimeStreamService.java` | `ReactAgent` + ASR 音频实时流（演示用） |
| `VoiceAgentService.java` | `ChatClient` 非流式电话语音坐席兜底服务（正式保留） |
| `VoiceAgentRestControllerVisitor.java` | REST 入口（正式保留） |
| `VoiceAgentAudioConfig.java` | DashScope TTS/ASR Spring AI 适配（演示用） |
| `VoiceAgentAudioWebSocketHandler.java` / `VoiceAgentWebSocket*` / `VoiceAgentEvent.java` | WebSocket 入口 + Event（演示用） |
| `VoiceAgentRequest.java` / `VoiceAgentResponse.java` / `VoiceAgentSpeakRequest.java` / `VoiceAgentSpeakResponse.java` | call 侧正式 API DTO（正式保留） |

> **注意：`enterprise/call` 模块中的 `VoiceAgentRestControllerVisitor` / `QwenRealtimeVoiceAgentService` 是正式电话语音坐席入口，不再通过 Maven 排除。**

## 2. 替换方案

### 2.1 DashScope ChatModel 替换

**当前实现：** `spring-ai-alibaba-starter-dashscope` 提供 `DashScopeChatModel`（实现 Spring AI `ChatModel` 接口）

**替换方案：** 基于 `dashscope-sdk-java` 的 `Generation` API 实现自定义 `ChatModel`

目标版本为 `dashscope-sdk-java:2.22.24`。当前已基于 2.22.x jar 初步确认以下 API 形态，正式实施前需结合本地源码目录和 2.22.24 jar 二次复核：

- `com.alibaba.dashscope.aigc.generation.Generation`
- `GenerationResult call(HalfDuplexServiceParam)`
- `Flowable<GenerationResult> streamCall(HalfDuplexServiceParam)`
- `void streamCall(HalfDuplexServiceParam, ResultCallback<GenerationResult>)`

```java
// 概念示意：BytedeskDashScopeChatModel
public class BytedeskDashScopeChatModel implements ChatModel {
    
    @Override
    public ChatResponse call(Prompt prompt) {
        Generation gen = new Generation();
        GenerationParam param = GenerationParam.builder()
            .apiKey(apiKey)
            .model(modelName)
            .messages(convertMessages(prompt.getInstructions()))
            .temperature(options.getTemperature())
            .maxTokens(options.getMaxTokens())
            .build();
        
        GenerationResult result = gen.call(param);
        // 转换为 Spring AI ChatResponse
        return toChatResponse(result);
    }

    @Override
    public Flux<ChatResponse> stream(Prompt prompt) {
        Generation gen = new Generation();
        GenerationParam param = GenerationParam.builder()
            .apiKey(apiKey)
            .model(modelName)
            .messages(convertMessages(prompt.getInstructions()))
            .incrementalOutput(true)  // 流式输出
            .build();
        
        return Flux.create(sink -> {
            gen.streamCall(param, new ResultCallback<GenerationResult>() {
                @Override
                public void onMessage(GenerationResult message) {
                    sink.next(toChatResponse(message));
                }
                @Override
                public void onComplete() { sink.complete(); }
                @Override
                public void onError(Exception e) { sink.error(e); }
            });
        });
    }
}
```

**工作量：** 中等。需要补齐与现有 Spring AI 使用方式兼容的同步/流式适配，预计约 250-400 行代码。

**关键注意：** 阶段 1 仅替换 `modules/ai` 中 DashScope Chat/Embedding 的 Spring AI 适配层。`com.bytedesk.ai.voice_agent` 中只有 ReactAgent/WebSocket/AudioConfig 等演示适配会在阶段 2 停用；`VoiceAgentService` 与正式 REST/DTO 链路保留。

**运行期注意：** native `dashscope-sdk-java` 在显式指定 `baseHttpUrl` 时，会在该基础地址后继续拼接 `/services/...`。因此官方 DashScope 地址必须归一化到包含 `/api/v1` 的基础地址，例如 `https://dashscope.aliyuncs.com/api/v1`；如果只传 `https://dashscope.aliyuncs.com`，流式请求会落到 `/services/...` 并返回 404。

**参考：** 项目中已有的 `SpringAIDashscopeService.java` 和 `SpringAIDashscopeChatConfig.java` 可直接改造。

### 2.2 DashScope EmbeddingModel 替换

**当前实现：** `DashScopeEmbeddingModel`（实现 Spring AI `EmbeddingModel` 接口）

**替换方案：** 基于 `dashscope-sdk-java` 的 `TextEmbedding` API 实现自定义 `EmbeddingModel`

目标版本为 `dashscope-sdk-java:2.22.24`。当前已基于 2.22.x jar 初步确认以下 API 形态，正式实施前需结合本地源码目录和 2.22.24 jar 二次复核：

- `com.alibaba.dashscope.embeddings.TextEmbedding`
- `TextEmbeddingResult call(TextEmbeddingParam)`
- `void call(TextEmbeddingParam, ResultCallback<TextEmbeddingResult>)`

```java
// 概念示意：BytedeskDashScopeEmbeddingModel
public class BytedeskDashScopeEmbeddingModel implements EmbeddingModel {
    
    @Override
    public List<float[]> embed(List<String> texts, EmbeddingOptions options) {
        TextEmbedding embedding = new TextEmbedding();
        TextEmbeddingParam param = TextEmbeddingParam.builder()
            .apiKey(apiKey)
            .model(modelName)
            .texts(texts)
            .build();
        
        TextEmbeddingResult result = embedding.call(param);
        return result.getOutput().getEmbeddings().stream()
            .map(e -> e.getEmbedding())
            .collect(Collectors.toList());
    }
}
```

**工作量：** 中等。需要实现 `EmbeddingModel` 接口并核对向量维度、批量行为、异常映射，预计约 120-200 行代码。

#### 影响文件

- `SpringAIDashscopeEmbeddingConfig.java` — 改为使用自定义 Bean
- `EmbeddingSettingsKbaseVectorStoreResolver.java` — 更新注入类型
- `EmbeddingSettingsRestService.java` — 更新注入类型
- `EmbeddingModelInfoService.java` — 更新注入类型

### 2.3 DashScope TTS/ASR 处理

**当前实现：** `DashScopeAudioSpeechApi`、`DashScopeAudioTranscriptionApi`、`DashScopeAudioSpeechModel`、`DashScopeAudioTranscriptionModel`

**处理方案：** 这些 Spring AI Alibaba 音频适配类目前只出现在 `com.bytedesk.ai.voice_agent` 演示包中。该包已确认为演示代码，阶段 2 直接整体注释掉，不在阶段 1 单独重构 `VoiceAgentAudioConfig`。

真实 TTS/ASR 运行链路继续使用项目已有的 `dashscope-sdk-java` 原生 SDK 实现：

```java
// 项目中已有的原生 SDK 使用模式（无需改动）
import com.alibaba.dashscope.audio.ttsv2.SpeechSynthesizer;
import com.alibaba.dashscope.audio.ttsv2.SpeechSynthesisParam;
import com.alibaba.dashscope.audio.asr.recognition.Recognition;
import com.alibaba.dashscope.audio.asr.recognition.RecognitionParam;
```

**工作量：** 无新增改造。阶段 1 不处理 VoiceAgent；阶段 2 注释掉演示包即可。

**参考：** 项目中已有的 `CosyVoiceTtsService`、`QwenAudioTtsService`、`AsrService` 等。

### 2.4 Agent Framework 清理

**已修订：** `com.bytedesk.ai.alibaba.*`（42 个文件）为演示代码；`com.bytedesk.ai.voice_agent` 中 ReactAgent/WebSocket/AudioConfig 等 8 个演示适配文件停用，正式 DTO/服务/REST 入口保留。处理后项目中不再有任何对 `spring-ai-alibaba-agent-framework` 的运行时依赖。

#### 2.4.1 注释掉演示代码

| 包 | 文件数 | 处理 |
| ------ | -------- | ------ |
| `com.bytedesk.ai.alibaba.*`（agents/weather/memory/skills/struct_output/audio/utils） | 42 | 注释掉 |
| `com.bytedesk.ai.voice_agent` 演示适配 | 8 | 注释掉 |
| `com.bytedesk.ai.voice_agent` 正式 DTO/服务/REST | 6 + package-info | 保留编译 |
| `enterprise/call` 中 voice-agent 入口 | 4 | 保留编译并运行单测 |

**工作量：低。** 停用 Alibaba 演示适配，同时保留正式语音坐席链路。

> **修订后的结论：正式语音坐席不依赖 spring-ai-alibaba-agent-framework；只需停用依赖该框架的演示适配。**

### 2.5 POM 依赖注释（保留不删除）

在 `pom.xml` 中可注释掉：

```xml
<spring-ai-alibaba.version>1.1.2.2</spring-ai-alibaba.version>
<spring-ai-alibaba-extensions.version>1.1.2.2</spring-ai-alibaba-extensions.version>
```

但要注意：

- `spring-ai-alibaba.version` 在注释掉 `spring-ai-alibaba-bom` 与相关依赖后，先保留为注释；后续若确认没有回滚需求，再单独评估物理清理
- `spring-ai-alibaba-extensions.version` 只有在 `modules/ai` 不再引用对应扩展依赖后，才可进入后续物理清理评估

在 `modules/ai/pom.xml` 和 `enterprise/ai/pom.xml` 中注释掉：

- `spring-ai-alibaba-bom` 的 `dependencyManagement` 导入（注释掉，暂不删除）

## 3. 分阶段实施方案

### 阶段 1：DashScope API 层替换（最优先，先解除 starter-dashscope 锁定）

**目标：** 用 `dashscope-sdk-java` 替换 `spring-ai-alibaba-starter-dashscope` / `spring-ai-alibaba-dashscope` 提供的 Chat / Embedding / TTS / ASR 功能，但**暂不立即动 agent-framework**。

> 本阶段的直接交付物是“替代实现 + POM 注释停用”，不是物理删除依赖行；删除动作留待后续确认完全稳定后再做。

#### 阶段 1 任务清单

| # | 任务 | 模块 | 工作量 |
| --- | ------ | ------ | -------- |
| 1.1 | 新建 `BytedeskDashScopeChatModel` 实现 `ChatModel` + `StreamingChatModel` | `modules/ai` | 中 |
| 1.2 | 新建 `BytedeskDashScopeChatOptions` POJO | `modules/ai` | 低 |
| 1.3 | 新建 `BytedeskDashScopeEmbeddingModel` 实现 `EmbeddingModel` | `modules/ai` | 中 |
| 1.4 | 新建 `BytedeskDashScopeEmbeddingOptions` POJO | `modules/ai` | 低 |
| 1.5 | 更新 `SpringAIDashscopeChatConfig` 使用自定义 Bean | `modules/ai` | 低 |
| 1.6 | 更新 `SpringAIDashscopeEmbeddingConfig` 使用自定义 Bean | `modules/ai` | 低 |
| 1.7 | 更新 `EmbeddingSettingsKbaseVectorStoreResolver` 注入类型 | `modules/ai` | 低 |
| 1.8 | 更新 `EmbeddingSettingsRestService` 注入类型 | `modules/ai` | 低 |
| 1.9 | 更新 `EmbeddingModelInfoService` 注入类型 | `modules/ai` | 低 |
| 1.10 | 更新 `SpringAIDashscopeChatController` / `SpringAIDashscopeChatService` 的 Options import | `modules/ai` | 低 |
| 1.11 | 更新 `SpringAIDashscopeService` 的默认模型注入、动态 options 与动态 model 构造 | `modules/ai` | 中 |
| 1.12 | 保留原有 Bean 名称：`bytedeskDashscopeChatModel`、`bytedeskDashscopeChatOptions`、`dashscopeEmbeddingModel` | `modules/ai` | 低 |
| 1.13 | 将 `${dashscope-sdk-java.version}` 更新到 `2.22.24`，并用最小编译用例或 `javap` 复核 `GenerationParam`、`TextEmbeddingParam` builder 字段名 | `modules/ai` | 低 |

> **注意：** 原任务 1.11（重构 VoiceAgentAudioConfig）和 1.12（替换 DashScopeModel 枚举）已取消。`com.bytedesk.ai.voice_agent` 整包确认为演示代码，将在阶段 2 直接注释掉，无需在阶段 1 单独处理。

**完成后可注释掉：** `spring-ai-alibaba-starter-dashscope`、`spring-ai-alibaba-dashscope` 依赖

##### 阶段 1 实施注意事项

- **建议新增包位置：** 优先放在 `modules/ai/src/main/java/com/bytedesk/ai/springai/providers/dashscope/` 下，避免跨模块暴露新适配层。可命名为 `BytedeskDashScopeChatModel`、`BytedeskDashScopeChatOptions`、`BytedeskDashScopeEmbeddingModel`、`BytedeskDashScopeEmbeddingOptions`。
- **Chat 默认 Bean 链：** `SpringAIDashscopeChatConfig` 当前注册 `bytedeskDashscopeApi`、`bytedeskDashscopeChatOptions`、`bytedeskDashscopeChatModel`、`bytedeskDashscopeChatClient`。替换时应移除 `DashScopeApi` / `DashScopeChatModel` / `DashScopeChatOptions` 依赖，但保留 `bytedeskDashscopeChatOptions` 和 `bytedeskDashscopeChatModel` Bean 名称，避免 `ChatModelPrimaryConfig` 和调用方失效。
- **Chat 动态构造链：** `SpringAIDashscopeService.createDashscopeOptions()`、`createDashscopeApi()`、`createDashscopeChatModel()` 仍直接使用 Spring AI Alibaba 类型。阶段 1 必须改为项目自有 options/model 构造，并让字段类型从 `DashScopeChatModel` 降为 `ChatModel` 或项目自有类型，否则 POM 注释后仍会编译失败。
- **Chat 调用链：** `SpringAIDashscopeChatController` 和 `SpringAIDashscopeChatService` 目前仅依赖 `DashScopeChatOptions` 构造 `Prompt`。替换时应只改 options 类型和 builder 字段映射，保持现有 `ChatModel` 注入、同步调用和流式调用行为不变。
- **Embedding 维度兼容：** DashScope text-embedding-v1/v2 输出 1536 维，v3 可配置维度（默认 1024）。替换 `DashScopeEmbeddingModel` 后，需确保 `BytedeskDashScopeEmbeddingModel` 的 `dimensions()` 返回值与向量存储（Elasticsearch / PGVector）的索引维度一致，否则向量检索会失效。
- **Chat Options 引用链：** `SpringAIDashscopeChatController` 和 `SpringAIDashscopeChatService` 直接依赖 `com.alibaba.cloud.ai.dashscope.chat.DashScopeChatOptions`，在阶段 1 注释停用依赖前必须改为引用 `BytedeskDashScopeChatOptions`。
- **Embedding Bean 名称必须保持不变：** `EmbeddingModelPrimaryConfig` 使用 `requireEmbeddingModel("dashscopeEmbeddingModel", ...)` 按 Bean 名查找。因此 `SpringAIDashscopeEmbeddingConfig` 中注册的 Bean 名 `"dashscopeEmbeddingModel"` 必须在替换为 `BytedeskDashScopeEmbeddingModel` 后保留，否则主 EmbeddingModel 选择逻辑会失效。
- **`EmbeddingModelInfoService` 的类型注入：** 当前直接注入 `DashScopeEmbeddingModel` 类型，替换后需改为注入 `EmbeddingModel` 接口或 `BytedeskDashScopeEmbeddingModel`。
- **`EmbeddingSettings*` 的构造函数调用链：** `EmbeddingSettingsKbaseVectorStoreResolver.buildDashscopeEmbeddingModel()` 和 `EmbeddingSettingsRestService.buildDashscopeEmbeddingModel()` 是通过 `new DashScopeApi(...)` / `new DashScopeEmbeddingModel(api, metadataMode, options)` 直接构造对象，而不是从 Spring 容器注入。替换时需要改写为 `new BytedeskDashScopeEmbeddingModel(apiKey, options)`，并移除对 `DashScopeApi` 的依赖。
- **Embedding 默认 Bean 链：** `SpringAIDashscopeEmbeddingConfig` 当前注册 `bytedeskDashscopeEmbeddingApi`、`bytedeskDashscopeEmbeddingOptions`、`dashscopeEmbeddingModel`。替换后可移除 `bytedeskDashscopeEmbeddingApi` Bean，保留 `dashscopeEmbeddingModel` Bean 名称；`bytedeskDashscopeEmbeddingOptions` 可替换为项目自有 options 类型。
- **Embedding 动态构造链：** `EmbeddingSettingsKbaseVectorStoreResolver.buildDashscopeEmbeddingModel()` 和 `EmbeddingSettingsRestService.buildDashscopeEmbeddingModel()` 两处都通过 DB 配置动态构造 DashScope embedding。二者必须共用同一套项目自有构造方式，避免默认配置能编译而知识库按配置切换时仍依赖 Alibaba 类型。
- **自动配置冲突：** `spring-ai-alibaba-starter-dashscope` 的 `DashScopeAutoConfiguration` 会尝试注册 `DashScopeChatModel` Bean。在注释停用依赖前，需要确认项目没有通过 `@ConditionalOnMissingBean` 绕过冲突的隐式注册；建议在替换后先用 `spring.autoconfigure.exclude` 显式排除，再注释 POM 依赖。

##### 阶段 1 代码改造分组

| 分组 | 文件 | 必须完成的变更 |
| --- | --- | --- |
| Chat 默认 Bean | `SpringAIDashscopeChatConfig.java` | 用项目自有 model/options 替换 `DashScopeApi`、`DashScopeChatModel`、`DashScopeChatOptions`；保留 Bean 名 |
| Chat 动态模型 | `SpringAIDashscopeService.java` | 将字段/构造参数从 `DashScopeChatModel` 改为 `ChatModel` 或自有类型；替换 `createDashscopeOptions()` / `createDashscopeChatModel()` |
| Chat 调用示例 | `SpringAIDashscopeChatController.java`、`SpringAIDashscopeChatService.java` | 替换 `DashScopeChatOptions` import 与 builder；保持 `ChatModel` 调用方式 |
| Embedding 默认 Bean | `SpringAIDashscopeEmbeddingConfig.java` | 用项目自有 embedding model/options 替换 Alibaba 类型；保留 `dashscopeEmbeddingModel` Bean 名 |
| Embedding 动态配置 | `EmbeddingSettingsKbaseVectorStoreResolver.java`、`EmbeddingSettingsRestService.java` | 替换 `DashScopeApi` / `DashScopeEmbeddingModel` / `DashScopeEmbeddingOptions` 直接构造 |
| Embedding 信息查询 | `EmbeddingModelInfoService.java` | 将 DashScope 注入类型改为 `EmbeddingModel` 或自有类型；保留 provider 展示逻辑 |

##### 阶段 1 替换完成判定

以下命令应只命中文档或注释，不应命中 `modules/ai/src/main/java` 的有效 import/类型引用：

```bash
rg "com\.alibaba\.cloud\.ai\.dashscope|DashScopeApi|DashScopeChatModel|DashScopeChatOptions|DashScopeEmbeddingModel|DashScopeEmbeddingOptions" modules/ai/src/main/java
```

#### 阶段 1 结束时暂不承诺

- 还不能注释停用 `spring-ai-alibaba-agent-framework`
- 还不能物理清理根 `pom.xml` 中全部阿里相关版本属性
- `com.bytedesk.ai.voice_agent` 和 `com.bytedesk.ai.alibaba` 演示代码暂不处理（阶段 2 统一注释）

#### 验收标准

1. `./starter/mvnw -f pom.xml -pl modules/ai -am -DskipTests compile` 通过
2. `./starter/mvnw -f pom.xml -pl enterprise/ai -am -DskipTests compile` 通过
3. DashScope Chat/Embedding/TTS/ASR 功能与替换前行为一致

### 阶段 2：Agent Framework 清理（解除深层依赖）

**目标：** 注释掉 `spring-ai-alibaba-agent-framework` 依赖（POM 中注释，暂不删除物理行）。

**已修订：** 所有使用 `spring-ai-alibaba-agent-framework` 的代码均为演示代码；正式语音坐席链路保留且不依赖该框架。

#### 任务清单

| # | 任务 | 工作量 |
| --- | ------ | -------- |
| 2.1 | 注释掉 `com.bytedesk.ai.alibaba.*` 全部文件（42 个） | 极低 |
| 2.2 | 注释掉 `com.bytedesk.ai.voice_agent` 中 ReactAgent/WebSocket/AudioConfig 演示适配文件 | 极低 |
| 2.3 | 保留 `enterprise/call` 中 voice-agent 入口并恢复相关测试编译 | 低 |
| 2.4 | 注释掉 `spring-ai-alibaba-agent-framework` 依赖与 BOM | 极低 |
| 2.5 | 注释掉根 `pom.xml` 版本属性 | 极低 |

#### 阶段 2 验收标准

1. `./starter/mvnw -f pom.xml -pl enterprise/ai -am -DskipTests compile` 通过
2. `./starter/mvnw -f pom.xml -pl enterprise/call -am -DskipTests compile` 通过
3. `com.bytedesk.ai.alibaba` 和 `com.bytedesk.ai.voice_agent` 演示适配代码已注释掉，正式语音坐席 DTO/服务/REST 与 call 入口保留编译
4. `spring-ai-alibaba-agent-framework` 依赖已在 POM 中注释掉

### 阶段 3：全量回归验证

#### 阶段 3 任务清单

| # | 任务 |
| --- | ------ |
| 3.1 | 全仓编译：`./starter/mvnw -f pom.xml -DskipTests install` |
| 3.2 | 运行 `modules/ai` 单元测试 |
| 3.3 | 运行 `enterprise/ai` 单元测试 |
| 3.4 | 启动 starter 验证 DashScope Chat 对话（包含 `/visitor/api/v1/message/sse` 与 `POST /api/v1/ai/chat/completions`） |
| 3.5 | 启动 starter 验证 DashScope Embedding 知识库向量化（知识库文档入库 + 向量检索） |
| 3.6 | 启动 starter 验证 TTS 语音合成（`POST /api/v1/ai/tts/synthesize`） |
| 3.7 | 启动 starter 验证 ASR 语音识别（`POST /api/v1/ai/asr/transcribe`） |
| 3.8 | 启动 starter 验证电话语音坐席正式入口（`/visitor/api/v1/call/voice-agent/*`）；ReactAgent/WebSocket 演示入口跳过 |
| 3.9 | 依赖树复查：确认运行时不再解析出 `spring-ai-alibaba-starter-dashscope`、`spring-ai-alibaba-dashscope`、`spring-ai-alibaba-agent-framework` |
| 3.10 | 若后续紧接着启动 Spring Boot 4.x 分支，再执行 §14.2 的 ES 9.x 升级前检查；不与本次依赖清理混在同一提交 |

## 4. 风险与应对

| 风险 | 等级 | 应对 |
| ------ | ------ | ------ |
| `dashscope-sdk-java` 的 `Generation` API 行为与 spring-ai-alibaba 包装层有差异 | 中 | 阶段 1 完成后先做同步/流式对比测试，验证文本、finish reason、错误映射 |
| DashScope 官方 `baseUrl` 从兼容模式切到 native SDK 时，若归一化为域名根而非 `/api/v1`，SSE 会请求到错误路径并返回 404 | — | **已解决** — 通过 `DashScopeBaseUrlSupport` 统一归一化到 `https://dashscope.aliyuncs.com/api/v1`，`/visitor/api/v1/message/sse` 已实测通过 |
| VoiceAgent 的流式事件模型依赖 `ReactAgent.streamMessages()`，迁移后事件语义可能变化 | — | **已消除** — `com.bytedesk.ai.voice_agent` 确认为演示代码，直接注释掉，无需重构 |
| `dashscope-sdk-java` 从 2.22.18 升级到 2.22.24 可能引入不兼容变更 | 低 | 先参考本地源码目录和 2.22.24 jar 复核 `Generation` / `TextEmbedding` API，再实现适配层 |
| Spring Boot 4.x 升级需同步升级 ES 镜像到 9.x | 中 | 见 §14.1；IK 分词插件、Kibana、Logstash 均需同步升级，且建议作为本规划完成后的独立升级批次 |
| 项目其他依赖间接依赖 spring-ai-alibaba | 低 | `mvn dependency:tree` 验证无传递性依赖 |
| 注释停用后缺少 DashScope 的 Spring Boot AutoConfiguration | 低 | 自定义 Bean 通过 `@Configuration` + `@ConditionalOnProperty` 显式注册 |
| 根 `pom.xml` 的阿里扩展版本属性被过早物理清理 | 低 | 本次只注释保留；等 `modules/ai` 中相关扩展引用清理完且无需回滚后，再单独评估是否物理清理 |

> **已消除的风险：** "误把示例代码当生产代码"和"VoiceAgent 运行时重构"风险已消除 — `com.bytedesk.ai.alibaba` 和 `com.bytedesk.ai.voice_agent` 两个包全部确认为演示代码，注释掉即可。

## 5. 本次依赖处理

以下依赖在本规划内按不同策略处理：

| 依赖 | 处理 | 说明 |
| ------ | ------ | ------ |
| `dashscope-sdk-java` | 升级到 `2.22.24` | 作为替代实现的基础 SDK，仍无 Spring 依赖 |
| `spring-ai-alibaba-graph-core` | 不单独处理 | 已在 enterprise/ai 中注释掉，当前未使用 |
| `spring-ai-alibaba-starter-graph-observation` | 不单独处理 | 已在 enterprise/ai 中注释掉，当前未使用 |

## 6. 工作量估算

| 阶段 | 内容 | 预估工作量 | 风险等级 |
| ------ | ------ | ----------- | ---------- |
| 阶段 1 | DashScope API 替换（ChatModel/EmbeddingModel） | 2-4 天 | 中 |
| 阶段 2 | 注释演示代码 + 注释 agent-framework 依赖 | 极低（< 0.5 天） | 极低 |
| 阶段 3 | 全量回归验证 | 1 天 | 低 |
| **合计** | | **3-4.5 天** | |

> **简化说明：** `com.bytedesk.ai.alibaba` 和 `com.bytedesk.ai.voice_agent` 两个包全部确认为演示代码，无需任何运行时重构。仅需注释掉代码 + 注释 POM 依赖。

## 7. 实施顺序建议

```bash
# 第一批（低风险，快速见效）
阶段 1: DashScope API 替换
    → 编译通过 ✅
    → 注释掉 spring-ai-alibaba-starter-dashscope / spring-ai-alibaba-dashscope 依赖 ✅
    → DashScope Chat/Embedding 功能验证 ✅

# 第二批（注释演示代码，注释停用 agent-framework）
阶段 2: 注释掉 com.bytedesk.ai.alibaba + com.bytedesk.ai.voice_agent（共 57 个文件）
    → 注释掉 enterprise/call 中的交叉引用
    → 编译通过 ✅
    → 注释掉 spring-ai-alibaba-agent-framework 依赖 ✅

# 最终验证
阶段 3: 全量回归
    → 所有测试通过 ✅
    → 启动验证 ✅

# 后续独立批次（不要与本次依赖清理混提）
阶段 4: Spring Boot 4.x / Elasticsearch 9.x 升级
    → 先完成 §14.2 升级前检查
    → 先做快照与回滚预案
    → 再升级 ES/Kibana/Logstash/IK 与 Spring Data ES 客户端
```

## 8. 编译验证命令

```bash
# 阶段 1 验证
./starter/mvnw -f pom.xml -pl modules/ai -am -DskipTests compile
./starter/mvnw -f pom.xml -pl enterprise/ai -am -DskipTests compile

# 全仓验证
./starter/mvnw -f pom.xml -DskipTests install

# 依赖树检查（确认无 spring-ai-alibaba 残留）
./starter/mvnw -f pom.xml dependency:tree | grep -i "alibaba"
```

## 9. 与 spring-ai-alibaba 2.0.0-M1.1 方案的对比

| 维度 | 注释停用 + dashscope-sdk-java 替代 | 升级到 2.0.0-M1.1 |
| ------ | -------------------------- | ------------------- |
| **版本稳定性** | ✅ dashscope-sdk-java 是 GA 版本 | ❌ 2.0.0-M1.1 是里程碑版本 |
| **项目已有经验** | ✅ 8 个文件已在用原生 SDK | ❌ 需要验证 API 兼容性 |
| **Spring AI 2.x 兼容** | ✅ 完全解耦 | ⚠️ 理论兼容，实际待验证 |
| **维护负担** | 中等增加（预计 400-700 行自定义适配代码） | 无（第三方维护） |
| **升级路径** | 直接升级到 Spring Boot 4.x | 需等 2.0.0 GA 发布 |
| **Agent Framework** | 演示代码注释停用；后续如需生产化再自建 | 保留但 API 可能有 Breaking Changes |

**建议：** 优先采用“注释停用 + dashscope-sdk-java 替代”方案。理由：

1. `dashscope-sdk-java` 已在项目中验证可用
2. 避免依赖 Milestone 版本的不确定性
3. 自定义 ChatModel/EmbeddingModel 代码量可控（预计 400-700 行，取决于 token usage、stream metadata、异常映射完整度）
4. Agent Framework 中大量 Hooks/Interceptors 当前未见运行时装配证据，不必一开始就全部迁移
5. 完全解除对 spring-ai-alibaba 的版本锁定

## 10. 推荐执行策略

经过代码审查与 2026-07-31 修订确认，使用 spring-ai-alibaba 的代码分为两类：

- `com.bytedesk.ai.alibaba.*`（42 个文件）— 演示代码
- `com.bytedesk.ai.voice_agent` 中 ReactAgent/WebSocket/AudioConfig 等文件 — 演示适配
- `com.bytedesk.ai.voice_agent` 中 DTO、`VoiceAgentService`、REST 入口及 `enterprise/call` voice-agent 入口 — 正式语音坐席功能，保留编译

推荐路线：

1. 先注释掉 `spring-ai-alibaba-starter-dashscope` 和 `spring-ai-alibaba-dashscope`，用 `dashscope-sdk-java` 替代
2. 注释掉 `com.bytedesk.ai.alibaba` 包和 `com.bytedesk.ai.voice_agent` 中 Alibaba 演示适配文件
3. 保留 `enterprise/call` 中 voice-agent 正式入口与测试
4. 注释掉 `spring-ai-alibaba-agent-framework` 依赖
5. 注释掉根 `pom.xml` 的相关版本属性

## 11. 阶段准入与退出门禁

为避免一次性注释停用多个依赖导致问题来源难以定位，建议每个阶段都设置明确门禁。

### 11.1 阶段 1 准入条件

进入 DashScope API 替换前，需要先确认：

1. `modules/ai` 和 `enterprise/ai` 当前在未改造状态下可编译，或已记录所有既有编译失败。
2. 先将 `${dashscope-sdk-java.version}` 固定为 `2.22.24`，本阶段不再继续顺手升级到其他版本。
3. API key、模型名、base URL、超时、流式开关等配置项先保持现有命名兼容，不强制用户改配置文件。
4. Chat / Embedding 的替代实现先服务 Spring AI 1.1.2 当前接口，避免把 Spring AI 2.x 升级混入同一阶段。

### 11.2 阶段 1 退出条件

阶段 1 只有满足以下条件后，才注释掉 `spring-ai-alibaba-starter-dashscope` 和 `spring-ai-alibaba-dashscope`：

1. `modules/ai` 中不存在 `com.alibaba.cloud.ai.dashscope.*` 导入。
2. `enterprise/ai` 中不存在 `com.alibaba.cloud.ai.dashscope.*` 导入。
3. `DashScopeChatModel`、`DashScopeEmbeddingModel`、`DashScopeApi`、`DashScopeChatOptions`、`DashScopeEmbeddingOptions` 均已替换为项目自有适配或原生 SDK 调用。
4. `DashScopeModel` 枚举引用仅存在于 `com.bytedesk.ai.voice_agent`（演示代码），阶段 2 注释后自然解除。
5. 阶段 1 编译验证通过。

### 11.3 阶段 2 准入条件

进入 Agent Framework 清理前，需要先确认：

1. `spring-ai-alibaba-starter-dashscope` / `spring-ai-alibaba-dashscope` 已在 POM 中注释掉并通过编译。
2. `com.bytedesk.ai.alibaba` 和 `com.bytedesk.ai.voice_agent` 已确认为演示代码。
3. `enterprise/call` 中对 voice_agent 的交叉引用已识别。

### 11.4 阶段 2 退出条件

阶段 2 只有满足以下条件后，才注释掉 `spring-ai-alibaba-agent-framework` 和 `spring-ai-alibaba-bom`：

1. 全仓（不含已注释的演示代码）不存在 `com.alibaba.cloud.ai.graph.*` 导入。
2. 全仓（不含已注释的演示代码）不存在 `ReactAgent`、`RunnableConfig`、`OverAllState`、`GraphRunnerException` 引用。
3. `com.bytedesk.ai.alibaba` 和 `com.bytedesk.ai.voice_agent` 下代码已注释掉，编译通过。
4. POM 中 `spring-ai-alibaba-*` 依赖已注释掉，编译通过。

## 12. 回滚策略

建议按两个可回滚批次执行，而不是一次性提交全部变更。

### 12.1 阶段 1 回滚

如果 DashScope Chat / Embedding 替代层出现行为差异或编译问题：

1. 保留新建的 `BytedeskDashScope*` 类，但暂时不注册为默认 Bean。
2. 恢复 `SpringAIDashscopeChatConfig` / `SpringAIDashscopeEmbeddingConfig` 的旧 Bean 注册。
3. 暂缓解除 POM 中 `spring-ai-alibaba-starter-dashscope` / `spring-ai-alibaba-dashscope` 的注释。
4. 用配置开关在旧实现和新实现之间切换，便于对比输出。

### 12.2 阶段 2 回滚

如果注释演示代码后出现编译问题：

1. 取消注释 `com.bytedesk.ai.alibaba` 和 `com.bytedesk.ai.voice_agent` 目录下的文件（从 git 恢复）。
2. 保持 `spring-ai-alibaba-agent-framework` 在 POM 中的注释状态不变。
3. 只提交阶段 1 的 DashScope API 替换成果，阶段 2 单独延期。

## 13. 依赖残留检查清单

完成每个阶段后都应执行以下静态检查：

```bash
rg "com\.alibaba\.cloud\.ai\.dashscope" modules/ai enterprise/ai
rg "com\.alibaba\.cloud\.ai\.graph|ReactAgent|RunnableConfig|OverAllState|GraphRunnerException" enterprise/ai
rg "spring-ai-alibaba" pom.xml modules/ai/pom.xml enterprise/ai/pom.xml modules/pom.xml
./starter/mvnw -f pom.xml -pl modules/ai,enterprise/ai -am -DskipTests dependency:tree | grep -i "spring-ai-alibaba"
```

预期结果：

| 阶段 | dashscope 适配包残留 | graph / agent-framework 残留 | POM 依赖残留 |
| ------ | --------------------- | ------------------------------- | -------------- |
| 阶段 1 完成 | 无 | 允许存在 | 只允许 `spring-ai-alibaba-agent-framework` / BOM 暂存 |
| 阶段 2 完成 | 无 | 无（演示代码已注释） | POM 中 `spring-ai-alibaba-*` 依赖已注释 |
| 全部完成 | 无 | 无 | 根版本属性已注释 |

## 14. 后续升级路线

完成 spring-ai-alibaba 依赖停用后，升级路径变为：

```bash
# 第一步：升级 Spring AI
spring-ai.version: 1.1.2 → 2.0.0

# 第二步：升级 Spring Boot
spring-boot-starter-parent: 3.5.16 → 4.1.0

# 第三步：升级其他 Java 配套
springdoc-openapi: 2.8.8 → 3.0.3
flowable: 7.2.0 → 8.0.0

# 第四步：升级 Elasticsearch 镜像（Spring Boot 4.x → SD ES 6.x → 需要 ES 9.x）
# compose-base.yaml:
#   elasticsearch:8.18.0  → 9.x
#   logstash:8.18.0       → 9.x
#   kibana:8.18.0         → 9.x
#   IK 分词插件: elasticsearch-analysis-ik-8.18.0.zip → 9.x 对应版本
```

### 14.1 Elasticsearch 版本兼容说明

本节属于“后续升级路线”的约束，不是本次依赖清理批次的直接实施项。当前批次只需确保现有 ES 8.x 运行链路不被破坏；只有在启动 Spring Boot 4.x / Spring Data Elasticsearch 6.x 升级时，才进入本节门禁。

根据 [Spring Data Elasticsearch 官方版本矩阵](https://docs.spring.io/spring-data/elasticsearch/reference/elasticsearch/versions.html)：

| Spring Boot | Spring Data Release | SD Elasticsearch | ES Server 要求 |
| --- | --- | --- | --- |
| 3.5.x（当前） | 2025.0 | 5.5.x | **8.x**（当前 8.18.0） |
| 4.x | 2026.0 | 6.1.x | **9.4.2**（ES 9.4.4 已发布） |

> ⚠️ **ES 客户端大版本必须匹配服务端大版本。** Spring Boot 4.x 捆绑的 Spring Data Elasticsearch 6.x 使用 ES 9.x 客户端，与 ES 8.x 服务端不兼容。升级 Spring Boot 4.x 时必须同步升级 ES 镜像到 9.x。
>
> 参考：[Upgrading to Elastic 9.x](https://www.elastic.co/guide/en/enterprise-search/current/upgrading-to-9-x.html)

### 14.2 ES 8→9 升级注意事项

以下为 ES 9.x 的主要 Breaking Changes，对本项目可能产生影响：

#### 必须检查项

| 检查项 | 命令 / 说明 | 影响评估 |
| --- | --- | --- |
| **Legacy index templates** | `GET _template` — v1 `_template` API 已移除 | 如有遗留模板，需迁移为 composable index templates (`PUT _index_template`) |
| **Legacy `_freeze` API** | 已移除，如有 frozen indices 需先 unfreeze | 本项目 unlikely 使用 |
| **7.x 索引** | 如有从 ES 7.x 继承的索引，需 reindex 到 8.x 格式 | 检查 `GET _cat/indices` 中的索引版本 |
| **Upgrade Assistant** | 升级前运行 `GET _migration/system_features` | 官方工具，自动检测兼容问题 |
| **Metadata field mappings** | `_id`、`_source` 等不再接受 `type`/`fields`/`copy_to`/`boost` | 检查现有 mapping 中是否有这些参数 |

#### REST API 兼容模式

ES 9.x 提供兼容模式，允许使用 8.x 语法调用 9.x API：

```http
# 请求头方式
Accept: application/vnd.elasticsearch+json;compatible-with=8
Content-Type: application/vnd.elasticsearch+json;compatible-with=8
```

通过 Spring Data Elasticsearch 使用时，大部分 API 兼容由框架自动处理。

#### Java 客户端变更

| 变更 | 影响 |
| --- | --- |
| `elasticsearch-java` 9.0 目标 Java 17 | ✅ 项目已使用 Java 21，无影响 |
| `RestClient` 改为可选依赖，新增 `Rest5Client` | Spring Data ES 内部处理，无需关注 |
| `indicesBoost`、`dynamicTemplates` 类型变更 | Spring Data ES 封装层已适配 |

#### 推荐升级步骤

```bash
# 1. 先升级到 ES 8.x 最新版（当前项目已是 8.18.0，满足条件）
# 2. 运行 Upgrade Assistant 检查
# 3. 处理遗留 index templates（如有）
# 4. 创建索引快照备份
# 5. 升级 ES 镜像到 9.x
# 6. 同步升级 Kibana、Logstash 到 9.x
# 7. 升级 IK 分词插件到 9.x 兼容版本
# 8. 用知识库索引重建/回填接口验证 IK 与 mapping 兼容性
```

## 15. 实施清单

按以下顺序执行：

### 阶段 1：DashScope API 替换

1. 将根 `pom.xml` 的 `${dashscope-sdk-java.version}` 从 `2.22.18` 更新到 `2.22.24`
2. 参考 `/Users/ningjinpeng/Desktop/Git/Github/open/dashscope-sdk-java` 的 `v2.22.24` 标签与 2.22.24 jar，复核 `GenerationParam`、`TextEmbeddingParam` builder 字段名
3. 新建 `BytedeskDashScopeChatModel` + `BytedeskDashScopeChatOptions`（`modules/ai`）
4. 新建 `BytedeskDashScopeEmbeddingModel` + `BytedeskDashScopeEmbeddingOptions`（`modules/ai`）
5. 更新 `SpringAIDashscopeChatConfig`、`SpringAIDashscopeEmbeddingConfig` 使用新 Bean
6. 更新 3 个 Embedding 相关文件注入类型
7. 更新 `SpringAIDashscopeChatController` / `SpringAIDashscopeChatService` 的 Options import
8. 注释掉 `modules/ai/pom.xml` 和 `enterprise/ai/pom.xml` 中的 `starter-dashscope` / `dashscope` 依赖
9. 运行阶段 1 编译验证

### 阶段 2：Agent Framework 清理

1. 注释掉 `enterprise/ai/src/main/java/com/bytedesk/ai/alibaba/` 目录下所有文件（42 个文件）
2. 注释掉 `enterprise/ai/src/main/java/com/bytedesk/ai/voice_agent/` 目录下依赖 ReactAgent/WebSocket/AudioConfig 的演示适配文件
3. 保留 `enterprise/call` 中 voice-agent 正式入口（2 个生产文件 + 2 个测试文件）
4. 注释掉 `spring-ai-alibaba-agent-framework` 依赖与 BOM（POM 中注释，暂不删除）
5. 注释掉根 `pom.xml` 版本属性

### 阶段 3：验证

 1. 运行全量编译验证
 2. 运行全量回归测试
 3. 运行依赖残留检查，确认 `spring-ai-alibaba` 只存在于注释与规划文档
 4. 若同周期准备推进 Spring Boot 4.x，再额外执行 §14.2 的 ES 9.x 升级前检查与快照备份，不与本次提交混合

## 16. 补充建议

1. 当前这份规划建议拆成两个提交批次：第一批完成 DashScope 替代与依赖注释停用，第二批再注释演示代码；语音坐席正式 call 入口应保留并随批次验证。
2. Spring Boot 4.x / ES 9.x 升级建议单独成文或单独开一个实施分支，避免把依赖清理、框架升级、搜索基础设施升级绑定成一次性变更。

## 17. 参考资源

| 资源 | 地址 |
| ------ | ------ |
| dashscope-sdk-java GitHub | `https://github.com/dashscope/dashscope-sdk-java` |
| dashscope-sdk-java Maven | `https://mvnrepository.com/artifact/com.alibaba/dashscope-sdk-java` |
| dashscope-sdk-java 本地源码 | `/Users/ningjinpeng/Desktop/Git/Github/open/dashscope-sdk-java`（使用 `v2.22.24` 标签对照） |
| Spring AI 2.0 Migration Guide | `https://docs.spring.io/spring-ai/reference/upgrade-notes.html` |
| Spring Boot 4.0 Migration Guide | `https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide` |
| Spring Data ES 版本矩阵 | `https://docs.spring.io/spring-data/elasticsearch/reference/elasticsearch/versions.html` |
| Elasticsearch 8→9 升级指南 | `https://www.elastic.co/guide/en/enterprise-search/current/upgrading-to-9-x.html` |
| spring-ai-alibaba 2.x 分支 | `https://github.com/alibaba/spring-ai-alibaba/tree/2.x` |
| elasticsearch github versions | `https://github.com/elastic/elasticsearch/releases` |
