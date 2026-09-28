---
sidebar_label: Zipkin
sidebar_position: 11
---

# Zipkin

:::info 第三方元件說明
以下說明僅供參考，具體配置和使用方法請參考 [Zipkin 官方文件](https://zipkin.io/quickstart/)。
:::

[Zipkin](https://zipkin.io/) 是分散式追蹤系統。微語預設使用 Zipkin 作為追蹤後端：應用內建 `spring-boot-starter-zipkin`（Brave 橋接），透過 Zipkin v2 HTTP 協定上報 span。**local profile 預設開啟 Zipkin 追蹤**（便於日常本機除錯，未啟動 Zipkin 時可透過 `MANAGEMENT_TRACING_ENABLED=false` 臨時關閉）；prod/open/noai 等其他 profile 預設**關閉**，後端未啟動時應用啟動日誌保持乾淨。

完整可觀測性元件（Prometheus + Grafana + Zipkin + OTel Collector）參見 [deploy/docker 可觀測性文件](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/readme/readme.observability.md)。

## Docker 部署

```bash
cd deploy/docker

# 單獨啟動 zipkin
./start.sh zipkin

# 或使用可觀測性組合（prometheus + grafana + zipkin + otelcol）
./start.sh middleware obs

# 停止
./stop.sh zipkin down
```

手動 docker compose（在 `deploy/docker` 目錄執行）：

```bash
docker compose --env-file .env -f compose/compose-zipkin.yaml up -d
```

- UI 位址：[http://127.0.0.1:19411](http://127.0.0.1:19411)
- 容器：`zipkin-bytedesk`（映像 `openzipkin/zipkin:latest`，連接埠 `19411 -> 9411`）
- 儲存：預設記憶體儲存（`STORAGE_TYPE=mem`），重啟後 trace 遺失；正式環境建議切換 elasticsearch/mysql

## 開啟應用追蹤

**local profile** 下追蹤已預設開啟——啟動 Zipkin 後直接執行應用即可。其他 profile（或需要覆寫時）設定：

```bash
MANAGEMENT_TRACING_ENABLED=true \
MANAGEMENT_ZIPKIN_TRACING_ENABLED=true \
MANAGEMENT_TRACING_SAMPLING_PROBABILITY=1.0 \
./starter/mvnw -f starter/pom.xml spring-boot:run
```

| 環境變數 | local 預設值 | 其他 profile | 說明 |
| --- | --- | --- | --- |
| `MANAGEMENT_TRACING_ENABLED` | `true` | `false` | 追蹤總開關 |
| `MANAGEMENT_ZIPKIN_TRACING_ENABLED` | `true` | `false` | Zipkin 匯出開關 |
| `MANAGEMENT_TRACING_SAMPLING_PROBABILITY` | `1.0` | `0.0` | 取樣率 0.0~1.0（正式環境調低） |
| `MANAGEMENT_ZIPKIN_TRACING_ENDPOINT` | `http://127.0.0.1:19411/api/v2/spans` | 同左 | Zipkin 上報位址 |

## Spring Boot 4.x 屬性名變化

Spring Boot 4 重新命名了追蹤屬性，舊屬性已**廢棄（error 級別，不再生效）**：

| 舊屬性（已失效） | 新屬性（Spring Boot 4.x） |
| --- | --- |
| `management.tracing.enabled` | `management.tracing.export.enabled` |
| `management.zipkin.tracing.enabled` | `management.tracing.export.zipkin.enabled` |
| `management.zipkin.tracing.endpoint` | `management.tracing.export.zipkin.endpoint` |
| `management.tracing.sampling.probability` | 不變 ✅ |

## 驗證

產生一些流量（如登入後台），開啟 [http://127.0.0.1:19411](http://127.0.0.1:19411) 點選 **Run Query**，即可看到 HTTP 請求、WebSocket/MQTT 訊息以及 Spring AI 操作（ChatClient / ChatModel / VectorStore 的 `gen_ai.*` span）的鏈路。

:::tip
希望使用 OTLP 協定對接 Jaeger / Tempo / 雲廠商後端？參見 [OpenTelemetry](./opentelemetry.md)——應用同時內建 `spring-boot-starter-opentelemetry`，兩種模式互斥，預設 Brave 生效。
:::

![zipkin](/img/obs/obs_zipkin.png)
