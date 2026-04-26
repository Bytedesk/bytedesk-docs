---
sidebar_label: GiteeAi
sidebar_position: 6
---

# Gitee AI Integration

:::tip Prerequisites

- A deployed Bytedesk instance
- A Gitee AI API key from [Gitee AI](https://ai.gitee.com/)
- Access to the admin console to configure AI providers

:::

## What Bytedesk Supports

The repository includes a dedicated Gitee provider implementation under the AI module. It supports:

- chat model and chat client wiring
- synchronous responses and SSE streaming
- model discovery through a REST endpoint
- token accounting and robot-level model selection

In the codebase, Gitee is registered as a standard LLM provider alongside DashScope, DeepSeek, Baidu, Tencent, Volcengine, OpenRouter, SiliconFlow, and others.

## Admin Setup

1. Sign in to the Bytedesk admin console.
2. Open the AI provider configuration page.
3. Choose Gitee as the provider.
4. Fill in the API key and model name.
5. Save the configuration and bind the provider to the target robot or workflow.

![provider](/img/deploy/provider/provider_api_key.png)

## Recommended Configuration

The Gitee integration is enabled through the Spring AI configuration set. The implementation reads the following properties:

```yaml
spring:
  ai:
    gitee:
      base-url: https://api.gitee.com
      api-key: sk-xxx
      chat:
        enabled: true
        options:
          model: gitee-chat
          temperature: 0.7
```

If you deploy with environment variables, the same settings can be mapped like this:

```bash
SPRING_AI_GITEE_BASE_URL=https://api.gitee.com
SPRING_AI_GITEE_API_KEY=sk-xxx
SPRING_AI_GITEE_CHAT_ENABLED=true
SPRING_AI_GITEE_CHAT_OPTIONS_MODEL=gitee-chat
SPRING_AI_GITEE_CHAT_OPTIONS_TEMPERATURE=0.7
```

## Built-in Service Endpoints

Bytedesk exposes a built-in model discovery endpoint for the Gitee provider:

```text
GET /gitee/api/v1/models
```

This is useful when you want to inspect available models before binding one to a robot.

## Typical Usage Flow

1. Configure the Gitee API key.
2. Select Gitee as the active chat provider for a robot.
3. Test a conversation in the admin console or embedded chat entry.
4. Enable SSE-based replies when you want streaming output.

![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)
![provider-chat](/img/deploy/provider/provider-chat.png)

## Troubleshooting

- If Gitee is not available at runtime, first verify `spring.ai.gitee.chat.enabled=true`.
- If requests fail immediately, recheck the API key and base URL.
- If no model can be selected, call `/gitee/api/v1/models` to confirm model discovery works.
- If the robot falls back to the default reply, check whether the robot is actually bound to the Gitee-backed LLM profile.

## Related Pages

- [Model Audio](model_audio)
- [Model OCR](model_ocr)
- [Model ASR](model_asr)
- [Model TTS](model_tts)
- [Bytedesk Native AI](llm_bytedesk)
