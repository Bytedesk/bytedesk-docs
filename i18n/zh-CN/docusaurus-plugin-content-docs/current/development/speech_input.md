---
sidebar_label: 语音转文字输入
sidebar_position: 55
---

# 语音转文字输入

本文说明如何从服务端配置 DashScope API Key，到在 管理后台开启工具栏语音输入按钮，并在客服端/访客端使用“语音转文字输入”。

## 1. 服务端配置（DashScope）

语音输入依赖后端 `/ai/speech/realtime/ws-url` 与 `/ai/speech/realtime/relay`，请先开启音频转写并配置 API Key。

### 1.1 `.properties` 配置示例

可在 `starter/src/main/resources/properties/local/70-ai-batch-liquibase.properties`（或你的 profile 对应文件）增加：

```properties
# DashScope 基础配置
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com
spring.ai.dashscope.api-key=sk-xxx

# 开启语音转写能力（必须）
spring.ai.dashscope.audio.transcription.enabled=true

# 可选：优先使用音频转写专用 key（未配置时回退到 spring.ai.dashscope.api-key）
spring.ai.dashscope.audio.transcription.api-key=

# 可选：实时识别模型（默认 paraformer-realtime-v2）
spring.ai.dashscope.audio.transcription.realtime-model=paraformer-realtime-v2
```

> 说明：
>
> - `spring.ai.dashscope.audio.transcription.enabled=true` 是语音功能生效的前置条件。
> - `spring.ai.dashscope.audio.transcription.api-key` 未配置时，会自动回退到 `spring.ai.dashscope.api-key`（以及环境变量 `DASHSCOPE_API_KEY`）。

### 1.1.1 多环境建议

- `open/noai`：默认可保持关闭；按需打开后再配置 key。

### 1.2 Docker Compose 配置示例

在 `docker-compose*.yaml` 的服务环境变量中配置：

```yaml
environment:
  SPRING_AI_DASHSCOPE_BASE_URL: https://dashscope.aliyuncs.com
  SPRING_AI_DASHSCOPE_API_KEY: sk-xxx
  SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED: "true"
  SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_REALTIME_MODEL: paraformer-realtime-v2
```

修改后重启服务。

> 注意：仓库内大多数 `docker-compose*.yaml` 默认是 `SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED: "false"`，上线语音输入前请显式改为 `"true"`。

## 2. 管理后台开启语音输入按钮

## 客服端

### 首先在管理后台开启客服端语音输入

![desktop_speech_settings.png](/img/speech_input/desktop_speech_settings.png)

### 点击客服端输入框上方 语音转文字按钮

![desktop_speech_input.png](/img/speech_input/desktop_speech_input.png)

### 点击开始录音

录音完毕时，点击停止录音

![desktop_speed_recording.png](/img/speech_input/desktop_speech_recording.png)

### 识别结果

![desktop_speech_result.png](/img/speech_input/desktop_speech_result.png)

### 使用识别结果

将识别结果自动填充到输入框

![desktop_speech_autofill.png](/img/speech_input/desktop_speech_autofill.png)

## 访客端

### 首先在管理后台开启访客端语音输入

![visitor_speech_settings.png](/img/speech_input/visitor_speech_settings.png)

### 点击访客端输入框上方 语音转文字按钮

![visitor_speech_input.png](/img/speech_input/visitor_speech_input.png)

### 点击访客端“开始录音”

录音完毕时，点击停止录音

![visitor_speed_recording.png](/img/speech_input/visitor_speech_recording.png)

### 访客端识别结果

支持复制识别结果

![visitor_speech_result.png](/img/speech_input/visitor_speech_result.png)

### 访客端使用识别结果

将识别结果自动填充到输入框

![visitor_speech_autofill.png](/img/speech_input/visitor_speech_autofill.png)

## 3. 验证清单

完成配置后建议按以下顺序验证：

1. 打开 `GET /ai/speech/realtime/ws-url`，返回 `wsUrl/model/sampleRate`。
2. 在 管理后台 对应页面确认 `语音转文字输入` 开关已开启并保存。
3. 打开 Visitor/Desktop 聊天窗口，确认工具栏出现“语音转文字输入”按钮。
4. 录音并点击“使用识别结果”，检查文本是否回填到输入框。

## 4. 常见问题

### 4.1 看不到“语音转文字输入”按钮

- 检查后台 `工具栏` 或 `客服端快捷回复` 是否开启 `语音转文字输入`。
- 检查当前环境是否关闭了调试开关（`IS_DEBUG` 关闭时，调试专用按钮可能被隐藏）。

### 4.2 点击录音后提示失败

- 检查浏览器麦克风权限是否允许。
- 检查服务端 `spring.ai.dashscope.audio.transcription.enabled` 是否为 `true`。
- 检查 `spring.ai.dashscope.api-key` / `spring.ai.dashscope.audio.transcription.api-key` 是否有效。

### 4.3 识别成功但未填入输入框

- 确认点击的是“使用识别结果”（仅停止录音不会自动填入）。
- 升级到包含最近输入框回填修复的版本（已同步 visitor/desktop）。
