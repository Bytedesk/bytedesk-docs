---
sidebar_label: MySQL
sidebar_position: 1
---

# MySQL 8.0 安装指南

:::tip 系统要求

- 操作系统：Ubuntu 24.04 LTS
- 服务器推荐配置：2核4G内存
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [MySQL 官方文档](https://dev.mysql.com/doc/)。
:::

## 对接微语

修改微语.properties配置文件：

```bash
# 连接信息
spring.datasource.url=jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
spring.datasource.username=root
spring.datasource.password=密码

# 驱动信息
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database=mysql

# Quartz/Batch/Flowable 数据库类型
spring.quartz.jdbc.platform=mysql
spring.batch.jdbc.platform=mysql
spring.batch.database-type=MYSQL
flowable.database-type=mysql
```

### 微语服务端 MySQL 主从读写分离配置（新增）

> 适用版本：服务端已支持 `bytedesk.datasource.mysql-replication.*` 配置。  
> 兼容性：不开启时保持原有单库行为。

```bash
# 保持主库（兼容原有配置）
spring.datasource.url=jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
spring.datasource.username=root
spring.datasource.password=密码
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# 开启主从
bytedesk.datasource.mysql-replication.enabled=true
# 仅对 @Transactional(readOnly=true) 路由从库
bytedesk.datasource.mysql-replication.read-only-route-enabled=true
# round-robin / random
bytedesk.datasource.mysql-replication.read-balance=round-robin

# 主库（可选；不配置则回退 spring.datasource.*）
bytedesk.datasource.master.url=jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
bytedesk.datasource.master.username=root
bytedesk.datasource.master.password=密码
bytedesk.datasource.master.driver-class-name=com.mysql.cj.jdbc.Driver

# 从库1
bytedesk.datasource.replicas[0].url=jdbc:mysql://127.0.0.1:23306/bytedesk?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
bytedesk.datasource.replicas[0].username=root
bytedesk.datasource.replicas[0].password=密码
bytedesk.datasource.replicas[0].driver-class-name=com.mysql.cj.jdbc.Driver

# 从库2（可选）
bytedesk.datasource.replicas[1].url=jdbc:mysql://127.0.0.1:33306/bytedesk?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
bytedesk.datasource.replicas[1].username=root
bytedesk.datasource.replicas[1].password=密码
bytedesk.datasource.replicas[1].driver-class-name=com.mysql.cj.jdbc.Driver
```

说明：

- 写请求与非只读事务统一走主库。
- 只读事务（`@Transactional(readOnly=true)`）走从库。
- 未配置从库或从库不可用时，自动回退主库。

docker compose 环境变量格式：

```bash
SPRING_DATASOURCE_URL: jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: 密码
SPRING_DATASOURCE_DRIVER_CLASS_NAME: com.mysql.cj.jdbc.Driver
SPRING_JPA_DATABASE: mysql
SPRING_QUARTZ_JDBC_PLATFORM: mysql
SPRING_BATCH_JDBC_PLATFORM: mysql
SPRING_BATCH_DATABASE_TYPE: MYSQL
FLOWABLE_DATABASE_TYPE: mysql
```

## 方式一：Docker安装

- [使用Docker安装](../jar.md#12-安装项目依赖)

## 方式二：直接安装

### 1. 安装MySQL

1. [下载安装包](https://www.weiyuai.cn/download/mysql-apt-config_0.8.22-1_all.deb)（mysql-apt-config_0.8.22-1_all.deb）

2. 安装MySQL服务器：

   ```bash
   # 下载仓库配置包
   wget https://www.weiyuai.cn/download/mysql-apt-config_0.8.22-1_all.deb
   # 安装仓库配置包
   sudo dpkg -i mysql-apt-config_0.8.22-1_all.deb
   # 在弹出界面中选择：MySQL 8.0 > OK
   
   # 更新软件包并安装MySQL
   sudo apt-get update
   sudo apt-get install mysql-server
   
   # 安装过程中会提示设置root密码，请选择最新的密码加密方式
   ```

### 2. 配置远程访问

登录MySQL并修改访问权限：

```bash
# 登录MySQL
mysql -u root -p

# 执行以下命令
use mysql;
update user set host='%' where user ='root';
FLUSH PRIVILEGES;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '<PASSWORD>';
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
exit;
```

修改MySQL配置文件：

```bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
# 找到 bind-address = 127.0.0.1 这一行并注释掉（前面加#）
# 保存退出
sudo systemctl restart mysql
sudo systemctl stop mysql
sudo systemctl start mysql
```

开启防火墙端口（云服务器需要），在阿里云或腾讯云控制台开启3306端口访问权限

### 3. 创建数据库

```bash
# 登录MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE bytedesk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 使用数据库
use bytedesk;
```

## 主从复制配置（可选）

### 配置说明

- 主服务器：内网IP 127.0.0.1
- 从服务器：内网IP 127.0.0.2

### 第一步：主服务器配置

修改MySQL配置文件：

```bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

# 添加以下配置
log-bin=mysql-bin                    # 开启二进制日志
server_id=1                          # 设置唯一ID
expire_logs_days=3                   # 日志保留3天
```

创建同步用户：

```bash
mysql -u root -p

CREATE USER 'bytedesk'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'bytedesk'@'%';
FLUSH PRIVILEGES;
exit;
```

重启MySQL服务：

```bash
sudo systemctl restart mysql
```

### 第二步：从服务器配置

修改MySQL配置文件：

```bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

# 添加以下配置
server_id=2                          # 设置唯一ID
expire_logs_days=3                   # 日志保留3天
max_connect_errors=10000             # 最大连接错误数
max_connections=1000                 # 最大连接数
```

重启MySQL服务：

```bash
sudo systemctl restart mysql
```

### 第三步：建立主从关系

在主服务器查看状态：

```bash
mysql -u root -p
SHOW MASTER STATUS;
```

在从服务器配置主从复制：

```bash
mysql -u root -p

# 根据主服务器的状态信息配置
CHANGE MASTER TO 
    master_host='127.0.0.1',
    master_user='bytedesk',
    master_password='password',
    master_port=3306,
    master_log_file='mysql-bin.000001',    # 使用主服务器显示的File值
    master_log_pos=123,                    # 使用主服务器显示的Position值
    master_connect_retry=30;

# 启动从库复制
START SLAVE;

# 查看从库状态
SHOW SLAVE STATUS\G;
```

### 第四步补充：认证与连接问题排查（可选）

当 MySQL 8 默认认证插件导致从库连接报错时，可按以下方式排查：

```bash
# 从库侧获取主库 RSA 公钥（按实际地址修改）
mysql --ssl-mode=DISABLED -h 127.0.0.1 -ubytedesk -ppassword --get-server-public-key

# 常见报错：
# Last_IO_Error: ... Authentication plugin 'caching_sha2_password' reported error: Authentication requires secure connection.

# 主库执行：检查并放宽连接限制（按需）
mysql -u root -p
SHOW VARIABLES LIKE "%max_connect%";
SET GLOBAL max_connections=1000;
SET GLOBAL mysqlx_max_connections=1000;
SET GLOBAL max_connect_errors=10000;
FLUSH HOSTS;

# 从库执行：
mysql -u root -p
FLUSH HOSTS;
SHOW SLAVE STATUS\G;
```

如果遇到同步错误，可临时跳过：

```bash
STOP SLAVE;
SET GLOBAL sql_slave_skip_counter=1;
START SLAVE;
```

### 常用管理命令

```bash
# 查看主库状态
SHOW MASTER STATUS;

# 查看从库状态
SHOW SLAVE STATUS\G;

# 查看从服务器主机列表
SHOW SLAVE HOSTS;

# 启动/停止从库复制
START SLAVE;
STOP SLAVE;

# 重置从库配置
RESET SLAVE;

# 查看二进制日志
SHOW BINARY LOGS;
SHOW BINLOG EVENTS;
```

### 故障排除

如果遇到连接错误，在主服务器执行：

```bash
mysql -u root -p
FLUSH HOSTS;
```

如果遇到同步错误，可以在从服务器跳过：

```bash
STOP SLAVE;
SET GLOBAL sql_slave_skip_counter=1;
START SLAVE;
```

### 测试验证

在主服务器执行插入、更新、删除等操作，在从服务器查看是否同步成功。

## 读写分离

### 微语服务端配置

完成 MySQL 主从复制后，可在微语服务端开启主从读写分离：

```bash
# 开启主从模式
bytedesk.datasource.mysql-replication.enabled=true
# 只读事务路由从库
bytedesk.datasource.mysql-replication.read-only-route-enabled=true
# 负载策略：round-robin / random
bytedesk.datasource.mysql-replication.read-balance=round-robin

# 主库（可选，不配置则回退 spring.datasource.*）
bytedesk.datasource.master.url=jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
bytedesk.datasource.master.username=root
bytedesk.datasource.master.password=密码
bytedesk.datasource.master.driver-class-name=com.mysql.cj.jdbc.Driver

# 从库列表（可多个）
bytedesk.datasource.replicas[0].url=jdbc:mysql://127.0.0.1:23306/bytedesk?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
bytedesk.datasource.replicas[0].username=root
bytedesk.datasource.replicas[0].password=密码
bytedesk.datasource.replicas[0].driver-class-name=com.mysql.cj.jdbc.Driver
```

路由规则：

- 写请求、非只读事务：主库。
- `@Transactional(readOnly=true)`：从库。
- 未配置从库或从库不可用：自动回退主库。

## 支持JNDI数据源

如果想使用Tomcat或者WebLogic的数据源，则不需要配置`spring.datasource.url`等参数，只需要配置`spring.datasource.jndi-name`为JNDI的name即可，如：

``` bash
spring.datasource.jndi-name=java:jdbc/mysql
```

<!-- TODO: 多数据源 -->
<!-- TODO: 分表、分库 -->

## 参考

- [Docker](https://hub.docker.com/_/mysql)
- [官方指南](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)
- [下载](https://dev.mysql.com/downloads/repo/apt/)
- [Connection to a JNDI DataSource](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html#boot-features-connecting-to-a-jndi-datasource)
- [参考](https://www.cnblogs.com/zhangxuel1ang/p/13456116.html)
