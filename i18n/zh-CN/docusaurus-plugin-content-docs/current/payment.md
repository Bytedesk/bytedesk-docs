---
sidebar_label: "费用相关"
sidebar_position: 11
---

<!-- markdownlint-disable MD060 MD033 -->

# 费用相关

## 版本与价格

微语系统提供多种版本选择,满足不同规模企业需求:

| 版本 | 买断价格 | 按年付费 | 主要特点 |
| --- | --- | --- | --- |
| **社区版** | **免费** | **免费** | 基本功能开源，可商用，单租户，**[社区版源码，保留源码版权声明](./deploy/source.md)**，用户数/客服/机器人/知识库数量不限，保留微语logo，不支持[品牌自定义](./deploy/config.md#自定义配置) |
| **企业版** | **¥49,800** | **¥22,800/年** | 单租户，功能完整，**[私有化部署包](./deploy/docker.md)，不含源码**，用户数/客服/机器人/知识库数量不限，支持[品牌自定义](./deploy/config.md#自定义配置) |
| **平台版（最受欢迎）** | **¥79,800** | **¥32,800/年** | **[多租户SaaS](./development/saas.md)**，功能完整，**[私有化部署包](./deploy/docker.md)，不含源码**，用户数/客服/机器人/知识库数量不限，支持[品牌自定义](./deploy/config.md#自定义配置) |
| **源码版（企业常选）** | 参考源码模块定价 | **不支持** | **包含完整源码，含高级功能**，支持按模块单独购买。含平台版所有功能，无需再购买企业版或平台版，所购买服务器模块无需授权licenseKey。区别于企业版：可以自行修改源码，支持定制化开发。 |

- 买断价格为永久授权，按年付费需每年续费。价格均不含税点（公司小规模，如需发票，普票加收1%税点，专票加收1%或3%税点，可选）。
- 上述价格为软件价格，不含运维服务
- **租户说明**：一个租户代表一个企业账号，一个企业账号下可创建多个部门、成员和客服账号。不同租户数据相互隔离，互不影响。

### 在线模块源码定价

| 模块 | 价格 | 说明 |
| --- | --- | --- |
| 管理后台源码 | ¥59,800 | 前端/React [演示](https://www.weiyuai.cn/admin/) |
| 客服工作台源码 | ¥59,800 | 前端/React，支持Web和PC端 [演示](https://www.weiyuai.cn/agent/) |
| 知识库帮助中心编辑源码 | ¥19,800 | 前端/React [演示](https://www.weiyuai.cn/notebase/)|
| 工单流程/工作流/表单低代码源码 | ¥29,800 | 前端/React [演示](https://www.weiyuai.cn/workflow/)|
| 数据大屏模块源码 | ¥19,800 | 前端/React，开发中 |
| 培训考试模块源码 | ¥29,800 | 前端/React，开发中 |
| 手机App客服端源码 | ¥59,800 | App/Flutter，安卓/iOS/Web/Mac/Windows [下载](https://www.weiyuai.cn/pages/download.html)|
| Uniapp客服端源码 | ¥59,800 | Uniapp/Vue，支持[微信小程序](https://www.weiyuai.cn/assets/qr/qr_miniapp.jpg)、App、[H5客服端](https://weiyuai.cn/agenth5/)等 [演示](https://www.weiyuai.cn/pages/download.html)|
| 访客端H5聊天源码 | ¥49,800 | 前端/React，含在线客服&访客工单&智能客服聊天对话 [演示](https://www.weiyuai.cn/reactdemo/)|
| 服务器高级功能源码 | ¥59,800 | 后端/Java, [高级功能](#高级功能) |

### 呼叫中心(电话客服)模块源码定价

| 模块 | 价格 | 说明 |
| --- | --- | --- |
| 呼叫中心管理后台源码 | ¥59,800 | 前端/React |
| 呼叫中心IVR流程低代码源码 | ¥29,800 | 前端/React |
| 呼叫中心智能质检模块源码 | ¥59,800 | 前端/React，开发中 |
| 呼叫中心桌面端模块源码 | ¥59,800 | 前端/React，支持Web和PC端，此模块为客服工作台子模块|
| 呼叫中心服务器高级源码 | ¥99,800 | 后端/Java |
| 呼叫中心访客端源码 | ¥19,800 | 前端/React|

### 音视频(音视频客服)模块源码定价

| 模块 | 价格 | 说明 |
| --- | --- | --- |
| 音视频管理后台模块源码 | ¥29,800 | 前端/React，此模块为管理后台子模块，前提需要购买在线管理后台源码 |
| 音视频桌面端模块源码 | ¥29,800 | 前端/React，支持Web和PC端，此模块为客服工作台子模块，前提需要购买在线客服工作台源码 |
| 音视频访客端源码 | ¥29,800 | 前端/React|
| 音视频服务器高级源码 | ¥29,800 | 后端/Java |

### 视频会议模块源码定价

| 模块 | 价格 | 说明 |
| --- | --- | --- |
| 视频会议管理后台源码 | ¥59,800 | 前端/React |
| 视频会议桌面端源码 | ¥59,800 | 前端/React，支持Web和PC端 |
| 视频会议手机App端源码 | ¥59,800 | 安卓/iOS/Web/Mac/Windows，Flutter |
| 视频会议服务器高级源码 | ¥59,800 | 后端/Java |

### 远程协助模块源码定价

| 模块 | 价格 | 说明 |
| --- | --- | --- |
| 远程协助桌面端源码 | ¥59,800 | 前端/React，支持Web和PC端 |
| 远程协助手机App端源码 | ¥59,800 | 安卓/iOS/Web/Mac/Windows，Flutter |
| 远程协助服务器高级源码 | ¥59,800 | 后端/Java |

- 注：可以按模块单独购买，技术栈：[java + react](https://www.weiyuai.cn/architecture.html)，前后分离
- 上述价格仅为源码价格，不包含二次定制费用，不含运维服务，需要自行部署。

## 购买须知

- 默认价格不含税点（如需发票，普票加收1%税点，专票加收1%或3%税点，可选）
- 自购买之日起，三个月之内，升级版本（比如：企业版 升级为 平台版，或者升级为 源码版）之前已经支付的费用可以抵扣，支付差价即可。超过三个月需要支付全款
- 一年内免费升级（源码版购买时需明确），一年后可选支付15%/年维护费，包括：bug修复、版本升级、远程协助（不含运维，仅提供协助）等
- 提供30天免费试用，付款后支持7天无理由退款（如已交付源码或授权license，则不支持退款）
- 可提供定制开发服务，按 ¥2,000/人天 计算。
- 不做远程或现场演示，如果需要可以直接参考[文档本地安装部署](./category/private-deployment/)或登录[线上演示系统](https://www.weiyuai.cn/admin)

## 功能对比表

### 基础功能

| 功能 | 社区版 | 企业版 | 平台版 | 产品代理 | 源码版 |
|------|--------|--------|--------|----------|--------|
| 多租户支持 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 用户数量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 客服数量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 机器人数量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 知识库数量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 单聊 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 群聊 | ✅ | ✅ | ✅ | ✅ | ✅ |
| [文本消息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [图片消息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [语音消息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [视频消息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [文件消息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| 机器人消息 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 机器人客服 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 一对一客服 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 工作组客服 | ✅ | ✅ | ✅ | ✅ | ✅ |
| [对接大模型](./provider/deepseek.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [知识库](./modules/kbase.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [用户信息对接](./integration/user_info.md) | ✅ | ✅ | ✅ | ✅ | ✅ |

### 高级功能

| 功能 | 社区版 | 企业版 | 平台版 | 产品代理 | 源码版 |
|------|--------|--------|--------|----------|--------|
| [会话路由](./development/router.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [千人千面](./integration/viplevel.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [商品信息对接](./integration/goods_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [订单信息对接](./integration/order_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [单点登录SSO](./development/sso.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [消息撤回](./development/message.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [消息翻译](./development/translate.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [敏感词过滤](./development/taboo.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Ip过滤拦截](./development/ip.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [数据分析](./development/statistic.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [转接会话](./development/transfer.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [邀请会话](./development/invite.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [满意度评分](./development/rating.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [智能工单](./development/ticket.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [会话质检](./development/qualitycheck.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [自动回复](./development/autoreply.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [黑名单](./development/black.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [留言处理](./development/message_leave.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [商品信息](./integration/goods_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [订单对接](./integration/order_api.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [客户管理](./development/crm.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [会话小结](./development/summary.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [集群部署](./deploy/cluster.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [品牌自定义](./deploy/config.md#自定义配置) | ❌ | ✅ | ✅ | ✅ | ✅ |
| 商业版源码 | ❌ | ❌ | ❌ | ❌ | ✅ |
| 官方技术支持 | ❌ | ✅ | ✅ | ✅ | ✅ |
<!-- | [消息翻译](./development/translate.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [文本转语音TTS](./development/tts.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [语音转文本ASR/STT](./development/asr.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [会话监控](./development/monitor.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [意见反馈](./development/feedback.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [客服培训](./modules/training.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->

### 支持渠道

#### 网页与应用框架

| 渠道 | 社区版 | 企业版 | 平台版 | 产品代理 | 源码版 |
|------|--------|--------|--------|----------|--------|
| [网站/H5](./channel/web) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [React](./channel/react) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Vue](./channel/vue) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Svelte](./channel/svelte) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Angular](./channel/angular) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Nextjs](./channel/nextjs) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Vanilla](./channel/vanilla) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [iOS](./channel/ios) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Android](./channel/android) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Uniapp](./channel/uniapp) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [Flutter](./channel/flutter) | ✅ | ✅ | ✅ | ✅ | ✅ |

#### 社交媒体渠道

| 渠道 | 社区版 | 企业版 | 平台版 | 产品代理 | 源码版 |
|------|--------|--------|--------|----------|--------|
| [企业微信](./channel/wechat_work) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [微信客服](./channel/wechat_kf) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [微信公众号](./channel/wechat_mp) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [小程序](./channel/mini) | ❌ | ✅ | ✅ | ✅ | ✅ |
| 更多对接渠道 | ❌ | ✅ | ✅ | ✅ | ✅ |

#### 海外媒体渠道

默认不包含在源码版，额外收费：每个渠道源码1w

| 渠道 | 社区版 | 企业版 | 平台版 | 产品代理 | 源码版 |
|------|--------|--------|--------|----------|--------|
| [WhatsApp](./channel/whatsapp) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Facebook](./channel/facebook) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Instagram](./channel/instagram) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Line](./channel/line) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Telegram](./channel/telegram) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Email](./channel/email) | ❌ | ✅ | ✅ | ✅ | ✅ |
| 更多对接渠道 | ❌ | ✅ | ✅ | ✅ | ✅ |

### 服务条款

| 项目 | 社区版 | 企业版 | 平台版 | 产品代理 | 源码版 |
|------|-------|-------|-------|----------|-------|
| 1年内免费升级 | ❌ | ✅ | ✅ | ✅ | ✅(购买时需明确) |
| 1年后升级维护费 | - | 15%/年 | 15%/年 | 15%/年 | 15%/年 |
| 定制开发支持 | ❌ | ✅ | ✅ | ✅ | ✅ |

### 权利声明

import Copyright from '/img/right/copyright.png';
import Trademark from '/img/right/trademark.png';

<img src={Copyright} alt="版权声明" width="360" />
<img src={Trademark} alt="商标声明" width="360" />

- 版权所有：北京微语天下科技有限公司

## 联系方式

- 如需咨询、购买、意见反馈、定制开发等，请[扫码联系微信](/img/wechat.png)，备注：微语

## 下载演示资料

- [PPT](https://www.weiyuai.cn/download/ppt/)
- [合同模板及文档](https://www.weiyuai.cn/download/docx/)
- [功能清单](https://www.weiyuai.cn/download/file/)
- [更多](https://www.weiyuai.cn/download/)

## 使用条款与参考

- **允许使用**：可以用于商业用途，但禁止未获得许可的情况下二次销售
- **禁止用途**：严禁用于含有木马、病毒、色情、赌博、诈骗等违法违规业务，一经发现，立即举报，绝不姑息
- **免责声明**：本软件不保证任何形式的法律责任，请自行承担使用风险
- **行业对比**：[查看阿里云智能对话机器人价格对比](https://help.aliyun.com/zh/beebot/intelligent-dialogue-robot-tongyi-version/product-overview/product-billing/?spm=a2c4g.11186623.0.nextDoc.1bf77058eyaBzh)
