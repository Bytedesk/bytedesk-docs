---
sidebar_label: SiliconFlow
sidebar_position: 5
---

# SiliconFlow Integration

本頁說明如何將微語對接 SiliconFlow 模型，並將 SiliconFlow 作為雲端推理提供商。

:::tip 前置條件

- 已完成微語部署
- 已建立 SiliconFlow API Key
:::

## 配置步驟

1. 在 SiliconFlow 建立 API Key：[https://www.siliconflow.cn](https://www.siliconflow.cn)
2. 登入微語管理後台並填入金鑰
3. 將 SiliconFlow 設為預設提供商
4. 產生並嵌入聊天程式碼

![provider](/img/deploy/provider/provider_api_key.png)
![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)
![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，微語可呼叫 SiliconFlow 支援的模型服務。

![SiliconFlow chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

```bash
SPRING_AI_SILICONFLOW_BASE_URL=https://api.siliconflow.cn
SPRING_AI_SILICONFLOW_API_KEY=sk-xxxx
SPRING_AI_SILICONFLOW_CHAT_ENABLED=true
SPRING_AI_SILICONFLOW_CHAT_OPTIONS_MODEL=Qwen/QwQ-32B
SPRING_AI_SILICONFLOW_CHAT_OPTIONS_TEMPERATURE=0.7
```

```bash
spring.ai.siliconflow.base-url=https://api.siliconflow.cn
spring.ai.siliconflow.api-key=sk-xxxx
spring.ai.siliconflow.chat.enabled=true
spring.ai.siliconflow.chat.options.model=Qwen/QwQ-32B
spring.ai.siliconflow.chat.options.temperature=0.7
```

## 常見問題

1. 金鑰無效：確認 SiliconFlow 金鑰已啟用。
2. 回應較慢：檢查網路與供應商負載。
3. 功能異常：確認所選模型可用。

## 相關資源

- [SiliconFlow Documentation](https://www.siliconflow.cn/documentation)
- [Spring AI SiliconFlow](https://docs.spring.io/spring-ai/reference/api/chat/siliconflow-chat.html)
- [微語文件中心](/docs/intro)
