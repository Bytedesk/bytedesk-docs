---
sidebar_label: OpenTelemetry
sidebar_position: 11
---

# OpenTelemetry

Bytedesk also ships with `spring-boot-starter-opentelemetry`, allowing the application to export traces via the **OTLP** protocol instead of the native Zipkin protocol. This lets you plug the same instrumentation into any OTLP-compatible backend: the bundled **OTel Collector**, Jaeger, Grafana Tempo, or vendor platforms.

:::warning Two tracing modes are mutually exclusive
The application contains both `spring-boot-starter-zipkin` (Brave) and `spring-boot-starter-opentelemetry`. When both are on the classpath, **Brave always wins** the `Tracer` bean and OTLP export never happens — even with the Zipkin export switch off. To activate the OpenTelemetry mode you must exclude the Brave auto-configuration (see below).
:::

## 1. Start the OTel Collector

The project bundles an [OTel Collector](https://opentelemetry.io/docs/collector/) compose file that receives OTLP and forwards traces to Zipkin, so you keep the same Zipkin UI:

```bash
cd deploy/docker

# otelcol forwards to zipkin, so start both (or use the obs combo)
./start.sh zipkin otelcol

# stop
./stop.sh zipkin otelcol down
```

Manual docker compose (from `deploy/docker`):

```bash
docker compose --env-file .env -f compose/compose-zipkin.yaml -f compose/compose-otelcol.yaml up -d
```

| Item | Value |
| --- | --- |
| Image | `otel/opentelemetry-collector-contrib:latest` (container `otelcol-bytedesk`) |
| OTLP HTTP | `http://127.0.0.1:14318/v1/traces` (host 14318 → container 4318) |
| OTLP gRPC | `127.0.0.1:14317` (host 14317 → container 4317) |
| Config | `deploy/docker/compose/otelcol/otelcol-config.yaml` (OTLP receiver → batch → zipkin exporter) |
| Trace UI | Zipkin at [http://127.0.0.1:19411](http://127.0.0.1:19411) (collector forwards to `http://zipkin-bytedesk:9411/api/v2/spans`) |

:::tip Pointing at another backend
You don't have to run the bundled collector — change `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_ENDPOINT` to any OTLP endpoint (Jaeger `http://<host>:14268/api/traces`, Tempo, a vendor OTLP ingest URL, ...).
:::

## 2. Enable Application OTel Tracing

The key step is excluding the Brave auto-configuration, otherwise the OTel tracer never takes over:

```bash
SPRING_AUTOCONFIGURE_EXCLUDE=org.springframework.boot.micrometer.tracing.brave.autoconfigure.BraveAutoConfiguration \
MANAGEMENT_TRACING_ENABLED=true \
MANAGEMENT_OPENTELEMETRY_ENABLED=true \
MANAGEMENT_TRACING_SAMPLING_PROBABILITY=1.0 \
./starter/mvnw -f starter/pom.xml spring-boot:run
```

| Environment variable | Default | Description |
| --- | --- | --- |
| `MANAGEMENT_OPENTELEMETRY_ENABLED` | `false` | OTel SDK master switch (fully backs off when false) |
| `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_ENDPOINT` | `http://127.0.0.1:14318/v1/traces` | OTLP ingest endpoint |
| `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_TRANSPORT` | `http` | `http` or `grpc` |
| `MANAGEMENT_OTLP_METRICS_EXPORT_ENABLED` | `false` | OTLP **metrics** export (pushes every minute when on) |
| `SPRING_AUTOCONFIGURE_EXCLUDE` | (empty) | Set to the Brave auto-configuration class to switch to OTel mode |

All OTel switches default to `false` so the application starts clean when no backend is running. Note: in the **local profile** the shared master switch `MANAGEMENT_TRACING_ENABLED` already defaults to `true` (Zipkin mode for debugging), so only the OTel-specific variables above are needed there. `MANAGEMENT_OTLP_METRICS_EXPORT_ENABLED` is kept off by default because the OTLP metrics registry is created independently of `MANAGEMENT_OPENTELEMETRY_ENABLED` and would otherwise push metrics to localhost:4318 every minute.

## 3. Verify

Generate some traffic, then open the Zipkin UI at [http://127.0.0.1:19411](http://127.0.0.1:19411) and click **Run Query** — spans arrive through the collector. You can also check the collector received data:

```bash
docker logs otelcol-bytedesk 2>&1 | tail
```

## Notes

- The collector must run in the same compose project as Zipkin (`./start.sh zipkin otelcol`) for the `zipkin-bytedesk` hostname to resolve; starting `compose-otelcol.yaml` alone lands it on an isolated network.
- Zipkin's in-memory storage (`STORAGE_TYPE=mem`) loses traces on restart.
- For metrics (Prometheus/Grafana) instead of traces, see the [observability readme](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/readme/readme.observability.md).
