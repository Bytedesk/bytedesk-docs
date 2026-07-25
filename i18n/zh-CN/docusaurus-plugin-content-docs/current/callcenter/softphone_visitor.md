---
sidebar_label: 微语软电话
sidebar_position: 27
---

# 微语软电话

微语软电话是一款轻量级的网页端 SIP 软电话，无需安装任何软件或插件，打开浏览器即可拨打和接听电话。它既可以作为独立页面使用，也可以通过链接嵌入到第三方网站或应用中，帮助您的团队快速获得电话沟通能力。

## 适用场景

| 场景 | 说明 |
| ------ | ------ |
| 客服坐席 | 客服人员登录后直接接听客户来电，无需实体话机 |
| 外呼营销 | 销售人员输入号码一键外呼，支持 DTMF 按键交互（如 IVR 菜单） |
| 内部沟通 | 企业内部员工之间通过分机号互拨，免费通话 |
| 第三方集成 | 通过 URL 链接嵌入到 CRM、工单系统或任意网页中 |

## 主要功能

### 账号登录

打开页面后，首先看到的是 SIP 账号登录界面。您需要填写以下信息：

- **账号**：您的 SIP 分机号，例如 `1001`
- **密码**：SIP 分机密码
- **域**：SIP 服务器域名，例如 `sip.weiyuai.cn`
- **WebSocket 地址**（可选）：一般留空即可，系统会自动根据域名拼接
- **显示名称**（可选）：通话时显示给对方看的名称

> 💡 勾选“记住账号和密码，并在刷新后自动签入”后，下次打开页面将自动登录，无需重复输入。

填写完毕后，点击 **登录** 按钮即可完成连接和签入。

![softphone_account_settings](/img/callcenter/softphone/softphone_account_settings.png)

### 拨号面板

登录成功后，页面自动切换到拨号面板，您可以：

- 使用屏幕上的数字键盘输入号码，或直接在输入框中输入
- 点击 **外呼** 按钮发起呼叫
- 通话中使用数字键盘发送 DTMF 按键（如按 `1` 选择 IVR 菜单）

![softphone_call_dial](/img/callcenter/softphone/softphone_call_dial.png)

### 接听来电

当有来电时，软电话会同时以两种方式提醒您：

1. 弹窗通知：显示主叫号码和名称，提供 **接听** 和 **拒接** 按钮
2. 拨号面板切换：拨号区域自动变为“来电待接听”提示，外呼和挂断按钮替换为 **拒接** 和 **接听** 按钮

![softphone_incoming_call](/img/callcenter/softphone/softphone_incoming_call.png)

### 账号管理

登录后点击右上角的 **账号设置**，可以修改账号信息或切换分机。在设置面板底部，您可以实时查看：

- 当前连接地址
- 连接状态（WebSocket 已连接 / 未连接）
- 签入状态（已签入 / 签入中 / 未签入）
- 通话状态（来电待接听 / 通话中 / 振铃中 / 空闲）

点击 **退出** 可注销当前账号，清除本地保存的登录信息。

## 集成方式

微语软电话是一个纯网页应用，通过 URL 参数控制，可直接嵌入到第三方页面中。

### 基本链接格式

```bash
https://cdn.weiyuai.cn/call/phone?lang=zh-cn&mode=light&org=组织ID&visitorUid=访客ID&nickname=昵称&avatar=头像地址
```

### 参数说明

| 参数 | 必填 | 说明 |
| ------ | ------ | ------ |
| `lang` | 否 | 界面语言，支持 `zh-cn`（简体中文）、`zh-tw`（繁体中文）、`en`（英文） |
| `mode` | 否 | 主题模式，`light` 为浅色，`dark` 为深色 |
| `org` | 是 | 组织 ID，用于自动获取 SIP 服务器配置 |
| `visitorUid` | 是 | 访客唯一标识，用于关联通话记录 |
| `nickname` | 否 | 坐席显示名称，会显示在通话界面上 |
| `avatar` | 否 | 坐席头像地址 |

### 嵌入示例

**iframe 嵌入：**

```html
<iframe
  src="https://cdn.weiyuai.cn/call/phone?lang=zh-cn&mode=light&org=df_org_uid&visitorUid=agent_001&nickname=客服小王"
  width="420"
  height="700"
  style="border: none"
/>
```

**新窗口打开：**

```html
<a href="https://cdn.weiyuai.cn/call/phone?lang=zh-cn&mode=light&org=df_org_uid&visitorUid=agent_001&nickname=客服小王" target="_blank">
  打开软电话
</a>
```

### 测试链接

[点击体验微语软电话](https://cdn.weiyuai.cn/call/phone?lang=zh-cn&mode=light&org=df_org_uid&visitorUid=visitor_001&nickname=%E7%94%A8%E6%88%B7%E5%B0%8F%E6%98%8E&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg)

## 常见问题

### 登录失败怎么办？

请检查以下几点：

1. 账号、密码、域名是否正确填写
2. 域名前面不需要加 `wss://` 或 `https://`
3. 确认 SIP 服务器是否可以从当前网络访问
4. 页面底部会显示连接状态，确认 WebSocket 是否已连接

### 如何让刷新后自动登录？

登录时勾选“记住账号和密码，并在刷新后自动签入”即可。刷新页面后系统会自动连接并签入，页面会显示“自动签入中”的提示。

如果不想自动登录，取消勾选后点击退出，本地保存的账号信息会被清除。

### 可以和实体话机同时使用吗？

这取决于您的 SIP 服务器配置。如果服务器支持同一个分机号多次注册（多端点），则可以同时使用；否则建议只在一个设备上登录。

## 链接

- [呼叫中心演示](https://cdn.weiyuai.cn/reactdemo/callCenter)
