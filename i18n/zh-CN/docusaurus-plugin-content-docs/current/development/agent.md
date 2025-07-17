---
sidebar_label: 客服端
sidebar_position: 2
---

# 客户端/客服端开发文档

## 简介

微语客服端用于专业的企业IM或客服工作台，提供会话分配、消息处理、客户管理等功能。

## accessToken 登录

在客服端登录路径 `/agent/auth/login?accessToken=xxx` 中，通过 `accessToken` 参数进行登录。

```bash
http://服务器ip/agent/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```
