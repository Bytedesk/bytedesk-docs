---
sidebar_label: Knowledge Graph
sidebar_position: 82
---

<!-- markdownlint-disable MD060 MD033 -->

# Knowledge Graph (Neo4j)

:::tip Note
This feature is not available in the Community Edition. Please upgrade to the Enterprise or Platform edition and replace the [licenseKey](../development/license.md).
:::

The knowledge graph feature lets Weiyu organize knowledge as a **network of connected knowledge points** — FAQs, categories, and products linked by relationships such as "related to", "belongs to", and "mentions". Instead of matching keywords one by one, the AI can walk these connections to find knowledge that is *related but worded differently*, laying the ground for smarter answers (GraphRAG).

Weiyu integrates with a self-hosted [Neo4j](https://github.com/neo4j/neo4j) graph database (community edition). Everything runs on your own servers — **your knowledge data never passes through any third-party cloud**.

:::info Current stage
This release ships the knowledge graph foundation: Docker deployment, on/off switch, connectivity check, and demo endpoints. Graph-powered retrieval enhancement (GraphRAG) will arrive in later releases. You can already enable it now and explore the demo graph visually in the Neo4j Browser.
:::

## Prerequisites

| Requirement | Description |
| --- | --- |
| Edition | Enterprise or Platform edition (not included in community images) |
| Neo4j service | Started via Docker (see Step 1 below) |
| App switch | `bytedesk.ai.neo4j.enabled=true` |

## How to Enable (Administrator)

Three steps: start the graph database → turn on the Weiyu switch → restart Weiyu.

### Step 1: Start the Neo4j service

On your server, go to the `deploy/docker` directory and add the `neo4j` keyword to the start script:

```bash
cd deploy/docker

# Start together with the middleware stack
./start.sh middleware neo4j

# Or attach it when starting the full stack
./start.sh all neo4j
```

Once started, open `http://127.0.0.1:17474` in a browser — the Neo4j Browser login page means the service is ready. Default account `neo4j`, password from `NEO4J_PASSWORD` in `.env` (default `bytedesk-neo4j`). When logging in, set the connection URL to `127.0.0.1:17687` — Bolt is mapped to host port 17687, not the default 7687 (see the FAQ below).

import Neo4j from '/img/neo4j/neo4j-login.png';

<img src={Neo4j} alt="登录窗口" width="360" />

### Step 2: Turn on the Weiyu-side switch

**Docker deployment**: edit `deploy/docker/.env` and add:

```bash
BYTEDESK_AI_NEO4J_ENABLED=true
BYTEDESK_AI_NEO4J_PASSWORD=bytedesk-neo4j   # keep consistent with NEO4J_PASSWORD
# When the app and Neo4j share the same docker network, the default address
# bolt://neo4j-bytedesk:7687 already works — no change needed.
```

**Running from source**: edit `starter/src/main/resources/properties/local/ai-neo4j.properties`:

```properties
bytedesk.ai.neo4j.enabled=true
bytedesk.ai.neo4j.uri=bolt://127.0.0.1:17687
bytedesk.ai.neo4j.password=bytedesk-neo4j
```

### Step 3: Restart Weiyu

Re-run the start command (or recreate the app container) for the change to take effect.

## Configuration Parameters

All parameters can be adjusted in `ai-neo4j.properties` (or via the corresponding environment variables):

| Parameter | Description | Default |
| --- | --- | --- |
| `bytedesk.ai.neo4j.enabled` | Feature switch | `false` |
| `bytedesk.ai.neo4j.uri` | Neo4j connection address | Depends on deployment (see above) |
| `bytedesk.ai.neo4j.username` | Username (cannot be changed from `neo4j`) | `neo4j` |
| `bytedesk.ai.neo4j.password` | Password (keep consistent with `NEO4J_PASSWORD`) | `bytedesk-neo4j` |
| `bytedesk.ai.neo4j.database` | Database name (community edition supports a single database) | `neo4j` |
| `bytedesk.ai.neo4j.connect-timeout-ms` | Connection timeout in milliseconds | `10000` |
| `bytedesk.ai.neo4j.max-connection-pool-size` | Max connection pool size | `10` |

> For production, change `NEO4J_PASSWORD` in `.env` instead of keeping the default value. Note that the initial password **only takes effect on the first start with an empty data volume** — see the FAQ below.

## Verify It Works

With debug mode enabled (`bytedesk.debug=true`), open these addresses directly in a browser:

| Endpoint | Address | Purpose |
| --- | --- | --- |
| Status | `http://127.0.0.1:9003/spring/ai/api/v1/neo4j/status` | Config and connectivity check |
| Seed demo | Command below | Write a small demo knowledge graph |
| View demo graph | `http://127.0.0.1:9003/spring/ai/api/v1/neo4j/graph-demo?limit=100` | Return demo nodes and relationships |
| Clear demo | Command below | Remove the demo data |

```bash
# Write the demo graph (idempotent, safe to re-run)
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/neo4j/seed-demo

# Remove the demo data
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/neo4j/clear-demo
```

If `/status` reports `"health": "up"` and `graph-demo` returns nodes and relationships, the knowledge graph connection is working.

**Visual view**: open `http://127.0.0.1:17474` and log in with the configured account. **The connection URL must use host port `17687`** — on the connect dialog change the Connection URL from the default `127.0.0.1:7687` to `127.0.0.1:17687` (the stack maps `17687 → 7687`; host port 7687 is not open, so leaving the default fails with "Connection to instance failed", see the FAQ below). After connecting, run `MATCH (n) RETURN n` and you will see the demo graph drawn as a network of points and lines.

![neo4j-graph](/img/neo4j/neo4j-graph.png)

## FAQ

### Why does it say "Service is not available"?

Debug mode is off (`bytedesk.debug=true` required), or you are running the Community Edition (enterprise modules not included).

### The Neo4j Browser fails to log in with "Connection to instance failed"

The Browser login dialog defaults to `bolt://127.0.0.1:7687`, but this stack maps Bolt to host port **17687** (`17687:7687` in `compose-neo4j.yaml`). Nothing listens on host port 7687, so the browser's WebSocket connection is refused (`ServiceUnavailable: WebSocket connection failure`). On the "Connect to instance" dialog, set the **Connection URL** to `127.0.0.1:17687` (i.e. `neo4j://127.0.0.1:17687`), keep the user `neo4j` with the `NEO4J_PASSWORD` password, then click Connect. If the "Recent connections" list holds an old `127.0.0.1:7687` entry, do not reuse it.

### I changed `NEO4J_PASSWORD` in `.env`, why can't Weiyu connect?

The initial password **only takes effect on the first start with an empty data volume**. If the volume already exists, changing `.env` does not override the old password in the database. Either keep using the old password (update `BYTEDESK_AI_NEO4J_PASSWORD` to match), change the password inside Neo4j, or remove the data volume to start fresh (`docker volume rm bytedesk_neo4j-data` after stopping the stack).

### I didn't deploy Neo4j — will Weiyu fail to start?

No. The switch is off by default and Weiyu never connects to Neo4j unless `bytedesk.ai.neo4j.enabled=true` is set. Even a wrong address or password will not affect startup while the switch is off.

### What is the difference between the demo data and my real knowledge base?

Demo endpoints only write and read data labeled `BytedeskDemo`, which is fully isolated from business data. `clear-demo` removes only the demo data.

## References

- [Getting started with Neo4j in Docker (official docs)](https://neo4j.com/docs/operations-manual/current/docker/introduction/)
- [Neo4j Docker image (Docker Hub)](https://hub.docker.com/_/neo4j)
- [Neo4j GitHub repository](https://github.com/neo4j/neo4j)
