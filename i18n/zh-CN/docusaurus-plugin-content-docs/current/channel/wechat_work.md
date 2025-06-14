---
sidebar_label: 企业微信
sidebar_position: 11
---

# 企业微信

## 配置

### 企业微信配置

管理员登录企业微信管理后台 → "应用管理" → "应用" → "自建"，创建内部应用

![创建内部应用](/img/channel/wechat/wechat_work_create_internal_app.png)

### 消息接收

在企业微信管理后台，点进刚创建的自建应用，找到"接收消息"，点击"启用API"

![消息接收](/img/channel/wechat/wechat_work_receive_msg.png)

### 回调配置

在微语管理后台，配置相应参数，点击提交。其中：[Corpid](#企业id-或-corpid) 和 [Secret](#appsecret-或-secret) 参考下面

![微语配置](/img/channel/wechat/wechat_work_weiyu_create.png)

查看微语配置，配置参数如下：

![微语配置](/img/channel/wechat/wechat_work_weiyu_detail.png)

然后将上述参数复制到企业微信管理后台：

![回调配置](/img/channel/wechat/wechat_work_hook.png)

### 对接微信客服

#### 在企业微信管理后台，找到"应用管理"→"应用"→"微信客服"

![客服功能](/img/channel/wechat/wechat_work_kefu.png)

#### 然后通过API管理微信客服

![绑定内部应用](/img/channel/wechat/wechat_work_kefu_internal_app.png)

#### 创建客服账号，至少创建一个客服账号

![创建客服账号](/img/channel/wechat/wechat_work_kefu_create_account.png)

## 接入场景

### 在视频号小店中接入

在视频号小店接入客服后，还可同时在视频号主页、直播间等入口接入，特点如下：

- ✅ 工具拿起即用，有机器人、欢迎语等
- ✅ 可在多个视频号小店同时接入后一起回复

**参考链接：**[在视频号小店中接入](https://work.weixin.qq.com/wework_admin/frame#/app/servicer/scene/channels)

### 在公众号中接入

可在公众号快速接入，特点如下：

- ✅ 有新消息提醒，客户可及时查看
- ✅ 可邀请客户添加企业微信
- ✅ 工具拿起即用，有机器人、欢迎语等

**参考链接：**[在公众号中接入](https://work.weixin.qq.com/wework_admin/frame#/app/servicer/scene/mp)

### 在小程序中接入

可通过免开发快速授权，或调用API，在小程序中接入客服。特点如下：

- ✅ 工具更好用，有机器人、欢迎语等
- ✅ 可在手机端收发消息
- ✅ 可邀请客户添加企业微信

**参考链接：**[在小程序中接入](https://work.weixin.qq.com/wework_admin/frame#/app/servicer/scene/miniprogram)

### 在微信内其他场景接入

在网页、搜一搜、支付凭证也可接入，特点如下：

- ✅ 有微信新消息提醒，客户可及时查看
- ✅ 统一的客户ID，方便企业识别客户

**参考链接：**[在微信内其他场景接入](https://work.weixin.qq.com/wework_admin/frame#/app/servicer/scene/wechatOthers)

### 在微信外App/网页中接入

可在微信外场景接入，特点如下：

- ✅ 客户在Windows桌面端和手机端都可跳转到微信发起咨询
- ✅ 可邀请客户添加企业微信

**参考链接：**[在微信外App/网页中接入](https://work.weixin.qq.com/wework_admin/frame#/app/servicer/scene/wechatOut)

### 在客户群/客户单聊中接入

可在客户群/单聊中接入，特点如下：

- ✅ 客户无需加好友即可发起咨询
- ✅ 支持多人路由协同回复

**参考链接：**[在客户群/客户单聊中接入](https://work.weixin.qq.com/wework_admin/frame#/app/servicer/scene/weCom)

## 参数说明

### 企业ID 或 corpid

每个企业都拥有唯一的corpid，获取此信息可在管理后台"我的企业"－"企业信息"下查看"企业ID"（需要有管理员权限）

![corpid](/img/channel/wechat/wechat_work_corpid.png)

### AppSecret 或 secret

secret是企业应用里面用于保障数据安全的"钥匙"，每一个应用都有一个独立的访问密钥，为了保证数据的安全，secret务必不能泄漏。secret查看方法：
在管理后台→"应用管理"→"应用"→"自建"，点进某个应用，即可看到。

![secret](/img/channel/wechat/wechat_work_secret.png)
