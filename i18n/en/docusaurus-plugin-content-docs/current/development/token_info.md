---
sidebar_label: Token
sidebar_position: 27
---

# Token

:::tip Prerequisites

- Only Enterprise Edition and Platform Edition support this feature. If needed, please [scan QR code to contact WeChat](/img/wechat.png)
:::

## Feature Introduction

AccessToken is a third-party login credential provided by the Weiyu system, mainly used to avoid secondary login when integrating with third-party systems. Through AccessToken, third-party systems can directly allow users to log in to the Weiyu system without requiring users to re-enter their username and password.

![token](/img/develop/admin/token.png)

## Use Cases

- **Third-party System Integration**: When your system needs to integrate Weiyu customer service functionality
- **Single Sign-On (SSO)**: Enable users to access multiple systems with one login
- **Embedded Applications**: Embed Weiyu customer service interface in your application
- **API Calls**: Use AccessToken for API authentication to enable programmatic access to various Weiyu system features

## AccessToken Login Methods

### 1. Get AccessToken

In the Weiyu admin backend Token management page, you can generate and manage AccessToken.

### 2. Login URL Format

AccessToken supports two login methods:

#### Customer Service Workstation Login

```bash
http://server-ip/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN
```

#### Admin Backend Login

```bash
http://server-ip/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN
```

### 3. Complete Examples

#### Customer Service Workstation Example

```bash
http://your-domain.com/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

#### Admin Backend Example

```bash
http://your-domain.com/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```

## Integration Examples

### 1. Simple Link Redirect

#### Customer Service Workstation

```html
<a href="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    Open Customer Service Workstation
</a>
```

#### Admin Backend

```html
<a href="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN" target="_blank">
    Open Admin Backend
</a>
```

### 2. JavaScript Redirect

```javascript
// Open customer service workstation
function openAgentWorkspace(accessToken) {
    const url = `http://your-domain.com/agent/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// Open admin backend
function openAdminPanel(accessToken) {
    const url = `http://your-domain.com/admin/auth/login?accessToken=${accessToken}`;
    window.open(url, '_blank');
}

// Usage example
openAgentWorkspace('YOUR_ACCESS_TOKEN');
openAdminPanel('YOUR_ACCESS_TOKEN');
```

### 3. iframe Embedding

#### Customer Service Workstation

```html
<iframe 
    src="http://your-domain.com/agent/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
```

#### Admin Backend

```html
<iframe 
    src="http://your-domain.com/admin/auth/login?accessToken=YOUR_ACCESS_TOKEN"
    width="100%" 
    height="600px"
    frameborder="0">
</iframe>
```

### 4. Form Submission

#### Customer Service Workstation

```html
<form action="http://your-domain.com/agent/auth/login" method="GET">
    <input type="hidden" name="accessToken" value="YOUR_ACCESS_TOKEN">
    <button type="submit">Login to Customer Service Workstation</button>
</form>
```

#### Admin Backend

```html
<form action="http://your-domain.com/admin/auth/login" method="GET">
    <input type="hidden" name="accessToken" value="YOUR_ACCESS_TOKEN">
    <button type="submit">Login to Admin Backend</button>
</form>
```

### 5. API Call Examples

AccessToken can be used to call various API interfaces of the Weiyu system to enable programmatic operations.

#### Using AccessToken in Request Headers

```javascript
// JavaScript example
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
        throw new Error(`API call failed: ${response.status}`);
    }
}

// Usage example
callBytedeskAPI('YOUR_ACCESS_TOKEN', 'tickets/list')
    .then(data => console.log('Ticket list:', data))
    .catch(error => console.error('Error:', error));
```

#### React + TypeScript Request Interceptor Example

In React + TypeScript projects, you can use axios interceptors to automatically add AccessToken to API requests:

```typescript
import axios, { AxiosRequestConfig } from 'axios';

// Define constants
const ACCESS_TOKEN = 'accessToken';

// Create axios instance
const api = axios.create({
  baseURL: 'http://your-domain.com',
  timeout: 10000,
});

// Request interceptor - automatically add AccessToken
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Do some processing before sending the request
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // console.log("accessToken", accessToken);
    if (accessToken && accessToken.length > 10 && config.url?.startsWith("/api")) {
      // Token is not empty and length is greater than 10, indicating already logged in, for authorized access interfaces, set request headers
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiration and other situations
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear locally stored token
      localStorage.removeItem(ACCESS_TOKEN);
      // Can redirect to login page here
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Usage example
export const ticketAPI = {
  // Get ticket list
  getTickets: () => api.get('/api/tickets/list'),
  
  // Create new ticket
  createTicket: (data: any) => api.post('/api/tickets/create', data),
  
  // Update ticket
  updateTicket: (id: string, data: any) => api.put(`/api/tickets/${id}`, data),
  
  // Delete ticket
  deleteTicket: (id: string) => api.delete(`/api/tickets/${id}`),
};

// Use in components
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
        console.error('Failed to get ticket list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
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

#### cURL Examples

```bash
# Get ticket list
curl -X GET "http://your-domain.com/api/tickets/list" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"

# Create new ticket
curl -X POST "http://your-domain.com/api/tickets/create" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Ticket Title",
    "content": "Ticket content description",
    "priority": "medium"
  }'

# Get user information
curl -X GET "http://your-domain.com/api/user/profile" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

#### Python Example

```python
import requests

def call_bytedesk_api(access_token, endpoint, method='GET', data=None):
    """Call Weiyu API"""
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
        raise Exception(f"API call failed: {response.status_code} - {response.text}")

# Usage example
access_token = "YOUR_ACCESS_TOKEN"

# Get ticket list
tickets = call_bytedesk_api(access_token, "tickets/list")
print("Ticket list:", tickets)

# Create new ticket
new_ticket_data = {
    "title": "New Ticket Title",
    "content": "Ticket content description",
    "priority": "medium"
}
result = call_bytedesk_api(access_token, "tickets/create", method="POST", data=new_ticket_data)
print("Creation result:", result)
```

#### Common API Endpoint Examples

- **Ticket Management**: `/api/tickets/*` - CRUD operations for tickets
- **User Management**: `/api/users/*` - User information management
- **Message Management**: `/api/messages/*` - Message sending and querying
- **Statistics Reports**: `/api/statistics/*` - Data statistics and reports
- **System Configuration**: `/api/settings/*` - System configuration management

## Security Considerations

1. **Token Protection**: AccessToken has login permissions, please keep it safe and do not share it with others
2. **HTTPS Transmission**: It is recommended to use HTTPS protocol to transmit AccessToken in production environments
3. **Token Validity Period**: Pay attention to the validity period of AccessToken, it needs to be regenerated after expiration
4. **Domain Restrictions**: You can set the allowed access domains for Token in the admin backend to ensure security
5. **Regular Updates**: It is recommended to regularly update AccessToken to improve security

## Error Handling

### Common Errors and Solutions

1. **Invalid Token**
   - Check if the AccessToken is correct
   - Confirm if the Token has expired
   - Verify if the Token has been disabled

2. **Access Denied**
   - Check if the current domain is in the allowed list
   - Confirm the Token's permission settings

3. **Login Failed**
   - Check if the server address is correct
   - Confirm the network connection is normal

## Related Documentation

- [Customer Service Development Documentation](./agent.md) - Learn about customer service workstation integration features and iframe communication
- [Admin Backend Development Documentation](./admin.md) - Learn about admin backend features and integration methods
