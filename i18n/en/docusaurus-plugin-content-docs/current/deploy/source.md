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
# start.sh <db> <mq> <scenario> [all|middleware]

# Artemis + MySQL (default)
./start.sh mysql artemis standard middleware

# RabbitMQ + MySQL (default)
./start.sh mysql rabbitmq standard middleware

# Stop (keep containers)
# ./stop.sh mysql artemis standard stop middleware
# ./stop.sh mysql rabbitmq standard stop middleware

# Remove containers
# ./stop.sh mysql artemis standard down middleware
# ./stop.sh mysql rabbitmq standard down middleware

# 3. Switch to PostgreSQL if needed

# Artemis + PostgreSQL
./start.sh postgresql artemis standard middleware

# RabbitMQ + PostgreSQL
./start.sh postgresql rabbitmq standard middleware

# Artemis + Oracle
./start.sh oracle artemis standard middleware

# RabbitMQ + Oracle
./start.sh oracle rabbitmq standard middleware

# Middleware only (recommended for source startup, default)
./start.sh mysql artemis standard middleware
./start.sh mysql rabbitmq standard middleware

# Full stack (middleware + bytedesk image)
./start.sh mysql artemis standard all
./start.sh mysql rabbitmq standard all

# Optional: use PROJECT_NAME env
# PROJECT_NAME=bytedesk ./start.sh mysql artemis standard middleware

# 4. Equivalent native compose commands

# First go to deploy/docker directory
# cd deploy/docker

# Artemis + MySQL
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d

# Artemis + PostgreSQL
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d

# RabbitMQ + MySQL
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d

# RabbitMQ + PostgreSQL
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d

# Artemis + Oracle
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-oracle.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d

# RabbitMQ + Oracle
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-oracle.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d

# Full stack example (middleware + bytedesk image)
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-artemis.yaml up -d
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

### 3.4 Start Project

```bash
# Enter startup module directory
cd starter

# Start application
./mvnw spring-boot:run
```

> 🚀 **Startup Success Flag**: Console outputs "Started Application" with no exception information.

## 4. Access System

### 4.1 Local Access
