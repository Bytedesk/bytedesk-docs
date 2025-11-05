---
sidebar_label: Kingbase
sidebar_position: 2
---

# 电科(人大)金仓数据库Kingbase

修改微语.properties配置文件

```bash
# 连接信息
spring.datasource.url=jdbc:kingbase8://127.0.0.1:54321/bytedesk??createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true&options=-c%20default_tablespace=sys_default
spring.datasource.username=root
spring.datasource.password=密码
# 驱动信息
spring.datasource.driver-class-name=com.kingbase8.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
# Kingbase与PostgreSQL兼容，但Spring Boot无法自动识别其驱动，显式指定平台以加载Quartz的PostgreSQL建表脚本
# Quartz官方脚本文件名为 tables_postgres.sql，这里平台必须设置为 postgres（不是 postgresql）
spring.quartz.jdbc.platform=postgres
# 指定批处理脚本的平台为 PostgreSQL（Kingbase 兼容）
spring.batch.jdbc.platform=postgres
# 使用 PostgreSQL 数据库（Kingbase 兼容）
spring.batch.database-type=POSTGRES
# 数据库类型通过配置传递，供 Flowable 使用：
# - Kingbase / PostgreSQL: 设置为 postgres
# - MySQL: 设置为 mysql
# - 其他：oracle / mssql / db2 / h2 ...
flowable.database-type=postgres
# 禁用liquibase
spring.liquibase.enabled=false
```

docker compose格式

```bash
# 连接信息
SPRING_DATASOURCE_URL: jdbc:kingbase8://127.0.0.1:54321/bytedesk??createDatabaseIfNotExist=true&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true&options=-c%20default_tablespace=sys_default
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: 密码
# 驱动信息
SPRING_DATASOURCE_DRIVER_CLASS_NAME: com.kingbase8.Driver
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT: org.hibernate.dialect.PostgreSQLDialect
# Kingbase与PostgreSQL兼容，但Spring Boot无法自动识别其驱动，显式指定平台以加载Quartz的PostgreSQL建表脚本
# Quartz官方脚本文件名为 tables_postgres.sql，这里平台必须设置为 postgres（不是 postgresql）
SPRING_QUARTZ_JDBC_PLATFORM: postgres
# 指定批处理脚本的平台为 PostgreSQL（Kingbase 兼容）
SPRING_BATCH_JDBC_PLATFORM: postgres
# 使用 PostgreSQL 数据库（Kingbase 兼容）
SPRING_BATCH_DATABASE_TYPE: POSTGRES
# 数据库类型通过配置传递，供 Flowable 使用：
# - Kingbase / PostgreSQL: 设置为 postgres
# - MySQL: 设置为 mysql
# - 其他：oracle / mssql / db2 / h2 ...
FLOWABLE_DATABASE_TYPE: postgres
# 禁用liquibase
SPRING_LIQUIBASE_ENABLED: "false"
```

## 安装步骤（使用本地 Docker 镜像包运行 KingbaseES V9）

本文档面向已下载官方 [Docker 镜像包（.tar）](https://www.kingbase.com.cn/download.html#database) 和对应 [license](https://www.kingbase.com.cn/download.html#authorization?authorcurrV=V9R1C10) 的用户，提供从“导入镜像 → 运行容器 → 验证/连接 → 常见问题”的完整流程。

## 环境准备

- 已安装 Docker Desktop（macOS）
- 在本项目目录内操作（路径位于 `/Users/...` 下，方便挂载）
- 目录中已存在：
	- `KingbaseES_V009R001C010B0004_x86_64_Docker.tar`
	- `KingbaseES_V009R001C010B0004_aarch64_Docker.tar`
	- 一个 V009R001C 对应的 license 文件（例如：`license_V009R001C-专业版.dat`，或标准版/开发版/企业版之一）

可选：清理可能占用端口或重名的旧容器

```bash
docker ps
docker rm -f kingbase kingbase9 2>/dev/null || true
```

## 一、导入本地镜像（docker load）

建议两个镜像都导入，后续按机器架构选择使用：

```bash
# x86_64（Intel/AMD，或 Apple Silicon 需要 x86 兼容时）
docker load -i KingbaseES_V009R001C010B0004_x86_64_Docker.tar

# aarch64（Apple Silicon 原生优先使用）
docker load -i KingbaseES_V009R001C010B0004_aarch64_Docker.tar

# 检查是否成功加载镜像（关注 kingbase 相关行）
docker images | grep -i kingbase
```

常见加载后的镜像名与标签（以你本机实际输出为准）：

- `kingbase_v009r001c010b0004_single_arm:v1`（aarch64）
- `kingbase_v009r001c010b0004_single_x86:v1`（x86_64）

## 二、运行容器

根据你的机器架构选择对应镜像，端口冲突可调整左侧宿主机端口（示例用 54321）。

### 1) Apple Silicon (M1/M2/M3)：优先使用 aarch64 镜像

```bash
docker run -d \
	--name kingbase9 \
	-p 54321:54321 \
	-e SYSTEM_PWD=SYSTEM \
	-v bytedesk_kingbase_data:/opt/kingbase/data \
	-v "$PWD/license_V009R001C-专业版.dat":/opt/kingbase/Server/bin/license.dat:ro \
    -e DB_MODE=mysql  \
    -e ENABLE_CI=yes  \
    -e NEED_START=yes  \
    -e DB_USER=root  \
    -e DB_PASSWORD=r8FqfdbWUaN3 \
	kingbase_v009r001c010b0004_single_arm:v1
```

### 2) Intel/AMD x86_64 机器：使用 x86_64 镜像

```bash
docker run -d \
	--name kingbase9 \
	-p 54321:54321 \
	-e SYSTEM_PWD=SYSTEM \
	-v bytedesk_kingbase_data:/opt/kingbase/data \
	-v "$PWD/license_V009R001C-专业版.dat":/opt/kingbase/Server/bin/license.dat:ro \
    -e DB_MODE=mysql  \
    -e ENABLE_CI=yes  \
    -e NEED_START=yes  \
    -e DB_USER=root  \
    -e DB_PASSWORD=r8FqfdbWUaN3 \
	kingbase_v009r001c010b0004_single_x86:v1
```

### 3) Apple Silicon 但必须使用 x86_64 镜像（仿真运行）

```bash
docker run -d \
	--platform linux/amd64 \
	--name kingbase9 \
	-p 54321:54321 \
	-e SYSTEM_PWD=SYSTEM \
	-v bytedesk_kingbase_data:/opt/kingbase/data \
	-v "$PWD/license_V009R001C-专业版.dat":/opt/kingbase/Server/bin/license.dat:ro \
    -e DB_MODE=mysql  \
    -e ENABLE_CI=yes  \
    -e NEED_START=yes  \
    -e DB_USER=root  \
    -e DB_PASSWORD=r8FqfdbWUaN3 \
	kingbase_v009r001c010b0004_single_x86:v1
```

提示：
- 使用双引号包裹 `$PWD/...` 以兼容路径中存在空格（zsh/bash 通用）。
- macOS 仅允许挂载 `/Users`、`/Volumes`、`/private`、`/tmp` 等路径，推荐使用项目目录路径进行挂载。
 - 本镜像的数据目录与 license 挂载路径保持为 `/opt/kingbase/data` 与 `/opt/kingbase/Server/bin/license.dat`，无需修改；客户端工具位于 `/home/kingbase/install/kingbase/bin`。


```bash
# 列出所有卷
docker volume ls

# 删除命名卷（需先停止并删除使用该卷的容器；删除后数据不可恢复，谨慎）
docker rm -f kingbase9
docker volume rm bytedesk_kingbase_data
```

## 三、验证启动

```bash
docker logs -n 100 -f kingbase9
```

预期：初始化完成后容器保持运行，日志显示数据库已启动并监听容器内端口 `54321`。

## 四、连接数据库

- 端口：使用映射后的宿主机端口
- 用户名：`SYSTEM`
- 密码：由 `-e SYSTEM_PWD=...` 传入（示例中为 `SYSTEM`）
- 客户端：可使用 Kingbase 官方客户端或 JDBC 驱动

可进入容器查看可用工具：

```bash
docker exec -it kingbase9 bash
ls /home/kingbase/install/kingbase/bin
```

### （可选）容器已启动后手动创建数据库

如果容器已正常运行，但需要新增一个业务库（例如创建名为 bytedesk 的数据库），可以直接在容器内执行命令，常见有两种方式：

- 交互式（推荐，避免明文密码）：

```bash
docker exec -it kingbase9 /home/kingbase/install/kingbase/bin/createdb \
  -h 127.0.0.1 -p 54321 \
  -U root --maintenance-db=kingbase \
  -E UTF8 -O root bytedesk
# 出现 Password: 时输入 r8FqfdbWUaN3
```

- 非交互式（一次性执行，自动喂密码）：

```bash
docker exec -i kingbase9 sh -lc 'printf "r8FqfdbWUaN3\n" | /home/kingbase/install/kingbase/bin/createdb \
  -h 127.0.0.1 -p 54321 -U root --maintenance-db=kingbase -W \
  -E UTF8 -O root bytedesk'
```

- 用 SQL 方式也行（连接到 kingbase 再建库）：

```bash
docker exec -i kingbase9 sh -lc 'printf "r8FqfdbWUaN3\n" | /home/kingbase/install/kingbase/bin/ksql \
  -h 127.0.0.1 -p 54321 -U root -d kingbase -W \
  -c "CREATE DATABASE bytedesk WITH ENCODING '\''UTF8'\'' TEMPLATE template1 OWNER root;"'
```

- 验证一下数据库是否已建

```bash
docker exec -i kingbase9 sh -lc 'printf "r8FqfdbWUaN3\n" | /home/kingbase/install/kingbase/bin/ksql \
  -h 127.0.0.1 -p 54321 -U root -W -l | grep -E "bytedesk|kingbase"'
```

- 连接到新库

```bash
docker exec -it kingbase9 /home/kingbase/install/kingbase/bin/ksql \
  -h 127.0.0.1 -p 54321 -U root -d bytedesk
# Password: 输入 r8FqfdbWUaN3
```

提示：
- 上述命令假设容器内数据库监听 54321 端口，管理员用户为 SYSTEM，密码来自启动参数 `-e SYSTEM_PWD=...`。
- 这两种方式与环境变量 `DB_MODE/DB_USER/DB_PASSWORD` 无直接关系；它们不会自动创建业务库。
 - 不同镜像/版本的客户端二进制路径可能不同。本仓库随附的 V9 单机镜像中，客户端位于 `/home/kingbase/install/kingbase/bin`（可通过 `docker exec kingbase9 which ksql` 验证）。
 - 如需非交互式执行（避免密码提示），可在你的终端直接运行并自行输入密码，或使用连接串/密码文件方式；若不确定密码，请使用交互式方式以免认证失败。

## 五、停止/启动/删除容器（数据可复用）

```bash
# 停止
docker stop kingbase9

# 再次启动（复用同一数据目录）
docker start kingbase9

# 删除容器（不会删除 ./data9 数据）
docker rm -f kingbase9
```

## 常见问题排查（FAQ）

- mounts denied（挂载失败）
	- 使用项目目录（位于 `/Users` 下）进行挂载，例如 `-v "$PWD/data9":/opt/kingbase/data`。
- 端口被占用
	- 更换宿主机端口（例如 `-p 54321:54321`）。
- Apple Silicon 上出现 rosetta/ELF 错误
	- 优先使用 aarch64 镜像；若必须使用 x86 镜像，在 `docker run` 时添加 `--platform linux/amd64`。
- license 导致连接数限制（如提示 superuser_reserved_connections must be less than max_connections）
	- 降低数据目录下 `kingbase.conf` 中相关参数，或更换更高授权的 license 文件。
- 权限问题导致初始化失败
	- 确保宿主机对挂载目录有读写权限，或使用 Docker 卷替代本地目录。
- 容器日志反复出现 “sudo: pam_open_session: Permission denied / policy plugin failed session initialization”
	- 现象：数据库已正常启动，但日志中每次调用 sudo 都打印该告警，常见于 openEuler 基础镜像且容器内未启用完整 PAM 会话。
	- 影响：不影响数据库服务，属非致命告警；若想消除日志噪音，可在容器内禁用 sudo 的 PAM 会话钩子。
	- 处理（任选其一）：
		1) 临时（当前容器生效）：
			- 以 root 进入容器并追加配置（会自动备份 `/etc/sudoers`）：

			```bash
			docker exec -u root kingbase9 sh -lc 'cp /etc/sudoers /etc/sudoers.bak && printf "\nDefaults !pam_session\n" >> /etc/sudoers'
			```

			- 可选验证（应无错误输出）：

			```bash
			docker exec -u root kingbase9 sh -lc 'sudo -n true'
			```
		2) 持久化（重建容器也生效）：基于官方镜像自建一个自定义镜像，在 Dockerfile 中添加 `echo "Defaults !pam_session" >> /etc/sudoers`，或解注释 `/etc/sudoers` 末尾的 `#includedir /etc/sudoers.d` 并向该目录投放禁用项。
	- 注意：编辑 sudoers 建议使用最小变更并保留备份；若使用 `includedir`，需确保 `/etc/sudoers` 末尾已取消注释。

## 参考链接

- [KingBase数据库Docker快速体验](https://docs.kingbase.com.cn/cn/KES-V9R1C10/quick_start/install/docker-install)
- [KingBase数据库Docker镜像下载](https://www.kingbase.com.cn/download.html#database)
- [KingBase数据库授权文件下载](https://www.kingbase.com.cn/download.html#authorization?authorcurrV=V9R1C10)
- [Docker安装人大金仓（电科金仓）KingbaseES](https://juejin.cn/post/7510277359401271332)
- [kingbase8 jdbc](https://docs.kingbase.com.cn/cn/KES-V9R1C10/quick_start/access_tool/java/jdbc)
- [kingbase8 maven](https://mvnrepository.com/artifact/cn.com.kingbase/kingbase8)
- [KingBase数据库DBVeaver客户端配置](https://www.cnblogs.com/Javaer1995/p/17894382.html)
