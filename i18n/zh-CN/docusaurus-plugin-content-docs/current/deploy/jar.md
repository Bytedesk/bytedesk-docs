---
sidebar_label: Jar包部署
sidebar_position: 3
---

# Jar包部署

## 前期准备

### [Jdk17](./depend/jdk)

因项目依赖spring boot 3, 最低要求 jdk17, 请确保已安装

```bash
# java --version
# java 17.0.4 2022-07-19 LTS
```

### [Mysql 8.0](./depend/mysql)

```bash
# 修改application.properties
spring.profiles.active=dev-mysql
# 修改application-dev-mysql.properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk_im
spring.datasource.username=root
spring.datasource.password=密码
```

### 或 [PostgreSQL 16](./depend/postgresql)

```bash
# 修改application.properties
spring.profiles.active=dev-pg
# 修改application-dev-pg.properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5433/bytedesk_im
spring.datasource.username=postgres
spring.datasource.password=密码
```

### [Redis](./depend/redis)

```bash
# 修改application-dev-mysql.properties
# 或 修改application-dev-pg.properties
spring.data.redis.database=0
spring.data.redis.host=127.0.0.1
spring.data.redis.port=6379
spring.data.redis.password=密码
```

### [Ollama](./depend/ollama)可选

## TODO:下载jar包，并运行

```bash
```
