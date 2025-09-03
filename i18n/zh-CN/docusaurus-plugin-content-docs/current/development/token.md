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

#### 方式一：通过管理后台生成

在微语管理后台的 Token 管理页面，可以生成和管理 AccessToken。

#### 方式二：通过登录接口获取

您也可以通过调用登录接口来获取 AccessToken，这种方式适用于程序化获取 Token 的场景。

##### 接口说明

- **接口地址**: `/auth/v1/login`
- **请求方法**: `POST`
- **内容类型**: `application/json`

##### TypeScript 类型定义

```typescript
// 登录参数类型
interface LoginParams {
  username?: string;
  password?: string;
  passwordHash?: string; // 哈希后的密码
  passwordSalt?: string; // 盐值
  captchaUid?: string;
  captchaCode?: string;
  deviceUid?: string;
  channel?: string;
  platform: string;
}

// 登录返回结果类型
interface LoginResult {
  message: string;
  code: number;
  data: {
    accessToken?: string;
    user?: any;
  };
}
```

##### 使用示例

```typescript
import axios from 'axios';

// 配置登录参数
const loginInfo: LoginParams = {
  username: 'your_username',
  password: 'your_password',
  channel: 'FLUTTER',
  platform: 'BYTEDESK'
};

// 登录接口封装
export async function login(params: LoginParams): Promise<LoginResult> {
  try {
    const response = await axios.post<LoginResult>('/auth/v1/login', {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

// 获取 AccessToken
async function getAccessToken() {
  try {
    const result = await login(loginInfo);
    
    if (result.code === 200 && result.data.accessToken) {
      const accessToken = result.data.accessToken;
      console.log('获取到 AccessToken:', accessToken);
      
      // 使用 AccessToken 进行后续操作
      return accessToken;
    } else {
      console.error('登录失败:', result.message);
      return null;
    }
  } catch (error) {
    console.error('获取 AccessToken 失败:', error);
    return null;
  }
}

// 完整示例：获取 Token 并跳转到系统
async function loginAndRedirect() {
  const accessToken = await getAccessToken();
  
  if (accessToken) {
    // 使用获取到的 AccessToken 跳转到系统
    const chatUrl = `http://127.0.0.1:9005/agent/chat?accessToken=${accessToken}`;
    window.open(chatUrl, '_blank');
  }
}
```

##### 注意事项

1. **安全性**: 请勿在前端代码中硬编码用户名和密码
2. **错误处理**: 需要正确处理登录失败的情况
3. **Token 缓存**: 可以将获取到的 AccessToken 缓存起来重复使用
4. **有效期**: 注意 AccessToken 的有效期，过期后需要重新获取

### 任意路径登录优势起见，建议及时撤销使其失效。系统提供了两种撤销方式：

### 方式一：通过管理后台撤销

在微语管理后台的 Token 管理页面，可以手动撤销指定的 AccessToken，使其立即失效。

### 方式二：通过登出接口撤销

您也可以通过调用登出接口来撤销当前的 AccessToken，这种方式适用于程序化撤销 Token 的场景。

#### 接口说明

- **接口地址**: `/api/v1/user/logout`
- **请求方法**: `POST`
- **认证方式**: Bearer Token（在请求头中设置 AccessToken）

#### TypeScript 类型定义

```typescript
// 登出返回结果类型
interface LogoutResult {
  message: string;
  code: number;
  data: boolean;
}
```

#### 使用示例

```typescript
import axios from 'axios';

// 配置 axios 实例
const request = axios.create({
  baseURL: 'http://your-domain.com', // 替换为实际的服务器地址
  timeout: 10000,
});

// 登出接口封装
export async function logout(accessToken: string): Promise<LogoutResult> {
  try {
    const response = await request.post<LogoutResult>('/api/v1/user/logout', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('登出失败:', error);
    throw error;
  }
}

// 撤销 AccessToken 示例
async function revokeAccessToken(accessToken: string) {
  try {
    const result = await logout(accessToken);
    
    if (result.code === 200 && result.data === true) {
      console.log('AccessToken 撤销成功:', result.message);
      
      // 清除本地存储的 Token
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      
      return true;
    } else {
      console.error('AccessToken 撤销失败:', result.message);
      return false;
    }
  } catch (error) {
    console.error('撤销 AccessToken 失败:', error);
    return false;
  }
}

// 完整示例：撤销 Token 并重定向
async function logoutAndRedirect(accessToken: string) {
  const success = await revokeAccessToken(accessToken);
  
  if (success) {
    // 撤销成功后重定向到登录页面
    window.location.href = '/login';
  }
}
```

#### 请求拦截器配置示例

如果您使用 axios 拦截器统一处理认证头，可以参考以下配置：

```typescript
import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  baseURL: 'http://your-domain.com',
  timeout: 10000,
});

// 请求拦截器：自动添加 Authorization 头
request.interceptors.request.use(
  (config) => {
    // 从存储中获取 AccessToken
    const accessToken = localStorage.getItem('accessToken') || 
                       sessionStorage.getItem('accessToken');
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理 Token 失效
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 如果返回 401，说明 Token 已失效
    if (error.response?.status === 401) {
      // 清除失效的 Token
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      
      // 重定向到登录页面
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// 使用拦截器配置后的登出接口
export async function logout(): Promise<LogoutResult> {
  try {
    const response = await request.post<LogoutResult>('/api/v1/user/logout');
    return response.data;
  } catch (error) {
    console.error('登出失败:', error);
    throw error;
  }
}
```

#### 注意事项

1. **认证头格式**: 必须使用 `Bearer ${accessToken}` 格式设置 Authorization 头
2. **Token 清理**: 撤销成功后应及时清除本地存储的 Token
3. **错误处理**: 需要正确处理网络错误和服务器返回的错误
4. **安全性**: 撤销 Token 后应引导用户重新登录
5. **状态管理**: 在单页应用中注意更新应用的登录状态

## 使用场景

- **第三方系统集成**: 当您的系统需要集成微语客服功能时
- **单点登录 (SSO)**: 实现用户一次登录即可访问多个系统
- **嵌入式应用**: 在您的应用中嵌入微语客服界面
- **API 调用**: 通过 AccessToken 进行 API 认证，实现程序化访问微语系统的各项功能

## AccessToken 登录方式

### 1. 获取 AccessToken

#### 方式一：通过管理后台生成

在微语管理后台的 Token 管理页面，可以生成和管理 AccessToken。

![token](/img/develop/admin/token.png)

#### 方式二：通过登录接口获取

您也可以通过调用登录接口来获取 AccessToken，这种方式适用于程序化获取 Token 的场景。

##### 接口说明

- **接口地址**: `/auth/v1/login` （请根据实际部署的域名/ip进行替换, 例如: `http://127.0.0.1:9003/auth/v1/login`）
- **请求方法**: `POST`
- **内容类型**: `application/json`

##### TypeScript 类型定义

```typescript
// 登录参数类型
interface LoginParams {
  username?: string;
  password?: string;
  channel?: string;
  platform: string;
}

// 登录返回结果类型
interface LoginResult {
  message: string;
  code: number;
  data: {
    accessToken?: string;
    user?: any;
  };
}
```

##### 使用示例

```typescript
import axios from 'axios';

// 配置登录参数
const loginInfo: LoginParams = {
  username: 'your_username',
  password: 'your_password',
  channel: 'FLUTTER', // 固定写死，不能修改
  platform: 'BYTEDESK' // 固定写死，不能修改
};

// 登录接口封装
export async function login(params: LoginParams): Promise<LoginResult> {
  try {
    const response = await axios.post<LoginResult>('/auth/v1/login', {
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
}

// 获取 AccessToken
async function getAccessToken() {
  try {
    const result = await login(loginInfo);
    
    if (result.code === 200 && result.data.accessToken) {
      const accessToken = result.data.accessToken;
      console.log('获取到 AccessToken:', accessToken);
      
      // 使用 AccessToken 进行后续操作
      return accessToken;
    } else {
      console.error('登录失败:', result.message);
      return null;
    }
  } catch (error) {
    console.error('获取 AccessToken 失败:', error);
    return null;
  }
}

// 完整示例：获取 Token 并跳转到系统
async function loginAndRedirect() {
  const accessToken = await getAccessToken();
  
  if (accessToken) {
    // 使用获取到的 AccessToken 跳转到系统
    const chatUrl = `http://127.0.0.1:9005/agent/chat?accessToken=${accessToken}`;
    window.open(chatUrl, '_blank');
  }
}
```

##### 注意事项

1. **安全性**: 请勿在前端代码中硬编码用户名和密码
2. **错误处理**: 需要正确处理登录失败的情况
3. **Token 缓存**: 可以将获取到的 AccessToken 缓存起来重复使用
4. **有效期**: 注意 AccessToken 的有效期，过期后需要重新获取

### 任意路径登录优势

AccessToken 支持任意路径登录，这意味着您可以直接跳转到系统的任何页面，而不仅限于登录页面。这种方式的优势包括：

- **提升用户体验**: 用户可以直接跳转到需要的功能页面，无需额外的导航步骤
- **简化集成流程**: 第三方系统可以直接链接到具体功能模块
- **减少页面跳转**: 避免先跳转到登录页面再跳转到目标页面的多余步骤
- **精确定位**: 可以将用户直接带到相关的工作页面，提高工作效率

### 2. 登录 URL 格式

AccessToken 支持两种登录方式，并且支持任意路径登录：

#### 客服工作台登录

```bash
# 标准登录页面
http://服务器ip/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN

# 任意路径登录（推荐）
http://服务器ip/agent/chat?accessToken=YOUR_ACCESS_TOKEN
http://服务器ip/agent/ticket?accessToken=YOUR_ACCESS_TOKEN
http://服务器ip/agent/任意路径?accessToken=YOUR_ACCESS_TOKEN
```

#### 管理后台登录

```bash
# 标准登录页面
http://服务器ip/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN

# 任意路径登录（推荐）
http://服务器ip/admin/welcome?accessToken=YOUR_ACCESS_TOKEN
http://服务器ip/admin/dashboard?accessToken=YOUR_ACCESS_TOKEN
http://服务器ip/admin/任意路径?accessToken=YOUR_ACCESS_TOKEN
```

### 3. 完整示例

#### 客服工作台示例

```bash
# 标准登录页面
http://your-domain.com/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9...

# 聊天页面直接登录
http://127.0.0.1:9005/agent/chat?accessToken=eyJhbGciOiJIUzM4NCJ9...

# 工单页面直接登录
http://127.0.0.1:9005/agent/ticket?accessToken=eyJhbGciOiJIUzM4NCJ9...
```

#### 管理后台示例

```bash
# 标准登录页面
http://your-domain.com/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9...

# 欢迎页面直接登录
http://127.0.0.1:9004/admin/welcome?accessToken=eyJhbGciOiJIUzM4NCJ9...

# 仪表盘页面直接登录
http://127.0.0.1:9004/admin/dashboard?accessToken=eyJhbGciOiJIUzM4NCJ9...
```

## 集成示例

### 1. 简单链接跳转

#### 客服工作台

```html
<!-- 标准登录页面 -->
<a href="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开客服工作台
</a>

<!-- 直接跳转到聊天页面 -->
<a href="http://127.0.0.1:9005/agent/chat?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开客服聊天页面
</a>

<!-- 直接跳转到工单页面 -->
<a href="http://127.0.0.1:9005/agent/ticket?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开客服工单页面
</a>
```

#### 管理后台

```html
<!-- 标准登录页面 -->
<a href="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开管理后台
</a>

<!-- 直接跳转到欢迎页面 -->
<a href="http://127.0.0.1:9004/admin/welcome?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开管理后台欢迎页
</a>

<!-- 直接跳转到仪表盘 -->
<a href="http://127.0.0.1:9004/admin/dashboard?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    打开管理后台仪表盘
</a>
```

### 2. JavaScript 跳转

```javascript
// 打开客服工作台（标准登录）
function openAgentWorkspace(accessToken) {
    const url = `http://your-domain.com/agent/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 打开客服聊天页面（任意路径登录）
function openAgentChat(accessToken) {
    const url = `http://127.0.0.1:9005/agent/chat?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 打开客服工单页面（任意路径登录）
function openAgentTicket(accessToken) {
    const url = `http://127.0.0.1:9005/agent/ticket?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 打开管理后台（标准登录）
function openAdminPanel(accessToken) {
    const url = `http://your-domain.com/admin/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 打开管理后台欢迎页（任意路径登录）
function openAdminWelcome(accessToken) {
    const url = `http://127.0.0.1:9004/admin/welcome?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 打开管理后台仪表盘（任意路径登录）
function openAdminDashboard(accessToken) {
    const url = `http://127.0.0.1:9004/admin/dashboard?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 使用示例
const accessToken = 'YOUR_ACCESS_TOKEN';
openAgentChat(accessToken);        // 直接打开聊天页面
openAgentTicket(accessToken);      // 直接打开工单页面
openAdminWelcome(accessToken);     // 直接打开管理后台欢迎页
openAdminDashboard(accessToken);   // 直接打开管理后台仪表盘
```

### 3. iframe 嵌入

#### 客服工作台

```html
<!-- 标准登录页面 -->
<iframe 
    src="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>

<!-- 直接嵌入聊天页面 -->
<iframe 
    src="http://127.0.0.1:9005/agent/chat?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>

<!-- 直接嵌入工单页面 -->
<iframe 
    src="http://127.0.0.1:9005/agent/ticket?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
```

#### 管理后台

```html
<!-- 标准登录页面 -->
<iframe 
    src="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>

<!-- 直接嵌入欢迎页面 -->
<iframe 
    src="http://127.0.0.1:9004/admin/welcome?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>

<!-- 直接嵌入仪表盘 -->
<iframe 
    src="http://127.0.0.1:9004/admin/dashboard?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
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
