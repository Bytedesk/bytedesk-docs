---
sidebar_label: Embedding Model Guide
sidebar_position: 22
---

# Embedding Model Guide

This page explains how to configure embedding models in Bytedesk. Embedding models are used for vector search, knowledge base retrieval, semantic matching, and other retrieval-augmented workflows.

## Select An Embedding Provider

Set the active embedding provider in configuration:

```bash
# Examples: none, ollama, zhipuai, dashscope
spring.ai.model.embedding=zhipuai
```

Docker example:

```yaml
environment:
  SPRING_AI_MODEL_EMBEDDING: zhipuai
```

## Key Providers

### 1. Ollama

Useful for local embedding generation.

```bash
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.embedding.enabled=true
spring.ai.ollama.embedding.options.model=bge-m3:latest
```

### 2. ZhipuAI

Recommended for Chinese semantic retrieval scenarios.

```bash
spring.ai.zhipuai.api-key=your_api_key
spring.ai.zhipuai.embedding.enabled=true
spring.ai.zhipuai.embedding.options.model=embedding-2
```

### 3. DashScope

Recommended for production use, with stronger managed service support.

```bash
spring.ai.dashscope.api-key=your_api_key
spring.ai.dashscope.enabled=true
spring.ai.dashscope.embedding.enabled=true
spring.ai.dashscope.embedding.options.model=text-embedding-v4
spring.ai.dashscope.embedding.options.dimensions=1024
```

## Important Notes

- It is best to enable only one embedding provider at a time.
- The vector dimension configured in your vector store must match the actual embedding output dimension.
- Embedding models are especially important for knowledge base and RAG scenarios.

## Summary

Embedding models provide the semantic retrieval foundation for Bytedesk AI features. In production, always validate provider selection, output dimensions, and vector store compatibility together.
