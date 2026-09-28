---
sidebar_label: OpenTelemetry
sidebar_position: 11
---

# OpenTelemetry

:::info 第三方元件說明
以下說明僅供參考，具體配置和使用方法請參考 [OpenTelemetry 官方文件](https://opentelemetry.io/docs/)。
:::

微語應用同時內建 `spring-boot-starter-opentelemetry`，支援以 **OTLP** 協定匯出追蹤資料（替代 Zipkin 原生協定），可對接任意 OTLP 相容後端：專案內建的 **OTel Collector**、Jaeger、Grafana Tempo 或雲廠商平台。

:::warning 兩種追蹤模式互斥
應用同時包含 `spring-boot-starter-zipkin`（Brave）與 `spring-boot-starter-opentelemetry`。兩者共存於 classpath 時，**Brave 始終贏得 `Tracer` Bean**，OTLP 匯出永遠不生效——即使關閉 Zipkin 匯出開關也一樣。啟用 OpenTelemetry 模式必須排除 Brave 自動配置（見下文）。
:::

## 1. 啟動 OTel Collector

專案內建 [OTel Collector](https://opentelemetry.io/docs/collector/) compose 檔案，接收 OTLP 並轉發到 Zipkin，查詢介面不變：

```bash
cd deploy/docker

# otelcol 轉發依賴 zipkin，兩者一起啟動（或使用 obs 組合）
./start.sh zipkin otelcol

# 停止
./stop.sh zipkin otelcol down
```

手動 docker compose（在 `deploy/docker` 目錄執行）：

```bash
docker compose --env-file .env -f compose/compose-zipkin.yaml -f compose/compose-otelcol.yaml up -d
```

| 項目 | 值 |
| --- | --- |
| 映像 | `otel/opentelemetry-collector-contrib:latest`（容器 `otelcol-bytedesk`） |
| OTLP HTTP | `http://127.0.0.1:14318/v1/traces`（宿主機 14318 → 容器 4318） |
| OTLP gRPC | `127.0.0.1:14317`（宿主機 14317 → 容器 4317） |
| 設定檔 | `deploy/docker/compose/otelcol/otelcol-config.yaml`（OTLP 接收 → batch → zipkin exporter） |
| 查詢介面 | Zipkin [http://127.0.0.1:19411](http://127.0.0.1:19411)（collector 轉發到 `http://zipkin-bytedesk:9411/api/v2/spans`） |

:::tip 對接其他後端
不必使用內建 collector——將 `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_ENDPOINT` 改為任意 OTLP 端點即可（Jaeger `http://<host>:14268/api/traces`、Tempo、雲廠商 OTLP 接入位址等）。
:::

## 2. 開啟應用 OTel 追蹤

關鍵步驟：排除 Brave 自動配置，否則 OTel tracer 無法接管：

```bash
SPRING_AUTOCONFIGURE_EXCLUDE=org.springframework.boot.micrometer.tracing.brave.autoconfigure.BraveAutoConfiguration \
MANAGEMENT_TRACING_ENABLED=true \
MANAGEMENT_OPENTELEMETRY_ENABLED=true \
MANAGEMENT_TRACING_SAMPLING_PROBABILITY=1.0 \
./starter/mvnw -f starter/pom.xml spring-boot:run
```

| 環境變數 | 預設值 | 說明 |
| --- | --- | --- |
| `MANAGEMENT_OPENTELEMETRY_ENABLED` | `false` | OTel SDK 總開關（關閉時完全退避） |
| `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_ENDPOINT` | `http://127.0.0.1:14318/v1/traces` | OTLP 上報位址 |
| `MANAGEMENT_OPENTELEMETRY_TRACING_EXPORT_OTLP_TRANSPORT` | `http` | 傳輸方式：`http` 或 `grpc` |
| `MANAGEMENT_OTLP_METRICS_EXPORT_ENABLED` | `false` | OTLP **指標**匯出（開啟後每分鐘推送） |
| `SPRING_AUTOCONFIGURE_EXCLUDE` | （空） | 切 OTel 模式時填 Brave 自動配置類別全名 |

所有 OTel 開關預設 `false`，後端未啟動時應用啟動無告警。注意：**local profile** 下共享的追蹤總開關 `MANAGEMENT_TRACING_ENABLED` 已預設 `true`（Zipkin 除錯模式），因此只需額外設定上表中 OTel 專屬變數。`MANAGEMENT_OTLP_METRICS_EXPORT_ENABLED` 預設關閉的原因：OTLP 指標註冊表的建立不受 `MANAGEMENT_OPENTELEMETRY_ENABLED` 控制，若預設開啟會每分鐘向 localhost:4318 推送指標產生連線拒絕噪音。

## 3. 驗證

產生一些流量，開啟 Zipkin UI [http://127.0.0.1:19411](http://127.0.0.1:19411) 點選 **Run Query**——span 經 collector 到達。也可查看 collector 是否收到資料：

```bash
docker logs otelcol-bytedesk 2>&1 | tail
```

## 說明

- collector 需與 Zipkin 在同一 compose 專案中啟動（`./start.sh zipkin otelcol`）才能解析 `zipkin-bytedesk` 主機名；單獨啟動 `compose-otelcol.yaml` 會落入隔離網路。
- Zipkin 預設記憶體儲存（`STORAGE_TYPE=mem`），重啟後 trace 遺失。
- 指標（Prometheus/Grafana）相關參見 [可觀測性文件](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/readme/readme.observability.md)。
