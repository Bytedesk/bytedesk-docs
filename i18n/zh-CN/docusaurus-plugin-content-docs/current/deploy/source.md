---
sidebar_label: 源码部署
sidebar_position: 2
---

# 源码部署指南

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](../faq#问题13如何申请licensekey)
:::

本文档提供详细的源码部署步骤，帮助您快速部署和运行项目。

:::tip 系统要求

- **操作系统**：Ubuntu 22.04 LTS
- **硬件配置**：标准部署：2核4G内存

:::

## 1. 获取源代码

首先，从代码仓库克隆项目源代码到本地：

```bash
# 使用GitHub源
git clone https://github.com/bytedesk/bytedesk.git

# 进入项目目录
cd bytedesk
```

## 2. 环境准备

### 2.1 安装JDK 21

项目基于Spring Boot 3开发，**必须**使用JDK 21或更高版本：

```bash
# 检查Java版本
java --version
# 应显示: java 21.x.x 或更高版本
```

如果没有安装JDK 21，请参考：[JDK 21安装指南](./depend/jdk)

### 2.2 安装项目依赖

```bash
# 1. 进入 deploy/docker 目录
cd bytedesk/deploy/docker

# 2. 启动依赖服务（默认 MySQL）
# start.sh <db> <mq> <scenario> [all|middleware]

# Artemis + MySQL（默认）
./start.sh mysql artemis standard middleware

# RabbitMQ + MySQL（默认）
./start.sh mysql rabbitmq standard middleware

# 停止（保留容器）
# ./stop.sh mysql artemis standard stop middleware
# ./stop.sh mysql rabbitmq standard stop middleware

# 下线（删除容器，保留卷）
# ./stop.sh mysql artemis standard down middleware
# ./stop.sh mysql rabbitmq standard down middleware

# 3. 如需切换 PostgreSQL

# Artemis + PostgreSQL
./start.sh postgresql artemis standard middleware

# RabbitMQ + PostgreSQL
./start.sh postgresql rabbitmq standard middleware

# Artemis + Oracle
./start.sh oracle artemis standard middleware

# RabbitMQ + Oracle
./start.sh oracle rabbitmq standard middleware

# 仅中间件（源码启动推荐，默认）
./start.sh mysql artemis standard middleware
./start.sh mysql rabbitmq standard middleware

# 全量（中间件 + bytedesk 镜像）
./start.sh mysql artemis standard all
./start.sh mysql rabbitmq standard all

# 可选：通过环境变量切换项目名
# PROJECT_NAME=bytedesk ./start.sh mysql artemis standard middleware

# 4. 等价原生命令示例

# 先切到 deploy/docker 目录
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

# 全量（中间件 + bytedesk 镜像）示例
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-artemis.yaml up -d
```

- 或参考[手动项目依赖](./jar.md#12-安装项目依赖)

## 3. 编译与启动

### 3.1 安装开发工具

推荐的开发环境：

- 编辑器：Visual Studio Code
- 构建工具：Maven 3.6+
- 其他依赖：protobuf 编译工具（项目使用了protobuf）

```bash
# 检查Maven版本
mvn --version
# 应显示 Apache Maven 3.6+ 版本

# 检查protobuf版本（如果已安装）
protoc --version
# 建议使用 libprotoc 25.0+
```

### 3.2 编译项目

```bash
# 进入项目根目录
cd bytedesk

# 在项目根目录下执行编译（跳过测试以加快速度）
./mvnw install -Dmaven.test.skip=true

# 如果提示 下面几个类找不到
# import com.bytedesk.core.socket.protobuf.model.MessageProto;
# import com.bytedesk.core.socket.protobuf.model.ThreadProto;
# import com.bytedesk.core.socket.protobuf.model.UserProto;
# 可尝试执行下面命令
# ./mvnw -f pom.xml -pl modules/core -am -DskipTests -T 1C compile
```

### 3.3 修改配置文件

编辑`starter/src/main/resources/application-open.properties`文件，配置数据库和Redis连接信息：[请参考应用配置说明](./config.md)。如果不使用ai，可以参考：[application-noai.properties](https://github.com/Bytedesk/bytedesk/blob/main/starter/src/main/resources/application-noai.properties) 配置

### 3.4 启动项目

```bash
# 进入启动模块目录
cd starter

# 启动应用
./mvnw spring-boot:run
```

> 🚀 **启动成功标志**：控制台输出"Started Application"且无异常信息。

## 4. 访问系统

### 4.1 本地访问

启动成功后，可通过以下方式访问系统：

```bash
访问地址：http://127.0.0.1:9003/
默认账号：admin@email.com
默认密码：admin
```

> ⚠️ **注意**：如在服务器部署，请将127.0.0.1替换为服务器实际IP地址。

### 4.2 端口说明

系统使用的端口：

- **9003**：Web管理后台和API接口
- **9885**：WebSocket通信服务端口

请确保防火墙已开放这些端口。

## 5. 域名配置

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

## 常见问题

部署过程中遇到问题？请查看：[常见问题解答](../faq)

如需技术支持，请通过以下方式联系我们：

- 📧 邮箱：[270580156@qq.com](mailto:270580156@qq.com)
- 💬 社区：[技术社区](https://github.com/bytedesk/bytedesk/discussions)
