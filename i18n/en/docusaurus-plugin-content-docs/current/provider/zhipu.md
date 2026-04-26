---
sidebar_label: Zhipu
sidebar_position: 3
---

# Zhipu Integration

This page explains how to connect Bytedesk to Zhipu AI models and use Zhipu as a configurable model provider for chat and embedding.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a Zhipu AI API key
:::

## Configuration Steps

### 1. Create an API Key

1. Open [https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
2. Sign in to your Zhipu AI account
3. Create an API key
4. Save the generated key

### 2. Configure the Admin Console

1. Sign in to the Bytedesk admin console
2. Open the API key configuration page
3. Fill in the Zhipu AI key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. Select Zhipu as Default Provider

1. Open AI model settings
2. Choose Zhipu AI
3. Save the configuration

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. Embed Chat Code

1. Generate chat code in the admin console
2. Copy the output
3. Add it to your site

![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, the website chat entry can use Zhipu-backed AI capabilities.

![Zhipu chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

### Docker Environment Variables

```bash
SPRING_AI_ZHIPUAI_API_KEY=sk-xxx
SPRING_AI_ZHIPUAI_CHAT_ENABLED=true
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL=glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED=true
```

### Source Configuration

```bash
spring.ai.zhipuai.api-key=sk-xxx
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.embedding.enabled=true
```

## Common Issues

1. Invalid API key: confirm the key is active.
2. Slow responses: check network conditions and model selection.
3. Embedding errors: verify that embedding is enabled when needed.

## Related Resources

- [Zhipu AI Platform](https://open.bigmodel.cn/overview)
- [Spring AI Zhipu](https://docs.spring.io/spring-ai/reference/api/chat/zhipuai-chat.html)
- [Bytedesk Docs](/docs/intro)
