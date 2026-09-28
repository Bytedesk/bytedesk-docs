---
sidebar_label: Web Search
sidebar_position: 81
---

# Web Search (SearXNG)

:::tip Note
This feature is not available in the Community Edition. Please upgrade to the Enterprise or Platform edition and replace the [licenseKey](../development/license.md).
:::

The web search feature lets the Weiyu AI assistant **retrieve up-to-date information from the internet in real time** and answer questions based on live search results. Prices, news, technical docs — the assistant can "look it up online" before answering, making responses more current and reliable.

## What It Does

Weiyu implements web search with a self-hosted [SearXNG](https://github.com/searxng/searxng) instance (an open-source metasearch engine). It queries Google, Bing, Baidu, and other engines at the same time, then merges and deduplicates the results. Everything runs on your own servers — **search traffic never passes through any third-party cloud**, keeping data under your control.

Typical scenarios:

- **Time-sensitive questions**: latest prices, policies, and news — training data may lag behind, web search brings real-time information
- **Research**: the AI summarizes answers from search results and lists source links at the end
- **Knowledge base fallback**: questions not covered by your knowledge base can fall back to web search

## Prerequisites

| Requirement | Description |
| --- | --- |
| Edition | Enterprise or Platform edition (not included in community images) |
| SearXNG service | Started via Docker (see Step 1 below) |
| App switch | `bytedesk.ai.searxng.enabled=true` |

## How to Enable (Administrator)

Three steps: start the search service → turn on the Weiyu switch → restart Weiyu.

### Step 1: Start the SearXNG service

On your server, go to the `deploy/docker` directory and add the `searxng` keyword (alias: `search`) to the start script:

```bash
cd deploy/docker

# Start together with the middleware stack
./start.sh middleware searxng

# Or attach it when starting the full stack
./start.sh all searxng
```

Once started, open `http://127.0.0.1:18888` in a browser — the SearXNG search page means the service is ready.

### Step 2: Turn on the Weiyu-side switch

**Docker deployment**: edit `deploy/docker/.env` and add:

```bash
BYTEDESK_AI_SEARXNG_ENABLED=true
# When the app and SearXNG share the same docker network, the default address
# http://searxng-bytedesk:8080 already works — no change needed.
```

**Running from source**: `starter/src/main/resources/properties/local/ai-searxng.properties` enables it by default with address `http://127.0.0.1:18888` — no extra configuration required.

### Step 3: Restart Weiyu

Re-run the start command (or recreate the app container) for the change to take effect.

## Configuration Parameters

All parameters can be adjusted in `ai-searxng.properties` (or via the corresponding environment variables):

| Parameter | Description | Default |
| --- | --- | --- |
| `bytedesk.ai.searxng.enabled` | Feature switch | `false` |
| `bytedesk.ai.searxng.base-url` | SearXNG service address | Depends on deployment (see above) |
| `bytedesk.ai.searxng.timeout-ms` | Request timeout in milliseconds | `10000` |
| `bytedesk.ai.searxng.max-results` | Maximum number of results returned | `5` |
| `bytedesk.ai.searxng.language` | Search language, e.g. `zh-CN`, `en-US`, `all` | Follows the deployment profile |
| `bytedesk.ai.searxng.categories` | Search category, e.g. `general`, `news`, `it` | Empty (SearXNG default) |
| `bytedesk.ai.searxng.safe-search` | Safe search level: 0 off / 1 moderate / 2 strict | `1` |

> For production, also change `SEARXNG_SECRET` in `.env` (the SearXNG instance secret) instead of keeping the default value.

## Verify It Works

With debug mode enabled (`bytedesk.debug=true`), open these addresses directly in a browser:

| Endpoint | Address | Purpose |
| --- | --- | --- |
| Status | `http://127.0.0.1:9003/spring/ai/api/v1/searxng/status` | Config and connectivity check |
| Search | `http://127.0.0.1:9003/spring/ai/api/v1/searxng/search?query=bytedesk` | Raw search results |
| Search + AI summary | Command below | LLM summarizes the results |

Search + AI summary (requires a configured LLM):

```bash
curl -X POST http://127.0.0.1:9003/spring/ai/api/v1/searxng/chat \
  -H 'Content-Type: application/json' \
  -d '{"message": "What is Weiyu bytedesk", "query": "bytedesk", "maxResults": 5}'
```

If the response contains page titles, URLs, and snippets, web search is working.

## FAQ

### Why are the search results empty?

Open `http://127.0.0.1:18888` and search the same keyword manually. If the page also returns nothing, some SearXNG engines are unreachable from your server (Google and DuckDuckGo often time out on mainland China networks). The default Weiyu configuration enables the Bing and Baidu engines, which work both inside and outside mainland China. If results are still empty, check the server's internet access.

### Why does it say "Service is not available"?

Debug mode is off (`bytedesk.debug=true` required), or you are running the Community Edition (enterprise modules not included).

### Why does /chat report "ChatModel is not available"?

The search + AI summary requires a configured **LLM** in Weiyu. The plain `/search` endpoint works without one.

### Does search traffic go through a third party?

No. SearXNG runs on your own servers and Weiyu talks only to it; aggregated queries are sent from SearXNG directly to the search engines.

## Related Links

- [SearXNG Docker Installation](https://docs.searxng.org/admin/installation-docker.html#installation-container) — official Docker deployment guide
- [SearXNG Docker Image](https://hub.docker.com/r/searxng/searxng) — Docker Hub image page
- [SearXNG GitHub](https://github.com/searxng/searxng) — open-source project repository
