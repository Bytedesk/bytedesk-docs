---
sidebar_label: 对接 微语
sidebar_position: 39
---

# 对接 微语

这不是一个第三方模型平台接入页，而是微语原生 AI 能力总览页。仓库中已经包含独立的 AI 模块，用来统一承接模型路由、机器人编排、知识库检索、SSE 流式回复与多模态能力扩展。

## 微语原生 AI 能力

当前代码库中的原生 AI 体系主要覆盖：

- 多 provider 大模型调度
- 机器人与智能体管理
- FAQ/知识库检索与上下文拼装
- SSE 流式输出
- Embedding 模型探测与主模型识别
- 与 OCR、ASR、TTS、多模态能力联动

## 在微语中的工作方式

从现有实现看，机器人主要有三种回答模式：

1. 仅使用 LLM
2. 仅使用知识库
3. LLM + 知识库上下文

当机器人启用了知识库搜索后，系统会先聚合 FAQ 检索结果，再把整理后的上下文送入当前模型；如果知识库没有命中结果，则可以根据机器人配置继续调用大模型，或者直接回退到默认回复。

## Provider 路由

微语原生 AI 并不绑定单一模型厂商。当前 AI 模块已经暴露主 provider 配置，例如：

```yaml
bytedesk:
  ai:
    provider: volcengine
```

仓库里已经实现了 Gitee、DashScope、DeepSeek、Baidu、Tencent、Volcengine、OpenRouter、SiliconFlow、Ollama、Zhipu 等 provider，对外文档分别放在本目录下的对应页面中。

## 知识库与检索增强

微语原生 AI 的关键价值在于它把知识库能力和模型能力串在了一起：

- FAQ 检索结果可直接拼装为提示词上下文
- 回答中可以附带来源引用
- 向量检索与 FAQ 搜索可作为模型前置增强层

因此，这一页描述的是“编排层”和“产品层”，而不是单一外部厂商的 API 对接步骤。

## Embedding 与运行时探测

AI 模块中还提供了 Embedding 模型查询服务，可在运行时识别当前可用的 embedding provider，并标识主 embedding provider。现有实现中已经覆盖 ZhipuAI、Ollama、DashScope 等模型类型。

## 什么时候看这一页

- 想理解微语原生 AI 架构和产品能力时，看这一页。
- 想配置某个外部 provider 时，查看对应的 provider 接入页。

## 相关页面

- [Gitee AI 魔力方舟大模型对接](gitee)
- [语音能力总览](model_audio)
- [OCR 能力](model_ocr)
- [ASR 能力](model_asr)
- [TTS 能力](model_tts)
- [多模态能力](modal_multi)
