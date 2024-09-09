---
sidebar_label: 源码部署
sidebar_position: 1
---

# 源码部署

:::tip
服务器最低配置2核4G内存，推荐配置4核8G内存。如果本地运行Ollama，则最低8G内存起
:::

## 前期准备

### [Jdk17](./depend/jdk)

因项目依赖spring boot 3, 最低要求 jdk17, 请确保已安装

```bash
java --version
# java 17.0.4 2022-07-19 LTS
```

### [MySQL 8](./depend/mysql)

```bash
# 修改application.properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk_im
spring.datasource.username=root
spring.datasource.password=密码
```

### 或 [PostgreSQL 16](./depend/postgresql)

mysql或postgresql任选其一, 默认使用mysql

```bash
# 修改application.properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5433/bytedesk_im
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

<!-- ### [Ollama](./depend/ollama)可选 -->

## [下载源码](https://github.com/Bytedesk/bytedesk)，并编译

```bash
git clone https://github.com/Bytedesk/bytedesk.git
# 配置文件: bytedesk/starter/src/main/resources/application.properties
# 推荐开发环境：vscode + maven

# mvn --version
# Apache Maven 3.8.4 (9b656c72d54e5bacbed989b64718c159fe39b537)
# OS name: "mac os x", version: "14.2.1", arch: "aarch64", family: "mac"
# 
# 项目使用了protobuf，可能需要安装 protobuf 编译工具
# protoc --version
# libprotoc 25.3
# 
cd bytedesk
mvn install -Dmaven.test.skip=true
# 
cd starter
mvn spring-boot:run
```

## 本地预览

```bash
开发者入口: http://127.0.0.1:9003/dev
web: http://127.0.0.1:9003/
管理后台: http://127.0.0.1:9003/admin, 用户名: admin@email.com, 密码: admin
客服端: http://127.0.0.1:9003/agent, 用户名: admin@email.com, 密码: admin
访客: http://127.0.0.1:9003/chat?org=df_org_uid&t=0&sid=df_ag_uid&
api文档: http://127.0.0.1:9003/swagger-ui/index.html
actuator: http://127.0.0.1:9003/actuator
```
