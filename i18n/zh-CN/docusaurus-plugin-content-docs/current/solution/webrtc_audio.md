---
sidebar_label: AI智能音频客服解决方案
sidebar_position: 24
---

# AI智能音频客服解决方案

面向呼入接待、质检坐席、语音导览与业务办理等场景，提供端到端的实时音频客服能力：基于 WebRTC 的音频通话、ASR 转写、TTS 复述、打断（Barge-in）、静音/回声抑制、录音与回放、AI 语音质检与知识驱动应答；支持网页与移动端一致体验，并与工单、CRM、知识库、质检平台打通。

---

## 1. 目标与 KPI

- 体验：首呼接通率、首音到达时间（TTFV）、平均延时（RTT/抖动）、打断响应时延、语音识别准确率（WER/CER）。
- 效率：一次解决率（FCR）、人均处理时长（AHT）降低、IVR 自助分流率、转人工命中率。
- 合规：录音覆盖率、用户告知与同意率、关键词/敏感词留痕、质检抽检覆盖率。

---

## 2. 能力清单

- 实时音频通话：WebRTC（Opus）端到端加密，降噪/回声消除/自动增益（AEC/NS/AGC）。
- 通道限定：
	- 仅通过 WebRTC 网络音频通道承载会话，不涉及传统电话/PSTN 直连。
	- 如需传统电话外呼/回呼，请参考《[AI智能外呼解决方案](./call)》。
- 语音 AI：
	- ASR 转写：实时/离线两种模式，支持多语种与方言可配，热词/领域自适应。
	- TTS 播报：多音色、情感参数、插值停顿与标点时长；支持流式与标注（SSML）。
	- Barge-in 打断：用户说话时可即时打断 TTS 播报，切换监听/应答状态。
	- VAD/静音检测：基于能量门限或 WebRTC VAD，提升识别吞吐与响应速度。
- 录音与回放：
	- 客户端本地录音（MediaRecorder）与服务端侧录（SIP 端/媒体服务器）。
	- 生成分轨录音（坐席/用户）与时间码，便于质检与检索。
- 路由与联动：IVR/智能意图路由、队列/坐席分配、与工单/CRM/知识库联动。
- 多端支持：Web、移动端 WebView/原生 SDK、桌面端。

---

## 3. 体系架构

- 信令服务：WebSocket/REST 管理会话、鉴权、排队与坐席状态；对接工单/CRM 状态。
- 媒体服务：
	- STUN/TURN：NAT 穿透与中继，优先 UDP，回退 TCP/TLS。
	- 可选 SFU：在多方或需要云侧录音/质检的场景转发媒体流，便于统一录音与打点。
- AI 管道：
	- 实时 ASR：旁路音频给 ASR 引擎，返回增量转写与时间戳。
	- 语义与检索：RAG/知识库命中、意图与槽位抽取、策略话术。
	- TTS 合成：流式小片段返回，支持打断控制；可做延迟预算与缓存。
- 存储与回放：录音/转写/书签存储至对象存储与检索系统，支持签名访问与脱敏。

---

## 4. 前端实现要点（示例片段）

设备与通话基础：

```ts
// 获取音频输入设备
const stream = await navigator.mediaDevices.getUserMedia({
	audio: {
		echoCancellation: true,
		noiseSuppression: true,
		autoGainControl: true,
		channelCount: 1,
		sampleRate: 48000,
		sampleSize: 16,
	},
	video: false,
});

const pc = new RTCPeerConnection({
	iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }],
});
stream.getAudioTracks().forEach(t => pc.addTrack(t, stream));

// 监听远端音频
pc.ontrack = (e) => {
	const audioEl = document.querySelector('#remoteAudio') as HTMLAudioElement;
	audioEl.srcObject = e.streams[0];
	audioEl.play().catch(() => {/* 需用户交互后play */});
};
```

本地录音与上传：

```ts
// 本地录音（与通话流同源或混音后）
const recStream = stream; // 或者使用AudioContext进行混音
const rec = new MediaRecorder(recStream, { mimeType: 'audio/webm;codecs=opus' });
const chunks: BlobPart[] = [];
rec.ondataavailable = (e) => chunks.push(e.data);
rec.onstop = async () => {
	const blob = new Blob(chunks, { type: 'audio/webm' });
	// 上传到后端
	await fetch('/api/upload/record', { method: 'POST', body: blob });
};
rec.start();
```

语音识别与打断（示意）：

```ts
// 假设有一个双向 WebSocket 与后端 ASR/TTS 服务交互
const ws = new WebSocket('wss://asr.example.com/stream');

// 将麦克风PCM片段推送给后端（需AudioWorklet或ScriptProcessor转码）
// 这里省略具体PCM编码细节，仅示意
function onPcmFrame(frame: ArrayBuffer) {
	ws.send(frame);
}

// 接收增量转写与TTS事件
ws.onmessage = (e) => {
	const msg = JSON.parse(e.data);
	if (msg.type === 'asr.partial' || msg.type === 'asr.final') {
		// 更新转写文本与时间戳
	}
	if (msg.type === 'tts.chunk') {
		// 播放TTS流片段，可使用SourceBuffer/AudioBuffer处理
	}
};

// Barge-in：用户开始说话时，通知后端打断当前TTS
function onUserSpeakingDetected() {
	ws.send(JSON.stringify({ type: 'control', action: 'barge_in' }));
}
```

---

## 5. 服务端关键点

- 信令与路由：
	- 鉴权与权限控制：JWT 短期令牌；是否允许外呼/录音/转人工。
	- 队列与坐席：排队策略（最短空闲/技能匹配），重试与超时；CTI 同步。
	- 指标观测：呼叫建立/失败原因、ICE 成功率、ASR/TTS 时延分位数。
- 媒体处理：
	- TURN 优先 UDP；在受限网络回退 TCP/TLS；健康检查与就近选路。
	- 采样与码率：首选 Opus 48kHz 单声道，16–32kbps 常见；弱网自适应。
	- 双讲与回声：AEC 结合回声路径建模；支持侧音抑制与自适应噪声门限。
- AI 管道：
	- 实时 ASR：增量结果 + 端点检测（VAD）；热词与领域自适应字典。
	- 意图/策略：NLU 意图路由、知识库 RAG、策略话术与安全过滤。
	- TTS：流式返回，小缓冲拼接；支持语速/音量/情感参数；打断与优先级队列。
	- 质检：关键词命中、情绪/静默、打断次数、话术覆盖率，异常告警。

---

## 6. 录音、回放与质检

- 录音：本地录音适合隐私受限；云侧录音集中管理与加密存储；分轨与时间码用于质检与检索。
- 回放：按会话回放与书签跳转；支持转写对齐显示与片段导出；权限与审计日志可追溯。
- 质检：模板化规则与 AI 评分结合抽检；异常会话（高静默、冲突说话、敏感词）优先复核。

---

## 7. 安全与合规

- 告知与同意：进入通话前/录音前显著提示；提供拒绝与退出路径。
- 隐私与最小化：默认静音/不录音，按需启用；对录音与转写支持脱敏与访问控制。
- 加密：SRTP 端到端加密；信令 WSS/HTTPS；存储加密与访问审计。
- 权限：按角色授权外呼/录音/下载/回放；导出控制与留痕。

---

## 8. 集成与 API（示例）

发起音频会话（WebRTC 通道）：

```json
{
	"callId": "call_20251011_001",
	"channel": "webrtc",
	"room": {
		"roomId": "rm_20251011_001",
		"members": [
			{"id": "agent_1", "role": "host"},
			{"id": "user_9", "role": "guest"}
		]
	},
	"ai": {"asr": true, "tts": true, "bargeIn": true},
	"permissions": {"recording": "cloud"}
}
```

会话回调（webhook）：

```json
{
	"event": "recording.completed",
	"callId": "call_20251011_001",
	"vod": {"url": "https://cdn.example.com/rec/call_20251011_001.webm", "tracks": ["agent","user"]},
	"transcriptUrl": "https://api.example.com/asr/call_20251011_001.json",
	"qa": {"score": 0.92, "warnings": ["silence.long", "keywords.missed"]}
}
```

---

## 9. 上线与运维

- 弱网优化：码率上/下限、自适应丢包隐藏（PLC）、冗余 FEC、NACK；VAD 门限优化。
- 监控告警：呼叫建立成功率、ICE 收敛时间、RTT/抖动/丢包、ASR/TTS P95 延时、录音上传失败。
- 容量规划：并发呼叫数、TURN 带宽、ASR/TTS 并发与队列、录音 IO；按峰谷弹性伸缩。
- 版本兼容：浏览器矩阵与降级（仅 IM 或回呼由《[AI智能外呼解决方案](./call)》承担）。

---

## 10. UAT 验收清单

- 多端接入：Web/移动互通，设备检测通过；麦克风权限与静音状态正确。
- 通话质量：首音与卡顿指标达标；弱网下可用（丢包 10%/抖动 40ms）。
- AI 能力：ASR 增量与热词命中；TTS 流式与打断可靠；知识库命中率达标。
- 录音与回放：云录生成、加密存储、签名访问；分轨/时间轴对齐；片段导出。
- 质检与合规：关键词、敏感词与静默检测；审计与告警生效；工单回写。

---

相关方案：
- 视频：见《[AI智能视频客服解决方案](./webrtc)》
- 数字人：见《[AI智能数字人客服解决方案](./webrtc_digital_person)》
