---
sidebar_label: MiniMax
sidebar_position: 9
---

# MiniMax Integration

本頁說明如何將微語對接 MiniMax 聊天模型，通過 Spring AI Anthropic 相容 API。

:::tip 前置條件

- 已完成微語部署
- 已建立 MiniMax API Key
:::

## 配置步驟

1. 在 MiniMax 控制台建立 API Key：[https://platform.minimax.io/](https://platform.minimax.io/)
2. 登入微語管理後台並填入金鑰
3. 將 MiniMax 設為預設提供商
4. 產生聊天程式碼並嵌入網站

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，微語可通過 Anthropic 相容 API 使用 MiniMax 支援的 AI 對話。

![MiniMax chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

```bash
SPRING_AI_MINIMAX_CHAT_ENABLED=true
SPRING_AI_ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
SPRING_AI_ANTHROPIC_API_KEY=sk-xxx
SPRING_AI_ANTHROPIC_CHAT_MODEL=MiniMax-M3
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.minimax.chat.enabled=true
spring.ai.anthropic.base-url=https://api.minimax.io/anthropic
spring.ai.anthropic.api-key=sk-xxx
spring.ai.anthropic.chat.model=MiniMax-M3
spring.ai.anthropic.chat.options.temperature=0.7
```

## 常見問題

1. 金鑰無效：確認 MiniMax 金鑰已啟用。
2. 端點錯誤：base URL 必須設為 `https://api.minimax.io/anthropic`。
3. 模型名稱錯誤：請選擇支援 Anthropic 相容 API 的 MiniMax 模型，如 `MiniMax-M3`。

## 相關資源

- [MiniMax Anthropic 相容 API](https://platform.minimax.io/docs/api-reference/text-anthropic-api)
- [Spring AI Anthropic 參考](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)
- [微語文件中心](/docs/intro)
