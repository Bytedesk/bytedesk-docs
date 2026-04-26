---
sidebar_label: 文本模型指南
sidebar_position: 21
---

# 微語文本對話模型配置指南

本頁說明如何為微語系統配置文本對話模型。文本模型是 AI 對話、客服機器人、客服助手、會話總結與一般問答流程的基礎能力。

## 一、選擇文本模型提供商

可在 `application.properties` 或環境變數中設定目前使用的文本模型提供商：

```bash
# 可選示例：none、ollama、zhipuai、dashscope
spring.ai.model.chat=zhipuai
```

Docker 範例：

```yaml
environment:
  SPRING_AI_MODEL_CHAT: zhipuai
```

## 二、推薦提供商

### 1. Ollama

適合本機開發與離線測試。

```bash
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.chat.enabled=true
spring.ai.ollama.chat.options.model=qwen3:0.6b
spring.ai.ollama.chat.options.temperature=0.0
```

### 2. 智譜 AI

適合中文為主的正式環境。

```bash
spring.ai.zhipuai.api-key=你的APIKey
spring.ai.zhipuai.chat.enabled=true
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.chat.options.top-p=0.9
spring.ai.zhipuai.chat.options.max-tokens=4096
```

### 3. 阿里雲百鍊 DashScope

適合大規模正式環境與多模型選擇。

```bash
spring.ai.dashscope.api-key=你的APIKey
spring.ai.dashscope.enabled=true
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com
spring.ai.dashscope.chat.enabled=true
spring.ai.dashscope.chat.options.model=qwen3-max
spring.ai.dashscope.chat.options.temperature=0.7
spring.ai.dashscope.chat.options.topP=3
```

## 三、如何選擇

- 本機開發與私有化測試可選 Ollama。
- 中文客服場景可優先考慮智譜 AI。
- 生產規模較大、模型選擇較多時可優先考慮 DashScope。

## 四、總結

文本模型是微語 AI 對話能力的核心。建議先選定一個提供商驗證效果，再根據客服場景逐步調整溫度、輸出長度與其他生成參數。
