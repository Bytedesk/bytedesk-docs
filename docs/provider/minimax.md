---
sidebar_label: MiniMax
sidebar_position: 9
---

# MiniMax Integration

This page explains how to connect Bytedesk to MiniMax models for chat, embedding, and optional multimodal capabilities.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a MiniMax API key
:::

## Configuration Steps

1. Create an API key in the MiniMax console: [https://www.minimax.chat/](https://www.minimax.chat/)
2. Sign in to Bytedesk admin and fill in the key
3. Select MiniMax as the default provider
4. Generate and embed chat code into your site

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, Bytedesk can use MiniMax-backed AI conversation.

![MiniMax chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

```bash
SPRING_AI_MINIMAX_BASE_URL=https://api.minimax.chat/v1
SPRING_AI_MINIMAX_API_KEY=sk-xxx
SPRING_AI_MINIMAX_CHAT_ENABLED=true
SPRING_AI_MINIMAX_CHAT_OPTIONS_MODEL=abab5.5-chat
SPRING_AI_MINIMAX_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_MINIMAX_EMBEDDING_ENABLED=true
```

```bash
spring.ai.minimax.base-url=https://api.minimax.chat/v1
spring.ai.minimax.api-key=sk-xxx
spring.ai.minimax.chat.enabled=true
spring.ai.minimax.chat.options.model=abab5.5-chat
spring.ai.minimax.chat.options.temperature=0.7
spring.ai.minimax.embedding.enabled=true
```

## Common Issues

1. Invalid key: confirm the MiniMax key is active.
2. Feature errors: verify the required feature toggles are enabled.
3. Slow responses: tune temperature or switch to a lighter model.

## Related Resources

- [MiniMax Website](https://www.minimax.chat/)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/chat/)
- [Bytedesk Docs](/docs/intro)
