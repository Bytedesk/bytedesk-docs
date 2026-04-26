---
title: Moonshot 對接
sidebar_label: Moonshot
sidebar_position: 10
description: 微語對接 Moonshot Kimi 大模型的設定說明與步驟指南
---

:::tip 前置條件

- 已完成微語部署
- 已申請 Moonshot Kimi API Key
- 已確認所選模型的參數限制，特別是 `kimi-k2.6`
:::

## 配置步驟

### 1. 取得 API Key

1. 前往 [Moonshot 開放平台](https://platform.moonshot.cn/)
2. 註冊並登入 Moonshot 帳號
3. 在控制台建立 API Key
4. 保存產生的金鑰，供微語後台或設定檔接入使用

### 2. 管理後台配置

1. 登入微語管理後台
2. 進入 AI 服務商配置頁
3. 新增或編輯 Moonshot 服務商設定
4. 填寫以下核心資訊：

- `baseUrl`：`https://api.moonshot.cn`
- `apiKey`：你在 Moonshot 平台申請的 Key
- `model`：建議使用 `kimi-k2.6`

> 截圖後續補充。

### 3. 模型配置選擇

1. 進入 AI 模型配置頁
2. 選擇 Moonshot 作為預設模型，或為指定機器人單獨綁定 Moonshot
3. 儲存設定

推薦模型：

- `kimi-k2.6`：目前此倉庫預設使用的 Kimi 模型

> 截圖後續補充。

### 4. 取得聊天程式碼

1. 在管理後台找到「取得聊天程式碼」功能
2. 複製產生的程式碼片段
3. 將程式碼嵌入你的網站

> 截圖後續補充。

## 效果展示

配置完成後，即可在訪客聊天視窗或機器人對話中使用 Moonshot Kimi 模型。

> 聊天效果截圖後續補充。

## 配置說明（可選）

### Docker 部署配置參數

```bash
# Moonshot API 配置
SPRING_AI_MOONSHOT_BASE_URL: https://api.moonshot.cn
SPRING_AI_MOONSHOT_API_KEY: 'sk-xxx'                 # 替換為你的 Moonshot API Key
SPRING_AI_MOONSHOT_CHAT_ENABLED: true                # 啟用 Moonshot 對話功能

# 模型配置
SPRING_AI_MOONSHOT_CHAT_OPTIONS_MODEL: kimi-k2.6     # 建議模型
SPRING_AI_MOONSHOT_CHAT_OPTIONS_TEMPERATURE: 1       # kimi-k2.6 建議固定為 1

# 其他說明
# kimi-k2.6 目前會由服務端自動規範為：temperature=1、top_p=0.95
# 如透過機器人動態配置 maxTokens，系統會自動映射為 max_completion_tokens
```

### 原始碼部署配置參數

```bash
# Moonshot API 配置
spring.ai.moonshot.base-url=https://api.moonshot.cn
spring.ai.moonshot.api-key=sk-xxx                    # 替換為你的 Moonshot API Key
spring.ai.moonshot.chat.enabled=true                 # 啟用 Moonshot 對話功能

# 模型配置
spring.ai.moonshot.chat.options.model=kimi-k2.6      # 建議模型
spring.ai.moonshot.chat.options.temperature=1         # kimi-k2.6 建議固定為 1

# 也可透過環境變數注入 API Key
# export SPRING_AI_MOONSHOT_API_KEY=<INSERT KEY HERE>
```

### 參數限制說明

目前此倉庫中的 Moonshot 整合已針對 `kimi-k2.6` 做了相容處理，主要包含：

- `temperature` 會被強制規範為 `1`
- `top_p` 會被強制規範為 `0.95`
- 機器人動態配置中的 `maxTokens` 會優先轉換為 `max_completion_tokens`
- `kimi-k2.*` 模型支援 `thinking` 參數，系統會依機器人配置自動開啟或關閉

:::tip 配置說明

- 將設定中的 `sk-xxx` 替換為實際 API Key
- 建議優先使用 `kimi-k2.6`，並遵守其固定採樣參數限制
- 若透過後台為機器人單獨配置 Moonshot，系統會自動處理部分模型相容性參數
:::

## 常見問題

1. **API Key 無效**
   - 檢查 API Key 是否正確複製
   - 確認 API Key 是否已啟用
   - 驗證 API Key 是否具備目標模型的呼叫權限

2. **回傳 400 參數錯誤**
   - 檢查模型是否為 `kimi-k2.6`
   - 若是 `kimi-k2.6`，避免手動傳入與平台限制衝突的採樣參數
   - 目前已知該模型要求 `temperature=1`、`top_p=0.95`

3. **對話回應慢或失敗**
   - 檢查網路連線與 Moonshot 平台可用性
   - 查看微語服務端日誌，確認是否回傳具體錯誤 body
   - 檢查後台配置的 `baseUrl`、`apiKey` 與模型名稱是否一致

4. **後台已配置但未生效**
   - 檢查 `spring.ai.moonshot.chat.enabled` 是否已開啟
   - 確認目前機器人或預設模型是否實際綁定到 Moonshot
   - 原始碼部署時，確認啟用中的 profile 沒有把 Moonshot 配置註解掉

## 相關資源

- [Moonshot 開放平台](https://platform.moonshot.cn/)
- [Kimi API 文件](https://platform.moonshot.cn/docs)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/chat/)
- [微語文件中心](/docs/intro)
