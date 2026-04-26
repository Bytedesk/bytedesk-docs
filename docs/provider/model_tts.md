---
sidebar_label: TTS Capabilities
sidebar_position: 28
---

# TTS Capabilities

Bytedesk supports TTS (Text To Speech) capabilities for customer service scenarios. TTS converts written text into spoken audio, enabling voice playback, standardized spoken responses, and future AI voice interactions.

## What TTS Solves

Support teams do not always work in text-only environments. In some cases, agents need to listen to text quickly, deliver spoken guidance, or prepare for voice-based service experiences.

With TTS, Bytedesk helps teams:

- Turn text messages into playable speech
- Reuse standard replies as spoken audio
- Prepare AI-generated responses for voice output
- Build a foundation for voice-based support workflows

## TTS Features Already Supported

### 1. TTS Testing In Admin Console

The admin console includes a dedicated TTS testing entry where administrators can input text and generate speech to verify whether TTS is available for the current organization and configuration.

The current admin page supports the following testing workflow:

- Input text content and execute TTS immediately
- Filter available voices by language, including Simplified Chinese, Cantonese / Traditional Chinese, English, Japanese, Korean, French, German, and Spanish
- View voice metadata such as voice name, voice code, suggested scenarios, traits, and whether the voice supports SSML, Instruct, or timestamps
- Play preview audio directly for voices that already have local preview assets wired into the project
- Choose audio output format such as mp3 or wav
- Review DashScope TTS model descriptions and usage guidance in the advanced settings panel

TTS test calls are stored in TtsEntity, which helps with review, troubleshooting, and operations analysis. The admin list also shows text content, model, language, voice, execution status, audio result, and creation time, and supports both single deletion and batch deletion.

![tts](/img/tts/tts.png)

### Voice Selection

Based on the latest implementation, this section is more accurately described as voice browsing and voice selection assistance rather than completely free voice customization. The page filters voices by language and shows descriptive metadata so administrators can quickly evaluate which voice best matches a customer service scenario.

At the current stage, the test flow still runs mainly with the default system voice path. The page is primarily used to:

- Browse system voices supported by the current model set
- Check which voices fit scenarios such as support playback, voice assistants, or professional narration
- Confirm whether a voice has a local preview asset or requires checking the official voice list
- Verify language and voice compatibility before formal rollout

![tts_yinse](/img/tts/tts_yinse.png)

### Model Selection

With the latest admin implementation, this section is better understood as model guidance and advanced parameter confirmation. The page already summarizes several DashScope TTS models across dimensions such as quality, latency, cost, multilingual support, educational reading, and brand voice customization.

At the moment, the admin test flow is fixed within the DashScope TTS capability range, and the default execution model is cosyvoice-v3-flash. The model list, tags, and official guide link are mainly used to:

- Understand the supported scenarios and cautions of each model
- Compare plus, flash, v1, v2, and v3 series capabilities
- Prepare model selection decisions for later production rollout or future expansion
- Avoid pairing incompatible models with system voice expectations

![tts_model](/img/tts/tts_model.png)

### 2. Speech Playback For Text Messages In Desktop Agent

In the desktop agent workspace, agents can right-click a text message and play it as speech.

This is useful for:

- Listening to long text content instead of reading it
- Handling multiple tasks while continuing to consume message content
- Reusing written content in a more natural spoken form

The system prefers the backend TTS synthesis path when generating playable audio.

## Typical Customer Service Use Cases

### 1. Standard Response Playback

- Turn common replies and service instructions into speech
- Reduce repeated reading effort for agents
- Keep response delivery more consistent
- Confirm language, default voice, and audio format in the admin console before rollout

### 2. AI Voice Output Foundation

- Convert LLM-generated text into speech
- Prepare for voice bots, phone support, and AI voice assistants
- Support more natural human-computer interaction scenarios
- Use persisted execution records to inspect success rates, failure reasons, and generated audio quality

### 3. Accessibility And Multi-Context Delivery

- Help users or agents who prefer listening over reading
- Fit headset, voice-notification, and audio workflow scenarios
- Improve information access during mobile or fast-paced work

## Business Value

TTS in Bytedesk helps teams:

- Turn static text into usable audio content
- Improve communication efficiency and flexibility
- Provide a base layer for AI voice responses
- Support future phone, audio, and intelligent assistant scenarios

## Recommended Adoption Path

- Validate language, default voice, model guidance, and audio format in the admin console first
- Let agents use speech playback for text messages in daily work
- Use admin execution records to investigate failures, verify audio output, and retain operational evidence
- Gradually connect TTS with bots, AI assistants, and voice service scenarios

## Summary

Bytedesk already provides practical TTS capabilities for support teams, including admin-side testing, language and voice selection assistance, model guidance, persisted TTS records, and text-message speech playback in the desktop workspace. This gives teams a workable foundation for voice-enabled support and future AI voice experiences.

## Reference Links

- Alibaba Cloud TTS model guide: [Alibaba Cloud Model Studio TTS Guide](https://help.aliyun.com/zh/model-studio/text-to-speech)
- Alibaba Cloud CosyVoice voice list: [Alibaba Cloud CosyVoice Voice List](https://help.aliyun.com/zh/model-studio/cosyvoice-voice-list)
