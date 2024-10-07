---
sidebar_label: 扫码登录
sidebar_position: 5
---

# 扫码登录

记录下扫码登录实现流程

- 桌面客户端生成唯一设备uid：deviceUid
- 将此deviceUid发送给服务端，服务端返回随机码：randomCode
- 桌面客户端使用randomCode和deviceUid生成二维码
- 手机端扫描此二维码，获取到deviceUid，将deviceUid发送给服务端，服务端更新状态为已扫描SCANED
- 手机端点击确认登录，将手机号mobile和deviceUid发送给服务端，服务端保存手机号并更新状态为已登录CONFIRMED
- 桌面客户端通过轮询获取到手机号mobile和状态为已登录CONFIRMED，利用手机号和随机码randomCode，调用登录接口
- 如果桌面客户端拉取到的状态为EXPIRED，则需要重新拉取随机码randomCode，并重新生成二维码
- 登录成功，返回accessToken，桌面客户端将此accessToken保存到本地，跳转到首页
