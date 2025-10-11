---
sidebar_label: AI智能视频客服解决方案
sidebar_position: 23
---

# AI智能视频客服解决方案

面向客服、售后、远程诊疗/质检、政务咨询等场景，提供一体化的视频客服能力：WebRTC 实时音视频、屏幕共享、远程协助、录制与回放、AI 视频分析；支持移动端与 PC 端一致体验，并与工单、CRM、知识库打通，形成闭环服务与质检体系。

![WebRTC 架构示意](/img/solution/webrtc_arch.svg)

---

## 1. 目标与 KPI

- 体验：首呼接通率、首帧时间、卡顿率、平均延时（RTT/抖动）、分辨率自适应成功率。
- 效率：问题一次解决率（FCR）、人均处理时长（AHT）降低、远程协助替代上门比例。
- 合规：录制覆盖率、敏感操作留痕、用户告知与同意率、数据留存达标率。

---

## 2. 能力清单

- WebRTC 实时通话：P2P 或 SFU 架构，Opus/H.264/H.265/AV1，自适应码率和网络抗丢包。
- 屏幕共享：getDisplayMedia 支持全屏/窗口/标签页共享；共享端与查看端权限控制。
- 远程协助：
	- 光标/高亮标注：客服端可在用户屏幕上标注重点区域（仅视觉提示，无控制权限）。
	- 表单与脚本联动：在通话侧边栏同步打开工单/脚本步骤，降低操作成本。
	- 安全可选：若业务需要远程控制，建议通过企业级远控 SDK，WebRTC 仅承载音视频/数据通道。
- 录制与回放：客户端本地录制（MediaRecorder）与服务端云录（SFU 侧录），生成 MP4/WEBM 与 HLS/VOD；支持时间轴书签与片段导出。
- AI 视频分析：
	- ASR 转写与摘要：对话转写、要点提取、下一步建议。
	- 视觉检测：镜头遮挡/低光/离屏提醒；可选人脸模糊化与敏感信息遮盖。
	- 质检打分：礼貌用语、合规用语、脚本覆盖率、情绪与静默检测。
- 多端支持：
	- Web：Chrome/Edge/Safari/Firefox 最新稳定版；弱网提示与设备诊断。
	- 移动端：iOS（WKWebView/Safari PWA）与 Android（Chrome/系统 WebView）；原生/混合 App 可嵌入 WebView 或使用原生 WebRTC SDK。
	- 桌面端：Electron/Chromium 内核应用可复用同一 JS SDK。
- 辅助能力：设备检测（摄像头/麦克风/扬声器）、回环测试、网络测速（STUN/带宽探测）、降噪与回声消除（AEC/NS/AGC）。

---

## 3. 体系架构

- 信令服务：WebSocket/REST 建立与维护会话、分发 SDP/ICE 候选、鉴权与队列控制。
- 媒体服务：
	- STUN/TURN：NAT 穿透与中继，建议自建高可用集群，配置 TLS/UDP/TCP 三栈。
	- SFU（选择性转发）：在多方/录制/AI 分析场景中转发媒体流，便于云侧录制与多路分发。
- 存储与回放：录制切片存储至对象存储（S3/OSS），通过 CDN/HLS 点播；权限受控与签名 URL。
- AI 分析：对接流式 ASR、摘要模型与视觉推理服务；可选离线批处理与实时分析两种模式。
- 集成：与工单/CRM/知识库/质检系统对接；会话上下文与录制链接回写工单。

---

## 4. 前端实现要点（示例片段）

设备与通话基础：

```ts
// 获取本地媒体
const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: {width: {ideal: 1280}, height: {ideal: 720}}});
localVideo.srcObject = stream;

// 屏幕共享
const screen = await navigator.mediaDevices.getDisplayMedia({video: true, audio: false});

// RTCPeerConnection
const pc = new RTCPeerConnection({iceServers: [{urls: ['stun:stun.l.google.com:19302']}]});
stream.getTracks().forEach(t => pc.addTrack(t, stream));

// 自适应码率与带宽建议（可根据网络探测调整）
const sender = pc.getSenders().find(s => s.track?.kind === 'video');
await sender?.setParameters({encodings: [{maxBitrate: 1200_000, scalabilityMode: 'L1T3'}]});

// 录制（本地录制示例）
const rec = new MediaRecorder(stream, {mimeType: 'video/webm;codecs=vp9,opus'});
const chunks: BlobPart[] = [];
rec.ondataavailable = e => chunks.push(e.data);
rec.onstop = () => {
	const blob = new Blob(chunks, {type: 'video/webm'});
	// 上传到后端或保存为文件
};
rec.start();
```

数据通道（用于远程协助标注/脚本同步）：

```ts
const dc = pc.createDataChannel('assist');
dc.onopen = () => dc.send(JSON.stringify({type: 'cursor', x: 0.5, y: 0.4}));
dc.onmessage = (e) => {
	const msg = JSON.parse(e.data);
	if (msg.type === 'highlight') {
		// 在前端绘制高亮框或箭头
	}
};
```

---

## 5. 服务端关键点

- 信令：
	- 鉴权：短期 Token（JWT）+ 会话级权限（是否允许屏幕共享/录制）。
	- 房间与成员状态：主持/来宾角色；队列和坐席路由；掉线重连与恢复订阅。
	- 指标：会话事件（加入/离开/失败）、候选收敛时间、SDP 协商失败率。
- 媒体：
	- TURN 亲和：尽量让媒体走 UDP；受限网络回退 TCP/TLS；就近选路与健康探测。
	- SFU 录制：服务端合并或分轨录制，生成时间码，便于 AI/质检对齐。
	- 编码：H.264 兼容性好；AV1/VP9 在性能允许时降低带宽；移动端优先硬编解码。
- AI 管道：
	- 实时：音频旁路给 ASR，转写回流叠加到时间轴；可配置关键词/敏感词提醒。
	- 离线：录制完成后批处理摘要、质检评分、镜头问题检测，产出报告并回写工单。

---

## 6. 录制、回放与质检

- 本地录制：适合单方留存或隐私受限场景；注意浏览器权限与文件大小限制。
- 云侧录制：统一口径与加密存储；支持片段导出与水印；通过签名 URL 控制访问。
- 回放：HLS/DASH 自适应，倍速、书签与片段批注；与对话转写时间轴对齐展示。
- 质检：模板化规则（礼貌/保密/脚本覆盖）、AI 评分与抽检；异常告警与复核流程。

---

## 7. 安全与合规

- 告知与同意：进入视频前显著提示；单独提示录制；提供拒绝与退出通道。
- 隐私与最小化：默认关闭屏幕共享与摄像头；仅在需要时启用；支持背景虚化/打码。
- 加密：WebRTC SRTP 端到端加密；信令使用 WSS/HTTPS；录制加密存储与访问日志。
- 权限：角色与细粒度授权（共享/录制/下载/回放）；审计日志与导出控制。

---

## 8. 集成与 API（示例）

发起视频会话：

```json
{
	"roomId": "rm_20251003_001",
	"members": [{"id": "agent_1", "role": "host"}, {"id": "user_9", "role": "guest"}],
	"permissions": {"screen": true, "recording": "cloud"}
}
```

会话回调（webhook）：

```json
{
	"event": "recording.completed",
	"roomId": "rm_20251003_001",
	"vod": {"url": "https://cdn.example.com/vod/rm_20251003_001.m3u8", "tracks": ["agent","user","screen"]},
	"transcriptUrl": "https://api.example.com/asr/rtf/rm_20251003_001.json",
	"idempotencyKey": "evt_abc123"
}
```

---

## 9. 上线与运维

- 弱网优化：码率上下限、分辨率自适应、冗余 FEC、NACK、带宽探测与自适应发送。
- 监控告警：ICE 成功率、协商失败率、RTT/抖动/丢包、SFU 订阅失败、TURN 命中率。
- 容量规划：并发会话数、SFU 每节点路数、录制 IO 带宽、ASR 并发与队列长度。
- 版本兼容：浏览器版本矩阵与降级路径（仅音频/IM + 回呼）。

---

## 10. UAT 验收清单

- 多端接入：Web/iOS/Android/桌面互通，设备检测通过；屏幕共享权限提示正确。
- 通话质量：首帧与卡顿指标达标；弱网下可用（丢包 10%/抖动 40ms 场景）。
- 远程协助：光标/高亮/脚本联动可用；权限与审计生效。
- 录制与回放：云录生成、加密存储、签名访问；书签/片段导出正常。
- AI 分析：ASR/摘要与时间轴对齐；质检评分与告警命中；工单回写成功。

---

相关方案：
- 呼入智能接待：见《[呼入智能接待解决方案](./call_in_auto)》
- 售后服务工单：见《[售后服务工单解决方案](./ticket_after_sales)》
- 客户管理 SCRM：见《[客户管理 SCRM 解决方案](./scrm)》
