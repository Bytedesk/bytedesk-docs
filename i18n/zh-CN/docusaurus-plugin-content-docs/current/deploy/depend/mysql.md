---
sidebar_label: MySQL
sidebar_position: 1
---

# MySQL 8.0 安装指南

:::tip 系统要求

- 操作系统：Ubuntu 24.04 LTS
- 服务器推荐配置：2核4G内存
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
