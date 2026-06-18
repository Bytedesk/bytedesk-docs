---
sidebar_label: Baidu
sidebar_position: 8
---

# Baidu Integration

本頁說明如何將微語對接百度千帆模型，並把 Baidu 作為 AI 提供商。

:::tip 前置條件

- 已完成微語部署
- 已建立百度千帆 API Key
:::

## 配置步驟

1. 登入百度雲，於 IAM 建立 API Key：[https://console.bce.baidu.com/iam/#/iam/apikey/list](https://console.bce.baidu.com/iam/#/iam/apikey/list)
2. 在百度控制台開通千帆或文心服務
3. 登入微語管理後台並填入 API Key
4. 選擇 Baidu 作為預設模型提供商
5. 產生聊天程式碼並嵌入網站

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，網站聊天可使用百度千帆模型能力。

![Baidu chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

```bash
SPRING_AI_BAIDU_BASE_URL=https://qianfan.bj.baidubce.com
SPRING_AI_BAIDU_API_KEY=bce-v3/xxx
SPRING_AI_BAIDU_CHAT_ENABLED=true
SPRING_AI_BAIDU_CHAT_OPTIONS_MODEL=ernie-x1-32k-preview
SPRING_AI_BAIDU_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.baidu.base-url=https://qianfan.bj.baidubce.com
spring.ai.baidu.api-key=bce-v3/xxx
spring.ai.baidu.chat.enabled=true
spring.ai.baidu.chat.options.model=ernie-x1-32k-preview
spring.ai.baidu.chat.options.temperature=0.7
```

## 常見問題

1. 金鑰無效：確認百度金鑰已啟用。
2. 模型調用失敗：確認千帆服務已開通。
3. 回應較慢：檢查網路與模型選擇。

## 相關資源

- [Baidu Qianfan Docs](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Fm2vrveyu)
- [Baidu Cloud Console](https://console.bce.baidu.com)
- [微語文件中心](../intro.md)
