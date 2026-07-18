---
sidebar_label: Bytedesk Monitor
sidebar_position: 1
---

# Bytedesk Monitor

System monitoring dashboard for Bytedesk. It provides centralized health checks, metrics collection, log viewing, and environment inspection for all registered Bytedesk Spring Boot applications.

[GitHub](https://github.com/Bytedesk/bytedesk-monitor)  |  [Gitee](https://gitee.com/270580156/bytedesk-monitor)

## Overview

bytedesk-monitor is an independent monitoring service that enables:

- **Centralized monitoring** — one dashboard for all Bytedesk services
- **Health checks** — real-time up/down status of registered instances
- **Metrics** — JVM memory, threads, GC, HTTP request statistics
- **Log viewer** — browse and search application logs online
- **Environment inspection** — view Spring environment properties and system details
- **Thread dump** — capture and analyze JVM thread dumps
- **Notifications** — alerts on status changes (offline/online)

## Architecture

```
┌──────────────────────┐         register / heartbeat         ┌──────────────────────┐
│  bytedesk-starter     │ ──────────────────────────────────▶  │  bytedesk-monitor     │
│  (port 9003)          │  actuator endpoints exposed          │  (port 9103)          │
│  SBA Client           │                                      │  SBA Server           │
└──────────────────────┘                                      └──────────────────────┘
                                                                     │
                                                               Admin UI at
                                                          http://127.0.0.1:9103
```

- **Monitor Server** (`bytedesk-monitor`): Spring Boot Admin Server UI on port `9103`
- **Client** (`bytedesk-starter`): Registers itself via `spring-boot-admin-starter-client`, exposes actuator endpoints

## Quick Start

### 1. Start the Monitor Server

```bash
cd bytedesk-monitor
./mvnw spring-boot:run
```

### 2. Start Bytedesk

The bytedesk starter already includes `spring-boot-admin-starter-client` and is pre-configured.

```bash
cd bytedesk-3x
JASYPT_ENCRYPTOR_PASSWORD=<your-password> ./starter/mvnw -f starter/pom.xml spring-boot:run
```

### 3. Open the Dashboard

Visit `http://127.0.0.1:9103` in your browser.

| Field    | Default Value |
|----------|---------------|
| Username | `admin`       |
| Password | `admin`       |

> 💡 **Change default password**: Edit `src/main/resources/application.properties` in bytedesk-monitor:
>
> ```properties
> spring.security.user.name=admin
> spring.security.user.password=your-new-password
> ```
>
> ⚠️ **Production**: Override defaults via `SPRING_SECURITY_USER_NAME` / `SPRING_SECURITY_USER_PASSWORD` environment variables.

## Configuration

### Monitor Server

In bytedesk-monitor `src/main/resources/application.properties`:

```properties
server.port=9103
spring.boot.admin.ui.title=Bytedesk Monitor
spring.boot.admin.monitor.status-interval=10000ms
spring.boot.admin.monitor.default-timeout=10000ms
spring.security.user.name=admin
spring.security.user.password=admin
```

### Client (Local Development)

In bytedesk-starter `properties/local/51-jpa-web-actuator.properties`:

```properties
spring.boot.admin.client.url=http://127.0.0.1:9103
spring.boot.admin.client.username=admin
spring.boot.admin.client.password=admin
spring.boot.admin.client.instance.name=bytedesk-starter
spring.boot.admin.client.instance.service-base-url=http://127.0.0.1:9003
```

### Client (Docker Compose)

Uncomment the following in your docker-compose `environment` section:

```yaml
# SPRING_BOOT_ADMIN_CLIENT_URL: http://bytedesk-monitor:9103
# SPRING_BOOT_ADMIN_CLIENT_USERNAME: admin
# SPRING_BOOT_ADMIN_CLIENT_PASSWORD: admin
# SPRING_BOOT_ADMIN_CLIENT_INSTANCE_NAME: bytedesk-starter
# SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL: http://127.0.0.1:9003
```

### Email Notifications

Automatically send email alerts when services go offline or recover. Add an `application-open.properties` in bytedesk-monitor:

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

> 💡 For production, inject SMTP credentials and recipients via environment variables. See [Email Configuration](../channel/email.md) for detailed setup.

## Features

### Health Dashboard

View the real-time online/offline status of all registered Bytedesk service instances in a single pane.

### Metrics Monitoring

Monitor key JVM metrics including heap/non-heap memory, active threads, GC frequency and duration, and HTTP request throughput — all with historical trend charts.

### Log Viewer

Browse and search application logs online without SSH access. Filter by log level, time range, or keyword.

### Environment Inspection

View Spring environment properties, system properties, and JVM configuration at a glance.

### Thread Dump

Capture and analyze JVM thread dumps online to diagnose deadlocks, thread contention, and high CPU issues.

### Status Notifications

Receive alerts when services go offline or recover. Extensible to email, Slack, DingTalk, and other channels.

## Screenshots

### Application Overview

![Application Overview](/img/monitor/bytedesk-monitor-apps.png)

### Application Details

![Application Details](/img/monitor/bytedesk-monitor-detail.png)

### Event Journal

![Event Journal](/img/monitor/bytedesk-monitor-journal.png)

## Related Links

- [Spring Boot Admin Docs](https://docs.spring-boot-admin.com/current/getting-started.html)
- [bytedesk-monitor GitHub](https://github.com/Bytedesk/bytedesk-monitor)
- [bytedesk-monitor Gitee](https://gitee.com/270580156/bytedesk-monitor)
- [Bytedesk](https://github.com/Bytedesk/bytedesk)
