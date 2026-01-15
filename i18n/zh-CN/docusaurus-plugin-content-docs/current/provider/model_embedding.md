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
spring.ai.model.embedding=zhipuai
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_MODEL_EMBEDDING: zhipuai
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

适合中文场景，需注册并[申请API Key](https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys)

```bash
spring.ai.zhipuai.api-key=你的APIKey
spring.ai.zhipuai.embedding.enabled=true
# 推荐模型：embedding-2（1024维度）
spring.ai.zhipuai.embedding.options.model=embedding-2

# 如需使用 embedding-3（默认 2048 维，可自定义 256-2048）
# 注意：使用 embedding-3 时，务必同步修改 spring.ai.vectorstore.elasticsearch.dimensions
# 否则会因向量维度不一致导致写入/检索异常。
# 常用选择：1024（性能/成本平衡）或 2048（最高精度，默认）
# spring.ai.zhipuai.embedding.options.model=embedding-3
# spring.ai.zhipuai.embedding.options.dimensions=1024
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_ZHIPUAI_API_KEY: 你的APIKey
  SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
  SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-2

  # embedding-3 可选：
  # SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_MODEL: embedding-3
  # SPRING_AI_ZHIPUAI_EMBEDDING_OPTIONS_DIMENSIONS: 1024
```

> 参考文档：
> - Spring AI（ZhiPuAI Embeddings）：https://docs.spring.io/spring-ai/reference/api/embeddings/zhipuai-embeddings.html
> - 智谱 embedding-3 模型说明（维度可选/默认值）：https://docs.bigmodel.cn/cn/guide/models/embedding/embedding-3

---

### 3. 阿里云百炼（dashscope，云服务，需API Key）

适合大规模生产环境，支持多种embedding模型。[申请API Key](https://bailian.console.aliyun.com/?apiKey=1#/api-key)

```bash
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
# 需与所选向量模型的维度一致：
# - Ollama BGE-M3 / 智谱 embedding-2：1024
# - 智谱 embedding-3：默认 2048（也可配 256/512/1024/2048，但必须与 embedding.options.dimensions 一致）
# - dashscope text-embedding-v1：1536
spring.ai.vectorstore.elasticsearch.dimensions=1024
```

**Docker 环境变量写法：**

```yaml
environment:
  SPRING_AI_VECTORSTORE_TYPE: elasticsearch
  # 需与所选向量模型的维度一致
  SPRING_AI_VECTORSTORE_ELASTICSEARCH_DIMENSIONS: 1024
```

> 提醒：如果你已经创建过 Elasticsearch 向量索引，再修改 dimensions 往往需要重建索引（例如更换 index-name，或删除旧索引后重新初始化），否则会因为 mapping/维度不匹配导致写入失败或检索异常。

---

## 常见问题

- **Q: 如何选择模型？**
  - 本地开发用Ollama，生产推荐zhipuai或dashscope。
- **Q: 维度怎么设置？**
  - 需与所选 embedding 模型一致。
  - 智谱 embedding-2 固定 1024；embedding-3 默认 2048，且支持自定义维度（256-2048）。
  - 一旦使用 embedding-3 并调整 `spring.ai.zhipuai.embedding.options.dimensions`，务必同步修改 `spring.ai.vectorstore.elasticsearch.dimensions`，必要时重建 ES 索引。
- **Q: API Key如何获取？**
  - 见各云服务商控制台。
- 注意：text-embedding-v1 维度为1536，需同步设置。
- 当开启一个embedding模型时，请关闭其余的，也即设置enabled=false。

如有更多问题，欢迎在社区或交流群反馈。
