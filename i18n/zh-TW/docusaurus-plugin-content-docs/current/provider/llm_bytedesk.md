---
sidebar_label: LLM ByteDesk
sidebar_position: 39
---

# LLM ByteDesk

這一頁不是第三方模型平台接入指南，而是微語原生 AI 能力總覽。倉庫中已包含獨立 AI 模組，用來統一處理模型路由、機器人編排、知識庫檢索、SSE 串流回覆，以及多模態能力延伸。

## 微語原生 AI 能力

目前程式碼中的原生 AI 體系主要涵蓋：

- 多 provider 大模型調度
- 機器人與智能體管理
- FAQ / 知識庫檢索與上下文拼裝
- SSE 串流輸出
- Embedding 模型探測與主模型識別
- 與 OCR、ASR、TTS、多模態能力聯動

## 在微語中的運作方式

從現有實作看，機器人主要有三種回答模式：

1. 僅使用 LLM
2. 僅使用知識庫
3. LLM 加知識庫上下文

當機器人啟用知識庫搜尋後，系統會先聚合 FAQ 搜尋結果，再把整理好的上下文送進目前選定的模型；如果知識庫沒有命中，則可依機器人設定決定繼續呼叫 LLM，或回退到預設回覆。

## Provider 路由

微語原生 AI 不綁定單一模型廠商。當前 AI 模組已暴露主 provider 設定，例如：

```yaml
bytedesk:
  ai:
    provider: volcengine
```

倉庫裡已實作 Gitee、DashScope、DeepSeek、Baidu、Tencent、Volcengine、OpenRouter、SiliconFlow、Ollama、Zhipu 等 provider，具體接入方式可在本目錄對應頁面查看。

## 知識庫與檢索增強

微語原生 AI 的核心價值在於把知識庫能力和模型能力串接起來：

- FAQ 檢索結果可直接組裝成模型上下文
- 回答可附帶來源引用
- 向量檢索與 FAQ 搜尋可作為模型前置增強層

因此，這一頁描述的是微語的 AI 編排層與產品層，而不是單一外部廠商的 API 配置步驟。

## Embedding 與執行期探測

AI 模組還包含 Embedding 模型查詢服務，可在執行期辨識目前可用的 embedding provider，並標示主 embedding provider。現有實作已覆蓋 ZhipuAI、Ollama、DashScope 等類型。

## 何時查看這一頁

- 想理解微語原生 AI 架構與產品能力時，看這一頁。
- 想配置特定外部 provider 時，查看對應 provider 接入頁。

## 相關頁面

- [Gitee AI Integration](gitee)
- [Model Audio](model_audio)
- [Model OCR](model_ocr)
- [Model ASR](model_asr)
- [Model TTS](model_tts)
- [Multimodal](modal_multi)
