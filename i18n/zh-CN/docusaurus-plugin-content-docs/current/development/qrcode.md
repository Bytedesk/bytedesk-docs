---
sidebar_label: 对话无缝迁移二维码
sidebar_position: 77
---

# 对话无缝迁移二维码

微语访客端支持在聊天窗口导航栏展示“手机继续对话”二维码。访客在 PC 端咨询时，可以打开二维码弹窗，用手机扫码继续当前会话；系统会在扫码链接中携带当前会话、访客身份和必要上下文，并默认加载历史消息，从而实现跨设备无缝迁移。

![chqt_qrcode](/img/develop/chat_qrcode.png)

注：上述演示图中二维码仅用于演示，不支持扫描

## 适用场景

- 访客在电脑网页咨询，后续需要离开电脑，希望用手机继续沟通。
- 电商、售前、售后等场景中，访客需要把当前商品、订单、会员信息带到手机端继续确认。
- 客服希望访客扫码后仍进入同一企业、同一会话入口，并能自动查看历史聊天记录。

## 功能效果

启用后，访客端聊天页导航栏会出现二维码按钮。点击按钮后会弹出二维码窗口，访客可以：

1. 使用手机扫码打开当前对话链接。
2. 在手机端继续使用同一个 `visitorUid` 对话。
3. 自动携带 `loadHistory=1`，进入后加载已有聊天记录。
4. 点击“复制二维码链接”，将当前二维码 URL 复制给其他设备或应用打开。

## 显示规则

二维码按钮默认在 PC 端显示、移动端隐藏。也可以通过聊天页 URL 参数 `qrcode` 显式控制。

| 参数 | 示例 | 说明 |
| --- | --- | --- |
| `qrcode=1` | `?qrcode=1` | 强制显示二维码按钮 |
| `qrcode=true` | `?qrcode=true` | 强制显示二维码按钮 |
| `qrcode=yes` | `?qrcode=yes` | 强制显示二维码按钮 |
| `qrcode=on` | `?qrcode=on` | 强制显示二维码按钮 |
| `qrcode=0` | `?qrcode=0` | 隐藏二维码按钮 |
| `qrcode=false` | `?qrcode=false` | 隐藏二维码按钮 |
| `qrcode=no` | `?qrcode=no` | 隐藏二维码按钮 |
| `qrcode=off` | `?qrcode=off` | 隐藏二维码按钮 |

未传 `qrcode` 时：

- PC 端默认显示。
- 移动端默认隐藏，避免在手机端再展示“手机继续对话”的入口。

## 扫码链接生成规则

二维码链接基于当前聊天页地址生成，路径保持为当前聊天页路径，例如 `/chat`。生成时会按以下规则写入参数：

1. `org`、`t`、`sid` 优先使用当前 URL 参数；如果当前 URL 中没有，则使用当前会话初始化信息。
2. `visitorUid` 优先使用当前 URL 参数；如果当前 URL 中没有，则依次使用当前访客信息、protobuf 访客信息、匿名访客信息中的 `visitorUid` 或 `uid`。
3. 始终写入 `loadHistory=1`，确保手机端打开后自动加载历史聊天记录。
4. 只透传当前 URL 中已经存在且非空的上下文参数，不会凭空添加未启用的上下文。
5. `qrcode` 参数本身不会继续写入扫码链接，避免手机端再次展示二维码按钮。

当前二维码链接会透传以下非空参数：

| 类型 | 参数 |
| --- | --- |
| 基础会话 | `org`、`t`、`sid`、`visitorUid`、`loadHistory` |
| 语言与主题 | `lang`、`mode`、`backgroundColor`、`textColor`、`navbar`、`navbarTheme` |
| 页面功能 | `threadDetail`、`visitorProfile` |
| 访客信息 | `uid`、`shopUid`、`nickname`、`avatar`、`mobile`、`email`、`note`、`vipLevel` |
| 业务上下文 | `goodsInfo`、`orderInfo`、`history`、`extra`、`channel` |
| 调试与灰度 | `debug`、`settingsUid`、`draft` |

例如，PC 端当前链接为：

```bash
https://www.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn&qrcode=1&visitorUid=user_1001&nickname=%E5%BC%A0%E4%B8%89
```

生成的二维码链接类似：

```bash
https://www.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn&nickname=%E5%BC%A0%E4%B8%89&visitorUid=user_1001&loadHistory=1
```

## SDK 接入示例

在 React Demo 或 SDK 嵌入场景中，可以通过 `chatConfig.qrcode` 控制二维码按钮显示。

```tsx
<BytedeskReact
 htmlUrl="https://www.example.com"
 chatConfig={{
  org: 'df_org_uid',
  t: '1',
  sid: 'df_wg_uid',
  qrcode: '1',
 }}
/>
```

如果希望隐藏二维码按钮：

```tsx
<BytedeskReact
 htmlUrl="https://www.example.com"
 chatConfig={{
  org: 'df_org_uid',
  t: '1',
  sid: 'df_wg_uid',
  qrcode: '0',
 }}
/>
```

也可以直接通过聊天页 URL 控制：

```bash
https://www.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&qrcode=1
```

## 携带访客身份

为了让手机端继续同一位访客的会话，建议业务系统在打开聊天窗口时传入稳定的 `visitorUid`，通常可以使用业务侧用户 ID、会员 ID 或登录账号 ID。

```bash
https://www.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=user_1001&qrcode=1
```

如果没有显式传入 `visitorUid`，访客端会尝试从当前已初始化的访客信息中读取；如果仍无法获取，则扫码链接可能无法准确恢复到同一个访客身份。

## 携带业务上下文

二维码链接会透传商品、订单、会员等级、渠道等常用业务参数。适合在手机端继续查看当前咨询上下文。

```bash
https://www.example.com/chat?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=user_1001&qrcode=1&goodsInfo=%7B%22title%22%3A%22iPhone%2016%22%7D&orderInfo=%7B%22orderNo%22%3A%22SO202605260001%22%7D&channel=WEB_VISITOR
```

注意：`goodsInfo`、`orderInfo`、`extra` 等 JSON 参数需要进行 URL 编码；SDK 嵌入模式下传对象时，SDK 会负责序列化。

## 注意事项

1. 二维码链接只会透传当前已启用的参数。例如未开启 `title` 或 `browse` 时，二维码链接不会额外包含这些参数。
2. 二维码默认用于同源聊天页迁移，生成链接时会使用当前页面的 `origin` 和 `pathname`。
3. 如果业务侧手工拼接 URL，建议统一使用 `URLSearchParams` 或等价方式编码参数，避免颜色值、中文、JSON 内容被截断或解析失败。
4. 如果需要让移动端也展示二维码按钮，可以显式传入 `qrcode=1`，但一般不建议在移动端开启。
5. 如果要关闭该能力，可以传入 `qrcode=0`，或者在 SDK 的 `chatConfig` 中设置 `qrcode: '0'`。
