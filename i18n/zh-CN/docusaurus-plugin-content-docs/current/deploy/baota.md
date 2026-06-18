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
- **服务器配置**：推荐 8核16G内存，如果使用4核8G至少2台，需要将中间件单独部署
- **宝塔面板**：已安装宝塔面板

:::info 配置优化建议
如果服务器配置不够，可以分拆MySQL、Redis、Elasticsearch、ArtemisMQ等服务到其他服务器，仅保留核心服务在主服务器上。
:::

## 快速开始

### 步骤1：选择部署方式

配置仓库地址 [Gitee](https://gitee.com/270580156/bytedesk-docker-compose) 或者 [Github](https://github.com/Bytedesk/bytedesk-docker-compose)。可以直接clone或下载zip解压。或者只需要[下载docker-compose.yaml](https://gitee.com/270580156/bytedesk-docker-compose/blob/master/one/docker-compose.yaml) 或[复制docker-compose.yaml](https://gitee.com/270580156/bytedesk-docker-compose/blob/master/one/docker-compose.yaml)内容并在本地创建同名文件。

```bash
git clone https://gitee.com/270580156/bytedesk-docker-compose.git
# 或 
# git clone https://github.com/Bytedesk/bytedesk-docker-compose.git
```

### 步骤2：修改配置

从 bytedesk-docker-compose/one 文件夹中选择任意一个compose文件，根据自己需要选择任何一个即可

```bash
├── docker-compose-all.yaml # 包含ai、在线客服、呼叫中心、视频客服等全部内容
├── docker-compose-noai.yaml # 不使用ai，无机器人问答
├── docker-compose-ollama.yaml # 启动微语，内含ollama，默认使用ollama对话
├── docker-compose-rabbitmq.yaml # 启动微语，使用rabbitmq替换默认artemismq，不内含ollama，默认使用zhipuai
├── docker-compose.yaml # 启动微语，不内含ollama，默认使用zhipuai
```

在 下面以 docker-compose.yaml 为例说明，

#### 2.1 服务器IP配置

将 `127.0.0.1` 替换为你的服务器IP地址或域名

```yaml
# 请将 127.0.0.1 替换为你的服务器IP或域名
BYTEDESK_UPLOAD_URL: http://你的服务器IP:9003
BYTEDESK_KBASE_API_URL: http://你的服务器IP:9003
BYTEDESK_FEATURES_AVATAR_BASE_URL: http://你的服务器IP:9003
```

#### 2.2 配置licenseKey

- 并配置 [licenseKey](../development/license.md)：

```yaml
# 官方微语管理后台-》设置-》License-》申请licenseKey
BYTEDESK_LICENSE_KEY: 
```

#### 2.3 云模型配置（智谱AI）

智谱AI链接：[https://www.bigmodel.cn/glm-coding?ic=QVGU6DW7QI](https://www.bigmodel.cn/glm-coding?ic=QVGU6DW7QI)

```yaml
environment:
  SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx'  # 替换为你的智谱AI API Key
  SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
  SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
  SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-2
```

> 💡 **提示**：注意修改镜像默认用户名密码，比如:Mysql/Redis等默认密码。

### 步骤3：宝塔面板操作

#### 3.1 打开宝塔面板

![宝塔面板](/img/deploy/baota/baota_1.png)

#### 3.2 添加容器编排

![添加容器编排](/img/deploy/baota/baota_2.png)

#### 3.3 复制编排内容

将上述 docker-compose.yaml 文件内容复制到宝塔面板的容器编排中

#### 3.4 等待部署完成

![等待部署](/img/deploy/baota/baota_3.png)

#### 3.5 部署成功

![部署成功](/img/deploy/baota/baota_4.png)

![安装完成](/img/deploy/baota/baota_5.png)

## 访问系统

### 开放端口

确保服务器开放以下端口：

- **9003** - WebApi/管理界面
- **9885** - WebSocket端口

如果你使用域名 + Nginx 反向代理方式对外仅开放 80/443，则 **无需** 对外开放 9003/9885。
此时请在 docker compose 的环境变量中增加，并重启

```bash
# 注意替换域名，注意提前在NGINX配置https证书
BYTEDESK_CUSTOM_MQTT_WEBSOCKET_URL: wss://你的域名/websocket
```

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
