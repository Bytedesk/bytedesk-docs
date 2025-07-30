---
sidebar_label: 千人千面
sidebar_position: 5
---

# 千人千面

本頁面介紹如何透過 `vipLevel` 參數實現針對不同等級使用者展示不同的客服內容，實現千人千面的個人化服務體驗。

- 演示連結：[千人千面演示](https://weiyuai.cn/reactdemo)
- 演示程式碼：
- [千人千面範例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/vipLevelDemo.tsx)
- [千人千面範例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/vipLevelDemo.vue)

> 注意：請確保您已經完成了[使用者資訊對接](./userinfo.md)的基本配置，才能更好地實現千人千面功能。

![千人千面範例](/img/develop/faq/faq_1.png)

## 為什麼需要千人千面？

在實際業務場景中，您可能希望：

- 為不同等級的使用者提供差異化的服務內容
- VIP使用者獲得更詳細或更高級的解答
- 根據使用者等級展示不同的產品介紹
- 為不同等級使用者提供不同的優惠資訊
- 實現更精細化的使用者營運

透過千人千面功能，可以幫助您為不同等級的使用者提供更精準、更個人化的服務體驗。

## 對接方法

微語客服系統支援透過配置參數傳入使用者等級資訊。在初始化客服元件時，透過 `chatConfig` 配置項傳入 `vipLevel` 參數。

### 核心參數

以下是千人千面功能的核心參數配置：

```javascript
chatConfig: {
  // 必填參數
  org: 'df_org_uid',        // 您的組織ID
  t: "1",                   // 會話類型
  sid: 'df_wg_uid',         // 會話ID
  
  // 使用者資訊參數
  visitorUid: 'visitor_001',       // 使用者唯一ID
  nickname: '訪客小明',     // 使用者暱稱
  avatar: 'https://example.com/avatar.jpg', // 使用者頭像URL
  
  // VIP等級參數 - 這是千人千面的關鍵
  vipLevel: 4,              // 使用者VIP等級，可以是1-10的整數
  
  // 自訂欄位，可以傳遞任何附加資訊
  extra: JSON.stringify({
    userType: 'vip',
    registerTime: '2025-01-01',
    // 任何其他您希望傳遞的資訊
  })
}
```

### 完整範例程式碼

下面是一個完整的千人千面範例，演示了如何根據不同使用者等級展示不同內容：

```jsx
import { useState } from 'react';
import { Button, Card, Typography, Space, Select } from 'antd';
import { BytedeskReact } from 'bytedesk-web/react';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const VipLevelDemo = () => {
    // 當前選中的VIP等級
    const [vipLevel, setVipLevel] = useState(1);

    // 配置客服元件
    const config = {
        placement: 'bottom-right',
        autoPopup: false,
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,  // 隱藏預設按鈕
        },
        chatConfig: {
            org: 'df_org_uid',    // 替換為您的組織ID
            t: "1",
            sid: 'df_wg_uid',     // 替換為您的SID
            // 使用者資訊參數
            visitorUid: 'visitor_001',
            nickname: '測試使用者',
            avatar: 'https://example.com/avatar.jpg',
            
            // 設定VIP等級
            vipLevel: vipLevel,
            
            extra: JSON.stringify({
                userType: 'vip',
                registerDate: '2025-05-01'
            })
        },
        locale: 'zh-cn',
    };

    // 切換VIP等級
    const handleVipLevelChange = (level) => {
        setVipLevel(level);
    };

    // 開啟聊天視窗
    const handleShowChat = () => {
        console.log("開啟聊天視窗");
        (window).bytedesk?.showChat();
    };

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>千人千面演示</Title>
            <Paragraph>
                本範例演示如何透過配置參數傳入使用者VIP等級（vipLevel）到客服元件中。
                選擇不同的VIP等級，將看到不同的客服內容。
            </Paragraph>

            <Card style={{ marginTop: '20px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={4}>當前VIP等級：</Title>
                        <Select 
                            value={vipLevel} 
                            onChange={handleVipLevelChange}
                            style={{ width: 200 }}
                        >
                            <Option value={1}>普通使用者</Option>
                            <Option value={2}>青銅會員</Option>
                            <Option value={3}>白銀會員</Option>
                            <Option value={4}>黃金會員</Option>
                            <Option value={5}>鑽石會員</Option>
                        </Select>
                    </div>
                    
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

export default VipLevelDemo;
```

## H5連結對接方法

除了元件整合方式外，微語客服系統還支援透過URL參數直接傳遞VIP等級資訊，適用於H5頁面或快速整合場景。

### H5連結格式

基本連結格式如下：

```text
https://www.weiyuai.cn/chat/?org=您的組織ID&t=1&sid=會話ID&visitorUid=使用者ID&nickname=使用者暱稱&avatar=頭像URL&vipLevel=使用者等級&extra=附加資訊JSON
```

各參數說明：

- `org`: 您的組織ID
- `t`: 會話類型，通常為1
- `sid`: 會話ID
- `visitorUid`: 使用者唯一識別符
- `nickname`: 使用者暱稱(需URL編碼)
- `avatar`: 使用者頭像URL(需URL編碼)
- `vipLevel`: 使用者VIP等級(1-10的整數)
- `extra`: 額外資訊(JSON字串，需URL編碼)

### 範例程式碼

```javascript
// 1. 準備使用者基本資訊
const userId = 'user12345';
const userNickname = '張三';
const userAvatar = 'https://example.com/avatar.jpg';
const userVipLevel = 4;  // VIP等級

// 2. 準備額外資訊(可選)
const extraInfo = {
  userType: 'vip',
  registerTime: '2025-01-01',
  memberLevel: '黃金會員'
};

// 3. URL編碼處理
const encodedNickname = encodeURIComponent(userNickname);
const encodedAvatar = encodeURIComponent(userAvatar);
const encodedExtra = encodeURIComponent(JSON.stringify(extraInfo));

// 4. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=${userId}&nickname=${encodedNickname}&avatar=${encodedAvatar}&vipLevel=${userVipLevel}&extra=${encodedExtra}`;

// 5. 使用該連結進行跳轉或生成按鈕
window.location.href = chatUrl;
// 或者建立一個連結
// <a href="${chatUrl}">聯絡客服</a>
```

## 管理後台配置

### 1. 新增擴展問題

在管理後台中，您可以為不同VIP等級配置不同的回答內容：

1. 進入管理後台的FAQ管理
2. 點擊"新增擴展問題"
3. 在問題配置中設定對應的VIP等級
4. 為不同等級配置不同的回答內容

![新增擴展問題](/img/develop/faq/faq_1.png)

### 2. 新增關聯問題

您還可以為不同VIP等級配置關聯問題：

1. 在問題詳情頁面
2. 點擊"新增關聯問題"
3. 設定不同VIP等級對應的關聯問題

![新增關聯問題](/img/develop/faq/faq_2.png)

## 最佳實踐

1. **等級劃分**：建議將VIP等級劃分為1-10級，便於管理和擴展
2. **內容差異化**：確保不同等級的內容有明顯的價值差異
3. **動態調整**：根據使用者回饋及時調整各等級的內容
4. **平滑過渡**：在等級之間設定合理的內容過渡
5. **資料統計**：定期分析不同等級使用者的使用情況

## 注意事項

1. **等級範圍**：`vipLevel` 參數建議使用1-10的整數
2. **內容維護**：定期檢查和更新各等級的內容
3. **相容處理**：對於未設定等級的使用者，系統會預設使用基礎內容
4. **更新機制**：當使用者等級變更時，需要重新初始化客服元件以應用新的等級資訊

## 效果展示

不同VIP等級使用者將看到不同的回答內容：

![VIP等級效果1](/img/develop/faq/faq_3.png)
![VIP等級效果2](/img/develop/faq/faq_4.png)
