---
sidebar_label: MiniMax
sidebar_position: 9
---

# MiniMax Integration

本頁說明如何將微語對接 MiniMax 模型，用於聊天、embedding 與可選多模態能力。

:::tip 前置條件

- 已完成微語部署
- 已建立 MiniMax API Key
:::

## 配置步驟

1. 在 MiniMax 控制台建立 API Key：[https://www.minimax.chat/](https://www.minimax.chat/)
2. 登入微語管理後台並填入金鑰
3. 將 MiniMax 設為預設提供商
4. 產生聊天程式碼並嵌入網站

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，微語可使用 MiniMax 支援的 AI 對話。

![MiniMax chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

```bash
SPRING_AI_MINIMAX_BASE_URL=https://api.minimax.chat/v1
SPRING_AI_MINIMAX_API_KEY=sk-xxx
SPRING_AI_MINIMAX_CHAT_ENABLED=true
SPRING_AI_MINIMAX_CHAT_OPTIONS_MODEL=abab5.5-chat
SPRING_AI_MINIMAX_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_MINIMAX_EMBEDDING_ENABLED=true
```

```bash
spring.ai.minimax.base-url=https://api.minimax.chat/v1
spring.ai.minimax.api-key=sk-xxx
spring.ai.minimax.chat.enabled=true
spring.ai.minimax.chat.options.model=abab5.5-chat
spring.ai.minimax.chat.options.temperature=0.7
spring.ai.minimax.embedding.enabled=true
```

## 常見問題

1. 金鑰無效：確認 MiniMax 金鑰已啟用。
2. 功能異常：檢查所需功能開關是否已開啟。
3. 回應較慢：調整 temperature 或改用較輕量模型。

## 相關資源

- [MiniMax Website](https://www.minimax.chat/)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/chat/)
- [微語文件中心](/docs/intro)
