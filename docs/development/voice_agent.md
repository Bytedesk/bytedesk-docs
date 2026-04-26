---
sidebar_label: Voice Assistant
sidebar_position: 73
---

# Voice Assistant

VoiceAgent is a natural interaction experience designed for website visitors in Bytedesk. Instead of typing every question, visitors can press and hold to speak, or switch to text input whenever needed. The system understands what the visitor wants and responds with concise answers that are suitable for voice playback.

For businesses, it can serve as the first intelligent reception layer for website inquiries, product guidance, visitor routing, event Q&A, and pre-sales conversations. The result is simple: visitors start asking faster, and the service experience feels more natural.

:::tip Note
VoiceAgent depends on enterprise AI, speech recognition, and text-to-speech capabilities. It is not available in the community edition by default. Please confirm licensing and related configuration before enabling it.
:::

## What It Can Do

### 1. Let visitors ask questions by voice

On the VoiceAgent page, visitors can start a conversation in two ways:

- Text input: suitable for quiet environments or precise wording
- Press to talk: suitable for mobile use, hands-busy situations, and more natural expression

The system automatically recognizes what the visitor says and turns it into a structured question that can be understood and answered.

### 2. Generate answers that are suitable for spoken playback

VoiceAgent does not simply read long blocks of text aloud. It is designed to generate more natural and conversational answers first. In the current implementation, responses are intentionally kept concise so they can be played back smoothly to the visitor.

That makes it feel more like a speaking digital receptionist than a text bot that only reads content.

### 3. Play responses automatically

By default, the system can automatically play the reply back to the visitor. The experience feels closer to a real spoken interaction:

- The visitor asks a question
- The system understands the request
- A text answer is generated
- The same answer is played back as audio

If audio playback is not convenient, playback can be turned off and the visitor can continue with text only.

### 4. Support multi-turn conversations

VoiceAgent is not limited to one-off replies. Visitors can continue asking follow-up questions, and the system keeps the current conversation context so the interaction feels more like an ongoing dialogue.

### 5. Ask follow-up questions when information is missing

If a visitor asks something incomplete, the system does not rush into a vague answer. Instead, it politely asks for the missing detail first. For example, if someone asks, "How is the weather today?", the assistant can ask for the city or area before replying with something more useful.

## What Visitors See

## Frontend Demo

![voice_agent](/img/voice_agent/voice_agent.png)

From a visitor perspective, the page is intentionally simple. The focus is on two things: start speaking immediately and get an answer quickly.

The page usually includes these core areas:

- Status area at the top: shows the current assistant state, such as ready, listening, processing, or connection error
- Message area: shows visitor questions and assistant replies so the conversation can be reviewed
- Bottom control area: lets visitors switch between voice input and text input
- Recording feedback area: shows recording state, sound level, and elapsed recording time while speaking

For non-technical users, this matters because there is almost no learning cost. They can interact with it the same way they would leave a voice message.

## How One Conversation Works

From a business perspective, one complete interaction usually goes through four steps:

1. The visitor asks a question by speaking or typing.
2. The system understands the input, and voice input is converted into text automatically.
3. AI generates a concise and natural response.
4. The response is shown on screen and can also be played back as audio.

In other words, it connects two capabilities into one experience: understanding the visitor and answering out loud.

## Best-Fit Business Scenarios

### Website inquiry reception

VoiceAgent works well on corporate websites, product websites, and landing pages as a first-touch reception entry. Visitors do not need to find a form or decide how to type their request. They can simply start speaking.

### Pre-sales guidance and product Q&A

It is a strong fit for frequent, repetitive, and standardized questions such as:

- How pricing works
- Whether a feature supports a specific scenario
- How to book a demo
- Whether customization or integration is available

### Service entry routing

Visitors first describe what they need. The system performs an initial understanding step and then either continues with self-service answers or guides the visitor into live chat, lead capture, ticket creation, or another workflow.

### Mobile and accessibility scenarios

In mobile usage, walking situations, driving contexts, or other moments when typing is inconvenient, voice interaction feels more natural than traditional text chat and can improve engagement.

## Business Value

### Increase willingness to start a conversation

Many visitors do have questions but do not want to type. Voice lowers the expression barrier and often increases the chance that a visitor will start the first interaction.

### Shorten the response path

Visitors can describe their needs faster, and the system can respond immediately. This reduces waiting time and cuts down on back-and-forth clarification.

### Make AI service feel more human

Compared with text-only chatbots, voice interaction feels closer to a real conversation. This is especially useful for brands that want a warmer and more differentiated service experience.

### Reduce pressure on live agents

Frequent, standardized, and reusable questions can be handled first by VoiceAgent, leaving live agents to focus on more complex and higher-value conversations.

## Current Boundaries

VoiceAgent already provides a complete voice question-and-answer experience, but it is still positioned as an intelligent reception and guidance assistant, not as a human agent that can freely promise business outcomes. There are several important boundaries in the current implementation:

- Replies are optimized to be natural, concise, and suitable for playback
- When information is insufficient, it asks for key missing details first
- It should not fabricate orders, account details, inventory, ticket status, or system data that does not exist
- It is best suited to consultation, explanation, guidance, and Q&A scenarios

If a business needs higher accuracy for operational answers, it should combine VoiceAgent with knowledge bases, business rules, real APIs, or human handoff workflows.

## Things To Keep In Mind

### 1. Browser microphone permission is required

If the visitor does not grant microphone access, press-to-talk cannot be used. However, text input still remains available.

### 2. Recordings cannot be too short

In the current experience, if the recording is too short or no valid speech is detected, the system asks the visitor to try again instead of generating a bad answer.

### 3. Quiet environments are recommended

The system does its best to recognize speech, but noisy environments, distant microphones, weak networks, or poor recording quality can still affect recognition quality and the overall experience.

### 4. Start with high-frequency standard questions

If a question depends on real-time internal business data, VoiceAgent should usually act as the front entry point rather than handling the final business result completely on its own.

## Recommended Rollout Approach

For most businesses, VoiceAgent works best with a phased rollout:

- First: use it to handle high-frequency questions on websites or landing pages
- Second: organize common questions into standard response guidance
- Third: route complex requests to human agents or downstream service workflows
- Fourth: continuously optimize wording and knowledge content based on real visitor conversations

This approach reduces rollout risk and usually delivers value faster.

## Summary

Bytedesk VoiceAgent can be understood as an intelligent reception entry that can listen, speak, and ask follow-up questions when needed. It connects voice input, AI understanding, automatic replies, and audio playback into one complete interaction flow, upgrading the visitor experience from typed Q&A to a more natural spoken conversation.

If your business wants to lower the barrier to inquiry, improve mobile interaction, and make AI reception feel more approachable, VoiceAgent is a practical capability to deploy.
