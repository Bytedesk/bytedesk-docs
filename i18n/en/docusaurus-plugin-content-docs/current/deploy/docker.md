---
sidebar_label: Docker Deployment
sidebar_position: 3
---

# Docker Deployment

:::info Trial License
Need a trial license? Please refer to: [Question 13: How to apply for licenseKey](../faq#question-13-how-to-apply-for-licensekey)
:::

:::tip

- Operating System: Ubuntu 22.04 LTS
- Server minimum configuration: 4 cores 8GB RAM
- Configuration requirements too high? Suggestion: You can split MySQL, Redis, Elasticsearch, ArtemisMQ and other services to other servers, keeping only core services on the main server. This can effectively reduce server configuration requirements.
- Docker Community Edition images, choose one of the two, recommend Alibaba Cloud image for domestic use
  - bytedesk/bytedesk-ce:latest # hub.docker.com community
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk-ce:latest # Alibaba Cloud community image
- Docker Enterprise Edition/Platform Edition images, choose one of the two, recommend Alibaba Cloud image for domestic use
  - bytedesk/bytedesk:latest # hub.docker.com enterprise
  - registry.cn-hangzhou.aliyuncs.com/bytedesk/bytedesk:latest # Alibaba Cloud enterprise/platform image

:::

## Quick Start

```bash
git clone https://github.com/Bytedesk/bytedesk.git
cd bytedesk/deploy/docker

# optional: copy env template
cp .env.example .env

# default startup: MySQL + Artemis, middleware only (keywords, any order)
./start mysql artemis middleware
```

For more combinations (PostgreSQL/Oracle, RabbitMQ, noai, call, full stack), see `deploy/docker/readme.md`.

### Optional: Pull models (when using local Ollama)

```bash
# Chat model
ollama pull qwen3:0.6b
# Vector model
ollama pull bge-m3:latest
```

## Stop Containers

```bash
# stop current middleware stack (keep containers)
./stop mysql artemis stop middleware

# remove current middleware stack containers (keep volumes)
./stop mysql artemis down middleware
```

## Open Ports

Please open inbound ports in internal network

- 9003
- 9885

## Demo

Local preview

```bash
# Please replace 127.0.0.1 with your server IP
Access address: http://127.0.0.1:9003/
Default account: admin@email.com
Default password: admin
```

## Orchestration Content (Layered)

- [compose/compose-elasticsearch.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-elasticsearch.yaml)
- [compose/compose-mysql.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-mysql.yaml)
- [compose/compose-postgresql.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-postgresql.yaml)
- [compose/compose-oracle.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-oracle.yaml)
- [compose/compose-artemis.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-artemis.yaml)
- [compose/compose-rabbitmq.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-rabbitmq.yaml)
- [compose/compose-freeswitch.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-freeswitch.yaml)
- [compose/compose-bytedesk.yaml](https://github.com/Bytedesk/bytedesk/blob/main/deploy/docker/compose/compose-bytedesk.yaml)

If you use cloud models (such as ZhipuAI), configure it in `compose/compose-bytedesk.yaml`:

```yaml
# Apply for Zhipu AI API Key: https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys
SPRING_AI_ZHIPUAI_API_KEY: 'sk-xxx' # Zhipu AI API Key
SPRING_AI_ZHIPUAI_CHAT_ENABLED: "true"
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_MODEL: glm-4-flash
SPRING_AI_ZHIPUAI_CHAT_OPTIONS_TEMPERATURE: 0.7
SPRING_AI_ZHIPUAI_EMBEDDING_ENABLED: "true"
```

## Troubleshooting

View logs

```bash
# For example, view MySQL container logs
docker logs mysql-bytedesk
```
