---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::tip

- 操作系统：Ubuntu 22.04 LTS
- 服务器最低配置8核16G内存
- 配置要求太高？建议：可以分拆 MySQL、Redis、Elasticsearch、ArtemisMQ 等服务到其他服务器，仅保留核心服务在主服务器上。可以有效降低服务器配置要求。

:::

## 宝塔面板部署

- [宝塔面板部署](./baota)
- [部署Docker](./depend/docker)

## 方法一：一行命令启动，需要另行安装ollama

```bash
git clone https://gitee.com/270580156/weiyu.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose.yaml up -d
```

### 因项目默认使用ollama qwen3:0.6b模型，所以需要另外拉取模型

```bash
# 对话模型
ollama pull qwen3:0.6b
# 向量模型
ollama pull bge-m3:latest
```

## 方法二： 使用 docker compose ollama，默认集成ollama

```bash
git clone https://gitee.com/270580156/weiyu.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose-ollama.yaml up -d
# 对话模型
docker exec ollama-bytedesk ollama pull qwen3:0.6b
# 向量模型
docker exec ollama-bytedesk ollama pull bge-m3:latest
```

## 停止容器

```bash
docker compose -p weiyu -f docker-compose.yaml stop
# 或者
docker compose -p weiyu -f docker-compose-ollama.yaml stop
```

## 演示

本地预览

```bash
# 请将127.0.0.1替换为你的服务器ip
http://127.0.0.1:9003/
```

## 配置域名访问

对于生产环境，建议配置域名访问和HTTPS：

1. **安装配置Nginx**：参考[Nginx配置指南](./depend/nginx.md)
2. **配置SSL证书**：建议使用[Let's Encrypt](./depend/letsencrypt.md)免费证书

## 常见问题

- 参考 [常见问题](/docs/faq)
