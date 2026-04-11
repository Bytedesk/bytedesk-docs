---
title: 宝塔面板部署
sidebar_label: 宝塔面板部署
sidebar_position: 3
---

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](../faq#问题13如何申请licensekey)
:::

## 系统要求

:::tip 最低配置

- **操作系统**：Ubuntu 22.04 LTS（推荐）
- **服务器配置**：4核8G内存
- **宝塔面板**：已安装宝塔面板

:::info 配置优化建议
如果服务器配置不够，可以分拆MySQL、Redis、Elasticsearch、ArtemisMQ等服务到其他服务器，仅保留核心服务在主服务器上。
:::

## 快速开始

### 步骤1：选择部署方式

#### 方式一：使用云模型（推荐新手）

1. 克隆项目并进入 `deploy/docker` 目录
2. 申请智谱AI [API Key](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
3. 在 `compose-app-bytedesk.yaml` 中填入 API Key

#### 方式二：使用本地模型

1. 克隆项目并进入 `deploy/docker` 目录
2. 使用 `./start.sh mysql artemis standard all` 启动
3. 拉取本地 Ollama 模型

#### 方式三：默认不使用ai大模型

1. 使用 `./start.sh mysql artemis noai all` 启动

### 步骤2：修改配置

#### 2.1 服务器IP配置

在 Docker 部署配置中（例如 `compose-app-bytedesk.yaml`），将 `127.0.0.1` 替换为你的服务器IP地址或域名，并配置 [licenseKey](../development/license.md)：

```yaml
# 请将 127.0.0.1 替换为你的服务器IP或域名
BYTEDESK_UPLOAD_URL: http://你的服务器IP:9003
BYTEDESK_KBASE_API_URL: http://你的服务器IP:9003
BYTEDESK_FEATURES_AVATAR_BASE_URL: http://你的服务器IP:9003

# 官方微语管理后台-》设置-》License-》申请licenseKey
BYTEDESK_LICENSE_KEY: 
```

> 💡 **提示**：注意修改镜像默认用户名密码，比如:Mysql/Redis等默认密码。

#### 2.2 云模型配置（智谱AI）

如果选择云模型方式，在 `compose-app-bytedesk.yaml` 中配置：
下单立减10%金额，享限时惊喜价！智谱AI折扣链接：https://www.bigmodel.cn/glm-coding?ic=QVGU6DW7QI

```yaml
environment:
  SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'  # 替换为你的智谱AI API Key
  SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
  SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
  SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-2
```

#### 2.3 本地模型配置（Ollama）

如果选择本地模型方式，在 `compose-base.yaml` + `compose-app-bytedesk.yaml` 的默认配置中已包含 Ollama 组件，无需额外切换文件。

### 步骤3：宝塔面板操作

#### 3.1 打开宝塔面板

![宝塔面板](/img/deploy/baota/baota_1.png)

#### 3.2 添加容器编排

![添加容器编排](/img/deploy/baota/baota_2.png)

#### 3.3 复制编排内容

将分层 compose 文件内容按顺序复制到宝塔面板的容器编排中（建议至少包含以下文件）：

- `compose-base.yaml`
- `compose-db-mysql.yaml`
- `compose-mq-artemis.yaml`
- `compose-scenario-standard.yaml`（或 `compose-scenario-noai.yaml`）
- `compose-app-bytedesk.yaml`
- `compose-app-mq-artemis.yaml`

#### 3.4 等待部署完成

![等待部署](/img/deploy/baota/baota_3.png)

#### 3.5 部署成功

![部署成功](/img/deploy/baota/baota_4.png)

![安装完成](/img/deploy/baota/baota_5.png)

### 步骤4：下载模型（仅本地模型需要）

如果使用本地模型，需要下载Ollama模型：

```bash
# 对话模型
ollama pull qwen3:0.6b

# 嵌入模型
ollama pull bge-m3:latest
```

如果你使用的是标准场景（默认集成 ollama），参考下图安装模型：

![Ollama模型安装](/img/deploy/baota/baota-ollama.png)

## 访问系统

### 开放端口

确保服务器开放以下端口：

- **9003** - WebApi/管理界面
- **9885** - WebSocket端口

如果你使用域名 + Nginx 反向代理方式对外仅开放 80/443，则 **无需** 对外开放 9003/9885。
此时请在 docker compose 的环境变量中增加：

- `BYTEDESK_CUSTOM_MQTT_WEBSOCKET_URL: wss://api.你的域名/websocket`

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

- 参考 [常见问题](../faq)
- 更多Docker命令参考：[Docker常用命令](./depend/docker#升级bytedesk镜像)

## 参考链接

- [申请licenseKey](../development/license.md)
- [微语项目仓库](https://github.com/Bytedesk/bytedesk)
- [微语社区版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk-ce)
- [微语企业版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk)
