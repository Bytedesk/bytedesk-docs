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

1. 修改MySQL配置文件：

```bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

# 添加以下配置
log-bin=mysql-bin                    # 开启二进制日志
server_id=1                          # 设置唯一ID
expire_logs_days=3                   # 日志保留3天
```

2. 创建同步用户：

```bash
mysql -u root -p

CREATE USER 'bytedesk'@'%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'bytedesk'@'%';
FLUSH PRIVILEGES;
exit;
```

3. 重启MySQL服务：

```bash
sudo systemctl restart mysql
```

### 第二步：从服务器配置

1. 修改MySQL配置文件：

```bash
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf

# 添加以下配置
server_id=2                          # 设置唯一ID
expire_logs_days=3                   # 日志保留3天
max_connect_errors=10000             # 最大连接错误数
max_connections=1000                 # 最大连接数
```

2. 重启MySQL服务：

```bash
sudo systemctl restart mysql
```

### 第三步：建立主从关系

1. 在主服务器查看状态：

```bash
mysql -u root -p
SHOW MASTER STATUS;
```

2. 在从服务器配置主从复制：

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

### 常用管理命令

```bash
# 查看主库状态
SHOW MASTER STATUS;

# 查看从库状态
SHOW SLAVE STATUS\G;

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

- TODO: sharding-jdbc

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
