---
sidebar_label: Thread
sidebar_position: 1
---

# Conversation Workspace

The conversation workspace is the core page for daily reception. It consists of four parts: conversation categories, conversation list, chat window, and right panel.

![Conversation workspace layout](/img/manual/agent/chat.png)

## Page Layout

| Area | Description |
| --- | --- |
| Conversation categories | Groups conversations by type and status to quickly locate pending items |
| Conversation list | Conversations under the current category |
| Chat window | Message exchange with the visitor and the input area |
| Right panel | Agent assistant, quick replies, visitor info, ticket details, etc. |

## Conversation Categories

Common categories and their meanings:

| Category | Description |
| --- | --- |
| Ongoing | Conversations currently being handled |
| Queue | Visitors waiting to be accepted |
| History | Ended conversations |
| Pending messages | Offline messages left by visitors |
| Pending tickets | Conversations with pending tickets |
| Manual-route pool | Route-pool conversations awaiting manual acceptance |
| Bot conversations | Conversations currently handled by bots |
| Folded | Folded conversations |

By default the following are shown: Ongoing, History, Queue, All, and Folded.

## Accepting a Visitor

After a visitor starts a consultation, the conversation appears under "Queue".

1. Open the "Queue" category
2. Click the "Accept" button next to the target visitor
3. The conversation moves to "Ongoing" and you can start replying

:::tip Tip
You can enable "Auto-accept next queued visitor" in settings; the system then accepts visitors in order automatically.
:::

## Replying to Visitors

From the input area at the bottom of the chat window you can send:

- **Text**: type and press Enter (or Ctrl/Enter) to send
- **Emojis**: click the emoji button to pick one
- **Images / files**: click the upload button to choose files
- **Voice**: switch to voice input, record, and send
- **Quick phrases**: quick replies are suggested while typing, or type `/` to trigger quick commands

Sent messages support right-click actions: copy, translate, text-to-speech, recall, zoom, add to quick replies, download, speech-to-text, forward, favorite, multi-select, remind, pin, and more.

## Using Quick Replies

1. Open the "Quick replies" tab in the right panel
2. Click or search for the target quick reply
3. The content is inserted into the input box; confirm and send

Quick replies are maintained by administrators in the admin console and greatly speed up answers to common questions.

## Transferring a Conversation

To hand a visitor over to another agent or workgroup:

1. Click the "Transfer" button at the top of the chat window
2. Choose the target agent or workgroup
3. Confirm the transfer

The visitor's conversation moves to the target agent, who continues the reception.

## Inviting Colleagues

To bring a colleague into the current conversation:

1. Click the "Invite" button at the top of the chat window
2. Select the colleague to invite
3. Once accepted, they join the conversation

The invitation pops up on the colleague's workspace for accept or decline.

## Creating a Ticket

1. Click the "Create ticket" button at the top of the chat window
2. Fill in the title, summary, category, priority, and handler
3. Optionally associate the current visitor conversation
4. After saving, the ticket appears and can be tracked in the "Ticket details" panel

## Conversation Summary

Click "Summary" at the top of the chat window; the system generates a summary of the conversation for record-keeping and handover.

## Ending a Conversation and Inviting a Rating

1. Click the "End conversation" button at the top of the chat window
2. Confirm the end
3. Optionally choose "Invite rating" to send a satisfaction survey to the visitor

Ended conversations move to "History" and can be reviewed anytime.

## Right Panel

The right panel provides several tabs:

| Tab | Description |
| --- | --- |
| Agent assistant | AI reply suggestions, summary, and next-step suggestions |
| Quick replies | Quick reply library |
| Ticket details | The ticket associated with the current conversation |
| Flow records | Ticket transfer records |
| Visitor info | Visitor profile |
| Conversation info | Current conversation attributes |
| History | The visitor's past conversations |
| Past tickets | The visitor's past tickets |

## AI Assistant

The "Agent assistant" tab in the right panel assists you during reception:

![AI assistant](/img/manual/agent/agent_assistant.png)

- **Generate reply**: suggests a reply based on the conversation; insert it into the input box with one click
- **Summarize**: generates a conversation summary for handover and records
- **Next step**: suggests follow-up actions (transfer, create a ticket, end the conversation)

## Unread Message Reminders

When there are unread messages, badges appear on the conversation list and navigation menu, and a reminder pops up if they remain unhandled:

![Unread message reminder](/img/manual/agent/agent_thread_unread_tip.png)

## Monitor, Whisper, and Takeover

In the Enterprise edition, supervisors can monitor, whisper into, or take over workgroup conversations:

- **Monitor**: observe the conversation
- **Whisper**: join the conversation and reply
- **Take over**: take over the handling of the conversation

The related buttons appear at the top of the chat window and disappear after exiting.
