---
title: Moonshot Integration
sidebar_label: Moonshot
sidebar_position: 10
description: Guide for integrating Bytedesk with Moonshot Kimi models
---

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a Moonshot Kimi API key
- You understand the parameter constraints of the selected model, especially `kimi-k2.6`
:::

## Configuration Steps

### 1. Create an API Key

1. Visit the [Moonshot Platform](https://platform.moonshot.cn/)
2. Sign in to your Moonshot account
3. Create an API key in the console
4. Save the generated key for Bytedesk admin or config-file based setup

### 2. Configure It in Bytedesk Admin

1. Sign in to the Bytedesk admin console
2. Open the AI provider configuration page
3. Add or edit a Moonshot provider entry
4. Fill in the core values below:

- `baseUrl`: `https://api.moonshot.cn`
- `apiKey`: the API key created in Moonshot
- `model`: recommended `kimi-k2.6`

> Screenshots will be added later.

### 3. Select the Model

1. Open the AI model configuration page
2. Choose Moonshot as the default model, or bind it to a specific bot
3. Save the configuration

Recommended model:

- `kimi-k2.6`: the current default Kimi model used in this repository

> Screenshots will be added later.

### 4. Get the Chat Embed Code

1. Find the "Get Chat Code" entry in the admin console
2. Copy the generated code snippet
3. Embed it into your website

> Screenshots will be added later.

## Result

After setup, Bytedesk can use Moonshot Kimi for visitor chat and bot conversations.

> Chat effect screenshots will be added later.

## Optional Configuration

### Docker Deployment

```bash
# Moonshot API settings
SPRING_AI_MOONSHOT_BASE_URL: https://api.moonshot.cn
SPRING_AI_MOONSHOT_API_KEY: 'sk-xxx'                 # Replace with your Moonshot API key
SPRING_AI_MOONSHOT_CHAT_ENABLED: true                # Enable Moonshot chat

# Model settings
SPRING_AI_MOONSHOT_CHAT_OPTIONS_MODEL: kimi-k2.6     # Recommended model
SPRING_AI_MOONSHOT_CHAT_OPTIONS_TEMPERATURE: 1       # Recommended fixed value for kimi-k2.6

# Notes
# For kimi-k2.6, the service currently normalizes temperature=1 and top_p=0.95
# Dynamic bot maxTokens will be mapped to max_completion_tokens
```

### Source Deployment

```bash
# Moonshot API settings
spring.ai.moonshot.base-url=https://api.moonshot.cn
spring.ai.moonshot.api-key=sk-xxx                    # Replace with your Moonshot API key
spring.ai.moonshot.chat.enabled=true                 # Enable Moonshot chat

# Model settings
spring.ai.moonshot.chat.options.model=kimi-k2.6      # Recommended model
spring.ai.moonshot.chat.options.temperature=1         # Recommended fixed value for kimi-k2.6

# You can also inject the API key via environment variable
# export SPRING_AI_MOONSHOT_API_KEY=<INSERT KEY HERE>
```

### Parameter Notes

The Moonshot integration in this repository already includes compatibility handling for `kimi-k2.6`:

- `temperature` is normalized to `1`
- `top_p` is normalized to `0.95`
- Bot-level `maxTokens` is mapped to `max_completion_tokens`
- `kimi-k2.*` models support `thinking`, which is toggled from bot configuration

:::tip Notes

- Replace `sk-xxx` with your real API key
- Prefer `kimi-k2.6` unless you have a clear reason to switch
- If Moonshot is configured per bot, Bytedesk will handle part of the model-specific compatibility automatically
:::

## Common Issues

1. **Invalid API key**
   - Verify the key was copied correctly
   - Confirm the key is active
   - Check whether the key has permission to call the target model

2. **400 invalid parameter errors**
   - Confirm the model is `kimi-k2.6`
   - Avoid forcing incompatible sampling values manually
   - The current known requirement for this model is `temperature=1` and `top_p=0.95`

3. **Slow or failed responses**
   - Check network connectivity and Moonshot platform availability
   - Inspect Bytedesk server logs for the actual response body
   - Verify `baseUrl`, `apiKey`, and model name in admin or config files

4. **Configured but not taking effect**
   - Check whether `spring.ai.moonshot.chat.enabled` is enabled
   - Confirm the current bot or default model is actually bound to Moonshot
   - For source deployment, make sure the Moonshot properties are not still commented out in the active profile

## Related Resources

- [Moonshot Platform](https://platform.moonshot.cn/)
- [Kimi API Docs](https://platform.moonshot.cn/docs)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/api/chat/)
- [Bytedesk Docs](/docs/intro)
