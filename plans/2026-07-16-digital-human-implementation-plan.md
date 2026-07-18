# 数字人网页嵌入与实时语音实施规划

> 日期：2026-07-16
> 状态：范围已确认，待拆解实现任务
> 范围：仅输出实施规划，不修改运行时代码
> 关联页面：[frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx)

## 1. 目标

本次目标不是先做一个完整 3D 数字人平台，而是先规划一条可落地、可分阶段交付、可逐步增强的数字人实现路径，满足以下业务目标：

1. 给定一张人物正面图，生成可用于数字人展示的多角度素材。
2. 将这些素材整理为前端可直接加载的统一资源包。
3. 在网页中嵌入数字人，并根据用户鼠标移动、悬停、点击产生视觉互动。
4. 复用现有实时语音链路，让数字人具备实时语音对话能力。
5. 首期优先完成“2.5D 数字人”而不是一步到位做高成本实时 3D 驱动。
6. 首期固定为插画风格数字人，并把“原图生成方案”纳入实施规划。
7. 首期仅落地 visitorCall 演示页，并单独定义数字人人设。

一句话：先做一个插画风格、能在 visitorCall 中嵌入、能看向用户、能响应鼠标、能和用户实时语音对话的轻量数字人 MVP，再决定是否升级为 Live2D 或 3D 方案。

## 1.1 已确认决策

当前范围已经确认，不再作为开放问题反复讨论：

1. 人物风格固定为插画风格。
2. 原图生成方案纳入本次规划，而不是要求先手工提供最终原图。
3. 首期只做 visitorCall 演示页，不同步扩展 visitorSdk。
4. 语音角色采用单独定义的数字人人设，不沿用实时语音测试页默认助手文案。
5. 首版采用“多角度 2D 精灵 + 简化口型”方案。

## 2. 现状判断

### 2.1 已有可复用能力

当前仓库已经具备一条可直接复用的实时语音通道：

1. 前端已有实时语音测试页 [frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx)。
2. 后端已有 Qwen-Audio Realtime WebSocket 中继处理器 [enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketHandler.java](enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketHandler.java)。
3. 后端已注册访客端实时语音端点 [enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketConfig.java](enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketConfig.java)。
4. visitorCall 已有独立页面路由，可新增数字人页面并复用现有前端壳层 [frontend/apps/visitorCall/src/routes/index.tsx](frontend/apps/visitorCall/src/routes/index.tsx)。

### 2.2 当前缺口

当前仓库还没有可直接复用的数字人渲染层：

1. 没有现成 Live2D、Three.js avatar、Ready Player Me 或 WebGL 角色驱动模块。
2. 没有“人物单图 -> 多视角图 -> 网页资源包”的素材生产链路。
3. 没有“语音输出 -> 嘴型变化 / 呼吸 / 表情状态”的前端动画桥接层。
4. 只有一个偏演示性质的数字人页面草稿 [frontend/apps/visitorSdk/examples/react-demo/src/pages/DigitalHumanDemo.tsx](frontend/apps/visitorSdk/examples/react-demo/src/pages/DigitalHumanDemo.tsx)，还不是可运行能力。

结论：语音链路优先复用；数字人渲染和素材管线需要新设计。

## 3. 方案选择

### 3.1 备选路线

存在三条主要路线：

1. 静态多视角 2D 精灵方案。
   通过一张人物图生成前、左前、左、右前、右等多个角度图片，前端根据鼠标方向切换角度，并叠加眨眼、呼吸、嘴型帧。

2. Live2D 方案。
   通过 PSD 分层、网格绑定、参数驱动做更自然的头部转动、眼球跟随和口型同步。

3. 3D Avatar 方案。
   使用 VRM/glTF 或完整 3D 数字人资产，在 Three.js 中根据骨骼和 blendshape 驱动角色。

### 3.2 推荐路线

首期推荐采用“静态多视角 2D 精灵方案”，原因如下：

1. 与“先给一张人物图片，再生成多个角度图片”的输入方式天然匹配。
2. 不要求先准备 PSD 分层或专业绑定资源。
3. 可以最短路径做出网页可嵌入、可互动、可语音联动的 MVP。
4. 与现有 visitorCall React 页面兼容，前端复杂度和包体积最低。
5. 后续可以平滑升级成 Live2D，保留同一套语音状态机和页面交互层。

因此，本规划以“2.5D 多视角数字人”作为首期交付目标。

## 4. 目标架构

```text
人物原图
  -> 素材生成流程
      -> 多角度立绘
      -> 表情/眨眼/嘴型帧
      -> 元数据 JSON
  -> 资源打包
      -> digital-human.bundle.zip
      -> frontend 静态资源目录
  -> 前端数字人引擎
      -> 鼠标跟随
      -> hover / click 互动
      -> idle / thinking / speaking 状态切换
      -> 口型动画
  -> 实时语音桥接层
      -> 复用 TtsRealtime WebSocket
      -> 麦克风采集
      -> 实时字幕
      -> 音频播放振幅驱动嘴型
```

架构原则：

1. 素材生产与前端渲染解耦。
2. 语音协议层与数字人表现层解耦。
3. 首期只做前端驱动动画，不在后端做视频流合成。
4. 页面嵌入优先使用 React 组件封装，后续再扩展 SDK 嵌入形式。

## 5. 素材生产规划

### 5.1 输入素材要求

建议用户提供的人物图满足以下条件：

1. 正面半身或胸像图。
2. 背景尽量纯净，方便抠图。
3. 五官无遮挡，避免刘海完全遮住眼睛。
4. 分辨率至少 1024 x 1024。
5. 风格在首期固定为统一插画风格，不混用写实素材。

### 5.1A 原图生成方案

由于你已经明确“连原图生成方案一起规划”，所以首期素材入口不再假设用户一定先给现成成图，而是支持以下两段式生成流程：

1. 先生成角色主视觉原图。
2. 再从主视觉原图派生多角度图、口型图和表情图。

推荐的原图生成策略如下：

1. 先产出角色设定卡。
   包含年龄感、职业气质、服装配色、发型、表情基调、背景要求、半身构图要求。

2. 再生成“标准正面半身图”。
   该图作为全部派生素材的母版，要求双眼清晰、肩部完整、嘴部无遮挡、头部不歪斜。

3. 统一锁定角色特征词。
   包括发色、瞳色、服装主色、配饰、线稿风格、上色方式，避免每次重绘导致角色漂移。

4. 在主视觉确认后，再派生左 15 度、左 30 度、右 15 度、右 30 度等角度图。

5. 最后补嘴型和表情帧。
   优先生成闭嘴、微张嘴、圆口、扁口、微笑、思考、眨眼闭合等最小必要帧。

这意味着首期素材管线并不是“给一张图直接硬切”，而是“角色设定 -> 主视觉原图 -> 多角度派生 -> 表情和嘴型补帧”的受控流程。

### 5.1B 插画原图规范

首期建议插画原图满足以下要求：

1. 二次元客服插画或轻拟人插画，不做厚涂写实。
2. 画幅优先 4:5 或 1:1，方便后续裁切成舞台半身像。
3. 人物正视镜头，肩颈结构完整。
4. 嘴部线条清晰，便于后续做简化口型帧。
5. 不要复杂背景，优先透明背景或纯色背景，方便抠图。
6. 服装和配饰保持简洁，减少多角度派生时的不一致风险。

### 5.1C 原创性与版权约束

生成角色素材时必须遵守以下约束，避免侵权风险：

1. 不得以可识别的真实公众人物作为参考来还原其面部特征。
2. 不得直接复刻现有动漫、游戏或其他品牌的既有角色设定与专属外观。
3. 参考风格可以借鉴某类插画流派的通用画风，但角色的发型、服装、配色组合应做原创设计，不照搬单一已知角色。
4. 若使用 AI 生图工具，提示词中应避免指定真实艺术家姓名或指定复刻某个受版权保护的角色。
5. 最终交付的角色设定卡需要明确写出“原创虚拟角色”定位，作为后续素材复核的依据。

### 5.2 输出素材结构

建议统一生成以下资源：

1. `front.png`：正面。
2. `left-15.png`：左偏 15 度。
3. `left-30.png`：左偏 30 度。
4. `right-15.png`：右偏 15 度。
5. `right-30.png`：右偏 30 度。
6. `blink-open.png`：睁眼。
7. `blink-close.png`：闭眼。
8. `mouth-a.png`、`mouth-o.png`、`mouth-e.png`、`mouth-rest.png`：基础口型帧。
9. `thinking.png`、`smile.png`：可选表情状态。
10. `manifest.json`：记录资源尺寸、锚点、层级与动画参数。

首期插画风格建议额外保留：

1. `style-reference.md`：角色风格说明。
2. `prompt-source.md`：原图与派生图使用的提示词和约束词。

### 5.3 资源包建议

最终不要只交一堆散图，建议统一生成一个标准包：

```text
digital-human/
  manifest.json
  base/
    front.png
    left-15.png
    left-30.png
    right-15.png
    right-30.png
  expression/
    blink-open.png
    blink-close.png
    thinking.png
    smile.png
  mouth/
    mouth-rest.png
    mouth-a.png
    mouth-o.png
    mouth-e.png
  preview/
    cover.png
```

首期最终交付文件建议为：

1. 一个可直接导入前端的资源目录。
2. 一个便于传输和版本管理的 `digital-human.bundle.zip`。

## 6. 网页嵌入规划

### 6.1 首期嵌入位置

建议首期仅落地在 visitorCall 应用内，新增独立页面，例如：

1. `/digital-human`
2. `/digital-human/realtime`

原因：

1. 这里已经有音频、WebSocket、设备权限相关基础。
2. 与现有 [frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx) 复用成本最低。
3. 首批把演示链路跑通后，再考虑抽象成通用嵌入组件。

### 6.2 组件拆分建议

建议前端拆成以下组件：

1. `DigitalHumanStage`
   负责舞台容器、背景、尺寸、自适应布局。

2. `DigitalHumanAvatar`
   负责多角度图片切换、眨眼、呼吸、表情状态、嘴型动画。

3. `DigitalHumanPointerController`
   负责把鼠标位置转换成视角索引、头部偏转和视线目标。

4. `DigitalHumanVoiceController`
   负责复用实时语音页里的 WebSocket、录音、播放与转写逻辑。

5. `DigitalHumanConversationPanel`
   负责字幕、状态提示、连接按钮、麦克风按钮、日志面板。

### 6.3 嵌入形态

首期建议虽然代码层保留组件化拆分，但交付层只实现一种形态：

1. 全页面演示模式。

单组件嵌入模式可以作为代码结构目标保留，但不作为首期交付承诺。

不建议首期就做 iframe SDK、外链挂件、多实例混排，这会显著扩大范围。

## 7. 互动设计规划

### 7.1 鼠标互动

首期互动建议控制在低复杂度高感知范围：

1. 鼠标左右移动时，角色在多个角度图之间切换。
2. 鼠标进入人物区域时，角色轻微放大或高亮。
3. 鼠标长时间停留时，角色进入关注状态。
4. 点击人物时，角色播放一次表情反馈，例如微笑或点头效果。

### 7.2 自动状态

首期建议定义四种状态：

1. `idle`：待机，带轻微呼吸和随机眨眼。
2. `listening`：录音中，显示倾听状态。
3. `thinking`：服务端处理中，显示思考表情。
4. `speaking`：语音播放中，切换嘴型并显示说话状态。

### 7.3 语音与嘴型联动

首期不做精准音素级口型同步，采用“振幅驱动的简化口型”即可：

1. 播放 PCM 时同步计算短时间窗能量。
2. 按能量区间切换 `mouth-rest`、`mouth-a`、`mouth-o`、`mouth-e`。
3. 音量低时回到闭嘴状态。

这条路线足够支撑首版真实感，不必首期引入复杂 viseme 系统。

### 7.4 错误处理与设备兼容

首期必须覆盖以下异常路径，而不是只做“成功路径”演示：

1. 麦克风权限被拒绝或设备不可用时，页面需要提示明确原因，并保持在 `idle` 状态，不允许卡在“录音中”的假状态。
2. WebSocket 连接失败或被服务端拒绝（例如未配置 API Key）时，需要在状态栏和字幕区都给出可读提示，而不是仅在控制台报错。
3. WebSocket 意外断开后，数字人需要自动回到 `idle`，不能停留在 `speaking` 或 `listening`。
4. 浏览器不支持 `AudioContext`、`getUserMedia` 或 `WebSocket` 时，需要显示“当前浏览器不支持实时语音”的兜底提示，而不是白屏或静默失败。
5. 复用的 `ScriptProcessorNode` 录音方案属于已废弃 Web API，首期沿用它以降低改造成本，但需要在代码注释中标注为已知技术债，后续若做正式发布，建议评估迁移到 `AudioWorkletNode`。

### 7.5 移动端与触屏范围

首期数字人互动以桌面鼠标操作为设计基准，明确以下范围：

1. 首期不针对移动端触屏做专门的手势跟随适配。
2. 触屏设备至少保证基础可用：点击角色可触发点击反馈，页面不因为没有 `mousemove` 事件而报错或白屏。
3. 移动端深度适配放入后续迭代，不纳入首期验收标准。

## 8. 与实时语音页的复用边界

### 8.1 可直接复用部分

以下能力建议直接抽离复用：

1. WebSocket 建连和断连逻辑。
2. `session.update` 配置发送逻辑。
3. 麦克风采集与 PCM 16k 编码逻辑。
4. 服务端事件处理逻辑。
5. 24k PCM 播放队列逻辑。
6. 实时转写消息流和状态文本流。

复用来源页：

1. [frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx)

### 8.2 建议改造方式

不要把整个页面直接复制到数字人页面，建议把其拆成 hook：

1. `useRealtimeSpeechSession`
2. `useRealtimeMicRecorder`
3. `useRealtimeAudioPlayer`
4. `useDigitalHumanSpeechState`

这样数字人页面只负责消费这些 hook 暴露的状态：

1. `connected`
2. `recording`
3. `statusText`
4. `messages`
5. `currentAudioLevel`
6. `assistantSpeaking`
7. `userSpeaking`

### 8.3 后端接口策略

首期不新增后端语音协议，继续复用：

1. [enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketHandler.java](enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketHandler.java)

只有在后续需要：

1. 数字人专属 persona
2. 表情指令下发
3. 工具调用驱动动作

时，再扩展后端消息协议。

### 8.4 数字人人设策略

你已经确认要单独定义数字人人设，因此首期不直接使用当前 `session.update` 中的默认文案“你是微语智能语音助手，回答简洁友好”。

建议首期数字人人设独立成可配置对象，至少包含以下字段：

1. `name`：角色名称。
2. `title`：角色定位，例如“微语数字客服顾问”。
3. `tone`：语气，例如温和、清晰、简洁。
4. `personaPrompt`：系统提示词正文。
5. `greetingText`：首次欢迎语。
6. `visualStyle`：插画风格说明。
7. `interactionStyle`：鼠标互动时的人设动作风格。

建议首期人设方向：

1. 年轻、专业、友好。
2. 用语简洁，不卖萌过度。
3. 回答偏客服接待、产品介绍、咨询引导。
4. 视觉表现保持克制，不做夸张表情。

为了避免把人设写死在组件内，建议后续实现时把 persona 抽到单独配置文件，由数字人页面和语音 hook 一起读取。

### 8.5 已知技术债与配置修正

复查发现两处不应直接照搬的现状，规划中一并修正：

1. **WebSocket 地址不应硬编码。**
   [frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx) 当前使用 `const WS_BASE = ws://${window.location.hostname}:9003`，直接拼域名和固定端口。
   而 visitorCall 已有配置化方案 [frontend/apps/visitorCall/src/utils/configUtils.ts](frontend/apps/visitorCall/src/utils/configUtils.ts)，提供 `getApiUrl()` 与基于 `STOMP_WS_URL` / `CONFIG_WEBSOCKET_URL` 的地址解析。
   抽 `useRealtimeSpeechSession` 时不应把硬编码一起搬过去，应改为从既有配置工具派生实时语音 WebSocket 地址，这样数字人页在非本机部署环境下才能正常工作。

2. **当前语音端点无鉴权，仅限调试使用。**
   [enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketHandler.java](enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsRealtimeWebSocketHandler.java) 对应配置类注释明确写着“路径 /visitor/api/v1/tts/realtime 无需鉴权（用于测试调试）”。
   数字人页首期复用该端点，等于继承同样的风险：任何知道地址的人都能连接并消耗 DashScope 配额。
   本规划不在首期修改后端鉴权（超出前端演示范围），但必须明确记录：**该页面首期只适合内部演示或受控环境，不适合直接对公网访客开放**，后续若要正式上线，需要单独排期做接口鉴权、限流与租户隔离。

## 9. 分阶段实施建议

### 阶段 1：方案与资产规范

目标：定死技术路线和资源包格式。

输出：

1. 数字人资源目录规范。
2. manifest 字段定义。
3. 页面路由与组件边界设计。
4. 语音 hook 拆分方案。
5. 插画原图生成规范。
6. 数字人人设配置草案。

### 阶段 2：静态数字人 MVP

目标：先不接语音，只实现静态人物嵌入和鼠标互动。

输出：

1. 页面可展示插画人物。
2. 鼠标移动可切换视角。
3. 自动眨眼和呼吸生效。
4. 点击人物有反馈。

### 阶段 3：接入实时语音

目标：复用 TtsRealtime 语音链路，实现可说可听。

输出：

1. 可连接实时语音服务。
2. 可录音说话。
3. 可接收 AI 音频并播放。
4. 可显示实时文本消息。

### 阶段 4：嘴型与状态联动

目标：把语音状态映射为视觉表现。

输出：

1. 用户讲话时进入 `listening`。
2. 服务端处理中进入 `thinking`。
3. 播放 AI 音频时进入 `speaking`。
4. 根据音频能量驱动口型切换。

### 阶段 5：资源生产工具化

目标：让后续替换人物素材不需要手工改代码。

输出：

1. 一个素材清单校验脚本。
2. 一个资源包导入约定。
3. 一个预览页，用来检查角度图、嘴型图、锚点和动画参数。
4. 一个原图生成与派生素材的操作说明。

## 10. 风险与边界

### 10.1 最大风险

最大风险不是语音，而是素材质量。

如果只有一张普通人物图，想稳定生成高质量多角度图和可说话素材，本质上依赖外部 AI 绘图或人工修图质量。因此首期必须承认：

1. 素材生成链路可能半自动。
2. 首版要接受“近似视角”而不是严格三维一致性。
3. 页面动效应优先适配素材，而不是反过来强迫素材满足复杂运动。

### 10.2 范围控制

首期明确不纳入：

1. 不做全身 3D 数字人。
2. 不做实时视频流合成。
3. 不做音素级口型精确同步。
4. 不做多角色切换后台系统。
5. 不做复杂动作捕捉。
6. 不做首批移动端深度适配优化。

## 11. 已确认的实施口径

当前已确认以下实施口径：

1. 首期人物固定为插画风格。
2. 首期规划包含原图生成方案，不要求用户先手工准备全部成品图。
3. 首期只做 visitorCall 演示页。
4. 首期采用独立数字人人设。
5. 首版采用“多角度 2D 精灵 + 简化口型”方案。

## 12. 推荐决策

如果目标是最快做出可演示版本，推荐如下组合：

1. 风格固定为统一插画风格。
2. 首期只做 visitorCall 页面。
3. 数字人引擎采用多角度 2D 精灵方案。
4. 语音直接复用 TtsRealtime WebSocket 链路。
5. 人设使用独立 persona 配置，不复用测试页默认提示词。
6. 口型采用音量驱动简化动画。
7. 原图和派生图都纳入统一素材管线。
8. 素材交付采用 `digital-human.bundle.zip + manifest.json`。

这条路线能以最小开发风险做出第一版，可展示、可互动、可语音对话，并且后续仍能升级为 Live2D 或 3D。

## 13. 实施前置输出物

进入代码实现前，建议先补齐以下文档或资源：

1. 插画角色设定卡。
2. 主视觉原图提示词与负向约束词。
3. 数字人命名与角色设定文案。
4. 默认欢迎语与系统 persona 草案。
5. 背景舞台风格，例如客服台、悬浮人物卡片、透明背景头像。
6. 多角度派生图和嘴型帧的命名规则。

在这些信息补齐后，就可以直接输出正式任务拆解版实现计划。

## 14. 正式任务拆解版实现计划

下面的拆解以“首期只落地 visitorCall 演示页”为前提，目标是让实现阶段可以直接按文件和任务推进，而不是再做二次设计。

### 14.1 首期目标文件布局

建议首期按以下结构落地：

1. 页面入口：
   [frontend/apps/visitorCall/src/pages/DigitalHuman/index.tsx](frontend/apps/visitorCall/src/pages)

2. 数字人组件目录：
   [frontend/apps/visitorCall/src/pages/DigitalHuman/components](frontend/apps/visitorCall/src/pages)

3. 数字人 hooks 目录：
   [frontend/apps/visitorCall/src/hooks](frontend/apps/visitorCall/src/hooks)

4. 数字人人设配置：
   [frontend/apps/visitorCall/src/config](frontend/apps/visitorCall/src/config)

5. 静态素材目录：
   [frontend/apps/visitorCall/public/assets](frontend/apps/visitorCall/public/assets)

6. 路由注册位置：
   [frontend/apps/visitorCall/src/routes/index.tsx](frontend/apps/visitorCall/src/routes/index.tsx)

说明：这里不直接在本规划里虚构一个不存在的最终文件链接作为既成事实。实现时建议新增：

1. `src/pages/DigitalHuman/index.tsx`
2. `src/pages/DigitalHuman/components/DigitalHumanStage.tsx`
3. `src/pages/DigitalHuman/components/DigitalHumanAvatar.tsx`
4. `src/pages/DigitalHuman/components/DigitalHumanConversationPanel.tsx`
5. `src/hooks/useRealtimeSpeechSession.ts`
6. `src/hooks/useRealtimeAudioPlayer.ts`
7. `src/hooks/useRealtimeMicRecorder.ts`
8. `src/hooks/useDigitalHumanSpeechState.ts`
9. `src/config/digitalHumanPersona.ts`
10. `public/assets/digital-human/manifest.json`

### 14.2 路由与页面任务

#### 任务 A：新增 visitorCall 演示页入口

目标：在 visitorCall 中提供独立访问地址。

涉及文件：

1. 修改 [frontend/apps/visitorCall/src/routes/index.tsx](frontend/apps/visitorCall/src/routes/index.tsx)
2. 新增 `frontend/apps/visitorCall/src/pages/DigitalHuman/index.tsx`

实施内容：

1. 新增 `DigitalHuman` 页面 lazy import。
2. 注册 `/digital-human` 路由。
3. 页面先提供基础舞台、状态栏和调试面板。

验收标准：

1. 访问 `/call/digital-human` 能打开页面。
2. 页面不依赖语音也能先展示占位角色和说明文案。

#### 任务 B：保留 TtsRealtime 页面作为对照页

目标：避免一开始就破坏现有语音测试页。

涉及文件：

1. [frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx)

实施内容：

1. 首轮不要直接删改原页面核心结构。
2. 先从中抽逻辑到 hooks，再回填数字人页。

验收标准：

1. `/call/tts-realtime` 保持可用。
2. 抽离逻辑后原页行为不回归。

### 14.3 语音链路拆分任务

#### 任务 C：抽离 WebSocket 会话 hook

目标：把 `session.update`、服务端事件处理、消息列表、连接状态从页面里抽离。

建议新增文件：

1. `src/hooks/useRealtimeSpeechSession.ts`

职责：

1. 管理 WebSocket 生命周期。
2. 暴露 `connect`、`disconnect`。
3. 暴露 `connected`、`statusText`、`messages`。
4. 注入 persona prompt、voice、turnMode、model。

直接来源：

1. [frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx](frontend/apps/visitorCall/src/pages/TtsRealtime/index.tsx)

#### 任务 D：抽离音频播放 hook

目标：把 24k PCM 播放逻辑和能量计算从页面中拆出。

建议新增文件：

1. `src/hooks/useRealtimeAudioPlayer.ts`

职责：

1. 管理播放 AudioContext。
2. 接收 PCM buffer 并排队播放。
3. 暴露当前播放状态。
4. 计算 `currentAudioLevel`，供数字人口型使用。

说明：

1. 这是数字人“说话嘴型”最关键的复用边界。
2. 首期只做振幅级别，不做音素识别。

#### 任务 E：抽离录音 hook

目标：把麦克风采集和 PCM 16k 编码逻辑独立出来。

建议新增文件：

1. `src/hooks/useRealtimeMicRecorder.ts`

职责：

1. 请求麦克风权限。
2. 采集 16k 单声道 PCM。
3. 输出 base64 音频 append 事件。
4. 暴露 `recording` 状态。

#### 任务 F：补一层数字人语音状态聚合 hook

目标：把底层录音、播放、消息事件翻译成 UI 能直接消费的状态机。

建议新增文件：

1. `src/hooks/useDigitalHumanSpeechState.ts`

职责：

1. 输出 `idle`、`listening`、`thinking`、`speaking`。
2. 合并 `connected`、`recording`、`currentAudioLevel`、最近事件类型。
3. 给头像组件提供最小状态接口。

### 14.4 数字人表现层任务

#### 任务 G：实现舞台组件

目标：提供数字人页面的视觉容器和布局。

建议新增文件：

1. `src/pages/DigitalHuman/components/DigitalHumanStage.tsx`

职责：

1. 控制舞台尺寸、背景、角色摆放。
2. 适配浅色/深色模式。
3. 承载头像层和对话层。

#### 任务 H：实现头像组件

目标：加载 manifest 和素材包，执行角度切换、眨眼、呼吸、口型切换。

建议新增文件：

1. `src/pages/DigitalHuman/components/DigitalHumanAvatar.tsx`

职责：

1. 读取 `manifest.json`。
2. 根据鼠标位置选择 `front / left-15 / left-30 / right-15 / right-30`。
3. 按定时器执行眨眼。
4. 根据状态机切换 `thinking / smile / speaking`。
5. 根据 `currentAudioLevel` 切换基础口型。

#### 任务 I：实现对话和控制面板

目标：保留调试可视化，避免数字人页只有角色没有操作入口。

建议新增文件：

1. `src/pages/DigitalHuman/components/DigitalHumanConversationPanel.tsx`

职责：

1. 展示连接按钮、录音按钮、断开按钮。
2. 展示状态标签。
3. 展示最近对话转写。
4. 展示当前 persona 名称和语音模式。

### 14.5 数字人人设与配置任务

#### 任务 J：新增 persona 配置

目标：把数字人人设从页面硬编码中分离。

建议新增文件：

1. `src/config/digitalHumanPersona.ts`

建议首期配置字段：

1. `name`
2. `title`
3. `subtitle`
4. `voice`
5. `model`
6. `turnMode`
7. `greetingText`
8. `personaPrompt`
9. `visualStyle`
10. `idleBehavior`

建议首期默认人设：

1. 名称：微语
2. 定位：微语数字客服顾问
3. 语气：专业、温和、简洁
4. 任务：接待、引导、答疑、转人工前咨询

为了不让实现阶段再等一轮人设文案设计，首期 `personaPrompt` 直接采用以下草稿，实现时可直接落库，后续如需调整只改配置文件，不改组件代码：

```text
你是“微语”，一个原创虚拟数字客服顾问角色，以插画形象呈现在网页中。
你的职责是：
1. 用简洁、专业、温和的语气接待访客。
2. 主动介绍产品或服务能力，但不夸大承诺。
3. 遇到你无法确定的问题，坦诚告知并建议转接人工客服。
4. 回答尽量简短，一次回应控制在两三句话以内，避免长篇大论。
5. 不使用夸张的网络流行语，不进行角色扮演式的过度卖萌。
```

建议首期 `greetingText` 草稿：

```text
你好，我是微语，很高兴为你服务。有什么可以帮你的吗？
```

### 14.6 静态资源与素材包任务

#### 任务 K：确定 visitorCall 内的数字人资源目录

目标：让演示页能直接从 public 目录加载资源。

建议新增目录：

1. `frontend/apps/visitorCall/public/assets/digital-human/`

建议内容：

1. `manifest.json`
2. `base/*.png`
3. `expression/*.png`
4. `mouth/*.png`
5. `preview/cover.png`
6. `style-reference.md`
7. `prompt-source.md`

原因：

1. visitorCall 当前已经使用 `public/` 提供图标和音频。
2. 首期演示页从 public 加载最简单，不需要额外打包器插件。

#### 任务 L：定义 manifest 最小字段

目标：避免首期组件直接写死资源命名和尺寸。

建议 manifest 首期最小结构：

1. `version`
2. `character.name`
3. `character.style`
4. `assets.base.front`
5. `assets.base.left15`
6. `assets.base.left30`
7. `assets.base.right15`
8. `assets.base.right30`
9. `assets.expression.blinkOpen`
10. `assets.expression.blinkClose`
11. `assets.expression.thinking`
12. `assets.expression.smile`
13. `assets.mouth.rest`
14. `assets.mouth.a`
15. `assets.mouth.o`
16. `assets.mouth.e`
17. `layout.anchorX`
18. `layout.anchorY`
19. `animation.blinkIntervalMin`
20. `animation.blinkIntervalMax`

### 14.7 插画原图生成与派生任务

#### 任务 M：产出角色设定卡

目标：先锁定角色，不要直接开始出图。

输出建议：

1. 角色名称。
2. 年龄感。
3. 身份定位。
4. 发型与发色。
5. 服装风格。
6. 主色与点缀色。
7. 表情基调。
8. 场景用途。

#### 任务 N：产出主视觉原图提示词

目标：先形成稳定原图，再派生多视角。

输出建议：

1. 正向提示词。
2. 负向提示词。
3. 构图说明。
4. 线稿和上色约束。
5. 背景约束。

#### 任务 O：产出派生图规则

目标：确保多角度图和表情图保持统一角色特征。

输出建议：

1. 保持五官比例不漂移。
2. 保持服装和配饰一致。
3. 保持视线高度一致。
4. 保持头肩构图尽量一致。
5. 嘴型图只改嘴部，不改其他五官。

### 14.8 验证任务

#### 任务 P：前端类型构建验证

首期最小验证命令：

```bash
cd frontend/apps/visitorCall
pnpm build
```

目标：

1. 确认新增页面、hook、配置和组件全部通过 TypeScript 与 Vite 构建。

#### 任务 Q：前端 lint 验证

```bash
cd frontend/apps/visitorCall
pnpm lint
```

目标：

1. 确认新增 hook 和组件没有 lint 回归。

#### 任务 R：手工联调验证

需要验证以下场景：

1. `/call/digital-human` 页面能打开。
2. 鼠标左右移动时角色角度切换正常。
3. 待机时存在眨眼和呼吸。
4. 点击角色时有反馈。
5. 连接语音服务后可开始录音。
6. 用户讲话时角色进入 `listening`。
7. AI 说话时角色进入 `speaking` 并切换口型。
8. 对话记录和状态标签正确更新。

### 14.9 首期不做但要保留升级空间的事项

虽然首期不实现，但代码结构上应避免堵死后路：

1. manifest 设计要允许后续增加更多角度图。
2. persona 配置要允许后续多角色切换。
3. 状态机要允许后续新增 `happy / confused / greeting` 等状态。
4. 资源加载层要允许后续切换到 Live2D 或 3D provider。

### 14.10 实现顺序建议

正式编码时建议按以下顺序推进：

1. 新增 persona 配置和数字人页面路由。
2. 从 TtsRealtime 抽 `useRealtimeSpeechSession`。
3. 再抽 `useRealtimeAudioPlayer` 和 `useRealtimeMicRecorder`。
4. 落地静态数字人页和舞台布局。
5. 接入 manifest 和多角度素材切换。
6. 接入语音控制面板。
7. 接入口型与状态机。
8. 最后做联调和样式收尾。

这个顺序的好处是：即使中途停下，也总有一个可运行中间态，不会出现“大量代码都写了但没有一个页面能打开”的问题。

### 14.11 测试策略说明

数字人页面以视觉表现和实时音频交互为主，自动化单测收益有限、成本偏高，首期测试策略明确如下：

1. 首期不引入针对动画帧切换、音频播放的自动化单元测试。
2. 首期以任务 P（构建）、任务 Q（lint）、任务 R（手工联调）三项作为主要质量闸门。
3. 若后续 `useDigitalHumanSpeechState` 状态机逻辑变复杂，可以再单独评估为其补充纯函数级单测（输入事件到状态的映射），但不纳入首期范围。

## 15. 整体完成标准（Definition of Done）

首期 MVP 满足以下全部条件时，视为规划范围内的任务完成：

1. `/call/digital-human` 页面可以正常访问，且不影响 `/call/tts-realtime` 原有功能。
2. 页面能够加载 `digital-human` 资源包并展示插画角色，缺图或加载失败时有明确兜底提示而非白屏。
3. 鼠标左右移动能触发角度切换，点击角色有反馈，长时间静止时有眨眼和呼吸动画。
4. 可以成功连接实时语音链路、完成一次完整的“提问 -> 播放语音回复”的对话闭环。
5. 语音状态机在 `idle / listening / thinking / speaking` 之间正确切换，并驱动基础口型变化。
6. 数字人人设为独立配置，未来更换人设文案不需要改动组件代码。
7. 已知的技术债和风险点（硬编码地址修正、端点无鉴权、废弃录音 API、移动端范围）均在文档中显式记录，不是被忽略的隐性风险。
8. 构建与 lint 命令均可通过，手工联调场景全部验证通过。
