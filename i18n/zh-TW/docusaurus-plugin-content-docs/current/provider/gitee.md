---
sidebar_label: GiteeAi
sidebar_position: 6
---

# Gitee AI Integration

:::tip 前置條件

- 已部署微語系統
- 已申請 Gitee AI API Key
- 可登入管理後台進行 AI provider 配置

:::

## 微語已支援的能力

倉庫中已內建 Gitee provider 實作，支援：

- ChatModel 與 ChatClient 注入
- 同步回覆與 SSE 串流輸出
- 透過 REST 介面取得模型清單
- token 用量統計與機器人級模型綁定

在程式碼中，Gitee 與 DashScope、DeepSeek、Baidu、Tencent、Volcengine、OpenRouter、SiliconFlow 等 provider 一樣，屬於標準 LLM provider。

## 後台配置步驟

1. 登入微語管理後台。
2. 進入 AI provider 配置頁。
3. 選擇 Gitee。
4. 填入 API Key 與模型名稱。
5. 儲存後綁定到目標機器人或工作流。

![provider](/img/deploy/provider/provider_api_key.png)

## 建議配置

```yaml
spring:
  ai:
    gitee:
      base-url: https://api.gitee.com
      api-key: sk-xxx
      chat:
        enabled: true
        options:
          model: gitee-chat
          temperature: 0.7
```

如果使用環境變數部署，可對應為：

```bash
SPRING_AI_GITEE_BASE_URL=https://api.gitee.com
SPRING_AI_GITEE_API_KEY=sk-xxx
SPRING_AI_GITEE_CHAT_ENABLED=true
SPRING_AI_GITEE_CHAT_OPTIONS_MODEL=gitee-chat
SPRING_AI_GITEE_CHAT_OPTIONS_TEMPERATURE=0.7
```

## 內建模型查詢介面

```text
GET /gitee/api/v1/models
```

建議先確認模型查詢能正常返回，再在管理後台完成 provider 綁定。

## 典型使用流程

1. 配置 Gitee API Key。
2. 將 Gitee 設為機器人的聊天模型來源。
3. 在後台或嵌入式聊天入口測試對話。
4. 需要即時輸出時，啟用 SSE 串流回覆。

![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)
![provider-chat](/img/deploy/provider/provider-chat.png)

## 常見問題

- 若 Gitee provider 無法生效，先確認 `spring.ai.gitee.chat.enabled=true`。
- 若呼叫立即失敗，優先檢查 API Key 與 base URL。
- 若後台沒有可用模型，可先呼叫 `/gitee/api/v1/models` 驗證模型發現功能。
- 若機器人仍回退到預設回覆，請檢查是否真的綁定到使用 Gitee 的 LLM 設定。

## 相關頁面

- [Model Audio](model_audio)
- [Model OCR](model_ocr)
- [Model ASR](model_asr)
- [Model TTS](model_tts)
- [LLM ByteDesk](llm_bytedesk)
