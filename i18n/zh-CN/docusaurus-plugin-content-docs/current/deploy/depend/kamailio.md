---
sidebar_label: Kamailio
sidebar_position: 16
---

# Kamailio

> 相关：如你偏好另一款同类边界代理，请参阅《[OpenSIPS](/docs/deploy/depend/opensips)》。两者能力高度相近，脚本与模块命名略有差异，选型可基于团队经验与生态偏好。

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS（或任意主流 Linux）
- 服务器推荐配置：2 核 2G 内存（仅信令转发可更低）
- Kamailio 角色：SIP 信令代理/注册服务器/负载均衡器（不处理媒体）
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [Kamailio 官方文档](https://www.kamailio.org/w/documentation/)。
:::

## 简介

Kamailio 是高性能的开源 SIP 服务器，常用于：

- 作为“边界/入口”SIP 代理与注册服务器（Registrar）
- 对后端媒体/业务服务器（如 FreeSWITCH）做负载均衡与故障切换
- 提供 NAT 适配、速率限制、访问控制、SIP 防火墙等安全能力

在微语体系里，常见架构是：终端设备/WebRTC → Kamailio（SIP 边界）→ FreeSWITCH 集群（媒体与业务处理）。

## Kamailio 与 FreeSWITCH 的对比与关系

- 定位与能力
	- Kamailio：SIP 代理/注册/路由/负载均衡，擅长高并发信令转发，不处理媒体（RTP）。
	- FreeSWITCH：软交换/媒体服务器（B2BUA），负责通话建立、编解码、会议、IVR、录音等媒体与业务逻辑。
- 资源消耗与扩展
	- Kamailio：超轻量，单机即可承载百万级注册与高 QPS 信令；横向扩容简单。
	- FreeSWITCH：因处理媒体与业务，CPU/带宽消耗更高；通常通过前置 Kamailio 做横向伸缩与保护。
- 典型部署
	- 单用 FreeSWITCH：小规模、功能型快速落地。
	- Kamailio + FreeSWITCH：生产级架构，Kamailio 负责边界、鉴权、LB 与安全；FreeSWITCH 专注媒体/业务。
- 何时选谁
	- 只需 PBX/IVR/会议/录音：FreeSWITCH 即可。
	- 面向公网、大并发、需要多集群调度与抗攻击：在 FreeSWITCH 前增加 Kamailio。

> 结论：两者是互补关系。Kamailio 处理“信令与路由”，FreeSWITCH 处理“媒体与业务”。

## 与 OpenSIPS 的对比与选择

Kamailio 与 OpenSIPS 都是成熟的 SIP 代理/注册/路由服务器，二者历史上同源，能力与性能均属业界一线。选型建议如下：

- 能力与定位：均不承载媒体（RTP），常与 FreeSWITCH/RTPEngine 搭配；均具备 usrloc/registrar、dispatcher、权限控制、NAT 辅助、限速与防刷等能力。
- 配置与脚本：两者脚本语法风格不同但思路一致；常见路由/事务/对话处理模式都能覆盖。
- 运维工具：
	- Kamailio：kamcmd/kamctl 使用广泛。
	- OpenSIPS：opensips-cli/opensipsctl 体验也很成熟。
- 性能与扩展：均支持极高并发与横向扩展，性能差异主要取决于场景与脚本实现。
- 生态与团队经验：已有模板与脚本复用价值很大；社区熟悉度、文档偏好与周边工具链往往决定选择。

简要结论：

- 团队更熟悉谁就选谁；已有脚本/模块的复用优先。
- 公网/多节点/高并发推荐前置 Kamailio 或 OpenSIPS，后端 FreeSWITCH 专注媒体与业务。
- 若需要 OpenSIPS 版本的示例或运维方式，可参考《[OpenSIPS](/docs/deploy/depend/opensips)》。

## 安装方式选择

1. Docker 方式（推荐）：快速部署，易于回滚与扩容。
2. 软件包安装（Debian/Ubuntu 仓库）：简单稳定，便于系统级运维。
3. 源码编译：适合深度定制或使用最新特性。

## 方式一：Docker Compose 安装（推荐）

### 1.1 Docker 镜像信息

- 官方镜像：`kamailio/kamailio:5.9`（或最新稳定版）
- 配置路径：`/etc/kamailio/kamailio.cfg`

### 1.2 创建 Docker Compose 配置

在 `docker-compose.yml` 中添加一个服务示例（可与 FreeSWITCH 同网段部署）：

```yaml
services:
	kamailio:
		image: kamailio/kamailio:5.9
		container_name: kamailio-edge
		restart: always
		environment:
			- TZ=Asia/Shanghai
		# 如需在容器前台查看日志，使用: command: ["kamailio", "-DD", "-E"]
		# 生产环境可简化为后台运行: command: ["kamailio", "-DD"]
		command: ["kamailio", "-DD", "-E", "-f", "/etc/kamailio/kamailio.cfg"]
		ports:
			- "5060:5060/udp"
			- "5060:5060/tcp"
			- "5061:5061/tcp"   # SIP TLS（可选）
			- "5066:5066/tcp"   # WebSocket（可选）
			- "7443:7443/tcp"   # WebSocket Secure（可选）
		volumes:
			- ./kamailio/kamailio.cfg:/etc/kamailio/kamailio.cfg:ro
			- ./kamailio/dispatcher.list:/etc/kamailio/dispatcher.list:ro
		networks:
			- bytedesk-network

	# 仅示例：后端 FreeSWITCH 可按需放在同一网络
	# freeswitch:
	#   image: registry.cn-hangzhou.aliyuncs.com/bytedesk/freeswitch:latest
	#   networks:
	#     - bytedesk-network

networks:
	bytedesk-network:
		driver: bridge
```

### 1.3 最小可用配置（核心片段）

创建 `./kamailio/kamailio.cfg`（以下为基于“无数据库/内存注册表”的简化示例，适合理解与快速起步；生产可迁移到数据库驱动与更完善的安全策略）：

```cfg
#!KAMAILIO
#### 基本设置 ####
debug=2
log_stderror=yes
memdbg=5
memlog=5

auto_aliases=no
# 监听所有 IPv4；如有公网/多网卡，建议显式指定 listen=udp:PUBLIC_IP:5060
listen=udp:0.0.0.0:5060
listen=tcp:0.0.0.0:5060
#!define WITH_TLS 0     # 需要 TLS 时改为 1 并补充 tls.cfg
#!define WITH_WS  0     # 需要 WebSocket(WSS) 时改为 1 并加载 websocket 模块

#### 模块加载 ####
loadmodule "sl.so"
loadmodule "tm.so"
loadmodule "tmx.so"
loadmodule "rr.so"
loadmodule "pv.so"
loadmodule "maxfwd.so"
loadmodule "textops.so"
loadmodule "siputils.so"
loadmodule "xlog.so"
loadmodule "kex.so"
loadmodule "usrloc.so"
loadmodule "registrar.so"
loadmodule "auth.so"
loadmodule "auth_db.so"   # 无数据库时可切换为 auth_ephemeral + htable；此处先演示静态用户略过
loadmodule "dispatcher.so"

# 可选：NAT 辅助、限速、安全等（生产建议开启并配置）
# loadmodule "nathelper.so"
# loadmodule "rtpengine.so"   # 若需在 Kamailio 侧做媒体代理，需部署 rtpengine

#### 模块参数 ####
modparam("rr", "enable_full_lr", 1)
modparam("rr", "append_fromtag", 1)

modparam("usrloc", "db_mode", 0)        # 0: 内存注册表；生产可设为3并接入数据库
modparam("registrar", "max_expires", 3600)
modparam("registrar", "default_expires", 600)

# Dispatcher：将呼叫转发给后端 FreeSWITCH 列表
modparam("dispatcher", "list_file", "/etc/kamailio/dispatcher.list")
modparam("dispatcher", "flags", 2)      # 2=使用权重轮询；可按需调整算法
modparam("dispatcher", "dst_avp", "$avp(ds_dst)")
modparam("dispatcher", "cnt_avp", "$avp(ds_cnt)")

#### 路由逻辑 ####
request_route {
		# 丢弃过深的转发链
		if (!mf_process_maxfwd(10)) { sl_send_reply("483", "Too Many Hops"); exit; }

		# 响应心跳
		if (is_method("OPTIONS") && $rU=="ping") { sl_send_reply("200", "OK"); exit; }

		# 处理对话内请求
		if (has_totag()) { route(WITHINDLG); exit; }

		# 注册
		if (is_method("REGISTER")) { save("location"); exit; }

		# 初始 INVITE 等转发到后端 FreeSWITCH
		route(DISPATCH);
}

route[WITHINDLG] {
		if (loose_route()) { route(RELAY); exit; }
		if (is_method("BYE")) { route(RELAY); exit; }
		if (is_method("ACK")) { route(RELAY); exit; }
		route(RELAY);
}

route[DISPATCH] {
		if (!ds_select_dst("1", "4")) {   # 选择组1，算法4（按权重轮询）
				sl_send_reply("500", "No FS Destinations"); exit;
		}
		xlog("L_INFO", "Routing to FS dst: $du\n");
		route(RELAY);
}

route[RELAY] {
		if (!t_relay()) { sl_reply_error(); }
		exit;
}
```

创建 `./kamailio/dispatcher.list`（后端 FreeSWITCH 节点列表，权重可按机器性能调整）：

```text
# setid  destination            flags  priority  attrs
1 sip:10.0.0.11:5080;transport=udp  0      50       
1 sip:10.0.0.12:5080;transport=udp  0      50       
# 若使用 TCP：
# 1 sip:10.0.0.11:5080;transport=tcp  0      50
```

> 说明：上例假设 FreeSWITCH 对外使用 external 配置（默认 5080）。若使用 internal（5060），请相应修改端口。

### 1.4 启动与查看状态

- 启动容器后，查看日志中是否出现 “listening on udp: 0.0.0.0:5060”。
- 常用命令（容器内）：
	- `kamcmd dispatcher.list` 查看后端列表
	- `kamcmd dispatcher.reload` 重新加载 `dispatcher.list`
	- `kamctl ul show` 查看注册状态（若镜像包含 kamctl）

## 方式二：Debian/Ubuntu 软件包安装

```bash
apt update
apt install -y kamailio kamailio-extra-modules kamailio-outbound-modules kamailio-websocket-modules

# 主配置文件：/etc/kamailio/kamailio.cfg
# Dispatcher 列表：/etc/kamailio/dispatcher.list
systemctl enable --now kamailio
systemctl status kamailio
```

> 生产环境建议：
> - 将 usrloc/registrar 切换为数据库持久化（如 MySQL/PostgreSQL）
> - 结合 fail2ban/iptables/限速模块做防刷与防攻击
> - 开启 TLS/WSS 时妥善管理证书与密钥

## 与 FreeSWITCH 的对接

### 3.1 Kamailio → FreeSWITCH

- 在 `dispatcher.list` 中维护可用的 FreeSWITCH external 节点（默认 5080/UDP）。
- Kamailio 接收外部终端的 SIP 请求，按策略选择某个 FreeSWITCH 节点转发。

### 3.2 FreeSWITCH 信任 Kamailio 边界

在 FreeSWITCH 服务器上，建议将 Kamailio 出口 IP 加入信任/ACL，避免二次鉴权导致回环：

```xml
<!-- /usr/local/freeswitch/conf/autoload_configs/acl.conf.xml -->
<list name="trusted" default="deny">
	<node type="allow" cidr="10.0.0.0/8"/>
	<node type="allow" cidr="192.168.0.0/16"/>
	<!-- Kamailio 出口公网IP（按需填写） -->
	<!-- <node type="allow" cidr="203.0.113.10/32"/> -->
	<!-- 明确添加 Kamailio 容器所在主机网卡 IP -->
	<node type="allow" cidr="10.0.0.5/32"/>
	<node type="allow" cidr="127.0.0.1/32"/>
	<node type="allow" cidr="::1/128"/>
	<node type="deny" cidr="0.0.0.0/0"/>
	<node type="deny" cidr="::/0"/>
	<node type="allow" cidr="192.168.1.0/24"/>
	<node type="allow" cidr="172.16.0.0/12"/>
</list>
```

重载配置：在 `fs_cli` 中执行 `reloadxml`。

> 提示：可在 FreeSWITCH external profile（`sip_profiles/external.xml`）中确认是否需要取消“来话鉴权”，避免从 Kamailio 转发来的呼叫被拒绝。

### 3.3 WebRTC 方案选择

- 简化方案：直接让终端 WebRTC 连接 FreeSWITCH（WSS:7443/WS:5066），Kamailio 只做 SIP/UDP/TCP 边界。
- 标准边界方案：让 WebRTC 连接到 Kamailio 的 WS/WSS，再由 Kamailio 转发到 FreeSWITCH。此时通常需要部署媒体代理（如 rtpengine）以解决 NAT/ICE 场景的媒体中转。

## 需要开放的端口

| 端口 | 协议 | 说明 |
| ---- | ---- | ---- |
| 5060 | UDP/TCP | SIP 信令（核心必需） |
| 5061 | TCP | SIP TLS（可选，建议生产启用） |
| 5066 | TCP | SIP over WebSocket（可选） |
| 7443 | TCP | SIP over WebSocket Secure（可选） |

> 注意：Kamailio 不承载 RTP 媒体流，RTP 端口范围由后端 FreeSWITCH 或媒体代理（rtpengine/rtpproxy）开放。

## 验证与排障

### 5.1 快速验证

- 使用 `sngrep` 抓取 5060 端口，确认 REGISTER/INVITE 是否到达 Kamailio 并被转发。
- `kamcmd dispatcher.list` 查看后端是否加载；`kamcmd dispatcher.reload` 热更新列表。
- 终端注册后，`kamctl ul show` 可查看在线状态（若安装了 kamctl）。

### 5.2 常见问题

1. 反复 401/407 鉴权循环：
	 - 可能 Kamailio 与 FreeSWITCH 同时对来话鉴权，导致回环。让 Kamailio 负责外部鉴权，FreeSWITCH 对来自 Kamailio 的来话放行（ACL 信任）。
2. 单向/无声音：
	 - 媒体（RTP）未达，检查 FreeSWITCH 的 RTP 端口范围与云安全组；公网/NAT 场景考虑引入 rtpengine 并在 Kamailio 中正确标记方向。
3. 488 Not acceptable here：
	 - 编解码不匹配。确保终端、FreeSWITCH 支持的编解码一致（如 PCMU/PCMA/OPUS）。
4. 477/479/Timeout：
	 - NAT/路由问题。检查 DNS、外网 IP 公布、Record-Route/Contact、`set_contact_alias()` 等 NAT 处理是否正确。

## 与微语系统的对接建议

当微语启用呼叫中心功能时：

- 小规模/内网：可直接接入 FreeSWITCH，无需 Kamailio。
- 生产/公网/多节点：在 FreeSWITCH 前置 Kamailio 做入口与负载均衡，将注册与 INVITE 统一打到 Kamailio，再分发到后端 FreeSWITCH 集群。

参考：

- FreeSWITCH 部署与端口说明见《[Freeswitch 安装指南](/docs/deploy/depend/freeswitch)》。

## 参考链接

- Kamailio 官网与文档：https://www.kamailio.org/
- 配置模块参考：https://kamailio.org/docs/modules/stable/
- 负载均衡（dispatcher）：https://kamailio.org/docs/modules/stable/modules/dispatcher.html
- NAT/媒体代理（rtpengine）：https://github.com/sipwise/rtpengine
