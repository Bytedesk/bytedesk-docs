---
sidebar_label: Elasticsearch
sidebar_position: 4
---

# Elasticsearch 在微语系统中的应用

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：4核8G内存
:::

## 简介

Elasticsearch 是一个分布式、RESTful 的搜索和分析引擎，在微语系统中扮演着重要角色。它主要用于以下两个方面：

1. **全文检索**：支持对历史对话和知识库内容进行高效检索
2. **向量存储与检索**：存储和检索 AI 生成的文本向量，支持语义搜索和相关性匹配

## 核心功能

### 全文检索

Elasticsearch 提供强大的全文搜索能力，在微语系统中用于：

- 对话历史快速检索
- 知识库文档搜索
- 多维度过滤（时间、会话、关键词等）
- 高亮匹配结果

### 向量存储与检索

作为向量数据库使用，Elasticsearch 支持：

- 存储大语言模型生成的文本嵌入向量
- 语义相似性搜索
- KNN（K近邻）检索
- 高维向量索引优化

## Docker 部署配置

微语系统推荐使用 Docker 容器化技术部署 Elasticsearch。[`docker-compose.yml`文件](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml)，以下是详细的 Docker 配置说明：

```yaml
# ElasticSearch 向量数据库
bytedesk-elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:8.18.0
  container_name: elasticsearch-bytedesk
  environment:
    - node.name=bytedesk-es01                # 节点名称
    - cluster.name=bytedesk-es-cluster       # 集群名称
    - discovery.type=single-node             # 单节点模式
    - bootstrap.memory_lock=true             # 内存锁定，避免内存交换到磁盘
    - "ES_JAVA_OPTS=-Xms512m -Xmx512m"       # JVM 内存设置
    - xpack.security.enabled=true            # 启用安全认证
    - ELASTIC_PASSWORD=bytedesk123           # 设置 elastic 用户密码
  ulimits:
    memlock:
      soft: -1
      hard: -1                               # 取消内存锁定限制
  volumes:
    - elasticsearch_data:/usr/share/elasticsearch/data  # 数据持久化
  ports:
    - "19200:9200"                           # REST API 端口映射
    - "19300:9300"                           # 节点通信端口映射
  networks:
    - bytedesk-network                       # 使用自定义网络
  healthcheck:
    test: ["CMD-SHELL", "curl -s -f http://localhost:9200/_cluster/health?wait_for_status=yellow || exit 1"]
    interval: 30s
    timeout: 10s
    retries: 5                               # 健康检查配置
```

### 配置项说明

#### 基本配置

- **image**: 使用官方 Elasticsearch 8.18.0 版本镜像
- **container_name**: 容器名称，方便识别和管理
- **node.name & cluster.name**: 定义节点和集群名称，即使是单节点也需要设置

#### 系统优化

- **discovery.type=single-node**: 设置为单节点模式，适合开发和小型部署
- **bootstrap.memory_lock=true**: 锁定内存，防止系统将内存交换到磁盘，提高性能
- **ES_JAVA_OPTS**: 配置 JVM 堆内存大小，根据实际服务器资源调整
- **ulimits.memlock**: 移除系统对内存锁定的限制

#### 安全设置

- **xpack.security.enabled=true**: 启用 X-Pack 安全功能，提供认证和授权
- **ELASTIC_PASSWORD**: 设置内置超级用户 elastic 的密码

#### 网络与存储

- **ports**: 将 Elasticsearch 的 REST API 和节点通信端口映射到宿主机
- **volumes**: 数据持久化存储，避免容器重启数据丢失
- **networks**: 使用自定义网络，便于与微语系统其他服务通信

#### 健康检查

- **healthcheck**: 定期检查 Elasticsearch 服务健康状态，确保服务可用性

## 微语系统中的应用集成

### 集成配置

在微语系统中集成 Elasticsearch 需要以下配置：

```properties
# Elasticsearch 配置
spring.elasticsearch.uris=http://elasticsearch-bytedesk:9200
spring.elasticsearch.username=elastic
spring.elasticsearch.password=bytedesk123
```

### 索引管理

微语系统会自动创建和管理以下索引：

- **bytedesk-messages**: 存储消息数据和向量
- **bytedesk-knowledge**: 存储知识库文档和向量
- **bytedesk-logs**: 存储系统操作日志

### 向量检索示例

```java
// 示例：使用向量检索相似文档
SearchResponse<KnowledgeDocument> response = elasticsearchClient.search(s -> s
    .index("bytedesk-knowledge")
    .knn(k -> k
        .field("embedding")
        .queryVector(queryEmbedding)
        .k(5)
        .numCandidates(100)
    ),
    KnowledgeDocument.class
);
```

## 性能优化建议

1. **硬件资源**：生产环境建议至少 4GB 内存，8GB 或更高更佳
2. **索引设置**：根据数据特点调整分片数和副本数
3. **批量操作**：使用批量API进行数据写入，减少请求次数
4. **查询优化**：使用过滤器和聚合优化查询性能
5. **定期维护**：设置索引生命周期管理策略

## 常见问题排查

1. **内存不足**：调整 ES_JAVA_OPTS 增加 JVM 堆内存
2. **连接超时**：检查网络配置和防火墙设置
3. **集群状态异常**：使用 `GET /_cluster/health` API 检查集群状态
4. **索引错误**：检查索引映射配置和数据类型

> **注意**：生产环境部署时，建议进一步加强安全措施，包括设置HTTPS、IP限制和角色权限管理。
