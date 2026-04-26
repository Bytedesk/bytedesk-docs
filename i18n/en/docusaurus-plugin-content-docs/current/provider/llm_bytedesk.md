---
sidebar_label: LLM ByteDesk
sidebar_position: 39
---

# LLM ByteDesk

Bytedesk is not only a chat widget or ticketing system. The repository also contains a native AI module that combines model routing, robot orchestration, knowledge-base retrieval, and streaming replies into one product workflow.

## Native AI Capabilities

The built-in AI module covers these core areas:

- multi-provider chat orchestration
- robot and agent management
- knowledge-base retrieval with FAQ and source references
- SSE streaming output for real-time replies
- embedding model discovery and provider selection
- integration with OCR, ASR, TTS, and multimodal workflows documented elsewhere in the provider section

## How It Works in Bytedesk

In the current codebase, a robot can answer in three main modes:

1. LLM only
2. knowledge base only
3. LLM plus knowledge base context

When knowledge-base search is enabled, the AI service aggregates FAQ search results, builds context, and then sends that context into the selected model. When no relevant knowledge is found, the robot can either continue with the LLM or fall back to the default reply, depending on robot settings.

## Provider Routing

Bytedesk can route requests to different providers. The AI module configuration already exposes a primary provider switch, for example:

```yaml
bytedesk:
  ai:
    provider: volcengine
```

The repository also exposes provider-specific implementations for Gitee, DashScope, DeepSeek, Baidu, Tencent, Volcengine, OpenRouter, SiliconFlow, Ollama, Zhipu, and other integrations documented in this section.

## Knowledge Base and Retrieval

The native AI flow is closely tied to the knowledge-base layer:

- FAQ results can be converted into model context
- source references can be attached to streamed answers
- vector or search-backed retrieval can be combined with LLM generation

This makes the Bytedesk-native AI page different from third-party provider pages: it describes the orchestration layer that sits above individual providers.

## Embedding and Model Introspection

The AI module includes services to inspect available embedding models and identify the primary embedding provider at runtime. In the current implementation, embedding providers such as ZhipuAI, Ollama, and DashScope can be detected and exposed through internal services.

## When to Use This Page

Use this page when you want to understand Bytedesk-native AI architecture and product behavior.

Use provider-specific pages when you need concrete setup steps for an external model platform.

## Related Pages

- [Gitee AI Integration](gitee)
- [Model Audio](model_audio)
- [Model OCR](model_ocr)
- [Model ASR](model_asr)
- [Model TTS](model_tts)
- [Multimodal](modal_multi)
