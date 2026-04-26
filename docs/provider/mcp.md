---
sidebar_label: MCP
sidebar_position: 10
---

# MCP

Bytedesk already includes an MCP-related technical foundation for integrating with the Model Context Protocol ecosystem. MCP is important when you want AI agents to connect with external tools and services using a standard protocol instead of custom one-off integrations.

## Current MCP Foundation In Bytedesk

The current repository already contains:

- MCP client and server dependencies in the AI enterprise module
- Spring AI MCP client and server configuration entries
- MCP server management API grouping in Swagger
- TODO planning for exposing Bytedesk MCP capabilities externally

This means MCP is not just a future idea in the project. The foundation is already present in code and configuration.

## What MCP Is Used For

MCP is useful when Bytedesk needs to:

- expose business capabilities to external AI agents
- connect internal AI workflows with external MCP servers
- standardize tool, prompt, and resource exchange
- reduce custom integration cost between Bytedesk and agent ecosystems

## Configuration Direction

The project already includes Spring AI MCP configuration such as:

- `spring.ai.mcp.client.enabled`
- `spring.ai.mcp.server.enable`
- `spring.ai.mcp.server.type`
- `spring.ai.mcp.server.stdio`

This indicates that both client-side consumption and server-side exposure are part of the intended architecture.

## Relationship To Other Capability Pages

- [Tools](./tools) focus on callable capabilities inside AI workflows.
- [Skills](./skills) focus on reusable workflow knowledge and task packaging.
- MCP focuses on protocol-level interoperability between Bytedesk and external agent systems.

## Summary

Bytedesk already has a meaningful MCP foundation in its AI architecture. As this area matures, MCP is the natural path for opening Bytedesk capabilities to external agents and connecting Bytedesk AI workflows to broader agent ecosystems.
