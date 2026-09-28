---
sidebar_label: AI Robot
sidebar_position: 1
---

# AI Assistant and Bots

The workspace has built-in AI capabilities that help agents reply faster and improve service quality.

![AI assistant panel](/img/manual/agent/agent_preview.png)

## Agent Assistant

The assistant lives in the right panel of a conversation and provides three capabilities:

| Capability | Description |
| --- | --- |
| Generate reply | Suggest a reply based on the current conversation |
| Summarize | Generate a conversation summary |
| Next step | Suggest follow-up handling |

How to use:

1. Open the "Agent assistant" tab in the right panel
2. Click the capability button
3. Review the result; click "Insert into input box" to bring the suggestion into the input area
4. Confirm and send

:::tip Tip
The assistant requires the "Agent assistant" switch in settings and a configured LLM.
:::

## Working with Bots

Bots can receive visitors when agents are offline or busy, and transfer to humans at any time:

- **Bot reception**: visitors stay in the "Bot conversations" category and the bot replies automatically
- **Transfer to agent**: when the bot cannot solve the issue or the visitor asks for a human, the conversation moves to "Queue"
- **Agent takeover**: agents can take over a bot conversation directly

## Managing Bots

The "Bots" page of the workspace manages bot accounts:

1. Select a bot category on the left and view the bot list on the right
2. Add, edit, or delete bots
3. Each bot can be configured with:
   - **LLM**: provider, model, temperature, Top P, Top K, context messages, max tokens
   - **Knowledge base**: enable/disable, retrieval type, and selection
   - **Prompt**: bot persona and reply rules
   - **Default reply**: fallback when the knowledge base has no hit

:::note Note
Full bot configuration is usually done in the "AI" module of the admin console; the workspace side focuses on daily use and quick adjustments.
:::
