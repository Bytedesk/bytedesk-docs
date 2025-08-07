---
sidebar_label: Artemis
sidebar_position: 5
---

# Artemis 消息中间件

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [Apache ActiveMQ Artemis 官方文档](https://activemq.apache.org/components/artemis/documentation/latest/)。
:::

## 简介

Apache ActiveMQ Artemis 是 Apache 软件基金会开源的一个高性能、异步的消息传递系统。作为微语系统（基于Spring Boot 3.x开发）的核心组件之一，Artemis 消息队列在系统中扮演着至关重要的角色，主要用于处理实时聊天消息收发以及大规模FAQ文件批量导入等场景。

## Artemis 在微语系统中的应用场景

### 实时聊天消息处理

- **消息即时收发**：支持客服与访客之间的实时消息传递
- **消息可靠投递**：确保消息不丢失、不重复
- **高并发处理**：能够应对大量用户同时在线的场景
- **多设备同步**：实现消息在多端同步展示

### 批量数据处理

- **FAQ文件批量导入**：支持知识库文章、FAQ问答等大量数据的批量导入
- **数据异步处理**：将耗时操作异步化，提高系统响应速度
- **任务队列管理**：对大型批处理任务进行排队和调度

## 为什么选择 Artemis

Artemis 相比其他消息队列系统具有以下优势：

- **高性能**：更高的消息吞吐量和更低的延迟
- **可靠性**：支持完整的JMS和AMQP协议，确保消息可靠投递
- **Spring Boot整合**：与Spring Boot 3.x完美集成，配置简单
- **多协议支持**：同时支持JMS、AMQP、STOMP、MQTT等多种协议
- **灵活消息模式**：支持点对点队列和发布订阅主题两种模式

## 方法一：使用Docker安装Artemis

推荐使用Docker方式部署Artemis，简单高效且易于管理。下面是完整的docker-compose配置示例：

```yaml
services:
  # Artemis消息中间件服务配置
  bytedesk-artemis:
    image: apache/activemq-artemis:latest
    container_name: artemis-bytedesk
    environment:
      # 基本认证设置
      - ARTEMIS_USER=admin           # 管理员账号
      - ARTEMIS_PASSWORD=admin       # 管理员密码
      - ANONYMOUS_LOGIN=false        # 禁用匿名登录
      # 额外参数
      - EXTRA_ARGS=--http-host 0.0.0.0 --relax-jolokia  # 允许远程访问
    ports:
      - "16161:61616"   # JMS端口
      - "18161:8161"    # Web控制台端口
      - "16162:61617"   # AMQP端口
      - "15672:5672"    # AMQP端口(备用)
      - "16163:61613"   # STOMP端口
      - "11883:1883"    # MQTT端口
    volumes:
      - artemis_data:/var/lib/artemis/data  # 数据持久化
    networks:
      - bytedesk-network
    restart: always     # 自动重启
    healthcheck:        # 健康检查
      test: ["CMD", "curl", "--fail", "http://localhost:8161/console/jolokia/read/org.apache.activemq.artemis:broker=\"0.0.0.0\""]
      interval: 30s
      timeout: 10s
      retries: 5

# 存储卷与网络定义
volumes:
  artemis_data:  # Artemis数据持久化卷

networks:
  bytedesk-network:
    driver: bridge
```

## 方法二：直接下载安装包解压部署

- [下载Artemis安装包](https://activemq.apache.org/components/artemis/download/)

## 安装

```shell
# 解压到apache-artemis-2.37.0
# tar -zxvf apache-artemis-2.37.0-bin.tar.gz
# artemis需要创建一个文件夹，cd到目标文件夹，执行以下命令，创建mybroker文件夹
./apache-artemis-2.37.0/bin/artemis create mybroker
# 输入用户名和密码: admin/admin
# 前台启动
./mybroker/bin/artemis run
# 后台启动
./mybroker/bin/artemis-service start
# 停止
./mybroker/bin/artemis stop
# 查看状态
./mybroker/bin/artemis-service status
# 查看日志
./mybroker/bin/artemis-service log
# 查看帮助
# 配置
./apache-artemis-2.37.0/bin/artemis help create
# 修改端口号，本地冲突，将默认端口号+1
vim mybroker/etc/broker.xml
# web管理界面
http://localhost:8161
```

## 微语应用配置

在微语中配置连接到Docker中的Artemis。下面分别展示配置与对应的Docker环境变量设置方式：

### 微语属性配置（application.properties）

```properties
# ===============================
# = Artemis 基本连接配置
# ===============================
spring.artemis.mode=native      # 独立模式，适合生产环境
spring.artemis.broker-url=tcp://127.0.0.1:16161
spring.artemis.user=admin
spring.artemis.password=admin

# 并发消费者配置
spring.jms.listener.concurrency=1        # 最小消费者数
spring.jms.listener.max-concurrency=10   # 最大消费者数 

# 消息确认与会话配置
spring.jms.listener.acknowledge-mode=client
spring.jms.listener.auto-startup=true

# 消息重试配置
spring.jms.listener.max-attempts=5             # 最大重试次数
spring.jms.listener.initial-interval=1000      # 初始重试间隔(毫秒)
spring.jms.listener.max-interval=10000         # 最大重试间隔(毫秒)
spring.jms.listener.multiplier=2.0             # 退避乘数
spring.jms.listener.receive-timeout=1000       # 接收超时

# 队列与错误处理
spring.artemis.embedded.queues=DLQ            # 死信队列
spring.jms.listener.missing-queues-fatal=false # JMS错误处理

# 可选：发布订阅模式
# spring.jms.pub-sub-domain=true              # 启用时为发布订阅模式
```

### 对应的Docker环境变量配置

在使用Docker部署微语服务时，可以通过环境变量来设置以上配置：

```yaml
services:
  bytedesk-server:
    image: bytedesk/bytedesk-server:latest
    environment:
      # Artemis基本连接配置
      - SPRING_ARTEMIS_MODE=native
      - SPRING_ARTEMIS_BROKER_URL=tcp://bytedesk-artemis:61616
      - SPRING_ARTEMIS_USER=admin
      - SPRING_ARTEMIS_PASSWORD=admin
      
      # 并发消费者配置
      - SPRING_JMS_LISTENER_CONCURRENCY=1
      - SPRING_JMS_LISTENER_MAX_CONCURRENCY=10
      
      # 消息确认与会话配置
      - SPRING_JMS_LISTENER_ACKNOWLEDGE_MODE=client
      - SPRING_JMS_LISTENER_AUTO_STARTUP=true
      
      # 消息重试配置
      - SPRING_JMS_LISTENER_MAX_ATTEMPTS=5
      - SPRING_JMS_LISTENER_INITIAL_INTERVAL=1000
      - SPRING_JMS_LISTENER_MAX_INTERVAL=10000
      - SPRING_JMS_LISTENER_MULTIPLIER=2.0
      - SPRING_JMS_LISTENER_RECEIVE_TIMEOUT=1000
      
      # 队列与错误处理
      - SPRING_ARTEMIS_EMBEDDED_QUEUES=DLQ
      - SPRING_JMS_LISTENER_MISSING_QUEUES_FATAL=false
      
      # 其他微语系统配置...
    depends_on:
      - bytedesk-artemis
    networks:
      - bytedesk-network
```

## 访问Web管理控制台

部署完成后，可以通过浏览器访问Web管理界面：

```bash
# 替换为自己服务器的IP地址
# artemis管理控制台访问地址
http://127.0.0.1:18161/console
```

使用以下凭据登录：

- 用户名：admin
- 密码：admin

> **提示**：访问管理控制台可以监控队列状态、消息流量和健康状况，是排查问题的重要工具
> **集群环境提示**:
>
> 1. 确保所有微语服务实例使用相同的Artemis服务器地址
> 2. 推荐使用内网地址（如Docker网络中的容器名称）以提高性能和安全性
> 3. 根据服务器CPU核心数合理设置最大消费者数（max-concurrency）

## 总结

Apache ActiveMQ Artemis 作为微语系统的消息中间件，在实时通讯场景中具有出色的性能和可靠性。通过Docker方式部署大大简化了安装和配置过程，无需关心繁琐的服务器配置细节，让您可以更专注于业务功能的开发。

## Artemis与其他消息队列系统对比

作为消息中间件领域的后起之秀，Artemis在多个方面展现出了相比RabbitMQ、Kafka、RocketMQ等流行消息队列系统的独特优势。下面从多个维度对比了几种主流消息队列系统，帮助您理解微语系统选择Artemis的原因：

| 对比项 | Artemis | RabbitMQ | Kafka | RocketMQ |
|-------|---------|----------|-------|----------|
| **定位** | 全能型消息中间件 | 可靠性优先的消息代理 | 高吞吐量的流处理平台 | 金融级消息中间件 |
| **性能** | 极高（百万级TPS） | 中等（数万级TPS） | 极高（百万级TPS） | 高（十万级TPS） |
| **易用性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **运维复杂度** | 低 | 低 | 高 | 中 |
| **Spring整合** | 原生支持（最佳） | 良好 | 良好 | 良好 |
| **协议支持** | AMQP, MQTT, STOMP, OpenWire, Core | AMQP | 自定义协议 | 自定义协议 |
| **资源占用** | 低 | 中 | 高 | 中 |
| **部署难度** | 简单 | 简单 | 复杂 | 中等 |
| **消息可靠性** | 高 | 高 | 高（需配置） | 高 |
| **社区活跃度** | 中等 | 高 | 极高 | 高 |

### 为什么微语系统选择Artemis？

1. **实时通讯场景最佳匹配**
   - Artemis专为低延迟、高并发的消息场景设计，完美匹配客服系统的实时通讯需求
   - 对于客服消息这类小消息量大并发场景，Artemis表现出色

2. **最简配置与维护**
   - 相比Kafka和RocketMQ复杂的集群配置，Artemis单节点即可满足大多数中小企业需求
   - Docker一键部署，无需深入了解中间件内部机制

3. **与Spring Boot 3.x的无缝集成**
   - Spring官方推荐的JMS实现，自动装配、零配置集成
   - 丰富的注解支持和简洁的API设计，降低开发门槛

4. **多协议支持**
   - 同时支持AMQP、MQTT等多种协议，使未来集成多样化客户端更加便捷
   - 无需为不同设备端（小程序、APP、网页等）部署不同中间件

5. **单一中间件解决多场景需求**
   - 既能处理实时消息的即时投递，又能应对批量导入的大量数据处理
   - 队列和主题模式灵活切换，满足不同业务场景

### 实用建议

针对不同规模的企业，我们有以下建议：

- **初创公司/小团队**: 单节点Artemis足够应对大部分场景，简单易用且性能优异
- **中型企业**: 可考虑Artemis集群配置，提高可用性
- **大型企业/特殊场景**:
  - 如果已有成熟的Kafka/RocketMQ运维团队，可继续使用现有中间件
  - 超高并发场景(日消息量>千万级)可考虑Kafka
  - 需要复杂路由规则可考虑RabbitMQ

无论您选择哪种消息队列系统，微语都能通过配置进行适配。但对于大多数用户而言，Artemis提供了最佳的性能与易用性平衡，是微语系统推荐的首选消息中间件。

## 参考资料

- [ActiveMQ Artemis官方文档](https://activemq.apache.org/components/artemis/documentation/latest/)
- [Artemis Docker镜像说明](https://hub.docker.com/r/apache/activemq-artemis)
- [Spring Boot与Artemis集成指南](https://spring.io/guides/gs/messaging-jms/)
