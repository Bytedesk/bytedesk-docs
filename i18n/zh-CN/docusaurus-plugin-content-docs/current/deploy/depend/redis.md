---
sidebar_label: Redis
sidebar_position: 2
---

# Redis-stack-server 在微语系统中的应用

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：4核8G内存
:::

## 简介

Redis-stack-server 在微语系统中主要用于：

1. **数据缓存**：提高系统响应速度，减轻数据库负载
2. **向量存储和检索**：支持 AI 知识库的向量搜索功能

:::warning 重要提示
微语系统的 AI 知识库问答功能需要使用 redis-stack-server 版本，而非普通 redis。
普通 redis 无法支持向量搜索功能，会导致 AI 知识库问答无法正常工作。
:::

## 安装方式

以下提供多种安装方式，请根据您的环境选择合适的方式：

### 推荐：Docker Compose 部署

在 [`docker-compose.yml`文件](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml)中添加以下配置：

```yaml
bytedesk-redis:
    image: redis/redis-stack-server:latest
    container_name: redis-bytedesk
    ports:
      - "16379:6379"
    environment:
      - REDIS_ARGS=--requirepass qfRxz3tVT8Nh
    volumes:
      - redis_data:/data
    networks:
      - bytedesk-network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "qfRxz3tVT8Nh", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
```

说明：

- 映射端口：外部 `16379`，内部 `6379`
- 设置密码：`qfRxz3tVT8Nh`（可根据需要更改）
- 数据持久化：使用 `redis_data` 卷存储数据
- 健康检查：每 10 秒检查一次 Redis 服务可用性

### 独立 Docker 命令安装

```bash
# 运行 Redis Stack Server
docker run -d --name redis-bytedesk \
  -p 16379:6379 \
  -e REDIS_ARGS="--requirepass 您的密码" \
  -v redis_data:/data \
  redis/redis-stack-server:latest

# 连接到 Redis CLI
docker exec -it redis-bytedesk redis-cli -a 您的密码
```

### 常用管理命令

```bash
# 检查 Redis 服务状态
docker ps | grep redis-bytedesk

# 查看 Redis 日志
docker logs redis-bytedesk

# 重启 Redis 服务
docker restart redis-bytedesk

# 停止 Redis 服务
docker stop redis-bytedesk

# 启动 Redis 服务
docker start redis-bytedesk
```

## 其他安装方式

### Ubuntu 安装（非 Docker 版）

如果您不使用 Docker，也可以在 Ubuntu 系统上直接安装：

```bash
# 添加 Redis 源并安装
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis-stack-server

# 服务管理
sudo systemctl enable redis-stack-server  # 设置开机启动
sudo systemctl start redis-stack-server   # 启动服务
sudo systemctl status redis-stack-server  # 查看服务状态
```

#### 密码设置

```bash
# 连接 Redis
redis-cli

# 查看现有密码
config get requirepass

# 设置新密码
config set requirepass 您的新密码
```

### macOS 开发环境安装

适用于 macOS 开发环境：

```bash
# 安装
arch -arm64 brew tap redis-stack/redis-stack
arch -arm64 brew install redis-stack

# 启动服务
redis-stack-server

# 启动管理界面（可选）
redisinsight
```

## 参考资料

- [Redis 官方安装文档](https://redis.io/docs/install/install-stack/docker/)
- [Redis Stack Server 文档](https://redis.io/docs/install/install-stack/linux/)
- [Redis 向量搜索功能介绍](https://redis.io/docs/interact/search-and-query/advanced-concepts/vectors/)
