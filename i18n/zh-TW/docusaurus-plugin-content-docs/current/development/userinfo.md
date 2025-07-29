---
sidebar_label: 使用者資訊
sidebar_position: 5
---

# 使用者資訊對接

本頁面介紹如何將業務系統中的使用者資訊對接到微語客服系統，以實現使用者身份識別和個人化服務。

- 演示連結：[使用者資訊對接演示](https://weiyuai.cn/reactdemo)
- 演示程式碼：
- [使用者資訊對接範例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/userInfoDemo.tsx)
- [使用者資訊對接範例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/userInfoDemo.vue)

> 注意：請確保您已經完成了[React整合指南](../channel/react.md)或[Vue整合指南](../channel/vue.md)中的基本功能對接，才能繼續進行使用者資訊對接。

![使用者資訊對接範例](/img/develop/chat/userinfo.png)

## 為什麼需要使用者資訊對接？

在實際業務場景中，您可能希望：

- 在客服系統中識別已登入的使用者身份
- 展示使用者的真實頭像和暱稱
- 記錄使用者的聊天歷史
- 關聯業務系統中的使用者資料
- 為不同使用者提供個人化的客服體驗

透過使用者資訊對接，可以幫助客服人員更好地了解使用者情況，提供更精準的服務。

## 對接方法

微語客服系統支援透過配置參數傳入使用者資訊。在初始化客服元件時，透過`chatConfig`配置項傳入使用者相關資訊。

### 核心參數

以下是使用者資訊對接的核心參數：

```javascript
chatConfig: {
  // 必填參數
  org: 'df_org_uid',        // 您的組織ID
  t: "1",                   // 會話類型
  sid: 'df_wg_uid',         // 會話ID
  
  // 使用者資訊參數 - 這些是使用者資訊對接的關鍵
  visitorUid: 'visitor_001',       // 使用者唯一ID，建議使用您業務系統中的使用者ID
  nickname: '訪客小明',     // 使用者暱稱
  avatar: 'https://example.com/avatar.jpg', // 使用者頭像URL
  mobile: '13800000000',    // 使用者手機號
  email: 'user@example.com', // 使用者郵箱
  note: '備註資訊',        // 使用者備註
  
  // 自訂欄位，可以傳遞任何附加資訊（JSON字串）
  extra: JSON.stringify({
    userType: 'vip',        // 例如：使用者類型
    registerTime: '2025-01-01', // 例如：註冊時間
    // 任何其他您希望傳遞的資訊
  })
}
```

### 完整範例程式碼

下面是一個完整的使用者資訊對接範例，演示了如何根據不同使用者切換身份資訊：

```jsx
import { useState } from 'react';
import { Button, Card, Typography, Space, Avatar } from 'antd';
import { BytedeskReact } from 'bytedesk-web/react';
import type { BytedeskConfig } from 'bytedesk-web';

const { Title, Paragraph } = Typography;

// 定義使用者資訊介面
interface UserInfo {
    visitorUid: string;
    nickname: string;
    avatar: string;
    mobile?: string; // 可選欄位，根據需要新增
    email?: string; // 可選欄位，根據需要新增
    note?: string; // 可選欄位，根據需要新增
}

// 定義兩個測試使用者
const TEST_USERS = [
    {
        visitorUid: 'visitor_001',
        nickname: '訪客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        mobile: '13800000000',
        email: 'user@example.com',
        note: '備註資訊'
    },
    {
        visitorUid: 'visitor_002',
        nickname: '訪客小紅',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
        mobile: '13800000001',
        email: 'user2@example.com',
        note: '備註資訊'
    }
];

const UserInfoDemo = () => {
    // 當前選中的使用者資訊
    const [currentUser, setCurrentUser] = useState(TEST_USERS[0]);

    // 配置客服元件
    const config = {
        placement: 'bottom-right',
        autoPopup: false,
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,  // 隱藏預設按鈕
        },
        bubbleConfig: {
            show: false,  // 隱藏氣泡訊息
        },
        chatConfig: {
            org: 'df_org_uid',    // 替換為您的組織ID
            t: "1",
            sid: 'df_wg_uid',     // 替換為您的SID
            
            // 傳入當前使用者資訊 - 核心部分
            visitorUid: currentUser.visitorUid,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            mobile: currentUser.mobile,
            email: currentUser.email,
            note: currentUser.note,
            
            // 自訂欄位，可以傳遞任何欄位
            extra: JSON.stringify({
                userType: 'normal',
                registerDate: '2025-05-01'
            })
        },
        locale: 'zh-cn',
    };

    // 切換使用者資訊
    const handleSwitchUser = (user) => {
        setCurrentUser(user);
    };

    // 開啟聊天視窗
    const handleShowChat = () => {
        console.log("開啟聊天視窗");
        (window).bytedesk?.showChat();
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>使用者資訊對接演示</Title>
            <Paragraph>
                本範例演示如何透過配置參數傳入使用者資訊（visitorUid、nickname、avatar）到客服元件中。
                點擊下方按鈕可以切換不同的使用者資訊。
            </Paragraph>

            <Card style={{ marginTop: '20px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>當前使用者資訊：</Title>
                        <Space>
                            <Avatar src={currentUser.avatar} size={64} />
                            <div>
                                <Paragraph>使用者ID: {currentUser.visitorUid}</Paragraph>
                                <Paragraph>暱稱: {currentUser.nickname}</Paragraph>
                            </div>
                        </Space>
                    </div>

                    <Space>
                        <Button 
                            type="primary"
                            onClick={() => handleSwitchUser(TEST_USERS[0])}
                            disabled={currentUser.visitorUid === TEST_USERS[0].visitorUid}
                        >
                            切換到訪客小明
                        </Button>
                        <Button 
                            type="primary"
                            onClick={() => handleSwitchUser(TEST_USERS[1])}
                            disabled={currentUser.visitorUid === TEST_USERS[1].visitorUid}
                        >
                            切換到訪客小紅
                        </Button>
                    </Space>
                    
                    <div style={{ textAlign: 'center', marginTop: '16px' }}>
                        <Button type="primary" size="large" onClick={handleShowChat}>
                            諮詢客服
                        </Button>
                    </div>
                </Space>
            </Card>

            {/* 引入微語客服元件 */}
            <BytedeskReact {...config} />
        </div>
    );
};

export default UserInfoDemo;
```

## H5連結對接方法

除了元件整合方式外，微語客服系統還支援透過URL參數直接傳遞使用者資訊，適用於H5頁面或快速整合場景。

### H5連結格式

基本連結格式如下：

```text
https://www.weiyuai.cn/chat/?org=您的組織ID&t=1&sid=會話ID&visitorUid=使用者ID&nickname=使用者暱稱&avatar=頭像URL&extra=附加資訊JSON
```

各參數說明：

- `org`: 您的組織ID
- `t`: 會話類型，通常為1
- `sid`: 會話ID
- `visitorUid`: 使用者唯一識別符
- `nickname`: 使用者暱稱(需URL編碼)
- `avatar`: 使用者頭像URL(需URL編碼)
- `mobile`: 使用者手機號(可選，需URL編碼)
- `email`: 使用者郵箱(可選，需URL編碼)
- `note`: 備註資訊(可選，需URL編碼)
- `extra`: 額外資訊(JSON字串，需URL編碼)

### 範例程式碼

```javascript
// 1. 準備使用者基本資訊
const userId = 'user12345';
const userNickname = '張三';
const userAvatar = 'https://example.com/avatar.jpg';
const userMobile = '13800000000'; // 可選
const userEmail = 'zhangsan@example.com'; // 可選
const userNote = '備註資訊'; // 可選

// 2. 準備額外資訊(可選)
const extraInfo = {
  userType: 'vip',
  registerTime: '2025-01-01',
  memberLevel: '黃金會員',
};

// 3. URL編碼處理
const encodedNickname = encodeURIComponent(userNickname);
const encodedAvatar = encodeURIComponent(userAvatar);
const encodedMobile = encodeURIComponent(userMobile);
const encodedEmail = encodeURIComponent(userEmail);
const encodedNote = encodeURIComponent(userNote);
const encodedExtra = encodeURIComponent(JSON.stringify(extraInfo));

// 4. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=${userId}&nickname=${encodedNickname}&avatar=${encodedAvatar}&mobile=${encodedMobile}&email=${encodedEmail}&note=${encodedNote}&extra=${encodedExtra}`;

// 5. 使用該連結進行跳轉或生成按鈕
window.location.href = chatUrl;
// 或者建立一個連結
// <a href="${chatUrl}">聯絡客服</a>
```

### 使用場景

H5連結對接特別適用於：

1. 行動端H5頁面中"聯絡客服"按鈕
2. 使用者個人中心或訂單頁面中的客服入口
3. 郵件、簡訊或社交媒體中的客服連結
4. 無法實現複雜JavaScript整合的場景

### 注意事項

- 所有URL參數都應進行正確編碼，特別是中文字元
- 頭像URL應使用HTTPS協定以確保安全
- 考慮在不同場景下新增不同的追蹤參數
- 盡量避免在URL中傳遞敏感使用者資訊
- 超長參數可能會導致某些瀏覽器截斷URL，請適當控制參數長度

## 使用者資訊處理流程

1. **登入狀態檢測**：在應用中檢測使用者是否已登入
2. **獲取使用者資訊**：從您的業務系統中獲取當前登入使用者的資訊
3. **配置參數**：將使用者資訊配置到微語客服元件的`chatConfig`中
4. **即時更新**：當使用者登入狀態或資訊變化時，更新客服元件配置

## 最佳實踐

1. **唯一識別**：確保每個使用者的`visitorUid`在您的系統中是唯一的，建議使用業務系統中的使用者ID
2. **即時同步**：當使用者登入狀態變化時，及時更新微語客服元件的使用者資訊
3. **合理傳參**：在`extra`欄位中只傳遞必要的使用者資訊，避免傳遞敏感資訊
4. **頭像優化**：確保提供的頭像URL可以正常存取，考慮使用CDN加速
5. **錯誤處理**：新增適當的錯誤處理機制，確保即使使用者資訊獲取失敗也不會影響客服功能

## 進階功能

除了基本的使用者資訊對接外，您還可以：

1. **動態切換使用者**：實現多帳號切換功能，如範例中的不同使用者切換
2. **使用者分組**：透過`extra`欄位傳遞使用者分組資訊，實現不同分組使用者的差異化服務
3. **自訂欄位**：傳遞業務相關的自訂欄位，為客服提供更多使用者背景資訊
4. **會話控制**：根據使用者類型控制是否顯示客服入口，例如對VIP使用者顯示特殊的客服入口

## 注意事項2

1. **資料安全**：避免在客戶端傳遞使用者敏感資訊
2. **相容處理**：對於未登入使用者，可以使用臨時ID作為`visitorUid`，確保體驗一致性
3. **參數驗證**：確保傳入的使用者資訊格式正確，特別是頭像URL
4. **更新機制**：當使用者資訊變更時，需要重新初始化客服元件以應用新的使用者資訊
