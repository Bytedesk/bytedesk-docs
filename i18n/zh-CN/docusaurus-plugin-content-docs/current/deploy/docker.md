---
sidebar_label: Docker部署
sidebar_position: 3
---

# Docker部署

:::tip

- 操作系统：Ubuntu 20.04 LTS
- 服务器最低配置2核4G内存，推荐配置4核8G内存

:::

## 安装[Docker](./depend/docker)

## 创建docker-compose.yaml文件

内容如下:

```bash
services:
  bytedesk-db:
    image: mysql:latest
    container_name: mysql-bytedesk
    environment:
      MYSQL_DATABASE: "bytedesk_im"
      MYSQL_ROOT_PASSWORD: "r8FqfdbWUaN3"
    ports:
      - "3306:3306"
  bytedesk-redis:
    image: redis/redis-stack-server:latest
    container_name: redis-bytedesk
    command: /bin/sh -c "redis-server --requirepass $$REDIS_HOST_PASSWORD"
    env_file:
      - docker.env
    ports:
      - "6379:6379"
  bytedesk:
    # image: bytedesk/bytedesk:latest
    image: registry.cn-hangzhou.aliyuncs.com/weiyuai/bytedesk:0.4.6
    container_name: bytedesk
    depends_on:
      - bytedesk-db
      - bytedesk-redis
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://mysql-bytedesk:3306/bytedesk_im
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=r8FqfdbWUaN3
      - SPRING_JPA_HIBERNATE_DDL_AUTO=update
      - SPRING_DATA_REDIS_HOST=redis-bytedesk
      - SPRING_DATA_REDIS_PORT=6379
      - SPRING_DATA_REDIS_PASSWORD=qfRxz3tVT8Nh
      - SPRING_DATA_REDIS_DATABASE=0
    ports:
      - 9003:9003
```

## 创建docker.env文件

内容如下:

```bash
REDIS_HOST_PASSWORD=qfRxz3tVT8Nh
```

## 拉取镜像并启动容器

```bash
# 从阿里云拉取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/weiyuai/bytedesk:0.4.7
# 启动docker compose容器, -f标志来指定文件路径, -d标志表示在后台模式下启动容器
docker compose -f docker-compose.yaml up -d
# 停止容器
docker compose -f docker-compose.yaml stop
```

## 本地预览

```bash
web: http://127.0.0.1:9003/
开发者入口: http://127.0.0.1:9003/dev
管理后台: http://127.0.0.1:9003/admin, 用户名: admin@email.com, 密码: admin
客户端: http://127.0.0.1:9003/agent/chat, 用户名: admin@email.com, 密码: admin
访客端: http://127.0.0.1:9003/chat?org=df_org_uid&t=0&sid=df_ag_uid&
api文档: http://127.0.0.1:9003/swagger-ui/index.html
数据库监控: http://127.0.0.1:9003/druid，用户名: admin@email.com, 密码: admin
actuator: http://127.0.0.1:9003/actuator
```
