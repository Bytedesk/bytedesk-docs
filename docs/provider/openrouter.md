---
sidebar_label: OpenRouter
sidebar_position: 8
---

# OpenRouter Integration

This page explains how to connect Bytedesk to OpenRouter and route requests to multiple upstream models through a unified API entry.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created an OpenRouter API key
:::

## Configuration Steps

### 1. Create an API Key

1. Open [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign in to your OpenRouter account
3. Create an API key
4. Save the key securely

### 2. Configure the Admin Console

1. Sign in to the Bytedesk admin console
2. Open the provider configuration page
3. Fill in the OpenRouter key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. Select OpenRouter

1. Open AI model settings
2. Choose OpenRouter as the default provider
3. Save the configuration

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. Publish the Chat Code

1. Generate embed code from the admin console
2. Copy it
3. Integrate it into your website

![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, Bytedesk can reach multiple LLM providers through OpenRouter.

![OpenRouter chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

### Docker Environment Variables

```bash
SPRING_AI_OPENROUTER_BASE_URL=https://openrouter.ai/api
SPRING_AI_OPENROUTER_API_KEY=sk-xxx
SPRING_AI_OPENROUTER_CHAT_ENABLED=true
SPRING_AI_OPENROUTER_CHAT_OPTIONS_MODEL=openrouter/auto
SPRING_AI_OPENROUTER_CHAT_OPTIONS_TEMPERATURE=0.7
```

### Source Configuration

```bash
spring.ai.openrouter.base-url=https://openrouter.ai/api
spring.ai.openrouter.api-key=sk-xxx
spring.ai.openrouter.chat.enabled=true
spring.ai.openrouter.chat.options.model=openrouter/auto
spring.ai.openrouter.chat.options.temperature=0.7
```

## Common Issues

1. Invalid key: confirm the key is valid in OpenRouter.
2. Slow responses: inspect upstream model choice and network latency.
3. Unexpected results: select a fixed model instead of `openrouter/auto` when needed.

## Related Resources

- [OpenRouter Docs](https://openrouter.ai/docs)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/)
- [Bytedesk Docs](/docs/intro)
