---
sidebar_label: CLI
sidebar_position: 71
---

# CLI

Bytedesk CLI provides a lightweight command-line runtime for automation, agent invocation, and operational scripts.

## Modules

- `modules/cli`: OSS CLI foundation module
- `enterprise/cli`: enterprise extension module built on top of the same runtime
- `starter`: bridge entry so the packaged starter jar can dispatch CLI commands directly

## Current command groups

- `auth`: login, session inspection, logout
- `org`: list organizations, inspect current organization, switch organization, get by uid
- `knowledge`: semantic or mixed knowledge-base search backed by HTTP API
- `ticket`: list tickets, get ticket detail, create ticket, close ticket
- `config`: inspect and change local CLI configuration
- `thread`, `message`: scaffolded placeholders for later API wiring
- `license`, `seat`, `audit`: enterprise placeholder command groups

## Local configuration

CLI configuration is stored in `~/.bytedesk/config.properties`.

Common keys:

- `server.base-url`
- `auth.token`
- `auth.platform`
- `auth.channel`
- `auth.current-org-uid`
- `auth.current-org-name`
- `auth.current-user-uid`
- `auth.current-user-nickname`

## Build

```bash
./starter/mvnw -f pom.xml -pl modules/cli,enterprise/cli -am -DskipTests compile
./starter/mvnw -f pom.xml -pl modules/cli -am -Dtest=BytedeskCliTests -Dsurefire.failIfNoSpecifiedTests=false test
./starter/mvnw -f pom.xml -pl enterprise/cli -am -Dtest=com.bytedesk.cli.EnterpriseCliTests -Dsurefire.failIfNoSpecifiedTests=false test
```

## Run standalone CLI jars

OSS CLI:

```bash
java -jar modules/cli/target/bytedesk-module-cli-1.9.0.jar help
java -jar modules/cli/target/bytedesk-module-cli-1.9.0.jar auth whoami
```

Enterprise CLI:

```bash
java -jar enterprise/cli/target/bytedesk-enterprise-cli-1.9.0.jar help
```

## Run via bytedesk-starter

`bytedesk-starter` now includes both CLI modules and can dispatch CLI mode directly from the starter jar.

OSS CLI through starter:

```bash
java -jar starter/target/bytedesk-starter.jar cli help
java -jar starter/target/bytedesk-starter.jar cli auth login \
  --server http://127.0.0.1:9003 \
  --username admin@email.com \
  --password your-password
java -jar starter/target/bytedesk-starter.jar cli ticket list --page 0 --size 10
```

Enterprise CLI through starter:

```bash
java -jar starter/target/bytedesk-starter.jar enterprise-cli help
```

When the first argument is `cli` or `enterprise-cli`, starter dispatches to the CLI runtime and does not boot the web server.

## Typical workflow

```bash
java -jar starter/target/bytedesk-starter.jar cli auth login \
  --server http://127.0.0.1:9003 \
  --username admin@email.com \
  --password your-password
java -jar starter/target/bytedesk-starter.jar cli org list
java -jar starter/target/bytedesk-starter.jar cli org switch --org your-org-uid
java -jar starter/target/bytedesk-starter.jar cli knowledge search \
  --query "refund flow" \
  --kb your-kb-uid \
  --search-type MIXED \
  --topk 5
java -jar starter/target/bytedesk-starter.jar cli ticket create \
  --title "Payment callback failed" \
  --description "Production callback returned 500" \
  --priority HIGH \
  --type BUG
```

## Knowledge search

The `knowledge search` command calls the server-side HTTP search endpoint and returns the same structured result shape used by the MCP knowledge tool.

```bash
java -jar starter/target/bytedesk-starter.jar cli knowledge search \
  --query "refund flow" \
  --kb your-kb-uid \
  --search-type MIXED \
  --source-type FAQ \
  --topk 5
```

If `--org` is omitted, CLI falls back to the cached `auth.current-org-uid` value from `auth login` or `org switch`.

## Ticket create notes

`ticket create` now depends on the current authenticated user identity. Run `auth login` or `auth whoami` first so CLI can cache:

- `auth.current-user-uid`
- `auth.current-user-nickname`

Then create the ticket:

```bash
java -jar starter/target/bytedesk-starter.jar cli ticket create \
  --title "Payment callback failed" \
  --description "Production callback returned 500" \
  --priority HIGH \
  --type BUG
```

## JSON output

Use `--format=json` before the command name for scripts and agent workflows.

```bash
java -jar starter/target/bytedesk-starter.jar cli --format=json auth whoami
java -jar starter/target/bytedesk-starter.jar cli --format=json knowledge search --query "refund flow" --kb your-kb-uid
java -jar starter/target/bytedesk-starter.jar cli --format=json ticket list --page 0 --size 5
```

## Current limitations

- `thread` and `message` are still placeholders
- enterprise command groups are currently placeholders
- CLI API calls expect the standard Bytedesk JSON envelope: `code`, `message`, `data`
- local usage usually assumes the backend is reachable on `http://127.0.0.1:9003`
