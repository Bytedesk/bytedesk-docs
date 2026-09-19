# Bytedesk CLI Dual-Layer Design

## Goal

Build a dual-layer CLI structure for Bytedesk that keeps the open-source and enterprise capabilities separated, while sharing one command runtime and one invocation model. The open-source layer lives in modules/cli and owns the base command contract, output model, local configuration, and agent-friendly invocation semantics. The enterprise layer lives in enterprise/cli and depends on the open-source CLI module to add enterprise-only command groups without forking the command runtime.

## Architecture

The base module exposes a lightweight Java CLI runtime without adding a dedicated CLI framework. Commands implement a small CliCommand interface and return a structured CliResult so the runtime can render either plain text or JSON. This keeps the first version simple, testable, and easy to embed into agent workflows. The initial real capability is local configuration plus token persistence through auth and config commands. Domain command groups such as org, thread, message, knowledge, and ticket are scaffolded now so the public command tree is stable before wiring actual REST calls.

The enterprise module extends the base runtime through inheritance rather than duplication. It reuses all base commands and registers enterprise-only command groups such as license, seat, and audit. That gives a clean layering model: OSS owns common protocol and command UX, enterprise owns privileged workflows. In later phases, both layers can share HTTP client adapters, auth refresh logic, and machine-readable schemas. This structure also keeps future MCP integration straightforward because the CLI already supports deterministic JSON output and command grouping suitable for agent invocation.

## Initial Command Map

- bytedesk help
- bytedesk version
- bytedesk config list|get|set|remove
- bytedesk auth login|whoami|logout
- bytedesk org ...
- bytedesk thread ...
- bytedesk message ...
- bytedesk knowledge ...
- bytedesk ticket ...
- bytedesk-enterprise license ...
- bytedesk-enterprise seat ...
- bytedesk-enterprise audit ...

## Next Implementation Steps

1. Replace scaffolded domain commands with REST-backed implementations.
2. Add profile support for multiple servers and organizations.
3. Introduce stable JSON schemas for each command.
4. Add package and release automation for standalone CLI distribution.
