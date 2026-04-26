---
sidebar_label: OpenRouter
sidebar_position: 8
---

# OpenRouter Integration

本頁說明如何將微語對接 OpenRouter，並透過統一 API 入口把請求路由到多個上游模型。

:::tip 前置條件

- 已完成微語部署
- 已建立 OpenRouter API Key
:::

## 配置步驟

### 1. 建立 API Key

1. 開啟 [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. 登入 OpenRouter 帳號
3. 建立 API Key
4. 妥善保存金鑰

### 2. 配置管理後台

1. 登入微語管理後台
2. 開啟 provider 配置頁
3. 填入 OpenRouter 金鑰

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 選擇 OpenRouter

1. 開啟 AI 模型設定
2. 選擇 OpenRouter 作為預設提供商
3. 儲存設定

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 發佈聊天程式碼

1. 在管理後台產生嵌入碼
2. 複製結果
3. 整合到你的網站

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，微語可透過 OpenRouter 存取多個 LLM 提供商。

![OpenRouter chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

### Docker 環境變數

```bash
SPRING_AI_OPENROUTER_BASE_URL=https://openrouter.ai/api
SPRING_AI_OPENROUTER_API_KEY=sk-xxx
SPRING_AI_OPENROUTER_CHAT_ENABLED=true
SPRING_AI_OPENROUTER_CHAT_OPTIONS_MODEL=openrouter/auto
SPRING_AI_OPENROUTER_CHAT_OPTIONS_TEMPERATURE=0.7
```

### 原始碼配置

```bash
spring.ai.openrouter.base-url=https://openrouter.ai/api
spring.ai.openrouter.api-key=sk-xxx
spring.ai.openrouter.chat.enabled=true
spring.ai.openrouter.chat.options.model=openrouter/auto
spring.ai.openrouter.chat.options.temperature=0.7
```

## 常見問題

1. 金鑰無效：確認 OpenRouter 金鑰可用。
2. 回應較慢：檢查上游模型選擇與網路延遲。
3. 結果不穩定：必要時改用固定模型，不要使用 `openrouter/auto`。

## 相關資源

- [OpenRouter Docs](https://openrouter.ai/docs)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/)
- [微語文件中心](/docs/intro)
