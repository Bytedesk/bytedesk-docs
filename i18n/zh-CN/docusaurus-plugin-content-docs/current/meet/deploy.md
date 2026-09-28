---
title: 微语会议部署与配置指南
sidebar_label: 部署与配置
sidebar_position: 2
description: 微语会议开启与配置说明：Janus 媒体服务器、后端 webrtc.properties、meet 前端、meetAdmin 管理后台、HTTPS/WSS 反向代理与 REST API 参考
---

<!-- markdownlint-disable MD025 -->

# 部署与配置指南

本文说明如何在自建环境中开启、配置并运行微语会议，内容涵盖 Janus 媒体服务器、后端配置、meet 前端、meetAdmin 管理后台以及生产环境 HTTPS 部署。

<!-- truncate -->

## 架构总览

微语会议采用「浏览器直连 Janus WebSocket」的架构，后端不做信令转发：

```text
浏览器（meet 前端，WebRTC）
   │  WebSocket（信令）
   ▼
Janus 网关（VideoRoom 插件，音频优先统一会议）
   ▲
   │  REST（会议室、参会记录、录制、client-config）
后端（modules/webrtc + enterprise/webrtc）
```

| 组件 | 位置 | 职责 |
| ---- | ---- | ---- |
| Janus 网关 | `deploy/docker/compose/compose-janus.yaml` | 媒体服务器：VideoRoom（SFU）、媒体转发、参与者事件 |
| 后端 | `modules/webrtc`、`enterprise/webrtc` | `RoomEntity`、`ParticipantEntity`、`MeetingRecordingEntity`、REST API、Janus client-config |
| meet 前端 | `frontend/apps/meet` | 会议客户端（React + Vite，dev 端口 `9032`，basename `/meet`） |
| meetAdmin 后台 | `frontend/apps/meetAdmin` | 会议室/参会记录管理、Janus 监控 |

统一会议由 Janus **VideoRoom** 插件承载（multistream 多流订阅、音频优先发布、按需升级视频，默认最多 24 路同时发布，创建会议时可选择 6/12/24 容量档位）。旧 AudioBridge 客户端代码保留用于兼容，但会议页不再使用。

## 1. 启动 Janus 媒体服务器

```bash
cd deploy/docker
./start.sh webrtc
```

该命令启动 Janus 容器，端口映射如下：

| 宿主机端口 | 容器端口 | 协议 | 用途 |
| ---------- | -------- | ---- | ---- |
| `18188` | `8188` | WebSocket | Janus WS API（浏览器连接入口） |
| `18089` | `8088` | HTTP | Janus HTTP API（`ping` 健康检查用） |
| `18090` | `8089` | HTTPS | Janus HTTPS API（如启用 SSL transport） |
| `17188` | `7188` | WebSocket | Janus Admin WS API |
| `18091` | `7088` | HTTP | Janus Admin HTTP API（meetAdmin 监控用） |
| `11000-11200` | `10000-10200` | UDP | RTP 媒体端口段（生产环境防火墙需放行） |

验证 Janus 是否正常运行：

```bash
curl -sS -X POST -H 'Content-Type: application/json' \
  --data '{"janus":"ping","transaction":"check"}' \
  http://localhost:18089/janus
```

返回 `janus: pong` 即说明网关存活。

### Janus 关键配置（`deploy/janus/etc/janus/janus.jcfg`）

| 配置项 | 值 | 说明 |
| ------ | -- | ---- |
| `token_auth` | `false` | **必须**。存储型 token 认证与「浏览器直连 WS」架构不兼容：浏览器不携带 token，建 session 即 403 |
| `admin_secret` | 如 `janusoverlord` | 保护 Admin API；需与后端 `bytedesk.webrtc.janus.admin.secret` 一致 |

修改配置后重启容器：

```bash
docker restart janus-bytedesk
```

## 2. 配置后端

会议相关后端配置位于 `starter/src/main/resources/properties/<profile>/webrtc.properties`（`local`、`prod` 等）：

```properties
# 是否启用 Janus 后端接入（VideoRoom/AudioBridge/SIP/Admin）
bytedesk.webrtc.janus.enabled=true

# Janus WS 地址（本地 compose：18188 -> 8188）
bytedesk.webrtc.janus.ws-url=ws://127.0.0.1:18188/janus

# ICE 服务器（经 client-config 下发给前端）
bytedesk.webrtc.janus.ice-servers[0].urls=stun:127.0.0.1:13478
bytedesk.webrtc.janus.ice-servers[1].urls=turn:127.0.0.1:13478?transport=udp
bytedesk.webrtc.janus.ice-servers[1].username=bytedesk
bytedesk.webrtc.janus.ice-servers[1].credential=bytedesk123

# Janus Admin API（meetAdmin 监控）
bytedesk.webrtc.janus.admin.enabled=true
bytedesk.webrtc.janus.admin.ws-url=ws://127.0.0.1:17188/janus
bytedesk.webrtc.janus.admin.http-url=http://127.0.0.1:18091/admin
bytedesk.webrtc.janus.admin.secret=janusoverlord

# AudioBridge 默认参数
bytedesk.webrtc.janus.audio-bridge.default-permanent=false

# 会议录制存储目录（主持人上传的浏览器录制，按 年/月/日 子目录存放）
bytedesk.webrtc.meeting.record.dir=uploads/webrtc-meeting-recordings
```

说明：

- `admin.secret` 必须与 `janus.jcfg` 中的 `admin_secret` 一致，否则 Janus 监控会 403。
- 会议录制：仅主持人可用的上传接口接受浏览器录制文件（webm/mp4 及其音频变体，单文件最大 500MB），存储在 `bytedesk.webrtc.meeting.record.dir`（默认相对工作目录）。播放/下载需具备房间可见性；上传与删除仅限会议室创建者。
- 生产环境应通过 `wss://`/`https://` 对外提供服务（见第 5 节），并通过环境变量（如 `BYTEDESK_JANUS_ADMIN_SECRET`）注入 admin 密钥，不要明文提交到仓库。
- 按常规方式启动 starter 即可，会议功能无需额外 profile。

## 3. 运行 meet 前端

```bash
cd frontend
pnpm install
turbo dev --filter=meet          # 开发服务器 http://localhost:9032/meet
```

web 端路由 basename 为 `/meet`，因此会议邀请链接形态为 `http://<host>:9032/meet/room/{inviteUid}`。

生产构建时，将 `dist` 产物交由反向代理按 `/meet/` 路径对外提供服务。

## 4. 运行 meetAdmin 管理后台

```bash
cd frontend
turbo dev --filter=meetAdmin
```

管理后台提供：

- 会议室与参会记录管理（权限控制）
- 会议录制管理：按组织浏览、播放、下载会议录制（「录制」页面，`MEETING_RECORDING_READ` 权限）
- Janus 服务器监控：服务器信息、运行配置、活动会话、Token 页面（仅超级管理员可见），数据来自上文配置的 Admin HTTP API

## 5. 生产部署：HTTPS + WSS

浏览器仅在安全上下文（HTTPS 或 localhost）下开放麦克风采集。局域网/生产环境请：

1. 在 nginx 终止 TLS，将 meet 前端反代到 `/meet/` 路径（SPA 回退：`try_files $uri $uri/ /meet/index.html;`），meetAdmin 反代到 `/meetadmin/`。
2. 将 Janus WebSocket 反代到宿主机 `18188` 端口并对外暴露为 `wss://janus.example.com/janus`，随后相应修改 `bytedesk.webrtc.janus.ws-url`。
3. 配置公网可达的 STUN/TURN（`ice-servers`，如 coturn），确保严格 NAT 环境下的参会者也能连通。
4. Janus Admin API 不要直接暴露公网——绑定内网网卡或经访问控制的代理转发；其本身已由 `admin_secret` 保护。

nginx 参考片段（`www.weiyuai.cn` 在用，完整配置见 `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_443.conf`）：

```nginx
location /meet/ {
    try_files $uri $uri/ /meet/index.html;
}
location /meetadmin/ {
    try_files $uri $uri/ /meetadmin/index.html;
}
```

Janus 建议使用独立域名（如 `janus.weiyuai.cn`），WebSocket 反代必须携带升级头并放宽读超时（参考 `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_janus_443.conf`）：

```nginx
# janus.<your-domain> 虚拟主机
location ^~ /janus {
    proxy_pass http://127.0.0.1:18188;      # 宿主机端口 18188 -> 容器 8188
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_read_timeout 86400;               # WebSocket 长连接
    proxy_buffering off;
}

# Janus Admin HTTP API（可选，仅内网/受控暴露；已由 admin_secret 保护）
location /admin/ {
    proxy_pass http://127.0.0.1:18091;      # 宿主机端口 18091 -> 容器 7088
}
```

对应的后端生产配置示例（`properties/prod/webrtc.properties`，`weiyuai.cn` 在用）：

```properties
bytedesk.webrtc.janus.ws-url=wss://janus.weiyuai.cn/janus
bytedesk.webrtc.janus.admin.http-url=https://janus.weiyuai.cn/admin
bytedesk.webrtc.janus.ice-servers[0].urls=stun:coturn.weiyuai.cn:3478
bytedesk.webrtc.janus.ice-servers[1].urls=turn:coturn.weiyuai.cn:3478
```

注意：STUN/TURN（coturn）走 UDP/TCP 直连（如 `coturn.weiyuai.cn:3478`），nginx 无法反代该类协议；如需为 coturn 域名提供监控/说明页，可参考 `deploy/nginx/weiyuai.cn/sites-available/weiyuai_cn_coturn_443.conf`（仅 HTTPS 静态页，与 STUN/TURN 流量本身无关）。

## 6. REST API 参考

所有接口均需登录态（与微语账号体系一致）。

### 会议室（`/api/v1/room`）

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| POST | `/create` | 创建会议室 |
| POST | `/update` | 更新会议室 |
| POST | `/delete` | 删除会议室 |
| POST | `/join` | 按 `inviteUid`（或 `uid`）加入会议：记录参与关系并返回会议室信息 + 展示昵称 + 主持人 uid（用于前端仅对主持人展示录制按钮） |
| GET | `/query/org` | 查询组织内会议室 |
| GET | `/query/user` | 查询当前用户创建/加入过的会议室 |
| GET | `/query/uid` | 按 uid 查询会议室 |
| GET | `/export` | 导出会议室 |

### 参会记录（`/api/v1/participant`）

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| POST | `/join` | 记录参会加入（幂等） |
| POST | `/leave` | 结算参会离开（幂等；计算时长并自动结算遗留 JOINED 记录） |
| GET | `/query/room?roomUid=` | 查询会议室的参会记录 |

### 会议录制（`/api/v1/meeting-recording`）

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| POST | `/upload` | 主持人上传浏览器录制（multipart：`roomUid`、可选 `duration`、`file`）；校验主持人身份、落盘、建索引一步完成 |
| GET | `/query/org` | 组织维度分页查询录制列表，供 meetAdmin 后台使用（`MEETING_RECORDING_READ` 权限） |
| GET | `/query/room?roomUid=` | 按会议室查询录制列表（需房间可见性） |
| GET | `/{uid}/content` | 鉴权流式播放/下载录制文件（需房间可见性；追加 `?download=true` 以附件形式下载） |
| POST | `/delete` | 删除录制（仅主持人；同时删除索引与文件） |

### Janus client-config（企业版）

meet 前端启动时从后端 client-config 接口拉取 WS 地址与 ICE 服务器，因此浏览器需能同时访问 `/api` 与 Janus WS。

## 7. 常见问题排查

| 现象 | 原因 | 解决办法 |
| ---- | ---- | -------- |
| 加入会议报 `Unauthorized request (wrong or missing secret/token)` | `janus.jcfg` 中 `token_auth = true` | 改为 `token_auth = false` 并重启 Janus 容器 |
| 报 `TypeError: Cannot read properties of undefined (reading 'getUserMedia')` | 非 localhost 的 HTTP 访问（非安全上下文） | 改用 localhost、配置 HTTPS，或测试期设置浏览器安全白名单 |
| 摄像头或屏幕共享不可用 | 非安全上下文，或 `getDisplayMedia` 未在用户手势内发起 | 使用 HTTPS 或 localhost；始终通过工具栏按钮点击发起共享 |
| 麦克风权限被拒绝 | 浏览器拦截了麦克风 | 点击地址栏锁图标允许麦克风后重新加入 |
| 录制上传被拒（403） | 上传者不是会议室创建者，或文件类型/大小不允许 | 仅主持人可上传；文件须为浏览器录制格式（webm/mp4 及音频变体）且不超过 500MB |
| meetAdmin Janus 监控 403 | `admin.secret` 与 `janus.jcfg` 的 `admin_secret` 不一致 | 两处对齐后重启 |
| Janus 健康检查失败 | Janus 容器未启动或 WS 地址错误 | `docker ps` 检查容器，核对端口映射与 `ws-url` |
| 参会记录缺失 | 旧版前端未调用 join/leave | 升级到最新 meet 前端 |

## 8. 数据库表

会议相关表在本地/开发环境由 JPA `ddl-auto` 管理：

| 表名 | 实体 | 用途 |
| ---- | ---- | ---- |
| `bytedesk_webrtc_room` | `RoomEntity` | 会议室（名称、`inviteUid`、类型、描述等） |
| `bytedesk_webrtc_participant` | `ParticipantEntity` | CDR 式参会记录（加入/离开时间、时长、主持人、状态） |
| `bytedesk_webrtc_meeting_recording` | `MeetingRecordingEntity` | 会议录制索引（会议室、上传人、文件路径、类型、大小、时长、状态） |

## 相关链接

- 微语官网：[https://www.weiyuai.cn](https://www.weiyuai.cn)
- 微语 GitHub：[https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)
- 问题反馈：[https://github.com/Bytedesk/bytedesk/issues](https://github.com/Bytedesk/bytedesk/issues)
- Janus WebRTC Gateway：[https://github.com/meetecho/janus-gateway](https://github.com/meetecho/janus-gateway)
