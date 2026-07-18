---
sidebar_label: 系統監控
sidebar_position: 1
---

# Bytedesk 系統監控

微語（Bytedesk）服務監控面板，提供統一的健康檢查、指標採集、日誌查看和環境資訊瀏覽功能。

[GitHub](https://github.com/Bytedesk/bytedesk-monitor)  |  [Gitee](https://gitee.com/270580156/bytedesk-monitor)

## 概述

bytedesk-monitor 是一個獨立的監控服務，支援：

- **集中監控** — 一個面板管理所有 Bytedesk 服務
- **健康檢查** — 即時查看註冊實例的線上/離線狀態
- **指標採集** — JVM 記憶體、執行緒、GC、HTTP 請求等核心指標
- **日誌查看** — 線上瀏覽和搜尋應用日誌
- **環境資訊** — 查看 Spring 環境變數、系統屬性
- **執行緒轉儲** — 線上擷取和分析 JVM 執行緒 Dump
- **通知告警** — 服務狀態變更時觸發通知（離線/恢復）

## 架構

```
┌──────────────────────┐         註冊 / 心跳                   ┌──────────────────────┐
│  bytedesk-starter     │ ──────────────────────────────────▶  │  bytedesk-monitor     │
│  (埠號 9003)          │  暴露 actuator 端點                   │  (埠號 9103)          │
│  SBA Client           │                                      │  SBA Server           │
└──────────────────────┘                                      └──────────────────────┘
                                                                     │
                                                               管理介面訪問
                                                          http://127.0.0.1:9103
```

- **Monitor Server**（`bytedesk-monitor`）：Spring Boot Admin Server，預設埠號 `9103`
- **Client**（`bytedesk-starter`）：透過 `spring-boot-admin-starter-client` 自動註冊到監控服務端

## 快速開始

### 1. 啟動監控服務

```bash
cd bytedesk-monitor
./mvnw spring-boot:run
```

### 2. 啟動 Bytedesk 應用

bytedesk starter 已內建 `spring-boot-admin-starter-client` 並設定好自動註冊。

```bash
cd bytedesk-3x
JASYPT_ENCRYPTOR_PASSWORD=<your-password> ./starter/mvnw -f starter/pom.xml spring-boot:run
```

### 3. 打開監控面板

瀏覽器訪問 `http://127.0.0.1:9103`，登入憑據：

| 欄位       | 預設值    |
|------------|-----------|
| 使用者名稱 | `admin`   |
| 密碼       | `admin`   |

> 💡 **修改預設密碼**：編輯 bytedesk-monitor 的 `src/main/resources/application.properties`，修改以下配置：
>
> ```properties
> spring.security.user.name=admin
> spring.security.user.password=your-new-password
> ```
>
> ⚠️ **正式環境**：請透過環境變數 `SPRING_SECURITY_USER_NAME` / `SPRING_SECURITY_USER_PASSWORD` 覆蓋預設憑據。

## 設定說明

### 監控伺服器端

在 bytedesk-monitor 專案的 `src/main/resources/application.properties` 中設定：

```properties
server.port=9103
spring.boot.admin.ui.title=Bytedesk Monitor
spring.boot.admin.monitor.status-interval=10000ms
spring.boot.admin.monitor.default-timeout=10000ms
spring.security.user.name=admin
spring.security.user.password=admin
```

### 客戶端（本地開發）

在 bytedesk-starter 的 `properties/local/51-jpa-web-actuator.properties` 中新增：

```properties
spring.boot.admin.client.url=http://127.0.0.1:9103
spring.boot.admin.client.username=admin
spring.boot.admin.client.password=admin
spring.boot.admin.client.instance.name=bytedesk-starter
spring.boot.admin.client.instance.service-base-url=http://127.0.0.1:9003
```

### 客戶端（Docker Compose）

在 docker-compose 的 `environment` 中取消註解以下設定：

```yaml
# SPRING_BOOT_ADMIN_CLIENT_URL: http://bytedesk-monitor:9103
# SPRING_BOOT_ADMIN_CLIENT_USERNAME: admin
# SPRING_BOOT_ADMIN_CLIENT_PASSWORD: admin
# SPRING_BOOT_ADMIN_CLIENT_INSTANCE_NAME: bytedesk-starter
# SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL: http://127.0.0.1:9003
```

### 郵件通知

服務離線或恢復時自動發送郵件告警。在 bytedesk-monitor 中新增 `application-open.properties`：

```properties
spring.mail.host=${SPRING_MAIL_HOST:smtp.qiye.aliyun.com}
spring.mail.port=${SPRING_MAIL_PORT:465}
spring.mail.username=${SPRING_MAIL_USERNAME:support@example.com}
spring.mail.password=${SPRING_MAIL_PASSWORD:}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.ssl.enable=true

spring.boot.admin.notify.mail.enabled=true
spring.boot.admin.notify.mail.to=${SPRING_BOOT_ADMIN_NOTIFY_MAIL_TO:admin@example.com}
spring.boot.admin.notify.mail.from=${SPRING_BOOT_ADMIN_NOTIFY_MAIL_FROM:Bytedesk Monitor <support@example.com>}
```

> 💡 正式環境建議透過環境變數注入 SMTP 憑據和收件人地址。詳細郵箱設定請參考 [郵箱設定](../channel/email.md)。

## 功能特性

### 健康面板

在一個面板中集中查看所有已註冊 Bytedesk 服務實例的即時線上/離線狀態。

### 指標監控

監控 JVM 關鍵指標：堆記憶體/非堆記憶體、活躍執行緒數、GC 頻率與耗時、HTTP 請求吞吐量，並支援歷史趨勢圖表。

### 日誌查看

無需登入伺服器即可線上瀏覽和搜尋應用日誌，支援按日誌級別、時間範圍和關鍵字過濾。

### 環境資訊

一目了然地查看 Spring 環境變數、系統屬性和 JVM 配置參數。

### 執行緒轉儲

線上擷取和分析 JVM 執行緒 Dump，快速診斷死結、執行緒競爭和 CPU 飆升等問題。

### 狀態告警

服務離線或恢復時自動觸發通知，可擴展對接郵件、Slack、釘釘等通知渠道。

## 介面預覽

### 應用總覽

![應用總覽](/img/monitor/bytedesk-monitor-apps.png)

### 應用詳情

![應用詳情](/img/monitor/bytedesk-monitor-detail.png)

### 事件日誌

![事件日誌](/img/monitor/bytedesk-monitor-journal.png)

## 相關連結

- [Spring Boot Admin 官方文件](https://docs.spring-boot-admin.com/current/getting-started.html)
- [bytedesk-monitor GitHub](https://github.com/Bytedesk/bytedesk-monitor)
- [bytedesk-monitor Gitee](https://gitee.com/270580156/bytedesk-monitor)
- [Bytedesk 主專案](https://github.com/Bytedesk/bytedesk)
