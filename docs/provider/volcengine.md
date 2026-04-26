---
sidebar_label: VolcEngine
sidebar_position: 8
---

# VolcEngine Integration

This page explains how to connect Bytedesk to VolcEngine Ark model services.

:::tip Prerequisites

- Bytedesk has been deployed
- You have created a VolcEngine API key
:::

## Configuration Steps

1. Open VolcEngine Ark: [https://console.volcengine.com/ark/apiKey](https://console.volcengine.com/ark/apiKey)
2. Create an API key in the console
3. Sign in to Bytedesk admin and fill in the key
4. Select VolcEngine as the default provider
5. Generate and embed chat code

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## Example Result

After setup, Bytedesk can use VolcEngine-backed AI chat.

![VolcEngine chat effect](/img/deploy/provider/provider-chat.png)

## Optional Notes

- Keep the API key secure and rotate it when needed.
- Validate the selected model and service quota in the VolcEngine console.
- Check provider latency if responses are unstable.

## Common Issues

1. Invalid key: confirm the Ark key is valid.
2. Slow responses: check network and upstream service load.
3. Call failures: verify model access rights in the console.

## Related Resources

- [VolcEngine API Docs](https://www.volcengine.com/docs/82379/1330626)
- [Spring AI Reference](https://docs.spring.io/spring-ai/reference/)
- [Bytedesk Docs](/docs/intro)
