---
sidebar_label: 访客端
sidebar_position: 1
---

# 访客端开发文档

## 简介

微语访客端用于帮助开发者快速在自己的应用中集成在线客服功能，支持Web、iOS、Android、微信小程序等多平台接入。

## 访客端聊天界面

访客端聊天界面（ChatBox）是用户与客服交互的核心组件，它提供了丰富的功能以确保良好的沟通体验。

### 主要功能

1. **消息展示**
   - 支持多种消息类型：文本、图片、文件、视频、商品信息等
   - 消息气泡显示发送状态：发送中、发送成功、发送失败等
   - 消息时间戳显示
   - 支持富文本内容渲染

2. **消息输入**
   - 文本输入与发送
   - 表情选择器
   - 图片上传功能
   - 文件上传功能
   - 输入预览（对方可见正在输入的内容）

3. **机器人交互**
   - 智能机器人应答
   - 常见问题推荐
   - 相似问题推荐
   - 机器人结果评价（有用/无用反馈）
   - 机器人对话转人工客服

4. **留言功能**
   - 非工作时间或客服不在线时的留言提交
   - 支持文字和图片留言
   - 留言状态跟踪
   - 留言回复展示

5. **服务评价**
   - 客服主动邀请评价
   - 用户主动评价
   - 评分与评价内容提交
   - 问题是否解决的标记

6. **智能提示**
   - 实时输入建议
   - 输入关键词相关问题推荐
   - 热门问题展示

7. **消息操作**
   - 消息复制
   - 图片预览
   - 文件下载
   - 上下文菜单（右键菜单）

### 网络通信

聊天界面使用两种通信方式：

1. **WebSocket (STOMP)** - 用于实时消息通信
   - 消息发送与接收
   - 状态更新
   - 输入预览
   - 在线状态维护

2. **HTTP请求** - 用于非实时操作
   - 会话初始化
   - 历史消息获取
   - 文件上传
   - 评价提交
   - 留言提交

### 客户化配置

访客端支持多种客户化配置：

1. **主题设置**
   - 明暗模式切换
   - 自定义导航栏颜色
   - 自定义背景色和文字颜色

2. **多语言支持**
   - 内置多语言支持
   - 可选语言：中文、英文等

3. **界面布局**
   - 导航栏显示/隐藏
   - 宽窄屏幕自适应
   - 右侧面板显示/隐藏

4. **功能开关**
   - 留言功能开关
   - 评价功能开关
   - 机器人功能开关
   - 文件上传开关

### 上下文沟通

为了提供更智能的服务，访客端会收集并利用以下上下文信息：

1. **访客信息**
   - UID
   - 昵称
   - 头像
   - VIP级别
   - 自定义字段

2. **浏览信息**
   - 浏览器类型
   - 操作系统
   - 设备信息
   - 来源页面
   - 页面标题

3. **会话信息**
   - 会话ID
   - 会话类型
   - 历史消息

### 技术实现细节

1. **状态管理**
   - 使用Zustand管理全局状态
   - 消息列表、访客信息等状态集中管理

2. **消息处理**
   - 消息发送队列
   - 消息状态追踪
   - 消息重发机制

3. **实时预览**
   - 使用防抖(debounce)技术优化实时预览
   - 输入内容智能建议

4. **网络容错**
   - WebSocket断线重连
   - 消息发送失败重试
   - 网络错误提示

5. **安全处理**
   - 消息内容安全检测
   - XSS防护
   - 敏感信息过滤

### 参数配置

当前访客端页面参数以运行时 `chatConfig`、`browseConfig`、`theme` 序列化结果为准。空字符串、`undefined`、`null` 默认不会写入 URL；以下为常用参数及最新行为说明。

#### 必填参数

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| org | string | 企业 UID |
| t | string | 会话类型。常见值：`0` 一对一、`1` 工作组、`2` 机器人、`16` 历史会话 |
| sid | string | 会话 ID。根据 `t` 不同可表示客服 UID、工作组 UID、机器人 UID 等 |

#### 常用显示与主题参数

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| lang | string | 语言，例如 `zh-cn`、`zh-tw`、`en`、`ja-jp`、`ko-kr` |
| mode | string | 主题模式：`light`、`dark`、`system` |
| backgroundColor | string | 导航栏背景色，例如 `#0066FF` |
| textColor | string | 导航栏文字颜色 |
| title | string | 当前聊天页浏览器 tab 标题 |
| navbar | string | 导航栏显示控制。传 `0` 表示隐藏，不传则显示 |
| qrcode | string | 当前对话二维码按钮显示控制。默认 PC 端显示、移动端隐藏；传 `1`/`true` 强制显示，传 `0`/`false` 隐藏 |
| threadDetail | string | 会话详情按钮显示控制。默认不显示；传 `1`/`true`/`yes`/`on` 时显示 |
| visitorProfile | string | 访客资料按钮显示控制。默认不显示；传 `1`/`true`/`yes`/`on` 时显示 |
| loadHistory | string | 是否自动加载历史消息。传 `1` 时启用，未传时关闭。详见 [历史消息](./message_history.md) |

#### 访客与业务参数

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| uid | string | 系统内部用户 ID。通常由系统生成，不建议业务侧自行传入 |
| visitorUid | string | 自定义访客唯一标识，推荐与业务用户 ID 对齐 |
| nickname | string | 自定义访客昵称 |
| avatar | string | 自定义访客头像 URL |
| mobile | string | 自定义手机号 |
| email | string | 自定义邮箱 |
| note | string | 自定义备注 |
| vipLevel | string | 访客等级 |
| channel | string | 访客来源渠道。建议优先使用后端 `ChannelEnum` 常量，例如 `WEB_VISITOR`、`WEB_FLOAT`、`WECHAT` |
| goodsInfo | string | 商品信息 JSON 字符串，详见 [商品信息对接](../integration/goods_info.md) |
| orderInfo | string | 订单信息 JSON 字符串，详见 [订单信息对接](../integration/order_info.md) |
| extra | string | 扩展字段 JSON 字符串。用于补充自定义业务上下文 |
| settingsUid | string | 设置项唯一 ID，主要用于调试或指定特定配置 |

#### 调试与灰度参数

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| debug | string | 调试模式。SDK 内部布尔值为 `true` 时会序列化为 `debug=1` |
| draft | string | 灰度模式标记。SDK 内部布尔值为 `true` 时会序列化为 `draft=1` |

#### 浏览上下文参数

| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| browse | string | 浏览上下文 JSON 字符串，内部通常包含 `referer`、`title`、`url` |

#### 自定义透传参数

除上述字段外，`chatConfig` 中其他非空字段也会按 `key=value` 方式继续透传到聊天页，适合承载业务自定义参数。

### 参数序列化规则

为避免联调时出现“为什么 URL 没带上这个参数”的误判，建议注意以下规则：

1. 空字符串、`undefined`、`null` 不会进入最终 URL。
2. `debug`、`draft`、`loadHistory` 只有在值为 `true` 时才会分别输出为 `debug=1`、`draft=1`、`loadHistory=1`。
3. `goodsInfo`、`orderInfo` 推荐传 JSON 字符串；若在 SDK 嵌入模式下传对象，SDK 会自动 `JSON.stringify` 后再拼接到 URL。
4. `extra` 推荐传 JSON 字符串；若 `extra` 中包含 `goodsInfo` 或 `orderInfo`，SDK 会先移除这两个重复字段，再写入 URL。
5. `browse` 由 `browseConfig` 合并序列化而来，最终统一进入一个 `browse` 参数，而不是拆成多个独立 query 参数。
6. 手工拼接 URL 时，`title`、`browse`、颜色值以及任意 JSON 内容都应先做 URL 编码。

`browse` 参数示例：

```bash
https://chat.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&title=%E5%AE%A2%E6%9C%8D%E5%92%A8%E8%AF%A2&browse=%7B%22referer%22%3A%22https%3A%2F%2Fwww.example.com%2Flanding%22%2C%22title%22%3A%22%E6%B4%BB%E5%8A%A8%E8%90%BD%E5%9C%B0%E9%A1%B5%22%2C%22url%22%3A%22https%3A%2F%2Fwww.example.com%2Flanding%3Fsku%3D1001%22%7D
```

说明：

- `title`：自定义当前 chatbox 对话页面浏览器 tab 标题
- `browse.referer`：来源页面
- `browse.url`：当前浏览页面 URL
- `browse.title`：来源页面标题
- SDK 嵌入模式下如果使用 `browseConfig.referrer`，也会兼容写入 `browse.referer`

## 常见问题

### 如何跟已有用户系统对接？将访客信息传递给客服端？

可以通过以下方式将已有用户系统的信息传递给客服端：

1. **URL参数传递**：在初始化聊天窗口时，通过URL参数传递用户信息

   ```bash
   https://chat.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=user123&nickname=张三&avatar=https%3A%2F%2Fexample.com%2Favatar.jpg&vipLevel=2&channel=WEB_VISITOR
   ```

## 进阶使用

### 相关功能

- [历史消息](./message_history.md) - 了解如何加载和展示历史聊天记录
- [商品信息对接](../integration/goods_info.md) - 了解如何传递商品信息给客服
- [订单信息对接](../integration/order_info.md) - 了解如何传递订单信息给客服
- [用户信息对接](../integration/user_info.md) - 了解如何传递用户信息给客服
- [千人千面](../integration/viplevel.md) - 了解如何根据用户等级提供差异化服务
- [国际化](./i18n.md) - 了解如何支持多语言

## channel 参数完整说明

`channel` 用于标识访客来源渠道，建议优先使用后端 `ChannelEnum` 中的标准常量。

### 使用规则

1. 推荐使用大写下划线风格，如 `WEB_VISITOR`、`WECHAT`。
2. 后端按不区分大小写方式解析（`equalsIgnoreCase`），但仍建议统一大写，便于排查问题。
3. 未传值时通常使用默认 `HTTP_CHANNEL`（一般映射为 `WEB_VISITOR`）。
4. 如需业务自定义，可使用 `CUSTOM`，并在业务侧约定扩展含义。

### 推荐值（访客端常见）

- `WEB_VISITOR`: Web 访客页
- `WEB_FLOAT`: Web 悬浮窗
- `WEB_H5`: H5 页面
- `WECHAT`: 微信渠道
- `WECHAT_MINI`: 微信小程序
- `IOS`: iOS App
- `ANDROID`: Android App
- `FLUTTER_WEB` / `FLUTTER_IOS` / `FLUTTER_ANDROID`: Flutter 多端

### ChannelEnum 全量可选值

以下取值与后端 `ChannelEnum` 保持一致：

- 系统与Web: `SYSTEM`, `WEB`, `WEB_PC`, `WEB_H5`, `WEB_VISITOR`, `WEB_FLOAT`, `WEB_ADMIN`
- 移动与桌面: `IOS`, `ANDROID`, `ELECTRON`, `LINUX`, `MACOS`, `WINDOWS`
- Flutter: `FLUTTER`, `FLUTTER_WEB`, `FLUTTER_ANDROID`, `FLUTTER_IOS`, `FLUTTER_MACOS`, `FLUTTER_WINDOWS`, `FLUTTER_LINUX`
- UniApp: `UNIAPP`, `UNIAPP_WEB`, `UNIAPP_ANDROID`, `UNIAPP_IOS`
- 微信生态: `WECHAT`, `WECHAT_MINI`, `WECHAT_MP`, `WECHAT_WORK`, `WECHAT_KEFU`, `WECHAT_CHANNEL`
- 国内社媒: `XIAOHONGSHU`, `DOUYIN`, `KUAISHOU`, `BILIBILI`, `WEIBO`, `ZHIHU`, `TOUTIAO`, `DOUBAN`
- 国内电商: `TAOBAO`, `TMALL`, `JD`, `PINDUODUO`, `MEITUAN`, `ELEME`, `DIANPING`
- 企业办公: `DINGTALK`, `FEISHU`, `LARK`, `CUSTOM`
- 其他渠道: `EMAIL`, `SMS`, `PHONE`
- 海外Meta: `MESSENGER`, `INSTAGRAM`, `WHATSAPP`
- 海外社媒: `TWITTER`, `FACEBOOK`, `LINKEDIN`, `YOUTUBE`, `TIKTOK`, `PINTEREST`, `REDDIT`, `SNAPCHAT`
- 海外IM: `TELEGRAM`, `LINE`, `KAKAO`, `VIBER`, `SIGNAL`, `DISCORD`, `SLACK`
- 海外电商: `AMAZON`, `EBAY`, `SHOPIFY`, `LAZADA`, `SHOPEE`
- 测试: `TEST`

### 示例

```bash
https://chat.example.com?org=df_org_uid&t=1&sid=df_wg_uid&channel=WEB_VISITOR
```
