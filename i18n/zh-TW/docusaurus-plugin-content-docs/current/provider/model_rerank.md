---
sidebar_label: 重排序模型指南
sidebar_position: 25
---

# 微語重排序模型配置指南

本頁介紹如何為微語系統配置重排序模型。Rerank 模型通常位於檢索之後、模型生成之前，用於對候選結果再次打分與重新排序，從而提升知識庫檢索與 RAG 場景下的最終相關性。

## 一、選擇重排序模型提供商

可在配置檔案或環境變數中指定目前使用的重排序提供商：

```bash
# 可選項：none、ollama、zhipuai、dashscope
spring.ai.model.rerank=dashscope
```

Docker 環境變數示例：

```yaml
environment:
  SPRING_AI_MODEL_RERANK: dashscope
```

## 二、目前支援的主要提供商

### 1. DashScope

專案中的預設重排序提供商。

```bash
spring.ai.model.rerank=dashscope
# 專案預設回退模型：qwen3-rerank
```

### 2. 智譜 AI

```bash
spring.ai.model.rerank=zhipuai
spring.ai.zhipuai.rerank.options.model=linux6200/bge-reranker-v2-m3:latest
```

### 3. Ollama

```bash
spring.ai.model.rerank=ollama
spring.ai.ollama.embedding.options.model.rerank=linux6200/bge-reranker-v2-m3:latest
```

## 三、什麼場景適合使用 Rerank

Rerank 特別適合以下場景：

- 知識庫初次召回的候選結果很多，但排序不夠精準
- 僅依賴向量召回時，相關性仍然不穩定
- 希望在將上下文送入大模型之前，先做一次更細緻的相關性排序

## 四、專案預設值

目前專案中的預設配置為：

- 預設提供商：`dashscope`
- 預設模型：`qwen3-rerank`

## 五、總結

重排序模型的價值在於提高檢索結果的最終品質。對於依賴知識庫檢索、FAQ 召回或 RAG 的客服場景，Rerank 往往是提升回答相關性最直接、最有效的手段之一。
