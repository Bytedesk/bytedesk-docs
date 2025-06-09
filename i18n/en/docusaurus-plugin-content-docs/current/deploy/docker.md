---
sidebar_label: Docker
sidebar_position: 2
---

# Docker Deployment

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server Requirements: Minimum 2 cores 4GB RAM, Recommended 4 cores 8GB RAM

:::

## Dependencies

- [Docker](/docs/deploy/depend/docker)
- [MySQL](/docs/deploy/depend/mysql) or [PostgreSQL](/docs/deploy/depend/postgresql)
- [Redis](/docs/deploy/depend/redis)
- [Nginx](/docs/deploy/depend/nginx)
- [Let's Encrypt](/docs/deploy/depend/letsencrypt)

## Download

```bash
# Pull docker image
docker pull bytedesk/bytedesk:latest
```

## Configuration

```bash
# Create configuration directory
mkdir -p /etc/bytedesk/config
# Copy configuration files
cp config/* /etc/bytedesk/config/
# Modify database configuration
vim /etc/bytedesk/config/application.yml
# Modify redis configuration
vim /etc/bytedesk/config/redis.yml
```

## Start

```bash
# Start container
docker run -d \
  --name bytedesk \
  -p 9003:9003 \
  -v /etc/bytedesk/config:/app/config \
  -v /etc/bytedesk/logs:/app/logs \
  bytedesk/bytedesk:latest
# View logs
docker logs -f bytedesk
```

## Stop

```bash
# Stop container
docker stop bytedesk
# Remove container
docker rm bytedesk
```

## Upgrade

```bash
# Pull latest image
docker pull bytedesk/bytedesk:latest
# Stop container
docker stop bytedesk
# Remove container
docker rm bytedesk
# Start new container
docker run -d \
  --name bytedesk \
  -p 9003:9003 \
  -v /etc/bytedesk/config:/app/config \
  -v /etc/bytedesk/logs:/app/logs \
  bytedesk/bytedesk:latest
```
