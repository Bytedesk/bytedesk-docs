---
sidebar_label: Artemis
sidebar_position: 5
---

# Artemis Message Middleware

:::tip System Requirements

- OS: Ubuntu 22.04 LTS
- Recommended server: 2 vCPU, 4 GB RAM
:::

:::info Third-party Component Note
The following is for reference only. For exact configuration and usage, please refer to the official Apache ActiveMQ Artemis documentation: https://activemq.apache.org/components/artemis/documentation/latest/
:::

## Overview

Apache ActiveMQ Artemis is a high-performance, asynchronous messaging system from the Apache Software Foundation. As one of the core components of the Weiyu system (built on Spring Boot 3.x), the Artemis message queue plays a critical role, mainly for real-time chat message delivery and large-scale FAQ batch imports.

## Use cases in Weiyu

### Real-time chat message processing

- Instant messaging between agents and visitors
- Reliable delivery: no loss, no duplicates
- High concurrency handling for massive online users
- Multi-device sync across endpoints

### Batch data processing

- Batch import of knowledge base articles and FAQs
- Asynchronous processing for time-consuming tasks to improve response time
- Queue-based scheduling for large batch jobs

## Why Artemis

Compared to other MQ systems, Artemis offers:

- High performance: greater throughput and lower latency
- Reliability: full JMS and AMQP support for reliable delivery
- Spring Boot integration: seamless with Spring Boot 3.x
- Multi-protocol: JMS, AMQP, STOMP, MQTT, etc.
- Flexible models: point-to-point queues and pub/sub topics

## Method 1: Deploy with Docker (recommended)

A simple, efficient, and manageable way to deploy Artemis. Example docker-compose:

```yaml
services:
  # Artemis message middleware service
  bytedesk-artemis:
    image: apache/activemq-artemis:latest
    container_name: artemis-bytedesk
    environment:
      - ARTEMIS_USER=admin           # admin username
      - ARTEMIS_PASSWORD=admin       # admin password
      - ANONYMOUS_LOGIN=false        # disable anonymous login
      - EXTRA_ARGS=--http-host 0.0.0.0 --relax-jolokia
    ports:
      - "16161:61616"   # JMS
      - "18161:8161"    # Web console
      - "16162:61617"   # AMQP
      - "15672:5672"    # AMQP (alt)
      - "16163:61613"   # STOMP
      - "11883:1883"    # MQTT
    volumes:
      - artemis_data:/var/lib/artemis/data
    networks:
      - bytedesk-network
    restart: always
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8161/console/jolokia/read/org.apache.activemq.artemis:broker=\"0.0.0.0\""]
      interval: 30s
      timeout: 10s
      retries: 5

volumes:
  artemis_data:

networks:
  bytedesk-network:
    driver: bridge
```

## Method 2: Download and extract package

- Download: https://activemq.apache.org/components/artemis/download/

## Installation

```shell
./apache-artemis-2.37.0/bin/artemis create mybroker
# username/password: admin/admin
./mybroker/bin/artemis run          # foreground
./mybroker/bin/artemis-service start # background
./mybroker/bin/artemis stop
./mybroker/bin/artemis-service status
./mybroker/bin/artemis-service log
./apache-artemis-2.37.0/bin/artemis help create
# Modify ports if needed (broker.xml)
# Web console: http://localhost:8161
```

## Deployment modes in Weiyu

### 1. Embedded mode (recommended for dev/test)

Spring Boot starts an embedded broker automatically. No external Artemis needed.

Pros:
- No extra installation
- Simple configuration, ready to use
- Best for development/testing
- Fast to start and debug

Cons:
- Lower performance
- Not suitable for production
- No clustering

Config:

```properties
spring.artemis.mode=embedded
```

### 2. Native mode (recommended for production)

Connects to an external Artemis broker.

Pros:
- Higher performance
- Supports clustering
- Production-grade
- Better scalability and maintainability

Cons:
- Requires separate installation/configuration
- More complex
- Maintain an independent service

## Weiyu app configuration

### Native mode (production)

```properties
spring.artemis.mode=native
spring.artemis.broker-url=tcp://127.0.0.1:16161
spring.artemis.user=admin
spring.artemis.password=admin
```

## Switching modes

1) Change `spring.artemis.mode`
2) Comment out current mode’s configs
3) Enable target mode’s configs
4) Restart the app

## Optional configuration (JMS + pooling + health)

```bash
spring.jms.listener.auto-startup=true
spring.jms.listener.acknowledge-mode=auto
spring.jms.listener.concurrency=5
spring.jms.listener.max-concurrency=50
spring.jms.listener.receive-timeout=15000
spring.jms.listener.max-attempts=3
spring.jms.listener.initial-interval=2000
spring.jms.listener.max-interval=15000
spring.jms.listener.multiplier=2.0
spring.jms.listener.missing-queues-fatal=false
spring.jms.listener.connection-factory-fatal=false

spring.artemis.pool.enabled=true
spring.artemis.pool.max-connections=20
spring.artemis.pool.min-connections=5
spring.artemis.pool.time-between-expiration-check=10000
spring.artemis.pool.idle-timeout=60000
spring.artemis.pool.max-lifetime=300000

spring.artemis.connection-timeout=15000
spring.artemis.connection-ttl=30000
spring.artemis.call-timeout=15000
spring.artemis.call-failover-timeout=15000
spring.artemis.retry-interval=2000
spring.artemis.max-retry-interval=30000
spring.artemis.reconnect-attempts=15
spring.artemis.initial-connect-attempts=5
spring.artemis.consumer-window-size=0
spring.artemis.producer-window-size=0
spring.artemis.consumer-max-rate=-1
spring.artemis.producer-max-rate=-1
spring.artemis.confirmation-window-size=-1
spring.artemis.block-on-durable-send=false
spring.artemis.block-on-non-durable-send=false

management.health.jms.enabled=true
management.health.artemis.enabled=true
```

## Notes

- Embedded: ConnectionFactory auto-created by Spring Boot
- Native: create and configure ConnectionFactory manually
- Both modes share the same JMS configs and support Actuator health checks

## Troubleshooting

Connection failures:
- Check Artemis status (docker logs/service status)
- Verify connection params (URL/user/password/network)
- Inspect app logs for JMS/Artemis errors

Performance issues:
- Increase pool size, tune concurrency, and timeouts

Message loss:
- Use appropriate acknowledge mode, enable DLQ, inspect console

High memory usage:
- Tune JVM, enable persistence (embedded), limit queue size

Docker env (example excerpt):

```yaml
services:
  bytedesk-server:
    image: bytedesk/bytedesk-server:latest
    environment:
      - SPRING_ARTEMIS_MODE=native
      - SPRING_ARTEMIS_BROKER_URL=tcp://bytedesk-artemis:61616
      - SPRING_ARTEMIS_USER=admin
      - SPRING_ARTEMIS_PASSWORD=admin
    depends_on:
      - bytedesk-artemis
```

Web console:
- URL: http://127.0.0.1:18161/console
- User: admin / Password: admin

## Comparison with other MQ systems

| Item | Artemis | RabbitMQ | Kafka | RocketMQ |
|------|---------|----------|-------|----------|
| Positioning | General-purpose MQ | Reliability-first broker | High-throughput streaming | Financial-grade MQ |
| Performance | Very high (M TPS) | Medium (10k+ TPS) | Very high (M TPS) | High (100k+ TPS) |
| Ease of use | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Ops complexity | Low | Low | High | Medium |
| Spring integration | Best (native) | Good | Good | Good |
| Protocols | AMQP, MQTT, STOMP, OpenWire, Core | AMQP | Custom | Custom |
| Resource usage | Low | Medium | High | Medium |
| Deployment | Easy | Easy | Complex | Medium |
| Reliability | High | High | High (with config) | High |
| Community | Medium | High | Very high | High |

Why Weiyu chooses Artemis:
- Best fit for real-time messaging in customer service
- Minimal config/maintenance compared to Kafka/RocketMQ
- Seamless Spring Boot 3.x integration
- Multi-protocol support for diverse clients
- One middleware for both real-time and batch scenarios

References:
- Spring Boot JMS: https://docs.spring.io/spring-boot/reference/messaging/jms.html
- Apache Artemis: https://activemq.apache.org/components/artemis/documentation/latest/index.html
- Spring JMS Guide: https://spring.io/guides/gs/messaging-jms/
- Docker image: https://hub.docker.com/r/apache/activemq-artemis
