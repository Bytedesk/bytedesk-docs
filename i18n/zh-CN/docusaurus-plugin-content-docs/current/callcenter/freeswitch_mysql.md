---
sidebar_label: FreeSWITCH MySQL
sidebar_position: 15
---

# FreeSWITCH MySQL 数据库配置

本文档详细说明了如何在 FreeSWITCH 中编译 mod_mariadb 模块并配置 MySQL 数据库连接。

## 目录

1. [环境要求](#环境要求)
2. [安装依赖库](#安装依赖库)
3. [编译 mod_mariadb 模块](#编译-mod_mariadb-模块)
4. [配置 FreeSWITCH](#配置-freeswitch)
5. [验证配置](#验证配置)
6. [故障排除](#故障排除)

## 环境要求

- **操作系统**: Ubuntu 22.04 LTS
- **FreeSWITCH 版本**: 1.10.12-release
- **MySQL 版本**: 8.0+
- **MariaDB 客户端库**: 10.6+

## 安装依赖库

### 1. 更新系统包

```bash
apt update
apt upgrade -y
```

### 2. 安装 MariaDB 开发库

```bash
# 安装 MariaDB 客户端开发库
apt install -y libmariadb-dev libmariadb-dev-compat

# 验证安装
pkg-config --modversion libmariadb
```

### 3. 验证库文件

```bash
# 检查头文件
ls -la /usr/include/mariadb/

# 检查库文件
ls -la /usr/lib/x86_64-linux-gnu/libmariadb*
```

## 编译 mod_mariadb 模块

### 1. 进入 FreeSWITCH 源码目录

```bash
# 假设源码目录为 /root/freeswitch
cd /root/freeswitch
```

### 2. 修改模块配置文件

编辑 `modules.conf` 文件，启用 mod_mariadb：

```bash
vi modules.conf
```

找到并取消注释以下行：

```bash
#databases/mod_mariadb
```

改为：

```bash
databases/mod_mariadb
```

### 3. 编译模块

```bash
# 重新配置构建系统
./configure --prefix=/usr/local/freeswitch

# 编译 mod_mariadb 模块
make mod_mariadb

# 安装模块
make mod_mariadb-install
```

### 4. 验证模块编译

```bash
# 检查模块文件
ls -la /usr/local/freeswitch/mod/mod_mariadb*

# 预期输出
-rwxr-xr-x 1 root root 1227 May 26 11:12 mod_mariadb.la
-rwxr-xr-x 1 root root 2621440 May 26 11:12 mod_mariadb.so
```

## 配置 FreeSWITCH

### 1. 配置模块预加载

编辑 `/usr/local/freeswitch/conf/autoload_configs/pre_load_modules.conf.xml`：

```xml
<configuration name="pre_load_modules.conf" description="Modules">
  <modules>
    <!-- 取消注释以下行 -->
    <load module="mod_mariadb"/>
  </modules>
</configuration>
```

### 2. 配置数据库连接

编辑 `/usr/local/freeswitch/conf/autoload_configs/switch.conf.xml`：

```xml
<configuration name="switch.conf" description="Core Configuration">
  <settings>
    <!-- 其他配置... -->
    
    <!-- MySQL/MariaDB 数据库连接配置 -->
    <param name="core-db-dsn" value="mariadb://Server=YOUR_HOST;Port=3306;Database=YOUR_DB;Uid=YOUR_USER;Pwd=YOUR_PASSWORD;" />
    
    <!-- 其他配置... -->
  </settings>
</configuration>
```

## 验证配置

### 1. 重启 FreeSWITCH

```bash
# 停止 FreeSWITCH
freeswitch -stop

# 启动 FreeSWITCH
freeswitch -nc
```

### 2. 检查模块加载

```bash
# 连接到 FreeSWITCH CLI
fs_cli

# 检查模块状态
freeswitch@internal> show modules | grep mariadb
```

### 3. 验证数据库连接

```bash
# 检查数据库连接日志
tail -f /usr/local/freeswitch/log/freeswitch.log | grep -i mariadb
```

## 故障排除

### 1. 编译错误

**错误**: `You must install libmariadb-dev`

**解决方案**:

```bash
apt install -y libmariadb-dev libmariadb-dev-compat
pkg-config --modversion libmariadb
```

## 总结

通过以上步骤，您可以成功地：

1. ✅ 编译并安装 mod_mariadb 模块
2. ✅ 配置 FreeSWITCH 连接 MySQL 数据库
3. ✅ 验证配置的正确性
4. ✅ 解决常见问题

这种配置方式允许 FreeSWITCH 使用 MySQL 作为后端数据库，提供更好的扩展性和数据管理能力。

---

**文档版本**: 1.0  
**最后更新**: 2025年8月13日  
**适用版本**: FreeSWITCH 1.10.12+, MySQL 8.0+, Ubuntu 22.04 LTS
