---
sidebar_label: Artemis
sidebar_position: 5
---

# Artemis 訊息中介軟體

:::tip 系統需求

- 作業系統：Ubuntu 22.04 LTS
- 伺服器建議規格：2 核心、4 GB 記憶體
:::

:::info 第三方元件說明
以下內容僅供參考，具體設定與使用請以官方文件為準：
https://activemq.apache.org/components/artemis/documentation/latest/
:::

## 簡介

Apache ActiveMQ Artemis 是 Apache 基金會開源的高效能、非同步訊息系統。作為微語系統（基於 Spring Boot 3.x）的一項核心組件，Artemis 主要用於即時聊天訊息收發與大量 FAQ 檔案的批次匯入等場景。

## 在微語中的應用場景

### 即時聊天訊息處理

- 訪客與客服之間的即時通訊
- 可靠投遞：不遺失、不重複
- 高併發處理，支援大量線上使用者
- 多端同步顯示

### 批次資料處理

- 大量知識庫文章、FAQ 批次匯入
- 將耗時作業非同步化，提升系統回應速度
- 以佇列管理大型批處理任務

## 為何選擇 Artemis

- 高效能：高吞吐、低延遲
- 高可靠：完整支援 JMS 與 AMQP 等標準
- 易整合：與 Spring Boot 3.x 無縫整合
- 多協定：JMS、AMQP、STOMP、MQTT 等
- 彈性模型：支援佇列與主題（發佈/訂閱）

## 方式一：以 Docker 部署（推薦）

部署簡單、易於管理。docker-compose 範例：

```yaml
services:
  bytedesk-artemis:
    image: apache/activemq-artemis:latest
    container_name: artemis-bytedesk
    environment:
      - ARTEMIS_USER=admin
      - ARTEMIS_PASSWORD=admin
      - ANONYMOUS_LOGIN=false
      - EXTRA_ARGS=--http-host 0.0.0.0 --relax-jolokia
    ports:
      - "16161:61616"   # JMS
      - "18161:8161"    # Web 主控台
      - "16162:61617"   # AMQP
      - "15672:5672"    # AMQP(備用)
      - "16163:61613"   # STOMP
      - "11883:1883"    # MQTT
    volumes:
      - artemis_data:/var/lib/artemis/data
    networks:
      - bytedesk-network
    restart: always
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8161/console/jolokia/read/org.apache.activemq.artemis:broker=\"0.0.0.0\""]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  artemis_data:

networks:
  bytedesk-network:
    driver: bridge
```

## 方式二：下載安裝包解壓部署

- 下載： https://activemq.apache.org/components/artemis/download/

## 安裝

```shell
./apache-artemis-2.37.0/bin/artemis create mybroker
# 帳號/密碼：admin/admin
./mybroker/bin/artemis run            # 前景
./mybroker/bin/artemis-service start  # 背景
./mybroker/bin/artemis stop
./mybroker/bin/artemis-service status
./mybroker/bin/artemis-service log
./apache-artemis-2.37.0/bin/artemis help create
# 需要時可調整埠號（broker.xml）
# Web 主控台： http://localhost:8161
```

## 部署模式

### 1. Embedded（開發/測試推薦）

Spring Boot 會自動啟動內嵌 broker，無需額外安裝。

優點：
- 無需額外安裝
- 設定簡單、開箱即用
- 適合開發/測試
- 啟動/除錯快速

缺點：
- 效能較低
- 不適合正式環境
- 不支援叢集

設定：

```properties
spring.artemis.mode=embedded
```

### 2. Native（正式環境推薦）

連線至外部獨立 Artemis broker。

優點：
- 效能更高
- 支援叢集
- 正式環境可用性佳
- 延展性/維護性更好

缺點：
- 額外安裝與設定
- 配置較複雜
- 需維護獨立服務

## 微語應用設定（Native）

```properties
spring.artemis.mode=native
spring.artemis.broker-url=tcp://127.0.0.1:16161
spring.artemis.user=admin
spring.artemis.password=admin
```

## 模式切換

1) 調整 `spring.artemis.mode`
2) 註解掉當前模式設定
3) 啟用目標模式設定
4) 重啟應用

## 選配參數（JMS/連線池/健康檢查）

```bash
spring.jms.listener.auto-startup=true
spring.jms.listener.acknowledge-mode=auto
spring.jms.listener.concurrency=5
spring.jms.listener.max-concurrency=50
spring.jms.listener.receive-timeout=15000
spring.jms.listener.max-attempts=3
spring.jms.listener.initial-interval=2000
spring.jms.listener.max-interval=15000
spring.jms.listener.multiplier=2.0
spring.jms.listener.missing-queues-fatal=false
spring.jms.listener.connection-factory-fatal=false

spring.artemis.pool.enabled=true
spring.artemis.pool.max-connections=20
spring.artemis.pool.min-connections=5
spring.artemis.pool.time-between-expiration-check=10000
spring.artemis.pool.idle-timeout=60000
spring.artemis.pool.max-lifetime=300000

spring.artemis.connection-timeout=15000
spring.artemis.connection-ttl=30000
spring.artemis.call-timeout=15000
spring.artemis.call-failover-timeout=15000
spring.artemis.retry-interval=2000
spring.artemis.max-retry-interval=30000
spring.artemis.reconnect-attempts=15
spring.artemis.initial-connect-attempts=5
spring.artemis.consumer-window-size=0
spring.artemis.producer-window-size=0
spring.artemis.consumer-max-rate=-1
spring.artemis.producer-max-rate=-1
spring.artemis.confirmation-window-size=-1
spring.artemis.block-on-durable-send=false
spring.artemis.block-on-non-durable-send=false

management.health.jms.enabled=true
management.health.artemis.enabled=true
```

## 說明

- Embedded：由 Spring Boot 自動建立 ConnectionFactory
- Native：需手動建立並設定 ConnectionFactory
- 兩種模式共用 JMS 設定，並支援 Actuator 健康檢查

## 疑難排解

連線失敗：
- 檢查 Artemis 狀態（docker logs / service status）
- 驗證連線參數（URL/帳密/網路）
- 查看應用日誌中的 JMS/Artemis 錯誤

效能問題：
- 增加連線池、調整併發與逾時

訊息遺失：
- 確認確認模式、啟用死信佇列、檢視主控台

記憶體偏高：
- 調整 JVM、啟用持久化（Embedded）、限制佇列大小

Docker 環境（節錄）：

```yaml
services:
  bytedesk-server:
    image: bytedesk/bytedesk-server:latest
    environment:
      - SPRING_ARTEMIS_MODE=native
      - SPRING_ARTEMIS_BROKER_URL=tcp://bytedesk-artemis:61616
      - SPRING_ARTEMIS_USER=admin
      - SPRING_ARTEMIS_PASSWORD=admin
    depends_on:
      - bytedesk-artemis
```

Web 主控台：
- 位址：http://127.0.0.1:18161/console
- 帳密：admin / admin

## 與其他 MQ 對比

| 對比項 | Artemis | RabbitMQ | Kafka | RocketMQ |
|-------|---------|----------|-------|----------|
| 定位 | 通用型訊息中介 | 可靠性優先 | 高吞吐串流 | 金融級訊息中介 |
| 效能 | 極高（百萬級 TPS） | 中等（萬級 TPS） | 極高（百萬級 TPS） | 高（十萬級 TPS） |
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| 維運複雜度 | 低 | 低 | 高 | 中 |
| Spring 整合 | 最佳（原生） | 良好 | 良好 | 良好 |
| 協定支援 | AMQP, MQTT, STOMP, OpenWire, Core | AMQP | 自訂 | 自訂 |
| 資源占用 | 低 | 中 | 高 | 中 |
| 部署難度 | 簡單 | 簡單 | 複雜 | 中等 |
| 訊息可靠性 | 高 | 高 | 高（需設定） | 高 |
| 社群活躍度 | 中 | 高 | 極高 | 高 |

為何選 Artemis：
- 即時客服場景表現最佳
- 相較 Kafka/RocketMQ，配置與維運負擔更小
- 與 Spring Boot 3.x 無縫整合
- 多協定支援，便於多端整合
- 同時應付即時與批次兩類場景

參考：
- Spring Boot JMS：https://docs.spring.io/spring-boot/reference/messaging/jms.html
- Apache Artemis：https://activemq.apache.org/components/artemis/documentation/latest/index.html
- Spring JMS 指南：https://spring.io/guides/gs/messaging-jms/
- Docker 映像：https://hub.docker.com/r/apache/activemq-artemis
