---
sidebar_label: 訪客管理介面
sidebar_position: 6
---

# 訪客管理介面

:::tip 提示
本頁描述的是後台訪客資料管理介面，不等於前端匿名訪客直接開啟會話時使用的 SDK 參數說明。
:::

## 概述

訪客管理介面由 `VisitorRestController` 提供，基礎路徑為：

- `/api/v1/visitor`

訪客對應 `VisitorEntity`，主要用於會話側身份資料。

典型特點：

- 前端會話場景中預設無需登入
- 不具備後台角色與權限設定
- 但在管理端仍可被查詢、更新、匯出

## 核心介面

- `GET /api/v1/visitor/query/org`
- `GET /api/v1/visitor/query`
- `GET /api/v1/visitor/query/uid`
- `GET /api/v1/visitor/query/visitorUid`
- `POST /api/v1/visitor/create`
- `POST /api/v1/visitor/update`
- `POST /api/v1/visitor/update/tagList`
- `POST /api/v1/visitor/delete`
- `GET /api/v1/visitor/export`

## 關鍵區分

- 若要管理訪客側身份資料，請使用 Visitor API
- 若要建立客服、管理員、營運帳號，請使用 User API
- 不要把 `visitorUid` 與後台 `UserEntity.uid` 混為一談
