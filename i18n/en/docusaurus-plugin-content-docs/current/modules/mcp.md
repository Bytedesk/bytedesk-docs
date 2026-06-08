---
title: MCP Server
description: Expose Bytedesk capabilities to third-party agents through Model Context Protocol
sidebar_position: 6
---

## Overview

The MCP server exposes Bytedesk server capabilities to third-party agents and MCP clients. After it is enabled, external tools can connect through the standard MCP protocol, discover available tools, and query customer service, knowledge base, ticket, order, call center, and other business data within the configured permission boundary.

The current implementation is phase one: Spring AI MCP Server is integrated, existing Spring AI `@Tool` beans can be registered, only read-only query tools are exposed by default, and the MCP endpoints are protected by Bearer Token authentication.

## Enable MCP

MCP is disabled by default. Enable it in the standalone MCP configuration file when third-party agents need access:

```properties
spring.ai.mcp.server.enabled=true
bytedesk.ai.mcp.auth.bearer-token=${BYTEDESK_MCP_BEARER_TOKEN}
```

The default local HTTP port is `9003`. MCP clients connect to:

```text
http://127.0.0.1:9003/sse
```

Requests must include:

```http
Authorization: Bearer <token>
```

If MCP is enabled but `bytedesk.ai.mcp.auth.bearer-token` is empty, the server rejects MCP requests to avoid accidental exposure.

## Configuration Files

MCP configuration has been split out of the AI batch configuration into standalone files:

- `starter/src/main/resources/properties/local/75-mcp.properties`
- `starter/src/main/resources/properties/noai/75-mcp.properties`
- `starter/src/main/resources/properties/open/75-mcp.properties`
- `starter/src/main/resources/properties/prod/75-mcp.properties`

## Tool Exposure Policy

By default, existing `@Tool` beans under `com.bytedesk` are scanned, but only query-oriented tools are exposed:

```properties
bytedesk.ai.mcp.tools.enabled=true
bytedesk.ai.mcp.tools.read-only=true
bytedesk.ai.mcp.tools.include-packages=com.bytedesk
bytedesk.ai.mcp.tools.allow-names=
bytedesk.ai.mcp.tools.deny-names=
bytedesk.ai.mcp.tools.read-only-include-pattern=.*(Query|Search|Find|Get|List|Count).*
bytedesk.ai.mcp.tools.exclude-pattern=.*(Create|Update|Delete|Remove|Cancel|Change|Optimize|Reset|Score|Set|Send).*
```

When `allow-names` is empty, all tools that pass the package, read-only, and exclude filters can be exposed. When it is populated, only listed tools are exposed. Use `deny-names` to immediately block specific tools.

## Security Recommendations

- Keep MCP disabled by default.
- Keep `read-only=true` during the initial phase.
- Inject the Bearer Token through environment variables or external configuration. Do not commit it to the repository.
- Enable permission checks, approval, and audit logging before exposing write operations.
- Tool responses should not return passwords, tokens, licenses, internal configuration, or other sensitive fields.

## Roadmap

Phase two will add tool allowlists, permission controls, approval workflows, audit logs, and admin management so administrators can inspect, enable, disable, and audit MCP tools.

Phase three will add semantic business tools, such as customer profile lookup, knowledge base search, ticket lookup, order lookup, conversation summary generation, and call record lookup, so third-party agents can use Bytedesk business capabilities more naturally.
