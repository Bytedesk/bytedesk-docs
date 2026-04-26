---
sidebar_label: DashScope
sidebar_position: 4
---

# DashScope Integration

This page explains how to connect Bytedesk to Alibaba Cloud DashScope models and use DashScope as the default model provider.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a DashScope API key in Alibaba Cloud Bailian
:::

## Configuration Steps

### 1. Create an API Key

1. Open the DashScope console: [https://bailian.console.aliyun.com/?apiKey=1#/api-key](https://bailian.console.aliyun.com/?apiKey=1#/api-key)
2. Sign in to your Alibaba Cloud account
3. Create an API key
4. Save the generated key securely

### 2. Configure Bytedesk Admin

1. Sign in to the Bytedesk admin console
2. Open the provider or API key configuration page
3. Enter the DashScope API key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. Select the Model Provider

1. Open the AI model settings page
2. Choose DashScope as the default provider
3. Save the configuration

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. Embed the Chat Code

1. Find the Get Chat Code option in the admin console
2. Copy the generated embed code
3. Add it to your website or application

![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After the configuration is complete, the website chat widget can call DashScope-backed AI capabilities.

![DashScope chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

### Docker Environment Variables

```bash
SPRING_AI_DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode
SPRING_AI_DASHSCOPE_API_KEY=sk-xxx
SPRING_AI_DASHSCOPE_CHAT_ENABLED=true
SPRING_AI_DASHSCOPE_CHAT_OPTIONS_MODEL=deepseek-r1
SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_DASHSCOPE_AUDIO_TRANSCRIPTION_ENABLED=false
SPRING_AI_DASHSCOPE_IMAGE_ENABLED=false
SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED=true
SPRING_AI_DASHSCOPE_AUDIO_SYNTHESIS_ENABLED=false
```

### Source Configuration

```bash
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com/compatible-mode
spring.ai.dashscope.api-key=sk-xxx
spring.ai.dashscope.chat.enabled=true
spring.ai.dashscope.chat.options.model=deepseek-r1
spring.ai.dashscope.chat.options.temperature=0.7
spring.ai.dashscope.chat.options.topP=3
spring.ai.dashscope.audio.transcription.enabled=false
spring.ai.dashscope.image.enabled=false
spring.ai.dashscope.embedding.enabled=true
spring.ai.dashscope.audio.synthesis.enabled=false
```

## Common Issues

1. Invalid API key: confirm the key is correct and enabled.
2. Slow responses: check network latency and tune model parameters.
3. Feature errors: verify the related switches are enabled.

## Related Resources

- [Alibaba Cloud Bailian](https://bailian.console.aliyun.com/?spm=a2c4g.11186623.0.0.11c67980m5X2VR#/model-market)
- [Spring AI DashScope](https://docs.spring.io/spring-ai/reference/api/chat/dashscope-chat.html)
- [Bytedesk Docs](/docs/intro)
