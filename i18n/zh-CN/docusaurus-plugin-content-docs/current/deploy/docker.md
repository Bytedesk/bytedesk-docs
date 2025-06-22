---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::tip

- 操作系统：Ubuntu 22.04 LTS
- 服务器最低配置4核8G内存，建议配置8核16G内存
- 配置要求太高？建议：可以分拆 MySQL、Redis、Elasticsearch、ArtemisMQ 等服务到其他服务器，仅保留核心服务在主服务器上。可以有效降低服务器配置要求。
- Docker社区版镜像，二选其一即可，建议国内选阿里云镜像
  - bytedesk/bytedesk-ce:latest # hub.docker.com community
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk-ce:latest # 阿里云社区版镜像
- Docker企业版/平台版镜像，二选其一即可，建议国内选阿里云镜像
  - bytedesk/bytedesk:latest # hub.docker.com enterprise
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest # 阿里云企业版/平台版镜像

:::

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

## 问题排查

查看logs

```bash
# 例如查看MySQL容器的日志
docker logs mysql-bytedesk

# 查看Redis容器的日志
docker logs redis-bytedesk

# 查看Elasticsearch容器的日志
docker logs elasticsearch-bytedesk

# 查看Artemis消息队列容器的日志
docker logs artemis-bytedesk

# 查看ollama-bytedesk容器的日志
docker logs ollama-bytedesk

# 查看主应用容器的日志
docker logs bytedesk
# 实时查看日志并跟踪最新输出
docker logs -f bytedesk
# 显示最近50行日志
docker logs --tail 50 bytedesk
# 查看容器内运行的进程
docker top bytedesk
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
