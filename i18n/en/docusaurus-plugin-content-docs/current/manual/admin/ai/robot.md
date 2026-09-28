---
sidebar_label: Robot
sidebar_position: 1
---

# Bot Management

![Bot management page](/img/manual/admin/ai/robot-new.png)

Bots automatically receive visitors, answer common questions, and support transfer to human agents.

## Bot Accounts

Create and maintain bot accounts under the "Bots" tab.

## Bot Configuration

Under "Bot settings" configure reception behavior:

- **Welcome / tips**: bot greetings
- **Service / display settings**: reception capability and style
- **AI agent**: bound LLM agent
- **Right panel**: chat UI customization
- **Triggers**: automatic trigger rules
- **Tools**: tools the bot can invoke

## Associating a Knowledge Base

A bot must be associated with a knowledge base to answer business questions:

1. Select a knowledge base in the bot settings
2. Set the retrieval type
3. After saving, the bot answers based on the knowledge base

:::note Note
When the bot cannot answer or the visitor asks for a human, the conversation can be transferred automatically or manually.
:::
