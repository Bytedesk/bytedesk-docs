---
sidebar_label: Docker
sidebar_position: 10
---

# Docker 安装与使用指南

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
:::

Docker 是一个开源的应用容器引擎，它让开发者可以将应用及其依赖打包到一个可移植的容器中，然后发布到任何流行的 Linux 或 Windows 操作系统的机器上。本指南将教你如何安装 Docker 并介绍一些常用命令。

## 1. Docker 安装流程（Ubuntu 系统）

### 1.1 添加 Docker 软件源

运行以下命令添加 Docker 的官方软件源：

```bash
# 更新软件包索引
sudo apt-get update
# 安装必要的软件包
sudo apt-get install ca-certificates curl -y
# 创建密钥目录
sudo install -m 0755 -d /etc/apt/keyrings
# 下载 Docker 的 GPG 密钥
sudo curl -fsSL https://mirrors.cloud.tencent.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
# 设置权限
sudo chmod a+r /etc/apt/keyrings/docker.asc
# 添加 Docker 软件源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://mirrors.cloud.tencent.com/docker-ce/linux/ubuntu/ \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 再次更新软件包索引
sudo apt-get update
```

### 1.2 安装 Docker

通过以下命令安装 Docker 和相关组件：

```bash
# 安装 Docker 引擎、CLI 和其他组件
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 2. Docker 基本操作

### 2.1 Docker 服务管理

```bash
# 启动 Docker 服务
sudo systemctl start docker

# 停止 Docker 服务
sudo systemctl stop docker

# 重启 Docker 服务
sudo systemctl restart docker

# 查看 Docker 服务状态
sudo systemctl status docker

# 另一种重启方式
sudo service docker restart

# 查看 Docker 详细信息
docker info
```

### 2.2 镜像管理命令

```bash
# 搜索镜像
docker search 镜像名称
docker search redis

# 拉取/下载镜像
docker pull 镜像名称[:标签]
docker pull redis:latest
docker pull redis/redis-stack-server

# 列出本地所有镜像
docker images

# 删除镜像（需要先停止并删除使用该镜像的容器）
docker rmi 镜像名称或ID

# 查看镜像详细信息
docker inspect 镜像名称或ID
```

### 2.3 容器管理命令

```bash
# 创建并启动容器
docker run -d --name 容器名称 -p 宿主机端口:容器端口 镜像名称[:标签]
docker run -d --name myredis -p 6379:6379 redis

# 列出运行中的容器
docker ps

# 列出所有容器（包括停止的）
docker ps -a

# 停止容器
docker stop 容器名称或ID

# 启动已停止的容器
docker start 容器名称或ID

# 重启容器
docker restart 容器名称或ID

# 删除容器（需要先停止容器）
docker rm 容器名称或ID

# 查看容器日志
docker logs 容器名称或ID

# 进入容器内部执行命令
docker exec -it 容器名称或ID /bin/bash
```

## 3. 解决常见问题

### 3.1 镜像下载加速配置

如果下载镜像速度慢或失败，可以配置国内镜像源：

```bash
# 创建或修改 Docker 配置文件
sudo mkdir -p /etc/docker
sudo vi /etc/docker/daemon.json

# 添加以下内容（国内常用镜像源）
{
   "registry-mirrors": [
      "https://docker.1panel.live/",
      "https://docker.m.daocloud.io",
      "https://mirror.baidubce.com",
      "https://hub-mirror.c.163.com",
      "https://registry.docker-cn.com"
  ]
}

# 重新加载配置
sudo systemctl daemon-reload

# 重启 Docker 服务
sudo systemctl restart docker

# 验证配置是否生效
docker info | grep "Registry Mirrors"
```

### 3.2 常见错误处理

```bash
# 权限不足问题（避免总是使用sudo）
sudo groupadd docker          # 创建docker用户组
sudo usermod -aG docker $USER # 将当前用户加入docker组
newgrp docker                 # 刷新用户组

# 容器无法删除问题
docker rm -f 容器ID           # 强制删除容器
```

## 4. Docker Compose 基础使用

Docker Compose 是用于定义和运行多容器 Docker 应用程序的工具。

### 4.1 创建并运行多容器应用

```bash
# 创建 docker-compose.yml 文件
# 以下是一个简单的包含 web 服务和数据库的示例：
version: '3'
services:
  web:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - db
  db:
    image: mysql:latest
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: myapp
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 停止所有服务
docker-compose down
```

### 4.2 Docker Compose 常用命令

```bash
# 构建或重新构建服务
docker-compose build

# 启动特定服务
docker-compose up -d 服务名

# 停止特定服务
docker-compose stop 服务名

# 重启特定服务
docker-compose restart 服务名

# 查看服务容器的输出
docker-compose logs -f 服务名
```

## 5. Docker 数据管理

### 5.1 数据卷（Volumes）

```bash
# 创建数据卷
docker volume create 卷名

# 列出所有数据卷
docker volume ls

# 检查数据卷
docker volume inspect 卷名

# 删除数据卷
docker volume rm 卷名

# 使用数据卷运行容器
docker run -d --name 容器名 -v 卷名:/容器内路径 镜像名
```

### 5.2 绑定挂载（Bind Mounts）

```bash
# 将宿主机目录挂载到容器
docker run -d --name 容器名 -v /宿主机路径:/容器内路径 镜像名
```

## 6. 参考链接

- [Docker 官方文档](https://docs.docker.com/)
- [腾讯云 Docker 安装指南](https://cloud.tencent.com/document/product/213/46000)
