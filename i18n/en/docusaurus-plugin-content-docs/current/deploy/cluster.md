---
sidebar_label: Cluster
sidebar_position: 5
---

# Cluster Deployment

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server Requirements: Minimum 4 cores 8GB RAM per node, Recommended 8 cores 16GB RAM per node

:::

## Architecture

- Load Balancer (Nginx)
- Multiple Application Nodes
- Database Cluster (MySQL/PostgreSQL)
- Redis Cluster
- File Storage (MinIO)

## Configuration

### Load Balancer

```nginx
upstream bytedesk {
    server 192.168.1.10:9003;
    server 192.168.1.11:9003;
    server 192.168.1.12:9003;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://bytedesk;
    }
}
```

### Application Node

```yaml
spring:
  datasource:
    url: jdbc:mysql://db.example.com:3306/bytedesk
  redis:
    cluster:
      nodes: redis1.example.com:6379,redis2.example.com:6379
  minio:
    url: https://minio.example.com
```

### Database Cluster

Refer to [MySQL Cluster](/docs/deploy/depend/mysql) or [PostgreSQL Cluster](/docs/deploy/depend/postgresql) documentation.

### Redis Cluster

Refer to [Redis Cluster](/docs/deploy/depend/redis) documentation.
