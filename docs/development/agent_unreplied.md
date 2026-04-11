---
sidebar_label: Agent Unreplied
sidebar_position: 68
---

# Agent Unreplied

Bytedesk provides an unreplied session reminder feature for agent workspaces. It helps agents quickly identify conversations where a visitor has already sent a message but has not yet received an effective reply.

This feature is especially useful in busy support environments with multiple concurrent chats, workgroup-based routing, and bot-to-agent handoff scenarios.

## Why It Matters

The unreplied session feature helps support teams:

- spot visitor messages that still need a response
- reduce missed replies and delayed first responses
- prioritize urgent conversations with timeout indicators
- automatically clear reminders after an agent or bot has already replied

## Trigger Rules

A conversation is considered an unreplied session when all of the following are true:

- the conversation contains a new visitor message
- that visitor message has not been effectively replied to yet
- the message is not a system message or a notice message

Default behavior:

- only visitor messages are counted as unreplied
- system messages and notice messages are excluded
- agent replies automatically clear the unreplied state
- bot replies can also clear the unreplied state
- unreplied state is evaluated consistently within the same conversation topic

## UI Behavior

When a visitor sends a message and it is still waiting for a reply, the agent workspace shows the reminder in multiple places:

- the FilterList displays an Agent Unreplied menu item
- the menu shows the current unreplied session count
- the chat area highlights the latest unreplied visitor message
- clicking the unreplied menu opens a focused list of unreplied sessions

## Unreplied Reminder

Before the agent replies, the system automatically shows the unreplied counter and marks the relevant visitor message.

![agent_unreplied](/img/unreplied/agent_unreplied.png)

## Unreplied Session List

The unreplied list helps agents quickly review:

- which sessions are still waiting for a response
- the related visitor and latest message preview
- how long the session has been waiting
- whether the session has already timed out

This is useful when one agent is handling multiple chats and needs to respond in priority order.

## Countdown And Timeout

The system calculates waiting time automatically and shows a countdown or timeout state:

- before timeout, the remaining response window is shown
- after timeout, the reminder becomes more visible
- agents can use the waiting duration to prioritize the most urgent sessions first

![agent_unreplied_countdown](/img/unreplied/agent_unreplied_countdown.png)

## Automatic Cleanup After Reply

Once an agent has replied, the system automatically clears the unreplied reminder without requiring a manual refresh:

- the unreplied counter is updated immediately
- the unreplied marker in the chat view disappears automatically
- the session is removed from the unreplied list

This keeps the UI aligned with the real support status at all times.

## Cleanup After Reply

![agent_unreplied_replied](/img/unreplied/agent_unreplied_replied.png)

## Typical Scenarios

### 1. Human Agent Support

When a visitor sends a new message and the agent has not answered yet, the conversation enters the unreplied state. After the agent replies, the reminder is removed automatically.

### 2. Team Collaboration In Workgroups

In multi-agent support teams, unreplied sessions make it easier to identify which conversations still need attention and help reduce missed responses.

### 3. Bot-To-Agent Handoff

If a bot has already provided an effective reply, the system will not keep the same message in the unreplied state. If the visitor sends another message later and no one replies yet, the conversation can enter the unreplied state again.

## Recommended Usage

- keep an eye on the unreplied session count in the agent workspace
- use timeout state as part of your service quality monitoring
- combine unreplied sessions with queue sessions, pending message leaves, and pending tickets for a more complete support dashboard

## FAQ

### Why does a conversation become unreplied?

Because the system has detected a new visitor message that still has no effective response from an agent or bot.

### Why are system messages not included?

Because system and notice messages are not customer inquiries and do not require an agent response.

### Why does the reminder disappear automatically after a reply?

Because the workspace synchronizes the unreplied state immediately after a successful reply, keeping counters and visual markers accurate.

### Why is this feature important?

Because it helps support teams reduce missed replies, improve first-response efficiency, and maintain a better customer service experience.

## Summary

The unreplied session feature is one of the core reminder capabilities in the Bytedesk agent workspace. By automatically detecting visitor messages that still need a response, displaying counters, showing countdown and timeout states, and clearing reminders after a reply, it helps support teams work faster, reduce missed conversations, and improve service quality.
