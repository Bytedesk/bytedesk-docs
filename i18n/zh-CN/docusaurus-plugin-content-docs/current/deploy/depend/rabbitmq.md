---
sidebar_label: RabbitMQ
sidebar_position: 6
---

# RabbitMQ 消息中间件

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [RabbitMQ 官方文档](https://www.rabbitmq.com/docs)。
:::

## 简介

RabbitMQ 是成熟的消息队列系统，具备高可靠性与易运维特性，适用于中小规模实时与异步场景。
微语系统已支持 **RabbitMQ（可配置启用）**，默认仍为 **Artemis**。Artemis 说明见 [Artemis 消息中间件文档](./artemis.md)。

## Docker 快速部署

```yaml
services:
  bytedesk-rabbitmq:
    image: rabbitmq:4.2.3-management
    container_name: rabbitmq-bytedesk
    restart: always
    environment:
      - RABBITMQ_DEFAULT_USER=admin
      - RABBITMQ_DEFAULT_PASS=admin
      - TZ=Asia/Shanghai
    ports:
      - "5673:5672"     # AMQP
      - "15673:15672"   # Management UI
    volumes:
      - rabbitmq_data:/var/lib/rabbitmq
    networks:
      - bytedesk-network
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  rabbitmq_data:

networks:
  bytedesk-network:
    driver: bridge
```

## 微语应用配置

切换到 RabbitMQ 仅需修改配置，无需改代码：

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

## 管理控制台

- 访问地址：http://127.0.0.1:15673
- 默认账号：admin / admin

## 注意事项

- 集群环境中所有微语实例必须使用相同的 `bytedesk.mq.type` 与同一 RabbitMQ 集群。
- Kafka/RocketMQ 将在后续版本支持。
