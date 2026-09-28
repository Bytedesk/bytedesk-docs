---
sidebar_label: Zipkin
sidebar_position: 11
---

# Zipkin

[Zipkin](https://zipkin.io/) is a distributed tracing system. Bytedesk uses it as the default trace backend: the application ships with `spring-boot-starter-zipkin` (Brave bridge) and reports spans via the Zipkin v2 HTTP protocol. The **local profile enables Zipkin tracing by default** for day-to-day debugging (disable via `MANAGEMENT_TRACING_ENABLED=false` if Zipkin is not running); other profiles (prod/open/noai) ship with tracing **disabled** so startup stays clean when no backend is running.

:::info
For the full observability stack (Prometheus + Grafana + Zipkin + OTel Collector), see [deploy/docker observability readme](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/readme/readme.observability.md).
:::

## Docker Deployment

```bash
cd deploy/docker

# start zipkin alone
./start.sh zipkin

# or as part of the observability combo (prometheus + grafana + zipkin + otelcol)
./start.sh middleware obs

# stop
./stop.sh zipkin down
```

Manual docker compose (from `deploy/docker`):

```bash
docker compose --env-file .env -f compose/compose-zipkin.yaml up -d
```

- UI: [http://127.0.0.1:19411](http://127.0.0.1:19411)
- Container: `zipkin-bytedesk` (image `openzipkin/zipkin:latest`, port `19411 -> 9411`)
- Storage: in-memory by default (`STORAGE_TYPE=mem`) — traces are lost on restart; switch to elasticsearch/mysql for production

## Enable Application Tracing

With the **local profile** tracing is already on — just start Zipkin and run the app. For other profiles (or to override), set:

```bash
MANAGEMENT_TRACING_ENABLED=true \
MANAGEMENT_ZIPKIN_TRACING_ENABLED=true \
MANAGEMENT_TRACING_SAMPLING_PROBABILITY=1.0 \
./starter/mvnw -f starter/pom.xml spring-boot:run
```

| Environment variable | local default | Other profiles | Description |
| --- | --- | --- | --- |
| `MANAGEMENT_TRACING_ENABLED` | `true` | `false` | Master switch for tracing |
| `MANAGEMENT_ZIPKIN_TRACING_ENABLED` | `true` | `false` | Zipkin span export switch |
| `MANAGEMENT_TRACING_SAMPLING_PROBABILITY` | `1.0` | `0.0` | Sampling ratio 0.0–1.0 (lower it in production) |
| `MANAGEMENT_ZIPKIN_TRACING_ENDPOINT` | `http://127.0.0.1:19411/api/v2/spans` | same | Zipkin ingest endpoint |

## Spring Boot 4.x Property Names

Spring Boot 4 renamed the tracing properties; the old ones are **deprecated with error level and no longer work**:

| Old (dead) | New (Spring Boot 4.x) |
| --- | --- |
| `management.tracing.enabled` | `management.tracing.export.enabled` |
| `management.zipkin.tracing.enabled` | `management.tracing.export.zipkin.enabled` |
| `management.zipkin.tracing.endpoint` | `management.tracing.export.zipkin.endpoint` |
| `management.tracing.sampling.probability` | unchanged ✅ |

## Verify

Generate some traffic (e.g. log into the web console), then open [http://127.0.0.1:19411](http://127.0.0.1:19411) and click **Run Query**. You should see traces for HTTP requests, WebSocket/MQTT messaging and Spring AI operations (`gen_ai.*` spans for ChatClient / ChatModel / VectorStore calls).

:::tip
Prefer OTLP-based tracing (Jaeger / Tempo / a vendor backend)? See [OpenTelemetry](./opentelemetry.md) — the application also ships `spring-boot-starter-opentelemetry`; the two modes are mutually exclusive and Brave wins by default.
:::

![zipkin](/img/obs/obs_zipkin.png)
