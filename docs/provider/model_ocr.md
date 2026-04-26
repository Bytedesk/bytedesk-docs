---
sidebar_label: OCR Capabilities
sidebar_position: 26
---

# OCR Capabilities

Bytedesk supports OCR (Optical Character Recognition) capabilities for customer service scenarios. OCR converts text in screenshots, images, receipts, and chat attachments into editable text, making it easier for agents and AI workflows to understand and process visual content.

## What OCR Solves

In real customer support workflows, users often send screenshots instead of plain text. These can include order pages, payment proof, shipping status pages, error screens, or account information. Without OCR, agents must read and retype the key details manually.

With OCR, Bytedesk helps teams:

- Extract text from customer screenshots and image messages
- Copy and reuse recognized text in replies, tickets, and notes
- Turn image-based information into searchable structured text
- Prepare image content for AI analysis and downstream automation

## OCR Features Already Supported

### 1. OCR Testing In Admin Console

The admin console includes a dedicated OCR testing entry. Administrators can upload images and run OCR directly to verify model quality and configuration.

OCR test calls are also recorded in OcrEntity, which helps with operations review, auditing, and troubleshooting.

### 2. One-Click OCR For Image Messages In Desktop Agent

In the desktop agent workspace, agents can right-click an image message and extract text from the image with one click.

This is useful for scenarios such as:

- Reading order numbers from customer screenshots
- Extracting error details from system screenshots
- Converting shipping, payment, or account screenshots into copyable text

## Typical Customer Service Use Cases

### 1. Faster Issue Handling

- Read customer screenshots without manual typing
- Extract order IDs, phone numbers, error messages, and account details
- Speed up ticket handling and internal escalation

### 2. Ticketing And Quality Management

- Save recognized text into ticket notes
- Keep better service records for after-sales workflows
- Use OCR output for later search and quality analysis

### 3. AI Workflow Enablement

- Convert image content into text before sending it to an LLM
- Combine OCR with bots, workflows, and knowledge base automation
- Use OCR output for classification, summarization, and auto-routing

## Business Value

OCR in Bytedesk helps teams:

- Reduce manual data entry by agents
- Improve processing speed for screenshot-heavy support cases
- Lower transcription mistakes caused by manual copying
- Build a clean text foundation for AI automation

## Recommended Adoption Path

- Validate OCR models first in the admin console
- Let agents use one-click OCR in daily conversations
- Combine OCR output with tickets, knowledge base, and AI workflows

## Summary

Bytedesk already provides OCR capabilities for support teams, including admin-side OCR testing and desktop-side text extraction for image messages. For teams that frequently deal with screenshots and visual evidence, OCR improves efficiency and enables more advanced AI-driven service workflows.
