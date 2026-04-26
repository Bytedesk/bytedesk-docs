---
sidebar_label: Ollama
sidebar_position: 2
---

# Ollama Integration

本頁說明如何將微語對接本地 Ollama 服務，並在聊天與 embedding 場景中使用自託管模型。

:::tip 前置條件

- 已完成微語部署
- 已安裝並啟動 Ollama
- 已拉取所需本地模型
:::

## 配置步驟

### 1. 安裝 Ollama

1. 前往 [https://ollama.ai/download](https://ollama.ai/download)
2. 安裝對應作業系統版本
3. 啟動 Ollama 服務

### 2. 拉取模型

```bash
ollama pull qwen3:0.6b
```

### 3. 配置微語

1. 登入微語管理後台
2. 進入 provider 配置
3. 選擇 Ollama 為預設模型提供商

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 嵌入聊天元件

1. 在管理後台產生聊天程式碼
2. 複製結果
3. 嵌入到你的網站

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

設定完成後，微語可呼叫本地託管的 Ollama 模型提供 AI 對話。

![Ollama chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

### Docker 環境變數

```bash
SPRING_AI_OLLAMA_BASE_URL=http://host.docker.internal:11434
SPRING_AI_OLLAMA_CHAT_ENABLED=true
SPRING_AI_OLLAMA_CHAT_OPTIONS_MODEL=qwen3:0.6b
SPRING_AI_OLLAMA_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_OLLAMA_EMBEDDING_ENABLED=true
SPRING_AI_OLLAMA_EMBEDDING_OPTIONS_MODEL=qwen3:0.6b
```

### 原始碼配置

```bash
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.chat.enabled=true
spring.ai.ollama.chat.options.model=qwen3:0.6b
spring.ai.ollama.chat.options.temperature=0.7
spring.ai.ollama.embedding.enabled=true
spring.ai.ollama.embedding.options.model=qwen3:0.6b
```

## 常見問題

1. 服務連線失敗：檢查 Ollama 服務與 URL。
2. 模型載入失敗：確認模型已在本地拉取。
3. 回應過慢：檢查主機資源，必要時改用較小模型。

## 相關資源

- [Ollama Docs](https://ollama.ai/docs)
- [Spring AI Ollama](https://docs.spring.io/spring-ai/reference/api/chat/ollama-chat.html)
- [微語文件中心](/docs/intro)
