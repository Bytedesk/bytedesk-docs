---
sidebar_label: Janus
sidebar_position: 14
---

# Janus WebRTC Server

:::info 提示
以下说明仅供参考，具体配置和使用方法请参考 [Janus 官方文档](https://janus.conf.meetecho.com/docs/)。
:::

## 概述

Janus 是一个开源的通用 WebRTC 服务器，由 Meetecho 开发。它是一个轻量级的 WebRTC 网关，可以作为媒体服务器来处理音视频通信。

### 主要特性

- **多协议支持**：支持 HTTP、WebSocket、RabbitMQ 等多种传输协议
- **插件架构**：模块化设计，支持多种音视频应用场景
- **高性能**：C 语言编写，性能优异
- **跨平台**：支持 Linux、macOS、Windows 等操作系统
- **WebRTC 标准**：完全符合 WebRTC 标准，支持现代浏览器

### 应用场景

- 视频会议系统
- 在线教育平台
- 直播和录播服务
- 点对点通信
- 多人语音/视频聊天

### 系统要求

- **操作系统**：Linux（推荐 Ubuntu 18.04+/CentOS 7+）
- **内存**：最少 1GB RAM（推荐 2GB+）
- **网络**：公网 IP 或正确配置的 NAT
- **依赖**：libmicrohttpd、libwebsockets、OpenSSL 等

### 微语官方测试地址与参考配置

:::tip 官方资源
- 在线测试地址（微语官方提供）：[https://janus.weiyuai.cn/](https://janus.weiyuai.cn/)
- 参考配置文件与部署示例：[https://github.com/Bytedesk/bytedesk/tree/main/deploy/janus](https://github.com/Bytedesk/bytedesk/tree/main/deploy/janus)
:::

---

## 安装

### 快速安装

- 参考[Janus 安装指南](https://github.com/meetecho/janus-gateway?tab=readme-ov-file)

## 端口配置

Janus 需要开放以下端口才能正常工作，请在安全组或防火墙中开放相应端口。

> **重要提示**：WebRTC 应用除了 Janus 服务端口外，还需要开放 RTP 媒体端口范围（通常是 10000-60000），具体范围可在配置文件中设置。

### HTTP 接口端口

| 端口类型 | 默认端口 | 配置项 | 说明 |
|---------|---------|--------|------|
| HTTP | 8088 | `port` | Janus API HTTP 端口 |
| HTTPS | 8089 | `secure_port` | Janus API HTTPS 端口（需启用） |
| Admin HTTP | 7088 | `admin_port` | Janus 管理接口 HTTP 端口 |
| Admin HTTPS | 7889 | `admin_secure_port` | Janus 管理接口 HTTPS 端口（需启用） |

### WebSocket 接口端口

| 端口类型 | 默认端口 | 配置项 | 说明 |
|---------|---------|--------|------|
| WebSocket | 8188 | `ws_port` | Janus API WebSocket 端口 |
| WebSocket 安全 | 8989 | `wss_port` | Janus API WebSocket 安全端口（需启用） |
| Admin WebSocket | 7188 | `admin_ws_port` | Janus 管理接口 WebSocket 端口 |
| Admin WebSocket 安全 | 7989 | `admin_wss_port` | Janus 管理接口 WebSocket 安全端口（需启用） |

## 基本配置

### 主配置文件

Janus 的主要配置文件位于安装目录的 `etc/janus/` 下：

```bash
# 安装路径（默认）
/opt/janus/

# 主要配置文件
├── etc/janus/
│   ├── janus.jcfg                    # 主配置文件
│   ├── janus.transport.http.jcfg     # HTTP 传输配置
│   ├── janus.transport.websockets.jcfg # WebSocket 传输配置
│   └── janus.plugin.*.jcfg           # 各插件配置文件
```

### 快速配置示例

**基础 HTTP 配置**：

```bash
# 编辑 janus.transport.http.jcfg
general: {
    ip = "0.0.0.0"      # 监听所有网卡
    port = 8088         # HTTP 端口
}
admin: {
    admin_http = true   # 启用管理接口
    admin_ip = "0.0.0.0"
    admin_port = 7088   # 管理端口
}
```

> **配置提示**：修改配置文件后需要重启 Janus 服务才能生效。

**HTTP 传输配置** (`janus.transport.http.jcfg`)：

```bash
general: {
    http = true                 # 启用 HTTP
    port = 8088                # HTTP 端口
    https = false              # 是否启用 HTTPS
    secure_port = 8089         # HTTPS 端口
    ip = "0.0.0.0"            # 绑定所有 IP
}

admin: {
    admin_http = true          # 启用管理接口
    admin_port = 7088          # 管理接口端口
    admin_https = false        # 是否启用管理接口 HTTPS
    admin_secure_port = 7889   # 管理接口 HTTPS 端口
    admin_ip = "0.0.0.0"      # 绑定所有 IP
}
```

**WebSocket 传输配置** (`janus.transport.websockets.jcfg`)：

```bash
general: {
    ws = true                  # 启用 WebSocket
    ws_port = 8188            # WebSocket 端口
    wss = false               # 是否启用安全 WebSocket
    wss_port = 8989           # 安全 WebSocket 端口
}

admin: {
    admin_ws = true            # 启用管理接口 WebSocket
    admin_ws_port = 7188      # 管理接口 WebSocket 端口
    admin_wss = false         # 是否启用管理接口安全 WebSocket
    admin_wss_port = 7989     # 管理接口安全 WebSocket 端口
}
```

### 安全组配置建议

**必须开放的端口**：

- `8088` (HTTP API)
- `7088` (Admin HTTP)
- `8188` (WebSocket API)
- `7188` (Admin WebSocket)

**可选端口**（如果启用 HTTPS/WSS）：

- `8089` (HTTPS API)
- `7889` (Admin HTTPS)
- `8989` (WebSocket 安全)
- `7989` (Admin WebSocket 安全)

> **注意**：生产环境建议启用 HTTPS/WSS 端口，并关闭 HTTP/WS 端口以提高安全性。

## 部署 Web 管理界面

Janus 提供了 Web 管理界面，可以方便地监控和管理服务状态。

### 前置条件

- [Nginx 安装](./nginx.md)

### 部署步骤

将 Janus 示例页面部署到 Web 服务器：

```bash
# 复制示例文件到 Nginx 静态目录
cp -r janus-gateway/html/demos /var/www/html/janus

# 设置正确的权限
sudo chown -R www-data:www-data /var/www/html/janus
sudo chmod -R 755 /var/www/html/janus
```

### 访问管理界面

启动 Janus 服务后，可通过以下地址访问：

- **管理界面**：`http://服务器IP/janus/admin.html`
- **API 测试**：`http://服务器IP/janus/`
- **示例应用**：`http://服务器IP/janus/demos/`

### 配置说明

管理界面需要连接到 Janus 的管理端口（默认 7088），确保：

1. Janus 管理接口已启用
2. 防火墙开放了 7088 端口
3. Web 服务器能够访问 Janus 服务

## 故障排查

### 常见问题

#### 1. 服务启动失败

```bash
# 检查配置文件语法
./bin/janus --check-config

# 查看详细错误信息
./bin/janus --debug-level=7
```

#### 2. 端口被占用

```bash
# 查看端口占用
sudo lsof -i :8088
sudo lsof -i :7088

# 释放端口
sudo kill -9 <PID>
```

#### 3. 权限问题

```bash
# 检查文件权限
ls -la /opt/janus/
sudo chown -R janus:janus /opt/janus/
```

### 日志查看

```bash
# 实时查看日志
tail -f /var/log/janus.log

# 或使用 systemd
sudo journalctl -u janus -f

# 查看特定级别日志
sudo journalctl -u janus -p err
```

## 启动和运行

### 前台启动（调试模式）

```bash
# 切换到安装目录
cd /opt/janus

# 前台启动（可看到日志输出）
./bin/janus

# 查看端口占用情况
netstat -ntlp | grep janus
```

### 后台启动（生产模式）

```bash
# 后台启动
./bin/janus -b

# 或使用 systemd 服务
sudo systemctl start janus
sudo systemctl enable janus  # 开机自启
```

### 验证服务状态

```bash
# 检查进程
ps aux | grep janus

# 检查端口
ss -tlnp | grep :8088

# 访问管理界面
curl http://localhost:7088/admin
```

### 常用管理命令

```bash
# 停止服务
sudo systemctl stop janus

# 重启服务
sudo systemctl restart janus

# 查看服务状态
sudo systemctl status janus

# 查看实时日志
sudo journalctl -u janus -f
```

## 性能优化建议

### 系统优化

```bash
# 增加文件描述符限制
echo "* soft nofile 65535" >> /etc/security/limits.conf
echo "* hard nofile 65535" >> /etc/security/limits.conf

# 优化网络参数
echo "net.core.rmem_max = 16777216" >> /etc/sysctl.conf
echo "net.core.wmem_max = 16777216" >> /etc/sysctl.conf
sysctl -p
```

### Janus 配置优化

```bash
# 在 janus.jcfg 中调整
general: {
    session_timeout = 60        # 会话超时时间
    candidates_timeout = 45     # ICE 候选超时
    reclaim_session_timeout = 0 # 会话回收超时
}
```

## STUN/TURN 服务器配置

WebRTC 通信通常需要 STUN/TURN 服务器来处理 NAT 穿越问题。推荐自建 Coturn 服务器以获得更好的性能和控制。

### 在 Janus 中配置 STUN/TURN

在 Janus 主配置文件中配置 STUN/TURN 服务器：

```bash
# 编辑 janus.jcfg
nat: {
    # STUN 服务器配置
    stun_server = "your-domain.com"
    stun_port = 3478
    nice_debug = false
    
    # TURN 服务器配置
    turn_server = "your-domain.com"
    turn_port = 3478
    turn_type = "udp"
    turn_user = "username1"
    turn_pwd = "password1"
    
    # 可选：配置多个 TURN 服务器
    turn_servers = [
        {
            server = "your-domain.com"
            port = 3478
            type = "udp"
            username = "username1"
            password = "password1"
        }
    ]
}
```

### 使用公共 STUN 服务器

如果暂时不想搭建自己的服务器，可以使用免费的公共 STUN 服务器：

```bash
# 编辑 janus.jcfg
nat: {
    # 使用 Google 公共 STUN 服务器
    stun_server = "stun.l.google.com"
    stun_port = 19302
    nice_debug = false
}
```

> **注意**：公共 STUN 服务器只能用于测试，生产环境建议使用自建的 TURN 服务器。

### 自建 Coturn 服务器

要获得最佳性能和可靠性，推荐自建 Coturn 服务器：

- **完整的 Coturn 部署指南**：[Coturn 配置文档](./coturn.md)
- **安装步骤**：包含详细的安装、配置、测试步骤
- **性能优化**：系统级和服务级优化建议
- **故障排查**：常见问题和解决方案

### 配置验证

配置完成后，可以通过以下方式验证：

```bash
# 重启 Janus 服务
sudo systemctl restart janus

# 查看 Janus 日志，确认 STUN/TURN 配置已加载
sudo journalctl -u janus -f | grep -i "stun\|turn"

# 使用在线工具测试
# https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
```

### 网络要求

- **公网 IP**：服务器需要有公网 IP 或正确配置的端口转发
- **防火墙**：开放必要的端口范围
- **带宽**：确保有足够的网络带宽支持音视频传输

## 安全配置

### HTTPS 证书配置

生产环境建议启用 HTTPS：

```bash
# 在 janus.transport.http.jcfg 中配置
certificates: {
    cert_pem = "/path/to/certificate.pem"
    cert_key = "/path/to/private.key"
    cert_pwd = "password_if_needed"
}

general: {
    https = true
    secure_port = 8089
}
```

### 访问控制

限制管理接口访问：

```bash
admin: {
    admin_secret = "your_secret_key"
    admin_acl = "127.0.0.1,10.0.0.0/8"  # 限制访问 IP
}
```

## 相关链接

- [Janus 官网](https://janus.conf.meetecho.com/index.html)
- [Janus Github](https://github.com/meetecho/janus-gateway)
- [Janus Npm](https://www.npmjs.com/package/janus-gateway)
