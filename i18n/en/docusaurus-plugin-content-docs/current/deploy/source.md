---
sidebar_label: Source Code
sidebar_position: 1
---

# Source Code Deployment

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server Requirements: Minimum 2 cores 4GB RAM, Recommended 4 cores 8GB RAM

:::

## Dependencies

- [JDK](/docs/deploy/depend/jdk)
- [MySQL](/docs/deploy/depend/mysql) or [PostgreSQL](/docs/deploy/depend/postgresql)
- [Redis](/docs/deploy/depend/redis)
- [Nginx](/docs/deploy/depend/nginx)
- [Docker](/docs/deploy/depend/docker)
- [Let's Encrypt](/docs/deploy/depend/letsencrypt)

## Download

```bash
# Download source code
git clone https://github.com/bytedesk/bytedesk.git
cd bytedesk
# Install dependencies
yarn install
# Start development
yarn dev
# Build for production
yarn build
```

## Configuration

```bash
# Modify configuration files
# Modify database configuration
vim config/application.yml
# Modify redis configuration
vim config/redis.yml
```

## Start

```bash
# Start server
./startup.sh
# View logs
tail -f logs/bytedesk.log
```

## Stop

```bash
# Stop server
./shutdown.sh
```

## Upgrade

```bash
# Pull latest code
git pull
# Build
yarn build
# Stop server
./shutdown.sh
# Start server
./startup.sh
```
