---
sidebar_label: Zhipu
sidebar_position: 3
---

# Zhipu Integration

本頁說明如何將微語對接智譜 AI 模型，並將 Zhipu 作為可配置的聊天與 embedding 提供商。

:::tip 前置條件

- 已完成微語部署
- 已建立智譜 AI API Key
:::

## 配置步驟

### 1. 建立 API Key

1. 開啟 [https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)
2. 登入智譜 AI 帳號
3. 建立 API Key
4. 保存產生的金鑰

### 2. 配置管理後台

1. 登入微語管理後台
2. 開啟 API Key 配置頁
3. 填入智譜 AI 金鑰

![provider](/img/deploy/provider/provider_api_key.png)

### 3. 設為預設提供商

1. 開啟 AI 模型設定
2. 選擇 Zhipu AI
3. 儲存設定

![provider](/img/deploy/provider/provider.png)
![provider-choose](/img/deploy/provider/provider-choose.png)

### 4. 嵌入聊天程式碼

1. 在管理後台產生聊天程式碼
2. 複製輸出
3. 加入網站

![provider-code](/img/deploy/provider/provider-code.png)

## 效果展示

完成設定後，網站聊天入口可使用智譜驅動的 AI 能力。

![Zhipu chat effect](/img/deploy/provider/provider-chat.png)

## 可選配置

### Docker 環境變數

```bash
SPRING_AI_ZHIPUAI_API_KEY=sk-xxx
SPRING_AI_ZHIPUAI_CHAT_ENABLED=true
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL=glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE=0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED=true
```

### 原始碼配置

```bash
spring.ai.zhipuai.api-key=sk-xxx
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.embedding.enabled=true
```

## 常見問題

1. API Key 無效：確認金鑰已啟用。
2. 回應慢：檢查網路狀況與模型選擇。
3. Embedding 異常：需要時確認已啟用 embedding。

## 相關資源

- [Zhipu AI Platform](https://open.bigmodel.cn/overview)
- [Spring AI Zhipu](https://docs.spring.io/spring-ai/reference/api/chat/zhipuai-chat.html)
- [微語文件中心](/docs/intro)
