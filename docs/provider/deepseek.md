---
sidebar_label: DeepSeek
sidebar_position: 2
---

# DeepSeek Integration

This page explains how to connect Bytedesk to DeepSeek models and use DeepSeek as the default chat provider. Bytedesk already supports the latest DeepSeek-V4 model identifiers, including deepseek-v4-flash and deepseek-v4-pro.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a DeepSeek API key
:::

## Configuration Steps

### 1. Create an API Key

1. Open the DeepSeek developer portal: [https://api-docs.deepseek.com/zh-cn/](https://api-docs.deepseek.com/zh-cn/)
2. Register and sign in
3. Create an API key in the console
4. Save the generated key

### 2. Configure the Admin Console

1. Sign in to the Bytedesk admin console
2. Open the provider configuration page
3. Fill in the DeepSeek API key

![provider](/img/deploy/provider/provider_api_key.png)

### 3. Choose the Provider

1. Open AI model settings
2. Select DeepSeek as the default provider
3. Save the change

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. Publish Chat Code

1. Find Get Chat Code in the admin console
2. Copy the generated code
3. Embed it into your site

![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After configuration, website chat can use DeepSeek-backed conversation capabilities.

![DeepSeek chat effect](/img/deploy/provider/provider-chat.png)

## Recommended Models

DeepSeek has introduced the DeepSeek-V4 preview series. In Bytedesk, you should prefer the following model names for new configurations:

| Model | Recommendation | Notes |
| --- | --- | --- |
| deepseek-v4-flash | Recommended default | Faster, lower latency, better cost efficiency |
| deepseek-v4-pro | Recommended for advanced tasks | Better for deeper reasoning and agent workflows |
| deepseek-chat | Legacy only | Deprecated on 2026-07-24 |
| deepseek-reasoner | Legacy only | Deprecated on 2026-07-24 |

During the transition period, DeepSeek states that:

- deepseek-chat maps to the non-thinking mode of deepseek-v4-flash
- deepseek-reasoner maps to the thinking mode of deepseek-v4-flash

For any new robot or tenant setup, use deepseek-v4-flash or deepseek-v4-pro directly.

## Optional Configuration

### Docker Environment Variables

```bash
SPRING_AI_DEEPSEEK_BASE_URL=https://api.deepseek.com
SPRING_AI_DEEPSEEK_API_KEY=sk-xxx
SPRING_AI_DEEPSEEK_CHAT_ENABLED=true
SPRING_AI_DEEPSEEK_CHAT_OPTIONS_MODEL=deepseek-v4-flash
SPRING_AI_DEEPSEEK_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_DEEPSEEK_EMBEDDING_ENABLED=true
```

### Source Configuration

```bash
spring.ai.deepseek.base-url=https://api.deepseek.com
spring.ai.deepseek.api-key=sk-xxx
spring.ai.deepseek.chat.enabled=true
spring.ai.deepseek.chat.options.model=deepseek-v4-flash
spring.ai.deepseek.chat.options.temperature=0.7
```

### Migration Notes

If you are still using legacy model names, migrate as soon as possible:

- deepseek-chat -> deepseek-v4-flash
- deepseek-reasoner -> deepseek-v4-pro or deepseek-v4-flash

The base URL does not change. Only the model value needs to be updated.

## Common Issues

1. Invalid API key: verify the key and permission scope.
2. Slow responses: inspect network and server performance. For better response time, use deepseek-v4-flash.
3. Embedding errors: confirm embedding is enabled when needed.
4. Legacy model name still in use: replace deepseek-chat or deepseek-reasoner before 2026-07-24.

## Related Resources

- [DeepSeek API Docs](https://api-docs.deepseek.com/zh-cn/)
- [Spring AI DeepSeek](https://docs.spring.io/spring-ai/reference/api/chat/deepseek-chat.html)
- [DeepSeek-V4 Preview Announcement](https://mp.weixin.qq.com/s/8bxXqS2R8Fx5-1TLDBiEDg)
- [Bytedesk Docs](/docs/intro)
