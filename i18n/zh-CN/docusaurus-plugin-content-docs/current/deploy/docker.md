---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](../faq#问题13如何申请licensekey)
:::

## 系统要求

:::tip 最低配置

- **操作系统**：Ubuntu 22.04 LTS（推荐）
- **服务器配置**：4核8G内存
- **Docker**：已安装Docker和Docker Compose

:::info 配置优化建议
如果服务器配置不够，可以分拆MySQL、Redis、Elasticsearch、ArtemisMQ等服务到其他服务器，仅保留核心服务在主服务器上。
:::

## 快速开始
### 步骤1：准备与进入目录

```bash
git clone https://github.com/Bytedesk/bytedesk.git
cd bytedesk/deploy/docker

# 如需自定义环境变量，先复制模板
cp .env.example .env
```

### 步骤2：默认启动（推荐）

```bash
# 默认：MySQL + Artemis + standard 场景，仅中间件
./start.sh mysql artemis standard middleware
```

> 💡 更多组合（PostgreSQL/Oracle、RabbitMQ、noai、call、全量 all）请参考：`deploy/docker/readme.zh.md`

### 步骤3：下载模型（可选）

如果使用本地模型，需要下载Ollama模型：

```bash
# 对话模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b

# 嵌入模型
docker exec ollama-bytedesk ollama pull bge-m3:latest

# 重新排序模型
docker exec ollama-bytedesk ollama pull linux6200/bge-reranker-v2-m3:latest
```

## 访问系统

### 开放端口

如果使用的ip访问，没有使用域名访问的情况下，需要确保服务器开放以下端口：

- **9003** - WebApi/管理界面
- **9885** - WebSocket端口

如果使用域名访问（Nginx/反向代理），则无需特别对外开放 9003/9885，只需要开放 80/443 分别用于 http/https 访问即可。

当 WebSocket 端口（默认 9885）不对外开放时，请增加以下配置，确保前端长连接正常：

- `BYTEDESK_CUSTOM_MQTT_WEBSOCKET_URL: wss://api.你的域名/websocket`

### 登录信息

```bash
# 将 127.0.0.1 替换为你的服务器IP
访问地址：http://127.0.0.1:9003/
默认账号：admin@email.com
默认密码：admin
```

## 镜像版本

上面docker compose文件中，默认使用的镜像版本是`bytedesk/bytedesk:latest`，如果需要指定其他版本，比如`bytedesk/bytedesk:1.0.0`，可以在docker compose文件中修改。

### 版本号

可以在[Docker Hub](https://hub.docker.com/r/bytedesk/bytedesk)或[Github Release](https://github.com/Bytedesk/bytedesk/releases)查看。

## 国产信创

### 支持架构

arm64 和 amd64架构均支持。

![arches](/img/deploy/docker/docker_arches.png)

对于国产服务器，比如麒麟920，arm64架构，在拉取镜像时，需要指明系统架构：

```bash
# 拉取国内镜像（arm64）
docker pull --platform linux/arm64 registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest
# 或直接拉取官方镜像（arm64）
docker pull --platform linux/arm64 bytedesk/bytedesk:latest
```

## 生产环境配置

### 域名访问

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

### Docker镜像选择

:::tip 镜像选择建议

- **国内用户**：建议使用阿里云镜像，下载速度更快
- **社区版**：`registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk-ce:latest`
- **企业版/平台版**：`registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest`
:::

## 常见问题

- 参考 [常见问题](../faq)
- 更多Docker命令参考：[Docker常用命令](./depend/docker#升级bytedesk镜像)

## 参考链接

- [Harbor私有镜像管理](https://goharbor.io/)
- [申请licenseKey](../development/license.md)
- [微语项目仓库](https://github.com/Bytedesk/bytedesk)
- [微语社区版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk-ce)
- [微语企业版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk)
