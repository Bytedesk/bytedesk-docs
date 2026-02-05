---
sidebar_label: 飞书
sidebar_position: 14
---

# 飞书

本文介绍微语与飞书的两种常见对接方式：

1. **内部群聊 Webhook 自定义机器人**：最简单，适合“往某个群推送通知”。
2. **企业自建应用（机器人应用）**：能力更强，适合“需要更深度的飞书能力/权限”的场景。

## 我该选哪一种？

| 方式 | 适用场景 | 优点 | 限制 |
| --- | --- | --- | --- |
| 内部群聊 Webhook 自定义机器人 | 工单/留言/告警等通知推送到指定群 | 配置快、无需申请权限 | 只能用于当前群；不具备数据访问权限 |
| 企业自建应用对接 | 需要更复杂的机器人能力（例如更强的交互能力、更多开放平台能力） | 可扩展、能力更完整 | 配置步骤更多，通常需要管理员配合 |

## 企业自建应用对接

前往飞书开放平台创建应用：

- 自建应用入口：https://open.feishu.cn/app

### 创建企业自建应用

![feishu_app_create](/img/feishu/feishu_app_create.png)

### 填写自建应用标题&详情

<!-- ![feishu_app_create_detail](/img/feishu/feishu_app_create_detail.png) -->
import feishu_app_create_detail from '/img/feishu/feishu_app_create_detail.png';

<img src={feishu_app_create_detail} alt="feishu_app_create_detail" width="660" />

### 添加应用能力：机器人

![feishu_add_robot_ability](/img/feishu/feishu_add_robot_ability.png)

### 权限管理

在 **权限管理** 中为应用添加所需权限（以你要实现的业务能力为准）。

提示：如果只是“往群里推送通知”，更推荐使用下文的「内部群聊 Webhook 自定义机器人」，无需申请任何数据权限。

![feishu_add_permissions](/img/feishu/feishu_add_permissions.png)

### 获取 App ID 和 App Secret

在飞书开放平台后台获取应用的 `App ID` 与 `App Secret`。

安全建议：不要把 `App Secret`、Webhook 地址等敏感信息提交到 Git 仓库或公开页面。

![feishu_app_id_secret](/img/feishu/feishu_app_id_secret.png)

### 发布应用

这一步的目标：让你的自建应用“可用”，并且能被添加到飞书群里作为机器人使用。

![feishu_publish](/img/feishu/feishu_publish.png)

### 绑定到微语后台

这一步的目标：让微语“知道要用哪个飞书应用/机器人”来收发消息。

1. 打开微语管理后台 → 在线客服/渠道/飞书应用 相关配置。
2. 找到飞书相关配置项，填写你在飞书开放平台获取到的 `App ID`、`App Secret`（以及页面上要求的其它字段）。
3. 保存配置。

如何判断成功：保存后无报错；后续在飞书侧把机器人拉进群后，微语能正常推送消息。

![feishu_add_weiyu](/img/feishu/feishu_add_weiyu.png)

### 将机器人添加到飞书群

这一步的目标：指定“消息要推送到哪个群”。

1. 在飞书客户端打开目标群。
2. 进入群设置/群机器人，搜索并添加你刚创建的机器人应用。
3. 确认机器人出现在群成员/机器人列表中。

常见问题：

- 搜不到机器人：通常是应用未启用/未发布，或当前账号/租户无权限添加；先回到开放平台确认应用状态。
- 只想推送到单个群：也可以改用下文的「内部群聊 Webhook 自定义机器人」，配置更简单。

![feishu_group_add_robot](/img/feishu/feishu_group_add_robot.png)

### 给机器人发送消息

这一步用于验证“机器人已经在群里可用”。

1. 在群里 @ 机器人（或直接点击机器人头像进入交互）。
2. 发送一条简单文本，例如“测试”。
3. 观察机器人是否有响应，或微语后台是否收到对应事件/日志（取决于你是否配置了事件订阅）。

提示：如果你的目标只是“微语 → 飞书群 推送通知”，通常不需要在群里和机器人对话；只要微语能发出消息即可。

![feishu_group_at_robot](/img/feishu/feishu_group_at_robot.png)

### 对话效果

下面展示的是“应用机器人”接入后的典型交互效果（与下文的 Webhook 自定义机器人不同：Webhook 主要用于单向通知推送，不能接收/理解用户消息）。

#### 一对一（私聊机器人）

适合场景：员工单独向机器人提问、查询信息、发起流程等。

怎么触发：在飞书客户端找到该机器人 → 打开与机器人的单聊窗口 → 直接发送消息。

你会看到：机器人在同一私聊会话中回复内容（如图）。

![feishu_robot_one_chat](/img/feishu/feishu_robot_one_chat.png)

#### 群聊 @ 机器人

适合场景：在群里让机器人参与讨论、回答问题，或在群内触发某个操作。

怎么触发：在群聊中输入 `@机器人名称` 并发送消息。

你会看到：机器人在群里回复，并且通常会“引用/跟随”你 @ 它的那条消息（如图）。

![feishu_group_robot_reply](/img/feishu/feishu_group_robot_reply.png)

常见问题排查（机器人不回复/无反应）：

- 确认群里添加的是“应用机器人”，而不是仅配置了 Webhook 的自定义机器人。
- 确认应用已“发布并启用”，且机器人已成功加入当前群。
- 如果你的实现依赖事件订阅（接收消息事件），检查开放平台的事件订阅/回调地址配置，以及微语后台是否有收到回调日志。

## 内部群聊Webhook机器人

适合场景：把微语的通知（例如留言、工单、告警）推送到一个指定的飞书群。

### 1. 创建群机器人（自定义机器人）

- [创建机器人](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN)

### 2. 获取群机器人 Webhook

创建完成后，在机器人详情页复制 Webhook 地址。

![feishu_webhook](/img/develop/admin/feishu_webhook.png)

### 3. 在微语后台配置

将 Webhook URL 填写到微语后台的 Webhook 配置中。

![webhook](/img/develop/admin/webhook.png)

### 4. 推送效果

![feishu_webhook_leavemsg](/img/develop/admin/feishu_webhook_leavemsg.png)

### 5.（可选）加强安全设置

飞书自定义机器人支持多种安全设置（例如：关键词、IP 白名单、签名校验）。建议至少开启一种，以避免 Webhook 泄露后被滥用。

- 参考文档（含安全设置说明）：https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN

### 6.（可选）快速自测 Webhook

你可以用 `curl` 测试一下 Webhook 是否可用（将 `YOUR_WEBHOOK_URL` 替换为真实地址）：

```bash
curl -X POST -H "Content-Type: application/json" \
	-d '{"msg_type":"text","content":{"text":"微语 -> 飞书 Webhook 测试消息"}}' \
	"YOUR_WEBHOOK_URL"
```

## 参考链接

- [自定义机器人使用指南](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN)
- [自定义机器人 vs 机器人应用：能力对比](https://open.feishu.cn/document/client-docs/bot-v3/bot-overview#6994dff4)
- 发送消息类型说明：见「自定义机器人使用指南」中的“支持发送的消息类型说明”章节
