# MRCP4J 替换百度 MRCP 方案评估与实施规划

> 日期：2026-07-13
> 最后更新：2026-07-16
> 状态：阶段0-3 已基本完成，阶段3 剩余 1 个技术尾项，阶段4 运行治理组件已落地 ~30%
> 结论级别：建议按“分阶段替换”推进，而不是直接切换
> 关联 TODO：[TODO-2026.md](../../TODO-2026.md)

## 1. 结论摘要

当前不能把 `com.bytedesk.call.mrcp4j` 直接当作现网“百度 MRCP Server”的等价替代品直接切换上线。

原因不是 MRCP4J 没有价值，而是它目前在仓库中的角色更接近：

- MRCPv2 协议实现库
- Java 侧 MRCP Client/Server 示例代码
- 后续自研语音网关/语音服务的基础组件

而现网百度方案实际承担的是一整套完整运行时职责：

- FreeSWITCH `mod_unimrcp` 对接层
- UniMRCP profile / SIP 信令层
- MRCP 会话层
- RTP 媒体层
- 百度 ASR/TTS 插件能力层

因此，**MRCP4J 可以作为“替换百度 MRCP Server”的一部分基础能力，但不能仅靠把包引入项目就直接完成替换。**

更准确的判断是：

1. **不能直接替换**：当前仓库内的 mrcp4j 代码还没有接入现有呼叫链路，也没有完成对媒体层和供应商 ASR/TTS 的落地封装。
2. **可以演进替换**：如果目标是逐步摆脱“百度随包 MRCP Server”，可以基于 mrcp4j 自建 Java MRCP Gateway / MRCP Server，再接企业自己的 ASR/TTS 服务。
3. **推荐分阶段推进**：先验证技术链路，再做灰度替换，最终再决定是否完全移除百度 MRCP Server。

## 2. 现状梳理

## 2.1 当前生产链路

从当前仓库配置看，现网呼叫中心语音链路是：

```text
FreeSWITCH
  -> mod_unimrcp
  -> UniMRCP profile: baidu
  -> 百度 MRCP Server
  -> 百度 ASR / TTS 能力
```

关键证据：

- FreeSWITCH 已加载 `mod_unimrcp`：
  [deploy/freeswitch/conf/autoload_configs/modules.conf.xml](deploy/freeswitch/conf/autoload_configs/modules.conf.xml)
- UniMRCP 默认 profile 就是 `baidu`：
  [deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml](deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml)
- IVR / AI Bot 运行时明确写死使用 `unimrcp + baidu`：
  [enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java](enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java)
  [modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java](modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java)
- 部署文档已说明当前服务端就是百度打包的 MRCP Server：
  [deploy/freeswitch/mrcp/readme.md](deploy/freeswitch/mrcp/readme.md)
  [deploy/freeswitch/mrcp/MRCPServer/README](deploy/freeswitch/mrcp/MRCPServer/README)

## 2.2 当前 mrcp4j 在仓库中的状态

`modules/call/src/main/java/com/bytedesk/call/mrcp4j` 目前主要包含：

- MRCP Client 实现
- MRCP Server 实现
- 协议消息编解码
- 一些示例类（例如 `SimpleExample`、`BankingIvrService`）

关键证据：

- README 明确把它描述为 MRCPv2 Java 实现库：
  [modules/call/src/main/java/com/bytedesk/call/mrcp4j/README.md](modules/call/src/main/java/com/bytedesk/call/mrcp4j/README.md)
- 示例代码是独立演示，并未接入 Spring/FreeSWITCH 实际链路：
  [modules/call/src/main/java/com/bytedesk/call/mrcp4j/service/SimpleExample.java](modules/call/src/main/java/com/bytedesk/call/mrcp4j/service/SimpleExample.java)
  [modules/call/src/main/java/com/bytedesk/call/mrcp4j/service/BankingIvrService.java](modules/call/src/main/java/com/bytedesk/call/mrcp4j/service/BankingIvrService.java)
- Server 侧实现只覆盖 MRCP ServerSocket / RequestHandler 抽象，并未看到与当前 FreeSWITCH 实际 SIP profile / RTP 媒体桥接的集成代码：
  [modules/call/src/main/java/com/bytedesk/call/mrcp4j/server/MrcpServerSocket.java](modules/call/src/main/java/com/bytedesk/call/mrcp4j/server/MrcpServerSocket.java)
  [modules/call/src/main/java/com/bytedesk/call/mrcp4j/server/provider/RecogOnlyRequestHandler.java](modules/call/src/main/java/com/bytedesk/call/mrcp4j/server/provider/RecogOnlyRequestHandler.java)

## 2.3 基于现有 enterprise/ai ASR/TTS 的落地判断

这次评估增加了一个新的可行性前提：当前仓库已经存在可复用的企业级语音能力，而不是必须从零实现 ASR/TTS。

关键事实：

- `com.bytedesk.ai.tts.TtsService` 不是纯 CRUD 服务，已经具备直接合成音频的能力，并且已经提供电话链路友好的输出。当前可直接复用的方法包括 `synthesizeToBytes(...)`、`synthesizeToAudioUrl(...)`、`synthesizeToTelephonyAudioUrl(...)`。其中 `synthesizeToTelephonyAudioUrl(...)` 已经把合成结果转成单声道 `wav`，更贴近 FreeSWITCH / MRCP 播放链路。见：[enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsService.java](enterprise/ai/src/main/java/com/bytedesk/ai/tts/TtsService.java)
- `com.bytedesk.ai.asr.AsrService` 也不是纯管理模块，已经具备文件转写与文本返回能力。当前可直接复用的方法包括 `transcribeText(...)`、`transcribeRecordingFileText(...)`、`testFileTranscription(...)`。它当前更适合“文件/录音转写”模式，而不是直接承诺实时逐帧 MRCP 流式识别。见：[enterprise/ai/src/main/java/com/bytedesk/ai/asr/AsrService.java](enterprise/ai/src/main/java/com/bytedesk/ai/asr/AsrService.java)

这意味着替换方案可以进一步收敛为：

- **TTS 侧优先复用现有 `TtsService`**，由 MRCP `SPEAK` 请求转到 `TtsService`，先生成电话可播放音频。
- **ASR 侧优先复用现有 `AsrService` 的文件转写能力**，由 MRCP `RECOGNIZE` 请求先落成录音文件或可访问 URL，再调用 `AsrService` 返回文本。
- **实时流式 ASR 不作为第一阶段承诺目标**，而是放到后续增强阶段。

## 2.4 当前评估的核心判断

### 判断一：当前 mrcp4j 还没有接入现有业务主链路

没有发现现有 IVR/AI Bot/呼叫流程直接调用 `com.bytedesk.call.mrcp4j` 包的业务代码。

说明它现在仍是“预研基础库/样例代码”，不是现网已切入的运行组件。

### 判断二：当前百度 MRCP Server 不只是协议层，而是完整语音运行时

百度方案当前不是简单地“收一个 MRCP 请求再返回文本”，而是已经承接：

- UniMRCP 对接
- SIP 监听
- MRCPv2 服务
- RTP 音频流处理
- ASR/TTS 插件调用

这和单纯的 Java MRCP 报文库不是同一层级。

### 判断三：mrcp4j 适合作为“自建 MRCP 服务”的底座，而不是直接替换包

如果要替换，真正要替换的是：

- 当前百度 MRCP Server 运行进程
- 当前百度插件配置
- 当前 FreeSWITCH `baidu` profile 所指向的服务端

而不是简单替换 Java 业务代码中的某个类。

## 2.5 对 java-sip-mrcp 仓库的补充评估

本次额外检查了 `github.com/laoyin/java-sip-mrcp` 及其本地 clone。结合当前项目新的前提约束，结论调整为：**有明确借鉴意义，而且其中一部分开源基础层代码可以直接复制到 `modules/call`，但仍应选择性复制，而不是整仓搬运。**

它的结构本质上更接近一个“Java SIP + SDP + RTP + MRCP 客户端/接入工程”，而不是一个可以原样搬进当前项目的生产级 MRCP Server。

从已检查内容看，它主要由以下几部分组成：

- `MrcpJavaClient`：演示如何通过 SIP INVITE 建立 MRCP 相关会话，并通过音频流持续写入识别链路。
- `UserAgent`、`SDPManager`、`MediaManager`：负责 SIP 会话、SDP 协商、RTP 媒体收发。
- `mrcp/mrcp4j`：仓库内部自带的一份 mrcp4j 代码副本或 fork。

这一点意味着它的主要借鉴价值不在“替代当前仓库已有的 mrcp4j”，而在于：

- SIP INVITE / 200 OK / ACK 这套呼叫建立链路如何和 MRCP 会话联动
- SDP 中如何同时处理音频媒体和 MRCP 资源描述
- 媒体流如何通过 `pipeline` / `PipedOutputStream` 方式交给上层应用
- ASR 结果如何通过队列方式异步回传给业务线程

## 2.6 对 java-sip-mrcp 的具体借鉴价值

### 可以借鉴的部分

1. **SIP + SDP 协商思路可以借鉴**
   `UserAgent`、`SDPManager`、`MediaManager` 展示了如何在 Java 里把 SIP 信令、SDP 协商和后续 RTP 媒体会话串起来。这对于后续如果要在 Java 侧自行承接 UniMRCP/FreeSWITCH 的控制链路，有明确参考价值。

2. **媒体桥接模式可以借鉴**
   `CustomConfig` + `MediaManager` 使用 `PipedOutputStream`、队列、pipeline 模式，把底层媒体输入桥接到上层处理逻辑。这和当前我们要实现的“RTP/媒体流 -> ASR 服务”桥接模式非常接近，值得借鉴其职责拆分方式。

3. **ASR 事件回传模型可以借鉴**
   `MrcpJavaClient` 把识别结果放入 `asrQueue`，业务线程异步消费。这个模式适合参考到当前 enterprise/call 里的 MRCP bridge 设计中，用于把 `RECOGNITION-COMPLETE` 等事件和上层业务线程解耦。

4. **PoC 级客户端验证流程可以借鉴**
   如果后续先做一个最小 Java MRCP/SIP 客户端 PoC，用来验证外部 MRCP server、验证协商过程、抓包观察 RTP 和 MRCP 时序，那么它是很好的参考样本。

### 适合直接复制到 modules/call 的部分

在“`modules/call` 本身就是开源模块，可以接受 GPL 代码”的前提下，`java-sip-mrcp` 里以下部分可以作为候选直接复制对象，前提是复制后统一包名、清理依赖、做最小必要裁剪：

1. **`peers/sdp` 子层**
   这一层包含 SDP 解析、建模和 MRCP/audio 目标抽取逻辑，和当前要补的 SIP/SDP 协商层高度相关。
   适合优先评估复制的目录：
   - `peers/sdp/Codec.java`
   - `peers/sdp/MediaDescription.java`
   - `peers/sdp/MediaDestination.java`
   - `peers/sdp/MrcpClientDestination.java`
   - `peers/sdp/RFC4566.java`
   - `peers/sdp/SDPManager.java`
   - `peers/sdp/SdpParser.java`
   - `peers/sdp/SessionDescription.java`

2. **`peers/rtp` 子层**
   这一层包含 RTP packet/session 的轻量实现与 RFC 常量，对当前补齐 Java 侧 RTP 接入很有价值。
   适合优先评估复制的目录：
   - `peers/rtp/RtpPacket.java`
   - `peers/rtp/RtpParser.java`
   - `peers/rtp/RtpSession.java`
   - `peers/rtp/RFC3551.java`
   - `peers/rtp/RFC4733.java`

3. **`peers/media` 中与 pipeline/文件/收发桥接直接相关的子集**
   这一层最有价值的不是声卡相关能力，而是“媒体输入如何喂给 RTP/MRCP”的桥接模式。
   适合优先评估复制的类：
   - `MediaManager`
   - `PipedStreamReader`
   - `CaptureRtpSender`
   - `IncomingRtpReader`
   - `FileReader`
   - `RtpSender`
   - `SoundSource`
   - `MediaMode`

4. **`peers/sip` 子层可作为“如果决定自带 SIP 栈”时的候选复制对象**
   如果后续决定在 `modules/call` 中直接引入一套纯 Java SIP 协商层，而不是只依赖外部 UniMRCP/FreeSWITCH，那么 `peers/sip`、`peers/sip/core`、`peers/sip/transaction`、`peers/sip/transport` 是可以直接复制并逐步重构的候选。
   但这部分体量最大，建议排在 SDP/RTP/media 之后。

### 仍不建议直接复制的部分

1. **仓库内部自带 mrcp4j fork，容易与当前 vendored mrcp4j 重叠冲突**
   当前项目已经在 [modules/call/src/main/java/com/bytedesk/call/mrcp4j/package-info.java](modules/call/src/main/java/com/bytedesk/call/mrcp4j/package-info.java) 之下 vendored 了一份 mrcp4j。再直接拷入 `java-sip-mrcp` 里的 `mrcp4j` 代码，会引入重复实现、包结构冲突和后续维护分叉。

2. **技术栈较旧，不适合整块搬运**
   该仓库依赖较老的 Spring Boot 2.7、log4j 1.x、老版本 mina/jain-sip 组合，直接引入会给当前项目带来额外升级和安全负担。

3. **它更偏客户端/接入工程，不是现成服务端方案**
   它能帮助理解“怎么连”，但不能证明“可以直接拿来作为生产版 Java MRCP Server”。

## 2.7 对当前项目的实际建议

因此，对 `java-sip-mrcp` 的处理建议应当是：

- **可以直接复制选定的开源基础层代码到 `modules/call`。**
- **复制策略应当是“按层复制、逐层整合”，而不是整仓搬运。**
- **优先复制 SDP/RTP/media 基础层，谨慎处理 SIP 栈，避免复制其自带 mrcp4j fork。**
- **上层与 `enterprise/ai` 的桥接仍然建议放在 `enterprise/call`。**

更具体地说，当前最值得吸收的不是代码本身，而是以下设计模式：

- SIP UserAgent 与 MRCP Channel 的装配方式
- SDP 中 MRCP 媒体目标与 RTP 目标的分离处理
- pipeline/queue 式媒体桥接
- 识别结果异步回调与状态机切换

而最不建议直接搬入当前仓库的是：

- 仓库内部自带的 `mrcp4j` fork
- 依赖旧版库的整套媒体和传输实现

调整后的更实际策略是：

- `modules/call`：可以承接复制过来的开源协议基础层，例如 `sip/`, `sdp/`, `rtp/`, `media/` 子层
- `enterprise/call`：承接与 `AsrService` / `TtsService` 的桥接、业务策略、灰度切换和配置

## 3. 是否可行

## 3.1 可行性结论

**可行，但前提是把目标定义为：基于 mrcp4j 自研一套可被 FreeSWITCH `mod_unimrcp` 调用的 Java MRCP 服务。**

如果目标是：

- “把百度 MRCP Server 去掉”
- “由微语自己承接 MRCP 请求”
- “把底层 ASR/TTS 切到自家或第三方引擎”

那么这条路是有技术可行性的。

如果目标是：

- “今天把 mrcp4j 引入后立刻替换线上百度 MRCP”

那么当前不可行。

## 3.2 可行方案的本质

真正可行的替换路径应是：

```text
FreeSWITCH mod_unimrcp
   -> 自研 Java MRCP Server / Gateway（基于 mrcp4j）
         -> enterprise/call 中的 MRCP Bridge
               -> enterprise/ai AsrService
               -> enterprise/ai TtsService
         -> 可选 Provider Adapter（阿里/百度/火山/开源 ASR/TTS）
      -> 业务编排 / 结果格式化 / 鉴权 / 监控
```

也就是说，mrcp4j 负责的是“MRCP 协议外壳”，而当前项目已有的 `AsrService` / `TtsService` 可以承担第一阶段的语音能力实现。真正替换成功还需要补齐：

- MRCP 请求与 `AsrService` / `TtsService` 的桥接层
- 供应商适配层
- 音频输入输出链路
- 结果事件回调
- 监控与容错
- 与 FreeSWITCH 的 profile 联调

## 3.3 如果要真正替代百度 MRCP，还需要哪些组件

如果把“替代百度 MRCP”理解为：**不再依赖当前服务器端配置的百度 MRCP Server，而由微语自己承接 `mod_unimrcp` 的 MRCP 请求并完成 ASR/TTS 会话处理**，那么除了现有的 `mrcp4j`、`AsrService`、`TtsService` 之外，还至少需要下面这些组件。

### A. 必需组件

这些组件缺任何一个，都还不能形成可工作的替代链路。

1. **MRCP Server 启动组件**
   用来真正监听 MRCP 端口、接受 `SPEAK` / `RECOGNIZE` / `STOP` / `BARGE-IN-OCCURRED` 等请求，而不是只停留在 SDK 示例。

2. **MRCP Request Handler 组件**
   至少需要：
   - TTS request handler
   - ASR request handler
   - 会话状态与停止/异常处理逻辑

3. **MRCP Bridge 组件**
   负责把 MRCP 层参数映射成当前项目里的：
   - `TtsService` 调用参数
   - `AsrService` 调用参数
   - MRCP completion cause / 失败原因 / 结果格式

4. **RTP/media 接入组件**
   当前已经决定默认走 `java-sip-mrcp` 派生的 `sdp/rtp/media` 主线，因此至少需要：
   - SDP 解析组件
   - RTP session / packet / parser 组件
   - media pipeline / reader / sender 组件

5. **音频格式处理组件**
   替代百度 MRCP 不只是“拿到文本和音频 URL”这么简单，还必须处理通话链路里的音频格式问题，至少包括：
   - 电话侧 RTP payload 与内部音频表示之间的映射
   - G.711 PCMA / PCMU 等基础格式处理
   - WAV/PCM 落盘或转码能力

6. **FreeSWITCH / UniMRCP profile 对接组件**
   需要有新的 `java-mrcp` profile、相应地址端口、以及 dialplan/HTTAPI 里的切换入口。没有这部分，Java 侧服务即使能跑也接不到现有呼叫链路。

### B. 强烈建议在首轮 PoC 后尽快补齐的组件

这些组件并非“第一天没有就完全跑不起来”，但没有它们就很难进入稳定替换阶段。

1. **Provider Adapter 组件**
   把 `AsrService` / `TtsService` 之下的具体供应商能力隔离开，避免未来切换阿里、百度、火山或开源 ASR/TTS 时再次改 MRCP 入口层。

2. **结果格式化组件**
   至少要统一：
   - NLSML 或等价识别结果结构
   - completion cause
   - failure cause
   - TTS 播放完成事件

3. **超时、重试与失败回退组件**
   例如：
   - ASR 超时
   - TTS 生成失败
   - RTP 中断
   - 供应商接口失败后的 fallback 策略

4. **健康检查与可观测组件**
   至少包括：
   - 服务存活检查
   - MRCP 请求计数
   - 失败计数
   - 平均耗时
   - 关键异常日志

5. **配置与灰度切换组件**
   至少要支持：
   - `baidu` / `java-mrcp` profile 切换
   - 按租户、号码、IVR 做灰度
   - provider / voice / asr mode / timeout 配置化

### C. 可后置，但生产阶段通常需要的组件

这些组件第一阶段可以不全做，但如果目标是稳定替换现网百度 MRCP，最终一般都需要补齐。

1. **实时流式 ASR 组件**
   当前 `AsrService` 更偏文件/录音转写。若要达到更接近线上实时语音机器人的体验，后续往往还要补流式识别能力。

2. **实时 TTS 回灌 RTP 组件**
   第一阶段可以优先通过可访问音频或电话 WAV 过渡，但若后续要优化时延和会话体验，通常还要支持更直接的媒体回灌。

3. **Barge-in / 中断控制组件**
   如果要支持“机器人说话时用户插话打断”，则需要更完整的 MRCP 事件控制与媒体状态管理。

4. **多租户配额与限流组件**
   替代百度 MRCP 之后，语音资源控制就变成自家责任，通常要考虑：
   - 并发路数限制
   - 租户配额
   - 任务队列与削峰

5. **部署与运维组件**
   包括：
   - 独立启动入口
   - 配置模板
   - 日志采集
   - 部署脚本
   - 回滚方案

### D. 当前项目里已经具备、可直接复用的组件

为了避免把“还缺什么”和“已经有了什么”混在一起，这里单独列出当前可直接复用的部分：

1. `modules/call/mrcp4j`：作为 MRCP 协议基础库
2. `enterprise/ai/AsrService`：作为第一阶段默认 ASR bridge provider
3. `enterprise/ai/TtsService`：作为第一阶段默认 TTS bridge provider
4. `java-sip-mrcp` 可复制的 `sdp/rtp/media` 基础层：作为默认 RTP/media 主线来源

### E. 按当前状态，最缺的其实是哪几类组件

如果只看“距离真正替代百度 MRCP 还差哪几块”，当前最核心的缺口不是模型本身，而是下面 5 类运行组件：

1. **可运行的 MRCP Server 入口**
2. **MRCP -> AsrService/TtsService 的 bridge 层**
3. **基于 `java-sip-mrcp` 的 RTP/media 接入层**
4. **FreeSWITCH `java-mrcp` profile 与现有 dialplan/HTTAPI 的切换层**
5. **监控、超时、失败回退、灰度切换这类生产运行组件**

换句话说，当前并不是“还差一个 ASR/TTS 引擎”，而是还差一整层把 MRCP、媒体、AI 服务和现有呼叫链路真正粘起来的运行组件。

### F. 这 5 类核心组件建议落成哪些类

为了避免后续进入实现阶段时再次回到“先建哪些类”的讨论，下面把这 5 类核心组件进一步细化成建议模块、包名和首批类名。

#### 1. 可运行的 MRCP Server 入口

所属模块：`enterprise/call`

建议包名：

- `com.bytedesk.call.mrcp.config`
- `com.bytedesk.call.mrcp.server`

建议首批类名：

- `MrcpServerAutoConfiguration`
- `MrcpServerProperties`
- `MrcpServerBootstrap`
- `MrcpServerLifecycle`
- `MrcpServerRegistry`

职责说明：

- 负责读取配置并启动 MRCP Server
- 管理 server 生命周期与 Spring Boot 生命周期对齐
- 注册 TTS/ASR handler 到统一入口

#### 2. MRCP -> AsrService/TtsService 的 bridge 层

所属模块：`enterprise/call`

建议包名：

- `com.bytedesk.call.mrcp.bridge`
- `com.bytedesk.call.mrcp.server.handler`

建议首批类名：

- `CallMrcpAsrBridge`
- `CallMrcpTtsBridge`
- `DefaultCallMrcpAsrBridge`
- `DefaultCallMrcpTtsBridge`
- `MrcpRecognizeRequestHandler`
- `MrcpSpeakRequestHandler`
- `MrcpStopRequestHandler`
- `MrcpRequestContext`

职责说明：

- 把 MRCP 请求参数映射成 `AsrService` / `TtsService` 调用参数
- 把桥接结果映射回 MRCP response / event
- 在 handler 层协调会话开始、停止、异常与完成事件

#### 3. 基于 java-sip-mrcp 的 RTP/media 接入层

所属模块：`modules/call`

建议包名：

- `com.bytedesk.call.mrcp.sdp`
- `com.bytedesk.call.mrcp.rtp`
- `com.bytedesk.call.mrcp.media`

建议首批类名：

- `MrcpSdpParser`
- `MrcpSessionDescription`
- `MrcpMediaDescription`
- `MrcpRtpSession`
- `MrcpRtpPacket`
- `MrcpRtpParser`
- `MrcpRtpListener`
- `MrcpMediaPipeline`
- `MrcpIncomingAudioReader`
- `MrcpOutgoingAudioSender`
- `MrcpPipeAudioReader`
- `MrcpFileAudioReader`

职责说明：

- 解析 SDP 中的 audio / MRCP 目标信息
- 建立最小 RTP 收发能力
- 提供 file / pipe 两类媒体桥接入口给 `enterprise/call`

#### 4. FreeSWITCH `java-mrcp` profile 与 dialplan/HTTAPI 切换层

所属模块：`enterprise/call` + `deploy/freeswitch`

建议包名：

- `com.bytedesk.call.mrcp.rollout`
- `com.bytedesk.call.mrcp.profile`

建议首批类名：

- `MrcpProfileSelector`
- `MrcpProfileProperties`
- `MrcpRouteDecisionService`
- `MrcpTenantRolloutPolicy`
- `MrcpNumberRolloutPolicy`
- `MrcpIvrRolloutPolicy`

对应配置/脚本侧组件：

- `unimrcp.conf.xml` 中的 `java-mrcp` profile
- dialplan/HTTAPI 中的 profile 切换变量
- 必要的部署模板与切换说明

职责说明：

- 决定当前呼叫使用 `baidu` 还是 `java-mrcp`
- 支持按租户、号码、IVR 做灰度
- 为切换和回滚提供单点控制逻辑

#### 5. 监控、超时、失败回退、灰度切换这类运行组件

所属模块：`enterprise/call`

建议包名：

- `com.bytedesk.call.mrcp.health`
- `com.bytedesk.call.mrcp.metrics`
- `com.bytedesk.call.mrcp.resilience`

建议首批类名：

- `MrcpHealthIndicator`
- `MrcpMetricsService`
- `MrcpCallTraceLogger`
- `MrcpTimeoutPolicy`
- `MrcpFailureMapper`
- `MrcpFallbackService`
- `MrcpCircuitBreakerFacade`

职责说明：

- 暴露健康检查和核心指标
- 统一超时、失败原因、fallback 逻辑
- 记录一次呼叫内 MRCP 请求、媒体、ASR/TTS 调用链路

#### G. 建议的最小建类顺序

如果后续开始真正建代码，建议按下面顺序起骨架，而不是并行散建：

1. `MrcpServerProperties`、`MrcpServerBootstrap`
2. `CallMrcpTtsBridge`、`MrcpSpeakRequestHandler`
3. `MrcpSdpParser`、`MrcpRtpSession`、`MrcpMediaPipeline`
4. `CallMrcpAsrBridge`、`MrcpRecognizeRequestHandler`
5. `MrcpProfileSelector`、`MrcpRouteDecisionService`
6. `MrcpHealthIndicator`、`MrcpMetricsService`、`MrcpFallbackService`

这样安排的原因是：

- 先把服务入口和 TTS 跑通，最容易验证
- 再补 RTP/media 和 ASR，逐步增加复杂度
- 最后再补灰度、健康、回退这些生产运行组件

## 4. 风险与难点

## 4.1 最大技术风险

### 风险一：媒体层不是当前仓库的现成能力

MRCP 协议本身不等于完整语音服务。

当前现网百度 MRCP Server 已处理了音频流、识别/合成会话、底层插件调用。若改为 mrcp4j 自研，需要确认：

- 音频是如何从 UniMRCP/FreeSWITCH 传入 Java 侧
- Java 侧如何读取/处理 RTP 或媒体资源
- 识别完成后如何按 MRCP 事件格式返回 `RECOGNITION-COMPLETE`
- 合成场景下如何输出可播放的音频流

补充判断：

- 对 **TTS** 而言，风险已经明显下降，因为当前 `TtsService` 已具备电话链路用 `wav` 输出能力。
- 对 **ASR** 而言，风险仍然集中在“实时媒体接入”而不是“识别模型能力”本身，因为当前 `AsrService` 更偏向文件/录音转写模型。

### 风险一的进一步判断：RTP/media 主线已确定为 java-sip-mrcp

当前决策已经进一步明确：**仓库中的 `org.jlibrtp` 已直接删除，后续默认使用 `java-sip-mrcp` 提供的 `peers/rtp` + `peers/media` 作为 RTP/media 主线。**

这意味着本规划不再保留“双 RTP 栈并行评估”的路线，而是统一为：

- `modules/call` 的 RTP 基础层默认来源于 `java-sip-mrcp` 中可复制、可裁剪的 `rtp/` 与 `media/` 子层
- 上层 `enterprise/call` 的媒体桥接、ASR/TTS 调用和灰度逻辑都围绕这一条主线展开
- 不再为 `org.jlibrtp` 设计额外 facade、adapter 或回退路径

这样做的直接好处是：

- 避免在 PoC 阶段维护两套 RTP/media 实现
- 让 `java-sip-mrcp` 的 `sdp/rtp/media` 设计在同一条链路内闭环
- 让后续 `modules/call` 的结构收敛得更快，减少重复封装成本

同时也要明确这条决策带来的技术含义：

- 后续若需要 RTCP、participant、重排增强、多播等更通用能力，应优先在 `java-sip-mrcp` 引入的 `rtp/media` 主线上补齐，而不是重新恢复第二套 RTP 库
- 若 `java-sip-mrcp` 当前 `peers/rtp` 能力不足，需要做的是继续增强 `modules/call/.../mrcp/rtp`，而不是重新回退到已删除的 `org.jlibrtp`

换句话说，关于 RTP 接入层的架构决策，现在已经从“二选一评估”变成了“单主线演进”：

```text
FreeSWITCH / UniMRCP
   -> java-sip-mrcp-derived rtp/media layer in modules/call
   -> enterprise/call mrcp media bridge
   -> AsrService / TtsService
```

### 风险二：当前示例代码远未达到生产级

例如 `SimpleExample`、`BankingIvrService` 更像 SDK 演示，不具备：

- Spring Boot 生命周期管理
- 生产级连接池/重试/超时控制
- 指标采集
- 多租户配置能力
- 灰度切换机制

补充说明：在你确认 `modules/call` 可以直接接纳 GPL 开源代码后，`java-sip-mrcp` 已不再只是“强参考、弱复用”，而是可以作为 `modules/call` 协议基础层的候选来源。但即便如此，当前仍然需要在本仓库里按现有模块边界自行整合生产版 bridge，不能把它当成可直接上线的现成答案。

### 风险三：FreeSWITCH 侧 dialplan 当前显式依赖 `unimrcp:profile=baidu`

要切换，不只是 Java 侧改代码，还需要：

- 新增或改造 UniMRCP profile
- 调整 dialplan / HTTAPI 中的 profile 名称
- 做按号码/按 IVR/按租户灰度

## 4.2 业务风险

- 替换失败会直接影响 IVR 播报、AI Bot 语音、DTMF 后的语音交互
- TTS/ASR 时延如果高于现有百度方案，通话体验会显著下降
- 语音识别结果格式不兼容会影响现有 HTTAPI / LLM 回合逻辑

## 5. 推荐实施策略

建议采用“评估验证 -> Java MRCP Gateway PoC -> 灰度替换 -> 生产切换”的四阶段策略。

## 阶段 0：补齐调研结论

目标：确认替换范围不是“一个 jar 包”，而是一条完整语音运行链路。

任务：

1. 盘点当前百度 MRCP Server 实际暴露能力：ASR、TTS、是否包含录音/语种/热词等。
2. 盘点现有 FreeSWITCH 中所有 `unimrcp` 使用点。
3. 定义最小替换目标：先替换 TTS、还是先替换 ASR、还是同时替换。

产出：

- MRCP 能力盘点表
- FreeSWITCH 使用点清单
- 最小 PoC 范围说明

## 阶段 1：完成 Java MRCP Server/Gateway PoC

目标：证明 mrcp4j 可以被 FreeSWITCH `mod_unimrcp` 实际调用。

建议只做一个最小 PoC：

- TTS：收到 `SPEAK` 请求后，直接桥接到 `TtsService.synthesizeToTelephonyAudioUrl(...)` 或 `synthesizeToBytes(...)`
- ASR：收到 `RECOGNIZE` 请求后，优先走“录音文件/可访问 URL -> `AsrService.transcribeRecordingFileText(...)`”模式

在媒体接入实现上，第一阶段建议优先采用“保守模式”：

- 能复用 FreeSWITCH 侧现成录音/媒体文件输出时，优先复用，不要一开始就自己接 RTP。
- 若必须在 Java 侧直接接 RTP，则默认基于 `java-sip-mrcp` 复制/整理后的 `rtp/media` 子层实现，不再引入第二套 RTP 库。

任务：

1. 先在 `modules/call` 中补齐底层协议基础层，不引入 `enterprise/ai` 依赖。
2. 在 `enterprise/call` 中建立 MRCP Spring Boot 启动入口，不要让 `modules/call` 反向依赖 `enterprise/ai`。
3. 用 `MrcpServerSocket` 启动 Java MRCP Server。
4. 在 `enterprise/call` 实现最小 `SpeechSynthRequestHandler`，内部直接调用 `TtsService`。
5. 在 `enterprise/call` 实现最小 `RecogOnlyRequestHandler`，第一阶段只支持录音文件转写模式，内部调用 `AsrService`。
6. 若第一阶段需要 Java 直接接 RTP，则在 `modules/call` 增加 RTP 接入层，在 `enterprise/call` 增加媒体桥接层，把 RTP payload 转成可供 `AsrService` 处理的文件或字节流。
7. 在 `enterprise/call` 增加一个 MRCP Bridge 层，负责把 MRCP 请求参数映射成 `AsrService` / `TtsService` 调用参数。
8. 在 `enterprise/call` 增加日志、健康检查和 provider/voice/model 配置输出。
9. 在 FreeSWITCH 中新增一个 `java-mrcp` profile 指向该服务。
10. 做最小拨号测试，优先验证 TTS 播报，再验证文件式 ASR 识别。

可选参考输入：

- 从 `java-sip-mrcp` 选择性复制 `sdp/`, `rtp/`, `media/` 基础层到 `modules/call`。
- 若决定自带 Java SIP 协商层，再逐步引入其 `sip/` 子层到 `modules/call`。
- 继续参考其 `pipeline + queue` 模式，把 RTP/媒体输入和 `AsrService` 调用解耦。
- 避免复制其自带 `mrcp4j` fork，统一以当前仓库已有 `modules/call/mrcp4j` 为准。

产出：

- 一个可启动的 Java MRCP Server/Gateway
- 一层可复用的 MRCP -> enterprise AI Bridge
- 一条可跑通的 FreeSWITCH 测试拨号计划

验收标准：

- FreeSWITCH 能通过新 profile 成功发起 `SPEAK`
- FreeSWITCH 能通过新 profile 成功完成一次基于录音文件的 `RECOGNIZE`
- 日志中能看到完整 MRCP 请求/响应/事件链路

## 阶段 2：补齐供应商适配层

目标：让 Java MRCP 服务真正具备替代百度 MRCP 的语音能力。

任务：

1. 定义统一桥接接口：
   - `CallMrcpAsrBridge`
   - `CallMrcpTtsBridge`
2. 第一优先级直接封装当前现有能力：
   - `TtsService` 作为默认 TTS bridge provider
   - `AsrService` 作为默认 ASR bridge provider
3. 再向下沉淀可替换的 provider adapter：
   - `CallAsrAdapter`
   - `CallTtsAdapter`
4. 完成 MRCP 请求到 bridge/provider 的映射：
   - `SPEAK` -> `TtsService` / TTS adapter 生成音频
   - `RECOGNIZE` -> `AsrService` / ASR adapter 返回识别文本
5. 统一结果格式：NLSML / 文本 / completion cause / failure cause
6. 增加超时控制、异常回退、失败原因映射。
7. 第二阶段末尾再评估是否支持真正实时流式 ASR，而不是只支持录音文件识别。

产出：

- 可插拔 ASR/TTS Provider 架构
- 至少一个生产可用 Provider

## 阶段 3：与现有呼叫链路集成

目标：让现有 IVR / AI Bot 可在不改业务逻辑或少量改业务逻辑下切换。

任务：

1. 抽出当前写死的 `tts_profile=baidu` / `asr_profile=baidu`。
2. 改为配置化 profile，例如：
   - `baidu`
   - `java-mrcp`
3. 在以下位置做可切换改造：
   - [enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java](enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java)
   - [modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java](modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java)
   - 相关 FreeSWITCH dialplan
4. 增加租户级/号码级/IVR 级灰度切换能力。

产出：

- MRCP profile 配置化
- 不同业务流可单独切换到新 Java MRCP 服务

### 3.1 阶段3需要改哪些现有点

当前至少已经确认下面几个位置和 `baidu` profile 强绑定，阶段3应优先围绕这些点做“可切换”改造，而不是一开始大范围改全仓：

- [deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml](deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml)：当前 `default-tts-profile` 与 `default-asr-profile` 都是 `baidu`
- [deploy/freeswitch/conf/dialplan/default/92-ai-bot.xml](deploy/freeswitch/conf/dialplan/default/92-ai-bot.xml)：测试分机与通用 92xx 入口已收敛到统一 `mrcp_profile`，且默认值只在缺省时生效；阶段3剩余重点已转为真实双 profile 拨测与回滚演练
- [enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java](enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java)：当前 HTTAPI 响应中直接写死 `tts_profile=baidu`、`unimrcp:profile=baidu`
- [modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java](modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java)：当前 HTTAPI/TTS 路径中多处直接写死 `unimrcp:profile=baidu`

这意味着阶段3的本质不是“再加一个 profile”，而是把“当前所有写死 `baidu` 的出口”收敛成统一的 profile 决策入口。

### 3.2 阶段3建议配置改造点

建议先按“新增、不替换”的原则处理 FreeSWITCH / UniMRCP 配置。

`unimrcp.conf.xml` 建议改造点：

- 保留现有 `baidu` profile 作为稳定回退路径
- 新增 `java-mrcp` profile，指向 Java MRCP Server 地址、SIP 端口、RTP 端口范围
- 第一轮不要立即改 `default-tts-profile`、`default-asr-profile`，避免误伤现网依赖默认值的流程
- 等 PoC 稳定后，再评估是否将默认值切到配置化占位，或继续要求业务侧显式传 profile

dialplan / HTTAPI 建议改造点：

- 把 `tts_profile=baidu`、`asr_profile=baidu`、`unimrcp:profile=baidu` 收敛为统一变量，例如 `mrcp_profile`
- 在进入 `speak`、`detect_speech`、`play_and_detect_speech` 之前统一设置 `tts_profile=${mrcp_profile}`、`asr_profile=${mrcp_profile}`、`unimrcp:profile=${mrcp_profile}`
- 对 AI Bot、IVR 菜单、ASR 回声测试分机分别保留独立入口，避免首轮联调互相干扰

Java 侧建议改造点：

- 在 `enterprise/call` 由 `MrcpProfileResolver` 统一决定当前呼叫使用 `baidu` 还是 `java-mrcp`
- 在 `IvrMenuHttapiController`、`HttapiController` 中不再直接拼写 `baidu`，而是改为读取统一配置或 resolver 结果
- 把租户、号码、IVR、测试分机等决策因子下沉到 `rollout/`，不要散落在多个 controller 里

### 3.3 阶段3建议实施顺序

建议阶段3按“先测试号码，再业务入口，再灰度策略”的顺序推进。

1. 先在 [deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml](deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml) 新增 `java-mrcp` profile，但保留 `baidu` 默认值不动
2. 先只改测试拨号入口，例如 [deploy/freeswitch/conf/dialplan/default/92-ai-bot.xml](deploy/freeswitch/conf/dialplan/default/92-ai-bot.xml) 中 `9295`、`9296` 这类测试分机，使其可显式切到 `java-mrcp`
3. 测试分机联调稳定后，再改 [enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java](enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java) 与 [modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java](modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java) 的 profile 决策逻辑
4. 再引入 `MrcpProfileResolver`、`MrcpTenantRolloutPolicy`、`MrcpNumberRolloutPolicy`、`MrcpIvrRolloutPolicy`，把单点测试切换提升为可控灰度
5. 最后才考虑是否调整 `default-tts-profile` / `default-asr-profile`，或继续坚持所有业务链路显式指定 profile

### 3.4 阶段3建议验证清单

联调时建议不要只看“能不能播报”，而要固定检查下面几类验证点。

配置验证：

- `mod_unimrcp` 已加载，且 `java-mrcp` profile 可被 FreeSWITCH 识别
- `java-mrcp` profile 的 server 地址、client 地址、RTP 端口范围与 Java 服务监听配置一致
- 不修改业务 profile 时，原 `baidu` 路径仍可正常工作

测试分机验证：

- 测试分机切到 `java-mrcp` 后，`9296` 类 TTS 测试可成功播报
- 测试分机切到 `java-mrcp` 后，`9295` 类 ASR 测试可成功得到识别结果
- 同一测试分机可通过变量在 `baidu` / `java-mrcp` 两条链路间快速切换

业务入口验证：

- HTTAPI 生成的 XML 中已不再写死 `baidu`
- IVR 菜单与 AI Bot 入口在不改业务流程的前提下可通过配置切换 profile
- 切到 `java-mrcp` 后，现有 `bot_continue`、录音文件、对话轮转逻辑不受影响

回滚验证：

- 关闭 `java-mrcp` 灰度后，可在不改 Java 代码的情况下回到 `baidu`
- `java-mrcp` 服务不可用时，仍可手工切回 `baidu` profile 保底

### 3.5 阶段3建议里程碑

- 里程碑 A：新增 `java-mrcp` profile，但不影响现有 `baidu` 链路
- 里程碑 B：测试分机可在 `baidu` / `java-mrcp` 之间切换，并分别完成一次 TTS 播报
- 里程碑 C：测试分机在 `java-mrcp` 下完成一次 ASR 识别，并返回现有业务链路可消费的文本结果
- 里程碑 D：`IvrMenuHttapiController` 与 `HttapiController` 不再写死 `baidu`，而是统一走 profile resolver
- 里程碑 E：按租户 / 号码 / IVR 的灰度策略生效，并具备显式回滚路径

阶段3最新验证状态（2026-07-14）：

- `9294` 已在 `java-mrcp` 下完成真实 ASR 回声验证，最新远端日志显示 `concat asr_text=您好`，并成功播报 `我听到：您好`
- `9295` 已在 `baidu` 下完成真实 ASR 回声验证，最新远端日志显示 `concat asr_text=今天天气 ssml=今天天气`，并成功播报 `我听到：今天天气`
- `9296`、`9299` 的 TTS 测试已能稳定接通并播报
- 旧的 `application="cond"` 非法配置与 `nlsml_to_text.lua` 缺失导致的“只播我听到”问题都已修复
- 阶段3剩余技术尾项已收敛为：继续把 Java MRCP 侧 `RTP_CAPTURE_PLACEHOLDER` 补成真实 RTP 落盘链路

## 阶段 4：灰度与生产切换

目标：安全替换现网百度 MRCP Server。

任务：

1. 先灰度一条 IVR 流程或一个测试 DID。
2. 对比以下指标：
   - 首包时延
   - TTS 播报完成率
   - ASR 成功率
   - 识别准确率
   - 呼损率
3. 增加监控：
   - MRCP 请求量
   - 超时量
   - 失败量
   - 平均响应时延
4. 通过后再扩大到 AI Bot / 其他 IVR。
5. 最终确认是否停用百度 MRCP Server 进程。

### 4.1 阶段4灰度范围建议

建议不要把阶段4理解为“阶段3联调通过后直接全量切换”，而是按固定灰度层级逐步放量。

建议灰度顺序：

1. 先灰度单一测试 DID 或单一 IVR 分机，只覆盖内部测试人员
2. 再灰度一条低风险 IVR 流程，例如固定欢迎语播报、简单回声测试、单轮 AI Bot
3. 再灰度单个租户或单个号码段，验证真实业务呼叫但控制影响面
4. 最后才扩大到多租户、多 IVR、主业务入口

建议每一层灰度都保留三种切换粒度：

- 按 DID / 分机切换
- 按 IVR 流程切换
- 按租户切换

这样做的目的是：任何一层出现异常，都可以只回滚当前灰度面，而不是回滚整套 MRCP 改造。

### 4.2 阶段4建议指标口径

建议不要只记录“有没有报错”，而是明确对比 `baidu` 与 `java-mrcp` 两条链路的同口径指标。

建议首批核心指标：

- 首包时延：从 FreeSWITCH 发起 `SPEAK` 到首段可播报音频可用的时间
- TTS 播报完成率：发起 `SPEAK` 后最终完成播报且未异常中断的比例
- ASR 成功率：发起 `RECOGNIZE` 后返回有效识别文本或有效 completion event 的比例
- 识别准确率：抽样比对识别文本与人工预期结果的接近程度
- 呼损率：因 MRCP 异常导致中断、无声、超时、识别失败而影响通话的比例
- 回退触发率：命中 fallback 并切回 `baidu` 或降级路径的比例

建议同时记录下面几类运行指标：

- MRCP 请求总量，按 `SPEAK` / `RECOGNIZE` / 事件类型拆分
- 请求超时量，区分 TTS 超时与 ASR 超时
- 请求失败量，区分 provider 失败、媒体失败、profile 路由失败
- 平均响应时延与 P95/P99 时延
- 当前灰度命中量，区分租户、号码、IVR 三个维度

### 4.3 阶段4建议观察窗口

建议每个灰度层级都设置固定观察窗口，不要当日一通过就直接继续放量。

建议观察节奏：

1. 单测试 DID / 测试分机：连续验证至少 20 到 50 通测试呼叫
2. 单 IVR 流程灰度：观察至少半天到 1 天，覆盖工作时段真实呼叫
3. 单租户或单号码段灰度：观察至少 1 到 3 天，覆盖高峰与低峰时段
4. 主链路放量前：至少完成一次工作日高峰时段观察

若观察窗口内出现持续超时、无声、播报截断、ASR 结果不可用、回退频繁等现象，应停止扩量，先回到上一层灰度面修复。

### 4.4 阶段4建议回滚动作

阶段4必须把回滚设计成标准动作，而不是临时排查时再想办法。

建议首批回滚动作：

1. 通过 `MrcpProfileResolver` 或 rollout 配置，先把目标 DID / IVR / 租户切回 `baidu`
2. 如果 Java 服务有问题但 FreeSWITCH 仍正常，直接停用 `java-mrcp` 灰度命中，让业务继续走 `baidu` profile
3. 如果测试分机配置已改动，保留一键切回 `unimrcp:profile=baidu` 的配置模板或脚本说明
4. 如果 Java MRCP Server 存在资源泄漏、雪崩超时、异常堆积，再停 Java 服务进程，但不要先动 `baidu` 服务

建议把“不需要改代码即可回滚”作为阶段4通过前提之一。换句话说，回滚应优先依赖配置切换，而不是重新发版。

### 4.5 阶段4建议停用条件

是否最终停用百度 MRCP Server，不应只看“新链路能跑”，而应满足更严格条件。

建议停用前至少满足：

- `java-mrcp` 已覆盖目标业务流，并连续一段观察窗口内稳定运行
- 核心指标不低于当前 `baidu` 路径，或在业务可接受范围内
- TTS、ASR、失败回退、灰度切换、健康检查、日志追踪都已在生产验证过
- 回滚预案经过至少一次真实演练，确认可在短时间内切回 `baidu`
- 运维侧已确认 Java MRCP Server 的部署、重启、日志、端口、健康检查方案稳定可用

若以上条件没有全部满足，建议保留 `baidu` 作为长期保底链路，而不是急于停服。

### 4.6 阶段4建议里程碑

- 里程碑 A：测试 DID / 测试分机灰度稳定，`java-mrcp` 基本指标可观测
- 里程碑 B：单 IVR 流程灰度稳定，TTS/ASR 成功率达到可接受门槛
- 里程碑 C：单租户或单号码段灰度稳定，且已验证显式回滚路径
- 里程碑 D：多业务入口扩量稳定，`MrcpProfileResolver` 与 fallback 机制在真实流量下可用
- 里程碑 E：是否停用 `baidu` 服务具备独立决策依据，而不是被动替换

## 6. 模块与代码改造建议

## 6.1 推荐新增结构

建议不要把生产实现继续放在现在的示例目录语义里。考虑到 `enterprise/call` 已经依赖 `bytedesk-module-call` 和 `bytedesk-enterprise-ai`，更合理的生产落点应放在 `enterprise/call`，而不是让 `modules/call` 反向依赖 enterprise 模块。

建议收敛成更明确的包结构：

```text
modules/call/src/main/java/com/bytedesk/call/
   mrcp4j/
   mrcp/
      protocol/
      sip/
      sdp/
      rtp/
      media/

enterprise/call/src/main/java/com/bytedesk/call/mrcp/
  config/
  server/
   bridge/
   adapter/
   media/
  asr/
  tts/
  health/
   rollout/
```

其中建议职责划分如下：

- `modules/call/.../mrcp4j`：保留为底层协议实现或 vendorized library
- `modules/call/.../mrcp/protocol`：承接对 vendored mrcp4j 的轻量封装、请求/响应模型补充、公共常量
- `modules/call/.../mrcp/sdp`：承接 SDP 解析、MRCP/audio 目标提取、会话描述建模
- `modules/call/.../mrcp/rtp`：承接 RTP packet/session、payload 解析、收发基础能力
- `modules/call/.../mrcp/media`：承接 pipeline、reader、sender、文件或字节流级的媒体桥接基础件
- `modules/call/.../mrcp/sip`：仅在决定自带 Java SIP 协商层时引入；不是第一阶段必需项
- `enterprise/call/.../mrcp/server`：承接 MRCP Server 启动、request handler、Spring 生命周期管理
- `enterprise/call/.../mrcp/bridge`：承接 `AsrService` / `TtsService` 桥接、参数映射、结果转换
- `enterprise/call/.../mrcp/adapter`：承接更底层的 provider 抽象、供应商切换、失败回退
- `enterprise/call/.../mrcp/media`：承接对 `modules/call` 媒体基础层的装配，决定是走录音文件模式还是 Java RTP 直连模式
- `enterprise/call/.../mrcp/rollout`：承接 profile 选择、灰度开关、租户级/号码级路由策略

### 6.1.1 模块边界原则

这次拆分的核心不是“代码放两个目录”，而是明确两类模块的职责边界：

- `modules/call` 只放开源可复用的协议基础层，不放任何企业语音供应商、租户策略、收费能力或 `enterprise/ai` 直接桥接代码。
- `enterprise/call` 承接所有与现有企业能力强绑定的生产逻辑，包括 `AsrService`、`TtsService`、灰度切换、配置策略、监控与容错。
- `modules/call` 应当可以脱离 `enterprise/*` 独立编译、独立复用。
- `enterprise/call` 可以依赖 `modules/call`，但 `modules/call` 不能反向依赖 `enterprise/call` 或 `enterprise/ai`。

换句话说：

- `modules/call` 解决“怎么说协议、怎么收发媒体、怎么表示会话”
- `enterprise/call` 解决“接到 MRCP 请求之后调用谁、怎么灰度、怎么监控、怎么对接现有企业 AI 能力”

### 6.1.2 明确哪些代码应该放在哪一层

适合放在 `modules/call` 的代码：

- 从 `java-sip-mrcp` 复制或重构出来的 `sdp/`, `rtp/`, `media/`, `sip/` 基础层
- 与具体供应商无关的 MRCP 参数模型、会话模型、事件模型
- 与 Spring Boot、数据库、租户配置无关的纯协议与媒体工具类

补充说明：`org.jlibrtp` 已从当前仓库移除，因此 `modules/call` 的 RTP/media 基础层默认只围绕 `java-sip-mrcp` 复制后的实现继续演进。

适合放在 `enterprise/call` 的代码：

- `SpeechSynthRequestHandler`、`RecogOnlyRequestHandler` 这类生产 request handler
- `AsrService` / `TtsService` 桥接实现
- provider adapter、模型/音色/超时等配置映射
- 灰度开关、profile 路由、租户策略、号码策略
- 健康检查、指标上报、告警、失败回退

不应放在 `modules/call` 的代码：

- 任何直接注入 `AsrService`、`TtsService` 的 Spring Bean
- 任何租户级业务配置、License 控制、企业版灰度逻辑
- 任何依赖 `enterprise/ai` 的实现代码

### 6.1.3 依赖方向约束

建议把依赖方向固定为：

```text
FreeSWITCH / UniMRCP
   -> enterprise/call mrcp server / bridge / rollout
   -> modules/call mrcp4j / protocol / sdp / rtp / media
   -> enterprise/ai asr / tts
```

约束如下：

- `enterprise/call -> modules/call`：允许
- `enterprise/call -> enterprise/ai`：允许
- `modules/call -> enterprise/call`：禁止
- `modules/call -> enterprise/ai`：禁止

这样做的好处是：未来即使 `enterprise/call` 的 ASR/TTS provider 换成别的实现，`modules/call` 的协议基础层也不需要跟着改。

### 6.1.4 首批实施顺序

为了符合“上层在 enterprise/call，基础层在 modules/call”的拆分原则，首批改造建议按下面顺序推进：

1. 先在 `modules/call` 落地第一批基础层：`mrcp/sdp`, `mrcp/rtp`, `mrcp/media`
2. 再在 `enterprise/call` 建立 `mrcp/server`, `mrcp/bridge`, `mrcp/adapter`
3. 第一阶段先不引入完整 `sip/` 子层，除非 PoC 证明仅靠现有 FreeSWITCH/UniMRCP 侧协商无法满足
4. 第一阶段先走 `TtsService` + 文件式 ASR，降低媒体面复杂度
5. 第二阶段再评估是否把 `java-sip-mrcp` 的 `sip/` 子层复制到 `modules/call`
6. 在 RTP 主线 PoC 中持续补齐 `java-sip-mrcp` 派生的 `rtp/media` 能力缺口，不再维护第二条 RTP 实现路线

#### enterprise/call 阶段2建议类清单

为了避免阶段2真正开工时又退回到“先建哪些类”的讨论，建议把 `enterprise/call` 首批生产实现先收敛为下面这一组最小闭环类。

`config/` 建议首批落类：

- `MrcpServerProperties`：承接 `bytedesk.call.mrcp.server.*`、`provider.*`、`tts.*`、`asr.*` 等配置项
- `MrcpRolloutProperties`：承接 profile 切换、灰度范围、默认 provider 等路由配置
- `MrcpServerConfiguration`：负责装配 server、bridge、adapter、health 所需 Bean

`server/` 建议首批落类：

- `BytedeskMrcpServer`：对 vendored mrcp4j server 能力做 Spring 化封装，统一启动/停止入口
- `MrcpServerLifecycle`：承接 `SmartLifecycle` 或等价生命周期管理，保证随 Spring Boot 启停
- `MrcpServerFactory`：根据配置构建 server、handler、资源 registry
- `SpeechSynthRequestHandler`：承接 `SPEAK` / `STOP` / `BARGE-IN-OCCURRED` 相关最小 TTS 请求处理
- `RecogOnlyRequestHandler`：承接 `RECOGNIZE` / `STOP` / `GET-PARAMS` 相关最小 ASR 请求处理
- `MrcpRequestContext`：沉淀 channelId、requestId、tenant、profile、voice、codec 等请求上下文

`bridge/` 建议首批落类：

- `MrcpTtsBridge`：定义 MRCP TTS 请求到企业 TTS 能力的桥接接口
- `MrcpAsrBridge`：定义 MRCP ASR 请求到企业 ASR 能力的桥接接口
- `DefaultMrcpTtsBridge`：把 `SpeechSynthRequestHandler` 请求参数映射为 `TtsService` 调用
- `DefaultMrcpAsrBridge`：把 `RecogOnlyRequestHandler` 请求参数映射为 `AsrService` 调用
- `MrcpResultMapper`：统一把 `AsrService` / `TtsService` 结果映射为 MRCP response / event

`adapter/` 建议首批落类：

- `TtsProviderAdapter`：抽象具体 TTS provider 调用约定
- `AsrProviderAdapter`：抽象具体 ASR provider 调用约定
- `EnterpriseTtsProviderAdapter`：默认接当前 `TtsService`
- `EnterpriseAsrProviderAdapter`：默认接当前 `AsrService`
- `ProviderFallbackPolicy`：承接 provider 失败回退与降级策略

`media/` 建议首批落类：

- `MrcpMediaSession`：抽象一次 MRCP 媒体会话需要的输入/输出资源
- `MrcpMediaSessionFactory`：根据 profile、codec、模式构建 file 或 RTP 媒体会话
- `MrcpAsrMediaResolver`：为 ASR 解析录音文件、本地文件、业务锚点或可访问 URL 输入
- `TtsAudioResourceResolver`：为 TTS 解析输出音频文件路径、缓存地址、可回放 URL
- `TelephonyAudioTranscoder`：对接电话侧 WAV/PCM 格式要求；可以先薄封装现有 `TtsService` 转码能力

`health/` 建议首批落类：

- `MrcpHealthIndicator`：暴露 MRCP server、bridge、adapter 基础健康状态
- `MrcpProviderHealthService`：探测 ASR/TTS provider 可用性、超时、最近错误
- `MrcpMetricsRecorder`：记录请求量、成功率、耗时、回退次数

`rollout/` 建议首批落类：

- `MrcpProfileResolver`：根据租户、号码、IVR、开关选择 `baidu-server` 或 `java-mrcp`
- `MrcpRolloutPolicy`：抽象灰度命中规则与阶段切流策略
- `DefaultMrcpRolloutPolicy`：默认实现按配置生效的 profile 选择逻辑

其中首批必须先落地的最小闭环类可以再压缩为：

- `MrcpServerProperties`
- `MrcpServerConfiguration`
- `BytedeskMrcpServer`
- `MrcpServerLifecycle`
- `SpeechSynthRequestHandler`
- `RecogOnlyRequestHandler`
- `MrcpTtsBridge`
- `MrcpAsrBridge`
- `DefaultMrcpTtsBridge`
- `DefaultMrcpAsrBridge`
- `EnterpriseTtsProviderAdapter`
- `EnterpriseAsrProviderAdapter`
- `MrcpResultMapper`
- `AsrAudioSourceResolver`
- `TtsAudioResourceResolver`
- `MrcpProfileResolver`

#### enterprise/call 阶段2建议实施顺序

建议阶段2不要一次把所有 adapter、health、rollout 都做满，而是按“能启动、能说、能识别、再治理”的顺序推进。

1. 先落 `config/ + server/` 的最小骨架：`MrcpServerProperties`、`MrcpServerConfiguration`、`BytedeskMrcpServer`、`MrcpServerLifecycle`
2. 再落 TTS 主链路：`SpeechSynthRequestHandler` -> `MrcpTtsBridge` -> `DefaultMrcpTtsBridge` -> `EnterpriseTtsProviderAdapter` -> `TtsService`
3. TTS 打通后再落 ASR 文件模式主链路：`RecogOnlyRequestHandler` -> `MrcpAsrBridge` -> `DefaultMrcpAsrBridge` -> `EnterpriseAsrProviderAdapter` -> `AsrService`
4. 在 TTS/ASR 主链路稳定后继续完善 `MrcpResultMapper`、`MrcpRequestContext`、`MrcpAsrMediaResolver`、`MrcpMediaSessionFactory`、`TtsAudioResourceResolver`，统一请求上下文、媒体会话和结果输出
5. 最后补 `health/` 与 `rollout/`：先加 `MrcpHealthIndicator`、`MrcpProviderHealthService`，再加 `MrcpProfileResolver`、`MrcpRolloutPolicy`

对应到可验证里程碑，建议拆成：

- 里程碑 A：Spring Boot 启动后能拉起 Java MRCP Server
- 里程碑 B：`SPEAK` 可调用 `TtsService` 产出电话侧可播报音频
- 里程碑 C：`RECOGNIZE` 可基于录音文件或 URL 调用 `AsrService` 返回识别结果
- 里程碑 D：支持 `baidu-server` / `java-mrcp` profile 选择、健康检查和基础指标输出

### 6.1.5 首批建议复制的具体类清单

为了避免后续真正落地时再次回到“先拷哪些文件”的讨论，建议按“先少后多、先闭环后扩展”的原则，把 `java-sip-mrcp` 的复制目标拆成三批。

#### modules/call 阶段1建议类分组

为了让阶段1不只是“复制一批文件”，建议把 `modules/call` 里要形成的最小基础层再压成几个明确的小组，每组各自解决一个单一问题。

`protocol/` 建议首批落类：

- `MrcpChannelType`：统一表达 `SPEECHSYNTH`、`SPEECHRECOG` 等 MRCP channel 类型
- `MrcpMessageConstants`：沉淀常用 header、状态码、content-type、事件名常量
- `MrcpSessionDescriptor`：承接一次 MRCP 会话的目标地址、资源类型、媒体信息摘要
- `MrcpMediaResource`：抽象上层可消费的媒体输入/输出资源描述

补充说明：`protocol/` 首批不要求大量新增实现，但建议至少先有一层 bytedesk 内部抽象，避免 `enterprise/call` 未来直接绑死在 vendored `mrcp4j` 和原始 `peers.*` 类型上。

`sdp/` 建议首批落类：

- `Codec`
- `MediaDescription`
- `MediaDestination`
- `MrcpClientDestination`
- `RFC4566`
- `SdpParser`
- `SessionDescription`
- `BytedeskSdpParser`：对外提供更稳定的解析入口，负责屏蔽复制代码内部细节
- `SdpSessionMapper`：把原始 SDP 解析结果映射为 `MrcpSessionDescriptor`

`rtp/` 建议首批落类：

- `RtpPacket`
- `RtpParser`
- `RtpSession`
- `RtpListener`
- `RFC3551`
- `RFC4733`
- `BytedeskRtpSessionFactory`：统一创建 RTP session、端口、listener 绑定逻辑
- `RtpPayloadRouter`：负责把 RTP payload 导向 file、pipe 或上层 reader

`media/` 建议首批落类：

- `MediaMode`
- `SoundSource`
- `RtpSender`
- `CaptureRtpSender`
- `IncomingRtpReader`
- `FileReader`
- `PipedStreamReader`
- `MediaStreamBridge`：把 RTP reader / sender 统一封装为 bytedesk 可装配媒体桥
- `MediaResourceFactory`：统一创建 file / pipe 两类媒体资源

其中首批必须先落地的最小闭环类可以再压缩为：

- `SdpParser`
- `SessionDescription`
- `MediaDescription`
- `MediaDestination`
- `MrcpClientDestination`
- `RtpPacket`
- `RtpParser`
- `RtpSession`
- `RtpListener`
- `IncomingRtpReader`
- `FileReader`
- `PipedStreamReader`
- `BytedeskSdpParser`
- `SdpSessionMapper`
- `BytedeskRtpSessionFactory`
- `MediaStreamBridge`
- `MediaResourceFactory`

#### modules/call 阶段1建议实施顺序

建议阶段1也不要按“先全部复制完再说”的方式推进，而是按“先可解析、再可收流、再可桥接、最后再补媒体增强”的顺序推进。

1. 先建空包结构和内部抽象骨架：`protocol/`、`sdp/`、`rtp/`、`media/`，先补 `MrcpSessionDescriptor`、`MrcpMediaResource` 这类 bytedesk 内部模型
2. 再复制并收敛 `sdp/` 第一批类，先形成 `BytedeskSdpParser` + `SdpSessionMapper`，目标是稳定提取 MRCP/audio 目标地址、端口、codec 信息
3. 在 SDP 稳定后复制并收敛 `rtp/` 第一批类，补 `BytedeskRtpSessionFactory`，目标是能建立最小 RTP session 并接收 payload
4. 在 RTP 可收流后复制并收敛 `media/` 第一批类，补 `MediaStreamBridge` + `MediaResourceFactory`，目标是能把媒体流转成 file 或 pipe 资源
5. 第一轮闭环完成后，再按需要引入 `Encoder`、`Decoder`、`Pcma/Pcmu`、`DtmfFactory` 这类第二批增强类，不要让它们阻塞首轮编译闭环

对应到可验证里程碑，建议拆成：

- 里程碑 A：`modules/call` 新包结构可独立编译，且不反向依赖 `enterprise/*`
- 里程碑 B：能从 SDP 中稳定提取 MRCP 控制面和 audio 媒体面目标信息
- 里程碑 C：能建立最小 RTP session，并把接收到的 payload 导向 file 或 pipe
- 里程碑 D：能给 `enterprise/call` 提供稳定的媒体输入桥接点，支撑后续 `AsrService` / `TtsService` 接入

#### 第一批：必须优先复制，用于打通最小 RTP/media 主线

这一批的目标不是做完整 SIP 电话栈，而是先让 `modules/call` 具备最小可用的 SDP 解析、RTP 收发和媒体桥接能力。

建议优先复制：

- `peers/sdp/Codec.java`
- `peers/sdp/MediaDescription.java`
- `peers/sdp/MediaDestination.java`
- `peers/sdp/MrcpClientDestination.java`
- `peers/sdp/RFC4566.java`
- `peers/sdp/SdpParser.java`
- `peers/sdp/SessionDescription.java`
- `peers/rtp/RtpPacket.java`
- `peers/rtp/RtpParser.java`
- `peers/rtp/RtpSession.java`
- `peers/rtp/RtpListener.java`
- `peers/rtp/RFC3551.java`
- `peers/rtp/RFC4733.java`
- `peers/media/MediaMode.java`
- `peers/media/SoundSource.java`
- `peers/media/RtpSender.java`
- `peers/media/CaptureRtpSender.java`
- `peers/media/IncomingRtpReader.java`
- `peers/media/FileReader.java`
- `peers/media/PipedStreamReader.java`

这批代码复制后的推荐落位：

- `com.bytedesk.call.mrcp.sdp`
- `com.bytedesk.call.mrcp.rtp`
- `com.bytedesk.call.mrcp.media`

这一批复制完成后，应当先只验证以下能力：

- 能解析 audio + MRCP 相关 SDP 信息
- 能建立最小 RTP session
- 能把媒体流导向 file 或 pipe
- 能为上层 `enterprise/call` 提供稳定的输入桥接点

#### 第二批：建议在第一批跑通后再复制，用于提升媒体可用性

这一批的重点是补齐 codec encode/decode、回声/DTMF 这类媒体辅助能力，但不应阻塞第一批 PoC。

建议第二批再评估复制：

- `peers/media/Encoder.java`
- `peers/media/Decoder.java`
- `peers/media/PcmaEncoder.java`
- `peers/media/PcmaDecoder.java`
- `peers/media/PcmuEncoder.java`
- `peers/media/PcmuDecoder.java`
- `peers/media/DtmfFactory.java`
- `peers/media/Echo.java`
- `peers/media/AbstractSoundManager.java`

对这一批的处理建议是：

- 如果当前 PoC 仅走文件式 ASR 和电话 WAV TTS，这一批不必首轮全部复制
- 只有当 RTP 实时链路明确需要 G.711 编解码、DTMF 或更强媒体处理时，再逐项引入

#### 第三批：仅在需要自带 SIP 协商层时再复制

这一批不是第一阶段默认范围。只有当后续确认不能完全依赖现有 FreeSWITCH / UniMRCP 外侧协商时，才进入复制范围。

建议届时从以下层开始评估：

- `peers/sip/core/useragent/*`
- `peers/sip/transaction/*`
- `peers/sip/transport/*`
- `peers/sip/syntaxencoding/*`
- `peers/Config.java`
- `peers/JavaConfig.java`
- `peers/XmlConfig.java`

这一批的原则是：

- 只在确认需要 Java 侧自带 SIP 协商时才引入
- 不应因为想“提前准备”就把整套 SIP 栈先搬进 `modules/call`

#### 不建议复制进当前仓库的类

为了控制后续维护成本，建议在文档中明确下面几类暂不进入首批复制范围：

- `java-sip-mrcp` 仓库自带的 `mrcp/mrcp4j` fork
- 与旧版 Spring Boot、旧日志体系强绑定的外围装配代码
- 仅用于 demo、调试、样例入口的 client 侧类，例如 `MrcpJavaClient`

#### 复制时的统一改造动作

即使是建议直接复制的类，也不建议原样落库。每一批复制时都应同步做以下改造：

1. 统一包名前缀到 `com.bytedesk.call.mrcp.*`
2. 去掉对原仓库 `Logger`、`Config`、`UserAgent` 的强耦合引用，改为 bytedesk 内部接口或轻量 facade
3. 删除只服务于 demo 或本地文件调试的分支逻辑
4. 对外暴露更稳定的 bytedesk 内部抽象，而不是把原始 `peers.*` API 直接暴露给 `enterprise/call`
5. 每复制完一批，就先在 `modules/call` 做单批编译验证，再让 `enterprise/call` 接入

若后续确实要把 `java-sip-mrcp` 的经验吸收到当前项目，建议只新增“同职责层”，不要复制其包结构：

```text
modules/call/src/main/java/com/bytedesk/call/mrcp/
   sip/
   sdp/
   media/

enterprise/call/src/main/java/com/bytedesk/call/mrcp/
    bridge/
    server/
    rollout/
```

其中：

- `sip/`：可在确认需要时从 `java-sip-mrcp` 复制一套初始 SIP 协商层，再逐步按当前项目风格整理
- `sdp/`：优先复制其 SDP 解析与 MRCP/audio 目标提取层
- `media/`：优先复制其 pipeline/reader/sender 思路，并结合现有录音文件路径或同源 `rtp/` 子层实现输入桥接
- `bridge/`：只放在 `enterprise/call`，用于连接 MRCP 请求与 `AsrService` / `TtsService`
- `server/`：只放在 `enterprise/call`，用于承接可运行的 Spring Boot 服务入口
- `rollout/`：只放在 `enterprise/call`，用于承接 profile 切换和灰度策略

这样可以避免错误的模块依赖方向，同时复用当前 enterprise AI 已有能力。

## 6.2 推荐配置项

建议未来增加类似配置：

```properties
bytedesk.call.mrcp.mode=baidu-server
bytedesk.call.mrcp.enabled=true
bytedesk.call.mrcp.profile=java-mrcp
bytedesk.call.mrcp.server.port=1544
bytedesk.call.mrcp.provider.asr=dashscope
bytedesk.call.mrcp.provider.tts=dashscope
bytedesk.call.mrcp.asr.mode=recording-file
bytedesk.call.mrcp.tts.voice=longanhuan
bytedesk.call.mrcp.tts.audio-format=wav
```

其中：

- `baidu-server`：继续走现有百度 MRCP Server
- `java-gateway`：走自研 Java MRCP Gateway / Server

补充说明：

- `bytedesk.call.mrcp.asr.mode=recording-file` 建议作为第一阶段默认值
- 等后续实时流式识别打通后，再考虑扩展为 `streaming`

## 7. 建议的实施顺序

建议优先级如下：

1. **先做 TTS 替换 PoC**
   原因：TTS 一般比实时 ASR 更容易验证，链路更短，问题更容易收敛。
2. **再做 ASR 替换 PoC**
   原因：ASR 涉及超时、事件回调、识别结果格式，复杂度更高。
3. **最后再切 AI Bot / IVR 正式流程**

## 8. 第一批真正开工的类和文件清单

前面阶段 1 到阶段 4 已经把方向、边界、灰度和治理拆开了。若真正进入编码阶段，建议不要“按章节开工”，而是压成下面 4 个实现批次，每个批次都要求有明确完成标准。

### 8.1 批次 A：先把 `modules/call` 的最小基础层立起来

目标：先让 `modules/call` 具备可编译、可解析 SDP、可建立最小 RTP 会话、可向上提供 file / pipe 媒体桥接点的能力。

建议优先创建或复制整理的文件：

- `modules/call/src/main/java/com/bytedesk/call/mrcp/protocol/MrcpChannelType.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/protocol/MrcpMessageConstants.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/protocol/MrcpSessionDescriptor.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/protocol/MrcpMediaResource.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/sdp/BytedeskSdpParser.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/sdp/SdpSessionMapper.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/rtp/BytedeskRtpSessionFactory.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/rtp/RtpPayloadRouter.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/media/MediaStreamBridge.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/media/MediaResourceFactory.java`

这一批同时需要从 `java-sip-mrcp` 首批复制并整理的原始类：

- `peers/sdp/Codec.java`
- `peers/sdp/MediaDescription.java`
- `peers/sdp/MediaDestination.java`
- `peers/sdp/MrcpClientDestination.java`
- `peers/sdp/RFC4566.java`
- `peers/sdp/SdpParser.java`
- `peers/sdp/SessionDescription.java`
- `peers/rtp/RtpPacket.java`
- `peers/rtp/RtpParser.java`
- `peers/rtp/RtpSession.java`
- `peers/rtp/RtpListener.java`
- `peers/rtp/RFC3551.java`
- `peers/rtp/RFC4733.java`
- `peers/media/MediaMode.java`
- `peers/media/SoundSource.java`
- `peers/media/RtpSender.java`
- `peers/media/CaptureRtpSender.java`
- `peers/media/IncomingRtpReader.java`
- `peers/media/FileReader.java`
- `peers/media/PipedStreamReader.java`

这一批完成标准：

- `modules/call` 新增 `mrcp/protocol`、`mrcp/sdp`、`mrcp/rtp`、`mrcp/media` 后可独立编译
- 能从 SDP 中抽取 MRCP/audio 目标地址、端口、codec 信息
- 能建立最小 RTP 会话并把媒体流导向 file 或 pipe
- 不引入 `enterprise/ai` 或 `enterprise/call` 反向依赖

### 8.2 批次 B：先把 Java MRCP Server 骨架和 TTS 主链路打通

目标：先打通最短链路，也就是 `SPEAK -> TtsService`，优先拿到一个可被 FreeSWITCH 调起的 TTS PoC。

建议优先创建的文件：

- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/config/MrcpServerProperties.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/config/MrcpRolloutProperties.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/config/MrcpServerConfiguration.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/BytedeskMrcpServer.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/MrcpServerLifecycle.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/MrcpServerFactory.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/SpeechSynthRequestHandler.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/MrcpRequestContext.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/MrcpTtsBridge.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/DefaultMrcpTtsBridge.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/adapter/TtsProviderAdapter.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/adapter/EnterpriseTtsProviderAdapter.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/media/TtsAudioResourceResolver.java`

这一批完成标准：

- Spring Boot 启动后能拉起 Java MRCP Server
- `SpeechSynthRequestHandler` 能调用 `TtsService`
- 能生成电话侧可播放音频，至少支持当前电话 WAV 输出路径
- 失败时能输出可追踪日志，不要求首轮就做完整 fallback

### 8.3 批次 C：再补 ASR 文件模式主链路，不先碰实时流式复杂度

目标：在 TTS 跑通后，再补 `RECOGNIZE -> AsrService`，但首轮只支持录音文件、本地文件或可访问 URL 识别。

请求体约定建议同步固定：

- `text/plain`：请求体直接放录音 URL、本地绝对路径、`file:` URI、既有 `recordFile`，或者使用 `threadUid:<value>`、`recordingUid:<value>`、`cdrUid:<value>` 让服务端反查录音
- `application/json`：至少支持 `fileUrl`、`recordFile`、`url`、`location`、`threadUid`、`recordingUid`、`cdrUid`、`model`、`language`、`contentType`
- 若只传业务锚点，服务端优先按 `recordingUid`、`cdrUid` 或 `orgUid + threadUid` 查出 `recordFile`，再进入 `AsrService`
- 首轮识别结果先返回纯文本 response / `RECOGNITION-COMPLETE` event，后续再补更完整的 MRCP 结果映射

建议优先创建的文件：

- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/RecogOnlyRequestHandler.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/MrcpAsrBridge.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/DefaultMrcpAsrBridge.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/adapter/AsrProviderAdapter.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/adapter/EnterpriseAsrProviderAdapter.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/media/MrcpAsrMediaResolver.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/MrcpResultMapper.java`

若文件式 ASR PoC 证明仍需要 Java 直接处理 RTP，再继续补：

- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/media/MrcpMediaSession.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/media/MrcpMediaSessionFactory.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/media/TelephonyAudioTranscoder.java`

其中前两者现在已经有最小骨架，当前仍缺的是真正 RTP capture 到录音文件的落盘实现。

这一批完成标准：

- `RecogOnlyRequestHandler` 可调用 `AsrService`
- 能基于录音文件、本地文件或 URL 返回识别文本
- 识别结果可映射回 MRCP response / completion event
- 首轮不要求实时流式 ASR，但要为后续 RTP 直连预留媒体会话装配点

### 8.4 批次 D：最后补 profile 切换、治理和联调落点

目标：在基础链路跑通后，再把现有业务入口纳入统一 profile 决策、健康检查、指标和灰度控制中。

建议优先创建或改造的文件：

- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/rollout/MrcpProfileResolver.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/rollout/MrcpRolloutPolicy.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/rollout/DefaultMrcpRolloutPolicy.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/health/MrcpHealthIndicator.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/health/MrcpProviderHealthService.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/health/MrcpMetricsRecorder.java`
- `enterprise/call/src/main/java/com/bytedesk/call/ivr_menu/IvrMenuHttapiController.java`
- `modules/call/src/main/java/com/bytedesk/call/httapi/HttapiController.java`
- `deploy/freeswitch/conf/autoload_configs/unimrcp.conf.xml`
- `deploy/freeswitch/conf/dialplan/default/92-ai-bot.xml`

这一批完成标准：

- `baidu` / `java-mrcp` profile 可按 DID、IVR、租户维度切换
- 测试分机与至少一条业务链路可在 `java-mrcp` 下跑通 TTS / 文件式 ASR
- 能看到健康检查、基础指标和失败日志
- 保留显式回滚路径，可在不改代码情况下切回 `baidu`

### 8.5 建议的首批开工顺序

如果只允许非常小步快跑，建议按下面顺序逐个落文件，而不是大面积并行开工：

1. 先做批次 A 中的 `protocol/ + sdp/` 骨架，再补 `rtp/media`
2. 再做批次 B 中的 `MrcpServerProperties`、`MrcpServerConfiguration`、`BytedeskMrcpServer`、`SpeechSynthRequestHandler`
3. TTS 跑通后，再做批次 C 中的 `RecogOnlyRequestHandler`、`MrcpAsrBridge`、`MrcpAsrMediaResolver`
4. 最后再做批次 D 中的 `MrcpProfileResolver`、控制器 profile 改造、FreeSWITCH profile 联调

换句话说，真正第一批要写的最小文件集可以再压成下面 12 个：

- `modules/call/.../protocol/MrcpSessionDescriptor.java`
- `modules/call/.../sdp/BytedeskSdpParser.java`
- `modules/call/.../sdp/SdpSessionMapper.java`
- `modules/call/.../rtp/BytedeskRtpSessionFactory.java`
- `modules/call/.../media/MediaStreamBridge.java`
- `enterprise/call/.../config/MrcpServerProperties.java`
- `enterprise/call/.../config/MrcpServerConfiguration.java`
- `enterprise/call/.../server/BytedeskMrcpServer.java`
- `enterprise/call/.../server/SpeechSynthRequestHandler.java`
- `enterprise/call/.../bridge/MrcpTtsBridge.java`
- `enterprise/call/.../bridge/DefaultMrcpTtsBridge.java`
- `enterprise/call/.../adapter/EnterpriseTtsProviderAdapter.java`

这 12 个文件的意义不是“全部功能完成”，而是先把 `modules/call` 基础层、Java MRCP Server 启动骨架、TTS 主链路三个关键控制点立起来。只要这一步能过，后面的 ASR、rollout、治理都会自然接上。

### 8.6 这 12 个文件的逐文件编码顺序

如果要把这 12 个文件继续压成真正的编码顺序，建议按“先模型与解析、再服务骨架、再请求处理、最后 provider 接入”的顺序推进。

1. `modules/call/.../protocol/MrcpSessionDescriptor.java`
   首版只需要定义会话级最小字段：MRCP resource、audio host、audio port、MRCP host、MRCP port、codec 列表。
2. `modules/call/.../sdp/BytedeskSdpParser.java`
   首版只负责包装底层 `SdpParser`，提供单一入口方法，例如 `parse(String sdp)`。
3. `modules/call/.../sdp/SdpSessionMapper.java`
   首版只把 SDP 解析结果映射成 `MrcpSessionDescriptor`，先不处理复杂兼容分支。
4. `modules/call/.../rtp/BytedeskRtpSessionFactory.java`
   首版只负责创建最小 RTP session，先满足单向收流或最小收发能力。
5. `modules/call/.../media/MediaStreamBridge.java`
   首版只需要把 RTP/file/pipe 输入统一成上层可消费的媒体桥接接口。
6. `enterprise/call/.../config/MrcpServerProperties.java`
   首版只放最小配置：enabled、host、port、profile、tts provider、asr provider、asr mode。
7. `enterprise/call/.../config/MrcpServerConfiguration.java`
   首版只装配 `BytedeskMrcpServer`、TTS bridge、TTS adapter 等首轮必需 Bean。
8. `enterprise/call/.../server/BytedeskMrcpServer.java`
   首版只封装 vendored mrcp4j server 的启动/停止逻辑，不先混入复杂治理。
9. `enterprise/call/.../server/SpeechSynthRequestHandler.java`
   首版只实现最小 `SPEAK` 请求处理，先不追求完整 MRCP 方法覆盖。
10. `enterprise/call/.../bridge/MrcpTtsBridge.java`
    首版只定义一个稳定的桥接接口，例如“输入请求上下文和文本，输出可播放音频资源”。
11. `enterprise/call/.../bridge/DefaultMrcpTtsBridge.java`
    首版只做参数映射与异常包装，把请求转发给 TTS adapter。
12. `enterprise/call/.../adapter/EnterpriseTtsProviderAdapter.java`
    首版只薄封装 `TtsService`，优先调用现有电话链路友好的音频输出方法。

### 8.7 每个文件首版骨架建议

为了避免首轮就把类写成“大而全”，建议这 12 个文件的第一版都只保留最小职责。

`MrcpSessionDescriptor`

- 定义最小字段与构造方式
- 不在第一版承担解析逻辑
- 不在第一版耦合 Spring 或 provider 概念

`BytedeskSdpParser`

- 只暴露稳定解析入口
- 内部可以委托复制后的 SDP 基础类
- 先不承担容错修复和 profile 决策

`SdpSessionMapper`

- 只做对象映射
- 遇到缺字段时先返回明确异常或空结果
- 先不引入日志统计副作用

`BytedeskRtpSessionFactory`

- 只负责 session 创建与最小 listener 绑定
- 先不引入 codec 转码或 DTMF 逻辑
- 先不承担业务级媒体路由

`MediaStreamBridge`

- 只统一 file / pipe / RTP 三类输入抽象
- 先不承担 provider 调用
- 先不承担缓存、重试或回退

`MrcpServerProperties`

- 只映射最小配置项
- 字段数量先少，不要一开始把所有未来配置都放进来
- 第一版就保证默认值清晰可用

`MrcpServerConfiguration`

- 只做首轮必需 Bean 装配
- 先不引入 rollout、health、metrics 的完整装配
- 保持依赖方向清晰：只依赖 `modules/call` 和现有 `enterprise/ai`

`BytedeskMrcpServer`

- 只负责 server 生命周期
- 对外只暴露 start/stop 或等价能力
- 先不把 handler 细节和 Spring 生命周期搅在一起

`SpeechSynthRequestHandler`

- 只处理 `SPEAK` 主路径
- 先把请求文本、voice、format 映射到 bridge
- 对异常先返回清晰失败，不先做复杂 fallback

`MrcpTtsBridge`

- 只定义桥接契约
- 不在接口层暴露底层 `peers.*` 细节
- 保证后续可替换不同 provider adapter

`DefaultMrcpTtsBridge`

- 只做参数归一化、桥接调用、结果包装
- 第一版优先支持当前最重要的电话 WAV 输出链路
- 先不引入多 provider 路由

`EnterpriseTtsProviderAdapter`

- 只薄封装 `TtsService`
- 优先调用现有 `synthesizeToTelephonyAudioUrl(...)` 或等价电话侧友好方法
- 先不扩展多 voice、多模型、多租户差异策略

### 8.8 首轮完成后再接什么

这 12 个文件第一轮完成后，最合理的后续顺序是：

1. 先补 `RecogOnlyRequestHandler`、`MrcpAsrBridge`、`MrcpAsrMediaResolver`
2. 再补 `MrcpResultMapper`，统一 TTS/ASR 结果映射
3. 再补 `MrcpProfileResolver` 与控制器 profile 切换改造
4. 最后再补 `health/`、`metrics/`、`fallback/` 这类治理能力

这样做的核心原因是：先拿到一条可运行的 TTS PoC，比先把所有抽象层补齐更有验证价值；只要 `SPEAK -> TtsService` 这条链路能跑，后续再补 ASR 和灰度会更稳。

### 8.9 建议压成第 1、2、3 次提交

如果后续要真正开工，建议不要把这 12 个文件一次性堆在一个大提交里，而是压成 3 次可以独立验证的小提交。

#### 提交 1：先立 `modules/call` 最小协议与解析骨架

建议只包含下面这些文件：

- `modules/call/src/main/java/com/bytedesk/call/mrcp/protocol/MrcpSessionDescriptor.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/sdp/BytedeskSdpParser.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/sdp/SdpSessionMapper.java`
- 为了让这三者可用而同步整理的最小 SDP 复制类

这一提交的目标：

- 先把 `modules/call` 的内部抽象和 SDP 解析入口立起来
- 先验证“能解析和表达会话”，还不要求真正收 RTP
- 把第一批最容易出边界问题的依赖方向先固定住

这一提交的完成标准：

- `modules/call` 可编译
- 可从 SDP 解析出最小 `MrcpSessionDescriptor`
- 不引入 `enterprise/*` 依赖

#### 提交 2：再立 RTP / media 最小桥接骨架

建议只包含下面这些文件：

- `modules/call/src/main/java/com/bytedesk/call/mrcp/rtp/BytedeskRtpSessionFactory.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/media/MediaStreamBridge.java`
- `modules/call/src/main/java/com/bytedesk/call/mrcp/rtp/RtpPayloadRouter.java`
- 为了让这三者可用而同步整理的最小 RTP / media 复制类

这一提交的目标：

- 在已有 SDP 解析结果之上补最小 RTP session 创建能力
- 先把媒体桥接点统一出来，给 `enterprise/call` 后续接入留接口
- 仍然不碰 TTS/ASR provider 和业务控制器

这一提交的完成标准：

- 能基于 session 描述创建最小 RTP session
- 能把媒体输入桥接成 file 或 pipe 资源抽象
- `modules/call` 仍保持独立编译和清晰依赖方向

#### 提交 3：先打通 Java MRCP Server 与 TTS 主链路

建议只包含下面这些文件：

- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/config/MrcpServerProperties.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/config/MrcpServerConfiguration.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/BytedeskMrcpServer.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/server/SpeechSynthRequestHandler.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/MrcpTtsBridge.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/bridge/DefaultMrcpTtsBridge.java`
- `enterprise/call/src/main/java/com/bytedesk/call/mrcp/adapter/EnterpriseTtsProviderAdapter.java`

这一提交的目标：

- 先把 Java MRCP Server 启动骨架立起来
- 先跑通 `SPEAK -> TtsService`
- 先拿到一个可联调的 TTS PoC，再决定后续 ASR 与 rollout 的接入顺序

这一提交的完成标准：

- Spring Boot 启动后能拉起 Java MRCP Server
- `SpeechSynthRequestHandler` 能桥接到 `TtsService`
- 至少能产出电话链路可播放音频

#### 为什么建议只先做这 3 次提交

这样拆的原因是：

- 提交 1 先验证基础模型与解析方向是否正确
- 提交 2 再验证 RTP / media 主线是否能在 `modules/call` 独立站住
- 提交 3 才把 `enterprise/call`、`TtsService`、MRCP Server 真正接起来

这能避免一上来把协议层、媒体层、Spring 配置、provider 调用、FreeSWITCH 联调全部堆进一次修改里，后续一旦出问题也更容易定位是在“解析层”、“媒体层”还是“TTS bridge 层”。

### 8.10 第 3 次提交之后再接什么

如果前 3 次提交都顺利通过，后续建议继续按下面顺序推进：

1. 第 4 次提交：补 `RecogOnlyRequestHandler`、`MrcpAsrBridge`、`MrcpAsrMediaResolver`

当前落地增量：

- `MrcpMediaSession` 与 `MrcpMediaSessionFactory` 已落最小骨架，`RECOGNIZE` 已通过 media session 装配输入资源
- 已提供 `RTP_CAPTURE_PLACEHOLDER` 模式，后续可在不改 `SpeechRecogRequestHandler` 主干的前提下补真实 RTP 落盘
- 已补 `MrcpCapturePathStrategy`，默认按 `bytedesk.call.mrcp.capture-recordings-dir=/usr/local/freeswitch/var/lib/freeswitch/recordings/mrcp` 规划 capture 文件路径
- 已补 `MrcpCapturePlan`，capture placeholder 现在不仅有计划路径，还会在准备阶段创建父目录，便于后续直接接入 RTP 写盘执行器
- `MrcpCapturePlan` 已带上 codec、sampleRate、retentionHours、cleanupOnFailure、preparedAt，且 `MrcpCaptureExecutionService` 已有最小占位，可承接后续真实写盘与失败清理
- `MrcpCaptureExecutionService` 现已具备 `verifyReady`、`verifyCompleted`、`cleanupIfNeeded`、`cleanupIfEmpty` 的最小逻辑，后续只需把真实 RTP 写盘接入这条执行边界
- `SpeechRecogRequestHandler` 已接入 capture-aware 骨架：当 `asrMode` 为 `rtp-capture`、`capture` 或 `stream-capture` 且请求未显式携带媒体锚点时，`recognize` 先返回 `IN_PROGRESS`，再由 `getResult` 基于 capture 文件完成度触发后续转写
- `MrcpCapturePlan` / `MrcpCaptureExecutionService` 已新增 sidecar 状态文件路径与 `READY`、`CAPTURING`、`COMPLETED`、`FAILED` 四态；`SpeechRecogRequestHandler#getResult` 已优先依据 capture 状态而不是仅靠音频文件大小判断流转
- `modules/call` 已新增 `RtpCaptureControl`、`RtpCaptureRoute`，并由 `MediaStreamBridge` / `RtpPayloadRouter` 在 RTP capture route 创建时触发 `markCapturing`；`CAPTURING` 状态起点已从 handler 下沉到媒体层接缝
- `modules/call` 已进一步新增 `RtpCaptureFileWriter` 接口、`BasicRtpCaptureFileWriter` 默认实现以及 `RtpCaptureOutput` 句柄；`RtpPayloadRouter` 现在通过 writer 打开 file capture route，capture route 已能持有真实文件输出流并为后续 RTP payload 写入承接完成/失败回调
- `RtpPayloadRouter` / `MediaStreamBridge` 已补最小 `writePayload`、`completeCapture`、`failCapture` 入口，后续 RTP 接收器只需拿到 `RtpCaptureRoute` 并喂入 payload bytes，即可复用现有文件写入与状态流转
- `modules/call` 已新增 `RtpPacketPayloadExtractor` 与 `RtpCaptureReceiver` 最小骨架，当前已能完成 “RTP packet bytes -> payload slice -> capture route output” 的本地 pipeline；后续主要缺口已收敛到真正的 UDP/RTP 网络接入
- `MrcpRecognizePayloadParser` 已支持从 `RECOGNIZE` JSON 里解析 `sdp` 或 `audioHost/audioPort` 为 `MrcpSessionDescriptor`，`SpeechRecogRequestHandler` 也已落第一版 active capture 启用/回退策略：仅在 `asrMode` 允许且 payload 带有效 audio host/port 时启用 active runtime，装配失败时自动回退到 passive planned capture；`UdpRtpCaptureListener` 已从只看 host 的远端过滤收紧为 host + port 双重过滤，并与本地绑定端口语义分离（`localBindPort=0` 表示 OS 分配空闲端口，`<0` 回退到 `session.port()`）
- `RtpPacketPayloadExtractor` 现在也从 RTP 包头暴露 `ssrc` 和 `payloadType`，`RtpCaptureReceiver` 已加入 SSRC/PT 首包锚定与后续包一致性校验，接收流内 SSRC 或 PT 变化会直接抛异常中断 capture
- `BasicRtpCaptureFileWriter` 已将 `markCapturing()` 从文件打开时延时至首次 `write()` 调用，确保 CAPTURING 状态由真实 RTP 数据写入驱动；`SpeechRecogRequestHandler` 已统一 capture 生命周期管理；`RtpCaptureRuntime` 已加入空闲超时自动完成：socket 读超时 2 秒，连续空闲 30 秒后自动 `listener.complete()` 触发完整回调链；阶段 3 FreeSWITCH 联调配置已落地：`unimrcp.conf.xml` 新增 `java-mrcp` profile，`92-ai-bot.xml` 已把 9294/9295/9296/9299 与通用 92xx 入口统一收敛到 `mrcp_profile`，并改为仅在变量缺省时回填默认值，便于外部显式覆盖；`200-ai-bot.xml` 也已对齐为“显式 `mrcp_profile` 优先、否则继承 `unimrcp:profile`、最终回退 `baidu`”；`IvrMenuHttapiController` 和 `HttapiController` 已去掉 `baidu` 硬编码
- FreeSWITCH 侧已补齐并通过 `push-conf.sh` 自动同步 `nlsml_to_text.lua` 到远端 `/usr/local/freeswitch/share/freeswitch/scripts`；2026-07-14 最新实拨日志显示 `9294` 在 `java-mrcp` 下成功播报 `我听到：您好`，`9295` 在 `baidu` 下成功播报 `我听到：今天天气`，阶段3的双 profile 测试分机闭环已完成
- `MrcpRecognizePayloadParser` 已进一步兼容 FreeSWITCH/UniMRCP 更常见的协商字段别名，包括 `switch_r_sdp`、`variable_switch_r_sdp`、`sip_local_sdp_str`、`audio_host/audio_port`、`rtp_host/rtp_port`、`ep_codec_string` 以及部分 `session.*` / `media.*` 嵌套 JSON 结构，方便后续把实际拨测字段直接接入 active capture 主链
- `enterprise/call` 已新增 `MrcpRecognizePayloadParserTest`，把 `switch_r_sdp`、`variable_switch_r_sdp`、snake_case `audio_host/audio_port + ep_codec_string`、以及 `session.*` / `media.*` 嵌套 JSON 四类最小 FreeSWITCH 风格 payload 形态固化为单测样例，便于后续拨测对照与回归验证
- `MrcpRecognizePayloadParserTest` 也已固化混合 payload 的当前优先级行为：当 `variable_switch_r_sdp`、`sip_local_sdp_str`、`session.sdp` 等 SDP 字段与 `media.*`/`audio_*` 同时存在时优先走 SDP；当没有 SDP 时优先取顶层 `audio_*`，再回落到嵌套 `media.*`
- `enterprise/call` 已落地 `rollout/` 包：`MrcpRolloutPolicy` 接口 + `DefaultMrcpRolloutPolicy` + `MrcpProfileResolver`，并补上 `MrcpRolloutProperties` 配置入口，现已支持按租户/分机/IVR 白名单切换、`fallbackProfile` 保底以及 `forceProfile` 显式强制回滚；`IvrMenuHttapiController` 已改为通过 resolver 统一决定 IVR 入口使用的 MRCP profile；`modules/call` 侧新增 `HttapiMrcpProfileResolver` SPI 与默认环境变量实现，`enterprise/call` 再通过 `EnterpriseHttapiMrcpProfileResolver` 适配到同一套 `MrcpProfileResolver`，从而把 AI Bot HTTAPI 与 IVR HTTAPI 的 profile 决策统一到一条控制面；同时 HTTAPI 已支持请求级 `mrcp_profile` 显式覆盖，拨号计划可直接把测试分机当前 profile 透传到 `/ai-bot`，用于双 profile 快速切换与显式回滚验证；`health/` 包：`MrcpHealthIndicator`（Actuator 健康检查）+ `MrcpMetricsRecorder`（SPEAK/RECOGNIZE/STOP 计数）

1. 第 5 次提交：补 `MrcpResultMapper`，统一 TTS/ASR 结果映射
2. 第 6 次提交：补 `MrcpProfileResolver`、HTTAPI controller profile 改造、`java-mrcp` profile 联调
3. 第 7 次提交：补 `health/`、`metrics/`、`fallback/`、灰度治理能力

这样后面的提交顺序会继续保持“先跑通主链路，再补结果映射，再补联调切换，最后补治理”的节奏，整体风险最低。

## 9. 最终结论

## 9.1 是否能使用 mrcp4j 替换百度 MRCP？

**结论：能作为基础能力推进替换，但不能直接替换。**

更精确地说：

- **短期结论**：当前不能直接把 mrcp4j 替换为现网百度 MRCP Server。
- **中期结论**：可以基于 mrcp4j 自建 Java MRCP Server / Gateway，逐步替换百度方案。
- **长期结论**：如果补齐媒体层适配、供应商适配、灰度切换与监控能力，最终完全摆脱百度随包 MRCP Server 是可行的。

## 9.2 推荐决策

建议按照以下决策推进：

- 不要直接改现网 `baidu` profile
- 先立项做 `java-mrcp` PoC
- 先替换 TTS，再替换 ASR
- 成功后再进入业务链路灰度

这比"一步到位替换"更稳妥，也更符合当前代码基础。

---

## 10. 执行进度跟踪（2026-07-16 更新）

### 10.1 总体进度概览

```
阶段0 (评估规划)  ████████████████████ 100% ✅
阶段1 (基础层)    ██████████████████░░  95% ✅ (缺 MediaResourceFactory、第二批媒体增强类暂未引入)
阶段2 (企业层)    ██████████████████░░  95% ✅ (RecogOnly → SpeechRecog 重命名; TtsAudioResourceResolver → MrcpSynthMediaRegistry 重命名)
阶段3 (联调集成)  ████████████████░░░░  85% ✅ (仅缺 RTP capture placeholder → 真实落盘链路)
阶段4 (灰度生产)  ██████░░░░░░░░░░░░░░  30% 🔄 (运行治理组件已落地，可观测性已闭环，灰度/回滚/指标对比未开始)
```

### 10.2 逐项状态明细

#### 阶段0：评估与规划 — ✅ 全部完成

| 任务 | 状态 |
| --- | --- |
| 可行性评估与总体规划 | ✅ |
| java-sip-mrcp 借鉴价值分析 | ✅ |
| 模块边界明确（modules/call vs enterprise/call） | ✅ |
| "还缺哪些组件"盘点 → 建议模块/包名/类名 | ✅ |

#### 阶段1：modules/call 基础层 — ✅ 基本完成

**已完成：**

| 类别 | 文件 | 状态 |
| --- | --- | --- |
| protocol/ | MrcpChannelType.java | ✅ |
| protocol/ | MrcpMessageConstants.java | ✅ |
| protocol/ | MrcpSessionDescriptor.java | ✅ |
| protocol/ | MrcpMediaResource.java | ✅ |
| sdp/ | BytedeskSdpParser.java | ✅ |
| sdp/ | SdpSessionMapper.java | ✅ |
| sdp/ | SdpParser, SessionDescription, MediaDescription 等首批 SDP 复制类 | ✅ |
| rtp/ | BytedeskRtpSessionFactory.java | ✅ |
| rtp/ | RtpPayloadRouter.java | ✅ |
| rtp/ | RtpPacket, RtpParser, RtpSession, RtpListener, RFC3551, RFC4733 等复制类 | ✅ |
| rtp/ | RtpPacketPayloadExtractor.java | ✅ |
| rtp/ | RtpCaptureReceiver.java | ✅ |
| rtp/ | UdpRtpCaptureListener.java | ✅ |
| rtp/ | RtpCaptureRuntime.java | ✅ |
| rtp/ | RtpCaptureFileWriter.java | ✅ |
| rtp/ | BasicRtpCaptureFileWriter.java | ✅ |
| media/ | MediaStreamBridge.java | ✅ |
| media/ | RtpCaptureControl.java (位于 media/) | ✅ |
| media/ | RtpCaptureRoute.java (位于 media/) | ✅ |
| media/ | IncomingRtpReader, FileReader, PipedStreamReader 等复制类 | ✅ |
| 编译 | 最小编译验证 | ✅ |

**未完成：**

| 类别 | 文件 | 状态 | 说明 |
| --- | --- | --- | --- |
| media/ | MediaResourceFactory.java | ❌ 未创建 | 功能通过 enterprise/call 的 MrcpMediaSessionFactory 覆盖 |
| 阶段1-第二批 | Encoder, Decoder, Pcma/Pcmu, DtmfFactory 等 | ⏸️ 暂缓 | 按计划暂未引入，等 RTP 实时链路明确需要时再引入 |

#### 阶段2：enterprise/call 企业层 — ✅ 基本完成

**已完成：**

| 类别 | 文件 | 状态 |
| --- | --- | --- |
| config/ | MrcpServerProperties.java | ✅ |
| config/ | MrcpRolloutProperties.java | ✅ |
| config/ | MrcpServerConfiguration.java | ✅ |
| server/ | BytedeskMrcpServer.java | ✅ |
| server/ | MrcpServerLifecycle.java | ✅ |
| server/ | MrcpServerFactory.java | ✅ |
| server/ | SpeechSynthRequestHandler.java（SPEAK → TtsService） | ✅ |
| server/ | SpeechRecogRequestHandler.java（原 RecogOnlyRequestHandler） | ✅ |
| server/ | MrcpRequestContext.java | ✅ |
| bridge/ | MrcpTtsBridge.java | ✅ |
| bridge/ | DefaultMrcpTtsBridge.java | ✅ |
| bridge/ | MrcpAsrBridge.java | ✅ |
| bridge/ | DefaultMrcpAsrBridge.java | ✅ |
| bridge/ | MrcpResultMapper.java | ✅ |
| adapter/ | TtsProviderAdapter.java | ✅ |
| adapter/ | AsrProviderAdapter.java | ✅ |
| adapter/ | EnterpriseTtsProviderAdapter.java | ✅ |
| adapter/ | EnterpriseAsrProviderAdapter.java | ✅ |
| media/ | MrcpMediaSession.java | ✅ |
| media/ | MrcpMediaSessionFactory.java | ✅ |
| media/ | MrcpAsrMediaResolver.java | ✅ |
| media/ | MrcpCapturePathStrategy.java | ✅ |
| media/ | MrcpCapturePlan.java | ✅ |
| media/ | MrcpCaptureExecutionService.java | ✅ |
| media/ | MrcpSynthMediaRegistry.java（原 TtsAudioResourceResolver） | ✅ |
| health/ | MrcpHealthIndicator.java | ✅ |
| health/ | MrcpMetricsRecorder.java | ✅ |
| rollout/ | MrcpProfileResolver.java | ✅ |
| rollout/ | MrcpRolloutPolicy.java | ✅ |
| rollout/ | DefaultMrcpRolloutPolicy.java | ✅ |
| rollout/ | EnterpriseHttapiMrcpProfileResolver.java | ✅ |

**命名差异说明：**

| 规划名称 | 实际名称 | 说明 |
| --- | --- | --- |
| RecogOnlyRequestHandler | SpeechRecogRequestHandler | 功能等价，命名更规范 |
| TtsAudioResourceResolver | MrcpSynthMediaRegistry | 功能等价，职责更广 |

#### 阶段3：FreeSWITCH 联调集成 — ✅ 基本完成，剩余 1 个尾项

**已完成：**

| 任务 | 状态 |
| --- | --- |
| unimrcp.conf.xml 新增 java-mrcp profile | ✅ |
| 92-ai-bot.xml 收敛 tts/asr/unimrcp profile 为 mrcp_profile 变量 | ✅ |
| 9294 (java-mrcp) / 9295 (baidu) / 9296 / 9299 测试分机 | ✅ |
| 200-ai-bot.xml 对齐 mrcp_profile 优先级 | ✅ |
| TTS PoC：9294/9296/9299 可正常接通并播报 | ✅ |
| ASR 回声验证：9294=java-mrcp ("您好")、9295=baidu ("今天天气") | ✅ |
| nlsml_to_text.lua 部署与 push-conf.sh 自动同步 | ✅ |
| IvrMenuHttapiController 去掉 baidu 硬编码，统一走 MrcpProfileResolver | ✅ |
| HttapiController 去掉 baidu 硬编码，支持请求级 mrcp_profile 显式覆盖 | ✅ |
| HttapiMrcpProfileResolver SPI + EnterpriseHttapiMrcpProfileResolver 适配 | ✅ |
| MrcpProfileResolver + MrcpRolloutPolicy + DefaultMrcpRolloutPolicy | ✅ |
| 按租户/分机/IVR 白名单切换、fallbackProfile 保底、forceProfile 显式回滚 | ✅ |

**剩余尾项：**

| 任务 | 状态 | 说明 |
| --- | --- | --- |
| RTP capture placeholder → 真实落盘链路 | ❌ 未完成 | RTP capture 全套骨架已就位（UdpRtpCaptureListener、RtpCaptureReceiver、BasicRtpCaptureFileWriter、capture state machine 等），但缺少真正 UDP/RTP 网络接入和 ASR 转写触发闭环 |

#### 阶段4：灰度与生产切换 — 🔄 部分完成（2026-07-16）

**已完成（2026-07-16 本轮）：**

| 任务 | 状态 | 说明 |
| --- | --- | --- |
| MrcpTimeoutPolicy（超时控制） | ✅ | speak=30s、recognize=60s、stop=5s、interpret=10s，通过 @ConfigurationProperties 读取 |
| MrcpFallbackService（失败回退） | ✅ | executeSpeak/executeRecognize/executeStop 已接入 SpeechRecogRequestHandler + SpeechSynthRequestHandler 主请求链 |
| MrcpProviderHealthService（provider 健康检查） | ✅ | 含 route 计数、route 级失败计数、最近 route 名称与时间戳、TTS/ASR 健康判定 |
| MrcpHealthIndicator（Actuator 端点） | ✅ | 暴露 speakRouteCounts、recognizeRouteCounts、失败分布、最近 route 与时间戳 |
| DefaultMrcpAsrBridge 分支级日志与路由计数 | ✅ | provider 命中日志、Qwen realtime 本地文件命中/回退日志、route 记录（qwen-realtime-local-file / standard-adapter / validation） |
| DefaultMrcpTtsBridge 分支级日志与路由计数 | ✅ | provider 命中日志、route 记录（standard-adapter / validation）、route 级失败计数 |
| Qwen-Audio Realtime ASR 分支接入 DefaultMrcpAsrBridge | ✅ | 配置 asrProvider=qwen-audio-realtime 时，本地文件自动走 QwenAudioRealtimeAdapter.transcribe() |
| DefaultMrcpAsrBridgeTest | ✅ | 5 个测试：普通 provider、Qwen 本地文件、HTTP 回退、Qwen 失败路由、标准路由计数 |
| DefaultMrcpTtsBridgeTest | ✅ | 3 个测试：默认参数、显式覆盖、失败路由 |
| MrcpProviderHealthServiceTest | ✅ | 验证 route 计数、失败计数、最近 route 与时间戳 |
| MrcpHealthIndicatorTest | ✅ | 验证 actuator detail 暴露 lastSpeakRoute、lastRecognizeRoute、route 失败分布 |
| enterprise/call 模块编译 | ✅ | BUILD SUCCESS，多轮验证无回归 |

**未完成：**

| 任务 | 状态 |
| --- | --- |
| 先灰度单测试 DID 或单 IVR 分机 | ❌ |
| 建立 baidu vs java-mrcp 同口径指标对比 | ❌ |
| 按 DID/IVR/租户三层灰度策略放量 | ❌ |
| 固化显式回滚动作（配置切换，无需发版） | ❌ |
| 完成至少一次真实回滚演练 | ❌ |
| 灰度验证通过后扩到 AI Bot/其他 IVR/主链路 | ❌ |
| 评估是否停用百度 MRCP Server 进程 | ❌ |
| 实现真正的 retry/fallback 策略（当前仅 timeout 包装） | ❌ |
| DefaultMrcpTtsBridge 的 Qwen SPEAK 分流 | ❌ |

### 10.3 下一步建议

**当前最优先（P0）：**

1. **完成阶段3剩余尾项**：把 RTP capture placeholder 补为真实 UDP/RTP 网络接入 → 落盘 → ASR 转写完整链路
2. **~~阶段4启动准备~~** → 阶段4 运行治理组件已于 2026-07-16 落地：`MrcpTimeoutPolicy`、`MrcpFallbackService`、`MrcpProviderHealthService` 全部就位，已接入 `SpeechRecogRequestHandler` / `SpeechSynthRequestHandler` / `DefaultMrcpAsrBridge` / `DefaultMrcpTtsBridge` / `MrcpHealthIndicator`，且 route 级失败计数、最近 route 时间戳、Qwen ASR 分支可观测性均已闭环

**后续建议（P1）：**

3. 开始阶段4第一批灰度：单测试 DID 内部流量验证，利用现有日志 + actuator route 计数观察 Qwen ASR 分支命中
4. 建立 baidu vs java-mrcp 指标对比面板
5. 按计划的三层灰度策略逐步放量

**可延后（P2）：**

6. 第二批媒体增强类（Encoder/Decoder/Pcma/Pcmu/DtmfFactory）
7. SIP 协商层（仅当现有 UniMRCP 外侧协商不够用时引入）“一步到位替换”更稳妥，也更符合当前代码基础。
