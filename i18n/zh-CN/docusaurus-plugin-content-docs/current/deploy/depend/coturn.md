---
sidebar_label: Coturn
sidebar_position: 15
---

# Coturn STUN/TURN 服务器

## 概述

Coturn 是一个开源的 STUN/TURN 服务器，用于处理 WebRTC 通信中的 NAT 穿越问题。它是 WebRTC 应用必不可少的基础设施组件。

### 主要功能

- **STUN 服务**：帮助客户端发现自己的公网 IP 和端口
- **TURN 服务**：在无法直接连接时提供媒体中继服务
- **高性能**：C/C++ 编写，支持高并发连接
- **多协议支持**：支持 UDP、TCP、TLS、DTLS 等协议
- **认证机制**：支持多种用户认证方式

### 应用场景

- WebRTC 视频会议
- 实时音视频通信
- P2P 文件传输
- 在线游戏
- IoT 设备通信

### 系统要求

- **操作系统**：Linux（推荐 Ubuntu 18.04+/CentOS 7+）
- **内存**：最少 512MB RAM（推荐 1GB+）
- **网络**：公网 IP 地址
- **端口**：3478（默认）+ RTP 端口范围

## 安装

### 快速安装

使用系统包管理器安装：

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install coturn

# CentOS/RHEL
sudo yum install epel-release
sudo yum install coturn

# 验证安装
turnserver --help
```

### 源码编译安装

如需最新版本或自定义编译：

```bash
# 安装依赖
sudo apt install build-essential debhelper libssl-dev libevent-dev libhiredis-dev libmysqlclient-dev libpq-dev

# 下载源码
git clone https://github.com/coturn/coturn.git
cd coturn

# 编译安装
./configure
make && sudo make install
```

### 验证安装

```bash
# 检查版本
turnserver --help

# 查看服务状态
sudo systemctl status coturn
```

## 基本配置

### 配置文件位置

Coturn 的主要配置文件：

```bash
# 主配置文件
/etc/turnserver.conf

# 服务启用配置
/etc/default/coturn

# 日志文件
/var/log/turnserver.log
```

### 快速配置

#### 1. 启用 Coturn 服务

编辑 `/etc/default/coturn`：

```bash
# 去掉注释，启用服务
TURNSERVER_ENABLED=1
```

#### 2. 基础配置

编辑 `/etc/turnserver.conf`：

```bash
# 备份原配置
sudo cp /etc/turnserver.conf /etc/turnserver.conf.backup

# 基本配置（将以下内容添加到配置文件）
listening-port=3478                    # 监听端口
external-ip=YOUR_PUBLIC_IP            # 服务器公网IP
user=username1:password1               # 认证用户
user=username2:password2               # 可配置多个用户
realm=your-domain.com                  # 域名配置
```

> **配置提示**：将 `YOUR_PUBLIC_IP` 替换为服务器的真实公网 IP，`your-domain.com` 替换为你的域名。

### 详细配置示例

**完整的 `/etc/turnserver.conf` 配置**：

```bash
# 监听配置
listening-port=3478
listening-ip=0.0.0.0
external-ip=YOUR_PUBLIC_IP

# 认证配置
user=username1:password1
user=username2:password2
realm=your-domain.com

# 安全配置
fingerprint
lt-cred-mech

# 日志配置
log-file=/var/log/turnserver.log
verbose

# 端口范围（RTP媒体端口）
min-port=10000
max-port=20000

# 性能配置
max-bps=0
bps-capacity=0
stale-nonce=600

# 禁用不必要的功能
no-stdout-log
no-cli
```

## 端口配置

Coturn 需要开放以下端口：

| 端口类型 | 默认端口 | 协议 | 说明 |
|---------|---------|------|------|
| STUN/TURN | 3478 | UDP/TCP | 主要服务端口 |
| STUNS/TURNS | 5349 | UDP/TCP | 安全服务端口（可选） |
| RTP 媒体端口 | 10000-20000 | UDP | 媒体传输端口范围 |

## 防火墙配置

### UFW 防火墙

```bash
# 开放 TURN 服务端口
sudo ufw allow 3478

# 开放 RTP 媒体端口范围
sudo ufw allow 10000:20000/udp

# 如果启用安全端口
sudo ufw allow 5349

# 查看防火墙状态
sudo ufw status
```

### iptables 防火墙

```bash
# 开放 TURN 端口
sudo iptables -A INPUT -p udp --dport 3478 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3478 -j ACCEPT

# 开放 RTP 端口范围
sudo iptables -A INPUT -p udp --dport 10000:20000 -j ACCEPT

# 保存规则
sudo iptables-save > /etc/iptables/rules.v4
```

### 云服务器安全组

如果使用云服务器，还需要在安全组中开放相应端口：

**必须开放的端口**：

- `3478` (UDP/TCP) - STUN/TURN 服务
- `10000-20000` (UDP) - RTP 媒体端口

**可选端口**：

- `5349` (UDP/TCP) - 安全 STUN/TURN 服务

## 启动和管理

### 启动服务

```bash
# 启动 Coturn 服务
sudo systemctl start coturn

# 设置开机自启
sudo systemctl enable coturn

# 查看服务状态
sudo systemctl status coturn
```

### 服务管理命令

```bash
# 停止服务
sudo systemctl stop coturn

# 重启服务
sudo systemctl restart coturn

# 重新加载配置
sudo systemctl reload coturn

# 查看服务日志
sudo journalctl -u coturn -f
```

### 前台运行（调试模式）

```bash
# 前台运行，查看详细日志
sudo turnserver --log-file stdout

# 使用指定配置文件运行
sudo turnserver -c /etc/turnserver.conf

# 详细调试模式
sudo turnserver -v -L 0.0.0.0 -f
```

### 验证服务状态

```bash
# 检查进程
ps aux | grep turnserver

# 检查端口占用
sudo netstat -anp | grep turnserver
# 或使用 ss
ss -tlnp | grep :3478

# 检查配置文件语法
sudo turnserver -c /etc/turnserver.conf --check-config
```

## 测试验证

### 在线测试工具

使用官方测试页面验证 STUN/TURN 服务：

- [WebRTC Trickle ICE 测试](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)

### 测试步骤

1. **打开测试页面**
2. **添加 STUN/TURN 服务器配置**：

   ```text
   stun:your-domain.com:3478
   turn:your-domain.com:3478
   ```

3. **输入认证信息**：
   - Username: `username1`
   - Password: `password1`
4. **点击"Gather candidates"**
5. **查看结果**：成功会显示获取到的候选地址

### 命令行测试

```bash
# 测试 STUN 功能
turnutils_stunclient your-domain.com

# 测试 TURN 功能
turnutils_uclient -t -u username1 -w password1 your-domain.com

# 测试端到端连接
turnutils_peer -L -o -a -r your-domain.com -u username1 -w password1
```

### 测试结果说明

**成功的测试结果应该包含**：

- **srflx（服务器反射）候选**：通过 STUN 获取的公网地址
- **relay（中继）候选**：通过 TURN 获取的中继地址

**测试界面示例**：

![WebRTC 测试结果](/img/deploy/webrtc/coturn_turn_stun_test.png)

## 高级配置

### SSL/TLS 证书配置

配置 HTTPS 和 DTLS 支持：

```bash
# 在 /etc/turnserver.conf 中添加
cert=/path/to/certificate.pem
pkey=/path/to/private.key

# 启用安全端口
tls-listening-port=5349
alt-tls-listening-port=443

# DTLS 支持
dtls
```

### 数据库认证

使用数据库存储用户信息：

```bash
# MySQL 数据库
userdb=mysql
mysql-userdb="host=localhost dbname=coturn user=coturn password=password"

# PostgreSQL 数据库
userdb=postgresql
psql-userdb="host=localhost dbname=coturn user=coturn password=password"

# Redis 数据库
redis-userdb="ip=127.0.0.1 dbname=0 password=your-redis-password"
```

### 负载均衡配置

配置多个 TURN 服务器：

```bash
# 服务器集群配置
realm=cluster.your-domain.com
aux-server=turn1.your-domain.com:3478
aux-server=turn2.your-domain.com:3478
```

## 性能优化

### 系统级优化

```bash
# 增加文件描述符限制
echo "turnserver soft nofile 65535" >> /etc/security/limits.conf
echo "turnserver hard nofile 65535" >> /etc/security/limits.conf

# 优化网络参数
echo "net.ipv4.ip_local_port_range = 10000 65535" >> /etc/sysctl.conf
echo "net.core.rmem_default = 262144" >> /etc/sysctl.conf
echo "net.core.rmem_max = 16777216" >> /etc/sysctl.conf
echo "net.core.wmem_default = 262144" >> /etc/sysctl.conf
echo "net.core.wmem_max = 16777216" >> /etc/sysctl.conf
sysctl -p
```

### Coturn 性能配置

```bash
# 在 /etc/turnserver.conf 中优化
# 进程配置
proc-user=turnserver
proc-group=turnserver

# 连接限制
max-bps=0
bps-capacity=0
total-quota=0
user-quota=0

# 内存优化
no-stdout-log
simple-log
new-log-timestamp
```

## 故障排查

### 常见问题

#### 1. 服务启动失败

```bash
# 检查配置文件语法
sudo turnserver -c /etc/turnserver.conf --check-config

# 查看详细错误信息
sudo turnserver -v -L 0.0.0.0 -f

# 检查权限问题
sudo chown -R turnserver:turnserver /var/log/turnserver.log
```

#### 2. 端口被占用

```bash
# 查看端口占用
sudo lsof -i :3478

# 杀死占用进程
sudo kill -9 <PID>

# 修改配置使用其他端口
listening-port=3479
```

#### 3. 防火墙问题

```bash
# 临时关闭防火墙测试
sudo ufw disable

# 检查 iptables 规则
sudo iptables -L -n

# 清除防火墙规则
sudo iptables -F
```

#### 4. 网络连接问题

```bash
# 测试网络连通性
ping your-domain.com

# 检查 DNS 解析
nslookup your-domain.com

# 检查公网 IP
curl ifconfig.me
```

### 日志分析

```bash
# 实时查看日志
sudo tail -f /var/log/turnserver.log

# 查看错误日志
sudo grep "ERROR" /var/log/turnserver.log

# 查看认证失败
sudo grep "401" /var/log/turnserver.log

# 使用 systemd 日志
sudo journalctl -u coturn -f --no-pager
```

### 监控脚本

创建监控脚本 `/usr/local/bin/coturn_monitor.sh`：

```bash
#!/bin/bash
# Coturn 服务监控脚本

TURN_PID=$(pgrep turnserver)
LOG_FILE="/var/log/coturn_monitor.log"

if [ -z "$TURN_PID" ]; then
    echo "$(date): Coturn is not running, restarting..." >> $LOG_FILE
    sudo systemctl restart coturn
    
    # 等待服务启动
    sleep 5
    
    # 再次检查
    TURN_PID=$(pgrep turnserver)
    if [ -z "$TURN_PID" ]; then
        echo "$(date): Failed to restart Coturn!" >> $LOG_FILE
    else
        echo "$(date): Coturn restarted successfully with PID: $TURN_PID" >> $LOG_FILE
    fi
else
    echo "$(date): Coturn is running with PID: $TURN_PID" >> $LOG_FILE
fi
```

设置定时任务：

```bash
# 添加到 crontab
echo "*/5 * * * * /usr/local/bin/coturn_monitor.sh" | crontab -
```

## 安全配置

### 访问控制

```bash
# IP 白名单
denied-peer-ip=0.0.0.0-0.255.255.255
denied-peer-ip=10.0.0.0-10.255.255.255
denied-peer-ip=172.16.0.0-172.31.255.255
denied-peer-ip=192.168.0.0-192.168.255.255

# 允许的 IP 范围
allowed-peer-ip=YOUR_ALLOWED_IP_RANGE
```

### 认证安全

```bash
# 使用密钥认证而不是用户名密码
use-auth-secret
static-auth-secret=your-very-long-secret-key

# 禁用用户名密码认证
# user=username:password  # 注释掉
```

### 日志安全

```bash
# 不记录敏感信息
no-stdout-log
no-syslog

# 限制日志文件大小
logrotate /var/log/turnserver.log
```

## 参考资料

- [Samples](https://webrtc.github.io/samples/)
- [Github Samples](https://github.com/webrtc/samples)
- [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [Janus Gateway](https://github.com/meetecho/janus-gateway)
