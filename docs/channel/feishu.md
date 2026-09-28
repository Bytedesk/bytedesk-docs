---
sidebar_label: Feishu
sidebar_position: 14
---

# 飞书

飞书渠道对接文档。完整图文步骤（企业自建应用对接、内部群聊 Webhook 机器人）请查看[简体中文版飞书文档](https://www.weiyuai.cn/zh-CN/docs/channel/feishu)。

## 飞书知识库导入

适合场景：把飞书知识空间（Wiki）中的文档同步到微语大模型知识库，同步后自动建立全文索引与向量索引，直接用于 AI 客服问答。

同步能力基于企业自建应用实现，需先在[飞书开放平台](https://open.feishu.cn/app)创建自建应用（获取 App ID/App Secret 并发布），再按下述步骤操作。

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

2. 进入 **成员设置**，点击 **添加成员**，切换到 **应用** 页签：

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
