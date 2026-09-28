---
sidebar_label: After-sales Agent
sidebar_position: 5
---

# After-sales Agent

The After-sales Agent is planned to handle post-purchase service scenarios such as order status, logistics, refund, return, warranty, complaint, repair, and ticket follow-up. It protects customer satisfaction while reducing repetitive workload for service teams.

This page describes the product direction and implementation plan. Capabilities will be released progressively as order, ticket, call center, knowledge base, and workflow integrations evolve.

## Target Scenarios

- Customers ask about order status, delivery, invoice, refund, return, exchange, or warranty.
- Service teams need structured intake for complaints and abnormal cases.
- Customers need proactive updates for delayed logistics or unresolved tickets.
- Call center and online service conversations need to be linked to tickets and recordings.
- Managers need after-sales categories, root causes, SLA risks, and quality inspection signals.
- Voice Agent scenarios need after-sales workflows for repair intake, progress confirmation, satisfaction callback, and complaint early warning.

## Core Capabilities

- Self-service answers: respond to common order, logistics, refund, return, and warranty questions.
- Case intake: collect required fields, evidence, photos, order numbers, contact information, and expected resolution.
- Ticket automation: create, classify, route, summarize, and update tickets based on conversation content.
- SLA monitoring: detect overdue cases, repeated complaints, negative sentiment, and escalation risk.
- Proactive follow-up: notify customers about progress, pending materials, resolution results, and satisfaction evaluation.
- Service result confirmation: use online messages or voice callbacks to verify whether the issue was resolved and whether promises were fulfilled.

## Implementation Plan

1. Connect order, logistics, warranty, refund, and ticket data through permission-aware query tools.
2. Define after-sales scenario templates for refund, return, complaint, repair, callback, and escalation workflows.
3. Add structured cards for order status, ticket progress, evidence collection, and resolution confirmation.
4. Link chat, call records, recordings, ASR transcripts, tickets, and customer profiles into one after-sales timeline.
5. Implement escalation rules for overdue SLA, high-value customers, repeated complaints, and negative sentiment.
6. Add callback workflows for progress confirmation, satisfaction survey, complaint recovery, and unresolved ticket follow-up.
7. Provide dashboards for issue category, resolution time, satisfaction, repeat contact, escalation, callback completion, and product defect trends.

## Success Metrics

- Higher self-service resolution rate for repetitive after-sales questions.
- Faster ticket creation and more complete case information.
- Lower repeat contact rate and fewer missed follow-ups.
- Better visibility into complaint causes and product/service defects.
- Improved satisfaction and post-purchase trust.

## Relationship With Other Agents

The After-sales Agent receives service issues from every channel. It can ask the Sales Agent for order context, use the Customer Service Assistant Agent to help human agents handle complex cases, collaborate with the Voice Service Agent on repair and callback scenarios, and share issue insights with the Operations Agent for retention actions.
