---
sidebar_label: 商品資訊
sidebar_position: 7
---

# 商品資訊對接

本頁面介紹如何將業務系統中的商品資訊傳遞給客服系統，特別適用於電商類網站，幫助客服快速了解使用者諮詢的商品詳情。

- 演示連結：[商品資訊對接演示](https://weiyuai.cn/reactdemo)
- 演示程式碼：
- [商品資訊對接範例-React](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx)
- [商品資訊對接範例-Vue](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/goodsInfoDemo.vue)

> 注意：請確保您已經完成了[React整合指南](../channel/react.md)或[Vue整合指南](../channel/vue.md)中的基本功能對接，才能繼續進行商品資訊對接。

![商品資訊對接範例](/img/develop/chat/goodsinfo.png)

## 為什麼需要商品資訊對接？

在電商場景中，使用者諮詢客服時往往是針對特定商品提問。無縫地將商品資訊傳遞給客服可以：

- 讓客服立即了解使用者正在瀏覽的商品
- 節省溝通時間，提高服務效率
- 讓客服能夠針對具體商品提供更準確的回答
- 提高使用者滿意度和轉化率
- 便於客服推薦相關或替代產品

## 對接方法

微語客服系統支援透過配置參數傳入商品資訊。在初始化客服元件時，透過`chatConfig.goodsInfo`配置項傳入商品相關資訊。

### 商品資訊資料結構

商品資訊以JSON字串形式傳遞，包含以下欄位：

```typescript
// 商品資訊資料結構
interface GoodsInfo {
    uid: string;         // 商品ID
    title: string;       // 商品標題
    image: string;       // 商品圖片URL
    description: string; // 商品描述
    price: number;       // 商品價格
    url: string;         // 商品詳情頁URL
    tagList: string[];   // 商品標籤列表
    extra: string;       // 額外資訊(JSON字串)
}
```

### 配置範例

以下是一個完整的配置範例，演示了如何將商品資訊傳遞給客服系統：

```javascript
const config = {
  // 其他配置項
  placement: 'bottom-right',
  autoPopup: false,
  marginBottom: 20,
  marginSide: 20,
  
  // 聊天配置
  chatConfig: {
    org: 'df_org_uid',       // 您的組織ID
    t: "1",                   
    sid: 'df_wg_uid',         // 會話ID
    
    // 使用者基本資訊（可選）
    visitorUid: 'visitor_001',
    nickname: '訪客小明',
    avatar: 'https://example.com/avatar.jpg',
    
    // 商品資訊 - 核心部分
    goodsInfo: JSON.stringify({
      uid: 'goods_001',                   // 商品ID
      title: '比亞迪 仰望U7 豪華純電動轎車',  // 商品標題
      image: 'https://example.com/car.jpg', // 商品圖片
      description: '比亞迪仰望U7是一款豪華純電動轎車，採用最新一代刀片電池技術...', // 商品描述
      price: 299900,                      // 商品價格（單位：元）
      url: 'https://example.com/product/001', // 商品詳情頁連結
      tagList: ['新能源', '豪華轎車', '智慧駕駛', '長續航'], // 商品標籤
      extra: JSON.stringify({             // 額外自訂資訊
        sku: 'SKU12345',
        stock: 100,
        discount: '8.8折'
      })
    })
  }
};
```

### 商品資訊顯示效果

當您正確配置商品資訊後，客服系統會在客服工作台顯示使用者正在諮詢的商品資訊卡片，包括商品圖片、標題、價格、描述等關鍵資訊，方便客服快速了解商品詳情並提供針對性服務。

## H5連結對接方法

除了元件整合方式，微語客服還提供了更簡便的H5連結對接方式，適用於行動端H5頁面或需要快速整合的場景。

### H5連結格式

基本連結格式如下：

```javascript
https://www.weiyuai.cn/chat/?org=您的組織ID&t=1&sid=會話ID&goodsInfo=商品資訊JSON
```

其中`goodsInfo`參數需要進行URL編碼，示例如下：

```javascript
// 1. 準備商品資訊物件
const goodsInfo = {
  uid: 'goods_001',                      // 商品ID
  title: '比亞迪 仰望U7 豪華純電動轎車', // 商品標題
  image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg', // 商品圖片
  description: '比亞迪仰望U7是一款豪華純電動轎車', // 描述
  price: 299900,                         // 價格
  tagList: ['新能源', '豪華轎車']        // 標籤
};

// 2. 轉換為JSON字串並進行URL編碼
const goodsInfoStr = encodeURIComponent(JSON.stringify(goodsInfo));

// 3. 拼接完整URL
const chatUrl = `https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&goodsInfo=${goodsInfoStr}`;

// 4. 跳轉到客服諮詢頁面
window.location.href = chatUrl;
// 或者建立一個連結
// <a href="${chatUrl}" target="_blank">諮詢客服</a>
```

### 使用場景

H5連結對接方式特別適合以下場景：

1. 商品詳情頁中的"諮詢客服"按鈕
2. 行銷簡訊或郵件中的產品諮詢連結
3. 社交媒體推廣連結
4. 無法實現複雜JS整合的第三方平台

### 實現步驟

1. **獲取商品資訊**: 從您的業務系統中獲取當前商品詳情
2. **建構參數物件**: 按格式建構商品資訊JSON物件
3. **編碼與拼接**: 將JSON字串URL編碼並拼接到基礎連結
4. **建立連結或按鈕**: 在商品頁面新增連結或按鈕，指向生成的URL

### 注意事項

- 確保所有URL參數都經過正確編碼，特別是中文和特殊字元
- 圖片URL應使用HTTPS協定，確保安全
- 簡化商品資訊，只傳遞必要欄位，避免URL過長
- 考慮在連結中新增追蹤參數，方便統計轉化率

### 關鍵參數說明

- `uid`: 商品的唯一識別符，建議使用您系統中的商品ID
- `title`: 商品的名稱或標題
- `image`: 商品的主圖URL，建議使用高清圖片
- `description`: 商品的描述資訊，可以是簡短介紹
- `price`: 商品價格，單位為元
- `url`: 商品詳情頁的完整URL，客服可以點擊查看
- `tagList`: 商品標籤陣列，用於快速了解商品特點
- `extra`: 額外的自訂欄位，以JSON字串形式傳遞

## 最佳實踐

### 1. 資料準備

- **精簡圖片**: 確保商品圖片經過優化，建議尺寸不超過800×800像素
- **簡潔描述**: 商品描述應簡明扼要，突出核心賣點
- **必要標籤**: 使用標籤標註商品的關鍵特性，如"新品"、"熱銷"、"限時"等
- **完整連結**: 提供完整的商品URL，便於客服快速存取商品頁面

### 2. 實現技巧

- **動態傳遞**: 在使用者瀏覽不同商品時，動態更新`goodsInfo`參數
- **按需載入**: 只在使用者點擊"諮詢客服"按鈕時才初始化客服元件
- **庫存檢查**: 在`extra`欄位中傳遞庫存資訊，便於客服告知使用者
- **多商品支援**: 設計允許使用者同時諮詢多個商品的機制

### 3. 使用者體驗優化

- **按鈕位置**: 在商品詳情頁的顯眼位置放置"諮詢客服"按鈕
- **預設問題**: 針對特定商品預設常見問題，幫助使用者快速發起諮詢
- **即時更新**: 當商品價格或庫存變動時，及時更新傳遞給客服的資訊
- **回饋機制**: 在諮詢結束後收集使用者回饋，優化服務流程

## 常見問題

### Q1: 如何在使用者瀏覽不同商品時更新商品資訊？

**A**: 您需要在使用者切換商品時重新初始化客服元件，或者在開啟聊天視窗時動態傳入當前商品資訊，範例程式碼如下：

```javascript
// 使用者切換到新商品時
const switchToProduct = (newProduct) => {
  setCurrentProduct(newProduct);
  
  // 開啟聊天視窗並傳入新的商品資訊
  window.bytedesk?.showChat({
    chatConfig: {
      goodsInfo: JSON.stringify({
        uid: newProduct.uid,
        title: newProduct.title,
        // ...其他商品資訊
      })
    }
  });
};
```

### Q2: 商品資訊中的圖片有什麼要求？

**A**: 商品圖片應當:

- 使用HTTPS連結確保安全
- 經過優化以快速載入
- 清晰展示商品特點
- 建議尺寸不超過800×800像素
- 確保圖片URL可公開存取

### Q3: 如何處理多個商品的諮詢？

**A**: 有幾種方法處理多商品諮詢:

1. 使用者每次點擊不同商品的"諮詢客服"按鈕時，更新傳入的商品資訊
2. 利用`extra`欄位傳遞多個商品的簡要資訊
3. 在您的業務系統中實現一個"購物車諮詢"功能，將多個商品資訊一次性傳遞給客服

### Q4: 商品價格變動如何同步到客服系統？

**A**: 您應該確保在開啟客服聊天視窗時獲取最新的商品資訊，包括即時價格。如果在對話過程中價格發生變化，您可以透過再次呼叫`showChat`方法並傳入更新後的商品資訊。

## 進階功能

除了基本的商品資訊傳遞，您還可以實現以下進階功能：

1. **商品推薦**: 客服可以向使用者推薦相關商品
2. **即時庫存**: 在對話中顯示即時庫存狀態
3. **價格通知**: 當商品價格變動時通知使用者
4. **促銷組合**: 展示特定商品的促銷組合
5. **購買歷史**: 結合使用者購買歷史提供個人化服務

## 小結

商品資訊對接是提升電商客服體驗的重要環節。透過將商品詳情無縫傳遞給客服系統，可以大幅提高溝通效率和服務品質，進而提升使用者滿意度和轉化率。在實現過程中，請注意保持資料簡潔、及時更新和優化使用者體驗。

## 完整範例程式碼

[商品資訊對接範例](https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx)
