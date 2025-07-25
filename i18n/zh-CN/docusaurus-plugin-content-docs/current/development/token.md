---
sidebar_label: Token
sidebar_position: 27
---

# Token

:::tip 前置条件

- 仅企业版和平台版支持此功能，如需要，请[扫码联系微信](/img/wechat.png)
:::

## 功能简介

AccessToken 是微语系统提供的第三方登录凭证，主要用于第三方系统集成时避免用户二次登录。通过 AccessToken，第三方系统可以直接让用户登录到微语系统，无需用户重新输入用户名和密码。

![token](/img/develop/admin/token.png)

## 使用场景

- **第三方系统集成**: 当您的系统需要集成微语客服功能时
- **单点登录 (SSO)**: 实现用户一次登录即可访问多个系统
- **嵌入式应用**: 在您的应用中嵌入微语客服界面
- **API 调用**: 通过 AccessToken 进行 API 认证

## AccessToken 登录方式

### 1. 获取 AccessToken

在微语管理后台的 Token 管理页面，可以生成和管理 AccessToken。

### 2. 登录 URL 格式

AccessToken 支持两种登录方式：

#### 客服工作台登录

```bash
http://服务器ip/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN
```

#### 管理后台登录

```bash
http://服务器ip/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN
```

### 3. 完整示例

#### 客服工作台示例

```bash
http://your-domain.com/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

#### 管理后台示例

```bash
http://your-domain.com/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

## 集成示例

### 1. 简单链接跳转

#### 客服工作台

```html
<a href="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开客服工作台
</a>
```

#### 管理后台

```html
<a href="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开管理后台
</a>
```

### 2. JavaScript 跳转

```javascript
// 打开客服工作台
function openAgentWorkspace(accessToken) {
    const url = `http://your-domain.com/agent/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 打开管理后台
function openAdminPanel(accessToken) {
    const url = `http://your-domain.com/admin/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 使用示例
openAgentWorkspace('YOUR_ACCESS_TOKEN');
openAdminPanel('YOUR_ACCESS_TOKEN');
```

### 3. iframe 嵌入

#### 客服工作台

```html
<iframe 
    src="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
```

#### 管理后台

```html
<iframe 
    src="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
```

### 4. 表单提交

#### 客服工作台

```html
<form action="http://your-domain.com/agent/auth/login" method="GET">
    <input type="hidden" name="accessToken" value="YOUR_ACCESS_TOKEN">
    <button type="submit">登录客服工作台</button>
</form>
```

#### 管理后台

```html
<form action="http://your-domain.com/admin/auth/login" method="GET">
    <input type="hidden" name="accessToken" value="YOUR_ACCESS_TOKEN">
    <button type="submit">登录管理后台</button>
</form>
```

## 安全注意事项

1. **Token 保护**: AccessToken 具有登录权限，请妥善保管，不要泄露给他人
2. **HTTPS 传输**: 建议在生产环境中使用 HTTPS 协议传输 AccessToken
3. **Token 有效期**: 注意 AccessToken 的有效期，过期需要重新生成
4. **域名限制**: 可以在管理后台设置 Token 的允许访问域名，确保安全性
5. **定期更新**: 建议定期更新 AccessToken 以提高安全性

## 错误处理

### 常见错误及解决方案

1. **Token 无效**
   - 检查 AccessToken 是否正确
   - 确认 Token 是否已过期
   - 验证 Token 是否被禁用

2. **访问被拒绝**
   - 检查当前域名是否在允许列表中
   - 确认 Token 的权限设置

3. **登录失败**
   - 检查服务器地址是否正确
   - 确认网络连接正常

## 相关文档

- [客服端开发文档](./agent.md) - 了解客服工作台集成功能和iframe通信
- [管理后台开发文档](./admin.md) - 了解管理后台功能和集成方式
