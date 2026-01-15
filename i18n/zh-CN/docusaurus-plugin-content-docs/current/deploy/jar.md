---
sidebar_label: Jar包部署
sidebar_position: 1
---

# Jar包部署指南

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](/docs/faq#问题13如何申请licensekey)
:::

本文档提供详细的Jar包部署步骤，帮助您快速部署和运行微语系统。相比源码部署，Jar包部署更加简便，适合快速上线和测试使用。

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器最低配置2核4G内存

:::

## 1. 环境准备

### 1.1 安装JDK 17

微语系统基于Spring Boot 3开发，**必须**使用JDK 17或更高版本：

```bash
# 检查Java版本
java --version
# 应显示: java 17.x.x 或更高版本
```

如果没有安装JDK 17，请参考：[JDK 17安装指南](./depend/jdk)

### 1.2 安装项目依赖

您可以选择以下两种方式之一安装项目依赖：

#### 方式一：使用Docker安装（推荐 ⭐）

Docker方式可以快速启动所有依赖服务，非常适合开发和测试环境：[部署Docker](./depend/docker)

```bash
# 1. 确保Docker服务已启动
sudo systemctl status docker  # 检查Docker状态
sudo systemctl start docker   # 如需启动Docker服务

# 2. 需要提前Clone或下载项目：https://github.com/Bytedesk/bytedesk，在项目根目录下进入配置目录
git clone https://github.com/Bytedesk/bytedesk.git

# 3. 进入项目配置目录
cd bytedesk/starter/src/main/resources

# 4. 一键启动所有依赖服务
docker compose -p bytedesk -f compose.yaml up -d

# 5. 安装Ollama对话模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b

# 6. 安装Ollama对话模型
docker exec ollama-bytedesk ollama pull bge-m3:latest

# 7. 查看容器运行状态
docker ps | grep bytedesk

# 如需停止服务
# docker compose -p bytedesk -f compose.yaml down
```

> 💡 **提示**：使用Docker方式，无需手动安装每个依赖，容器会自动配置好网络和初始设置。

#### 方式二：手动安装各个依赖

如果您需要更精细地控制每个组件，可以选择手动安装：

1. **[MySQL 8.0](./depend/mysql)**：数据库服务
2. **[Redis](./depend/redis)**：缓存服务
3. **[Ollama](./depend/ollama)**：AI大模型服务
4. **[Elasticsearch](./depend/elasticsearch)**：全文检索和向量存储检索
5. **[Artemis](./depend/artemis)**：消息队列服务
6. **[MinIO](./depend/minio)**：对象存储服务

> ⚠️ **注意**：有的同学会找数据库.sql文件，这里不需要，只需要修改配置文件连接上数据库，系统会自动生成表。

## 2. 下载与解压

### 2.1 下载服务端文件

从官方网站下载最新版微语系统服务端软件包：

```bash
# 使用wget下载
wget https://www.weiyuai.cn/download/weiyu-server.zip

# 或直接在浏览器中访问下载链接
# https://www.weiyuai.cn/download/weiyu-server.zip

```

> 💡 **提示**：访问[下载中心](https://www.weiyuai.cn/download)获取最新版本。

### 2.2 解压文件

```bash
# 解压下载的zip文件
unzip weiyu-server.zip

# 进入解压后的目录
cd weiyu-server

# 查看目录结构
ls -la
```

## 3. 配置系统

### 3.1 修改配置文件

编辑`config/application.properties`文件，配置数据库和Redis连接信息：[请参考应用配置说明](./config.md)

```bash
# 编辑配置文件
nano config/application.properties
```

### 3.2 检查文件权限

确保启动脚本有执行权限：

```bash
# 赋予启动脚本执行权限
chmod +x start.sh
chmod +x stop.sh
```

## 4. 启动与停止

### 4.1 启动系统

```bash
# 在Linux/macOS上启动
./start.sh

# 在Windows上启动
start.bat
```

> 🚀 **启动成功标志**：控制台显示"Started Application"且无异常信息

### 4.2 验证启动状态

```bash
# 检查9003端口是否正常监听
netstat -ntlp | grep 9003

# 查看运行日志
tail -f logs/bytedeskim.log
```

### 4.3 停止系统

```bash
# 在Linux/macOS上停止
./stop.sh

# 在Windows上停止
stop.bat
```

## 5. 系统访问

请开放内网入方向端口

- 9003
- 9885

如果生产环境通过域名 + Nginx 反向代理对外仅开放 80/443（不直接暴露 9885），请在配置文件中设置：

- `bytedesk.custom.mqtt-websocket-url=wss://api.你的域名/websocket`

### 5.1 本地访问

```bash
# 请将127.0.0.1替换为你的服务器ip
访问地址：http://127.0.0.1:9003/
默认账号：admin@email.com
默认密码：admin
```

### 5.2 端口说明

系统使用的端口：

- **9003**：Web管理后台和API接口
- **9885**：WebSocket通信服务端口

请确保防火墙已开放这些端口。

## 6. 域名配置（生产环境）

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

## 常见问题

部署过程中遇到问题？请查看：[常见问题解答](/docs/faq)

如需技术支持，请通过以下方式联系我们：

- 📧 邮箱：[270580156@qq.com](mailto:270580156@qq.com)
- 💬 社区：[技术社区](https://github.com/bytedesk/bytedesk/discussions)
