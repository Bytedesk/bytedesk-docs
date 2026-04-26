---
sidebar_label: Tencent
sidebar_position: 7
---

# Tencent Integration

本頁說明如何將微語對接騰訊混元模型。

:::tip 前置條件

- 已完成微語部署
- 已建立騰訊混元 API Key
:::

## 配置步驟

1. 開啟騰訊雲混元服務：[https://console.cloud.tencent.com/hunyuan/start](https://console.cloud.tencent.com/hunyuan/start)
2. 開通混元服務並建立 API Key
3. 登入微語管理後台並填入金鑰
4. 將 Tencent 設為預設提供商
5. 產生並嵌入聊天程式碼

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，微語聊天元件可使用騰訊混元模型。

![Tencent chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

```bash
SPRING_AI_TENCENT_BASE_URL=https://api.hunyuan.cloud.tencent.com
SPRING_AI_TENCENT_API_KEY=sk-xxx
SPRING_AI_TENCENT_CHAT_ENABLED=true
SPRING_AI_TENCENT_CHAT_OPTIONS_MODEL=hunyuan-t1-latest
SPRING_AI_TENCENT_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.tencent.base-url=https://api.hunyuan.cloud.tencent.com
spring.ai.tencent.api-key=sk-xxx
spring.ai.tencent.chat.enabled=true
spring.ai.tencent.chat.options.model=hunyuan-t1-latest
spring.ai.tencent.chat.options.temperature=0.7
```

## 常見問題

1. 金鑰無效：確認服務已開通且金鑰有效。
2. 模型呼叫失敗：檢查配額與模型可用性。
3. 回應較慢：檢查網路，必要時使用較輕量設定。

## 相關資源

- [Tencent Hunyuan Docs](https://cloud.tencent.com/document/product/1729/111007)
- [Tencent Hunyuan Console](https://console.cloud.tencent.com/hunyuan/start)
- [微語文件中心](/docs/intro)
