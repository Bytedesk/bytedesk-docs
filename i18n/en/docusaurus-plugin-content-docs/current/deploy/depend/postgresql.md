---
sidebar_label: PostgreSQL
sidebar_position: 1
---

# PostgreSQL 16

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server Requirements: Minimum 2 cores 4GB RAM, Recommended 4 cores 8GB RAM

:::

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
