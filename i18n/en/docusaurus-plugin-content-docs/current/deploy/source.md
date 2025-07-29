---
sidebar_label: Source Code Deployment
sidebar_position: 2
---

# Source Code Deployment Guide

:::info Trial License
Need a trial license? Please refer to: [Question 13: How to apply for licenseKey](/docs/faq#question-13-how-to-apply-for-licensekey)
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
git clone https://gitee.com/270580156/weiyu.git

# Or use GitHub source
git clone https://github.com/bytedesk/bytedesk.git

# Enter project directory
cd weiyu  # or cd bytedesk
```

## 2. Environment Preparation

### 2.1 Install JDK 17

The project is developed based on Spring Boot 3, **must** use JDK 17 or higher version:

```bash
# Check Java version
java --version
# Should display: java 17.x.x or higher version
```

If JDK 17 is not installed, please refer to: [JDK 17 Installation Guide](./depend/jdk)

### 2.2 Install Project Dependencies

- [Install Project Dependencies](./jar.md#12-install-project-dependencies)

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
