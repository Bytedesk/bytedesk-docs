---
sidebar_label: DashScope
sidebar_position: 4
---

# DashScope Integration

本頁說明如何將微語對接阿里雲 DashScope 模型，並將 DashScope 作為預設模型提供商。

:::tip 前置條件

- 已完成微語系統部署
- 已在阿里雲百鍊建立 DashScope API Key
:::

## 配置步驟

### 1. 建立 API Key

1. 開啟 DashScope 控制台：[https://bailian.console.aliyun.com/?apiKey=1#/api-key](https://bailian.console.aliyun.com/?apiKey=1#/api-key)
2. 登入阿里雲帳號
3. 建立 API Key
4. 妥善保存產生的金鑰

### 2. 配置微語管理後台

1. 登入微語管理後台
2. 進入 provider 或 API Key 配置頁
3. 填入 DashScope API Key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 選擇模型提供商

1. 進入 AI 模型設定頁
2. 選擇 DashScope 作為預設提供商
3. 儲存設定

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 嵌入聊天程式碼

1. 在管理後台找到取得聊天程式碼選項
2. 複製產生的嵌入碼
3. 加入你的網站或應用程式

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，網站聊天元件即可呼叫 DashScope 驅動的 AI 能力。

![DashScope chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

### Docker 環境變數

```bash
SPRING_AI_DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode
SPRING_AI_DASHSCOPE_API_KEY=sk-xxx
SPRING_AI_DASHSCOPE_CHAT_ENABLED=true
SPRING_AI_DASHSCOPE_CHAT_OPTIONS_MODEL=deepseek-r1
SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED=false
SPRING_AI_DASHSCOPE_IMAGE_ENABLED=false
SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED=true
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED=false
```

### 原始碼配置

```bash
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com/compatible-mode
spring.ai.dashscope.api-key=sk-xxx
spring.ai.dashscope.chat.enabled=true
spring.ai.dashscope.chat.options.model=deepseek-r1
spring.ai.dashscope.chat.options.temperature=0.7
spring.ai.dashscope.chat.options.topP=3
spring.ai.dashscope.audio.transcription.enabled=false
spring.ai.dashscope.image.enabled=false
spring.ai.dashscope.embedding.enabled=true
spring.ai.dashscope.audio.synthesis.enabled=false
```

## 常見問題

1. API Key 無效：確認金鑰正確且已啟用。
2. 回應較慢：檢查網路延遲並調整模型參數。
3. 功能異常：確認相關開關已開啟。

## 相關資源

- [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.11c67980m5X2VR#/model-market)
- [Spring AI DashScope](https://docs.spring.io/spring-ai/reference/api/chat/dashscope-chat.html)
- [微語文件中心](/docs/intro)
