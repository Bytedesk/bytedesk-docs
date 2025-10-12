---
sidebar_label: OpenSIPS
sidebar_position: 17
---

# OpenSIPS

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS（或任意主流 Linux）
- 服务器推荐配置：2 核 2G 内存（仅信令转发可更低）
- OpenSIPS 角色：SIP 信令代理/注册服务器/负载均衡器（不处理媒体）
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [OpenSIPS 官方文档](https://opensips.org/) 与模块手册。
:::

## 简介

OpenSIPS 是高性能的开源 SIP 服务器，常用于：

- 作为“边界/入口”SIP 代理与注册服务器（Registrar）
- 对后端媒体/业务服务器（如 FreeSWITCH）做负载均衡与故障切换
- 提供 NAT 适配、速率限制、访问控制、SIP 防火墙等安全能力

在微语体系里，常见架构是：终端设备/WebRTC → OpenSIPS（SIP 边界）→ FreeSWITCH 集群（媒体与业务处理）。

## OpenSIPS 与 FreeSWITCH 的对比与关系

- 定位与能力
	- OpenSIPS：SIP 代理/注册/路由/负载均衡，擅长高并发信令转发，不处理媒体（RTP）。
	- FreeSWITCH：软交换/媒体服务器（B2BUA），负责通话建立、编解码、会议、IVR、录音等媒体与业务逻辑。
- 资源消耗与扩展
	- OpenSIPS：超轻量，单机即可承载大规模注册与高 QPS 信令；横向扩容简单。
	- FreeSWITCH：因处理媒体与业务，CPU/带宽消耗更高；通常通过前置 OpenSIPS 做横向伸缩与保护。
- 典型部署
	- 单用 FreeSWITCH：小规模、功能型快速落地。
	- OpenSIPS + FreeSWITCH：生产级架构，OpenSIPS 负责边界、鉴权、LB 与安全；FreeSWITCH 专注媒体/业务。
- 何时选谁
	- 只需 PBX/IVR/会议/录音：FreeSWITCH 即可。
	- 面向公网、大并发、需要多集群调度与抗攻击：在 FreeSWITCH 前增加 OpenSIPS。

> 结论：两者是互补关系。OpenSIPS 处理“信令与路由”，FreeSWITCH 处理“媒体与业务”。

## 与 Kamailio 的对比与选择

OpenSIPS 与 Kamailio 都是成熟的高性能 SIP 代理/注册/路由服务器，能力高度重叠，二者可视为“并列替代”。选型可从以下角度权衡：

- 架构定位：二者均不处理媒体（RTP），常与 FreeSWITCH/RTPEngine 等组合。
- 配置与脚本：二者均采用强大的配置脚本与模块化路由；均支持丰富的路由分支与对话内处理；具体语法风格不同。
- 模块生态：常见模块场景（usrloc/registrar、dispatcher、dialog、topology hiding、权限控制、限速/防刷等）两边均有覆盖，细节与参数名有所差异。
- 运维工具：
	- OpenSIPS：opensips-cli/opensipsctl，便于查询 usrloc、dispatcher、对话等状态。
	- Kamailio：kamcmd/kamctl，运维体验也很成熟。
- 性能与扩展：两者均以极高的并发能力著称，横向扩展容易；性能差异更多取决于具体脚本与部署。
- 生态与经验：团队既有脚本/模块经验、周边工具链与社区支持，往往是更关键的选型因素。

实操建议：

- 团队熟悉哪一个就优先选哪一个；已有脚本/模板可复用可显著降低成本。
- 面向公网/多节点/高并发，建议前置 OpenSIPS 或 Kamailio，后端对接 FreeSWITCH 集群。
- 如需了解 Kamailio 版示例，可参见《[Kamailio](/docs/deploy/depend/kamailio)》。

## 安装方式选择

1. Docker 方式（推荐）：快速部署，易于回滚与扩容。
2. 软件包安装（Debian/Ubuntu 仓库或官方仓库）：简单稳定，便于系统级运维。
3. 源码编译：适合深度定制或使用最新特性。

## 方式一：Docker Compose 安装（推荐）

### 1.1 Docker 镜像信息

- 官方镜像：`opensips/opensips:3.5`（或最新稳定版）
- 配置路径：`/etc/opensips/opensips.cfg`

### 1.2 创建 Docker Compose 配置

在 `docker-compose.yml` 中添加一个服务示例（可与 FreeSWITCH 同网段部署）：

```yaml
services:
	opensips:
		image: opensips/opensips:3.5
		container_name: opensips-edge
		restart: always
		environment:
			- TZ=Asia/Shanghai
		# 如需在容器前台查看日志，可使用: command: ["/usr/sbin/opensips", "-FE", "-f", "/etc/opensips/opensips.cfg"]
		# 生产可简化后台运行: command: ["/usr/sbin/opensips", "-F", "-f", "/etc/opensips/opensips.cfg"]
		command: ["/usr/sbin/opensips", "-FE", "-f", "/etc/opensips/opensips.cfg"]
		ports:
			- "5060:5060/udp"
			- "5060:5060/tcp"
			- "5061:5061/tcp"   # SIP TLS（可选）
			- "5066:5066/tcp"   # WebSocket（可选，配合 proto_wss 模块）
			- "7443:7443/tcp"   # WebSocket Secure（可选）
		volumes:
			- ./opensips/opensips.cfg:/etc/opensips/opensips.cfg:ro
			- ./opensips/dispatcher.list:/etc/opensips/dispatcher.list:ro
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

创建 `./opensips/opensips.cfg`（以下为基于“无数据库/内存注册表”的简化示例，适合理解与快速起步；生产可迁移到数据库驱动与更完善的安全策略）：

```cfg
#### 基本设置 ####
log_level=3
mpath="/usr/lib/opensips/modules/"

# 监听所有 IPv4；如有公网/多网卡，建议显式指定 listen=udp:PUBLIC_IP:5060
listen=udp:0.0.0.0:5060
listen=tcp:0.0.0.0:5060

#### 模块加载 ####
loadmodule "proto_udp.so"
loadmodule "proto_tcp.so"
loadmodule "sl.so"
loadmodule "tm.so"
loadmodule "rr.so"
loadmodule "maxfwd.so"
loadmodule "textops.so"
loadmodule "sipmsgops.so"
loadmodule "xlog.so"
loadmodule "pv.so"
loadmodule "usrloc.so"
loadmodule "registrar.so"
loadmodule "auth.so"
loadmodule "dispatcher.so"

#### 模块参数 ####
modparam("usrloc", "db_mode", 0)              # 0: 内存注册表；生产可接入数据库
modparam("registrar", "default_expires", 600)
modparam("registrar", "max_expires", 3600)

# Dispatcher：将呼叫转发给后端 FreeSWITCH 列表
modparam("dispatcher", "list_file", "/etc/opensips/dispatcher.list")
modparam("dispatcher", "flags", 2)            # 2=使用权重轮询；可按需调整算法

#### 路由逻辑 ####
route {
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
		if (is_method("BYE|ACK")) { route(RELAY); exit; }
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

创建 `./opensips/dispatcher.list`（后端 FreeSWITCH 节点列表，权重可按机器性能调整）：

```text
# setid  destination                    flags  priority  attrs
1 sip:10.0.0.11:5080;transport=udp      0      50
1 sip:10.0.0.12:5080;transport=udp      0      50
# 若使用 TCP：
# 1 sip:10.0.0.11:5080;transport=tcp    0      50
```

> 说明：上例假设 FreeSWITCH 对外使用 external 配置（默认 5080）。若使用 internal（5060），请相应修改端口。

### 1.4 启动与查看状态

- 启动容器后，查看日志中是否出现 “listen= udp: 0.0.0.0:5060”。
- 常用命令（容器内）：
	- `opensips-cli -x mi ds_list` 查看后端列表
	- `opensips-cli -x mi ds_reload` 重新加载 `dispatcher.list`
	- `opensips-cli -x mi ul_dump` 或 `opensipsctl ul show` 查看注册状态

## 方式二：Debian/Ubuntu 软件包安装

```bash
apt update
apt install -y opensips

# 主配置文件：/etc/opensips/opensips.cfg
# Dispatcher 列表：/etc/opensips/dispatcher.list
systemctl enable --now opensips
systemctl status opensips
```

> 生产环境建议：
> - 将 usrloc/registrar 切换为数据库持久化（如 MySQL/PostgreSQL）
> - 结合 fail2ban/iptables/限速/防刷模块做安全加固
> - 开启 TLS/WSS 时妥善管理证书与密钥（参考 tls_mgm、proto_wss 等模块）

## 与 FreeSWITCH 的对接

### 3.1 OpenSIPS → FreeSWITCH

- 在 `dispatcher.list` 中维护可用的 FreeSWITCH external 节点（默认 5080/UDP）。
- OpenSIPS 接收外部终端的 SIP 请求，按策略选择某个 FreeSWITCH 节点转发。

### 3.2 FreeSWITCH 信任 OpenSIPS 边界

在 FreeSWITCH 服务器上，建议将 OpenSIPS 出口 IP 加入信任/ACL，避免二次鉴权导致回环（与 Kamailio 场景相同）：

```xml
<!-- /usr/local/freeswitch/conf/autoload_configs/acl.conf.xml -->
<list name="trusted" default="deny">
	<node type="allow" cidr="10.0.0.0/8"/>
	<node type="allow" cidr="192.168.0.0/16"/>
	<!-- OpenSIPS 出口公网IP（按需填写） -->
	<!-- <node type="allow" cidr="203.0.113.10/32"/> -->
	<!-- 明确添加 OpenSIPS 容器所在主机网卡 IP -->
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

> 提示：可在 FreeSWITCH external profile（`sip_profiles/external.xml`）中确认是否需要取消“来话鉴权”，避免从 OpenSIPS 转发来的呼叫被拒绝。

### 3.3 WebRTC 方案选择

- 简化方案：直接让终端 WebRTC 连接 FreeSWITCH（WSS:7443/WS:5066），OpenSIPS 只做 SIP/UDP/TCP 边界。
- 标准边界方案：让 WebRTC 连接到 OpenSIPS 的 WS/WSS，再由 OpenSIPS 转发到 FreeSWITCH。此时通常需要部署媒体代理（如 rtpengine）以解决 NAT/ICE 场景的媒体中转。

## 需要开放的端口

| 端口 | 协议 | 说明 |
| ---- | ---- | ---- |
| 5060 | UDP/TCP | SIP 信令（核心必需） |
| 5061 | TCP | SIP TLS（可选，建议生产启用） |
| 5066 | TCP | SIP over WebSocket（可选） |
| 7443 | TCP | SIP over WebSocket Secure（可选） |

> 注意：OpenSIPS 不承载 RTP 媒体流，RTP 端口范围由后端 FreeSWITCH 或媒体代理（rtpengine/rtpproxy）开放。

## 验证与排障

### 5.1 快速验证

- 使用 `sngrep` 抓取 5060 端口，确认 REGISTER/INVITE 是否到达 OpenSIPS 并被转发。
- `opensips-cli -x mi ds_list` 查看后端是否加载；`opensips-cli -x mi ds_reload` 热更新列表。
- 终端注册后，`opensips-cli -x mi ul_dump` 或 `opensipsctl ul show` 可查看在线状态。

### 5.2 常见问题

1. 反复 401/407 鉴权循环：
	 - 可能 OpenSIPS 与 FreeSWITCH 同时对来话鉴权，导致回环。让 OpenSIPS 负责外部鉴权，FreeSWITCH 对来自 OpenSIPS 的来话放行（ACL 信任）。
2. 单向/无声音：
	 - 媒体（RTP）未达，检查 FreeSWITCH 的 RTP 端口范围与云安全组；公网/NAT 场景考虑引入 rtpengine 并在 OpenSIPS 中正确标记方向。
3. 488 Not acceptable here：
	 - 编解码不匹配。确保终端、FreeSWITCH 支持的编解码一致（如 PCMU/PCMA/OPUS）。
4. 477/479/Timeout：
	 - NAT/路由问题。检查 DNS、外网 IP 公布、Record-Route/Contact、NAT 处理（如 set_contact_alias() 等）是否正确。

## 与微语系统的对接建议

当微语启用呼叫中心功能时：

- 小规模/内网：可直接接入 FreeSWITCH，无需 OpenSIPS。
- 生产/公网/多节点：在 FreeSWITCH 前置 OpenSIPS 做入口与负载均衡，将注册与 INVITE 统一打到 OpenSIPS，再分发到后端 FreeSWITCH 集群。

参考：

- FreeSWITCH 部署与端口说明见《[Freeswitch 安装指南](/docs/deploy/depend/freeswitch)》。
- 另可参考《[Kamailio](/docs/deploy/depend/kamailio)》，两者用法与思路高度相近。

## 参考链接

- OpenSIPS 官网与文档：https://opensips.org/
- 源码仓库：https://github.com/OpenSIPS/opensips
- 模块参考（选择对应版本）：https://opensips.org/html/docs/modules/
