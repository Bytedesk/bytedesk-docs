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

## Artemis 部署模式选择

微语系统支持两种 Artemis 部署模式，您可以根据实际需求选择最适合的方式：

### 1. Embedded 模式（开发测试推荐）

Embedded 模式下，Spring Boot 会自动启动内嵌的 Artemis broker，无需额外安装和配置 Artemis 服务。

**优点：**

- 无需额外安装 Artemis
- 配置简单，开箱即用
- 适合开发和测试环境
- 快速启动和调试

**缺点：**

- 性能相对较低
- 不适合生产环境
- 无法支持集群部署

**配置示例：**

```properties
# ===============================
# = Artemis Embedded 模式配置
# ===============================
# 启用 embedded 模式
spring.artemis.mode=embedded
```

### 2. Native 模式（生产环境推荐）

Native 模式连接到外部独立的 Artemis broker，适合生产环境部署。

**优点：**

- 性能更高
- 支持集群部署
- 适合生产环境
- 更好的可扩展性和可维护性

**缺点：**

- 需要额外安装和配置 Artemis
- 配置相对复杂
- 需要维护独立的消息服务

## 微语应用配置

:::note 多消息中间件支持
系统已支持多种消息中间件：**Artemis（默认）** 与 **RabbitMQ（可配置启用）**。Kafka/RocketMQ 将在后续版本支持。
通过统一配置切换，无需修改代码。RabbitMQ 说明见 [RabbitMQ 消息中间件文档](./rabbitmq.md)。
:::

### Native 模式配置（生产环境推荐）

在微语中配置连接到Docker中的Artemis。下面分别展示配置与对应的Docker环境变量设置方式：

```properties
# ===============================
# = Artemis Native 模式配置
# ===============================
# 启用 native 模式
spring.artemis.mode=native

# native 模式连接配置
spring.artemis.broker-url=tcp://127.0.0.1:16161
spring.artemis.user=admin
spring.artemis.password=admin

# ===============================
# = MQ 类型切换（默认 artemis）
# ===============================
bytedesk.mq.type=artemis
```

### RabbitMQ 配置示例（可选）

如需切换到 RabbitMQ，请将 `bytedesk.mq.type` 设置为 `rabbitmq`，并配置连接信息：

```properties
# ===============================
# = MQ 类型切换
# ===============================
bytedesk.mq.type=rabbitmq

# ===============================
# = RabbitMQ 连接配置
# ===============================
bytedesk.mq.rabbitmq.enabled=true
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=admin
spring.rabbitmq.virtual-host=/
spring.rabbitmq.connection-timeout=5000
```

## 配置模式切换

### 如何在两种模式之间切换

要在 Embedded 模式和 Native 模式之间切换，请按以下步骤操作：

1. **修改模式配置**：更改 `spring.artemis.mode` 属性值
2. **注释当前模式配置**：将当前模式的相关配置注释掉
3. **启用目标模式配置**：取消注释目标模式的配置
4. **重启应用**：重启微语应用以使配置生效

## 更多配置参数(可选配置项)

```bash
# ===============================
# = JMS 配置（适用于两种模式）
# ===============================
# 启用Spring Boot的JMS自动配置，让Spring Boot自动管理ConnectionFactory
spring.jms.listener.auto-startup=true
spring.jms.listener.acknowledge-mode=auto
# 并发消费者数 - 增加并发处理能力
spring.jms.listener.concurrency=5
spring.jms.listener.max-concurrency=50
# 增加接收超时时间
spring.jms.listener.receive-timeout=15000
# 消息失败重试配置
spring.jms.listener.max-attempts=3
# 指数退避算法的初始间隔（毫秒）
spring.jms.listener.initial-interval=2000
# 指数退避算法的最大间隔（毫秒）
spring.jms.listener.max-interval=15000
# 指数退避算法的乘数
spring.jms.listener.multiplier=2.0
# 启用JMS错误处理
spring.jms.listener.missing-queues-fatal=false
spring.jms.listener.connection-factory-fatal=false

# 连接池配置 - 解决连接问题
spring.artemis.pool.enabled=true
spring.artemis.pool.max-connections=20
spring.artemis.pool.min-connections=5
spring.artemis.pool.time-between-expiration-check=10000
spring.artemis.pool.idle-timeout=60000
spring.artemis.pool.max-lifetime=300000

# 连接超时和重试配置
spring.artemis.connection-timeout=15000
spring.artemis.connection-ttl=30000
spring.artemis.call-timeout=15000
spring.artemis.call-failover-timeout=15000

# 连接重试和故障转移配置
spring.artemis.retry-interval=2000
spring.artemis.max-retry-interval=30000
spring.artemis.reconnect-attempts=15
spring.artemis.initial-connect-attempts=5

# 流控制和性能配置
spring.artemis.consumer-window-size=0
spring.artemis.producer-window-size=0
spring.artemis.consumer-max-rate=-1
spring.artemis.producer-max-rate=-1
spring.artemis.confirmation-window-size=-1
spring.artemis.block-on-durable-send=false
spring.artemis.block-on-non-durable-send=false

# ===============================
# = Artemis 健康检查配置
# ===============================
management.health.jms.enabled=true
management.health.artemis.enabled=true
```

## 重要说明

### ConnectionFactory 创建机制

- **Embedded 模式**：Spring Boot 自动创建内嵌的 ConnectionFactory
- **Native 模式**：手动创建并配置连接到外部 Artemis 的 ConnectionFactory

### 监听器工厂和 JmsTemplate

- 两种模式都使用相同的 JMS 配置
- 自动使用对应模式的 ConnectionFactory
- 监听器工厂和 JmsTemplate 配置保持一致

### 健康检查

- 两种模式都支持 Spring Boot Actuator 健康检查
- 可通过 `/actuator/health` 端点查看 Artemis 连接状态
- 生产环境建议启用健康检查监控

### 配置管理最佳实践

1. **集中管理**：所有 Artemis 和 JMS 配置集中在一个配置块中
2. **避免重复**：不同模式的配置通过注释切换，避免配置分散
3. **环境区分**：不同环境使用不同的配置文件（如 application-dev.properties、application-prod.properties）
4. **版本控制**：将配置文件纳入版本控制，便于配置变更追踪

## 故障排除

### 连接失败问题

**问题现象**：应用启动时出现连接 Artemis 失败的错误

**排查步骤**：

1. **检查 Artemis 服务状态**

   ```bash
   # Docker 方式检查
   docker ps | grep artemis
   docker logs artemis-bytedesk
   
   # 独立安装方式检查
   ./mybroker/bin/artemis-service status
   ```

2. **验证连接参数**
   - 检查 broker URL 是否正确（IP、端口）
   - 验证用户名和密码是否匹配
   - 确认网络连通性

3. **查看应用日志**

   ```bash
   # 查找 JMS 和 Artemis 相关错误
   grep -i "artemis\|jms" application.log
   ```

### 性能问题优化

**问题现象**：消息处理延迟高或吞吐量低

**优化建议**：

1. **调整连接池配置**

   ```properties
   # 增加连接池大小
   spring.artemis.pool.max-connections=50
   spring.artemis.pool.idle-timeout=30000
   ```

2. **优化并发消费者数量**

   ```properties
   # 根据 CPU 核心数调整
   spring.jms.listener.max-concurrency=20
   ```

3. **配置适当的超时时间**

   ```properties
   # 调整接收超时
   spring.jms.listener.receive-timeout=5000
   ```

### 消息丢失问题

**问题现象**：消息发送后未能正确投递或处理

**排查方案**：

1. **检查消息确认模式**

   ```properties
   # 使用客户端确认模式
   spring.jms.listener.acknowledge-mode=client
   ```

2. **启用死信队列**

   ```properties
   # 配置死信队列处理失败消息
   spring.artemis.embedded.queues=DLQ
   ```

3. **查看 Artemis 管理控制台**
   - 访问 `http://server:18161/console`
   - 检查队列中的消息堆积情况
   - 查看死信队列中的失败消息

### 内存使用过高

**问题现象**：Artemis 或应用内存占用过高

**解决方案**：

1. **调整 JVM 堆内存**

   ```bash
   # Docker 环境变量
   JAVA_OPTS: "-Xmx2g -Xms1g"
   ```

2. **配置消息持久化**

   ```properties
   # Embedded 模式启用持久化
   spring.artemis.embedded.persistent=true
   ```

3. **限制队列大小**

   ```xml
   <!-- 在 artemis-config.xml 中配置 -->
   <max-size-bytes>100MB</max-size-bytes>
   ```

### Docker 环境变量配置

在使用 Docker 部署微语服务时，可以通过环境变量来设置以上配置：

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

## 相关资源链接

### 官方文档

- [Spring Boot JMS 文档](https://docs.spring.io/spring-boot/reference/messaging/jms.html) - Spring Boot JMS 集成指南
- [Apache Artemis 官方文档](https://activemq.apache.org/components/artemis/documentation/latest/index.html) - Artemis 完整文档
- [Spring JMS 指南](https://spring.io/guides/gs/messaging-jms/) - Spring JMS 快速入门
- [Artemis Docker镜像说明](https://hub.docker.com/r/apache/activemq-artemis) - Docker 部署参考

## 总结

Apache ActiveMQ Artemis 作为微语系统的消息中间件，在实时通讯场景中具有出色的性能和可靠性。本文档详细介绍了：

1. **两种部署模式**：Embedded 模式适合开发测试，Native 模式适合生产环境
2. **完整配置指南**：包含所有必要的配置参数和最佳实践
3. **模式切换方法**：如何在不同模式间灵活切换
4. **故障排除方案**：常见问题的诊断和解决方法
5. **性能优化建议**：提升系统性能的配置技巧

通过 Docker 方式部署大大简化了安装和配置过程，无需关心繁琐的服务器配置细节，让您可以更专注于业务功能的开发。选择合适的部署模式，并根据实际需求调整配置参数，可以让微语系统发挥最佳性能。

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
