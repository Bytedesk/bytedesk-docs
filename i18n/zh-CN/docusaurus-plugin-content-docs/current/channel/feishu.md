---
sidebar_label: 飞书
sidebar_position: 14
---

# 飞书

本文介绍微语与飞书的两种常见对接方式，以及基于企业自建应用的飞书知识库导入能力：

1. **内部群聊 Webhook 自定义机器人**：最简单，适合“往某个群推送通知”。
2. **企业自建应用（机器人应用）**：能力更强，适合“需要更深度的飞书能力/权限”的场景。
3. **飞书知识库导入**：基于企业自建应用，把飞书知识空间中的文档一键同步到微语大模型知识库，用于 AI 客服问答（见下文[飞书知识库导入](#飞书知识库导入)章节）。

## 我该选哪一种？

| 方式 | 适用场景 | 优点 | 限制 |
| --- | --- | --- | --- |
| 内部群聊 Webhook 自定义机器人 | 工单/留言/告警等通知推送到指定群 | 配置快、无需申请权限 | 只能用于当前群；不具备数据访问权限 |
| 企业自建应用对接 | 需要更复杂的机器人能力（例如更强的交互能力、更多开放平台能力） | 可扩展、能力更完整 | 配置步骤更多，通常需要管理员配合 |

## 企业自建应用对接

前往飞书开放平台创建应用：

- 自建应用入口：[https://open.feishu.cn/app](https://open.feishu.cn/app)

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

## 飞书知识库导入

适合场景：把飞书知识空间（Wiki）中的文档同步到微语大模型知识库，同步后自动建立全文索引与向量索引，直接用于 AI 客服问答。

同步能力基于企业自建应用实现，需先参考上文「企业自建应用对接」完成 1-5 步（创建应用、添加机器人能力、获取 App ID/App Secret、发布应用），再按下述步骤操作。

### 1. 开通知识库相关权限

在应用的 **权限管理** 中搜索并开通以下权限：

| 权限 | 说明 |
| --- | --- |
| `wiki:wiki:readonly` | 读取知识库空间列表和节点树 |
| `drive:drive:readonly` | 读取云文档基础信息 |
| `drive:export:readonly` | 导出文档内容（docx/xlsx） |
| `docx:document:readonly` | 读取新版文档内容 |

![feishu_add_permissions](/img/feishu/feishu_add_permissions.png)

开通权限后，需要**重新发布应用版本**使权限生效。

> **docx 内嵌内容下钻权限（可选）**
>
> 若需同步 docx 文档中内嵌的附件和图片，还需额外开通以下权限（缺失时自动回退到导出 docx，不会同步失败，仅无法获取内嵌表格/附件）：
>
> - `docx:document:readonly` — 读取文档块（上表已含，此处仅供核对）
> - `drive:drive:readonly` / `docs:document.media:download` — 下载附件、图片
> - `sheets:spreadsheet:readonly` — 读取内嵌电子表格
> - `bitable:app:readonly` — 读取内嵌多维表格

### 2. 将应用添加为知识空间成员（重要）

仅开通权限还不够：应用必须被添加为目标知识空间的成员，才能读到该空间的内容。

1. 在飞书客户端打开目标知识库，点击知识库底部的 **知识库设置** 按钮：

   ![feishu_kbase_settings](/img/feishu/feishu_kbase_settings.png)

2. 进入 **成员设置**，点击 **添加成员**

   ![feishu_kbase_add_member_1](/img/feishu/feishu_kbase_add_member_1.png)

3. 搜索并添加你创建的自建应用，为应用授予至少 **可阅读** 权限：

   ![feishu_kbase_add_member_2](/img/feishu/feishu_kbase_add_member_2.png)

若跳过此步，同步时空间列表会为空。

### 3. 在微语后台绑定飞书应用

1. 打开微语管理后台 → **知识库** → **大模型** → **飞书文档**。
2. 点击 **绑定飞书应用**：可选择已有飞书应用，或直接新建（填写 App ID、App Secret；Base URL 默认 `https://open.feishu.cn`，Lark 国际版填 `https://open.larksuite.com`）。
3. 绑定成功后，页面顶部会显示已绑定的应用信息。

![feishu_kbase_bind](/img/feishu/feishu_kbase_bind.png)

### 4. 同步文档

1. 点击 **同步文档**，打开同步弹窗。
2. 选择要同步的知识空间：**支持多选**（下拉列表已自动去重）；不选择则同步全部空间（会弹窗二次确认，文档较多时耗时较长）。
3. 点击 **开始同步**，完成后会提示统计结果：总数、新建、更新、失败、删除、不支持。

说明：

- 当前仅支持**新版文档（docx）**；旧版 doc、电子表格、多维表格、思维笔记等类型会计入「不支持」并跳过
- 同步为增量幂等：内容未变化的文档自动跳过，重复同步不会产生冗余数据
- 飞书侧已删除的文档会被软删除，并同步清理全文/向量索引

![feishu_kbase_sync](/img/feishu/feishu_kbase_sync.png)

### 5. 查看同步记录

同步记录表格中可跟踪每篇文档的处理进度：

- **同步状态**：NEW / PROCESSING / SUCCESS / ERROR
- **全文索引状态**：Elasticsearch 写入结果
- **向量索引状态**：向量库写入结果（用于 AI 语义检索）
- 文档标题可点击跳转回飞书原文

![feishu_kbase_list](/img/feishu/feishu_kbase_list.png)

### 常见问题

- **空间列表为空**：应用未添加为知识空间成员，或权限未开通/未重新发布版本。
- **全文索引状态 ERROR**：检查 Elasticsearch 是否已启动（可用 `deploy/docker` 中的 compose 启动）。
- **同步总数为 0**：确认所选空间内存在新版文档（docx）。
- **部分文档计入「不支持」**：这些文档是表格/思维笔记/文件等类型，当前版本不支持，不影响其他文档同步。

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

- 参考文档（含安全设置说明）：[https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=zh-CN)

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
