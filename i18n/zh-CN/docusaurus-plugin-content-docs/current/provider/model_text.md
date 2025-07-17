---
sidebar_label: 文本模型配置
sidebar_position: 21
---

# 微语系统文本对话模型配置指南

本页介绍如何为微语系统配置文本对话（Chat）模型，适用于智能问答、对话机器人等场景。推荐按需选择合适的模型和服务商。

## 一、选择文本对话模型

在 `application.properties` 或环境变量中配置：

```bash
# 可选项：none（关闭）、ollama（本地）、zhipuai（智谱AI）、dashscope（阿里云）等
spring.ai.model.chat=zhipuai
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_MODEL_CHAT: zhipuai
```

> **建议**：
>
> - 本地开发可选 `ollama`，无需联网，适合测试。
> - 生产环境推荐 `zhipuai` 或 `dashscope`，需申请API Key。

---

## 二、各模型详细配置

### 1. Ollama（本地部署，免费）

适合本地开发和测试，无需联网。

```bash
# Ollama 本地服务地址，默认端口11434（如用docker建议改为21434）
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.chat.enabled=true
# 推荐模型：qwen3:0.6b、deepseek-r1:latest等
spring.ai.ollama.chat.options.model=qwen3:0.6b
spring.ai.ollama.chat.options.temperature=0.0
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_OLLAMA_BASE_URL: http://127.0.0.1:11434
  SPRING_AI_OLLAMA_CHAT_ENABLED: "true"
  SPRING_AI_OLLAMA_CHAT_OPTIONS_MODEL: qwen3:0.6b
  SPRING_AI_OLLAMA_CHAT_OPTIONS_TEMPERATURE: 0.0
```

> 参考文档：[Ollama官方](https://docs.spring.io/spring-ai/reference/api/chat/ollama-chat.html)

---

### 2. 智谱AI（zhipuai，云服务，需API Key）

适合中文场景，需注册并获取API Key。

```bash
# 申请API Key：https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys
spring.ai.zhipuai.api-key=你的APIKey
spring.ai.zhipuai.chat.enabled=true
# 推荐模型：glm-4-flash、glm-4等
spring.ai.zhipuai.chat.options.model=glm-4-flash
spring.ai.zhipuai.chat.options.temperature=0.7
spring.ai.zhipuai.chat.options.top-p=0.9
spring.ai.zhipuai.chat.options.max-tokens=4096
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_ZHIPUAI_API_KEY: 你的APIKey
  SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TOP_P: 0.9
  SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MAX_TOKENS: 4096
```

> 参考文档：[智谱AI官方](https://docs.spring.io/spring-ai/reference/api/chat/zhipuai-chat.html)

---

### 3. 阿里云百炼（dashscope，云服务，需API Key）

适合大规模生产环境，支持多种chat模型。

```bash
# 申请API Key：https://bailian.console.aliyun.com/?apiKey=1#/api-key
spring.ai.dashscope.api-key=你的APIKey
spring.ai.dashscope.enabled=true
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com
spring.ai.dashscope.chat.enabled=true
# 推荐模型：deepseek-r1、qwen-max等
spring.ai.dashscope.chat.options.model=deepseek-r1
spring.ai.dashscope.chat.options.temperature=0.7
spring.ai.dashscope.chat.options.topP=3
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_DASHSCOPE_API_KEY: 你的APIKey
  SPRING_AI_DASHSCOPE_ENABLED: "true"
  SPRING_AI_DASHSCOPE_BASE_URL: https://dashscope.aliyuncs.com
  SPRING_AI_DASHSCOPE_CHAT_ENABLED: "true"
  SPRING_AI_DASHSCOPE_CHAT_OPTIONS_MODEL: deepseek-r1
  SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TEMPERATURE: 0.7
  SPRING_AI_DASHSCOPE_CHAT_OPTIONS_TOP_P: 3
```

> 参考文档：[阿里云百炼官方](https://docs.spring.io/spring-ai/reference/api/chat/dashscope-chat.html)

---

### 4. 其他主流云服务（可选）

如需接入 DeepSeek、SiliconFlow、Gitee、腾讯混元、百度文心一言、火山引擎、OpenAI 等，可参考如下配置：

```bash
# 以 DeepSeek 为例
spring.ai.deepseek.base-url=https://api.deepseek.com
spring.ai.deepseek.api-key=你的APIKey
spring.ai.deepseek.chat.enabled=true
spring.ai.deepseek.chat.options.model=deepseek-chat
spring.ai.deepseek.chat.options.temperature=0.7
```

---

## 三、常见问题

- **Q: 如何选择模型？**
  - 本地开发用Ollama，生产推荐zhipuai或dashscope。
- **Q: API Key如何获取？**
  - 见各云服务商控制台。
- **Q: Docker环境如何配置？**
  - 参考上文环境变量写法。
- **Q: 如何设置模型参数？**
  - 可通过 `spring.ai.xxx.chat.options.*` 配置温度、top-p、max-tokens等参数。

如有更多问题，欢迎在社区或交流群反馈。
