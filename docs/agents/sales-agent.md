---
sidebar_label: Sales Agent
sidebar_position: 4
---

# Sales Agent

The Sales Agent is planned for the middle of the sales journey: quote clarification, order guidance, payment reminders, fulfillment questions, and coordination between customer service and business systems. Its goal is to reduce friction between consultation and successful delivery.

This page describes the product direction and implementation plan. Capabilities will be released progressively as Bytedesk connects more order, payment, logistics, and external business tools.

## Target Scenarios

- Customers ask how to buy, upgrade, renew, or combine products and services.
- Agents need help explaining quotes, discounts, packages, and delivery expectations.
- Customers hesitate during payment or order confirmation.
- Service teams need to check order status, stock, shipment, invoices, or contract progress.
- B2B teams need controlled handoff from online consultation to sales operations.

## Core Capabilities

- Order guidance: explain purchase steps, required information, payment options, and delivery timelines.
- Quote assistance: prepare draft quotes from configured product, discount, and approval rules.
- Business lookup: query order, customer, contract, invoice, and logistics data through permission-aware tools.
- Fulfillment coordination: remind teams about pending payment, missing materials, delayed shipment, or approval bottlenecks.
- Human handoff: escalate pricing exceptions, negotiation, large accounts, or sensitive commercial questions.

## Implementation Plan

1. Define sales-stage states such as interested, quoted, pending payment, paid, fulfilling, delayed, and completed.
2. Connect CRM, order, payment, contract, invoice, and logistics APIs through a controlled tool layer.
3. Add organization-specific policy prompts for discounts, commitments, refund boundaries, and compliance wording.
4. Implement structured cards for quote drafts, order details, payment reminders, and fulfillment updates.
5. Allow the Agent to create follow-up tasks, ticket links, and internal notes for human sales or operations teams.
6. Track conversion and fulfillment metrics across conversation, order, and customer dimensions.

## Success Metrics

- Shorter time from consultation to order confirmation.
- Lower order loss caused by unclear price, process, or payment information.
- Better visibility for pending payment and fulfillment exceptions.
- More consistent sales communication across channels and agents.
- Clear handoff records between customer service, sales, and operations.

## Relationship With Other Agents

The Sales Agent receives qualified intent from the Pre-sales Agent and passes service issues to the After-sales Agent. The Customer Service Assistant Agent can use it as a tool when a human agent needs business-system guidance.
