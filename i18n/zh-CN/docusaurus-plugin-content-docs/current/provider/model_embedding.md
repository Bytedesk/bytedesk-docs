---
sidebar_label: 向量模型配置
sidebar_position: 22
---


# 微语向量模型配置指南

本页介绍如何为微语系统配置向量（Embedding）模型，适用于知识库、智能问答等场景。推荐按需选择合适的模型和服务商。

## 一、选择向量模型

在 `application.properties` 或环境变量中配置：

```bash
# 可选项：
# - none（关闭）
# - ollama（本地）
# - zhipuai（智谱AI）
# - dashscope（阿里云百炼）
# - minimax（MiniMax）
# - openai（OpenAI）
# - openrouter（OpenRouter，OpenAI 兼容）
# - gitee（Gitee，OpenAI 兼容）
# - baidu（百度千帆，OpenAI 兼容）
# - tencent（腾讯混元，OpenAI 兼容）
# - volcengine（火山引擎，OpenAI 兼容）
# - silicon（SiliconFlow，OpenAI 兼容；注意这里是 silicon 不是 siliconflow）
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

> 说明：本项目中，部分厂商的 Embedding/Chat 通过 OpenAI 兼容接口接入（基于 `OpenAiApi`）。
> 这类 provider 的常见配置项一致：
>
> - `spring.ai.<provider>.base-url`
> - `spring.ai.<provider>.api-key`
> - `spring.ai.<provider>.embedding.enabled=true`
> - `spring.ai.<provider>.embedding.options.model=...`
> - （可选）`spring.ai.<provider>.embedding.options.dimensions=...`（仅当该服务端支持“指定输出维度”时才生效）
>
> 另外，`spring.ai.model.embedding` 用于选择“哪一个 EmbeddingModel Bean 生效”，它的值与项目内常量一致（见 `LlmProviderConstants`）。
>
> 注意：各 provider 的 embedding 默认是关闭的（`enabled=false`），只有明确设置为 `true` 才会装配对应的 `EmbeddingModel`。
> 同一时刻建议只开启一个 provider 的 embedding，避免出现多个 `EmbeddingModel` Bean 导致注入歧义。

### 关于 enabled（重要）

在本项目中，向量模型有两层开关：

- `spring.ai.<provider>.embedding.enabled=true|false`：控制是否创建该 provider 的 Embedding 相关 Bean（不启用就不会装配）。
- `spring.ai.model.embedding=<provider>`：在已装配的模型中，选择哪个作为当前系统使用的“主 EmbeddingModel”。

**推荐做法：只启用一个 embedding provider**（避免启动时出现多个 `EmbeddingModel` Bean 导致注入歧义）。

例如选择智谱（zhipuai）：

```bash
spring.ai.model.embedding=zhipuai

spring.ai.zhipuai.embedding.enabled=true
# spring.ai.ollama.embedding.enabled=false
# spring.ai.dashscope.embedding.enabled=false
# spring.ai.minimax.embedding.enabled=false
# spring.ai.openai.embedding.enabled=false
# spring.ai.openrouter.embedding.enabled=false
# spring.ai.gitee.embedding.enabled=false
# spring.ai.baidu.embedding.enabled=false
# spring.ai.tencent.embedding.enabled=false
# spring.ai.volcengine.embedding.enabled=false
# spring.ai.siliconflow.embedding.enabled=false
```

Docker 环境变量示例：

```yaml
environment:
  SPRING_AI_MODEL_EMBEDDING: zhipuai
  SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
  # SPRING_AI_OLLAMA_EMBEDDING_ENABLED: "false"
  # SPRING_AI_DASHSCOPE_EMBEDDING_ENABLED: "false"
  # SPRING_AI_MINIMAX_EMBEDDING_ENABLED: "false"
  # SPRING_AI_OPENAI_EMBEDDING_ENABLED: "false"
  # SPRING_AI_OPENROUTER_EMBEDDING_ENABLED: "false"
  # SPRING_AI_GITEE_EMBEDDING_ENABLED: "false"
  # SPRING_AI_BAIDU_EMBEDDING_ENABLED: "false"
  # SPRING_AI_TENCENT_EMBEDDING_ENABLED: "false"
  # SPRING_AI_VOLCENGINE_EMBEDDING_ENABLED: "false"
  # SPRING_AI_SILICONFLOW_EMBEDDING_ENABLED: "false"
```

### 1. Ollama（本地部署，免费）

适合本地开发和测试，无需联网。

```bash
# Ollama 本地服务地址，默认端口11434（如用docker建议改为21434）
spring.ai.ollama.base-url=http://127.0.0.1:11434
spring.ai.ollama.embedding.enabled=true
# 推荐中文场景用BGE模型：维度1024
spring.ai.ollama.embedding.options.model=bge-m3:latest

# Ollama 的向量维度由模型决定（例如 bge-m3 输出 1024 维），无需配置 dimensions
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

# DashScope 的向量维度由模型决定（例如 text-embedding-v1 为 1536），无需配置 dimensions
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

### 4. MiniMax（minimax，云服务，需 API Key）

```bash
spring.ai.minimax.api-key=你的APIKey
spring.ai.minimax.base-url=https://api.minimax.chat
spring.ai.minimax.embedding.enabled=true
spring.ai.minimax.embedding.options.model=text-embedding-v1

# MiniMax 的向量维度由模型决定；如服务端支持指定维度，可配置：
# spring.ai.minimax.embedding.options.dimensions=1024
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_MINIMAX_API_KEY: 你的APIKey
  SPRING_AI_MINIMAX_BASE_URL: https://api.minimax.chat
  SPRING_AI_MINIMAX_EMBEDDING_ENABLED: "true"
  SPRING_AI_MINIMAX_EMBEDDING_OPTIONS_MODEL: text-embedding-v1
  # SPRING_AI_MINIMAX_EMBEDDING_OPTIONS_DIMENSIONS: 1024
```

---

### 5. OpenAI（openai，云服务，需 API Key）

```bash
spring.ai.openai.base-url=https://api.openai.com
spring.ai.openai.api-key=你的APIKey
spring.ai.openai.embedding.enabled=true
spring.ai.openai.embedding.options.model=text-embedding-3-small

# 可选：仅当你希望指定输出维度且模型/服务端支持时配置
# 例如 text-embedding-3-* 支持指定维度时，可配置：
# spring.ai.openai.embedding.options.dimensions=1536
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_OPENAI_BASE_URL: https://api.openai.com
  SPRING_AI_OPENAI_API_KEY: 你的APIKey
  SPRING_AI_OPENAI_EMBEDDING_ENABLED: "true"
  SPRING_AI_OPENAI_EMBEDDING_OPTIONS_MODEL: text-embedding-3-small
  # SPRING_AI_OPENAI_EMBEDDING_OPTIONS_DIMENSIONS: 1536
```

---

### 6. OpenRouter（openrouter，OpenAI 兼容，需 API Key）

```bash
spring.ai.openrouter.base-url=https://api.openrouter.com
spring.ai.openrouter.api-key=你的APIKey
spring.ai.openrouter.embedding.enabled=true
spring.ai.openrouter.embedding.options.model=text-embedding-3-small

# 可选：仅当服务端支持时配置
# spring.ai.openrouter.embedding.options.dimensions=1536
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_OPENROUTER_BASE_URL: https://api.openrouter.com
  SPRING_AI_OPENROUTER_API_KEY: 你的APIKey
  SPRING_AI_OPENROUTER_EMBEDDING_ENABLED: "true"
  SPRING_AI_OPENROUTER_EMBEDDING_OPTIONS_MODEL: text-embedding-3-small
  # SPRING_AI_OPENROUTER_EMBEDDING_OPTIONS_DIMENSIONS: 1536
```

---

### 7. SiliconFlow（silicon，OpenAI 兼容，需 API Key）

> 注意：`spring.ai.model.embedding` 的值是 `silicon`（不是 `siliconflow`），但 provider 配置前缀仍然是 `spring.ai.siliconflow.*`。

```bash
spring.ai.siliconflow.base-url=https://api.siliconflow.cn
spring.ai.siliconflow.api-key=你的APIKey
spring.ai.siliconflow.embedding.enabled=true
spring.ai.siliconflow.embedding.options.model=BAAI/bge-m3

# 可选：仅当服务端支持“指定输出维度”时配置（BGE 系列通常不需要配置）
# spring.ai.siliconflow.embedding.options.dimensions=1024
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_SILICONFLOW_BASE_URL: https://api.siliconflow.cn
  SPRING_AI_SILICONFLOW_API_KEY: 你的APIKey
  SPRING_AI_SILICONFLOW_EMBEDDING_ENABLED: "true"
  SPRING_AI_SILICONFLOW_EMBEDDING_OPTIONS_MODEL: BAAI/bge-m3
  # SPRING_AI_SILICONFLOW_EMBEDDING_OPTIONS_DIMENSIONS: 1024
```

---

### 8. 百度千帆（baidu，OpenAI 兼容，需 API Key）

```bash
spring.ai.baidu.base-url=https://qianfan.baidubce.com/v2
spring.ai.baidu.api-key=你的APIKey
spring.ai.baidu.embedding.enabled=true
spring.ai.baidu.embedding.options.model=embedding-v1

# 可选：仅当服务端支持时配置
# spring.ai.baidu.embedding.options.dimensions=1024
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_BAIDU_BASE_URL: https://qianfan.baidubce.com/v2
  SPRING_AI_BAIDU_API_KEY: 你的APIKey
  SPRING_AI_BAIDU_EMBEDDING_ENABLED: "true"
  SPRING_AI_BAIDU_EMBEDDING_OPTIONS_MODEL: embedding-v1
  # SPRING_AI_BAIDU_EMBEDDING_OPTIONS_DIMENSIONS: 1024
```

---

### 9. 腾讯混元（tencent，OpenAI 兼容，需 API Key）

```bash
spring.ai.tencent.base-url=https://api.hunyuan.cloud.tencent.com
spring.ai.tencent.api-key=你的APIKey
spring.ai.tencent.embedding.enabled=true
spring.ai.tencent.embedding.options.model=hunyuan-embedding

# 可选：仅当服务端支持时配置
# spring.ai.tencent.embedding.options.dimensions=1024
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_TENCENT_BASE_URL: https://api.hunyuan.cloud.tencent.com
  SPRING_AI_TENCENT_API_KEY: 你的APIKey
  SPRING_AI_TENCENT_EMBEDDING_ENABLED: "true"
  SPRING_AI_TENCENT_EMBEDDING_OPTIONS_MODEL: hunyuan-embedding
  # SPRING_AI_TENCENT_EMBEDDING_OPTIONS_DIMENSIONS: 1024
```

---

### 10. 火山引擎（volcengine，OpenAI 兼容，需 API Key）

```bash
spring.ai.volcengine.base-url=https://ark.cn-beijing.volces.com/api/v3
spring.ai.volcengine.api-key=你的APIKey
spring.ai.volcengine.embedding.enabled=true
spring.ai.volcengine.embedding.options.model=doubao-embedding

# 可选：仅当服务端支持时配置
# spring.ai.volcengine.embedding.options.dimensions=1024
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_VOLCENGINE_BASE_URL: https://ark.cn-beijing.volces.com/api/v3
  SPRING_AI_VOLCENGINE_API_KEY: 你的APIKey
  SPRING_AI_VOLCENGINE_EMBEDDING_ENABLED: "true"
  SPRING_AI_VOLCENGINE_EMBEDDING_OPTIONS_MODEL: doubao-embedding
  # SPRING_AI_VOLCENGINE_EMBEDDING_OPTIONS_DIMENSIONS: 1024
```

---

### 11. Gitee（gitee，OpenAI 兼容，需 API Key）

```bash
spring.ai.gitee.base-url=https://api.gitee.com
spring.ai.gitee.api-key=你的APIKey
spring.ai.gitee.embedding.enabled=true
spring.ai.gitee.embedding.options.model=text-embedding-3-small

# 可选：仅当服务端支持时配置
# spring.ai.gitee.embedding.options.dimensions=1536
```

**Docker 环境变量写法（可选）**：

```yaml
environment:
  SPRING_AI_GITEE_BASE_URL: https://api.gitee.com
  SPRING_AI_GITEE_API_KEY: 你的APIKey
  SPRING_AI_GITEE_EMBEDDING_ENABLED: "true"
  SPRING_AI_GITEE_EMBEDDING_OPTIONS_MODEL: text-embedding-3-small
  # SPRING_AI_GITEE_EMBEDDING_OPTIONS_DIMENSIONS: 1536
```

---

## 三、向量数据库配置

向量数据库用于存储和检索向量数据，常用 elasticsearch。

```bash
spring.ai.vectorstore.type=elasticsearch
# 需与所选向量模型的维度一致：
# - Ollama BGE-M3 / 智谱 embedding-2：1024
# - 智谱 embedding-3：默认 2048（也可配 256/512/1024/2048，但必须与 embedding.options.dimensions 一致）
# - dashscope text-embedding-v1：1536
# - 其他 OpenAI 兼容 provider：请以所选 embedding 模型实际输出维度为准
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
