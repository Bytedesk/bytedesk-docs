---
sidebar_label: Baidu
sidebar_position: 8
---

# Baidu Integration

This page explains how to connect Bytedesk to Baidu Qianfan models and use Baidu as an AI provider.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a Baidu Qianfan API key
:::

## Configuration Steps

1. Sign in to Baidu Cloud and create an API key in IAM: [https://console.bce.baidu.com/iam/#/iam/apikey/list](https://console.bce.baidu.com/iam/#/iam/apikey/list)
2. Enable the Qianfan or Wenxin service in the Baidu console
3. Sign in to Bytedesk admin and enter the API key
4. Select Baidu as the default model provider
5. Generate and embed the chat code in your website

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, website chat can use Baidu Qianfan-backed models.

![Baidu chat effect](/img/deploy/provider/provider-chat.png)

## Optional Configuration

```bash
SPRING_AI_BAIDU_BASE_URL=https://qianfan.bj.baidubce.com
SPRING_AI_BAIDU_API_KEY=bce-v3/xxx
SPRING_AI_BAIDU_CHAT_ENABLED=true
SPRING_AI_BAIDU_CHAT_OPTIONS_MODEL=ernie-x1-32k-preview
SPRING_AI_BAIDU_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.baidu.base-url=https://qianfan.bj.baidubce.com
spring.ai.baidu.api-key=bce-v3/xxx
spring.ai.baidu.chat.enabled=true
spring.ai.baidu.chat.options.model=ernie-x1-32k-preview
spring.ai.baidu.chat.options.temperature=0.7
```

## Common Issues

1. Invalid key: confirm the Baidu key is active.
2. Model calls fail: verify Qianfan service is enabled.
3. Slow responses: inspect network and model choice.

## Related Resources

- [Baidu Qianfan Docs](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Fm2vrveyu)
- [Baidu Cloud Console](https://console.bce.baidu.com)
- [Bytedesk Docs](../intro.md)
