---
sidebar_label: VolcEngine
sidebar_position: 8
---

# VolcEngine Integration

本頁說明如何將微語對接火山引擎 Ark 模型服務。

:::tip 前置條件

- 已完成微語部署
- 已建立火山引擎 API Key
:::

## 配置步驟

1. 開啟火山引擎 Ark：[https://console.volcengine.com/ark/apiKey](https://console.volcengine.com/ark/apiKey)
2. 在控制台建立 API Key
3. 登入微語管理後台並填入金鑰
4. 將 VolcEngine 設為預設提供商
5. 產生並嵌入聊天程式碼

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，微語可使用火山引擎支援的 AI 聊天能力。

![VolcEngine chat effect](/img/deploy/provider/provider-chat.png)

## 可選說明

- 妥善保管 API Key，必要時定期輪換。
- 在火山引擎控制台確認模型與配額可用。
- 若回應不穩定，先檢查 provider 延遲。

## 常見問題

1. 金鑰無效：確認 Ark 金鑰有效。
2. 回應較慢：檢查網路與上游服務負載。
3. 呼叫失敗：確認控制台已授權對應模型。

## 相關資源

- [VolcEngine API Docs](https://www.volcengine.com/docs/82379/1330626)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/)
- [微語文件中心](/docs/intro)
