---
sidebar_label: Redis
sidebar_position: 2
---

# Redis-stack-server

:::tip

- Operating System: Ubuntu 20.04 LTS  
- Server Requirements: Minimum 2 cores 4GB RAM, Recommended 4 cores 8GB RAM

:::

:::warning
Due to AI knowledge base Q&A using vector search, redis-stack-server needs to be installed instead of regular redis, otherwise AI knowledge base Q&A cannot function properly
:::

### Refer to [Redis official installation guide](https://redis.io/docs/install/install-stack/docker/)

### Docker Installation

```bash
# First start docker locally, if not installed, redis/redis-stack-server will be installed automatically
# Production environment: Install redis/redis-stack-server
# Password parameter: -e REDIS_ARGS="--requirepass password"
docker run -d --name redis-stack-server -p 6379:6379 -e REDIS_ARGS="--requirepass password" redis/redis-stack-server:latest
# Use redis-cli
docker exec -it redis-stack-server redis-cli
# Local testing: Install redis/redis-stack
# redisinsight: http://localhost:8001
# docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 -e REDIS_ARGS="--requirepass password" redis/redis-stack:latest
#
# Store content in /local-data/ folder
# docker run -v /local-data/:/data redis/redis-stack:latest
# Use local-redis-stack.conf instead of default redis-stack.conf
# docker run -v `pwd`/local-redis-stack.conf:/redis-stack.conf -p 6379:6379 -p 8001:8001 redis/redis-stack-server:latest
# Use redis-cli
# docker exec -it redis-stack redis-cli
#
# 1. Enter redis container: docker exec -it redis-stack bash
# 2. Run command: redis-cli
# 3. View existing redis password: config get requirepass
# Random password https://suijimimashengcheng.bmcx.com/
# 4. Set redis password: config set requirepass password
# docker container stop redis-stack # Stop Redis service
# docker container start redis-stack # Start Redis service
# docker container restart redis-stack # Restart Redis service
#
```

### Ubuntu Installation of Non-Docker redis-stack-server

```bash
# https://redis.io/docs/install/install-stack/linux/
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
sudo apt-get update
sudo apt-get install redis-stack-server
```

### Mac Installation of Non-Docker redis-stack

```bash
# https://redis.io/docs/install/install-stack/mac-os/
arch -arm64 brew tap redis-stack/redis-stack
arch -arm64 brew install redis-stack
# echo $PATH, output: /opt/homebrew/bin
# Modify ~/.zshrc
# export PATH=/opt/homebrew/Caskroom/redis-stack-server/<VERSION>/bin:$PATH
# Find installation directory, modify conf file, password
# Start
redis-stack-server
redisinsight
# Uninstall
brew uninstall redis-stack-redisinsight redis-stack-server redis-stack
brew untap redis-stack/redis-stack
```

