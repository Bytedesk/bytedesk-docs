---
sidebar_label: MySQL
sidebar_position: 1
---

# MySQL 8.0 安装指南

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：4核8G内存
:::

## 方式一：Docker部署（推荐）

使用Docker容器部署MySQL更简单，特别适合快速搭建开发环境。

### 1. 单容器方式

```bash
# 拉取MySQL镜像
docker pull mysql:latest

# 运行MySQL容器（一行命令完成部署）
docker run --name mysql-bytedesk \
  -e MYSQL_ROOT_PASSWORD=your_password \
  -e MYSQL_DATABASE=bytedesk \
  -p 13306:3306 \
  -v mysql_data:/var/lib/mysql \
  -d mysql:latest
```

### 2. Docker Compose方式（适合多容器部署）

1. 创建[`docker-compose.yml`文件](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml)：

   ```yaml
   services:
     bytedesk-mysql:
        image: mysql:latest
            container_name: mysql-bytedesk
        environment:
            MYSQL_DATABASE: bytedesk
            MYSQL_ROOT_PASSWORD: r8FqfdbWUaN3
        ports:
            - "13306:3306"
        volumes:
            - mysql_data:/var/lib/mysql
        networks:
            - bytedesk-network
   
   volumes:
     mysql_data:
       name: bytedesk_mysql_data
   ```

2. 启动容器：

   ```bash
   docker-compose up -d
   ```

### 3. 连接到MySQL

```bash
# 命令行连接
docker exec -it mysql-bytedesk mysql -uroot -p
```

或使用图形客户端（如Sequel Ace）连接：

- 主机：localhost 或服务器IP
- 端口：13306
- 用户名：root
- 密码：你设置的MYSQL_ROOT_PASSWORD

### 4. 实用操作

- **查看数据持久化位置**：

  ```bash
  docker volume ls | grep bytedesk_mysql_data
  ```

- **创建数据库**：

  ```bash
  CREATE DATABASE bytedesk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  ```

- **安全建议**：
  - 使用强密码
  - 定期备份数据
  - 在生产环境中限制容器资源使用

## 方式二：直接安装

### 1. 安装MySQL

1. [下载安装包](https://dev.mysql.com/downloads/repo/apt/)（mysql-apt-config_0.8.29-1_all.deb）

2. 安装MySQL服务器：

   ```bash
   # 安装仓库配置包
   sudo dpkg -i mysql-apt-config_0.8.29-1_all.deb
   # 在弹出界面中选择：MySQL 8.0 > OK
   
   # 更新软件包并安装MySQL
   sudo apt-get update
   sudo apt-get install mysql-server
   
   # 安装过程中会提示设置root密码，请选择最新的密码加密方式
   ```

### 2. 配置远程访问

1. 登录MySQL并修改访问权限：

   ```bash
   # 登录MySQL
   mysql -u root -p
   
   # 执行以下命令
   use mysql;
   update user set host='%' where user ='root';
   FLUSH PRIVILEGES;
   ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '你的密码';
   FLUSH PRIVILEGES;
   GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
   FLUSH PRIVILEGES;
   exit;
   ```

2. 修改MySQL配置文件：

   ```bash
   sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
   # 找到 bind-address = 127.0.0.1 这一行并注释掉（前面加#）
   # 保存退出
   ```

3. 开启防火墙端口（云服务器需要）：
   - 在阿里云或腾讯云控制台开启3306端口访问权限

### 3. 创建数据库

```bash
# 登录MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE bytedesk CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 使用数据库
use bytedesk;
```
