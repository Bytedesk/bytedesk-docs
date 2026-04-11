---
sidebar_label: PostgreSQL
sidebar_position: 3
---

# PostgreSQL

:::tip

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
# https://www.postgresql.org/download/linux/ubuntu/
sudo apt install -y postgresql-common
sudo /usr/share/postgresql-common/pgdg/apt.postgresql.org.sh
# Import the repository signing key:
sudo apt install curl ca-certificates
sudo install -d /usr/share/postgresql-common/pgdg
sudo curl -o /usr/share/postgresql-common/pgdg/apt.postgresql.org.asc --fail https://www.postgresql.org/media/keys/ACCC4CF8.asc
# Create the repository configuration file:
sudo sh -c 'echo "deb [signed-by=/usr/share/postgresql-common/pgdg/apt.postgresql.org.asc] https://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
# Update the package lists:
sudo apt update
# Install the latest version of PostgreSQL:
# If you want a specific version, use 'postgresql-16' or similar instead of 'postgresql'
sudo apt -y install postgresql
# Check version
psql --version
# Check if running
lsof -i:5432
# If you need local client to connect to cloud service, open port 5432 in Tencent Cloud or Alibaba Cloud firewall
# Find configuration file path
locate postgresql.conf
# /etc/postgresql/16/main/postgresql.conf
# Download all configuration files from /etc/postgresql/16/main/ for easier modification
# Enable external access, modify postgresql.conf file
listen_addresses = '*'
# Modify pg_hba.conf file, add the following at the end:
host    all             all             0.0.0.0/0               scram-sha-256
# Change password
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'password'; # Change password https://suijimimashengcheng.bmcx.com/
# Press \q to exit
# Install pgvector
apt install postgresql-16-pgvector
# Upload modified configuration files to server, then restart
service postgresql restart
# service postgresql stop
# Check port 5432
lsof -i:5432
# Or
netstat -tunlp | grep 5432
# Use pgadmin client, desktop client remote connection
# Create database bytedesk
# Add vector extension to the newly created database bytedesk (right click extensions, create->General->name: vector)
```

## References

- [Docker Image](https://hub.docker.com/_/postgres)
- [PostgreSQL Downloads](https://www.postgresql.org/download/)
- [Official PostgreSQL Docs](https://www.postgresql.org/docs/)
