# 微语 API
**版本**: 1.2.0  
**生成时间**: 2026-01-16 10:02:34  
**API 数量**: 2418  
**标签数量**: 167  

## 描述

企业IM、在线客服、企业知识库/帮助文档、工单系统、AI对话、工作流、客户之声、呼叫中心、视频客服

## 服务器

- **URL**: http://127.0.0.1:9003
  **描述**: Generated server url

## 目录

- [Action Log Management](#Action-Log-Management) - Action log management APIs for tracking user activities and system events
- [客户管理](#客户管理) - 客户管理相关接口
- [McpClient Management](#McpClient-Management) - McpClient management APIs for organizing and categorizing content with mcp_clients
- [队列成员管理(企业版)](#队列成员管理(企业版)) - 队列成员高级AI接口
- [消息评价管理](#消息评价管理) - 消息评价管理相关接口
- [AI机器人测试](#AI机器人测试) - AI机器人服务测试接口
- [TaskList Management](#TaskList-Management) - TaskList management APIs for organizing and categorizing content with task_lists
- [Feedback Management](#Feedback-Management) - Feedback management APIs for organizing and categorizing content with feedbacks
- [IP White Management](#IP-White-Management) - IP whitelist management APIs for allowing specific IP addresses
- [KbaseStatistic Management](#KbaseStatistic-Management) - KbaseStatistic management APIs for organizing and categorizing content with statistics
- [模板管理](#模板管理) - 模板管理相关接口
- [VocComment Management](#VocComment-Management) - VocComment management APIs for organizing and categorizing content with comments
- [会话评价管理](#会话评价管理) - 会话评价管理相关接口
- [黑名单管理](#黑名单管理) - 黑名单增删改查操作
- [Opinion Management](#Opinion-Management) - Opinion management APIs for organizing and categorizing content with opinions
- [Calendar Management](#Calendar-Management) - Calendar management APIs for organizing and categorizing content with calendars
- [TicketRating Management](#TicketRating-Management) - TicketRating management APIs for organizing and categorizing content with ticket_ratings
- [JanusAudio Management](#JanusAudio-Management) - JanusAudio management APIs for organizing and categorizing content with audios
- [统一消息管理](#统一消息管理) - 统一消息管理相关接口
- [QualityAppeal Management](#QualityAppeal-Management) - QualityAppeal management APIs for organizing and categorizing content with appeals
- [访客评价匿名管理](#访客评价匿名管理) - 访客评价匿名相关接口
- [Screen Management](#Screen-Management) - Screen management APIs for organizing and categorizing content with screens
- [群组管理](#群组管理) - 群组管理相关接口
- [Schedule Management](#Schedule-Management) - Schedule management APIs for organizing and categorizing content with schedules
- [Plugin Management](#Plugin-Management) - 插件管理接口
- [成员管理](#成员管理) - 成员管理相关接口
- [Subscription Management](#Subscription-Management) - Subscription management APIs for organizing and categorizing content with subscriptions
- [消息解析管理](#消息解析管理) - 消息解析管理相关接口
- [Visitor Upload Management](#Visitor-Upload-Management) - Visitor upload APIs for anonymous file uploads
- [消息反馈管理](#消息反馈管理) - 消息反馈管理相关接口
- [队列管理](#队列管理) - 队列管理相关接口
- [Task Management](#Task-Management) - Task management APIs for organizing and categorizing content with tasks
- [消息管理](#消息管理) - 消息管理相关接口，包括查询、创建、更新、删除等操作
- [Favorite Management](#Favorite-Management) - Favorite management APIs for managing user favorites and bookmarks
- [表单结果管理](#表单结果管理) - 表单结果管理相关接口
- [Goods Management](#Goods-Management) - Goods management APIs for organizing and categorizing content with goodss
- [Contract Management](#Contract-Management) - Contract management APIs for organizing and categorizing content with contracts
- [访客评价管理](#访客评价管理) - 访客评价管理相关接口
- [Category Management](#Category-Management) - Category management APIs for organizing and classifying content
- [WorkgroupRouting Management](#WorkgroupRouting-Management) - WorkgroupRouting management APIs for organizing and categorizing content with workgroup_routings
- [VisitorToken Management](#VisitorToken-Management) - VisitorToken management APIs
- [留言消息匿名管理](#留言消息匿名管理) - 留言消息匿名相关接口
- [Order Management](#Order-Management) - Order management APIs
- [网站管理](#网站管理) - 网站管理相关接口
- [Group Invitation Management](#Group-Invitation-Management) - Group invitation management APIs for creating and managing group invitations
- [Intention Management](#Intention-Management) - Intention management APIs for organizing and categorizing content with intentions
- [工作流变量管理](#工作流变量管理) - 工作流变量相关接口
- [Configuration Properties](#Configuration-Properties) - Configuration properties management APIs for system settings
- [会话意图](#会话意图) - 会话意图相关接口
- [Session Management](#Session-Management) - Session management APIs for user session handling
- [Connection Management](#Connection-Management) - Connection management APIs for organizing and categorizing content with connections
- [会话情绪](#会话情绪) - 会话情绪相关接口
- [WorkflowEdge Management](#WorkflowEdge-Management) - WorkflowEdge management APIs for organizing and categorizing content with workflow_edges
- [会话情绪管理](#会话情绪管理) - 会话情绪管理相关接口
- [访客匿名管理](#访客匿名管理) - 访客匿名相关接口
- [降级设置管理](#降级设置管理) - 降级设置管理相关接口
- [会话邀请管理](#会话邀请管理) - 会话邀请管理相关接口
- [Actuator](#Actuator) - Monitor and interact
- [IP Management](#IP-Management) - IP address management and location services APIs
- [IP Black Management](#IP-Black-Management) - IP blacklist management APIs for blocking specific IP addresses
- [URL Management](#URL-Management) - URL management APIs for managing system URLs
- [文件管理](#文件管理) - 文件管理相关接口
- [Cookie Management](#Cookie-Management) - Cookie management APIs for visitor tracking and session management
- [Recommendation Management](#Recommendation-Management) - Recommendation management APIs for organizing and categorizing content with recommendations
- [客服配置管理](#客服配置管理) - 客服配置相关接口
- [固定回复管理](#固定回复管理) - 固定回复管理相关接口
- [Prompt Management](#Prompt-Management) - Prompt management APIs for organizing and categorizing content with prompts
- [LLM模型管理](#LLM模型管理) - LLM模型管理相关接口
- [CallStatistic Management](#CallStatistic-Management) - CallStatistic management APIs for organizing and categorizing content with statistics
- [Workflow Management](#Workflow-Management) - Workflow management APIs for process automation and task management
- [JMS Management](#JMS-Management) - JMS Artemis queue and topic management APIs for testing
- [消息评价](#消息评价) - 消息评价相关接口
- [会话评价](#会话评价) - 会话评价相关接口
- [留言消息管理](#留言消息管理) - 留言消息管理相关接口
- [评论管理](#评论管理) - 评论管理相关接口
- [敏感词消息管理](#敏感词消息管理) - 敏感词消息管理相关接口
- [Token Management](#Token-Management) - Token management APIs
- [Trigger Management](#Trigger-Management) - Trigger management APIs for organizing and categorizing content with triggers
- [素材管理](#素材管理) - 素材管理相关接口
- [工作组管理](#工作组管理) - 工作组管理相关接口
- [客服管理](#客服管理) - 客服管理相关接口
- [客服状态设置管理](#客服状态设置管理) - 客服状态设置管理相关接口
- [Organization](#Organization) - Organization management APIs
- [会话意图管理](#会话意图管理) - 会话意图管理相关接口
- [文章管理](#文章管理) - 文章管理相关接口
- [Taboo Management](#Taboo-Management) - Taboo word management APIs for content filtering
- [主题管理](#主题管理) - 主题管理相关接口，包括查询、创建、更新、删除等操作
- [访客消息管理](#访客消息管理) - 访客消息管理相关接口
- [IP Access Management](#IP-Access-Management) - IP access control management APIs for managing IP access permissions
- [会话转接管理](#会话转接管理) - 会话转接管理相关接口
- [Upload Management](#Upload-Management) - File upload management APIs
- [Trace Management](#Trace-Management) - Trace management APIs for organizing and categorizing content with traces
- [访客会话管理](#访客会话管理) - 访客会话管理相关接口
- [浏览记录匿名管理](#浏览记录匿名管理) - 浏览记录匿名相关接口
- [MinIO Storage](#MinIO-Storage) - MinIO object storage management APIs
- [OpenPlatform Management](#OpenPlatform-Management) - OpenPlatform management APIs for organizing and categorizing content with openPlatforms
- [会话邀请](#会话邀请) - 会话邀请相关接口
- [客服状态管理](#客服状态管理) - 客服状态管理相关接口
- [WorkflowNode Management](#WorkflowNode-Management) - WorkflowNode management APIs for organizing and categorizing content with workflow_nodes
- [Authentication](#Authentication) - Authentication APIs
- [消息纠错管理](#消息纠错管理) - 消息纠错管理相关接口
- [会话小结](#会话小结) - 会话小结相关接口
- [QualityPlan Management](#QualityPlan-Management) - QualityPlan management APIs for organizing and categorizing content with plans
- [SmsProvider Management](#SmsProvider-Management) - SmsProvider management APIs for organizing and categorizing content with sms_providers
- [分词接口](#分词接口) - 中文分词相关API
- [StatisticToken Management](#StatisticToken-Management) - StatisticToken management APIs for organizing and categorizing content with statisticTokens
- [Booking Management](#Booking-Management) - Booking management APIs for organizing and categorizing content with bookings
- [路由规则管理](#路由规则管理) - 路由规则管理相关接口
- [Menu Management](#Menu-Management) - Menu management APIs for organizing and categorizing content with menus
- [AiStatistic Management](#AiStatistic-Management) - AiStatistic management APIs for organizing and categorizing content with statistics
- [Role Management](#Role-Management) - Role management APIs for managing user roles and permissions
- [Consumer Management](#Consumer-Management) - Consumer management APIs for organizing and categorizing content with consumers
- [未读消息管理](#未读消息管理) - 未读消息管理相关接口
- [文章匿名管理](#文章匿名管理) - 文章匿名相关接口
- [User Management](#User-Management) - User management APIs
- [Blog Management](#Blog-Management) - Blog management APIs for organizing and categorizing content with blogs
- [CallMrcp Management](#CallMrcp-Management) - CallMrcp management APIs for organizing and categorizing content with tags
- [知识库管理](#知识库管理) - 知识库管理相关接口
- [Redis Stream Management](#Redis-Stream-Management) - Redis stream management APIs for event streaming
- [Note Management](#Note-Management) - Note management APIs for organizing and categorizing content with notes
- [关键词回复管理](#关键词回复管理) - 关键词回复管理相关接口
- [Complaint Management](#Complaint-Management) - Complaint management APIs for organizing and categorizing content with complaints
- [意图设置管理](#意图设置管理) - 意图设置管理相关接口
- [Sms Management](#Sms-Management) - Sms management APIs for organizing and categorizing content with smss
- [TaskComment Management](#TaskComment-Management) - TaskComment management APIs for organizing and categorizing content with taskComments
- [QualityCheck Management](#QualityCheck-Management) - QualityCheck management APIs for organizing and categorizing content with checks
- [QualityFlow Management](#QualityFlow-Management) - QualityFlow management APIs for organizing and categorizing content with tags
- [Settings Management](#Settings-Management) - Settings management APIs for organizing and categorizing content with settings
- [表单管理](#表单管理) - 表单管理相关接口
- [TicketSettings Management](#TicketSettings-Management) - TicketSettings management APIs for organizing and categorizing content with ticketSettings
- [File Preview and Download](#File-Preview-and-Download) - File preview and download APIs for displaying and downloading uploaded files
- [工作组配置管理](#工作组配置管理) - 工作组配置相关接口
- [机器人管理](#机器人管理) - 机器人管理相关接口
- [Notice Management](#Notice-Management) - Notice management APIs for system announcements and notifications
- [Server Metrics Management](#Server-Metrics-Management) - Server metrics management APIs for monitoring and analyzing server performance data
- [转接关键词管理](#转接关键词管理) - 转接关键词管理相关接口
- [访客管理](#访客管理) - 访客管理相关接口
- [机器人配置管理](#机器人配置管理) - 机器人配置相关接口
- [转接关键词](#转接关键词) - 转接关键词相关接口
- [文章归档管理](#文章归档管理) - 文章归档管理相关接口
- [department - 部门](#department---部门) - department apis
- [Moment Management](#Moment-Management) - Moment management APIs for organizing and categorizing content with moments
- [Document Management](#Document-Management) - Document management APIs for organizing and categorizing content with documents
- [LLM提供商管理](#LLM提供商管理) - LLM提供商管理相关接口
- [常见问题管理](#常见问题管理) - 常见问题管理相关接口
- [企业版消息管理](#企业版消息管理) - 企业版消息管理相关接口，包含未读消息等高级功能
- [Push Notification Management](#Push-Notification-Management) - Push notification management APIs for sending and managing push notifications
- [QualityStatistic Management](#QualityStatistic-Management) - QualityStatistic management APIs for organizing and categorizing content with tags
- [Relation Management](#Relation-Management) - Relation management APIs for organizing and categorizing content with relations
- [Server Management](#Server-Management) - Server management APIs for organizing and categorizing content with servers
- [Clipboard Management](#Clipboard-Management) - Clipboard management APIs for sharing and managing clipboard content
- [McpServer Management](#McpServer-Management) - McpServer management APIs for organizing and categorizing content with mcpServers
- [JanusVideo Management](#JanusVideo-Management) - JanusVideo management APIs for organizing and categorizing content with videos
- [Asset Management](#Asset-Management) - Asset management APIs for organizing and categorizing content with assets
- [Announcement Management](#Announcement-Management) - Announcement management APIs for organizing and categorizing content with announcements
- [Group Notice Management](#Group-Notice-Management) - Group notice management APIs for managing announcements within groups
- [SmsTemplate Management](#SmsTemplate-Management) - SmsTemplate management APIs for organizing and categorizing content with sms_templates
- [Tag Management](#Tag-Management) - Tag management APIs for organizing and categorizing content with tags
- [渠道应用管理](#渠道应用管理) - 渠道应用管理相关接口
- [节假日管理](#节假日管理) - 节假日管理相关接口
- [未回复消息管理](#未回复消息管理) - 未回复消息管理相关接口
- [QuartzTask Management](#QuartzTask-Management) - QuartzTask management APIs for organizing and categorizing content with quartz_tasks
- [会话管理](#会话管理) - 会话管理相关接口，包括查询、创建、更新、删除、置顶、标星等操作
- [会话小结管理](#会话小结管理) - 会话小结管理相关接口
- [浏览记录管理](#浏览记录管理) - 浏览记录管理相关接口
- [队列成员管理](#队列成员管理) - 队列成员管理相关接口
- [Authority Management](#Authority-Management) - Authority management APIs

## Action Log Management

Action log management APIs for tracking user activities and system events

### Update Action Log

**方法**: ` POST `  
**路径**: `/api/v1/action/update`  
**操作ID**: `update_200`  

**描述**: Update an existing action log entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Action Log

**方法**: ` POST `  
**路径**: `/api/v1/action/delete`  
**操作ID**: `delete_200`  

**描述**: Delete an action log entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/action/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/action/delete/org`  
**操作ID**: `deleteByOrgUid_200`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Action Log

**方法**: ` POST `  
**路径**: `/api/v1/action/create`  
**操作ID**: `create_202`  

**描述**: Create a new action log entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Action Logs by User

**方法**: ` GET `  
**路径**: `/api/v1/action/query`  
**操作ID**: `queryByUser_200`  

**描述**: Retrieve action logs for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ActionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Action Log by UID

**方法**: ` GET `  
**路径**: `/api/v1/action/query/uid`  
**操作ID**: `queryByUid_200`  

**描述**: Retrieve a specific action log by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ActionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Action Logs by Organization

**方法**: ` GET `  
**路径**: `/api/v1/action/query/org`  
**操作ID**: `queryByOrg_200`  

**描述**: Retrieve action logs for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ActionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Action Logs

**方法**: ` GET `  
**路径**: `/api/v1/action/export`  
**操作ID**: `export_200`  

**描述**: Export action logs to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ActionRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 客户管理

客户管理相关接口

### 更新客户

**方法**: ` POST `  
**路径**: `/api/v1/customer/update`  
**操作ID**: `update_171`  

**描述**: 更新客户信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除客户

**方法**: ` POST `  
**路径**: `/api/v1/customer/delete`  
**操作ID**: `delete_171`  

**描述**: 删除指定的客户

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/customer/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/customer/delete/org`  
**操作ID**: `deleteByOrgUid_171`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建客户

**方法**: ` POST `  
**路径**: `/api/v1/customer/create`  
**操作ID**: `create_173`  

**描述**: 创建新的客户

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的客户

**方法**: ` GET `  
**路径**: `/api/v1/customer/query`  
**操作ID**: `queryByUser_171`  

**描述**: 根据用户ID查询客户列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CustomerRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询访客下的客户

**方法**: ` GET `  
**路径**: `/api/v1/customer/query/visitorUid`  
**操作ID**: `queryByVisitorUid_1`  

**描述**: 根据访客UID查询客户列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CustomerRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定客户

**方法**: ` GET `  
**路径**: `/api/v1/customer/query/uid`  
**操作ID**: `queryByUid_171`  

**描述**: 根据UID查询客户详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CustomerRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的客户

**方法**: ` GET `  
**路径**: `/api/v1/customer/query/org`  
**操作ID**: `queryByOrg_171`  

**描述**: 根据组织ID查询客户列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CustomerRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出客户

**方法**: ` GET `  
**路径**: `/api/v1/customer/export`  
**操作ID**: `export_171`  

**描述**: 导出客户数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CustomerRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## McpClient Management

McpClient management APIs for organizing and categorizing content with mcp_clients

### Update McpClient

**方法**: ` POST `  
**路径**: `/api/v1/mcp/client/update`  
**操作ID**: `update_130`  

**描述**: Update an existing mcp_client

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete McpClient

**方法**: ` POST `  
**路径**: `/api/v1/mcp/client/delete`  
**操作ID**: `delete_130`  

**描述**: Delete a mcp_client

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/mcp/client/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/mcp/client/delete/org`  
**操作ID**: `deleteByOrgUid_130`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create McpClient

**方法**: ` POST `  
**路径**: `/api/v1/mcp/client/create`  
**操作ID**: `create_132`  

**描述**: Create a new mcp_client

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query McpClients by User

**方法**: ` GET `  
**路径**: `/api/v1/mcp/client/query`  
**操作ID**: `queryByUser_130`  

**描述**: Retrieve mcp_clients for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpClientRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query McpClient by UID

**方法**: ` GET `  
**路径**: `/api/v1/mcp/client/query/uid`  
**操作ID**: `queryByUid_130`  

**描述**: Retrieve a specific mcp_client by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpClientRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query McpClients by Organization

**方法**: ` GET `  
**路径**: `/api/v1/mcp/client/query/org`  
**操作ID**: `queryByOrg_130`  

**描述**: Retrieve mcp_clients for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpClientRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export McpClients

**方法**: ` GET `  
**路径**: `/api/v1/mcp/client/export`  
**操作ID**: `export_130`  

**描述**: Export mcp_clients to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpClientRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 队列成员管理(企业版)

队列成员高级AI接口

### 会话小结

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/summary`  
**操作ID**: `autoSummary_2`  

**描述**: 调用大模型自动生成会话小结，并写回队列成员记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 生成成功

---

### 意图识别

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/intention`  
**操作ID**: `autoIntention`  

**描述**: 调用大模型对会话进行意图识别，并写回队列成员记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 识别成功

---

### 情绪分析

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/emotion`  
**操作ID**: `autoEmotion`  

**描述**: 调用大模型对会话进行情绪分析，并写回队列成员记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 识别成功

---

## 消息评价管理

消息评价管理相关接口

### 更新消息评价

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/update`  
**操作ID**: `update_122`  

**描述**: 更新消息评价信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除消息评价

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/delete`  
**操作ID**: `delete_121`  

**描述**: 删除指定的消息评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/message/rating/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/delete/org`  
**操作ID**: `deleteByOrgUid_121`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建消息评价

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/create`  
**操作ID**: `create_123`  

**描述**: 创建新的消息评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的消息评价

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/query`  
**操作ID**: `queryByUser_121`  

**描述**: 根据用户ID查询消息评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定消息评价

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/query/uid`  
**操作ID**: `queryByUid_121`  

**描述**: 根据UID查询消息评价详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的消息评价

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/query/org`  
**操作ID**: `queryByOrg_121`  

**描述**: 根据组织ID查询消息评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/message/rating/export

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/export`  
**操作ID**: `export_121`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

## AI机器人测试

AI机器人服务测试接口

### 摘要生成测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/summary-generation`  
**操作ID**: `testSummaryGeneration`  

**描述**: 测试AI摘要生成功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

### 会话标题生成测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/session-title-generation`  
**操作ID**: `testSessionTitleGeneration`  

**描述**: 测试AI会话标题生成功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

### 关系提取测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/relationship-extraction`  
**操作ID**: `testRelationshipExtraction`  

**描述**: 测试AI关系提取功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

### 查询重写测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/query-rewrite`  
**操作ID**: `testQueryRewrite`  

**描述**: 测试AI查询重写功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

### 备用回复测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/fallback-response`  
**操作ID**: `testFallbackResponse`  

**描述**: 测试AI备用回复生成功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

### 实体提取测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/entity-extraction`  
**操作ID**: `testEntityExtraction`  

**描述**: 测试AI实体提取功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

### 上下文模板摘要测试

**方法**: ` POST `  
**路径**: `/test/api/v1/robot/context-template-summary`  
**操作ID**: `testContextTemplateSummary`  

**描述**: 测试AI上下文模板摘要功能

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 测试成功

---

## TaskList Management

TaskList management APIs for organizing and categorizing content with task_lists

### Update TaskList

**方法**: ` POST `  
**路径**: `/api/v1/task/list/update`  
**操作ID**: `update_63`  

**描述**: Update an existing task_list

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete TaskList

**方法**: ` POST `  
**路径**: `/api/v1/task/list/delete`  
**操作ID**: `delete_62`  

**描述**: Delete a task_list

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/task/list/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/task/list/delete/org`  
**操作ID**: `deleteByOrgUid_62`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create TaskList

**方法**: ` POST `  
**路径**: `/api/v1/task/list/create`  
**操作ID**: `create_64`  

**描述**: Create a new task_list

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query TaskLists by User

**方法**: ` GET `  
**路径**: `/api/v1/task/list/query`  
**操作ID**: `queryByUser_63`  

**描述**: Retrieve task_lists for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskListRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TaskList by UID

**方法**: ` GET `  
**路径**: `/api/v1/task/list/query/uid`  
**操作ID**: `queryByUid_63`  

**描述**: Retrieve a specific task_list by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskListRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TaskLists by Organization

**方法**: ` GET `  
**路径**: `/api/v1/task/list/query/org`  
**操作ID**: `queryByOrg_63`  

**描述**: Retrieve task_lists for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskListRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export TaskLists

**方法**: ` GET `  
**路径**: `/api/v1/task/list/export`  
**操作ID**: `export_62`  

**描述**: Export task_lists to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskListRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Feedback Management

Feedback management APIs for organizing and categorizing content with feedbacks

### Update Feedback

**方法**: ` POST `  
**路径**: `/api/v1/feedback/update`  
**操作ID**: `update_158`  

**描述**: Update an existing feedback

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Feedback

**方法**: ` POST `  
**路径**: `/api/v1/feedback/delete`  
**操作ID**: `delete_158`  

**描述**: Delete a feedback

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/feedback/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/feedback/delete/org`  
**操作ID**: `deleteByOrgUid_158`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Feedback

**方法**: ` POST `  
**路径**: `/api/v1/feedback/create`  
**操作ID**: `create_160`  

**描述**: Create a new feedback

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Feedbacks by User

**方法**: ` GET `  
**路径**: `/api/v1/feedback/query`  
**操作ID**: `queryByUser_158`  

**描述**: Retrieve feedbacks for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FeedbackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Feedback by UID

**方法**: ` GET `  
**路径**: `/api/v1/feedback/query/uid`  
**操作ID**: `queryByUid_158`  

**描述**: Retrieve a specific feedback by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FeedbackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Feedbacks by Organization

**方法**: ` GET `  
**路径**: `/api/v1/feedback/query/org`  
**操作ID**: `queryByOrg_158`  

**描述**: Retrieve feedbacks for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FeedbackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Feedbacks

**方法**: ` GET `  
**路径**: `/api/v1/feedback/export`  
**操作ID**: `export_158`  

**描述**: Export feedbacks to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FeedbackRequest | query | 是 |  |

#### 响应

**200**: OK

---

## IP White Management

IP whitelist management APIs for allowing specific IP addresses

### Update IP White Entry

**方法**: ` POST `  
**路径**: `/api/v1/ip/white/update`  
**操作ID**: `update_144`  

**描述**: Update an existing IP whitelist entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete IP White Entry

**方法**: ` POST `  
**路径**: `/api/v1/ip/white/delete`  
**操作ID**: `delete_144`  

**描述**: Remove an IP address from the whitelist

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ip/white/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ip/white/delete/org`  
**操作ID**: `deleteByOrgUid_144`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create IP White Entry

**方法**: ` POST `  
**路径**: `/api/v1/ip/white/create`  
**操作ID**: `create_146`  

**描述**: Add an IP address to the whitelist

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query IP White by User

**方法**: ` GET `  
**路径**: `/api/v1/ip/white/query`  
**操作ID**: `queryByUser_144`  

**描述**: Retrieve IP whitelist for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpWhiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/ip/white/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/ip/white/query/uid`  
**操作ID**: `queryByUid_144`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpWhiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query IP White by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ip/white/query/org`  
**操作ID**: `queryByOrg_144`  

**描述**: Retrieve IP whitelist for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpWhiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/ip/white/export

**方法**: ` GET `  
**路径**: `/api/v1/ip/white/export`  
**操作ID**: `export_144`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpWhiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

## KbaseStatistic Management

KbaseStatistic management APIs for organizing and categorizing content with statistics

### Update KbaseStatistic

**方法**: ` POST `  
**路径**: `/api/v1/kbase/statistic/update`  
**操作ID**: `update_140`  

**描述**: Update an existing statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete KbaseStatistic

**方法**: ` POST `  
**路径**: `/api/v1/kbase/statistic/delete`  
**操作ID**: `delete_139`  

**描述**: Delete a statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/kbase/statistic/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/kbase/statistic/delete/org`  
**操作ID**: `deleteByOrgUid_139`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create KbaseStatistic

**方法**: ` POST `  
**路径**: `/api/v1/kbase/statistic/create`  
**操作ID**: `create_141`  

**描述**: Create a new statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query KbaseStatistics by User

**方法**: ` GET `  
**路径**: `/api/v1/kbase/statistic/query`  
**操作ID**: `queryByUser_139`  

**描述**: Retrieve statistics for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query KbaseStatistic by UID

**方法**: ` GET `  
**路径**: `/api/v1/kbase/statistic/query/uid`  
**操作ID**: `queryByUid_139`  

**描述**: Retrieve a specific statistic by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query KbaseStatistics by Organization

**方法**: ` GET `  
**路径**: `/api/v1/kbase/statistic/query/org`  
**操作ID**: `queryByOrg_139`  

**描述**: Retrieve statistics for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export KbaseStatistics

**方法**: ` GET `  
**路径**: `/api/v1/kbase/statistic/export`  
**操作ID**: `export_139`  

**描述**: Export statistics to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 模板管理

模板管理相关接口

### 更新模板

**方法**: ` POST `  
**路径**: `/api/v1/message/template/update`  
**操作ID**: `update_121`  

**描述**: 更新现有的模板

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除模板

**方法**: ` POST `  
**路径**: `/api/v1/message/template/delete`  
**操作ID**: `delete_120`  

**描述**: 删除指定的模板

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/message/template/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/template/delete/org`  
**操作ID**: `deleteByOrgUid_120`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建模板

**方法**: ` POST `  
**路径**: `/api/v1/message/template/create`  
**操作ID**: `create_122`  

**描述**: 创建新的模板

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询模板

**方法**: ` GET `  
**路径**: `/api/v1/message/template/query`  
**操作ID**: `queryByUser_120`  

**描述**: 查询用户的模板列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询模板

**方法**: ` GET `  
**路径**: `/api/v1/message/template/query/uid`  
**操作ID**: `queryByUid_120`  

**描述**: 通过UID查询具体的模板

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询模板

**方法**: ` GET `  
**路径**: `/api/v1/message/template/query/org`  
**操作ID**: `queryByOrg_120`  

**描述**: 查询组织的模板列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出模板

**方法**: ` GET `  
**路径**: `/api/v1/message/template/export`  
**操作ID**: `export_120`  

**描述**: 导出模板数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

## VocComment Management

VocComment management APIs for organizing and categorizing content with comments

### Update VocComment

**方法**: ` POST `  
**路径**: `/api/v1/voc/comment/update`  
**操作ID**: `update_28`  

**描述**: Update an existing comment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete VocComment

**方法**: ` POST `  
**路径**: `/api/v1/voc/comment/delete`  
**操作ID**: `delete_28`  

**描述**: Delete a comment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/voc/comment/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/voc/comment/delete/org`  
**操作ID**: `deleteByOrgUid_28`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create VocComment

**方法**: ` POST `  
**路径**: `/api/v1/voc/comment/create`  
**操作ID**: `create_30`  

**描述**: Create a new comment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query VocComments by User

**方法**: ` GET `  
**路径**: `/api/v1/voc/comment/query`  
**操作ID**: `queryByUser_28`  

**描述**: Retrieve comments for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VocCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query VocComment by UID

**方法**: ` GET `  
**路径**: `/api/v1/voc/comment/query/uid`  
**操作ID**: `queryByUid_28`  

**描述**: Retrieve a specific comment by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VocCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query VocComments by Organization

**方法**: ` GET `  
**路径**: `/api/v1/voc/comment/query/org`  
**操作ID**: `queryByOrg_28`  

**描述**: Retrieve comments for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VocCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export VocComments

**方法**: ` GET `  
**路径**: `/api/v1/voc/comment/export`  
**操作ID**: `export_28`  

**描述**: Export comments to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VocCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话评价管理

会话评价管理相关接口

### 更新会话评价

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/update`  
**操作ID**: `update_57`  

**描述**: 更新会话评价信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话评价

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/delete`  
**操作ID**: `delete_56`  

**描述**: 删除指定的会话评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/rating/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/delete/org`  
**操作ID**: `deleteByOrgUid_56`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话评价

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/create`  
**操作ID**: `create_58`  

**描述**: 创建新的会话评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query`  
**操作ID**: `queryByUser_56`  

**描述**: 根据用户ID查询会话评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query/uid`  
**操作ID**: `queryByUid_56`  

**描述**: 根据UID查询会话评价详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query/thread/uid`  
**操作ID**: `queryByThreadUid_5`  

**描述**: 根据会话UID查询评价信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query/org`  
**操作ID**: `queryByOrg_56`  

**描述**: 根据组织ID查询会话评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 邀请评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/invite`  
**操作ID**: `invite_1`  

**描述**: 客服主动邀请用户评价

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 邀请成功

---

### 导出会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/export`  
**操作ID**: `export_56`  

**描述**: 导出会话评价数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 黑名单管理

黑名单增删改查操作

### 更新黑名单

**方法**: ` POST `  
**路径**: `/api/v1/black/update`  
**操作ID**: `update_185`  

**描述**: 更新已存在的黑名单记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 解除黑名单

**方法**: ` POST `  
**路径**: `/api/v1/black/unblock/blackUid`  
**操作ID**: `unblockByBlackUid`  

**描述**: 解除指定的黑名单

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除黑名单

**方法**: ` POST `  
**路径**: `/api/v1/black/delete`  
**操作ID**: `delete_185`  

**描述**: 删除指定的黑名单记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/black/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/black/delete/org`  
**操作ID**: `deleteByOrgUid_185`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建黑名单

**方法**: ` POST `  
**路径**: `/api/v1/black/create`  
**操作ID**: `create_187`  

**描述**: 创建新的黑名单记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询黑名单

**方法**: ` GET `  
**路径**: `/api/v1/black/query`  
**操作ID**: `queryByUser_185`  

**描述**: 返回当前用户的黑名单列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询黑名单

**方法**: ` GET `  
**路径**: `/api/v1/black/query/uid`  
**操作ID**: `queryByUid_185`  

**描述**: 根据唯一标识符查询黑名单

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询黑名单

**方法**: ` GET `  
**路径**: `/api/v1/black/query/org`  
**操作ID**: `queryByOrg_185`  

**描述**: 返回当前组织的黑名单列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出黑名单

**方法**: ` GET `  
**路径**: `/api/v1/black/export`  
**操作ID**: `export_185`  

**描述**: 导出黑名单数据到Excel

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询当前blackUid是否存在于黑名单中

**方法**: ` GET `  
**路径**: `/api/v1/black/exists/blackUid`  
**操作ID**: `existsByBlackUid`  

**描述**: 查询当前blackUid是否存在于黑名单中

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Opinion Management

Opinion management APIs for organizing and categorizing content with opinions

### Update Opinion

**方法**: ` POST `  
**路径**: `/api/v1/opinion/update`  
**操作ID**: `update_109`  

**描述**: Update an existing opinion

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Opinion

**方法**: ` POST `  
**路径**: `/api/v1/opinion/delete`  
**操作ID**: `delete_109`  

**描述**: Delete a opinion

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/opinion/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/opinion/delete/org`  
**操作ID**: `deleteByOrgUid_109`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Opinion

**方法**: ` POST `  
**路径**: `/api/v1/opinion/create`  
**操作ID**: `create_111`  

**描述**: Create a new opinion

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Opinions by User

**方法**: ` GET `  
**路径**: `/api/v1/opinion/query`  
**操作ID**: `queryByUser_109`  

**描述**: Retrieve opinions for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpinionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Opinion by UID

**方法**: ` GET `  
**路径**: `/api/v1/opinion/query/uid`  
**操作ID**: `queryByUid_109`  

**描述**: Retrieve a specific opinion by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpinionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Opinions by Organization

**方法**: ` GET `  
**路径**: `/api/v1/opinion/query/org`  
**操作ID**: `queryByOrg_109`  

**描述**: Retrieve opinions for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpinionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Opinions

**方法**: ` GET `  
**路径**: `/api/v1/opinion/export`  
**操作ID**: `export_109`  

**描述**: Export opinions to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpinionRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Calendar Management

Calendar management APIs for organizing and categorizing content with calendars

### Update Calendar

**方法**: ` POST `  
**路径**: `/api/v1/calendar/update`  
**操作ID**: `update_182`  

**描述**: Update an existing calendar

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Calendar

**方法**: ` POST `  
**路径**: `/api/v1/calendar/delete`  
**操作ID**: `delete_182`  

**描述**: Delete a calendar

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/calendar/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/calendar/delete/org`  
**操作ID**: `deleteByOrgUid_182`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Calendar

**方法**: ` POST `  
**路径**: `/api/v1/calendar/create`  
**操作ID**: `create_184`  

**描述**: Create a new calendar

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Calendars by User

**方法**: ` GET `  
**路径**: `/api/v1/calendar/query`  
**操作ID**: `queryByUser_182`  

**描述**: Retrieve calendars for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CalendarRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Calendar by UID

**方法**: ` GET `  
**路径**: `/api/v1/calendar/query/uid`  
**操作ID**: `queryByUid_182`  

**描述**: Retrieve a specific calendar by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CalendarRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Calendars by Organization

**方法**: ` GET `  
**路径**: `/api/v1/calendar/query/org`  
**操作ID**: `queryByOrg_182`  

**描述**: Retrieve calendars for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CalendarRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Calendars

**方法**: ` GET `  
**路径**: `/api/v1/calendar/export`  
**操作ID**: `export_182`  

**描述**: Export calendars to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CalendarRequest | query | 是 |  |

#### 响应

**200**: OK

---

## TicketRating Management

TicketRating management APIs for organizing and categorizing content with ticket_ratings

### Update TicketRating

**方法**: ` POST `  
**路径**: `/api/v1/ticket_rating/update`  
**操作ID**: `update_49`  

**描述**: Update an existing ticket_rating

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete TicketRating

**方法**: ` POST `  
**路径**: `/api/v1/ticket_rating/delete`  
**操作ID**: `delete_49`  

**描述**: Delete a ticket_rating

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ticket_rating/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ticket_rating/delete/org`  
**操作ID**: `deleteByOrgUid_49`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create TicketRating

**方法**: ` POST `  
**路径**: `/api/v1/ticket_rating/create`  
**操作ID**: `create_51`  

**描述**: Create a new ticket_rating

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query TicketRatings by User

**方法**: ` GET `  
**路径**: `/api/v1/ticket_rating/query`  
**操作ID**: `queryByUser_49`  

**描述**: Retrieve ticket_ratings for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TicketRating by UID

**方法**: ` GET `  
**路径**: `/api/v1/ticket_rating/query/uid`  
**操作ID**: `queryByUid_49`  

**描述**: Retrieve a specific ticket_rating by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TicketRatings by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ticket_rating/query/org`  
**操作ID**: `queryByOrg_49`  

**描述**: Retrieve ticket_ratings for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export TicketRatings

**方法**: ` GET `  
**路径**: `/api/v1/ticket_rating/export`  
**操作ID**: `export_49`  

**描述**: Export ticket_ratings to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

## JanusAudio Management

JanusAudio management APIs for organizing and categorizing content with audios

### Update JanusAudio

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/audio/update`  
**操作ID**: `update_181`  

**描述**: Update an existing janus_audio

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete JanusAudio

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/audio/delete`  
**操作ID**: `delete_181`  

**描述**: Delete a janus_audio

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/call/janus/audio/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/audio/delete/org`  
**操作ID**: `deleteByOrgUid_181`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create JanusAudio

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/audio/create`  
**操作ID**: `create_183`  

**描述**: Create a new janus_audio

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query JanusAudios by User

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/audio/query`  
**操作ID**: `queryByUser_181`  

**描述**: Retrieve audios for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusAudioRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query JanusAudio by UID

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/audio/query/uid`  
**操作ID**: `queryByUid_181`  

**描述**: Retrieve a specific janus_audio by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusAudioRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query JanusAudios by Organization

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/audio/query/org`  
**操作ID**: `queryByOrg_181`  

**描述**: Retrieve audios for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusAudioRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export JanusAudios

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/audio/export`  
**操作ID**: `export_181`  

**描述**: Export audios to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusAudioRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 统一消息管理

统一消息管理相关接口

### 更新统一消息

**方法**: ` POST `  
**路径**: `/api/v1/unified/update`  
**操作ID**: `update_40`  

**描述**: 更新统一消息信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新统一头像

**方法**: ` POST `  
**路径**: `/api/v1/unified/update/avatar`  
**操作ID**: `updateAvatar_1`  

**描述**: 更新统一头像

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除统一消息

**方法**: ` POST `  
**路径**: `/api/v1/unified/delete`  
**操作ID**: `delete_40`  

**描述**: 删除指定的统一消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/unified/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/unified/delete/org`  
**操作ID**: `deleteByOrgUid_40`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建统一消息

**方法**: ` POST `  
**路径**: `/api/v1/unified/create`  
**操作ID**: `create_42`  

**描述**: 创建新的统一消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的统一消息

**方法**: ` GET `  
**路径**: `/api/v1/unified/query`  
**操作ID**: `queryByUser_40`  

**描述**: 根据用户ID查询统一消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UnifiedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/unified/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/unified/query/uid`  
**操作ID**: `queryByUid_40`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UnifiedRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的统一消息

**方法**: ` GET `  
**路径**: `/api/v1/unified/query/org`  
**操作ID**: `queryByOrg_40`  

**描述**: 根据组织ID查询统一消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UnifiedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出统一消息

**方法**: ` GET `  
**路径**: `/api/v1/unified/export`  
**操作ID**: `export_40`  

**描述**: 导出统一消息数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UnifiedRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## QualityAppeal Management

QualityAppeal management APIs for organizing and categorizing content with appeals

### Update QualityAppeal

**方法**: ` POST `  
**路径**: `/api/v1/quality/appeal/update`  
**操作ID**: `update_99`  

**描述**: Update an existing appeal

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Reject QualityAppeal

**方法**: ` POST `  
**路径**: `/api/v1/quality/appeal/reject`  
**操作ID**: `reject_3`  

**描述**: Reject a quality appeal

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete QualityAppeal

**方法**: ` POST `  
**路径**: `/api/v1/quality/appeal/delete`  
**操作ID**: `delete_99`  

**描述**: Delete a appeal

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/quality/appeal/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/quality/appeal/delete/org`  
**操作ID**: `deleteByOrgUid_99`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create QualityAppeal

**方法**: ` POST `  
**路径**: `/api/v1/quality/appeal/create`  
**操作ID**: `create_101`  

**描述**: Create a new appeal

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Approve QualityAppeal

**方法**: ` POST `  
**路径**: `/api/v1/quality/appeal/approve`  
**操作ID**: `approve`  

**描述**: Approve a quality appeal

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query QualityAppeals by User

**方法**: ` GET `  
**路径**: `/api/v1/quality/appeal/query`  
**操作ID**: `queryByUser_99`  

**描述**: Retrieve appeals for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityAppealRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityAppeal by UID

**方法**: ` GET `  
**路径**: `/api/v1/quality/appeal/query/uid`  
**操作ID**: `queryByUid_99`  

**描述**: Retrieve a specific appeal by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityAppealRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityAppeals by Organization

**方法**: ` GET `  
**路径**: `/api/v1/quality/appeal/query/org`  
**操作ID**: `queryByOrg_99`  

**描述**: Retrieve appeals for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityAppealRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export QualityAppeals

**方法**: ` GET `  
**路径**: `/api/v1/quality/appeal/export`  
**操作ID**: `export_99`  

**描述**: Export appeals to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityAppealRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 访客评价匿名管理

访客评价匿名相关接口

### 提交访客评价

**方法**: ` POST `  
**路径**: `/visitor/api/v1/visitor/rating/submit`  
**操作ID**: `submit`  

**描述**: 访客提交评价信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

## Screen Management

Screen management APIs for organizing and categorizing content with screens

### Update Screen

**方法**: ` POST `  
**路径**: `/api/v1/screen/update`  
**操作ID**: `update_78`  

**描述**: Update an existing screen

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Screen

**方法**: ` POST `  
**路径**: `/api/v1/screen/delete`  
**操作ID**: `delete_78`  

**描述**: Delete a screen

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/screen/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/screen/delete/org`  
**操作ID**: `deleteByOrgUid_78`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Screen

**方法**: ` POST `  
**路径**: `/api/v1/screen/create`  
**操作ID**: `create_80`  

**描述**: Create a new screen

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Screens by User

**方法**: ` GET `  
**路径**: `/api/v1/screen/query`  
**操作ID**: `queryByUser_78`  

**描述**: Retrieve screens for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScreenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Screen by UID

**方法**: ` GET `  
**路径**: `/api/v1/screen/query/uid`  
**操作ID**: `queryByUid_78`  

**描述**: Retrieve a specific screen by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScreenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Screens by Organization

**方法**: ` GET `  
**路径**: `/api/v1/screen/query/org`  
**操作ID**: `queryByOrg_78`  

**描述**: Retrieve screens for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScreenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Screens

**方法**: ` GET `  
**路径**: `/api/v1/screen/export`  
**操作ID**: `export_78`  

**描述**: Export screens to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScreenRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 群组管理

群组管理相关接口

### 更新群组

**方法**: ` POST `  
**路径**: `/api/v1/group/update`  
**操作ID**: `update_151`  

**描述**: 更新群组信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新群组置顶提示

**方法**: ` POST `  
**路径**: `/api/v1/group/update/topTip`  
**操作ID**: `updateGroupTopTip`  

**描述**: 更新群组的置顶提示信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新群组名称

**方法**: ` POST `  
**路径**: `/api/v1/group/update/name`  
**操作ID**: `updateGroupName`  

**描述**: 更新群组的名称

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 移除成员

**方法**: ` POST `  
**路径**: `/api/v1/group/remove`  
**操作ID**: `removeMembers`  

**描述**: 从群组中移除成员

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 移除成功

---

### 退出群组

**方法**: ` POST `  
**路径**: `/api/v1/group/leave`  
**操作ID**: `leaveGroup`  

**描述**: 退出指定的群组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 退出成功

---

### 加入群组

**方法**: ` POST `  
**路径**: `/api/v1/group/join`  
**操作ID**: `joinGroup`  

**描述**: 加入指定的群组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 加入成功

---

### 邀请成员

**方法**: ` POST `  
**路径**: `/api/v1/group/invite`  
**操作ID**: `inviteMembers`  

**描述**: 邀请成员加入群组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 邀请成功

---

### 解散群组

**方法**: ` POST `  
**路径**: `/api/v1/group/dismiss`  
**操作ID**: `dismissGroup`  

**描述**: 解散指定的群组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 解散成功

---

### 删除群组

**方法**: ` POST `  
**路径**: `/api/v1/group/delete`  
**操作ID**: `delete_153`  

**描述**: 删除指定的群组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/group/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/group/delete/org`  
**操作ID**: `deleteByOrgUid_153`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建群组

**方法**: ` POST `  
**路径**: `/api/v1/group/create`  
**操作ID**: `create_155`  

**描述**: 创建新的群组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的群组

**方法**: ` GET `  
**路径**: `/api/v1/group/query`  
**操作ID**: `queryByUser_151`  

**描述**: 根据用户ID查询群组列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定群组

**方法**: ` GET `  
**路径**: `/api/v1/group/query/uid`  
**操作ID**: `queryByUid_151`  

**描述**: 根据UID查询群组详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的群组

**方法**: ` GET `  
**路径**: `/api/v1/group/query/org`  
**操作ID**: `queryByOrg_151`  

**描述**: 根据组织ID查询群组列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询群组成员

**方法**: ` GET `  
**路径**: `/api/v1/group/query/members`  
**操作ID**: `queryMembers`  

**描述**: 分页查询群组成员

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出群组

**方法**: ` GET `  
**路径**: `/api/v1/group/export`  
**操作ID**: `export_153`  

**描述**: 导出群组数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Schedule Management

Schedule management APIs for organizing and categorizing content with schedules

### Update Schedule

**方法**: ` POST `  
**路径**: `/api/v1/schedule/update`  
**操作ID**: `update_79`  

**描述**: Update an existing schedule

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Schedule

**方法**: ` POST `  
**路径**: `/api/v1/schedule/delete`  
**操作ID**: `delete_79`  

**描述**: Delete a schedule

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/schedule/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/schedule/delete/org`  
**操作ID**: `deleteByOrgUid_79`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Schedule

**方法**: ` POST `  
**路径**: `/api/v1/schedule/create`  
**操作ID**: `create_81`  

**描述**: Create a new schedule

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Schedules by User

**方法**: ` GET `  
**路径**: `/api/v1/schedule/query`  
**操作ID**: `queryByUser_79`  

**描述**: Retrieve schedules for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScheduleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Schedule by UID

**方法**: ` GET `  
**路径**: `/api/v1/schedule/query/uid`  
**操作ID**: `queryByUid_79`  

**描述**: Retrieve a specific schedule by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScheduleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Schedules by Organization

**方法**: ` GET `  
**路径**: `/api/v1/schedule/query/org`  
**操作ID**: `queryByOrg_79`  

**描述**: Retrieve schedules for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScheduleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Schedules

**方法**: ` GET `  
**路径**: `/api/v1/schedule/export`  
**操作ID**: `export_79`  

**描述**: Export schedules to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ScheduleRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Plugin Management

插件管理接口

### 获取所有插件

**方法**: ` GET `  
**路径**: `/api/v1/plugins`  
**操作ID**: `getAllPlugins`  

**描述**: 获取系统中所有已注册的插件列表

#### 响应

**200**: OK

---

### 获取插件详情

**方法**: ` GET `  
**路径**: `/api/v1/plugins/{pluginId}`  
**操作ID**: `getPlugin`  

**描述**: 根据插件ID获取插件详细信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| pluginId | string | path | 是 |  |

#### 响应

**200**: OK

---

### 获取插件统计信息

**方法**: ` GET `  
**路径**: `/api/v1/plugins/{pluginId}/statistics`  
**操作ID**: `getPluginStatistics`  

**描述**: 获取指定插件的统计数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| pluginId | string | path | 是 |  |

#### 响应

**200**: OK

---

### 获取插件健康状态

**方法**: ` GET `  
**路径**: `/api/v1/plugins/{pluginId}/health`  
**操作ID**: `getPluginHealth`  

**描述**: 获取指定插件的健康检查状态

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| pluginId | string | path | 是 |  |

#### 响应

**200**: OK

---

### 获取所有插件统计信息

**方法**: ` GET `  
**路径**: `/api/v1/plugins/statistics`  
**操作ID**: `getAllPluginsStatistics`  

**描述**: 获取系统中所有插件的统计数据

#### 响应

**200**: OK

---

### 获取插件概览

**方法**: ` GET `  
**路径**: `/api/v1/plugins/overview`  
**操作ID**: `getPluginsOverview`  

**描述**: 获取插件系统的概览信息

#### 响应

**200**: OK

---

### 获取所有插件健康状态

**方法**: ` GET `  
**路径**: `/api/v1/plugins/health`  
**操作ID**: `getAllPluginsHealth`  

**描述**: 获取系统中所有插件的健康检查状态

#### 响应

**200**: OK

---

### 获取已启用插件

**方法**: ` GET `  
**路径**: `/api/v1/plugins/enabled`  
**操作ID**: `getEnabledPlugins`  

**描述**: 获取系统中所有已启用的插件列表

#### 响应

**200**: OK

---

## 成员管理

成员管理相关接口

### 更新成员

**方法**: ` POST `  
**路径**: `/api/v1/member/update`  
**操作ID**: `update_128`  

**描述**: 更新成员信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除成员

**方法**: ` POST `  
**路径**: `/api/v1/member/delete`  
**操作ID**: `delete_128`  

**描述**: 删除指定的成员

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/member/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/member/delete/org`  
**操作ID**: `deleteByOrgUid_128`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建成员

**方法**: ` POST `  
**路径**: `/api/v1/member/create`  
**操作ID**: `create_130`  

**描述**: 创建新的成员

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 激活成员

**方法**: ` POST `  
**路径**: `/api/v1/member/activate`  
**操作ID**: `activate`  

**描述**: 激活指定的成员

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 激活成功

---

### 查询用户下的成员

**方法**: ` GET `  
**路径**: `/api/v1/member/query`  
**操作ID**: `queryByUser_128`  

**描述**: 根据用户ID查询成员信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据用户UID查询成员

**方法**: ` GET `  
**路径**: `/api/v1/member/query/userUid`  
**操作ID**: `queryByUserUid`  

**描述**: 根据用户UID查询成员信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定成员

**方法**: ` GET `  
**路径**: `/api/v1/member/query/uid`  
**操作ID**: `queryByUid_128`  

**描述**: 根据UID查询成员详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的成员

**方法**: ` GET `  
**路径**: `/api/v1/member/query/org`  
**操作ID**: `queryByOrg_128`  

**描述**: 根据组织ID查询成员列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出成员

**方法**: ` GET `  
**路径**: `/api/v1/member/export`  
**操作ID**: `export_128`  

**描述**: 导出成员数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MemberRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Subscription Management

Subscription management APIs for organizing and categorizing content with subscriptions

### Update Subscription

**方法**: ` POST `  
**路径**: `/api/v1/subscription/update`  
**操作ID**: `update_68`  

**描述**: Update an existing subscription

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Subscription

**方法**: ` POST `  
**路径**: `/api/v1/subscription/delete`  
**操作ID**: `delete_68`  

**描述**: Delete a subscription

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/subscription/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/subscription/delete/org`  
**操作ID**: `deleteByOrgUid_68`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Subscription

**方法**: ` POST `  
**路径**: `/api/v1/subscription/create`  
**操作ID**: `create_70`  

**描述**: Create a new subscription

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Subscriptions by User

**方法**: ` GET `  
**路径**: `/api/v1/subscription/query`  
**操作ID**: `queryByUser_68`  

**描述**: Retrieve subscriptions for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SubscriptionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Subscription by UID

**方法**: ` GET `  
**路径**: `/api/v1/subscription/query/uid`  
**操作ID**: `queryByUid_68`  

**描述**: Retrieve a specific subscription by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SubscriptionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Subscriptions by Organization

**方法**: ` GET `  
**路径**: `/api/v1/subscription/query/org`  
**操作ID**: `queryByOrg_68`  

**描述**: Retrieve subscriptions for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SubscriptionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Subscriptions

**方法**: ` GET `  
**路径**: `/api/v1/subscription/export`  
**操作ID**: `export_68`  

**描述**: Export subscriptions to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SubscriptionRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 消息解析管理

消息解析管理相关接口

### 更新消息解析

**方法**: ` POST `  
**路径**: `/api/v1/message/parsed/update`  
**操作ID**: `update_123`  

**描述**: 更新消息解析信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除消息解析

**方法**: ` POST `  
**路径**: `/api/v1/message/parsed/delete`  
**操作ID**: `delete_122`  

**描述**: 删除指定的消息解析

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/message/parsed/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/parsed/delete/org`  
**操作ID**: `deleteByOrgUid_122`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建消息解析

**方法**: ` POST `  
**路径**: `/api/v1/message/parsed/create`  
**操作ID**: `create_124`  

**描述**: 创建新的消息解析

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的消息解析

**方法**: ` GET `  
**路径**: `/api/v1/message/parsed/query`  
**操作ID**: `queryByUser_123`  

**描述**: 根据用户ID查询消息解析列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageParsedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定消息解析

**方法**: ` GET `  
**路径**: `/api/v1/message/parsed/query/uid`  
**操作ID**: `queryByUid_123`  

**描述**: 根据UID查询消息解析详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageParsedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的消息解析

**方法**: ` GET `  
**路径**: `/api/v1/message/parsed/query/org`  
**操作ID**: `queryByOrg_123`  

**描述**: 根据组织ID查询消息解析列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageParsedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出消息解析

**方法**: ` GET `  
**路径**: `/api/v1/message/parsed/export`  
**操作ID**: `export_122`  

**描述**: 导出消息解析数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageParsedRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Visitor Upload Management

Visitor upload APIs for anonymous file uploads

### Upload File

**方法**: ` POST `  
**路径**: `/visitor/api/v1/upload/file`  
**操作ID**: `upload`  

**描述**: Upload file anonymously

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Upload File with Watermark

**方法**: ` POST `  
**路径**: `/visitor/api/v1/upload/file/watermark`  
**操作ID**: `uploadWithWatermark`  

**描述**: Upload file with watermark control

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |
| addWatermark | boolean | query | 否 |  |
| watermarkText | string | query | 否 |  |
| watermarkPosition | string | query | 否 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Get Upload Security Config

**方法**: ` GET `  
**路径**: `/visitor/api/v1/upload/security/config`  
**操作ID**: `getUploadSecurityConfig`  

**描述**: Get upload security config for UI hints and pre-validation (anonymous)

#### 响应

**200**: OK

---

## 消息反馈管理

消息反馈管理相关接口

### 更新消息反馈

**方法**: ` POST `  
**路径**: `/api/v1/message/feedback/update`  
**操作ID**: `update_125`  

**描述**: 更新消息反馈信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除消息反馈

**方法**: ` POST `  
**路径**: `/api/v1/message/feedback/delete`  
**操作ID**: `delete_124`  

**描述**: 删除指定的消息反馈

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/message/feedback/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/feedback/delete/org`  
**操作ID**: `deleteByOrgUid_124`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建消息反馈

**方法**: ` POST `  
**路径**: `/api/v1/message/feedback/create`  
**操作ID**: `create_126`  

**描述**: 创建新的消息反馈

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的消息反馈

**方法**: ` GET `  
**路径**: `/api/v1/message/feedback/query`  
**操作ID**: `queryByUser_125`  

**描述**: 根据用户ID查询消息反馈列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageFeedbackRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定消息反馈

**方法**: ` GET `  
**路径**: `/api/v1/message/feedback/query/uid`  
**操作ID**: `queryByUid_125`  

**描述**: 根据UID查询消息反馈详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageFeedbackRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的消息反馈

**方法**: ` GET `  
**路径**: `/api/v1/message/feedback/query/org`  
**操作ID**: `queryByOrg_125`  

**描述**: 根据组织ID查询消息反馈列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageFeedbackRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出消息反馈

**方法**: ` GET `  
**路径**: `/api/v1/message/feedback/export`  
**操作ID**: `export_124`  

**描述**: 导出消息反馈数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageFeedbackRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 队列管理

队列管理相关接口

### 更新队列

**方法**: ` POST `  
**路径**: `/api/v1/queue/update`  
**操作ID**: `update_92`  

**描述**: 更新队列信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除队列

**方法**: ` POST `  
**路径**: `/api/v1/queue/delete`  
**操作ID**: `delete_93`  

**描述**: 删除指定的队列

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/queue/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/queue/delete/org`  
**操作ID**: `deleteByOrgUid_93`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建队列

**方法**: ` POST `  
**路径**: `/api/v1/queue/create`  
**操作ID**: `create_95`  

**描述**: 创建新的队列

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的队列

**方法**: ` GET `  
**路径**: `/api/v1/queue/query`  
**操作ID**: `queryByUser_92`  

**描述**: 根据用户ID查询队列列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定队列

**方法**: ` GET `  
**路径**: `/api/v1/queue/query/uid`  
**操作ID**: `queryByUid_92`  

**描述**: 根据UID查询队列详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询排队中会话

**方法**: ` GET `  
**路径**: `/api/v1/queue/query/queuing`  
**操作ID**: `queryQueuing`  

**描述**: 查询当前排队中的会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的队列

**方法**: ` GET `  
**路径**: `/api/v1/queue/query/org`  
**操作ID**: `queryByOrg_92`  

**描述**: 根据组织ID查询队列列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出队列

**方法**: ` GET `  
**路径**: `/api/v1/queue/export`  
**操作ID**: `export_93`  

**描述**: 导出队列数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

### 获取客服队列统计

**方法**: ` GET `  
**路径**: `/api/v1/queue/agent/stats`  
**操作ID**: `getAgentQueueStats`  

**描述**: 获取客服的完整队列统计信息，包括今日服务人数、排队人数、接待人数、留言数、转人工数等

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| agentUid | string | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 获取客服排队统计

**方法**: ` GET `  
**路径**: `/api/v1/queue/agent/queuing/count`  
**操作ID**: `getAgentQueuingCount`  

**描述**: 获取客服的完整排队人数统计，包括一对一会话和工作组未分配的排队会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| agentUid | string | query | 是 |  |

#### 响应

**200**: 查询成功

---

## Task Management

Task management APIs for organizing and categorizing content with tasks

### Update Task

**方法**: ` POST `  
**路径**: `/api/v1/task/update`  
**操作ID**: `update_62`  

**描述**: Update an existing task

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Unlike Task

**方法**: ` POST `  
**路径**: `/api/v1/task/unlike`  
**操作ID**: `unlike`  

**描述**: Cancel like for a task (idempotent)

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Unfavorite Task

**方法**: ` POST `  
**路径**: `/api/v1/task/unfavorite`  
**操作ID**: `unfavorite`  

**描述**: Cancel favorite/collect for a task (idempotent)

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Like Task

**方法**: ` POST `  
**路径**: `/api/v1/task/like`  
**操作ID**: `like`  

**描述**: Like a task (idempotent)

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Favorite Task

**方法**: ` POST `  
**路径**: `/api/v1/task/favorite`  
**操作ID**: `favorite`  

**描述**: Favorite/collect a task (idempotent)

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Task

**方法**: ` POST `  
**路径**: `/api/v1/task/delete`  
**操作ID**: `delete_63`  

**描述**: Delete a task

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/task/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/task/delete/org`  
**操作ID**: `deleteByOrgUid_63`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Task

**方法**: ` POST `  
**路径**: `/api/v1/task/create`  
**操作ID**: `create_65`  

**描述**: Create a new task

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Tasks by User

**方法**: ` GET `  
**路径**: `/api/v1/task/query`  
**操作ID**: `queryByUser_62`  

**描述**: Retrieve tasks for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Task by UID

**方法**: ` GET `  
**路径**: `/api/v1/task/query/uid`  
**操作ID**: `queryByUid_62`  

**描述**: Retrieve a specific task by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Tasks by Organization

**方法**: ` GET `  
**路径**: `/api/v1/task/query/org`  
**操作ID**: `queryByOrg_62`  

**描述**: Retrieve tasks for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Tasks

**方法**: ` GET `  
**路径**: `/api/v1/task/export`  
**操作ID**: `export_63`  

**描述**: Export tasks to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 消息管理

消息管理相关接口，包括查询、创建、更新、删除等操作

### 标记消息为已读

**方法**: ` POST `  
**路径**: `/api/v1/message/{messageUid}/read`  
**操作ID**: `markAsRead_1`  

**描述**: 将指定消息的状态更新为已读（已迁移到企业版）

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| messageUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### 更新消息

**方法**: ` POST `  
**路径**: `/api/v1/message/update`  
**操作ID**: `update_118`  

**描述**: 更新已存在的消息记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 批量标记会话消息为已读

**方法**: ` POST `  
**路径**: `/api/v1/message/thread/{threadUid}/read`  
**操作ID**: `markThreadAsRead_1`  

**描述**: 将会话中所有未读消息的状态更新为已读（已迁移到企业版）

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| threadUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### 发送离线消息

**方法**: ` POST `  
**路径**: `/api/v1/message/rest/send`  
**操作ID**: `sendRestMessage_1`  

**描述**: 当客户端长连接断开时，通过REST接口发送消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除消息

**方法**: ` POST `  
**路径**: `/api/v1/message/delete`  
**操作ID**: `delete_125`  

**描述**: 删除指定的消息记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/message/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/delete/org`  
**操作ID**: `deleteByOrgUid_125`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建消息

**方法**: ` POST `  
**路径**: `/api/v1/message/create`  
**操作ID**: `create_127`  

**描述**: 创建新的消息记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 查询未读消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unread`  
**操作ID**: `queryUnread_1`  

**描述**: 查询未读消息（已迁移到企业版）

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据会话UID查询消息

**方法**: ` GET `  
**路径**: `/api/v1/message/thread/uid`  
**操作ID**: `queryByThreadUid_8`  

**描述**: 通过会话唯一标识符查询相关消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据主题查询消息

**方法**: ` GET `  
**路径**: `/api/v1/message/thread/topic`  
**操作ID**: `queryByThreadTopic_2`  

**描述**: 根据主题查询相关消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据用户查询消息

**方法**: ` GET `  
**路径**: `/api/v1/message/query`  
**操作ID**: `queryByUser_122`  

**描述**: 返回当前用户的消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询消息

**方法**: ` GET `  
**路径**: `/api/v1/message/query/uid`  
**操作ID**: `queryByUid_122`  

**描述**: 通过唯一标识符查询消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询消息

**方法**: ` GET `  
**路径**: `/api/v1/message/query/org`  
**操作ID**: `queryByOrg_122`  

**描述**: 返回当前组织的消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出消息数据

**方法**: ` GET `  
**路径**: `/api/v1/message/export`  
**操作ID**: `export_125`  

**描述**: 将消息数据导出为Excel格式

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Favorite Management

Favorite management APIs for managing user favorites and bookmarks

### POST /api/v1/favorite/update

**方法**: ` POST `  
**路径**: `/api/v1/favorite/update`  
**操作ID**: `update_160`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/favorite/delete

**方法**: ` POST `  
**路径**: `/api/v1/favorite/delete`  
**操作ID**: `delete_160`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/favorite/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/favorite/delete/org`  
**操作ID**: `deleteByOrgUid_160`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/favorite/create

**方法**: ` POST `  
**路径**: `/api/v1/favorite/create`  
**操作ID**: `create_162`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/favorite/query

**方法**: ` GET `  
**路径**: `/api/v1/favorite/query`  
**操作ID**: `queryByUser_160`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FavoriteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/favorite/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/favorite/query/uid`  
**操作ID**: `queryByUid_160`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FavoriteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/favorite/query/org

**方法**: ` GET `  
**路径**: `/api/v1/favorite/query/org`  
**操作ID**: `queryByOrg_160`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FavoriteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/favorite/export

**方法**: ` GET `  
**路径**: `/api/v1/favorite/export`  
**操作ID**: `export_160`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FavoriteRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 表单结果管理

表单结果管理相关接口

### Update Form Result

**方法**: ` POST `  
**路径**: `/api/v1/form/result/update`  
**操作ID**: `update_157`  

**描述**: Update an existing form result entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Form Result

**方法**: ` POST `  
**路径**: `/api/v1/form/result/delete`  
**操作ID**: `delete_156`  

**描述**: Delete a form result entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/form/result/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/form/result/delete/org`  
**操作ID**: `deleteByOrgUid_156`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Form Result

**方法**: ` POST `  
**路径**: `/api/v1/form/result/create`  
**操作ID**: `create_158`  

**描述**: Create a new form result entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Form Results by User

**方法**: ` GET `  
**路径**: `/api/v1/form/result/query`  
**操作ID**: `queryByUser_156`  

**描述**: Retrieve form results for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormResultRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Form Result by UID

**方法**: ` GET `  
**路径**: `/api/v1/form/result/query/uid`  
**操作ID**: `queryByUid_156`  

**描述**: Retrieve a specific form result by UID

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormResultRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Form Results by Organization

**方法**: ` GET `  
**路径**: `/api/v1/form/result/query/org`  
**操作ID**: `queryByOrg_156`  

**描述**: Retrieve form results for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormResultRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Form Results

**方法**: ` GET `  
**路径**: `/api/v1/form/result/export`  
**操作ID**: `export_156`  

**描述**: Export form results to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormResultRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Goods Management

Goods management APIs for organizing and categorizing content with goodss

### Update Goods

**方法**: ` POST `  
**路径**: `/api/v1/goods/update`  
**操作ID**: `update_154`  

**描述**: Update an existing goods

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Goods

**方法**: ` POST `  
**路径**: `/api/v1/goods/delete`  
**操作ID**: `delete_154`  

**描述**: Delete a goods

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/goods/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/goods/delete/org`  
**操作ID**: `deleteByOrgUid_154`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Goods

**方法**: ` POST `  
**路径**: `/api/v1/goods/create`  
**操作ID**: `create_156`  

**描述**: Create a new goods

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Goodss by User

**方法**: ` GET `  
**路径**: `/api/v1/goods/query`  
**操作ID**: `queryByUser_154`  

**描述**: Retrieve goodss for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GoodsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Goods by UID

**方法**: ` GET `  
**路径**: `/api/v1/goods/query/uid`  
**操作ID**: `queryByUid_154`  

**描述**: Retrieve a specific goods by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GoodsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Goodss by Organization

**方法**: ` GET `  
**路径**: `/api/v1/goods/query/org`  
**操作ID**: `queryByOrg_154`  

**描述**: Retrieve goodss for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GoodsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Goodss

**方法**: ` GET `  
**路径**: `/api/v1/goods/export`  
**操作ID**: `export_154`  

**描述**: Export goodss to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GoodsRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Contract Management

Contract management APIs for organizing and categorizing content with contracts

### Update Contract

**方法**: ` POST `  
**路径**: `/api/v1/contract/update`  
**操作ID**: `update_172`  

**描述**: Update an existing contract

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Contract

**方法**: ` POST `  
**路径**: `/api/v1/contract/delete`  
**操作ID**: `delete_172`  

**描述**: Delete a contract

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/contract/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/contract/delete/org`  
**操作ID**: `deleteByOrgUid_172`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Contract

**方法**: ` POST `  
**路径**: `/api/v1/contract/create`  
**操作ID**: `create_174`  

**描述**: Create a new contract

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Contracts by User

**方法**: ` GET `  
**路径**: `/api/v1/contract/query`  
**操作ID**: `queryByUser_172`  

**描述**: Retrieve contracts for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ContractRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Contract by UID

**方法**: ` GET `  
**路径**: `/api/v1/contract/query/uid`  
**操作ID**: `queryByUid_172`  

**描述**: Retrieve a specific contract by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ContractRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Contracts by Organization

**方法**: ` GET `  
**路径**: `/api/v1/contract/query/org`  
**操作ID**: `queryByOrg_172`  

**描述**: Retrieve contracts for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ContractRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Contracts

**方法**: ` GET `  
**路径**: `/api/v1/contract/export`  
**操作ID**: `export_172`  

**描述**: Export contracts to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ContractRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 访客评价管理

访客评价管理相关接口

### 更新访客评价

**方法**: ` POST `  
**路径**: `/api/v1/visitor/rating/update`  
**操作ID**: `update_31`  

**描述**: 更新访客评价信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除访客评价

**方法**: ` POST `  
**路径**: `/api/v1/visitor/rating/delete`  
**操作ID**: `delete_30`  

**描述**: 删除指定的访客评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/visitor/rating/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/visitor/rating/delete/org`  
**操作ID**: `deleteByOrgUid_30`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建访客评价

**方法**: ` POST `  
**路径**: `/api/v1/visitor/rating/create`  
**操作ID**: `create_32`  

**描述**: 创建新的访客评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的访客评价

**方法**: ` GET `  
**路径**: `/api/v1/visitor/rating/query`  
**操作ID**: `queryByUser_30`  

**描述**: 根据用户ID查询访客评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定访客评价

**方法**: ` GET `  
**路径**: `/api/v1/visitor/rating/query/uid`  
**操作ID**: `queryByUid_30`  

**描述**: 根据UID查询访客评价详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的访客评价

**方法**: ` GET `  
**路径**: `/api/v1/visitor/rating/query/org`  
**操作ID**: `queryByOrg_30`  

**描述**: 根据组织ID查询访客评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/visitor/rating/invite

**方法**: ` GET `  
**路径**: `/api/v1/visitor/rating/invite`  
**操作ID**: `invite`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出访客评价

**方法**: ` GET `  
**路径**: `/api/v1/visitor/rating/export`  
**操作ID**: `export_30`  

**描述**: 导出访客评价数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRatingRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Category Management

Category management APIs for organizing and classifying content

### Update Category

**方法**: ` POST `  
**路径**: `/api/v1/category/update`  
**操作ID**: `update_178`  

**描述**: Update an existing category

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Category

**方法**: ` POST `  
**路径**: `/api/v1/category/delete`  
**操作ID**: `delete_178`  

**描述**: Delete a category

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/category/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/category/delete/org`  
**操作ID**: `deleteByOrgUid_178`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Category

**方法**: ` POST `  
**路径**: `/api/v1/category/create`  
**操作ID**: `create_180`  

**描述**: Create a new category

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Categories by User

**方法**: ` GET `  
**路径**: `/api/v1/category/query`  
**操作ID**: `queryByUser_178`  

**描述**: Retrieve categories for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CategoryRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/category/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/category/query/uid`  
**操作ID**: `queryByUid_178`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CategoryRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Categories by Organization

**方法**: ` GET `  
**路径**: `/api/v1/category/query/org`  
**操作ID**: `queryByOrg_178`  

**描述**: Retrieve categories for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CategoryRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/category/export

**方法**: ` GET `  
**路径**: `/api/v1/category/export`  
**操作ID**: `export_178`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CategoryRequest | query | 是 |  |

#### 响应

**200**: OK

---

## WorkgroupRouting Management

WorkgroupRouting management APIs for organizing and categorizing content with workgroup_routings

### Update WorkgroupRouting

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/routing/update`  
**操作ID**: `update_7`  

**描述**: Update an existing workgroup_routing

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Refresh Workgroup Routing State

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/routing/state/refresh`  
**操作ID**: `refreshState`  

**描述**: Manually recompute and persist routing state (nextAgent) for a workgroup, then return the latest state

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workgroupUid | string | query | 是 |  |

#### 响应

**200**: OK

---

### Delete WorkgroupRouting

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/routing/delete`  
**操作ID**: `delete_6`  

**描述**: Delete a workgroup_routing

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/workgroup/routing/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/routing/delete/org`  
**操作ID**: `deleteByOrgUid_6`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create WorkgroupRouting

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/routing/create`  
**操作ID**: `create_8`  

**描述**: Create a new workgroup_routing

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Get Workgroup Routing State

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/routing/state`  
**操作ID**: `state`  

**描述**: Get current routing mode, available agents and precomputed next agent for a workgroup

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workgroupUid | string | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkgroupRoutings by User

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/routing/query`  
**操作ID**: `queryByUser_6`  

**描述**: Retrieve workgroup_routings for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRoutingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkgroupRouting by UID

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/routing/query/uid`  
**操作ID**: `queryByUid_6`  

**描述**: Retrieve a specific workgroup_routing by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRoutingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkgroupRoutings by Organization

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/routing/query/org`  
**操作ID**: `queryByOrg_6`  

**描述**: Retrieve workgroup_routings for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRoutingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export WorkgroupRoutings

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/routing/export`  
**操作ID**: `export_6`  

**描述**: Export workgroup_routings to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRoutingRequest | query | 是 |  |

#### 响应

**200**: OK

---

## VisitorToken Management

VisitorToken management APIs

### POST /api/v1/visitor/token/update

**方法**: ` POST `  
**路径**: `/api/v1/visitor/token/update`  
**操作ID**: `update_30`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/visitor/token/generate

**方法**: ` POST `  
**路径**: `/api/v1/visitor/token/generate`  
**操作ID**: `generateAccessVisitorToken`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/visitor/token/delete

**方法**: ` POST `  
**路径**: `/api/v1/visitor/token/delete`  
**操作ID**: `delete_29`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/visitor/token/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/visitor/token/delete/org`  
**操作ID**: `deleteByOrgUid_29`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/visitor/token/create

**方法**: ` POST `  
**路径**: `/api/v1/visitor/token/create`  
**操作ID**: `create_31`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/visitor/token/query

**方法**: ` GET `  
**路径**: `/api/v1/visitor/token/query`  
**操作ID**: `queryByUser_29`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/visitor/token/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/visitor/token/query/uid`  
**操作ID**: `queryByUid_29`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/visitor/token/query/org

**方法**: ` GET `  
**路径**: `/api/v1/visitor/token/query/org`  
**操作ID**: `queryByOrg_29`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/visitor/token/export

**方法**: ` GET `  
**路径**: `/api/v1/visitor/token/export`  
**操作ID**: `export_29`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 留言消息匿名管理

留言消息匿名相关接口

### 拒绝留言消息

**方法**: ` POST `  
**路径**: `/visitor/api/v1/message/leave/reject`  
**操作ID**: `reject`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建留言消息

**方法**: ` POST `  
**路径**: `/visitor/api/v1/message/leave/create`  
**操作ID**: `create_3`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 确认留言消息

**方法**: ` POST `  
**路径**: `/visitor/api/v1/message/leave/confirm`  
**操作ID**: `confirm`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 查询留言消息

**方法**: ` GET `  
**路径**: `/visitor/api/v1/message/leave/query`  
**操作ID**: `query`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Order Management

Order management APIs

### POST /api/v1/order/update

**方法**: ` POST `  
**路径**: `/api/v1/order/update`  
**操作ID**: `update_108`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/order/delete

**方法**: ` POST `  
**路径**: `/api/v1/order/delete`  
**操作ID**: `delete_108`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/order/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/order/delete/org`  
**操作ID**: `deleteByOrgUid_108`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/order/create

**方法**: ` POST `  
**路径**: `/api/v1/order/create`  
**操作ID**: `create_110`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/order/query

**方法**: ` GET `  
**路径**: `/api/v1/order/query`  
**操作ID**: `queryByUser_108`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrderRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/order/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/order/query/uid`  
**操作ID**: `queryByUid_108`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrderRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/order/query/org

**方法**: ` GET `  
**路径**: `/api/v1/order/query/org`  
**操作ID**: `queryByOrg_108`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrderRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/order/export

**方法**: ` GET `  
**路径**: `/api/v1/order/export`  
**操作ID**: `export_108`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrderRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 网站管理

网站管理相关接口

### 更新网站

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/update`  
**操作ID**: `update_132`  

**描述**: 更新现有的网站

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 启用/禁用网站

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/enable`  
**操作ID**: `enable_3`  

**描述**: 启用或禁用网站

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除网站

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/delete`  
**操作ID**: `delete_132`  

**描述**: 删除指定的网站

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除所有网站

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/deleteAll`  
**操作ID**: `deleteAll`  

**描述**: 删除所有网站

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/llm/website/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/delete/org`  
**操作ID**: `deleteByOrgUid_132`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建网站

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/create`  
**操作ID**: `create_134`  

**描述**: 创建新的网站

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 停止抓取

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/crawl/stop`  
**操作ID**: `stopCrawl`  

**描述**: 停止正在运行的抓取任务

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 开始整站抓取

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/crawl/start`  
**操作ID**: `startCrawl`  

**描述**: 使用指定配置开始整站抓取

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 快速抓取

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/crawl/start/fast`  
**操作ID**: `startFastCrawl`  

**描述**: 使用快速配置开始抓取（较少页面和深度）

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 深度抓取

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/crawl/start/deep`  
**操作ID**: `startDeepCrawl`  

**描述**: 使用深度配置开始抓取（更多页面和深度）

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新抓取配置

**方法**: ` POST `  
**路径**: `/api/v1/llm/website/crawl/config`  
**操作ID**: `updateCrawlConfig`  

**描述**: 更新网站的抓取配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询网站

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/query`  
**操作ID**: `queryByUser_132`  

**描述**: 查询用户的网站列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WebsiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询网站

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/query/uid`  
**操作ID**: `queryByUid_132`  

**描述**: 通过UID查询具体的网站

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WebsiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询网站

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/query/org`  
**操作ID**: `queryByOrg_132`  

**描述**: 查询组织的网站列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WebsiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出网站

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/export`  
**操作ID**: `export_132`  

**描述**: 导出网站数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WebsiteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 获取抓取任务列表

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/crawl/tasks/{websiteUid}`  
**操作ID**: `getCrawlTasks`  

**描述**: 获取指定网站的所有抓取任务

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| websiteUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### 获取抓取任务状态

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/crawl/task/status/{taskId}`  
**操作ID**: `getCrawlTaskStatus`  

**描述**: 获取指定任务的实时状态

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| taskId | string | path | 是 |  |

#### 响应

**200**: OK

---

### 解析站点地图

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/crawl/sitemap/{websiteUid}`  
**操作ID**: `parseSitemap`  

**描述**: 解析网站的sitemap.xml获取URL列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| websiteUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### 获取抓取配置

**方法**: ` GET `  
**路径**: `/api/v1/llm/website/crawl/config/{websiteUid}`  
**操作ID**: `getCrawlConfig`  

**描述**: 获取网站的抓取配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| websiteUid | string | path | 是 |  |

#### 响应

**200**: OK

---

## Group Invitation Management

Group invitation management APIs for creating and managing group invitations

### Update Group Invitation

**方法**: ` POST `  
**路径**: `/api/v1/group/invite/update`  
**操作ID**: `update_153`  

**描述**: Update an existing group invitation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Group Invitation

**方法**: ` POST `  
**路径**: `/api/v1/group/invite/delete`  
**操作ID**: `delete_152`  

**描述**: Delete a group invitation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/group/invite/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/group/invite/delete/org`  
**操作ID**: `deleteByOrgUid_152`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Group Invitation

**方法**: ` POST `  
**路径**: `/api/v1/group/invite/create`  
**操作ID**: `create_154`  

**描述**: Create a new group invitation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Group Invitations by User

**方法**: ` GET `  
**路径**: `/api/v1/group/invite/query`  
**操作ID**: `queryByUser_153`  

**描述**: Retrieve group invitations for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupInviteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/group/invite/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/group/invite/query/uid`  
**操作ID**: `queryByUid_153`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupInviteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Group Invitations by Organization

**方法**: ` GET `  
**路径**: `/api/v1/group/invite/query/org`  
**操作ID**: `queryByOrg_153`  

**描述**: Retrieve group invitations for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupInviteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/group/invite/export

**方法**: ` GET `  
**路径**: `/api/v1/group/invite/export`  
**操作ID**: `export_152`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupInviteRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Intention Management

Intention management APIs for organizing and categorizing content with intentions

### Update Intention

**方法**: ` POST `  
**路径**: `/api/v1/intention/update`  
**操作ID**: `update_148`  

**描述**: Update an existing intention

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Intention

**方法**: ` POST `  
**路径**: `/api/v1/intention/delete`  
**操作ID**: `delete_149`  

**描述**: Delete a intention

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/intention/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/intention/delete/org`  
**操作ID**: `deleteByOrgUid_149`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Intention

**方法**: ` POST `  
**路径**: `/api/v1/intention/create`  
**操作ID**: `create_151`  

**描述**: Create a new intention

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Intentions by User

**方法**: ` GET `  
**路径**: `/api/v1/intention/query`  
**操作ID**: `queryByUser_149`  

**描述**: Retrieve intentions for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Intention by UID

**方法**: ` GET `  
**路径**: `/api/v1/intention/query/uid`  
**操作ID**: `queryByUid_149`  

**描述**: Retrieve a specific intention by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Intentions by Organization

**方法**: ` GET `  
**路径**: `/api/v1/intention/query/org`  
**操作ID**: `queryByOrg_149`  

**描述**: Retrieve intentions for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Intentions

**方法**: ` GET `  
**路径**: `/api/v1/intention/export`  
**操作ID**: `export_149`  

**描述**: Export intentions to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 工作流变量管理

工作流变量相关接口

### 创建工作流变量

**方法**: ` POST `  
**路径**: `/api/v1/workflow/variable/create`  
**操作ID**: `createVariable`  

**描述**: 创建新的工作流变量

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 获取工作流所有变量

**方法**: ` GET `  
**路径**: `/api/v1/workflow/variable/{workflowUid}`  
**操作ID**: `getVariables`  

**描述**: 获取指定工作流的所有变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |

#### 响应

**200**: 获取成功

---

### 删除工作流所有变量

**方法**: ` DELETE `  
**路径**: `/api/v1/workflow/variable/{workflowUid}`  
**操作ID**: `removeAllVariables`  

**描述**: 删除指定工作流的所有变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |

#### 响应

**200**: 删除成功

---

### 获取节点所有局部变量

**方法**: ` GET `  
**路径**: `/api/v1/workflow/variable/{workflowUid}/{nodeUid}`  
**操作ID**: `getLocalVariables`  

**描述**: 获取指定节点的所有局部变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |
| nodeUid | string | path | 是 |  |

#### 响应

**200**: 获取成功

---

### 删除节点所有局部变量

**方法**: ` DELETE `  
**路径**: `/api/v1/workflow/variable/{workflowUid}/{nodeUid}`  
**操作ID**: `removeAllLocalVariables`  

**描述**: 删除指定节点的所有局部变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |
| nodeUid | string | path | 是 |  |

#### 响应

**200**: 删除成功

---

### 获取工作流局部变量

**方法**: ` GET `  
**路径**: `/api/v1/workflow/variable/{workflowUid}/{nodeUid}/{name}`  
**操作ID**: `getLocalVariable`  

**描述**: 获取指定节点的局部变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |
| nodeUid | string | path | 是 |  |
| name | string | path | 是 |  |

#### 响应

**200**: 获取成功

---

### 删除工作流局部变量

**方法**: ` DELETE `  
**路径**: `/api/v1/workflow/variable/{workflowUid}/{nodeUid}/{name}`  
**操作ID**: `removeLocalVariable`  

**描述**: 删除指定节点的局部变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |
| nodeUid | string | path | 是 |  |
| name | string | path | 是 |  |

#### 响应

**200**: 删除成功

---

### 获取工作流变量

**方法**: ` GET `  
**路径**: `/api/v1/workflow/variable/{workflowUid}/{name}`  
**操作ID**: `getVariable`  

**描述**: 获取指定工作流变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |
| name | string | path | 是 |  |

#### 响应

**200**: 获取成功

---

### 删除工作流变量

**方法**: ` DELETE `  
**路径**: `/api/v1/workflow/variable/{workflowUid}/{name}`  
**操作ID**: `removeVariable`  

**描述**: 删除指定工作流变量

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| workflowUid | string | path | 是 |  |
| name | string | path | 是 |  |

#### 响应

**200**: 删除成功

---

## Configuration Properties

Configuration properties management APIs for system settings

### Get Bytedesk Properties

**方法**: ` GET `  
**路径**: `/config/bytedesk/properties`  
**操作ID**: `getBytedeskProperties`  

**描述**: Retrieve Bytedesk system configuration properties

#### 响应

**200**: OK

---

## 会话意图

会话意图相关接口

### 更新会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/update`  
**操作ID**: `update_59`  

**描述**: 更新会话意图信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/delete`  
**操作ID**: `delete_58`  

**描述**: 删除指定的会话意图

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/intention/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/delete/org`  
**操作ID**: `deleteByOrgUid_58`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/create`  
**操作ID**: `create_60`  

**描述**: 创建新的会话意图

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 智能会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/auto`  
**操作ID**: `autoSummary`  

**描述**: 自动生成会话意图

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 生成成功

---

### 查询用户下的会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query`  
**操作ID**: `queryByUser_59`  

**描述**: 根据用户ID查询会话意图列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query/uid`  
**操作ID**: `queryByUid_59`  

**描述**: 根据UID查询会话意图详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query/thread/uid`  
**操作ID**: `queryByThreadUid_6`  

**描述**: 根据会话UID查询意图信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

**201**: 未找到会话意图

---

### 查询组织下的会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query/org`  
**操作ID**: `queryByOrg_59`  

**描述**: 根据组织ID查询会话意图列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/export`  
**操作ID**: `export_58`  

**描述**: 导出会话意图数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Session Management

Session management APIs for user session handling

### Set Session

**方法**: ` GET `  
**路径**: `/session/set`  
**操作ID**: `setSession`  

**描述**: Set username in session

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| username | string | query | 是 |  |

#### 响应

**200**: OK

---

### Get Session

**方法**: ` GET `  
**路径**: `/session`  
**操作ID**: `getSession`  

**描述**: Retrieve current session information

#### 响应

**200**: OK

---

### Get Session

**方法**: ` GET `  
**路径**: `/session/`  
**操作ID**: `getSession_1`  

**描述**: Retrieve current session information

#### 响应

**200**: OK

---

## Connection Management

Connection management APIs for organizing and categorizing content with connections

### Update Connection

**方法**: ` POST `  
**路径**: `/api/v1/connection/update`  
**操作ID**: `update_173`  

**描述**: Update an existing connection

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Connection

**方法**: ` POST `  
**路径**: `/api/v1/connection/delete`  
**操作ID**: `delete_173`  

**描述**: Delete a connection

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/connection/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/connection/delete/org`  
**操作ID**: `deleteByOrgUid_173`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Connection

**方法**: ` POST `  
**路径**: `/api/v1/connection/create`  
**操作ID**: `create_175`  

**描述**: Create a new connection

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Connections by User

**方法**: ` GET `  
**路径**: `/api/v1/connection/query`  
**操作ID**: `queryByUser_173`  

**描述**: Retrieve connections for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConnectionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Connection by UID

**方法**: ` GET `  
**路径**: `/api/v1/connection/query/uid`  
**操作ID**: `queryByUid_173`  

**描述**: Retrieve a specific connection by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConnectionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Connections by Organization

**方法**: ` GET `  
**路径**: `/api/v1/connection/query/org`  
**操作ID**: `queryByOrg_173`  

**描述**: Retrieve connections for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConnectionRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Get Presence

**方法**: ` GET `  
**路径**: `/api/v1/connection/presence/{userUid}`  
**操作ID**: `getPresence`  

**描述**: Get user's online presence and active connection count

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| userUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### List Active Connections

**方法**: ` GET `  
**路径**: `/api/v1/connection/presence/{userUid}/list`  
**操作ID**: `listActiveConnections`  

**描述**: List user's active (non-expired) connections

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| userUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### Export Connections

**方法**: ` GET `  
**路径**: `/api/v1/connection/export`  
**操作ID**: `export_173`  

**描述**: Export connections to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConnectionRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话情绪

会话情绪相关接口

### 更新会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/update`  
**操作ID**: `update_60`  

**描述**: 更新会话情绪信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/delete`  
**操作ID**: `delete_59`  

**描述**: 删除指定的会话情绪

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/emotion/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/delete/org`  
**操作ID**: `deleteByOrgUid_59`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/create`  
**操作ID**: `create_61`  

**描述**: 创建新的会话情绪

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 智能会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/auto`  
**操作ID**: `autoSummary_1`  

**描述**: 自动生成会话情绪

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 生成成功

---

### 查询用户下的会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query`  
**操作ID**: `queryByUser_60`  

**描述**: 根据用户ID查询会话情绪列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query/uid`  
**操作ID**: `queryByUid_60`  

**描述**: 根据UID查询会话情绪详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query/thread/uid`  
**操作ID**: `queryByThreadUid_7`  

**描述**: 根据会话UID查询情绪信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

**201**: 未找到会话情绪

---

### 查询组织下的会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query/org`  
**操作ID**: `queryByOrg_60`  

**描述**: 根据组织ID查询会话情绪列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/export`  
**操作ID**: `export_60`  

**描述**: 导出会话情绪数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## WorkflowEdge Management

WorkflowEdge management APIs for organizing and categorizing content with workflow_edges

### Update WorkflowEdge

**方法**: ` POST `  
**路径**: `/api/v1/workflow/edge/update`  
**操作ID**: `update_11`  

**描述**: Update an existing workflow_edge

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete WorkflowEdge

**方法**: ` POST `  
**路径**: `/api/v1/workflow/edge/delete`  
**操作ID**: `delete_10`  

**描述**: Delete a workflow_edge

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/workflow/edge/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/workflow/edge/delete/org`  
**操作ID**: `deleteByOrgUid_10`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create WorkflowEdge

**方法**: ` POST `  
**路径**: `/api/v1/workflow/edge/create`  
**操作ID**: `create_12`  

**描述**: Create a new workflow_edge

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query WorkflowEdges by User

**方法**: ` GET `  
**路径**: `/api/v1/workflow/edge/query`  
**操作ID**: `queryByUser_11`  

**描述**: Retrieve workflow_edges for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowEdgeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkflowEdge by UID

**方法**: ` GET `  
**路径**: `/api/v1/workflow/edge/query/uid`  
**操作ID**: `queryByUid_11`  

**描述**: Retrieve a specific workflow_edge by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowEdgeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkflowEdges by Organization

**方法**: ` GET `  
**路径**: `/api/v1/workflow/edge/query/org`  
**操作ID**: `queryByOrg_11`  

**描述**: Retrieve workflow_edges for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowEdgeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export WorkflowEdges

**方法**: ` GET `  
**路径**: `/api/v1/workflow/edge/export`  
**操作ID**: `export_11`  

**描述**: Export workflow_edges to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowEdgeRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话情绪管理

会话情绪管理相关接口

### 更新会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/update`  
**操作ID**: `update_60`  

**描述**: 更新会话情绪信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/delete`  
**操作ID**: `delete_59`  

**描述**: 删除指定的会话情绪

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/emotion/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/delete/org`  
**操作ID**: `deleteByOrgUid_59`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/create`  
**操作ID**: `create_61`  

**描述**: 创建新的会话情绪

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 智能会话情绪

**方法**: ` POST `  
**路径**: `/api/v1/thread/emotion/auto`  
**操作ID**: `autoSummary_1`  

**描述**: 自动生成会话情绪

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 生成成功

---

### 查询用户下的会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query`  
**操作ID**: `queryByUser_60`  

**描述**: 根据用户ID查询会话情绪列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query/uid`  
**操作ID**: `queryByUid_60`  

**描述**: 根据UID查询会话情绪详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query/thread/uid`  
**操作ID**: `queryByThreadUid_7`  

**描述**: 根据会话UID查询情绪信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

**201**: 未找到会话情绪

---

### 查询组织下的会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/query/org`  
**操作ID**: `queryByOrg_60`  

**描述**: 根据组织ID查询会话情绪列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话情绪

**方法**: ` GET `  
**路径**: `/api/v1/thread/emotion/export`  
**操作ID**: `export_60`  

**描述**: 导出会话情绪数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadEmotionRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 访客匿名管理

访客匿名相关接口

### POST /visitor/api/v1/thread

**方法**: ` POST `  
**路径**: `/visitor/api/v1/thread`  
**操作ID**: `requestThread`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/thread/message/meta

**方法**: ` POST `  
**路径**: `/visitor/api/v1/thread/message/meta`  
**操作ID**: `requestMessageMetadata`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/thread/close

**方法**: ` POST `  
**路径**: `/visitor/api/v1/thread/close`  
**操作ID**: `closeThread`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/message/unread/clear

**方法**: ` POST `  
**路径**: `/visitor/api/v1/message/unread/clear`  
**操作ID**: `clearMessageUnread`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/message/sync

**方法**: ` POST `  
**路径**: `/visitor/api/v1/message/sync`  
**操作ID**: `sendSyncVisitorMessage`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/message/send

**方法**: ` POST `  
**路径**: `/visitor/api/v1/message/send`  
**操作ID**: `sendRestMessage`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/init

**方法**: ` POST `  
**路径**: `/visitor/api/v1/init`  
**操作ID**: `init`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /visitor/api/v1/threads

**方法**: ` GET `  
**路径**: `/visitor/api/v1/threads`  
**操作ID**: `queryVisitorThreads`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/thread/report/close-type

**方法**: ` GET `  
**路径**: `/visitor/api/v1/thread/report/close-type`  
**操作ID**: `queryCloseType`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| start | integer | query | 否 |  |
| end | integer | query | 否 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/ping

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ping`  
**操作ID**: `ping`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/message/unread

**方法**: ` GET `  
**路径**: `/visitor/api/v1/message/unread`  
**操作ID**: `getMessageUnread`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/message/unread/count

**方法**: ` GET `  
**路径**: `/visitor/api/v1/message/unread/count`  
**操作ID**: `getMessageUnreadCount`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/message/thread/uid

**方法**: ` GET `  
**路径**: `/visitor/api/v1/message/thread/uid`  
**操作ID**: `queryByThreadUid`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/message/thread/topic

**方法**: ` GET `  
**路径**: `/visitor/api/v1/message/thread/topic`  
**操作ID**: `queryByThreadTopic`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/message/sse

**方法**: ` GET `  
**路径**: `/visitor/api/v1/message/sse`  
**操作ID**: `sendSseVisitorMessage`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| message | string | query | 是 |  |

#### 响应

**200**: OK

---

### GET /visitor/api/v1/member/message/sse

**方法**: ` GET `  
**路径**: `/visitor/api/v1/member/message/sse`  
**操作ID**: `sendSseMemberMessage`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| message | string | query | 是 |  |

#### 响应

**200**: OK

---

## 降级设置管理

降级设置管理相关接口

### 更新降级设置

**方法**: ` POST `  
**路径**: `/api/v1/ratedown/setting/update`  
**操作ID**: `update_89`  

**描述**: 更新现有的降级设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除降级设置

**方法**: ` POST `  
**路径**: `/api/v1/ratedown/setting/delete`  
**操作ID**: `delete_89`  

**描述**: 删除指定的降级设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ratedown/setting/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ratedown/setting/delete/org`  
**操作ID**: `deleteByOrgUid_89`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建降级设置

**方法**: ` POST `  
**路径**: `/api/v1/ratedown/setting/create`  
**操作ID**: `create_91`  

**描述**: 创建新的降级设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询降级设置

**方法**: ` GET `  
**路径**: `/api/v1/ratedown/setting/query`  
**操作ID**: `queryByUser_89`  

**描述**: 查询用户的降级设置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RatedownSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询降级设置

**方法**: ` GET `  
**路径**: `/api/v1/ratedown/setting/query/uid`  
**操作ID**: `queryByUid_89`  

**描述**: 通过UID查询具体的降级设置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RatedownSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询降级设置

**方法**: ` GET `  
**路径**: `/api/v1/ratedown/setting/query/org`  
**操作ID**: `queryByOrg_89`  

**描述**: 管理员查询组织的降级设置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RatedownSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出降级设置

**方法**: ` GET `  
**路径**: `/api/v1/ratedown/setting/export`  
**操作ID**: `export_89`  

**描述**: 导出降级设置数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RatedownSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话邀请管理

会话邀请管理相关接口

### 更新会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/update`  
**操作ID**: `update_58`  

**描述**: 更新会话邀请信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 移除会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/remove`  
**操作ID**: `remove`  

**描述**: 发起邀请会话人员将已经加入会话的人员移除掉。只需要传入threadUid和agentUid参数

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 移除成功

---

### 拒绝会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/reject`  
**操作ID**: `reject_2`  

**描述**: 被邀请人员主动拒绝会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 拒绝成功

---

### 退出会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/exit`  
**操作ID**: `exit`  

**描述**: 被邀请人员加入会话之后，自己主动从会话中退出。只需要传入threadUid和agentUid参数

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 退出成功

---

### 删除会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/delete`  
**操作ID**: `delete_57`  

**描述**: 删除指定的会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/invite/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/delete/org`  
**操作ID**: `deleteByOrgUid_57`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/create`  
**操作ID**: `create_59`  

**描述**: 创建新的会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 取消会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/cancel`  
**操作ID**: `cancel_1`  

**描述**: 发起邀请的客服人员取消邀请其他客服

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 取消成功

---

### 接受会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/accept`  
**操作ID**: `accept_1`  

**描述**: 被邀请客服接受会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 接受成功

---

### 查询用户下的会话邀请

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/query`  
**操作ID**: `queryByUser_58`  

**描述**: 根据用户ID查询会话邀请列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/thread/invite/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/query/uid`  
**操作ID**: `queryByUid_58`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的会话邀请

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/query/org`  
**操作ID**: `queryByOrg_58`  

**描述**: 根据组织ID查询会话邀请列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话邀请

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/export`  
**操作ID**: `export_57`  

**描述**: 导出会话邀请数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Actuator

Monitor and interact

### Actuator web endpoint 'quartz-jobs-group-name'

**方法**: ` POST `  
**路径**: `/actuator/quartz/{jobs}/{group}/{name}`  
**操作ID**: `triggerQuartzJob`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| jobs | string | path | 是 |  |
| group | string | path | 是 |  |
| name | string | path | 是 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**204**: No Content

**400**: Bad Request

---

### Actuator web endpoint 'loggers-name'

**方法**: ` GET `  
**路径**: `/actuator/loggers/{name}`  
**操作ID**: `loggerLevels`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| name | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'loggers-name'

**方法**: ` POST `  
**路径**: `/actuator/loggers/{name}`  
**操作ID**: `configureLogLevel`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| name | string | path | 是 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**204**: No Content

**400**: Bad Request

---

### Actuator web endpoint 'integrationgraph'

**方法**: ` GET `  
**路径**: `/actuator/integrationgraph`  
**操作ID**: `graph`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'integrationgraph'

**方法**: ` POST `  
**路径**: `/actuator/integrationgraph`  
**操作ID**: `rebuild`  
#### 响应

**204**: No Content

**400**: Bad Request

---

### Actuator root web endpoint

**方法**: ` GET `  
**路径**: `/actuator`  
**操作ID**: `links`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'threaddump'

**方法**: ` GET `  
**路径**: `/actuator/threaddump`  
**操作ID**: `threadDump`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'statemachinetrace'

**方法**: ` GET `  
**路径**: `/actuator/statemachinetrace`  
**操作ID**: `invoke`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'scheduledtasks'

**方法**: ` GET `  
**路径**: `/actuator/scheduledtasks`  
**操作ID**: `scheduledTasks`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'sbom'

**方法**: ` GET `  
**路径**: `/actuator/sbom`  
**操作ID**: `sboms`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'sbom-id'

**方法**: ` GET `  
**路径**: `/actuator/sbom/{id}`  
**操作ID**: `sbom`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| id | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'quartz'

**方法**: ` GET `  
**路径**: `/actuator/quartz`  
**操作ID**: `quartzReport`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'quartz-jobsOrTriggers'

**方法**: ` GET `  
**路径**: `/actuator/quartz/{jobsOrTriggers}`  
**操作ID**: `quartzJobOrTriggerGroups`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| jobsOrTriggers | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'quartz-jobsOrTriggers-group'

**方法**: ` GET `  
**路径**: `/actuator/quartz/{jobsOrTriggers}/{group}`  
**操作ID**: `quartzJobOrTriggerGroup`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| jobsOrTriggers | string | path | 是 |  |
| group | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'quartz-jobsOrTriggers-group-name'

**方法**: ` GET `  
**路径**: `/actuator/quartz/{jobsOrTriggers}/{group}/{name}`  
**操作ID**: `quartzJobOrTrigger`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| jobsOrTriggers | string | path | 是 |  |
| group | string | path | 是 |  |
| name | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'metrics'

**方法**: ` GET `  
**路径**: `/actuator/metrics`  
**操作ID**: `listNames`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'metrics-requiredMetricName'

**方法**: ` GET `  
**路径**: `/actuator/metrics/{requiredMetricName}`  
**操作ID**: `metric`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| requiredMetricName | string | path | 是 |  |
| tag | string | query | 否 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'mappings'

**方法**: ` GET `  
**路径**: `/actuator/mappings`  
**操作ID**: `mappings`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'loggers'

**方法**: ` GET `  
**路径**: `/actuator/loggers`  
**操作ID**: `loggers`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'logfile'

**方法**: ` GET `  
**路径**: `/actuator/logfile`  
**操作ID**: `logFile`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'liquibase'

**方法**: ` GET `  
**路径**: `/actuator/liquibase`  
**操作ID**: `liquibaseBeans`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'info'

**方法**: ` GET `  
**路径**: `/actuator/info`  
**操作ID**: `info_1`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'health'

**方法**: ` GET `  
**路径**: `/actuator/health`  
**操作ID**: `health`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'flowable'

**方法**: ` GET `  
**路径**: `/actuator/flowable`  
**操作ID**: `invoke_1`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'env'

**方法**: ` GET `  
**路径**: `/actuator/env`  
**操作ID**: `environment`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| pattern | string | query | 否 |  |

#### 响应

**200**: OK

---

### Actuator web endpoint 'env-toMatch'

**方法**: ` GET `  
**路径**: `/actuator/env/{toMatch}`  
**操作ID**: `environmentEntry`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| toMatch | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'configprops'

**方法**: ` GET `  
**路径**: `/actuator/configprops`  
**操作ID**: `configurationProperties`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'configprops-prefix'

**方法**: ` GET `  
**路径**: `/actuator/configprops/{prefix}`  
**操作ID**: `configurationPropertiesWithPrefix`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| prefix | string | path | 是 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'conditions'

**方法**: ` GET `  
**路径**: `/actuator/conditions`  
**操作ID**: `conditions`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'caches'

**方法**: ` GET `  
**路径**: `/actuator/caches`  
**操作ID**: `caches`  
#### 响应

**200**: OK

---

### Actuator web endpoint 'caches'

**方法**: ` DELETE `  
**路径**: `/actuator/caches`  
**操作ID**: `clearCaches`  
#### 响应

**204**: No Content

---

### Actuator web endpoint 'caches-cache'

**方法**: ` GET `  
**路径**: `/actuator/caches/{cache}`  
**操作ID**: `cache`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| cache | string | path | 是 |  |
| cacheManager | string | query | 否 |  |

#### 响应

**200**: OK

**404**: Not Found

---

### Actuator web endpoint 'caches-cache'

**方法**: ` DELETE `  
**路径**: `/actuator/caches/{cache}`  
**操作ID**: `clearCache`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| cache | string | path | 是 |  |
| cacheManager | string | query | 否 |  |

#### 响应

**204**: No Content

**404**: Not Found

---

### Actuator web endpoint 'beans'

**方法**: ` GET `  
**路径**: `/actuator/beans`  
**操作ID**: `beans`  
#### 响应

**200**: OK

---

## IP Management

IP address management and location services APIs

### Get IP Location

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ip/location`  
**操作ID**: `location`  

**描述**: Get location information for the client's IP address

#### 响应

**200**: OK

---

### Check IP in Range

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ip/ip/range`  
**操作ID**: `ipInRange`  

**描述**: Check if an IP address is within a specific range

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| ip | string | query | 是 |  |

#### 响应

**200**: OK

---

### Get IP Province

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ip/ip/province`  
**操作ID**: `ipProvince`  

**描述**: Get province information for a specific IP address

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| ip | string | query | 是 |  |

#### 响应

**200**: OK

---

### Get Specific IP Location

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ip/ip/location`  
**操作ID**: `ipLocation`  

**描述**: Get location information for a specific IP address

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| ip | string | query | 是 |  |

#### 响应

**200**: OK

---

### Get Client IP

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ip/`  
**操作ID**: `ip`  

**描述**: Get the client's IP address

#### 响应

**200**: OK

---

### Get Client IP

**方法**: ` GET `  
**路径**: `/visitor/api/v1/ip`  
**操作ID**: `ip_1`  

**描述**: Get the client's IP address

#### 响应

**200**: OK

---

## IP Black Management

IP blacklist management APIs for blocking specific IP addresses

### Update IP Black Entry

**方法**: ` POST `  
**路径**: `/api/v1/ip/black/update`  
**操作ID**: `update_145`  

**描述**: Update an existing IP blacklist entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete IP Black Entry

**方法**: ` POST `  
**路径**: `/api/v1/ip/black/delete`  
**操作ID**: `delete_145`  

**描述**: Remove an IP address from the blacklist

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ip/black/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ip/black/delete/org`  
**操作ID**: `deleteByOrgUid_145`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create IP Black Entry

**方法**: ` POST `  
**路径**: `/api/v1/ip/black/create`  
**操作ID**: `create_147`  

**描述**: Add an IP address to the blacklist

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query IP Black by User

**方法**: ` GET `  
**路径**: `/api/v1/ip/black/query`  
**操作ID**: `queryByUser_145`  

**描述**: Retrieve IP blacklist for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpBlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/ip/black/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/ip/black/query/uid`  
**操作ID**: `queryByUid_145`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpBlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query IP Black by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ip/black/query/org`  
**操作ID**: `queryByOrg_145`  

**描述**: Retrieve IP blacklist for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpBlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export IP Black

**方法**: ` GET `  
**路径**: `/api/v1/ip/black/export`  
**操作ID**: `export_145`  

**描述**: Export IP blacklist to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpBlackRequest | query | 是 |  |

#### 响应

**200**: OK

---

## URL Management

URL management APIs for managing system URLs

### Update URL

**方法**: ` POST `  
**路径**: `/api/v1/url/update`  
**操作ID**: `update_38`  

**描述**: Update an existing URL entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete URL

**方法**: ` POST `  
**路径**: `/api/v1/url/delete`  
**操作ID**: `delete_38`  

**描述**: Delete a URL entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/url/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/url/delete/org`  
**操作ID**: `deleteByOrgUid_38`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create URL

**方法**: ` POST `  
**路径**: `/api/v1/url/create`  
**操作ID**: `create_40`  

**描述**: Create a new URL entry

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query URLs by User

**方法**: ` GET `  
**路径**: `/api/v1/url/query`  
**操作ID**: `queryByUser_38`  

**描述**: Retrieve URLs for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UrlRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/url/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/url/query/uid`  
**操作ID**: `queryByUid_38`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UrlRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query URLs by Organization

**方法**: ` GET `  
**路径**: `/api/v1/url/query/org`  
**操作ID**: `queryByOrg_38`  

**描述**: Retrieve URLs for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UrlRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/url/export

**方法**: ` GET `  
**路径**: `/api/v1/url/export`  
**操作ID**: `export_38`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UrlRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 文件管理

文件管理相关接口

### 更新文件

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/update`  
**操作ID**: `update_135`  

**描述**: 更新文件信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 重新chunk文件

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/rechunk`  
**操作ID**: `rechunkFile`  

**描述**: 重新对文件进行chunk切分

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 重新chunk成功

---

### 启用文件

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/enable`  
**操作ID**: `enable_6`  

**描述**: 启用或禁用文件

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 操作成功

---

### 删除文件

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/delete`  
**操作ID**: `delete_135`  

**描述**: 删除指定的文件

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### 删除所有文件

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/deleteAll`  
**操作ID**: `deleteAll_3`  

**描述**: 删除所有文件

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/llm/file/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/delete/org`  
**操作ID**: `deleteByOrgUid_135`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建文件

**方法**: ` POST `  
**路径**: `/api/v1/llm/file/create`  
**操作ID**: `create_137`  

**描述**: 创建新的文件

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的文件

**方法**: ` GET `  
**路径**: `/api/v1/llm/file/query`  
**操作ID**: `queryByUser_135`  

**描述**: 根据用户ID查询文件列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FileRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/llm/file/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/llm/file/query/uid`  
**操作ID**: `queryByUid_135`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FileRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的文件

**方法**: ` GET `  
**路径**: `/api/v1/llm/file/query/org`  
**操作ID**: `queryByOrg_135`  

**描述**: 根据组织ID查询文件列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FileRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出文件

**方法**: ` GET `  
**路径**: `/api/v1/llm/file/export`  
**操作ID**: `export_135`  

**描述**: 导出文件数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FileRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Cookie Management

Cookie management APIs for visitor tracking and session management

### Set Cookie

**方法**: ` GET `  
**路径**: `/cookie/set`  
**操作ID**: `setCookie`  

**描述**: Set visitor ID cookie

#### 响应

**200**: OK

---

### Delete Cookie

**方法**: ` GET `  
**路径**: `/cookie/delete`  
**操作ID**: `deleteCookie`  

**描述**: Delete visitor ID cookie

#### 响应

**200**: OK

---

### Get All Cookies

**方法**: ` GET `  
**路径**: `/cookie/all`  
**操作ID**: `getAllCookies`  

**描述**: Retrieve all cookies from the request

#### 响应

**200**: OK

---

### Get Cookie

**方法**: ` GET `  
**路径**: `/cookie/`  
**操作ID**: `getCookie`  

**描述**: Retrieve visitor ID from cookie

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| v_vid | string | cookie | 否 |  |

#### 响应

**200**: OK

---

### Get Cookie

**方法**: ` GET `  
**路径**: `/cookie`  
**操作ID**: `getCookie_1`  

**描述**: Retrieve visitor ID from cookie

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| v_vid | string | cookie | 否 |  |

#### 响应

**200**: OK

---

## Recommendation Management

Recommendation management APIs for organizing and categorizing content with recommendations

### Update Recommendation

**方法**: ` POST `  
**路径**: `/api/v1/recommendation/update`  
**操作ID**: `update_88`  

**描述**: Update an existing recommendation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Recommendation

**方法**: ` POST `  
**路径**: `/api/v1/recommendation/delete`  
**操作ID**: `delete_88`  

**描述**: Delete a recommendation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/recommendation/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/recommendation/delete/org`  
**操作ID**: `deleteByOrgUid_88`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Recommendation

**方法**: ` POST `  
**路径**: `/api/v1/recommendation/create`  
**操作ID**: `create_90`  

**描述**: Create a new recommendation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Recommendations by User

**方法**: ` GET `  
**路径**: `/api/v1/recommendation/query`  
**操作ID**: `queryByUser_88`  

**描述**: Retrieve recommendations for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RecommendationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Recommendation by UID

**方法**: ` GET `  
**路径**: `/api/v1/recommendation/query/uid`  
**操作ID**: `queryByUid_88`  

**描述**: Retrieve a specific recommendation by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RecommendationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Recommendations by Organization

**方法**: ` GET `  
**路径**: `/api/v1/recommendation/query/org`  
**操作ID**: `queryByOrg_88`  

**描述**: Retrieve recommendations for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RecommendationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Recommendations

**方法**: ` GET `  
**路径**: `/api/v1/recommendation/export`  
**操作ID**: `export_88`  

**描述**: Export recommendations to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RecommendationRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 客服配置管理

客服配置相关接口

### 更新客服配置

**方法**: ` POST `  
**路径**: `/api/v1/agent/settings/update`  
**操作ID**: `update_199`  

**描述**: 更新客服配置信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除客服配置

**方法**: ` POST `  
**路径**: `/api/v1/agent/settings/delete`  
**操作ID**: `delete_198`  

**描述**: 删除指定的客服配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/agent/settings/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/agent/settings/delete/org`  
**操作ID**: `deleteByOrgUid_198`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建客服配置

**方法**: ` POST `  
**路径**: `/api/v1/agent/settings/create`  
**操作ID**: `create_200`  

**描述**: 创建新的客服配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### GET /api/v1/agent/settings/query

**方法**: ` GET `  
**路径**: `/api/v1/agent/settings/query`  
**操作ID**: `queryByUser_198`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询客服配置

**方法**: ` GET `  
**路径**: `/api/v1/agent/settings/query/uid`  
**操作ID**: `queryByUid_198`  

**描述**: 根据UID查询客服配置详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的客服配置

**方法**: ` GET `  
**路径**: `/api/v1/agent/settings/query/org`  
**操作ID**: `queryByOrg_198`  

**描述**: 根据组织ID查询客服配置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/agent/settings/export

**方法**: ` GET `  
**路径**: `/api/v1/agent/settings/export`  
**操作ID**: `export_198`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据客服UID查询客服配置

**方法**: ` GET `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据客服UID查询客服配置

**方法**: ` PUT `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent_2`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据客服UID查询客服配置

**方法**: ` POST `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent_1`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据客服UID查询客服配置

**方法**: ` DELETE `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent_3`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据客服UID查询客服配置

**方法**: ` OPTIONS `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent_6`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据客服UID查询客服配置

**方法**: ` HEAD `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent_5`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据客服UID查询客服配置

**方法**: ` PATCH `  
**路径**: `/api/v1/agent/settings/query/agent`  
**操作ID**: `queryByAgent_4`  

**描述**: 根据客服UID查询其绑定的客服配置；若未绑定则返回组织默认配置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 发布客服配置

**方法**: ` GET `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_15`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布客服配置

**方法**: ` PUT `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_17`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布客服配置

**方法**: ` POST `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_16`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布客服配置

**方法**: ` DELETE `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_18`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布客服配置

**方法**: ` OPTIONS `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_21`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布客服配置

**方法**: ` HEAD `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_20`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布客服配置

**方法**: ` PATCH `  
**路径**: `/api/v1/agent/settings/publish`  
**操作ID**: `publish_19`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

## 固定回复管理

固定回复管理相关接口

### 更新固定回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/fixed/update`  
**操作ID**: `update_187`  

**描述**: 更新固定回复信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 启用固定回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/fixed/enable`  
**操作ID**: `enable_10`  

**描述**: 启用或禁用固定回复

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 操作成功

---

### 删除固定回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/fixed/delete`  
**操作ID**: `delete_187`  

**描述**: 删除指定的固定回复

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/autoreply/fixed/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/fixed/delete/org`  
**操作ID**: `deleteByOrgUid_187`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建固定回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/fixed/create`  
**操作ID**: `create_189`  

**描述**: 创建新的固定回复

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的固定回复

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/fixed/query`  
**操作ID**: `queryByUser_187`  

**描述**: 根据用户ID查询固定回复列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyFixedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/autoreply/fixed/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/fixed/query/uid`  
**操作ID**: `queryByUid_187`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyFixedRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的固定回复

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/fixed/query/org`  
**操作ID**: `queryByOrg_187`  

**描述**: 根据组织ID查询固定回复列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyFixedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出固定回复

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/fixed/export`  
**操作ID**: `export_187`  

**描述**: 导出固定回复数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyFixedRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Prompt Management

Prompt management APIs for organizing and categorizing content with prompts

### Update Prompt

**方法**: ` POST `  
**路径**: `/api/v1/prompt/update`  
**操作ID**: `update_102`  

**描述**: Update an existing prompt

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Prompt

**方法**: ` POST `  
**路径**: `/api/v1/prompt/delete`  
**操作ID**: `delete_102`  

**描述**: Delete a prompt

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/prompt/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/prompt/delete/org`  
**操作ID**: `deleteByOrgUid_102`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Prompt

**方法**: ` POST `  
**路径**: `/api/v1/prompt/create`  
**操作ID**: `create_104`  

**描述**: Create a new prompt

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Prompts by User

**方法**: ` GET `  
**路径**: `/api/v1/prompt/query`  
**操作ID**: `queryByUser_102`  

**描述**: Retrieve prompts for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PromptRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Prompt by UID

**方法**: ` GET `  
**路径**: `/api/v1/prompt/query/uid`  
**操作ID**: `queryByUid_102`  

**描述**: Retrieve a specific prompt by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PromptRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Prompts by Organization

**方法**: ` GET `  
**路径**: `/api/v1/prompt/query/org`  
**操作ID**: `queryByOrg_102`  

**描述**: Retrieve prompts for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PromptRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Prompts

**方法**: ` GET `  
**路径**: `/api/v1/prompt/export`  
**操作ID**: `export_102`  

**描述**: Export prompts to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PromptRequest | query | 是 |  |

#### 响应

**200**: OK

---

## LLM模型管理

LLM模型管理相关接口

### 更新LLM模型

**方法**: ` POST `  
**路径**: `/api/v1/model/update`  
**操作ID**: `update_116`  

**描述**: 更新LLM模型信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除LLM模型

**方法**: ` POST `  
**路径**: `/api/v1/model/delete`  
**操作ID**: `delete_116`  

**描述**: 删除指定的LLM模型

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/model/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/model/delete/org`  
**操作ID**: `deleteByOrgUid_116`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建LLM模型

**方法**: ` POST `  
**路径**: `/api/v1/model/create`  
**操作ID**: `create_118`  

**描述**: 创建新的LLM模型

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的LLM模型

**方法**: ` GET `  
**路径**: `/api/v1/model/query`  
**操作ID**: `queryByUser_116`  

**描述**: 根据用户ID查询LLM模型列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmModelRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定LLM模型

**方法**: ` GET `  
**路径**: `/api/v1/model/query/uid`  
**操作ID**: `queryByUid_116`  

**描述**: 根据UID查询LLM模型详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmModelRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的LLM模型

**方法**: ` GET `  
**路径**: `/api/v1/model/query/org`  
**操作ID**: `queryByOrg_116`  

**描述**: 根据组织ID查询LLM模型列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmModelRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出LLM模型

**方法**: ` GET `  
**路径**: `/api/v1/model/export`  
**操作ID**: `export_116`  

**描述**: 导出LLM模型数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmModelRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## CallStatistic Management

CallStatistic management APIs for organizing and categorizing content with statistics

### Update CallStatistic

**方法**: ` POST `  
**路径**: `/api/v1/freeswitch/statistic/update`  
**操作ID**: `update_155`  

**描述**: Update an existing statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete CallStatistic

**方法**: ` POST `  
**路径**: `/api/v1/freeswitch/statistic/delete`  
**操作ID**: `delete_155`  

**描述**: Delete a statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/freeswitch/statistic/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/freeswitch/statistic/delete/org`  
**操作ID**: `deleteByOrgUid_155`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create CallStatistic

**方法**: ` POST `  
**路径**: `/api/v1/freeswitch/statistic/create`  
**操作ID**: `create_157`  

**描述**: Create a new statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query CallStatistics by User

**方法**: ` GET `  
**路径**: `/api/v1/freeswitch/statistic/query`  
**操作ID**: `queryByUser_155`  

**描述**: Retrieve statistics for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query CallStatistic by UID

**方法**: ` GET `  
**路径**: `/api/v1/freeswitch/statistic/query/uid`  
**操作ID**: `queryByUid_155`  

**描述**: Retrieve a specific statistic by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query CallStatistics by Organization

**方法**: ` GET `  
**路径**: `/api/v1/freeswitch/statistic/query/org`  
**操作ID**: `queryByOrg_155`  

**描述**: Retrieve statistics for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export CallStatistics

**方法**: ` GET `  
**路径**: `/api/v1/freeswitch/statistic/export`  
**操作ID**: `export_155`  

**描述**: Export statistics to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Workflow Management

Workflow management APIs for process automation and task management

### 更新工作流

**方法**: ` POST `  
**路径**: `/api/v1/workflow/update`  
**操作ID**: `update_8`  

**描述**: 更新工作流信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 执行工作流

**方法**: ` POST `  
**路径**: `/api/v1/workflow/execute`  
**操作ID**: `execute`  

**描述**: 执行指定的工作流

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 执行成功

---

### 删除工作流

**方法**: ` POST `  
**路径**: `/api/v1/workflow/delete`  
**操作ID**: `delete_11`  

**描述**: 删除指定的工作流

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/workflow/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/workflow/delete/org`  
**操作ID**: `deleteByOrgUid_11`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建工作流

**方法**: ` POST `  
**路径**: `/api/v1/workflow/create`  
**操作ID**: `create_13`  

**描述**: 创建新的工作流

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的工作流

**方法**: ` GET `  
**路径**: `/api/v1/workflow/query`  
**操作ID**: `queryByUser_8`  

**描述**: 根据用户ID查询工作流列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定工作流

**方法**: ` GET `  
**路径**: `/api/v1/workflow/query/uid`  
**操作ID**: `queryByUid_8`  

**描述**: 根据UID查询工作流详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的工作流

**方法**: ` GET `  
**路径**: `/api/v1/workflow/query/org`  
**操作ID**: `queryByOrg_8`  

**描述**: 根据组织ID查询工作流列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出工作流

**方法**: ` GET `  
**路径**: `/api/v1/workflow/export`  
**操作ID**: `export_10`  

**描述**: 导出工作流数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## JMS Management

JMS Artemis queue and topic management APIs for testing

### Test JMS Topic

**方法**: ` GET `  
**路径**: `/jms/artemis/topic`  
**操作ID**: `getJmsTopicArtemis`  

**描述**: Test sending a message to JMS Artemis topic (debug mode only)

#### 响应

**200**: OK

---

### Test JMS Queue

**方法**: ` GET `  
**路径**: `/jms/artemis/queue`  
**操作ID**: `getJmsQueueArtemis`  

**描述**: Test sending a message to JMS Artemis queue (debug mode only)

#### 响应

**200**: OK

---

## 消息评价

消息评价相关接口

### 更新消息评价

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/update`  
**操作ID**: `update_122`  

**描述**: 更新消息评价信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除消息评价

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/delete`  
**操作ID**: `delete_121`  

**描述**: 删除指定的消息评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/message/rating/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/delete/org`  
**操作ID**: `deleteByOrgUid_121`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建消息评价

**方法**: ` POST `  
**路径**: `/api/v1/message/rating/create`  
**操作ID**: `create_123`  

**描述**: 创建新的消息评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的消息评价

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/query`  
**操作ID**: `queryByUser_121`  

**描述**: 根据用户ID查询消息评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定消息评价

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/query/uid`  
**操作ID**: `queryByUid_121`  

**描述**: 根据UID查询消息评价详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的消息评价

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/query/org`  
**操作ID**: `queryByOrg_121`  

**描述**: 根据组织ID查询消息评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/message/rating/export

**方法**: ` GET `  
**路径**: `/api/v1/message/rating/export`  
**操作ID**: `export_121`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRatingRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话评价

会话评价相关接口

### 更新会话评价

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/update`  
**操作ID**: `update_57`  

**描述**: 更新会话评价信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话评价

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/delete`  
**操作ID**: `delete_56`  

**描述**: 删除指定的会话评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/rating/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/delete/org`  
**操作ID**: `deleteByOrgUid_56`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话评价

**方法**: ` POST `  
**路径**: `/api/v1/thread/rating/create`  
**操作ID**: `create_58`  

**描述**: 创建新的会话评价

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query`  
**操作ID**: `queryByUser_56`  

**描述**: 根据用户ID查询会话评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query/uid`  
**操作ID**: `queryByUid_56`  

**描述**: 根据UID查询会话评价详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query/thread/uid`  
**操作ID**: `queryByThreadUid_5`  

**描述**: 根据会话UID查询评价信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/query/org`  
**操作ID**: `queryByOrg_56`  

**描述**: 根据组织ID查询会话评价列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 邀请评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/invite`  
**操作ID**: `invite_1`  

**描述**: 客服主动邀请用户评价

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 邀请成功

---

### 导出会话评价

**方法**: ` GET `  
**路径**: `/api/v1/thread/rating/export`  
**操作ID**: `export_56`  

**描述**: 导出会话评价数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRatingRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 留言消息管理

留言消息管理相关接口

### 更新留言消息

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/update`  
**操作ID**: `update_124`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 转接留言消息

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/transfer`  
**操作ID**: `transfer`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新留言消息状态

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/status/update`  
**操作ID**: `updateStatus_2`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 标记留言消息为垃圾

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/spam`  
**操作ID**: `markAsSpam`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 回复留言消息

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/reply`  
**操作ID**: `reply`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 标记留言消息为已读

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/read`  
**操作ID**: `markAsRead_2`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除留言消息

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/delete`  
**操作ID**: `delete_123`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/message/leave/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/delete/org`  
**操作ID**: `deleteByOrgUid_123`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建留言消息

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/create`  
**操作ID**: `create_125`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 关闭留言消息

**方法**: ` POST `  
**路径**: `/api/v1/message/leave/close`  
**操作ID**: `close_1`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 查询用户留言消息

**方法**: ` GET `  
**路径**: `/api/v1/message/leave/query`  
**操作ID**: `queryByUser_124`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询留言消息详情

**方法**: ` GET `  
**路径**: `/api/v1/message/leave/query/uid`  
**操作ID**: `queryByUid_124`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询留言消息关联的会话

**方法**: ` GET `  
**路径**: `/api/v1/message/leave/query/threads`  
**操作ID**: `queryThreadsByLeaveMessage`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询留言消息

**方法**: ` GET `  
**路径**: `/api/v1/message/leave/query/org`  
**操作ID**: `queryByOrg_124`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出留言消息

**方法**: ` GET `  
**路径**: `/api/v1/message/leave/export`  
**操作ID**: `export_123`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询当前组织未处理的留言数量

**方法**: ` GET `  
**路径**: `/api/v1/message/leave/count/pending`  
**操作ID**: `countPendingByOrg`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageLeaveRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 评论管理

评论管理相关接口

### 更新评论

**方法**: ` POST `  
**路径**: `/api/v1/kbase/comment/update`  
**操作ID**: `update_142`  

**描述**: 更新评论信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除评论

**方法**: ` POST `  
**路径**: `/api/v1/kbase/comment/delete`  
**操作ID**: `delete_142`  

**描述**: 删除指定的评论

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/kbase/comment/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/kbase/comment/delete/org`  
**操作ID**: `deleteByOrgUid_142`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建评论

**方法**: ` POST `  
**路径**: `/api/v1/kbase/comment/create`  
**操作ID**: `create_144`  

**描述**: 创建新的评论

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的评论

**方法**: ` GET `  
**路径**: `/api/v1/kbase/comment/query`  
**操作ID**: `queryByUser_142`  

**描述**: 根据用户ID查询评论列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseCommentRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/kbase/comment/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/kbase/comment/query/uid`  
**操作ID**: `queryByUid_142`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的评论

**方法**: ` GET `  
**路径**: `/api/v1/kbase/comment/query/org`  
**操作ID**: `queryByOrg_142`  

**描述**: 根据组织ID查询评论列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseCommentRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出评论

**方法**: ` GET `  
**路径**: `/api/v1/kbase/comment/export`  
**操作ID**: `export_142`  

**描述**: 导出评论数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseCommentRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 敏感词消息管理

敏感词消息管理相关接口

### 更新敏感词消息

**方法**: ` POST `  
**路径**: `/api/v1/taboo/message/update`  
**操作ID**: `update_67`  

**描述**: 更新现有的敏感词消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除敏感词消息

**方法**: ` POST `  
**路径**: `/api/v1/taboo/message/delete`  
**操作ID**: `delete_66`  

**描述**: 删除指定的敏感词消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/taboo/message/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/taboo/message/delete/org`  
**操作ID**: `deleteByOrgUid_66`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建敏感词消息

**方法**: ` POST `  
**路径**: `/api/v1/taboo/message/create`  
**操作ID**: `create_68`  

**描述**: 创建新的敏感词消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询敏感词消息

**方法**: ` GET `  
**路径**: `/api/v1/taboo/message/query`  
**操作ID**: `queryByUser_67`  

**描述**: 查询用户的敏感词消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooMessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询敏感词消息

**方法**: ` GET `  
**路径**: `/api/v1/taboo/message/query/uid`  
**操作ID**: `queryByUid_67`  

**描述**: 通过UID查询具体的敏感词消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooMessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询敏感词消息

**方法**: ` GET `  
**路径**: `/api/v1/taboo/message/query/org`  
**操作ID**: `queryByOrg_67`  

**描述**: 查询组织的敏感词消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooMessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出敏感词消息

**方法**: ` GET `  
**路径**: `/api/v1/taboo/message/export`  
**操作ID**: `export_66`  

**描述**: 导出敏感词消息数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooMessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Token Management

Token management APIs

### POST /api/v1/token/update

**方法**: ` POST `  
**路径**: `/api/v1/token/update`  
**操作ID**: `update_46`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/token/generate

**方法**: ` POST `  
**路径**: `/api/v1/token/generate`  
**操作ID**: `generateAccessToken`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/token/delete

**方法**: ` POST `  
**路径**: `/api/v1/token/delete`  
**操作ID**: `delete_46`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/token/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/token/delete/org`  
**操作ID**: `deleteByOrgUid_46`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/token/create

**方法**: ` POST `  
**路径**: `/api/v1/token/create`  
**操作ID**: `create_48`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/token/query

**方法**: ` GET `  
**路径**: `/api/v1/token/query`  
**操作ID**: `queryByUser_46`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/token/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/token/query/uid`  
**操作ID**: `queryByUid_46`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/token/query/org

**方法**: ` GET `  
**路径**: `/api/v1/token/query/org`  
**操作ID**: `queryByOrg_46`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/token/export

**方法**: ` GET `  
**路径**: `/api/v1/token/export`  
**操作ID**: `export_46`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Trigger Management

Trigger management APIs for organizing and categorizing content with triggers

### Update Trigger

**方法**: ` POST `  
**路径**: `/api/v1/trigger/update`  
**操作ID**: `update_41`  

**描述**: Update an existing trigger

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Trigger

**方法**: ` POST `  
**路径**: `/api/v1/trigger/delete`  
**操作ID**: `delete_41`  

**描述**: Delete a trigger

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/trigger/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/trigger/delete/org`  
**操作ID**: `deleteByOrgUid_41`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Trigger

**方法**: ` POST `  
**路径**: `/api/v1/trigger/create`  
**操作ID**: `create_43`  

**描述**: Create a new trigger

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Triggers by User

**方法**: ` GET `  
**路径**: `/api/v1/trigger/query`  
**操作ID**: `queryByUser_41`  

**描述**: Retrieve triggers for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TriggerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Trigger by UID

**方法**: ` GET `  
**路径**: `/api/v1/trigger/query/uid`  
**操作ID**: `queryByUid_41`  

**描述**: Retrieve a specific trigger by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TriggerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Triggers by Organization

**方法**: ` GET `  
**路径**: `/api/v1/trigger/query/org`  
**操作ID**: `queryByOrg_41`  

**描述**: Retrieve triggers for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TriggerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Triggers

**方法**: ` GET `  
**路径**: `/api/v1/trigger/export`  
**操作ID**: `export_41`  

**描述**: Export triggers to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TriggerRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 素材管理

素材管理相关接口

### 更新素材

**方法**: ` POST `  
**路径**: `/api/v1/material/update`  
**操作ID**: `update_131`  

**描述**: 更新现有的素材

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除素材

**方法**: ` POST `  
**路径**: `/api/v1/material/delete`  
**操作ID**: `delete_131`  

**描述**: 删除指定的素材

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/material/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/material/delete/org`  
**操作ID**: `deleteByOrgUid_131`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建素材

**方法**: ` POST `  
**路径**: `/api/v1/material/create`  
**操作ID**: `create_133`  

**描述**: 创建新的素材

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询素材

**方法**: ` GET `  
**路径**: `/api/v1/material/query`  
**操作ID**: `queryByUser_131`  

**描述**: 查询用户的素材列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MaterialRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询素材

**方法**: ` GET `  
**路径**: `/api/v1/material/query/uid`  
**操作ID**: `queryByUid_131`  

**描述**: 通过UID查询具体的素材

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MaterialRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询素材

**方法**: ` GET `  
**路径**: `/api/v1/material/query/org`  
**操作ID**: `queryByOrg_131`  

**描述**: 查询组织的素材列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MaterialRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出素材

**方法**: ` GET `  
**路径**: `/api/v1/material/export`  
**操作ID**: `export_131`  

**描述**: 导出素材数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MaterialRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 工作组管理

工作组管理相关接口

### 更新工作组

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/update`  
**操作ID**: `update_5`  

**描述**: 更新工作组信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新工作组状态

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/update/status`  
**操作ID**: `updateStatus`  

**描述**: 更新工作组的状态

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新工作组头像

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/update/avatar`  
**操作ID**: `updateAvatar`  

**描述**: 更新工作组的头像

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除工作组

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/delete`  
**操作ID**: `delete_7`  

**描述**: 删除指定的工作组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/workgroup/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/delete/org`  
**操作ID**: `deleteByOrgUid_7`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建工作组

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/create`  
**操作ID**: `create_9`  

**描述**: 创建新的工作组

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的工作组

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/query`  
**操作ID**: `queryByUser_7`  

**描述**: 根据用户ID查询工作组列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定工作组

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/query/uid`  
**操作ID**: `queryByUid_7`  

**描述**: 根据UID查询工作组详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的工作组

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/query/org`  
**操作ID**: `queryByOrg_7`  

**描述**: 根据组织ID查询工作组列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出工作组

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/export`  
**操作ID**: `export_7`  

**描述**: 导出工作组数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 客服管理

客服管理相关接口

### 更新客服

**方法**: ` POST `  
**路径**: `/api/v1/agent/update`  
**操作ID**: `update_196`  

**描述**: 更新客服信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新客服状态

**方法**: ` POST `  
**路径**: `/api/v1/agent/update/status`  
**操作ID**: `updateStatus_3`  

**描述**: 更新客服的在线状态

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新客服头像

**方法**: ` POST `  
**路径**: `/api/v1/agent/update/avatar`  
**操作ID**: `updateAvatar_3`  

**描述**: 更新客服的头像

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新客服自动回复

**方法**: ` POST `  
**路径**: `/api/v1/agent/update/autoreply`  
**操作ID**: `updateAutoReply`  

**描述**: 更新客服的自动回复设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除客服

**方法**: ` POST `  
**路径**: `/api/v1/agent/delete`  
**操作ID**: `delete_199`  

**描述**: 删除指定的客服

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/agent/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/agent/delete/org`  
**操作ID**: `deleteByOrgUid_199`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建客服

**方法**: ` POST `  
**路径**: `/api/v1/agent/create`  
**操作ID**: `create_201`  

**描述**: 创建新的客服

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 客服接受会话

**方法**: ` POST `  
**路径**: `/api/v1/agent/accept`  
**操作ID**: `acceptByAgent`  

**描述**: 客服接受会话请求

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 接受成功

---

### 查询用户下的客服

**方法**: ` GET `  
**路径**: `/api/v1/agent/query`  
**操作ID**: `queryByUser_199`  

**描述**: 根据用户ID查询客服信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据用户UID查询客服

**方法**: ` GET `  
**路径**: `/api/v1/agent/query/user/uid`  
**操作ID**: `queryByUserUid_1`  

**描述**: 根据 userUid 查询单个客服信息（可选传 orgUid 进行精确匹配）

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 根据UID查询客服

**方法**: ` GET `  
**路径**: `/api/v1/agent/query/uid`  
**操作ID**: `queryByUid_199`  

**描述**: 根据UID查询客服详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的客服

**方法**: ` GET `  
**路径**: `/api/v1/agent/query/org`  
**操作ID**: `queryByOrg_199`  

**描述**: 根据组织ID查询客服列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 客服消息SSE推送

**方法**: ` GET `  
**路径**: `/api/v1/agent/message/sse`  
**操作ID**: `sendAgentSseMessage`  

**描述**: 客服消息SSE实时推送接口

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| message | string | query | 是 |  |

#### 响应

**200**: 推送成功

---

### 导出客服

**方法**: ` GET `  
**路径**: `/api/v1/agent/export`  
**操作ID**: `export_199`  

**描述**: 导出客服数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 客服状态设置管理

客服状态设置管理相关接口

### POST /api/v1/agent/status/setting/update

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/setting/update`  
**操作ID**: `update_198`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/agent/status/setting/delete

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/setting/delete`  
**操作ID**: `delete_196`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/agent/status/setting/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/setting/delete/org`  
**操作ID**: `deleteByOrgUid_196`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/agent/status/setting/create

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/setting/create`  
**操作ID**: `create_198`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/agent/status/setting/query

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/setting/query`  
**操作ID**: `queryByUser_196`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusSettingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/agent/status/setting/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/setting/query/uid`  
**操作ID**: `queryByUid_196`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusSettingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/agent/status/setting/query/org

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/setting/query/org`  
**操作ID**: `queryByOrg_196`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusSettingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/agent/status/setting/export

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/setting/export`  
**操作ID**: `export_196`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusSettingRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Organization

Organization management APIs

### POST /api/v1/org/update

**方法**: ` POST `  
**路径**: `/api/v1/org/update`  
**操作ID**: `update_106`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/org/update/by/super

**方法**: ` POST `  
**路径**: `/api/v1/org/update/by/super`  
**操作ID**: `updateBySuper`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/org/delete

**方法**: ` POST `  
**路径**: `/api/v1/org/delete`  
**操作ID**: `delete_106`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/org/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/org/delete/org`  
**操作ID**: `deleteByOrgUid_106`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/org/create

**方法**: ` POST `  
**路径**: `/api/v1/org/create`  
**操作ID**: `create_108`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/org/create/by/super

**方法**: ` POST `  
**路径**: `/api/v1/org/create/by/super`  
**操作ID**: `createBySuper`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/org/query

**方法**: ` GET `  
**路径**: `/api/v1/org/query`  
**操作ID**: `queryByUser_106`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrganizationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/org/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/org/query/uid`  
**操作ID**: `queryByUid_106`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrganizationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/org/query/org

**方法**: ` GET `  
**路径**: `/api/v1/org/query/org`  
**操作ID**: `queryByOrg_106`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrganizationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/org/export

**方法**: ` GET `  
**路径**: `/api/v1/org/export`  
**操作ID**: `export_106`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OrganizationRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话意图管理

会话意图管理相关接口

### 更新会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/update`  
**操作ID**: `update_59`  

**描述**: 更新会话意图信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/delete`  
**操作ID**: `delete_58`  

**描述**: 删除指定的会话意图

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/intention/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/delete/org`  
**操作ID**: `deleteByOrgUid_58`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/create`  
**操作ID**: `create_60`  

**描述**: 创建新的会话意图

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 智能会话意图

**方法**: ` POST `  
**路径**: `/api/v1/thread/intention/auto`  
**操作ID**: `autoSummary`  

**描述**: 自动生成会话意图

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 生成成功

---

### 查询用户下的会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query`  
**操作ID**: `queryByUser_59`  

**描述**: 根据用户ID查询会话意图列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query/uid`  
**操作ID**: `queryByUid_59`  

**描述**: 根据UID查询会话意图详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query/thread/uid`  
**操作ID**: `queryByThreadUid_6`  

**描述**: 根据会话UID查询意图信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

**201**: 未找到会话意图

---

### 查询组织下的会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/query/org`  
**操作ID**: `queryByOrg_59`  

**描述**: 根据组织ID查询会话意图列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话意图

**方法**: ` GET `  
**路径**: `/api/v1/thread/intention/export`  
**操作ID**: `export_58`  

**描述**: 导出会话意图数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadIntentionRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 文章管理

文章管理相关接口

### 更新文章

**方法**: ` POST `  
**路径**: `/api/v1/article/update`  
**操作ID**: `update_192`  

**描述**: 更新文章信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新文章向量索引

**方法**: ` POST `  
**路径**: `/api/v1/article/updateVectorIndex`  
**操作ID**: `updateVectorIndex_4`  

**描述**: 更新文章的向量索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新文章索引

**方法**: ` POST `  
**路径**: `/api/v1/article/updateIndex`  
**操作ID**: `updateIndex_4`  

**描述**: 更新文章的Elasticsearch索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新所有文章向量索引

**方法**: ` POST `  
**路径**: `/api/v1/article/updateAllVectorIndex`  
**操作ID**: `updateAllVectorIndex_4`  

**描述**: 更新所有文章的向量索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新所有文章索引

**方法**: ` POST `  
**路径**: `/api/v1/article/updateAllIndex`  
**操作ID**: `updateAllIndex_4`  

**描述**: 更新所有文章的Elasticsearch索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除文章

**方法**: ` POST `  
**路径**: `/api/v1/article/delete`  
**操作ID**: `delete_192`  

**描述**: 删除指定的文章

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/article/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/article/delete/org`  
**操作ID**: `deleteByOrgUid_192`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建文章

**方法**: ` POST `  
**路径**: `/api/v1/article/create`  
**操作ID**: `create_194`  

**描述**: 创建新的文章

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 搜索文章

**方法**: ` GET `  
**路径**: `/api/v1/article/search`  
**操作ID**: `searchElastic`  

**描述**: 输入联想搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: 搜索成功

---

### 查询用户下的文章

**方法**: ` GET `  
**路径**: `/api/v1/article/query`  
**操作ID**: `queryByUser_192`  

**描述**: 根据用户ID查询文章列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定文章

**方法**: ` GET `  
**路径**: `/api/v1/article/query/uid`  
**操作ID**: `queryByUid_192`  

**描述**: 根据UID查询文章详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的文章

**方法**: ` GET `  
**路径**: `/api/v1/article/query/org`  
**操作ID**: `queryByOrg_192`  

**描述**: 根据组织ID查询文章列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出文章

**方法**: ` GET `  
**路径**: `/api/v1/article/export`  
**操作ID**: `export_192`  

**描述**: 导出文章数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Taboo Management

Taboo word management APIs for content filtering

### Update Taboo

**方法**: ` POST `  
**路径**: `/api/v1/taboo/update`  
**操作ID**: `update_66`  

**描述**: Update an existing taboo word

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Enable Taboo

**方法**: ` POST `  
**路径**: `/api/v1/taboo/enable`  
**操作ID**: `enable`  

**描述**: Enable a taboo word

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Taboo

**方法**: ` POST `  
**路径**: `/api/v1/taboo/delete`  
**操作ID**: `delete_67`  

**描述**: Delete a taboo word

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/taboo/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/taboo/delete/org`  
**操作ID**: `deleteByOrgUid_67`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Taboo

**方法**: ` POST `  
**路径**: `/api/v1/taboo/create`  
**操作ID**: `create_69`  

**描述**: Create a new taboo word

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Taboo by User

**方法**: ` GET `  
**路径**: `/api/v1/taboo/query`  
**操作ID**: `queryByUser_66`  

**描述**: Retrieve taboo words for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Taboo by UID

**方法**: ` GET `  
**路径**: `/api/v1/taboo/query/uid`  
**操作ID**: `queryByUid_66`  

**描述**: Retrieve a specific taboo word by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Taboo by Organization

**方法**: ` GET `  
**路径**: `/api/v1/taboo/query/org`  
**操作ID**: `queryByOrg_66`  

**描述**: Retrieve taboo words for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Taboo

**方法**: ` GET `  
**路径**: `/api/v1/taboo/export`  
**操作ID**: `export_67`  

**描述**: Export taboo words to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TabooRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 主题管理

主题管理相关接口，包括查询、创建、更新、删除等操作

### 更新主题

**方法**: ` POST `  
**路径**: `/api/v1/topic/update`  
**操作ID**: `update_45`  

**描述**: 更新已存在的主题信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 取消订阅主题

**方法**: ` POST `  
**路径**: `/api/v1/topic/unsubscribe`  
**操作ID**: `unsubscribe`  

**描述**: 取消订阅指定主题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 订阅主题

**方法**: ` POST `  
**路径**: `/api/v1/topic/subscribe`  
**操作ID**: `subscribe`  

**描述**: 订阅指定主题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除主题

**方法**: ` POST `  
**路径**: `/api/v1/topic/delete`  
**操作ID**: `delete_45`  

**描述**: 删除指定主题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/topic/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/topic/delete/org`  
**操作ID**: `deleteByOrgUid_45`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建主题

**方法**: ` POST `  
**路径**: `/api/v1/topic/create`  
**操作ID**: `create_47`  

**描述**: 创建新的主题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询主题

**方法**: ` GET `  
**路径**: `/api/v1/topic/query`  
**操作ID**: `queryByUser_45`  

**描述**: 返回当前用户的主题列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TopicRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询主题

**方法**: ` GET `  
**路径**: `/api/v1/topic/query/uid`  
**操作ID**: `queryByUid_45`  

**描述**: 通过唯一标识符查询主题

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TopicRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询主题

**方法**: ` GET `  
**路径**: `/api/v1/topic/query/org`  
**操作ID**: `queryByOrg_45`  

**描述**: 返回当前组织的主题列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TopicRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/topic/is/subscribed

**方法**: ` GET `  
**路径**: `/api/v1/topic/is/subscribed`  
**操作ID**: `isSubscribed`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TopicRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出主题列表

**方法**: ` GET `  
**路径**: `/api/v1/topic/export`  
**操作ID**: `export_45`  

**描述**: 将主题数据导出为Excel格式

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TopicRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 访客消息管理

访客消息管理相关接口

### 更新访客消息

**方法**: ` POST `  
**路径**: `/api/v1/visitor/message/update`  
**操作ID**: `update_32`  

**描述**: 更新访客消息信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除访客消息

**方法**: ` POST `  
**路径**: `/api/v1/visitor/message/delete`  
**操作ID**: `delete_31`  

**描述**: 删除指定的访客消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/visitor/message/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/visitor/message/delete/org`  
**操作ID**: `deleteByOrgUid_31`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建访客消息

**方法**: ` POST `  
**路径**: `/api/v1/visitor/message/create`  
**操作ID**: `create_33`  

**描述**: 创建新的访客消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的访客消息

**方法**: ` GET `  
**路径**: `/api/v1/visitor/message/query`  
**操作ID**: `queryByUser_32`  

**描述**: 根据用户ID查询访客消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定访客消息

**方法**: ` GET `  
**路径**: `/api/v1/visitor/message/query/uid`  
**操作ID**: `queryByUid_32`  

**描述**: 根据UID查询访客消息详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/visitor/message/query/topic

**方法**: ` GET `  
**路径**: `/api/v1/visitor/message/query/topic`  
**操作ID**: `queryByTopic`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/visitor/message/query/thread/uid

**方法**: ` GET `  
**路径**: `/api/v1/visitor/message/query/thread/uid`  
**操作ID**: `queryByThreadUid_1`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的访客消息

**方法**: ` GET `  
**路径**: `/api/v1/visitor/message/query/org`  
**操作ID**: `queryByOrg_32`  

**描述**: 根据组织ID查询访客消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出访客消息

**方法**: ` GET `  
**路径**: `/api/v1/visitor/message/export`  
**操作ID**: `export_31`  

**描述**: 导出访客消息数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## IP Access Management

IP access control management APIs for managing IP access permissions

### Update IP Access Record

**方法**: ` POST `  
**路径**: `/api/v1/ip/access/update`  
**操作ID**: `update_146`  

**描述**: Update an existing IP access record

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete IP Access Record

**方法**: ` POST `  
**路径**: `/api/v1/ip/access/delete`  
**操作ID**: `delete_146`  

**描述**: Delete an IP access record

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ip/access/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ip/access/delete/org`  
**操作ID**: `deleteByOrgUid_146`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create IP Access Record

**方法**: ` POST `  
**路径**: `/api/v1/ip/access/create`  
**操作ID**: `create_148`  

**描述**: Create a new IP access record

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query IP Access by User

**方法**: ` GET `  
**路径**: `/api/v1/ip/access/query`  
**操作ID**: `queryByUser_146`  

**描述**: Retrieve IP access records for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpAccessRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/ip/access/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/ip/access/query/uid`  
**操作ID**: `queryByUid_146`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpAccessRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query IP Access by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ip/access/query/org`  
**操作ID**: `queryByOrg_146`  

**描述**: Retrieve IP access records for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpAccessRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/ip/access/export

**方法**: ` GET `  
**路径**: `/api/v1/ip/access/export`  
**操作ID**: `export_146`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IpAccessRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话转接管理

会话转接管理相关接口

### POST /api/v1/thread/transfer/update

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/update`  
**操作ID**: `update_55`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/timeout

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/timeout`  
**操作ID**: `timeout`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/reject

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/reject`  
**操作ID**: `reject_1`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/delete

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/delete`  
**操作ID**: `delete_54`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/delete/org`  
**操作ID**: `deleteByOrgUid_54`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/create

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/create`  
**操作ID**: `create_56`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/cancel

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/cancel`  
**操作ID**: `cancel`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/transfer/accept

**方法**: ` POST `  
**路径**: `/api/v1/thread/transfer/accept`  
**操作ID**: `accept`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/thread/transfer/query

**方法**: ` GET `  
**路径**: `/api/v1/thread/transfer/query`  
**操作ID**: `queryByUser_54`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadTransferRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/thread/transfer/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/thread/transfer/query/uid`  
**操作ID**: `queryByUid_54`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadTransferRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/thread/transfer/query/thread/uid

**方法**: ` GET `  
**路径**: `/api/v1/thread/transfer/query/thread/uid`  
**操作ID**: `queryByThreadUid_3`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadTransferRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/thread/transfer/query/page/thread/uid

**方法**: ` GET `  
**路径**: `/api/v1/thread/transfer/query/page/thread/uid`  
**操作ID**: `queryPageByThreadUid`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadTransferRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/thread/transfer/query/org

**方法**: ` GET `  
**路径**: `/api/v1/thread/transfer/query/org`  
**操作ID**: `queryByOrg_54`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadTransferRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/thread/transfer/export

**方法**: ` GET `  
**路径**: `/api/v1/thread/transfer/export`  
**操作ID**: `export_54`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadTransferRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Upload Management

File upload management APIs

### 更新文件记录

**方法**: ` POST `  
**路径**: `/api/v1/upload/update`  
**操作ID**: `update_39`  

**描述**: 更新文件记录信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 上传文件

**方法**: ` POST `  
**路径**: `/api/v1/upload/file`  
**操作ID**: `uploadFile_1`  

**描述**: 上传文件到服务器

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 上传成功

---

### 删除文件

**方法**: ` POST `  
**路径**: `/api/v1/upload/delete`  
**操作ID**: `delete_39`  

**描述**: 删除指定的文件和记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/upload/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/upload/delete/org`  
**操作ID**: `deleteByOrgUid_39`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建文件记录

**方法**: ` POST `  
**路径**: `/api/v1/upload/create`  
**操作ID**: `create_41`  

**描述**: 创建新的文件记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的文件

**方法**: ` GET `  
**路径**: `/api/v1/upload/query`  
**操作ID**: `queryByUser_39`  

**描述**: 根据用户ID查询文件列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定文件

**方法**: ` GET `  
**路径**: `/api/v1/upload/query/uid`  
**操作ID**: `queryByUid_39`  

**描述**: 根据UID查询文件详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的文件

**方法**: ` GET `  
**路径**: `/api/v1/upload/query/org`  
**操作ID**: `queryByOrg_39`  

**描述**: 根据组织ID查询文件列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出文件记录

**方法**: ` GET `  
**路径**: `/api/v1/upload/export`  
**操作ID**: `export_39`  

**描述**: 导出文件记录数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Trace Management

Trace management APIs for organizing and categorizing content with traces

### Update Trace

**方法**: ` POST `  
**路径**: `/api/v1/trace/update`  
**操作ID**: `update_44`  

**描述**: Update an existing trace

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Trace

**方法**: ` POST `  
**路径**: `/api/v1/trace/delete`  
**操作ID**: `delete_44`  

**描述**: Delete a trace

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/trace/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/trace/delete/org`  
**操作ID**: `deleteByOrgUid_44`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Trace

**方法**: ` POST `  
**路径**: `/api/v1/trace/create`  
**操作ID**: `create_46`  

**描述**: Create a new trace

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Traces by User

**方法**: ` GET `  
**路径**: `/api/v1/trace/query`  
**操作ID**: `queryByUser_44`  

**描述**: Retrieve traces for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TraceRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Trace by UID

**方法**: ` GET `  
**路径**: `/api/v1/trace/query/uid`  
**操作ID**: `queryByUid_44`  

**描述**: Retrieve a specific trace by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TraceRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Traces by Organization

**方法**: ` GET `  
**路径**: `/api/v1/trace/query/org`  
**操作ID**: `queryByOrg_44`  

**描述**: Retrieve traces for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TraceRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Traces

**方法**: ` GET `  
**路径**: `/api/v1/trace/export`  
**操作ID**: `export_44`  

**描述**: Export traces to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TraceRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 访客会话管理

访客会话管理相关接口

### 更新访客会话

**方法**: ` POST `  
**路径**: `/visitor/api/v1/visitor_thread/update`  
**操作ID**: `update`  

**描述**: 更新现有的访客会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除访客会话

**方法**: ` POST `  
**路径**: `/visitor/api/v1/visitor_thread/delete`  
**操作ID**: `delete`  

**描述**: 删除指定的访客会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /visitor/api/v1/visitor_thread/delete/org

**方法**: ` POST `  
**路径**: `/visitor/api/v1/visitor_thread/delete/org`  
**操作ID**: `deleteByOrgUid`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建访客会话

**方法**: ` POST `  
**路径**: `/visitor/api/v1/visitor_thread/create`  
**操作ID**: `create`  

**描述**: 创建新的访客会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询访客会话

**方法**: ` GET `  
**路径**: `/visitor/api/v1/visitor_thread/query`  
**操作ID**: `queryByUser`  

**描述**: 查询用户的访客会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询访客会话

**方法**: ` GET `  
**路径**: `/visitor/api/v1/visitor_thread/query/uid`  
**操作ID**: `queryByUid`  

**描述**: 通过UID查询具体的访客会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询访客会话

**方法**: ` GET `  
**路径**: `/visitor/api/v1/visitor_thread/query/org`  
**操作ID**: `queryByOrg`  

**描述**: 管理员查询组织的访客会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出访客会话

**方法**: ` GET `  
**路径**: `/visitor/api/v1/visitor_thread/export`  
**操作ID**: `export`  

**描述**: 导出访客会话数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 浏览记录匿名管理

浏览记录匿名相关接口

### 创建浏览记录

**方法**: ` POST `  
**路径**: `/visitor/api/v1/browse`  
**操作ID**: `browse`  

**描述**: 根据访客请求信息创建一条浏览记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

## MinIO Storage

MinIO object storage management APIs

### Upload file to MinIO

**方法**: ` POST `  
**路径**: `/api/v1/minio/upload`  
**操作ID**: `uploadToMinio`  

**描述**: Upload file to MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 | Upload request |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Upload video to MinIO

**方法**: ` POST `  
**路径**: `/api/v1/minio/upload/video`  
**操作ID**: `uploadVideoToMinio`  

**描述**: Upload video file to MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 | Upload request |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Upload file from URL to MinIO

**方法**: ` POST `  
**路径**: `/api/v1/minio/upload/url`  
**操作ID**: `uploadUrlToMinio`  

**描述**: Download file from URL and upload to MinIO

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| url | string | query | 是 | File URL |
| fileName | string | query | 是 | File name |
| request | UploadRequest | query | 是 | Upload request |

#### 响应

**200**: OK

---

### Upload image to MinIO

**方法**: ` POST `  
**路径**: `/api/v1/minio/upload/image`  
**操作ID**: `uploadImageToMinio`  

**描述**: Upload image file to MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 | Upload request |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Upload document to MinIO

**方法**: ` POST `  
**路径**: `/api/v1/minio/upload/document`  
**操作ID**: `uploadDocumentToMinio`  

**描述**: Upload document file to MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 | Upload request |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Upload audio to MinIO

**方法**: ` POST `  
**路径**: `/api/v1/minio/upload/audio`  
**操作ID**: `uploadAudioToMinio`  

**描述**: Upload audio file to MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UploadRequest | query | 是 | Upload request |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Get file upload URL

**方法**: ` GET `  
**路径**: `/api/v1/minio/upload-url`  
**操作ID**: `getUploadUrl`  

**描述**: Get presigned upload URL for file in MinIO

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| objectPath | string | query | 是 | Object path in MinIO |
| expiry | integer | query | 否 | URL expiry time in seconds |

#### 响应

**200**: OK

---

### Check if file exists in MinIO

**方法**: ` GET `  
**路径**: `/api/v1/minio/exists`  
**操作ID**: `fileExistsInMinio`  

**描述**: Check if file exists in MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| objectPath | string | query | 是 | Object path in MinIO |

#### 响应

**200**: OK

---

### Get file download URL

**方法**: ` GET `  
**路径**: `/api/v1/minio/download-url`  
**操作ID**: `getDownloadUrl`  

**描述**: Get presigned download URL for file in MinIO

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| objectPath | string | query | 是 | Object path in MinIO |
| expiry | integer | query | 否 | URL expiry time in seconds |

#### 响应

**200**: OK

---

### Delete file from MinIO

**方法**: ` DELETE `  
**路径**: `/api/v1/minio/delete`  
**操作ID**: `deleteFromMinio`  

**描述**: Delete file from MinIO object storage

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| objectPath | string | query | 是 | Object path in MinIO |

#### 响应

**200**: OK

---

## OpenPlatform Management

OpenPlatform management APIs for organizing and categorizing content with openPlatforms

### Update OpenPlatform

**方法**: ` POST `  
**路径**: `/api/v1/open/platform/update`  
**操作ID**: `update_110`  

**描述**: Update an existing openPlatform

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete OpenPlatform

**方法**: ` POST `  
**路径**: `/api/v1/open/platform/delete`  
**操作ID**: `delete_110`  

**描述**: Delete a openPlatform

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/open/platform/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/open/platform/delete/org`  
**操作ID**: `deleteByOrgUid_110`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create OpenPlatform

**方法**: ` POST `  
**路径**: `/api/v1/open/platform/create`  
**操作ID**: `create_112`  

**描述**: Create a new openPlatform

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query OpenPlatforms by User

**方法**: ` GET `  
**路径**: `/api/v1/open/platform/query`  
**操作ID**: `queryByUser_110`  

**描述**: Retrieve openPlatforms for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpenPlatformRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query OpenPlatform by UID

**方法**: ` GET `  
**路径**: `/api/v1/open/platform/query/uid`  
**操作ID**: `queryByUid_110`  

**描述**: Retrieve a specific openPlatform by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpenPlatformRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query OpenPlatforms by Organization

**方法**: ` GET `  
**路径**: `/api/v1/open/platform/query/org`  
**操作ID**: `queryByOrg_110`  

**描述**: Retrieve openPlatforms for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpenPlatformRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export OpenPlatforms

**方法**: ` GET `  
**路径**: `/api/v1/open/platform/export`  
**操作ID**: `export_110`  

**描述**: Export openPlatforms to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | OpenPlatformRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话邀请

会话邀请相关接口

### 更新会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/update`  
**操作ID**: `update_58`  

**描述**: 更新会话邀请信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 移除会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/remove`  
**操作ID**: `remove`  

**描述**: 发起邀请会话人员将已经加入会话的人员移除掉。只需要传入threadUid和agentUid参数

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 移除成功

---

### 拒绝会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/reject`  
**操作ID**: `reject_2`  

**描述**: 被邀请人员主动拒绝会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 拒绝成功

---

### 退出会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/exit`  
**操作ID**: `exit`  

**描述**: 被邀请人员加入会话之后，自己主动从会话中退出。只需要传入threadUid和agentUid参数

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 退出成功

---

### 删除会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/delete`  
**操作ID**: `delete_57`  

**描述**: 删除指定的会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/invite/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/delete/org`  
**操作ID**: `deleteByOrgUid_57`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/create`  
**操作ID**: `create_59`  

**描述**: 创建新的会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 取消会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/cancel`  
**操作ID**: `cancel_1`  

**描述**: 发起邀请的客服人员取消邀请其他客服

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 取消成功

---

### 接受会话邀请

**方法**: ` POST `  
**路径**: `/api/v1/thread/invite/accept`  
**操作ID**: `accept_1`  

**描述**: 被邀请客服接受会话邀请

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 接受成功

---

### 查询用户下的会话邀请

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/query`  
**操作ID**: `queryByUser_58`  

**描述**: 根据用户ID查询会话邀请列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/thread/invite/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/query/uid`  
**操作ID**: `queryByUid_58`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的会话邀请

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/query/org`  
**操作ID**: `queryByOrg_58`  

**描述**: 根据组织ID查询会话邀请列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话邀请

**方法**: ` GET `  
**路径**: `/api/v1/thread/invite/export`  
**操作ID**: `export_57`  

**描述**: 导出会话邀请数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadInviteRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 客服状态管理

客服状态管理相关接口

### 更新客服状态

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/update`  
**操作ID**: `update_197`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除客服状态

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/delete`  
**操作ID**: `delete_197`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/agent/status/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/delete/org`  
**操作ID**: `deleteByOrgUid_197`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建客服状态

**方法**: ` POST `  
**路径**: `/api/v1/agent/status/create`  
**操作ID**: `create_199`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询客服状态

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/query`  
**操作ID**: `queryByUser_197`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询客服状态

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/query/uid`  
**操作ID**: `queryByUid_197`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询客服状态

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/query/org`  
**操作ID**: `queryByOrg_197`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/agent/status/export

**方法**: ` GET `  
**路径**: `/api/v1/agent/status/export`  
**操作ID**: `export_197`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AgentStatusRequest | query | 是 |  |

#### 响应

**200**: OK

---

## WorkflowNode Management

WorkflowNode management APIs for organizing and categorizing content with workflow_nodes

### Update WorkflowNode

**方法**: ` POST `  
**路径**: `/api/v1/workflow/node/update`  
**操作ID**: `update_9`  

**描述**: Update an existing workflow_node

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete WorkflowNode

**方法**: ` POST `  
**路径**: `/api/v1/workflow/node/delete`  
**操作ID**: `delete_8`  

**描述**: Delete a workflow_node

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/workflow/node/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/workflow/node/delete/org`  
**操作ID**: `deleteByOrgUid_8`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create WorkflowNode

**方法**: ` POST `  
**路径**: `/api/v1/workflow/node/create`  
**操作ID**: `create_10`  

**描述**: Create a new workflow_node

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query WorkflowNodes by User

**方法**: ` GET `  
**路径**: `/api/v1/workflow/node/query`  
**操作ID**: `queryByUser_9`  

**描述**: Retrieve workflow_nodes for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowNodeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkflowNode by UID

**方法**: ` GET `  
**路径**: `/api/v1/workflow/node/query/uid`  
**操作ID**: `queryByUid_9`  

**描述**: Retrieve a specific workflow_node by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowNodeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query WorkflowNodes by Organization

**方法**: ` GET `  
**路径**: `/api/v1/workflow/node/query/org`  
**操作ID**: `queryByOrg_9`  

**描述**: Retrieve workflow_nodes for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowNodeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export WorkflowNodes

**方法**: ` GET `  
**路径**: `/api/v1/workflow/node/export`  
**操作ID**: `export_8`  

**描述**: Export workflow_nodes to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkflowNodeRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Authentication

Authentication APIs

### POST /auth/v1/send/mobile

**方法**: ` POST `  
**路径**: `/auth/v1/send/mobile`  
**操作ID**: `sendMobileCode`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /auth/v1/send/email

**方法**: ` POST `  
**路径**: `/auth/v1/send/email`  
**操作ID**: `sendEmailCode`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /auth/v1/register

**方法**: ` POST `  
**路径**: `/auth/v1/register`  
**操作ID**: `register`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /auth/v1/login

**方法**: ` POST `  
**路径**: `/auth/v1/login`  
**操作ID**: `loginWithUsernamePassword`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /auth/v1/login/mobile

**方法**: ` POST `  
**路径**: `/auth/v1/login/mobile`  
**操作ID**: `loginWithMobileCode`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /auth/v1/login/email

**方法**: ` POST `  
**路径**: `/auth/v1/login/email`  
**操作ID**: `loginWithEmailCode`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /auth/v1/login/accessToken

**方法**: ` POST `  
**路径**: `/auth/v1/login/accessToken`  
**操作ID**: `loginWithAccessToken`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

## 消息纠错管理

消息纠错管理相关接口

### 更新消息纠错

**方法**: ` POST `  
**路径**: `/api/v1/message/correction/update`  
**操作ID**: `update_126`  

**描述**: 更新消息纠错信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除消息纠错

**方法**: ` POST `  
**路径**: `/api/v1/message/correction/delete`  
**操作ID**: `delete_126`  

**描述**: 删除指定的消息纠错

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/message/correction/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/correction/delete/org`  
**操作ID**: `deleteByOrgUid_126`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建消息纠错

**方法**: ` POST `  
**路径**: `/api/v1/message/correction/create`  
**操作ID**: `create_128`  

**描述**: 创建新的消息纠错

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的消息纠错

**方法**: ` GET `  
**路径**: `/api/v1/message/correction/query`  
**操作ID**: `queryByUser_126`  

**描述**: 根据用户ID查询消息纠错列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageCorrectionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定消息纠错

**方法**: ` GET `  
**路径**: `/api/v1/message/correction/query/uid`  
**操作ID**: `queryByUid_126`  

**描述**: 根据UID查询消息纠错详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageCorrectionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的消息纠错

**方法**: ` GET `  
**路径**: `/api/v1/message/correction/query/org`  
**操作ID**: `queryByOrg_126`  

**描述**: 根据组织ID查询消息纠错列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageCorrectionRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出消息纠错

**方法**: ` GET `  
**路径**: `/api/v1/message/correction/export`  
**操作ID**: `export_126`  

**描述**: 导出消息纠错数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageCorrectionRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 会话小结

会话小结相关接口

### 更新会话小结

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/update`  
**操作ID**: `update_56`  

**描述**: 更新会话小结信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话小结

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/delete`  
**操作ID**: `delete_55`  

**描述**: 删除指定的会话小结

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/summary/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/delete/org`  
**操作ID**: `deleteByOrgUid_55`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话小结

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/create`  
**操作ID**: `create_57`  

**描述**: 创建新的会话小结

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query`  
**操作ID**: `queryByUser_55`  

**描述**: 根据用户ID查询会话小结列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query/uid`  
**操作ID**: `queryByUid_55`  

**描述**: 根据UID查询会话小结详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query/thread/uid`  
**操作ID**: `queryByThreadUid_4`  

**描述**: 根据会话UID查询小结信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

**201**: 未找到会话小结

---

### 查询组织下的会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query/org`  
**操作ID**: `queryByOrg_55`  

**描述**: 根据组织ID查询会话小结列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/export`  
**操作ID**: `export_55`  

**描述**: 导出会话小结数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## QualityPlan Management

QualityPlan management APIs for organizing and categorizing content with plans

### Update QualityPlan

**方法**: ` POST `  
**路径**: `/api/v1/quality/plan/update`  
**操作ID**: `update_96`  

**描述**: Update an existing plan

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete QualityPlan

**方法**: ` POST `  
**路径**: `/api/v1/quality/plan/delete`  
**操作ID**: `delete_96`  

**描述**: Delete a plan

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/quality/plan/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/quality/plan/delete/org`  
**操作ID**: `deleteByOrgUid_96`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create QualityPlan

**方法**: ` POST `  
**路径**: `/api/v1/quality/plan/create`  
**操作ID**: `create_98`  

**描述**: Create a new plan

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query QualityPlans by User

**方法**: ` GET `  
**路径**: `/api/v1/quality/plan/query`  
**操作ID**: `queryByUser_96`  

**描述**: Retrieve plans for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityPlanRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityPlan by UID

**方法**: ` GET `  
**路径**: `/api/v1/quality/plan/query/uid`  
**操作ID**: `queryByUid_96`  

**描述**: Retrieve a specific plan by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityPlanRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityPlans by Organization

**方法**: ` GET `  
**路径**: `/api/v1/quality/plan/query/org`  
**操作ID**: `queryByOrg_96`  

**描述**: Retrieve plans for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityPlanRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export QualityPlans

**方法**: ` GET `  
**路径**: `/api/v1/quality/plan/export`  
**操作ID**: `export_96`  

**描述**: Export plans to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityPlanRequest | query | 是 |  |

#### 响应

**200**: OK

---

## SmsProvider Management

SmsProvider management APIs for organizing and categorizing content with sms_providers

### Update SmsProvider

**方法**: ` POST `  
**路径**: `/api/v1/sms_provider/update`  
**操作ID**: `update_70`  

**描述**: Update an existing sms_provider

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete SmsProvider

**方法**: ` POST `  
**路径**: `/api/v1/sms_provider/delete`  
**操作ID**: `delete_70`  

**描述**: Delete a sms_provider

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/sms_provider/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/sms_provider/delete/org`  
**操作ID**: `deleteByOrgUid_70`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create SmsProvider

**方法**: ` POST `  
**路径**: `/api/v1/sms_provider/create`  
**操作ID**: `create_72`  

**描述**: Create a new sms_provider

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query SmsProviders by User

**方法**: ` GET `  
**路径**: `/api/v1/sms_provider/query`  
**操作ID**: `queryByUser_70`  

**描述**: Retrieve sms_providers for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsProviderRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query SmsProvider by UID

**方法**: ` GET `  
**路径**: `/api/v1/sms_provider/query/uid`  
**操作ID**: `queryByUid_70`  

**描述**: Retrieve a specific sms_provider by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsProviderRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query SmsProviders by Organization

**方法**: ` GET `  
**路径**: `/api/v1/sms_provider/query/org`  
**操作ID**: `queryByOrg_70`  

**描述**: Retrieve sms_providers for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsProviderRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export SmsProviders

**方法**: ` GET `  
**路径**: `/api/v1/sms_provider/export`  
**操作ID**: `export_70`  

**描述**: Export sms_providers to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsProviderRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 分词接口

中文分词相关API

### 高级分词

**方法**: ` POST `  
**路径**: `/segment/api/v1/segment`  
**操作ID**: `segment`  

**描述**: 支持多种分词类型和过滤选项的高级分词接口

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 基础分词

**方法**: ` GET `  
**路径**: `/segment/api/v1/words`  
**操作ID**: `segmentWords`  

**描述**: 对文本进行基础分词，返回词语列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| text | string | query | 是 | 待分词的文本 |

#### 响应

**200**: OK

---

### 简单分词

**方法**: ` GET `  
**路径**: `/segment/api/v1/simple`  
**操作ID**: `simpleSegment`  

**描述**: 简单的GET请求分词接口

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| text | string | query | 是 | 待分词的文本 |
| filterPunctuation | boolean | query | 否 | 是否过滤标点符号 |
| minLength | integer | query | 否 | 最小词长度 |

#### 响应

**200**: OK

---

### 详细分词

**方法**: ` GET `  
**路径**: `/segment/api/v1/details`  
**操作ID**: `segmentDetails`  

**描述**: 对文本进行详细分词，返回包含位置信息的分词结果

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| text | string | query | 是 | 待分词的文本 |

#### 响应

**200**: OK

---

### 词频统计

**方法**: ` GET `  
**路径**: `/segment/api/v1/count`  
**操作ID**: `wordCount`  

**描述**: 对文本进行分词并统计词频

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| text | string | query | 是 | 待分词的文本 |

#### 响应

**200**: OK

---

### 批量分词

**方法**: ` GET `  
**路径**: `/segment/api/v1/batch`  
**操作ID**: `batchSegment`  

**描述**: 批量处理多个文本的分词

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| type | string | query | 否 | 分词类型：word(词语)、detail(详细)、count(词频) |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

## StatisticToken Management

StatisticToken management APIs for organizing and categorizing content with statisticTokens

### Update StatisticToken

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/token/update`  
**操作ID**: `update_195`  

**描述**: Update an existing statistic_token

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete StatisticToken

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/token/delete`  
**操作ID**: `delete_194`  

**描述**: Delete a statistic_token

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ai/statistic/token/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/token/delete/org`  
**操作ID**: `deleteByOrgUid_194`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create StatisticToken

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/token/create`  
**操作ID**: `create_196`  

**描述**: Create a new statistic_token

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query StatisticTokens by User

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/query`  
**操作ID**: `queryByUser_194`  

**描述**: Retrieve statisticTokens for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | StatisticTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query StatisticToken by UID

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/query/uid`  
**操作ID**: `queryByUid_194`  

**描述**: Retrieve a specific statistic_token by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | StatisticTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query StatisticTokens by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/query/org`  
**操作ID**: `queryByOrg_194`  

**描述**: Retrieve statisticTokens for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | StatisticTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Get Hourly AI Token Statistics

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/hourly`  
**操作ID**: `getHourlyTokenStatistics`  

**描述**: Retrieve hourly AI token usage statistics for a specific organization and date

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | query | 是 |  |
| date | string | query | 是 |  |

#### 响应

**200**: OK

---

### Get Hourly AI Token Statistics by Provider

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/hourly/provider`  
**操作ID**: `getHourlyTokenStatisticsByProvider`  

**描述**: Retrieve hourly AI token usage statistics for a specific organization, date and AI provider

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | query | 是 |  |
| date | string | query | 是 |  |
| aiProvider | string | query | 是 |  |

#### 响应

**200**: OK

---

### Get Hourly AI Token Statistics by Model Type

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/hourly/model`  
**操作ID**: `getHourlyTokenStatisticsByModelType`  

**描述**: Retrieve hourly AI token usage statistics for a specific organization, date and AI model type

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | query | 是 |  |
| date | string | query | 是 |  |
| aiModelType | string | query | 是 |  |

#### 响应

**200**: OK

---

### Export StatisticTokens

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/token/export`  
**操作ID**: `export_194`  

**描述**: Export statisticTokens to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | StatisticTokenRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Booking Management

Booking management APIs for organizing and categorizing content with bookings

### Update Booking

**方法**: ` POST `  
**路径**: `/demo/api/v1/booking/update`  
**操作ID**: `update_3`  

**描述**: Update an existing booking

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Booking

**方法**: ` POST `  
**路径**: `/demo/api/v1/booking/delete`  
**操作ID**: `delete_3`  

**描述**: Delete a booking

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /demo/api/v1/booking/delete/org

**方法**: ` POST `  
**路径**: `/demo/api/v1/booking/delete/org`  
**操作ID**: `deleteByOrgUid_3`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Booking

**方法**: ` POST `  
**路径**: `/demo/api/v1/booking/create`  
**操作ID**: `create_5`  

**描述**: Create a new booking

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Bookings by User

**方法**: ` GET `  
**路径**: `/demo/api/v1/booking/query`  
**操作ID**: `queryByUser_3`  

**描述**: Retrieve bookings for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BookingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Booking by UID

**方法**: ` GET `  
**路径**: `/demo/api/v1/booking/query/uid`  
**操作ID**: `queryByUid_3`  

**描述**: Retrieve a specific booking by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BookingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Bookings by Organization

**方法**: ` GET `  
**路径**: `/demo/api/v1/booking/query/org`  
**操作ID**: `queryByOrg_3`  

**描述**: Retrieve bookings for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BookingRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Bookings

**方法**: ` GET `  
**路径**: `/demo/api/v1/booking/export`  
**操作ID**: `export_3`  

**描述**: Export bookings to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BookingRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 路由规则管理

路由规则管理相关接口

### 更新路由规则

**方法**: ` POST `  
**路径**: `/api/v1/routing/rule/update`  
**操作ID**: `update_80`  

**描述**: 更新路由规则信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除路由规则

**方法**: ` POST `  
**路径**: `/api/v1/routing/rule/delete`  
**操作ID**: `delete_80`  

**描述**: 删除指定的路由规则

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/routing/rule/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/routing/rule/delete/org`  
**操作ID**: `deleteByOrgUid_80`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建路由规则

**方法**: ` POST `  
**路径**: `/api/v1/routing/rule/create`  
**操作ID**: `create_82`  

**描述**: 创建新的路由规则

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 更新路由规则

**方法**: ` POST `  
**路径**: `/api/v1/routing/queue/update`  
**操作ID**: `update_81`  

**描述**: 更新路由规则信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除路由规则

**方法**: ` POST `  
**路径**: `/api/v1/routing/queue/delete`  
**操作ID**: `delete_81`  

**描述**: 删除指定的路由规则

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/routing/queue/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/routing/queue/delete/org`  
**操作ID**: `deleteByOrgUid_81`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建路由规则

**方法**: ` POST `  
**路径**: `/api/v1/routing/queue/create`  
**操作ID**: `create_83`  

**描述**: 创建新的路由规则

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/rule/query`  
**操作ID**: `queryByUser_80`  

**描述**: 根据用户ID查询路由规则列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingRuleRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/rule/query/uid`  
**操作ID**: `queryByUid_80`  

**描述**: 根据UID查询路由规则详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingRuleRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/rule/query/org`  
**操作ID**: `queryByOrg_80`  

**描述**: 根据组织ID查询路由规则列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingRuleRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/rule/export`  
**操作ID**: `export_80`  

**描述**: 导出路由规则数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingRuleRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

### 查询用户下的路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/queue/query`  
**操作ID**: `queryByUser_81`  

**描述**: 根据用户ID查询路由规则列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingQueueRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/queue/query/uid`  
**操作ID**: `queryByUid_81`  

**描述**: 根据UID查询路由规则详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingQueueRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/queue/query/org`  
**操作ID**: `queryByOrg_81`  

**描述**: 根据组织ID查询路由规则列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingQueueRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出路由规则

**方法**: ` GET `  
**路径**: `/api/v1/routing/queue/export`  
**操作ID**: `export_81`  

**描述**: 导出路由规则数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoutingQueueRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Menu Management

Menu management APIs for organizing and categorizing content with menus

### Update Menu

**方法**: ` POST `  
**路径**: `/api/v1/menu/update`  
**操作ID**: `update_127`  

**描述**: Update an existing menu

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Menu

**方法**: ` POST `  
**路径**: `/api/v1/menu/delete`  
**操作ID**: `delete_127`  

**描述**: Delete a menu

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/menu/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/menu/delete/org`  
**操作ID**: `deleteByOrgUid_127`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Menu

**方法**: ` POST `  
**路径**: `/api/v1/menu/create`  
**操作ID**: `create_129`  

**描述**: Create a new menu

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Menus by User

**方法**: ` GET `  
**路径**: `/api/v1/menu/query`  
**操作ID**: `queryByUser_127`  

**描述**: Retrieve menus for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MenuRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Menu by UID

**方法**: ` GET `  
**路径**: `/api/v1/menu/query/uid`  
**操作ID**: `queryByUid_127`  

**描述**: Retrieve a specific menu by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MenuRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Menus by Organization

**方法**: ` GET `  
**路径**: `/api/v1/menu/query/org`  
**操作ID**: `queryByOrg_127`  

**描述**: Retrieve menus for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MenuRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Menus

**方法**: ` GET `  
**路径**: `/api/v1/menu/export`  
**操作ID**: `export_127`  

**描述**: Export menus to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MenuRequest | query | 是 |  |

#### 响应

**200**: OK

---

## AiStatistic Management

AiStatistic management APIs for organizing and categorizing content with statistics

### Update AiStatistic

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/update`  
**操作ID**: `update_194`  

**描述**: Update an existing statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete AiStatistic

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/delete`  
**操作ID**: `delete_195`  

**描述**: Delete a statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ai/statistic/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/delete/org`  
**操作ID**: `deleteByOrgUid_195`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create AiStatistic

**方法**: ` POST `  
**路径**: `/api/v1/ai/statistic/create`  
**操作ID**: `create_197`  

**描述**: Create a new statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query AiStatistics by User

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/query`  
**操作ID**: `queryByUser_195`  

**描述**: Retrieve statistics for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AiStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query AiStatistic by UID

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/query/uid`  
**操作ID**: `queryByUid_195`  

**描述**: Retrieve a specific statistic by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AiStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query AiStatistics by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/query/org`  
**操作ID**: `queryByOrg_195`  

**描述**: Retrieve statistics for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AiStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export AiStatistics

**方法**: ` GET `  
**路径**: `/api/v1/ai/statistic/export`  
**操作ID**: `export_195`  

**描述**: Export statistics to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AiStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Role Management

Role management APIs for managing user roles and permissions

### Update Role

**方法**: ` POST `  
**路径**: `/api/v1/role/update`  
**操作ID**: `update_82`  

**描述**: Update an existing role

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Role

**方法**: ` POST `  
**路径**: `/api/v1/role/delete`  
**操作ID**: `delete_82`  

**描述**: Delete a role

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/role/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/role/delete/org`  
**操作ID**: `deleteByOrgUid_82`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Role

**方法**: ` POST `  
**路径**: `/api/v1/role/create`  
**操作ID**: `create_84`  

**描述**: Create a new role

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Reset role authorities for a level

**方法**: ` POST `  
**路径**: `/api/v1/role/authorities/reset`  
**操作ID**: `resetAuthorities`  

**描述**: Reapply canonical permissions for the specified level on a role

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Remove role authorities

**方法**: ` POST `  
**路径**: `/api/v1/role/authorities/remove`  
**操作ID**: `removeAuthorities`  

**描述**: Remove authorities from a role without updating the whole role

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Add role authorities

**方法**: ` POST `  
**路径**: `/api/v1/role/authorities/add`  
**操作ID**: `addAuthorities`  

**描述**: Add authorities to a role without updating the whole role

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Roles by User

**方法**: ` GET `  
**路径**: `/api/v1/role/query`  
**操作ID**: `queryByUser_82`  

**描述**: Retrieve roles for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Role by UID

**方法**: ` GET `  
**路径**: `/api/v1/role/query/uid`  
**操作ID**: `queryByUid_82`  

**描述**: Retrieve a specific role by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Roles by Organization

**方法**: ` GET `  
**路径**: `/api/v1/role/query/org`  
**操作ID**: `queryByOrg_82`  

**描述**: Retrieve roles for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Roles

**方法**: ` GET `  
**路径**: `/api/v1/role/export`  
**操作ID**: `export_82`  

**描述**: Export roles to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RoleRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Consumer Management

Consumer management APIs for organizing and categorizing content with consumers

### Update Consumer

**方法**: ` POST `  
**路径**: `/demo/api/v1/consumer/update`  
**操作ID**: `update_2`  

**描述**: Update an existing consumer

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Consumer

**方法**: ` POST `  
**路径**: `/demo/api/v1/consumer/delete`  
**操作ID**: `delete_2`  

**描述**: Delete a consumer

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /demo/api/v1/consumer/delete/org

**方法**: ` POST `  
**路径**: `/demo/api/v1/consumer/delete/org`  
**操作ID**: `deleteByOrgUid_2`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Consumer

**方法**: ` POST `  
**路径**: `/demo/api/v1/consumer/create`  
**操作ID**: `create_4`  

**描述**: Create a new consumer

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Consumers by User

**方法**: ` GET `  
**路径**: `/demo/api/v1/consumer/query`  
**操作ID**: `queryByUser_2`  

**描述**: Retrieve consumers for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConsumerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Consumer by UID

**方法**: ` GET `  
**路径**: `/demo/api/v1/consumer/query/uid`  
**操作ID**: `queryByUid_2`  

**描述**: Retrieve a specific consumer by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConsumerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Consumers by Organization

**方法**: ` GET `  
**路径**: `/demo/api/v1/consumer/query/org`  
**操作ID**: `queryByOrg_2`  

**描述**: Retrieve consumers for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConsumerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Consumers

**方法**: ` GET `  
**路径**: `/demo/api/v1/consumer/export`  
**操作ID**: `export_2`  

**描述**: Export consumers to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ConsumerRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 未读消息管理

未读消息管理相关接口

### 更新未读消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unread/update`  
**操作ID**: `update_120`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除未读消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unread/delete`  
**操作ID**: `delete_119`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/message/unread/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/unread/delete/org`  
**操作ID**: `deleteByOrgUid_119`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建未读消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unread/create`  
**操作ID**: `create_121`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 清空当前用户所有未读消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unread/clear`  
**操作ID**: `clearMessageUnread_1`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询未读消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unread/query`  
**操作ID**: `queryByUser_119`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据用户ID查询未读消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unread/query/uid`  
**操作ID**: `queryByUid_119`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询未读消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unread/query/org`  
**操作ID**: `queryByOrg_119`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出未读消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unread/export`  
**操作ID**: `export_119`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 获取未读消息总数

**方法**: ` GET `  
**路径**: `/api/v1/message/unread/count`  
**操作ID**: `getMessageUnreadCount_1`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 文章匿名管理

文章匿名相关接口

### 搜索文章

**方法**: ` GET `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_7`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 搜索文章

**方法**: ` PUT `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_9`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 搜索文章

**方法**: ` POST `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_8`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 搜索文章

**方法**: ` DELETE `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_10`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 搜索文章

**方法**: ` OPTIONS `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_13`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 搜索文章

**方法**: ` HEAD `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_12`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 搜索文章

**方法**: ` PATCH `  
**路径**: `/visitor/api/v1/article/search`  
**操作ID**: `searchKb_11`  

**描述**: 访客搜索文章

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleRequest | query | 是 |  |

#### 响应

**200**: OK

---

## User Management

User management APIs

### POST /api/v1/user/update

**方法**: ` POST `  
**路径**: `/api/v1/user/update`  
**操作ID**: `update_37`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/switch/organization

**方法**: ` POST `  
**路径**: `/api/v1/user/switch/organization`  
**操作ID**: `switchOrganization`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/logout

**方法**: ` POST `  
**路径**: `/api/v1/user/logout`  
**操作ID**: `logout`  
#### 响应

**200**: OK

---

### POST /api/v1/user/delete

**方法**: ` POST `  
**路径**: `/api/v1/user/delete`  
**操作ID**: `delete_37`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/user/delete/org`  
**操作ID**: `deleteByOrgUid_37`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/create

**方法**: ` POST `  
**路径**: `/api/v1/user/create`  
**操作ID**: `create_39`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/change/password

**方法**: ` POST `  
**路径**: `/api/v1/user/change/password`  
**操作ID**: `changePassword`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/change/mobile

**方法**: ` POST `  
**路径**: `/api/v1/user/change/mobile`  
**操作ID**: `changeMobile`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/change/email

**方法**: ` POST `  
**路径**: `/api/v1/user/change/email`  
**操作ID**: `changeEmail`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/user/admin/change/password

**方法**: ` POST `  
**路径**: `/api/v1/user/admin/change/password`  
**操作ID**: `adminChangePassword`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/user/query

**方法**: ` GET `  
**路径**: `/api/v1/user/query`  
**操作ID**: `queryByUser_37`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UserRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/user/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/user/query/uid`  
**操作ID**: `queryByUid_37`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UserRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/user/query/org

**方法**: ` GET `  
**路径**: `/api/v1/user/query/org`  
**操作ID**: `queryByOrg_37`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UserRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/user/profile

**方法**: ` GET `  
**路径**: `/api/v1/user/profile`  
**操作ID**: `getProfile`  
#### 响应

**200**: OK

---

### GET /api/v1/user/organizations

**方法**: ` GET `  
**路径**: `/api/v1/user/organizations`  
**操作ID**: `getOrganizations`  
#### 响应

**200**: OK

---

### GET /api/v1/user/export

**方法**: ` GET `  
**路径**: `/api/v1/user/export`  
**操作ID**: `export_37`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | UserRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Blog Management

Blog management APIs for organizing and categorizing content with blogs

### Update Blog

**方法**: ` POST `  
**路径**: `/api/v1/blog/update`  
**操作ID**: `update_184`  

**描述**: Update an existing blog

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Blog

**方法**: ` POST `  
**路径**: `/api/v1/blog/delete`  
**操作ID**: `delete_184`  

**描述**: Delete a blog

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/blog/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/blog/delete/org`  
**操作ID**: `deleteByOrgUid_184`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Blog

**方法**: ` POST `  
**路径**: `/api/v1/blog/create`  
**操作ID**: `create_186`  

**描述**: Create a new blog

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Blogs by User

**方法**: ` GET `  
**路径**: `/api/v1/blog/query`  
**操作ID**: `queryByUser_184`  

**描述**: Retrieve blogs for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlogRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Blog by UID

**方法**: ` GET `  
**路径**: `/api/v1/blog/query/uid`  
**操作ID**: `queryByUid_184`  

**描述**: Retrieve a specific blog by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlogRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Blogs by Organization

**方法**: ` GET `  
**路径**: `/api/v1/blog/query/org`  
**操作ID**: `queryByOrg_184`  

**描述**: Retrieve blogs for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlogRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Blogs

**方法**: ` GET `  
**路径**: `/api/v1/blog/export`  
**操作ID**: `export_184`  

**描述**: Export blogs to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BlogRequest | query | 是 |  |

#### 响应

**200**: OK

---

## CallMrcp Management

CallMrcp management APIs for organizing and categorizing content with tags

### Update CallMrcp

**方法**: ` POST `  
**路径**: `/api/v1/call/mrcp/update`  
**操作ID**: `update_179`  

**描述**: Update an existing mrcp

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete CallMrcp

**方法**: ` POST `  
**路径**: `/api/v1/call/mrcp/delete`  
**操作ID**: `delete_179`  

**描述**: Delete a mrcp

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/call/mrcp/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/call/mrcp/delete/org`  
**操作ID**: `deleteByOrgUid_179`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create CallMrcp

**方法**: ` POST `  
**路径**: `/api/v1/call/mrcp/create`  
**操作ID**: `create_181`  

**描述**: Create a new mrcp

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query CallMrcps by User

**方法**: ` GET `  
**路径**: `/api/v1/call/mrcp/query`  
**操作ID**: `queryByUser_179`  

**描述**: Retrieve tags for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallMrcpRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query CallMrcp by UID

**方法**: ` GET `  
**路径**: `/api/v1/call/mrcp/query/uid`  
**操作ID**: `queryByUid_179`  

**描述**: Retrieve a specific mrcp by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallMrcpRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query CallMrcps by Organization

**方法**: ` GET `  
**路径**: `/api/v1/call/mrcp/query/org`  
**操作ID**: `queryByOrg_179`  

**描述**: Retrieve tags for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallMrcpRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export CallMrcps

**方法**: ` GET `  
**路径**: `/api/v1/call/mrcp/export`  
**操作ID**: `export_179`  

**描述**: Export tags to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | CallMrcpRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 知识库管理

知识库管理相关接口

### 更新知识库

**方法**: ` POST `  
**路径**: `/api/v1/kbase/update`  
**操作ID**: `update_139`  

**描述**: 更新知识库信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除知识库

**方法**: ` POST `  
**路径**: `/api/v1/kbase/delete`  
**操作ID**: `delete_141`  

**描述**: 删除指定的知识库

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/kbase/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/kbase/delete/org`  
**操作ID**: `deleteByOrgUid_141`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建知识库

**方法**: ` POST `  
**路径**: `/api/v1/kbase/create`  
**操作ID**: `create_143`  

**描述**: 创建新的知识库

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的知识库

**方法**: ` GET `  
**路径**: `/api/v1/kbase/query`  
**操作ID**: `queryByUser_140`  

**描述**: 根据用户ID查询知识库列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定知识库

**方法**: ` GET `  
**路径**: `/api/v1/kbase/query/uid`  
**操作ID**: `queryByUid_140`  

**描述**: 根据UID查询知识库详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的知识库

**方法**: ` GET `  
**路径**: `/api/v1/kbase/query/org`  
**操作ID**: `queryByOrg_140`  

**描述**: 根据组织ID查询知识库列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出知识库

**方法**: ` GET `  
**路径**: `/api/v1/kbase/export`  
**操作ID**: `export_141`  

**描述**: 导出知识库数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | KbaseRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Redis Stream Management

Redis stream management APIs for event streaming

### Test Redis Stream

**方法**: ` GET `  
**路径**: `/redis/stream/test`  
**操作ID**: `test`  

**描述**: Test Redis stream functionality with custom content and type

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| type | string | query | 否 |  |
| content | string | query | 否 |  |

#### 响应

**200**: OK

---

## Note Management

Note management APIs for organizing and categorizing content with notes

### Update Note

**方法**: ` POST `  
**路径**: `/api/v1/note/update`  
**操作ID**: `update_113`  

**描述**: Update an existing note

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Note

**方法**: ` POST `  
**路径**: `/api/v1/note/delete`  
**操作ID**: `delete_113`  

**描述**: Delete a note

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/note/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/note/delete/org`  
**操作ID**: `deleteByOrgUid_113`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Note

**方法**: ` POST `  
**路径**: `/api/v1/note/create`  
**操作ID**: `create_115`  

**描述**: Create a new note

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Notes by User

**方法**: ` GET `  
**路径**: `/api/v1/note/query`  
**操作ID**: `queryByUser_113`  

**描述**: Retrieve notes for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Note by UID

**方法**: ` GET `  
**路径**: `/api/v1/note/query/uid`  
**操作ID**: `queryByUid_113`  

**描述**: Retrieve a specific note by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Notes by Organization

**方法**: ` GET `  
**路径**: `/api/v1/note/query/org`  
**操作ID**: `queryByOrg_113`  

**描述**: Retrieve notes for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoteRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Notes

**方法**: ` GET `  
**路径**: `/api/v1/note/export`  
**操作ID**: `export_113`  

**描述**: Export notes to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoteRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 关键词回复管理

关键词回复管理相关接口

### 更新关键词回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/keyword/update`  
**操作ID**: `update_186`  

**描述**: 更新关键词回复信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 启用关键词回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/keyword/enable`  
**操作ID**: `enable_9`  

**描述**: 启用或禁用关键词回复

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 操作成功

---

### 删除关键词回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/keyword/delete`  
**操作ID**: `delete_186`  

**描述**: 删除指定的关键词回复

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/autoreply/keyword/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/keyword/delete/org`  
**操作ID**: `deleteByOrgUid_186`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建关键词回复

**方法**: ` POST `  
**路径**: `/api/v1/autoreply/keyword/create`  
**操作ID**: `create_188`  

**描述**: 创建新的关键词回复

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的关键词回复

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/keyword/query`  
**操作ID**: `queryByUser_186`  

**描述**: 根据用户ID查询关键词回复列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/autoreply/keyword/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/keyword/query/uid`  
**操作ID**: `queryByUid_186`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyKeywordRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询组织下的关键词回复

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/keyword/query/org`  
**操作ID**: `queryByOrg_186`  

**描述**: 根据组织ID查询关键词回复列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出关键词回复

**方法**: ` GET `  
**路径**: `/api/v1/autoreply/keyword/export`  
**操作ID**: `export_186`  

**描述**: 导出关键词回复数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AutoReplyKeywordRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Complaint Management

Complaint management APIs for organizing and categorizing content with complaints

### Update Complaint

**方法**: ` POST `  
**路径**: `/api/v1/complaint/update`  
**操作ID**: `update_174`  

**描述**: Update an existing complaint

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Complaint

**方法**: ` POST `  
**路径**: `/api/v1/complaint/delete`  
**操作ID**: `delete_174`  

**描述**: Delete a complaint

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/complaint/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/complaint/delete/org`  
**操作ID**: `deleteByOrgUid_174`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Complaint

**方法**: ` POST `  
**路径**: `/api/v1/complaint/create`  
**操作ID**: `create_176`  

**描述**: Create a new complaint

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Complaints by User

**方法**: ` GET `  
**路径**: `/api/v1/complaint/query`  
**操作ID**: `queryByUser_174`  

**描述**: Retrieve complaints for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ComplaintRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Complaint by UID

**方法**: ` GET `  
**路径**: `/api/v1/complaint/query/uid`  
**操作ID**: `queryByUid_174`  

**描述**: Retrieve a specific complaint by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ComplaintRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Complaints by Organization

**方法**: ` GET `  
**路径**: `/api/v1/complaint/query/org`  
**操作ID**: `queryByOrg_174`  

**描述**: Retrieve complaints for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ComplaintRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Complaints

**方法**: ` GET `  
**路径**: `/api/v1/complaint/export`  
**操作ID**: `export_174`  

**描述**: Export complaints to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ComplaintRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 意图设置管理

意图设置管理相关接口

### 更新意图设置

**方法**: ` POST `  
**路径**: `/api/v1/intention/settings/update`  
**操作ID**: `update_149`  

**描述**: 更新现有的意图设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除意图设置

**方法**: ` POST `  
**路径**: `/api/v1/intention/settings/delete`  
**操作ID**: `delete_148`  

**描述**: 删除指定的意图设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/intention/settings/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/intention/settings/delete/org`  
**操作ID**: `deleteByOrgUid_148`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建意图设置

**方法**: ` POST `  
**路径**: `/api/v1/intention/settings/create`  
**操作ID**: `create_150`  

**描述**: 创建新的意图设置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询意图设置

**方法**: ` GET `  
**路径**: `/api/v1/intention/settings/query`  
**操作ID**: `queryByUser_148`  

**描述**: 查询用户的意图设置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询意图设置

**方法**: ` GET `  
**路径**: `/api/v1/intention/settings/query/uid`  
**操作ID**: `queryByUid_148`  

**描述**: 通过UID查询具体的意图设置

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询意图设置

**方法**: ` GET `  
**路径**: `/api/v1/intention/settings/query/org`  
**操作ID**: `queryByOrg_148`  

**描述**: 查询组织的意图设置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出意图设置

**方法**: ` GET `  
**路径**: `/api/v1/intention/settings/export`  
**操作ID**: `export_148`  

**描述**: 导出意图设置数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | IntentionSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Sms Management

Sms management APIs for organizing and categorizing content with smss

### Update Sms

**方法**: ` POST `  
**路径**: `/api/v1/sms/update`  
**操作ID**: `update_71`  

**描述**: Update an existing sms

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Sms

**方法**: ` POST `  
**路径**: `/api/v1/sms/delete`  
**操作ID**: `delete_71`  

**描述**: Delete a sms

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/sms/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/sms/delete/org`  
**操作ID**: `deleteByOrgUid_71`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Sms

**方法**: ` POST `  
**路径**: `/api/v1/sms/create`  
**操作ID**: `create_73`  

**描述**: Create a new sms

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Smss by User

**方法**: ` GET `  
**路径**: `/api/v1/sms/query`  
**操作ID**: `queryByUser_71`  

**描述**: Retrieve smss for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Sms by UID

**方法**: ` GET `  
**路径**: `/api/v1/sms/query/uid`  
**操作ID**: `queryByUid_71`  

**描述**: Retrieve a specific sms by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Smss by Organization

**方法**: ` GET `  
**路径**: `/api/v1/sms/query/org`  
**操作ID**: `queryByOrg_71`  

**描述**: Retrieve smss for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Smss

**方法**: ` GET `  
**路径**: `/api/v1/sms/export`  
**操作ID**: `export_71`  

**描述**: Export smss to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsRequest | query | 是 |  |

#### 响应

**200**: OK

---

## TaskComment Management

TaskComment management APIs for organizing and categorizing content with taskComments

### Update TaskComment

**方法**: ` POST `  
**路径**: `/api/v1/task/comment/update`  
**操作ID**: `update_64`  

**描述**: Update an existing task_comment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete TaskComment

**方法**: ` POST `  
**路径**: `/api/v1/task/comment/delete`  
**操作ID**: `delete_64`  

**描述**: Delete a task_comment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/task/comment/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/task/comment/delete/org`  
**操作ID**: `deleteByOrgUid_64`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create TaskComment

**方法**: ` POST `  
**路径**: `/api/v1/task/comment/create`  
**操作ID**: `create_66`  

**描述**: Create a new task_comment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query TaskComments by User

**方法**: ` GET `  
**路径**: `/api/v1/task/comment/query`  
**操作ID**: `queryByUser_64`  

**描述**: Retrieve taskComments for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TaskComment by UID

**方法**: ` GET `  
**路径**: `/api/v1/task/comment/query/uid`  
**操作ID**: `queryByUid_64`  

**描述**: Retrieve a specific task_comment by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TaskComments by Task

**方法**: ` GET `  
**路径**: `/api/v1/task/comment/query/task`  
**操作ID**: `queryByTask`  

**描述**: Retrieve comments for a given task

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TaskComments by Organization

**方法**: ` GET `  
**路径**: `/api/v1/task/comment/query/org`  
**操作ID**: `queryByOrg_64`  

**描述**: Retrieve taskComments for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export TaskComments

**方法**: ` GET `  
**路径**: `/api/v1/task/comment/export`  
**操作ID**: `export_64`  

**描述**: Export taskComments to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TaskCommentRequest | query | 是 |  |

#### 响应

**200**: OK

---

## QualityCheck Management

QualityCheck management APIs for organizing and categorizing content with checks

### Update QualityCheck

**方法**: ` POST `  
**路径**: `/api/v1/quality/check/update`  
**操作ID**: `update_98`  

**描述**: Update an existing check

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete QualityCheck

**方法**: ` POST `  
**路径**: `/api/v1/quality/check/delete`  
**操作ID**: `delete_98`  

**描述**: Delete a check

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/quality/check/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/quality/check/delete/org`  
**操作ID**: `deleteByOrgUid_98`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create QualityCheck

**方法**: ` POST `  
**路径**: `/api/v1/quality/check/create`  
**操作ID**: `create_100`  

**描述**: Create a new check

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query QualityChecks by User

**方法**: ` GET `  
**路径**: `/api/v1/quality/check/query`  
**操作ID**: `queryByUser_98`  

**描述**: Retrieve checks for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityCheckRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityCheck by UID

**方法**: ` GET `  
**路径**: `/api/v1/quality/check/query/uid`  
**操作ID**: `queryByUid_98`  

**描述**: Retrieve a specific check by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityCheckRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityChecks by Organization

**方法**: ` GET `  
**路径**: `/api/v1/quality/check/query/org`  
**操作ID**: `queryByOrg_98`  

**描述**: Retrieve checks for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityCheckRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export QualityChecks

**方法**: ` GET `  
**路径**: `/api/v1/quality/check/export`  
**操作ID**: `export_98`  

**描述**: Export checks to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityCheckRequest | query | 是 |  |

#### 响应

**200**: OK

---

## QualityFlow Management

QualityFlow management APIs for organizing and categorizing content with tags

### Update QualityFlow

**方法**: ` POST `  
**路径**: `/api/v1/quality/flow/update`  
**操作ID**: `update_97`  

**描述**: Update an existing tag

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete QualityFlow

**方法**: ` POST `  
**路径**: `/api/v1/quality/flow/delete`  
**操作ID**: `delete_97`  

**描述**: Delete a tag

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/quality/flow/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/quality/flow/delete/org`  
**操作ID**: `deleteByOrgUid_97`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create QualityFlow

**方法**: ` POST `  
**路径**: `/api/v1/quality/flow/create`  
**操作ID**: `create_99`  

**描述**: Create a new tag

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query QualityFlows by User

**方法**: ` GET `  
**路径**: `/api/v1/quality/flow/query`  
**操作ID**: `queryByUser_97`  

**描述**: Retrieve tags for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityFlowRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityFlow by UID

**方法**: ` GET `  
**路径**: `/api/v1/quality/flow/query/uid`  
**操作ID**: `queryByUid_97`  

**描述**: Retrieve a specific tag by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityFlowRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityFlows by Organization

**方法**: ` GET `  
**路径**: `/api/v1/quality/flow/query/org`  
**操作ID**: `queryByOrg_97`  

**描述**: Retrieve tags for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityFlowRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export QualityFlows

**方法**: ` GET `  
**路径**: `/api/v1/quality/flow/export`  
**操作ID**: `export_97`  

**描述**: Export tags to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityFlowRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Settings Management

Settings management APIs for organizing and categorizing content with settings

### Update Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/update`  
**操作ID**: `update_74`  

**描述**: Update an existing settings

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Platform Ticket Center Settings

**方法**: ` GET `  
**路径**: `/api/v1/settings/platform/ticket-center`  
**操作ID**: `queryPlatformTicketCenterSettings`  

**描述**: Retrieve platform-level ticket center configuration

#### 响应

**200**: OK

---

### Save Platform Ticket Center Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/platform/ticket-center`  
**操作ID**: `savePlatformTicketCenterSettings`  

**描述**: Create or update platform-level ticket center configuration

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Platform SMS Settings

**方法**: ` GET `  
**路径**: `/api/v1/settings/platform/sms`  
**操作ID**: `queryPlatformSmsSettings`  

**描述**: Retrieve platform-level SMS configuration

#### 响应

**200**: OK

---

### Save Platform SMS Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/platform/sms`  
**操作ID**: `savePlatformSmsSettings`  

**描述**: Create or update platform-level SMS configuration

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Test Platform SMS Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/platform/sms/test`  
**操作ID**: `testPlatformSmsSettings`  

**描述**: Send a test SMS to verify platform SMS configuration

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| testMobile | string | query | 是 |  |

#### 响应

**200**: OK

---

### Query Platform Email Settings

**方法**: ` GET `  
**路径**: `/api/v1/settings/platform/email`  
**操作ID**: `queryPlatformEmailSettings`  

**描述**: Retrieve platform-level email configuration

#### 响应

**200**: OK

---

### Save Platform Email Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/platform/email`  
**操作ID**: `savePlatformEmailSettings`  

**描述**: Create or update platform-level email configuration

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Test Platform Email Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/platform/email/test`  
**操作ID**: `testPlatformEmailSettings`  

**描述**: Send a test email to verify platform email configuration

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| testEmail | string | query | 是 |  |

#### 响应

**200**: OK

---

### Delete Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/delete`  
**操作ID**: `delete_74`  

**描述**: Delete a settings

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/settings/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/settings/delete/org`  
**操作ID**: `deleteByOrgUid_74`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Settings

**方法**: ` POST `  
**路径**: `/api/v1/settings/create`  
**操作ID**: `create_76`  

**描述**: Create a new settings

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Settings by User

**方法**: ` GET `  
**路径**: `/api/v1/settings/query`  
**操作ID**: `queryByUser_74`  

**描述**: Retrieve settings for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Settings by UID

**方法**: ` GET `  
**路径**: `/api/v1/settings/query/uid`  
**操作ID**: `queryByUid_74`  

**描述**: Retrieve a specific settings by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Settings by Organization

**方法**: ` GET `  
**路径**: `/api/v1/settings/query/org`  
**操作ID**: `queryByOrg_74`  

**描述**: Retrieve settings for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Settings

**方法**: ` GET `  
**路径**: `/api/v1/settings/export`  
**操作ID**: `export_74`  

**描述**: Export settings to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 表单管理

表单管理相关接口

### 更新表单

**方法**: ` POST `  
**路径**: `/api/v1/form/update`  
**操作ID**: `update_156`  

**描述**: 更新表单信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除表单

**方法**: ` POST `  
**路径**: `/api/v1/form/delete`  
**操作ID**: `delete_157`  

**描述**: 删除指定的表单

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/form/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/form/delete/org`  
**操作ID**: `deleteByOrgUid_157`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建表单

**方法**: ` POST `  
**路径**: `/api/v1/form/create`  
**操作ID**: `create_159`  

**描述**: 创建新的表单

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的表单

**方法**: ` GET `  
**路径**: `/api/v1/form/query`  
**操作ID**: `queryByUser_157`  

**描述**: 根据用户ID查询表单列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定表单

**方法**: ` GET `  
**路径**: `/api/v1/form/query/uid`  
**操作ID**: `queryByUid_157`  

**描述**: 根据UID查询表单详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的表单

**方法**: ` GET `  
**路径**: `/api/v1/form/query/org`  
**操作ID**: `queryByOrg_157`  

**描述**: 根据组织ID查询表单列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出表单

**方法**: ` GET `  
**路径**: `/api/v1/form/export`  
**操作ID**: `export_157`  

**描述**: 导出表单数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FormRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## TicketSettings Management

TicketSettings management APIs for organizing and categorizing content with ticketSettings

### Bind workgroups to TicketSettings

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/{uid}/orgs/{orgUid}/bindings`  
**操作ID**: `bindWorkgroups`  

**描述**: Bind multiple workgroups to one ticket settings instance

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| uid | string | path | 是 |  |
| orgUid | string | path | 是 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Update TicketSettings

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/update`  
**操作ID**: `update_52`  

**描述**: Update an existing ticketSettings

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Publish TicketSettings

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/publish`  
**操作ID**: `publish`  

**描述**: Publish draft settings to active for given TicketSettings uid

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Get TicketSettings by workgroup

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/orgs/{orgUid}/workgroups/{workgroupUid}`  
**操作ID**: `getByWorkgroup`  

**描述**: Get settings by orgUid and workgroupUid; returns defaults if missing

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | path | 是 |  |
| workgroupUid | string | path | 是 |  |
| type | string | query | 否 |  |

#### 响应

**200**: OK

---

### Save TicketSettings by workgroup

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/orgs/{orgUid}/workgroups/{workgroupUid}`  
**操作ID**: `saveByWorkgroup`  

**描述**: Upsert ticket settings draft by orgUid+workgroupUid

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | path | 是 |  |
| workgroupUid | string | path | 是 |  |

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Publish TicketSettings by workgroup

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/orgs/{orgUid}/workgroups/{workgroupUid}/publish`  
**操作ID**: `publishByWorkgroup`  

**描述**: Publish draft settings for given orgUid+workgroupUid

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | path | 是 |  |
| workgroupUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### Delete TicketSettings

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/delete`  
**操作ID**: `delete_51`  

**描述**: Delete a ticketSettings

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/ticket/settings/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/delete/org`  
**操作ID**: `deleteByOrgUid_51`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create TicketSettings

**方法**: ` POST `  
**路径**: `/api/v1/ticket/settings/create`  
**操作ID**: `create_53`  

**描述**: Create a new ticketSettings

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query ticketSettings by User

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/query`  
**操作ID**: `queryByUser_51`  

**描述**: Retrieve ticketSettings for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TicketSettings by UID

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/query/uid`  
**操作ID**: `queryByUid_51`  

**描述**: Retrieve a specific ticketSettings by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query TicketSettings by Organization

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/query/org`  
**操作ID**: `queryByOrg_51`  

**描述**: Retrieve ticket settings for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Get ticket categories by workgroup

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/orgs/{orgUid}/workgroups/{workgroupUid}/categories`  
**操作ID**: `getCategoriesByWorkgroup_1`  

**描述**: Get enabled ticket categories for given orgUid+workgroupUid

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| orgUid | string | path | 是 |  |
| workgroupUid | string | path | 是 |  |
| type | string | query | 否 |  |

#### 响应

**200**: OK

---

### Export ticketSettings

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/export`  
**操作ID**: `export_51`  

**描述**: Export ticketSettings to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### List bound workgroups

**方法**: ` GET `  
**路径**: `/api/v1/ticket/settings/bindings`  
**操作ID**: `listBindings`  

**描述**: List workgroups bound to the given ticket settings

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TicketSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

## File Preview and Download

File preview and download APIs for displaying and downloading uploaded files

### Preview File

**方法**: ` GET `  
**路径**: `/file/{yyyy}/{MM}/{dd}/{filename}`  
**操作ID**: `preview`  

**描述**: Preview file in browser or display in img tag

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| yyyy | string | path | 是 |  |
| MM | string | path | 是 |  |
| dd | string | path | 是 |  |
| filename | string | path | 是 |  |

#### 响应

**200**: OK

---

### Download File

**方法**: ` GET `  
**路径**: `/file/download/{yyyy}/{MM}/{dd}/{filename}`  
**操作ID**: `download`  

**描述**: Download file from server (deprecated)

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| yyyy | string | path | 是 |  |
| MM | string | path | 是 |  |
| dd | string | path | 是 |  |
| filename | string | path | 是 |  |

#### 响应

**200**: OK

---

## 工作组配置管理

工作组配置相关接口

### 更新工作组配置

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/settings/update`  
**操作ID**: `update_6`  

**描述**: 更新工作组配置信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除工作组配置

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/settings/delete`  
**操作ID**: `delete_5`  

**描述**: 删除指定的工作组配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/workgroup/settings/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/settings/delete/org`  
**操作ID**: `deleteByOrgUid_5`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建工作组配置

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/settings/create`  
**操作ID**: `create_7`  

**描述**: 创建新的工作组配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### GET /api/v1/workgroup/settings/query

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/settings/query`  
**操作ID**: `queryByUser_5`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询工作组配置

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/settings/query/uid`  
**操作ID**: `queryByUid_5`  

**描述**: 根据UID查询工作组配置详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的工作组配置

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/settings/query/org`  
**操作ID**: `queryByOrg_5`  

**描述**: 根据组织ID查询工作组配置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/workgroup/settings/export

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/settings/export`  
**操作ID**: `export_5`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | WorkgroupSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 发布工作组配置

**方法**: ` GET `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_1`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布工作组配置

**方法**: ` PUT `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_3`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布工作组配置

**方法**: ` POST `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_2`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布工作组配置

**方法**: ` DELETE `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_4`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布工作组配置

**方法**: ` OPTIONS `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_7`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布工作组配置

**方法**: ` HEAD `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_6`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布工作组配置

**方法**: ` PATCH `  
**路径**: `/api/v1/workgroup/settings/publish`  
**操作ID**: `publish_5`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

## 机器人管理

机器人管理相关接口

### 更新机器人

**方法**: ` POST `  
**路径**: `/api/v1/robot/update`  
**操作ID**: `update_83`  

**描述**: 更新机器人信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新提示词机器人

**方法**: ` POST `  
**路径**: `/api/v1/robot/update/prompt`  
**操作ID**: `updatePromptRobot`  

**描述**: 更新提示词机器人信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新机器人提示词

**方法**: ` POST `  
**路径**: `/api/v1/robot/update/prompt/text`  
**操作ID**: `updatePromptText`  

**描述**: 仅根据UID更新机器人提示词内容

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新智能体会话

**方法**: ` POST `  
**路径**: `/api/v1/robot/update/llm/thread`  
**操作ID**: `updateLlmThread`  

**描述**: 更新智能体会话信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新机器人知识库

**方法**: ` POST `  
**路径**: `/api/v1/robot/update/kbUid`  
**操作ID**: `updateKbUid`  

**描述**: 更新机器人的知识库UID

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新机器人头像

**方法**: ` POST `  
**路径**: `/api/v1/robot/update/avatar`  
**操作ID**: `updateAvatar_2`  

**描述**: 更新机器人的头像

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除机器人

**方法**: ` POST `  
**路径**: `/api/v1/robot/delete`  
**操作ID**: `delete_85`  

**描述**: 删除指定的机器人

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/robot/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/robot/delete/org`  
**操作ID**: `deleteByOrgUid_85`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建机器人

**方法**: ` POST `  
**路径**: `/api/v1/robot/create`  
**操作ID**: `create_87`  

**描述**: 创建新的机器人

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 创建智能体模板

**方法**: ` POST `  
**路径**: `/api/v1/robot/create/prompt`  
**操作ID**: `createPromptRobot`  

**描述**: 创建提示词机器人模板

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 创建智能体会话

**方法**: ` POST `  
**路径**: `/api/v1/robot/create/llm/thread`  
**操作ID**: `createLlmThread`  

**描述**: 员工/客服创建智能体会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的机器人

**方法**: ` GET `  
**路径**: `/api/v1/robot/query`  
**操作ID**: `queryByUser_84`  

**描述**: 根据用户ID查询机器人列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定机器人

**方法**: ` GET `  
**路径**: `/api/v1/robot/query/uid`  
**操作ID**: `queryByUid_84`  

**描述**: 根据UID查询机器人详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的机器人

**方法**: ` GET `  
**路径**: `/api/v1/robot/query/org`  
**操作ID**: `queryByOrg_84`  

**描述**: 根据组织ID查询机器人列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出机器人

**方法**: ` GET `  
**路径**: `/api/v1/robot/export`  
**操作ID**: `export_85`  

**描述**: 导出机器人数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Notice Management

Notice management APIs for system announcements and notifications

### Update Notice

**方法**: ` POST `  
**路径**: `/api/v1/notice/update`  
**操作ID**: `update_112`  

**描述**: Update an existing notice

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Notice

**方法**: ` POST `  
**路径**: `/api/v1/notice/delete`  
**操作ID**: `delete_112`  

**描述**: Delete a notice

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/notice/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/notice/delete/org`  
**操作ID**: `deleteByOrgUid_112`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Notice

**方法**: ` POST `  
**路径**: `/api/v1/notice/create`  
**操作ID**: `create_114`  

**描述**: Create a new notice

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Notices by User

**方法**: ` GET `  
**路径**: `/api/v1/notice/query`  
**操作ID**: `queryByUser_112`  

**描述**: Retrieve notices for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/notice/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/notice/query/uid`  
**操作ID**: `queryByUid_112`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Notices by Organization

**方法**: ` GET `  
**路径**: `/api/v1/notice/query/org`  
**操作ID**: `queryByOrg_112`  

**描述**: Retrieve notices for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/notice/export

**方法**: ` GET `  
**路径**: `/api/v1/notice/export`  
**操作ID**: `export_112`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | NoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Server Metrics Management

Server metrics management APIs for monitoring and analyzing server performance data

### Update Server Metrics

**方法**: ` POST `  
**路径**: `/api/v1/server-metrics/update`  
**操作ID**: `update_77`  

**描述**: Update an existing server metrics record

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Server Metrics

**方法**: ` POST `  
**路径**: `/api/v1/server-metrics/delete`  
**操作ID**: `delete_77`  

**描述**: Delete a server metrics record

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/server-metrics/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/server-metrics/delete/org`  
**操作ID**: `deleteByOrgUid_77`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Server Metrics

**方法**: ` POST `  
**路径**: `/api/v1/server-metrics/create`  
**操作ID**: `create_79`  

**描述**: Create a new server metrics record

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Server Metrics by User

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/query`  
**操作ID**: `queryByUser_77`  

**描述**: Retrieve server metrics for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerMetricsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Server Metrics by UID

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/query/uid`  
**操作ID**: `queryByUid_77`  

**描述**: Retrieve a specific server metrics by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerMetricsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Server Metrics by Organization

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/query/org`  
**操作ID**: `queryByOrg_77`  

**描述**: Retrieve server metrics for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerMetricsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/peak/{serverUid}

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/peak/{serverUid}`  
**操作ID**: `getPeakMetrics`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| serverUid | string | path | 是 |  |
| startTime | string | query | 是 |  |
| endTime | string | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/latest/{serverUid}

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/latest/{serverUid}`  
**操作ID**: `getLatestMetrics`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| serverUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/history/{serverUid}

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/history/{serverUid}`  
**操作ID**: `getMetricsHistory`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| serverUid | string | path | 是 |  |
| startTime | string | query | 是 |  |
| endTime | string | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/high-usage

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/high-usage`  
**操作ID**: `findHighUsageMetrics`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| cpuThreshold | number | query | 否 |  |
| memoryThreshold | number | query | 否 |  |
| diskThreshold | number | query | 否 |  |
| startTime | string | query | 是 |  |
| endTime | string | query | 是 |  |

#### 响应

**200**: OK

---

### Export Server Metrics

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/export`  
**操作ID**: `export_77`  

**描述**: Export server metrics to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerMetricsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/current/history

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/current/history`  
**操作ID**: `getCurrentServerMetricsHistory`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| startTime | string | query | 是 |  |
| endTime | string | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/count/{serverUid}

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/count/{serverUid}`  
**操作ID**: `getMetricsCount`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| serverUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/server-metrics/average/{serverUid}

**方法**: ` GET `  
**路径**: `/api/v1/server-metrics/average/{serverUid}`  
**操作ID**: `getAverageMetrics`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| serverUid | string | path | 是 |  |
| startTime | string | query | 是 |  |
| endTime | string | query | 是 |  |

#### 响应

**200**: OK

---

### DELETE /api/v1/server-metrics/cleanup

**方法**: ` DELETE `  
**路径**: `/api/v1/server-metrics/cleanup`  
**操作ID**: `cleanupOldMetrics`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| retentionDays | integer | query | 否 |  |

#### 响应

**200**: OK

---

## 转接关键词管理

转接关键词管理相关接口

### 更新转接关键词

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/update`  
**操作ID**: `update_43`  

**描述**: 更新转接关键词信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除转接关键词

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/delete`  
**操作ID**: `delete_43`  

**描述**: 删除指定的转接关键词

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/transfer/keyword/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/delete/org`  
**操作ID**: `deleteByOrgUid_43`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建转接关键词

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/create`  
**操作ID**: `create_45`  

**描述**: 创建新的转接关键词

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/query`  
**操作ID**: `queryByUser_43`  

**描述**: 根据用户ID查询转接关键词列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/query/uid`  
**操作ID**: `queryByUid_43`  

**描述**: 根据UID查询转接关键词详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/query/org`  
**操作ID**: `queryByOrg_43`  

**描述**: 根据组织ID查询转接关键词列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/export`  
**操作ID**: `export_43`  

**描述**: 导出转接关键词数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 访客管理

访客管理相关接口

### 更新访客

**方法**: ` POST `  
**路径**: `/api/v1/visitor/update`  
**操作ID**: `update_29`  

**描述**: 更新访客信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新访客标签

**方法**: ` POST `  
**路径**: `/api/v1/visitor/update/tagList`  
**操作ID**: `updateTagList`  

**描述**: 更新访客的标签列表

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除访客

**方法**: ` POST `  
**路径**: `/api/v1/visitor/delete`  
**操作ID**: `delete_32`  

**描述**: 删除指定的访客

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/visitor/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/visitor/delete/org`  
**操作ID**: `deleteByOrgUid_32`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建访客

**方法**: ` POST `  
**路径**: `/api/v1/visitor/create`  
**操作ID**: `create_34`  

**描述**: 创建新的访客

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的访客

**方法**: ` GET `  
**路径**: `/api/v1/visitor/query`  
**操作ID**: `queryByUser_31`  

**描述**: 根据用户ID查询访客列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| visitorRequest | VisitorRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定访客

**方法**: ` GET `  
**路径**: `/api/v1/visitor/query/uid`  
**操作ID**: `queryByUid_31`  

**描述**: 根据UID查询访客详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的访客

**方法**: ` GET `  
**路径**: `/api/v1/visitor/query/org`  
**操作ID**: `queryByOrg_31`  

**描述**: 根据组织ID查询访客列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出访客

**方法**: ` GET `  
**路径**: `/api/v1/visitor/export`  
**操作ID**: `export_32`  

**描述**: 导出访客数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | VisitorRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 机器人配置管理

机器人配置相关接口

### 更新机器人配置

**方法**: ` POST `  
**路径**: `/api/v1/robot/settings/update`  
**操作ID**: `update_84`  

**描述**: 更新机器人配置信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除机器人配置

**方法**: ` POST `  
**路径**: `/api/v1/robot/settings/delete`  
**操作ID**: `delete_83`  

**描述**: 删除指定的机器人配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/robot/settings/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/robot/settings/delete/org`  
**操作ID**: `deleteByOrgUid_83`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建机器人配置

**方法**: ` POST `  
**路径**: `/api/v1/robot/settings/create`  
**操作ID**: `create_85`  

**描述**: 创建新的机器人配置

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### GET /api/v1/robot/settings/query

**方法**: ` GET `  
**路径**: `/api/v1/robot/settings/query`  
**操作ID**: `queryByUser_83`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询机器人配置

**方法**: ` GET `  
**路径**: `/api/v1/robot/settings/query/uid`  
**操作ID**: `queryByUid_83`  

**描述**: 根据UID查询机器人配置详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的机器人配置

**方法**: ` GET `  
**路径**: `/api/v1/robot/settings/query/org`  
**操作ID**: `queryByOrg_83`  

**描述**: 根据组织ID查询机器人配置列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotSettingsRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### GET /api/v1/robot/settings/export

**方法**: ` GET `  
**路径**: `/api/v1/robot/settings/export`  
**操作ID**: `export_83`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RobotSettingsRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 发布机器人配置

**方法**: ` GET `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_8`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布机器人配置

**方法**: ` PUT `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_10`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布机器人配置

**方法**: ` POST `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_9`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布机器人配置

**方法**: ` DELETE `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_11`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布机器人配置

**方法**: ` OPTIONS `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_14`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布机器人配置

**方法**: ` HEAD `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_13`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

### 发布机器人配置

**方法**: ` PATCH `  
**路径**: `/api/v1/robot/settings/publish`  
**操作ID**: `publish_12`  

**描述**: 将草稿版本发布为线上版本

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 发布成功

---

## 转接关键词

转接关键词相关接口

### 更新转接关键词

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/update`  
**操作ID**: `update_43`  

**描述**: 更新转接关键词信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除转接关键词

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/delete`  
**操作ID**: `delete_43`  

**描述**: 删除指定的转接关键词

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/transfer/keyword/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/delete/org`  
**操作ID**: `deleteByOrgUid_43`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建转接关键词

**方法**: ` POST `  
**路径**: `/api/v1/transfer/keyword/create`  
**操作ID**: `create_45`  

**描述**: 创建新的转接关键词

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/query`  
**操作ID**: `queryByUser_43`  

**描述**: 根据用户ID查询转接关键词列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/query/uid`  
**操作ID**: `queryByUid_43`  

**描述**: 根据UID查询转接关键词详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/query/org`  
**操作ID**: `queryByOrg_43`  

**描述**: 根据组织ID查询转接关键词列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出转接关键词

**方法**: ` GET `  
**路径**: `/api/v1/transfer/keyword/export`  
**操作ID**: `export_43`  

**描述**: 导出转接关键词数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TransferKeywordRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 文章归档管理

文章归档管理相关接口

### 更新文章归档

**方法**: ` POST `  
**路径**: `/api/v1/article_archive/update`  
**操作ID**: `update_191`  

**描述**: 更新现有的文章归档

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除文章归档

**方法**: ` POST `  
**路径**: `/api/v1/article_archive/delete`  
**操作ID**: `delete_191`  

**描述**: 删除指定的文章归档

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/article_archive/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/article_archive/delete/org`  
**操作ID**: `deleteByOrgUid_191`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建文章归档

**方法**: ` POST `  
**路径**: `/api/v1/article_archive/create`  
**操作ID**: `create_193`  

**描述**: 创建新的文章归档

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询文章归档

**方法**: ` GET `  
**路径**: `/api/v1/article_archive/query`  
**操作ID**: `queryByUser_191`  

**描述**: 查询用户的文章归档列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleArchiveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询文章归档

**方法**: ` GET `  
**路径**: `/api/v1/article_archive/query/uid`  
**操作ID**: `queryByUid_191`  

**描述**: 通过UID查询具体的文章归档

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleArchiveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询文章归档

**方法**: ` GET `  
**路径**: `/api/v1/article_archive/query/org`  
**操作ID**: `queryByOrg_191`  

**描述**: 查询组织的文章归档列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleArchiveRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出文章归档

**方法**: ` GET `  
**路径**: `/api/v1/article_archive/export`  
**操作ID**: `export_191`  

**描述**: 导出文章归档数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ArticleArchiveRequest | query | 是 |  |

#### 响应

**200**: OK

---

## department - 部门

department apis

### POST /api/v1/department/update

**方法**: ` POST `  
**路径**: `/api/v1/department/update`  
**操作ID**: `update_170`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/department/delete

**方法**: ` POST `  
**路径**: `/api/v1/department/delete`  
**操作ID**: `delete_170`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/department/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/department/delete/org`  
**操作ID**: `deleteByOrgUid_170`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/department/create

**方法**: ` POST `  
**路径**: `/api/v1/department/create`  
**操作ID**: `create_172`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/department/query

**方法**: ` GET `  
**路径**: `/api/v1/department/query`  
**操作ID**: `queryByUser_170`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DepartmentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/department/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/department/query/uid`  
**操作ID**: `queryByUid_170`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DepartmentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/department/query/org

**方法**: ` GET `  
**路径**: `/api/v1/department/query/org`  
**操作ID**: `queryByOrg_170`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DepartmentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/department/export

**方法**: ` GET `  
**路径**: `/api/v1/department/export`  
**操作ID**: `export_170`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DepartmentRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Moment Management

Moment management APIs for organizing and categorizing content with moments

### Update Moment

**方法**: ` POST `  
**路径**: `/api/v1/moment/update`  
**操作ID**: `update_114`  

**描述**: Update an existing moment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Moment

**方法**: ` POST `  
**路径**: `/api/v1/moment/delete`  
**操作ID**: `delete_114`  

**描述**: Delete a moment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/moment/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/moment/delete/org`  
**操作ID**: `deleteByOrgUid_114`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Moment

**方法**: ` POST `  
**路径**: `/api/v1/moment/create`  
**操作ID**: `create_116`  

**描述**: Create a new moment

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Moments by User

**方法**: ` GET `  
**路径**: `/api/v1/moment/query`  
**操作ID**: `queryByUser_114`  

**描述**: Retrieve moments for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MomentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Moment by UID

**方法**: ` GET `  
**路径**: `/api/v1/moment/query/uid`  
**操作ID**: `queryByUid_114`  

**描述**: Retrieve a specific moment by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MomentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Moments by Organization

**方法**: ` GET `  
**路径**: `/api/v1/moment/query/org`  
**操作ID**: `queryByOrg_114`  

**描述**: Retrieve moments for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MomentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Moments

**方法**: ` GET `  
**路径**: `/api/v1/moment/export`  
**操作ID**: `export_114`  

**描述**: Export moments to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MomentRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Document Management

Document management APIs for organizing and categorizing content with documents

### Update Document

**方法**: ` POST `  
**路径**: `/api/v1/document/update`  
**操作ID**: `update_169`  

**描述**: Update an existing document

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Document

**方法**: ` POST `  
**路径**: `/api/v1/document/delete`  
**操作ID**: `delete_169`  

**描述**: Delete a document

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/document/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/document/delete/org`  
**操作ID**: `deleteByOrgUid_169`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Document

**方法**: ` POST `  
**路径**: `/api/v1/document/create`  
**操作ID**: `create_171`  

**描述**: Create a new document

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Documents by User

**方法**: ` GET `  
**路径**: `/api/v1/document/query`  
**操作ID**: `queryByUser_169`  

**描述**: Retrieve documents for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DocumentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Document by UID

**方法**: ` GET `  
**路径**: `/api/v1/document/query/uid`  
**操作ID**: `queryByUid_169`  

**描述**: Retrieve a specific document by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DocumentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Documents by Organization

**方法**: ` GET `  
**路径**: `/api/v1/document/query/org`  
**操作ID**: `queryByOrg_169`  

**描述**: Retrieve documents for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DocumentRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Documents

**方法**: ` GET `  
**路径**: `/api/v1/document/export`  
**操作ID**: `export_169`  

**描述**: Export documents to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | DocumentRequest | query | 是 |  |

#### 响应

**200**: OK

---

## LLM提供商管理

LLM提供商管理相关接口

### 更新LLM提供商

**方法**: ` POST `  
**路径**: `/api/v1/provider/update`  
**操作ID**: `update_101`  

**描述**: 更新LLM提供商信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除LLM提供商

**方法**: ` POST `  
**路径**: `/api/v1/provider/delete`  
**操作ID**: `delete_101`  

**描述**: 删除指定的LLM提供商

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/provider/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/provider/delete/org`  
**操作ID**: `deleteByOrgUid_101`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建LLM提供商

**方法**: ` POST `  
**路径**: `/api/v1/provider/create`  
**操作ID**: `create_103`  

**描述**: 创建新的LLM提供商

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的LLM提供商

**方法**: ` GET `  
**路径**: `/api/v1/provider/query`  
**操作ID**: `queryByUser_101`  

**描述**: 根据用户ID查询LLM提供商列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmProviderRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定LLM提供商

**方法**: ` GET `  
**路径**: `/api/v1/provider/query/uid`  
**操作ID**: `queryByUid_101`  

**描述**: 根据UID查询LLM提供商详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmProviderRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的LLM提供商

**方法**: ` GET `  
**路径**: `/api/v1/provider/query/org`  
**操作ID**: `queryByOrg_101`  

**描述**: 根据组织ID查询LLM提供商列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmProviderRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出LLM提供商

**方法**: ` GET `  
**路径**: `/api/v1/provider/export`  
**操作ID**: `export_101`  

**描述**: 导出LLM提供商数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | LlmProviderRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

### 获取LLM提供商默认配置

**方法**: ` GET `  
**路径**: `/api/v1/provider/config/default`  
**操作ID**: `getLlmProviderConfigDefault`  

**描述**: 获取LLM提供商的默认配置信息

#### 响应

**200**: 获取成功

---

## 常见问题管理

常见问题管理相关接口

### 更新常见问题

**方法**: ` POST `  
**路径**: `/api/v1/faq/update`  
**操作ID**: `update_161`  

**描述**: 更新常见问题信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新常见问题向量索引

**方法**: ` POST `  
**路径**: `/api/v1/faq/updateVectorIndex`  
**操作ID**: `updateVectorIndex_3`  

**描述**: 更新常见问题的向量索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新常见问题索引

**方法**: ` POST `  
**路径**: `/api/v1/faq/updateIndex`  
**操作ID**: `updateIndex_3`  

**描述**: 更新常见问题的Elasticsearch索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新所有常见问题向量索引

**方法**: ` POST `  
**路径**: `/api/v1/faq/updateAllVectorIndex`  
**操作ID**: `updateAllVectorIndex_3`  

**描述**: 更新所有常见问题的向量索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 更新所有常见问题索引

**方法**: ` POST `  
**路径**: `/api/v1/faq/updateAllIndex`  
**操作ID**: `updateAllIndex_3`  

**描述**: 更新所有常见问题的Elasticsearch索引

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 启用常见问题

**方法**: ` POST `  
**路径**: `/api/v1/faq/enable`  
**操作ID**: `enable_8`  

**描述**: 启用或禁用常见问题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 操作成功

---

### 删除常见问题

**方法**: ` POST `  
**路径**: `/api/v1/faq/delete`  
**操作ID**: `delete_161`  

**描述**: 删除指定的常见问题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### 删除所有常见问题

**方法**: ` POST `  
**路径**: `/api/v1/faq/deleteAll`  
**操作ID**: `deleteAll_5`  

**描述**: 删除所有常见问题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/faq/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/faq/delete/org`  
**操作ID**: `deleteByOrgUid_161`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建常见问题

**方法**: ` POST `  
**路径**: `/api/v1/faq/create`  
**操作ID**: `create_163`  

**描述**: 创建新的常见问题

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的常见问题

**方法**: ` GET `  
**路径**: `/api/v1/faq/query`  
**操作ID**: `queryByUser_161`  

**描述**: 根据用户ID查询常见问题列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FaqRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定常见问题

**方法**: ` GET `  
**路径**: `/api/v1/faq/query/uid`  
**操作ID**: `queryByUid_161`  

**描述**: 根据UID查询常见问题详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FaqRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的常见问题

**方法**: ` GET `  
**路径**: `/api/v1/faq/query/org`  
**操作ID**: `queryByOrg_161`  

**描述**: 根据组织ID查询常见问题列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FaqRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出常见问题

**方法**: ` GET `  
**路径**: `/api/v1/faq/export`  
**操作ID**: `export_161`  

**描述**: 导出常见问题数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | FaqRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 企业版消息管理

企业版消息管理相关接口，包含未读消息等高级功能

### 标记消息为已读

**方法**: ` POST `  
**路径**: `/api/v1/vip/message/{messageUid}/read`  
**操作ID**: `markAsRead`  

**描述**: 企业版功能：将指定消息的状态更新为已读

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| messageUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### 批量标记会话消息为已读

**方法**: ` POST `  
**路径**: `/api/v1/vip/message/thread/{threadUid}/read`  
**操作ID**: `markThreadAsRead`  

**描述**: 企业版功能：将会话中所有未读消息的状态更新为已读

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| threadUid | string | path | 是 |  |

#### 响应

**200**: OK

---

### 查询未读消息

**方法**: ` GET `  
**路径**: `/api/v1/vip/message/unread`  
**操作ID**: `queryUnread`  

**描述**: 企业版功能：查询未读消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询所有未读消息

**方法**: ` GET `  
**路径**: `/api/v1/vip/message/unread/all`  
**操作ID**: `queryAllUnread`  

**描述**: 企业版功能：查询所有未读消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询留言提交消息

**方法**: ` GET `  
**路径**: `/api/v1/vip/message/leave/submitted`  
**操作ID**: `queryLeaveMessageSubmitted`  

**描述**: 企业版功能：查询留言提交消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询所有留言消息

**方法**: ` GET `  
**路径**: `/api/v1/vip/message/leave/submitted/all`  
**操作ID**: `queryAllLeaveMessageSubmitted`  

**描述**: 企业版功能：查询所有留言消息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Push Notification Management

Push notification management APIs for sending and managing push notifications

### Update Push Notification

**方法**: ` POST `  
**路径**: `/api/v1/push/update`  
**操作ID**: `update_100`  

**描述**: Update an existing push notification

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Push Notification

**方法**: ` POST `  
**路径**: `/api/v1/push/delete`  
**操作ID**: `delete_100`  

**描述**: Delete a push notification

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/push/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/push/delete/org`  
**操作ID**: `deleteByOrgUid_100`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Push Notification

**方法**: ` POST `  
**路径**: `/api/v1/push/create`  
**操作ID**: `create_102`  

**描述**: Create and send a new push notification

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Push Notifications by User

**方法**: ` GET `  
**路径**: `/api/v1/push/query`  
**操作ID**: `queryByUser_100`  

**描述**: Retrieve push notifications for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/push/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/push/query/uid`  
**操作ID**: `queryByUid_100`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Push Notifications by Organization

**方法**: ` GET `  
**路径**: `/api/v1/push/query/org`  
**操作ID**: `queryByOrg_100`  

**描述**: Retrieve push notifications for the current organization (Admin only)

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/push/export

**方法**: ` GET `  
**路径**: `/api/v1/push/export`  
**操作ID**: `export_100`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` GET `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` PUT `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend_2`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` POST `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend_1`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` DELETE `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend_3`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` OPTIONS `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend_6`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` HEAD `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend_5`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Resend Push Notification

**方法**: ` PATCH `  
**路径**: `/api/v1/push/resend`  
**操作ID**: `resend_4`  

**描述**: Resend a failed push notification with the same verification code

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | PushRequest | query | 是 |  |

#### 响应

**200**: OK

---

## QualityStatistic Management

QualityStatistic management APIs for organizing and categorizing content with tags

### Update QualityStatistic

**方法**: ` POST `  
**路径**: `/api/v1/quality/statistic/update`  
**操作ID**: `update_95`  

**描述**: Update an existing statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete QualityStatistic

**方法**: ` POST `  
**路径**: `/api/v1/quality/statistic/delete`  
**操作ID**: `delete_95`  

**描述**: Delete a statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/quality/statistic/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/quality/statistic/delete/org`  
**操作ID**: `deleteByOrgUid_95`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create QualityStatistic

**方法**: ` POST `  
**路径**: `/api/v1/quality/statistic/create`  
**操作ID**: `create_97`  

**描述**: Create a new statistic

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Calculate Today's Quality Statistics

**方法**: ` POST `  
**路径**: `/api/v1/quality/statistic/calculate`  
**操作ID**: `calculateTodayStatistics_2`  

**描述**: Calculate quality inspection statistics for today

#### 响应

**200**: OK

---

### Query QualityStatistics by User

**方法**: ` GET `  
**路径**: `/api/v1/quality/statistic/query`  
**操作ID**: `queryByUser_95`  

**描述**: Retrieve statistics for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityStatistic by UID

**方法**: ` GET `  
**路径**: `/api/v1/quality/statistic/query/uid`  
**操作ID**: `queryByUid_95`  

**描述**: Retrieve a specific statistic by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityStatistics by Organization

**方法**: ` GET `  
**路径**: `/api/v1/quality/statistic/query/org`  
**操作ID**: `queryByOrg_95`  

**描述**: Retrieve statistics for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QualityStatistics by Date Range

**方法**: ` GET `  
**路径**: `/api/v1/quality/statistic/query/date`  
**操作ID**: `queryByDate_2`  

**描述**: Retrieve quality inspection statistics for a specific date range

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export QualityStatistics

**方法**: ` GET `  
**路径**: `/api/v1/quality/statistic/export`  
**操作ID**: `export_95`  

**描述**: Export statistics to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QualityStatisticRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Relation Management

Relation management APIs for organizing and categorizing content with relations

### Update Relation

**方法**: ` POST `  
**路径**: `/api/v1/relation/update`  
**操作ID**: `update_87`  

**描述**: Update an existing relation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Relation

**方法**: ` POST `  
**路径**: `/api/v1/relation/delete`  
**操作ID**: `delete_87`  

**描述**: Delete a relation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/relation/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/relation/delete/org`  
**操作ID**: `deleteByOrgUid_87`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Relation

**方法**: ` POST `  
**路径**: `/api/v1/relation/create`  
**操作ID**: `create_89`  

**描述**: Create a new relation

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Relations by User

**方法**: ` GET `  
**路径**: `/api/v1/relation/query`  
**操作ID**: `queryByUser_87`  

**描述**: Retrieve relations for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RelationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Relation by UID

**方法**: ` GET `  
**路径**: `/api/v1/relation/query/uid`  
**操作ID**: `queryByUid_87`  

**描述**: Retrieve a specific relation by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RelationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Relations by Organization

**方法**: ` GET `  
**路径**: `/api/v1/relation/query/org`  
**操作ID**: `queryByOrg_87`  

**描述**: Retrieve relations for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RelationRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Relations

**方法**: ` GET `  
**路径**: `/api/v1/relation/export`  
**操作ID**: `export_87`  

**描述**: Export relations to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | RelationRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Server Management

Server management APIs for organizing and categorizing content with servers

### Update Server

**方法**: ` POST `  
**路径**: `/api/v1/server/update`  
**操作ID**: `update_76`  

**描述**: Update an existing server

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Server

**方法**: ` POST `  
**路径**: `/api/v1/server/delete`  
**操作ID**: `delete_76`  

**描述**: Delete a server

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/server/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/server/delete/org`  
**操作ID**: `deleteByOrgUid_76`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Server

**方法**: ` POST `  
**路径**: `/api/v1/server/create`  
**操作ID**: `create_78`  

**描述**: Create a new server

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Servers by User

**方法**: ` GET `  
**路径**: `/api/v1/server/query`  
**操作ID**: `queryByUser_76`  

**描述**: Retrieve servers for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Server by UID

**方法**: ` GET `  
**路径**: `/api/v1/server/query/uid`  
**操作ID**: `queryByUid_76`  

**描述**: Retrieve a specific server by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Servers by Organization

**方法**: ` GET `  
**路径**: `/api/v1/server/query/org`  
**操作ID**: `queryByOrg_76`  

**描述**: Retrieve servers for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Servers

**方法**: ` GET `  
**路径**: `/api/v1/server/export`  
**操作ID**: `export_76`  

**描述**: Export servers to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Clipboard Management

Clipboard management APIs for sharing and managing clipboard content

### Update Clipboard Item

**方法**: ` POST `  
**路径**: `/api/v1/clipboard/update`  
**操作ID**: `update_175`  

**描述**: Update an existing clipboard item

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Clipboard Item

**方法**: ` POST `  
**路径**: `/api/v1/clipboard/delete`  
**操作ID**: `delete_175`  

**描述**: Delete a clipboard item

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/clipboard/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/clipboard/delete/org`  
**操作ID**: `deleteByOrgUid_175`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Clipboard Item

**方法**: ` POST `  
**路径**: `/api/v1/clipboard/create`  
**操作ID**: `create_177`  

**描述**: Create a new clipboard item

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Clipboard by User

**方法**: ` GET `  
**路径**: `/api/v1/clipboard/query`  
**操作ID**: `queryByUser_175`  

**描述**: Retrieve clipboard items for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ClipboardRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/clipboard/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/clipboard/query/uid`  
**操作ID**: `queryByUid_175`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ClipboardRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/clipboard/query/org

**方法**: ` GET `  
**路径**: `/api/v1/clipboard/query/org`  
**操作ID**: `queryByOrg_175`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ClipboardRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/clipboard/export

**方法**: ` GET `  
**路径**: `/api/v1/clipboard/export`  
**操作ID**: `export_175`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ClipboardRequest | query | 是 |  |

#### 响应

**200**: OK

---

## McpServer Management

McpServer management APIs for organizing and categorizing content with mcpServers

### Update McpServer

**方法**: ` POST `  
**路径**: `/api/v1/mcp/server/update`  
**操作ID**: `update_129`  

**描述**: Update an existing mcpServer

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete McpServer

**方法**: ` POST `  
**路径**: `/api/v1/mcp/server/delete`  
**操作ID**: `delete_129`  

**描述**: Delete a mcpServer

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/mcp/server/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/mcp/server/delete/org`  
**操作ID**: `deleteByOrgUid_129`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create McpServer

**方法**: ` POST `  
**路径**: `/api/v1/mcp/server/create`  
**操作ID**: `create_131`  

**描述**: Create a new mcpServer

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query McpServers by User

**方法**: ` GET `  
**路径**: `/api/v1/mcp/server/query`  
**操作ID**: `queryByUser_129`  

**描述**: Retrieve mcpServers for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query McpServer by UID

**方法**: ` GET `  
**路径**: `/api/v1/mcp/server/query/uid`  
**操作ID**: `queryByUid_129`  

**描述**: Retrieve a specific mcpServer by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query McpServers by Organization

**方法**: ` GET `  
**路径**: `/api/v1/mcp/server/query/org`  
**操作ID**: `queryByOrg_129`  

**描述**: Retrieve mcpServers for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export McpServers

**方法**: ` GET `  
**路径**: `/api/v1/mcp/server/export`  
**操作ID**: `export_129`  

**描述**: Export mcpServers to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | McpServerRequest | query | 是 |  |

#### 响应

**200**: OK

---

## JanusVideo Management

JanusVideo management APIs for organizing and categorizing content with videos

### Update JanusVideo

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/video/update`  
**操作ID**: `update_180`  

**描述**: Update an existing janus_video

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete JanusVideo

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/video/delete`  
**操作ID**: `delete_180`  

**描述**: Delete a janus_video

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/call/janus/video/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/video/delete/org`  
**操作ID**: `deleteByOrgUid_180`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create JanusVideo

**方法**: ` POST `  
**路径**: `/api/v1/call/janus/video/create`  
**操作ID**: `create_182`  

**描述**: Create a new janus_video

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query JanusVideos by User

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/video/query`  
**操作ID**: `queryByUser_180`  

**描述**: Retrieve videos for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusVideoRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query JanusVideo by UID

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/video/query/uid`  
**操作ID**: `queryByUid_180`  

**描述**: Retrieve a specific janus_video by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusVideoRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query JanusVideos by Organization

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/video/query/org`  
**操作ID**: `queryByOrg_180`  

**描述**: Retrieve videos for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusVideoRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export JanusVideos

**方法**: ` GET `  
**路径**: `/api/v1/call/janus/video/export`  
**操作ID**: `export_180`  

**描述**: Export videos to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | JanusVideoRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Asset Management

Asset management APIs for organizing and categorizing content with assets

### Update Asset

**方法**: ` POST `  
**路径**: `/api/v1/asset/update`  
**操作ID**: `update_190`  

**描述**: Update an existing asset

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Asset

**方法**: ` POST `  
**路径**: `/api/v1/asset/delete`  
**操作ID**: `delete_190`  

**描述**: Delete a asset

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/asset/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/asset/delete/org`  
**操作ID**: `deleteByOrgUid_190`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Asset

**方法**: ` POST `  
**路径**: `/api/v1/asset/create`  
**操作ID**: `create_192`  

**描述**: Create a new asset

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Assets by User

**方法**: ` GET `  
**路径**: `/api/v1/asset/query`  
**操作ID**: `queryByUser_190`  

**描述**: Retrieve assets for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AssetRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Asset by UID

**方法**: ` GET `  
**路径**: `/api/v1/asset/query/uid`  
**操作ID**: `queryByUid_190`  

**描述**: Retrieve a specific asset by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AssetRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Assets by Organization

**方法**: ` GET `  
**路径**: `/api/v1/asset/query/org`  
**操作ID**: `queryByOrg_190`  

**描述**: Retrieve assets for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AssetRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Assets

**方法**: ` GET `  
**路径**: `/api/v1/asset/export`  
**操作ID**: `export_190`  

**描述**: Export assets to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AssetRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Announcement Management

Announcement management APIs for organizing and categorizing content with announcements

### Update Announcement

**方法**: ` POST `  
**路径**: `/api/v1/announcement/update`  
**操作ID**: `update_193`  

**描述**: Update an existing announcement

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Announcement

**方法**: ` POST `  
**路径**: `/api/v1/announcement/delete`  
**操作ID**: `delete_193`  

**描述**: Delete a announcement

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/announcement/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/announcement/delete/org`  
**操作ID**: `deleteByOrgUid_193`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Announcement

**方法**: ` POST `  
**路径**: `/api/v1/announcement/create`  
**操作ID**: `create_195`  

**描述**: Create a new announcement

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Announcements by User

**方法**: ` GET `  
**路径**: `/api/v1/announcement/query`  
**操作ID**: `queryByUser_193`  

**描述**: Retrieve announcements for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AnnouncementRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Announcement by UID

**方法**: ` GET `  
**路径**: `/api/v1/announcement/query/uid`  
**操作ID**: `queryByUid_193`  

**描述**: Retrieve a specific announcement by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AnnouncementRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Announcements by Organization

**方法**: ` GET `  
**路径**: `/api/v1/announcement/query/org`  
**操作ID**: `queryByOrg_193`  

**描述**: Retrieve announcements for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AnnouncementRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Announcements

**方法**: ` GET `  
**路径**: `/api/v1/announcement/export`  
**操作ID**: `export_193`  

**描述**: Export announcements to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AnnouncementRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Group Notice Management

Group notice management APIs for managing announcements within groups

### Update Group Notice

**方法**: ` POST `  
**路径**: `/api/v1/group/notice/update`  
**操作ID**: `update_152`  

**描述**: Update an existing group notice

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Group Notice

**方法**: ` POST `  
**路径**: `/api/v1/group/notice/delete`  
**操作ID**: `delete_151`  

**描述**: Delete a group notice

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/group/notice/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/group/notice/delete/org`  
**操作ID**: `deleteByOrgUid_151`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Group Notice

**方法**: ` POST `  
**路径**: `/api/v1/group/notice/create`  
**操作ID**: `create_153`  

**描述**: Create a new group notice

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Group Notices by User

**方法**: ` GET `  
**路径**: `/api/v1/group/notice/query`  
**操作ID**: `queryByUser_152`  

**描述**: Retrieve group notices for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupNoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/group/notice/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/group/notice/query/uid`  
**操作ID**: `queryByUid_152`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupNoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Group Notices by Organization

**方法**: ` GET `  
**路径**: `/api/v1/group/notice/query/org`  
**操作ID**: `queryByOrg_152`  

**描述**: Retrieve group notices for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupNoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/group/notice/export

**方法**: ` GET `  
**路径**: `/api/v1/group/notice/export`  
**操作ID**: `export_151`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | GroupNoticeRequest | query | 是 |  |

#### 响应

**200**: OK

---

## SmsTemplate Management

SmsTemplate management APIs for organizing and categorizing content with sms_templates

### Update SmsTemplate

**方法**: ` POST `  
**路径**: `/api/v1/sms_template/update`  
**操作ID**: `update_69`  

**描述**: Update an existing sms_template

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete SmsTemplate

**方法**: ` POST `  
**路径**: `/api/v1/sms_template/delete`  
**操作ID**: `delete_69`  

**描述**: Delete a sms_template

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/sms_template/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/sms_template/delete/org`  
**操作ID**: `deleteByOrgUid_69`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create SmsTemplate

**方法**: ` POST `  
**路径**: `/api/v1/sms_template/create`  
**操作ID**: `create_71`  

**描述**: Create a new sms_template

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query SmsTemplates by User

**方法**: ` GET `  
**路径**: `/api/v1/sms_template/query`  
**操作ID**: `queryByUser_69`  

**描述**: Retrieve sms_templates for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query SmsTemplate by UID

**方法**: ` GET `  
**路径**: `/api/v1/sms_template/query/uid`  
**操作ID**: `queryByUid_69`  

**描述**: Retrieve a specific sms_template by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query SmsTemplates by Organization

**方法**: ` GET `  
**路径**: `/api/v1/sms_template/query/org`  
**操作ID**: `queryByOrg_69`  

**描述**: Retrieve sms_templates for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export SmsTemplates

**方法**: ` GET `  
**路径**: `/api/v1/sms_template/export`  
**操作ID**: `export_69`  

**描述**: Export sms_templates to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | SmsTemplateRequest | query | 是 |  |

#### 响应

**200**: OK

---

## Tag Management

Tag management APIs for organizing and categorizing content with tags

### Update Tag

**方法**: ` POST `  
**路径**: `/api/v1/tag/update`  
**操作ID**: `update_65`  

**描述**: Update an existing tag

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Tag

**方法**: ` POST `  
**路径**: `/api/v1/tag/delete`  
**操作ID**: `delete_65`  

**描述**: Delete a tag

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/tag/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/tag/delete/org`  
**操作ID**: `deleteByOrgUid_65`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create Tag

**方法**: ` POST `  
**路径**: `/api/v1/tag/create`  
**操作ID**: `create_67`  

**描述**: Create a new tag

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query Tags by User

**方法**: ` GET `  
**路径**: `/api/v1/tag/query`  
**操作ID**: `queryByUser_65`  

**描述**: Retrieve tags for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TagRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Tag by UID

**方法**: ` GET `  
**路径**: `/api/v1/tag/query/uid`  
**操作ID**: `queryByUid_65`  

**描述**: Retrieve a specific tag by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TagRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query Tags by Organization

**方法**: ` GET `  
**路径**: `/api/v1/tag/query/org`  
**操作ID**: `queryByOrg_65`  

**描述**: Retrieve tags for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TagRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export Tags

**方法**: ` GET `  
**路径**: `/api/v1/tag/export`  
**操作ID**: `export_65`  

**描述**: Export tags to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | TagRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 渠道应用管理

渠道应用管理相关接口

### 更新渠道应用

**方法**: ` POST `  
**路径**: `/api/v1/channel/app/update`  
**操作ID**: `update_177`  

**描述**: 更新渠道应用信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除渠道应用

**方法**: ` POST `  
**路径**: `/api/v1/channel/app/delete`  
**操作ID**: `delete_177`  

**描述**: 删除指定的渠道应用

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/channel/app/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/channel/app/delete/org`  
**操作ID**: `deleteByOrgUid_177`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建渠道应用

**方法**: ` POST `  
**路径**: `/api/v1/channel/app/create`  
**操作ID**: `create_179`  

**描述**: 创建新的渠道应用

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的渠道应用

**方法**: ` GET `  
**路径**: `/api/v1/channel/app/query`  
**操作ID**: `queryByUser_177`  

**描述**: 根据用户ID查询渠道应用列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ChannelAppRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定渠道应用

**方法**: ` GET `  
**路径**: `/api/v1/channel/app/query/uid`  
**操作ID**: `queryByUid_177`  

**描述**: 根据UID查询渠道应用详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ChannelAppRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的渠道应用

**方法**: ` GET `  
**路径**: `/api/v1/channel/app/query/org`  
**操作ID**: `queryByOrg_177`  

**描述**: 根据组织ID查询渠道应用列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ChannelAppRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出渠道应用

**方法**: ` GET `  
**路径**: `/api/v1/channel/app/export`  
**操作ID**: `export_177`  

**描述**: 导出渠道应用数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ChannelAppRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 节假日管理

节假日管理相关接口

### 更新节假日

**方法**: ` POST `  
**路径**: `/api/v1/holiday/update`  
**操作ID**: `update_150`  

**描述**: 更新节假日信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除节假日

**方法**: ` POST `  
**路径**: `/api/v1/holiday/delete`  
**操作ID**: `delete_150`  

**描述**: 删除指定的节假日

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/holiday/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/holiday/delete/org`  
**操作ID**: `deleteByOrgUid_150`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建节假日

**方法**: ` POST `  
**路径**: `/api/v1/holiday/create`  
**操作ID**: `create_152`  

**描述**: 创建新的节假日

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的节假日

**方法**: ` GET `  
**路径**: `/api/v1/holiday/query`  
**操作ID**: `queryByUser_150`  

**描述**: 根据用户ID查询节假日列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | HolidayRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定节假日

**方法**: ` GET `  
**路径**: `/api/v1/holiday/query/uid`  
**操作ID**: `queryByUid_150`  

**描述**: 根据UID查询节假日详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | HolidayRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的节假日

**方法**: ` GET `  
**路径**: `/api/v1/holiday/query/org`  
**操作ID**: `queryByOrg_150`  

**描述**: 根据组织ID查询节假日列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | HolidayRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出节假日

**方法**: ` GET `  
**路径**: `/api/v1/holiday/export`  
**操作ID**: `export_150`  

**描述**: 导出节假日数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | HolidayRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 未回复消息管理

未回复消息管理相关接口

### 更新未回复消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unreplied/update`  
**操作ID**: `update_119`  

**描述**: 更新未回复消息信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除未回复消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unreplied/delete`  
**操作ID**: `delete_118`  

**描述**: 删除指定的未回复消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/message/unreplied/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/message/unreplied/delete/org`  
**操作ID**: `deleteByOrgUid_118`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建未回复消息

**方法**: ` POST `  
**路径**: `/api/v1/message/unreplied/create`  
**操作ID**: `create_120`  

**描述**: 创建新的未回复消息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的未回复消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unreplied/query`  
**操作ID**: `queryByUser_118`  

**描述**: 根据用户ID查询未回复消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnrepliedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定未回复消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unreplied/query/uid`  
**操作ID**: `queryByUid_118`  

**描述**: 根据UID查询未回复消息详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnrepliedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的未回复消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unreplied/query/org`  
**操作ID**: `queryByOrg_118`  

**描述**: 根据组织ID查询未回复消息列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnrepliedRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出未回复消息

**方法**: ` GET `  
**路径**: `/api/v1/message/unreplied/export`  
**操作ID**: `export_118`  

**描述**: 导出未回复消息数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | MessageUnrepliedRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## QuartzTask Management

QuartzTask management APIs for organizing and categorizing content with quartz_tasks

### Update QuartzTask

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/update`  
**操作ID**: `update_94`  

**描述**: Update an existing quartz_task

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Start Job

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/startJob`  
**操作ID**: `startJob`  

**描述**: Start a Quartz job

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Resume Job

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/resumeJob`  
**操作ID**: `resumeJob`  

**描述**: Resume a paused Quartz job

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Pause Job

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/pauseJob`  
**操作ID**: `pauseJob`  

**描述**: Pause a running Quartz job

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete QuartzTask

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/delete`  
**操作ID**: `delete_94`  

**描述**: Delete a quartz_task

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Delete Job

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/deleteJob`  
**操作ID**: `deleteJob`  

**描述**: Remove a job from the Quartz scheduler

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/quartz_task/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/delete/org`  
**操作ID**: `deleteByOrgUid_94`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Create QuartzTask

**方法**: ` POST `  
**路径**: `/api/v1/quartz_task/create`  
**操作ID**: `create_96`  

**描述**: Create a new quartz_task

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### Query QuartzTasks by User

**方法**: ` GET `  
**路径**: `/api/v1/quartz_task/query`  
**操作ID**: `queryByUser_94`  

**描述**: Retrieve quartz_tasks for the current user

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QuartzTaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QuartzTask by UID

**方法**: ` GET `  
**路径**: `/api/v1/quartz_task/query/uid`  
**操作ID**: `queryByUid_94`  

**描述**: Retrieve a specific quartz_task by its unique identifier

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QuartzTaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Query QuartzTasks by Organization

**方法**: ` GET `  
**路径**: `/api/v1/quartz_task/query/org`  
**操作ID**: `queryByOrg_94`  

**描述**: Retrieve quartz_tasks for the current organization

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QuartzTaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

### Export QuartzTasks

**方法**: ` GET `  
**路径**: `/api/v1/quartz_task/export`  
**操作ID**: `export_94`  

**描述**: Export quartz_tasks to Excel format

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QuartzTaskRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话管理

会话管理相关接口，包括查询、创建、更新、删除、置顶、标星等操作

### 更新会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/update`  
**操作ID**: `update_54`  

**描述**: 更新已存在的会话信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话用户信息

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/user`  
**操作ID**: `updateUser`  

**描述**: 更新会话关联的用户信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话未读状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/unread`  
**操作ID**: `updateUnread`  

**描述**: 标记会话为已读或未读

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话置顶状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/top`  
**操作ID**: `updateTop`  

**描述**: 设置或取消会话置顶

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话标签列表

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/tagList`  
**操作ID**: `updateTagList_1`  

**描述**: 更新会话的标签信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/status`  
**操作ID**: `updateStatus_1`  

**描述**: 更新会话的处理状态

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话标星状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/star`  
**操作ID**: `updateStar`  

**描述**: 设置或取消会话标星

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话备注

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/note`  
**操作ID**: `updateNote`  

**描述**: 更新会话的备注信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话静音状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/mute`  
**操作ID**: `updateMute`  

**描述**: 设置或取消会话静音

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话隐藏状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/hide`  
**操作ID**: `updateHide`  

**描述**: 设置或取消会话隐藏

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 更新会话折叠状态

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/fold`  
**操作ID**: `updateFold`  

**描述**: 设置或取消会话折叠

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 管理后台更新会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/update/admin`  
**操作ID**: `adminUpdate`  

**描述**: 管理后台聚合更新会话字段

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 申请消息元信息

**方法**: ` POST `  
**路径**: `/api/v1/thread/message/meta`  
**操作ID**: `requestMessageMetadata_1`  

**描述**: 发送消息前获取服务端分配的消息UID与时间戳

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 删除会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/delete`  
**操作ID**: `delete_60`  

**描述**: 删除指定会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/thread/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/delete/org`  
**操作ID**: `deleteByOrgUid_60`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/create`  
**操作ID**: `create_62`  

**描述**: 创建新的会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 关闭会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/close`  
**操作ID**: `close`  

**描述**: 关闭指定会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 关闭会话

**方法**: ` POST `  
**路径**: `/api/v1/thread/close/topic`  
**操作ID**: `closeByTopic`  

**描述**: 关闭指定主题的会话

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 根据用户查询会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query`  
**操作ID**: `queryByUser_57`  

**描述**: 返回当前用户的会话列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据UID查询会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query/uid`  
**操作ID**: `queryByUid_57`  

**描述**: 通过唯一标识符查询会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据主题查询会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query/topic`  
**操作ID**: `queryByThreadTopic_1`  

**描述**: 通过主题查找相关会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据主题和用户查询会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query/topic/owner`  
**操作ID**: `queryByTopicAndOwner`  

**描述**: 通过主题和用户查找相关会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 根据组织查询会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query/org`  
**操作ID**: `queryByOrg_57`  

**描述**: 返回当前组织的会话列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询邀请会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query/invite`  
**操作ID**: `queryByThreadInvite`  

**描述**: 查询邀请相关的会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 查询用户所有客服会话

**方法**: ` GET `  
**路径**: `/api/v1/thread/query/by/user/topics`  
**操作ID**: `queryByUserTopics`  

**描述**: 查询用户所有客服会话

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

### 导出会话列表

**方法**: ` GET `  
**路径**: `/api/v1/thread/export`  
**操作ID**: `export_59`  

**描述**: 将会话数据导出为Excel格式

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadRequest | query | 是 |  |

#### 响应

**200**: OK

---

## 会话小结管理

会话小结管理相关接口

### 更新会话小结

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/update`  
**操作ID**: `update_56`  

**描述**: 更新会话小结信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除会话小结

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/delete`  
**操作ID**: `delete_55`  

**描述**: 删除指定的会话小结

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/thread/summary/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/delete/org`  
**操作ID**: `deleteByOrgUid_55`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建会话小结

**方法**: ` POST `  
**路径**: `/api/v1/thread/summary/create`  
**操作ID**: `create_57`  

**描述**: 创建新的会话小结

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query`  
**操作ID**: `queryByUser_55`  

**描述**: 根据用户ID查询会话小结列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query/uid`  
**操作ID**: `queryByUid_55`  

**描述**: 根据UID查询会话小结详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query/thread/uid`  
**操作ID**: `queryByThreadUid_4`  

**描述**: 根据会话UID查询小结信息

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

**201**: 未找到会话小结

---

### 查询组织下的会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/query/org`  
**操作ID**: `queryByOrg_55`  

**描述**: 根据组织ID查询会话小结列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出会话小结

**方法**: ` GET `  
**路径**: `/api/v1/thread/summary/export`  
**操作ID**: `export_55`  

**描述**: 导出会话小结数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | ThreadSummaryRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 浏览记录管理

浏览记录管理相关接口

### 更新浏览记录

**方法**: ` POST `  
**路径**: `/api/v1/browse/update`  
**操作ID**: `update_183`  

**描述**: 更新浏览记录信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除浏览记录

**方法**: ` POST `  
**路径**: `/api/v1/browse/delete`  
**操作ID**: `delete_183`  

**描述**: 删除指定的浏览记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/browse/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/browse/delete/org`  
**操作ID**: `deleteByOrgUid_183`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建浏览记录

**方法**: ` POST `  
**路径**: `/api/v1/browse/create`  
**操作ID**: `create_185`  

**描述**: 创建新的浏览记录

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的浏览记录

**方法**: ` GET `  
**路径**: `/api/v1/browse/query`  
**操作ID**: `queryByUser_183`  

**描述**: 根据用户ID查询浏览记录列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BrowseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询访客的浏览记录

**方法**: ` GET `  
**路径**: `/api/v1/browse/query/visitor/uid`  
**操作ID**: `queryByVisitorUid_2`  

**描述**: 根据访客UID查询该访客的所有浏览记录

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BrowseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定浏览记录

**方法**: ` GET `  
**路径**: `/api/v1/browse/query/uid`  
**操作ID**: `queryByUid_183`  

**描述**: 根据UID查询浏览记录详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BrowseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的浏览记录

**方法**: ` GET `  
**路径**: `/api/v1/browse/query/org`  
**操作ID**: `queryByOrg_183`  

**描述**: 根据组织ID查询浏览记录列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BrowseRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出浏览记录

**方法**: ` GET `  
**路径**: `/api/v1/browse/export`  
**操作ID**: `export_183`  

**描述**: 导出浏览记录数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | BrowseRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## 队列成员管理

队列成员管理相关接口

### 更新队列成员

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/update`  
**操作ID**: `update_93`  

**描述**: 更新队列成员信息

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 更新成功

---

### 删除队列成员

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/delete`  
**操作ID**: `delete_92`  

**描述**: 删除指定的队列成员

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 删除成功

---

### POST /api/v1/queue/member/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/delete/org`  
**操作ID**: `deleteByOrgUid_92`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### 创建队列成员

**方法**: ` POST `  
**路径**: `/api/v1/queue/member/create`  
**操作ID**: `create_94`  

**描述**: 创建新的队列成员

#### 请求体

**Content-Type**: application/json

#### 响应

**200**: 创建成功

---

### 查询用户下的队列成员

**方法**: ` GET `  
**路径**: `/api/v1/queue/member/query`  
**操作ID**: `queryByUser_93`  

**描述**: 根据用户ID查询队列成员列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueMemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询指定队列成员

**方法**: ` GET `  
**路径**: `/api/v1/queue/member/query/uid`  
**操作ID**: `queryByUid_93`  

**描述**: 根据UID查询队列成员详情

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueMemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 查询组织下的队列成员

**方法**: ` GET `  
**路径**: `/api/v1/queue/member/query/org`  
**操作ID**: `queryByOrg_93`  

**描述**: 根据组织ID查询队列成员列表

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueMemberRequest | query | 是 |  |

#### 响应

**200**: 查询成功

---

### 导出队列成员

**方法**: ` GET `  
**路径**: `/api/v1/queue/member/export`  
**操作ID**: `export_92`  

**描述**: 导出队列成员数据

#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | QueueMemberRequest | query | 是 |  |

#### 响应

**200**: 导出成功

---

## Authority Management

Authority management APIs

### POST /api/v1/authority/update

**方法**: ` POST `  
**路径**: `/api/v1/authority/update`  
**操作ID**: `update_188`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/authority/reset/level

**方法**: ` POST `  
**路径**: `/api/v1/authority/reset/level`  
**操作ID**: `resetAuthorityLevels`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/authority/delete

**方法**: ` POST `  
**路径**: `/api/v1/authority/delete`  
**操作ID**: `delete_188`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/authority/delete/org

**方法**: ` POST `  
**路径**: `/api/v1/authority/delete/org`  
**操作ID**: `deleteByOrgUid_188`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### POST /api/v1/authority/create

**方法**: ` POST `  
**路径**: `/api/v1/authority/create`  
**操作ID**: `create_190`  
#### 请求体

**Content-Type**: application/json

#### 响应

**200**: OK

---

### GET /api/v1/authority/query

**方法**: ` GET `  
**路径**: `/api/v1/authority/query`  
**操作ID**: `queryByUser_188`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AuthorityRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/authority/query/uid

**方法**: ` GET `  
**路径**: `/api/v1/authority/query/uid`  
**操作ID**: `queryByUid_188`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AuthorityRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/authority/query/org

**方法**: ` GET `  
**路径**: `/api/v1/authority/query/org`  
**操作ID**: `queryByOrg_188`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AuthorityRequest | query | 是 |  |

#### 响应

**200**: OK

---

### GET /api/v1/authority/export

**方法**: ` GET `  
**路径**: `/api/v1/authority/export`  
**操作ID**: `export_188`  
#### 请求参数

| 参数名 | 类型 | 位置 | 必填 | 描述 |
|--------|------|------|------|------|
| request | AuthorityRequest | query | 是 |  |

#### 响应

**200**: OK

---


