---
sidebar_label: Voice Service Agent
sidebar_position: 6
---

# Voice Service Agent

The Voice Service Agent is planned to handle real-time phone scenarios across inbound reception, voice IVR, service intake, appointment confirmation, ticket creation, dispatch coordination, outbound callback, and complaint early warning. It treats voice as an entry point to service fulfillment rather than a separate phone bot.

## Target Scenarios

- Inbound repair: identify issue, collect address, device model, fault description, urgency, and create a ticket.
- Installation appointment: confirm service address, available time, installation conditions, contact person, and synchronize the appointment with service teams.
- Voice IVR: recognize spoken intent, guide menu choices through natural conversation, answer simple questions, and transfer to humans when confidence is low.
- Progress confirmation: call customers to confirm whether the ticket is accepted, visited, delayed, resolved, or still blocked.
- Satisfaction callback: verify punctuality, issue resolution, engineer behavior, charging consistency, and customer satisfaction.
- Complaint early warning: detect negative sentiment, repeated contacts, unresolved commitments, abnormal delay, and high-risk language.

## Core Capabilities

- Short voice interaction with concise prompts and key-field confirmation.
- Slot filling for identity, phone, address, order number, product, device, fault, appointment time, urgency, and expected result.
- Interruption handling for barge-in, correction, step jumping, repeated questions, and return to the unfinished service goal.
- Workflow execution for ticket creation, ticket update, workgroup assignment, callback scheduling, notification, and follow-up recording.
- Full evidence chain linking call record, recording, ASR transcript, summary, ticket, customer profile, callback result, and quality inspection record.

## Implementation Plan

1. Define voice scenario templates for repair, installation, appointment change, progress inquiry, satisfaction callback, complaint follow-up, and voicemail.
2. Build a call context assembler that links caller number, visitor/member, organization, workgroup, agent state, ticket, order, call record, recording, and ASR transcript.
3. Implement slot definitions and validation rules for each scenario.
4. Add voice dialog policies for short prompts, interruption recovery, correction, timeout, silence, repeated failure, and confidence-based transfer.
5. Connect tools for ticket creation, ticket update, workflow routing, appointment scheduling, callback task creation, order query, and notification push.
6. Persist structured voice outcomes and provide dashboards for containment, completion, transfer, callback, satisfaction, complaint risk, SLA risk, and field collection quality.