---
sidebar_label: "費用相關"
sidebar_position: 11
---

<!-- markdownlint-disable MD060 MD033 -->

# 費用相關

## 版本與價格

微語系統提供多種版本選擇，滿足不同規模企業需求：

| 版本 | 買斷價格 | 按年付費 | 主要特點 |
| --- | --- | --- | --- |
| **社區版** | **免費** | **免費** | 基本功能開源，可商用，單租戶，**[社區版源碼，保留源碼版權聲明](./deploy/source.md)**，用戶數／客服／機器人／知識庫數量不限，保留微語 logo，不支援[品牌自訂](./deploy/config.md#自訂配置) |
| **企業版** | **¥49,800** | **¥22,800/年** | 單租戶，功能完整，**[私有化部署包](./deploy/docker.md)，不含源碼**，用戶數／客服／機器人／知識庫數量不限，支援[品牌自訂](./deploy/config.md#自訂配置) |
| **平台版（最受歡迎）** | **¥79,800** | **¥32,800/年** | **[多租戶 SaaS](./development/saas.md)**，功能完整，**[私有化部署包](./deploy/docker.md)，不含源碼**，用戶數／客服／機器人／知識庫數量不限，支援[品牌自訂](./deploy/config.md#自訂配置) |
| **源碼版（企業常選）** | 參考源碼模組定價 | **不支援** | **包含完整源碼，含高級功能**，支援按模組單獨購買。含平台版所有功能，無需再購買企業版或平台版，所購買模組無需授權 licenseKey。不同於企業版：可以自行修改源碼，支援客製化開發。 |

- 買斷價格為永久授權，按年付費需每年續費。價格均不含稅點（公司為小規模納稅人，如需發票，普票加收 1% 稅點，專票加收 1% 或 3% 稅點，可選）。
- 上述價格為軟體價格，不含維運服務。
- **租戶說明**：一個租戶代表一個企業帳號，一個企業帳號下可建立多個部門、成員與客服帳號。不同租戶資料相互隔離，互不影響。

### 模組源碼定價

- [即時通訊模組源碼定價](./price/instant-messaging)
- [線上模組源碼定價](./price/online-module)
- [呼叫中心模組源碼定價](./price/call-center)
- [音視頻客服模組源碼定價](./price/audio-video-service)
- [視訊會議模組源碼定價](./price/video-conference)
- [遠端協助模組源碼定價](./price/remote-assistance)

- 註：可按模組單獨購買，技術棧：[java + react](https://www.weiyuai.cn/architecture.html)，前後端分離。
- 上述價格僅為源碼價格，不包含二次客製化費用，不含維運服務，需自行部署。

### 購買須知

- 預設價格不含稅點（如需發票，普票加收 1% 稅點，專票加收 1% 或 3% 稅點，可選）。
- 自購買日起三個月內，升級版本（例如企業版升級為平台版，或升級為源碼版）時，先前已支付的費用可抵扣，只需補差價。超過三個月需支付全額。
- 一年內免費升級（源碼版購買時需明確），一年後可選擇支付 15%/年維護費，包含：bug 修復、版本升級、遠端協助（不含維運，僅提供協助）等。
- 提供 30 天免費試用，付款後支援 7 天無理由退款（如已交付源碼，則不支援退款）。
- 可提供客製化開發服務，按 ¥2,000/人天 計算。

## 功能對比表

### 基礎功能

| 功能 | 社區版 | 企業版 | 平台版 | 產品代理 | 源碼版 |
| --- | --- | --- | --- | --- | --- |
| 多租戶支援 | ❌ | ❌ | ✅ | ✅ | ✅ |
| 用戶數量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 客服數量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 機器人數量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 知識庫數量 | 不限 | 不限 | 不限 | 不限 | 不限 |
| 單聊 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 群聊 | ✅ | ✅ | ✅ | ✅ | ✅ |
| [文字訊息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [圖片訊息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [語音訊息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [視訊訊息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [檔案訊息](./development/message.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| 機器人訊息 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 機器人客服 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 一對一客服 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 工作組客服 | ✅ | ✅ | ✅ | ✅ | ✅ |
| [對接大模型](./provider/deepseek.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [知識庫](./modules/kbase.md) | ✅ | ✅ | ✅ | ✅ | ✅ |
| [用戶資訊對接](./integration/user_info.md) | ✅ | ✅ | ✅ | ✅ | ✅ |

### 高級功能

| 功能 | 社區版 | 企業版 | 平台版 | 產品代理 | 源碼版 |
| --- | --- | --- | --- | --- | --- |
| [會話路由](./development/router.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [千人千面](./integration/viplevel.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [商品資訊對接](./integration/goods_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [訂單資訊對接](./integration/order_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [單點登入 SSO](./development/sso.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [訊息撤回](./development/message.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [訊息翻譯](./development/translate.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [敏感詞過濾](./development/taboo.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Ip 過濾攔截](./development/ip.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [數據分析](./development/statistic.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [轉接會話](./development/transfer.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [邀請會話](./development/invite.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [滿意度評分](./development/rating.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [智慧工單](./development/ticket.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [會話質檢](./development/qualitycheck.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [自動回覆](./development/autoreply.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [黑名單](./development/black.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [留言處理](./development/message_leave.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [商品資訊](./integration/goods_info.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [訂單對接](./integration/order_api.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [客戶管理](./development/crm.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [會話小結](./development/summary.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [叢集部署](./deploy/cluster.md) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [品牌自訂](./deploy/config.md#自訂配置) | ❌ | ✅ | ✅ | ✅ | ✅ |
| 商業版源碼 | ❌ | ❌ | ❌ | ❌ | ✅ |
| 官方技術支援 | ❌ | ✅ | ✅ | ✅ | ✅ |
<!-- | [文字轉語音TTS](./development/tts.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [語音轉文字ASR/STT](./development/asr.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [會話監控](./development/monitor.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [意見回饋](./development/feedback.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->
<!-- | [客服培訓](./modules/training.md) | ❌ | ✅ | ✅ | ✅ | ✅ | -->

### 支援渠道

#### 網頁與應用框架

| 渠道 | 社區版 | 企業版 | 平台版 | 產品代理 | 源碼版 |
| --- | --- | --- | --- | --- | --- |
| [網站/H5](./channel/web) | ✅ | ✅ | ✅ | ✅ | ✅ |
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

#### 社交媒體渠道

| 渠道 | 社區版 | 企業版 | 平台版 | 產品代理 | 源碼版 |
| --- | --- | --- | --- | --- | --- |
| [企業微信](./channel/wechat_work) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [微信客服](./channel/wechat_kf) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [微信公眾號](./channel/wechat_mp) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [微信小程序](./channel/mini) | ❌ | ✅ | ✅ | ✅ | ✅ |
| 更多對接渠道 | ❌ | ✅ | ✅ | ✅ | ✅ |

#### 海外媒體渠道

預設不包含在源碼版中，額外收費：每個渠道源碼 1 萬元。

| 渠道 | 社區版 | 企業版 | 平台版 | 產品代理 | 源碼版 |
| --- | --- | --- | --- | --- | --- |
| [WhatsApp](./channel/whatsapp) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Facebook](./channel/facebook) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Instagram](./channel/instagram) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Line](./channel/line) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Telegram](./channel/telegram) | ❌ | ✅ | ✅ | ✅ | ✅ |
| [Email](./channel/email) | ❌ | ✅ | ✅ | ✅ | ✅ |
| 更多對接渠道 | ❌ | ✅ | ✅ | ✅ | ✅ |

### 功能插件 Plus

預設不包含在企業版／平台版／源碼版中，需額外收費。

| 插件名稱 | 功能描述 | 價格 | 備註 |
| --- | --- | --- | --- |
| [遠端協助](./plugins/remote.md) | 無障礙遠端支援，隨時隨地解決問題 | 待定 | 開發中 |
<!-- | [呼叫中心](./plugins/freeswitch.md) | 語音通話、IVR、自動話務分配 | 待定 | 開發中 | -->
<!-- | [音頻客服／視訊客服](./plugins/video.md) | 一對一音訊通話、視訊通話、螢幕共享 | 待定 | 開發中 | -->
<!-- | [工作流](./modules/workflow.md) | 大模型工作流 | 待定 | 開發中 | -->
<!-- | [看板插件](./plugins/kanban.md) | 視覺化任務與專案管理 | 待定 | 開發中 | -->

<!-- ### 開放平台 -->

### 服務條款

| 項目 | 社區版 | 企業版 | 平台版 | 產品代理 | 源碼版 |
| --- | --- | --- | --- | --- | --- |
| 1年內免費升級 | ❌ | ✅ | ✅ | ✅ | ✅（購買時需明確） |
| 1年後升級維護費 | - | 15%/年 | 15%/年 | 15%/年 | 15%/年 |
| 客製開發支援 | ❌ | ✅ | ✅ | ✅ | ✅ |

### 權利聲明

import Copyright from '/img/right/copyright.png';
import Trademark from '/img/right/trademark.png';

<img src={Copyright} alt="版權聲明" width="360" />
<img src={Trademark} alt="商標聲明" width="360" />

- 版權所有：北京微語天下科技有限公司

## 聯絡方式

- 如需諮詢、購買、意見回饋、客製化開發等，請[掃碼聯絡微信](/img/wechat.png)，備註：微語

## 下載演示資料

- [PPT](https://www.weiyuai.cn/download/ppt/)
- [合約範本與文件](https://www.weiyuai.cn/download/docx/)
- [功能清單](https://www.weiyuai.cn/download/file/)
- [更多](https://www.weiyuai.cn/download/)

## 使用條款與參考

- **允許使用**：可用於商業用途，但禁止在未獲授權的情況下二次銷售。
- **禁止用途**：嚴禁用於含有木馬、病毒、色情、賭博、詐騙等違法違規業務
- **免責聲明**：本軟體不保證任何形式的法律責任，請自行承擔使用風險
- **行業對比**：[查看阿里雲智能對話機器人價格對比](https://help.aliyun.com/zh/beebot/intelligent-dialogue-robot-tongyi-version/product-overview/product-billing/?spm=a2c4g.11186623.0.nextDoc.1bf77058eyaBzh)
