---
sidebar_label: LLM MaxKB
sidebar_position: 39
---

# LLM MaxKB

This page explains how Bytedesk integrates with MaxKB as a third-party knowledge and question answering service.

## Overview

The current repository already includes clear MaxKB integration evidence:

- MaxKB appears in the built-in provider list and admin assets
- Swagger exposes a dedicated MaxKB chat API group
- the enterprise knowledge module contains a full MaxKB integration guide and config example

That means MaxKB is not just a placeholder provider. It already has a defined integration path in the codebase.

## What MaxKB Is Used For

MaxKB is positioned as a third-party knowledge base and Q&A platform. In Bytedesk, it is suitable for scenarios such as:

- external knowledge-base question answering
- OpenAI-compatible chat completion access
- integrating an existing enterprise knowledge system into customer service workflows
- using third-party knowledge applications behind robots or service entry points

## Current Integration Basis in the Repository

The repository shows these integration points:

- provider metadata for MaxKB with a production base URL and official website
- tenant and organization-level setting entries for MaxKB
- Swagger group `maxkb-chat-apis`
- request paths under `/api/v1/maxkb/chat/**`
- an enterprise integration guide describing API URL, API key, application ID, and OpenAI-compatible request patterns

## Typical Setup Flow

1. Deploy or prepare a MaxKB instance
2. Create a knowledge application in MaxKB
3. Generate an API key in the MaxKB console
4. Configure MaxKB connection information in Bytedesk
5. Bind the integration to the relevant robot or business entry

## Example Configuration Direction

The enterprise integration guide shows a configuration pattern like this:

```yaml
bytedesk:
  maxkb:
    enabled: true
    api-url: https://maxkb.fit2cloud.com
    api-key: application-xxxxxxxxf00e21a7530d1177c20967
    default-model: gpt-3.5-turbo
    default-stream: false
    timeout: 30000
```

## API Style

The bundled integration guide indicates that MaxKB can be called with OpenAI-compatible chat completion style APIs, as well as simpler message interfaces. This is useful when you want to keep Bytedesk-side orchestration stable while delegating knowledge answering to MaxKB.

## Common Checks

1. Confirm MaxKB is reachable from the Bytedesk server.
2. Confirm the API key is valid and bound to the target application.
3. Confirm the relevant MaxKB application ID or endpoint is configured correctly.

## Related Resources

- [MaxKB Website](https://maxkb.cn)
- [MaxKB Docs](https://maxkb.cn/docs)
- [MaxKB API Reference](https://maxkb.cn/docs/v1/dev_manual/APIKey_chat/#1-openai-api)
