---
sidebar_label: 向量模型配置
sidebar_position: 22
---


# 微语向量模型配置指南

本页介绍如何为微语系统配置向量（Embedding）模型，适用于知识库、智能问答等场景。推荐按需选择合适的模型和服务商。

## 一、选择向量模型

在 `application.properties` 或环境变量中配置：

```bash
# 可选项：none（关闭）、ollama（本地）、zhipuai（智谱AI）、dashscope（阿里云）
spring.ai.model.embedding=dashscope
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_MODEL_EMBEDDING: dashscope
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
spring.ai.ollama.embedding.enabled=true
# 推荐中文场景用BGE模型：维度1024
spring.ai.ollama.embedding.options.model=bge-m3:latest
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_OLLAMA_BASE_URL: http://127.0.0.1:11434
  SPRING_AI_OLLAMA_EMBEDDING_ENABLED: "true"
  SPRING_AI_OLLAMA_EMBEDDING_OPTIONS_MODEL: bge-m3:latest
```

> 参考文档：[Ollama官方](https://docs.spring.io/spring-ai/reference/api/embeddings/ollama-embeddings.html)

---

### 2. 智谱AI（zhipuai，云服务，需API Key）

适合中文场景，需注册并获取API Key。

```bash
# 申请API Key：https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys
spring.ai.zhipuai.api-key=你的APIKey
spring.ai.zhipuai.embedding.enabled=true
# 推荐模型：embedding-2（1024维度）
spring.ai.zhipuai.embedding.options.model=embedding-2
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_ZHIPUAI_API_KEY: 你的APIKey
  SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
  SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-2
```

> 参考文档：[智谱AI官方](https://docs.spring.io/spring-ai/reference/api/embeddings/zhipuai-embeddings.html)

---

### 3. 阿里云百炼（dashscope，云服务，需API Key）

适合大规模生产环境，支持多种embedding模型。

```bash
# 申请API Key：https://bailian.console.aliyun.com/?apiKey=1#/api-key
spring.ai.dashscope.api-key=你的APIKey
spring.ai.dashscope.enabled=true
spring.ai.dashscope.base-url=https://dashscope.aliyuncs.com
spring.ai.dashscope.embedding.enabled=true
# 推荐模型：text-embedding-v1（也可选v2/v3），
spring.ai.dashscope.embedding.options.model=text-embedding-v1
```

> 注意：text-embedding-v1 维度1536，务必将 elasticsearch.dimensions 同步设置为 1536，否则检索异常！

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_DASHSCOPE_API_KEY: 你的APIKey
  SPRING_AI_DASHSCOPE_ENABLED: "true"
  SPRING_AI_DASHSCOPE_BASE_URL: https://dashscope.aliyuncs.com
  SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED: "true"
  SPRING_AI_DASHSCOPE_EMBEDDING_OPTIONS_MODEL: text-embedding-v1
```

> 注意：text-embedding-v1 维度1536，务必将 elasticsearch.dimensions 同步设置为 1536，否则检索异常！

---

## 三、向量数据库配置

向量数据库用于存储和检索向量数据，常用 elasticsearch。

```bash
spring.ai.vectorstore.type=elasticsearch
# 需与所选向量模型的维度一致（如BGE/embedding-2等为1024，text-embedding-v1为1536）
spring.ai.vectorstore.elasticsearch.dimensions=1024
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_VECTORSTORE_TYPE: elasticsearch
  # 需与所选向量模型的维度一致（如BGE/embedding-2等为1024，text-embedding-v1为1536）
  SPRING_AI_VECTORSTORE_ELASTICSEARCH_DIMENSIONS: 1024
```

---

## 常见问题

- **Q: 如何选择模型？**
  - 本地开发用Ollama，生产推荐zhipuai或dashscope。
- **Q: 维度怎么设置？**
  - 需与所选embedding模型一致，常见为1024。
- **Q: API Key如何获取？**
  - 见各云服务商控制台。

如有更多问题，欢迎在社区或交流群反馈。
