---
sidebar_label: Customer Service Assistant
sidebar_position: 2
---

# Customer Service Assistant Agent

The Customer Service Assistant Agent is planned as an AI copilot for human agents. It helps agents understand the customer, retrieve reliable answers, draft responses, summarize conversations, and recommend the next best action without removing the human from the service workflow.

This page describes the product direction and implementation plan. Capabilities will be released progressively as the Bytedesk AI, knowledge base, workflow, ticket, and analytics modules mature.

## Target Scenarios

- Real-time assistance during web chat, mobile chat, social channels, email, and call center conversations.
- Knowledge base search and answer drafting for repetitive questions.
- Conversation summaries, customer intent extraction, sentiment signals, and service quality reminders.
- Automatic ticket creation suggestions when the issue requires follow-up.
- Suggested handoff, escalation, compensation, or workflow actions based on customer context.
- Voice handoff assistance when a call is transferred from IVR or the Voice Service Agent to a human agent.

## Core Capabilities

- Context awareness: read conversation history, visitor profile, organization, channel, tags, orders, tickets, and knowledge permissions.
- Suggested replies: generate answer drafts with citations from approved knowledge, FAQs, and historical high-quality replies.
- Service coaching: remind agents about tone, missing information, SLA risk, sensitive words, and unresolved customer intent.
- Summary automation: produce structured summaries for conversation close, ticket handoff, quality inspection, and follow-up.
- Action recommendation: suggest workflow steps such as creating a ticket, adding a tag, scheduling a callback, or transferring to a specialist.
- Handoff continuity: display collected voice fields, transcript highlights, confidence signals, and recommended next actions so the human agent can continue instead of restarting.

## Implementation Plan

1. Build a conversation context assembler that combines messages, visitor profile, agent profile, organization settings, knowledge snippets, and ticket/order references.
2. Add configurable assistant prompts for different workgroups, agent roles, channels, and service scenarios.
3. Implement streaming reply suggestions in the desktop agent workspace, with clear accept, edit, reject, and regenerate actions.
4. Persist accepted suggestions, summaries, and quality feedback so the system can learn from strong human answers.
5. Add permission-aware tool calls for knowledge search, customer lookup, ticket creation, order query, and workflow execution.
6. Integrate call records, recordings, ASR transcripts, and voice Agent summaries into the agent workspace for call center scenarios.
7. Provide analytics for adoption rate, acceptance rate, response time reduction, summary accuracy, handoff continuity, and service quality improvement.

## Success Metrics

- Lower average response time and after-call work time.
- Higher first-contact resolution and knowledge hit rate.
- More consistent service quality across new and experienced agents.
- Better ticket summaries and fewer missing follow-up details.
- Reusable service experience accumulated from excellent human replies.

## Relationship With Other Agents

The Customer Service Assistant Agent is the human-facing cockpit for the Agent system. It can invoke the Pre-sales Agent for product consultation, the Sales Agent for order guidance, the After-sales Agent for complaint or return handling, the Voice Service Agent for call center context, and the Operations Agent for customer segmentation or campaign follow-up.
