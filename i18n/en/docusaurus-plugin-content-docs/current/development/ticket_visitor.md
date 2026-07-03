---
sidebar_label: Visitor/Client Ticket Integration
sidebar_position: 28
---

<!-- markdownlint-disable MD033 -->

# 访客/客户端工单对接

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换 [licenseKey](../development/license.md)
:::

import create_ticket_pc from '/img/ticket/create_ticket_pc.png';
import create_ticket_h5 from '/img/ticket/create_ticket_h5.png';
import create_ticket_h5_2 from '/img/ticket/create_ticket_h5_2.png';

## 功能概述

微语支持在第三方业务系统中嵌入工单功能。业务系统可将已登录用户的信息（如用户 ID、昵称、头像、联系方式等）传递给微语工单页面，实现用户身份无缝对接，无需重复登录。系统同时支持 PC 端和 H5 移动端。

### 主要特性

- **用户身份对接**：从业务系统传递用户信息，无需重复注册或登录
- **多端支持**：同时支持 PC 端和 H5 移动端
- **自动填充**：姓名、联系方式等字段自动预填充
- **历史工单**：同一用户可查看所有历史工单记录
- **通知推送**：工单状态变更时实时推送通知

### 适用场景

- 客户咨询和问题反馈
- 产品使用问题报告
- 服务请求和投诉
- 技术支持需求

## 用户信息对接

业务系统将用户信息通过 **URL 参数** 传递给微语工单页面，微语自动完成用户身份识别和工单关联。

### 对接方式

业务系统在跳转到工单页面时，将用户身份信息编码为 URL 参数即可。支持传递的参数包括：

| 参数 | 必填 | 说明 |
| --- | --- | --- |
| `org` | 是 | 组织标识 |
| `sid` | 是 | 技能组/工作组标识 |
| `t` | 是 | 类型：一对一、工作组、机器人 |
| `visitorUid` | **推荐** | 业务系统中的用户唯一标识，用于关联历史工单 |
| `nickname` | 推荐 | 用户昵称或姓名 |
| `avatar` | 可选 | 用户头像 URL |
| `mobile` | 推荐 | 用户手机号 |
| `email` | 可选 | 用户邮箱 |
| `lang` | 可选 | 语言：`zh-cn`（默认）、`zh-tw`、`en` |
| `accessToken` | 可选 | 已登录用户的访问令牌，可实现自动登录 |

### 对接示例

#### 基础 URL 跳转

将用户信息拼接在 URL 中直接跳转即可（注意中文和特殊字符需 URL 编码）：

```
https://your-domain.com/ticket?org=df_org_uid&t=1&sid=df_wg_uid
  &visitorUid=USER_001
  &nickname=张三
  &avatar=https%3A%2F%2Fexample.com%2Favatar.jpg
  &mobile=13800138000
  &email=zhangsan%40example.com
  &lang=zh-cn
```

#### 前端代码对接

如果业务系统是 Web 应用，可在代码中动态构建 URL 并打开：

```js
// 构建工单页面 URL，携带用户身份信息
const params = new URLSearchParams();
params.set('org', 'df_org_uid');
params.set('t', '1');
params.set('sid', 'df_wg_uid');
// 传递业务系统用户信息
params.set('visitorUid', currentUser.id);
params.set('nickname', currentUser.name);
params.set('avatar', currentUser.avatar);
params.set('mobile', currentUser.phone);
params.set('email', currentUser.email);
params.set('lang', 'zh-cn');

// 在新窗口打开工单页
window.open(`https://your-domain.com/ticket/history?${params.toString()}`, '_blank');
```

## PC 端创建工单

PC 端工单创建界面简洁明了，用户在业务系统中登录后，可直接在嵌入的工单页面中提交工单，用户身份信息自动关联。

<img src={create_ticket_pc} alt="pc创建工单"/>

### PC 端操作步骤

1. **访问工单页面**：从业务系统跳转到工单页面（已携带用户身份参数）
2. **填写基本信息**：姓名、联系方式等字段自动预填充，用户可修改
3. **选择工单类型**：根据需求选择合适的工单分类
4. **详细描述**：在内容框中详细描述问题或需求
5. **提交工单**：点击提交按钮完成工单创建

## H5 端创建工单

H5 移动端工单创建采用分步式设计，适合手机等小屏设备操作。

### 步骤一：确认信息

第一步展示和确认用户的联系信息（从业务系统传入），确保客服能够及时联系到用户。

<img src={create_ticket_h5} alt="h5创建工单" width="360" />

**展示的信息：**

- 用户姓名（预填充）
- 联系电话（预填充）
- 邮箱地址（预填充，可选）
- 工单标题

### 步骤二：完善内容

第二步填写工单的详细内容和选择相关配置。

<img src={create_ticket_h5_2} alt="h5创建工单2" width="360" />

**需要完善的内容：**

- 工单分类选择
- 问题详细描述
- 附件上传（如需要）
- 紧急程度选择

## 工单跟踪

工单提交后，用户可以通过以下方式跟踪进度：

- 在工单历史页面查看处理进度
- 查看客服回复内容
- 补充工单信息
- 关闭已完成的工单

通过 `visitorUid` 参数，系统自动关联同一用户的所有历史工单，用户可查看自己提交过的全部工单记录。

## 通知推送

当工单状态发生变更（新回复、状态更新等），系统通过以下方式通知用户：

- **WebSocket 实时推送**：用户在页面中即时收到通知
- **邮件通知**：工单状态变更时发送邮件
- **短信通知**：重要状态变更时发送短信

## 进阶功能

### accessToken 自动登录

如果业务系统已有用户登录态，可将 `accessToken` 作为 URL 参数传递，微语自动完成身份验证和登录。

### 要求登录模式

管理员可在管理后台配置"提交工单需要登录"，开启后用户需先登录才能提交工单。

### 自定义表单

支持按需配置自定义工单字段，满足不同业务场景的字段需求。

## 注意事项

1. **必填参数**：`org`、`sid`、`t` 为必填参数，请确保正确传递
2. **用户标识**：建议传递 `visitorUid` 参数，用于关联用户历史工单
3. **URL 编码**：包含中文或特殊字符的参数值需要进行 URL 编码
4. **联系方式**：`mobile` 和 `email` 用于工单状态变更时通知用户，建议填写

## 技术支持

在使用过程中遇到问题，可以：

- 查看常见问题解答
- 联系技术支持团队
- 提交系统反馈工单
