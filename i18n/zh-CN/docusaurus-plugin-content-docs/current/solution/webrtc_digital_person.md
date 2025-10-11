---
sidebar_label: AI智能数字人客服解决方案
sidebar_position: 25
---

# AI智能数字人客服解决方案

面向智能接待、引导分流、导购讲解、业务办理、培训宣贯与品牌IP化等场景，提供“可见可说可互动”的实时数字人客服：ASR+LLM+TTS 实时对话、口型驱动（viseme/phoneme）、表情与动作控制、打断（barge-in）、字幕与多语种播报；支持 Web 端 2D/3D 渲染或云端渲染回传，打通工单、CRM 与知识库，形成可观测、可质检、可持续优化的闭环。

---

## 1. 目标与 KPI

- 体验：端到端交互延迟（E2E）P95、口型同步误差（lip-sync offset）P95、打断响应时延、丢帧率/音频中断率。
- 效率：自助完成率、转人工命中率、平均交互轮次、知识命中率（RAG 命中/置信度）。
- 品牌与一致性：人设一致性评分、情感与礼貌合规度、脚本覆盖率。
- 合规：告知与水印、录制覆盖率、敏感内容拦截率、数据留存达标率。

---

## 2. 能力清单

- 数字人呈现：
	- 2D/3D Avatar：支持精灵图/Live2D/VRM/GLB 模型，WebGL/WebGPU 渲染。
	- 口型驱动：基于 phoneme/viseme 时间线驱动 blendshape/morph target。
	- 表情/动作：表情参数（快乐/惊讶/困惑等）、头部/手势预置动作、视线跟随。
	- 字幕与多语：实时字幕（中英双语可选）、气泡样式与高亮关键词。
- 实时对话：
	- ASR 实时转写（VAD 端点检测/热词），LLM 策略与记忆（短期/长期），TTS 流式合成（情感/语速/停顿）。
	- Barge-in：用户开始说话时即时打断 TTS/口型播放，进入聆听/理解状态。
- 多端支持：
	- Web：Chrome/Edge/Safari/Firefox 最新稳定版。
	- 移动端：iOS/Android WebView 或原生渲染（Unity/原生引擎）。
	- 云渲染：云端合成视频（RTC/RTMP 回传）以降低前端算力压力。
- 录制与回放：
	- 音频/渲染画面/字幕/转写/viseme 时间线统一打点，便于质检与检索。

---

## 3. 体系架构

- 前端：
	- WebRTC 音频上行（用户语音）与下行（TTS 播报）；DataChannel 传递 viseme/表情/动作事件。
	- 2D/3D 渲染器（Three.js/Babylon.js/Live2D/VRM），平滑滤波与插值（EMA/卡尔曼）。
- 媒体：
	- STUN/TURN 穿透与中继；多方场景可接入 SFU；可选云渲染 → RTC/RTMP → HLS/LL-RTC 回传。
- AI 管道：
	- ASR：流式/增量 + 时间戳；领域热词；静音端点检测。
	- Orchestrator：对话状态/记忆、工具调用（RAG/函数调用/业务接口）。
	- TTS：流式返回 + phoneme/viseme 时间线；情感/韵律参数；低时延缓冲策略。
	- Lip-sync：viseme→blendshape 映射与平滑；打断时快速衰减。
- 存储：
	- 录制/字幕/转写/事件时间线存储至对象存储与检索系统；签名 URL 访问控制。

---

## 4. 前端实现要点（示例片段）

音频与信令：

```ts
// 1) 采集用户麦克风并建立 RTCPeerConnection
const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false });
const pc = new RTCPeerConnection({ iceServers: [{ urls: ['stun:stun.l.google.com:19302'] }] });
stream.getAudioTracks().forEach(t => pc.addTrack(t, stream));

// 2) 远端 TTS 音频下行
pc.ontrack = (e) => {
	const audioEl = document.getElementById('ttsAudio') as HTMLAudioElement;
	audioEl.srcObject = e.streams[0];
	audioEl.play().catch(() => {/* 需用户交互后play */});
};

// 3) 数据通道承载 viseme/表情/动作事件
const dc = pc.createDataChannel('avatar');
dc.onopen = () => console.log('datachannel open');
dc.onmessage = (evt) => {
	const msg = JSON.parse(evt.data);
	if (msg.type === 'viseme') {
		// msg.payload: { time: number(ms), items: [{name: 'AA', weight: 0.8}, ...] }
		scheduleViseme(msg.payload);
	} else if (msg.type === 'emotion') {
		// { mood: 'happy', intensity: 0.6 }
		applyEmotion(msg.payload);
	} else if (msg.type === 'action') {
		// 预置动作，如点头/挥手
		playPresetAction(msg.payload);
	}
};

// 4) Barge-in：检测用户开口，通知后端打断
function onUserSpeakingDetected() {
	dc.send(JSON.stringify({ type: 'control', action: 'barge_in' }));
}
```

驱动 3D Avatar（以 Three.js + VRM 为例，示意）：

```ts
import * as THREE from 'three';
import { VRM, VRMSchema } from '@pixiv/three-vrm';

let vrm: VRM | null = null;

function scheduleViseme(payload: { time: number; items: Array<{ name: string; weight: number }>}) {
	// 简化：直接应用当前帧；生产中应做时间轴调度与平滑插值
	if (!vrm) return;
	const bs = vrm.blendShapeProxy;
	payload.items.forEach(({ name, weight }) => {
		// 映射：服务端 viseme → VRM BlendShape 名称（示例：A/I/U/E/O）
		const mapped = mapVisemeToVRM(name); // 自定义映射表
		if (mapped) bs?.setValue(mapped, weight);
	});
}

function applyEmotion(payload: { mood: string; intensity: number }) {
	if (!vrm) return;
	const bs = vrm.blendShapeProxy;
	const key = mapMoodToVRM(payload.mood);
	if (key) bs?.setValue(key, payload.intensity);
}
```

延迟预算与平滑：

- 目标：端到端交互 P95 ≤ 800ms，常见稳定在 300–600ms。
- 策略：TTS 分片 150–300ms；viseme 提前量（audio preroll）≈ 60–120ms；客户端 EMA 平滑滤波与插值。
- 打断：VAD 检测到人声即触发 control.barge_in，正在播放的音频与 viseme 采用快速衰减（半衰 80–120ms）。

---

## 5. 服务端关键点

- Orchestrator：
	- 轮次管理与端点检测：ASR 增量 + VAD，判断说话结束；支持半双工/全双工策略。
	- 记忆与工具：短期记忆（会话级）+ 长期记忆（用户画像/历史工单）；工具函数（RAG、业务接口）。
	- 安全与风格：话术模板、敏感词过滤、品牌人设/语气统一。
- TTS 与口型：
	- 选择支持 phoneme/viseme 时间线的 TTS 引擎；回传音频 chunk + 对齐时间戳。
	- viseme 压缩：仅回传关键点与插值参数，降低带宽。
	- 口型-声音对齐：对齐策略（timewarp/对时基），确保 offset < 120ms。
- 渲染链路：
	- 本地渲染：低延迟、端算依赖；适合交互场景。
	- 云端渲染：统一形象与效果；通过 RTC/RTMP → CDN 下发，适合大规模广播/展播。
- 观测与质检：
	- 指标：ASR/TTS P95 延时、lip-sync offset、丢帧率、VAD 误检/漏检率、barge-in 成功率。
	- 质检：礼貌/合规/知识覆盖率、表情与语气一致性、异常告警与复核。

---

## 6. 录制、回放与质检

- 录制：音频/渲染画面/字幕/转写/事件时间线（viseme/emotion/action）；加密存储与水印。
- 回放：时间轴对齐（音频/字幕/口型事件），支持书签与片段导出；签名 URL 控制访问。
- 质检：口型同步评分、情绪/礼貌用语、脚本覆盖与偏离；异常自动抽检。

---

## 7. 安全与合规

- 告知与水印：明确数字人身份与录制提示；播报与水印双通道提示。
- 隐私与最小化：默认仅音频上行；敏感信息脱敏；访问最小化授权。
- 加密：SRTP 端到端加密；信令 WSS/HTTPS；存储加密与访问审计。
- 权限：角色与细粒度授权（播放/下载/回放/导出）；审计日志与留痕。

---

## 8. 集成与 API（示例）

会话创建：

```json
{
	"sessionId": "sess_20251011_001",
	"persona": {
		"avatar": { "model": "vrm://bucket/avatar_001.vrm", "style": "pro" },
		"voice": { "lang": "zh-CN", "speaker": "female_001", "emotion": "friendly", "rate": 1.0 },
		"subtitle": { "enabled": true, "bilingual": false }
	},
	"ai": { "asr": { "hotwords": ["品牌名","产品名"] }, "rag": true, "bargeIn": true },
	"permissions": { "recording": "cloud" }
}
```

事件回调（webhook）：

```json
{
	"event": "conversation.summary",
	"sessionId": "sess_20251011_001",
	"summary": "用户咨询售后保修，已引导提交工单并预约回访。",
	"metrics": { "rounds": 6, "ragHit": 0.83, "bargeIn": 2 },
	"vod": { "audio": "https://cdn.example.com/vod/sess_20251011_001.m4a", "subtitle": "https://cdn.example.com/vod/sess_20251011_001.srt" }
}
```

---

## 9. 上线与运维

- 延迟优化：TTS 分片、音频预滚、viseme 提前量；弱网自适应与 JitterBuffer 调优。
- 监控告警：ASR/TTS P95 延时、lip-sync offset、丢帧率、VAD 命中率、barge-in 成功率、TURN 命中率。
- 容量规划：并发会话数、TTS/ASR 并发、渲染 GPU 资源、存储与带宽；峰谷弹性伸缩。
- 版本与降级：浏览器矩阵；降级路径（仅音频/仅字幕/IM + 回呼）。

---

## 10. UAT 验收清单

- 多端接入：Web/iOS/Android 互通；设备检测与权限提示正确；弱机型降级渲染正常。
- 口型与表情：lip-sync offset ≤ 120ms；表情/动作触发与衔接平滑。
- 对话质量：ASR 热词命中；RAG 命中与置信度；打断可靠与不丢句。
- 录制与回放：音频/字幕/事件时间线对齐；加密与签名访问；片段导出正常。
- 合规与安全：身份告知与水印；审计与告警；工单/CRM 回写成功。

---

相关方案：
- 视频：见《[AI智能视频客服解决方案](./webrtc)》
- 音频：见《[AI智能音频客服解决方案](./webrtc_audio)》
