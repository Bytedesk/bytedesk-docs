---
sidebar_label: Jitsi
sidebar_position: 13
---

# Jitsi 视频会议/视频客服/视频聊天

## 概述

Jitsi 是一套开源的视频会议解决方案，核心由以下组件构成：

- Prosody：XMPP 服务器，负责信令与鉴权
- Jicofo：会议协调器，负责房间/桥接管理
- Jitsi Videobridge（JVB）：SFU 媒体转发
- Web：静态前端（含配置与资源）
- Jibri：会议录制/直播（可选，建议单独机器/容器）
- Coturn：STUN/TURN（建议自建，保证弱网/NAT 可用）

你也可以参考我们在 Janus 文档中的写法与结构（端口、安全、TURN 等理念通用）。

## 适用范围与目标

- 单房间 ~100 人互动；总并发 ~100
- 需要录制（Jibri）
- 需要移动端与品牌自定义
- 追求最短上线路径、后续再优化

## 前置条件

- 域名与 DNS：如 `jitsi.weiyuai.cn`（A 记录指向公网 IP）
- 服务器：
	- Core（Prosody/Jicofo/Web）：2 vCPU / 4GB RAM
	- JVB：4 vCPU / 8GB RAM / ≥300 Mbps 带宽（起步）
	- Jibri：4 vCPU / 8GB RAM（每台建议同时只录制 1 场）
	- Coturn：2 vCPU / 4GB RAM / 公网 IP
- 操作系统：Ubuntu 20.04+/Debian/CentOS/RHEL 均可（推荐 Ubuntu 22.04 LTS）
- 证书：生产建议使用有效的 TLS 证书（可用反代 + Let’s Encrypt）

## 端口与安全组

对外需开放：

- 443/tcp：HTTPS/WSS（Web 与信令）
- 10000/udp：JVB 媒体转发（可按需扩大范围，如 10000-20000/udp）
- 3478/udp、5349/tcp：Coturn（TURN/DTLS/TLS）

对内（容器/节点间）常见端口（示例）：

- Prosody：5280（BOSH）、5347（组件）、5222（客户端）等
- Jicofo ↔ Prosody：XMPP 组件端口

> 注意：实际端口以你的部署/反向代理为准；尽量仅对外暴露 443 与 JVB UDP 端口，Coturn 暴露 3478/5349。

## 微语官方测试地址与参考配置

:::tip 官方资源
- 在线测试地址（微语官方提供）：[https://jitsi.weiyuai.cn/](https://jitsi.weiyuai.cn/)
- 参考配置文件与部署示例：[https://github.com/Bytedesk/bytedesk/tree/main/deploy/jitsi](https://github.com/Bytedesk/bytedesk/tree/main/deploy/jitsi)
:::


## 快速安装（Quickstart）

以下为“最快可用”的两条路径，建议先选其一完成可用性验证：

- 官方 Quickstart：https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-quickstart

### A. Ubuntu/Debian

以下为基于 Ubuntu 22.04（Debian 同理）的完整安装步骤，涵盖仓库/密钥（Prosody ≥ 0.12）、分步安装、状态检查与证书。

#### 前置条件

- 公网服务器，推荐 Ubuntu 22.04 LTS
- 已解析的域名（例：`jitsi.weiyuai.cn`），A 记录指向本机公网 IP
- 端口策略可放通：80/tcp、443/tcp、10000/udp（可用 UFW 或安全组）
- Root 权限或等效 sudo 权限

#### 必需端口与防火墙

端口说明见上文“端口与安全组”。如需使用 UFW 快速放行：

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 10000/udp
```

#### 添加官方仓库与密钥（Jitsi 与 Prosody）

Ubuntu/Debian 默认仓库的 Prosody 往往是 0.11.x，Jitsi 组件需要 Prosody ≥ 0.12，故需添加 Prosody 官方仓库。

```bash
sudo apt update
sudo apt install -y curl gnupg ca-certificates software-properties-common lsb-release

# Jitsi 仓库与密钥
sudo install -d -m 0755 /usr/share/keyrings
curl -fsSL https://download.jitsi.org/jitsi-key.gpg.key \
		| sudo gpg --dearmor -o /usr/share/keyrings/jitsi-keyring.gpg
echo 'deb [signed-by=/usr/share/keyrings/jitsi-keyring.gpg] https://download.jitsi.org stable/' \
		| sudo tee /etc/apt/sources.list.d/jitsi-stable.list > /dev/null

# Prosody 仓库与密钥（确保 ≥ 0.12）
curl -fsSL https://prosody.im/files/prosody-debian-packages.key \
		| sudo gpg --dearmor -o /usr/share/keyrings/prosody-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/prosody-archive-keyring.gpg] https://packages.prosody.im/debian $(lsb_release -cs) main" \
		| sudo tee /etc/apt/sources.list.d/prosody.list > /dev/null

sudo apt update

# 可选：验证仓库是否生效
apt-cache policy jitsi-meet | sed -n '1,15p'
apt-cache policy prosody | sed -n '1,15p'
```

#### 安装 Prosody（确保版本 ≥ 0.12）

```bash
sudo apt install -y prosody
prosodyctl --version || true
```

#### 无人值守参数（先用自签名证书与临时主机名）

如暂未确定域名或尚未申请证书，可先使用自签名证书与临时主机名（后续可切换）。

```bash
sudo apt install -y debconf-utils
echo 'jitsi-meet jitsi-meet/hostname string jitsi.local' | sudo debconf-set-selections
echo 'jitsi-meet jitsi-meet/cert-choice select Generate a new self-signed certificate' | sudo debconf-set-selections
```

#### 安装 jitsi-meet（分步安装，降低中断风险）

部分组件（如 `jitsi-videobridge2`）体积较大，建议分步安装：

```bash
# Web 与 Prosody 配置（体积较小）
sudo apt install -y jitsi-meet-web jitsi-meet-web-config jitsi-meet-prosody

# Jicofo（会拉取 Java 运行时）
sudo apt install -y jicofo

# 视频桥（较大，单独安装便于重试）
sudo apt install -y jitsi-videobridge2

# TURN 组件（可选，但弱网/NAT 建议后续自建 Coturn）
sudo apt install -y jitsi-meet-turnserver || true

# 汇总元包（若前面都装好会快速通过）
sudo apt install -y jitsi-meet
```

遇到下载被网络中断时，可再次执行上一条命令重复尝试；或使用 `-o Acquire::Retries=3` 增加自动重试。

#### 启动与开机自启、状态检查

```bash
sudo systemctl enable --now prosody jicofo jitsi-videobridge2 nginx

# 简要状态（active 为运行中）
systemctl is-active prosody
systemctl is-active jicofo
systemctl is-active jitsi-videobridge2
systemctl is-active nginx

# 端口检查（应看到 80/443 TCP 与 10000 UDP）
ss -ltn '( sport = :80 or sport = :443 )' | sed -n '1,10p'
ss -lun 'sport = :10000' | sed -n '1,10p'
```

#### 切换域名与签发 HTTPS 证书（Let’s Encrypt）

当域名（如 `jitsi.weiyuai.cn`）已解析到本机公网 IP 后：

```bash
# 重新配置站点域名（如之前用了 jitsi.local）
sudo dpkg-reconfigure jitsi-meet-web-config

# 申请并安装证书（会自动配置 Nginx）
sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
```

完成后，用浏览器访问 `https://jitsi.weiyuai.cn` 创建房间进行验证。

#### 卸载（可选）

```bash
sudo systemctl stop jicofo jitsi-videobridge2 prosody nginx || true
sudo apt purge -y jitsi-meet jicofo jitsi-videobridge2 jitsi-meet-web jitsi-meet-prosody jitsi-meet-web-config jitsi-meet-turnserver prosody
sudo apt autoremove -y
```

### B. Docker Compose

```bash
git clone https://github.com/jitsi/docker-jitsi-meet.git
cd docker-jitsi-meet
cp env.example .env && ./gen-passwords.sh

# 编辑 .env 至少设置：
# PUBLIC_URL=https://<你的域名>
# DOCKER_HOST_ADDRESS=<主机公网IP>
# 可选开启 Let's Encrypt：ENABLE_LETSENCRYPT=1 等

docker compose up -d
```

说明：官方工程包含 web/prosody/jicofo/jvb 的编排；若分离 JVB，确保对外映射 UDP 10000。TURN 与 Jibri 见下文。


## 日志位置

- JVB：`/var/log/jitsi/jvb.log`
- Jicofo：`/var/log/jitsi/jicofo.log`
- Prosody：`/var/log/prosody/prosody.log`
- Nginx：`/var/log/nginx/error.log`

## 组件与目录路径速查（安装后常用位置）

以下为通过官方仓库安装在 Ubuntu/Debian 上的典型路径，供快速定位配置、日志与服务。

- Jitsi Meet Web（前端静态站点）
	- 静态资源：`/usr/share/jitsi-meet`
	- Web 配置：`/etc/jitsi/meet/<你的域名>-config.js`
	- Nginx 站点：`/etc/nginx/sites-available/<你的域名>.conf`（并在 `sites-enabled/` 建链接）
	- 证书（Let’s Encrypt）：`/etc/letsencrypt/live/<你的域名>/{fullchain.pem, privkey.pem}`
	- 查看包文件：`dpkg -L jitsi-meet-web`、`dpkg -L jitsi-meet-web-config`

- Prosody（XMPP）
	- 主配置：`/etc/prosody/prosody.cfg.lua`
	- 站点配置：`/etc/prosody/conf.avail/<你的域名>.cfg.lua`（启用链接在 `conf.d/`）
	- 证书：`/etc/prosody/certs`
	- 数据：`/var/lib/prosody`
	- 日志：`/var/log/prosody/prosody.log`
	- 服务名：`prosody`（systemd 单元：`/lib/systemd/system/prosody.service`）
	- 查看包文件：`dpkg -L prosody`，版本信息：`prosodyctl about`

- Jicofo（会议控制器）
	- 配置：`/etc/jitsi/jicofo/jicofo.conf`（HOCON），兼容旧：`/etc/jitsi/jicofo/sip-communicator.properties`
	- 可执行/资源：`/usr/share/jicofo`
	- 日志：`/var/log/jitsi/jicofo.log`
	- 服务名：`jicofo`（单元：`/lib/systemd/system/jicofo.service`）
	- 查看包文件：`dpkg -L jicofo`

- Jitsi Videobridge（JVB，媒体转发 UDP 10000）
	- 配置：`/etc/jitsi/videobridge/jvb.conf`（HOCON），兼容旧：`/etc/jitsi/videobridge/sip-communicator.properties`
	- 可执行/资源：`/usr/share/jitsi-videobridge`
	- 日志：`/var/log/jitsi/jvb.log`
	- 服务名：`jitsi-videobridge2`（单元：`/lib/systemd/system/jitsi-videobridge2.service`）
	- 查看包文件：`dpkg -L jitsi-videobridge2`

- jitsi-meet-prosody（Prosody 插件与集成）
	- 插件目录：`/usr/share/jitsi-meet/prosody-plugins`
	- 影响的站点配置：`/etc/prosody/conf.avail/<你的域名>.cfg.lua`
	- 查看包文件：`dpkg -L jitsi-meet-prosody`

- jitsi-meet-turnserver（可选，打包 Coturn）
	- 配置：`/etc/turnserver.conf` 或 `/etc/coturn/turnserver.conf`（随发行包而异）
	- 服务名：`coturn`（单元：`/lib/systemd/system/coturn.service`）
	- 查看包文件：`dpkg -L jitsi-meet-turnserver`、`dpkg -L coturn`


常用自检命令：

```bash
# 列出已安装的相关包
dpkg -l | grep -E 'jitsi|jicofo|videobridge|prosody|coturn'

# 查看某包安装了哪些文件（定位配置/脚本/单元）
dpkg -L jitsi-meet-web
dpkg -L jicofo
dpkg -L jitsi-videobridge2
dpkg -L jitsi-meet-prosody
dpkg -L prosody

# 服务与端口
systemctl status prosody jicofo jitsi-videobridge2 nginx
ss -ltn '( sport = :80 or sport = :443 )'
ss -lun 'sport = :10000'
```
 
## Jibri（录制/直播）

Jibri 用于“合流录制/直播”。建议独立机器/容器部署；一台 Jibri 通常只服务一场录制并发。

- 资源建议：≥4 vCPU / 8GB RAM，`/dev/shm` 适当增大；
- 输出：本地磁盘、NFS 或对象存储；
- 官方参考：
	- Jitsi Handbook 中的 Jibri 章节（安装与配置）；
	- docker-jitsi-meet 文档中的 Jibri 配置段落；
- 小贴士：先在测试房间验证“开始/停止录制”，确认输出文件与时间戳；直播可按需配置 RTMP 推流。

## 鉴权与安全

生产环境建议启用“安全域（Secure Domain）”与等候室（Lobby），并按需引入 JWT 单点登录：

- 安全域（限制创建房间）：仅授权用户可创建会议，访客经主持同意进入；
- Lobby：访客加入前进入等候室，由主持审批；
- JWT 鉴权：对接你的账号体系/SSO，服务端签发会议 Token；
- 其他：E2EE（插入式加密）、IP/国家访问控制等按需评估；
- 官方参考：Jitsi Handbook 的 Secure Domain、JWT、Moderation/Lobby 等章节。

## 监控与运维

- 指标与可视化：Jitsi Videobridge 支持导出运行指标（Prometheus 等），关注码率、丢包、拥塞与并发；
- 日志定位：
	- Ubuntu 包安装：`/var/log/jitsi/jvb.log`、`/var/log/jitsi/jicofo.log`、`/var/log/prosody/prosody.log`；
	- Docker：容器日志（`docker compose logs -f`）；
- 健康检查：
	- 443/WSS 可达；UDP 10000 通畅；
	- 浏览器 `chrome://webrtc-internals` 观察 ICE、码率与分辨率自适应；
- 扩容路径：增加 JVB 实例、跨地域桥接（Octo），并结合带宽容量规划；
- 官方参考：Jitsi Handbook 的运维与监控章节。

## 验证与自定义

### 快速验证

- 浏览器访问 `https://你的域名` 创建房间
- 用 2–3 台设备/浏览器加入测试
- 开启/停止录制（若已部署 Jibri）并检查 `./recordings` 输出或对象存储
- 弱网/NAT 环境下测试连通性（必要时确认 TURN 是否生效）

### 品牌化（最小改动）

- 覆盖 web 静态资源（Logo、Favicon、主色）；
- 通过环境变量/UI 配置隐藏不需要的按钮（如直播/录制入口视业务开放）；
- 登录与鉴权（启用 internal 或 JWT，限制房间创建权限）。

## 常见问题与排查

- 无法入会或断流：
	- 检查 443/tcp 与 10000/udp 是否开放；
	- 确认反向代理的 WebSocket 转发与证书有效；
	- 查看 JVB 日志与浏览器 WebRTC Internals（码率/ICE 失败）。
- 录制失败：
	- Jibri 机器资源是否足够（CPU、内存、/dev/shm）；
	- 与 Prosody 的 XMPP 凭证是否匹配；
	- 录制输出目录权限与磁盘空间。
- 弱网进不来：
	- TURN 3478/5349 是否可达，凭证是否下发到客户端；
	- 防火墙/运营商对 UDP 的限制。

## 扩展与优化

- 扩容：增加 JVB 实例（同一 XMPP 域下注册），按带宽/并发线性扩展；
- 录制并发：按需增加 Jibri 实例，建议 1 实例对 1 录制；
- 地域优化：多 JVB 分区部署，必要时引入跨桥（Octo）方案；
- 监控：对接 Prometheus/Grafana，关注 JVB 码率、拥塞与丢包；
- 安全：收紧暴露端口、开启鉴权/等候室、限制房间创建权限。

## 移动端与开源客户端

- 开源客户端（Android/iOS，React Native）
	- 名称：Jitsi Meet
	- 源码仓库：https://github.com/jitsi/jitsi-meet
	- 许可证：Apache 2.0

- 移动端 SDK（将会议能力嵌入自有 App）
	- Android SDK 指南：https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-android-sdk
	- iOS SDK 指南：https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ios-sdk
	- 示例工程：https://github.com/jitsi/jitsi-meet-sdk-samples

- 应用商店客户端（可直接使用）
	- 在 Google Play / App Store 搜索 “Jitsi Meet”

- 白标与集成建议
	- 源码白标：替换图标/名称/配色，预置你的服务器 URL 与鉴权策略；
	- SDK 集成：在现有 App 内嵌会控能力，结合 SSO/JWT 完成登录与权限；
	- 与本文档部署联动：将移动端默认指向自建域名（PUBLIC_URL），并确保 TURN 可用以适配弱网/NAT。

## 相关链接

- 官方文档与项目：
	- Jitsi Handbook：https://jitsi.github.io/handbook/
	- Jitsi Meet：https://github.com/jitsi/jitsi-meet
	- Docker（建议作为模板参考）：https://github.com/jitsi/docker-jitsi-meet
- 本站相关文档：
	- TURN/Coturn 配置与优化：[Coturn 文档](./coturn.md)
	- Janus 文档（端口与安全思路可参考）：[Janus 部署](./janus.md)
- [Kurento](https://github.com/Kurento/kurento)
- [Jitsi Dockers](https://hub.docker.com/u/jitsi/)
- [开发指南](https://jitsi.github.io/handbook/docs/category/developer-guide)
