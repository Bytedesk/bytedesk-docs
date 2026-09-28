---
slug: deepseek-v4-1-flash
title: 微語已支援 DeepSeek-V4.1-Flash：預設模型新增 deepseek-flash
authors: jackning
tags: [bytedesk, AI, DeepSeek, LLM, Agent]
---

DeepSeek 已正式發布 DeepSeek-V4.1-Flash 模型，並建議所有新接入統一使用 `deepseek-flash` 作為模型名。微語已在預設模型列表中增加 `deepseek-flash`，企業可以直接在微語管理後台完成切換與配置，無需改動任何集成方式。

<!-- truncate -->

## DeepSeek-V4.1-Flash 帶來了什麼

根據 DeepSeek 官方說明，DeepSeek-V4.1-Flash 是當前 DeepSeek Flash 系列的最新版本，透過 `deepseek-flash` 模型名提供服務，主要特性包括：

- 支援 1M 超長上下文，最大輸出 384K，適合長文件問答與複雜知識庫場景
- 支援思考模式（預設）與非思考模式
- 支援 Json Output、Tool Calls、Responses API 與 Anthropic API
- 支援圖像理解
- Flash 級定價，性價比更高，適合線上客服、常見問題與批量對話等高併發場景

## 新模型名與舊模型名的關係

DeepSeek 官方已明確說明模型名的變化：

- 新接入請統一使用 `deepseek-flash`
- 舊模型名 `deepseek-v4-flash`、`deepseek-v4-flash-vision-exp` 仍可呼叫，但對應模型已下線，請求將由 DeepSeek-V4.1-Flash 提供服務，並按 Flash 價格計費
- `deepseek-v4-pro` 繼續提供服務，對應版本為 DeepSeek-V4-Pro-0813

| 模型名 | 實際服務版本 | 說明 |
| --- | --- | --- |
| deepseek-flash | DeepSeek-V4.1-Flash | 推薦新配置使用 |
| deepseek-v4-flash | DeepSeek-V4.1-Flash | 舊模型名，仍可呼叫 |
| deepseek-v4-pro | DeepSeek-V4-Pro-0813 | 繼續提供 |

## 微語目前已支援的 DeepSeek 模型

在微語的模型配置中，DeepSeek 供應商下已提供以下模型：

- deepseek-flash
- deepseek-v4-flash
- deepseek-v4-pro

其中 `deepseek-flash` 已加入預設模型列表，可以直接在 AI 模型配置頁選擇使用。

## 微語中的建議遷移方式

如果你已經在微語中使用 DeepSeek，建議按下面方式遷移：

### 1. 將預設模型切換為 deepseek-flash

將預設模型從下列舊值替換為 `deepseek-flash`：

- deepseek-chat -> deepseek-flash
- deepseek-reasoner -> deepseek-flash
- deepseek-v4-flash -> deepseek-flash

如果你的場景更看重複雜推理、長鏈路任務和 Agent 表現，也可以繼續使用 `deepseek-v4-pro`。

### 2. 保持 base URL 不變

DeepSeek-V4.1-Flash 的 API 接入方式沒有改變，仍然使用原有 DeepSeek API 地址：

```bash
https://api.deepseek.com
```

遷移時主要修改的是 model 參數，而不是接入地址。

### 3. 在微語後台完成切換

你可以直接在微語管理後台中完成以下操作：

1. 登入管理後台
2. 進入 AI 模型配置頁面
3. 選擇 DeepSeek 作為模型供應商
4. 將預設模型切換為 deepseek-flash
5. 儲存並測試對話效果

整個過程不需要重新嵌入聊天程式碼，也不需要改動訪客端接入方式。

## 選擇建議

如果你不確定該如何選擇，可以參考下面的實踐建議：

- 線上客服機器人預設首選 deepseek-flash
- 複雜業務問答、知識庫深度問答、工作流助手優先選擇 deepseek-v4-pro
- 需要圖像理解能力時，使用 deepseek-flash

## 總結

隨著 DeepSeek-V4.1-Flash 發布，微語已經同步在預設模型列表中增加 `deepseek-flash`。對於需要長上下文、多模態理解和更高性價比自動化客服體驗的團隊來說，這是一次值得盡快完成的升級。

如果你已經在使用微語對接 DeepSeek，建議盡快把預設模型遷移到 `deepseek-flash`，以便享受最新的 V4.1-Flash 能力。

## 相關資源

- [DeepSeek API 文件](https://api-docs.deepseek.com/zh-cn/)
- [DeepSeek 模型 & 價格](https://api-docs.deepseek.com/zh-cn/quick_start/pricing)
