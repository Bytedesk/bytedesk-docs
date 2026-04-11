---
sidebar_label: Oracle
sidebar_position: 4
---

# Oracle

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 Oracle 官方文档。
:::

## 方式一：Docker安装（推荐）

- [使用Docker安装](../jar.md#12-安装项目依赖)

如使用本项目内置依赖脚本（推荐）：

```bash
cd bytedesk/deploy/docker

# Artemis + Oracle
./start.sh oracle artemis standard middleware

# RabbitMQ + Oracle
./start.sh oracle rabbitmq standard middleware
```

## 方式二：直接安装（容器命令示例）

```bash
docker run -d \
  --name oracle-bytedesk \
  -p 11521:1521 \
  -p 15500:5500 \
  -e ORACLE_PASSWORD='password' \
  -e APP_USER='bytedesk' \
  -e APP_USER_PASSWORD='password' \
  -v oracle_data:/opt/oracle/oradata \
  gvenzl/oracle-free:23-slim
```

## 对接微语

修改微语.properties配置文件：

```bash
# 连接信息
spring.datasource.url=jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
spring.datasource.username=bytedesk
spring.datasource.password=密码

# 驱动信息
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect

# Quartz/Batch/Flowable 数据库类型
spring.quartz.jdbc.platform=oracle
spring.batch.jdbc.platform=oracle
spring.batch.database-type=ORACLE
flowable.database-type=oracle
```

### 微语服务端 Oracle 主从读写分离配置（新增）

> 适用版本：服务端已支持 `bytedesk.datasource.oracle-replication.*` 配置。  
> 兼容性：不开启时保持原有单库行为。

```bash
# 保持主库（兼容原有配置）
spring.datasource.url=jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
spring.datasource.username=bytedesk
spring.datasource.password=密码
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

# 开启主从
bytedesk.datasource.oracle-replication.enabled=true
# 仅对 @Transactional(readOnly=true) 路由从库
bytedesk.datasource.oracle-replication.read-only-route-enabled=true
# round-robin / random
bytedesk.datasource.oracle-replication.read-balance=round-robin

# 主库（可选；不配置则回退 spring.datasource.*）
bytedesk.datasource.oracle.master.url=jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
bytedesk.datasource.oracle.master.username=bytedesk
bytedesk.datasource.oracle.master.password=密码
bytedesk.datasource.oracle.master.driver-class-name=oracle.jdbc.OracleDriver

# 从库1
bytedesk.datasource.oracle.replicas[0].url=jdbc:oracle:thin:@127.0.0.1:21521/FREEPDB1
bytedesk.datasource.oracle.replicas[0].username=bytedesk
bytedesk.datasource.oracle.replicas[0].password=密码
bytedesk.datasource.oracle.replicas[0].driver-class-name=oracle.jdbc.OracleDriver

# 从库2（可选）
bytedesk.datasource.oracle.replicas[1].url=jdbc:oracle:thin:@127.0.0.1:31521/FREEPDB1
bytedesk.datasource.oracle.replicas[1].username=bytedesk
bytedesk.datasource.oracle.replicas[1].password=密码
bytedesk.datasource.oracle.replicas[1].driver-class-name=oracle.jdbc.OracleDriver
```

说明：

- 写请求与非只读事务统一走主库。
- 只读事务（`@Transactional(readOnly=true)`）走从库。
- 未配置从库或从库不可用时，自动回退主库。

docker compose 环境变量格式：

```bash
SPRING_DATASOURCE_URL: jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
SPRING_DATASOURCE_USERNAME: bytedesk
SPRING_DATASOURCE_PASSWORD: 密码
SPRING_DATASOURCE_DRIVER_CLASS_NAME: oracle.jdbc.OracleDriver
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: org.hibernate.dialect.OracleDialect
SPRING_QUARTZ_JDBC_PLATFORM: oracle
SPRING_BATCH_JDBC_PLATFORM: oracle
SPRING_BATCH_DATABASE_TYPE: ORACLE
FLOWABLE_DATABASE_TYPE: oracle
```

Oracle 主从读写分离环境变量示例：

```bash
BYTEDESK_DATASOURCE_ORACLE_REPLICATION_ENABLED: true
BYTEDESK_DATASOURCE_ORACLE_REPLICATION_READ_ONLY_ROUTE_ENABLED: true
BYTEDESK_DATASOURCE_ORACLE_REPLICATION_READ_BALANCE: round-robin

BYTEDESK_DATASOURCE_ORACLE_MASTER_URL: jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
BYTEDESK_DATASOURCE_ORACLE_MASTER_USERNAME: bytedesk
BYTEDESK_DATASOURCE_ORACLE_MASTER_PASSWORD: 密码
BYTEDESK_DATASOURCE_ORACLE_MASTER_DRIVER_CLASS_NAME: oracle.jdbc.OracleDriver

BYTEDESK_DATASOURCE_ORACLE_REPLICAS_0_URL: jdbc:oracle:thin:@127.0.0.1:21521/FREEPDB1
BYTEDESK_DATASOURCE_ORACLE_REPLICAS_0_USERNAME: bytedesk
BYTEDESK_DATASOURCE_ORACLE_REPLICAS_0_PASSWORD: 密码
BYTEDESK_DATASOURCE_ORACLE_REPLICAS_0_DRIVER_CLASS_NAME: oracle.jdbc.OracleDriver
```

## 参考

- [Oracle Free 容器镜像](https://hub.docker.com/r/gvenzl/oracle-free)
- [Oracle 数据库文档](https://docs.oracle.com/en/database/)
