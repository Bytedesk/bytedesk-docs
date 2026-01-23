---
sidebar_label: 第三方業務系統對接
sidebar_position: 42
---

# 第三方業務系統對接（Iframe）

本頁介紹如何在微語客服系統中，透過 Iframe 將您的業務系統頁面嵌入到客服工作台，讓客服可在同一介面查看使用者資料、訂單、工單、CRM 等資訊。

## 適用場景

- 客服側邊欄開啟 CRM/訂單/會員中心頁面
- 透過使用者識別（`visitorUid`）自動定位當前會話對應的業務使用者
- 減少客服在多個系統間來回切換

## 對接效果

完成配置後：

1. 管理後台新增一條 Iframe 對接配置
2. 客服工作台在會話右側面板展示該頁面
3. 系統會自動在 URL 上追加當前訪客識別 `visitorUid`

## 設定步驟（管理後台）

1. 進入管理後台的「第三方業務系統對接 / Iframe」設定入口
2. 點擊「新增」
3. 填寫：名稱、嵌入 URL 等資訊（依後台提示）
4. 儲存後重新整理客服工作台即可看到入口

![iframe_admin_add](/img/iframe/iframe_admin_add.png)

## 範例：新增一個示範頁面

示範 URL：`https://www.baidu.com/`

![iframe_admin_add_baidu](/img/iframe/iframe_admin_add_baidu.png)

## 客服端展示

客服工作台會在會話右側面板載入該 Iframe 頁面：

![iframe_agent_rightpanel](/img/iframe/iframe_agent_rightpanel.png)

## URL 參數追加規則（非常重要）

系統會在嵌入 URL 上自動追加參數 `visitorUid`，用於識別當前訪客/使用者。

- 若原 URL 沒有查詢參數：使用 `?visitorUid=...`
	- 例：`https://example.com/page` → `https://example.com/page?visitorUid=1832567980425344`
- 若原 URL 已有查詢參數：使用 `&visitorUid=...`
	- 例：`https://example.com/page?from=weiyu` → `https://example.com/page?from=weiyu&visitorUid=1832567980425344`

> `visitorUid` 如何傳入（前端元件/H5 連結等）請參考：[使用者資訊對接](./userinfo.md)

## 最佳實務

- 建議使用您自有業務系統頁面進行嵌入，並在服務端透過 `visitorUid` 查詢並展示使用者資訊
- 不要在 URL 中夾帶敏感資訊（如手機號、證件號、Token 等）
- 建議全站使用 HTTPS

## 常見問題

### 1）頁面空白/無法載入

許多網站會禁止被嵌入 Iframe（安全策略限制），瀏覽器主控台可能出現：

- `Refused to display ... in a frame because it set 'X-Frame-Options' to 'deny'`
- `Content-Security-Policy: frame-ancestors ...`

解決方向：

- 優先嵌入您自有網域頁面
- 在您頁面的回應標頭中放開允許嵌入（依您的安全規範設定 `CSP frame-ancestors` 或 `X-Frame-Options`）

### 2）如何傳更多業務參數？

Iframe 預設只會自動追加 `visitorUid`。如需更多業務資訊，建議由您頁面在服務端透過 `visitorUid` 查詢後展示；或在您的 URL 中自行拼接固定參數（例如 `from=weiyu`），系統會在其後追加 `visitorUid`。
