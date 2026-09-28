---
slug: feishu-kbase-import
title: "微语支持从飞书知识库导入内容到微语知识库"
authors: jackning
tags: [bytedesk, 飞书, 知识库, AI]
---

企业的知识资产大量沉淀在飞书知识库（知识空间/Wiki）中，但要让 AI 客服用上这些知识，往往还需要人工"搬运"：导出、格式转换、重新录入。微语（Bytedesk）新增飞书知识库导入能力：在管理后台绑定飞书应用、选择知识空间，即可把飞书文档一键同步进微语大模型知识库，同步完成后自动建立全文索引与向量索引，直接用于 AI 客服问答。

<!-- truncate -->

## 它能解决什么问题

- **知识分散**：产品手册、FAQ、内部规范都在飞书知识库里，客服系统和 AI 问答却用不上
- **重复维护**：同一份文档要在飞书和客服知识库里各维护一份，极易不同步
- **接入门槛高**：自己开发同步程序需要处理飞书开放平台鉴权、分页、增量去重、索引更新等一堆细节

现在，微语把这些全部内置：绑定一次，随时手动（后续支持定时）同步。

## 功能特性

### 1. 绑定飞书应用

在「管理后台 → 知识库 → 大模型 → 飞书文档」页面，点击「绑定飞书应用」：

- **选择已有应用**：复用渠道模块中已配置的飞书自建应用，绑定到当前知识库
- **新建应用**：直接填写 `App ID`、`App Secret`（Base URL 默认 `https://open.feishu.cn`，Lark 国际版填 `https://open.larksuite.com`）

![feishu_kbase_bind](/img/feishu/feishu_kbase_bind.png)

### 2. 多空间选择同步

点击「同步文档」，下拉**支持多选**知识空间（自动去重）；不选择则同步该应用可访问的全部空间（会二次确认，防止误触发大批量同步）。

![feishu_kbase_sync](/img/feishu/feishu_kbase_sync.png)

### 3. 增量幂等同步

- 基于「飞书应用 + 资源类型 + 文档 Token」做幂等 upsert：新文档入库，已有文档内容变化才更新
- 内容哈希（contentHash）比对：未变化的文档自动跳过，重复同步不产生冗余写入
- 删除检测：空间中已不存在的旧文档会软删除，并同步清理全文/向量索引

### 4. 三类状态可视化

同步记录表格中可以分别跟踪每篇文档的处理进度：

- **同步状态**：NEW / PROCESSING / SUCCESS / ERROR
- **全文索引状态**：Elasticsearch 写入结果
- **向量索引状态**：向量库写入结果（用于 AI 语义检索）

![feishu_kbase_list](/img/feishu/feishu_kbase_list.png)

文档标题可点击跳转回飞书原文，方便核对内容。

## 需要的飞书权限

在飞书开放平台为应用开通以下权限（权限管理中搜索权限标识即可）：

| 权限标识 | 用途 |
| --- | --- |
| `wiki:wiki:readonly` | 列出知识空间与节点树 |
| `docx:document:readonly` | 读取新版文档（docx）纯文本内容 |

同时，需要把应用**添加为目标知识空间的成员**（至少「可阅读」权限），否则同步时空间列表为空。详细步骤见[飞书对接文档](/docs/channel/feishu)。

## 当前限制与路线图

- 当前仅支持**新版文档（docx）**；旧版 doc、电子表格、多维表格、思维笔记等类型会标记为「不支持」并跳过
- 同步为手动触发；定时自动同步、飞书云盘、Webhook 事件驱动增量同步在路线图中

## 在线演示

- 官网演示环境：[https://www.weiyuai.cn/admin](https://www.weiyuai.cn/admin)（知识库 → 大模型 → 飞书文档）
- GitHub：[https://github.com/Bytedesk/bytedesk](https://github.com/Bytedesk/bytedesk)

欢迎体验并反馈，让我们一起把企业知识更顺畅地接入 AI 客服。
