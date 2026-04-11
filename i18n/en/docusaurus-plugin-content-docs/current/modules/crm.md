---
title: Customer Management
description: Full-lifecycle customer relationship management (CRM/SCRM)
sidebar_position: 6
---

# Customer Relationship Management CRM/SCRM

## 📚 Overview

**Customer Relationship Management (CRM/SCRM)** is a full-lifecycle customer management solution that integrates customer profiles, interaction history, and transaction data. It helps enterprises understand customers deeply, improve conversion performance, and increase long-term customer value.

The system supports both traditional CRM and social CRM (SCRM): it manages core customer assets while enabling social-channel engagement and growth operations.

> **CRM**: Customer Relationship Management  
> **SCRM**: Social Customer Relationship Management

---

## 🎯 Core Features

### Customer

Customers are the master data foundation in CRM. Profile, contact, and interaction history are centralized so conversations, tickets, and contracts can all be linked to the same customer context.

**What you can do**

- Build and maintain customer profiles: company details, contacts, address, industry, size
- Record interaction history: chats/calls/emails/visits, notes, follow-up plans
- Apply segmentation and tagging: source, tier, intent level, geography
- View related entities in one place: leads, opportunities, contracts, payments, tickets

**Common fields (examples)**

- Customer type (business/individual), source channel, owner, customer level, tags
- Contact details (phone/email/WeChat), address, industry, company size

_UI example: customer list and profile management_

![crm_customer](/img/crm/crm_customer.png)

### Lead

Leads capture potential customer information from forms, campaign traffic, market activities, partner referrals, or service conversations. The goal is rapid qualification, assignment, and conversion to customer/opportunity.

**What you can do**

- Lead intake and deduplication: avoid repeated follow-up on the same prospect
- Lead assignment: route by region/industry/round-robin/rules to sales or service teams
- Follow-up traceability: call/chat/email/visit records with complete timelines
- Lead conversion: one-click conversion to customer + contact + opportunity (configurable)

**Common statuses (example)**

- New → Assigned → In Progress → Converted / Invalid / Paused

_UI example: lead pool and follow-up records_

![crm_lead](/img/crm/crm_lead.png)

### Opportunity

Opportunities manage the full path of potential deals. Key dimensions include **amount, stage, expected close date**, and **win probability**.

**What you can do**

- Define sales stages: initial contact, needs discovery, proposal, negotiation, won/lost
- Manage forecast: expected value, expected close date, stage and probability changes
- Team collaboration: owners/collaborators, tasks, reminders, follow-up actions
- Link key objects: customer, contact, product/quote, contract, payment

**Common fields (examples)**

- Opportunity name, customer, stage, win probability, expected amount, expected close date
- Source channel, competitors, key requirements, decision maker

_UI example: opportunity list and stage progression_

![crm_opportunity](/img/crm/crm_opportunity.png)

### Product

Products maintain sellable items and service packages (SKU/plans/service items), so teams can reuse consistent pricing and package definitions in opportunities, quotes, and contracts.

**What you can do**

- Product catalog management: categories, versions/packages, active/inactive state
- Pricing and billing: list price, discount, billing cycle (annual/monthly/per-use)
- Package composition: combine service items into reusable bundles
- Reporting by product: analyze sales amount and volume by product dimension (config-dependent)

**Common fields (examples)**

- Product name/code, category, unit, list price, description, status

_UI example: product catalog and package configuration_

![crm_product](/img/crm/crm_product.png)

### Contract

Contracts formalize won opportunities into executable agreements, including amount, period, delivery terms, and payment plans.

**What you can do**

- Contract creation and approval: number, amount, signing parties, validity, clauses, attachments
- Payment plan tracking: installment plans, due reminders, payment status tracking
- Generate from opportunity: auto-fill customer/product/quote data (configurable)
- Unified archive and retrieval: scanned copies, attachments, version history (optional)

**Common fields (examples)**

- Contract number, contract value, signing date, effective/expiry date, payment terms, owner

_UI example: contract details and payment plans_

![crm_contract](/img/crm/crm_contract.png)

### Tender

Tender management tracks procurement announcements and bid progress, helping sales and pre-sales teams identify and execute opportunities before deadlines are missed.

**What you can do**

- Tender collection and filtering: classify by industry, region, budget, and keywords
- Milestone reminders: registration deadline, Q&A deadline, bid submission, opening date
- Strategy and materials: record evaluation points, competitors, material checklist, owners
- Link to CRM flow: convert tenders into opportunities for an information-to-revenue loop

_UI example: tender list, milestones, and follow-up_

![crm_tender](/img/crm/crm_tender.png)

---

## 🧭 Typical Workflow (From Lead to Revenue)

1. **Lead intake**: collect from forms/channels/service contacts, then deduplicate and assign
2. **Lead qualification**: enrich key data (need, budget, timeline, decision maker)
3. **Convert to customer/opportunity**: create customer profile and start opportunity progression
4. **Select products and quote**: build quote/solution from the product catalog
5. **Sign contract and manage payments**: create contract from won opportunity and track repayment
6. **Post-sale service and expansion**: use service/ticket/knowledge records for retention and upsell

> Tip: Define standardized lead statuses and opportunity stages before configuring fields and permissions.

---

## 🔗 Related Modules

- [Online Customer Service](./service.md) - Link conversations to customer profiles
- [Ticket System](./ticket.md) - Manage customer issues through ticket workflows
- [Knowledge Base](./kbase.md) - Provide self-service support resources
- [Forms](./form.md) - Collect customer details and requirements
- [AI Agent](./ai.md) - Assist operations and decision-making
- [Voice of Customer](./voc.md) - Analyze feedback and improve service

---

With **CRM/SCRM Customer Management**, enterprises can operate the full customer lifecycle—from acquisition and conversion to service, retention, and referral—forming a measurable and scalable customer value loop.
