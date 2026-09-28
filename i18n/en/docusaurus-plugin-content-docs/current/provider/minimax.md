---
sidebar_label: MiniMax
sidebar_position: 9
---

# MiniMax Integration

This page explains how to connect Bytedesk to MiniMax chat models through Spring AI Anthropic-compatible support.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a MiniMax API key
:::

## Configuration Steps

1. Create an API key in the MiniMax console: [https://platform.minimax.io/](https://platform.minimax.io/)
2. Sign in to Bytedesk admin and fill in the key
3. Select MiniMax as the default provider
4. Generate and embed chat code into your site

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, Bytedesk can use MiniMax-backed AI conversation through the Anthropic-compatible API.

![MiniMax chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

```bash
SPRING_AI_MINIMAX_CHAT_ENABLED=true
SPRING_AI_ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
SPRING_AI_ANTHROPIC_API_KEY=sk-xxx
SPRING_AI_ANTHROPIC_CHAT_MODEL=MiniMax-M3
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.minimax.chat.enabled=true
spring.ai.anthropic.base-url=https://api.minimax.io/anthropic
spring.ai.anthropic.api-key=sk-xxx
spring.ai.anthropic.chat.model=MiniMax-M3
spring.ai.anthropic.chat.options.temperature=0.7
```

## Common Issues

1. Invalid key: confirm the MiniMax key is active.
2. Wrong endpoint: the base URL must be set to `https://api.minimax.io/anthropic`.
3. Wrong model name: choose a MiniMax model that supports the Anthropic-compatible API, such as `MiniMax-M3`.

## Related Resources

- [MiniMax Anthropic-Compatible API](https://platform.minimax.io/docs/api-reference/text-anthropic-api)
- [Spring AI Anthropic Reference](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)
- [Bytedesk Docs](/docs/intro)
