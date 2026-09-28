---
sidebar_label: Anthropic
sidebar_position: 9
---

# Anthropic Integration

本頁說明如何將微語對接 Anthropic Claude 模型，並將 Anthropic 設為預設聊天提供商。

:::tip 前置條件

- 已完成微語部署
- 已建立 Anthropic API Key
:::

## 配置步驟

### 1. 建立 API Key

1. 開啟 Anthropic Console：[https://console.anthropic.com/](https://console.anthropic.com/)
2. 登入或建立帳號
3. 在控制台建立 API Key
4. 保存產生的金鑰

### 2. 配置管理後台

1. 登入微語管理後台
2. 開啟提供商配置頁
3. 填入 Anthropic API Key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 選擇提供商

1. 開啟 AI 模型設定
2. 將 Anthropic 設為預設提供商
3. 儲存變更

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 發布聊天程式碼

1. 在管理後台找到 Get Chat Code
2. 複製產生的程式碼
3. 嵌入到你的網站

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，網站對話可使用 Anthropic 支援的 AI 對話能力。

![Anthropic chat effect](/img/deploy/provider/provider-chat.png)

## 建議模型

微語目前在 provider metadata 中提供以下 Anthropic 文本模型：

| Model | Recommendation | Notes |
| --- | --- | --- |
| claude-sonnet-4-5 | 建議預設 | 目前此倉庫中的 Spring AI Anthropic 配置預設值 |
| claude-3-5-sonnet-20240620 | 穩定替代 | 與 provider metadata 中的模型清單一致 |
| claude-3-opus-20240229 | 複雜任務 | 能力更強，通常成本更高 |
| claude-3-haiku-20240307 | 輕量任務 | 更快且成本更低 |

## 可選配置

### Docker 環境變數

```bash
SPRING_AI_ANTHROPIC_BASE_URL=https://api.anthropic.com
SPRING_AI_ANTHROPIC_API_KEY=sk-ant-xxx
SPRING_AI_ANTHROPIC_CHAT_ENABLED=true
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_MODEL=claude-sonnet-4-5
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_MAX_TOKENS=4096
```

### 原始配置

```bash
spring.ai.anthropic.base-url=https://api.anthropic.com
spring.ai.anthropic.api-key=sk-ant-xxx
spring.ai.anthropic.chat.enabled=true
spring.ai.anthropic.chat.options.model=claude-sonnet-4-5
spring.ai.anthropic.chat.options.temperature=0.7
spring.ai.anthropic.chat.options.max-tokens=4096
```

## 常見問題

1. API Key 無效：請檢查 Anthropic Console 中的金鑰與組織權限。
2. 模型不可用：請切換為帳號可用的其他 Claude 模型。
3. 回應慢或成本高：可降低 max tokens，或改用較輕量的 Haiku 模型。

## 相關資源

- [Anthropic Console](https://console.anthropic.com/)
- [Spring AI Anthropic](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)
- [Anthropic Java SDK](https://github.com/anthropics/anthropic-sdk-java)
- [微語文件中心](/docs/intro)
