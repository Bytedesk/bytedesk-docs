---
title: 宝塔面板部署
sidebar_label: 宝塔面板部署
sidebar_position: 3
---

:::tip

- 操作系统：Ubuntu 22.04 LTS
- 服务器最低配置2核4G内存
- 配置要求太高？建议：可以分拆 MySQL、Redis、Elasticsearch、ArtemisMQ 等服务到其他服务器，仅保留核心服务在主服务器上。可以有效降低服务器配置要求。

:::

## 步骤一

- ![agent](/img/deploy/baota/baota_1.png)

## 步骤二：添加容器编排

- ![agent](/img/deploy/baota/baota_2.png)

### 复制如下编排内容(二选一)

- [最新docker-compose.yaml-默认使用智谱AI](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose.yaml)
- [最新docker-compose-ollama.yaml-默认使用ollama](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml)

如果使用docker-compose.yaml-需要自行填充智谱AI相关配置，参考如下配置：

```yaml
# 申请智谱AI API Key：https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx' # 智谱AI API Key
SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
```

## 步骤三：等待中

- ![agent](/img/deploy/baota/baota_3.png)

## 步骤四：添加完成，关闭窗口

- ![agent](/img/deploy/baota/baota_4.png)

## 步骤五：安装成功

- ![agent](/img/deploy/baota/baota_5.png)

## 步骤六：安装ollama模型

因项目默认使用ollama qwen2.5:1.5b模型，所以需要拉取模型，否则无法使用AI问答功能

```bash
# 对话模型
ollama pull qwen3:0.6b
# 嵌入模型
ollama pull bge-m3:latest
```

如果你使用的是docker-compose-ollama.yaml-默认集成ollama，参考下图安装模型

- ![ollama](/img/deploy/baota/baota-ollama.png)

## 步骤七：开放端口

请开放内网入方向端口

- 9003
- 9885

## 步骤八：预览

```bash
# 请将127.0.0.1替换为你的服务器ip
访问地址：http://127.0.0.1:9003/
默认账号：admin@email.com
默认密码：admin
```

## 步骤九：配置域名访问

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

## 常见问题

- 参考 [常见问题](/docs/faq)
