---
sidebar_label: 实时语音对话
sidebar_position: 2
---

# 实时语音对话

微语实时语音对话是基于阿里云 **Qwen-Audio Realtime** 大模型构建的端到端语音交互功能。用户通过浏览器麦克风与 AI 进行实时语音对话，体验低延迟、高表现力的语音交互。

:::tip 版本说明
社区版不支持，请升级到企业版或平台版。请替换 [licenseKey](../development/license.md)
:::

## 功能概览

- **实时语音对话**：WebSocket 全双工通信，浏览器采集麦克风音频流，服务端中继到 Qwen-Audio，实时返回 AI 语音和文本。
- **自动连接**：页面加载后自动连接服务，AI 主动语音打招呼。
- **语音打断**：支持声学 VAD 和智能语义轮次两种自动打断模式，用户说话时自动打断 AI 正在播放的语音。
- **音频波形可视化**：实时显示麦克风输入和 AI 输出的音频波形，直观感知对话状态。
- **多模型 / 多音色**：支持 Qwen-Audio Realtime Plus 和 Flash 模型，可选多种系统音色。
- **回声抑制**：支持扬声器模式下开启回声抑制，耳机模式下关闭以获得更好的打断体验。
- **对话记录**：实时显示语音转文字结果，方便回溯对话内容。

## 架构

```bash
┌──────────────┐       WebSocket        ┌──────────────────┐       WebSocket        ┌─────────────────┐
│  浏览器前端   │ ◄──────────────────────► │  微语后端中继服务  │ ◄──────────────────────► │  Qwen-Audio     │
│  (visitorCall)│   ws://host:9003/...   │ TtsRealtime-     │  wss://dashscope...  │  Realtime API   │
│              │                         │ WebSocketHandler │                       │                 │
│  麦克风采集   │ ──── input_audio ────► │  双向转发 JSON    │ ──── input_audio ───► │  VAD / ASR /    │
│  扬声器播放   │ ◄── response.audio ─── │  (base64 音频)    │ ◄── response.audio ── │  LLM / TTS      │
└──────────────┘                        └──────────────────┘                       └─────────────────┘
```

- **前端**：`visitorCall` 应用中的 TtsRealtime 页面，负责麦克风采集、PCM 编码、WebSocket 通信和音频播放。
- **后端中继**：`TtsRealtimeWebSocketHandler` 作为 WebSocket 中继，将浏览器消息透明转发到 Qwen-Audio Realtime API，并将 AI 响应原样返回给浏览器。
- **Qwen-Audio Realtime**：阿里云提供的端到端实时语音大模型服务，支持 VAD 语音检测、ASR 语音识别、LLM 对话生成和 TTS 语音合成。

### 音频格式

| 方向 | 格式 | 规格 |
| --- | --- | --- |
| 浏览器麦克风 → 后端 | PCM (base64) | 16kHz 采样率，16bit 位深，单声道 |
| Qwen-Audio → 后端 → 浏览器 | PCM (base64) | 24kHz 采样率，16bit 位深，单声道 |

## 快速体验

### 在线测试

访问 `visitorCall` 应用的[实时语音对话页面](http://cdn.weiyuai.cn/call/tts-realtime)：

```bash
http://cdn.weiyuai.cn/call/tts-realtime
```

![tts_realtime](/img/tts/tts_realtime.png)

![tts_realtime_settings](/img/tts/tts_realtime_settings.png)

页面加载后自动连接服务，AI 会主动打招呼。点击 **"开始对话"** 对着麦克风说话即可。

### 通过电话体验（FreeSWITCH）

拨打 **9205** 分机号，接通后 AI 会自动打招呼，随后即可进行实时语音对话。

> 需要启用 FreeSWITCH 的 [mod_audio_stream](../callcenter/freeswitch_audio_stream.md) 模块，并在 `.env` 中配置 `FREESWITCH_QWEN_REALTIME_MEDIA_BRIDGE_ENABLED=true`。

## 交互模式

微语实时语音对话支持三种交互模式，通过设置面板切换（连接前可修改）：

### server_vad（声学 VAD）

服务端基于声学特征自动检测语音起止。参数可调：

- **threshold**：VAD 灵敏度，取值范围 [-1.0, 1.0]，默认 0.5。值越低越灵敏。
- **silence_duration_ms**：静音超时时间（毫秒），取值范围 [200, 6000]，默认 800。超时后触发 AI 响应。

适合大多数对话场景，无需手动控制。

### smart_turn（智能语义轮次）

融合声学感知与语义理解，智能判断轮次边界。无意义附和声（如"嗯""啊"）不会打断对话，交互更自然流畅。

适合需要更精准轮次判断的场景。

### manual（手动控制）

客户端完全控制录音起止。点击 **"开始对话"** 开始录音，点击 **"停止对话"** 结束并触发 AI 响应。

适合需要精确控制发言时机的场景（如演讲辅助、翻译等）。

## 配置说明

### 后端配置

在 `application.properties` 中配置 DashScope API Key 和 WebSocket 地址：

```properties
# DashScope API Key（必填）
spring.ai.dashscope.api-key=sk-xxxxxxxxxxxx

# Qwen-Audio Realtime WebSocket 地址（可选，默认为公共端点）
bytedesk.ai.tts.realtime.ws-url=wss://dashscope.aliyuncs.com/api-ws/v1/realtime
```

API Key 获取方式：

1. 登录 [阿里云百炼控制台](https://bailian.console.aliyun.com/)
2. 创建并获取 API Key
3. 开通 Qwen-Audio 模型服务

### 模型选择

| 模型 | 说明 |
| --- | --- |
| `qwen-audio-3.0-realtime-plus` | 旗舰版，效果最佳，推荐使用 |
| `qwen-audio-3.0-realtime-flash` | 轻量版，响应更快，成本更低 |

### 音色选择

| 音色名称 | 说明 |
| --- | --- |
| `longanqian` | 龙小倩 — 默认女声 |
| `longanlingxin` | 龙灵心 |
| `longanlingxi` | 龙灵犀 |
| `longanxiaoxin` | 龙小欣 |
| `longanlufeng` | 龙陆风 — 男声 |

> 音色仅可在连接时设置，连接后不可修改。如需切换，请先断开再重新连接。

## 前端集成

### 页面组件

实时语音对话页面位于 `frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx`，核心功能：

- **自动连接**：页面加载 300ms 后自动建立 WebSocket 连接
- **音频采集**：使用 Web Audio API（`getUserMedia` + `ScriptProcessorNode`）采集 16kHz 单声道 PCM
- **base64 编码**：分块编码（32KB/块）避免 `String.fromCharCode` 参数溢出
- **音频播放**：独立 AudioContext（24kHz）流式解码播放 AI 语音
- **语音打断**：收到 `input_audio_buffer.speech_started` 事件时清空播放队列
- **波形可视化**：实时 RMS 音量计算 + CSS 动画柱状波形，区分用户说话（蓝色）和 AI 说话（绿色）

### WebSocket 端点

```bash
ws://{host}:9003/visitor/api/v1/tts/realtime?model={model}
```

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| `model` | 模型名称 | `qwen-audio-3.0-realtime-plus` |

端点无需鉴权，通过 `TtsRealtimeWebSocketConfig` 注册，允许所有来源跨域访问。

### 消息协议

前后端之间直接传递 Qwen-Audio Realtime 的 JSON 事件协议，中继服务不做解析和转换。

**浏览器发送的关键事件**：

| 事件类型 | 说明 |
| --- | --- |
| `session.update` | 配置会话参数（模型、音色、交互模式等） |
| `input_audio_buffer.append` | 发送麦克风音频数据（base64 编码的 PCM） |

**浏览器接收的关键事件**：

| 事件类型 | 说明 |
| --- | --- |
| `session.created` / `session.updated` | 会话状态通知 |
| `input_audio_buffer.speech_started` | VAD 检测到用户开始说话（触发打断） |
| `input_audio_buffer.speech_stopped` | VAD 检测到用户停止说话 |
| `conversation.item.input_audio_transcription.completed` | 用户语音转文字结果 |
| `response.audio_transcript.done` | AI 回复文本结果 |
| `response.audio.delta` | AI 回复语音片段（base64 PCM，增量推送） |
| `response.done` | AI 本轮回复完成 |
| `error` | 错误信息 |

## 限制与建议

- **上下文容量**：模型保留最近 20 轮对话（可上调至 50 轮），累计音频时长上限 300 秒。
- **网络要求**：建议在稳定的网络环境下使用，网络抖动可能导致语音卡顿。
- **浏览器兼容**：需要浏览器支持 `getUserMedia` 和 Web Audio API（Chrome、Edge、Firefox、Safari 均支持）。
- **HTTPS 部署**：生产环境需使用 HTTPS，否则浏览器可能拒绝麦克风权限请求。WebSocket 需使用 `wss://` 协议。
- **建议使用耳机**：耳机模式下可关闭回声抑制以获得更好的语音打断体验。

## 更多参考

- [Qwen-Audio 实时语音对话](https://help.aliyun.com/zh/model-studio/qwen-audio-realtime-user-guides)
- [Qwen-Audio 实时语音对话 API](https://help.aliyun.com/zh/model-studio/qwen-audio-realtime-websocket-api)
- [Qwen-Audio Realtime WebSocket API 文档](https://help.aliyun.com/zh/model-studio/qwen-audio-realtime-websocket-api)
- [实时 TTS 用户指南](https://help.aliyun.com/zh/model-studio/realtime-tts-user-guide)
- [非实时 TTS 用户指南](https://help.aliyun.com/zh/model-studio/non-realtime-tts-user-guide)
- [Qwen-Audio-3.0-Realtime-Plus 模型详情](https://bailian.console.aliyun.com/cn-beijing/?#/model-market/detail/qwen-audio-3.0-realtime-plus?serviceSite=asia-pacific-china)
- [Qwen-Audio-3.0-Realtime-Flash 模型详情](https://bailian.console.aliyun.com/cn-beijing/?tab=model#/model-market/detail/qwen-audio-3.0-realtime-flash?serviceSite=asia-pacific-china)
- [阿里云百炼控制台](https://bailian.console.aliyun.com/)
- [API Key 获取指南](https://help.aliyun.com/zh/model-studio/get-api-key)
