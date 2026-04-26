---
sidebar_label: 向量模型指南
sidebar_position: 22
---

# 微語向量模型配置指南

本頁說明如何為微語系統配置向量模型。向量模型主要用於向量檢索、知識庫召回、語義匹配，以及各類 RAG 流程。

## 一、選擇向量模型提供商

可透過以下配置指定目前使用的向量模型提供商：

```bash
# 可選示例：none、ollama、zhipuai、dashscope
spring.ai.model.embedding=zhipuai
```

Docker 範例：

```yaml
environment:
  SPRING_AI_MODEL_EMBEDDING: zhipuai
```

## 二、主要提供商

### 1. Ollama

適合本機生成向量與離線測試。

```bash
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.embedding.enabled=true
spring.ai.ollama.embedding.options.model=bge-m3:latest
```

### 2. 智譜 AI

適合中文知識檢索與語義匹配場景。

```bash
spring.ai.zhipuai.api-key=你的APIKey
spring.ai.zhipuai.embedding.enabled=true
spring.ai.zhipuai.embedding.options.model=embedding-2
```

### 3. 阿里雲百鍊 DashScope

適合正式環境與較完整的託管能力。

```bash
spring.ai.dashscope.api-key=你的APIKey
spring.ai.dashscope.enabled=true
spring.ai.dashscope.embedding.enabled=true
spring.ai.dashscope.embedding.options.model=text-embedding-v4
spring.ai.dashscope.embedding.options.dimensions=1024
```

## 三、重要注意事項

- 建議同一時間只啟用一個向量提供商。
- 向量資料庫中的維度設定，必須與實際模型輸出的向量維度一致。
- 向量模型在知識庫、檢索增強生成與語義召回場景中非常關鍵。

## 四、總結

向量模型是微語 AI 檢索能力的基礎。正式部署前，請務必一起驗證提供商選擇、向量維度與向量資料庫配置是否一致。
