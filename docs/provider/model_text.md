---
sidebar_label: Text Model Guide
sidebar_position: 21
---

# Text Model Guide

This page explains how to configure text chat models in Bytedesk. Text models are the foundation for AI chat, customer service bots, agent assistance, summaries, and general conversational workflows.

## Select A Text Model Provider

Configure the active text model provider in `application.properties` or with environment variables:

```bash
# Available examples: none, ollama, zhipuai, dashscope
spring.ai.model.chat=zhipuai
```

Docker example:

```yaml
environment:
  SPRING_AI_MODEL_CHAT: zhipuai
```

## Recommended Providers

### 1. Ollama

Good for local development and offline testing.

```bash
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.chat.enabled=true
spring.ai.ollama.chat.options.model=qwen3:0.6b
spring.ai.ollama.chat.options.temperature=0.0
```

### 2. ZhipuAI

Recommended for Chinese-language production scenarios.

```bash
spring.ai.zhipuai.api-key=your_api_key
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.chat.options.top-p=0.9
spring.ai.zhipuai.chat.options.max-tokens=4096
```

### 3. DashScope

Suitable for large-scale production and broad model selection.

```bash
spring.ai.dashscope.api-key=your_api_key
spring.ai.dashscope.enabled=true
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com
spring.ai.dashscope.chat.enabled=true
spring.ai.dashscope.chat.options.model=qwen3-max
spring.ai.dashscope.chat.options.temperature=0.7
spring.ai.dashscope.chat.options.topP=3
```

## How To Choose

- Use Ollama for local testing and private environments.
- Use ZhipuAI for Chinese-heavy service scenarios.
- Use DashScope for production-scale deployments and broader model choices.

## Summary

Text models are the core of Bytedesk AI conversation workflows. In most cases, start with one provider, validate model quality, and then tune temperature, token limits, and other generation settings based on your support use cases.
