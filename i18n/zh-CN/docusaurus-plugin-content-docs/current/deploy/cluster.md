---
sidebar_label: 集群部署
sidebar_position: 8
---

# 微语集群部署方案

## 概述

微语系统支持两种部署模式：

- **开源社区版**：支持单机部署，适合小型团队或个人使用
- **企业版**：支持集群部署，适合中大型企业使用，提供高可用性和水平扩展能力
- **平台版**：同企业版，支持集群部署，提供高可用性和水平扩展能力

本文档主要介绍企业版的集群部署方案，帮助您在生产环境中实现高可用、高并发的微语系统。

## 集群架构

微语系统的集群架构主要包括以下几个部分：

1. **负载均衡层**：Nginx或云服务商提供的负载均衡服务
2. **应用服务层**：多个微语服务实例
3. **消息中间件**：Apache ActiveMQ Artemis
4. **数据存储层**：MySQL、ElasticSearch、Redis集群

![集群架构图](/img/deploy/cluster-architecture.svg)

### 架构说明

微语服务实例与数据存储的交互采用两种方式：

- **直接连接**（蓝色实线）：用于同步操作，如用户登录验证、数据查询、配置管理等
- **消息中间件**（橙色虚线）：用于实时消息传递、状态同步、异步处理等
- **异步处理**（灰色虚线）：消息中间件与数据存储的异步交互

## 集群部署步骤

### 1. 部署 Artemis 消息中间件

集群部署的核心是让多个微语服务实例共享同一个消息中间件。首先，我们需要部署 Artemis：

> **详细说明**：有关 Artemis 消息中间件的安装部署、配置及使用的完整说明，请参考 [Artemis 消息中间件文档](./depend/artemis.md)

### 2. 配置微语服务连接Artemis

集群环境中，所有微语服务实例需要连接到同一个Artemis消息中间件。请为每个微语服务实例配置以下内容：

1. 在配置文件中将Artemis模式修改为`native`
2. 使用相同的Artemis broker-url地址
3. 配置适当的JMS监听器参数

> **重要提示**：请确保所有服务实例使用相同的Artemis服务器地址。在生产环境中，建议使用内网地址以提高消息传输效率并增强安全性。

配置具体示例及详细参数设置请参考 [Artemis 消息中间件文档](./depend/artemis.md#spring-boot-应用配置)

### 3. 部署多个微语服务实例

在不同服务器上部署多个微语服务实例，确保它们都连接到同一个Artemis消息中间件。

#### Docker部署示例

详细的Docker部署说明请参考：[Docker部署文档](./docker.md)

### 4. 配置负载均衡

使用Nginx或云服务商提供的负载均衡服务，将请求分发到多个微语服务实例。

#### Nginx配置示例

首先，在nginx.conf的http块中添加upstream配置：

```nginx
# 在nginx.conf文件中的http模块中添加
http {
    # ... 已有配置 ...
    
    # 配置REST API服务的负载均衡（可以根据需要修改upstream名称，例如替换"weiyuai"为你的系统名称）
    upstream weiyuai {
        ip_hash;  # 同一IP访问同一服务器，保持会话一致性
        server 127.0.0.1:9003 weight=2 max_fails=10 fail_timeout=60s;
        # 如需部署多台服务器实例，添加更多server行，例如：
        # server 172.16.81.2:9003 weight=2 max_fails=10 fail_timeout=60s;
        # server 172.16.81.3:9003 weight=2 max_fails=10 fail_timeout=60s;
    }

    # 配置WebSocket服务的负载均衡（可以根据需要修改upstream名称，例如替换"weiyuaiwss"为你的系统名称+wss）
    upstream weiyuaiwss {
        ip_hash;  # WebSocket连接必须保持会话一致性
        server 127.0.0.1:9885 weight=2 max_fails=10 fail_timeout=60s;
        # 如需部署多台服务器实例，添加更多server行，例如：
        # server 172.16.81.2:9885 weight=2 max_fails=10 fail_timeout=60s;
        # server 172.16.81.3:9885 weight=2 max_fails=10 fail_timeout=60s;
    }

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

详细的Nginx配置说明请参考：[Nginx配置文档](./depend/nginx.md#nginx主配置文件)

### 5. 会话共享与消息同步

多个服务实例之间的交互采用混合模式：

#### 通过消息中间件的交互（实时消息）
1. **客服上线消息**：客服登录后，上线消息通过Artemis广播到所有服务实例
2. **实时聊天消息**：客户发送消息后，通过Artemis路由到对应的客服
3. **客服状态同步**：客服状态变更（在线、忙碌、离线）通过Artemis同步到所有实例
4. **系统通知**：系统级通知和广播消息

#### 直接数据存储交互（同步操作）
1. **用户认证**：登录验证、权限检查等
2. **数据查询**：历史消息查询、配置信息获取等
3. **数据写入**：消息持久化、用户信息更新等
4. **缓存操作**：Redis缓存读写操作

## 集群监控与维护

### 监控Artemis队列

通过Artemis管理控制台监控消息队列状态：

- 访问 `http://your-artemis-host:18161/console`
- 查看队列深度、消息吞吐量等指标

### 服务实例健康检查

通过Spring Boot Actuator监控各服务实例的健康状态：

- 访问 `http://server-ip:8000/actuator/health`
- 查看服务健康状况、内存使用、线程状态等

## 最佳实践

1. **合理配置消费者数量**：根据服务器CPU核心数配置`spring.jms.listener.max-concurrency`
2. **监控消息积压**：定期检查Artemis队列深度，避免消息堆积
3. **配置消息重试机制**：设置适当的重试次数和间隔，确保消息处理可靠性
4. **定期备份Artemis数据**：确保消息中间件的数据安全

## 总结

通过Artemis消息中间件实现微语系统的集群部署，可以显著提升系统的可用性和并发处理能力。在该架构下，多个服务实例协同工作，共享消息和状态，为用户提供稳定、高效的客服体验。

对于大型企业，建议部署至少3个服务实例，并配置相应的监控告警机制，确保系统稳定运行。
