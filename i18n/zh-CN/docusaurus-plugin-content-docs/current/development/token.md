---
sidebar_label: Token
sidebar_position: 27
---

# Token

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

## 功能简介

AccessToken 是微语系统提供的第三方登录凭证，主要用于第三方系统集成时避免用户二次登录。通过 AccessToken，第三方系统可以直接让用户登录到微语系统，无需用户重新输入用户名和密码。

![token](/img/develop/admin/token.png)

## 使用场景

- **第三方系统集成**: 当您的系统需要集成微语客服功能时
- **单点登录 (SSO)**: 实现用户一次登录即可访问多个系统
- **嵌入式应用**: 在您的应用中嵌入微语客服界面
- **API 调用**: 通过 AccessToken 进行 API 认证，实现程序化访问微语系统的各项功能

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

### 5. API 调用示例

AccessToken 可以用于调用微语系统的各种 API 接口，实现程序化操作。

#### 在请求头中使用 AccessToken

```javascript
// JavaScript 示例
async function callBytedeskAPI(accessToken, endpoint) {
    const response = await fetch(`http://your-domain.com/api/${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`API 调用失败: ${response.status}`);
    }
}

// 使用示例
callBytedeskAPI('YOUR_ACCESS_TOKEN', 'tickets/list')
    .then(data => console.log('工单列表:', data))
    .catch(error => console.error('错误:', error));
```

#### React + TypeScript 请求拦截器示例

在 React + TypeScript 项目中，可以使用 axios 拦截器自动为 API 请求添加 AccessToken：

```typescript
import axios, { AxiosRequestConfig } from 'axios';

// 定义常量
const ACCESS_TOKEN = 'accessToken';

// 创建 axios 实例
const api = axios.create({
  baseURL: 'http://your-domain.com',
  timeout: 10000,
});

// 请求拦截器 - 自动添加 AccessToken
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 发送请求之前做一些处理
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // console.log("accessToken", accessToken);
    if (accessToken && accessToken.length > 10 && config.url?.startsWith("/api")) {
      // token不为空，且长度大于10，说明已经登录，对于授权访问接口，则设置请求头
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理 token 过期等情况
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 过期或无效，清除本地存储的 token
      localStorage.removeItem(ACCESS_TOKEN);
      // 可以在这里重定向到登录页面
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 使用示例
export const ticketAPI = {
  // 获取工单列表
  getTickets: () => api.get('/api/tickets/list'),
  
  // 创建新工单
  createTicket: (data: any) => api.post('/api/tickets/create', data),
  
  // 更新工单
  updateTicket: (id: string, data: any) => api.put(`/api/tickets/${id}`, data),
  
  // 删除工单
  deleteTicket: (id: string) => api.delete(`/api/tickets/${id}`),
};

// 在组件中使用
import React, { useEffect, useState } from 'react';

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await ticketAPI.getTickets();
        setTickets(response.data);
      } catch (error) {
        console.error('获取工单列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      {loading ? (
        <p>加载中...</p>
      ) : (
        <ul>
          {tickets.map((ticket: any) => (
            <li key={ticket.id}>{ticket.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
```

#### cURL 示例

```bash
# 获取工单列表
curl -X GET "http://your-domain.com/api/tickets/list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"

# 创建新工单
curl -X POST "http://your-domain.com/api/tickets/create" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新工单标题",
    "content": "工单内容描述",
    "priority": "medium"
  }'

# 获取用户信息
curl -X GET "http://your-domain.com/api/user/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

#### Python 示例

```python
import requests

def call_bytedesk_api(access_token, endpoint, method='GET', data=None):
    """调用微语 API"""
    url = f"http://your-domain.com/api/{endpoint}"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    if method.upper() == 'GET':
        response = requests.get(url, headers=headers)
    elif method.upper() == 'POST':
        response = requests.post(url, headers=headers, json=data)
    elif method.upper() == 'PUT':
        response = requests.put(url, headers=headers, json=data)
    elif method.upper() == 'DELETE':
        response = requests.delete(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API 调用失败: {response.status_code} - {response.text}")

# 使用示例
access_token = "YOUR_ACCESS_TOKEN"

# 获取工单列表
tickets = call_bytedesk_api(access_token, "tickets/list")
print("工单列表:", tickets)

# 创建新工单
new_ticket_data = {
    "title": "新工单标题",
    "content": "工单内容描述",
    "priority": "medium"
}
result = call_bytedesk_api(access_token, "tickets/create", method="POST", data=new_ticket_data)
print("创建结果:", result)
```

#### 常用 API 端点示例

- **工单管理**: `/api/tickets/*` - 工单的增删改查操作
- **用户管理**: `/api/users/*` - 用户信息管理
- **消息管理**: `/api/messages/*` - 消息发送和查询
- **统计报表**: `/api/statistics/*` - 数据统计和报表
- **系统配置**: `/api/settings/*` - 系统配置管理

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
