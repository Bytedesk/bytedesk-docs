---
sidebar_label: Token
sidebar_position: 27
---

# Token

:::tip 前置條件

- 僅企業版和平台版支援此功能，如需要，請[掃碼聯絡微信](/img/wechat.png)
:::

## 功能簡介

AccessToken 是微語系統提供的第三方登入憑證，主要用於第三方系統整合時避免使用者二次登入。透過 AccessToken，第三方系統可以直接讓使用者登入到微語系統，無需使用者重新輸入使用者名稱和密碼。

![token](/img/develop/admin/token.png)

## 使用場景

- **第三方系統整合**: 當您的系統需要整合微語客服功能時
- **單點登入 (SSO)**: 實現使用者一次登入即可存取多個系統
- **嵌入式應用**: 在您的應用中嵌入微語客服介面
- **API 呼叫**: 透過 AccessToken 進行 API 認證，實現程式化存取微語系統的各項功能

## AccessToken 登入方式

### 1. 取得 AccessToken

在微語管理後台的 Token 管理頁面，可以產生和管理 AccessToken。

### 2. 登入 URL 格式

AccessToken 支援兩種登入方式：

#### 客服工作台登入

```bash
http://伺服器ip/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN
```

#### 管理後台登入

```bash
http://伺服器ip/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN
```

### 3. 完整範例

#### 客服工作台範例

```bash
http://your-domain.com/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

#### 管理後台範例

```bash
http://your-domain.com/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

## 整合範例

### 1. 簡單連結跳轉

#### 客服工作台

```html
<a href="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    開啟客服工作台
</a>
```

#### 管理後台

```html
<a href="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    開啟管理後台
</a>
```

### 2. JavaScript 跳轉

```javascript
// 開啟客服工作台
function openAgentWorkspace(accessToken) {
    const url = `http://your-domain.com/agent/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 開啟管理後台
function openAdminPanel(accessToken) {
    const url = `http://your-domain.com/admin/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// 使用範例
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

#### 管理後台

```html
<iframe 
    src="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
```

### 4. 表單提交

#### 客服工作台

```html
<form action="http://your-domain.com/agent/auth/login" method="GET">
    <input type="hidden" name="accessToken" value="YOUR_ACCESS_TOKEN">
    <button type="submit">登入客服工作台</button>
</form>
```

#### 管理後台

```html
<form action="http://your-domain.com/admin/auth/login" method="GET">
    <input type="hidden" name="accessToken" value="YOUR_ACCESS_TOKEN">
    <button type="submit">登入管理後台</button>
</form>
```

### 5. API 呼叫範例

AccessToken 可以用於呼叫微語系統的各種 API 介面，實現程式化操作。

#### 在請求標頭中使用 AccessToken

```javascript
// JavaScript 範例
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
        throw new Error(`API 呼叫失敗: ${response.status}`);
    }
}

// 使用範例
callBytedeskAPI('YOUR_ACCESS_TOKEN', 'tickets/list')
    .then(data => console.log('工單列表:', data))
    .catch(error => console.error('錯誤:', error));
```

#### React + TypeScript 請求攔截器範例

在 React + TypeScript 專案中，可以使用 axios 攔截器自動為 API 請求新增 AccessToken：

```typescript
import axios, { AxiosRequestConfig } from 'axios';

// 定義常數
const ACCESS_TOKEN = 'accessToken';

// 建立 axios 實例
const api = axios.create({
  baseURL: 'http://your-domain.com',
  timeout: 10000,
});

// 請求攔截器 - 自動新增 AccessToken
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 發送請求之前做一些處理
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // console.log("accessToken", accessToken);
    if (accessToken && accessToken.length > 10 && config.url?.startsWith("/api")) {
      // token不為空，且長度大於10，說明已經登入，對於授權存取介面，則設定請求標頭
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器 - 處理 token 過期等情況
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token 過期或無效，清除本地儲存的 token
      localStorage.removeItem(ACCESS_TOKEN);
      // 可以在這裡重新導向到登入頁面
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 使用範例
export const ticketAPI = {
  // 取得工單列表
  getTickets: () => api.get('/api/tickets/list'),
  
  // 建立新工單
  createTicket: (data: any) => api.post('/api/tickets/create', data),
  
  // 更新工單
  updateTicket: (id: string, data: any) => api.put(`/api/tickets/${id}`, data),
  
  // 刪除工單
  deleteTicket: (id: string) => api.delete(`/api/tickets/${id}`),
};

// 在元件中使用
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
        console.error('取得工單列表失敗:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      {loading ? (
        <p>載入中...</p>
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

#### cURL 範例

```bash
# 取得工單列表
curl -X GET "http://your-domain.com/api/tickets/list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"

# 建立新工單
curl -X POST "http://your-domain.com/api/tickets/create" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新工單標題",
    "content": "工單內容描述",
    "priority": "medium"
  }'

# 取得使用者資訊
curl -X GET "http://your-domain.com/api/user/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

#### Python 範例

```python
import requests

def call_bytedesk_api(access_token, endpoint, method='GET', data=None):
    """呼叫微語 API"""
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
        raise Exception(f"API 呼叫失敗: {response.status_code} - {response.text}")

# 使用範例
access_token = "YOUR_ACCESS_TOKEN"

# 取得工單列表
tickets = call_bytedesk_api(access_token, "tickets/list")
print("工單列表:", tickets)

# 建立新工單
new_ticket_data = {
    "title": "新工單標題",
    "content": "工單內容描述",
    "priority": "medium"
}
result = call_bytedesk_api(access_token, "tickets/create", method="POST", data=new_ticket_data)
print("建立結果:", result)
```

#### 常用 API 端點範例

- **工單管理**: `/api/tickets/*` - 工單的增刪改查操作
- **使用者管理**: `/api/users/*` - 使用者資訊管理
- **訊息管理**: `/api/messages/*` - 訊息發送和查詢
- **統計報表**: `/api/statistics/*` - 資料統計和報表
- **系統配置**: `/api/settings/*` - 系統配置管理

## 安全注意事項

1. **Token 保護**: AccessToken 具有登入權限，請妥善保管，不要洩露給他人
2. **HTTPS 傳輸**: 建議在生產環境中使用 HTTPS 協定傳輸 AccessToken
3. **Token 有效期**: 注意 AccessToken 的有效期，過期需要重新產生
4. **網域限制**: 可以在管理後台設定 Token 的允許存取網域，確保安全性
5. **定期更新**: 建議定期更新 AccessToken 以提高安全性

## 錯誤處理

### 常見錯誤及解決方案

1. **Token 無效**
   - 檢查 AccessToken 是否正確
   - 確認 Token 是否已過期
   - 驗證 Token 是否被禁用

2. **存取被拒絕**
   - 檢查當前網域是否在允許列表中
   - 確認 Token 的權限設定

3. **登入失敗**
   - 檢查伺服器地址是否正確
   - 確認網路連線正常

## 相關文檔

- [客服端開發文檔](./agent.md) - 了解客服工作台整合功能和iframe通訊
- [管理後台開發文檔](./admin.md) - 了解管理後台功能和整合方式
