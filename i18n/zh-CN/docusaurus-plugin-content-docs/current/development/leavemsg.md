---
sidebar_label: 留言处理
sidebar_position: 26
---

# 留言处理

## 概述

当客服不在线时，系统会自动显示留言表单，收集用户的留言信息和联系方式。通过配置 Webhook URL，可以将这些留言消息推送到多种平台，确保及时处理用户需求。

## 留言表单功能

### 自动显示

- 当所有客服都处于离线状态时，访客端会自动显示留言表单
- 表单包含必填的留言内容和联系方式字段
- 支持自定义表单字段和验证规则

### 收集信息

留言表单会收集以下信息：

- **留言内容**：用户的具体问题或需求
- **联系方式**：姓名、电话、邮箱等
- **时间戳**：留言提交时间
- **访客信息**：IP地址、浏览器信息等

## 留言通知

### 支持的通知方式

#### 1. 企业微信

```javascript
// 配置示例
{
  "type": "wecom",
  "webhook_url": "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_KEY",
  "enabled": true
}
```

#### 2. 钉钉

```javascript
// 配置示例
{
  "type": "dingtalk",
  "webhook_url": "https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN",
  "enabled": true
}
```

#### 3. 飞书

```javascript
// 配置示例
{
  "type": "feishu",
  "webhook_url": "https://open.feishu.cn/open-apis/bot/v2/hook/YOUR_WEBHOOK_ID",
  "enabled": true
}
```

#### 4. Email 邮箱

```javascript
// 配置示例
{
  "type": "email",
  "smtp_config": {
    "host": "smtp.example.com",
    "port": 587,
    "secure": true,
    "auth": {
      "user": "your-email@example.com",
      "pass": "your-password"
    }
  },
  "to": ["admin@example.com", "support@example.com"],
  "enabled": true
}
```

#### 5. 自定义 Webhook URL

```javascript
// 配置示例
{
  "type": "custom",
  "webhook_url": "https://your-server.com/webhook/leavemsg",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN"
  },
  "enabled": true
}
```

### 消息格式

所有通知方式都会发送统一格式的消息：

```json
{
  "type": "leave_message",
  "timestamp": "2024-01-15T10:30:00Z",
  "visitor": {
    "name": "张三",
    "phone": "13800138000",
    "email": "zhangsan@example.com",
    "ip": "192.168.1.100"
  },
  "message": {
    "content": "我想咨询一下产品价格",
    "category": "产品咨询"
  },
  "source": "web_chat"
}
```

## 配置方法

### 1. 管理后台配置

1. 登录管理后台
2. 进入"系统设置" → "留言通知"
3. 选择需要启用的通知方式
4. 填写相应的配置信息
5. 保存配置

### 2. API 配置

```javascript
// 通过 API 配置留言通知
const response = await fetch('/api/v1/leavemsg/config', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'
  },
  body: JSON.stringify({
    notifications: [
      {
        type: 'wecom',
        webhook_url: 'YOUR_WEBHOOK_URL',
        enabled: true
      },
      {
        type: 'email',
        smtp_config: { /* SMTP配置 */ },
        to: ['admin@example.com'],
        enabled: true
      }
    ]
  })
});
```

## 最佳实践

### 1. 多渠道通知

- 建议同时配置多种通知方式，确保消息不遗漏
- 可以设置不同的通知优先级

### 2. 消息去重

- 系统会自动对相同内容的留言进行去重处理
- 避免重复通知打扰

### 3. 安全配置

- 使用 HTTPS 协议的 Webhook URL
- 定期更换 Webhook Token
- 设置 IP 白名单（如支持）

### 4. 监控告警

- 定期检查通知配置的有效性
- 设置通知失败的重试机制
- 监控留言处理响应时间

## 常见问题

### Q: 如何测试通知配置？

A: 在管理后台的"留言通知"页面，点击"测试通知"按钮即可发送测试消息。

### Q: 支持自定义消息模板吗？

A: 是的，可以通过配置自定义消息模板，支持变量替换。

### Q: 留言通知有频率限制吗？

A: 系统默认每分钟最多发送 10 条通知，可在配置中调整。

### Q: 如何查看历史留言？

A: 在管理后台的"留言管理"页面可以查看所有历史留言记录。

## 相关 API

- `GET /api/v1/leavemsg/query/org` - 获取留言列表
- `POST /api/v1/leavemsg/create` - 配置通知设置
- `GET /api/v1/leavemsg/query/uid` - 获取当前配置
- `POST /api/v1/leavemsg/test` - 测试通知配置
