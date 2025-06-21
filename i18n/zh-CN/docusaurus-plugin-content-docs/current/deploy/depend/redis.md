---
sidebar_label: Redis
sidebar_position: 2
---

# Redis-stack-server 安装教程

:::tip 系统要求

- 操作系统：Ubuntu 24.04 LTS
- 服务器推荐配置：2核4G内存
:::

## 方式一：Docker安装

- [使用Docker安装](../jar.md#12-安装项目依赖)

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
