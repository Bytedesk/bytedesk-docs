---
sidebar_label: TTS能力介绍
sidebar_position: 28
---

# TTS 能力介绍

微语客服系统支持 TTS（Text To Speech，文本转语音）能力，可将文本内容实时合成为语音，用于客服播报、语音回复、辅助沟通、无障碍服务和 AI 语音交互等场景。

## 一、TTS 可以解决什么问题

在客服业务中，很多场景不仅需要文字回复，也需要更自然的语音表达。例如面向老年用户、弱阅读用户、电话场景、语音接待场景，或者客服希望快速播放标准话术时，文本转语音会显著提升沟通效率。

接入 TTS 后，微语可以帮助企业实现：

- 将客服文本消息直接播报为语音
- 将标准回复、通知、引导语自动合成为语音
- 为 AI 客服、语音机器人、电话场景提供语音输出能力
- 让知识、话术和流程具备更自然的语音交互方式

## 二、微语已支持的 TTS 能力

当前版本已支持以下 TTS 相关能力：

### 1. 管理后台 TTS 测试与配置

管理后台已提供独立的 TTS 测试入口，可直接输入文本并执行语音合成，便于管理员验证参数、试听效果并确认当前组织下的 TTS 能力是否可用。

当前页面已支持以下测试能力：

- 输入待合成文本并立即执行 TTS
- 按语言筛选可用音色，当前界面可见语言包括简体中文、粤语/繁体中文、英语、日语、韩语、法语、德语、西班牙语
- 查看音色名称、音色编码、适用场景、特质、是否支持 SSML / Instruct / 时间戳等元信息
- 对部分已接入本地试听资源的音色直接播放预览音频
- 选择音频输出格式，如 mp3、wav
- 在高级设置中查看 DashScope TTS 模型说明与适用场景

测试调用会同步记录到 TtsEntity 表中，方便运营分析、问题排查和能力验证；列表页可直接查看文本内容、模型、语言、音色、执行状态、音频结果与创建时间，并支持单条删除和批量删除。

![tts](/img/tts/tts.png)

### 自定义音色

从最新实现来看，这里的“自定义音色”更准确地说是“音色浏览与选择辅助”。页面会根据当前语言过滤出可用音色，并展示音色说明与试听信息，帮助管理员快速确认适合业务场景的声音风格。

需要注意的是，当前后台测试链路默认仍以系统默认音色为主，页面主要承担以下作用：

- 快速检索和浏览当前模型支持的系统音色
- 查看音色适用场景，例如客服播报、语音助手、专业播报等
- 判断某个音色是否具备本地试听资源，或是否需要跳转官方音色列表进一步试听
- 在正式接入前完成语言与音色兼容性确认

![tts_yinse](/img/tts/tts_yinse.png)

### 自定义模型

结合最新后台实现，这里的“自定义模型”建议理解为“模型选型说明与高级参数确认”。当前页面已经整理了 DashScope TTS 的多种模型能力说明，包括高质量、低成本、低延迟、多语言、教育朗读、品牌定制等不同方向，便于管理员做选型评估。

现阶段的后台测试链路已固定在 DashScope TTS 能力范围内，默认执行模型为 cosyvoice-v3-flash。页面保留模型候选、标签说明和官方文档入口，主要用于：

- 了解不同模型的适用场景与注意事项
- 对比 plus / flash / v1 / v2 / v3 系列的能力差异
- 为后续正式配置或版本扩展提供选型依据
- 避免在不兼容模型下误配系统音色

![tts_model](/img/tts/tts_model.png)

### 2. 客服工作台文本消息语音播放

在 desktop 客服端中，客服可对文本消息使用右键菜单，直接执行语音播放。

这项能力适用于：

- 快速试听客服或客户的文本内容
- 在忙碌场景下通过听音代替阅读
- 辅助多任务处理和长文本浏览

系统优先走后端 TTS 合成链路，在适配场景下可将文本转换为语音进行播放。

### 语音播放文本消息

![tts_text_message](/img/tts/tts_text_message.png)

## 三、项目 TTS 配置说明

微语的 TTS 能力当前主要基于 DashScope 提供。对接时建议重点关注以下配置项。

### 1. 启用音频与 TTS 能力

项目首先通过统一的音频模型开关声明当前音频能力提供方：

```properties
spring.ai.model.audio=dashscope
spring.ai.model.audio.speech=none
spring.ai.model.audio.transcription=none
spring.ai.dashscope.enabled=true
spring.ai.dashscope.audio.synthesis.enabled=true
```

这些配置的含义是：

- `spring.ai.model.audio=dashscope`：将项目音频能力默认路由到 DashScope
- `spring.ai.dashscope.enabled=true`：启用 DashScope 提供方
- `spring.ai.dashscope.audio.synthesis.enabled=true`：启用语音合成能力

其中 `spring.ai.model.audio.speech` 当前保留为 `none`，实际 TTS 调用链路主要由项目内部的 DashScope TTS 实现承接，而不是直接依赖通用的 Spring AI speech 自动路由。

### 2. DashScope API Key 与端点

当前项目使用阿里云百炼官方端点：

```properties
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com
spring.ai.dashscope.api-key=ENC(...)
# spring.ai.dashscope.audio.synthesis.api-key=
```

这里需要注意：

- `spring.ai.dashscope.base-url` 指向百炼正式接口地址
- `spring.ai.dashscope.api-key` 是全局 DashScope Key，可同时服务于文本、TTS、ASR 等能力
- `spring.ai.dashscope.audio.synthesis.api-key` 是可选的 TTS 专用 Key；如果未单独配置，系统会自动回退到 `spring.ai.dashscope.api-key`

这意味着企业可以在统一密钥管理和 TTS 专用密钥隔离之间自由选择。如果没有特殊权限隔离要求，直接复用全局 DashScope Key 即可。

### 3. TTS 默认模型与默认音色

当前项目里已经显式定义了 TTS 的默认模型和默认音色：

```properties
spring.ai.dashscope.audio.synthesis.options.model=cosyvoice-v3-flash
spring.ai.dashscope.audio.synthesis.options.voice=longanhuan
```

这两个配置在当前实现里不仅用于后端执行默认值，也会同步到管理后台的表单默认值与测试链路，因此它们是“项目级默认配置”，而不是仅限底层 SDK 的备用参数。

它们的作用分别是：

- `spring.ai.dashscope.audio.synthesis.options.model`：定义默认使用的 TTS 模型，当前为 `cosyvoice-v3-flash`
- `spring.ai.dashscope.audio.synthesis.options.voice`：定义默认使用的系统音色，当前为 `longanhuan`

如果企业希望统一切换默认声音风格，或者后续测试其他 CosyVoice 系列模型，优先调整这里即可。

### 4. 项目级 TTS 默认语言与音频格式

除了 DashScope 提供方配置，项目还维护了一组更贴近业务表单与执行接口的默认参数：

```properties
bytedesk.ai.tts.language=zh-CN
bytedesk.ai.tts.audio-format=mp3
```

它们的意义是：

- `bytedesk.ai.tts.language`：管理台和执行接口共享的默认语言
- `bytedesk.ai.tts.audio-format`：管理台和执行接口共享的默认输出音频格式

当前默认组合为 `zh-CN + mp3`，比较适合中文客服、标准播报和网页端直接播放场景。如果企业更关注高保真存档、后续语音分析或本地音频编辑，可考虑切换到 `wav`。

### 5. Docker Compose 部署下的配置说明

如果项目通过 Docker Compose 部署，那么同一套 TTS 配置会以环境变量形式出现在容器编排文件中，例如 [deploy/docker/compose-app-bytedesk.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose-app-bytedesk.yaml)。

在 Compose 场景下，properties 写法与环境变量写法的关系大致如下：

```properties
spring.ai.model.audio=dashscope
spring.ai.dashscope.enabled=true
spring.ai.dashscope.audio.synthesis.enabled=true
spring.ai.dashscope.audio.synthesis.api-key=
spring.ai.dashscope.audio.synthesis.options.model=cosyvoice-v3-flash
spring.ai.dashscope.audio.synthesis.options.voice=longanhuan
bytedesk.ai.tts.language=zh-CN
bytedesk.ai.tts.audio-format=mp3
```

对应到 Compose 环境变量通常是：

```yaml
SPRING_AI_MODEL_AUDIO: dashscope
SPRING_AI_DASHSCOPE_ENABLED: "true"
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED: "true"
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_API_KEY: ${SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_API_KEY:-}
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_OPTIONS_MODEL: cosyvoice-v3-flash
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_OPTIONS_VOICE: longanhuan
BYTEDESK_AI_TTS_LANGUAGE: zh-CN
BYTEDESK_AI_TTS_AUDIO_FORMAT: mp3
```

这里可以重点关注 4 类变量：

- `SPRING_AI_MODEL_AUDIO`：声明音频能力默认 provider
- `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED`：显式开启 DashScope TTS
- `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_OPTIONS_MODEL` 与 `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_OPTIONS_VOICE`：定义容器部署下的默认模型与默认音色
- `BYTEDESK_AI_TTS_LANGUAGE` 与 `BYTEDESK_AI_TTS_AUDIO_FORMAT`：定义管理台表单和执行接口共享的默认业务参数

需要注意的是，当前仓库里的 Compose 示例默认将：

- `SPRING_AI_MODEL_AUDIO` 配成了 `zhipuai`
- `SPRING_AI_DASHSCOPE_ENABLED` 配成了 `false`
- `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED` 配成了 `false`

这意味着如果直接使用当前默认 Compose 配置启动，DashScope TTS 实际上是关闭状态，管理后台虽然能看到相关功能入口，但真实执行链路不会按 DashScope TTS 工作。

如果你希望在 Docker Compose 部署中启用当前文档所描述的 DashScope TTS，至少需要把这些变量调整为：

```yaml
SPRING_AI_MODEL_AUDIO: dashscope
SPRING_AI_DASHSCOPE_ENABLED: "true"
SPRING_AI_DASHSCOPE_API_KEY: ${SPRING_AI_DASHSCOPE_API_KEY:-}
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED: "true"
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_API_KEY: ${SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_API_KEY:-}
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_OPTIONS_MODEL: cosyvoice-v3-flash
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_OPTIONS_VOICE: longanhuan
BYTEDESK_AI_TTS_LANGUAGE: zh-CN
BYTEDESK_AI_TTS_AUDIO_FORMAT: mp3
```

其中：

- 如果 `SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_API_KEY` 留空，系统会回退到 `SPRING_AI_DASHSCOPE_API_KEY`
- 如果只是快速验证能力，保留 `cosyvoice-v3-flash + longanhuan + mp3` 即可
- 如果要做生产部署，建议配合 `.env` 文件或 CI/CD Secret 管理 API Key，而不要直接把明文 Key 写进 Compose 文件

### 6. 推荐配置方式

对于大多数企业接入，建议按下面顺序完成配置：

- 确认 `spring.ai.model.audio=dashscope`
- 确认 `spring.ai.dashscope.enabled=true`
- 配置 `spring.ai.dashscope.api-key`，必要时单独补充 `spring.ai.dashscope.audio.synthesis.api-key`
- 根据业务选择默认模型，例如保留 `cosyvoice-v3-flash`
- 根据品牌调性或客服场景调整 `spring.ai.dashscope.audio.synthesis.options.voice`
- 根据前端播放与存储需求设置 `bytedesk.ai.tts.audio-format` 为 `mp3` 或 `wav`

如果只是本地开发或管理后台试听验证，保持当前配置即可直接使用；如果是面向生产环境，建议同时明确音色策略、密钥隔离策略和音频存储策略。

## 四、典型应用场景

### 1. 客服标准话术播报

- 将常见回复、服务说明、流程提醒转换为语音
- 降低重复朗读成本
- 保持话术表达一致性
- 支持在上线前通过后台测试页先确认音色、语言和输出格式

### 2. AI 语音回复基础能力

- 机器人或大模型生成文本后，通过 TTS 输出语音
- 为后续语音客服、电话客服、数字人客服提供基础能力
- 支撑更自然的人机对话体验
- 可通过后台执行记录持续观察合成成功率、失败原因和音频输出效果

### 3. 无障碍和多场景交互

- 适配不方便阅读文本的用户群体
- 适配耳机、外呼、音频播报等场景
- 提升移动办公和复杂业务场景下的信息获取效率

## 五、能力价值

微语 TTS 能力的核心价值在于：

- 将静态文本转化为可听内容
- 提升客服响应效率和沟通自然度
- 为 AI 语音化输出提供统一基础设施
- 为电话、音频客服、智能助手等场景打好能力底座

## 六、推荐使用方式

建议企业按照以下方式使用 TTS：

- 先在管理后台完成文本转语音测试，确认语言、默认音色、模型说明和输出格式
- 在客服工作台中使用文本消息语音播放能力
- 借助后台执行记录持续排查失败任务、验证音频结果并沉淀运营数据
- 逐步将 TTS 与机器人、AI 助手、语音通知和电话场景打通

## 七、总结

微语已具备面向客服场景的 TTS 基础能力，包括后台测试、语言与音色辅助选择、模型选型说明、文本转语音记录沉淀以及桌面端文本消息语音播放。对于需要语音播报、标准话术复用、AI 语音输出的企业来说，TTS 是建设智能客服和语音客服体系的重要基础能力。

## 八、阿里云参考链接

- 阿里云 TTS 模型说明：[阿里云 Model Studio TTS 文档](https://help.aliyun.com/zh/model-studio/text-to-speech)
- 阿里云 CosyVoice 音色列表：[阿里云 CosyVoice 音色列表](https://help.aliyun.com/zh/model-studio/cosyvoice-voice-list)
