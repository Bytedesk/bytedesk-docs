---
sidebar_label: Tencent
sidebar_position: 7
---

# Tencent Integration

This page explains how to connect Bytedesk to Tencent Hunyuan models.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a Tencent Hunyuan API key
:::

## Configuration Steps

1. Open Tencent Cloud Hunyuan: [https://console.cloud.tencent.com/hunyuan/start](https://console.cloud.tencent.com/hunyuan/start)
2. Enable the Hunyuan service and create an API key
3. Sign in to Bytedesk admin and fill in the key
4. Select Tencent as the default provider
5. Generate and embed chat code

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, the Bytedesk widget can use Tencent Hunyuan models.

![Tencent chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

```bash
SPRING_AI_TENCENT_BASE_URL=https://api.hunyuan.cloud.tencent.com
SPRING_AI_TENCENT_API_KEY=sk-xxx
SPRING_AI_TENCENT_CHAT_ENABLED=true
SPRING_AI_TENCENT_CHAT_OPTIONS_MODEL=hunyuan-t1-latest
SPRING_AI_TENCENT_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.tencent.base-url=https://api.hunyuan.cloud.tencent.com
spring.ai.tencent.api-key=sk-xxx
spring.ai.tencent.chat.enabled=true
spring.ai.tencent.chat.options.model=hunyuan-t1-latest
spring.ai.tencent.chat.options.temperature=0.7
```

## Common Issues

1. Invalid key: verify service activation and key status.
2. Model call failure: check quota and current model availability.
3. Slow responses: inspect network and retry with a lighter configuration.

## Related Resources

- [Tencent Hunyuan Docs](https://cloud.tencent.com/document/product/1729/111007)
- [Tencent Hunyuan Console](https://console.cloud.tencent.com/hunyuan/start)
- [Bytedesk Docs](/docs/intro)
