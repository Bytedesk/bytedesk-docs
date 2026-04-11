---
sidebar_label: 電商系統對接指南
sidebar_position: 2
---

# 電商系統對接指南

本文面向技術對接人員，說明第三方電商系統如何與微語客服系統完成基礎資料、業務物件和客服入口的整合。

適用場景：

- 商城 H5、PC Web、App 接入線上客服
- 在客服側展示店鋪、商品、訂單上下文
- 將電商會員體系映射為客服訪客體系
- 將業務系統中的訂單、商品資料同步到客服工作台

## 核心概念區分

在微語系統中，需要明確區分兩類身份：

### 1. 註冊使用者 User

註冊使用者對應後端 `UserEntity`，是系統中的正式帳號。

典型特徵：

- 需要登入
- 可以被分配組織、角色、權限
- 可以作為管理員、客服、主管、營運人員等後台帳號
- 可以參與 RBAC 權限控制

### 2. 訪客 Visitor

訪客對應後端 `VisitorEntity`，是會話側的輕量身份。

典型特徵：

- 預設無需登入
- 不參與後台權限控制
- 不分配管理員、客服、主管等系統角色
- 主要用於承載會話中的訪客身份、來源渠道與擴充資料

### 3. 兩者之間的關係

請重點區分：

- 業務系統中的「已登入會員」在接入客服時，通常仍映射為微語的 `VisitorEntity`
- 前端傳入 `visitorUid` 只用於標識會話訪客身份，並不等於建立了後台 `UserEntity`
- 傳入 `nickname`、`avatar`、`mobile`、`email` 只是補充訪客資料，不會自動獲得任何後台權限
- 只有顯式建立並分配角色的 `UserEntity`，才能成為管理員、客服、主管等後台使用者

簡化理解：

- `UserEntity` 負責「登入與權限」
- `VisitorEntity` 負責「會話與訪客身份」

## 建議對接順序

1. 取得 Token，打通 API 認證
2. 釐清註冊使用者 User 與訪客 Visitor 的邊界
3. 對接訪客資訊，保證會話身份可識別
4. 對接組織資訊，確定資料歸屬組織
5. 對接店鋪資訊，建立業務店鋪上下文
6. 對接商品資訊，讓客服識別諮詢商品
7. 對接訂單資訊，讓客服識別諮詢訂單
8. 對接客服、工作組與路由策略
9. 接入會話歷史與售後等擴展能力

## 最小可用閉環

若希望快速上線一個可用的電商客服入口，最少需要完成：

1. 取得 `accessToken`
2. 初始化前端客服元件時傳入 `org`、`sid`、`t`
3. 傳入 `visitorUid`、`nickname`、`avatar`
4. 在商品詳情頁傳入 `goodsInfo`
5. 在訂單詳情頁傳入 `orderInfo`

## Token 資訊對接

- [Token資訊](../development/token_info.md)
- [Token介面](../development/token_api.md)

## 註冊使用者對接

- [使用者資訊](../development/user_info.md)
- [使用者介面](../development/user_api.md)

重點：

- 註冊使用者是後台帳號，對應 `UserEntity`
- 註冊使用者可被賦予角色與權限，例如管理員、客服、主管
- 若業務側只是把已登入會員帶入聊天視窗，不代表該會員會成為系統註冊使用者

## 訪客資訊對接

- [訪客資訊](../development/visitor_info.md)
- [訪客介面](../development/visitor_api.md)

重點：

- 訪客對應 `VisitorEntity`
- 訪客預設無需登入
- 訪客不參與後台角色與權限體系
- 前端聊天元件中傳入的 `visitorUid`、`nickname`、`avatar` 本質上是在描述訪客身份

## 組織資訊對接

- [組織資訊](../development/organization_info.md)
- [組織介面](../development/organization_api.md)

## 權限資訊對接

- [角色權限資訊](../development/role_info.md)
- [角色介面](../development/role_api.md)

## 店鋪資訊對接

- [店鋪資訊](../development/shop_info.md)
- [店鋪介面](../development/shop_api.md)

## 商品資訊對接

- [商品對接演示](https://www.weiyuai.cn/reactdemo/)
- [商品資訊](../development/goods_info.md)
- [商品介面](../development/goods_api.md)

## 訂單資訊對接

- [訂單對接演示](https://www.weiyuai.cn/reactdemo/)
- [訂單資訊](../development/order_info.md)
- [訂單介面](../development/order_api.md)

## 工作組對接

- [工作組資訊](../development/workgroup_info.md)
- [工作組介面](../development/workgroup_api.md)

## 一對一對接

- [客服資訊](../development/agent_info.md)
- [客服介面](../development/agent_api.md)

## 訪客歷史會話

- [歷史會話](../development/thread_history.md)

## 建議對接鏈路

### 鏈路一：商品詳情頁諮詢

1. 前端頁面拿到當前登入會員
2. 將該會員映射為訪客身份，組裝 `visitorUid`、`nickname`、`avatar`
3. 組裝當前商品 `goodsInfo`
4. 開啟客服元件或跳轉 H5 會話頁
5. 客服側查看商品卡片並繼續溝通

### 鏈路二：訂單詳情頁諮詢

1. 前端頁面拿到當前登入會員和訂單資料
2. 將該會員映射為訪客身份，組裝 `visitorUid`
3. 組裝 `orderInfo`
4. 開啟客服元件
5. 客服側查看訂單狀態、商品、收貨資訊

## 關鍵提醒

- 不要把商城會員和後台註冊使用者混為一談
- 不要把 `visitorUid` 和後台 `UserEntity.uid` 混為一談
- 若目標是會話身份識別，優先使用訪客模型
- 若目標是後台帳號與權限控制，使用註冊使用者模型
