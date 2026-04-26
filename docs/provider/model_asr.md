---
sidebar_label: ASR Capabilities
sidebar_position: 27
---

# ASR Capabilities

Bytedesk supports ASR (Automatic Speech Recognition) capabilities for customer service scenarios. ASR converts speech into text so that voice messages, speech input, and audio content can be searched, reused, audited, and processed by AI.

## What ASR Solves

In support conversations, customers may send voice messages instead of text. Agents may also want to dictate replies instead of typing them. Without ASR, voice content is harder to review, search, summarize, and reuse.

With ASR, Bytedesk helps teams:

- Convert voice messages into readable text
- Support speech-to-text input for agents
- Make audio content searchable and easier to archive
- Prepare speech content for AI summaries, quality review, and workflow automation

## ASR Features Already Supported

### 1. ASR Testing In Admin Console

The admin console provides an ASR testing entry for uploaded audio files and microphone-based speech recognition tests.

ASR test calls are recorded in AsrEntity for auditing, troubleshooting, and model evaluation.

### 2. Speech-To-Text Input In Desktop Agent

The desktop agent workspace includes SpeechInputModal, which allows agents to speak and convert speech into text before sending or editing a reply.

These recognition calls are also persisted to AsrEntity.

### 3. One-Click Transcription For Voice Messages

Agents can right-click a voice message in the desktop workspace and transcribe it into text.

This is useful when:

- Customers describe issues by voice
- Agents want to read instead of replaying audio repeatedly
- Voice content needs to be copied into tickets, notes, or workflows

This transcription path is also stored in AsrEntity.

## Typical Customer Service Use Cases

### 1. Agent Input Efficiency

- Dictate replies instead of typing long messages
- Reduce text entry time during busy service sessions
- Improve handling speed for agents managing many chats

### 2. Voice Message Processing

- Convert customer voice messages into text
- Make voice content easier to search, copy, forward, and archive
- Support supervisor review and quality control

### 3. AI And Automation Workflows

- Send transcribed speech into bots or LLM pipelines
- Use ASR output for summaries, intent analysis, and routing
- Feed transcribed content into tickets, knowledge base, and analytics

## Business Value

ASR in Bytedesk helps teams:

- Treat voice content like standard text data
- Reduce time spent replaying audio messages
- Improve processing speed in voice-heavy conversations
- Build structured text data for quality and AI analysis

## Recommended Adoption Path

- Validate recognition quality in the admin console first
- Enable agents to use speech-to-text input and voice message transcription
- Combine ASR output with summaries, tickets, bots, and analytics workflows

## Summary

Bytedesk already provides customer-service-oriented ASR capabilities, including admin-side testing, desktop speech-to-text input, one-click transcription for voice messages, and persistence of recognition records. This gives support teams a practical foundation for voice workflows and later AI automation.
