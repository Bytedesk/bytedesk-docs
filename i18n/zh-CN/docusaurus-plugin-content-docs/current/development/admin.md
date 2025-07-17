---
sidebar_label: 管理端
sidebar_position: 3
---

# 管理后台开发文档

## 简介

微语管理端用于管理企业成员或客服账号、客服组、会话分配、消息处理、客户管理等功能。

## accessToken 登录方式

在管理端登录路径 `/admin/auth/login?accessToken=xxx` 中，通过 `accessToken` 参数进行登录。

```bash
http://服务器ip/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```
