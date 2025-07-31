---
sidebar_label: Docker
sidebar_position: 10
---

# Docker 安装与使用指南

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
:::

Docker 是一个开源的应用容器引擎，它让开发者可以将应用及其依赖打包到一个可移植的容器中，然后发布到任何流行的 Linux 或 Windows 操作系统的机器上。本指南将教你如何安装 Docker 并介绍一些常用命令。

## 1. Docker 安装流程（Ubuntu 系统）

### 1.1 添加 Docker 软件源

运行以下命令添加 Docker 的官方软件源：

```bash
# 更新软件包索引
sudo apt-get update
# 安装必要的软件包
sudo apt-get install ca-certificates curl -y
# 创建密钥目录
sudo install -m 0755 -d /etc/apt/keyrings
# 下载 Docker 的 GPG 密钥
sudo curl -fsSL https://mirrors.cloud.tencent.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
# 设置权限
sudo chmod a+r /etc/apt/keyrings/docker.asc
# 添加 Docker 软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://mirrors.cloud.tencent.com/docker-ce/linux/ubuntu/ \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 再次更新软件包索引
sudo apt-get update
```

### 1.2 安装 Docker

通过以下命令安装 Docker 和相关组件：

```bash
# 安装 Docker 引擎、CLI 和其他组件
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 2. Docker 基本操作

### 2.1 Docker 服务管理

```bash
# 启动 Docker 服务
sudo systemctl start docker

# 停止 Docker 服务
sudo systemctl stop docker

# 重启 Docker 服务
sudo systemctl restart docker

# 查看 Docker 服务状态
sudo systemctl status docker

# 另一种重启方式
sudo service docker restart

# 查看 Docker 详细信息
docker info
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

## 停止和重启服务

```bash
# 停止所有服务（保留数据）
docker compose -p bytedesk -f docker-compose-ollama.yaml down
# 或
docker stop bytedesk redis-bytedesk elasticsearch-bytedesk ollama-bytedesk mysql-bytedesk artemis-bytedesk

# 停止所有服务并删除数据卷（谨慎操作，会删除所有数据）
docker compose -p bytedesk -f docker-compose-ollama.yaml down -v

# 重启特定服务
docker compose -p bytedesk -f docker-compose-ollama.yaml restart bytedesk

# 重启所有服务
docker compose -p bytedesk -f docker-compose-ollama.yaml restart
```

## 升级bytedesk镜像

```bash
# 1. 停止当前服务
docker compose -p bytedesk -f docker-compose-ollama.yaml down

# 2. 拉取最新镜像
docker pull registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest

# 3. 重新启动服务（会自动使用最新镜像）
docker compose -p bytedesk -f docker-compose-ollama.yaml up -d

# 或者使用以下命令强制重新构建并启动
docker compose -p bytedesk -f docker-compose-ollama.yaml up -d --force-recreate bytedesk
```

## 删除MySQL数据挂载

如果需要删除MySQL数据挂载并重新初始化数据库，请按以下步骤操作：

```bash
# 1. 停止所有服务
docker compose -p bytedesk -f docker-compose-ollama.yaml down

# 2. 删除MySQL数据卷（谨慎操作，会删除所有数据库数据）
docker volume rm bytedesk_mysql_data

# 3. 重新启动服务（会自动创建新的数据卷和数据库）
docker compose -p bytedesk -f docker-compose-ollama.yaml up -d

# 注意：删除数据卷后，所有数据都会丢失，需要重新初始化管理员账户
```

## 数据卷管理

```bash
# 查看所有数据卷
docker volume ls | grep bytedesk

# 查看数据卷详细信息
docker volume inspect bytedesk_mysql_data
docker volume inspect bytedesk_redis_data
docker volume inspect bytedesk_elasticsearch_data
docker volume inspect bytedesk_upload_data
docker volume inspect bytedesk_ollama_models
docker volume inspect bytedesk_artemis_data

# 备份数据卷（可选）
docker run --rm -v bytedesk_mysql_data:/data -v $(pwd):/backup alpine tar czf /backup/mysql_backup.tar.gz -C /data .

# 恢复数据卷（可选）
docker run --rm -v bytedesk_mysql_data:/data -v $(pwd):/backup alpine tar xzf /backup/mysql_backup.tar.gz -C /data
```

## 故障排除

如果遇到数据库连接问题或服务启动失败，可以尝试以下步骤：

```bash
# 查看容器状态
docker ps -a

# 查看服务日志
docker logs mysql-bytedesk
docker logs bytedesk

# 如果服务启动失败，可以尝试重启
docker compose -p bytedesk -f docker-compose.yaml down
docker compose -p bytedesk -f docker-compose.yaml up -d

# 检查网络连接
docker network inspect bytedesk-network

# 清理未使用的资源
docker system prune -f
```

## 常用命令

```bash
# 查看服务状态
docker compose -p bytedesk -f docker-compose-ollama.yaml ps

# 查看服务日志
docker compose -p bytedesk -f docker-compose-ollama.yaml logs

# 查看特定服务日志
docker compose -p bytedesk -f docker-compose-ollama.yaml logs bytedesk

# 进入容器内部
docker exec -it bytedesk /bin/bash
docker exec -it mysql-bytedesk mysql -u root -p

# 查看容器资源使用情况
docker stats
```

## 参考链接

- [Docker 官方文档](https://docs.docker.com/)
- [腾讯云 Docker 安装指南](https://cloud.tencent.com/document/product/213/46000)
