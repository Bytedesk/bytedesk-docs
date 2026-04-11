---
sidebar_label: JAR
sidebar_position: 3
---

# JAR Package Deployment

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server Requirements: Minimum 2 cores 4GB RAM, Recommended 4 cores 8GB RAM

:::

## Dependencies

- [JDK](/docs/docs/deploy/depend/jdk)
- [MySQL](/docs/docs/deploy/depend/mysql) or [PostgreSQL](/docs/docs/deploy/depend/postgresql)
- [Redis](/docs/docs/deploy/depend/redis)
- [Nginx](/docs/docs/deploy/depend/nginx)
- [Let's Encrypt](/docs/docs/deploy/depend/letsencrypt)

### Start dependencies with Docker (MySQL / PostgreSQL / Oracle selectable)

```bash
# Enter deploy/docker directory
cd bytedesk/deploy/docker

# start.sh <db> <mq> <scenario> [all|middleware]

# Artemis + MySQL (default)
./start.sh mysql artemis standard middleware

# RabbitMQ + MySQL (default)
./start.sh mysql rabbitmq standard middleware

# Switch to PostgreSQL
./start.sh postgresql artemis standard middleware
./start.sh postgresql rabbitmq standard middleware

# Switch to Oracle
./start.sh oracle artemis standard middleware
./start.sh oracle rabbitmq standard middleware

# Middleware only (recommended for source startup, default)
# ./start.sh mysql artemis standard middleware
# ./start.sh mysql rabbitmq standard middleware

# Full stack (middleware + bytedesk image)
# ./start.sh mysql artemis standard all
# ./start.sh mysql rabbitmq standard all

# stop.sh <db> <mq> <scenario> [stop|down] [all|middleware]
# ./stop.sh mysql artemis standard stop middleware
# ./stop.sh mysql artemis standard down all

# Equivalent native compose commands (first go to deploy/docker)
# cd deploy/docker
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-oracle.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-oracle.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
# Full stack example (middleware + bytedesk image)
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-artemis.yaml up -d
```

## Download

```bash
# Download JAR package
wget https://github.com/bytedesk/bytedesk/releases/download/v1.0.0/bytedesk.jar
java --version
# java 21.0.4 2022-07-19 LTS
```

### [MySQL 8.0](./depend/mysql)

MySQL is used by default

```bash
# Modify application.properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk
spring.datasource.username=root
spring.datasource.password=password
```

### Or [PostgreSQL 16](./depend/postgresql)

Choose either MySQL or PostgreSQL, MySQL is used by default

```bash
# Modify application.properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5433/bytedesk
spring.datasource.username=postgres
spring.datasource.password=password
```

### [Redis](./depend/redis)

```bash
spring.data.redis.database=0
spring.data.redis.host=127.0.0.1
spring.data.redis.port=6379
spring.data.redis.password=password
```

## [Nginx](./depend/nginx)

Not required for local deployment, only recommended for production environment where Nginx serves as reverse proxy.

## [Ollama](./depend/ollama)

Optional, only used for knowledge base Q&A, can be skipped. If only using AI model for conversation, just fill in Zhipu AI key in configuration file.

```bash
Download link: https://github.com/Bytedesk/bytedesk-ai
```

## Download [IM Server](https://www.weiyuai.cn/download/weiyu-server.zip)

```bash
# More downloads: https://www.weiyuai.cn/download
# Extract
unzip weiyu-server.zip
```

## Configuration

```bash
# Edit configuration file: server/config/application.properties
# Modify database connection info
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk
spring.datasource.username=root
spring.datasource.password=password
# Modify redis connection info
spring.data.redis.database=0
spring.data.redis.host=127.0.0.1
spring.data.redis.port=6379
spring.data.redis.password=password

# Grant permissions
chmod +x start.sh
chmod +x stop.sh
# Start
# Run on Mac or Linux
./start.sh
# Run on Windows
start.bat
# Stop
# Run on Mac or Linux
./stop.sh
# Run on Windows
stop.bat
# After starting, wait a moment. Check port, if port 9003 exists, startup successful
netstat -ntlp
# View logs
tail -f logs/bytedeskim.log
```

## Local Preview

```bash
web: http://127.0.0.1:9003/
Developer portal: http://127.0.0.1:9003/dev
Admin dashboard: http://127.0.0.1:9003/admin, username: admin@email.com, password: admin
Agent client: http://127.0.0.1:9003/agent/chat, username: admin@email.com, password: admin
Visitor: http://127.0.0.1:9003/chat?org=df_org_uid&t=0&sid=df_ag_uid&
API docs: http://127.0.0.1:9003/swagger-ui/index.html
Database monitor: http://127.0.0.1:9003/druid, username: admin@email.com, password: admin
Actuator: http://127.0.0.1:9003/actuator
```
