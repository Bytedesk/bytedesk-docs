---
slug: meet-video-conference
title: "微语会议 Meet 升级：统一会议带来视频会议、屏幕共享与主持人录制"
authors: jackning
tags: [bytedesk, Meet, WebRTC, Janus, 开源]
---

继 0.1.0 Preview 音频会议之后，微语会议（Bytedesk Meet）完成了一次重要的统一会议升级：现在每一场会议都是「音频优先」的可视化会议——默认纯音频加入，不打扰摄像头；需要时，任何参与者都可以随时开启自己的摄像头或共享屏幕；主持人还可以一键录制会议。创建会议不再区分音频/视频类型，所有能力都通过会议界面底部工具栏按需提供。

本文介绍本次升级包含的能力、界面布局、技术架构与快速开始方式。

<!-- truncate -->

## 在线演示

- 会议客户端演示：[https://www.weiyuai.cn/meet/](https://www.weiyuai.cn/meet/)
- 会议管理后台演示：[https://www.weiyuai.cn/meetadmin](https://www.weiyuai.cn/meetadmin)

![微语会议客户端：会议室列表](/img/meet/meet_room_list.png)

## 本次升级包含什么

### 1. 统一会议：音频优先，视频按需

- 所有会议统一使用 Janus VideoRoom 插件承载，默认只采集麦克风加入会议，进入页面不会弹出摄像头授权
- 创建会议室无需选择媒体类型，进入会议后随时可升级为视频会议
- 单个会议默认支持最多 24 路同时发布（音视频），创建会议时可选择 6/12/24 人容量档位（可扩展）

### 2. 摄像头：头像列表 + 小视频窗

会议主区不再是大视频宫格，而是清爽的参与者头像列表：

- 任何参与者可随时开关自己的摄像头，开启后画面出现在其头像旁的小视频窗中，主区布局保持不变
- 通过发布者数据通道广播 `media-state`（camera / screen / none），观看端能准确区分对方推送的是摄像头画面还是屏幕画面
- 中途加入的参会者也能通过状态重发机制获得正确的媒体状态

### 3. 屏幕共享：独立窗口，人人可共享

- 任何参与者都可以共享整个屏幕或某个窗口，共享期间自动替换自己的摄像头画面
- 共享内容在独立的浮层窗口中展示，不挤占会议主区
- 关闭共享窗口只是隐藏，共享不会中断；点击共享者头像上的「正在共享」角标可随时重新打开窗口
- 通过工具栏按钮或浏览器原生「停止共享」结束共享，自动恢复摄像头或移除视频轨

### 4. 主持人录制

- 录制按钮仅主持人（会议室创建者）可见，后端同样强制校验，非主持人直接调用上传接口会被拒绝
- 主持人以本地视角录制（浏览器 MediaRecorder）：录到自己的麦克风、摄像头或正在共享的屏幕
- 录制期间切换视频源（如摄像头切换到屏幕共享）会自动分段上传，避免成品中途黑屏
- 停止录制或离开会议时自动上传并建立录制索引，无需手动保存

### 5. 会议录制管理

- 新增 `bytedesk_webrtc_meeting_recording` 表与一步式上传接口：主持人校验、文件落盘、建立索引一次完成
- 录制文件按 年/月/日 目录存储在 `bytedesk.webrtc.meeting.record.dir`（默认 `uploads/webrtc-meeting-recordings`）
- meet 控制台「录制」页面：按会议室查询录制列表、鉴权播放/下载、主持人删除；进入页面自动选中最近会议室并查询，录制完成即可看到记录
- meetAdmin 管理后台新增「会议录制」页面：组织维度分页展示（文件名/会议室/状态/时长/大小/格式/录制时间），支持鉴权播放与下载（`MEETING_RECORDING_READ` 角色权限控制）
- 上传限制：仅允许 webm/mp4 等浏览器录制格式，单文件最大 500MB

![会议录制管理](/img/meet/meet_recordings.png)

### 6. 通讯录一键发起会议

meet 新增通讯录页面（布局参考 desktop：左侧分类 + 右侧列表）：

- **组织成员**：搜索、分页加载，点击成员查看详情（职位/工号/联系方式），一键发起一对一会议
- **我的群组**：按群组一键发起会议，会议室自动以群组名命名
- 发起即创建会议室并自动复制邀请链接，弹窗可一键「进入会议」，链接发给同事即可加入

![通讯录一键发起会议](/img/meet/meet_contact_invite.png)

### 7. 主链路与体验保留

- 「创建会议 - 分享链接 - 加入会议 - 参会记录」主链路保持不变，参会记录（CDR 式）继续自动留存
- 麦克风权限预检、非安全上下文指引等 0.1.0 的能力全部保留，并对摄像头/屏幕共享提供同样的可操作提示

### 8. 其他修复

- 修复 1:1 通话默认在 Janus 服务端开启 `.mjr` 录制的隐患：现在默认不录制，显式请求录制时才开启
- meet 前端继续支持简体中文、繁体中文、English 三种语言

## 界面一览

```text
+------------------------------------------------------+
| 会议主区（默认无大视频）                                |
|  [头像+名字]  [头像+小视频窗]  [头像+名字]  ...          |
|                                  +------------------+ |
|                                  | 独立共享窗口（浮层）| |
|                                  |  XX 的屏幕 · 共享中 | |
|                                  +------------------+ |
+------------------------------------------------------+
| 工具栏：麦克风 摄像头 共享屏幕 录制(主持人) 参与者 链接 离开 |
+------------------------------------------------------+
```

![会议主界面：参与者头像列表与底部工具栏](/img/meet/meet_room_meeting.png)

## 技术架构

「浏览器直连 Janus WebSocket」的架构保持不变，会议承载从 AudioBridge 切换到 VideoRoom，后端仍不做信令转发：

| 层次 | 组成 | 说明 |
| --- | --- | --- |
| 媒体层 | Janus VideoRoom | SFU 媒体转发、房间管理、参与者事件；multistream 多流订阅 |
| 浏览器 | WebRTC + janus-gateway JS SDK | 纯音频发布起步，`replaceTracks` 按需升级/切换视频轨 |
| 数据通道 | publisher data channel | 广播 `media-state`，让观看端区分摄像头与屏幕画面 |
| 后端 | `modules/webrtc` + `enterprise/webrtc` | `RoomEntity`、`ParticipantEntity`、`MeetingRecordingEntity` 与 REST API |
| 前端 | `frontend/apps/meet` | `VideoRoomClient` 统一会议客户端、会议界面、录制管理页 |

几个关键设计：

- **会议号稳定映射**：邀请码 `inviteUid` 通过稳定哈希映射为 VideoRoom 房间号；创建房间时显式 `record:false`（不在服务端留 `.mjr`）、`publishers=6`、视频码率 `1024000`
- **音频优先发布**：加入后仅发布音频轨并保留只收视频 m-line，开摄像头/共享屏幕时 `replaceTracks` + 重新协商，失败自动回滚
- **录制边界**：本期录制的是主持人本地视角（主持人所看所听）；服务端整场混录（Janus `.mjr` + `janus-pp-rec` 后处理）在路线图中
- **安全边界**：录制上传接口从登录态取人并校验主持人身份；录制文件路径限定在存储根目录内；播放/下载需具备房间可见性（主持人/同组织/参与过）

## 快速开始

### 1. 启动 Janus 媒体服务器

```bash
cd deploy/docker
./start.sh webrtc
```

### 2. 启动微语后端

按常规方式启动 starter（默认已开启 `bytedesk.webrtc.janus.enabled=true`，并配置了 Janus WS 地址与 ICE 服务器）。

### 3. 启动 meet 前端

```bash
cd frontend
pnpm install
turbo dev --filter=meet
```

### 4. 开始第一次视频会议

1. 登录 [meet](https://www.weiyuai.cn/meet/)，新建会议室并复制邀请链接发给同事（也可在「通讯录」中选择同事或群组一键发起会议）
2. 同事打开链接、登录后加入会议，授权麦克风即可通话（默认纯音频，不会请求摄像头）
3. 需要时点击底部工具栏「开启摄像头」或「共享屏幕」
4. 主持人可点击「开始录制」，停止后在 meet 控制台的「录制」页面回看

![加入会议](/img/meet/meet_room_join.png)

> 提示：麦克风、摄像头与屏幕共享均要求安全上下文（HTTPS 或 localhost）。局域网 IP + HTTP 访问时，meet 会给出明确指引；生产环境建议通过 nginx 反代提供 HTTPS + WSS。

## 路线图

- 服务端整场录制（Janus 服务端混录 + 后处理）
- 会议密码、主持人强控（全体静音、移除参会者）
- 预定会议与快速会议
- 屏幕共享画中画（共享 + 摄像头同框）
- 参会实时统计、移动端

## 相关链接

- 微语官网：[https://www.weiyuai.cn](https://www.weiyuai.cn)
- 微语 GitHub：[https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)
- 问题反馈：[https://github.com/Bytedesk/bytedesk/issues](https://github.com/Bytedesk/bytedesk/issues)
