---
sidebar_label: Email
sidebar_position: 15
---

# Email

:::tip 提示
社区版不支持，请升级到企业版或平台版。请替换[licenseKey](../development/license.md)
:::

## 功能简介

邮件是企业沟通的重要渠道，通过集成邮箱功能，您可以将企业的多个邮件账户直接接入微语平台，使客服人员能够集中查看和回复来自不同邮箱的客户邮件。还可以在平台上进行邮件群发如EDM营销，实现对邮箱渠道的统一管理和运营，提高客服效率和邮件营销效果。支持QQ邮箱、网易邮箱、阿里云企业邮箱等主流邮箱服务商。

## 邮箱配置

### 微语后台配置

import emailWeiyu from '/img/channel/email/email_weiyu.png';

{/*微语后台邮箱配置*/}
<img src={emailWeiyu} />

### QQ邮箱

import emailQQ from '/img/channel/email/email_qq.png';

{/*QQ邮箱配置*/}
<img src={emailQQ} />

### 网易163邮箱

import email163 from '/img/channel/email/email_163.png';

{/*网易163邮箱配置*/}
<img src={email163} />

### 阿里云企业邮箱

阿里云默认禁用第三方客户端，需要手动[开启](https://help.aliyun.com/document_detail/606337.html?spm=a2c4g.11186623.0.0.4395347ejIC1nB)

使用postmaster[登录](https://qiye.aliyun.com/)

#### 开启第三方客户端访问权限

import emailAliyunPostmaster1 from '/img/channel/email/email_aliyun_qiye_postmaster_1.png';

{/*阿里云企业邮箱设置1*/}
<img src={emailAliyunPostmaster1} />

import emailAliyunPostmaster2 from '/img/channel/email/email_aliyun_qiye_postmaster_2.png';

{/*阿里云企业邮箱设置2*/}
<img src={emailAliyunPostmaster2} />

#### 获取POP3/SMTP密码

import emailAliyunPop3 from '/img/channel/email/email_aliyun_qiye_pop3.png';

{/*获取POP3/SMTP密码*/}
<img src={emailAliyunPop3} />

#### 生成专有密码（非邮箱登录密码）

阿里云禁止使用邮箱密码登录，需要生成专有密码。

import emailAliyunPassword from '/img/channel/email/email_aliyun_qiye_password.png';

{/*生成专有密码*/}
<img src={emailAliyunPassword} />

#### 给员工账号开启POP3/SMTP服务

- [Postmaster登录](https://qiye.aliyun.com/admin/#/account-email)

import emailAliyunMemberPop3 from '/img/channel/email/email_aliyun_member_pop3.png';

{/*开启员工POP3/SMTP服务*/}
<img src={emailAliyunMemberPop3} />

### 其他邮箱类似

请参考阿里云企业邮箱

## 邮件协议说明

在配置邮箱集成时，您需要选择适合的邮件协议。以下是各种协议的对比和建议：

### 协议对比总览

| 特性 | IMAP (推荐) | POP3 | SMTP | Exchange |
|------|------------|------|------|----------|
| 主要用途 | 收取邮件 | 收取邮件 | 发送邮件 | 收发邮件及协作 |
| 数据同步 | 双向同步 | 单向下载 | 仅发送 | 完整同步 |
| 多设备支持 | 优秀 | 较差 | 不适用 | 优秀 |
| 资源消耗 | 中等 | 低 | 低 | 高 |
| 配置难度 | 中等 | 简单 | 简单 | 复杂 |
| 推荐场景 | 企业客服 | 个人单设备 | 配合其他协议 | 大型企业 |

在微语平台配置时，如无特殊需求，建议优先选择IMAP协议，可获得最佳的邮件同步体验和功能完整性。

## 参考链接

- [阿里企业邮箱](https://qiye.aliyun.com/)
- [阿里云开启POP3/SMTP](https://help.aliyun.com/document_detail/606337.html?spm=a2c4g.11186623.0.0.4395347ejIC1nB)
- [阿里邮箱IMAP、POP、SMTP地址和端口信息](https://help.aliyun.com/document_detail/36576.html)
- [阿里云ChatApp](https://chatapp.console.aliyun.com/Overview)
