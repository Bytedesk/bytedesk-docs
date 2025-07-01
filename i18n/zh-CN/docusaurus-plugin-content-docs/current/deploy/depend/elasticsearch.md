---
sidebar_label: Elasticsearch
sidebar_position: 4
---

# Elasticsearch 在微语系统中的应用

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
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

## ## 方式一：Docker安装

- [使用Docker安装](../jar.md#12-安装项目依赖)

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
