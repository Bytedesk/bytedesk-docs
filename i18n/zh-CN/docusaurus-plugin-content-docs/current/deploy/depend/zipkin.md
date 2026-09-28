---
sidebar_label: Zipkin
sidebar_position: 11
---

# Zipkin

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [Zipkin 官方文档](https://zipkin.io/quickstart/)。
:::

[Zipkin](https://zipkin.io/) 是分布式追踪系统。微语默认使用 Zipkin 作为追踪后端：应用内置 `spring-boot-starter-zipkin`（Brave 桥接），通过 Zipkin v2 HTTP 协议上报 span。**local profile 默认开启 Zipkin 追踪**（便于日常本地调试，未启动 Zipkin 时可通过 `MANAGEMENT_TRACING_ENABLED=false` 临时关闭）；prod/open/noai 等其他 profile 默认**关闭**，后端未启动时应用启动日志保持干净。

完整可观测性组件（Prometheus + Grafana + Zipkin + OTel Collector）参见 [deploy/docker 可观测性文档](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/readme/readme.observability.md)。

## Docker 部署

```bash
cd deploy/docker

# 单独启动 zipkin
./start.sh zipkin

# 或使用可观测性组合（prometheus + grafana + zipkin + otelcol）
./start.sh middleware obs

# 停止
./stop.sh zipkin down
```

手动 docker compose（在 `deploy/docker` 目录执行）：

```bash
docker compose --env-file .env -f compose/compose-zipkin.yaml up -d
```

- UI 地址：[http://127.0.0.1:19411](http://127.0.0.1:19411)
- 容器：`zipkin-bytedesk`（镜像 `openzipkin/zipkin:latest`，端口 `19411 -> 9411`）
- 存储：默认内存存储（`STORAGE_TYPE=mem`），重启后 trace 丢失；生产环境建议切换 elasticsearch/mysql

## 开启应用追踪

**local profile** 下追踪已默认开启——启动 Zipkin 后直接运行应用即可。其他 profile（或需要覆盖时）设置：

```bash
MANAGEMENT_TRACING_ENABLED=true \
MANAGEMENT_ZIPKIN_TRACING_ENABLED=true \
MANAGEMENT_TRACING_SAMPLING_PROBABILITY=1.0 \
./starter/mvnw -f starter/pom.xml spring-boot:run
```

| 环境变量 | local 默认值 | 其他 profile | 说明 |
| --- | --- | --- | --- |
| `MANAGEMENT_TRACING_ENABLED` | `true` | `false` | 追踪总开关 |
| `MANAGEMENT_ZIPKIN_TRACING_ENABLED` | `true` | `false` | Zipkin 导出开关 |
| `MANAGEMENT_TRACING_SAMPLING_PROBABILITY` | `1.0` | `0.0` | 采样率 0.0~1.0（生产调低） |
| `MANAGEMENT_ZIPKIN_TRACING_ENDPOINT` | `http://127.0.0.1:19411/api/v2/spans` | 同左 | Zipkin 上报地址 |

## Spring Boot 4.x 属性名变化

Spring Boot 4 重命名了追踪属性，旧属性已**废弃（error 级别，不再生效）**：

| 旧属性（已失效） | 新属性（Spring Boot 4.x） |
| --- | --- |
| `management.tracing.enabled` | `management.tracing.export.enabled` |
| `management.zipkin.tracing.enabled` | `management.tracing.export.zipkin.enabled` |
| `management.zipkin.tracing.endpoint` | `management.tracing.export.zipkin.endpoint` |
| `management.tracing.sampling.probability` | 不变 ✅ |

## 验证

产生一些流量（如登录后台），打开 [http://127.0.0.1:19411](http://127.0.0.1:19411) 点击 **Run Query**，即可看到 HTTP 请求、WebSocket/MQTT 消息以及 Spring AI 操作（ChatClient / ChatModel / VectorStore 的 `gen_ai.*` span）的链路。

:::tip
希望使用 OTLP 协议对接 Jaeger / Tempo / 云厂商后端？参见 [OpenTelemetry](./opentelemetry.md)——应用同时内置 `spring-boot-starter-opentelemetry`，两种模式互斥，默认 Brave 生效。
:::

![zipkin](/img/obs/obs_zipkin.png)
