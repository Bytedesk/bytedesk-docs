---
sidebar_label: LLM MaxKB
sidebar_position: 39
---

# LLM MaxKB

本頁說明微語如何把 MaxKB 作為第三方知識庫與問答服務接入。

## 概述

目前倉庫中已經存在明確的 MaxKB 接入依據：

- MaxKB 已出現在內建 provider 清單與管理端資產中
- Swagger 已暴露專用的 MaxKB Chat API 分組
- enterprise 知識模組中已包含完整的 MaxKB 集成說明與配置示例

這表示 MaxKB 並不是佔位項，而是已在程式碼中具備清晰接入路徑。

## MaxKB 的適用場景

MaxKB 在微語中的定位偏向第三方知識庫問答平台，適合：

- 外部知識庫問答接入
- OpenAI 相容聊天完成介面
- 將既有企業知識系統接入客服工作流
- 作為機器人或服務入口背後的第三方知識應用

## 倉庫中的現有接入基礎

目前可確認的接入點包括：

- 帶有正式 base URL 與官網資訊的 MaxKB provider 元資料
- 租戶與組織層級的 MaxKB 設定項
- Swagger 分組 `maxkb-chat-apis`
- `/api/v1/maxkb/chat/**` 路徑
- enterprise 集成文檔中對 API URL、API Key、application ID 以及 OpenAI 相容請求方式的描述

## 典型接入流程

1. 部署或準備 MaxKB 實例
2. 在 MaxKB 中建立知識應用
3. 在 MaxKB 控制台產生 API Key
4. 在微語中配置 MaxKB 連線資訊
5. 把整合綁定到對應機器人或業務入口

## 配置方向示例

enterprise 集成文檔中的配置模式大致如下：

```yaml
bytedesk:
  maxkb:
    enabled: true
    api-url: https://maxkb.fit2cloud.com
    api-key: application-xxxxxxxxf00e21a7530d1177c20967
    default-model: gpt-3.5-turbo
    default-stream: false
    timeout: 30000
```

## API 風格

隨附的集成說明顯示，MaxKB 可透過 OpenAI 相容的 chat completions 介面，以及更簡化的 message 介面被調用。這對希望由微語負責編排，而由 MaxKB 負責知識問答的場景很實用。

## 常見檢查項

1. 確認微語伺服器可以連通 MaxKB。
2. 確認 API Key 有效且綁定目標應用。
3. 確認 application ID 或對應端點配置正確。

## 相關資源

- [MaxKB Website](https://maxkb.cn)
- [MaxKB Docs](https://maxkb.cn/docs)
- [MaxKB API Reference](https://maxkb.cn/docs/v1/dev_manual/APIKey_chat/#1-openai-api)
