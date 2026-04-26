---
sidebar_label: Ollama
sidebar_position: 2
---

# Ollama Integration

This page describes how to connect Bytedesk to a local Ollama service and run self-hosted models for chat and embedding scenarios.

:::tip Prerequisites

- Bytedesk has been deployed
- Ollama is installed and running
- The required local model has already been pulled
:::

## Configuration Steps

### 1. Install Ollama

1. Visit [https://ollama.ai/download](https://ollama.ai/download)
2. Install the proper build for your operating system
3. Start the Ollama service

### 2. Pull a Model

```bash
ollama pull qwen3:0.6b
```

### 3. Configure Bytedesk

1. Sign in to the Bytedesk admin console
2. Open provider configuration
3. Select Ollama as the default model provider

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. Embed the Chat Widget

1. Generate the chat code in the admin console
2. Copy the result
3. Embed it into your website

![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, Bytedesk can call locally hosted Ollama models for AI chat.

![Ollama chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

### Docker Environment Variables

```bash
SPRING_AI_OLLAMA_BASE_URL=http://host.docker.internal:11434
SPRING_AI_OLLAMA_CHAT_ENABLED=true
SPRING_AI_OLLAMA_CHAT_OPTIONS_MODEL=qwen3:0.6b
SPRING_AI_OLLAMA_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_OLLAMA_EMBEDDING_ENABLED=true
SPRING_AI_OLLAMA_EMBEDDING_OPTIONS_MODEL=qwen3:0.6b
```

### Source Configuration

```bash
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.chat.enabled=true
spring.ai.ollama.chat.options.model=qwen3:0.6b
spring.ai.ollama.chat.options.temperature=0.7
spring.ai.ollama.embedding.enabled=true
spring.ai.ollama.embedding.options.model=qwen3:0.6b
```

## Common Issues

1. Service connection failed: verify the Ollama service and URL.
2. Model load failed: confirm the model has been pulled locally.
3. Slow responses: check host resources and choose a lighter model if needed.

## Related Resources

- [Ollama Docs](https://ollama.ai/docs)
- [Spring AI Ollama](https://docs.spring.io/spring-ai/reference/api/chat/ollama-chat.html)
- [Bytedesk Docs](/docs/intro)
