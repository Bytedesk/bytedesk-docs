---
sidebar_label: Overview
sidebar_position: 1
---

# Bytedesk AI Agents

Bytedesk AI Agents are planned digital teammates for the full customer journey. They combine omnichannel messaging, knowledge base answers, workflow automation, CRM context, order data, tickets, and analytics so service teams can turn every conversation into a reusable customer asset.

The current Agent pages describe the product direction and implementation plan. Some capabilities may be released progressively as the AI, workflow, channel, ticket, and operations modules evolve.

## Agent Portfolio

- [Customer Service Assistant Agent](./customer-service-assistant.md): assists human agents with reply suggestions, knowledge lookup, summaries, quality checks, and next-best actions.
- [Pre-sales Agent](./pre-sales-agent.md): understands customer intent, recommends products or plans, captures leads, and guides visitors toward conversion.
- [Sales Agent](./sales-agent.md): supports quoting, order guidance, payment reminders, fulfillment questions, and handoff between service and business systems.
- [After-sales Agent](./after-sales-agent.md): handles order, logistics, refund, return, warranty, complaint, and ticket follow-up scenarios.
- [Voice Service Agent](./voice-service-agent.md): connects inbound calls, voice IVR, repair intake, appointment confirmation, ticket dispatch, service callback, and complaint early warning into a service fulfillment loop.
- [Operations Agent](./operations-agent.md): turns service data into user segments, campaigns, retention actions, and growth insights.

## Product Concept

Bytedesk treats AI Agents as business executors rather than simple chatbots. The long-term architecture is built around a closed loop:

1. Conversations generate structured customer data.
2. Customer data enriches profiles, tags, intents, and service history.
3. Agents use that context to provide personalized service and trigger workflows.
4. Operations teams review performance, optimize knowledge, and improve conversion and retention.

This makes customer service a growth engine: support lowers workload, sales improves conversion, after-sales protects satisfaction, and operations turns every interaction into reusable insight.

## Service Closed Loop

The Agent system should not stop at answering questions. In real service work, the hard part is keeping the chain continuous: a customer calls, the intent is recognized, required fields are collected, a ticket is created, the work is assigned, progress is tracked, the result is confirmed, and risk signals are fed back into operations.

Bytedesk uses this closed-loop view to design Agents around four principles:

1. Choose scenarios with clear goals, decomposable steps, and verifiable results, such as repair intake, installation appointment, progress confirmation, satisfaction callback, and complaint follow-up.
2. Convert natural conversation into structured business data, including customer identity, address, device, order, issue category, urgency, appointment time, evidence, and expected result.
3. Connect Agents with executable systems such as CRM, orders, tickets, workflow, call records, recordings, ASR transcripts, knowledge base, and notification channels.
4. Operate Agents continuously through transfer rate, completion rate, bad cases, interruption points, missing fields, customer feedback, and human review.

In this model, an Agent is a digital service executor. Its value is not only speaking with customers, but helping the organization see, advance, and improve the whole service process.
