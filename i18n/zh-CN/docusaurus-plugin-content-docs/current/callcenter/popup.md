---
sidebar_label: 来电弹屏
sidebar_position: 25
---

# 来电弹屏

来电弹屏是微语呼叫中心在坐席工作台中的实时电话提醒能力。当客户通过手机、固话或外部线路呼入，系统会在坐席工作台自动弹出通话窗口，展示来电号码、通话状态和坐席操作入口，帮助客服第一时间识别客户并快速接听。

![客服端来电弹屏演示](/img/callcenter/popup/popup.png)

## 功能亮点

- **实时来电提醒**：客户呼入并分配到坐席分机后，坐席工作台自动弹出来电窗口，坐席无需切换页面即可看到来电。
- **号码信息展示**：弹屏展示主叫号码或 SIP 对端信息，后续可结合客户资料、访客档案、工单和历史会话继续扩展展示内容。
- **一键接听与拒接**：坐席工作台软电话在线时，坐席可以直接在弹屏中接听或拒接来电。
- **通话中状态展示**：接听后自动切换为通话窗口，展示通话状态、通话时长、静音、挂断等操作。
- **固定话机协同**：同一个分机可以同时绑定固定话机和坐席工作台。固定话机响铃时，坐席工作台同步弹屏；固定话机摘机后，坐席工作台同步显示通话中；固定话机挂机后，坐席工作台同步恢复空闲。
- **呼入 IVR 联动**：客户先进入 IVR 语音导航，按键转人工后，来电可以继续触发坐席弹屏。

## 典型使用流程

1. 管理员为坐席配置呼叫参数，例如绑定分机 `5003` 并启用呼叫功能。
2. 坐席打开坐席工作台，在软电话工具条中点击“签入”。
3. 客户拨打企业电话，呼叫进入 FreeSWITCH、IVR 或队列流程。
4. 当呼叫转接到坐席分机时，坐席工作台收到来电事件并弹出来电窗口。
5. 坐席可以在坐席工作台上接听，也可以通过绑定的固定话机摘机接听。
6. 通话建立后，坐席工作台自动显示通话中、通话时长等状态。
7. 任一终端挂机后，坐席工作台同步显示通话结束。

## 弹屏内容

当前坐席工作台弹屏主要包含以下信息和操作：

- 来电号码或 SIP 对端标识。
- 来电状态，例如响铃中、通话中、固定话机通话中、通话结束。
- 接听、拒接、挂断、静音等软电话操作。
- 通话时长。
- 外部终端接听提示，例如“当前由固定话机通话，坐席工作台仅同步显示状态”。

在实际业务场景中，可以进一步把来电号码与客户资料打通，在弹屏中展示客户姓名、归属地、最近会话、历史工单、订单信息、服务标签和备注等。

## 固定话机与坐席工作台共号

微语支持固定话机和坐席工作台共用同一个坐席分机。例如固定话机绑定 `5003`，坐席工作台当前登录坐席也签入 `5003`。

这种模式适合以下场景：

- 客服习惯使用固定话机接听电话，但仍希望坐席工作台自动弹出客户资料。
- 坐席需要在电脑上查看客户信息、创建工单、记录备注，同时用固定话机保持稳定通话。
- 企业希望逐步从传统话机迁移到 WebRTC 软电话，但保留两种接听方式。

共号模式下，系统通过 FreeSWITCH 多注册能力保留固定话机和坐席工作台的不同 Contact。坐席工作台注册时会使用独立的 SIP 实例标识，签出时只注销自己的 WebRTC 注册，不影响固定话机注册。这样可以实现：

- 坐席工作台未签入：固定话机仍可正常响铃。
- 坐席工作台已签入：固定话机响铃，同时坐席工作台来电弹屏。
- 固定话机接听：坐席工作台同步显示通话中，并禁用不适用于外部终端通话的本地控制。
- 固定话机挂机：坐席工作台同步显示通话结束。

## 实现原理

来电弹屏由 FreeSWITCH 呼叫事件、后端 ESL 事件流和坐席工作台 SIP 控制器共同完成。

### 后端事件流

FreeSWITCH 呼叫过程中会产生 `CHANNEL_CREATE`、`CHANNEL_ANSWER`、`CHANNEL_HANGUP`、`CHANNEL_CALLSTATE` 等事件。微语后端监听这些事件并发布为统一的呼叫事件，再通过 SSE 推送给坐席工作台。

<!-- 相关实现：

- `modules/call/src/main/java/com/bytedesk/call/config/CallEventListener.java`：监听 FreeSWITCH ESL 事件，转换为 `CallSwitchEvent`。
- `modules/call/src/main/java/com/bytedesk/call/esl/EslEventStreamService.java`：缓存最近事件，并通过 SSE 广播 `esl-event`。
- `modules/call/src/main/java/com/bytedesk/call/esl/EslController.java`：提供 `/api/v1/freeswitch/esl/events/stream` 事件流接口，以及 `/events/recent` 排查接口。 -->

### 坐席工作台弹屏

坐席工作台使用 SIP.js 注册坐席分机，并通过带鉴权请求头的 SSE 订阅后端 ESL 事件流。收到与当前分机匹配的事件后，前端会把 FreeSWITCH 事件映射为来电状态：

- `CHANNEL_CREATE`：响铃中，打开来电弹屏。
- `CHANNEL_ANSWER`：通话中。
- `CHANNEL_HANGUP` / `CHANNEL_HANGUP_COMPLETE` / `CHANNEL_DESTROY`：通话结束。
- `CHANNEL_CALLSTATE` / `CHANNEL_STATE`：补充识别响铃、接听、挂断等状态。

<!-- 相关实现：

- `frontend/apps/desktop/src/pages/Dashboard/Home/Call/hooks/useSipCallController.ts`：负责 SIP 注册、签入签出、来电状态机、SSE 订阅和通话控制。
- `frontend/apps/desktop/src/pages/Dashboard/Home/Call/utils/sharedSipCallSync.ts`：解析 ESL 事件，按分机号、Presence ID 或通话 UUID 匹配当前坐席分机。
- `frontend/apps/desktop/src/pages/Dashboard/Home/Call/components/SipIncomingModal.tsx`：来电弹屏，展示主叫号码并提供接听、拒接入口。
- `frontend/apps/desktop/src/pages/Dashboard/Home/Call/components/SipFloatingModal.tsx`：通话浮窗，展示通话中、外呼中、固定话机通话中、通话时长等状态。
- `frontend/apps/desktop/src/pages/Dashboard/Home/Call/components/SoftphoneToolbar.tsx`：坐席软电话工具条，提供签入签出、外呼、保持、转接、转 IVR、静音、挂断等操作。 -->

### IVR 转人工弹屏

当客户先进入 IVR，再按键转人工时，链路通常是：

1. 外线号码进入 FreeSWITCH。
2. 拨号计划把呼叫转入 IVR 入口，例如 `5002`。
3. IVR 通过 HTTAPI 播放欢迎语并收集按键。
4. 客户按 `0` 后，系统执行 `transfer 5003 XML default` 转入人工坐席分机。
5. `5003` 的固定话机和坐席工作台注册终端同时被呼叫。
6. 坐席工作台收到呼叫事件并弹屏。

这种方式不会绕过 FreeSWITCH 的 dialplan 和 directory，因此可以继续使用固定话机注册、坐席工作台 WebRTC 注册、多终端共振和状态同步能力。

## 配置要求

使用来电弹屏前，需要确认以下配置已经完成：

- FreeSWITCH 已启用，并且微语后端已开启 `bytedesk.call.freeswitch.enabled=true`。
- 坐席工作台当前登录账号具备坐席身份。
- 坐席已配置并启用 `CallSettingsEntity`，其中目标分机与 FreeSWITCH 分机一致。
- 坐席工作台可以访问 SIP WebSocket 服务，并能成功注册分机。
- 后端 `/api/v1/freeswitch/esl/events/stream` 可以被坐席工作台访问，且请求携带有效登录令牌。
- 固定话机与坐席工作台共号时，FreeSWITCH 需要允许同一分机多 Contact 注册。

## 排查建议

如果没有弹屏或状态不同步，可以按以下顺序排查：

1. 在坐席工作台软电话工具条确认坐席是否已签入，SIP 注册状态是否成功。
2. 在 FreeSWITCH 中检查分机是否已注册，例如查看 `show registrations`。
3. 调用后端 `/api/v1/freeswitch/esl/events/recent`，确认是否能看到 `CHANNEL_CREATE`、`CHANNEL_ANSWER`、`CHANNEL_HANGUP` 等事件。
4. 确认坐席工作台能正常访问 `/api/v1/freeswitch/esl/events/stream`，并且没有鉴权失败。
5. 如果固定话机响铃但坐席工作台不弹屏，重点检查 ESL 事件流和坐席工作台签入状态。
6. 如果坐席工作台弹屏但固定话机不响铃，重点检查 FreeSWITCH 分机注册、directory `dial-string` 和多注册配置。
7. 如果固定话机接听后坐席工作台不显示通话中，重点检查 `CHANNEL_ANSWER` 事件是否包含当前分机号或 Presence ID。

## 适用场景

- 企业服务热线呼入，客服接听前自动识别客户。
- IVR 按键转人工后自动弹屏。
- 固定话机接听，坐席工作台同步展示客户信息和通话状态。
- 电话客服与在线客服统一工作台，边通话边记录工单、备注和会话内容。
- 呼叫中心坐席进行外呼、保持、转接、转 IVR 等电话操作。

## 延伸阅读

- [软电话工具条](./softphone)：了解坐席如何完成签入、外呼、保持、转接和挂断等通话控制。
- [IVR工作流](./ivr)：了解客户在进入人工坐席前，如何通过 IVR 语音导航和按键流程完成分流。
