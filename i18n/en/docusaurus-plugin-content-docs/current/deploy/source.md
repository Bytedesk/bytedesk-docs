---
sidebar_label: Source Code Deployment
sidebar_position: 2
---

# Source Code Deployment Guide

:::info Trial License
Need a trial license? Please refer to: [Question 13: How to apply for licenseKey](../faq#question-13-how-to-apply-for-licensekey)
:::

This document provides detailed source code deployment steps to help you quickly deploy and run the project.

:::tip System Requirements

- **Operating System**: Ubuntu 22.04 LTS
- **Hardware Configuration**: Standard deployment: 2 cores 4GB RAM

:::

## 1. Get Source Code

First, clone the project source code from the repository to local:

```bash
# Domestic users recommended to use Gitee mirror
git clone https://github.com/Bytedesk/bytedesk.git

# Or use GitHub source
git clone https://github.com/bytedesk/bytedesk.git

# Enter project directory
cd weiyu  # or cd bytedesk
```

## 2. Environment Preparation

### 2.1 Install JDK 21

The project is developed based on Spring Boot 3, **must** use JDK 21 or higher version:

```bash
# Check Java version
java --version
# Should display: java 21.x.x or higher version
```

If JDK 21 is not installed, please refer to: [JDK 21 Installation Guide](./depend/jdk)

### 2.2 Install Project Dependencies

```bash
# 1. Enter deploy/docker directory
cd bytedesk/deploy/docker

# 2. Start dependencies (default MySQL)
# start.sh [keywords...] (db/mq/components/target, any order)

# Artemis + MySQL (default)
./start mysql artemis middleware

# RabbitMQ + MySQL (default)
./start mysql rabbitmq middleware

# Stop (keep containers)
# ./stop mysql artemis stop middleware
# ./stop mysql rabbitmq stop middleware

# Remove containers
# ./stop mysql artemis down middleware
# ./stop mysql rabbitmq down middleware

# 3. Switch to PostgreSQL if needed

# Artemis + PostgreSQL
./start postgresql artemis middleware

# RabbitMQ + PostgreSQL
./start postgresql rabbitmq middleware

# Artemis + Oracle
./start oracle artemis middleware

# RabbitMQ + Oracle
./start oracle rabbitmq middleware

# Middleware only (recommended for source startup, default)
./start mysql artemis middleware
./start mysql rabbitmq middleware

# Full stack (middleware + bytedesk image)
./start mysql artemis all
./start mysql rabbitmq all

# Optional: use PROJECT_NAME env
# PROJECT_NAME=bytedesk ./start mysql artemis middleware

# 4. Equivalent native compose commands

# First go to deploy/docker directory
# cd deploy/docker

# Artemis + MySQL
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml up -d

# Artemis + PostgreSQL
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-postgresql.yaml -f compose/compose-artemis.yaml up -d

# RabbitMQ + MySQL
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-rabbitmq.yaml up -d

# RabbitMQ + PostgreSQL
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-postgresql.yaml -f compose/compose-rabbitmq.yaml up -d

# Artemis + Oracle
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-oracle.yaml -f compose/compose-artemis.yaml up -d

# RabbitMQ + Oracle
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-oracle.yaml -f compose/compose-rabbitmq.yaml up -d

# Full stack example (middleware + bytedesk image)
# docker compose -p bytedesk --env-file .env -f compose/compose-redis.yaml -f compose/compose-elasticsearch.yaml -f compose/compose-mysql.yaml -f compose/compose-artemis.yaml -f compose/compose-bytedesk.yaml up -d
```

- Or refer to [Install Project Dependencies](./jar.md#dependencies)

## 3. Compilation and Startup

### 3.1 Install Development Tools

Recommended development environment:

- Editor: Visual Studio Code
- Build tool: Maven 3.6+
- Other dependencies: protobuf compilation tools (project uses protobuf)

```bash
# Check Maven version
mvn --version
# Should display Apache Maven 3.6+ version

# Check protobuf version (if installed)
protoc --version
# Recommended to use libprotoc 25.0+
```

### 3.2 Compile Project

```bash
# Execute compilation in project root directory (skip tests to speed up)
./mvnw install -Dmaven.test.skip=true
```

### 3.3 Modify Configuration File

Edit the `starter/src/main/resources/application-dev.properties` file to configure database and Redis connection information: [Please refer to Application Configuration Instructions](./config.md)

### 3.4 Server Address (URL) Configuration

The default access URLs are all `http://127.0.0.1:9003`, which only works for local debugging. When deploying to a server, replace them with your actual server IP address or domain name; otherwise browsers cannot access uploaded files, avatars, knowledge base (help center/blog) and other resources.

These URLs are configured in `starter/src/main/resources/properties/open/upload.properties` (for local debugging, see `properties/local/upload.properties`):

```properties
# Access URL for uploaded files, change to your actual server address
bytedesk.upload.url=http://YOUR_SERVER_IP:9003
# Access URL for avatars, change to your actual server address
bytedesk.features.avatar-base-url=http://YOUR_SERVER_IP:9003
# Access URL for the knowledge base, change to your actual server address
bytedesk.kbase.api-url=http://YOUR_SERVER_IP:9003
# Access URL for the help center (optional, falls back to bytedesk.kbase.api-url)
bytedesk.kbase.helpcenter.api-url=http://YOUR_SERVER_IP:9003
# Access URL for the blog (optional, falls back to bytedesk.kbase.api-url)
bytedesk.kbase.blog.api-url=http://YOUR_SERVER_IP:9003
# Visitor ticket page URL (used for direct ticket links in emails)
bytedesk.custom.ticket-html-url=http://YOUR_SERVER_IP:9003/ticket

# Externally accessible MQTT WebSocket full URL; configure when the WebSocket port (default 9885) is not exposed (Nginx/reverse proxy)
# bytedesk.custom.mqtt-websocket-url=wss://your-domain.com/websocket
# Externally accessible upload API URL (full URL, no upload path), for multi-node/reverse-proxy upload scenarios
# bytedesk.custom.upload-api-url=https://upload.your-domain.com
```

> 💡 **Tip**: These properties correspond one-to-one with the environment variables in the `.env` file used for Docker deployment (see [Docker Deployment](./docker.md)); for full property details refer to [Application Configuration](./config.md):

| Property | Docker env variable (.env) | Description |
| --- | --- | --- |
| `bytedesk.upload.url` | `BYTEDESK_UPLOAD_URL` | Access URL for uploaded files |
| `bytedesk.features.avatar-base-url` | `BYTEDESK_FEATURES_AVATAR_BASE_URL` | Access URL for avatars |
| `bytedesk.kbase.api-url` | `BYTEDESK_KBASE_API_URL` | Access URL for the knowledge base |
| `bytedesk.kbase.helpcenter.api-url` | `BYTEDESK_KBASE_HELPCENTER_API_URL` | Access URL for the help center |
| `bytedesk.kbase.blog.api-url` | `BYTEDESK_KBASE_BLOG_API_URL` | Access URL for the blog |
| `bytedesk.custom.ticket-html-url` | `BYTEDESK_CUSTOM_TICKET_HTML_URL` | Visitor ticket page URL |
| `bytedesk.custom.mqtt-websocket-url` | `BYTEDESK_CUSTOM_MQTT_WEBSOCKET_URL` | External MQTT WebSocket URL (reverse proxy) |
| `bytedesk.custom.upload-api-url` | `BYTEDESK_CUSTOM_UPLOAD_API_URL` | External upload API URL (multi-node) |

### 3.5 Start Project

```bash
# Enter startup module directory
cd starter

# Start application
./mvnw spring-boot:run
```

> 🚀 **Startup Success Flag**: Console outputs "Started Application" with no exception information.

## 4. Access System

### 4.1 Local Access
