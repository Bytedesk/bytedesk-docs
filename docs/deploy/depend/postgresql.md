---
sidebar_label: PostgreSQL
sidebar_position: 3
---

# PostgreSQL

:::tip System Requirements

- Operating System: Ubuntu 22.04 LTS
- Recommended server spec: 2 vCPU, 4GB RAM
:::

:::info Third-party Component Notice
The following instructions are for reference. For production usage, always follow the official [PostgreSQL documentation](https://www.postgresql.org/docs/).
:::

## Option 1: Docker (Recommended)

- [Install with Docker](../jar.md#dependencies)

## Option 2: Native Install

## Integration with Bytedesk

Update your application properties:

```bash
# Connection
spring.datasource.url=jdbc:postgresql://127.0.0.1:15432/bytedesk
spring.datasource.username=postgres
spring.datasource.password=password

# Driver / ORM
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Quartz / Batch / Flowable
spring.quartz.jdbc.platform=postgres
spring.batch.jdbc.platform=postgres
spring.batch.database-type=POSTGRES
flowable.database-type=postgres
```

docker compose environment format:

```bash
SPRING_DATASOURCE_URL: jdbc:postgresql://127.0.0.1:15432/bytedesk
SPRING_DATASOURCE_USERNAME: postgres
SPRING_DATASOURCE_PASSWORD: password
SPRING_DATASOURCE_DRIVER_CLASS_NAME: org.postgresql.Driver
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: org.hibernate.dialect.PostgreSQLDialect
SPRING_QUARTZ_JDBC_PLATFORM: postgres
SPRING_BATCH_JDBC_PLATFORM: postgres
SPRING_BATCH_DATABASE_TYPE: POSTGRES
FLOWABLE_DATABASE_TYPE: postgres
```

## Installation

```bash
# ubuntu
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
sudo apt update
sudo apt -y install postgresql
psql --version
```

## References

- [Docker Image](https://hub.docker.com/_/postgres)
- [PostgreSQL Downloads](https://www.postgresql.org/download/)
- [Official PostgreSQL Docs](https://www.postgresql.org/docs/)
