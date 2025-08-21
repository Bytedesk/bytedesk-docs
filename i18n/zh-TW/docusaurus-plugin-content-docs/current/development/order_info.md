---
sidebar_label: 訂單資訊
sidebar_position: 6
---

# 訂單資訊對接

本頁面介紹如何將業務系統中的訂單資訊傳遞給客服系統，特別適用於電商、物流等需要提供訂單諮詢服務的場景，幫助客服快速了解使用者諮詢的訂單詳情。

- 演示連結：[訂單資訊對接演示](https://weiyuai.cn/reactdemo)
- 演示程式碼：
- [訂單資訊對接範例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx)
- [訂單資訊對接範例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/orderInfoDemo.vue)

> 注意：請確保您已經完成了[React整合指南](../channel/react.md)中的基本功能對接，才能繼續進行訂單資訊對接。

## 訪客端對接範例

![訪客端對接範例](/img/develop/chat/orderinfo.png)

## 客服端對接範例

![客服端對接範例](/img/develop/chat/orderinfo_agent.png)

## 為什麼需要訂單資訊對接？

在客戶服務場景中，訂單問題是使用者諮詢最常見的內容之一。訂單資訊對接可以：

- 讓客服即時了解使用者諮詢的訂單詳情，無需使用者重複描述
- 準確顯示訂單狀態、商品資訊、配送資訊等關鍵資料
- 大幅提高客服解決問題的效率和準確性
- 減少使用者等待時間，提升客戶滿意度
- 為售後服務提供完整的訂單背景資訊

## 訂單資訊資料結構

訂單資訊包含多個方面的資料，主要包括：

```typescript
// 訂單資訊資料結構
interface OrderInfo {
    uid: string;              // 訂單編號
    time: string;             // 下單時間
    status: string;           // 訂單狀態編碼
    statusText: string;       // 訂單狀態文字
    goods: GoodsInfo;         // 商品資訊
    totalAmount: number;      // 訂單總金額
    shippingAddress: {        // 收貨資訊
        name: string;         // 收貨人
        phone: string;        // 聯絡電話
        address: string;      // 收貨地址
    };
    paymentMethod: string;    // 支付方式
    extra: string;            // 額外資訊(JSON字串)
}

// 商品資訊資料結構
interface GoodsInfo {
    uid: string;              // 商品ID
    title: string;            // 商品標題
    image: string;            // 商品圖片URL
    description: string;      // 商品描述
    price: number;            // 商品價格
    url: string;              // 商品詳情頁URL
    tagList: string[];        // 商品標籤列表
    quantity: number;         // 購買數量
    extra: string;            // 額外資訊(JSON字串)
}
```

## 對接方法

微語客服系統透過配置參數來傳遞訂單資訊，在初始化客服元件時，透過`chatConfig.orderInfo`配置項傳入訂單資料。

### 配置範例

以下是一個完整的配置範例，演示了如何將訂單資訊傳遞給客服系統：

```javascript
const config = {
  // 基本配置
  placement: 'bottom-right',
  autoPopup: false,
  marginBottom: 20,
  marginSide: 20,
  buttonConfig: {
    show: false,  // 隱藏預設按鈕，使用自訂按鈕
  },
  bubbleConfig: {
    show: false,  // 隱藏氣泡
    icon: '📦',
    title: '訂單有問題？',
    subtitle: '點擊諮詢客服'
  },
  
  // 聊天配置
  chatConfig: {
    org: 'df_org_uid',    // 替換為您的組織ID
    t: "1",
    sid: 'df_wg_uid',     // 替換為您的SID
    
    // 可選：傳入使用者資訊
    visitorUid: 'visitor_001',
    nickname: '訪客小明',
    avatar: 'https://example.com/avatar.jpg',
    
    // 訂單資訊 - 核心部分
    orderInfo: JSON.stringify({
      uid: 'ORD202505270001',               // 訂單編號
      time: '2025-05-27 14:30:00',          // 下單時間
      status: 'paid',                        // 訂單狀態編碼
      statusText: '已支付',                  // 訂單狀態文字
      
      // 商品資訊
      goods: {
        uid: 'goods_001',
        title: '比亞迪 仰望U7 豪華純電動轎車',
        image: 'https://example.com/yu7.jpg',
        description: '比亞迪仰望U7是一款豪華純電動轎車...',
        price: 299900,
        url: 'https://example.com/product/yu7',
        tagList: ['新能源', '豪華轎車', '智慧駕駛', '長續航'],
        quantity: 1,
        extra: JSON.stringify({
          color: '極光藍',
          configuration: '豪華版'
        })
      },
      
      totalAmount: 299900,                  // 訂單總金額
      
      // 收貨資訊
      shippingAddress: {
        name: '張三',
        phone: '13800138000',
        address: '北京市朝陽區建國路88號'
      },
      
      paymentMethod: '微信支付',            // 支付方式
      
      // 額外資訊
      extra: JSON.stringify({
        invoiceType: '電子發票',
        expectedDelivery: '2025-05-30',
        remarks: '請工作日送貨'
      })
    })
  },
  locale: 'zh-cn',
};
```

### 訂單資訊顯示效果

當您正確配置訂單資訊後，客服系統會在客服工作台顯示使用者諮詢的訂單詳情卡片，包括訂單編號、狀態、商品資訊、收貨地址等關鍵資訊，方便客服快速了解訂單情況並提供針對性服務。

## H5連結對接方法

除了元件整合外，微語客服還支援透過URL參數直接傳遞訂單資訊，特別適用於H5頁面或者需要快速整合的場景。

### H5連結格式

基本連結格式如下：

```javascript
https://www.weiyuai.cn/chat/?org=您的組織ID&t=1&sid=會話ID&orderInfo=訂單資訊JSON
```

其中`orderInfo`參數需要進行URL編碼，示例如下：

```javascript
// 1. 準備訂單資訊物件
const orderInfo = {
  uid: 'ORD202505270001',           // 訂單編號
  time: '2025-05-27 14:30:00',      // 下單時間
  status: 'paid',                   // 訂單狀態
  statusText: '已支付',             // 狀態文字
  goods: {                          // 商品資訊(簡化版)
    uid: 'goods_001',
    title: '比亞迪 仰望U7', 
    image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    price: 299900,
    quantity: 1
  },
  totalAmount: 299900               // 訂單總金額
};

// 2. 轉換為JSON字串並進行URL編碼
const orderInfoStr = encodeURIComponent(JSON.stringify(orderInfo));

// 3. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_aftersales&orderInfo=${orderInfoStr}`;

// 4. 使用該連結進行跳轉
window.location.href = chatUrl;
```

### 使用場景

H5連結對接特別適用於以下場景：

1. 行動端H5訂單詳情頁中的"聯絡客服"按鈕
2. 訂單通知郵件或簡訊中的客服連結
3. 無法進行複雜整合的第三方平台
4. 需要從外部系統快速跳轉到客服系統的場景

### 注意事項

- URL有長度限制，請確保編碼後的訂單資訊不會過長
- 敏感資訊應脫敏處理或省略
- 確保JSON格式正確，避免解析錯誤

## 完整範例程式碼

[訂單資訊對接範例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx)

## 最佳實踐

### 1. 訂單資料處理

- **敏感資訊處理**: 避免傳遞完整的手機號碼、詳細地址等敏感資訊，可以進行適當脫敏
- **狀態規範化**: 統一訂單狀態編碼，便於客服系統理解和處理
- **金額顯示**: 確保金額資料類型正確，單位統一（如"元"）
- **圖片優化**: 商品圖片應經過優化，確保載入速度和顯示效果

### 2. 實現技巧

- **按需傳遞**: 僅在使用者點擊"諮詢客服"按鈕時才傳遞訂單資訊
- **訂單列表**: 如果使用者有多個訂單，可以設計訂單選擇機制，讓使用者指定要諮詢的訂單
- **狀態更新**: 訂單狀態變更時，更新傳遞給客服的資訊
- **物流追蹤**: 對於已發貨訂單，可額外傳遞物流資訊

### 3. 使用者體驗優化

- **問題分類**: 設計常見的訂單問題類型，幫助使用者快速選擇問題
- **服務評分**: 諮詢結束後收集使用者對解決方案的評價
- **自助選項**: 提供部分常見問題的自助解決方案
- **智慧推薦**: 基於訂單狀態和歷史諮詢推薦可能的問題解決方案

## 常見問題

### Q1: 如何處理包含多個商品的訂單？

**A**: 對於包含多個商品的訂單，可以採用以下方法：

1. 在`goods`欄位中使用陣列儲存多個商品資訊：

```javascript
goods: [
  {
    uid: 'goods_001',
    title: '商品1',
    // 其他商品資訊
  },
  {
    uid: 'goods_002',
    title: '商品2',
    // 其他商品資訊
  }
]
```

1. 或者只傳遞主要商品資訊，在`extra`欄位中新增簡要的其他商品資訊。

### Q2: 訂單狀態發生變化時如何更新？

**A**: 當訂單狀態變化時，您可以：

1. 監聽訂單狀態變化事件
2. 更新本地訂單資料
3. 如果客服會話已經開啟，可以透過再次呼叫`showChat`方法並傳遞更新後的訂單資訊：

```javascript
// 訂單狀態更新後
window.bytedesk?.showChat({
  chatConfig: {
    orderInfo: JSON.stringify(updatedOrderInfo)
  }
});
```

### Q3: 如何處理大量歷史訂單？

**A**: 對於使用者有多個歷史訂單的情況：

1. 設計一個訂單選擇介面，讓使用者從中選擇需要諮詢的訂單
2. 只傳遞最近的幾個訂單資訊，避免資料過大
3. 提供訂單搜尋功能，讓使用者快速找到需要諮詢的訂單

### Q4: 訂單資訊中可以包含哪些自訂欄位？

**A**: 在`extra`欄位中，您可以根據業務需要新增各種自訂資訊，例如：

- 發票資訊
- 預計送達時間
- 訂單備註
- 優惠券使用情況
- 積分使用和獲取情況
- 售後服務資訊
- 其他客製化需求

## 進階功能

除了基本的訂單資訊傳遞，您還可以考慮實現以下進階功能：

1. **訂單變更提醒**: 當訂單狀態變化時主動通知使用者
2. **退款/售後處理**: 針對退款、換貨等售後場景的專門處理
3. **物流追蹤整合**: 即時顯示物流資訊
4. **自訂操作按鈕**: 在客服介面提供直接操作選項，如"申請退款"、"修改地址"等
5. **滿意度評價**: 問題解決後的滿意度評價系統

## 小結

訂單資訊對接是提升客服體驗的重要環節，透過將完整的訂單資訊傳遞給客服系統，可以大大提高諮詢效率和服務品質。合理設計訂單資料結構，確保關鍵資訊準確傳遞，同時注意保護使用者隱私，將幫助您建構更高效的客戶服務體系。
