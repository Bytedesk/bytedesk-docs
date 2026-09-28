---
sidebar_label: Anthropic
sidebar_position: 9
---

# Anthropic Integration

This page explains how to connect Bytedesk to Anthropic Claude models and use Anthropic as the default chat provider.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created an Anthropic API key
:::

## Configuration Steps

### 1. Create an API Key

1. Open the Anthropic Console: [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign in or create an account
3. Create an API key in the dashboard
4. Save the generated key

### 2. Configure the Admin Console

1. Sign in to the Bytedesk admin console
2. Open the provider configuration page
3. Fill in the Anthropic API key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. Choose the Provider

1. Open AI model settings
2. Select Anthropic as the default provider
3. Save the change

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. Publish Chat Code

1. Find Get Chat Code in the admin console
2. Copy the generated code
3. Embed it into your site

![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After configuration, website chat can use Anthropic-backed conversation capabilities.

![Anthropic chat effect](/img/deploy/provider/provider-chat.png)

## Recommended Models

Bytedesk currently exposes these Anthropic text models in provider metadata:

| Model | Recommendation | Notes |
| --- | --- | --- |
| claude-sonnet-4-5 | Recommended default | Current default used by the Spring AI Anthropic provider config in this repo |
| claude-3-5-sonnet-20240620 | Stable alternative | Matches the model catalog in provider metadata |
| claude-3-opus-20240229 | Advanced tasks | Higher capability, generally higher cost |
| claude-3-haiku-20240307 | Lightweight tasks | Faster and lower cost |

## Optional Configuration

### Docker Environment Variables

```bash
SPRING_AI_ANTHROPIC_BASE_URL=https://api.anthropic.com
SPRING_AI_ANTHROPIC_API_KEY=sk-ant-xxx
SPRING_AI_ANTHROPIC_CHAT_ENABLED=true
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_MODEL=claude-sonnet-4-5
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_ANTHROPIC_CHAT_OPTIONS_MAX_TOKENS=4096
```

### Source Configuration

```bash
spring.ai.anthropic.base-url=https://api.anthropic.com
spring.ai.anthropic.api-key=sk-ant-xxx
spring.ai.anthropic.chat.enabled=true
spring.ai.anthropic.chat.options.model=claude-sonnet-4-5
spring.ai.anthropic.chat.options.temperature=0.7
spring.ai.anthropic.chat.options.max-tokens=4096
```

## Common Issues

1. Invalid API key: verify the key and organization permissions in Anthropic Console.
2. Model not available: switch to another Claude model allowed by your account.
3. Slow or expensive responses: lower max tokens or use a lighter model such as Haiku.

## Related Resources

- [Anthropic Console](https://console.anthropic.com/)
- [Spring AI Anthropic](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)
- [Anthropic Java SDK](https://github.com/anthropics/anthropic-sdk-java)
- [Bytedesk Docs](/docs/intro)
