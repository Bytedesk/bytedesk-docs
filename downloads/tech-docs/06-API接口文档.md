# API 接口文档

> 本文档由根目录 `swagger-openapi.json`（OpenAPI 3.1）自动生成，覆盖微语智能客服平台全部 REST 接口。
> 运行时以在线文档为准：<http://localhost:9003/swagger-ui/index.html>。

- 接口总数：**1540** 个操作，分布于 **187** 个分组（tag）
- 鉴权方式：AccessToken 令牌（`Authorization: Bearer <token>`）
- 通用响应结构：`JsonResult { code, message, data }`，code=200 表示成功

## 目录

- [Action Log Management](#action-log-management)
- [客服管理](#客服管理)
- [客服状态管理](#客服状态管理)
- [客服状态设置管理](#客服状态设置管理)
- [AiStatistic Management](#aistatistic-management)
- [StatisticToken Management](#statistictoken-management)
- [文章管理](#文章管理)
- [文章归档管理](#文章归档管理)
- [assistant-rest-controller](#assistant-rest-controller)
- [Authority Management](#authority-management)
- [固定回复管理](#固定回复管理)
- [关键词回复管理](#关键词回复管理)
- [黑名单管理](#黑名单管理)
- [浏览记录管理](#浏览记录管理)
- [Category Management](#category-management)
- [渠道应用管理](#渠道应用管理)
- [notice-account-rest-controller](#notice-account-rest-controller)
- [Clipboard Management](#clipboard-management)
- [评论管理](#评论管理)
- [客户管理](#客户管理)
- [department - 部门](#department-部门)
- [douyin-app-rest-controller](#douyin-app-rest-controller)
- [douyin-comment-controller](#douyin-comment-controller)
- [douyin-dian-controller](#douyin-dian-controller)
- [douyin-mini-controller](#douyin-mini-controller)
- [email-template-rest-controller](#email-template-rest-controller)
- [email-rest-controller](#email-rest-controller)
- [email-listener-controller](#email-listener-controller)
- [email-message-rest-controller](#email-message-rest-controller)
- [常见问题管理](#常见问题管理)
- [Favorite Management](#favorite-management)
- [feature-rest-controller](#feature-rest-controller)
- [表单管理](#表单管理)
- [表单结果管理](#表单结果管理)
- [free-switch-cdr-rest-controller](#free-switch-cdr-rest-controller)
- [free-switch-conference-rest-controller](#free-switch-conference-rest-controller)
- [free-switch-gateway-rest-controller](#free-switch-gateway-rest-controller)
- [free-switch-number-rest-controller](#free-switch-number-rest-controller)
- [FreeSwitchStatistic Management](#freeswitchstatistic-management)
- [free-switch-web-rtc-rest-controller](#free-switch-web-rtc-rest-controller)
- [gray-release-controller](#gray-release-controller)
- [群组管理](#群组管理)
- [Group Invitation Management](#group-invitation-management)
- [Group Notice Management](#group-notice-management)
- [节假日管理](#节假日管理)
- [instagram-quick-replies-controller](#instagram-quick-replies-controller)
- [意图设置管理](#意图设置管理)
- [invite-settings-rest-controller](#invite-settings-rest-controller)
- [IP Access Management](#ip-access-management)
- [IP Blacklist Management](#ip-blacklist-management)
- [IP Whitelist Management](#ip-whitelist-management)
- [kakao-rest-controller](#kakao-rest-controller)
- [知识库管理](#知识库管理)
- [kbase-invite-rest-controller](#kbase-invite-rest-controller)
- [KbaseStatistic Management](#kbasestatistic-management)
- [license-rest-controller](#license-rest-controller)
- [line-rest-controller](#line-rest-controller)
- [chunk-rest-controller](#chunk-rest-controller)
- [文件管理](#文件管理)
- [text-rest-controller](#text-rest-controller)
- [webpage-rest-controller](#webpage-rest-controller)
- [网站管理](#网站管理)
- [素材管理](#素材管理)
- [成员管理](#成员管理)
- [Menu Management](#menu-management)
- [消息纠错管理](#消息纠错管理)
- [消息管理](#消息管理)
- [消息反馈管理](#消息反馈管理)
- [留言消息管理](#留言消息管理)
- [消息解析管理](#消息解析管理)
- [消息评价管理](#消息评价管理)
- [消息评价](#消息评价)
- [未回复消息管理](#未回复消息管理)
- [未读消息管理](#未读消息管理)
- [meta-app-rest-controller](#meta-app-rest-controller)
- [MinIO Storage](#minio-storage)
- [LLM模型管理](#llm模型管理)
- [module-rest-controller](#module-rest-controller)
- [Moment Management](#moment-management)
- [Notice Management](#notice-management)
- [o-auth-2-rest-controller](#o-auth-2-rest-controller)
- [ollama-4j-rest-controller](#ollama-4j-rest-controller)
- [order-rest-controller](#order-rest-controller)
- [organization-apply-rest-controller](#organization-apply-rest-controller)
- [Organization](#organization)
- [post-controller](#post-controller)
- [product-rest-controller](#product-rest-controller)
- [project-rest-controller](#project-rest-controller)
- [project-invite-rest-controller](#project-invite-rest-controller)
- [LLM提供商管理](#llm提供商管理)
- [Push Notification Management](#push-notification-management)
- [QualityAppeal Management](#qualityappeal-management)
- [QualityCheck Management](#qualitycheck-management)
- [QualityFlow Management](#qualityflow-management)
- [QualityPlan Management](#qualityplan-management)
- [QualityStatistic Management](#qualitystatistic-management)
- [Quartz Job Management](#quartz-job-management)
- [队列管理](#队列管理)
- [队列成员管理](#队列成员管理)
- [quick-reply-rest-controller](#quick-reply-rest-controller)
- [降级设置管理](#降级设置管理)
- [Relation Management](#relation-management)
- [report-rest-controller](#report-rest-controller)
- [robot-agent-controller](#robot-agent-controller)
- [机器人管理](#机器人管理)
- [robot-message-rest-controller](#robot-message-rest-controller)
- [Role Management](#role-management)
- [路由规则管理](#路由规则管理)
- [Server Metrics Management](#server-metrics-management)
- [Server Management](#server-management)
- [服务设置管理](#服务设置管理)
- [service-statistic-rest-controller](#service-statistic-rest-controller)
- [shop-app-rest-controller](#shop-app-rest-controller)
- [Shopping Management](#shopping-management)
- [slack-rest-controller](#slack-rest-controller)
- [taboo-rest-controller](#taboo-rest-controller)
- [敏感词消息管理](#敏感词消息管理)
- [Tag Management](#tag-management)
- [task-rest-controller](#task-rest-controller)
- [telegram-rest-controller](#telegram-rest-controller)
- [telegram-message-controller](#telegram-message-controller)
- [模板管理](#模板管理)
- [会话管理](#会话管理)
- [会话邀请](#会话邀请)
- [会话邀请管理](#会话邀请管理)
- [thread-process-controller](#thread-process-controller)
- [会话评价](#会话评价)
- [会话评价管理](#会话评价管理)
- [会话小结管理](#会话小结管理)
- [会话小结](#会话小结)
- [会话转接管理](#会话转接管理)
- [ticket-rest-controller](#ticket-rest-controller)
- [工单流程管理接口](#工单流程管理接口)
- [工单表单管理接口](#工单表单管理接口)
- [ticket-process-rest-controller](#ticket-process-rest-controller)
- [ticket-statistic-rest-controller](#ticket-statistic-rest-controller)
- [tiktok-rest-controller](#tiktok-rest-controller)
- [todo-list-rest-controller](#todo-list-rest-controller)
- [Token Management](#token-management)
- [主题管理](#主题管理)
- [Trace Management](#trace-management)
- [转接关键词](#转接关键词)
- [转接关键词管理](#转接关键词管理)
- [统一消息管理](#统一消息管理)
- [Upload Management](#upload-management)
- [URL Management](#url-management)
- [User Management](#user-management)
- [balance-controller](#balance-controller)
- [invoice-rest-controller](#invoice-rest-controller)
- [payment-rest-controller](#payment-rest-controller)
- [recharge-rest-controller](#recharge-rest-controller)
- [auth-vip-controller](#auth-vip-controller)
- [translate-rest-controller](#translate-rest-controller)
- [访客管理](#访客管理)
- [访客消息管理](#访客消息管理)
- [访客评价管理](#访客评价管理)
- [voc-api-controller](#voc-api-controller)
- [feedback-stats-controller](#feedback-stats-controller)
- [webhook-rest-controller](#webhook-rest-controller)
- [webhook-message-rest-controller](#webhook-message-rest-controller)
- [we-chat-account-rest-controller](#we-chat-account-rest-controller)
- [we-chat-app-rest-controller](#we-chat-app-rest-controller)
- [we-chat-mini-user-rest-controller](#we-chat-mini-user-rest-controller)
- [we-chat-mp-black-rest-controller](#we-chat-mp-black-rest-controller)
- [we-chat-mp-draft-rest-controller](#we-chat-mp-draft-rest-controller)
- [we-chat-mp-groupon-rest-controller](#we-chat-mp-groupon-rest-controller)
- [we-chat-mp-kefu-rest-controller](#we-chat-mp-kefu-rest-controller)
- [we-chat-mp-media-rest-controller](#we-chat-mp-media-rest-controller)
- [we-chat-mp-menu-rest-controller](#we-chat-mp-menu-rest-controller)
- [we-chat-mp-tag-rest-controller](#we-chat-mp-tag-rest-controller)
- [we-chat-mp-user-rest-controller](#we-chat-mp-user-rest-controller)
- [product-album-controller](#product-album-controller)
- [customer-acquisition-controller](#customer-acquisition-controller)
- [we-chat-work-customer-rest-controller](#we-chat-work-customer-rest-controller)
- [we-chat-work-group-rest-controller](#we-chat-work-group-rest-controller)
- [we-chat-work-session-rest-controller](#we-chat-work-session-rest-controller)
- [resign-transfer-controller](#resign-transfer-controller)
- [we-chat-work-taboo-controller](#we-chat-work-taboo-controller)
- [we-chat-work-upload-controller](#we-chat-work-upload-controller)
- [whats-app-rest-controller](#whats-app-rest-controller)
- [Workflow Management](#workflow-management)
- [workflow-result-rest-controller](#workflow-result-rest-controller)
- [工作流变量管理](#工作流变量管理)
- [工作组管理](#工作组管理)
- [工作时间管理](#工作时间管理)
- [工作时间设置管理](#工作时间设置管理)
- [zalo-rest-controller](#zalo-rest-controller)

---

## Action Log Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/action/create` | Create Action Log |
| `POST` | `/api/v1/action/delete` | Delete Action Log |
| `GET` | `/api/v1/action/export` | Export Action Logs |
| `GET` | `/api/v1/action/query` | Query Action Logs by User |
| `GET` | `/api/v1/action/query/org` | Query Action Logs by Organization |
| `GET` | `/api/v1/action/query/uid` | Query Action Log by UID |
| `POST` | `/api/v1/action/update` | Update Action Log |

### POST `/api/v1/action/create`

Create Action Log

**请求体**（application/json）：

- 结构：`ActionRequest`

**响应**：`object`

### POST `/api/v1/action/delete`

Delete Action Log

**请求体**（application/json）：

- 结构：`ActionRequest`

**响应**：`object`

### GET `/api/v1/action/export`

Export Action Logs

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ActionRequest |  |

**响应**：`object`

### GET `/api/v1/action/query`

Query Action Logs by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ActionRequest |  |

**响应**：`object`

### GET `/api/v1/action/query/org`

Query Action Logs by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ActionRequest |  |

**响应**：`object`

### GET `/api/v1/action/query/uid`

Query Action Log by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ActionRequest |  |

**响应**：`object`

### POST `/api/v1/action/update`

Update Action Log

**请求体**（application/json）：

- 结构：`ActionRequest`

**响应**：`object`

## 客服管理

共 13 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/agent/accept` | 客服接受会话 |
| `POST` | `/api/v1/agent/create` | 创建客服 |
| `POST` | `/api/v1/agent/delete` | 删除客服 |
| `GET` | `/api/v1/agent/export` | 导出客服 |
| `GET` | `/api/v1/agent/message/sse` | 客服消息SSE推送 |
| `GET` | `/api/v1/agent/query` | 查询用户下的客服 |
| `GET` | `/api/v1/agent/query/org` | 查询组织下的客服 |
| `GET` | `/api/v1/agent/query/uid` | 根据UID查询客服 |
| `POST` | `/api/v1/agent/sync/current/thread/count` | 同步当前会话数 |
| `POST` | `/api/v1/agent/update` | 更新客服 |
| `POST` | `/api/v1/agent/update/autoreply` | 更新客服自动回复 |
| `POST` | `/api/v1/agent/update/avatar` | 更新客服头像 |
| `POST` | `/api/v1/agent/update/status` | 更新客服状态 |

### POST `/api/v1/agent/accept`

客服接受会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`ThreadResponse`

### POST `/api/v1/agent/create`

创建客服

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`AgentResponse`

### POST `/api/v1/agent/delete`

删除客服

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`object`

### GET `/api/v1/agent/export`

导出客服

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentRequest |  |

**响应**：`object`

### GET `/api/v1/agent/message/sse`

客服消息SSE推送

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `message` | True | string |  |

**响应**：`—`

### GET `/api/v1/agent/query`

查询用户下的客服

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentRequest |  |

**响应**：`AgentResponse`

### GET `/api/v1/agent/query/org`

查询组织下的客服

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentRequest |  |

**响应**：`AgentResponse`

### GET `/api/v1/agent/query/uid`

根据UID查询客服

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentRequest |  |

**响应**：`AgentResponse`

### POST `/api/v1/agent/sync/current/thread/count`

同步当前会话数

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`AgentResponse`

### POST `/api/v1/agent/update`

更新客服

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`AgentResponse`

### POST `/api/v1/agent/update/autoreply`

更新客服自动回复

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`AgentResponse`

### POST `/api/v1/agent/update/avatar`

更新客服头像

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`AgentResponse`

### POST `/api/v1/agent/update/status`

更新客服状态

**请求体**（application/json）：

- 结构：`AgentRequest`

**响应**：`AgentResponse`

## 客服状态管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/agent/status/create` | 创建客服状态 |
| `POST` | `/api/v1/agent/status/delete` | 删除客服状态 |
| `GET` | `/api/v1/agent/status/export` |  |
| `GET` | `/api/v1/agent/status/query` | 根据用户查询客服状态 |
| `GET` | `/api/v1/agent/status/query/org` | 根据组织查询客服状态 |
| `GET` | `/api/v1/agent/status/query/uid` | 根据UID查询客服状态 |
| `POST` | `/api/v1/agent/status/update` | 更新客服状态 |

### POST `/api/v1/agent/status/create`

创建客服状态

**请求体**（application/json）：

- 结构：`AgentStatusRequest`

**响应**：`object`

### POST `/api/v1/agent/status/delete`

删除客服状态

**请求体**（application/json）：

- 结构：`AgentStatusRequest`

**响应**：`object`

### GET `/api/v1/agent/status/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusRequest |  |

**响应**：`object`

### GET `/api/v1/agent/status/query`

根据用户查询客服状态

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusRequest |  |

**响应**：`object`

### GET `/api/v1/agent/status/query/org`

根据组织查询客服状态

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusRequest |  |

**响应**：`object`

### GET `/api/v1/agent/status/query/uid`

根据UID查询客服状态

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusRequest |  |

**响应**：`object`

### POST `/api/v1/agent/status/update`

更新客服状态

**请求体**（application/json）：

- 结构：`AgentStatusRequest`

**响应**：`object`

## 客服状态设置管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/agent/status/setting/create` |  |
| `POST` | `/api/v1/agent/status/setting/delete` |  |
| `GET` | `/api/v1/agent/status/setting/export` |  |
| `GET` | `/api/v1/agent/status/setting/query` |  |
| `GET` | `/api/v1/agent/status/setting/query/org` |  |
| `GET` | `/api/v1/agent/status/setting/query/uid` |  |
| `POST` | `/api/v1/agent/status/setting/update` |  |

### POST `/api/v1/agent/status/setting/create`

**请求体**（application/json）：

- 结构：`AgentStatusSettingRequest`

**响应**：`object`

### POST `/api/v1/agent/status/setting/delete`

**请求体**（application/json）：

- 结构：`AgentStatusSettingRequest`

**响应**：`object`

### GET `/api/v1/agent/status/setting/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusSettingRequest |  |

**响应**：`object`

### GET `/api/v1/agent/status/setting/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusSettingRequest |  |

**响应**：`object`

### GET `/api/v1/agent/status/setting/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusSettingRequest |  |

**响应**：`object`

### GET `/api/v1/agent/status/setting/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AgentStatusSettingRequest |  |

**响应**：`object`

### POST `/api/v1/agent/status/setting/update`

**请求体**（application/json）：

- 结构：`AgentStatusSettingRequest`

**响应**：`object`

## AiStatistic Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ai/statistic/create` | Create AiStatistic |
| `POST` | `/api/v1/ai/statistic/delete` | Delete AiStatistic |
| `GET` | `/api/v1/ai/statistic/export` | Export AiStatistics |
| `GET` | `/api/v1/ai/statistic/query` | Query AiStatistics by User |
| `GET` | `/api/v1/ai/statistic/query/org` | Query AiStatistics by Organization |
| `GET` | `/api/v1/ai/statistic/query/uid` | Query AiStatistic by UID |
| `POST` | `/api/v1/ai/statistic/update` | Update AiStatistic |

### POST `/api/v1/ai/statistic/create`

Create AiStatistic

**请求体**（application/json）：

- 结构：`AiStatisticRequest`

**响应**：`object`

### POST `/api/v1/ai/statistic/delete`

Delete AiStatistic

**请求体**（application/json）：

- 结构：`AiStatisticRequest`

**响应**：`object`

### GET `/api/v1/ai/statistic/export`

Export AiStatistics

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AiStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/query`

Query AiStatistics by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AiStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/query/org`

Query AiStatistics by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AiStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/query/uid`

Query AiStatistic by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AiStatisticRequest |  |

**响应**：`object`

### POST `/api/v1/ai/statistic/update`

Update AiStatistic

**请求体**（application/json）：

- 结构：`AiStatisticRequest`

**响应**：`object`

## StatisticToken Management

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ai/statistic/token/create` | Create StatisticToken |
| `POST` | `/api/v1/ai/statistic/token/delete` | Delete StatisticToken |
| `GET` | `/api/v1/ai/statistic/token/export` | Export StatisticTokens |
| `GET` | `/api/v1/ai/statistic/token/hourly` | Get Hourly AI Token Statistics |
| `GET` | `/api/v1/ai/statistic/token/hourly/model` | Get Hourly AI Token Statistics by Model Type |
| `GET` | `/api/v1/ai/statistic/token/hourly/provider` | Get Hourly AI Token Statistics by Provider |
| `GET` | `/api/v1/ai/statistic/token/query` | Query StatisticTokens by User |
| `GET` | `/api/v1/ai/statistic/token/query/org` | Query StatisticTokens by Organization |
| `GET` | `/api/v1/ai/statistic/token/query/uid` | Query StatisticToken by UID |
| `POST` | `/api/v1/ai/statistic/token/update` | Update StatisticToken |

### POST `/api/v1/ai/statistic/token/create`

Create StatisticToken

**请求体**（application/json）：

- 结构：`StatisticTokenRequest`

**响应**：`object`

### POST `/api/v1/ai/statistic/token/delete`

Delete StatisticToken

**请求体**（application/json）：

- 结构：`StatisticTokenRequest`

**响应**：`object`

### GET `/api/v1/ai/statistic/token/export`

Export StatisticTokens

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:StatisticTokenRequest |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/token/hourly`

Get Hourly AI Token Statistics

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `orgUid` | True | string |  |
| query | `date` | True | string |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/token/hourly/model`

Get Hourly AI Token Statistics by Model Type

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `orgUid` | True | string |  |
| query | `date` | True | string |  |
| query | `aiModelType` | True | string |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/token/hourly/provider`

Get Hourly AI Token Statistics by Provider

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `orgUid` | True | string |  |
| query | `date` | True | string |  |
| query | `aiProvider` | True | string |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/token/query`

Query StatisticTokens by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:StatisticTokenRequest |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/token/query/org`

Query StatisticTokens by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:StatisticTokenRequest |  |

**响应**：`object`

### GET `/api/v1/ai/statistic/token/query/uid`

Query StatisticToken by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:StatisticTokenRequest |  |

**响应**：`object`

### POST `/api/v1/ai/statistic/token/update`

Update StatisticToken

**请求体**（application/json）：

- 结构：`StatisticTokenRequest`

**响应**：`object`

## 文章管理

共 12 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/article/create` | 创建文章 |
| `POST` | `/api/v1/article/delete` | 删除文章 |
| `GET` | `/api/v1/article/export` | 导出文章 |
| `GET` | `/api/v1/article/query` | 查询用户下的文章 |
| `GET` | `/api/v1/article/query/org` | 查询组织下的文章 |
| `GET` | `/api/v1/article/query/uid` | 查询指定文章 |
| `GET` | `/api/v1/article/search` | 搜索文章 |
| `POST` | `/api/v1/article/update` | 更新文章 |
| `POST` | `/api/v1/article/updateAllIndex` | 更新所有文章索引 |
| `POST` | `/api/v1/article/updateAllVectorIndex` | 更新所有文章向量索引 |
| `POST` | `/api/v1/article/updateIndex` | 更新文章索引 |
| `POST` | `/api/v1/article/updateVectorIndex` | 更新文章向量索引 |

### POST `/api/v1/article/create`

创建文章

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`ArticleResponse`

### POST `/api/v1/article/delete`

删除文章

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`object`

### GET `/api/v1/article/export`

导出文章

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleRequest |  |

**响应**：`object`

### GET `/api/v1/article/query`

查询用户下的文章

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleRequest |  |

**响应**：`ArticleResponse`

### GET `/api/v1/article/query/org`

查询组织下的文章

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleRequest |  |

**响应**：`ArticleResponse`

### GET `/api/v1/article/query/uid`

查询指定文章

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleRequest |  |

**响应**：`ArticleResponse`

### GET `/api/v1/article/search`

搜索文章

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleRequest |  |

**响应**：`ArticleElasticSearchResult`

### POST `/api/v1/article/update`

更新文章

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`ArticleResponse`

### POST `/api/v1/article/updateAllIndex`

更新所有文章索引

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`object`

### POST `/api/v1/article/updateAllVectorIndex`

更新所有文章向量索引

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`object`

### POST `/api/v1/article/updateIndex`

更新文章索引

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`object`

### POST `/api/v1/article/updateVectorIndex`

更新文章向量索引

**请求体**（application/json）：

- 结构：`ArticleRequest`

**响应**：`object`

## 文章归档管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/article_archive/create` | 创建文章归档 |
| `POST` | `/api/v1/article_archive/delete` | 删除文章归档 |
| `GET` | `/api/v1/article_archive/export` | 导出文章归档 |
| `GET` | `/api/v1/article_archive/query` | 根据用户查询文章归档 |
| `GET` | `/api/v1/article_archive/query/org` | 根据组织查询文章归档 |
| `GET` | `/api/v1/article_archive/query/uid` | 根据UID查询文章归档 |
| `POST` | `/api/v1/article_archive/update` | 更新文章归档 |

### POST `/api/v1/article_archive/create`

创建文章归档

**请求体**（application/json）：

- 结构：`ArticleArchiveRequest`

**响应**：`object`

### POST `/api/v1/article_archive/delete`

删除文章归档

**请求体**（application/json）：

- 结构：`ArticleArchiveRequest`

**响应**：`object`

### GET `/api/v1/article_archive/export`

导出文章归档

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleArchiveRequest |  |

**响应**：`object`

### GET `/api/v1/article_archive/query`

根据用户查询文章归档

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleArchiveRequest |  |

**响应**：`object`

### GET `/api/v1/article_archive/query/org`

根据组织查询文章归档

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleArchiveRequest |  |

**响应**：`object`

### GET `/api/v1/article_archive/query/uid`

根据UID查询文章归档

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ArticleArchiveRequest |  |

**响应**：`object`

### POST `/api/v1/article_archive/update`

更新文章归档

**请求体**（application/json）：

- 结构：`ArticleArchiveRequest`

**响应**：`object`

## assistant-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/assistant/create` |  |
| `POST` | `/api/v1/assistant/delete` |  |
| `GET` | `/api/v1/assistant/export` |  |
| `GET` | `/api/v1/assistant/query` |  |
| `GET` | `/api/v1/assistant/query/org` |  |
| `GET` | `/api/v1/assistant/query/uid` |  |
| `POST` | `/api/v1/assistant/update` |  |

### POST `/api/v1/assistant/create`

**请求体**（application/json）：

- 结构：`AssistantRequest`

**响应**：`object`

### POST `/api/v1/assistant/delete`

**请求体**（application/json）：

- 结构：`AssistantRequest`

**响应**：`object`

### GET `/api/v1/assistant/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AssistantRequest |  |

**响应**：`object`

### GET `/api/v1/assistant/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AssistantRequest |  |

**响应**：`object`

### GET `/api/v1/assistant/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AssistantRequest |  |

**响应**：`object`

### GET `/api/v1/assistant/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AssistantRequest |  |

**响应**：`object`

### POST `/api/v1/assistant/update`

**请求体**（application/json）：

- 结构：`AssistantRequest`

**响应**：`object`

## Authority Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/authority/create` |  |
| `POST` | `/api/v1/authority/delete` |  |
| `GET` | `/api/v1/authority/export` |  |
| `GET` | `/api/v1/authority/query` |  |
| `GET` | `/api/v1/authority/query/org` |  |
| `GET` | `/api/v1/authority/query/uid` |  |
| `POST` | `/api/v1/authority/update` |  |

### POST `/api/v1/authority/create`

**请求体**（application/json）：

- 结构：`AuthorityRequest`

**响应**：`object`

### POST `/api/v1/authority/delete`

**请求体**（application/json）：

- 结构：`AuthorityRequest`

**响应**：`object`

### GET `/api/v1/authority/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AuthorityRequest |  |

**响应**：`object`

### GET `/api/v1/authority/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AuthorityRequest |  |

**响应**：`object`

### GET `/api/v1/authority/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AuthorityRequest |  |

**响应**：`object`

### GET `/api/v1/authority/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AuthorityRequest |  |

**响应**：`object`

### POST `/api/v1/authority/update`

**请求体**（application/json）：

- 结构：`AuthorityRequest`

**响应**：`object`

## 固定回复管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/autoreply/fixed/create` | 创建固定回复 |
| `POST` | `/api/v1/autoreply/fixed/delete` | 删除固定回复 |
| `POST` | `/api/v1/autoreply/fixed/enable` | 启用固定回复 |
| `GET` | `/api/v1/autoreply/fixed/export` | 导出固定回复 |
| `GET` | `/api/v1/autoreply/fixed/query` | 查询用户下的固定回复 |
| `GET` | `/api/v1/autoreply/fixed/query/org` | 查询组织下的固定回复 |
| `GET` | `/api/v1/autoreply/fixed/query/uid` |  |
| `POST` | `/api/v1/autoreply/fixed/update` | 更新固定回复 |

### POST `/api/v1/autoreply/fixed/create`

创建固定回复

**请求体**（application/json）：

- 结构：`AutoReplyFixedRequest`

**响应**：`AutoReplyFixedResponse`

### POST `/api/v1/autoreply/fixed/delete`

删除固定回复

**请求体**（application/json）：

- 结构：`AutoReplyFixedRequest`

**响应**：`object`

### POST `/api/v1/autoreply/fixed/enable`

启用固定回复

**请求体**（application/json）：

- 结构：`AutoReplyFixedRequest`

**响应**：`AutoReplyFixedResponse`

### GET `/api/v1/autoreply/fixed/export`

导出固定回复

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyFixedRequest |  |

**响应**：`object`

### GET `/api/v1/autoreply/fixed/query`

查询用户下的固定回复

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyFixedRequest |  |

**响应**：`AutoReplyFixedResponse`

### GET `/api/v1/autoreply/fixed/query/org`

查询组织下的固定回复

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyFixedRequest |  |

**响应**：`AutoReplyFixedResponse`

### GET `/api/v1/autoreply/fixed/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyFixedRequest |  |

**响应**：`object`

### POST `/api/v1/autoreply/fixed/update`

更新固定回复

**请求体**（application/json）：

- 结构：`AutoReplyFixedRequest`

**响应**：`AutoReplyFixedResponse`

## 关键词回复管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/autoreply/keyword/create` | 创建关键词回复 |
| `POST` | `/api/v1/autoreply/keyword/delete` | 删除关键词回复 |
| `POST` | `/api/v1/autoreply/keyword/enable` | 启用关键词回复 |
| `GET` | `/api/v1/autoreply/keyword/export` | 导出关键词回复 |
| `GET` | `/api/v1/autoreply/keyword/query` | 查询用户下的关键词回复 |
| `GET` | `/api/v1/autoreply/keyword/query/org` | 查询组织下的关键词回复 |
| `GET` | `/api/v1/autoreply/keyword/query/uid` |  |
| `POST` | `/api/v1/autoreply/keyword/update` | 更新关键词回复 |

### POST `/api/v1/autoreply/keyword/create`

创建关键词回复

**请求体**（application/json）：

- 结构：`AutoReplyKeywordRequest`

**响应**：`AutoReplyKeywordResponse`

### POST `/api/v1/autoreply/keyword/delete`

删除关键词回复

**请求体**（application/json）：

- 结构：`AutoReplyKeywordRequest`

**响应**：`object`

### POST `/api/v1/autoreply/keyword/enable`

启用关键词回复

**请求体**（application/json）：

- 结构：`AutoReplyKeywordRequest`

**响应**：`AutoReplyKeywordResponse`

### GET `/api/v1/autoreply/keyword/export`

导出关键词回复

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyKeywordRequest |  |

**响应**：`object`

### GET `/api/v1/autoreply/keyword/query`

查询用户下的关键词回复

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyKeywordRequest |  |

**响应**：`AutoReplyKeywordResponse`

### GET `/api/v1/autoreply/keyword/query/org`

查询组织下的关键词回复

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyKeywordRequest |  |

**响应**：`AutoReplyKeywordResponse`

### GET `/api/v1/autoreply/keyword/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:AutoReplyKeywordRequest |  |

**响应**：`object`

### POST `/api/v1/autoreply/keyword/update`

更新关键词回复

**请求体**（application/json）：

- 结构：`AutoReplyKeywordRequest`

**响应**：`AutoReplyKeywordResponse`

## 黑名单管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/black/create` | 创建黑名单 |
| `POST` | `/api/v1/black/delete` | 删除黑名单 |
| `GET` | `/api/v1/black/exists/blackUid` | 查询当前blackUid是否存在于黑名单中 |
| `GET` | `/api/v1/black/export` | 导出黑名单 |
| `GET` | `/api/v1/black/query` | 根据用户查询黑名单 |
| `GET` | `/api/v1/black/query/org` | 根据组织查询黑名单 |
| `GET` | `/api/v1/black/query/uid` | 根据UID查询黑名单 |
| `POST` | `/api/v1/black/unblock/blackUid` | 解除黑名单 |
| `POST` | `/api/v1/black/update` | 更新黑名单 |

### POST `/api/v1/black/create`

创建黑名单

**请求体**（application/json）：

- 结构：`BlackRequest`

**响应**：`object`

### POST `/api/v1/black/delete`

删除黑名单

**请求体**（application/json）：

- 结构：`BlackRequest`

**响应**：`object`

### GET `/api/v1/black/exists/blackUid`

查询当前blackUid是否存在于黑名单中

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BlackRequest |  |

**响应**：`object`

### GET `/api/v1/black/export`

导出黑名单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BlackRequest |  |

**响应**：`object`

### GET `/api/v1/black/query`

根据用户查询黑名单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BlackRequest |  |

**响应**：`object`

### GET `/api/v1/black/query/org`

根据组织查询黑名单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BlackRequest |  |

**响应**：`object`

### GET `/api/v1/black/query/uid`

根据UID查询黑名单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BlackRequest |  |

**响应**：`object`

### POST `/api/v1/black/unblock/blackUid`

解除黑名单

**请求体**（application/json）：

- 结构：`BlackRequest`

**响应**：`object`

### POST `/api/v1/black/update`

更新黑名单

**请求体**（application/json）：

- 结构：`BlackRequest`

**响应**：`object`

## 浏览记录管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/browse/create` | 创建浏览记录 |
| `POST` | `/api/v1/browse/delete` | 删除浏览记录 |
| `GET` | `/api/v1/browse/export` | 导出浏览记录 |
| `GET` | `/api/v1/browse/query` | 查询用户下的浏览记录 |
| `GET` | `/api/v1/browse/query/org` | 查询组织下的浏览记录 |
| `GET` | `/api/v1/browse/query/uid` | 查询指定浏览记录 |
| `GET` | `/api/v1/browse/query/visitor/uid` | 查询访客的浏览记录 |
| `POST` | `/api/v1/browse/update` | 更新浏览记录 |

### POST `/api/v1/browse/create`

创建浏览记录

**请求体**（application/json）：

- 结构：`BrowseRequest`

**响应**：`BrowseResponse`

### POST `/api/v1/browse/delete`

删除浏览记录

**请求体**（application/json）：

- 结构：`BrowseRequest`

**响应**：`object`

### GET `/api/v1/browse/export`

导出浏览记录

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BrowseRequest |  |

**响应**：`object`

### GET `/api/v1/browse/query`

查询用户下的浏览记录

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BrowseRequest |  |

**响应**：`BrowseResponse`

### GET `/api/v1/browse/query/org`

查询组织下的浏览记录

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BrowseRequest |  |

**响应**：`BrowseResponse`

### GET `/api/v1/browse/query/uid`

查询指定浏览记录

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BrowseRequest |  |

**响应**：`BrowseResponse`

### GET `/api/v1/browse/query/visitor/uid`

查询访客的浏览记录

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BrowseRequest |  |

**响应**：`BrowseResponse`

### POST `/api/v1/browse/update`

更新浏览记录

**请求体**（application/json）：

- 结构：`BrowseRequest`

**响应**：`BrowseResponse`

## Category Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/category/create` | Create Category |
| `POST` | `/api/v1/category/delete` | Delete Category |
| `GET` | `/api/v1/category/export` |  |
| `GET` | `/api/v1/category/query` | Query Categories by User |
| `GET` | `/api/v1/category/query/org` | Query Categories by Organization |
| `GET` | `/api/v1/category/query/uid` |  |
| `POST` | `/api/v1/category/update` | Update Category |

### POST `/api/v1/category/create`

Create Category

**请求体**（application/json）：

- 结构：`CategoryRequest`

**响应**：`object`

### POST `/api/v1/category/delete`

Delete Category

**请求体**（application/json）：

- 结构：`CategoryRequest`

**响应**：`object`

### GET `/api/v1/category/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CategoryRequest |  |

**响应**：`object`

### GET `/api/v1/category/query`

Query Categories by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CategoryRequest |  |

**响应**：`object`

### GET `/api/v1/category/query/org`

Query Categories by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CategoryRequest |  |

**响应**：`object`

### GET `/api/v1/category/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CategoryRequest |  |

**响应**：`object`

### POST `/api/v1/category/update`

Update Category

**请求体**（application/json）：

- 结构：`CategoryRequest`

**响应**：`object`

## 渠道应用管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/channel/app/create` | 创建渠道应用 |
| `POST` | `/api/v1/channel/app/delete` | 删除渠道应用 |
| `GET` | `/api/v1/channel/app/export` | 导出渠道应用 |
| `GET` | `/api/v1/channel/app/query` | 查询用户下的渠道应用 |
| `GET` | `/api/v1/channel/app/query/org` | 查询组织下的渠道应用 |
| `GET` | `/api/v1/channel/app/query/uid` | 查询指定渠道应用 |
| `POST` | `/api/v1/channel/app/update` | 更新渠道应用 |

### POST `/api/v1/channel/app/create`

创建渠道应用

**请求体**（application/json）：

- 结构：`ChannelAppRequest`

**响应**：`ChannelAppResponse`

### POST `/api/v1/channel/app/delete`

删除渠道应用

**请求体**（application/json）：

- 结构：`ChannelAppRequest`

**响应**：`object`

### GET `/api/v1/channel/app/export`

导出渠道应用

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChannelAppRequest |  |

**响应**：`object`

### GET `/api/v1/channel/app/query`

查询用户下的渠道应用

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChannelAppRequest |  |

**响应**：`ChannelAppResponse`

### GET `/api/v1/channel/app/query/org`

查询组织下的渠道应用

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChannelAppRequest |  |

**响应**：`ChannelAppResponse`

### GET `/api/v1/channel/app/query/uid`

查询指定渠道应用

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChannelAppRequest |  |

**响应**：`ChannelAppResponse`

### POST `/api/v1/channel/app/update`

更新渠道应用

**请求体**（application/json）：

- 结构：`ChannelAppRequest`

**响应**：`ChannelAppResponse`

## notice-account-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/channel/create` |  |
| `POST` | `/api/v1/channel/delete` |  |
| `GET` | `/api/v1/channel/export` |  |
| `GET` | `/api/v1/channel/query` |  |
| `GET` | `/api/v1/channel/query/org` |  |
| `GET` | `/api/v1/channel/query/uid` |  |
| `POST` | `/api/v1/channel/update` |  |

### POST `/api/v1/channel/create`

**请求体**（application/json）：

- 结构：`NoticeAccountRequest`

**响应**：`object`

### POST `/api/v1/channel/delete`

**请求体**（application/json）：

- 结构：`NoticeAccountRequest`

**响应**：`object`

### GET `/api/v1/channel/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeAccountRequest |  |

**响应**：`object`

### GET `/api/v1/channel/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeAccountRequest |  |

**响应**：`object`

### GET `/api/v1/channel/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeAccountRequest |  |

**响应**：`object`

### GET `/api/v1/channel/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeAccountRequest |  |

**响应**：`object`

### POST `/api/v1/channel/update`

**请求体**（application/json）：

- 结构：`NoticeAccountRequest`

**响应**：`object`

## Clipboard Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/clipboard/create` | Create Clipboard Item |
| `POST` | `/api/v1/clipboard/delete` | Delete Clipboard Item |
| `GET` | `/api/v1/clipboard/export` |  |
| `GET` | `/api/v1/clipboard/query` | Query Clipboard by User |
| `GET` | `/api/v1/clipboard/query/org` |  |
| `GET` | `/api/v1/clipboard/query/uid` |  |
| `POST` | `/api/v1/clipboard/update` | Update Clipboard Item |

### POST `/api/v1/clipboard/create`

Create Clipboard Item

**请求体**（application/json）：

- 结构：`ClipboardRequest`

**响应**：`object`

### POST `/api/v1/clipboard/delete`

Delete Clipboard Item

**请求体**（application/json）：

- 结构：`ClipboardRequest`

**响应**：`object`

### GET `/api/v1/clipboard/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ClipboardRequest |  |

**响应**：`object`

### GET `/api/v1/clipboard/query`

Query Clipboard by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ClipboardRequest |  |

**响应**：`object`

### GET `/api/v1/clipboard/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ClipboardRequest |  |

**响应**：`object`

### GET `/api/v1/clipboard/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ClipboardRequest |  |

**响应**：`object`

### POST `/api/v1/clipboard/update`

Update Clipboard Item

**请求体**（application/json）：

- 结构：`ClipboardRequest`

**响应**：`object`

## 评论管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/comment/create` | 创建评论 |
| `POST` | `/api/v1/comment/delete` | 删除评论 |
| `GET` | `/api/v1/comment/export` | 导出评论 |
| `GET` | `/api/v1/comment/query` | 查询用户下的评论 |
| `GET` | `/api/v1/comment/query/org` | 查询组织下的评论 |
| `GET` | `/api/v1/comment/query/uid` |  |
| `POST` | `/api/v1/comment/update` | 更新评论 |

### POST `/api/v1/comment/create`

创建评论

**请求体**（application/json）：

- 结构：`CommentRequest`

**响应**：`CommentResponse`

### POST `/api/v1/comment/delete`

删除评论

**请求体**（application/json）：

- 结构：`CommentRequest`

**响应**：`object`

### GET `/api/v1/comment/export`

导出评论

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CommentRequest |  |

**响应**：`object`

### GET `/api/v1/comment/query`

查询用户下的评论

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CommentRequest |  |

**响应**：`CommentResponse`

### GET `/api/v1/comment/query/org`

查询组织下的评论

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CommentRequest |  |

**响应**：`CommentResponse`

### GET `/api/v1/comment/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CommentRequest |  |

**响应**：`object`

### POST `/api/v1/comment/update`

更新评论

**请求体**（application/json）：

- 结构：`CommentRequest`

**响应**：`CommentResponse`

## 客户管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/customer/create` | 创建客户 |
| `POST` | `/api/v1/customer/delete` | 删除客户 |
| `GET` | `/api/v1/customer/export` | 导出客户 |
| `GET` | `/api/v1/customer/query` | 查询用户下的客户 |
| `GET` | `/api/v1/customer/query/org` | 查询组织下的客户 |
| `GET` | `/api/v1/customer/query/uid` | 查询指定客户 |
| `GET` | `/api/v1/customer/query/visitorUid` | 查询访客下的客户 |
| `POST` | `/api/v1/customer/update` | 更新客户 |

### POST `/api/v1/customer/create`

创建客户

**请求体**（application/json）：

- 结构：`CustomerRequest`

**响应**：`CustomerResponse`

### POST `/api/v1/customer/delete`

删除客户

**请求体**（application/json）：

- 结构：`CustomerRequest`

**响应**：`object`

### GET `/api/v1/customer/export`

导出客户

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CustomerRequest |  |

**响应**：`object`

### GET `/api/v1/customer/query`

查询用户下的客户

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CustomerRequest |  |

**响应**：`CustomerResponse`

### GET `/api/v1/customer/query/org`

查询组织下的客户

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CustomerRequest |  |

**响应**：`CustomerResponse`

### GET `/api/v1/customer/query/uid`

查询指定客户

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CustomerRequest |  |

**响应**：`CustomerResponse`

### GET `/api/v1/customer/query/visitorUid`

查询访客下的客户

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:CustomerRequest |  |

**响应**：`CustomerResponse`

### POST `/api/v1/customer/update`

更新客户

**请求体**（application/json）：

- 结构：`CustomerRequest`

**响应**：`CustomerResponse`

## department - 部门

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/department/create` |  |
| `POST` | `/api/v1/department/delete` |  |
| `GET` | `/api/v1/department/export` |  |
| `GET` | `/api/v1/department/query` |  |
| `GET` | `/api/v1/department/query/org` |  |
| `GET` | `/api/v1/department/query/uid` |  |
| `POST` | `/api/v1/department/update` |  |

### POST `/api/v1/department/create`

**请求体**（application/json）：

- 结构：`DepartmentRequest`

**响应**：`object`

### POST `/api/v1/department/delete`

**请求体**（application/json）：

- 结构：`DepartmentRequest`

**响应**：`object`

### GET `/api/v1/department/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DepartmentRequest |  |

**响应**：`object`

### GET `/api/v1/department/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DepartmentRequest |  |

**响应**：`object`

### GET `/api/v1/department/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DepartmentRequest |  |

**响应**：`object`

### GET `/api/v1/department/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DepartmentRequest |  |

**响应**：`object`

### POST `/api/v1/department/update`

**请求体**（application/json）：

- 结构：`DepartmentRequest`

**响应**：`object`

## douyin-app-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/douyin/app/create` |  |
| `POST` | `/api/v1/douyin/app/delete` |  |
| `GET` | `/api/v1/douyin/app/export` |  |
| `GET` | `/api/v1/douyin/app/query` |  |
| `GET` | `/api/v1/douyin/app/query/org` |  |
| `GET` | `/api/v1/douyin/app/query/uid` |  |
| `GET` | `/api/v1/douyin/app/refreshToken` |  |
| `POST` | `/api/v1/douyin/app/update` |  |

### POST `/api/v1/douyin/app/create`

**请求体**（application/json）：

- 结构：`DouyinAppRequest`

**响应**：`object`

### POST `/api/v1/douyin/app/delete`

**请求体**（application/json）：

- 结构：`DouyinAppRequest`

**响应**：`object`

### GET `/api/v1/douyin/app/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinAppRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/app/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinAppRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/app/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinAppRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/app/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinAppRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/app/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinAppRequest |  |

**响应**：`object`

### POST `/api/v1/douyin/app/update`

**请求体**（application/json）：

- 结构：`DouyinAppRequest`

**响应**：`object`

## douyin-comment-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/douyin/comment/create` |  |
| `POST` | `/api/v1/douyin/comment/delete` |  |
| `GET` | `/api/v1/douyin/comment/export` |  |
| `GET` | `/api/v1/douyin/comment/query` |  |
| `GET` | `/api/v1/douyin/comment/query/org` |  |
| `GET` | `/api/v1/douyin/comment/query/uid` |  |
| `POST` | `/api/v1/douyin/comment/update` |  |

### POST `/api/v1/douyin/comment/create`

**请求体**（application/json）：

- 结构：`DouyinCommentRequest`

**响应**：`object`

### POST `/api/v1/douyin/comment/delete`

**请求体**（application/json）：

- 结构：`DouyinCommentRequest`

**响应**：`object`

### GET `/api/v1/douyin/comment/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinCommentRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/comment/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinCommentRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/comment/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinCommentRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/comment/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinCommentRequest |  |

**响应**：`object`

### POST `/api/v1/douyin/comment/update`

**请求体**（application/json）：

- 结构：`DouyinCommentRequest`

**响应**：`object`

## douyin-dian-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/douyin/dian/create` |  |
| `POST` | `/api/v1/douyin/dian/delete` |  |
| `GET` | `/api/v1/douyin/dian/export` |  |
| `GET` | `/api/v1/douyin/dian/query` |  |
| `GET` | `/api/v1/douyin/dian/query/org` |  |
| `GET` | `/api/v1/douyin/dian/query/uid` |  |
| `POST` | `/api/v1/douyin/dian/update` |  |

### POST `/api/v1/douyin/dian/create`

**请求体**（application/json）：

- 结构：`DouyinDianRequest`

**响应**：`object`

### POST `/api/v1/douyin/dian/delete`

**请求体**（application/json）：

- 结构：`DouyinDianRequest`

**响应**：`object`

### GET `/api/v1/douyin/dian/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinDianRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/dian/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinDianRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/dian/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinDianRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/dian/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinDianRequest |  |

**响应**：`object`

### POST `/api/v1/douyin/dian/update`

**请求体**（application/json）：

- 结构：`DouyinDianRequest`

**响应**：`object`

## douyin-mini-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/douyin/mini/create` |  |
| `POST` | `/api/v1/douyin/mini/delete` |  |
| `GET` | `/api/v1/douyin/mini/export` |  |
| `GET` | `/api/v1/douyin/mini/query` |  |
| `GET` | `/api/v1/douyin/mini/query/org` |  |
| `GET` | `/api/v1/douyin/mini/query/uid` |  |
| `POST` | `/api/v1/douyin/mini/update` |  |

### POST `/api/v1/douyin/mini/create`

**请求体**（application/json）：

- 结构：`DouyinMiniRequest`

**响应**：`object`

### POST `/api/v1/douyin/mini/delete`

**请求体**（application/json）：

- 结构：`DouyinMiniRequest`

**响应**：`object`

### GET `/api/v1/douyin/mini/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinMiniRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/mini/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinMiniRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/mini/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinMiniRequest |  |

**响应**：`object`

### GET `/api/v1/douyin/mini/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:DouyinMiniRequest |  |

**响应**：`object`

### POST `/api/v1/douyin/mini/update`

**请求体**（application/json）：

- 结构：`DouyinMiniRequest`

**响应**：`object`

## email-template-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/email-template/create` |  |
| `POST` | `/api/v1/email-template/delete` |  |
| `GET` | `/api/v1/email-template/export` |  |
| `GET` | `/api/v1/email-template/query` |  |
| `GET` | `/api/v1/email-template/query/org` |  |
| `GET` | `/api/v1/email-template/query/uid` |  |
| `POST` | `/api/v1/email-template/update` |  |

### POST `/api/v1/email-template/create`

**请求体**（application/json）：

- 结构：`EmailTemplateRequest`

**响应**：`object`

### POST `/api/v1/email-template/delete`

**请求体**（application/json）：

- 结构：`EmailTemplateRequest`

**响应**：`object`

### GET `/api/v1/email-template/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailTemplateRequest |  |

**响应**：`object`

### GET `/api/v1/email-template/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailTemplateRequest |  |

**响应**：`object`

### GET `/api/v1/email-template/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailTemplateRequest |  |

**响应**：`object`

### GET `/api/v1/email-template/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailTemplateRequest |  |

**响应**：`object`

### POST `/api/v1/email-template/update`

**请求体**（application/json）：

- 结构：`EmailTemplateRequest`

**响应**：`object`

## email-rest-controller

共 16 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/email/create` |  |
| `POST` | `/api/v1/email/delete` |  |
| `GET` | `/api/v1/email/export` |  |
| `GET` | `/api/v1/email/query` |  |
| `GET` | `/api/v1/email/query/org` |  |
| `GET` | `/api/v1/email/query/uid` |  |
| `POST` | `/api/v1/email/sync/batch-start` |  |
| `POST` | `/api/v1/email/sync/manual` |  |
| `GET` | `/api/v1/email/sync/overview` |  |
| `POST` | `/api/v1/email/sync/restart` |  |
| `POST` | `/api/v1/email/sync/start` |  |
| `GET` | `/api/v1/email/sync/status` |  |
| `POST` | `/api/v1/email/sync/stop` |  |
| `POST` | `/api/v1/email/sync/stop-all` |  |
| `POST` | `/api/v1/email/sync/test` |  |
| `POST` | `/api/v1/email/update` |  |

### POST `/api/v1/email/create`

**请求体**（application/json）：

- 结构：`EmailRequest`

**响应**：`object`

### POST `/api/v1/email/delete`

**请求体**（application/json）：

- 结构：`EmailRequest`

**响应**：`object`

### GET `/api/v1/email/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailRequest |  |

**响应**：`object`

### GET `/api/v1/email/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailRequest |  |

**响应**：`object`

### GET `/api/v1/email/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailRequest |  |

**响应**：`object`

### GET `/api/v1/email/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailRequest |  |

**响应**：`object`

### POST `/api/v1/email/sync/batch-start`

**响应**：`object`

### POST `/api/v1/email/sync/manual`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `uid` | True | string |  |

**响应**：`object`

### GET `/api/v1/email/sync/overview`

**响应**：`object`

### POST `/api/v1/email/sync/restart`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `uid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/sync/start`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `uid` | True | string |  |

**响应**：`object`

### GET `/api/v1/email/sync/status`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `uid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/sync/stop`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `uid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/sync/stop-all`

**响应**：`object`

### POST `/api/v1/email/sync/test`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `uid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/update`

**请求体**（application/json）：

- 结构：`EmailRequest`

**响应**：`object`

## email-listener-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/email/listeners/restart/{emailUid}` |  |
| `POST` | `/api/v1/email/listeners/start/{emailUid}` |  |
| `GET` | `/api/v1/email/listeners/status` |  |
| `GET` | `/api/v1/email/listeners/status/detailed` |  |
| `GET` | `/api/v1/email/listeners/status/{emailUid}` |  |
| `POST` | `/api/v1/email/listeners/stop/{emailUid}` |  |
| `POST` | `/api/v1/email/listeners/sync/{emailUid}` |  |
| `POST` | `/api/v1/email/listeners/test-connection/{emailUid}` |  |

### POST `/api/v1/email/listeners/restart/{emailUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `emailUid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/listeners/start/{emailUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `emailUid` | True | string |  |

**响应**：`object`

### GET `/api/v1/email/listeners/status`

**响应**：`object`

### GET `/api/v1/email/listeners/status/detailed`

**响应**：`string`

### GET `/api/v1/email/listeners/status/{emailUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `emailUid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/listeners/stop/{emailUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `emailUid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/listeners/sync/{emailUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `emailUid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/listeners/test-connection/{emailUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `emailUid` | True | string |  |

**响应**：`object`

## email-message-rest-controller

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/email/message/create` |  |
| `POST` | `/api/v1/email/message/delete` |  |
| `GET` | `/api/v1/email/message/export` |  |
| `GET` | `/api/v1/email/message/query` |  |
| `GET` | `/api/v1/email/message/query/org` |  |
| `GET` | `/api/v1/email/message/query/uid` |  |
| `POST` | `/api/v1/email/message/send` |  |
| `POST` | `/api/v1/email/message/send/test` |  |
| `POST` | `/api/v1/email/message/send/test-connection` |  |
| `POST` | `/api/v1/email/message/update` |  |

### POST `/api/v1/email/message/create`

**请求体**（application/json）：

- 结构：`EmailMessageRequest`

**响应**：`object`

### POST `/api/v1/email/message/delete`

**请求体**（application/json）：

- 结构：`EmailMessageRequest`

**响应**：`object`

### GET `/api/v1/email/message/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailMessageRequest |  |

**响应**：`object`

### GET `/api/v1/email/message/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailMessageRequest |  |

**响应**：`object`

### GET `/api/v1/email/message/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailMessageRequest |  |

**响应**：`object`

### GET `/api/v1/email/message/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:EmailMessageRequest |  |

**响应**：`object`

### POST `/api/v1/email/message/send`

**请求体**（application/json）：

- 结构：`EmailMessageRequest`

**响应**：`object`

### POST `/api/v1/email/message/send/test`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `emailConfigUid` | True | string |  |
| query | `testEmail` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/message/send/test-connection`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `emailConfigUid` | True | string |  |

**响应**：`object`

### POST `/api/v1/email/message/update`

**请求体**（application/json）：

- 结构：`EmailMessageRequest`

**响应**：`object`

## 常见问题管理

共 13 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/faq/create` | 创建常见问题 |
| `POST` | `/api/v1/faq/delete` | 删除常见问题 |
| `POST` | `/api/v1/faq/deleteAll` | 删除所有常见问题 |
| `POST` | `/api/v1/faq/enable` | 启用常见问题 |
| `GET` | `/api/v1/faq/export` | 导出常见问题 |
| `GET` | `/api/v1/faq/query` | 查询用户下的常见问题 |
| `GET` | `/api/v1/faq/query/org` | 查询组织下的常见问题 |
| `GET` | `/api/v1/faq/query/uid` | 查询指定常见问题 |
| `POST` | `/api/v1/faq/update` | 更新常见问题 |
| `POST` | `/api/v1/faq/updateAllIndex` | 更新所有常见问题索引 |
| `POST` | `/api/v1/faq/updateAllVectorIndex` | 更新所有常见问题向量索引 |
| `POST` | `/api/v1/faq/updateIndex` | 更新常见问题索引 |
| `POST` | `/api/v1/faq/updateVectorIndex` | 更新常见问题向量索引 |

### POST `/api/v1/faq/create`

创建常见问题

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`FaqResponse`

### POST `/api/v1/faq/delete`

删除常见问题

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`object`

### POST `/api/v1/faq/deleteAll`

删除所有常见问题

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`object`

### POST `/api/v1/faq/enable`

启用常见问题

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`FaqResponse`

### GET `/api/v1/faq/export`

导出常见问题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FaqRequest |  |

**响应**：`object`

### GET `/api/v1/faq/query`

查询用户下的常见问题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FaqRequest |  |

**响应**：`FaqResponse`

### GET `/api/v1/faq/query/org`

查询组织下的常见问题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FaqRequest |  |

**响应**：`FaqResponse`

### GET `/api/v1/faq/query/uid`

查询指定常见问题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FaqRequest |  |

**响应**：`FaqResponse`

### POST `/api/v1/faq/update`

更新常见问题

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`FaqResponse`

### POST `/api/v1/faq/updateAllIndex`

更新所有常见问题索引

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`object`

### POST `/api/v1/faq/updateAllVectorIndex`

更新所有常见问题向量索引

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`object`

### POST `/api/v1/faq/updateIndex`

更新常见问题索引

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`object`

### POST `/api/v1/faq/updateVectorIndex`

更新常见问题向量索引

**请求体**（application/json）：

- 结构：`FaqRequest`

**响应**：`object`

## Favorite Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/favorite/create` | Create Favorite |
| `POST` | `/api/v1/favorite/delete` | Delete Favorite |
| `GET` | `/api/v1/favorite/export` |  |
| `GET` | `/api/v1/favorite/query` | Query Favorites by User |
| `GET` | `/api/v1/favorite/query/org` | Query Favorites by Organization |
| `GET` | `/api/v1/favorite/query/uid` |  |
| `POST` | `/api/v1/favorite/update` | Update Favorite |

### POST `/api/v1/favorite/create`

Create Favorite

**请求体**（application/json）：

- 结构：`FavoriteRequest`

**响应**：`object`

### POST `/api/v1/favorite/delete`

Delete Favorite

**请求体**（application/json）：

- 结构：`FavoriteRequest`

**响应**：`object`

### GET `/api/v1/favorite/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FavoriteRequest |  |

**响应**：`object`

### GET `/api/v1/favorite/query`

Query Favorites by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FavoriteRequest |  |

**响应**：`object`

### GET `/api/v1/favorite/query/org`

Query Favorites by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FavoriteRequest |  |

**响应**：`object`

### GET `/api/v1/favorite/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FavoriteRequest |  |

**响应**：`object`

### POST `/api/v1/favorite/update`

Update Favorite

**请求体**（application/json）：

- 结构：`FavoriteRequest`

**响应**：`object`

## feature-rest-controller

共 12 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/features` |  |
| `POST` | `/api/v1/features/create` |  |
| `POST` | `/api/v1/features/delete` |  |
| `GET` | `/api/v1/features/export` |  |
| `GET` | `/api/v1/features/module/{moduleName}` |  |
| `GET` | `/api/v1/features/query` |  |
| `GET` | `/api/v1/features/query/org` |  |
| `GET` | `/api/v1/features/query/uid` |  |
| `GET` | `/api/v1/features/stats` |  |
| `POST` | `/api/v1/features/update` |  |
| `PUT` | `/api/v1/features/{code}/config` |  |
| `PUT` | `/api/v1/features/{code}/status` |  |

### GET `/api/v1/features`

**响应**：`FeatureEntity`

### POST `/api/v1/features/create`

**请求体**（application/json）：

- 结构：`FeatureRequest`

**响应**：`object`

### POST `/api/v1/features/delete`

**请求体**（application/json）：

- 结构：`FeatureRequest`

**响应**：`object`

### GET `/api/v1/features/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FeatureRequest |  |

**响应**：`object`

### GET `/api/v1/features/module/{moduleName}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `moduleName` | True | string |  |

**响应**：`FeatureEntity`

### GET `/api/v1/features/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FeatureRequest |  |

**响应**：`object`

### GET `/api/v1/features/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FeatureRequest |  |

**响应**：`object`

### GET `/api/v1/features/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FeatureRequest |  |

**响应**：`object`

### GET `/api/v1/features/stats`

**响应**：`object`

### POST `/api/v1/features/update`

**请求体**（application/json）：

- 结构：`FeatureRequest`

**响应**：`object`

### PUT `/api/v1/features/{code}/config`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `code` | True | string |  |

**请求体**（application/json）：


**响应**：`—`

### PUT `/api/v1/features/{code}/status`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `code` | True | string |  |
| query | `enabled` | True | boolean |  |

**响应**：`—`

## 表单管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/form/create` | 创建表单 |
| `POST` | `/api/v1/form/delete` | 删除表单 |
| `GET` | `/api/v1/form/export` | 导出表单 |
| `GET` | `/api/v1/form/query` | 查询用户下的表单 |
| `GET` | `/api/v1/form/query/org` | 查询组织下的表单 |
| `GET` | `/api/v1/form/query/uid` | 查询指定表单 |
| `POST` | `/api/v1/form/update` | 更新表单 |

### POST `/api/v1/form/create`

创建表单

**请求体**（application/json）：

- 结构：`FormRequest`

**响应**：`FormResponse`

### POST `/api/v1/form/delete`

删除表单

**请求体**（application/json）：

- 结构：`FormRequest`

**响应**：`object`

### GET `/api/v1/form/export`

导出表单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormRequest |  |

**响应**：`object`

### GET `/api/v1/form/query`

查询用户下的表单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormRequest |  |

**响应**：`FormResponse`

### GET `/api/v1/form/query/org`

查询组织下的表单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormRequest |  |

**响应**：`FormResponse`

### GET `/api/v1/form/query/uid`

查询指定表单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormRequest |  |

**响应**：`FormResponse`

### POST `/api/v1/form/update`

更新表单

**请求体**（application/json）：

- 结构：`FormRequest`

**响应**：`FormResponse`

## 表单结果管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/form/result/create` | Create Form Result |
| `POST` | `/api/v1/form/result/delete` | Delete Form Result |
| `GET` | `/api/v1/form/result/export` | Export Form Results |
| `GET` | `/api/v1/form/result/query` | Query Form Results by User |
| `GET` | `/api/v1/form/result/query/org` | Query Form Results by Organization |
| `GET` | `/api/v1/form/result/query/uid` | Query Form Result by UID |
| `POST` | `/api/v1/form/result/update` | Update Form Result |

### POST `/api/v1/form/result/create`

Create Form Result

**请求体**（application/json）：

- 结构：`FormResultRequest`

**响应**：`object`

### POST `/api/v1/form/result/delete`

Delete Form Result

**请求体**（application/json）：

- 结构：`FormResultRequest`

**响应**：`object`

### GET `/api/v1/form/result/export`

Export Form Results

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormResultRequest |  |

**响应**：`object`

### GET `/api/v1/form/result/query`

Query Form Results by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormResultRequest |  |

**响应**：`object`

### GET `/api/v1/form/result/query/org`

Query Form Results by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormResultRequest |  |

**响应**：`object`

### GET `/api/v1/form/result/query/uid`

Query Form Result by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FormResultRequest |  |

**响应**：`object`

### POST `/api/v1/form/result/update`

Update Form Result

**请求体**（application/json）：

- 结构：`FormResultRequest`

**响应**：`object`

## free-switch-cdr-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/freeswitch/cdr/create` |  |
| `POST` | `/api/v1/freeswitch/cdr/delete` |  |
| `GET` | `/api/v1/freeswitch/cdr/export` |  |
| `GET` | `/api/v1/freeswitch/cdr/query` |  |
| `GET` | `/api/v1/freeswitch/cdr/query/org` |  |
| `GET` | `/api/v1/freeswitch/cdr/query/uid` |  |
| `POST` | `/api/v1/freeswitch/cdr/update` |  |

### POST `/api/v1/freeswitch/cdr/create`

**请求体**（application/json）：

- 结构：`FreeSwitchCdrRequest`

**响应**：`object`

### POST `/api/v1/freeswitch/cdr/delete`

**请求体**（application/json）：

- 结构：`FreeSwitchCdrRequest`

**响应**：`object`

### GET `/api/v1/freeswitch/cdr/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchCdrRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/cdr/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchCdrRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/cdr/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchCdrRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/cdr/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchCdrRequest |  |

**响应**：`object`

### POST `/api/v1/freeswitch/cdr/update`

**请求体**（application/json）：

- 结构：`FreeSwitchCdrRequest`

**响应**：`object`

## free-switch-conference-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/freeswitch/conference/create` |  |
| `POST` | `/api/v1/freeswitch/conference/delete` |  |
| `GET` | `/api/v1/freeswitch/conference/export` |  |
| `GET` | `/api/v1/freeswitch/conference/query` |  |
| `GET` | `/api/v1/freeswitch/conference/query/org` |  |
| `GET` | `/api/v1/freeswitch/conference/query/uid` |  |
| `POST` | `/api/v1/freeswitch/conference/update` |  |

### POST `/api/v1/freeswitch/conference/create`

**请求体**（application/json）：

- 结构：`FreeSwitchConferenceRequest`

**响应**：`object`

### POST `/api/v1/freeswitch/conference/delete`

**请求体**（application/json）：

- 结构：`FreeSwitchConferenceRequest`

**响应**：`object`

### GET `/api/v1/freeswitch/conference/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchConferenceRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/conference/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchConferenceRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/conference/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchConferenceRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/conference/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchConferenceRequest |  |

**响应**：`object`

### POST `/api/v1/freeswitch/conference/update`

**请求体**（application/json）：

- 结构：`FreeSwitchConferenceRequest`

**响应**：`object`

## free-switch-gateway-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/freeswitch/gateway/create` |  |
| `POST` | `/api/v1/freeswitch/gateway/delete` |  |
| `GET` | `/api/v1/freeswitch/gateway/export` |  |
| `GET` | `/api/v1/freeswitch/gateway/query` |  |
| `GET` | `/api/v1/freeswitch/gateway/query/org` |  |
| `GET` | `/api/v1/freeswitch/gateway/query/uid` |  |
| `GET` | `/api/v1/freeswitch/gateway/query/user` |  |
| `POST` | `/api/v1/freeswitch/gateway/update` |  |

### POST `/api/v1/freeswitch/gateway/create`

**请求体**（application/json）：

- 结构：`FreeSwitchGatewayRequest`

**响应**：`object`

### POST `/api/v1/freeswitch/gateway/delete`

**请求体**（application/json）：

- 结构：`FreeSwitchGatewayRequest`

**响应**：`object`

### GET `/api/v1/freeswitch/gateway/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchGatewayRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/gateway/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchGatewayRequest |  |

**响应**：`JsonResultFreeSwitchGatewayResponse`

### GET `/api/v1/freeswitch/gateway/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchGatewayRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/gateway/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchGatewayRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/gateway/query/user`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchGatewayRequest |  |

**响应**：`object`

### POST `/api/v1/freeswitch/gateway/update`

**请求体**（application/json）：

- 结构：`FreeSwitchGatewayRequest`

**响应**：`object`

## free-switch-number-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/freeswitch/number/create` |  |
| `POST` | `/api/v1/freeswitch/number/delete` |  |
| `GET` | `/api/v1/freeswitch/number/export` |  |
| `GET` | `/api/v1/freeswitch/number/query` |  |
| `GET` | `/api/v1/freeswitch/number/query/org` |  |
| `GET` | `/api/v1/freeswitch/number/query/uid` |  |
| `POST` | `/api/v1/freeswitch/number/update` |  |

### POST `/api/v1/freeswitch/number/create`

**请求体**（application/json）：

- 结构：`FreeSwitchNumberRequest`

**响应**：`object`

### POST `/api/v1/freeswitch/number/delete`

**请求体**（application/json）：

- 结构：`FreeSwitchNumberRequest`

**响应**：`object`

### GET `/api/v1/freeswitch/number/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchNumberRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/number/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchNumberRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/number/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchNumberRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/number/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchNumberRequest |  |

**响应**：`object`

### POST `/api/v1/freeswitch/number/update`

**请求体**（application/json）：

- 结构：`FreeSwitchNumberRequest`

**响应**：`object`

## FreeSwitchStatistic Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/freeswitch/statistic/create` | Create FreeSwitchStatistic |
| `POST` | `/api/v1/freeswitch/statistic/delete` | Delete FreeSwitchStatistic |
| `GET` | `/api/v1/freeswitch/statistic/export` | Export FreeSwitchStatistics |
| `GET` | `/api/v1/freeswitch/statistic/query` | Query FreeSwitchStatistics by User |
| `GET` | `/api/v1/freeswitch/statistic/query/org` | Query FreeSwitchStatistics by Organization |
| `GET` | `/api/v1/freeswitch/statistic/query/uid` | Query FreeSwitchStatistic by UID |
| `POST` | `/api/v1/freeswitch/statistic/update` | Update FreeSwitchStatistic |

### POST `/api/v1/freeswitch/statistic/create`

Create FreeSwitchStatistic

**请求体**（application/json）：

- 结构：`FreeSwitchStatisticRequest`

**响应**：`object`

### POST `/api/v1/freeswitch/statistic/delete`

Delete FreeSwitchStatistic

**请求体**（application/json）：

- 结构：`FreeSwitchStatisticRequest`

**响应**：`object`

### GET `/api/v1/freeswitch/statistic/export`

Export FreeSwitchStatistics

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/statistic/query`

Query FreeSwitchStatistics by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/statistic/query/org`

Query FreeSwitchStatistics by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/statistic/query/uid`

Query FreeSwitchStatistic by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchStatisticRequest |  |

**响应**：`object`

### POST `/api/v1/freeswitch/statistic/update`

Update FreeSwitchStatistic

**请求体**（application/json）：

- 结构：`FreeSwitchStatisticRequest`

**响应**：`object`

## free-switch-web-rtc-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/freeswitch/webrtc/create` |  |
| `POST` | `/api/v1/freeswitch/webrtc/delete` |  |
| `GET` | `/api/v1/freeswitch/webrtc/export` |  |
| `GET` | `/api/v1/freeswitch/webrtc/query` |  |
| `GET` | `/api/v1/freeswitch/webrtc/query/org` |  |
| `GET` | `/api/v1/freeswitch/webrtc/query/uid` |  |
| `POST` | `/api/v1/freeswitch/webrtc/update` |  |

### POST `/api/v1/freeswitch/webrtc/create`

**请求体**（application/json）：

- 结构：`FreeSwitchWebRTCRequest`

**响应**：`object`

### POST `/api/v1/freeswitch/webrtc/delete`

**请求体**（application/json）：

- 结构：`FreeSwitchWebRTCRequest`

**响应**：`object`

### GET `/api/v1/freeswitch/webrtc/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchWebRTCRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/webrtc/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchWebRTCRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/webrtc/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchWebRTCRequest |  |

**响应**：`object`

### GET `/api/v1/freeswitch/webrtc/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FreeSwitchWebRTCRequest |  |

**响应**：`object`

### POST `/api/v1/freeswitch/webrtc/update`

**请求体**（application/json）：

- 结构：`FreeSwitchWebRTCRequest`

**响应**：`object`

## gray-release-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/gray-release/features/{feature}` |  |
| `POST` | `/api/v1/gray-release/features/{feature}/complete` |  |
| `POST` | `/api/v1/gray-release/features/{feature}/init` |  |
| `POST` | `/api/v1/gray-release/features/{feature}/pause` |  |
| `POST` | `/api/v1/gray-release/features/{feature}/resume` |  |
| `PUT` | `/api/v1/gray-release/features/{feature}/rollout` |  |
| `GET` | `/api/v1/gray-release/features/{feature}/stats` |  |
| `POST` | `/api/v1/gray-release/features/{feature}/whitelist/{userUid}` |  |

### GET `/api/v1/gray-release/features/{feature}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |

**响应**：`GrayReleaseStatus`

### POST `/api/v1/gray-release/features/{feature}/complete`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |

**响应**：`object`

### POST `/api/v1/gray-release/features/{feature}/init`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |

**响应**：`object`

### POST `/api/v1/gray-release/features/{feature}/pause`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |

**响应**：`object`

### POST `/api/v1/gray-release/features/{feature}/resume`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |

**响应**：`object`

### PUT `/api/v1/gray-release/features/{feature}/rollout`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |
| query | `percentage` | True | integer |  |

**响应**：`object`

### GET `/api/v1/gray-release/features/{feature}/stats`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |
| query | `hours` | False | integer |  |

**响应**：`GrayReleaseFeatureStatistics`

### POST `/api/v1/gray-release/features/{feature}/whitelist/{userUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feature` | True | string |  |
| path | `userUid` | True | string |  |

**响应**：`object`

## 群组管理

共 15 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/group/create` | 创建群组 |
| `POST` | `/api/v1/group/delete` | 删除群组 |
| `POST` | `/api/v1/group/dismiss` | 解散群组 |
| `GET` | `/api/v1/group/export` | 导出群组 |
| `POST` | `/api/v1/group/invite` | 邀请成员 |
| `POST` | `/api/v1/group/join` | 加入群组 |
| `POST` | `/api/v1/group/leave` | 退出群组 |
| `GET` | `/api/v1/group/query` | 查询用户下的群组 |
| `GET` | `/api/v1/group/query/members` | 查询群组成员 |
| `GET` | `/api/v1/group/query/org` | 查询组织下的群组 |
| `GET` | `/api/v1/group/query/uid` | 查询指定群组 |
| `POST` | `/api/v1/group/remove` | 移除成员 |
| `POST` | `/api/v1/group/update` | 更新群组 |
| `POST` | `/api/v1/group/update/name` | 更新群组名称 |
| `POST` | `/api/v1/group/update/topTip` | 更新群组置顶提示 |

### POST `/api/v1/group/create`

创建群组

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### POST `/api/v1/group/delete`

删除群组

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`object`

### POST `/api/v1/group/dismiss`

解散群组

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`object`

### GET `/api/v1/group/export`

导出群组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupRequest |  |

**响应**：`object`

### POST `/api/v1/group/invite`

邀请成员

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### POST `/api/v1/group/join`

加入群组

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### POST `/api/v1/group/leave`

退出群组

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### GET `/api/v1/group/query`

查询用户下的群组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupRequest |  |

**响应**：`GroupResponse`

### GET `/api/v1/group/query/members`

查询群组成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupRequest |  |

**响应**：`MemberProtobuf`

### GET `/api/v1/group/query/org`

查询组织下的群组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupRequest |  |

**响应**：`GroupResponse`

### GET `/api/v1/group/query/uid`

查询指定群组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupRequest |  |

**响应**：`GroupResponse`

### POST `/api/v1/group/remove`

移除成员

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### POST `/api/v1/group/update`

更新群组

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### POST `/api/v1/group/update/name`

更新群组名称

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

### POST `/api/v1/group/update/topTip`

更新群组置顶提示

**请求体**（application/json）：

- 结构：`GroupRequest`

**响应**：`GroupResponse`

## Group Invitation Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/group/invite/create` | Create Group Invitation |
| `POST` | `/api/v1/group/invite/delete` | Delete Group Invitation |
| `GET` | `/api/v1/group/invite/export` |  |
| `GET` | `/api/v1/group/invite/query` | Query Group Invitations by User |
| `GET` | `/api/v1/group/invite/query/org` | Query Group Invitations by Organization |
| `GET` | `/api/v1/group/invite/query/uid` |  |
| `POST` | `/api/v1/group/invite/update` | Update Group Invitation |

### POST `/api/v1/group/invite/create`

Create Group Invitation

**请求体**（application/json）：

- 结构：`GroupInviteRequest`

**响应**：`object`

### POST `/api/v1/group/invite/delete`

Delete Group Invitation

**请求体**（application/json）：

- 结构：`GroupInviteRequest`

**响应**：`object`

### GET `/api/v1/group/invite/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupInviteRequest |  |

**响应**：`object`

### GET `/api/v1/group/invite/query`

Query Group Invitations by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupInviteRequest |  |

**响应**：`object`

### GET `/api/v1/group/invite/query/org`

Query Group Invitations by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupInviteRequest |  |

**响应**：`object`

### GET `/api/v1/group/invite/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupInviteRequest |  |

**响应**：`object`

### POST `/api/v1/group/invite/update`

Update Group Invitation

**请求体**（application/json）：

- 结构：`GroupInviteRequest`

**响应**：`object`

## Group Notice Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/group/notice/create` | Create Group Notice |
| `POST` | `/api/v1/group/notice/delete` | Delete Group Notice |
| `GET` | `/api/v1/group/notice/export` |  |
| `GET` | `/api/v1/group/notice/query` | Query Group Notices by User |
| `GET` | `/api/v1/group/notice/query/org` | Query Group Notices by Organization |
| `GET` | `/api/v1/group/notice/query/uid` |  |
| `POST` | `/api/v1/group/notice/update` | Update Group Notice |

### POST `/api/v1/group/notice/create`

Create Group Notice

**请求体**（application/json）：

- 结构：`GroupNoticeRequest`

**响应**：`object`

### POST `/api/v1/group/notice/delete`

Delete Group Notice

**请求体**（application/json）：

- 结构：`GroupNoticeRequest`

**响应**：`object`

### GET `/api/v1/group/notice/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupNoticeRequest |  |

**响应**：`object`

### GET `/api/v1/group/notice/query`

Query Group Notices by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupNoticeRequest |  |

**响应**：`object`

### GET `/api/v1/group/notice/query/org`

Query Group Notices by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupNoticeRequest |  |

**响应**：`object`

### GET `/api/v1/group/notice/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:GroupNoticeRequest |  |

**响应**：`object`

### POST `/api/v1/group/notice/update`

Update Group Notice

**请求体**（application/json）：

- 结构：`GroupNoticeRequest`

**响应**：`object`

## 节假日管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/holiday/create` | 创建节假日 |
| `POST` | `/api/v1/holiday/delete` | 删除节假日 |
| `GET` | `/api/v1/holiday/export` | 导出节假日 |
| `GET` | `/api/v1/holiday/query` | 查询用户下的节假日 |
| `GET` | `/api/v1/holiday/query/org` | 查询组织下的节假日 |
| `GET` | `/api/v1/holiday/query/uid` | 查询指定节假日 |
| `POST` | `/api/v1/holiday/update` | 更新节假日 |

### POST `/api/v1/holiday/create`

创建节假日

**请求体**（application/json）：

- 结构：`HolidayRequest`

**响应**：`HolidayResponse`

### POST `/api/v1/holiday/delete`

删除节假日

**请求体**（application/json）：

- 结构：`HolidayRequest`

**响应**：`object`

### GET `/api/v1/holiday/export`

导出节假日

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:HolidayRequest |  |

**响应**：`object`

### GET `/api/v1/holiday/query`

查询用户下的节假日

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:HolidayRequest |  |

**响应**：`HolidayResponse`

### GET `/api/v1/holiday/query/org`

查询组织下的节假日

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:HolidayRequest |  |

**响应**：`HolidayResponse`

### GET `/api/v1/holiday/query/uid`

查询指定节假日

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:HolidayRequest |  |

**响应**：`HolidayResponse`

### POST `/api/v1/holiday/update`

更新节假日

**请求体**（application/json）：

- 结构：`HolidayRequest`

**响应**：`HolidayResponse`

## instagram-quick-replies-controller

共 5 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/instagram/quick-replies/mixed` |  |
| `POST` | `/api/v1/instagram/quick-replies/phone-number` |  |
| `POST` | `/api/v1/instagram/quick-replies/text` |  |
| `POST` | `/api/v1/instagram/quick-replies/validate` |  |
| `POST` | `/api/v1/instagram/quick-replies/webhook` |  |

### POST `/api/v1/instagram/quick-replies/mixed`

**请求体**（application/json）：

- 结构：`MixedQuickRepliesRequest`

**响应**：`InstagramMessageResponse`

### POST `/api/v1/instagram/quick-replies/phone-number`

**请求体**（application/json）：

- 结构：`PhoneNumberQuickReplyRequest`

**响应**：`InstagramMessageResponse`

### POST `/api/v1/instagram/quick-replies/text`

**请求体**（application/json）：

- 结构：`TextQuickRepliesRequest`

**响应**：`InstagramMessageResponse`

### POST `/api/v1/instagram/quick-replies/validate`

**请求体**（application/json）：

- 结构：`ValidationRequest`

**响应**：`ValidationResponse`

### POST `/api/v1/instagram/quick-replies/webhook`

**请求体**（application/json）：

- 结构：`QuickReplyEvent`

**响应**：`string`

## 意图设置管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/intention/settings/create` | 创建意图设置 |
| `POST` | `/api/v1/intention/settings/delete` | 删除意图设置 |
| `GET` | `/api/v1/intention/settings/export` | 导出意图设置 |
| `GET` | `/api/v1/intention/settings/query` | 根据用户查询意图设置 |
| `GET` | `/api/v1/intention/settings/query/org` | 根据组织查询意图设置 |
| `GET` | `/api/v1/intention/settings/query/uid` | 根据UID查询意图设置 |
| `POST` | `/api/v1/intention/settings/update` | 更新意图设置 |

### POST `/api/v1/intention/settings/create`

创建意图设置

**请求体**（application/json）：

- 结构：`IntentionSettingsRequest`

**响应**：`object`

### POST `/api/v1/intention/settings/delete`

删除意图设置

**请求体**（application/json）：

- 结构：`IntentionSettingsRequest`

**响应**：`object`

### GET `/api/v1/intention/settings/export`

导出意图设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IntentionSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/intention/settings/query`

根据用户查询意图设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IntentionSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/intention/settings/query/org`

根据组织查询意图设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IntentionSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/intention/settings/query/uid`

根据UID查询意图设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IntentionSettingsRequest |  |

**响应**：`object`

### POST `/api/v1/intention/settings/update`

更新意图设置

**请求体**（application/json）：

- 结构：`IntentionSettingsRequest`

**响应**：`object`

## invite-settings-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/invite/setting/create` |  |
| `POST` | `/api/v1/invite/setting/delete` |  |
| `GET` | `/api/v1/invite/setting/export` |  |
| `GET` | `/api/v1/invite/setting/query` |  |
| `GET` | `/api/v1/invite/setting/query/org` |  |
| `GET` | `/api/v1/invite/setting/query/uid` |  |
| `POST` | `/api/v1/invite/setting/update` |  |

### POST `/api/v1/invite/setting/create`

**请求体**（application/json）：

- 结构：`InviteSettingsRequest`

**响应**：`object`

### POST `/api/v1/invite/setting/delete`

**请求体**（application/json）：

- 结构：`InviteSettingsRequest`

**响应**：`object`

### GET `/api/v1/invite/setting/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InviteSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/invite/setting/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InviteSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/invite/setting/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InviteSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/invite/setting/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InviteSettingsRequest |  |

**响应**：`object`

### POST `/api/v1/invite/setting/update`

**请求体**（application/json）：

- 结构：`InviteSettingsRequest`

**响应**：`object`

## IP Access Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ip/access/create` | Create IP Access Record |
| `POST` | `/api/v1/ip/access/delete` | Delete IP Access Record |
| `GET` | `/api/v1/ip/access/export` |  |
| `GET` | `/api/v1/ip/access/query` | Query IP Access by User |
| `GET` | `/api/v1/ip/access/query/org` | Query IP Access by Organization |
| `GET` | `/api/v1/ip/access/query/uid` |  |
| `POST` | `/api/v1/ip/access/update` | Update IP Access Record |

### POST `/api/v1/ip/access/create`

Create IP Access Record

**请求体**（application/json）：

- 结构：`IpAccessRequest`

**响应**：`object`

### POST `/api/v1/ip/access/delete`

Delete IP Access Record

**请求体**（application/json）：

- 结构：`IpAccessRequest`

**响应**：`object`

### GET `/api/v1/ip/access/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpAccessRequest |  |

**响应**：`object`

### GET `/api/v1/ip/access/query`

Query IP Access by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpAccessRequest |  |

**响应**：`object`

### GET `/api/v1/ip/access/query/org`

Query IP Access by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpAccessRequest |  |

**响应**：`object`

### GET `/api/v1/ip/access/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpAccessRequest |  |

**响应**：`object`

### POST `/api/v1/ip/access/update`

Update IP Access Record

**请求体**（application/json）：

- 结构：`IpAccessRequest`

**响应**：`object`

## IP Blacklist Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ip/black/create` | Create IP Blacklist Entry |
| `POST` | `/api/v1/ip/black/delete` | Delete IP Blacklist Entry |
| `GET` | `/api/v1/ip/black/export` | Export IP Blacklist |
| `GET` | `/api/v1/ip/black/query` | Query IP Blacklist by User |
| `GET` | `/api/v1/ip/black/query/org` | Query IP Blacklist by Organization |
| `GET` | `/api/v1/ip/black/query/uid` |  |
| `POST` | `/api/v1/ip/black/update` | Update IP Blacklist Entry |

### POST `/api/v1/ip/black/create`

Create IP Blacklist Entry

**请求体**（application/json）：

- 结构：`IpBlacklistRequest`

**响应**：`object`

### POST `/api/v1/ip/black/delete`

Delete IP Blacklist Entry

**请求体**（application/json）：

- 结构：`IpBlacklistRequest`

**响应**：`object`

### GET `/api/v1/ip/black/export`

Export IP Blacklist

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpBlacklistRequest |  |

**响应**：`object`

### GET `/api/v1/ip/black/query`

Query IP Blacklist by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpBlacklistRequest |  |

**响应**：`object`

### GET `/api/v1/ip/black/query/org`

Query IP Blacklist by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpBlacklistRequest |  |

**响应**：`object`

### GET `/api/v1/ip/black/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpBlacklistRequest |  |

**响应**：`object`

### POST `/api/v1/ip/black/update`

Update IP Blacklist Entry

**请求体**（application/json）：

- 结构：`IpBlacklistRequest`

**响应**：`object`

## IP Whitelist Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ip/white/create` | Create IP Whitelist Entry |
| `POST` | `/api/v1/ip/white/delete` | Delete IP Whitelist Entry |
| `GET` | `/api/v1/ip/white/export` |  |
| `GET` | `/api/v1/ip/white/query` | Query IP Whitelist by User |
| `GET` | `/api/v1/ip/white/query/org` | Query IP Whitelist by Organization |
| `GET` | `/api/v1/ip/white/query/uid` |  |
| `POST` | `/api/v1/ip/white/update` | Update IP Whitelist Entry |

### POST `/api/v1/ip/white/create`

Create IP Whitelist Entry

**请求体**（application/json）：

- 结构：`IpWhitelistRequest`

**响应**：`object`

### POST `/api/v1/ip/white/delete`

Delete IP Whitelist Entry

**请求体**（application/json）：

- 结构：`IpWhitelistRequest`

**响应**：`object`

### GET `/api/v1/ip/white/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpWhitelistRequest |  |

**响应**：`object`

### GET `/api/v1/ip/white/query`

Query IP Whitelist by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpWhitelistRequest |  |

**响应**：`object`

### GET `/api/v1/ip/white/query/org`

Query IP Whitelist by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpWhitelistRequest |  |

**响应**：`object`

### GET `/api/v1/ip/white/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:IpWhitelistRequest |  |

**响应**：`object`

### POST `/api/v1/ip/white/update`

Update IP Whitelist Entry

**请求体**（application/json）：

- 结构：`IpWhitelistRequest`

**响应**：`object`

## kakao-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/kakao/create` |  |
| `POST` | `/api/v1/kakao/delete` |  |
| `GET` | `/api/v1/kakao/export` |  |
| `GET` | `/api/v1/kakao/query` |  |
| `GET` | `/api/v1/kakao/query/org` |  |
| `GET` | `/api/v1/kakao/query/uid` |  |
| `GET` | `/api/v1/kakao/refreshToken` |  |
| `POST` | `/api/v1/kakao/update` |  |

### POST `/api/v1/kakao/create`

**请求体**（application/json）：

- 结构：`KakaoRequest`

**响应**：`object`

### POST `/api/v1/kakao/delete`

**请求体**（application/json）：

- 结构：`KakaoRequest`

**响应**：`object`

### GET `/api/v1/kakao/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KakaoRequest |  |

**响应**：`object`

### GET `/api/v1/kakao/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KakaoRequest |  |

**响应**：`object`

### GET `/api/v1/kakao/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KakaoRequest |  |

**响应**：`object`

### GET `/api/v1/kakao/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KakaoRequest |  |

**响应**：`object`

### GET `/api/v1/kakao/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KakaoRequest |  |

**响应**：`object`

### POST `/api/v1/kakao/update`

**请求体**（application/json）：

- 结构：`KakaoRequest`

**响应**：`object`

## 知识库管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/kbase/create` | 创建知识库 |
| `POST` | `/api/v1/kbase/delete` | 删除知识库 |
| `GET` | `/api/v1/kbase/export` | 导出知识库 |
| `GET` | `/api/v1/kbase/query` | 查询用户下的知识库 |
| `GET` | `/api/v1/kbase/query/org` | 查询组织下的知识库 |
| `GET` | `/api/v1/kbase/query/uid` | 查询指定知识库 |
| `POST` | `/api/v1/kbase/update` | 更新知识库 |

### POST `/api/v1/kbase/create`

创建知识库

**请求体**（application/json）：

- 结构：`KbaseRequest`

**响应**：`KbaseResponse`

### POST `/api/v1/kbase/delete`

删除知识库

**请求体**（application/json）：

- 结构：`KbaseRequest`

**响应**：`object`

### GET `/api/v1/kbase/export`

导出知识库

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/query`

查询用户下的知识库

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseRequest |  |

**响应**：`KbaseResponse`

### GET `/api/v1/kbase/query/org`

查询组织下的知识库

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseRequest |  |

**响应**：`KbaseResponse`

### GET `/api/v1/kbase/query/uid`

查询指定知识库

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseRequest |  |

**响应**：`KbaseResponse`

### POST `/api/v1/kbase/update`

更新知识库

**请求体**（application/json）：

- 结构：`KbaseRequest`

**响应**：`KbaseResponse`

## kbase-invite-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/kbase/invite/create` |  |
| `POST` | `/api/v1/kbase/invite/delete` |  |
| `GET` | `/api/v1/kbase/invite/export` |  |
| `GET` | `/api/v1/kbase/invite/query` |  |
| `GET` | `/api/v1/kbase/invite/query/org` |  |
| `GET` | `/api/v1/kbase/invite/query/uid` |  |
| `POST` | `/api/v1/kbase/invite/update` |  |

### POST `/api/v1/kbase/invite/create`

**请求体**（application/json）：

- 结构：`KbaseInviteRequest`

**响应**：`object`

### POST `/api/v1/kbase/invite/delete`

**请求体**（application/json）：

- 结构：`KbaseInviteRequest`

**响应**：`object`

### GET `/api/v1/kbase/invite/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseInviteRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/invite/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseInviteRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/invite/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseInviteRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/invite/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseInviteRequest |  |

**响应**：`object`

### POST `/api/v1/kbase/invite/update`

**请求体**（application/json）：

- 结构：`KbaseInviteRequest`

**响应**：`object`

## KbaseStatistic Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/kbase/statistic/create` | Create KbaseStatistic |
| `POST` | `/api/v1/kbase/statistic/delete` | Delete KbaseStatistic |
| `GET` | `/api/v1/kbase/statistic/export` | Export KbaseStatistics |
| `GET` | `/api/v1/kbase/statistic/query` | Query KbaseStatistics by User |
| `GET` | `/api/v1/kbase/statistic/query/org` | Query KbaseStatistics by Organization |
| `GET` | `/api/v1/kbase/statistic/query/uid` | Query KbaseStatistic by UID |
| `POST` | `/api/v1/kbase/statistic/update` | Update KbaseStatistic |

### POST `/api/v1/kbase/statistic/create`

Create KbaseStatistic

**请求体**（application/json）：

- 结构：`KbaseStatisticRequest`

**响应**：`object`

### POST `/api/v1/kbase/statistic/delete`

Delete KbaseStatistic

**请求体**（application/json）：

- 结构：`KbaseStatisticRequest`

**响应**：`object`

### GET `/api/v1/kbase/statistic/export`

Export KbaseStatistics

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/statistic/query`

Query KbaseStatistics by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/statistic/query/org`

Query KbaseStatistics by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/kbase/statistic/query/uid`

Query KbaseStatistic by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:KbaseStatisticRequest |  |

**响应**：`object`

### POST `/api/v1/kbase/statistic/update`

Update KbaseStatistic

**请求体**（application/json）：

- 结构：`KbaseStatisticRequest`

**响应**：`object`

## license-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/license/create` |  |
| `POST` | `/api/v1/license/delete` |  |
| `GET` | `/api/v1/license/export` |  |
| `GET` | `/api/v1/license/query` |  |
| `GET` | `/api/v1/license/query/org` |  |
| `GET` | `/api/v1/license/query/uid` |  |
| `POST` | `/api/v1/license/update` |  |

### POST `/api/v1/license/create`

**请求体**（application/json）：

- 结构：`LicenseRequest`

**响应**：`object`

### POST `/api/v1/license/delete`

**请求体**（application/json）：

- 结构：`LicenseRequest`

**响应**：`object`

### GET `/api/v1/license/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LicenseRequest |  |

**响应**：`object`

### GET `/api/v1/license/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LicenseRequest |  |

**响应**：`object`

### GET `/api/v1/license/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LicenseRequest |  |

**响应**：`object`

### GET `/api/v1/license/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LicenseRequest |  |

**响应**：`object`

### POST `/api/v1/license/update`

**请求体**（application/json）：

- 结构：`LicenseRequest`

**响应**：`object`

## line-rest-controller

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/line/checkServiceReachable` |  |
| `POST` | `/api/v1/line/create` |  |
| `POST` | `/api/v1/line/delete` |  |
| `GET` | `/api/v1/line/export` |  |
| `GET` | `/api/v1/line/query` |  |
| `GET` | `/api/v1/line/query/org` |  |
| `GET` | `/api/v1/line/query/uid` |  |
| `POST` | `/api/v1/line/update` |  |
| `POST` | `/api/v1/line/update/accessToken` |  |
| `POST` | `/api/v1/line/update/kid` |  |

### GET `/api/v1/line/checkServiceReachable`

**响应**：`object`

### POST `/api/v1/line/create`

**请求体**（application/json）：

- 结构：`LineRequest`

**响应**：`object`

### POST `/api/v1/line/delete`

**请求体**（application/json）：

- 结构：`LineRequest`

**响应**：`object`

### GET `/api/v1/line/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LineRequest |  |

**响应**：`object`

### GET `/api/v1/line/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LineRequest |  |

**响应**：`object`

### GET `/api/v1/line/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LineRequest |  |

**响应**：`object`

### GET `/api/v1/line/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LineRequest |  |

**响应**：`object`

### POST `/api/v1/line/update`

**请求体**（application/json）：

- 结构：`LineRequest`

**响应**：`object`

### POST `/api/v1/line/update/accessToken`

**请求体**（application/json）：

- 结构：`LineRequest`

**响应**：`object`

### POST `/api/v1/line/update/kid`

**请求体**（application/json）：

- 结构：`LineRequest`

**响应**：`object`

## chunk-rest-controller

共 13 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/llm/chunk/create` |  |
| `POST` | `/api/v1/llm/chunk/delete` |  |
| `POST` | `/api/v1/llm/chunk/deleteAll` |  |
| `POST` | `/api/v1/llm/chunk/enable` |  |
| `GET` | `/api/v1/llm/chunk/export` |  |
| `GET` | `/api/v1/llm/chunk/query` |  |
| `GET` | `/api/v1/llm/chunk/query/org` |  |
| `GET` | `/api/v1/llm/chunk/query/uid` |  |
| `POST` | `/api/v1/llm/chunk/update` |  |
| `POST` | `/api/v1/llm/chunk/updateAllIndex` |  |
| `POST` | `/api/v1/llm/chunk/updateAllVectorIndex` |  |
| `POST` | `/api/v1/llm/chunk/updateIndex` |  |
| `POST` | `/api/v1/llm/chunk/updateVectorIndex` |  |

### POST `/api/v1/llm/chunk/create`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/delete`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/deleteAll`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/enable`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### GET `/api/v1/llm/chunk/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChunkRequest |  |

**响应**：`object`

### GET `/api/v1/llm/chunk/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChunkRequest |  |

**响应**：`object`

### GET `/api/v1/llm/chunk/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChunkRequest |  |

**响应**：`object`

### GET `/api/v1/llm/chunk/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ChunkRequest |  |

**响应**：`object`

### POST `/api/v1/llm/chunk/update`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/updateAllIndex`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/updateAllVectorIndex`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/updateIndex`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

### POST `/api/v1/llm/chunk/updateVectorIndex`

**请求体**（application/json）：

- 结构：`ChunkRequest`

**响应**：`object`

## 文件管理

共 13 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/llm/file/create` | 创建文件 |
| `POST` | `/api/v1/llm/file/delete` | 删除文件 |
| `POST` | `/api/v1/llm/file/deleteAll` | 删除所有文件 |
| `POST` | `/api/v1/llm/file/enable` | 启用文件 |
| `GET` | `/api/v1/llm/file/export` | 导出文件 |
| `GET` | `/api/v1/llm/file/query` | 查询用户下的文件 |
| `GET` | `/api/v1/llm/file/query/org` | 查询组织下的文件 |
| `GET` | `/api/v1/llm/file/query/uid` |  |
| `POST` | `/api/v1/llm/file/update` | 更新文件 |
| `POST` | `/api/v1/llm/file/updateAllIndex` | 更新所有文件索引 |
| `POST` | `/api/v1/llm/file/updateAllVectorIndex` | 更新所有文件向量索引 |
| `POST` | `/api/v1/llm/file/updateIndex` | 更新文件索引 |
| `POST` | `/api/v1/llm/file/updateVectorIndex` | 更新文件向量索引 |

### POST `/api/v1/llm/file/create`

创建文件

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`FileResponse`

### POST `/api/v1/llm/file/delete`

删除文件

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`object`

### POST `/api/v1/llm/file/deleteAll`

删除所有文件

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`object`

### POST `/api/v1/llm/file/enable`

启用文件

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`FileResponse`

### GET `/api/v1/llm/file/export`

导出文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FileRequest |  |

**响应**：`object`

### GET `/api/v1/llm/file/query`

查询用户下的文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FileRequest |  |

**响应**：`FileResponse`

### GET `/api/v1/llm/file/query/org`

查询组织下的文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FileRequest |  |

**响应**：`FileResponse`

### GET `/api/v1/llm/file/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:FileRequest |  |

**响应**：`object`

### POST `/api/v1/llm/file/update`

更新文件

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`FileResponse`

### POST `/api/v1/llm/file/updateAllIndex`

更新所有文件索引

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`object`

### POST `/api/v1/llm/file/updateAllVectorIndex`

更新所有文件向量索引

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`object`

### POST `/api/v1/llm/file/updateIndex`

更新文件索引

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`object`

### POST `/api/v1/llm/file/updateVectorIndex`

更新文件向量索引

**请求体**（application/json）：

- 结构：`FileRequest`

**响应**：`object`

## text-rest-controller

共 13 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/llm/text/create` |  |
| `POST` | `/api/v1/llm/text/delete` |  |
| `POST` | `/api/v1/llm/text/deleteAll` |  |
| `POST` | `/api/v1/llm/text/enable` |  |
| `GET` | `/api/v1/llm/text/export` |  |
| `GET` | `/api/v1/llm/text/query` |  |
| `GET` | `/api/v1/llm/text/query/org` |  |
| `GET` | `/api/v1/llm/text/query/uid` |  |
| `POST` | `/api/v1/llm/text/update` |  |
| `POST` | `/api/v1/llm/text/updateAllIndex` |  |
| `POST` | `/api/v1/llm/text/updateAllVectorIndex` |  |
| `POST` | `/api/v1/llm/text/updateIndex` |  |
| `POST` | `/api/v1/llm/text/updateVectorIndex` |  |

### POST `/api/v1/llm/text/create`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/delete`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/deleteAll`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/enable`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### GET `/api/v1/llm/text/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TextRequest |  |

**响应**：`object`

### GET `/api/v1/llm/text/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TextRequest |  |

**响应**：`object`

### GET `/api/v1/llm/text/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TextRequest |  |

**响应**：`object`

### GET `/api/v1/llm/text/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TextRequest |  |

**响应**：`object`

### POST `/api/v1/llm/text/update`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/updateAllIndex`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/updateAllVectorIndex`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/updateIndex`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

### POST `/api/v1/llm/text/updateVectorIndex`

**请求体**（application/json）：

- 结构：`TextRequest`

**响应**：`object`

## webpage-rest-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/llm/webpage/create` |  |
| `POST` | `/api/v1/llm/webpage/delete` |  |
| `POST` | `/api/v1/llm/webpage/deleteAll` |  |
| `POST` | `/api/v1/llm/webpage/enable` |  |
| `GET` | `/api/v1/llm/webpage/export` |  |
| `GET` | `/api/v1/llm/webpage/query` |  |
| `GET` | `/api/v1/llm/webpage/query/org` |  |
| `GET` | `/api/v1/llm/webpage/query/uid` |  |
| `POST` | `/api/v1/llm/webpage/update` |  |

### POST `/api/v1/llm/webpage/create`

**请求体**（application/json）：

- 结构：`WebpageRequest`

**响应**：`object`

### POST `/api/v1/llm/webpage/delete`

**请求体**（application/json）：

- 结构：`WebpageRequest`

**响应**：`object`

### POST `/api/v1/llm/webpage/deleteAll`

**请求体**（application/json）：

- 结构：`WebpageRequest`

**响应**：`object`

### POST `/api/v1/llm/webpage/enable`

**请求体**（application/json）：

- 结构：`WebpageRequest`

**响应**：`object`

### GET `/api/v1/llm/webpage/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebpageRequest |  |

**响应**：`object`

### GET `/api/v1/llm/webpage/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebpageRequest |  |

**响应**：`object`

### GET `/api/v1/llm/webpage/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebpageRequest |  |

**响应**：`object`

### GET `/api/v1/llm/webpage/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebpageRequest |  |

**响应**：`object`

### POST `/api/v1/llm/webpage/update`

**请求体**（application/json）：

- 结构：`WebpageRequest`

**响应**：`object`

## 网站管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/llm/website/create` | 创建网站 |
| `POST` | `/api/v1/llm/website/delete` | 删除网站 |
| `POST` | `/api/v1/llm/website/deleteAll` | 删除所有网站 |
| `POST` | `/api/v1/llm/website/enable` | 启用/禁用网站 |
| `GET` | `/api/v1/llm/website/export` | 导出网站 |
| `GET` | `/api/v1/llm/website/query` | 根据用户查询网站 |
| `GET` | `/api/v1/llm/website/query/org` | 根据组织查询网站 |
| `GET` | `/api/v1/llm/website/query/uid` | 根据UID查询网站 |
| `POST` | `/api/v1/llm/website/update` | 更新网站 |

### POST `/api/v1/llm/website/create`

创建网站

**请求体**（application/json）：

- 结构：`WebsiteRequest`

**响应**：`object`

### POST `/api/v1/llm/website/delete`

删除网站

**请求体**（application/json）：

- 结构：`WebsiteRequest`

**响应**：`object`

### POST `/api/v1/llm/website/deleteAll`

删除所有网站

**请求体**（application/json）：

- 结构：`WebsiteRequest`

**响应**：`object`

### POST `/api/v1/llm/website/enable`

启用/禁用网站

**请求体**（application/json）：

- 结构：`WebsiteRequest`

**响应**：`object`

### GET `/api/v1/llm/website/export`

导出网站

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebsiteRequest |  |

**响应**：`object`

### GET `/api/v1/llm/website/query`

根据用户查询网站

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebsiteRequest |  |

**响应**：`object`

### GET `/api/v1/llm/website/query/org`

根据组织查询网站

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebsiteRequest |  |

**响应**：`object`

### GET `/api/v1/llm/website/query/uid`

根据UID查询网站

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebsiteRequest |  |

**响应**：`object`

### POST `/api/v1/llm/website/update`

更新网站

**请求体**（application/json）：

- 结构：`WebsiteRequest`

**响应**：`object`

## 素材管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/material/create` | 创建素材 |
| `POST` | `/api/v1/material/delete` | 删除素材 |
| `GET` | `/api/v1/material/export` | 导出素材 |
| `GET` | `/api/v1/material/query` | 根据用户查询素材 |
| `GET` | `/api/v1/material/query/org` | 根据组织查询素材 |
| `GET` | `/api/v1/material/query/uid` | 根据UID查询素材 |
| `POST` | `/api/v1/material/update` | 更新素材 |

### POST `/api/v1/material/create`

创建素材

**请求体**（application/json）：

- 结构：`MaterialRequest`

**响应**：`object`

### POST `/api/v1/material/delete`

删除素材

**请求体**（application/json）：

- 结构：`MaterialRequest`

**响应**：`object`

### GET `/api/v1/material/export`

导出素材

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MaterialRequest |  |

**响应**：`object`

### GET `/api/v1/material/query`

根据用户查询素材

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MaterialRequest |  |

**响应**：`object`

### GET `/api/v1/material/query/org`

根据组织查询素材

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MaterialRequest |  |

**响应**：`object`

### GET `/api/v1/material/query/uid`

根据UID查询素材

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MaterialRequest |  |

**响应**：`object`

### POST `/api/v1/material/update`

更新素材

**请求体**（application/json）：

- 结构：`MaterialRequest`

**响应**：`object`

## 成员管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/member/activate` | 激活成员 |
| `POST` | `/api/v1/member/create` | 创建成员 |
| `POST` | `/api/v1/member/delete` | 删除成员 |
| `GET` | `/api/v1/member/export` | 导出成员 |
| `GET` | `/api/v1/member/query` | 查询用户下的成员 |
| `GET` | `/api/v1/member/query/org` | 查询组织下的成员 |
| `GET` | `/api/v1/member/query/uid` | 查询指定成员 |
| `GET` | `/api/v1/member/query/userUid` | 根据用户UID查询成员 |
| `POST` | `/api/v1/member/update` | 更新成员 |

### POST `/api/v1/member/activate`

激活成员

**请求体**（application/json）：

- 结构：`MemberRequest`

**响应**：`MemberResponse`

### POST `/api/v1/member/create`

创建成员

**请求体**（application/json）：

- 结构：`MemberRequest`

**响应**：`MemberResponse`

### POST `/api/v1/member/delete`

删除成员

**请求体**（application/json）：

- 结构：`MemberRequest`

**响应**：`object`

### GET `/api/v1/member/export`

导出成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MemberRequest |  |

**响应**：`object`

### GET `/api/v1/member/query`

查询用户下的成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MemberRequest |  |

**响应**：`MemberResponse`

### GET `/api/v1/member/query/org`

查询组织下的成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MemberRequest |  |

**响应**：`MemberResponse`

### GET `/api/v1/member/query/uid`

查询指定成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MemberRequest |  |

**响应**：`MemberResponse`

### GET `/api/v1/member/query/userUid`

根据用户UID查询成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MemberRequest |  |

**响应**：`MemberResponse`

### POST `/api/v1/member/update`

更新成员

**请求体**（application/json）：

- 结构：`MemberRequest`

**响应**：`MemberResponse`

## Menu Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/menu/create` | Create Menu |
| `POST` | `/api/v1/menu/delete` | Delete Menu |
| `GET` | `/api/v1/menu/export` |  |
| `GET` | `/api/v1/menu/query` | Query Menus by User |
| `GET` | `/api/v1/menu/query/org` | Query Menus by Organization |
| `GET` | `/api/v1/menu/query/uid` |  |
| `POST` | `/api/v1/menu/update` | Update Menu |

### POST `/api/v1/menu/create`

Create Menu

**请求体**（application/json）：

- 结构：`MenuRequest`

**响应**：`object`

### POST `/api/v1/menu/delete`

Delete Menu

**请求体**（application/json）：

- 结构：`MenuRequest`

**响应**：`object`

### GET `/api/v1/menu/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MenuRequest |  |

**响应**：`object`

### GET `/api/v1/menu/query`

Query Menus by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MenuRequest |  |

**响应**：`object`

### GET `/api/v1/menu/query/org`

Query Menus by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MenuRequest |  |

**响应**：`object`

### GET `/api/v1/menu/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MenuRequest |  |

**响应**：`object`

### POST `/api/v1/menu/update`

Update Menu

**请求体**（application/json）：

- 结构：`MenuRequest`

**响应**：`object`

## 消息纠错管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/correction/create` | 创建消息纠错 |
| `POST` | `/api/v1/message/correction/delete` | 删除消息纠错 |
| `GET` | `/api/v1/message/correction/export` | 导出消息纠错 |
| `GET` | `/api/v1/message/correction/query` | 查询用户下的消息纠错 |
| `GET` | `/api/v1/message/correction/query/org` | 查询组织下的消息纠错 |
| `GET` | `/api/v1/message/correction/query/uid` | 查询指定消息纠错 |
| `POST` | `/api/v1/message/correction/update` | 更新消息纠错 |

### POST `/api/v1/message/correction/create`

创建消息纠错

**请求体**（application/json）：

- 结构：`MessageCorrectionRequest`

**响应**：`MessageCorrectionResponse`

### POST `/api/v1/message/correction/delete`

删除消息纠错

**请求体**（application/json）：

- 结构：`MessageCorrectionRequest`

**响应**：`object`

### GET `/api/v1/message/correction/export`

导出消息纠错

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageCorrectionRequest |  |

**响应**：`object`

### GET `/api/v1/message/correction/query`

查询用户下的消息纠错

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageCorrectionRequest |  |

**响应**：`MessageCorrectionResponse`

### GET `/api/v1/message/correction/query/org`

查询组织下的消息纠错

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageCorrectionRequest |  |

**响应**：`MessageCorrectionResponse`

### GET `/api/v1/message/correction/query/uid`

查询指定消息纠错

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageCorrectionRequest |  |

**响应**：`MessageCorrectionResponse`

### POST `/api/v1/message/correction/update`

更新消息纠错

**请求体**（application/json）：

- 结构：`MessageCorrectionRequest`

**响应**：`MessageCorrectionResponse`

## 消息管理

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/create` | 创建消息 |
| `POST` | `/api/v1/message/delete` | 删除消息 |
| `GET` | `/api/v1/message/export` | 导出消息数据 |
| `GET` | `/api/v1/message/query` | 根据用户查询消息 |
| `GET` | `/api/v1/message/query/org` | 根据组织查询消息 |
| `GET` | `/api/v1/message/query/uid` | 根据UID查询消息 |
| `POST` | `/api/v1/message/rest/send` | 发送离线消息 |
| `GET` | `/api/v1/message/thread/topic` | 根据主题查询消息 |
| `GET` | `/api/v1/message/thread/uid` | 根据会话UID查询消息 |
| `POST` | `/api/v1/message/update` | 更新消息 |

### POST `/api/v1/message/create`

创建消息

**请求体**（application/json）：

- 结构：`MessageRequest`

**响应**：`object`

### POST `/api/v1/message/delete`

删除消息

**请求体**（application/json）：

- 结构：`MessageRequest`

**响应**：`object`

### GET `/api/v1/message/export`

导出消息数据

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/message/query`

根据用户查询消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/message/query/org`

根据组织查询消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/message/query/uid`

根据UID查询消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### POST `/api/v1/message/rest/send`

发送离线消息

**请求体**（application/json）：


**响应**：`object`

### GET `/api/v1/message/thread/topic`

根据主题查询消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/message/thread/uid`

根据会话UID查询消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### POST `/api/v1/message/update`

更新消息

**请求体**（application/json）：

- 结构：`MessageRequest`

**响应**：`object`

## 消息反馈管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/feedback/create` | 创建消息反馈 |
| `POST` | `/api/v1/message/feedback/delete` | 删除消息反馈 |
| `GET` | `/api/v1/message/feedback/export` | 导出消息反馈 |
| `GET` | `/api/v1/message/feedback/query` | 查询用户下的消息反馈 |
| `GET` | `/api/v1/message/feedback/query/org` | 查询组织下的消息反馈 |
| `GET` | `/api/v1/message/feedback/query/uid` | 查询指定消息反馈 |
| `POST` | `/api/v1/message/feedback/update` | 更新消息反馈 |

### POST `/api/v1/message/feedback/create`

创建消息反馈

**请求体**（application/json）：

- 结构：`MessageFeedbackRequest`

**响应**：`MessageFeedbackResponse`

### POST `/api/v1/message/feedback/delete`

删除消息反馈

**请求体**（application/json）：

- 结构：`MessageFeedbackRequest`

**响应**：`object`

### GET `/api/v1/message/feedback/export`

导出消息反馈

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageFeedbackRequest |  |

**响应**：`object`

### GET `/api/v1/message/feedback/query`

查询用户下的消息反馈

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageFeedbackRequest |  |

**响应**：`MessageFeedbackResponse`

### GET `/api/v1/message/feedback/query/org`

查询组织下的消息反馈

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageFeedbackRequest |  |

**响应**：`MessageFeedbackResponse`

### GET `/api/v1/message/feedback/query/uid`

查询指定消息反馈

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageFeedbackRequest |  |

**响应**：`MessageFeedbackResponse`

### POST `/api/v1/message/feedback/update`

更新消息反馈

**请求体**（application/json）：

- 结构：`MessageFeedbackRequest`

**响应**：`MessageFeedbackResponse`

## 留言消息管理

共 14 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/leave/close` | 关闭留言消息 |
| `POST` | `/api/v1/message/leave/create` | 创建留言消息 |
| `POST` | `/api/v1/message/leave/delete` | 删除留言消息 |
| `GET` | `/api/v1/message/leave/export` | 导出留言消息 |
| `GET` | `/api/v1/message/leave/query` | 查询用户留言消息 |
| `GET` | `/api/v1/message/leave/query/org` | 查询留言消息 |
| `GET` | `/api/v1/message/leave/query/threads` | 查询留言消息关联的会话 |
| `GET` | `/api/v1/message/leave/query/uid` | 查询留言消息详情 |
| `POST` | `/api/v1/message/leave/read` | 标记留言消息为已读 |
| `POST` | `/api/v1/message/leave/reply` | 回复留言消息 |
| `POST` | `/api/v1/message/leave/spam` | 标记留言消息为垃圾 |
| `POST` | `/api/v1/message/leave/status/update` | 更新留言消息状态 |
| `POST` | `/api/v1/message/leave/transfer` | 转接留言消息 |
| `POST` | `/api/v1/message/leave/update` | 更新留言消息 |

### POST `/api/v1/message/leave/close`

关闭留言消息

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/create`

创建留言消息

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/delete`

删除留言消息

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### GET `/api/v1/message/leave/export`

导出留言消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageLeaveRequest |  |

**响应**：`object`

### GET `/api/v1/message/leave/query`

查询用户留言消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageLeaveRequest |  |

**响应**：`object`

### GET `/api/v1/message/leave/query/org`

查询留言消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageLeaveRequest |  |

**响应**：`object`

### GET `/api/v1/message/leave/query/threads`

查询留言消息关联的会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageLeaveRequest |  |

**响应**：`object`

### GET `/api/v1/message/leave/query/uid`

查询留言消息详情

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageLeaveRequest |  |

**响应**：`object`

### POST `/api/v1/message/leave/read`

标记留言消息为已读

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/reply`

回复留言消息

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/spam`

标记留言消息为垃圾

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/status/update`

更新留言消息状态

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/transfer`

转接留言消息

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

### POST `/api/v1/message/leave/update`

更新留言消息

**请求体**（application/json）：

- 结构：`MessageLeaveRequest`

**响应**：`object`

## 消息解析管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/parsed/create` | 创建消息解析 |
| `POST` | `/api/v1/message/parsed/delete` | 删除消息解析 |
| `GET` | `/api/v1/message/parsed/export` | 导出消息解析 |
| `GET` | `/api/v1/message/parsed/query` | 查询用户下的消息解析 |
| `GET` | `/api/v1/message/parsed/query/org` | 查询组织下的消息解析 |
| `GET` | `/api/v1/message/parsed/query/uid` | 查询指定消息解析 |
| `POST` | `/api/v1/message/parsed/update` | 更新消息解析 |

### POST `/api/v1/message/parsed/create`

创建消息解析

**请求体**（application/json）：

- 结构：`MessageParsedRequest`

**响应**：`MessageParsedResponse`

### POST `/api/v1/message/parsed/delete`

删除消息解析

**请求体**（application/json）：

- 结构：`MessageParsedRequest`

**响应**：`object`

### GET `/api/v1/message/parsed/export`

导出消息解析

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageParsedRequest |  |

**响应**：`object`

### GET `/api/v1/message/parsed/query`

查询用户下的消息解析

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageParsedRequest |  |

**响应**：`MessageParsedResponse`

### GET `/api/v1/message/parsed/query/org`

查询组织下的消息解析

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageParsedRequest |  |

**响应**：`MessageParsedResponse`

### GET `/api/v1/message/parsed/query/uid`

查询指定消息解析

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageParsedRequest |  |

**响应**：`MessageParsedResponse`

### POST `/api/v1/message/parsed/update`

更新消息解析

**请求体**（application/json）：

- 结构：`MessageParsedRequest`

**响应**：`MessageParsedResponse`

## 消息评价管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/rating/create` | 创建消息评价 |
| `POST` | `/api/v1/message/rating/delete` | 删除消息评价 |
| `GET` | `/api/v1/message/rating/export` |  |
| `GET` | `/api/v1/message/rating/query` | 查询用户下的消息评价 |
| `GET` | `/api/v1/message/rating/query/org` | 查询组织下的消息评价 |
| `GET` | `/api/v1/message/rating/query/uid` | 查询指定消息评价 |
| `POST` | `/api/v1/message/rating/update` | 更新消息评价 |

### POST `/api/v1/message/rating/create`

创建消息评价

**请求体**（application/json）：

- 结构：`MessageRatingRequest`

**响应**：`MessageRatingResponse`

### POST `/api/v1/message/rating/delete`

删除消息评价

**请求体**（application/json）：

- 结构：`MessageRatingRequest`

**响应**：`object`

### GET `/api/v1/message/rating/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`object`

### GET `/api/v1/message/rating/query`

查询用户下的消息评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`MessageRatingResponse`

### GET `/api/v1/message/rating/query/org`

查询组织下的消息评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`MessageRatingResponse`

### GET `/api/v1/message/rating/query/uid`

查询指定消息评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`MessageRatingResponse`

### POST `/api/v1/message/rating/update`

更新消息评价

**请求体**（application/json）：

- 结构：`MessageRatingRequest`

**响应**：`MessageRatingResponse`

## 消息评价

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/rating/create` | 创建消息评价 |
| `POST` | `/api/v1/message/rating/delete` | 删除消息评价 |
| `GET` | `/api/v1/message/rating/export` |  |
| `GET` | `/api/v1/message/rating/query` | 查询用户下的消息评价 |
| `GET` | `/api/v1/message/rating/query/org` | 查询组织下的消息评价 |
| `GET` | `/api/v1/message/rating/query/uid` | 查询指定消息评价 |
| `POST` | `/api/v1/message/rating/update` | 更新消息评价 |

### POST `/api/v1/message/rating/create`

创建消息评价

**请求体**（application/json）：

- 结构：`MessageRatingRequest`

**响应**：`MessageRatingResponse`

### POST `/api/v1/message/rating/delete`

删除消息评价

**请求体**（application/json）：

- 结构：`MessageRatingRequest`

**响应**：`object`

### GET `/api/v1/message/rating/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`object`

### GET `/api/v1/message/rating/query`

查询用户下的消息评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`MessageRatingResponse`

### GET `/api/v1/message/rating/query/org`

查询组织下的消息评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`MessageRatingResponse`

### GET `/api/v1/message/rating/query/uid`

查询指定消息评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRatingRequest |  |

**响应**：`MessageRatingResponse`

### POST `/api/v1/message/rating/update`

更新消息评价

**请求体**（application/json）：

- 结构：`MessageRatingRequest`

**响应**：`MessageRatingResponse`

## 未回复消息管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/unanswered/create` | 创建未回复消息 |
| `POST` | `/api/v1/message/unanswered/delete` | 删除未回复消息 |
| `GET` | `/api/v1/message/unanswered/export` | 导出未回复消息 |
| `GET` | `/api/v1/message/unanswered/query` | 查询用户下的未回复消息 |
| `GET` | `/api/v1/message/unanswered/query/org` | 查询组织下的未回复消息 |
| `GET` | `/api/v1/message/unanswered/query/uid` | 查询指定未回复消息 |
| `POST` | `/api/v1/message/unanswered/update` | 更新未回复消息 |

### POST `/api/v1/message/unanswered/create`

创建未回复消息

**请求体**（application/json）：

- 结构：`MessageUnansweredRequest`

**响应**：`MessageUnansweredResponse`

### POST `/api/v1/message/unanswered/delete`

删除未回复消息

**请求体**（application/json）：

- 结构：`MessageUnansweredRequest`

**响应**：`object`

### GET `/api/v1/message/unanswered/export`

导出未回复消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnansweredRequest |  |

**响应**：`object`

### GET `/api/v1/message/unanswered/query`

查询用户下的未回复消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnansweredRequest |  |

**响应**：`MessageUnansweredResponse`

### GET `/api/v1/message/unanswered/query/org`

查询组织下的未回复消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnansweredRequest |  |

**响应**：`MessageUnansweredResponse`

### GET `/api/v1/message/unanswered/query/uid`

查询指定未回复消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnansweredRequest |  |

**响应**：`MessageUnansweredResponse`

### POST `/api/v1/message/unanswered/update`

更新未回复消息

**请求体**（application/json）：

- 结构：`MessageUnansweredRequest`

**响应**：`MessageUnansweredResponse`

## 未读消息管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/message/unread/clear` | 清空当前用户所有未读消息 |
| `GET` | `/api/v1/message/unread/count` | 获取未读消息总数 |
| `POST` | `/api/v1/message/unread/create` | 创建未读消息 |
| `POST` | `/api/v1/message/unread/delete` | 删除未读消息 |
| `GET` | `/api/v1/message/unread/export` | 导出未读消息 |
| `GET` | `/api/v1/message/unread/query` | 根据用户查询未读消息 |
| `GET` | `/api/v1/message/unread/query/org` | 根据组织查询未读消息 |
| `GET` | `/api/v1/message/unread/query/uid` | 根据用户ID查询未读消息 |
| `POST` | `/api/v1/message/unread/update` | 更新未读消息 |

### POST `/api/v1/message/unread/clear`

清空当前用户所有未读消息

**请求体**（application/json）：

- 结构：`MessageUnreadRequest`

**响应**：`object`

### GET `/api/v1/message/unread/count`

获取未读消息总数

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnreadRequest |  |

**响应**：`object`

### POST `/api/v1/message/unread/create`

创建未读消息

**请求体**（application/json）：

- 结构：`MessageUnreadRequest`

**响应**：`object`

### POST `/api/v1/message/unread/delete`

删除未读消息

**请求体**（application/json）：

- 结构：`MessageUnreadRequest`

**响应**：`object`

### GET `/api/v1/message/unread/export`

导出未读消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnreadRequest |  |

**响应**：`object`

### GET `/api/v1/message/unread/query`

根据用户查询未读消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnreadRequest |  |

**响应**：`object`

### GET `/api/v1/message/unread/query/org`

根据组织查询未读消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnreadRequest |  |

**响应**：`object`

### GET `/api/v1/message/unread/query/uid`

根据用户ID查询未读消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageUnreadRequest |  |

**响应**：`object`

### POST `/api/v1/message/unread/update`

更新未读消息

**请求体**（application/json）：

- 结构：`MessageUnreadRequest`

**响应**：`object`

## meta-app-rest-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/meta/app/checkServiceReachable` |  |
| `POST` | `/api/v1/meta/app/create` |  |
| `POST` | `/api/v1/meta/app/delete` |  |
| `GET` | `/api/v1/meta/app/export` |  |
| `GET` | `/api/v1/meta/app/query` |  |
| `GET` | `/api/v1/meta/app/query/org` |  |
| `GET` | `/api/v1/meta/app/query/uid` |  |
| `GET` | `/api/v1/meta/app/refreshToken` |  |
| `POST` | `/api/v1/meta/app/update` |  |

### GET `/api/v1/meta/app/checkServiceReachable`

**响应**：`object`

### POST `/api/v1/meta/app/create`

**请求体**（application/json）：

- 结构：`MetaAppRequest`

**响应**：`object`

### POST `/api/v1/meta/app/delete`

**请求体**（application/json）：

- 结构：`MetaAppRequest`

**响应**：`object`

### GET `/api/v1/meta/app/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MetaAppRequest |  |

**响应**：`object`

### GET `/api/v1/meta/app/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MetaAppRequest |  |

**响应**：`object`

### GET `/api/v1/meta/app/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MetaAppRequest |  |

**响应**：`object`

### GET `/api/v1/meta/app/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MetaAppRequest |  |

**响应**：`object`

### GET `/api/v1/meta/app/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MetaAppRequest |  |

**响应**：`object`

### POST `/api/v1/meta/app/update`

**请求体**（application/json）：

- 结构：`MetaAppRequest`

**响应**：`object`

## MinIO Storage

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `DELETE` | `/api/v1/minio/delete` | Delete file from MinIO |
| `GET` | `/api/v1/minio/download-url` | Get file download URL |
| `GET` | `/api/v1/minio/exists` | Check if file exists in MinIO |
| `POST` | `/api/v1/minio/upload` | Upload file to MinIO |
| `GET` | `/api/v1/minio/upload-url` | Get file upload URL |
| `POST` | `/api/v1/minio/upload/audio` | Upload audio to MinIO |
| `POST` | `/api/v1/minio/upload/document` | Upload document to MinIO |
| `POST` | `/api/v1/minio/upload/image` | Upload image to MinIO |
| `POST` | `/api/v1/minio/upload/url` | Upload file from URL to MinIO |
| `POST` | `/api/v1/minio/upload/video` | Upload video to MinIO |

### DELETE `/api/v1/minio/delete`

Delete file from MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `objectPath` | True | string | Object path in MinIO |

**响应**：`object`

### GET `/api/v1/minio/download-url`

Get file download URL

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `objectPath` | True | string | Object path in MinIO |
| query | `expiry` | False | integer | URL expiry time in seconds |

**响应**：`object`

### GET `/api/v1/minio/exists`

Check if file exists in MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `objectPath` | True | string | Object path in MinIO |

**响应**：`object`

### POST `/api/v1/minio/upload`

Upload file to MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest | Upload request |

**请求体**（application/json）：


**响应**：`object`

### GET `/api/v1/minio/upload-url`

Get file upload URL

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `objectPath` | True | string | Object path in MinIO |
| query | `expiry` | False | integer | URL expiry time in seconds |

**响应**：`object`

### POST `/api/v1/minio/upload/audio`

Upload audio to MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest | Upload request |

**请求体**（application/json）：


**响应**：`object`

### POST `/api/v1/minio/upload/document`

Upload document to MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest | Upload request |

**请求体**（application/json）：


**响应**：`object`

### POST `/api/v1/minio/upload/image`

Upload image to MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest | Upload request |

**请求体**（application/json）：


**响应**：`object`

### POST `/api/v1/minio/upload/url`

Upload file from URL to MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `url` | True | string | File URL |
| query | `fileName` | True | string | File name |
| query | `request` | True | ref:UploadRequest | Upload request |

**响应**：`object`

### POST `/api/v1/minio/upload/video`

Upload video to MinIO

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest | Upload request |

**请求体**（application/json）：


**响应**：`object`

## LLM模型管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/model/create` | 创建LLM模型 |
| `POST` | `/api/v1/model/delete` | 删除LLM模型 |
| `GET` | `/api/v1/model/export` | 导出LLM模型 |
| `GET` | `/api/v1/model/query` | 查询用户下的LLM模型 |
| `GET` | `/api/v1/model/query/org` | 查询组织下的LLM模型 |
| `GET` | `/api/v1/model/query/uid` | 查询指定LLM模型 |
| `POST` | `/api/v1/model/update` | 更新LLM模型 |

### POST `/api/v1/model/create`

创建LLM模型

**请求体**（application/json）：

- 结构：`LlmModelRequest`

**响应**：`LlmModelResponse`

### POST `/api/v1/model/delete`

删除LLM模型

**请求体**（application/json）：

- 结构：`LlmModelRequest`

**响应**：`object`

### GET `/api/v1/model/export`

导出LLM模型

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmModelRequest |  |

**响应**：`object`

### GET `/api/v1/model/query`

查询用户下的LLM模型

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmModelRequest |  |

**响应**：`LlmModelResponse`

### GET `/api/v1/model/query/org`

查询组织下的LLM模型

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmModelRequest |  |

**响应**：`LlmModelResponse`

### GET `/api/v1/model/query/uid`

查询指定LLM模型

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmModelRequest |  |

**响应**：`LlmModelResponse`

### POST `/api/v1/model/update`

更新LLM模型

**请求体**（application/json）：

- 结构：`LlmModelRequest`

**响应**：`LlmModelResponse`

## module-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/module/create` |  |
| `POST` | `/api/v1/module/delete` |  |
| `GET` | `/api/v1/module/export` |  |
| `GET` | `/api/v1/module/query` |  |
| `GET` | `/api/v1/module/query/org` |  |
| `GET` | `/api/v1/module/query/uid` |  |
| `POST` | `/api/v1/module/update` |  |

### POST `/api/v1/module/create`

**请求体**（application/json）：

- 结构：`ModuleRequest`

**响应**：`object`

### POST `/api/v1/module/delete`

**请求体**（application/json）：

- 结构：`ModuleRequest`

**响应**：`object`

### GET `/api/v1/module/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ModuleRequest |  |

**响应**：`object`

### GET `/api/v1/module/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ModuleRequest |  |

**响应**：`object`

### GET `/api/v1/module/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ModuleRequest |  |

**响应**：`object`

### GET `/api/v1/module/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ModuleRequest |  |

**响应**：`object`

### POST `/api/v1/module/update`

**请求体**（application/json）：

- 结构：`ModuleRequest`

**响应**：`object`

## Moment Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/moment/create` | Create Moment |
| `POST` | `/api/v1/moment/delete` | Delete Moment |
| `GET` | `/api/v1/moment/export` | Export Moments |
| `GET` | `/api/v1/moment/query` | Query Moments by User |
| `GET` | `/api/v1/moment/query/org` | Query Moments by Organization |
| `GET` | `/api/v1/moment/query/uid` | Query Moment by UID |
| `POST` | `/api/v1/moment/update` | Update Moment |

### POST `/api/v1/moment/create`

Create Moment

**请求体**（application/json）：

- 结构：`MomentRequest`

**响应**：`object`

### POST `/api/v1/moment/delete`

Delete Moment

**请求体**（application/json）：

- 结构：`MomentRequest`

**响应**：`object`

### GET `/api/v1/moment/export`

Export Moments

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MomentRequest |  |

**响应**：`object`

### GET `/api/v1/moment/query`

Query Moments by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MomentRequest |  |

**响应**：`object`

### GET `/api/v1/moment/query/org`

Query Moments by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MomentRequest |  |

**响应**：`object`

### GET `/api/v1/moment/query/uid`

Query Moment by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MomentRequest |  |

**响应**：`object`

### POST `/api/v1/moment/update`

Update Moment

**请求体**（application/json）：

- 结构：`MomentRequest`

**响应**：`object`

## Notice Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/notice/create` | Create Notice |
| `POST` | `/api/v1/notice/delete` | Delete Notice |
| `GET` | `/api/v1/notice/export` |  |
| `GET` | `/api/v1/notice/query` | Query Notices by User |
| `GET` | `/api/v1/notice/query/org` | Query Notices by Organization |
| `GET` | `/api/v1/notice/query/uid` |  |
| `POST` | `/api/v1/notice/update` | Update Notice |

### POST `/api/v1/notice/create`

Create Notice

**请求体**（application/json）：

- 结构：`NoticeRequest`

**响应**：`object`

### POST `/api/v1/notice/delete`

Delete Notice

**请求体**（application/json）：

- 结构：`NoticeRequest`

**响应**：`object`

### GET `/api/v1/notice/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeRequest |  |

**响应**：`object`

### GET `/api/v1/notice/query`

Query Notices by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeRequest |  |

**响应**：`object`

### GET `/api/v1/notice/query/org`

Query Notices by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeRequest |  |

**响应**：`object`

### GET `/api/v1/notice/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:NoticeRequest |  |

**响应**：`object`

### POST `/api/v1/notice/update`

Update Notice

**请求体**（application/json）：

- 结构：`NoticeRequest`

**响应**：`object`

## o-auth-2-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/oauth2/create` |  |
| `POST` | `/api/v1/oauth2/delete` |  |
| `GET` | `/api/v1/oauth2/export` |  |
| `GET` | `/api/v1/oauth2/query` |  |
| `GET` | `/api/v1/oauth2/query/org` |  |
| `GET` | `/api/v1/oauth2/query/uid` |  |
| `POST` | `/api/v1/oauth2/update` |  |

### POST `/api/v1/oauth2/create`

**请求体**（application/json）：

- 结构：`OAuth2Request`

**响应**：`object`

### POST `/api/v1/oauth2/delete`

**请求体**（application/json）：

- 结构：`OAuth2Request`

**响应**：`object`

### GET `/api/v1/oauth2/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OAuth2Request |  |

**响应**：`object`

### GET `/api/v1/oauth2/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OAuth2Request |  |

**响应**：`object`

### GET `/api/v1/oauth2/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OAuth2Request |  |

**响应**：`object`

### GET `/api/v1/oauth2/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OAuth2Request |  |

**响应**：`object`

### POST `/api/v1/oauth2/update`

**请求体**（application/json）：

- 结构：`OAuth2Request`

**响应**：`object`

## ollama-4j-rest-controller

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/ollama4j/embedding-model/exists` |  |
| `GET` | `/api/v1/ollama4j/library/models/{model}/details` |  |
| `GET` | `/api/v1/ollama4j/local-models` |  |
| `GET` | `/api/v1/ollama4j/models` |  |
| `POST` | `/api/v1/ollama4j/models/delete` |  |
| `POST` | `/api/v1/ollama4j/models/pull` |  |
| `GET` | `/api/v1/ollama4j/models/{model}/details` |  |
| `GET` | `/api/v1/ollama4j/models/{model}/tags/{tag}` |  |
| `GET` | `/api/v1/ollama4j/ping` |  |
| `GET` | `/api/v1/ollama4j/ps` |  |

### GET `/api/v1/ollama4j/embedding-model/exists`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `model` | True | string |  |

**响应**：`object`

### GET `/api/v1/ollama4j/library/models/{model}/details`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `model` | True | string |  |

**响应**：`JsonResultLibraryModelDetail`

### GET `/api/v1/ollama4j/local-models`

**响应**：`JsonResultListModel`

### GET `/api/v1/ollama4j/models`

**响应**：`JsonResultListLibraryModel`

### POST `/api/v1/ollama4j/models/delete`

**请求体**（application/json）：

- 结构：`OllamaRequest`

**响应**：`object`

### POST `/api/v1/ollama4j/models/pull`

**请求体**（application/json）：

- 结构：`OllamaRequest`

**响应**：`object`

### GET `/api/v1/ollama4j/models/{model}/details`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `model` | True | string |  |

**响应**：`JsonResultModelDetail`

### GET `/api/v1/ollama4j/models/{model}/tags/{tag}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `model` | True | string |  |
| path | `tag` | True | string |  |

**响应**：`JsonResultLibraryModelTag`

### GET `/api/v1/ollama4j/ping`

**响应**：`JsonResultBoolean`

### GET `/api/v1/ollama4j/ps`

**响应**：`JsonResultModelsProcessResponse`

## order-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/order/create` |  |
| `POST` | `/api/v1/order/delete` |  |
| `GET` | `/api/v1/order/export` |  |
| `GET` | `/api/v1/order/query` |  |
| `GET` | `/api/v1/order/query/org` |  |
| `GET` | `/api/v1/order/query/uid` |  |
| `POST` | `/api/v1/order/update` |  |

### POST `/api/v1/order/create`

**请求体**（application/json）：

- 结构：`OrderRequest`

**响应**：`object`

### POST `/api/v1/order/delete`

**请求体**（application/json）：

- 结构：`OrderRequest`

**响应**：`object`

### GET `/api/v1/order/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrderRequest |  |

**响应**：`object`

### GET `/api/v1/order/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrderRequest |  |

**响应**：`object`

### GET `/api/v1/order/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrderRequest |  |

**响应**：`object`

### GET `/api/v1/order/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrderRequest |  |

**响应**：`object`

### POST `/api/v1/order/update`

**请求体**（application/json）：

- 结构：`OrderRequest`

**响应**：`object`

## organization-apply-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/org/apply/create` |  |
| `POST` | `/api/v1/org/apply/delete` |  |
| `GET` | `/api/v1/org/apply/export` |  |
| `GET` | `/api/v1/org/apply/query` |  |
| `GET` | `/api/v1/org/apply/query/org` |  |
| `GET` | `/api/v1/org/apply/query/uid` |  |
| `POST` | `/api/v1/org/apply/update` |  |

### POST `/api/v1/org/apply/create`

**请求体**（application/json）：

- 结构：`OrganizationApplyRequest`

**响应**：`object`

### POST `/api/v1/org/apply/delete`

**请求体**（application/json）：

- 结构：`OrganizationApplyRequest`

**响应**：`object`

### GET `/api/v1/org/apply/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationApplyRequest |  |

**响应**：`object`

### GET `/api/v1/org/apply/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationApplyRequest |  |

**响应**：`object`

### GET `/api/v1/org/apply/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationApplyRequest |  |

**响应**：`object`

### GET `/api/v1/org/apply/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationApplyRequest |  |

**响应**：`object`

### POST `/api/v1/org/apply/update`

**请求体**（application/json）：

- 结构：`OrganizationApplyRequest`

**响应**：`object`

## Organization

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/org/create` |  |
| `POST` | `/api/v1/org/create/by/super` |  |
| `POST` | `/api/v1/org/delete` |  |
| `GET` | `/api/v1/org/export` |  |
| `GET` | `/api/v1/org/query` |  |
| `GET` | `/api/v1/org/query/org` |  |
| `GET` | `/api/v1/org/query/uid` |  |
| `POST` | `/api/v1/org/update` |  |
| `POST` | `/api/v1/org/update/by/super` |  |

### POST `/api/v1/org/create`

**请求体**（application/json）：

- 结构：`OrganizationRequest`

**响应**：`object`

### POST `/api/v1/org/create/by/super`

**请求体**（application/json）：

- 结构：`OrganizationRequest`

**响应**：`object`

### POST `/api/v1/org/delete`

**请求体**（application/json）：

- 结构：`OrganizationRequest`

**响应**：`object`

### GET `/api/v1/org/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationRequest |  |

**响应**：`object`

### GET `/api/v1/org/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationRequest |  |

**响应**：`object`

### GET `/api/v1/org/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationRequest |  |

**响应**：`object`

### GET `/api/v1/org/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:OrganizationRequest |  |

**响应**：`object`

### POST `/api/v1/org/update`

**请求体**（application/json）：

- 结构：`OrganizationRequest`

**响应**：`object`

### POST `/api/v1/org/update/by/super`

**请求体**（application/json）：

- 结构：`OrganizationRequest`

**响应**：`object`

## post-controller

共 12 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/posts` |  |
| `POST` | `/api/v1/posts` |  |
| `GET` | `/api/v1/posts/category/{categoryId}` |  |
| `POST` | `/api/v1/posts/search` |  |
| `GET` | `/api/v1/posts/search/fulltext` |  |
| `GET` | `/api/v1/posts/search/fulltext/category/{categoryId}` |  |
| `GET` | `/api/v1/posts/user/{userId}` |  |
| `GET` | `/api/v1/posts/{postId}` |  |
| `PUT` | `/api/v1/posts/{postId}` |  |
| `DELETE` | `/api/v1/posts/{postId}` |  |
| `POST` | `/api/v1/posts/{postId}/like` |  |
| `POST` | `/api/v1/posts/{postId}/view` |  |

### GET `/api/v1/posts`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `pageable` | True | ref:Pageable |  |

**响应**：`PagePostEntity`

### POST `/api/v1/posts`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `title` | True | string |  |
| query | `content` | True | string |  |
| query | `categoryId` | True | integer |  |

**响应**：`PostEntity`

### GET `/api/v1/posts/category/{categoryId}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `categoryId` | True | integer |  |
| query | `pageable` | True | ref:Pageable |  |

**响应**：`PagePostEntity`

### POST `/api/v1/posts/search`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `pageable` | True | ref:Pageable |  |

**请求体**（application/json）：

- 结构：`PostSearchCriteria`

**响应**：`PagePostEntity`

### GET `/api/v1/posts/search/fulltext`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `keyword` | True | string |  |
| query | `pageable` | True | ref:Pageable |  |

**响应**：`PagePostEntity`

### GET `/api/v1/posts/search/fulltext/category/{categoryId}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `keyword` | True | string |  |
| path | `categoryId` | True | integer |  |
| query | `pageable` | True | ref:Pageable |  |

**响应**：`PagePostEntity`

### GET `/api/v1/posts/user/{userId}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `userId` | True | integer |  |
| query | `pageable` | True | ref:Pageable |  |

**响应**：`PagePostEntity`

### GET `/api/v1/posts/{postId}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `postId` | True | integer |  |

**响应**：`PostEntity`

### PUT `/api/v1/posts/{postId}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `postId` | True | integer |  |
| query | `title` | True | string |  |
| query | `content` | True | string |  |

**响应**：`PostEntity`

### DELETE `/api/v1/posts/{postId}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `postId` | True | integer |  |

**响应**：`—`

### POST `/api/v1/posts/{postId}/like`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `postId` | True | integer |  |

**响应**：`—`

### POST `/api/v1/posts/{postId}/view`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `postId` | True | integer |  |

**响应**：`—`

## product-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/product/create` |  |
| `POST` | `/api/v1/product/delete` |  |
| `GET` | `/api/v1/product/export` |  |
| `GET` | `/api/v1/product/query` |  |
| `GET` | `/api/v1/product/query/org` |  |
| `GET` | `/api/v1/product/query/uid` |  |
| `POST` | `/api/v1/product/update` |  |

### POST `/api/v1/product/create`

**请求体**（application/json）：

- 结构：`ProductRequest`

**响应**：`object`

### POST `/api/v1/product/delete`

**请求体**（application/json）：

- 结构：`ProductRequest`

**响应**：`object`

### GET `/api/v1/product/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProductRequest |  |

**响应**：`object`

### GET `/api/v1/product/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProductRequest |  |

**响应**：`object`

### GET `/api/v1/product/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProductRequest |  |

**响应**：`object`

### GET `/api/v1/product/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProductRequest |  |

**响应**：`object`

### POST `/api/v1/product/update`

**请求体**（application/json）：

- 结构：`ProductRequest`

**响应**：`object`

## project-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/project/create` |  |
| `POST` | `/api/v1/project/delete` |  |
| `GET` | `/api/v1/project/export` |  |
| `GET` | `/api/v1/project/query` |  |
| `GET` | `/api/v1/project/query/org` |  |
| `GET` | `/api/v1/project/query/uid` |  |
| `POST` | `/api/v1/project/update` |  |

### POST `/api/v1/project/create`

**请求体**（application/json）：

- 结构：`ProjectRequest`

**响应**：`object`

### POST `/api/v1/project/delete`

**请求体**（application/json）：

- 结构：`ProjectRequest`

**响应**：`object`

### GET `/api/v1/project/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectRequest |  |

**响应**：`object`

### GET `/api/v1/project/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectRequest |  |

**响应**：`object`

### GET `/api/v1/project/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectRequest |  |

**响应**：`object`

### GET `/api/v1/project/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectRequest |  |

**响应**：`object`

### POST `/api/v1/project/update`

**请求体**（application/json）：

- 结构：`ProjectRequest`

**响应**：`object`

## project-invite-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/project_invite/create` |  |
| `POST` | `/api/v1/project_invite/delete` |  |
| `GET` | `/api/v1/project_invite/export` |  |
| `GET` | `/api/v1/project_invite/query` |  |
| `GET` | `/api/v1/project_invite/query/org` |  |
| `GET` | `/api/v1/project_invite/query/uid` |  |
| `POST` | `/api/v1/project_invite/update` |  |

### POST `/api/v1/project_invite/create`

**请求体**（application/json）：

- 结构：`ProjectInviteRequest`

**响应**：`object`

### POST `/api/v1/project_invite/delete`

**请求体**（application/json）：

- 结构：`ProjectInviteRequest`

**响应**：`object`

### GET `/api/v1/project_invite/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectInviteRequest |  |

**响应**：`object`

### GET `/api/v1/project_invite/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectInviteRequest |  |

**响应**：`object`

### GET `/api/v1/project_invite/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectInviteRequest |  |

**响应**：`object`

### GET `/api/v1/project_invite/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ProjectInviteRequest |  |

**响应**：`object`

### POST `/api/v1/project_invite/update`

**请求体**（application/json）：

- 结构：`ProjectInviteRequest`

**响应**：`object`

## LLM提供商管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/provider/config/default` | 获取LLM提供商默认配置 |
| `POST` | `/api/v1/provider/create` | 创建LLM提供商 |
| `POST` | `/api/v1/provider/delete` | 删除LLM提供商 |
| `GET` | `/api/v1/provider/export` | 导出LLM提供商 |
| `GET` | `/api/v1/provider/query` | 查询用户下的LLM提供商 |
| `GET` | `/api/v1/provider/query/org` | 查询组织下的LLM提供商 |
| `GET` | `/api/v1/provider/query/uid` | 查询指定LLM提供商 |
| `POST` | `/api/v1/provider/update` | 更新LLM提供商 |

### GET `/api/v1/provider/config/default`

获取LLM提供商默认配置

**响应**：`LlmProviderConfigDefault`

### POST `/api/v1/provider/create`

创建LLM提供商

**请求体**（application/json）：

- 结构：`LlmProviderRequest`

**响应**：`LlmProviderResponse`

### POST `/api/v1/provider/delete`

删除LLM提供商

**请求体**（application/json）：

- 结构：`LlmProviderRequest`

**响应**：`object`

### GET `/api/v1/provider/export`

导出LLM提供商

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmProviderRequest |  |

**响应**：`object`

### GET `/api/v1/provider/query`

查询用户下的LLM提供商

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmProviderRequest |  |

**响应**：`LlmProviderResponse`

### GET `/api/v1/provider/query/org`

查询组织下的LLM提供商

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmProviderRequest |  |

**响应**：`LlmProviderResponse`

### GET `/api/v1/provider/query/uid`

查询指定LLM提供商

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:LlmProviderRequest |  |

**响应**：`LlmProviderResponse`

### POST `/api/v1/provider/update`

更新LLM提供商

**请求体**（application/json）：

- 结构：`LlmProviderRequest`

**响应**：`LlmProviderResponse`

## Push Notification Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/push/create` | Create Push Notification |
| `POST` | `/api/v1/push/delete` | Delete Push Notification |
| `GET` | `/api/v1/push/export` |  |
| `GET` | `/api/v1/push/query` | Query Push Notifications by User |
| `GET` | `/api/v1/push/query/org` | Query Push Notifications by Organization |
| `GET` | `/api/v1/push/query/uid` |  |
| `POST` | `/api/v1/push/update` | Update Push Notification |

### POST `/api/v1/push/create`

Create Push Notification

**请求体**（application/json）：

- 结构：`PushRequest`

**响应**：`object`

### POST `/api/v1/push/delete`

Delete Push Notification

**请求体**（application/json）：

- 结构：`PushRequest`

**响应**：`object`

### GET `/api/v1/push/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PushRequest |  |

**响应**：`object`

### GET `/api/v1/push/query`

Query Push Notifications by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PushRequest |  |

**响应**：`object`

### GET `/api/v1/push/query/org`

Query Push Notifications by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PushRequest |  |

**响应**：`object`

### GET `/api/v1/push/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PushRequest |  |

**响应**：`object`

### POST `/api/v1/push/update`

Update Push Notification

**请求体**（application/json）：

- 结构：`PushRequest`

**响应**：`object`

## QualityAppeal Management

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quality/appeal/approve` | Approve QualityAppeal |
| `POST` | `/api/v1/quality/appeal/create` | Create QualityAppeal |
| `POST` | `/api/v1/quality/appeal/delete` | Delete QualityAppeal |
| `GET` | `/api/v1/quality/appeal/export` | Export QualityAppeals |
| `GET` | `/api/v1/quality/appeal/query` | Query QualityAppeals by User |
| `GET` | `/api/v1/quality/appeal/query/org` | Query QualityAppeals by Organization |
| `GET` | `/api/v1/quality/appeal/query/uid` | Query QualityAppeal by UID |
| `POST` | `/api/v1/quality/appeal/reject` | Reject QualityAppeal |
| `POST` | `/api/v1/quality/appeal/update` | Update QualityAppeal |

### POST `/api/v1/quality/appeal/approve`

Approve QualityAppeal

**请求体**（application/json）：

- 结构：`QualityAppealRequest`

**响应**：`object`

### POST `/api/v1/quality/appeal/create`

Create QualityAppeal

**请求体**（application/json）：

- 结构：`QualityAppealRequest`

**响应**：`object`

### POST `/api/v1/quality/appeal/delete`

Delete QualityAppeal

**请求体**（application/json）：

- 结构：`QualityAppealRequest`

**响应**：`object`

### GET `/api/v1/quality/appeal/export`

Export QualityAppeals

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityAppealRequest |  |

**响应**：`object`

### GET `/api/v1/quality/appeal/query`

Query QualityAppeals by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityAppealRequest |  |

**响应**：`object`

### GET `/api/v1/quality/appeal/query/org`

Query QualityAppeals by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityAppealRequest |  |

**响应**：`object`

### GET `/api/v1/quality/appeal/query/uid`

Query QualityAppeal by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityAppealRequest |  |

**响应**：`object`

### POST `/api/v1/quality/appeal/reject`

Reject QualityAppeal

**请求体**（application/json）：

- 结构：`QualityAppealRequest`

**响应**：`object`

### POST `/api/v1/quality/appeal/update`

Update QualityAppeal

**请求体**（application/json）：

- 结构：`QualityAppealRequest`

**响应**：`object`

## QualityCheck Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quality/check/create` | Create QualityCheck |
| `POST` | `/api/v1/quality/check/delete` | Delete QualityCheck |
| `GET` | `/api/v1/quality/check/export` | Export QualityChecks |
| `GET` | `/api/v1/quality/check/query` | Query QualityChecks by User |
| `GET` | `/api/v1/quality/check/query/org` | Query QualityChecks by Organization |
| `GET` | `/api/v1/quality/check/query/uid` | Query QualityCheck by UID |
| `POST` | `/api/v1/quality/check/update` | Update QualityCheck |

### POST `/api/v1/quality/check/create`

Create QualityCheck

**请求体**（application/json）：

- 结构：`QualityCheckRequest`

**响应**：`object`

### POST `/api/v1/quality/check/delete`

Delete QualityCheck

**请求体**（application/json）：

- 结构：`QualityCheckRequest`

**响应**：`object`

### GET `/api/v1/quality/check/export`

Export QualityChecks

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityCheckRequest |  |

**响应**：`object`

### GET `/api/v1/quality/check/query`

Query QualityChecks by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityCheckRequest |  |

**响应**：`object`

### GET `/api/v1/quality/check/query/org`

Query QualityChecks by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityCheckRequest |  |

**响应**：`object`

### GET `/api/v1/quality/check/query/uid`

Query QualityCheck by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityCheckRequest |  |

**响应**：`object`

### POST `/api/v1/quality/check/update`

Update QualityCheck

**请求体**（application/json）：

- 结构：`QualityCheckRequest`

**响应**：`object`

## QualityFlow Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quality/flow/create` | Create QualityFlow |
| `POST` | `/api/v1/quality/flow/delete` | Delete QualityFlow |
| `GET` | `/api/v1/quality/flow/export` | Export QualityFlows |
| `GET` | `/api/v1/quality/flow/query` | Query QualityFlows by User |
| `GET` | `/api/v1/quality/flow/query/org` | Query QualityFlows by Organization |
| `GET` | `/api/v1/quality/flow/query/uid` | Query QualityFlow by UID |
| `POST` | `/api/v1/quality/flow/update` | Update QualityFlow |

### POST `/api/v1/quality/flow/create`

Create QualityFlow

**请求体**（application/json）：

- 结构：`QualityFlowRequest`

**响应**：`object`

### POST `/api/v1/quality/flow/delete`

Delete QualityFlow

**请求体**（application/json）：

- 结构：`QualityFlowRequest`

**响应**：`object`

### GET `/api/v1/quality/flow/export`

Export QualityFlows

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityFlowRequest |  |

**响应**：`object`

### GET `/api/v1/quality/flow/query`

Query QualityFlows by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityFlowRequest |  |

**响应**：`object`

### GET `/api/v1/quality/flow/query/org`

Query QualityFlows by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityFlowRequest |  |

**响应**：`object`

### GET `/api/v1/quality/flow/query/uid`

Query QualityFlow by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityFlowRequest |  |

**响应**：`object`

### POST `/api/v1/quality/flow/update`

Update QualityFlow

**请求体**（application/json）：

- 结构：`QualityFlowRequest`

**响应**：`object`

## QualityPlan Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quality/plan/create` | Create QualityPlan |
| `POST` | `/api/v1/quality/plan/delete` | Delete QualityPlan |
| `GET` | `/api/v1/quality/plan/export` | Export QualityPlans |
| `GET` | `/api/v1/quality/plan/query` | Query QualityPlans by User |
| `GET` | `/api/v1/quality/plan/query/org` | Query QualityPlans by Organization |
| `GET` | `/api/v1/quality/plan/query/uid` | Query QualityPlan by UID |
| `POST` | `/api/v1/quality/plan/update` | Update QualityPlan |

### POST `/api/v1/quality/plan/create`

Create QualityPlan

**请求体**（application/json）：

- 结构：`QualityPlanRequest`

**响应**：`object`

### POST `/api/v1/quality/plan/delete`

Delete QualityPlan

**请求体**（application/json）：

- 结构：`QualityPlanRequest`

**响应**：`object`

### GET `/api/v1/quality/plan/export`

Export QualityPlans

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityPlanRequest |  |

**响应**：`object`

### GET `/api/v1/quality/plan/query`

Query QualityPlans by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityPlanRequest |  |

**响应**：`object`

### GET `/api/v1/quality/plan/query/org`

Query QualityPlans by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityPlanRequest |  |

**响应**：`object`

### GET `/api/v1/quality/plan/query/uid`

Query QualityPlan by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityPlanRequest |  |

**响应**：`object`

### POST `/api/v1/quality/plan/update`

Update QualityPlan

**请求体**（application/json）：

- 结构：`QualityPlanRequest`

**响应**：`object`

## QualityStatistic Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quality/statistic/create` | Create QualityStatistic |
| `POST` | `/api/v1/quality/statistic/delete` | Delete QualityStatistic |
| `GET` | `/api/v1/quality/statistic/export` | Export QualityStatistics |
| `GET` | `/api/v1/quality/statistic/query` | Query QualityStatistics by User |
| `GET` | `/api/v1/quality/statistic/query/org` | Query QualityStatistics by Organization |
| `GET` | `/api/v1/quality/statistic/query/uid` | Query QualityStatistic by UID |
| `POST` | `/api/v1/quality/statistic/update` | Update QualityStatistic |

### POST `/api/v1/quality/statistic/create`

Create QualityStatistic

**请求体**（application/json）：

- 结构：`QualityStatisticRequest`

**响应**：`object`

### POST `/api/v1/quality/statistic/delete`

Delete QualityStatistic

**请求体**（application/json）：

- 结构：`QualityStatisticRequest`

**响应**：`object`

### GET `/api/v1/quality/statistic/export`

Export QualityStatistics

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/quality/statistic/query`

Query QualityStatistics by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/quality/statistic/query/org`

Query QualityStatistics by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/quality/statistic/query/uid`

Query QualityStatistic by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QualityStatisticRequest |  |

**响应**：`object`

### POST `/api/v1/quality/statistic/update`

Update QualityStatistic

**请求体**（application/json）：

- 结构：`QualityStatisticRequest`

**响应**：`object`

## Quartz Job Management

共 11 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quartz/create` | Create Job |
| `POST` | `/api/v1/quartz/delete` | Delete Job |
| `POST` | `/api/v1/quartz/deleteJob` | Delete Job from Scheduler |
| `GET` | `/api/v1/quartz/export` |  |
| `POST` | `/api/v1/quartz/pauseJob` | Pause Job |
| `GET` | `/api/v1/quartz/query` | Query Jobs by User |
| `GET` | `/api/v1/quartz/query/org` | Query Jobs by Organization |
| `GET` | `/api/v1/quartz/query/uid` |  |
| `POST` | `/api/v1/quartz/resumeJob` | Resume Job |
| `POST` | `/api/v1/quartz/startJob` | Start Job |
| `POST` | `/api/v1/quartz/update` | Update Job |

### POST `/api/v1/quartz/create`

Create Job

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

### POST `/api/v1/quartz/delete`

Delete Job

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

### POST `/api/v1/quartz/deleteJob`

Delete Job from Scheduler

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

### GET `/api/v1/quartz/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuartzRequest |  |

**响应**：`object`

### POST `/api/v1/quartz/pauseJob`

Pause Job

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

### GET `/api/v1/quartz/query`

Query Jobs by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuartzRequest |  |

**响应**：`object`

### GET `/api/v1/quartz/query/org`

Query Jobs by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuartzRequest |  |

**响应**：`object`

### GET `/api/v1/quartz/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuartzRequest |  |

**响应**：`object`

### POST `/api/v1/quartz/resumeJob`

Resume Job

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

### POST `/api/v1/quartz/startJob`

Start Job

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

### POST `/api/v1/quartz/update`

Update Job

**请求体**（application/json）：

- 结构：`QuartzRequest`

**响应**：`object`

## 队列管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/queue/create` | 创建队列 |
| `POST` | `/api/v1/queue/delete` | 删除队列 |
| `GET` | `/api/v1/queue/export` | 导出队列 |
| `GET` | `/api/v1/queue/query` | 查询用户下的队列 |
| `GET` | `/api/v1/queue/query/org` | 查询组织下的队列 |
| `GET` | `/api/v1/queue/query/queuing` | 查询排队中会话 |
| `GET` | `/api/v1/queue/query/uid` | 查询指定队列 |
| `POST` | `/api/v1/queue/update` | 更新队列 |

### POST `/api/v1/queue/create`

创建队列

**请求体**（application/json）：

- 结构：`QueueRequest`

**响应**：`QueueResponse`

### POST `/api/v1/queue/delete`

删除队列

**请求体**（application/json）：

- 结构：`QueueRequest`

**响应**：`object`

### GET `/api/v1/queue/export`

导出队列

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueRequest |  |

**响应**：`object`

### GET `/api/v1/queue/query`

查询用户下的队列

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueRequest |  |

**响应**：`QueueResponse`

### GET `/api/v1/queue/query/org`

查询组织下的队列

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueRequest |  |

**响应**：`QueueResponse`

### GET `/api/v1/queue/query/queuing`

查询排队中会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/queue/query/uid`

查询指定队列

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueRequest |  |

**响应**：`QueueResponse`

### POST `/api/v1/queue/update`

更新队列

**请求体**（application/json）：

- 结构：`QueueRequest`

**响应**：`QueueResponse`

## 队列成员管理

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/queue/member/create` | 创建队列成员 |
| `POST` | `/api/v1/queue/member/delete` | 删除队列成员 |
| `GET` | `/api/v1/queue/member/export` | 导出队列成员 |
| `PUT` | `/api/v1/queue/member/message/count` |  |
| `GET` | `/api/v1/queue/member/query` | 查询用户下的队列成员 |
| `GET` | `/api/v1/queue/member/query/org` | 查询组织下的队列成员 |
| `GET` | `/api/v1/queue/member/query/uid` | 查询指定队列成员 |
| `PUT` | `/api/v1/queue/member/status` |  |
| `PUT` | `/api/v1/queue/member/timestamp` |  |
| `POST` | `/api/v1/queue/member/update` | 更新队列成员 |

### POST `/api/v1/queue/member/create`

创建队列成员

**请求体**（application/json）：

- 结构：`QueueMemberRequest`

**响应**：`QueueMemberResponse`

### POST `/api/v1/queue/member/delete`

删除队列成员

**请求体**（application/json）：

- 结构：`QueueMemberRequest`

**响应**：`object`

### GET `/api/v1/queue/member/export`

导出队列成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueMemberRequest |  |

**响应**：`object`

### PUT `/api/v1/queue/member/message/count`

**请求体**（application/json）：

- 结构：`QueueMemberEntity`

**响应**：`object`

### GET `/api/v1/queue/member/query`

查询用户下的队列成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueMemberRequest |  |

**响应**：`QueueMemberResponse`

### GET `/api/v1/queue/member/query/org`

查询组织下的队列成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueMemberRequest |  |

**响应**：`QueueMemberResponse`

### GET `/api/v1/queue/member/query/uid`

查询指定队列成员

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QueueMemberRequest |  |

**响应**：`QueueMemberResponse`

### PUT `/api/v1/queue/member/status`

**请求体**（application/json）：

- 结构：`QueueMemberEntity`

**响应**：`object`

### PUT `/api/v1/queue/member/timestamp`

**请求体**（application/json）：

- 结构：`QueueMemberEntity`

**响应**：`object`

### POST `/api/v1/queue/member/update`

更新队列成员

**请求体**（application/json）：

- 结构：`QueueMemberRequest`

**响应**：`QueueMemberResponse`

## quick-reply-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/quickreply/create` |  |
| `POST` | `/api/v1/quickreply/delete` |  |
| `POST` | `/api/v1/quickreply/enable` |  |
| `GET` | `/api/v1/quickreply/export` |  |
| `GET` | `/api/v1/quickreply/query` |  |
| `GET` | `/api/v1/quickreply/query/org` |  |
| `GET` | `/api/v1/quickreply/query/uid` |  |
| `POST` | `/api/v1/quickreply/update` |  |

### POST `/api/v1/quickreply/create`

**请求体**（application/json）：

- 结构：`QuickReplyRequest`

**响应**：`object`

### POST `/api/v1/quickreply/delete`

**请求体**（application/json）：

- 结构：`QuickReplyRequest`

**响应**：`object`

### POST `/api/v1/quickreply/enable`

**请求体**（application/json）：

- 结构：`QuickReplyRequest`

**响应**：`object`

### GET `/api/v1/quickreply/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuickReplyRequest |  |

**响应**：`object`

### GET `/api/v1/quickreply/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuickReplyRequest |  |

**响应**：`object`

### GET `/api/v1/quickreply/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuickReplyRequest |  |

**响应**：`object`

### GET `/api/v1/quickreply/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:QuickReplyRequest |  |

**响应**：`object`

### POST `/api/v1/quickreply/update`

**请求体**（application/json）：

- 结构：`QuickReplyRequest`

**响应**：`object`

## 降级设置管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ratedown/setting/create` | 创建降级设置 |
| `POST` | `/api/v1/ratedown/setting/delete` | 删除降级设置 |
| `GET` | `/api/v1/ratedown/setting/export` | 导出降级设置 |
| `GET` | `/api/v1/ratedown/setting/query` | 根据用户查询降级设置 |
| `GET` | `/api/v1/ratedown/setting/query/org` | 根据组织查询降级设置 |
| `GET` | `/api/v1/ratedown/setting/query/uid` | 根据UID查询降级设置 |
| `POST` | `/api/v1/ratedown/setting/update` | 更新降级设置 |

### POST `/api/v1/ratedown/setting/create`

创建降级设置

**请求体**（application/json）：

- 结构：`RatedownSettingsRequest`

**响应**：`object`

### POST `/api/v1/ratedown/setting/delete`

删除降级设置

**请求体**（application/json）：

- 结构：`RatedownSettingsRequest`

**响应**：`object`

### GET `/api/v1/ratedown/setting/export`

导出降级设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RatedownSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/ratedown/setting/query`

根据用户查询降级设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RatedownSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/ratedown/setting/query/org`

根据组织查询降级设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RatedownSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/ratedown/setting/query/uid`

根据UID查询降级设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RatedownSettingsRequest |  |

**响应**：`object`

### POST `/api/v1/ratedown/setting/update`

更新降级设置

**请求体**（application/json）：

- 结构：`RatedownSettingsRequest`

**响应**：`object`

## Relation Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/relation/create` | Create Relation |
| `POST` | `/api/v1/relation/delete` | Delete Relation |
| `GET` | `/api/v1/relation/export` | Export Relations |
| `GET` | `/api/v1/relation/query` | Query Relations by User |
| `GET` | `/api/v1/relation/query/org` | Query Relations by Organization |
| `GET` | `/api/v1/relation/query/uid` | Query Relation by UID |
| `POST` | `/api/v1/relation/update` | Update Relation |

### POST `/api/v1/relation/create`

Create Relation

**请求体**（application/json）：

- 结构：`RelationRequest`

**响应**：`object`

### POST `/api/v1/relation/delete`

Delete Relation

**请求体**（application/json）：

- 结构：`RelationRequest`

**响应**：`object`

### GET `/api/v1/relation/export`

Export Relations

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RelationRequest |  |

**响应**：`object`

### GET `/api/v1/relation/query`

Query Relations by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RelationRequest |  |

**响应**：`object`

### GET `/api/v1/relation/query/org`

Query Relations by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RelationRequest |  |

**响应**：`object`

### GET `/api/v1/relation/query/uid`

Query Relation by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RelationRequest |  |

**响应**：`object`

### POST `/api/v1/relation/update`

Update Relation

**请求体**（application/json）：

- 结构：`RelationRequest`

**响应**：`object`

## report-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/report/create` |  |
| `POST` | `/api/v1/report/delete` |  |
| `GET` | `/api/v1/report/export` |  |
| `GET` | `/api/v1/report/query` |  |
| `GET` | `/api/v1/report/query/org` |  |
| `GET` | `/api/v1/report/query/uid` |  |
| `POST` | `/api/v1/report/update` |  |

### POST `/api/v1/report/create`

**请求体**（application/json）：

- 结构：`ReportRequest`

**响应**：`object`

### POST `/api/v1/report/delete`

**请求体**（application/json）：

- 结构：`ReportRequest`

**响应**：`object`

### GET `/api/v1/report/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ReportRequest |  |

**响应**：`object`

### GET `/api/v1/report/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ReportRequest |  |

**响应**：`object`

### GET `/api/v1/report/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ReportRequest |  |

**响应**：`object`

### GET `/api/v1/report/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ReportRequest |  |

**响应**：`object`

### POST `/api/v1/report/update`

**请求体**（application/json）：

- 结构：`ReportRequest`

**响应**：`object`

## robot-agent-controller

共 45 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/robot/agent/content/generate-faq` |  |
| `POST` | `/api/v1/robot/agent/content/generate-wechat-article` |  |
| `POST` | `/api/v1/robot/agent/content/generate-xiaohongshu-article` |  |
| `POST` | `/api/v1/robot/agent/customer/after-sale` |  |
| `POST` | `/api/v1/robot/agent/customer/assistant` |  |
| `POST` | `/api/v1/robot/agent/customer/expert` |  |
| `POST` | `/api/v1/robot/agent/customer/logistics` |  |
| `POST` | `/api/v1/robot/agent/customer/pre-sale` |  |
| `POST` | `/api/v1/robot/agent/customer/service` |  |
| `POST` | `/api/v1/robot/agent/inspection/agent` |  |
| `POST` | `/api/v1/robot/agent/inspection/robot` |  |
| `POST` | `/api/v1/robot/agent/intent/classification` |  |
| `POST` | `/api/v1/robot/agent/intent/rewrite` |  |
| `POST` | `/api/v1/robot/agent/language/emotion-analysis` |  |
| `POST` | `/api/v1/robot/agent/language/entity-recognition` |  |
| `POST` | `/api/v1/robot/agent/language/recognition` |  |
| `POST` | `/api/v1/robot/agent/language/semantic-analysis` |  |
| `POST` | `/api/v1/robot/agent/language/sentiment-analysis` |  |
| `POST` | `/api/v1/robot/agent/language/translation` |  |
| `POST` | `/api/v1/robot/agent/query-expansion` |  |
| `POST` | `/api/v1/robot/agent/text/abstract-meaning-representation` |  |
| `POST` | `/api/v1/robot/agent/text/chinese-word-segmentation` |  |
| `POST` | `/api/v1/robot/agent/text/classification` |  |
| `POST` | `/api/v1/robot/agent/text/constituency-parsing` |  |
| `POST` | `/api/v1/robot/agent/text/coreference-resolution` |  |
| `POST` | `/api/v1/robot/agent/text/correction` |  |
| `POST` | `/api/v1/robot/agent/text/dependency-parsing` |  |
| `POST` | `/api/v1/robot/agent/text/faq-similar-questions` |  |
| `POST` | `/api/v1/robot/agent/text/keyword-extraction` |  |
| `POST` | `/api/v1/robot/agent/text/part-of-voice-tagging` |  |
| `POST` | `/api/v1/robot/agent/text/semantic-dependency-analysis` |  |
| `POST` | `/api/v1/robot/agent/text/semantic-role-labeling` |  |
| `POST` | `/api/v1/robot/agent/text/semantic-text-similarity` |  |
| `POST` | `/api/v1/robot/agent/text/style-transfer` |  |
| `POST` | `/api/v1/robot/agent/thread/classification` |  |
| `POST` | `/api/v1/robot/agent/thread/completion` |  |
| `POST` | `/api/v1/robot/agent/thread/summary` |  |
| `POST` | `/api/v1/robot/agent/ticket/assistant` |  |
| `POST` | `/api/v1/robot/agent/ticket/auto-fill` |  |
| `POST` | `/api/v1/robot/agent/ticket/solution-recommendation` |  |
| `POST` | `/api/v1/robot/agent/ticket/summary` |  |
| `POST` | `/api/v1/robot/agent/visitor/invitation` |  |
| `POST` | `/api/v1/robot/agent/visitor/portrait` |  |
| `POST` | `/api/v1/robot/agent/visitor/recommendation` |  |
| `POST` | `/api/v1/robot/agent/void-agent` |  |

### POST `/api/v1/robot/agent/content/generate-faq`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/content/generate-wechat-article`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/content/generate-xiaohongshu-article`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/customer/after-sale`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/customer/assistant`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/customer/expert`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/customer/logistics`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/customer/pre-sale`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/customer/service`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/inspection/agent`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/inspection/robot`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/intent/classification`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/intent/rewrite`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/language/emotion-analysis`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/language/entity-recognition`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/language/recognition`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/language/semantic-analysis`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/language/sentiment-analysis`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/language/translation`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/query-expansion`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/abstract-meaning-representation`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/chinese-word-segmentation`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/classification`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/constituency-parsing`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/coreference-resolution`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/correction`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/dependency-parsing`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/faq-similar-questions`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/keyword-extraction`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/part-of-voice-tagging`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/semantic-dependency-analysis`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/semantic-role-labeling`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/semantic-text-similarity`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/text/style-transfer`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/thread/classification`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/thread/completion`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/thread/summary`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/ticket/assistant`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/ticket/auto-fill`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/ticket/solution-recommendation`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/ticket/summary`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/visitor/invitation`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/visitor/portrait`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/visitor/recommendation`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

### POST `/api/v1/robot/agent/void-agent`

**请求体**（application/json）：

- 结构：`RobotAgentRequest`

**响应**：`object`

## 机器人管理

共 13 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/robot/create` | 创建机器人 |
| `POST` | `/api/v1/robot/create/llm/thread` | 创建智能体会话 |
| `POST` | `/api/v1/robot/create/prompt` | 创建智能体模板 |
| `POST` | `/api/v1/robot/delete` | 删除机器人 |
| `GET` | `/api/v1/robot/export` | 导出机器人 |
| `GET` | `/api/v1/robot/query` | 查询用户下的机器人 |
| `GET` | `/api/v1/robot/query/org` | 查询组织下的机器人 |
| `GET` | `/api/v1/robot/query/uid` | 查询指定机器人 |
| `POST` | `/api/v1/robot/update` | 更新机器人 |
| `POST` | `/api/v1/robot/update/avatar` | 更新机器人头像 |
| `POST` | `/api/v1/robot/update/kbUid` | 更新机器人知识库 |
| `POST` | `/api/v1/robot/update/llm/thread` | 更新智能体会话 |
| `POST` | `/api/v1/robot/update/prompt` | 更新提示词机器人 |

### POST `/api/v1/robot/create`

创建机器人

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`RobotResponse`

### POST `/api/v1/robot/create/llm/thread`

创建智能体会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`ThreadResponse`

### POST `/api/v1/robot/create/prompt`

创建智能体模板

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`RobotResponse`

### POST `/api/v1/robot/delete`

删除机器人

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`object`

### GET `/api/v1/robot/export`

导出机器人

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotRequest |  |

**响应**：`object`

### GET `/api/v1/robot/query`

查询用户下的机器人

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotRequest |  |

**响应**：`RobotResponse`

### GET `/api/v1/robot/query/org`

查询组织下的机器人

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotRequest |  |

**响应**：`RobotResponse`

### GET `/api/v1/robot/query/uid`

查询指定机器人

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotRequest |  |

**响应**：`RobotResponse`

### POST `/api/v1/robot/update`

更新机器人

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`RobotResponse`

### POST `/api/v1/robot/update/avatar`

更新机器人头像

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`RobotResponse`

### POST `/api/v1/robot/update/kbUid`

更新机器人知识库

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`RobotResponse`

### POST `/api/v1/robot/update/llm/thread`

更新智能体会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`ThreadResponse`

### POST `/api/v1/robot/update/prompt`

更新提示词机器人

**请求体**（application/json）：

- 结构：`RobotRequest`

**响应**：`RobotResponse`

## robot-message-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/robot/message/create` |  |
| `POST` | `/api/v1/robot/message/delete` |  |
| `GET` | `/api/v1/robot/message/export` |  |
| `GET` | `/api/v1/robot/message/query` |  |
| `GET` | `/api/v1/robot/message/query/org` |  |
| `GET` | `/api/v1/robot/message/query/uid` |  |
| `POST` | `/api/v1/robot/message/update` |  |

### POST `/api/v1/robot/message/create`

**请求体**（application/json）：

- 结构：`RobotMessageRequest`

**响应**：`object`

### POST `/api/v1/robot/message/delete`

**请求体**（application/json）：

- 结构：`RobotMessageRequest`

**响应**：`object`

### GET `/api/v1/robot/message/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotMessageRequest |  |

**响应**：`object`

### GET `/api/v1/robot/message/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotMessageRequest |  |

**响应**：`object`

### GET `/api/v1/robot/message/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotMessageRequest |  |

**响应**：`object`

### GET `/api/v1/robot/message/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RobotMessageRequest |  |

**响应**：`object`

### POST `/api/v1/robot/message/update`

**请求体**（application/json）：

- 结构：`RobotMessageRequest`

**响应**：`object`

## Role Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/role/create` |  |
| `POST` | `/api/v1/role/delete` |  |
| `GET` | `/api/v1/role/export` |  |
| `GET` | `/api/v1/role/query` |  |
| `GET` | `/api/v1/role/query/org` |  |
| `GET` | `/api/v1/role/query/uid` |  |
| `POST` | `/api/v1/role/update` |  |

### POST `/api/v1/role/create`

**请求体**（application/json）：

- 结构：`RoleRequest`

**响应**：`object`

### POST `/api/v1/role/delete`

**请求体**（application/json）：

- 结构：`RoleRequest`

**响应**：`object`

### GET `/api/v1/role/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoleRequest |  |

**响应**：`object`

### GET `/api/v1/role/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoleRequest |  |

**响应**：`object`

### GET `/api/v1/role/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoleRequest |  |

**响应**：`object`

### GET `/api/v1/role/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoleRequest |  |

**响应**：`object`

### POST `/api/v1/role/update`

**请求体**（application/json）：

- 结构：`RoleRequest`

**响应**：`object`

## 路由规则管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/routing/rule/create` | 创建路由规则 |
| `POST` | `/api/v1/routing/rule/delete` | 删除路由规则 |
| `GET` | `/api/v1/routing/rule/export` | 导出路由规则 |
| `GET` | `/api/v1/routing/rule/query` | 查询用户下的路由规则 |
| `GET` | `/api/v1/routing/rule/query/org` | 查询组织下的路由规则 |
| `GET` | `/api/v1/routing/rule/query/uid` | 查询指定路由规则 |
| `POST` | `/api/v1/routing/rule/update` | 更新路由规则 |

### POST `/api/v1/routing/rule/create`

创建路由规则

**请求体**（application/json）：

- 结构：`RoutingRuleRequest`

**响应**：`RoutingRuleResponse`

### POST `/api/v1/routing/rule/delete`

删除路由规则

**请求体**（application/json）：

- 结构：`RoutingRuleRequest`

**响应**：`object`

### GET `/api/v1/routing/rule/export`

导出路由规则

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoutingRuleRequest |  |

**响应**：`object`

### GET `/api/v1/routing/rule/query`

查询用户下的路由规则

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoutingRuleRequest |  |

**响应**：`RoutingRuleResponse`

### GET `/api/v1/routing/rule/query/org`

查询组织下的路由规则

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoutingRuleRequest |  |

**响应**：`RoutingRuleResponse`

### GET `/api/v1/routing/rule/query/uid`

查询指定路由规则

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RoutingRuleRequest |  |

**响应**：`RoutingRuleResponse`

### POST `/api/v1/routing/rule/update`

更新路由规则

**请求体**（application/json）：

- 结构：`RoutingRuleRequest`

**响应**：`RoutingRuleResponse`

## Server Metrics Management

共 15 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/server-metrics/average/{serverUid}` |  |
| `DELETE` | `/api/v1/server-metrics/cleanup` |  |
| `GET` | `/api/v1/server-metrics/count/{serverUid}` |  |
| `POST` | `/api/v1/server-metrics/create` | Create Server Metrics |
| `GET` | `/api/v1/server-metrics/current/history` |  |
| `POST` | `/api/v1/server-metrics/delete` | Delete Server Metrics |
| `GET` | `/api/v1/server-metrics/export` | Export Server Metrics |
| `GET` | `/api/v1/server-metrics/high-usage` |  |
| `GET` | `/api/v1/server-metrics/history/{serverUid}` |  |
| `GET` | `/api/v1/server-metrics/latest/{serverUid}` |  |
| `GET` | `/api/v1/server-metrics/peak/{serverUid}` |  |
| `GET` | `/api/v1/server-metrics/query` | Query Server Metrics by User |
| `GET` | `/api/v1/server-metrics/query/org` | Query Server Metrics by Organization |
| `GET` | `/api/v1/server-metrics/query/uid` | Query Server Metrics by UID |
| `POST` | `/api/v1/server-metrics/update` | Update Server Metrics |

### GET `/api/v1/server-metrics/average/{serverUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `serverUid` | True | string |  |
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`ServerMetricsAverage`

### DELETE `/api/v1/server-metrics/cleanup`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `retentionDays` | False | integer |  |

**响应**：`integer`

### GET `/api/v1/server-metrics/count/{serverUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `serverUid` | True | string |  |

**响应**：`integer`

### POST `/api/v1/server-metrics/create`

Create Server Metrics

**请求体**（application/json）：

- 结构：`ServerMetricsRequest`

**响应**：`object`

### GET `/api/v1/server-metrics/current/history`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`ServerMetricsEntity`

### POST `/api/v1/server-metrics/delete`

Delete Server Metrics

**请求体**（application/json）：

- 结构：`ServerMetricsRequest`

**响应**：`object`

### GET `/api/v1/server-metrics/export`

Export Server Metrics

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerMetricsRequest |  |

**响应**：`object`

### GET `/api/v1/server-metrics/high-usage`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `cpuThreshold` | False | number |  |
| query | `memoryThreshold` | False | number |  |
| query | `diskThreshold` | False | number |  |
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`ServerMetricsEntity`

### GET `/api/v1/server-metrics/history/{serverUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `serverUid` | True | string |  |
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`ServerMetricsEntity`

### GET `/api/v1/server-metrics/latest/{serverUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `serverUid` | True | string |  |

**响应**：`ServerMetricsEntity`

### GET `/api/v1/server-metrics/peak/{serverUid}`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `serverUid` | True | string |  |
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`ServerMetricsPeak`

### GET `/api/v1/server-metrics/query`

Query Server Metrics by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerMetricsRequest |  |

**响应**：`object`

### GET `/api/v1/server-metrics/query/org`

Query Server Metrics by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerMetricsRequest |  |

**响应**：`object`

### GET `/api/v1/server-metrics/query/uid`

Query Server Metrics by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerMetricsRequest |  |

**响应**：`object`

### POST `/api/v1/server-metrics/update`

Update Server Metrics

**请求体**（application/json）：

- 结构：`ServerMetricsRequest`

**响应**：`object`

## Server Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/server/create` | Create Server |
| `POST` | `/api/v1/server/delete` | Delete Server |
| `GET` | `/api/v1/server/export` | Export Servers |
| `GET` | `/api/v1/server/query` | Query Servers by User |
| `GET` | `/api/v1/server/query/org` | Query Servers by Organization |
| `GET` | `/api/v1/server/query/uid` | Query Server by UID |
| `POST` | `/api/v1/server/update` | Update Server |

### POST `/api/v1/server/create`

Create Server

**请求体**（application/json）：

- 结构：`ServerRequest`

**响应**：`object`

### POST `/api/v1/server/delete`

Delete Server

**请求体**（application/json）：

- 结构：`ServerRequest`

**响应**：`object`

### GET `/api/v1/server/export`

Export Servers

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerRequest |  |

**响应**：`object`

### GET `/api/v1/server/query`

Query Servers by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerRequest |  |

**响应**：`object`

### GET `/api/v1/server/query/org`

Query Servers by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerRequest |  |

**响应**：`object`

### GET `/api/v1/server/query/uid`

Query Server by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServerRequest |  |

**响应**：`object`

### POST `/api/v1/server/update`

Update Server

**请求体**（application/json）：

- 结构：`ServerRequest`

**响应**：`object`

## 服务设置管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/service/setting/create` | 创建服务设置 |
| `POST` | `/api/v1/service/setting/delete` | 删除服务设置 |
| `GET` | `/api/v1/service/setting/export` | 导出服务设置 |
| `GET` | `/api/v1/service/setting/query` | 根据用户查询服务设置 |
| `GET` | `/api/v1/service/setting/query/org` | 根据组织查询服务设置 |
| `GET` | `/api/v1/service/setting/query/uid` | 根据UID查询服务设置 |
| `POST` | `/api/v1/service/setting/update` | 更新服务设置 |

### POST `/api/v1/service/setting/create`

创建服务设置

**请求体**（application/json）：

- 结构：`ServiceSettingsRequest`

**响应**：`object`

### POST `/api/v1/service/setting/delete`

删除服务设置

**请求体**（application/json）：

- 结构：`ServiceSettingsRequest`

**响应**：`object`

### GET `/api/v1/service/setting/export`

导出服务设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/service/setting/query`

根据用户查询服务设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/service/setting/query/org`

根据组织查询服务设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceSettingsRequest |  |

**响应**：`object`

### GET `/api/v1/service/setting/query/uid`

根据UID查询服务设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceSettingsRequest |  |

**响应**：`object`

### POST `/api/v1/service/setting/update`

更新服务设置

**请求体**（application/json）：

- 结构：`ServiceSettingsRequest`

**响应**：`object`

## service-statistic-rest-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/service/statistic/calculate` | 计算今日统计 |
| `POST` | `/api/v1/service/statistic/create` | 创建在线客服统计 |
| `POST` | `/api/v1/service/statistic/delete` | 删除在线客服统计 |
| `GET` | `/api/v1/service/statistic/export` | 导出在线客服统计 |
| `GET` | `/api/v1/service/statistic/query` | 查询用户下的在线客服统计 |
| `GET` | `/api/v1/service/statistic/query/date` | 查询某时间段统计 |
| `GET` | `/api/v1/service/statistic/query/org` | 查询组织下的在线客服统计 |
| `GET` | `/api/v1/service/statistic/query/uid` | 根据UID查询在线客服统计 |
| `POST` | `/api/v1/service/statistic/update` | 更新在线客服统计 |

### POST `/api/v1/service/statistic/calculate`

计算今日统计

**响应**：`object`

### POST `/api/v1/service/statistic/create`

创建在线客服统计

**请求体**（application/json）：

- 结构：`ServiceStatisticRequest`

**响应**：`ServiceStatisticResponse`

### POST `/api/v1/service/statistic/delete`

删除在线客服统计

**请求体**（application/json）：

- 结构：`ServiceStatisticRequest`

**响应**：`object`

### GET `/api/v1/service/statistic/export`

导出在线客服统计

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/service/statistic/query`

查询用户下的在线客服统计

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceStatisticRequest |  |

**响应**：`ServiceStatisticResponse`

### GET `/api/v1/service/statistic/query/date`

查询某时间段统计

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceStatisticRequest |  |

**响应**：`ServiceStatisticResponse`

### GET `/api/v1/service/statistic/query/org`

查询组织下的在线客服统计

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceStatisticRequest |  |

**响应**：`ServiceStatisticResponse`

### GET `/api/v1/service/statistic/query/uid`

根据UID查询在线客服统计

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ServiceStatisticRequest |  |

**响应**：`ServiceStatisticResponse`

### POST `/api/v1/service/statistic/update`

更新在线客服统计

**请求体**（application/json）：

- 结构：`ServiceStatisticRequest`

**响应**：`ServiceStatisticResponse`

## shop-app-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/shop/app/create` |  |
| `POST` | `/api/v1/shop/app/delete` |  |
| `GET` | `/api/v1/shop/app/export` |  |
| `GET` | `/api/v1/shop/app/query` |  |
| `GET` | `/api/v1/shop/app/query/org` |  |
| `GET` | `/api/v1/shop/app/query/uid` |  |
| `GET` | `/api/v1/shop/app/refreshToken` |  |
| `POST` | `/api/v1/shop/app/update` |  |

### POST `/api/v1/shop/app/create`

**请求体**（application/json）：

- 结构：`ShopAppRequest`

**响应**：`object`

### POST `/api/v1/shop/app/delete`

**请求体**（application/json）：

- 结构：`ShopAppRequest`

**响应**：`object`

### GET `/api/v1/shop/app/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShopAppRequest |  |

**响应**：`object`

### GET `/api/v1/shop/app/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShopAppRequest |  |

**响应**：`object`

### GET `/api/v1/shop/app/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShopAppRequest |  |

**响应**：`object`

### GET `/api/v1/shop/app/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShopAppRequest |  |

**响应**：`object`

### GET `/api/v1/shop/app/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShopAppRequest |  |

**响应**：`object`

### POST `/api/v1/shop/app/update`

**请求体**（application/json）：

- 结构：`ShopAppRequest`

**响应**：`object`

## Shopping Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/shopping/create` | Create Shopping |
| `POST` | `/api/v1/shopping/delete` | Delete Shopping |
| `GET` | `/api/v1/shopping/export` | Export Shoppings |
| `GET` | `/api/v1/shopping/query` | Query Shoppings by User |
| `GET` | `/api/v1/shopping/query/org` | Query Shoppings by Organization |
| `GET` | `/api/v1/shopping/query/uid` | Query Shopping by UID |
| `POST` | `/api/v1/shopping/update` | Update Shopping |

### POST `/api/v1/shopping/create`

Create Shopping

**请求体**（application/json）：

- 结构：`ShoppingRequest`

**响应**：`object`

### POST `/api/v1/shopping/delete`

Delete Shopping

**请求体**（application/json）：

- 结构：`ShoppingRequest`

**响应**：`object`

### GET `/api/v1/shopping/export`

Export Shoppings

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShoppingRequest |  |

**响应**：`object`

### GET `/api/v1/shopping/query`

Query Shoppings by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShoppingRequest |  |

**响应**：`object`

### GET `/api/v1/shopping/query/org`

Query Shoppings by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShoppingRequest |  |

**响应**：`object`

### GET `/api/v1/shopping/query/uid`

Query Shopping by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ShoppingRequest |  |

**响应**：`object`

### POST `/api/v1/shopping/update`

Update Shopping

**请求体**（application/json）：

- 结构：`ShoppingRequest`

**响应**：`object`

## slack-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/slack/create` |  |
| `POST` | `/api/v1/slack/delete` |  |
| `GET` | `/api/v1/slack/export` |  |
| `GET` | `/api/v1/slack/query` |  |
| `GET` | `/api/v1/slack/query/org` |  |
| `GET` | `/api/v1/slack/query/uid` |  |
| `POST` | `/api/v1/slack/update` |  |

### POST `/api/v1/slack/create`

**请求体**（application/json）：

- 结构：`SlackRequest`

**响应**：`object`

### POST `/api/v1/slack/delete`

**请求体**（application/json）：

- 结构：`SlackRequest`

**响应**：`object`

### GET `/api/v1/slack/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:SlackRequest |  |

**响应**：`object`

### GET `/api/v1/slack/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:SlackRequest |  |

**响应**：`object`

### GET `/api/v1/slack/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:SlackRequest |  |

**响应**：`object`

### GET `/api/v1/slack/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:SlackRequest |  |

**响应**：`object`

### POST `/api/v1/slack/update`

**请求体**（application/json）：

- 结构：`SlackRequest`

**响应**：`object`

## taboo-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/taboo/create` |  |
| `POST` | `/api/v1/taboo/delete` |  |
| `POST` | `/api/v1/taboo/enable` |  |
| `GET` | `/api/v1/taboo/export` |  |
| `GET` | `/api/v1/taboo/query` |  |
| `GET` | `/api/v1/taboo/query/org` |  |
| `GET` | `/api/v1/taboo/query/uid` |  |
| `POST` | `/api/v1/taboo/update` |  |

### POST `/api/v1/taboo/create`

**请求体**（application/json）：

- 结构：`TabooRequest`

**响应**：`object`

### POST `/api/v1/taboo/delete`

**请求体**（application/json）：

- 结构：`TabooRequest`

**响应**：`object`

### POST `/api/v1/taboo/enable`

**请求体**（application/json）：

- 结构：`TabooRequest`

**响应**：`object`

### GET `/api/v1/taboo/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooRequest |  |

**响应**：`object`

### GET `/api/v1/taboo/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooRequest |  |

**响应**：`object`

### GET `/api/v1/taboo/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooRequest |  |

**响应**：`object`

### GET `/api/v1/taboo/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooRequest |  |

**响应**：`object`

### POST `/api/v1/taboo/update`

**请求体**（application/json）：

- 结构：`TabooRequest`

**响应**：`object`

## 敏感词消息管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/taboo/message/create` | 创建敏感词消息 |
| `POST` | `/api/v1/taboo/message/delete` | 删除敏感词消息 |
| `GET` | `/api/v1/taboo/message/export` | 导出敏感词消息 |
| `GET` | `/api/v1/taboo/message/query` | 根据用户查询敏感词消息 |
| `GET` | `/api/v1/taboo/message/query/org` | 根据组织查询敏感词消息 |
| `GET` | `/api/v1/taboo/message/query/uid` | 根据UID查询敏感词消息 |
| `POST` | `/api/v1/taboo/message/update` | 更新敏感词消息 |

### POST `/api/v1/taboo/message/create`

创建敏感词消息

**请求体**（application/json）：

- 结构：`TabooMessageRequest`

**响应**：`object`

### POST `/api/v1/taboo/message/delete`

删除敏感词消息

**请求体**（application/json）：

- 结构：`TabooMessageRequest`

**响应**：`object`

### GET `/api/v1/taboo/message/export`

导出敏感词消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooMessageRequest |  |

**响应**：`object`

### GET `/api/v1/taboo/message/query`

根据用户查询敏感词消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooMessageRequest |  |

**响应**：`object`

### GET `/api/v1/taboo/message/query/org`

根据组织查询敏感词消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooMessageRequest |  |

**响应**：`object`

### GET `/api/v1/taboo/message/query/uid`

根据UID查询敏感词消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TabooMessageRequest |  |

**响应**：`object`

### POST `/api/v1/taboo/message/update`

更新敏感词消息

**请求体**（application/json）：

- 结构：`TabooMessageRequest`

**响应**：`object`

## Tag Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/tag/create` | Create Tag |
| `POST` | `/api/v1/tag/delete` | Delete Tag |
| `GET` | `/api/v1/tag/export` | Export Tags |
| `GET` | `/api/v1/tag/query` | Query Tags by User |
| `GET` | `/api/v1/tag/query/org` | Query Tags by Organization |
| `GET` | `/api/v1/tag/query/uid` | Query Tag by UID |
| `POST` | `/api/v1/tag/update` | Update Tag |

### POST `/api/v1/tag/create`

Create Tag

**请求体**（application/json）：

- 结构：`TagRequest`

**响应**：`object`

### POST `/api/v1/tag/delete`

Delete Tag

**请求体**（application/json）：

- 结构：`TagRequest`

**响应**：`object`

### GET `/api/v1/tag/export`

Export Tags

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TagRequest |  |

**响应**：`object`

### GET `/api/v1/tag/query`

Query Tags by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TagRequest |  |

**响应**：`object`

### GET `/api/v1/tag/query/org`

Query Tags by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TagRequest |  |

**响应**：`object`

### GET `/api/v1/tag/query/uid`

Query Tag by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TagRequest |  |

**响应**：`object`

### POST `/api/v1/tag/update`

Update Tag

**请求体**（application/json）：

- 结构：`TagRequest`

**响应**：`object`

## task-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/task/create` |  |
| `POST` | `/api/v1/task/delete` |  |
| `GET` | `/api/v1/task/export` |  |
| `GET` | `/api/v1/task/query` |  |
| `GET` | `/api/v1/task/query/org` |  |
| `GET` | `/api/v1/task/query/uid` |  |
| `POST` | `/api/v1/task/update` |  |

### POST `/api/v1/task/create`

**请求体**（application/json）：

- 结构：`TaskRequest`

**响应**：`object`

### POST `/api/v1/task/delete`

**请求体**（application/json）：

- 结构：`TaskRequest`

**响应**：`object`

### GET `/api/v1/task/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TaskRequest |  |

**响应**：`object`

### GET `/api/v1/task/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TaskRequest |  |

**响应**：`object`

### GET `/api/v1/task/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TaskRequest |  |

**响应**：`object`

### GET `/api/v1/task/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TaskRequest |  |

**响应**：`object`

### POST `/api/v1/task/update`

**请求体**（application/json）：

- 结构：`TaskRequest`

**响应**：`object`

## telegram-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/telegram/checkServiceReachable` |  |
| `POST` | `/api/v1/telegram/create` |  |
| `POST` | `/api/v1/telegram/delete` |  |
| `GET` | `/api/v1/telegram/export` |  |
| `GET` | `/api/v1/telegram/query` |  |
| `GET` | `/api/v1/telegram/query/org` |  |
| `GET` | `/api/v1/telegram/query/uid` |  |
| `POST` | `/api/v1/telegram/update` |  |

### GET `/api/v1/telegram/checkServiceReachable`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TelegramRequest |  |

**响应**：`object`

### POST `/api/v1/telegram/create`

**请求体**（application/json）：

- 结构：`TelegramRequest`

**响应**：`object`

### POST `/api/v1/telegram/delete`

**请求体**（application/json）：

- 结构：`TelegramRequest`

**响应**：`object`

### GET `/api/v1/telegram/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TelegramRequest |  |

**响应**：`object`

### GET `/api/v1/telegram/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TelegramRequest |  |

**响应**：`object`

### GET `/api/v1/telegram/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TelegramRequest |  |

**响应**：`object`

### GET `/api/v1/telegram/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TelegramRequest |  |

**响应**：`object`

### POST `/api/v1/telegram/update`

**请求体**（application/json）：

- 结构：`TelegramRequest`

**响应**：`object`

## telegram-message-controller

共 6 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/telegram/send/customKeyboard` |  |
| `POST` | `/api/v1/telegram/send/inlineKeyboard` |  |
| `POST` | `/api/v1/telegram/send/photo` |  |
| `POST` | `/api/v1/telegram/send/sticker` |  |
| `POST` | `/api/v1/telegram/send/text` |  |
| `POST` | `/api/v1/telegram/show/chatAction` |  |

### POST `/api/v1/telegram/send/customKeyboard`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `chatId` | True | string |  |
| query | `text` | False | string |  |

**响应**：`string`

### POST `/api/v1/telegram/send/inlineKeyboard`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `chatId` | True | string |  |
| query | `text` | False | string |  |

**响应**：`string`

### POST `/api/v1/telegram/send/photo`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `chatId` | True | string |  |
| query | `photoUrl` | True | string |  |
| query | `caption` | False | string |  |

**响应**：`string`

### POST `/api/v1/telegram/send/sticker`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `chatId` | True | string |  |
| query | `stickerFileId` | True | string |  |

**响应**：`string`

### POST `/api/v1/telegram/send/text`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `chatId` | True | string |  |
| query | `text` | True | string |  |

**响应**：`string`

### POST `/api/v1/telegram/show/chatAction`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `chatId` | True | string |  |
| query | `actionType` | True | string |  |

**响应**：`string`

## 模板管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/template/create` | 创建模板 |
| `POST` | `/api/v1/template/delete` | 删除模板 |
| `GET` | `/api/v1/template/export` | 导出模板 |
| `GET` | `/api/v1/template/query` | 根据用户查询模板 |
| `GET` | `/api/v1/template/query/org` | 根据组织查询模板 |
| `GET` | `/api/v1/template/query/uid` | 根据UID查询模板 |
| `POST` | `/api/v1/template/update` | 更新模板 |

### POST `/api/v1/template/create`

创建模板

**请求体**（application/json）：

- 结构：`TemplateRequest`

**响应**：`object`

### POST `/api/v1/template/delete`

删除模板

**请求体**（application/json）：

- 结构：`TemplateRequest`

**响应**：`object`

### GET `/api/v1/template/export`

导出模板

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TemplateRequest |  |

**响应**：`object`

### GET `/api/v1/template/query`

根据用户查询模板

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TemplateRequest |  |

**响应**：`object`

### GET `/api/v1/template/query/org`

根据组织查询模板

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TemplateRequest |  |

**响应**：`object`

### GET `/api/v1/template/query/uid`

根据UID查询模板

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TemplateRequest |  |

**响应**：`object`

### POST `/api/v1/template/update`

更新模板

**请求体**（application/json）：

- 结构：`TemplateRequest`

**响应**：`object`

## 会话管理

共 23 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/close` | 关闭会话 |
| `POST` | `/api/v1/thread/close/topic` | 关闭会话 |
| `POST` | `/api/v1/thread/create` | 创建会话 |
| `POST` | `/api/v1/thread/delete` | 删除会话 |
| `GET` | `/api/v1/thread/export` | 导出会话列表 |
| `GET` | `/api/v1/thread/query` | 根据用户查询会话 |
| `GET` | `/api/v1/thread/query/by/user/topics` | 根据用户UID查询所有会话 |
| `GET` | `/api/v1/thread/query/invite` | 查询邀请会话 |
| `GET` | `/api/v1/thread/query/org` | 根据组织查询会话 |
| `GET` | `/api/v1/thread/query/topic` | 根据主题查询会话 |
| `GET` | `/api/v1/thread/query/topic/owner` | 根据主题和用户查询会话 |
| `GET` | `/api/v1/thread/query/uid` | 根据UID查询会话 |
| `POST` | `/api/v1/thread/update` | 更新会话 |
| `POST` | `/api/v1/thread/update/fold` | 更新会话折叠状态 |
| `POST` | `/api/v1/thread/update/hide` | 更新会话隐藏状态 |
| `POST` | `/api/v1/thread/update/mute` | 更新会话静音状态 |
| `POST` | `/api/v1/thread/update/note` | 更新会话备注 |
| `POST` | `/api/v1/thread/update/star` | 更新会话标星状态 |
| `POST` | `/api/v1/thread/update/tagList` | 更新会话标签列表 |
| `POST` | `/api/v1/thread/update/top` | 更新会话置顶状态 |
| `POST` | `/api/v1/thread/update/unread` | 更新会话未读状态 |
| `POST` | `/api/v1/thread/update/unread/count` | 更新会话未读数量 |
| `POST` | `/api/v1/thread/update/user` | 更新会话用户信息 |

### POST `/api/v1/thread/close`

关闭会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/close/topic`

关闭会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/create`

创建会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/delete`

删除会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### GET `/api/v1/thread/export`

导出会话列表

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query`

根据用户查询会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query/by/user/topics`

根据用户UID查询所有会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query/invite`

查询邀请会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query/org`

根据组织查询会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query/topic`

根据主题查询会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query/topic/owner`

根据主题和用户查询会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### GET `/api/v1/thread/query/uid`

根据UID查询会话

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

### POST `/api/v1/thread/update`

更新会话

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/fold`

更新会话折叠状态

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/hide`

更新会话隐藏状态

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/mute`

更新会话静音状态

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/note`

更新会话备注

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/star`

更新会话标星状态

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/tagList`

更新会话标签列表

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/top`

更新会话置顶状态

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/unread`

更新会话未读状态

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/unread/count`

更新会话未读数量

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

### POST `/api/v1/thread/update/user`

更新会话用户信息

**请求体**（application/json）：

- 结构：`ThreadRequest`

**响应**：`object`

## 会话邀请

共 12 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/invite/accept` | 接受会话邀请 |
| `POST` | `/api/v1/thread/invite/cancel` | 取消会话邀请 |
| `POST` | `/api/v1/thread/invite/create` | 创建会话邀请 |
| `POST` | `/api/v1/thread/invite/delete` | 删除会话邀请 |
| `POST` | `/api/v1/thread/invite/exit` | 退出会话 |
| `GET` | `/api/v1/thread/invite/export` | 导出会话邀请 |
| `GET` | `/api/v1/thread/invite/query` | 查询用户下的会话邀请 |
| `GET` | `/api/v1/thread/invite/query/org` | 查询组织下的会话邀请 |
| `GET` | `/api/v1/thread/invite/query/uid` |  |
| `POST` | `/api/v1/thread/invite/reject` | 拒绝会话邀请 |
| `POST` | `/api/v1/thread/invite/remove` | 移除会话邀请 |
| `POST` | `/api/v1/thread/invite/update` | 更新会话邀请 |

### POST `/api/v1/thread/invite/accept`

接受会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/cancel`

取消会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/create`

创建会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/delete`

删除会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/exit`

退出会话

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### GET `/api/v1/thread/invite/export`

导出会话邀请

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`object`

### GET `/api/v1/thread/invite/query`

查询用户下的会话邀请

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`object`

### GET `/api/v1/thread/invite/query/org`

查询组织下的会话邀请

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`ThreadInviteResponse`

### GET `/api/v1/thread/invite/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`object`

### POST `/api/v1/thread/invite/reject`

拒绝会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/remove`

移除会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/update`

更新会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

## 会话邀请管理

共 12 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/invite/accept` | 接受会话邀请 |
| `POST` | `/api/v1/thread/invite/cancel` | 取消会话邀请 |
| `POST` | `/api/v1/thread/invite/create` | 创建会话邀请 |
| `POST` | `/api/v1/thread/invite/delete` | 删除会话邀请 |
| `POST` | `/api/v1/thread/invite/exit` | 退出会话 |
| `GET` | `/api/v1/thread/invite/export` | 导出会话邀请 |
| `GET` | `/api/v1/thread/invite/query` | 查询用户下的会话邀请 |
| `GET` | `/api/v1/thread/invite/query/org` | 查询组织下的会话邀请 |
| `GET` | `/api/v1/thread/invite/query/uid` |  |
| `POST` | `/api/v1/thread/invite/reject` | 拒绝会话邀请 |
| `POST` | `/api/v1/thread/invite/remove` | 移除会话邀请 |
| `POST` | `/api/v1/thread/invite/update` | 更新会话邀请 |

### POST `/api/v1/thread/invite/accept`

接受会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/cancel`

取消会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/create`

创建会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/delete`

删除会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/exit`

退出会话

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### GET `/api/v1/thread/invite/export`

导出会话邀请

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`object`

### GET `/api/v1/thread/invite/query`

查询用户下的会话邀请

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`object`

### GET `/api/v1/thread/invite/query/org`

查询组织下的会话邀请

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`ThreadInviteResponse`

### GET `/api/v1/thread/invite/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadInviteRequest |  |

**响应**：`object`

### POST `/api/v1/thread/invite/reject`

拒绝会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/remove`

移除会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

### POST `/api/v1/thread/invite/update`

更新会话邀请

**请求体**（application/json）：

- 结构：`ThreadInviteRequest`

**响应**：`object`

## thread-process-controller

共 1 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/thread/process/history/activity` |  |

### GET `/api/v1/thread/process/history/activity`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRequest |  |

**响应**：`object`

## 会话评价

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/rating/create` | 创建会话评价 |
| `POST` | `/api/v1/thread/rating/delete` | 删除会话评价 |
| `GET` | `/api/v1/thread/rating/export` | 导出会话评价 |
| `GET` | `/api/v1/thread/rating/invite` | 邀请评价 |
| `GET` | `/api/v1/thread/rating/query` | 查询用户下的会话评价 |
| `GET` | `/api/v1/thread/rating/query/org` | 查询组织下的会话评价 |
| `GET` | `/api/v1/thread/rating/query/thread/uid` | 查询会话评价 |
| `GET` | `/api/v1/thread/rating/query/uid` | 查询指定会话评价 |
| `POST` | `/api/v1/thread/rating/update` | 更新会话评价 |

### POST `/api/v1/thread/rating/create`

创建会话评价

**请求体**（application/json）：

- 结构：`ThreadRatingRequest`

**响应**：`ThreadRatingResponse`

### POST `/api/v1/thread/rating/delete`

删除会话评价

**请求体**（application/json）：

- 结构：`ThreadRatingRequest`

**响应**：`object`

### GET `/api/v1/thread/rating/export`

导出会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`object`

### GET `/api/v1/thread/rating/invite`

邀请评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`object`

### GET `/api/v1/thread/rating/query`

查询用户下的会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### GET `/api/v1/thread/rating/query/org`

查询组织下的会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### GET `/api/v1/thread/rating/query/thread/uid`

查询会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### GET `/api/v1/thread/rating/query/uid`

查询指定会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### POST `/api/v1/thread/rating/update`

更新会话评价

**请求体**（application/json）：

- 结构：`ThreadRatingRequest`

**响应**：`ThreadRatingResponse`

## 会话评价管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/rating/create` | 创建会话评价 |
| `POST` | `/api/v1/thread/rating/delete` | 删除会话评价 |
| `GET` | `/api/v1/thread/rating/export` | 导出会话评价 |
| `GET` | `/api/v1/thread/rating/invite` | 邀请评价 |
| `GET` | `/api/v1/thread/rating/query` | 查询用户下的会话评价 |
| `GET` | `/api/v1/thread/rating/query/org` | 查询组织下的会话评价 |
| `GET` | `/api/v1/thread/rating/query/thread/uid` | 查询会话评价 |
| `GET` | `/api/v1/thread/rating/query/uid` | 查询指定会话评价 |
| `POST` | `/api/v1/thread/rating/update` | 更新会话评价 |

### POST `/api/v1/thread/rating/create`

创建会话评价

**请求体**（application/json）：

- 结构：`ThreadRatingRequest`

**响应**：`ThreadRatingResponse`

### POST `/api/v1/thread/rating/delete`

删除会话评价

**请求体**（application/json）：

- 结构：`ThreadRatingRequest`

**响应**：`object`

### GET `/api/v1/thread/rating/export`

导出会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`object`

### GET `/api/v1/thread/rating/invite`

邀请评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`object`

### GET `/api/v1/thread/rating/query`

查询用户下的会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### GET `/api/v1/thread/rating/query/org`

查询组织下的会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### GET `/api/v1/thread/rating/query/thread/uid`

查询会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### GET `/api/v1/thread/rating/query/uid`

查询指定会话评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadRatingRequest |  |

**响应**：`ThreadRatingResponse`

### POST `/api/v1/thread/rating/update`

更新会话评价

**请求体**（application/json）：

- 结构：`ThreadRatingRequest`

**响应**：`ThreadRatingResponse`

## 会话小结管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/summary/auto` | 智能会话小结 |
| `POST` | `/api/v1/thread/summary/create` | 创建会话小结 |
| `POST` | `/api/v1/thread/summary/delete` | 删除会话小结 |
| `GET` | `/api/v1/thread/summary/export` | 导出会话小结 |
| `GET` | `/api/v1/thread/summary/query` | 查询用户下的会话小结 |
| `GET` | `/api/v1/thread/summary/query/org` | 查询组织下的会话小结 |
| `GET` | `/api/v1/thread/summary/query/thread/uid` | 查询会话小结 |
| `GET` | `/api/v1/thread/summary/query/uid` | 查询指定会话小结 |
| `POST` | `/api/v1/thread/summary/update` | 更新会话小结 |

### POST `/api/v1/thread/summary/auto`

智能会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`ThreadSummaryRequest`

### POST `/api/v1/thread/summary/create`

创建会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`ThreadSummaryResponse`

### POST `/api/v1/thread/summary/delete`

删除会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`object`

### GET `/api/v1/thread/summary/export`

导出会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`object`

### GET `/api/v1/thread/summary/query`

查询用户下的会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryResponse`

### GET `/api/v1/thread/summary/query/org`

查询组织下的会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryResponse`

### GET `/api/v1/thread/summary/query/thread/uid`

查询会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryEntity`

### GET `/api/v1/thread/summary/query/uid`

查询指定会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryResponse`

### POST `/api/v1/thread/summary/update`

更新会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`ThreadSummaryResponse`

## 会话小结

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/summary/auto` | 智能会话小结 |
| `POST` | `/api/v1/thread/summary/create` | 创建会话小结 |
| `POST` | `/api/v1/thread/summary/delete` | 删除会话小结 |
| `GET` | `/api/v1/thread/summary/export` | 导出会话小结 |
| `GET` | `/api/v1/thread/summary/query` | 查询用户下的会话小结 |
| `GET` | `/api/v1/thread/summary/query/org` | 查询组织下的会话小结 |
| `GET` | `/api/v1/thread/summary/query/thread/uid` | 查询会话小结 |
| `GET` | `/api/v1/thread/summary/query/uid` | 查询指定会话小结 |
| `POST` | `/api/v1/thread/summary/update` | 更新会话小结 |

### POST `/api/v1/thread/summary/auto`

智能会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`ThreadSummaryRequest`

### POST `/api/v1/thread/summary/create`

创建会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`ThreadSummaryResponse`

### POST `/api/v1/thread/summary/delete`

删除会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`object`

### GET `/api/v1/thread/summary/export`

导出会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`object`

### GET `/api/v1/thread/summary/query`

查询用户下的会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryResponse`

### GET `/api/v1/thread/summary/query/org`

查询组织下的会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryResponse`

### GET `/api/v1/thread/summary/query/thread/uid`

查询会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryEntity`

### GET `/api/v1/thread/summary/query/uid`

查询指定会话小结

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadSummaryRequest |  |

**响应**：`ThreadSummaryResponse`

### POST `/api/v1/thread/summary/update`

更新会话小结

**请求体**（application/json）：

- 结构：`ThreadSummaryRequest`

**响应**：`ThreadSummaryResponse`

## 会话转接管理

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/thread/transfer/accept` |  |
| `POST` | `/api/v1/thread/transfer/cancel` |  |
| `POST` | `/api/v1/thread/transfer/create` |  |
| `POST` | `/api/v1/thread/transfer/delete` |  |
| `GET` | `/api/v1/thread/transfer/export` |  |
| `GET` | `/api/v1/thread/transfer/query` |  |
| `GET` | `/api/v1/thread/transfer/query/org` |  |
| `GET` | `/api/v1/thread/transfer/query/uid` |  |
| `POST` | `/api/v1/thread/transfer/reject` |  |
| `POST` | `/api/v1/thread/transfer/update` |  |

### POST `/api/v1/thread/transfer/accept`

**请求体**（application/json）：

- 结构：`ThreadTransferRequest`

**响应**：`object`

### POST `/api/v1/thread/transfer/cancel`

**请求体**（application/json）：

- 结构：`ThreadTransferRequest`

**响应**：`object`

### POST `/api/v1/thread/transfer/create`

**请求体**（application/json）：

- 结构：`ThreadTransferRequest`

**响应**：`object`

### POST `/api/v1/thread/transfer/delete`

**请求体**（application/json）：

- 结构：`ThreadTransferRequest`

**响应**：`object`

### GET `/api/v1/thread/transfer/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadTransferRequest |  |

**响应**：`object`

### GET `/api/v1/thread/transfer/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadTransferRequest |  |

**响应**：`object`

### GET `/api/v1/thread/transfer/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadTransferRequest |  |

**响应**：`object`

### GET `/api/v1/thread/transfer/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ThreadTransferRequest |  |

**响应**：`object`

### POST `/api/v1/thread/transfer/reject`

**请求体**（application/json）：

- 结构：`ThreadTransferRequest`

**响应**：`object`

### POST `/api/v1/thread/transfer/update`

**请求体**（application/json）：

- 结构：`ThreadTransferRequest`

**响应**：`object`

## ticket-rest-controller

共 28 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ticket/auto/fill` |  |
| `POST` | `/api/v1/ticket/cancel` |  |
| `POST` | `/api/v1/ticket/claim` |  |
| `POST` | `/api/v1/ticket/close` |  |
| `POST` | `/api/v1/ticket/create` |  |
| `POST` | `/api/v1/ticket/delete` |  |
| `POST` | `/api/v1/ticket/escalate` |  |
| `GET` | `/api/v1/ticket/export` |  |
| `GET` | `/api/v1/ticket/history/activity` |  |
| `GET` | `/api/v1/ticket/history/process` |  |
| `GET` | `/api/v1/ticket/history/task` |  |
| `POST` | `/api/v1/ticket/hold` |  |
| `POST` | `/api/v1/ticket/pend` |  |
| `GET` | `/api/v1/ticket/query` |  |
| `GET` | `/api/v1/ticket/query/org` |  |
| `GET` | `/api/v1/ticket/query/thread/uid` |  |
| `GET` | `/api/v1/ticket/query/topic` |  |
| `GET` | `/api/v1/ticket/query/uid` |  |
| `POST` | `/api/v1/ticket/reopen` |  |
| `POST` | `/api/v1/ticket/resolve` |  |
| `POST` | `/api/v1/ticket/resume` |  |
| `POST` | `/api/v1/ticket/start` |  |
| `POST` | `/api/v1/ticket/transfer` |  |
| `POST` | `/api/v1/ticket/unclaim` |  |
| `POST` | `/api/v1/ticket/update` |  |
| `POST` | `/api/v1/ticket/verify` |  |
| `POST` | `/api/v1/ticket/{id}/attachments` |  |
| `POST` | `/api/v1/ticket/{id}/comments` |  |

### POST `/api/v1/ticket/auto/fill`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/cancel`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/claim`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/close`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/create`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/delete`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/escalate`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### GET `/api/v1/ticket/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/history/activity`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/history/process`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/history/task`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### POST `/api/v1/ticket/hold`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/pend`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### GET `/api/v1/ticket/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/query/thread/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/query/topic`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketRequest |  |

**响应**：`object`

### POST `/api/v1/ticket/reopen`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/resolve`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/resume`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/start`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/transfer`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/unclaim`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/update`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/verify`

**请求体**（application/json）：

- 结构：`TicketRequest`

**响应**：`object`

### POST `/api/v1/ticket/{id}/attachments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `id` | True | integer |  |

**请求体**（application/json）：


**响应**：`TicketAttachmentEntity`

### POST `/api/v1/ticket/{id}/comments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `id` | True | integer |  |

**请求体**（application/json）：

- 结构：`TicketCommentRequest`

**响应**：`TicketCommentEntity`

## 工单流程管理接口

共 17 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/ticket/flow/definition/latest` | 获取最新的流程定义 |
| `POST` | `/api/v1/ticket/flow/deploy` | 部署工单流程 |
| `GET` | `/api/v1/ticket/flow/history/{ticketId}` | 查询工单历史 |
| `DELETE` | `/api/v1/ticket/flow/process/{processInstanceId}` | 终止工单流程 |
| `PUT` | `/api/v1/ticket/flow/process/{processInstanceId}/activate` | 激活工单流程 |
| `GET` | `/api/v1/ticket/flow/process/{processInstanceId}/comments` | 获取流程实例评论列表 |
| `PUT` | `/api/v1/ticket/flow/process/{processInstanceId}/suspend` | 挂起工单流程 |
| `POST` | `/api/v1/ticket/flow/start` | 启动工单流程 |
| `PUT` | `/api/v1/ticket/flow/task/{taskId}/assign` | 分配工单任务 |
| `POST` | `/api/v1/ticket/flow/task/{taskId}/comment` | 添加工单评论 |
| `GET` | `/api/v1/ticket/flow/task/{taskId}/comments` | 获取任务评论列表 |
| `PUT` | `/api/v1/ticket/flow/task/{taskId}/complete` | 完成工单任务 |
| `PUT` | `/api/v1/ticket/flow/task/{taskId}/review` | 主管审核 |
| `PUT` | `/api/v1/ticket/flow/task/{taskId}/survey` | 提交满意度评价 |
| `PUT` | `/api/v1/ticket/flow/task/{taskId}/verify` | 客户验证工单处理结果 |
| `GET` | `/api/v1/ticket/flow/tasks` | 查询用户的工单任务 |
| `GET` | `/api/v1/ticket/flow/tasks/group/{groupId}` | 查询组任务 |

### GET `/api/v1/ticket/flow/definition/latest`

获取最新的流程定义

**响应**：`JsonResultProcessDefinition`

### POST `/api/v1/ticket/flow/deploy`

部署工单流程

**响应**：`JsonResultBoolean`

### GET `/api/v1/ticket/flow/history/{ticketId}`

查询工单历史

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `ticketId` | True | string |  |

**响应**：`JsonResultListHistoricProcessInstance`

### DELETE `/api/v1/ticket/flow/process/{processInstanceId}`

终止工单流程

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `processInstanceId` | True | string |  |
| query | `reason` | True | string |  |

**响应**：`JsonResultBoolean`

### PUT `/api/v1/ticket/flow/process/{processInstanceId}/activate`

激活工单流程

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `processInstanceId` | True | string |  |

**响应**：`JsonResultBoolean`

### GET `/api/v1/ticket/flow/process/{processInstanceId}/comments`

获取流程实例评论列表

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `processInstanceId` | True | string |  |

**响应**：`JsonResultListComment`

### PUT `/api/v1/ticket/flow/process/{processInstanceId}/suspend`

挂起工单流程

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `processInstanceId` | True | string |  |

**响应**：`JsonResultBoolean`

### POST `/api/v1/ticket/flow/start`

启动工单流程

**请求体**（application/json）：

- 结构：`TicketEntity`

**响应**：`JsonResultBoolean`

### PUT `/api/v1/ticket/flow/task/{taskId}/assign`

分配工单任务

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |
| query | `assignee` | True | string |  |

**响应**：`JsonResultBoolean`

### POST `/api/v1/ticket/flow/task/{taskId}/comment`

添加工单评论

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |
| query | `message` | True | string |  |
| query | `userId` | True | string |  |

**响应**：`JsonResultBoolean`

### GET `/api/v1/ticket/flow/task/{taskId}/comments`

获取任务评论列表

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |

**响应**：`JsonResultListComment`

### PUT `/api/v1/ticket/flow/task/{taskId}/complete`

完成工单任务

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |

**请求体**（application/json）：


**响应**：`JsonResultBoolean`

### PUT `/api/v1/ticket/flow/task/{taskId}/review`

主管审核

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |
| query | `reassign` | True | boolean |  |

**响应**：`JsonResultBoolean`

### PUT `/api/v1/ticket/flow/task/{taskId}/survey`

提交满意度评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |
| query | `rating` | True | integer |  |
| query | `comment` | True | string |  |

**响应**：`JsonResultBoolean`

### PUT `/api/v1/ticket/flow/task/{taskId}/verify`

客户验证工单处理结果

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |
| query | `approved` | True | boolean |  |

**响应**：`JsonResultBoolean`

### GET `/api/v1/ticket/flow/tasks`

查询用户的工单任务

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `assignee` | True | string |  |

**响应**：`JsonResultListTask`

### GET `/api/v1/ticket/flow/tasks/group/{groupId}`

查询组任务

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `groupId` | True | string |  |

**响应**：`JsonResultListTask`

## 工单表单管理接口

共 4 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/ticket/form/task/{taskId}` | 获取任务表单 |
| `GET` | `/api/v1/ticket/form/task/{taskId}/properties` | 获取表单属性 |
| `POST` | `/api/v1/ticket/form/task/{taskId}/save` | 保存表单数据 |
| `POST` | `/api/v1/ticket/form/task/{taskId}/submit` | 提交任务表单 |

### GET `/api/v1/ticket/form/task/{taskId}`

获取任务表单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |

**响应**：`JsonResultTaskFormData`

### GET `/api/v1/ticket/form/task/{taskId}/properties`

获取表单属性

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |

**响应**：`JsonResultListFormProperty`

### POST `/api/v1/ticket/form/task/{taskId}/save`

保存表单数据

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |

**请求体**（application/json）：


**响应**：`JsonResultBoolean`

### POST `/api/v1/ticket/form/task/{taskId}/submit`

提交任务表单

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `taskId` | True | string |  |

**请求体**（application/json）：


**响应**：`JsonResultBoolean`

## ticket-process-rest-controller

共 14 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ticket/process/create` |  |
| `POST` | `/api/v1/ticket/process/delete` |  |
| `POST` | `/api/v1/ticket/process/deploy` |  |
| `GET` | `/api/v1/ticket/process/export` |  |
| `GET` | `/api/v1/ticket/process/query` |  |
| `GET` | `/api/v1/ticket/process/query/deployments` |  |
| `PUT` | `/api/v1/ticket/process/query/deployments` |  |
| `POST` | `/api/v1/ticket/process/query/deployments` |  |
| `DELETE` | `/api/v1/ticket/process/query/deployments` |  |
| `PATCH` | `/api/v1/ticket/process/query/deployments` |  |
| `GET` | `/api/v1/ticket/process/query/org` |  |
| `GET` | `/api/v1/ticket/process/query/uid` |  |
| `POST` | `/api/v1/ticket/process/undeploy` |  |
| `POST` | `/api/v1/ticket/process/update` |  |

### POST `/api/v1/ticket/process/create`

**请求体**（application/json）：

- 结构：`TicketProcessRequest`

**响应**：`object`

### POST `/api/v1/ticket/process/delete`

**请求体**（application/json）：

- 结构：`TicketProcessRequest`

**响应**：`object`

### POST `/api/v1/ticket/process/deploy`

**请求体**（application/json）：

- 结构：`TicketProcessRequest`

**响应**：`object`

### GET `/api/v1/ticket/process/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/process/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/process/query/deployments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### PUT `/api/v1/ticket/process/query/deployments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### POST `/api/v1/ticket/process/query/deployments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### DELETE `/api/v1/ticket/process/query/deployments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### PATCH `/api/v1/ticket/process/query/deployments`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/process/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/process/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketProcessRequest |  |

**响应**：`object`

### POST `/api/v1/ticket/process/undeploy`

**请求体**（application/json）：

- 结构：`TicketProcessRequest`

**响应**：`object`

### POST `/api/v1/ticket/process/update`

**请求体**（application/json）：

- 结构：`TicketProcessRequest`

**响应**：`object`

## ticket-statistic-rest-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/ticket/statistic/calculate` |  |
| `POST` | `/api/v1/ticket/statistic/create` |  |
| `POST` | `/api/v1/ticket/statistic/delete` |  |
| `GET` | `/api/v1/ticket/statistic/export` |  |
| `GET` | `/api/v1/ticket/statistic/query` |  |
| `GET` | `/api/v1/ticket/statistic/query/date` |  |
| `GET` | `/api/v1/ticket/statistic/query/org` |  |
| `GET` | `/api/v1/ticket/statistic/query/uid` |  |
| `POST` | `/api/v1/ticket/statistic/update` |  |

### POST `/api/v1/ticket/statistic/calculate`

**响应**：`object`

### POST `/api/v1/ticket/statistic/create`

**请求体**（application/json）：

- 结构：`TicketStatisticRequest`

**响应**：`object`

### POST `/api/v1/ticket/statistic/delete`

**请求体**（application/json）：

- 结构：`TicketStatisticRequest`

**响应**：`object`

### GET `/api/v1/ticket/statistic/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/statistic/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/statistic/query/date`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/statistic/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketStatisticRequest |  |

**响应**：`object`

### GET `/api/v1/ticket/statistic/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TicketStatisticRequest |  |

**响应**：`object`

### POST `/api/v1/ticket/statistic/update`

**请求体**（application/json）：

- 结构：`TicketStatisticRequest`

**响应**：`object`

## tiktok-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/tiktok/create` |  |
| `POST` | `/api/v1/tiktok/delete` |  |
| `GET` | `/api/v1/tiktok/export` |  |
| `GET` | `/api/v1/tiktok/query` |  |
| `GET` | `/api/v1/tiktok/query/org` |  |
| `GET` | `/api/v1/tiktok/query/uid` |  |
| `GET` | `/api/v1/tiktok/refreshToken` |  |
| `POST` | `/api/v1/tiktok/update` |  |

### POST `/api/v1/tiktok/create`

**请求体**（application/json）：

- 结构：`TiktokRequest`

**响应**：`object`

### POST `/api/v1/tiktok/delete`

**请求体**（application/json）：

- 结构：`TiktokRequest`

**响应**：`object`

### GET `/api/v1/tiktok/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TiktokRequest |  |

**响应**：`object`

### GET `/api/v1/tiktok/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TiktokRequest |  |

**响应**：`object`

### GET `/api/v1/tiktok/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TiktokRequest |  |

**响应**：`object`

### GET `/api/v1/tiktok/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TiktokRequest |  |

**响应**：`object`

### GET `/api/v1/tiktok/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TiktokRequest |  |

**响应**：`object`

### POST `/api/v1/tiktok/update`

**请求体**（application/json）：

- 结构：`TiktokRequest`

**响应**：`object`

## todo-list-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/todo/list/create` |  |
| `POST` | `/api/v1/todo/list/delete` |  |
| `GET` | `/api/v1/todo/list/export` |  |
| `GET` | `/api/v1/todo/list/query` |  |
| `GET` | `/api/v1/todo/list/query/org` |  |
| `GET` | `/api/v1/todo/list/query/uid` |  |
| `POST` | `/api/v1/todo/list/update` |  |

### POST `/api/v1/todo/list/create`

**请求体**（application/json）：

- 结构：`TodoListRequest`

**响应**：`object`

### POST `/api/v1/todo/list/delete`

**请求体**（application/json）：

- 结构：`TodoListRequest`

**响应**：`object`

### GET `/api/v1/todo/list/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TodoListRequest |  |

**响应**：`object`

### GET `/api/v1/todo/list/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TodoListRequest |  |

**响应**：`object`

### GET `/api/v1/todo/list/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TodoListRequest |  |

**响应**：`object`

### GET `/api/v1/todo/list/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TodoListRequest |  |

**响应**：`object`

### POST `/api/v1/todo/list/update`

**请求体**（application/json）：

- 结构：`TodoListRequest`

**响应**：`object`

## Token Management

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/token/create` |  |
| `POST` | `/api/v1/token/delete` |  |
| `GET` | `/api/v1/token/export` |  |
| `POST` | `/api/v1/token/generate` |  |
| `GET` | `/api/v1/token/query` |  |
| `GET` | `/api/v1/token/query/org` |  |
| `GET` | `/api/v1/token/query/uid` |  |
| `POST` | `/api/v1/token/update` |  |

### POST `/api/v1/token/create`

**请求体**（application/json）：

- 结构：`TokenRequest`

**响应**：`object`

### POST `/api/v1/token/delete`

**请求体**（application/json）：

- 结构：`TokenRequest`

**响应**：`object`

### GET `/api/v1/token/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TokenRequest |  |

**响应**：`object`

### POST `/api/v1/token/generate`

**请求体**（application/json）：

- 结构：`TokenRequest`

**响应**：`object`

### GET `/api/v1/token/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TokenRequest |  |

**响应**：`object`

### GET `/api/v1/token/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TokenRequest |  |

**响应**：`object`

### GET `/api/v1/token/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TokenRequest |  |

**响应**：`object`

### POST `/api/v1/token/update`

**请求体**（application/json）：

- 结构：`TokenRequest`

**响应**：`object`

## 主题管理

共 10 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/topic/subscription/create` | 创建主题 |
| `POST` | `/api/v1/topic/subscription/delete` | 删除主题 |
| `GET` | `/api/v1/topic/subscription/export` | 导出主题列表 |
| `GET` | `/api/v1/topic/subscription/is/subscribed` |  |
| `GET` | `/api/v1/topic/subscription/query` | 根据用户查询主题 |
| `GET` | `/api/v1/topic/subscription/query/org` | 根据组织查询主题 |
| `GET` | `/api/v1/topic/subscription/query/uid` | 根据UID查询主题 |
| `POST` | `/api/v1/topic/subscription/subscribe` | 订阅主题 |
| `POST` | `/api/v1/topic/subscription/unsubscribe` | 取消订阅主题 |
| `POST` | `/api/v1/topic/subscription/update` | 更新主题 |

### POST `/api/v1/topic/subscription/create`

创建主题

**请求体**（application/json）：

- 结构：`TopicRequest`

**响应**：`object`

### POST `/api/v1/topic/subscription/delete`

删除主题

**请求体**（application/json）：

- 结构：`TopicRequest`

**响应**：`object`

### GET `/api/v1/topic/subscription/export`

导出主题列表

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TopicRequest |  |

**响应**：`object`

### GET `/api/v1/topic/subscription/is/subscribed`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TopicRequest |  |

**响应**：`object`

### GET `/api/v1/topic/subscription/query`

根据用户查询主题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TopicRequest |  |

**响应**：`object`

### GET `/api/v1/topic/subscription/query/org`

根据组织查询主题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TopicRequest |  |

**响应**：`object`

### GET `/api/v1/topic/subscription/query/uid`

根据UID查询主题

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TopicRequest |  |

**响应**：`object`

### POST `/api/v1/topic/subscription/subscribe`

订阅主题

**请求体**（application/json）：

- 结构：`TopicRequest`

**响应**：`object`

### POST `/api/v1/topic/subscription/unsubscribe`

取消订阅主题

**请求体**（application/json）：

- 结构：`TopicRequest`

**响应**：`object`

### POST `/api/v1/topic/subscription/update`

更新主题

**请求体**（application/json）：

- 结构：`TopicRequest`

**响应**：`object`

## Trace Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/trace/create` | Create Trace |
| `POST` | `/api/v1/trace/delete` | Delete Trace |
| `GET` | `/api/v1/trace/export` | Export Traces |
| `GET` | `/api/v1/trace/query` | Query Traces by User |
| `GET` | `/api/v1/trace/query/org` | Query Traces by Organization |
| `GET` | `/api/v1/trace/query/uid` | Query Trace by UID |
| `POST` | `/api/v1/trace/update` | Update Trace |

### POST `/api/v1/trace/create`

Create Trace

**请求体**（application/json）：

- 结构：`TraceRequest`

**响应**：`object`

### POST `/api/v1/trace/delete`

Delete Trace

**请求体**（application/json）：

- 结构：`TraceRequest`

**响应**：`object`

### GET `/api/v1/trace/export`

Export Traces

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TraceRequest |  |

**响应**：`object`

### GET `/api/v1/trace/query`

Query Traces by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TraceRequest |  |

**响应**：`object`

### GET `/api/v1/trace/query/org`

Query Traces by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TraceRequest |  |

**响应**：`object`

### GET `/api/v1/trace/query/uid`

Query Trace by UID

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TraceRequest |  |

**响应**：`object`

### POST `/api/v1/trace/update`

Update Trace

**请求体**（application/json）：

- 结构：`TraceRequest`

**响应**：`object`

## 转接关键词

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/transfer/keyword/create` | 创建转接关键词 |
| `POST` | `/api/v1/transfer/keyword/delete` | 删除转接关键词 |
| `GET` | `/api/v1/transfer/keyword/export` | 导出转接关键词 |
| `GET` | `/api/v1/transfer/keyword/query` | 查询用户下的转接关键词 |
| `GET` | `/api/v1/transfer/keyword/query/org` | 查询组织下的转接关键词 |
| `GET` | `/api/v1/transfer/keyword/query/uid` | 查询指定转接关键词 |
| `POST` | `/api/v1/transfer/keyword/update` | 更新转接关键词 |

### POST `/api/v1/transfer/keyword/create`

创建转接关键词

**请求体**（application/json）：

- 结构：`TransferKeywordRequest`

**响应**：`TransferKeywordResponse`

### POST `/api/v1/transfer/keyword/delete`

删除转接关键词

**请求体**（application/json）：

- 结构：`TransferKeywordRequest`

**响应**：`object`

### GET `/api/v1/transfer/keyword/export`

导出转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`object`

### GET `/api/v1/transfer/keyword/query`

查询用户下的转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`TransferKeywordResponse`

### GET `/api/v1/transfer/keyword/query/org`

查询组织下的转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`TransferKeywordResponse`

### GET `/api/v1/transfer/keyword/query/uid`

查询指定转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`TransferKeywordResponse`

### POST `/api/v1/transfer/keyword/update`

更新转接关键词

**请求体**（application/json）：

- 结构：`TransferKeywordRequest`

**响应**：`TransferKeywordResponse`

## 转接关键词管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/transfer/keyword/create` | 创建转接关键词 |
| `POST` | `/api/v1/transfer/keyword/delete` | 删除转接关键词 |
| `GET` | `/api/v1/transfer/keyword/export` | 导出转接关键词 |
| `GET` | `/api/v1/transfer/keyword/query` | 查询用户下的转接关键词 |
| `GET` | `/api/v1/transfer/keyword/query/org` | 查询组织下的转接关键词 |
| `GET` | `/api/v1/transfer/keyword/query/uid` | 查询指定转接关键词 |
| `POST` | `/api/v1/transfer/keyword/update` | 更新转接关键词 |

### POST `/api/v1/transfer/keyword/create`

创建转接关键词

**请求体**（application/json）：

- 结构：`TransferKeywordRequest`

**响应**：`TransferKeywordResponse`

### POST `/api/v1/transfer/keyword/delete`

删除转接关键词

**请求体**（application/json）：

- 结构：`TransferKeywordRequest`

**响应**：`object`

### GET `/api/v1/transfer/keyword/export`

导出转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`object`

### GET `/api/v1/transfer/keyword/query`

查询用户下的转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`TransferKeywordResponse`

### GET `/api/v1/transfer/keyword/query/org`

查询组织下的转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`TransferKeywordResponse`

### GET `/api/v1/transfer/keyword/query/uid`

查询指定转接关键词

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TransferKeywordRequest |  |

**响应**：`TransferKeywordResponse`

### POST `/api/v1/transfer/keyword/update`

更新转接关键词

**请求体**（application/json）：

- 结构：`TransferKeywordRequest`

**响应**：`TransferKeywordResponse`

## 统一消息管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/unified/create` | 创建统一消息 |
| `POST` | `/api/v1/unified/delete` | 删除统一消息 |
| `GET` | `/api/v1/unified/export` | 导出统一消息 |
| `GET` | `/api/v1/unified/query` | 查询用户下的统一消息 |
| `GET` | `/api/v1/unified/query/org` | 查询组织下的统一消息 |
| `GET` | `/api/v1/unified/query/uid` |  |
| `POST` | `/api/v1/unified/update` | 更新统一消息 |
| `POST` | `/api/v1/unified/update/avatar` | 更新统一头像 |

### POST `/api/v1/unified/create`

创建统一消息

**请求体**（application/json）：

- 结构：`UnifiedRequest`

**响应**：`UnifiedResponse`

### POST `/api/v1/unified/delete`

删除统一消息

**请求体**（application/json）：

- 结构：`UnifiedRequest`

**响应**：`object`

### GET `/api/v1/unified/export`

导出统一消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UnifiedRequest |  |

**响应**：`object`

### GET `/api/v1/unified/query`

查询用户下的统一消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UnifiedRequest |  |

**响应**：`UnifiedResponse`

### GET `/api/v1/unified/query/org`

查询组织下的统一消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UnifiedRequest |  |

**响应**：`UnifiedResponse`

### GET `/api/v1/unified/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UnifiedRequest |  |

**响应**：`object`

### POST `/api/v1/unified/update`

更新统一消息

**请求体**（application/json）：

- 结构：`UnifiedRequest`

**响应**：`UnifiedResponse`

### POST `/api/v1/unified/update/avatar`

更新统一头像

**请求体**（application/json）：

- 结构：`UnifiedRequest`

**响应**：`UnifiedResponse`

## Upload Management

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/upload/create` | 创建文件记录 |
| `POST` | `/api/v1/upload/delete` | 删除文件 |
| `GET` | `/api/v1/upload/export` | 导出文件记录 |
| `POST` | `/api/v1/upload/file` | 上传文件 |
| `GET` | `/api/v1/upload/query` | 查询用户下的文件 |
| `GET` | `/api/v1/upload/query/org` | 查询组织下的文件 |
| `GET` | `/api/v1/upload/query/uid` | 查询指定文件 |
| `POST` | `/api/v1/upload/update` | 更新文件记录 |

### POST `/api/v1/upload/create`

创建文件记录

**请求体**（application/json）：

- 结构：`UploadRequest`

**响应**：`UploadResponse`

### POST `/api/v1/upload/delete`

删除文件

**请求体**（application/json）：

- 结构：`UploadRequest`

**响应**：`object`

### GET `/api/v1/upload/export`

导出文件记录

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest |  |

**响应**：`object`

### POST `/api/v1/upload/file`

上传文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest |  |

**请求体**（application/json）：


**响应**：`UploadResponse`

### GET `/api/v1/upload/query`

查询用户下的文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest |  |

**响应**：`UploadResponse`

### GET `/api/v1/upload/query/org`

查询组织下的文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest |  |

**响应**：`UploadResponse`

### GET `/api/v1/upload/query/uid`

查询指定文件

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UploadRequest |  |

**响应**：`UploadResponse`

### POST `/api/v1/upload/update`

更新文件记录

**请求体**（application/json）：

- 结构：`UploadRequest`

**响应**：`UploadResponse`

## URL Management

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/url/create` | Create URL |
| `POST` | `/api/v1/url/delete` | Delete URL |
| `GET` | `/api/v1/url/export` |  |
| `GET` | `/api/v1/url/query` | Query URLs by User |
| `GET` | `/api/v1/url/query/org` | Query URLs by Organization |
| `GET` | `/api/v1/url/query/uid` |  |
| `POST` | `/api/v1/url/update` | Update URL |

### POST `/api/v1/url/create`

Create URL

**请求体**（application/json）：

- 结构：`UrlRequest`

**响应**：`object`

### POST `/api/v1/url/delete`

Delete URL

**请求体**（application/json）：

- 结构：`UrlRequest`

**响应**：`object`

### GET `/api/v1/url/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UrlRequest |  |

**响应**：`object`

### GET `/api/v1/url/query`

Query URLs by User

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UrlRequest |  |

**响应**：`object`

### GET `/api/v1/url/query/org`

Query URLs by Organization

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UrlRequest |  |

**响应**：`object`

### GET `/api/v1/url/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UrlRequest |  |

**响应**：`object`

### POST `/api/v1/url/update`

Update URL

**请求体**（application/json）：

- 结构：`UrlRequest`

**响应**：`object`

## User Management

共 12 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/user/change/email` |  |
| `POST` | `/api/v1/user/change/mobile` |  |
| `POST` | `/api/v1/user/change/password` |  |
| `POST` | `/api/v1/user/create` |  |
| `POST` | `/api/v1/user/delete` |  |
| `GET` | `/api/v1/user/export` |  |
| `POST` | `/api/v1/user/logout` |  |
| `GET` | `/api/v1/user/profile` |  |
| `GET` | `/api/v1/user/query` |  |
| `GET` | `/api/v1/user/query/org` |  |
| `GET` | `/api/v1/user/query/uid` |  |
| `POST` | `/api/v1/user/update` |  |

### POST `/api/v1/user/change/email`

**请求体**（application/json）：

- 结构：`UserRequest`

**响应**：`object`

### POST `/api/v1/user/change/mobile`

**请求体**（application/json）：

- 结构：`UserRequest`

**响应**：`object`

### POST `/api/v1/user/change/password`

**请求体**（application/json）：

- 结构：`UserRequest`

**响应**：`object`

### POST `/api/v1/user/create`

**请求体**（application/json）：

- 结构：`UserRequest`

**响应**：`object`

### POST `/api/v1/user/delete`

**请求体**（application/json）：

- 结构：`UserRequest`

**响应**：`object`

### GET `/api/v1/user/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UserRequest |  |

**响应**：`object`

### POST `/api/v1/user/logout`

**请求体**（application/json）：

- 结构：`AuthRequest`

**响应**：`object`

### GET `/api/v1/user/profile`

**响应**：`object`

### GET `/api/v1/user/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UserRequest |  |

**响应**：`object`

### GET `/api/v1/user/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UserRequest |  |

**响应**：`object`

### GET `/api/v1/user/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:UserRequest |  |

**响应**：`object`

### POST `/api/v1/user/update`

**请求体**（application/json）：

- 结构：`UserRequest`

**响应**：`object`

## balance-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/vip/balance/create` |  |
| `POST` | `/api/v1/vip/balance/delete` |  |
| `GET` | `/api/v1/vip/balance/export` |  |
| `GET` | `/api/v1/vip/balance/query` |  |
| `GET` | `/api/v1/vip/balance/query/org` |  |
| `GET` | `/api/v1/vip/balance/query/uid` |  |
| `POST` | `/api/v1/vip/balance/update` |  |

### POST `/api/v1/vip/balance/create`

**请求体**（application/json）：

- 结构：`BalanceRequest`

**响应**：`object`

### POST `/api/v1/vip/balance/delete`

**请求体**（application/json）：

- 结构：`BalanceRequest`

**响应**：`object`

### GET `/api/v1/vip/balance/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BalanceRequest |  |

**响应**：`object`

### GET `/api/v1/vip/balance/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BalanceRequest |  |

**响应**：`object`

### GET `/api/v1/vip/balance/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BalanceRequest |  |

**响应**：`object`

### GET `/api/v1/vip/balance/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:BalanceRequest |  |

**响应**：`object`

### POST `/api/v1/vip/balance/update`

**请求体**（application/json）：

- 结构：`BalanceRequest`

**响应**：`object`

## invoice-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/vip/invoice/create` |  |
| `POST` | `/api/v1/vip/invoice/delete` |  |
| `GET` | `/api/v1/vip/invoice/export` |  |
| `GET` | `/api/v1/vip/invoice/query` |  |
| `GET` | `/api/v1/vip/invoice/query/org` |  |
| `GET` | `/api/v1/vip/invoice/query/uid` |  |
| `POST` | `/api/v1/vip/invoice/update` |  |

### POST `/api/v1/vip/invoice/create`

**请求体**（application/json）：

- 结构：`InvoiceRequest`

**响应**：`object`

### POST `/api/v1/vip/invoice/delete`

**请求体**（application/json）：

- 结构：`InvoiceRequest`

**响应**：`object`

### GET `/api/v1/vip/invoice/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InvoiceRequest |  |

**响应**：`object`

### GET `/api/v1/vip/invoice/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InvoiceRequest |  |

**响应**：`object`

### GET `/api/v1/vip/invoice/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InvoiceRequest |  |

**响应**：`object`

### GET `/api/v1/vip/invoice/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:InvoiceRequest |  |

**响应**：`object`

### POST `/api/v1/vip/invoice/update`

**请求体**（application/json）：

- 结构：`InvoiceRequest`

**响应**：`object`

## payment-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/vip/payment/create` |  |
| `POST` | `/api/v1/vip/payment/delete` |  |
| `GET` | `/api/v1/vip/payment/export` |  |
| `GET` | `/api/v1/vip/payment/query` |  |
| `GET` | `/api/v1/vip/payment/query/org` |  |
| `GET` | `/api/v1/vip/payment/query/uid` |  |
| `POST` | `/api/v1/vip/payment/update` |  |

### POST `/api/v1/vip/payment/create`

**请求体**（application/json）：

- 结构：`PaymentRequest`

**响应**：`object`

### POST `/api/v1/vip/payment/delete`

**请求体**（application/json）：

- 结构：`PaymentRequest`

**响应**：`object`

### GET `/api/v1/vip/payment/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PaymentRequest |  |

**响应**：`object`

### GET `/api/v1/vip/payment/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PaymentRequest |  |

**响应**：`object`

### GET `/api/v1/vip/payment/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PaymentRequest |  |

**响应**：`object`

### GET `/api/v1/vip/payment/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:PaymentRequest |  |

**响应**：`object`

### POST `/api/v1/vip/payment/update`

**请求体**（application/json）：

- 结构：`PaymentRequest`

**响应**：`object`

## recharge-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/vip/recharge/create` |  |
| `POST` | `/api/v1/vip/recharge/delete` |  |
| `GET` | `/api/v1/vip/recharge/export` |  |
| `GET` | `/api/v1/vip/recharge/query` |  |
| `GET` | `/api/v1/vip/recharge/query/org` |  |
| `GET` | `/api/v1/vip/recharge/query/super` |  |
| `GET` | `/api/v1/vip/recharge/query/uid` |  |
| `POST` | `/api/v1/vip/recharge/update` |  |

### POST `/api/v1/vip/recharge/create`

**请求体**（application/json）：

- 结构：`RechargeRequest`

**响应**：`object`

### POST `/api/v1/vip/recharge/delete`

**请求体**（application/json）：

- 结构：`RechargeRequest`

**响应**：`object`

### GET `/api/v1/vip/recharge/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RechargeRequest |  |

**响应**：`object`

### GET `/api/v1/vip/recharge/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RechargeRequest |  |

**响应**：`object`

### GET `/api/v1/vip/recharge/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RechargeRequest |  |

**响应**：`object`

### GET `/api/v1/vip/recharge/query/super`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RechargeRequest |  |

**响应**：`object`

### GET `/api/v1/vip/recharge/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:RechargeRequest |  |

**响应**：`object`

### POST `/api/v1/vip/recharge/update`

**请求体**（application/json）：

- 结构：`RechargeRequest`

**响应**：`object`

## auth-vip-controller

共 2 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/vip/scan` |  |
| `POST` | `/api/v1/vip/scan/confirm` |  |

### GET `/api/v1/vip/scan`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `pushRequest` | True | ref:PushRequest |  |

**响应**：`object`

### POST `/api/v1/vip/scan/confirm`

**请求体**（application/json）：

- 结构：`PushRequest`

**响应**：`object`

## translate-rest-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `PUT` | `/api/v1/vip/trans` |  |
| `POST` | `/api/v1/vip/trans` |  |
| `DELETE` | `/api/v1/vip/trans` |  |
| `GET` | `/api/v1/vip/trans/baidu/recognize` |  |
| `GET` | `/api/v1/vip/trans/baidu/translate` |  |
| `GET` | `/api/v1/vip/trans/export` |  |
| `GET` | `/api/v1/vip/trans/query` |  |
| `GET` | `/api/v1/vip/trans/query/org` |  |
| `GET` | `/api/v1/vip/trans/query/uid` |  |

### PUT `/api/v1/vip/trans`

**请求体**（application/json）：

- 结构：`TranslateRequest`

**响应**：`object`

### POST `/api/v1/vip/trans`

**请求体**（application/json）：

- 结构：`TranslateRequest`

**响应**：`object`

### DELETE `/api/v1/vip/trans`

**请求体**（application/json）：

- 结构：`TranslateRequest`

**响应**：`object`

### GET `/api/v1/vip/trans/baidu/recognize`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `q` | True | string |  |

**响应**：`object`

### GET `/api/v1/vip/trans/baidu/translate`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TranslateRequest |  |

**响应**：`object`

### GET `/api/v1/vip/trans/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TranslateRequest |  |

**响应**：`object`

### GET `/api/v1/vip/trans/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TranslateRequest |  |

**响应**：`object`

### GET `/api/v1/vip/trans/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TranslateRequest |  |

**响应**：`object`

### GET `/api/v1/vip/trans/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:TranslateRequest |  |

**响应**：`object`

## 访客管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/visitor/create` | 创建访客 |
| `POST` | `/api/v1/visitor/delete` | 删除访客 |
| `GET` | `/api/v1/visitor/export` | 导出访客 |
| `GET` | `/api/v1/visitor/query` | 查询用户下的访客 |
| `GET` | `/api/v1/visitor/query/org` | 查询组织下的访客 |
| `GET` | `/api/v1/visitor/query/uid` | 查询指定访客 |
| `POST` | `/api/v1/visitor/update` | 更新访客 |
| `POST` | `/api/v1/visitor/update/tagList` | 更新访客标签 |

### POST `/api/v1/visitor/create`

创建访客

**请求体**（application/json）：

- 结构：`VisitorRequest`

**响应**：`VisitorResponse`

### POST `/api/v1/visitor/delete`

删除访客

**请求体**（application/json）：

- 结构：`VisitorRequest`

**响应**：`object`

### GET `/api/v1/visitor/export`

导出访客

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRequest |  |

**响应**：`object`

### GET `/api/v1/visitor/query`

查询用户下的访客

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `visitorRequest` | True | ref:VisitorRequest |  |

**响应**：`VisitorResponse`

### GET `/api/v1/visitor/query/org`

查询组织下的访客

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRequest |  |

**响应**：`VisitorResponse`

### GET `/api/v1/visitor/query/uid`

查询指定访客

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRequest |  |

**响应**：`VisitorResponse`

### POST `/api/v1/visitor/update`

更新访客

**请求体**（application/json）：

- 结构：`VisitorRequest`

**响应**：`VisitorResponse`

### POST `/api/v1/visitor/update/tagList`

更新访客标签

**请求体**（application/json）：

- 结构：`VisitorRequest`

**响应**：`VisitorResponse`

## 访客消息管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/visitor/message/create` | 创建访客消息 |
| `POST` | `/api/v1/visitor/message/delete` | 删除访客消息 |
| `GET` | `/api/v1/visitor/message/export` | 导出访客消息 |
| `GET` | `/api/v1/visitor/message/query` | 查询用户下的访客消息 |
| `GET` | `/api/v1/visitor/message/query/org` | 查询组织下的访客消息 |
| `GET` | `/api/v1/visitor/message/query/thread/uid` |  |
| `GET` | `/api/v1/visitor/message/query/topic` |  |
| `GET` | `/api/v1/visitor/message/query/uid` | 查询指定访客消息 |
| `POST` | `/api/v1/visitor/message/update` | 更新访客消息 |

### POST `/api/v1/visitor/message/create`

创建访客消息

**请求体**（application/json）：

- 结构：`MessageRequest`

**响应**：`MessageResponse`

### POST `/api/v1/visitor/message/delete`

删除访客消息

**请求体**（application/json）：

- 结构：`MessageRequest`

**响应**：`object`

### GET `/api/v1/visitor/message/export`

导出访客消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/visitor/message/query`

查询用户下的访客消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`MessageResponse`

### GET `/api/v1/visitor/message/query/org`

查询组织下的访客消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`MessageResponse`

### GET `/api/v1/visitor/message/query/thread/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/visitor/message/query/topic`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`object`

### GET `/api/v1/visitor/message/query/uid`

查询指定访客消息

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:MessageRequest |  |

**响应**：`MessageResponse`

### POST `/api/v1/visitor/message/update`

更新访客消息

**请求体**（application/json）：

- 结构：`MessageRequest`

**响应**：`MessageResponse`

## 访客评价管理

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/visitor/rating/create` | 创建访客评价 |
| `POST` | `/api/v1/visitor/rating/delete` | 删除访客评价 |
| `GET` | `/api/v1/visitor/rating/export` | 导出访客评价 |
| `GET` | `/api/v1/visitor/rating/invite` |  |
| `GET` | `/api/v1/visitor/rating/query` | 查询用户下的访客评价 |
| `GET` | `/api/v1/visitor/rating/query/org` | 查询组织下的访客评价 |
| `GET` | `/api/v1/visitor/rating/query/uid` | 查询指定访客评价 |
| `POST` | `/api/v1/visitor/rating/update` | 更新访客评价 |

### POST `/api/v1/visitor/rating/create`

创建访客评价

**请求体**（application/json）：

- 结构：`VisitorRatingRequest`

**响应**：`VisitorRatingResponse`

### POST `/api/v1/visitor/rating/delete`

删除访客评价

**请求体**（application/json）：

- 结构：`VisitorRatingRequest`

**响应**：`object`

### GET `/api/v1/visitor/rating/export`

导出访客评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRatingRequest |  |

**响应**：`object`

### GET `/api/v1/visitor/rating/invite`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRatingRequest |  |

**响应**：`object`

### GET `/api/v1/visitor/rating/query`

查询用户下的访客评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRatingRequest |  |

**响应**：`VisitorRatingResponse`

### GET `/api/v1/visitor/rating/query/org`

查询组织下的访客评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRatingRequest |  |

**响应**：`VisitorRatingResponse`

### GET `/api/v1/visitor/rating/query/uid`

查询指定访客评价

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:VisitorRatingRequest |  |

**响应**：`VisitorRatingResponse`

### POST `/api/v1/visitor/rating/update`

更新访客评价

**请求体**（application/json）：

- 结构：`VisitorRatingRequest`

**响应**：`VisitorRatingResponse`

## voc-api-controller

共 4 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/voc/feedback` |  |
| `POST` | `/api/v1/voc/feedback/{feedbackId}/assign` |  |
| `POST` | `/api/v1/voc/feedback/{feedbackId}/reply` |  |
| `POST` | `/api/v1/voc/feedback/{feedbackId}/status` |  |

### POST `/api/v1/voc/feedback`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `content` | True | string |  |
| query | `type` | True | string |  |

**响应**：`FeedbackEntity`

### POST `/api/v1/voc/feedback/{feedbackId}/assign`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feedbackId` | True | integer |  |
| query | `assignedTo` | True | integer |  |

**响应**：`—`

### POST `/api/v1/voc/feedback/{feedbackId}/reply`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feedbackId` | True | integer |  |
| query | `content` | True | string |  |
| query | `parentId` | False | integer |  |
| query | `internal` | False | boolean |  |

**响应**：`ReplyEntity`

### POST `/api/v1/voc/feedback/{feedbackId}/status`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `feedbackId` | True | integer |  |
| query | `status` | True | string |  |

**响应**：`—`

## feedback-stats-controller

共 4 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/voc/stats/overall` |  |
| `GET` | `/api/v1/voc/stats/response-time-trend` |  |
| `GET` | `/api/v1/voc/stats/status-distribution` |  |
| `GET` | `/api/v1/voc/stats/type-distribution` |  |

### GET `/api/v1/voc/stats/overall`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`FeedbackStats`

### GET `/api/v1/voc/stats/response-time-trend`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`object`

### GET `/api/v1/voc/stats/status-distribution`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`object`

### GET `/api/v1/voc/stats/type-distribution`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `startTime` | True | string |  |
| query | `endTime` | True | string |  |

**响应**：`object`

## webhook-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/webhook/create` |  |
| `POST` | `/api/v1/webhook/delete` |  |
| `GET` | `/api/v1/webhook/export` |  |
| `GET` | `/api/v1/webhook/query` |  |
| `GET` | `/api/v1/webhook/query/org` |  |
| `GET` | `/api/v1/webhook/query/uid` |  |
| `POST` | `/api/v1/webhook/update` |  |

### POST `/api/v1/webhook/create`

**请求体**（application/json）：

- 结构：`WebhookRequest`

**响应**：`object`

### POST `/api/v1/webhook/delete`

**请求体**（application/json）：

- 结构：`WebhookRequest`

**响应**：`object`

### GET `/api/v1/webhook/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookRequest |  |

**响应**：`object`

### GET `/api/v1/webhook/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookRequest |  |

**响应**：`object`

### GET `/api/v1/webhook/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookRequest |  |

**响应**：`object`

### GET `/api/v1/webhook/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookRequest |  |

**响应**：`object`

### POST `/api/v1/webhook/update`

**请求体**（application/json）：

- 结构：`WebhookRequest`

**响应**：`object`

## webhook-message-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/webhook/message/create` |  |
| `POST` | `/api/v1/webhook/message/delete` |  |
| `GET` | `/api/v1/webhook/message/export` |  |
| `GET` | `/api/v1/webhook/message/query` |  |
| `GET` | `/api/v1/webhook/message/query/org` |  |
| `GET` | `/api/v1/webhook/message/query/uid` |  |
| `POST` | `/api/v1/webhook/message/update` |  |

### POST `/api/v1/webhook/message/create`

**请求体**（application/json）：

- 结构：`WebhookMessageRequest`

**响应**：`object`

### POST `/api/v1/webhook/message/delete`

**请求体**（application/json）：

- 结构：`WebhookMessageRequest`

**响应**：`object`

### GET `/api/v1/webhook/message/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookMessageRequest |  |

**响应**：`object`

### GET `/api/v1/webhook/message/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookMessageRequest |  |

**响应**：`object`

### GET `/api/v1/webhook/message/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookMessageRequest |  |

**响应**：`object`

### GET `/api/v1/webhook/message/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WebhookMessageRequest |  |

**响应**：`object`

### POST `/api/v1/webhook/message/update`

**请求体**（application/json）：

- 结构：`WebhookMessageRequest`

**响应**：`object`

## we-chat-account-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/account/create` |  |
| `POST` | `/api/v1/wechat/account/delete` |  |
| `GET` | `/api/v1/wechat/account/export` |  |
| `GET` | `/api/v1/wechat/account/query` |  |
| `GET` | `/api/v1/wechat/account/query/org` |  |
| `GET` | `/api/v1/wechat/account/query/uid` |  |
| `POST` | `/api/v1/wechat/account/update` |  |

### POST `/api/v1/wechat/account/create`

**请求体**（application/json）：

- 结构：`WeChatAccountRequest`

**响应**：`object`

### POST `/api/v1/wechat/account/delete`

**请求体**（application/json）：

- 结构：`WeChatAccountRequest`

**响应**：`object`

### GET `/api/v1/wechat/account/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAccountRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/account/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAccountRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/account/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAccountRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/account/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAccountRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/account/update`

**请求体**（application/json）：

- 结构：`WeChatAccountRequest`

**响应**：`object`

## we-chat-app-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/app/create` |  |
| `POST` | `/api/v1/wechat/app/delete` |  |
| `GET` | `/api/v1/wechat/app/export` |  |
| `GET` | `/api/v1/wechat/app/query` |  |
| `GET` | `/api/v1/wechat/app/query/org` |  |
| `GET` | `/api/v1/wechat/app/query/uid` |  |
| `GET` | `/api/v1/wechat/app/refreshToken` |  |
| `POST` | `/api/v1/wechat/app/update` |  |

### POST `/api/v1/wechat/app/create`

**请求体**（application/json）：

- 结构：`WeChatAppRequest`

**响应**：`object`

### POST `/api/v1/wechat/app/delete`

**请求体**（application/json）：

- 结构：`WeChatAppRequest`

**响应**：`object`

### GET `/api/v1/wechat/app/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAppRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/app/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAppRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/app/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAppRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/app/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAppRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/app/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatAppRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/app/update`

**请求体**（application/json）：

- 结构：`WeChatAppRequest`

**响应**：`object`

## we-chat-mini-user-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mini/user/create` |  |
| `POST` | `/api/v1/wechat/mini/user/delete` |  |
| `GET` | `/api/v1/wechat/mini/user/export` |  |
| `GET` | `/api/v1/wechat/mini/user/query` |  |
| `GET` | `/api/v1/wechat/mini/user/query/org` |  |
| `GET` | `/api/v1/wechat/mini/user/query/uid` |  |
| `POST` | `/api/v1/wechat/mini/user/update` |  |

### POST `/api/v1/wechat/mini/user/create`

**请求体**（application/json）：

- 结构：`WeChatMiniUserRequest`

**响应**：`object`

### POST `/api/v1/wechat/mini/user/delete`

**请求体**（application/json）：

- 结构：`WeChatMiniUserRequest`

**响应**：`object`

### GET `/api/v1/wechat/mini/user/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMiniUserRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mini/user/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMiniUserRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mini/user/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMiniUserRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mini/user/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMiniUserRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mini/user/update`

**请求体**（application/json）：

- 结构：`WeChatMiniUserRequest`

**响应**：`object`

## we-chat-mp-black-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/black/create` |  |
| `POST` | `/api/v1/wechat/mp/black/delete` |  |
| `GET` | `/api/v1/wechat/mp/black/export` |  |
| `GET` | `/api/v1/wechat/mp/black/query` |  |
| `GET` | `/api/v1/wechat/mp/black/query/org` |  |
| `GET` | `/api/v1/wechat/mp/black/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/black/update` |  |

### POST `/api/v1/wechat/mp/black/create`

**请求体**（application/json）：

- 结构：`WeChatMpBlackRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/black/delete`

**请求体**（application/json）：

- 结构：`WeChatMpBlackRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/black/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpBlackRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/black/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpBlackRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/black/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpBlackRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/black/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpBlackRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/black/update`

**请求体**（application/json）：

- 结构：`WeChatMpBlackRequest`

**响应**：`object`

## we-chat-mp-draft-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/draft/create` |  |
| `POST` | `/api/v1/wechat/mp/draft/delete` |  |
| `GET` | `/api/v1/wechat/mp/draft/export` |  |
| `GET` | `/api/v1/wechat/mp/draft/query` |  |
| `GET` | `/api/v1/wechat/mp/draft/query/org` |  |
| `GET` | `/api/v1/wechat/mp/draft/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/draft/update` |  |

### POST `/api/v1/wechat/mp/draft/create`

**请求体**（application/json）：

- 结构：`WeChatMpDraftRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/draft/delete`

**请求体**（application/json）：

- 结构：`WeChatMpDraftRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/draft/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpDraftRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/draft/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpDraftRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/draft/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpDraftRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/draft/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpDraftRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/draft/update`

**请求体**（application/json）：

- 结构：`WeChatMpDraftRequest`

**响应**：`object`

## we-chat-mp-groupon-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/groupon/create` |  |
| `POST` | `/api/v1/wechat/mp/groupon/delete` |  |
| `GET` | `/api/v1/wechat/mp/groupon/export` |  |
| `GET` | `/api/v1/wechat/mp/groupon/query` |  |
| `GET` | `/api/v1/wechat/mp/groupon/query/org` |  |
| `GET` | `/api/v1/wechat/mp/groupon/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/groupon/update` |  |

### POST `/api/v1/wechat/mp/groupon/create`

**请求体**（application/json）：

- 结构：`WeChatMpGrouponRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/groupon/delete`

**请求体**（application/json）：

- 结构：`WeChatMpGrouponRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/groupon/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpGrouponRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/groupon/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpGrouponRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/groupon/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpGrouponRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/groupon/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpGrouponRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/groupon/update`

**请求体**（application/json）：

- 结构：`WeChatMpGrouponRequest`

**响应**：`object`

## we-chat-mp-kefu-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/kefu/create` |  |
| `POST` | `/api/v1/wechat/mp/kefu/delete` |  |
| `GET` | `/api/v1/wechat/mp/kefu/export` |  |
| `GET` | `/api/v1/wechat/mp/kefu/query` |  |
| `GET` | `/api/v1/wechat/mp/kefu/query/org` |  |
| `GET` | `/api/v1/wechat/mp/kefu/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/kefu/update` |  |

### POST `/api/v1/wechat/mp/kefu/create`

**请求体**（application/json）：

- 结构：`WeChatMpKefuRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/kefu/delete`

**请求体**（application/json）：

- 结构：`WeChatMpKefuRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/kefu/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpKefuRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/kefu/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpKefuRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/kefu/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpKefuRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/kefu/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpKefuRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/kefu/update`

**请求体**（application/json）：

- 结构：`WeChatMpKefuRequest`

**响应**：`object`

## we-chat-mp-media-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/media/create` |  |
| `POST` | `/api/v1/wechat/mp/media/delete` |  |
| `GET` | `/api/v1/wechat/mp/media/export` |  |
| `GET` | `/api/v1/wechat/mp/media/query` |  |
| `GET` | `/api/v1/wechat/mp/media/query/org` |  |
| `GET` | `/api/v1/wechat/mp/media/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/media/update` |  |

### POST `/api/v1/wechat/mp/media/create`

**请求体**（application/json）：

- 结构：`WeChatMpMediaRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/media/delete`

**请求体**（application/json）：

- 结构：`WeChatMpMediaRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/media/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMediaRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/media/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMediaRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/media/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMediaRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/media/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMediaRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/media/update`

**请求体**（application/json）：

- 结构：`WeChatMpMediaRequest`

**响应**：`object`

## we-chat-mp-menu-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/menu/create` |  |
| `POST` | `/api/v1/wechat/mp/menu/delete` |  |
| `GET` | `/api/v1/wechat/mp/menu/export` |  |
| `GET` | `/api/v1/wechat/mp/menu/query` |  |
| `GET` | `/api/v1/wechat/mp/menu/query/org` |  |
| `GET` | `/api/v1/wechat/mp/menu/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/menu/update` |  |

### POST `/api/v1/wechat/mp/menu/create`

**请求体**（application/json）：

- 结构：`WeChatMpMenuRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/menu/delete`

**请求体**（application/json）：

- 结构：`WeChatMpMenuRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/menu/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMenuRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/menu/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMenuRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/menu/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMenuRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/menu/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpMenuRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/menu/update`

**请求体**（application/json）：

- 结构：`WeChatMpMenuRequest`

**响应**：`object`

## we-chat-mp-tag-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/tag/create` |  |
| `POST` | `/api/v1/wechat/mp/tag/delete` |  |
| `GET` | `/api/v1/wechat/mp/tag/export` |  |
| `GET` | `/api/v1/wechat/mp/tag/query` |  |
| `GET` | `/api/v1/wechat/mp/tag/query/org` |  |
| `GET` | `/api/v1/wechat/mp/tag/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/tag/update` |  |

### POST `/api/v1/wechat/mp/tag/create`

**请求体**（application/json）：

- 结构：`WeChatMpTagRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/tag/delete`

**请求体**（application/json）：

- 结构：`WeChatMpTagRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/tag/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpTagRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/tag/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpTagRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/tag/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpTagRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/tag/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpTagRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/tag/update`

**请求体**（application/json）：

- 结构：`WeChatMpTagRequest`

**响应**：`object`

## we-chat-mp-user-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/mp/user/create` |  |
| `POST` | `/api/v1/wechat/mp/user/delete` |  |
| `GET` | `/api/v1/wechat/mp/user/export` |  |
| `GET` | `/api/v1/wechat/mp/user/query` |  |
| `GET` | `/api/v1/wechat/mp/user/query/org` |  |
| `GET` | `/api/v1/wechat/mp/user/query/uid` |  |
| `POST` | `/api/v1/wechat/mp/user/update` |  |

### POST `/api/v1/wechat/mp/user/create`

**请求体**（application/json）：

- 结构：`WeChatMpUserRequest`

**响应**：`object`

### POST `/api/v1/wechat/mp/user/delete`

**请求体**（application/json）：

- 结构：`WeChatMpUserRequest`

**响应**：`object`

### GET `/api/v1/wechat/mp/user/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpUserRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/user/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpUserRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/user/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpUserRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/mp/user/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatMpUserRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/mp/user/update`

**请求体**（application/json）：

- 结构：`WeChatMpUserRequest`

**响应**：`object`

## product-album-controller

共 5 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/album/add` |  |
| `POST` | `/api/v1/wechat/work/album/delete` |  |
| `POST` | `/api/v1/wechat/work/album/get` |  |
| `POST` | `/api/v1/wechat/work/album/list` |  |
| `POST` | `/api/v1/wechat/work/album/update` |  |

### POST `/api/v1/wechat/work/album/add`

**请求体**（application/json）：

- 结构：`ProductAlbumRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/album/delete`

**请求体**（application/json）：

- 结构：`ProductAlbumDeleteRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/album/get`

**请求体**（application/json）：

- 结构：`ProductAlbumGetRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/album/list`

**请求体**（application/json）：

- 结构：`ProductAlbumListRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/album/update`

**请求体**（application/json）：

- 结构：`ProductAlbumUpdateRequest`

**响应**：`object`

## customer-acquisition-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/wechat/work/customer/acquisition/chat/info` |  |
| `GET` | `/api/v1/wechat/work/customer/acquisition/customer/list` |  |
| `POST` | `/api/v1/wechat/work/customer/acquisition/link/create` |  |
| `POST` | `/api/v1/wechat/work/customer/acquisition/link/delete` |  |
| `GET` | `/api/v1/wechat/work/customer/acquisition/link/detail` |  |
| `GET` | `/api/v1/wechat/work/customer/acquisition/link/list` |  |
| `GET` | `/api/v1/wechat/work/customer/acquisition/link/statistic` |  |
| `POST` | `/api/v1/wechat/work/customer/acquisition/link/update` |  |
| `GET` | `/api/v1/wechat/work/customer/acquisition/quota` |  |

### GET `/api/v1/wechat/work/customer/acquisition/chat/info`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |
| query | `chat_key` | True | string |  |

**响应**：`LinkResponse`

### GET `/api/v1/wechat/work/customer/acquisition/customer/list`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |
| query | `link_id` | True | string |  |
| query | `limit` | False | integer |  |
| query | `cursor` | False | string |  |

**响应**：`LinkResponse`

### POST `/api/v1/wechat/work/customer/acquisition/link/create`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |

**请求体**（application/json）：

- 结构：`LinkRequest`

**响应**：`LinkResponse`

### POST `/api/v1/wechat/work/customer/acquisition/link/delete`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |
| query | `link_id` | True | string |  |

**响应**：`LinkResponse`

### GET `/api/v1/wechat/work/customer/acquisition/link/detail`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |
| query | `link_id` | True | string |  |

**响应**：`LinkResponse`

### GET `/api/v1/wechat/work/customer/acquisition/link/list`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |
| query | `limit` | False | integer |  |
| query | `cursor` | False | string |  |

**响应**：`LinkResponse`

### GET `/api/v1/wechat/work/customer/acquisition/link/statistic`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |
| query | `link_id` | True | string |  |
| query | `start_time` | True | integer |  |
| query | `end_time` | True | integer |  |

**响应**：`LinkResponse`

### POST `/api/v1/wechat/work/customer/acquisition/link/update`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |

**请求体**（application/json）：

- 结构：`LinkRequest`

**响应**：`LinkResponse`

### GET `/api/v1/wechat/work/customer/acquisition/quota`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `access_token` | True | string |  |

**响应**：`LinkResponse`

## we-chat-work-customer-rest-controller

共 17 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/customer/batch_get` |  |
| `POST` | `/api/v1/wechat/work/customer/check_follow_user` |  |
| `POST` | `/api/v1/wechat/work/customer/create` |  |
| `POST` | `/api/v1/wechat/work/customer/delete` |  |
| `GET` | `/api/v1/wechat/work/customer/export` |  |
| `GET` | `/api/v1/wechat/work/customer/follow_user_list` |  |
| `GET` | `/api/v1/wechat/work/customer/get` |  |
| `GET` | `/api/v1/wechat/work/customer/list` |  |
| `GET` | `/api/v1/wechat/work/customer/query` |  |
| `GET` | `/api/v1/wechat/work/customer/query/org` |  |
| `GET` | `/api/v1/wechat/work/customer/query/uid` |  |
| `POST` | `/api/v1/wechat/work/customer/remark` |  |
| `GET` | `/api/v1/wechat/work/customer/strategy/delete` |  |
| `GET` | `/api/v1/wechat/work/customer/strategy/get` |  |
| `GET` | `/api/v1/wechat/work/customer/strategy/list` |  |
| `GET` | `/api/v1/wechat/work/customer/strategy/range` |  |
| `POST` | `/api/v1/wechat/work/customer/update` |  |

### POST `/api/v1/wechat/work/customer/batch_get`

**请求体**（application/json）：

- 结构：`WeChatWorkCustomerRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/customer/check_follow_user`

**请求体**（application/json）：

- 结构：`WeChatWorkCustomerRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/customer/create`

**请求体**（application/json）：

- 结构：`WeChatWorkCustomerRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/customer/delete`

**请求体**（application/json）：

- 结构：`WeChatWorkCustomerRequest`

**响应**：`object`

### GET `/api/v1/wechat/work/customer/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkCustomerRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/follow_user_list`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/get`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |
| query | `externalUserId` | True | string |  |
| query | `cursor` | False | string |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/list`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |
| query | `userId` | True | string |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkCustomerRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkCustomerRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkCustomerRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/work/customer/remark`

**请求体**（application/json）：

- 结构：`WeChatWorkCustomerRequest`

**响应**：`object`

### GET `/api/v1/wechat/work/customer/strategy/delete`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |
| query | `strategyId` | True | integer |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/strategy/get`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |
| query | `strategyId` | True | integer |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/strategy/list`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |
| query | `cursor` | False | string |  |
| query | `limit` | False | integer |  |

**响应**：`object`

### GET `/api/v1/wechat/work/customer/strategy/range`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `corpId` | True | string |  |
| query | `appSecret` | True | string |  |
| query | `strategyId` | True | integer |  |
| query | `cursor` | False | string |  |
| query | `limit` | False | integer |  |

**响应**：`object`

### POST `/api/v1/wechat/work/customer/update`

**请求体**（application/json）：

- 结构：`WeChatWorkCustomerRequest`

**响应**：`object`

## we-chat-work-group-rest-controller

共 3 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/group/convert` |  |
| `POST` | `/api/v1/wechat/work/group/detail` |  |
| `POST` | `/api/v1/wechat/work/group/list` |  |

### POST `/api/v1/wechat/work/group/convert`

**请求体**（application/json）：

- 结构：`WeChatWorkGroupRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/group/detail`

**请求体**（application/json）：

- 结构：`WeChatWorkGroupRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/group/list`

**请求体**（application/json）：

- 结构：`WeChatWorkGroupRequest`

**响应**：`object`

## we-chat-work-session-rest-controller

共 11 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/kf/session/create` |  |
| `POST` | `/api/v1/wechat/work/kf/session/delete` |  |
| `GET` | `/api/v1/wechat/work/kf/session/export` |  |
| `POST` | `/api/v1/wechat/work/kf/session/msg/event` |  |
| `POST` | `/api/v1/wechat/work/kf/session/msg/send` |  |
| `GET` | `/api/v1/wechat/work/kf/session/query` |  |
| `GET` | `/api/v1/wechat/work/kf/session/query/org` |  |
| `GET` | `/api/v1/wechat/work/kf/session/query/uid` |  |
| `POST` | `/api/v1/wechat/work/kf/session/state/get` |  |
| `POST` | `/api/v1/wechat/work/kf/session/state/trans` |  |
| `POST` | `/api/v1/wechat/work/kf/session/update` |  |

### POST `/api/v1/wechat/work/kf/session/create`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/kf/session/delete`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

### GET `/api/v1/wechat/work/kf/session/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkSessionRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/work/kf/session/msg/event`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/kf/session/msg/send`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

### GET `/api/v1/wechat/work/kf/session/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkSessionRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/work/kf/session/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkSessionRequest |  |

**响应**：`object`

### GET `/api/v1/wechat/work/kf/session/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WeChatWorkSessionRequest |  |

**响应**：`object`

### POST `/api/v1/wechat/work/kf/session/state/get`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/kf/session/state/trans`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

### POST `/api/v1/wechat/work/kf/session/update`

**请求体**（application/json）：

- 结构：`WeChatWorkSessionRequest`

**响应**：`object`

## resign-transfer-controller

共 4 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/resign/transfer/customer` |  |
| `POST` | `/api/v1/wechat/work/resign/transfer/groupchat` |  |
| `POST` | `/api/v1/wechat/work/resign/transfer/result` |  |
| `POST` | `/api/v1/wechat/work/resign/unassigned/list` |  |

### POST `/api/v1/wechat/work/resign/transfer/customer`

**请求体**（application/json）：

- 结构：`TransferCustomerRequest`

**响应**：`TransferCustomerResponse`

### POST `/api/v1/wechat/work/resign/transfer/groupchat`

**请求体**（application/json）：

- 结构：`TransferGroupChatRequest`

**响应**：`TransferGroupChatResponse`

### POST `/api/v1/wechat/work/resign/transfer/result`

**请求体**（application/json）：

- 结构：`TransferResultRequest`

**响应**：`TransferResultResponse`

### POST `/api/v1/wechat/work/resign/unassigned/list`

**请求体**（application/json）：

- 结构：`UnassignedListRequest`

**响应**：`UnassignedListResponse`

## we-chat-work-taboo-controller

共 5 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/taboo/add` |  |
| `POST` | `/api/v1/wechat/work/taboo/delete` |  |
| `POST` | `/api/v1/wechat/work/taboo/get` |  |
| `GET` | `/api/v1/wechat/work/taboo/list` |  |
| `POST` | `/api/v1/wechat/work/taboo/update` |  |

### POST `/api/v1/wechat/work/taboo/add`

**请求体**（application/json）：

- 结构：`AddInterceptRuleRequest`

**响应**：`AddInterceptRuleResponse`

### POST `/api/v1/wechat/work/taboo/delete`

**请求体**（application/json）：

- 结构：`DelInterceptRuleRequest`

**响应**：`WeChatWorkBaseResponse`

### POST `/api/v1/wechat/work/taboo/get`

**请求体**（application/json）：

- 结构：`GetInterceptRuleRequest`

**响应**：`GetInterceptRuleResponse`

### GET `/api/v1/wechat/work/taboo/list`

**响应**：`GetInterceptRuleListResponse`

### POST `/api/v1/wechat/work/taboo/update`

**请求体**（application/json）：

- 结构：`UpdateInterceptRuleRequest`

**响应**：`WeChatWorkBaseResponse`

## we-chat-work-upload-controller

共 4 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/wechat/work/upload/attachment` |  |
| `POST` | `/api/v1/wechat/work/upload/moment/image` |  |
| `POST` | `/api/v1/wechat/work/upload/moment/video` |  |
| `POST` | `/api/v1/wechat/work/upload/product/image` |  |

### POST `/api/v1/wechat/work/upload/attachment`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `mediaType` | False | string |  |
| query | `attachmentType` | False | integer |  |

**请求体**（application/json）：


**响应**：`object`

### POST `/api/v1/wechat/work/upload/moment/image`

**请求体**（application/json）：


**响应**：`object`

### POST `/api/v1/wechat/work/upload/moment/video`

**请求体**（application/json）：


**响应**：`object`

### POST `/api/v1/wechat/work/upload/product/image`

**请求体**（application/json）：


**响应**：`object`

## whats-app-rest-controller

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/whatsapp/checkServiceReachable` |  |
| `POST` | `/api/v1/whatsapp/create` |  |
| `POST` | `/api/v1/whatsapp/delete` |  |
| `GET` | `/api/v1/whatsapp/export` |  |
| `GET` | `/api/v1/whatsapp/query` |  |
| `GET` | `/api/v1/whatsapp/query/org` |  |
| `GET` | `/api/v1/whatsapp/query/uid` |  |
| `GET` | `/api/v1/whatsapp/refreshToken` |  |
| `POST` | `/api/v1/whatsapp/update` |  |

### GET `/api/v1/whatsapp/checkServiceReachable`

**响应**：`object`

### POST `/api/v1/whatsapp/create`

**请求体**（application/json）：

- 结构：`WhatsAppRequest`

**响应**：`object`

### POST `/api/v1/whatsapp/delete`

**请求体**（application/json）：

- 结构：`WhatsAppRequest`

**响应**：`object`

### GET `/api/v1/whatsapp/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WhatsAppRequest |  |

**响应**：`object`

### GET `/api/v1/whatsapp/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WhatsAppRequest |  |

**响应**：`object`

### GET `/api/v1/whatsapp/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WhatsAppRequest |  |

**响应**：`object`

### GET `/api/v1/whatsapp/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WhatsAppRequest |  |

**响应**：`object`

### GET `/api/v1/whatsapp/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WhatsAppRequest |  |

**响应**：`object`

### POST `/api/v1/whatsapp/update`

**请求体**（application/json）：

- 结构：`WhatsAppRequest`

**响应**：`object`

## Workflow Management

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/workflow/create` | 创建工作流 |
| `POST` | `/api/v1/workflow/delete` | 删除工作流 |
| `POST` | `/api/v1/workflow/execute` | 执行工作流 |
| `GET` | `/api/v1/workflow/export` | 导出工作流 |
| `GET` | `/api/v1/workflow/query` | 查询用户下的工作流 |
| `GET` | `/api/v1/workflow/query/org` | 查询组织下的工作流 |
| `GET` | `/api/v1/workflow/query/uid` | 查询指定工作流 |
| `POST` | `/api/v1/workflow/update` | 更新工作流 |

### POST `/api/v1/workflow/create`

创建工作流

**请求体**（application/json）：

- 结构：`WorkflowRequest`

**响应**：`WorkflowResponse`

### POST `/api/v1/workflow/delete`

删除工作流

**请求体**（application/json）：

- 结构：`WorkflowRequest`

**响应**：`object`

### POST `/api/v1/workflow/execute`

执行工作流

**请求体**（application/json）：

- 结构：`WorkflowRequest`

**响应**：`object`

### GET `/api/v1/workflow/export`

导出工作流

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowRequest |  |

**响应**：`object`

### GET `/api/v1/workflow/query`

查询用户下的工作流

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowRequest |  |

**响应**：`WorkflowResponse`

### GET `/api/v1/workflow/query/org`

查询组织下的工作流

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowRequest |  |

**响应**：`WorkflowResponse`

### GET `/api/v1/workflow/query/uid`

查询指定工作流

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowRequest |  |

**响应**：`WorkflowResponse`

### POST `/api/v1/workflow/update`

更新工作流

**请求体**（application/json）：

- 结构：`WorkflowRequest`

**响应**：`WorkflowResponse`

## workflow-result-rest-controller

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/workflow/result/create` |  |
| `POST` | `/api/v1/workflow/result/delete` |  |
| `GET` | `/api/v1/workflow/result/export` |  |
| `GET` | `/api/v1/workflow/result/query` |  |
| `GET` | `/api/v1/workflow/result/query/org` |  |
| `GET` | `/api/v1/workflow/result/query/uid` |  |
| `POST` | `/api/v1/workflow/result/update` |  |

### POST `/api/v1/workflow/result/create`

**请求体**（application/json）：

- 结构：`WorkflowResultRequest`

**响应**：`object`

### POST `/api/v1/workflow/result/delete`

**请求体**（application/json）：

- 结构：`WorkflowResultRequest`

**响应**：`object`

### GET `/api/v1/workflow/result/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowResultRequest |  |

**响应**：`object`

### GET `/api/v1/workflow/result/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowResultRequest |  |

**响应**：`object`

### GET `/api/v1/workflow/result/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowResultRequest |  |

**响应**：`object`

### GET `/api/v1/workflow/result/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkflowResultRequest |  |

**响应**：`object`

### POST `/api/v1/workflow/result/update`

**请求体**（application/json）：

- 结构：`WorkflowResultRequest`

**响应**：`object`

## 工作流变量管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/workflow/variable/create` | 创建工作流变量 |
| `GET` | `/api/v1/workflow/variable/{workflowUid}` | 获取工作流所有变量 |
| `DELETE` | `/api/v1/workflow/variable/{workflowUid}` | 删除工作流所有变量 |
| `GET` | `/api/v1/workflow/variable/{workflowUid}/{name}` | 获取工作流变量 |
| `DELETE` | `/api/v1/workflow/variable/{workflowUid}/{name}` | 删除工作流变量 |
| `GET` | `/api/v1/workflow/variable/{workflowUid}/{nodeUid}` | 获取节点所有局部变量 |
| `DELETE` | `/api/v1/workflow/variable/{workflowUid}/{nodeUid}` | 删除节点所有局部变量 |
| `GET` | `/api/v1/workflow/variable/{workflowUid}/{nodeUid}/{name}` | 获取工作流局部变量 |
| `DELETE` | `/api/v1/workflow/variable/{workflowUid}/{nodeUid}/{name}` | 删除工作流局部变量 |

### POST `/api/v1/workflow/variable/create`

创建工作流变量

**请求体**（application/json）：

- 结构：`WorkflowVariableRequest`

**响应**：`object`

### GET `/api/v1/workflow/variable/{workflowUid}`

获取工作流所有变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |

**响应**：`object`

### DELETE `/api/v1/workflow/variable/{workflowUid}`

删除工作流所有变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |

**响应**：`object`

### GET `/api/v1/workflow/variable/{workflowUid}/{name}`

获取工作流变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |
| path | `name` | True | string |  |

**响应**：`object`

### DELETE `/api/v1/workflow/variable/{workflowUid}/{name}`

删除工作流变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |
| path | `name` | True | string |  |

**响应**：`object`

### GET `/api/v1/workflow/variable/{workflowUid}/{nodeUid}`

获取节点所有局部变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |
| path | `nodeUid` | True | string |  |

**响应**：`object`

### DELETE `/api/v1/workflow/variable/{workflowUid}/{nodeUid}`

删除节点所有局部变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |
| path | `nodeUid` | True | string |  |

**响应**：`object`

### GET `/api/v1/workflow/variable/{workflowUid}/{nodeUid}/{name}`

获取工作流局部变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |
| path | `nodeUid` | True | string |  |
| path | `name` | True | string |  |

**响应**：`object`

### DELETE `/api/v1/workflow/variable/{workflowUid}/{nodeUid}/{name}`

删除工作流局部变量

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| path | `workflowUid` | True | string |  |
| path | `nodeUid` | True | string |  |
| path | `name` | True | string |  |

**响应**：`object`

## 工作组管理

共 9 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/workgroup/create` | 创建工作组 |
| `POST` | `/api/v1/workgroup/delete` | 删除工作组 |
| `GET` | `/api/v1/workgroup/export` | 导出工作组 |
| `GET` | `/api/v1/workgroup/query` | 查询用户下的工作组 |
| `GET` | `/api/v1/workgroup/query/org` | 查询组织下的工作组 |
| `GET` | `/api/v1/workgroup/query/uid` | 查询指定工作组 |
| `POST` | `/api/v1/workgroup/update` | 更新工作组 |
| `POST` | `/api/v1/workgroup/update/avatar` | 更新工作组头像 |
| `POST` | `/api/v1/workgroup/update/status` | 更新工作组状态 |

### POST `/api/v1/workgroup/create`

创建工作组

**请求体**（application/json）：

- 结构：`WorkgroupRequest`

**响应**：`WorkgroupResponse`

### POST `/api/v1/workgroup/delete`

删除工作组

**请求体**（application/json）：

- 结构：`WorkgroupRequest`

**响应**：`object`

### GET `/api/v1/workgroup/export`

导出工作组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkgroupRequest |  |

**响应**：`object`

### GET `/api/v1/workgroup/query`

查询用户下的工作组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkgroupRequest |  |

**响应**：`WorkgroupResponse`

### GET `/api/v1/workgroup/query/org`

查询组织下的工作组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkgroupRequest |  |

**响应**：`WorkgroupResponse`

### GET `/api/v1/workgroup/query/uid`

查询指定工作组

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorkgroupRequest |  |

**响应**：`WorkgroupResponse`

### POST `/api/v1/workgroup/update`

更新工作组

**请求体**（application/json）：

- 结构：`WorkgroupRequest`

**响应**：`WorkgroupResponse`

### POST `/api/v1/workgroup/update/avatar`

更新工作组头像

**请求体**（application/json）：

- 结构：`WorkgroupRequest`

**响应**：`WorkgroupResponse`

### POST `/api/v1/workgroup/update/status`

更新工作组状态

**请求体**（application/json）：

- 结构：`WorkgroupRequest`

**响应**：`WorkgroupResponse`

## 工作时间管理

共 19 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/v1/worktime/create` | 创建工作时间 |
| `PUT` | `/api/v1/worktime/create` | 创建工作时间 |
| `POST` | `/api/v1/worktime/create` | 创建工作时间 |
| `DELETE` | `/api/v1/worktime/create` | 创建工作时间 |
| `PATCH` | `/api/v1/worktime/create` | 创建工作时间 |
| `GET` | `/api/v1/worktime/delete` | 删除工作时间 |
| `PUT` | `/api/v1/worktime/delete` | 删除工作时间 |
| `POST` | `/api/v1/worktime/delete` | 删除工作时间 |
| `DELETE` | `/api/v1/worktime/delete` | 删除工作时间 |
| `PATCH` | `/api/v1/worktime/delete` | 删除工作时间 |
| `GET` | `/api/v1/worktime/export` | 导出工作时间 |
| `GET` | `/api/v1/worktime/query` | 根据用户查询工作时间 |
| `GET` | `/api/v1/worktime/query/org` | 根据组织查询工作时间 |
| `GET` | `/api/v1/worktime/query/uid` | 根据UID查询工作时间 |
| `GET` | `/api/v1/worktime/update` | 更新工作时间 |
| `PUT` | `/api/v1/worktime/update` | 更新工作时间 |
| `POST` | `/api/v1/worktime/update` | 更新工作时间 |
| `DELETE` | `/api/v1/worktime/update` | 更新工作时间 |
| `PATCH` | `/api/v1/worktime/update` | 更新工作时间 |

### GET `/api/v1/worktime/create`

创建工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### PUT `/api/v1/worktime/create`

创建工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### POST `/api/v1/worktime/create`

创建工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### DELETE `/api/v1/worktime/create`

创建工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### PATCH `/api/v1/worktime/create`

创建工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### GET `/api/v1/worktime/delete`

删除工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### PUT `/api/v1/worktime/delete`

删除工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### POST `/api/v1/worktime/delete`

删除工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### DELETE `/api/v1/worktime/delete`

删除工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### PATCH `/api/v1/worktime/delete`

删除工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### GET `/api/v1/worktime/export`

导出工作时间

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/query`

根据用户查询工作时间

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/query/org`

根据组织查询工作时间

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/query/uid`

根据UID查询工作时间

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/update`

更新工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### PUT `/api/v1/worktime/update`

更新工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### POST `/api/v1/worktime/update`

更新工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### DELETE `/api/v1/worktime/update`

更新工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

### PATCH `/api/v1/worktime/update`

更新工作时间

**请求体**（application/json）：

- 结构：`WorktimeRequest`

**响应**：`object`

## 工作时间设置管理

共 7 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/worktime/setting/create` | 创建工作时间设置 |
| `POST` | `/api/v1/worktime/setting/delete` | 删除工作时间设置 |
| `GET` | `/api/v1/worktime/setting/export` | 导出工作时间设置 |
| `GET` | `/api/v1/worktime/setting/query` | 根据用户查询工作时间设置 |
| `GET` | `/api/v1/worktime/setting/query/org` | 根据组织查询工作时间设置 |
| `GET` | `/api/v1/worktime/setting/query/uid` | 根据UID查询工作时间设置 |
| `POST` | `/api/v1/worktime/setting/update` | 更新工作时间设置 |

### POST `/api/v1/worktime/setting/create`

创建工作时间设置

**请求体**（application/json）：

- 结构：`WorktimeSettingRequest`

**响应**：`object`

### POST `/api/v1/worktime/setting/delete`

删除工作时间设置

**请求体**（application/json）：

- 结构：`WorktimeSettingRequest`

**响应**：`object`

### GET `/api/v1/worktime/setting/export`

导出工作时间设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeSettingRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/setting/query`

根据用户查询工作时间设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeSettingRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/setting/query/org`

根据组织查询工作时间设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeSettingRequest |  |

**响应**：`object`

### GET `/api/v1/worktime/setting/query/uid`

根据UID查询工作时间设置

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:WorktimeSettingRequest |  |

**响应**：`object`

### POST `/api/v1/worktime/setting/update`

更新工作时间设置

**请求体**（application/json）：

- 结构：`WorktimeSettingRequest`

**响应**：`object`

## zalo-rest-controller

共 8 个接口。

| 方法 | 路径 | 说明 |
|------|------|------|
| `POST` | `/api/v1/zalo/create` |  |
| `POST` | `/api/v1/zalo/delete` |  |
| `GET` | `/api/v1/zalo/export` |  |
| `GET` | `/api/v1/zalo/query` |  |
| `GET` | `/api/v1/zalo/query/org` |  |
| `GET` | `/api/v1/zalo/query/uid` |  |
| `GET` | `/api/v1/zalo/refreshToken` |  |
| `POST` | `/api/v1/zalo/update` |  |

### POST `/api/v1/zalo/create`

**请求体**（application/json）：

- 结构：`ZaloRequest`

**响应**：`object`

### POST `/api/v1/zalo/delete`

**请求体**（application/json）：

- 结构：`ZaloRequest`

**响应**：`object`

### GET `/api/v1/zalo/export`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ZaloRequest |  |

**响应**：`object`

### GET `/api/v1/zalo/query`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ZaloRequest |  |

**响应**：`object`

### GET `/api/v1/zalo/query/org`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ZaloRequest |  |

**响应**：`object`

### GET `/api/v1/zalo/query/uid`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ZaloRequest |  |

**响应**：`object`

### GET `/api/v1/zalo/refreshToken`

**参数**：

| 位置 | 名称 | 必填 | 类型 | 说明 |
|------|------|------|------|------|
| query | `request` | True | ref:ZaloRequest |  |

**响应**：`object`

### POST `/api/v1/zalo/update`

**请求体**（application/json）：

- 结构：`ZaloRequest`

**响应**：`object`
