---
sidebar_label: LLM N8N
sidebar_position: 39
---

# LLM N8N

This page explains the current n8n integration position inside Bytedesk.

## Overview

The repository already shows that n8n is treated as a supported third-party integration option:

- n8n appears in the built-in provider list shown by admin assets
- the provider metadata includes a production base URL and official website
- tenant and organization-level settings include n8n entries alongside MaxKB and other third-party providers

This indicates that n8n is intended as an external automation and workflow integration target in the provider system.

## What n8n Is Suitable For

In Bytedesk, n8n is best understood as a workflow orchestration endpoint for scenarios such as:

- connecting AI and customer-service events to external automation workflows
- routing structured data into third-party systems
- triggering custom business automation outside the core Bytedesk runtime
- integrating CRM, notifications, approval flows, or webhook-based logic

## Current Integration Evidence

The codebase currently confirms:

- built-in provider metadata for `n8n`
- display and classification in the third-party provider list
- settings records seeded for n8n in SQL bootstrap data

That is enough to document n8n as a supported provider option, but not enough to claim a detailed fixed API contract in this doc yet.

## Recommended Setup Direction

The safe integration pattern is:

1. Prepare an n8n instance and publish the target workflow endpoint
2. Configure the corresponding n8n provider entry in Bytedesk
3. Bind the provider to the business flow, robot, or external callback scenario you need
4. Test with a real workflow execution and verify the returned payload shape

## Operational Notes

- Keep the endpoint stable and versioned when possible
- validate webhook authentication and secrets before enabling production traffic
- make sure the returned structure matches what the calling workflow expects

## Related Resources

- [n8n Website](https://n8n.io/)
- [n8n Docs](https://docs.n8n.io/)
