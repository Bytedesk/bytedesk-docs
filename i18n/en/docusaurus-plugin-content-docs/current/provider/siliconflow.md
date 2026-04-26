---
sidebar_label: SiliconFlow
sidebar_position: 5
---

# SiliconFlow Integration

This page explains how to connect Bytedesk to SiliconFlow models and use SiliconFlow as a cloud inference provider.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a SiliconFlow API key
:::

## Configuration Steps

1. Create an API key in SiliconFlow: [https://www.siliconflow.cn](https://www.siliconflow.cn)
2. Sign in to Bytedesk admin and enter the key
3. Select SiliconFlow as the default provider
4. Generate and embed the chat code

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, Bytedesk can invoke SiliconFlow-backed model services.

![SiliconFlow chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

```bash
SPRING_AI_SILICONFLOW_BASE_URL=https://api.siliconflow.cn
SPRING_AI_SILICONFLOW_API_KEY=sk-xxxx
SPRING_AI_SILICONFLOW_CHAT_ENABLED=true
SPRING_AI_SILICONFLOW_CHAT_OPTIONS_MODEL=Qwen/QwQ-32B
SPRING_AI_SILICONFLOW_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.siliconflow.base-url=https://api.siliconflow.cn
spring.ai.siliconflow.api-key=sk-xxxx
spring.ai.siliconflow.chat.enabled=true
spring.ai.siliconflow.chat.options.model=Qwen/QwQ-32B
spring.ai.siliconflow.chat.options.temperature=0.7
```

## Common Issues

1. Invalid key: confirm the SiliconFlow key is enabled.
2. Slow responses: inspect network and provider load.
3. Feature errors: verify the selected model is available.

## Related Resources

- [SiliconFlow Documentation](https://www.siliconflow.cn/documentation)
- [Spring AI SiliconFlow](https://docs.spring.io/spring-ai/reference/api/chat/siliconflow-chat.html)
- [Bytedesk Docs](/docs/intro)
