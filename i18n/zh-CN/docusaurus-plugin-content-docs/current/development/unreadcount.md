---
sidebar_label: 未读消息
sidebar_position: 13
---

# 未读消息数对接

本页面介绍如何在您的应用中集成微语客服系统的未读消息计数功能，实时显示用户未读的客服消息数量，帮助提升用户体验和消息阅读率。

- 演示链接：[未读消息数对接演示](https://weiyuai.cn/reactdemo)
<!-- - H5链接演示：[H5未读消息数对接](https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid) -->
- 演示代码：
- [未读消息数对接示例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/unreadCountDemo.tsx)
- [未读消息数对接示例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/unreadCountDemo.vue)

> 注意：请确保您已经完成了[React集成指南](../channel/react.md)或[Vue集成指南](../channel/vue.md)中的基本功能对接，才能继续进行未读消息数对接。

![未读消息数对接示例](/img/develop/chat/unread_count.png)

## 为什么需要未读消息数对接？

在现代应用中，实时显示未读消息数是提升用户体验的重要功能，它可以：

- 提醒用户有新的客服消息需要查看
- 增加用户回复消息的可能性，提高沟通效率
- 减少用户错过重要消息的几率
- 提升应用的专业性和完整性
- 为用户提供更好的消息管理体验

## 未读消息数功能实现

微语客服系统提供了简单易用的API来获取和管理未读消息数，主要包括三个核心方法：

1. `getUnreadMessageCount()`: 获取当前未读消息数
2. `clearMessageUnread()`: 将所有消息标记为已读
<!-- 3. 订阅未读消息数变化事件（通过钩子函数实现） -->

### 基本用法

#### 1. 获取未读消息数

您可以使用`getUnreadMessageCount()`方法随时获取当前用户的未读消息数：

```javascript
// 获取未读消息数
window.bytedesk?.getUnreadMessageCount().then((count) => {
  console.log('当前未读消息数：', count);
  // 更新您的UI显示
  setUnreadCount(count);
});
```

#### 2. 标记所有消息为已读

当用户查看了所有消息，或者您需要手动重置未读消息数时，可以使用`clearMessageUnread()`方法：

```javascript
// 标记所有消息为已读
window.bytedesk?.clearMessageUnread().then((count) => {
  console.log('所有消息已标记为已读:', count);
  // 更新UI显示
  setUnreadCount(0);
});
```

## React组件集成示例

以下是在React应用中集成未读消息数功能的完整示例：

```jsx
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

const UnreadCountDemo = () => {
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [config] = useState<BytedeskConfig>({
        placement: 'bottom-right',
        marginBottom: 20,
        marginSide: 20,
        autoPopup: false,
        draggable: true,
        chatConfig: {
            org: 'df_org_uid',
            t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
            sid: 'df_wg_uid',
            // 自定义用户信息
            uid: 'visitor_001',
            nickname: '访客小明',
            avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        },
        theme: {
            mode: 'light',
        },
        locale: 'zh-cn',
        // 添加 onVisitorInfo 回调
        onVisitorInfo: (uid: string, visitorUid: string) => {
            // uid 是系统自动生成访客uid，visitorUid 是前端自定义访客uid
            console.log('收到访客信息:', { uid, visitorUid });
        },
    });

    const handleInit = () => {
        console.log('BytedeskReact initialized');
    };

    useEffect(() => {
        // 默认初始化未读消息数
        (window as any).bytedesk?.getUnreadMessageCount().then((count: number) => {
            console.log('刷新后未读消息数：', count);
            setUnreadCount(count);
        });

        // 组件卸载时清除监听器
        return () => {
            if ((window as any).bytedesk) {
                // 清除事件监听
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>微语未读消息计数示例</h1>
            
            <div style={{ 
                marginTop: '20px', 
                marginBottom: '20px', 
                padding: '20px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px' 
            }}>
                <h2>当前未读消息数: <span style={{ color: '#ff4d4f' }}>{unreadCount}</span></h2>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                    onClick={() => (window as any).bytedesk?.showChat()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2e88ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    打开聊天
                </button>
                <button 
                    onClick={() => {
                        (window as any).bytedesk?.clearMessageUnread().then((count: number) => {
                            console.log('所有消息已标记为已读:', count);
                            setUnreadCount(count); // 重置未读消息数
                        });
                    }}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#52c41a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    标记所有消息为已读
                </button>
                <button 
                    onClick={() => {
                        (window as any).bytedesk?.getUnreadMessageCount().then((count: number) => {
                            console.log('刷新后未读消息数：', count);
                            setUnreadCount(count);
                        });
                    }}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#722ed1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    刷新未读消息数
                </button>
            </div>
            
            <BytedeskReact 
                {...config} 
                onInit={handleInit} 
            />
        </div>
    );
};

export default UnreadCountDemo;
```

## 在应用导航栏显示未读消息数

在实际应用中，常见的做法是在网站或APP的导航栏显示未读消息数，以下是一个简单的实现示例：

```jsx
import React, { useState, useEffect } from 'react';

function NavBar() {
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    // 初始化时获取未读消息数
    if (window.bytedesk) {
      window.bytedesk.getUnreadMessageCount().then((count) => {
        setUnreadCount(count);
      });
      
      // 可以在应用加载后定期检查未读消息（可选）
      const interval = setInterval(() => {
        window.bytedesk.getUnreadMessageCount().then((count) => {
          setUnreadCount(count);
        });
      }, 60000); // 每分钟检查一次
      
      return () => clearInterval(interval);
    }
  }, []);
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">我的应用</div>
      <div className="navbar-menu">
        <div className="navbar-item">首页</div>
        <div className="navbar-item">产品</div>
        <div className="navbar-item">
          消息
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>
        <div className="navbar-item">设置</div>
      </div>
    </nav>
  );
}

export default NavBar;
```

## API 参考

### 1. getUnreadMessageCount()

获取当前用户未读消息总数。

**返回值**：Promise&lt;number&gt; - 未读消息数量

**示例**：

```javascript
window.bytedesk?.getUnreadMessageCount().then((count) => {
  console.log('当前未读消息数：', count);
});
```

### 2. clearMessageUnread()

将所有消息标记为已读，重置未读计数为0。

**返回值**：Promise&lt;number&gt; - 重置后的未读消息数量（应为0）

**示例**：

```javascript
window.bytedesk?.clearMessageUnread().then((count) => {
  console.log('所有消息已标记为已读，当前未读数：', count);
});
```

## 最佳实践

### 1. 未读消息数展示

- **适当位置**：在导航栏、标签页或固定位置显示未读计数
- **醒目样式**：使用红色或其他醒目的颜色展示未读数
- **数字限制**：当未读数超过一定数量（如99）时，可显示为"99+"
- **自动刷新**：定期自动刷新未读计数（建议间隔不少于30秒）

### 2. 用户体验优化

- **即时更新**：当用户打开聊天窗口并阅读消息后，及时更新未读计数
- **通知提醒**：结合浏览器通知API，在用户允许的情况下发送新消息通知
- **声音提示**：可为重要消息添加声音提示（需考虑用户偏好设置）
- **自定义控制**：允许用户自行控制是否显示未读计数及通知方式

### 3. 性能考量

- **避免频繁查询**：不要过于频繁地调用API检查未读消息数
- **缓存策略**：可适当缓存未读计数，减少请求次数
- **错误处理**：妥善处理API请求失败的情况，避免影响用户体验

## 常见问题

### Q1: 未读消息数不会自动更新，如何解决？

**A**: 目前未读消息数需要手动调用API获取。您可以：

1. 在应用初始化时获取一次未读消息数
2. 设置定时器定期刷新（如每1-5分钟）
3. 在用户打开聊天窗口后、关闭聊天窗口前分别获取一次

### Q2: 如何在多个标签页之间同步未读消息状态？

**A**: 对于多标签页场景，您可以：

1. 使用LocalStorage事件机制在标签页间通信
2. 每个标签页独立定期获取最新未读消息数
3. 当一个标签页中调用了`clearMessageUnread()`方法后，可以通过LocalStorage通知其他标签页更新状态

示例代码：

```javascript
// 在标记已读后广播给其他标签页
window.bytedesk?.clearMessageUnread().then(() => {
  localStorage.setItem('bytedesk_unread_update', Date.now().toString());
});

// 在其他标签页监听变化
window.addEventListener('storage', (e) => {
  if (e.key === 'bytedesk_unread_update') {
    window.bytedesk?.getUnreadMessageCount().then((count) => {
      setUnreadCount(count);
    });
  }
});
```

### Q3: 是否可以获取特定会话的未读消息数？

**A**: 当前版本API主要提供总未读消息数。如需更细粒度控制，建议：

1. 使用`getUnreadMessageCount()`获取总未读数
2. 在应用中自行记录用户阅读特定会话的状态
<!-- 3. 联系微语客服技术支持，了解未来可能提供的更细粒度API -->

### Q4: 未读消息数显示异常怎么办？

**A**: 如果遇到未读消息数显示异常，可尝试以下解决方案：

1. 确认您的应用与微语客服系统连接正常
2. 检查用户登录状态是否一致
3. 手动调用`getUnreadMessageCount()`刷新计数
4. 必要时可调用`clearMessageUnread()`重置计数

### Q5: 如何使用纯API实现获取访客的未读消息数？

- 首先获取当前访客uid，可以从localStorage.getItem('VISITOR_STORE')中获取访客信息，并从json中解析currentVisitor并获取uid

```javascript
// 获取访客信息
const visitorInfo = localStorage.getItem('VISITOR_STORE');
const currentVisitor = JSON.parse(visitorInfo).state.currentVisitor;
const visitorUid = currentVisitor.uid; // 获取访客uid
```

![获取访客uid](/img/develop/chat/unread_count_uid.png)

- 调用API获取未读消息数. 代码实例

```javascript
// 请求地址示例：请将127.0.0.1:9003替换为您的微语客服系统地址
http://127.0.0.1:9003/visitor/api/v1/message/unread/count?uid=1678201721979008
// 返回结果示例：
{
    message: "get unread messages count success",
    code: 200,
    data: 10 // 未读消息数
}
```

- 参考[API接口代码](https://github.com/Bytedesk/bytedesk-web/blob/master/src/apis/message.ts)
- 注：访客端匿名用户，无需token，只需要uid即可。如需登录用户授权，请联系微语客服。

## 小结

未读消息数对接是提升用户体验的重要功能，通过实时显示未读消息计数，可以有效提醒用户及时查看客服消息，提高沟通效率。微语客服系统提供了简单易用的API，帮助开发者轻松实现未读消息数管理功能。通过遵循本文提供的最佳实践，您可以为用户打造更加完善的消息通知体验。
