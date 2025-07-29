---
sidebar_label: Docker Deployment
sidebar_position: 3
---

# Docker Deployment

:::info Trial License
Need a trial license? Please refer to: [Question 13: How to apply for licenseKey](/docs/faq#question-13-how-to-apply-for-licensekey)
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

## Method 1: One-line command startup, requires separate ollama installation

```bash
git clone https://gitee.com/270580156/weiyu.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose.yaml up -d
```

### Since the project uses ollama qwen3:0.6b model by default, you need to pull the model separately

```bash
# Chat model
ollama pull qwen3:0.6b
# Vector model
ollama pull bge-m3:latest
```

## Method 2: Use docker compose ollama, ollama integrated by default

```bash
git clone https://gitee.com/270580156/weiyu.git && cd weiyu/deploy/docker && docker compose -p weiyu -f docker-compose-ollama.yaml up -d
# Chat model
docker exec ollama-bytedesk ollama pull qwen3:0.6b
# Vector model
docker exec ollama-bytedesk ollama pull bge-m3:latest
```

## Stop Containers

```bash
docker compose -p weiyu -f docker-compose.yaml stop
# or
docker compose -p weiyu -f docker-compose-ollama.yaml stop
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

## Orchestration Content (Choose One)

- [Latest docker-compose.yaml - Uses Zhipu AI by default](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose.yaml)
- [Latest docker-compose-ollama.yaml - Uses ollama by default](https://gitee.com/270580156/weiyu/blob/main/deploy/docker/docker-compose-ollama.yaml)

If using docker-compose.yaml - you need to fill in Zhipu AI related configuration yourself, refer to the following configuration:

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
