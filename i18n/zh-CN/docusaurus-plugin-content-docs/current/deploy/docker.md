---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::info 试用版License
需要试用版License？请参考：[问题13：如何申请licenseKey](/docs/faq#问题13如何申请licensekey)
:::

:::tip

- 操作系统：Ubuntu 22.04 LTS
- 服务器最低配置4核8G内存
- 配置要求太高？建议：可以分拆 MySQL、Redis、Elasticsearch、ArtemisMQ 等服务到其他服务器，仅保留核心服务在主服务器上。可以有效降低服务器配置要求。
- Docker社区版镜像，二选其一即可，建议国内选阿里云镜像
  - bytedesk/bytedesk-ce:latest # hub.docker.com community
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk-ce:latest # 阿里云社区版镜像
- Docker企业版/平台版镜像，二选其一即可，建议国内选阿里云镜像
  - bytedesk/bytedesk:latest # hub.docker.com enterprise
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest # 阿里云企业版/平台版镜像

:::

## 方法一：克隆项目并启动docker compose容器，默认使用云模型 智谱AI

```bash
git clone https://gitee.com/270580156/weiyu.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose.yaml up -d
```

### 申请智谱AI [API Key](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)

```bash
# zhipuai
# SPRING_AI_ZHIPUAI_BASE_URL: https://open.bigmodel.cn/api/paas
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx' // 替换为智谱AI API Key
SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-2
```

## 方法二：使用 docker compose ollama，默认安装ollama，默认使用 qwen3:0.6b 模型

```bash
git clone https://gitee.com/270580156/weiyu.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose-ollama.yaml up -d
```

### docker 拉取ollama模型。配置文件中可以配置其他模型，如deepseek-r1等

```bash
# 对话模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b
# 嵌入模型
docker exec ollama-bytedesk ollama pull bge-m3:latest
# 重新排序Rerank模型
docker exec ollama-bytedesk ollama pull linux6200/bge-reranker-v2-m3:latest
# 或者从 huggingface 下载模型
# docker exec ollama-bytedesk ollama pull hf.co/<username>/<model-repository>
```

## 停止容器

```bash
docker compose -p weiyu -f docker-compose.yaml down
# 或者
docker compose -p weiyu -f docker-compose-ollama.yaml down
```

## 开放端口

请开放内网入方向端口

- 9003
- 9885

## 演示

本地预览

```bash
# 请将127.0.0.1替换为你的服务器ip
访问地址：http://127.0.0.1:9003/
默认账号：admin@email.com
默认密码：admin
```

## 配置域名访问

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

## 常见问题

- 参考 [常见问题](/docs/faq)

## 参考链接

- [部署Docker](./depend/docker)
- [微语社区版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk-ce)
- [微语企业版/平台版Docker镜像](https://hub.docker.com/r/bytedesk/bytedesk)
