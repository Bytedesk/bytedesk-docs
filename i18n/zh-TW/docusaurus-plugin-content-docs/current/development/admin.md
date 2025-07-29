---
sidebar_label: 管理端
sidebar_position: 3
---

# 管理後台開發文檔

## 簡介

微語管理端用於管理企業成員或客服帳號、客服組、會話分配、訊息處理、客戶管理等功能。

![chat](/img/develop/admin/chat_zh.png)

## 多渠道

![channel](/img/develop/admin/channel.png)

## accessToken 登入方式

在管理端登入路徑 `/admin/auth/login?accessToken=xxx` 中，透過 `accessToken` 參數進行登入。

```bash
http://伺服器ip/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```
