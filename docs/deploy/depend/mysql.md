---
sidebar_label: MySQL
sidebar_position: 1
---

# MySQL 8.0

:::tip System Requirements

- Operating System: Ubuntu 22.04 LTS
- Recommended server spec: 2 vCPU, 4GB RAM
:::

:::info Third-party Component Notice
The following instructions are for reference. For production usage, always follow the official [MySQL documentation](https://dev.mysql.com/doc/).
:::

## Integration with Bytedesk

Update your application properties:

```bash
# Connection
spring.datasource.url=jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
spring.datasource.username=root
spring.datasource.password=password

# Driver / ORM
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database=mysql

# Quartz / Batch / Flowable
spring.quartz.jdbc.platform=mysql
spring.batch.jdbc.platform=mysql
spring.batch.database-type=MYSQL
flowable.database-type=mysql
```

docker compose environment format:

```bash
SPRING_DATASOURCE_URL: jdbc:mysql://127.0.0.1:13306/bytedesk?createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: password
SPRING_DATASOURCE_DRIVER_CLASS_NAME: com.mysql.cj.jdbc.Driver
SPRING_JPA_DATABASE: mysql
SPRING_QUARTZ_JDBC_PLATFORM: mysql
SPRING_BATCH_JDBC_PLATFORM: mysql
SPRING_BATCH_DATABASE_TYPE: MYSQL
FLOWABLE_DATABASE_TYPE: mysql
```

## Option 1: Docker (Recommended)

- [Install with Docker](../jar.md#dependencies)

## Option 2: Native Install

```bash
# Install MySQL
sudo apt update
sudo apt install -y mysql-server

# Start and check service
sudo systemctl start mysql
sudo systemctl status mysql
```

## References

- [Docker Image](https://hub.docker.com/_/mysql)
- [Official MySQL Docs](https://dev.mysql.com/doc/)
