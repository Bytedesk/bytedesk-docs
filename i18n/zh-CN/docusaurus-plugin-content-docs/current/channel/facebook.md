---
sidebar_label: Facebook
sidebar_position: 14
---

# Facebook

:::tip 前置条件

- 此模块为付费模块，如需要，请[扫码联系微信](/img/wechat.png)

:::

## Facebook 公共主页创建

### 登录 Facebook 账号，左侧菜单-》公共主页

- [登录Facebook](https://www.facebook.com/)

![meta_create_public_page_1](/img/channel/meta/meta_create_public_page_1.png)

### 新建公共主页

![meta_create_public_page_2](/img/channel/meta/meta_create_public_page_2.png)

## Facebook 开发者注册

- [注册开发者](https://developers.facebook.com/docs/development/register)

![register-dev-1](/img/channel/meta/meta_register_dev_1.png)
![register-dev-2](/img/channel/meta/meta_register_dev_2.png)
![register-dev-3](/img/channel/meta/meta_register_dev_3.png)
![register-dev-4](/img/channel/meta/meta_register_dev_4.png)
![register-dev-5](/img/channel/meta/meta_register_dev_5.png)

## Facebook 应用创建

- [创建应用页面](https://developers.facebook.com/apps/creation/)
- [创建应用说明](https://developers.facebook.com/docs/development/create-an-app)

![create-app-1](/img/channel/meta/meta_create_app_1.png)
![create-app-2](/img/channel/meta/meta_create_app_2.png)
![create-app-3](/img/channel/meta/meta_create_app_3.png)
![create-app-4](/img/channel/meta/meta_create_app_4.png)
![create-app-5](/img/channel/meta/meta_create_app_5.png)

## 微语后台绑定

### 绑定 Meta 应用

![meta_messenger_bind](/img/channel/meta/meta_messenger_bind.png)

### 获取 Webhook URL回调地址 和 验证口令

![meta_messenger_webhook](/img/channel/meta/meta_messenger_webhook.png)

### 绑定 Facebook Messenger Webhook URL回调地址 和 验证口令

![meta_messenger_webhook_bind](/img/channel/meta/meta_messenger_webhook_bind.png)

### 绑定 Facebook Webhook URL回调地址 和 验证口令

![meta_webhook_bind](/img/channel/meta/meta_webhook_bind.png)

## Facebook Webhook

- [Meta Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/)

## Facebook Messenger

- [Messenger Webhooks](https://developers.facebook.com/docs/messenger-platform/webhooks)

### 本地开发测试步骤

1. ngrok http 9003，生成url
2. 在微语管理后台-》客服-》渠道-》Meta-》添加Messenger应用
3. 获取到第2步生成的webhook url，使用上面第1步生成的url替换掉前面域名
   - 如：`https://e1a4-111-48-134-179.ngrok-free.app/meta/webhooks/1666799623995648`
4. 填写到Meta平台的webhook url中，验证口令使用在第3步中生成的验证token

### 获取 App ID 和 App Secret

- [Facebook 应用](https://developers.facebook.com/apps/)，选择对应的应用-》应用设置-》基本

![appId](/img/channel/meta/meta_app_appid_appsecret.png)

### 获取 Page Access Token

- [Facebook 应用](https://developers.facebook.com/apps/)，选择对应的应用-》Messenger-》Messenger API 设置-》绑定页面-》生成访问令牌

![pageAccessToken](/img/channel/meta/meta_app_generate_page_access_token.png)

### 获取 Page ID

- [访客口令信息](https://developers.facebook.com/tools/debug/accesstoken/?access_token=EAAV8HSdkm0cBO2AC47g86fWjhTQyYq1kZBDlNnmsR0bvCa0ywWV6MDtVEwdQGZBxax0tYiKbb2Ue2jHqziJI6lhOdbbIJvuF9YZAhZAtUfDZAoUsD6XxbeC44dgA38EI2OAyl3lujMjE0Ir938dSoWa7Jb9P2BxHTT3wwTVjPleyYBrZBMqogOxDUoqqjYJlJGcdWgaDS2jJubdCywMZBgZD&version=v23.0)

![pageId](/img/channel/meta/meta_app_get_page_id.png)

## Facebook Instagram

- [Instagram Webhooks](https://developers.facebook.com/docs/instagram-platform/webhooks)

## Facebook Whatsapp

## 参考链接

- [Facebook 开发者](https://developers.facebook.com/)
- [Facebook 应用](https://developers.facebook.com/apps/)
- [Facebook 登录](https://developers.facebook.com/docs/facebook-login/overview)
- [Messenger Webhooks](https://developers.facebook.com/docs/messenger-platform/webhooks)
- [Meta Webhooks](https://developers.facebook.com/docs/graph-api/webhooks)
- [绑定Whatsapp和Instagram](https://www.facebook.com/settings/?tab=linked_profiles)
- [Messenger 开放平台](https://developers.facebook.com/docs/messenger-platform/)
- [微语AI-Facebook 公共主页](https://www.facebook.com/profile.php?id=61577041798201)
- [图谱 API](https://developers.facebook.com/docs/graph-api)
- [图谱 API 探索工具](https://developers.facebook.com/tools/explorer)
- [graph-api-webhooks-samples](https://github.com/fbsamples/graph-api-webhooks-samples)
- [Meta Business SDK](https://developers.facebook.com/docs/business-sdk/getting-started)
- [阿里云ChatApp](https://chatapp.console.aliyun.com/Overview)
