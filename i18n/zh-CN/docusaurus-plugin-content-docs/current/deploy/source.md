---
sidebar_label: 源码部署
sidebar_position: 2
---

# 源码部署指南

本文档提供详细的源码部署步骤，帮助您快速部署和运行项目。

:::tip 系统要求

- **操作系统**：Ubuntu 22.04 LTS
- **硬件配置**：标准部署：4核8G内存

:::

## 1. 获取源代码

首先，从代码仓库克隆项目源代码到本地：

```bash
# 国内用户推荐使用Gitee镜像源
git clone https://gitee.com/270580156/weiyu.git

# 或者使用GitHub源
git clone https://github.com/bytedesk/bytedesk.git

# 进入项目目录
cd weiyu  # 或 cd bytedesk
```

## 2. 环境准备

### 2.1 安装JDK 17

项目基于Spring Boot 3开发，**必须**使用JDK 17或更高版本：

```bash
# 检查Java版本
java --version
# 应显示: java 17.x.x 或更高版本
```

如果没有安装JDK 17，请参考：[JDK 17安装指南](./depend/jdk)

### 2.2 安装项目依赖

您可以选择以下两种方式之一安装项目依赖：

#### 方式一：使用Docker安装（推荐 ⭐）

Docker方式可以快速启动所有依赖服务，非常适合开发和测试环境：[部署Docker](./depend/docker)

```bash
# 1. 确保Docker服务已启动
sudo systemctl status docker  # 检查Docker状态
sudo systemctl start docker   # 如需启动Docker服务

# 2. 需要提前Clone或下载项目：https://gitee.com/270580156/weiyu，在项目根目录下进入配置目录
cd starter/src/main/resources

# 3. 一键启动所有依赖服务
docker compose -p bytedesk -f compose.yaml up -d

# 查看容器运行状态
docker ps | grep bytedesk

# 如需停止服务
# docker compose -p bytedesk -f compose.yaml down
```

或者

```bash
# 1 打开 https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-middleware.yaml 

# 2 复制内容到本地，保存为 docker-compose.yaml

# 3 直接运行下面命令启动
docker compose -p bytedesk -f docker-compose.yaml up -d
```

> 💡 **提示**：使用Docker方式，无需手动安装每个依赖，容器会自动配置好网络和初始设置。

#### 方式二：手动安装各个依赖

如果您需要更精细地控制每个组件，可以选择手动安装：

1. **[MySQL 8.0](./depend/mysql)**：数据库服务
2. **[Redis](./depend/redis)**：缓存服务
3. **[Ollama](./depend/ollama)**：AI大模型服务
4. **[Elasticsearch](./depend/elasticsearch)**：全文检索和向量存储检索
5. **[Artemis](./depend/artemis)**：消息队列服务

> ⚠️ **注意**：有的同学会找数据库.sql文件，这里不需要，只需要修改配置文件连接上数据库，系统会自动生成表。

## 3. 编译与启动

### 3.1 安装开发工具

推荐的开发环境：

- 编辑器：Visual Studio Code
- 构建工具：Maven 3.6+
- 其他依赖：protobuf 编译工具（项目使用了protobuf）

```bash
# 检查Maven版本
mvn --version
# 应显示 Apache Maven 3.6+ 版本

# 检查protobuf版本（如果已安装）
protoc --version
# 建议使用 libprotoc 25.0+
```

### 3.2 编译项目

```bash
# 在项目根目录下执行编译（跳过测试以加快速度）
./mvnw install -Dmaven.test.skip=true
```

### 3.3 修改配置文件

编辑`starter/src/main/resources/application-dev.properties`文件，配置数据库和Redis连接信息：[请参考应用配置说明](./config.md)

### 3.4 启动项目

```bash
# 进入启动模块目录
cd starter

# 启动应用
./mvnw spring-boot:run
```

> 🚀 **启动成功标志**：控制台输出"Started Application"且无异常信息。

## 4. 访问系统

### 4.1 本地访问

启动成功后，可通过以下方式访问系统：

```bash
访问地址：http://127.0.0.1:9003/
默认账号：admin@email.com
默认密码：admin
```

> ⚠️ **注意**：如在服务器部署，请将127.0.0.1替换为服务器实际IP地址。

### 4.2 端口说明

系统使用的端口：

- **9003**：Web管理后台和API接口
- **9885**：WebSocket通信服务端口

请确保防火墙已开放这些端口。

## 5. 域名配置

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

## 常见问题

部署过程中遇到问题？请查看：[常见问题解答](/docs/faq)

如需技术支持，请通过以下方式联系我们：

- 📧 邮箱：[270580156@qq.com](mailto:270580156@qq.com)
- 💬 社区：[技术社区](https://github.com/bytedesk/bytedesk/discussions)
