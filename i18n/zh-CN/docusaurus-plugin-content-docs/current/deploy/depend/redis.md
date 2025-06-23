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

## 方式二：Ubuntu 安装

```bash
# 添加 Redis 源并安装
sudo apt-get install lsb-release curl gpg
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis

# 服务管理
sudo systemctl enable redis-server  # 设置开机启动
sudo systemctl start redis-server   # 启动服务
sudo systemctl status redis-server  # 查看服务状态
```

### 密码设置

```bash
# 连接 Redis
redis-cli

# 未设置密码时
# 查看现有密码
config get requirepass
# 设置新密码
config set requirepass 您的新密码

# 已设置密码时
# 错误示例 - 会提示需要认证
127.0.0.1:6379> config get requirepass
(error) NOAUTH Authentication required.

# 正确方式 - 先认证再执行命令
127.0.0.1:6379> auth 您的密码
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "您的密码"

# 一次性执行带密码的命令
redis-cli -a 您的密码 config get requirepass
```

:::tip 提示
使用 `-a` 参数传递密码时可能会在日志中留下密码明文，存在安全风险。
在生产环境中，建议使用 `redis-cli` 连接后再使用 `auth` 命令认证。
:::

### 开启远程访问

默认情况下，Redis只监听本地地址(127.0.0.1)，如需开启远程访问，请按以下步骤操作：

#### 检查当前监听状态

可以使用以下命令检查Redis是否已配置为允许远程访问：

```bash
# 查看所有监听端口
netstat -ntlp | grep redis

# 输出示例（仅监听本地地址，不支持远程访问）：
tcp        0      0 127.0.0.1:6379          0.0.0.0:*               LISTEN      1354656/redis-serve 
tcp6       0      0 ::1:6379                :::*                    LISTEN      1354656/redis-serve 

# 输出示例（已配置支持远程访问）：
tcp        0      0 0.0.0.0:6379            0.0.0.0:*               LISTEN      1354656/redis-serve 
tcp6       0      0 :::6379                 :::*                    LISTEN      1354656/redis-serve
```

如果Redis监听在`0.0.0.0:6379`或`:::6379`上，表示已配置为允许来自任何IP的连接。

```bash
# 编辑Redis配置文件
sudo nano /etc/redis/redis.conf

# 找到并修改以下配置项（将bind 127.0.0.1 ::1 改为允许所有地址访问）
# 注释掉或修改bind行
# bind 127.0.0.1 ::1
bind 0.0.0.0

# 确保设置了密码（出于安全考虑）
requirepass 您的密码

# 保存并退出编辑器

# 重启Redis服务
sudo systemctl restart redis-server
```

:::warning 安全警告
开启Redis远程访问存在安全风险，请确保：

1. 设置了强密码
2. 配置防火墙限制IP访问
3. 生产环境建议使用VPN或SSH隧道访问Redis
:::

#### 防火墙配置

```bash
# 如使用ufw防火墙，添加规则允许特定IP访问Redis端口
sudo ufw allow from 信任的IP地址 to any port 6379

# 或允许任何IP访问（不推荐）
# sudo ufw allow 6379
```

#### 验证远程连接

配置完成后，可以从其他机器远程测试连接：

```bash
# 从另一台服务器测试连接（替换为您服务器的IP地址）
redis-cli -h 服务器IP地址 -a 您的密码 ping

# 成功连接会返回：
PONG
```

如果连接被拒绝，可能的原因包括：

1. Redis未监听在所有网络接口（`0.0.0.0`）
2. 防火墙阻止了连接
3. Redis服务未正确重启
4. 密码认证问题

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
- [Redis Stack Server 文档](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/apt/)
- [Redis 向量搜索功能介绍](https://redis.io/docs/interact/search-and-query/advanced-concepts/vectors/)
