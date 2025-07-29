---
sidebar_label: Admin Backend
sidebar_position: 3
---

# Admin Backend Development Documentation

## Introduction

The Weiyu admin backend is used to manage enterprise members or customer service accounts, customer service groups, session assignment, message processing, customer management, and other functions.

![chat](/img/develop/admin/chat_zh.png)

## Multi-channel

![channel](/img/develop/admin/channel.png)

## accessToken Login Method

In the admin backend login path `/admin/auth/login?accessToken=xxx`, login is performed through the `accessToken` parameter.

```bash
http://server-ip/admin/auth/login?accessToken=eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ7XCJwbGF0Zm9ybVwiOlwiYnl0ZWRlc2tcIixcInVzZXJuYW1lXCI6XCJhZG1pbkBlbWFpbC5jb21cIn0iLCJpYXQiOjE3NTI3MjQ4MzIsImV4cCI6MTc1NTMxNjgzMn0.3Q5ZXyNHImEGCErPkRXWG6rnFK1F_z77kTE6iRlpKmzUAtRpJZinjM_O0J0GebtM
```
