---
sidebar_label: 一对一
sidebar_position: 1
---

# 一对一客服

:::tip

- 一对一：纯人工对话，不支持AI
- 工作组：支持AI、支持转人工
- 机器人：纯AI对话，不支持转人工

:::

## 创建客服

1. 点击右上角"新建"按钮
2. 在弹出的表单中选择成员，填写客服昵称、邮箱和手机号
3. 点击确定，创建成功后会在左侧列表中显示

<!-- ![创建客服](./images/agent-create.png) -->

## 基础设置

在"基础"选项卡中，您可以设置客服的基本信息：

- **头像**：点击上传按钮更改客服头像
- **昵称**：客服显示的名称
- **邮箱**：联系邮箱
- **手机号**：联系电话
- **描述**：客服简介，会在聊天窗口显示
- **绑定成员**：当前客服账号绑定的企业成员

<!-- ![基础设置](./images/agent-basic.png) -->

## 服务设置

在"服务设置"选项卡中，您可以配置客服的服务相关参数：

- **顶部提示**：启用后在聊天窗口顶部显示提示信息
- **欢迎语**：客户进入会话时的自动回复内容
- **知识库**：选择关联的知识库
- **欢迎常见问题**：设置自动显示的常见问题
- **留言设置**：客服不在线时的留言提示语
- **客服关闭提示**：客服主动关闭会话时的提示语
- **自动关闭提示**：会话超时自动关闭时的提示语
- **最大会话数**：单个客服同时能够接待的最大访客数
- **超时提醒时间**：设置未回复超时提醒时间（分钟）
- **自动关闭时间**：设置会话无动作自动关闭的时间（分钟）
- **显示Logo**：是否在聊天窗口显示企业Logo

<!-- ![服务设置](./images/agent-service-settings.png) -->

## 高级设置

高级设置包括多个功能模块：

### FAQ管理

配置常见问题，支持客服快速回复和访客自助查询。

### 快捷回复按钮

设置常用快捷回复按钮，方便客服快速回应常见问题。

### 满意度评价

配置会话结束时的评价表单，收集客户反馈。

### 权限设置

控制客服账号的操作权限。

### 弹窗设置

配置访客进入页面时的主动弹窗规则。

### 触发器

设置基于访客行为的自动触发规则。

### 自动回复

配置特定条件下的自动回复内容。

<!-- ![高级设置](./images/agent-advanced.png) -->

## 会话监控

在"监控"选项卡中，可以实时查看客服的会话状态数据：

- 当前在线状态
- 当前会话数
- 排队访客数
- 今日已接待会话数
- 平均响应时间
- 会话满意度

<!-- ![会话监控](./images/agent-monitor.png) -->

## 渠道集成

在"渠道"选项卡中，可以获取多种平台的接入代码：

- **Web**: 网站接入代码
- **React**: React组件接入
- **Vue**: Vue组件接入
- **Svelte**: Svelte组件接入
- **Vanilla**: 原生JS接入

每种渠道都提供详细的接入文档和示例代码。

<!-- ![渠道集成](./images/agent-channel.png) -->

## 客服状态说明

客服状态分为三种：

- **在线**：可以接收新的会话请求
- **忙碌**：临时无法接受新会话，但保持已有会话
- **离线**：完全下线，不接收任何会话

您可以在系统右上角切换客服状态。

## 常见问题

**Q: 如何设置客服工作时间？**  
A: 在高级设置中的留言设置里可以配置工作时间，非工作时间会自动转为留言模式。

**Q: 如何监控客服绩效？**  
A: 在监控页面可以查看客服的实时数据，更详细的统计报表可在"统计分析"模块查看。

**Q: 一个客服最多可以同时接待多少会话？**  
A: 在服务设置中可以配置最大会话数，默认值为10，可根据客服能力调整。
