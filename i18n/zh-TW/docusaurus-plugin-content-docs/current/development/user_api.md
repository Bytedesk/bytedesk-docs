---
sidebar_label: 註冊使用者介面
sidebar_position: 5
---

# 註冊使用者介面

:::tip 提示
本頁描述的是後台註冊使用者 `UserEntity` 的管理介面，不是前端訪客會話介面。
:::

## 概述

使用者管理介面由 `UserRestController` 提供，基礎路徑為：

- `/api/v1/user`

這裡的「使用者」指後台帳號，例如：

- 超級管理員
- 管理員
- 客服
- 主管
- 營運人員

這些帳號：

- 需要登入
- 可以加入組織
- 可以分配角色與權限
- 可以存取後台工作台與管理端 API

## 核心介面

- `GET /api/v1/user/query/org`
- `GET /api/v1/user/query`
- `GET /api/v1/user/query/uid`
- `POST /api/v1/user/create`
- `POST /api/v1/user/update`
- `POST /api/v1/user/delete`
- `GET /api/v1/user/export`
- `GET /api/v1/user/profile`
- `GET /api/v1/user/organizations`
- `POST /api/v1/user/switch/organization`
- `POST /api/v1/user/change/password`
- `POST /api/v1/user/admin/change/password`
- `POST /api/v1/user/change/email`
- `POST /api/v1/user/change/mobile`
- `POST /api/v1/user/logout`

## 關鍵區分

- 若需要後台帳號、登入、角色與權限，請使用 User API
- 業務會員即使已登入商城，也不代表要使用 User API
- 商城會員進入客服會話時，通常仍映射為 `VisitorEntity`
