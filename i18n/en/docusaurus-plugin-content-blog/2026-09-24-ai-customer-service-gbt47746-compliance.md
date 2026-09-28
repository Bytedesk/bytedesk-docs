---
slug: ai-customer-service-gbt47746-compliance
title: "China's New AI Customer Service Standard: How Bytedesk Delivers a Visible Human Handoff and Accountable AI Replies"
authors: jackning
tags: [bytedesk, AI, CustomerService, Agent, Kbase, CSAT]
---

On September 1, 2026, China's first national standard for human–AI customer service collaboration came into force: GB/T 47746—2026, "Customer Contact Services — Requirements for the Collaboration of Human and Intelligent Customer Service." Media coverage distilled the standard into four red lines:

1. **A clear, prominent human entry point**: customer service menus must offer a visible "talk to a human" option — no burying it behind layers of navigation;
2. **Scientific division of labor**: AI handles simple, standardized questions; complex disputes, high-risk scenarios, and explicit requests for a human are routed to agents promptly;
3. **Smooth human–AI handoff**: when switching, the customer's identity, interaction history, and ticket status must carry over completely — customers should never have to repeat themselves;
4. **Enterprises are accountable for AI replies**: companies cannot dodge responsibility with disclaimers like "AI-generated content is for reference only."

For enterprises evaluating customer service systems, these four red lines are effectively a procurement checklist. This post walks through the standard clause by clause and introduces the capabilities Bytedesk has already shipped — not compliance as a slogan, but as features and mechanisms you can find and verify in the product.

<!-- truncate -->

## The Checklist at a Glance: Standard vs. Bytedesk

| Standard Requirement | Bytedesk Capability |
| --- | --- |
| Clear, prominent human entry (4.1 / 5.1) | A persistent "human agent" button in the visitor chat window; human-handoff actions on every bot reply and FAQ bubble; trigger keywords, entry toggle, and button label all configurable in the admin console |
| Scientific division of labor (4.2) | Three routable thread modes: bot-only / human-only / bot-first with human transfer, freely combined per business complexity |
| Smooth handoff, no repeated questions (4.3 / 5.2) | Bot → queue → agent transitions happen within the same conversation thread, with full message history and customer context preserved |
| Accountable AI replies (4.4) | Every bot reply can be rated up/down, evaluated, and quality-inspected; thumbs-down and negative emotion automatically trigger human transfer |
| Service closed loop (7.2) | Post-session satisfaction surveys + automatic ticket creation on session close + ticket workflow |
| Continuous improvement (Chapter 9) | Service statistics (resolution rate, response time, transfer count) + quality inspection + knowledge base analytics |

## Red Line 1: A Clear, Prominent Human Entry Point

Bytedesk provides multiple layers of human entry in the visitor client, so customers can always reach a person:

- **Persistent button**: the visitor chat window always shows a "human agent" button — no digging through nested menus;
- **Bubble-level actions**: every bot reply and every FAQ answer carries a "transfer to human" action, so a customer dissatisfied with an AI answer can escalate with one click;
- **Keyword triggering**: typing keywords such as "human agent" (in Chinese: 人工 / 转人工 / 人工客服 / 真人 / 转接人工) automatically transfers the conversation — the default keyword list works out of the box and can be extended or trimmed in the admin console;
- **Admin-configurable**: administrators can decide whether visitors may manually transfer to a human at all, and customize the button label (e.g., "Talk to a real person"), keeping the entry point both prominent and on-brand.

Under the hood, the keyword listener applies strict trigger guards: it only fires for workgroup conversations that are currently in bot-serving state with no agent assigned yet, and it ensures the transfer status is persisted before the bot's reply is stored — preventing the experience failure of "the customer already asked for a human, but the bot keeps talking."

## Red Line 2: Scientific Division of Labor

The standard requires AI to handle standardized questions first, while humans prioritize complex ones. Bytedesk turns this division into three configurable routing modes:

| Routing Mode | Best For | Human Transfer |
| --- | --- | --- |
| Bot-only | Standardized inquiries, 24/7 first response | Not supported (pure self-service scenarios) |
| Human-only | High-value customers, complex business lines | — |
| Bot-first + transferable (workgroup) | Most customer service scenarios | Supported: keyword, thumbs-down, emotion, and other multi-channel triggers |

In workgroup mode, the AI answers standardized questions that have clear answers in the knowledge base; as soon as a complex issue or an explicit human request appears, the conversation is routed to a human agent. Bytedesk also tracks the "human transfer count" per FAQ entry — frequently transferred questions are a signal that the knowledge base needs enrichment, so the human–AI boundary keeps evolving with operational data.

## Red Line 3: Smooth Handoff, No Repeated Questions

The most painful handoff experience is "a new person takes over, and everything starts from scratch." Bytedesk's conversation model rules this out by design:

- **Same-thread transitions**: bot serving, queueing, and agent service all happen in the same conversation thread, with state flowing from "bot serving → queuing → agent serving" — no new conversation, no lost context;
- **Complete context sync**: when an agent joins, they immediately see the customer profile and the full AI conversation history, so the customer never has to repeat the problem;
- **Transparent queueing**: customers are informed of their queue status while waiting — no "waiting in the dark";
- **Complete fallback paths**: outside service hours, the conversation automatically becomes an offline message; when no agent is online, the system first tries a backup skill group before falling back to a message; when all agents are busy, the customer automatically enters the queue. Whatever happens, the customer's request always lands somewhere.

## Red Line 4: Enterprises Are Accountable for AI Replies

The standard is explicit: companies cannot use "AI-generated content is for reference only" to shirk responsibility. The precondition for being accountable is that every AI utterance is manageable, traceable, and correctable. Bytedesk provides the full accountability chain:

- **Per-message feedback**: customers can rate every bot reply up or down;
- **Thumbs-down as safety net**: after a thumbs-down, the system by default automatically tries to transfer to a human agent, and can simultaneously trigger a satisfaction survey and flag the reply for quality inspection — negative feedback never silently disappears;
- **Emotion awareness**: customer messages are analyzed for emotion (satisfied / neutral / dissatisfied / angry / anxious, etc.); when negative emotion is detected, the system can automatically transfer to a human, escalate, or proactively offer help according to policy, with a configurable confidence threshold to prevent misjudgment;
- **End-to-end quality inspection**: conversation records are fully retained, and inspection can pinpoint the exact AI reply — what the AI said, how the customer reacted, and how it was handled are all on the record.

## Service Closed Loop: Satisfaction and Tickets

Chapter 7 of the standard requires a closed service loop: proactively invite satisfaction evaluation, generate complete service records, and flow to-dos through tickets. Bytedesk's capabilities:

- **Satisfaction surveys**: customers are automatically invited to rate the session when it ends, with two-way evaluation supported (agents rate customers, customers rate agents); the VOC module additionally supports systematic CSAT and NPS programs;
- **Automatic ticket creation**: when a session closes, tickets can be created automatically based on close type (auto-timeout / agent-closed / visitor-closed), time windows, and other conditions; unresolved requests flow into the ticket pipeline, driven by the Flowable workflow engine — every complaint has a traceable ticket.

## Continuous Improvement — and an Honest Note on Boundaries

Chapter 9 requires continuous monitoring and improvement of collaboration efficiency and service quality. Bytedesk provides service statistics (resolution rate, response time, transfer-to-human count, daily served customers, dissatisfied session count, etc.), a quality-inspection console, and knowledge base analytics (FAQ transfer counts and thumbs-down data feed content optimization), enabling data-driven collaboration improvement.

We also state our current capability boundaries honestly:

- Finer-grained auto-transfer policies (such as thresholds on interaction failure counts, or automatic transfer after a bot response timeout) are not yet available as standalone configuration items; they can be enhanced in future releases. Today, multi-channel auto-transfer via keywords, thumbs-down, and emotion detection covers the vast majority of human-handoff scenarios;
- Data backup and classified protection (MLPS) are deployment and operations concerns: Bytedesk provides a security foundation of private deployment, fine-grained access control (RBAC), and configuration encryption, while tiered backup and MLPS assessment per GB/T 22239 are implemented by the deploying party on their own infrastructure.

Compliance is not a one-page declaration but an ongoing operational mechanism. Being explicit about boundaries is itself part of being responsible to customers.

## Why Bytedesk

Measured against GB/T 47746—2026, Bytedesk's advantages come down to three points:

1. **Open source and auditable**: every mechanism — human entry, division of labor, conversation flow, accountability chain — has a public implementation you can verify during evaluation, rather than a vendor's verbal promise;
2. **Private deployment, data sovereignty**: customer data never leaves your enterprise; security, backup, and compliance policies are under your control;
3. **Compliance as built-in capability**: entry points, division of labor, handoff, accountability, and closed loops required by the standard are out-of-the-box product features in Bytedesk — not paid custom projects.

The new standard turns "customer-centricity" from a slogan into verifiable engineering requirements — which is exactly the direction Bytedesk has always pursued.

## Links

- Website: [https://www.weiyuai.cn](https://www.weiyuai.cn)
- GitHub: [https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)
- Issues: [https://github.com/Bytedesk/bytedesk/issues](https://github.com/Bytedesk/bytedesk/issues)
