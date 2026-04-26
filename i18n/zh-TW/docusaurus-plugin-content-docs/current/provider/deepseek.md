---
sidebar_label: DeepSeek
sidebar_position: 2
---

# DeepSeek Integration

本頁說明如何將微語對接 DeepSeek 模型，並將 DeepSeek 設為預設聊天提供商。

:::tip 前置條件

- 已完成微語部署
- 已建立 DeepSeek API Key
:::

## 配置步驟

### 1. 建立 API Key

1. 開啟 DeepSeek 開發者入口：[https://api-docs.deepseek.com/zh-cn/](https://api-docs.deepseek.com/zh-cn/)
2. 註冊並登入
3. 在控制台建立 API Key
4. 保存產生的金鑰

### 2. 配置管理後台

1. 登入微語管理後台
2. 進入 provider 配置頁
3. 填入 DeepSeek API Key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 選擇提供商

1. 開啟 AI 模型設定
2. 選擇 DeepSeek 為預設提供商
3. 儲存變更

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 發佈聊天程式碼

1. 在管理後台找到取得聊天程式碼
2. 複製產生的程式碼
3. 嵌入你的網站

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，網站聊天可使用 DeepSeek 驅動的對話能力。

![DeepSeek chat effect](/img/deploy/provider/provider-chat.png)

## 推薦模型

DeepSeek 已發布 DeepSeek-V4 預覽版。在微語中，建議新配置優先使用以下模型名：

| 模型 | 推薦方式 | 說明 |
| --- | --- | --- |
| deepseek-v4-flash | 推薦預設使用 | 回應更快、成本更優，適合大多數線上客服場景 |
| deepseek-v4-pro | 複雜場景優先 | 更適合複雜推理、長任務鏈路和 Agent 工作流 |
| deepseek-chat | 僅相容舊配置 | 將於 2026-07-24 停止使用 |
| deepseek-reasoner | 僅相容舊配置 | 將於 2026-07-24 停止使用 |

根據 DeepSeek 官方說明，在目前過渡階段：

- deepseek-chat 對應 deepseek-v4-flash 的非思考模式
- deepseek-reasoner 對應 deepseek-v4-flash 的思考模式

因此，無論是新建機器人，還是調整租戶預設模型，都建議直接選擇 deepseek-v4-flash 或 deepseek-v4-pro。

## 可選配置

### Docker 環境變數

```bash
SPRING_AI_DEEPSEEK_BASE_URL=https://api.deepseek.com
SPRING_AI_DEEPSEEK_API_KEY=sk-xxx
SPRING_AI_DEEPSEEK_CHAT_ENABLED=true
SPRING_AI_DEEPSEEK_CHAT_OPTIONS_MODEL=deepseek-v4-flash
SPRING_AI_DEEPSEEK_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_DEEPSEEK_EMBEDDING_ENABLED=true
```

### 原始碼配置

```bash
spring.ai.deepseek.base-url=https://api.deepseek.com
spring.ai.deepseek.api-key=sk-xxx
spring.ai.deepseek.chat.enabled=true
spring.ai.deepseek.chat.options.model=deepseek-v4-flash
spring.ai.deepseek.chat.options.temperature=0.7
```

### 遷移建議

如果你還在使用舊模型名，建議盡快完成遷移：

- deepseek-chat -> deepseek-v4-flash
- deepseek-reasoner -> deepseek-v4-pro 或 deepseek-v4-flash

遷移時無需修改 base URL，只需要調整模型名稱。

## 常見問題

1. API Key 無效：檢查金鑰與權限範圍。
2. 回應慢：檢查網路與伺服器效能。若更重視速度，優先使用 deepseek-v4-flash。
3. Embedding 異常：需要時確認已啟用 embedding。
4. 仍在使用舊模型名：deepseek-chat 與 deepseek-reasoner 將於 2026-07-24 停止使用，請儘快遷移。

## 相關資源

- [DeepSeek API Docs](https://api-docs.deepseek.com/zh-cn/)
- [Spring AI DeepSeek](https://docs.spring.io/spring-ai/reference/api/chat/deepseek-chat.html)
- [DeepSeek-V4 預覽版：邁入百萬上下文普惠時代](https://mp.weixin.qq.com/s/8bxXqS2R8Fx5-1TLDBiEDg)
- [微語文件中心](/docs/intro)
