---
sidebar_label: Oracle
sidebar_position: 4
---

# Oracle

:::tip System Requirements

- Operating System: Ubuntu 22.04 LTS
- Recommended server spec: 2 vCPU, 4GB RAM
:::

:::info Third-party Component Notice
The following instructions are for reference. For production usage, always follow the official Oracle documentation.
:::

## Option 1: Docker (Recommended)

- [Install with Docker](../jar.md#dependencies)

If you use the built-in project scripts:

```bash
cd bytedesk/deploy/docker

# Artemis + Oracle
./start.sh oracle artemis standard middleware

# RabbitMQ + Oracle
./start.sh oracle rabbitmq standard middleware
```

## Option 2: Container Command Example

```bash
docker run -d \
	--name oracle-bytedesk \
	-p 11521:1521 \
	-p 15500:5500 \
	-e ORACLE_PASSWORD='password' \
	-e APP_USER='bytedesk' \
	-e APP_USER_PASSWORD='password' \
	-v oracle_data:/opt/oracle/oradata \
	gvenzl/oracle-free:23-slim
```

## Integration with Bytedesk

Update your application properties:

```bash
# Connection
spring.datasource.url=jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
spring.datasource.username=bytedesk
spring.datasource.password=password

# Driver / ORM
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect

# Quartz / Batch / Flowable
spring.quartz.jdbc.platform=oracle
spring.batch.jdbc.platform=oracle
spring.batch.database-type=ORACLE
flowable.database-type=oracle
```

docker compose environment format:

```bash
SPRING_DATASOURCE_URL: jdbc:oracle:thin:@127.0.0.1:11521/FREEPDB1
SPRING_DATASOURCE_USERNAME: bytedesk
SPRING_DATASOURCE_PASSWORD: password
SPRING_DATASOURCE_DRIVER_CLASS_NAME: oracle.jdbc.OracleDriver
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: org.hibernate.dialect.OracleDialect
SPRING_QUARTZ_JDBC_PLATFORM: oracle
SPRING_BATCH_JDBC_PLATFORM: oracle
SPRING_BATCH_DATABASE_TYPE: ORACLE
FLOWABLE_DATABASE_TYPE: oracle
```

## References

- [Oracle Free Docker Image](https://hub.docker.com/r/gvenzl/oracle-free)
- [Oracle Database Documentation](https://docs.oracle.com/en/database/)
