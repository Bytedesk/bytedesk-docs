---
sidebar_label: Jar包部署
sidebar_position: 1
---

# Jar 包部署

:::tip

- 操作系统：Ubuntu 22.04 LTS
- 推荐配置 4 核 CPU 8G 内存

:::

## 前期准备

### [Jdk17](./depend/jdk)

因项目依赖 spring boot 3, 最低要求 jdk17, 请确保已安装

```bash
java --version
# java 21.0.4 2022-07-19 LTS
```

### 使用 Docker 啟動依賴（MySQL / PostgreSQL / Oracle）

```bash
# 進入 deploy/docker 目錄
cd bytedesk/deploy/docker

# start.sh <db> <mq> <scenario> [all|middleware]

# Artemis + MySQL（預設）
./start.sh mysql artemis standard middleware

# RabbitMQ + MySQL（預設）
./start.sh mysql rabbitmq standard middleware

# 切換 PostgreSQL
./start.sh postgresql artemis standard middleware
./start.sh postgresql rabbitmq standard middleware

# 切換 Oracle
./start.sh oracle artemis standard middleware
./start.sh oracle rabbitmq standard middleware

# 僅中介服務（建議用於源碼啟動，預設）
# ./start.sh mysql artemis standard middleware
# ./start.sh mysql rabbitmq standard middleware

# 全量（中介服務 + bytedesk 映像）
# ./start.sh mysql artemis standard all
# ./start.sh mysql rabbitmq standard all

# stop.sh <db> <mq> <scenario> [stop|down] [all|middleware]
# ./stop.sh mysql artemis standard stop middleware
# ./stop.sh mysql artemis standard down all

# 等價原生命令（先切到 deploy/docker）
# cd deploy/docker
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-postgresql.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-oracle.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml up -d
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-oracle.yaml -f compose-mq-rabbitmq.yaml -f compose-scenario-standard.yaml up -d
# 全量示例（中介服務 + bytedesk 映像）
# docker compose -p bytedesk -f compose-base.yaml -f compose-db-mysql.yaml -f compose-mq-artemis.yaml -f compose-scenario-standard.yaml -f compose-app-bytedesk.yaml -f compose-app-mq-artemis.yaml up -d
```

### [Mysql 8.0](./depend/mysql)

默认使用 mysql

```bash
# 修改application.properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk
spring.datasource.username=root
spring.datasource.password=密码
```

### 或 [PostgreSQL 16](./depend/postgresql)

mysql 或 postgresql 任选其一, 默认使用 mysql

```bash
# 修改application.properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5433/bytedesk
spring.datasource.username=postgres
spring.datasource.password=密码
```

### [Redis](./depend/redis)

```bash
spring.data.redis.database=0
spring.data.redis.host=127.0.0.1
spring.data.redis.port=6379
spring.data.redis.password=密码
```

## [Nginx](./depend/nginx)

本地部署可不需要，仅在生产环境推荐安装nginx，nginx做反向代理，

## [Ollama](./depend/ollama)

可选，仅用于知识库对话，可跳过。如果仅仅是对话大模型，则直接在配置文件里面填写智谱AI的key就行

```bash
下载地址： https://github.com/Bytedesk/bytedesk-ai
```

<!-- ### [Ollama](./depend/ollama)可选 -->

## 下载 [im server](https://www.weiyuai.cn/download/weiyu-server.zip)

```bash
# 更多下载: https://www.weiyuai.cn/download
# 解压
unzip weiyu-server.zip
```

## 配置

```bash
# 编辑配置文件：server/config/application.properties
# 修改数据库连接信息
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk
spring.datasource.username=root
spring.datasource.password=password
# 修改redis连接信息
spring.data.redis.database=0
spring.data.redis.host=127.0.0.1
spring.data.redis.port=6379
spring.data.redis.password=password

# 赋予权限
chmod +x start.sh
chmod +x stop.sh
# 启动
# 在Mac或Linux上运行
./start.sh
# 在Windows上运行
start.bat
# 停止
# 在Mac或Linux上运行
./stop.sh
# 在Windows上运行
stop.bat
# 启动之后，稍等片刻。查看端口号，如果有 9003端口，则启动成功
netstat -ntlp
# 查看日志
tail -f logs/bytedeskim.log
```

## 本地预览

```bash
web: http://127.0.0.1:9003/
开发者入口: http://127.0.0.1:9003/dev
管理后台: http://127.0.0.1:9003/admin, 用户名: admin@email.com, 密码: admin
客服端: http://127.0.0.1:9003/agent/chat, 用户名: admin@email.com, 密码: admin
访客: http://127.0.0.1:9003/chat?org=df_org_uid&t=0&sid=df_ag_uid&
api文档: http://127.0.0.1:9003/swagger-ui/index.html
数据库监控: http://127.0.0.1:9003/druid，用户名: admin@email.com, 密码: admin
actuator: http://127.0.0.1:9003/actuator
```
