---
sidebar_label: Chat Memory
sidebar_position: 36
---

# Chat Memory (Multi-turn Conversation Memory)

## What Is It

Chat Memory lets your AI robot **remember what was said earlier in the same conversation**.

Without memory, a robot answers every question in isolation — ask it "how much is it?", then "and what about shipping?", and it won't know what "it" refers to. With Chat Memory enabled, the robot reads the earlier exchanges before answering, so follow-up questions just work:

> **Visitor**: My name is Zhang San, I want to check my order.
> **Robot**: Hello Zhang San! Could you tell me your order number?
> **Visitor**: I forgot, who am I again?
> **Robot**: You are Zhang San. You can also find the order number in the "My Orders" page…

Chat Memory is **on by default** for every LLM-enabled robot, and works with all models connected through the Bytedesk AI gateway, including DeepSeek, Zhipu GLM, and Alibaba DashScope (Tongyi Qianwen). Memory even carries across visits: the same visitor returning to the same workgroup or robot continues from the same memory notebook.

## How It Works (In Plain Words)

Think of the robot as a service agent with a small **notebook**:

1. **Write it down** — every turn of the conversation (what the visitor asked, what the robot answered) is automatically saved to a memory notebook, stored in your own database.
2. **Read it before answering** — when a new question arrives, the robot re-reads the most recent notes and sends them to the AI model together with the question, so the answer stays consistent with what was said before.
3. **Turn the page, not the whole book** — the robot only reads the most recent N messages (the "context message count", 10 by default), which keeps answers fast and costs low.
4. **One notebook per visitor and service desk** — memories are keyed by the conversation topic, which combines the workgroup (or robot/agent) and the visitor identity. Different visitors never share a notebook, and the same visitor returning to the same workgroup or robot keeps writing into the same notebook — so the robot remembers earlier visits too.

:::tip Good to know
Memory crosses conversations: when the same visitor starts a new conversation with the same workgroup or robot, the topic stays the same, so the robot still remembers what was discussed before (within the recent-N message window). The visitor identity is stored in the browser — clearing browser data or switching devices starts a fresh memory.
:::

import chat_memory from '/img/chat_memory/chat_memory.png';

<img src={chat_memory} alt="chat_memory" width="360" />

## What You Can Do

- **Turn memory on/off per robot** — in the admin console, open the robot's settings and find the "Multi-turn Memory" switch under Advanced Features (on by default).
- **Control how much it remembers** — the "Context Message Count" slider decides how many recent messages are re-read each time (default 10, up to 50).
- **Inspect what the robot remembers** — super admins can browse all memory records, filter by conversation ID, message type, or content keyword, and open any record for details.
- **Make the robot forget** — delete all memories under one conversation topic with a single click, effective immediately: the visitor's next question is answered without any earlier context.

## Quick Start

1. **Prerequisite**: the robot has LLM chat enabled and a text model configured (DeepSeek, Zhipu, or DashScope all work).
2. **Enable memory**: Admin console → AI → Robot → edit the robot → expand **Advanced Features** → make sure **Multi-turn Memory** is on.
3. **Tune the window**: set **Context Message Count** (start with 10; increase if the robot "forgets" too early in long conversations).
4. **Test it**: open the visitor chat window and try:
   - "My name is Zhang San"
   - "Who am I?"
   - "What did I just ask you?"

   If the robot answers correctly, memory is working.

## Viewing And Managing Memories

Memory records are managed in the admin console: **Super Admin → Messages → Chat Memory Records** (Enterprise/Platform edition; the menu tab requires the corresponding role permission).

Each record shows:

| Field | Meaning |
| --- | --- |
| Conversation ID | Which conversation this memory belongs to — the ID is the conversation topic, shared by the same visitor's conversations with the same workgroup/robot (one ID, many records) |
| Sequence | The order of the message inside the conversation |
| Type | Who said it — see below |
| Content | The actual message text |
| Timestamp | When it was saved |

The **Type** column uses four values:

- **USER** — what the visitor said
- **ASSISTANT** — what the robot replied
- **SYSTEM** — background settings (such as the robot's persona/prompt)
- **TOOL** — intermediate steps where the robot called a tool (e.g. querying an order)

Use the **Delete** action to wipe all memories of a conversation — for example, when a customer requests data deletion or a test conversation should be cleaned up.

![chat_memory_admin](/img/chat_memory/chat_memory_admin.png)

## FAQ

**Which models support multi-turn memory?**

All robots that go through the Bytedesk AI gateway, including DeepSeek, Zhipu GLM, and Alibaba DashScope (Tongyi Qianwen). Memory is a platform capability — you don't need to configure anything on the model provider side.

**Where is the memory stored? Do you upload it anywhere?**

Memory lives in the database on your own server (table `SPRING_AI_CHAT_MEMORY`, created automatically). Nothing is sent to any third party beyond the normal model API calls.

**Will the robot remember me next time I visit?**

Yes — if you contact the same workgroup or robot again with the same visitor identity (kept in your browser), the conversation topic stays the same, so the robot continues with the same memory notebook and recalls your recent exchanges (up to the context message count). Clearing browser data or using another device makes you a new visitor with a fresh memory. One-off AI assistant chats created in the desktop app each get their own memory.

**What happens if I turn memory off?**

The robot falls back to the legacy mode: recent messages are read directly from the chat history to supply context. The conversation still works, but the unified memory notebook is no longer maintained for it, and the memory management page will show no new records.

**Does a bigger context message count mean better answers?**

Not necessarily. More messages = better continuity but higher token cost and slower replies. 10–20 fits most customer-service conversations; only raise it for complex, long consultations.

**How do I make the robot forget a conversation?**

Super admin → Messages → Chat Memory Records → find the conversation → Delete. The next reply immediately loses that context.

## Best Practices

- **Keep 10–20 as the default window** — enough continuity for support chats without paying for unnecessary tokens.
- **Clean up test conversations** — robot testing creates memory records; delete them so statistics and lists stay tidy.
- **Respect privacy** — if visitors may share sensitive personal data, assign the memory-management permission to trusted roles only, and delete memories on request.
- **When memory seems "broken"** — first confirm the switch is on, then check that the conversation wasn't deleted from the memory page; both cause the robot to answer without context.

## For Developers (Optional)

- Memory is implemented on top of Spring AI `ChatMemory`: the `MessageChatMemoryAdvisor` is injected into every model call, backed by a JDBC repository persisting to `SPRING_AI_CHAT_MEMORY`. The conversation id is the thread topic, e.g. `org/workgroup/{wgUid}/{visitorUid}` — stable for the same visitor + workgroup/robot, so memory naturally carries over across conversations; LLM assistant topics (`org/robot/llm/{robotUid}/{userUid}/{randomUid}`) carry a random suffix and stay per-conversation.
- Per-robot switch: `memoryEnabled` on the robot LLM settings (`RobotLlm`); window size: `contextMsgCount`. The advisor chain is assembled in `AdvisorChainFactory`; provider services (`SpringAIDeepseekService`, `ZhipuaiService`, `DashscopeService`) all share the same base implementation.
- Read/delete APIs: `/api/v1/chat/memory/query/org` and `/api/v1/chat/memory/delete`, guarded by `CHAT_MEMORY_*` permissions.

## Related

- [Robot](./robot)
- [Session Summary](./summary)
- [Knowledge Base](./kbase)
