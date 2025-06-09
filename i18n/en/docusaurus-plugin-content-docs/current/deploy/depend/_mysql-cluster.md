---
sidebar_label: MySQL-Cluster
sidebar_position: 1
---

# MySQL-Cluster

## Master-Slave Replication

First install MySQL on both master and slave servers

First, execute on master server:

```bash
# mysql-bin log storage directory
/var/lib/mysql
# master
vi /etc/mysql/mysql.conf.d/mysqld.cnf
# Comment out bind-address = 127.0.0.1
# Databases that need backup
# binlog-do-db=bytedesk
# Databases that don't need backup
# binlog-ignore-db=mysql
# Enable binary log function, can use any name, better be meaningful (this is key)
log-bin=mysql-bin
# Set server_id, usually set to IP, note it must be unique
server_id=1
# Set bin file retention time to 3 days
expire_logs_days=3
# Enter command console
mysql -u root -p
# Create data sync user and grant permissions
mysql> CREATE USER 'bytedesk'@'%' IDENTIFIED BY 'password';
mysql> GRANT REPLICATION SLAVE ON *.* TO 'bytedesk'@'%';
mysql> flush privileges;
mysql> exit;
# Restart Mysqld service
service mysql restart
```

Second, execute on slave server:

```bash
# slave
vi /etc/mysql/mysql.conf.d/mysqld.cnf
# log-bin=mysql-bin   #[Optional] Enable binary logging
# Set server_id, usually set to IP, must be unique
server_id=2
# Set bin file retention time to 3 days
expire_logs_days=3
max_connect_errors=10000
max_connections=1000
# Restart
service mysql restart
```

Third step, execute on master server:

```bash
# Login to master console
mysql -u root -p
# Check status
mysql> show master status;
```

Fourth step, execute on slave server:

```bash
# Master server sends RSA public key to slave server, which uses it to encrypt password and return result to server
mysql --ssl-mode=DISABLED -h 121.199.165.116 -ubytedesk -ppassword --get-server-public-key
mysql> exit;
# Error: Host '114.55.33.206' is blocked because of many connection errors; unblock with 'mysqladmin flush-hosts'
# Execute on mysql master:
# show variables like "%max_connect%";
# set global max_connections=1000;
# set global mysqlx_max_connections=1000;
# set global max_connect_errors=10000;
# which mysqladmin
# /usr/bin/mysqladmin flush-hosts -h 127.0.0.1 -u root -p[password]
# mysql -u root -p
# flush hosts;
# Note: Must execute above statements first, otherwise will get error:
# Last_IO_Error: error connecting to master 'bytedesk@121.199.165.116:3306' - retry-time: 30 retries: 1 message: Authentication plugin 'caching_sha2_password' reported error: Authentication requires secure connection.

# Login to slave console
mysql -u root -p
# flush hosts;
# Based on information from step 3, modify following command
mysql> change master to master_host='121.199.165.116', master_user='bytedesk', master_password='password', master_port=3306, master_log_file='mysql-bin.001566', master_log_pos=43471610, master_connect_retry=30;
# Start slave
mysql> start slave;
# Check slave status
mysql> show slave status\G; # Note: \G at end formats display for better readability
```

Fifth step:

```bash
# Testing
Perform insert, update, delete operations on master, check if they sync to slave
```

Common Commands:

```bash
# Check master server status
mysql> show master status;
+------------------+----------+--------------+------------------+-------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
+------------------+----------+--------------+------------------+-------------------+
| mysql-bin.000253 | 46568304 |              |                  |                   |
+------------------+----------+--------------+------------------+-------------------+
1 row in set (0.00 sec)

# View slave server list
mysql> show slave hosts;
# Get binlog file list
mysql> show binary logs;
# View contents of first binlog file
mysql> show binlog events;
# View contents of specific binlog file
mysql> show binlog events in 'mysql-bin.000001';
# Start slave replication thread
mysql> START SLAVE;
# Stop slave replication thread
mysql> STOP SLAVE;
```

## Read-Write Separation

- TODO: sharding-jdbc

## JNDI DataSource Support

If you want to use Tomcat or WebLogic datasource, you don't need to configure `spring.datasource.url` parameters, just configure `spring.datasource.jndi-name` as the JNDI name, for example:

```bash
spring.datasource.jndi-name=java:jdbc/mysql
```

## References

* [Docker](https://hub.docker.com/_/mysql)
* [Official Guide](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)
* [Downloads](https://dev.mysql.com/downloads/repo/apt/)
* [Connection to a JNDI DataSource](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-sql.html#boot-features-connecting-to-a-jndi-datasource)
