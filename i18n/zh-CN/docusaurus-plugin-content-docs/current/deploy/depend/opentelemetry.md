---
sidebar_label: OpenTelemetry
sidebar_position: 11
---

# OpenTelemetry

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [OpenTelemetry 官方文档](https://opentelemetry.io/docs/)。
:::

微语应用同时内置 `spring-boot-starter-opentelemetry`，支持以 **OTLP** 协议导出追踪数据（替代 Zipkin 原生协议），可对接任意 OTLP 兼容后端：项目内置的 **OTel Collector**、Jaeger、Grafana Tempo 或云厂商平台。

:::warning 两种追踪模式互斥
应用同时包含 `spring-boot-starter-zipkin`（Brave）与 `spring-boot-starter-opentelemetry`。两者共存于 classpath 时，**Brave 始终赢得 `Tracer` Bean**，OTLP 导出永远不生效——即使关闭 Zipkin 导出开关也一样。启用 OpenTelemetry 模式必须排除 Brave 自动配置（见下文）。
:::

## 1. 启动 OTel Collector

项目内置 [OTel Collector](https://opentelemetry.io/docs/collector/) compose 文件，接收 OTLP 并转发到 Zipkin，查询界面不变：

```bash
cd deploy/docker

# otelcol 转发依赖 zipkin，两者一起启动（或使用 obs 组合）
./start.sh zipkin otelcol

# 停止
./stop.sh zipkin otelcol down
```

手动 docker compose（在 `deploy/docker` 目录执行）：

```bash
docker compose --env-file .env -f compose/compose-zipkin.yaml -f compose/compose-otelcol.yaml up -d
```

| 项目 | 值 |
| --- | --- |
| 镜像 | `otel/opentelemetry-collector-contrib:latest`（容器 `otelcol-bytedesk`） |
| OTLP HTTP | `http://127.0.0.1:14318/v1/traces`（宿主机 14318 → 容器 4318） |
| OTLP gRPC | `127.0.0.1:14317`（宿主机 14317 → 容器 4317） |
| 配置文件 | `deploy/docker/compose/otelcol/otelcol-config.yaml`（OTLP 接收 → batch → zipkin exporter） |
| 查询界面 | Zipkin [http://127.0.0.1:19411](http://127.0.0.1:19411)（collector 转发到 `http://zipkin-bytedesk:9411/api/v2/spans`） |

:::tip 对接其他后端
不必使用内置 collector——将 `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_ENDPOINT` 改为任意 OTLP 端点即可（Jaeger `http://<host>:14268/api/traces`、Tempo、云厂商 OTLP 接入地址等）。
:::

## 2. 开启应用 OTel 追踪

关键步骤：排除 Brave 自动配置，否则 OTel tracer 无法接管：

```bash
SPRING_AUTOCONFIGURE_EXCLUDE=org.springframework.boot.micrometer.tracing.brave.autoconfigure.BraveAutoConfiguration \
MANAGEMENT_TRACING_ENABLED=true \
MANAGEMENT_OPENTELEMETRY_ENABLED=true \
MANAGEMENT_TRACING_SAMPLING_PROBABILITY=1.0 \
./starter/mvnw -f starter/pom.xml spring-boot:run
```

| 环境变量 | 默认值 | 说明 |
| --- | --- | --- |
| `MANAGEMENT_OPENTELEMETRY_ENABLED` | `false` | OTel SDK 总开关（关闭时完全退避） |
| `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_ENDPOINT` | `http://127.0.0.1:14318/v1/traces` | OTLP 上报地址 |
| `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_TRANSPORT` | `http` | 传输方式：`http` 或 `grpc` |
| `MANAGEMENT_OTLP_METRICS_EXPORT_ENABLED` | `false` | OTLP **指标**导出（开启后每分钟推送） |
| `SPRING_AUTOCONFIGURE_EXCLUDE` | （空） | 切 OTel 模式时填 Brave 自动配置类全名 |

所有 OTel 开关默认 `false`，后端未启动时应用启动无告警。注意：**local profile** 下共享的追踪总开关 `MANAGEMENT_TRACING_ENABLED` 已默认 `true`（Zipkin 调试模式），因此只需额外设置上表中 OTel 专属变量。`MANAGEMENT_OTLP_METRICS_EXPORT_ENABLED` 默认关闭的原因：OTLP 指标注册表的创建不受 `MANAGEMENT_OPENTELEMETRY_ENABLED` 控制，若默认开启会每分钟向 localhost:4318 推送指标产生连接拒绝噪音。

## 3. 验证

产生一些流量，打开 Zipkin UI [http://127.0.0.1:19411](http://127.0.0.1:19411) 点击 **Run Query**——span 经 collector 到达。也可查看 collector 是否收到数据：

```bash
docker logs otelcol-bytedesk 2>&1 | tail
```

## 说明

- collector 需与 Zipkin 在同一 compose 项目中启动（`./start.sh zipkin otelcol`）才能解析 `zipkin-bytedesk` 主机名；单独启动 `compose-otelcol.yaml` 会落入隔离网络。
- Zipkin 默认内存存储（`STORAGE_TYPE=mem`），重启后 trace 丢失。
- 指标（Prometheus/Grafana）相关参见 [可观测性文档](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/readme/readme.observability.md)。
