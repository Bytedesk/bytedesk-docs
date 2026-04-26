---
sidebar_label: 重排序模型指南
sidebar_position: 25
---

# 微语重排序模型配置指南

本页介绍如何为微语系统配置重排序模型。Rerank 模型通常位于检索之后、模型生成之前，用于对候选结果再次打分和重新排序，从而提升知识库检索与 RAG 场景下的最终相关性。

## 一、选择重排序模型提供商

可在配置文件或环境变量中指定当前使用的重排序提供商：

```bash
# 可选项：none、ollama、zhipuai、dashscope
spring.ai.model.rerank=dashscope
```

Docker 环境变量示例：

```yaml
environment:
  SPRING_AI_MODEL_RERANK: dashscope
```

## 二、当前支持的主要提供商

### 1. DashScope

项目中的默认重排序提供商。

```bash
spring.ai.model.rerank=dashscope
# 项目默认回退模型：qwen3-rerank
```

### 2. 智谱 AI

```bash
spring.ai.model.rerank=zhipuai
spring.ai.zhipuai.rerank.options.model=linux6200/bge-reranker-v2-m3:latest
```

### 3. Ollama

```bash
spring.ai.model.rerank=ollama
spring.ai.ollama.embedding.options.model.rerank=linux6200/bge-reranker-v2-m3:latest
```

## 三、什么场景适合使用 Rerank

Rerank 尤其适合以下场景：

- 知识库初次召回的候选结果很多，但排序不够精准
- 仅依赖向量召回时，相关性仍然不稳定
- 希望在将上下文送入大模型之前，先做一次更精细的相关性排序

## 四、项目默认值

当前项目中的默认配置为：

- 默认提供商：`dashscope`
- 默认模型：`qwen3-rerank`

## 五、总结

重排序模型的价值在于提高检索结果的最终质量。对于依赖知识库检索、FAQ 召回或 RAG 的客服场景，Rerank 往往是提升回答相关性最直接、最有效的手段之一。
