---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](/docs/faq#问题13如何申请licensekey)
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

### 步骤1：选择部署方式

#### 方式一：使用云模型（推荐新手）

1. 下载 [`docker-compose.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose.yaml) 文件到本地
2. 申请智谱AI [API Key](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
3. 修改配置文件中的API Key

#### 方式二：使用本地模型

1. 下载 [`docker-compose-ollama.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml) 文件到本地
2. 无需申请API Key，使用本地Ollama模型

### 步骤2：修改配置

在下载的配置文件中，将 `127.0.0.1` 替换为你的服务器IP地址或域名：

```yaml
# 请将 127.0.0.1 替换为你的服务器IP或域名
BYTEDESK_UPLOAD_URL: http://你的服务器IP:9003
BYTEDESK_KBASE_API_URL: http://你的服务器IP:9003
BYTEDESK_FEATURES_AVATAR_BASE_URL: http://你的服务器IP:9003
```

### 步骤3：启动服务

```bash
# 使用云模型
docker compose -p bytedesk -f docker-compose.yaml up -d

# 或使用本地模型
docker compose -p bytedesk -f docker-compose-ollama.yaml up -d
```

### 步骤4：下载模型（仅本地模型需要）

如果使用本地模型，需要下载Ollama模型：

```bash
# 对话模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b

# 嵌入模型
docker exec ollama-bytedesk ollama pull bge-m3:latest

# 重新排序模型
docker exec ollama-bytedesk ollama pull linux6200/bge-reranker-v2-m3:latest
```

## 配置说明

### 云模型配置（智谱AI）

在 [`docker-compose.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose.yaml) 中配置：

```yaml
environment:
  SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'  # 替换为你的智谱AI API Key
  SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
  SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
  SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-2
```

### 本地模型配置（Ollama）

在 [`docker-compose-ollama.yaml`](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml) 中已预配置，无需额外设置。

## 访问系统

### 开放端口

确保服务器开放以下端口：

- **9003** - WebApi/管理界面
- **9885** - WebSocket端口

### 登录信息

```bash
访问地址：http://你的服务器IP:9003/
默认账号：admin@email.com
默认密码：admin
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
- **企业版**：`registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest`
:::

## 常见问题

- 参考 [常见问题](/docs/faq)
- 更多Docker命令参考：[Docker常用命令](./depend/docker#升级bytedesk镜像)

## 参考链接

- [微语项目仓库](https://gitee.com/270580156/weiyu)
- [微语社区版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk-ce)
- [微语企业版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk)
