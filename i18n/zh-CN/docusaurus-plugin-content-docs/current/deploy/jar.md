---
sidebar_label: Jar包部署
sidebar_position: 3
---

# Jar包部署

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

### [Mysql 8.0](./depend/mysql)

```bash
# 修改application.properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk_im
spring.datasource.username=root
spring.datasource.password=密码
```

### 或 [PostgreSQL 16](./depend/postgresql)

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

### [Ollama](./depend/ollama)可选

## 下载 [server](https://cdn.weiyuai.cn/server.zip)

```bash
# 因jar包太大, 从这里下载: https://cdn.weiyuai.cn/server.zip
# 编辑配置文件：config/application.properties
# 修改数据库连接信息
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/bytedesk_im
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
