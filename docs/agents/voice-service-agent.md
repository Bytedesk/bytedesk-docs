---
sidebar_label: Voice Service Agent
sidebar_position: 6
---

# Voice Service Agent

The Voice Service Agent is planned to handle real-time phone scenarios across inbound reception, voice IVR, service intake, appointment confirmation, ticket creation, dispatch coordination, outbound callback, and complaint early warning. It treats voice as an entry point to service fulfillment rather than a separate phone bot.

This page describes the product direction and implementation plan. Capabilities will be released progressively as call center, ASR/TTS, workflow, ticket, customer profile, order, and analytics modules mature.

## Design Goal

Phone service has less tolerance for long answers and broken workflows than text chat. Customers speak naturally, interrupt, change their mind, skip fields, ask side questions, or move from repair to complaint in one call. The Voice Service Agent should therefore be short in speech, accurate in questioning, resilient to interruptions, and able to return the conversation to the service goal.

The target is to transform natural voice conversations into executable service processes:

1. Understand what the customer wants.
2. Ask only for missing and necessary information.
3. Convert answers into structured fields.
4. Trigger the right workflow, ticket, dispatch, callback, or human handoff.
5. Confirm the service result and feed data back into operations.

## Target Scenarios

- Inbound repair: identify issue, collect address, device model, fault description, urgency, photos or recordings, and create a ticket.
- Installation appointment: confirm service address, available time, installation conditions, contact person, and synchronize the appointment with service teams.
- Voice IVR: recognize spoken intent, guide menu choices through natural conversation, answer simple questions, and transfer to humans when confidence is low.
- Progress confirmation: call customers to confirm whether the ticket is accepted, visited, delayed, resolved, or still blocked.
- Satisfaction callback: verify punctuality, issue resolution, engineer behavior, charging consistency, and customer satisfaction.
- Complaint early warning: detect negative sentiment, repeated contacts, unresolved commitments, abnormal delay, and high-risk language.

## Core Capabilities

- Short voice interaction: use concise prompts, avoid long paragraphs, and confirm key fields one by one.
- Slot filling: extract identity, phone, address, order number, product, device, fault, appointment time, urgency, and expected result.
- Interruption handling: support barge-in, correction, step jumping, repeated questions, and returning to the unfinished service goal.
- Workflow execution: create tickets, update ticket status, assign workgroups, schedule callbacks, send notifications, and record follow-up results.
- Human handoff: transfer to the right queue or agent when confidence is low, customer emotion is high, policy approval is required, or all agents are busy.
- Full evidence chain: link call record, recording, ASR transcript, summary, ticket, customer profile, callback result, and quality inspection record.

## Service Loop Architecture

1. Call access: FreeSWITCH/Kamailio receives inbound calls, routes to IVR, voice Agent, queue, or human agent according to organization settings.
2. Real-time speech layer: ASR converts user speech to text, the Agent decides the next action, and TTS generates concise voice replies with interruption support.
3. Context assembly: load caller identity, visitor/member profile, organization, workgroup, open tickets, recent calls, order references, and knowledge permissions.
4. Intent and slot engine: classify the scenario, extract required fields, detect missing fields, and maintain dialog state across interruption and correction.
5. Tool and workflow layer: call permission-aware tools for customer lookup, order query, ticket creation, workflow execution, callback scheduling, and notification.
6. Human collaboration: transfer calls with collected fields, summary, transcript, and suggested next action so the human agent does not restart the conversation.
7. Review and optimization: analyze completion rate, transfer rate, interruption points, missing fields, negative sentiment, callback result, and bad cases.

## Implementation Plan

1. Define voice scenario templates for repair, installation, appointment change, progress inquiry, satisfaction callback, complaint follow-up, and voicemail.
2. Build a call context assembler that links caller number, visitor/member, organization, workgroup, agent state, ticket, order, call record, recording, and ASR transcript.
3. Implement slot definitions and validation rules for each scenario, including required fields, optional fields, confirmation rules, and fallback prompts.
4. Add voice dialog policies for short prompts, interruption recovery, correction, timeout, silence, repeated failure, and confidence-based transfer.
5. Connect tools for ticket creation, ticket update, workflow routing, appointment scheduling, callback task creation, order query, and notification push.
6. Persist structured voice outcomes: intent, slots, summary, transfer reason, ticket reference, callback result, customer emotion, and quality inspection signals.
7. Provide admin configuration for enabled scenarios, voice style, opening scripts, human handoff rules, queue routing, business hours, voicemail, and fallback messages.
8. Build dashboards for call containment, service completion, transfer rate, callback completion, satisfaction, complaint risk, SLA risk, and field collection quality.

## Governance And Safety

- Permission boundary: voice tools must respect organization, role, workgroup, and data-scope permissions.
- Confirm before write: customer-impacting actions such as ticket closure, appointment change, refund request, or complaint withdrawal require explicit confirmation.
- Audit trail: every tool call should record input, output, operator type, related call, related ticket, and reason.
- Human override: human agents can take over, correct extracted fields, reopen tickets, and mark bad cases for later optimization.
- Privacy control: recording, transcript, and sensitive fields should follow organization retention, masking, and download policies.

## Success Metrics

- Higher inbound answer rate and lower abandoned call rate.
- Higher repair or appointment intake completion rate.
- Lower repeated communication caused by missing fields.
- Faster ticket creation, dispatch, and callback confirmation.
- Better visibility into service result, complaint risk, and SLA risk.
- Measurable reduction in manual callback workload.

## Relationship With Other Agents

The Voice Service Agent shares service context with the Customer Service Assistant Agent and After-sales Agent. It can ask the Customer Service Assistant Agent to help human agents after transfer, invoke the After-sales Agent for order, refund, repair, and complaint scenarios, and send callback or complaint signals to the Operations Agent for retention and recovery actions.