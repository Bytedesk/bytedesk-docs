---
sidebar_label: Tools
sidebar_position: 11
---

# Tools

Bytedesk tools are the callable action layer used by AI workflows to interact with business capabilities instead of only generating plain text. In practice, tools make it possible for models and agent workflows to query data, trigger actions, and coordinate system operations in a controlled way.

## What Tools Mean In Bytedesk

In the Bytedesk AI architecture, tools are used to connect model reasoning with executable capabilities. This includes scenarios such as:

- querying business data
- triggering service actions
- calling domain logic through structured interfaces
- combining LLM reasoning with backend workflows

The codebase already contains tool-related structures in robot settings and domain modules, which indicates that tools are an active part of the AI integration direction.

## Current Foundation

The current project already includes several tool-oriented foundations:

- robot-level tool lists and tool settings in AI configuration
- backend tool abstractions in some service modules
- TODO planning for broader external tool exposure and agent integration

This means Bytedesk is positioned to support structured tool orchestration in both internal AI workflows and future external integrations.

## Where Tools Fit

Tools are most useful when an AI workflow needs to do more than answer with text. Typical examples include:

- retrieving customer or order information
- querying business records during a support conversation
- invoking service-side actions in a traceable way
- supporting agent copilots and workflow automation

## Relationship To Other Capability Pages

- [Skills](./skills) describe reusable AI capability packages and workflow knowledge.
- [MCP](./mcp) focuses on Model Context Protocol integration for external agent interoperability.
- [Text Model Guide](./model_text) explains how core model reasoning is configured.

## Summary

Tools are the execution bridge between Bytedesk AI reasoning and actual business actions. They are a key building block for moving from simple chat responses toward agent-assisted workflows and operational AI automation.
