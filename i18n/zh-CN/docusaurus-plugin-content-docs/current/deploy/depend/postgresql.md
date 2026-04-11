---
sidebar_label: Postgresql
sidebar_position: 3
---

# PostgreSQL

:::tip

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置2核4G内存

:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [PostgreSQL 官方文档](https://www.postgresql.org/docs/)。
:::

## 方式一：Docker安装

- [使用Docker安装](../jar.md#12-安装项目依赖)

## 方式二：直接安装

## 对接微语

修改微语.properties配置文件

```bash
# 连接信息
spring.datasource.url=jdbc:postgresql://127.0.0.1:15432/bytedesk
spring.datasource.username=postgres
spring.datasource.password=密码
# 驱动信息
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
# Kingbase与PostgreSQL兼容，但Spring Boot无法自动识别其驱动，显式指定平台以加载Quartz的PostgreSQL建表脚本
# Quartz官方脚本文件名为 tables_postgres.sql，这里平台必须设置为 postgres（不是 postgresql）
spring.quartz.jdbc.platform=postgres
# 指定批处理脚本的平台为 PostgreSQL（Kingbase 兼容）
spring.batch.jdbc.platform=postgres
# 使用 PostgreSQL 数据库（Kingbase 兼容）
spring.batch.database-type=POSTGRES
# 数据库类型通过配置传递，供 Flowable 使用：
# - Kingbase / PostgreSQL: 设置为 postgres
# - MySQL: 设置为 mysql
# - 其他：oracle / mssql / db2 / h2 ...
flowable.database-type=postgres
```

### 微语服务端 PostgreSQL 主从读写分离配置（新增）

> 适用版本：服务端已支持 `bytedesk.datasource.postgresql-replication.*` 配置。  
> 兼容性：不开启时保持原有单库行为。

```bash
# 保持主库（兼容原有配置）
spring.datasource.url=jdbc:postgresql://127.0.0.1:15432/bytedesk
spring.datasource.username=postgres
spring.datasource.password=密码
spring.datasource.driver-class-name=org.postgresql.Driver

# 开启主从
bytedesk.datasource.postgresql-replication.enabled=true
# 仅对 @Transactional(readOnly=true) 路由从库
bytedesk.datasource.postgresql-replication.read-only-route-enabled=true
# round-robin / random
bytedesk.datasource.postgresql-replication.read-balance=round-robin

# 主库（可选；不配置则回退 spring.datasource.*）
bytedesk.datasource.postgresql.master.url=jdbc:postgresql://127.0.0.1:15432/bytedesk
bytedesk.datasource.postgresql.master.username=postgres
bytedesk.datasource.postgresql.master.password=密码
bytedesk.datasource.postgresql.master.driver-class-name=org.postgresql.Driver

# 从库1
bytedesk.datasource.postgresql.replicas[0].url=jdbc:postgresql://127.0.0.1:25432/bytedesk
bytedesk.datasource.postgresql.replicas[0].username=postgres
bytedesk.datasource.postgresql.replicas[0].password=密码
bytedesk.datasource.postgresql.replicas[0].driver-class-name=org.postgresql.Driver

# 从库2（可选）
bytedesk.datasource.postgresql.replicas[1].url=jdbc:postgresql://127.0.0.1:35432/bytedesk
bytedesk.datasource.postgresql.replicas[1].username=postgres
bytedesk.datasource.postgresql.replicas[1].password=密码
bytedesk.datasource.postgresql.replicas[1].driver-class-name=org.postgresql.Driver
```

说明：

- 写请求与非只读事务统一走主库。
- 只读事务（`@Transactional(readOnly=true)`）走从库。
- 未配置从库或从库不可用时，自动回退主库。

docker compose格式

```bash
# 连接信息
SPRING_DATASOURCE_URL: jdbc:postgresql://127.0.0.1:15432/bytedesk
SPRING_DATASOURCE_USERNAME: postgres
SPRING_DATASOURCE_PASSWORD: 密码
# 驱动信息
SPRING_DATASOURCE_DRIVER_CLASS_NAME: org.postgresql.Driver
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: org.hibernate.dialect.PostgreSQLDialect
# Kingbase与PostgreSQL兼容，但Spring Boot无法自动识别其驱动，显式指定平台以加载Quartz的PostgreSQL建表脚本
# Quartz官方脚本文件名为 tables_postgres.sql，这里平台必须设置为 postgres（不是 postgresql）
SPRING_QUARTZ_JDBC_PLATFORM: postgres
# 指定批处理脚本的平台为 PostgreSQL（Kingbase 兼容）
SPRING_BATCH_JDBC_PLATFORM: postgres
# 使用 PostgreSQL 数据库（Kingbase 兼容）
SPRING_BATCH_DATABASE_TYPE: POSTGRES
# 数据库类型通过配置传递，供 Flowable 使用：
# - Kingbase / PostgreSQL: 设置为 postgres
# - MySQL: 设置为 mysql
# - 其他：oracle / mssql / db2 / h2 ...
FLOWABLE_DATABASE_TYPE: postgres
```

PostgreSQL 主从读写分离环境变量示例：

```bash
BYTEDESK_DATASOURCE_POSTGRESQL_REPLICATION_ENABLED: true
BYTEDESK_DATASOURCE_POSTGRESQL_REPLICATION_READ_ONLY_ROUTE_ENABLED: true
BYTEDESK_DATASOURCE_POSTGRESQL_REPLICATION_READ_BALANCE: round-robin

BYTEDESK_DATASOURCE_POSTGRESQL_MASTER_URL: jdbc:postgresql://127.0.0.1:15432/bytedesk
BYTEDESK_DATASOURCE_POSTGRESQL_MASTER_USERNAME: postgres
BYTEDESK_DATASOURCE_POSTGRESQL_MASTER_PASSWORD: 密码
BYTEDESK_DATASOURCE_POSTGRESQL_MASTER_DRIVER_CLASS_NAME: org.postgresql.Driver

BYTEDESK_DATASOURCE_POSTGRESQL_REPLICAS_0_URL: jdbc:postgresql://127.0.0.1:25432/bytedesk
BYTEDESK_DATASOURCE_POSTGRESQL_REPLICAS_0_USERNAME: postgres
BYTEDESK_DATASOURCE_POSTGRESQL_REPLICAS_0_PASSWORD: 密码
BYTEDESK_DATASOURCE_POSTGRESQL_REPLICAS_0_DRIVER_CLASS_NAME: org.postgresql.Driver
```

## 安装

### Ubuntu 安装

```bash
# ubuntu
# https://www.postgresql.org/download/linux/ubuntu/
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
# Import the repository signing key:
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
# Create the repository configuration file:
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
# Update the package lists:
sudo apt update
# Install the latest version of PostgreSQL:
# If you want a specific version, use 'postgresql-16' or similar instead of 'postgresql'
sudo apt -y install postgresql
# 查看版本号
psql --version
# 查看是否已经启动
lsof -i:5432
# 如需要本地客户端连接云服务，到腾讯云或阿里云防火墙开放端口号：5432
# 查找配置文件路径
locate postgresql.conf
# /etc/postgresql/16/main/postgresql.conf
# 为方便修改将/etc/postgresql/16/main/路径下所有配置文件下载到本地修改
# 开启外网访问，修改 postgresql.conf 文件
listen_addresses = '*'
# 修改 pg_hba.conf 文件，文件末尾添加如下内容：
host    all             all             0.0.0.0/0               scram-sha-256
# 修改密码
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'password'; # 修改密码 https://suijimimashengcheng.bmcx.com/
# 按 \q 退出
# 安装 pgvector
apt install postgresql-16-pgvector
# 将修改后的配置文件上传到服务器，然后重启
service postgresql restart
# service postgresql stop
# 查看端口 5432
lsof -i:5432
# 或者
netstat -tunlp | grep 5432
# 使用pgadmin客户端, 桌面客户端远程连接
# 创建数据库 bytedesk
# 给刚创建的数据库bytedesk添加扩展vector（右键扩展，创建->General->名称：vector）
```

## 参考

- [Docker](https://hub.docker.com/_/postgres)
- [PostgreSQL 官方下载](https://www.postgresql.org/download/)
- [PostgreSQL 官方文档](https://www.postgresql.org/docs/)
