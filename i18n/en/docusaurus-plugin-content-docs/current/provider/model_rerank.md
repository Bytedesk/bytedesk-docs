---
sidebar_label: Rerank Model Guide
sidebar_position: 25
---

# Rerank Model Guide

This page explains how to configure rerank models in Bytedesk. Rerank models are used after retrieval to reorder candidate results and improve relevance quality in knowledge base and RAG workflows.

## Select A Rerank Provider

Configure the active rerank provider:

```bash
# Available examples: none, ollama, zhipuai, dashscope
spring.ai.model.rerank=dashscope
```

Docker example:

```yaml
environment:
  SPRING_AI_MODEL_RERANK: dashscope
```

## Supported Providers

### 1. DashScope

The default rerank provider in the project.

```bash
spring.ai.model.rerank=dashscope
# default model fallback in project: qwen3-rerank
```

### 2. ZhipuAI

```bash
spring.ai.model.rerank=zhipuai
spring.ai.zhipuai.rerank.options.model=linux6200/bge-reranker-v2-m3:latest
```

### 3. Ollama

```bash
spring.ai.model.rerank=ollama
spring.ai.ollama.embedding.options.model.rerank=linux6200/bge-reranker-v2-m3:latest
```

## When To Use Rerank

Rerank is especially useful when:

- your knowledge base returns many approximate candidates
- semantic retrieval alone is not accurate enough
- you want more precise final ordering before passing context to the model

## Project Defaults

The current project defaults are:

- default provider: `dashscope`
- default model: `qwen3-rerank`

## Summary

Rerank models improve final retrieval quality by reordering candidate results after the initial search step. If your team relies on knowledge base search or RAG, rerank is one of the most effective ways to improve answer relevance.
