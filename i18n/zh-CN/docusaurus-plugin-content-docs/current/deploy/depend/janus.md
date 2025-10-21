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

以下步骤基于 Janus 官方 README 的通用流程，覆盖主流 Linux 与 macOS 的源码编译方式，并提供可选的 Docker 用法。请根据你的操作系统选择对应小节。更多细节可参考官方仓库的安装说明。

- 官方说明（英文）：https://github.com/meetecho/janus-gateway?tab=readme-ov-file

#### 1）准备依赖

Janus 采用 Autotools 构建，需要一组基础开发工具与库。不同系统的包名略有差异，下面给出常见环境的安装示例（尽量选用较新的版本，部分组件为可选但推荐安装，以获得更完整的功能）。

- Ubuntu/Debian

```bash
sudo apt update
sudo apt install -y \
    git build-essential autoconf automake libtool pkg-config cmake \
    libmicrohttpd-dev libjansson-dev libssl-dev libsrtp2-dev \
    libglib2.0-dev libopus-dev libogg-dev libcurl4-openssl-dev \
    libwebsockets-dev libnice-dev libusrsctp-dev

# 可选（特定插件才需要，例如 SIP 插件）
# sudo apt install -y libsofia-sip-ua-dev
```

- CentOS/RHEL（8+/Stream 建议使用 dnf，7 可能需要从源安装部分依赖或自行编译）

```bash
sudo dnf groupinstall -y "Development Tools" || sudo yum groupinstall -y "Development Tools"
sudo dnf install -y \
    git autoconf automake libtool pkgconfig cmake \
    libmicrohttpd-devel jansson-devel openssl-devel \
    glib2-devel opus-devel libogg-devel libcurl-devel \
    libwebsockets-devel libnice-devel usrsctp-devel \
    libsrtp-devel || true

# 说明：
# - 某些发行版将 libsrtp2 命名为 libsrtp；若版本过旧，建议从源码安装 libsrtp2。
# - SIP 插件可选：sudo dnf install -y sofia-sip-devel
```

- macOS（基于 Homebrew）

```bash
# 安装编译工具与依赖
brew update
brew install autoconf automake libtool pkg-config cmake \
    jansson openssl@3 libsrtp libmicrohttpd glib opus libogg curl \
    libwebsockets libnice usrsctp

# 指定 OpenSSL 的 pkg-config 路径（Apple 自带 OpenSSL 不可用）
export PKG_CONFIG_PATH="$(brew --prefix openssl@3)/lib/pkgconfig:$PKG_CONFIG_PATH"
```

#### 2）获取源码并编译安装

以下命令默认将 Janus 安装到 `/opt/janus`。你也可以将 `--prefix` 改为其它路径（确保有写权限）。

```bash
git clone https://github.com/meetecho/janus-gateway.git
cd janus-gateway

# 生成构建脚本
sh autogen.sh

# 配置与编译（可按需添加/移除选项）
./configure --prefix=/opt/janus --disable-static
make -j$(getconf _NPROCESSORS_ONLN 2>/dev/null || sysctl -n hw.ncpu || echo 2)

# 安装二进制与资源
sudo make install

# 安装示例配置到 /opt/janus/etc/janus
sudo make configs
```

常见可选 configure 开关（仅列举几个示例，按需选择）：

- `--enable-websockets`：启用 WebSocket 传输（检测到 libwebsockets 时通常默认启用）
- `--enable-post-processing`：启用录制后的处理工具
- `--disable-data-channels`：禁用 DataChannel（不安装 usrsctp 时可能需要）

#### 3）快速验证

```bash
# 校验配置文件语法
/opt/janus/bin/janus --check-config

# 前台运行（调试）
/opt/janus/bin/janus

# 另开终端简单连通性检查
curl http://127.0.0.1:8088/janus || true
```

若能看到 Janus 的 HTTP 响应或在控制台看到成功启动的日志，即表示安装成功。随后请继续参考本文的“端口配置”“基本配置”“启动和运行”等小节完成生产化配置。

#### 4）Docker 方式（可选）

推荐使用现成镜像与 docker compose 进行部署，配置更直观，且支持多平台镜像（x86_64/arm64 自动匹配）。以下示例基于开源镜像 `sucwangsr/janus-webrtc-gateway-docker` 的用法进行整理。

- [参考 Docker Github](https://github.com/pengjinning/janus-webrtc-gateway-docker)

1）准备配置文件

- 在宿主机创建 `conf/` 目录，放入需要覆盖的 Janus 配置（可从官方仓库的 `conf/` 目录拷贝并按需修改）。常用：
    - `janus.jcfg`
    - `janus.transport.http.jcfg`
    - `janus.transport.websockets.jcfg`
    - （可选）`janus.eventhandler.sampleevh.jcfg`

2）Linux（network_mode: host）方案

- 适用于 Linux 主机，使用 host 网络无需逐一映射端口（需确保宿主机端口未被占用）。

```yaml
version: '3.8'
services:
    janus-gateway:
        image: sucwangsr/janus-webrtc-gateway-docker:latest
        # 仅启动 Janus：
        # command: ["/usr/local/bin/janus", "-F", "/usr/local/etc/janus"]
        # 同时启动 Nginx(默认 8086) 与 Janus：
        command: ["sh", "-c", "nginx && /usr/local/bin/janus -F /usr/local/etc/janus"]
        network_mode: "host"
        volumes:
            - ./conf/janus.transport.http.jcfg:/usr/local/etc/janus/janus.transport.http.jcfg:ro
            - ./conf/janus.transport.websockets.jcfg:/usr/local/etc/janus/janus.transport.websockets.jcfg:ro
            - ./conf/janus.jcfg:/usr/local/etc/janus/janus.jcfg:ro
            - ./conf/janus.eventhandler.sampleevh.jcfg:/usr/local/etc/janus/janus.eventhandler.sampleevh.jcfg:ro
        restart: always
```

3）macOS/Windows 方案（端口映射）

- 这些平台通常不支持 host 网络模式，改用端口映射并开放媒体端口段（示例为 10000–10200/udp，可按需扩大）。

```yaml
version: '3.8'
services:
    janus-gateway:
        image: sucwangsr/janus-webrtc-gateway-docker:latest
        command: ["sh", "-c", "nginx && /usr/local/bin/janus -F /usr/local/etc/janus"]
        ports:
            - "8088:8088"   # HTTP API
            - "8188:8188"   # WS API
            - "7088:7088"   # Admin HTTP
            - "8086:8086"   # 内置 Nginx（如启用）
            - "10000-10200:10000-10200/udp"  # RTP/RTCP 媒体端口段
        volumes:
            - ./conf/janus.transport.http.jcfg:/usr/local/etc/janus/janus.transport.http.jcfg:ro
            - ./conf/janus.transport.websockets.jcfg:/usr/local/etc/janus/janus.transport.websockets.jcfg:ro
            - ./conf/janus.jcfg:/usr/local/etc/janus/janus.jcfg:ro
        restart: always
```

4）可选：docker run 方式

```bash
docker run --name janus --rm \
    -p 8088:8088 -p 8188:8188 -p 7088:7088 -p 8086:8086 \
    -p 10000-10200:10000-10200/udp \
    -v $PWD/conf/janus.transport.http.jcfg:/usr/local/etc/janus/janus.transport.http.jcfg:ro \
    -v $PWD/conf/janus.transport.websockets.jcfg:/usr/local/etc/janus/janus.transport.websockets.jcfg:ro \
    -v $PWD/conf/janus.jcfg:/usr/local/etc/janus/janus.jcfg:ro \
    sucwangsr/janus-webrtc-gateway-docker:latest
```

说明与注意：

- 容器内 Janus 可执行文件：`/usr/local/bin/janus`；配置目录：`/usr/local/etc/janus`。
- 使用 `network_mode: host` 时，请确认宿主机端口（8088/8188/7088 等）未被占用。
- 若启用内置 Nginx，默认会开放 8086（可在镜像内的 nginx 配置中调整）。
- 生产环境建议在反向代理层开启 HTTPS/WSS，并结合本页“端口配置”“安全配置”进行加固。
- 镜像支持多平台（1.3.1+ 标签合并），建议固定版本标签或使用 `:latest` 按需更新。

5）运行后验证

```bash
# API 探活
curl http://127.0.0.1:8088/janus || true

# 如启用内置 Nginx，可访问：
# http://127.0.0.1:8086/
```

#### 5）下一步

- 按需调整 `janus.transport.http.jcfg` 与 `janus.transport.websockets.jcfg`（本页“基本配置”章节有示例）。
- 在防火墙/安全组开放对应端口（见“端口配置”章节）。
- 若存在 NAT/内网穿透需求，尽快配置 STUN/TURN（见“STUN/TURN 服务器配置”章节）。

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
