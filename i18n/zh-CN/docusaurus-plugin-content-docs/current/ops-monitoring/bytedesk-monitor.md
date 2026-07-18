---
sidebar_label: 系统监控
sidebar_position: 1
---

# 微语系统监控

微语（Bytedesk）服务监控面板，提供统一的健康检查、指标采集、日志查看和环境信息浏览功能。

[GitHub](https://github.com/Bytedesk/bytedesk-monitor)  |  [Gitee](https://gitee.com/270580156/bytedesk-monitor)

## 概述

微语监控系统 是一个独立的监控服务，支持：

- **集中监控** — 一个面板管理所有 Bytedesk 服务
- **健康检查** — 实时查看注册实例的在线/离线状态
- **指标采集** — JVM 内存、线程、GC、HTTP 请求等核心指标
- **日志查看** — 在线浏览和搜索应用日志
- **环境信息** — 查看 Spring 环境变量、系统属性
- **线程转储** — 在线捕获和分析 JVM 线程 Dump
- **通知告警** — 服务状态变更时触发通知（离线/恢复）

## 架构

```bash
┌──────────────────────┐         注册 / 心跳                   ┌──────────────────────┐
│  bytedesk-starter     │ ──────────────────────────────────▶  │  bytedesk-monitor     │
│  (端口 9003)          │  暴露 actuator 端点                   │  (端口 9103)          │
│  SBA Client           │                                      │  SBA Server           │
└──────────────────────┘                                      └──────────────────────┘
                                                                     │
                                                               管理界面访问
                                                          http://127.0.0.1:9103
```

- **Monitor Server**（`bytedesk-monitor`）：Spring Boot Admin Server，默认端口 `9103`
- **Client**（`bytedesk-starter`）：通过 `spring-boot-admin-starter-client` 自动注册到监控服务端

## 快速开始

### 前置要求

- JDK 21
- Maven 3.x（或使用项目自带的 `mvnw`）

### 1. 启动监控服务

```bash
cd bytedesk-monitor
./mvnw install -Dmaven.test.skip=true
./mvnw spring-boot:run
```

### 2. 启动 Bytedesk 应用

bytedesk starter 已内置 `spring-boot-admin-starter-client` 并配置好自动注册。

```bash
cd bytedesk-3x
./starter/mvnw -f starter/pom.xml spring-boot:run
```

### 3. 打开监控面板

浏览器访问 `http://127.0.0.1:9103`，登录凭据：

| 字段   | 默认值    |
|--------|-----------|
| 用户名 | `admin`   |
| 密码   | `admin`   |

> 💡 **修改默认密码**：编辑 bytedesk-monitor 的 `src/main/resources/application.properties`，修改以下配置即可：
>
> ```properties
> spring.security.user.name=admin
> spring.security.user.password=your-new-password
> ```
>
> ⚠️ **生产环境**：请通过环境变量 `SPRING_SECURITY_USER_NAME` / `SPRING_SECURITY_USER_PASSWORD` 覆盖默认凭据。

## 构建与打包

```bash
./mvnw clean package -Dmaven.test.skip=true
```

JAR 输出路径为 `target/bytedesk-monitor.jar`，运行方式：

```bash
# 前台运行
java -jar target/bytedesk-monitor.jar

# 后台运行（日志写入 logs/app.log）
nohup java -jar target/bytedesk-monitor.jar > logs/app.log 2>&1 &
```

## Docker 运行

### 拉取镜像

```bash
# Docker Hub
docker pull bytedesk/monitor:latest

# 阿里云镜像仓库（国内用户推荐）
docker pull registry.cn-hangzhou.aliyuncs.com/bytedesk/monitor:latest
```

### Docker 启动

```bash
docker run -d \
    --name bytedesk-monitor \
    -p 9103:9103 \
    -e SPRING_SECURITY_USER_NAME=admin \
    -e SPRING_SECURITY_USER_PASSWORD=admin \
    -e TZ=Asia/Shanghai \
    bytedesk/monitor:latest
```

容器启动后访问 `http://127.0.0.1:9103`。

> 💡 如使用阿里云镜像，将上述命令中的 `bytedesk/monitor:latest` 替换为 `registry.cn-hangzhou.aliyuncs.com/bytedesk/monitor:latest`。

### Docker Compose 启动

在项目根目录创建 `docker-compose.yml`：

```yaml
services:
    bytedesk-monitor:
        image: bytedesk/monitor:latest
        container_name: bytedesk-monitor
        ports:
            - "9103:9103"
        environment:
            SPRING_SECURITY_USER_NAME: admin
            SPRING_SECURITY_USER_PASSWORD: admin
            TZ: Asia/Shanghai
        restart: unless-stopped
```

启动与停止：

```bash
# 启动
docker compose up -d

# 查看日志
docker compose logs -f

# 停止
docker compose down
```

## 配置说明

### 监控服务端

在 bytedesk-monitor 项目的 `src/main/resources/application.properties` 中配置：

```properties
server.port=9103
spring.boot.admin.ui.title=Bytedesk Monitor
spring.boot.admin.monitor.status-interval=10000ms
spring.boot.admin.monitor.status-lifetime=60000ms
spring.boot.admin.monitor.default-timeout=10000ms
spring.security.user.name=admin
spring.security.user.password=admin
```

### 客户端（本地开发）

在 bytedesk-starter 的 `properties/local/51-jpa-web-actuator.properties` 中添加：

```properties
spring.boot.admin.client.url=http://127.0.0.1:9103
spring.boot.admin.client.username=admin
spring.boot.admin.client.password=admin
spring.boot.admin.client.instance.name=bytedesk-starter
spring.boot.admin.client.instance.service-base-url=http://127.0.0.1:9003
```

### 客户端（Docker Compose）

在 docker-compose 的 `environment` 中取消注释以下配置：

```yaml
# SPRING_BOOT_ADMIN_CLIENT_URL: http://bytedesk-monitor:9103
# SPRING_BOOT_ADMIN_CLIENT_USERNAME: admin
# SPRING_BOOT_ADMIN_CLIENT_PASSWORD: admin
# SPRING_BOOT_ADMIN_CLIENT_INSTANCE_NAME: bytedesk-starter
# SPRING_BOOT_ADMIN_CLIENT_INSTANCE_SERVICE_BASE_URL: http://127.0.0.1:9003
```

### 邮件通知

服务离线或恢复时自动发送邮件告警。在 bytedesk-monitor 中添加 `application-open.properties`：

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

> 💡 生产环境建议通过环境变量注入 SMTP 凭据和收件人地址。详细邮箱配置请参考 [邮箱配置](../channel/email.md)。

## 功能特性

### 健康面板

在一个面板中集中查看所有已注册 Bytedesk 服务实例的实时在线/离线状态。

### 指标监控

监控 JVM 关键指标：堆内存/非堆内存、活跃线程数、GC 频率与耗时、HTTP 请求吞吐量，并支持历史趋势图表。

### 日志查看

无需登录服务器即可在线浏览和搜索应用日志，支持按日志级别、时间范围和关键字过滤。

### 环境信息

一目了然地查看 Spring 环境变量、系统属性和 JVM 配置参数。

### 线程转储

在线捕获和分析 JVM 线程 Dump，快速诊断死锁、线程竞争和 CPU 飙升等问题。

### 状态告警

服务离线或恢复时自动触发通知，可扩展对接邮件、Slack、钉钉等通知渠道。

## 界面预览

### 应用总览

![应用总览](/img/monitor/bytedesk-monitor-apps.png)

### 应用详情

![应用详情](/img/monitor/bytedesk-monitor-detail.png)

### 事件日志

![事件日志](/img/monitor/bytedesk-monitor-journal.png)

![事件logs](/img/monitor/bytedesk-monitor-logs.png)

## 定时任务

![定时任务](/img/monitor/bytedesk-monitor-quartz.png)

## 线程转储threaddump

![线程转储](/img/monitor/bytedesk-monitor-threaddump.png)

## 相关链接

- [Spring Boot Admin 官方文档](http://docs.spring-boot-admin.com/3.5.9/docs/index/)
- [bytedesk-monitor GitHub](https://github.com/Bytedesk/bytedesk-monitor)
- [bytedesk-monitor Gitee](https://gitee.com/270580156/bytedesk-monitor)
- [Bytedesk 主项目](https://github.com/Bytedesk/bytedesk)
- [微语服务器监控演示](https://monitor.weiyuai.cn/applications)
