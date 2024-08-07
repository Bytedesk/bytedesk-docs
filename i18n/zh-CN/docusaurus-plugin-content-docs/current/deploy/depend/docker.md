---
sidebar_label: Docker
sidebar_position: 6
---

# Docker

```bash
# docker安装
# 腾讯云安装docker：https://cloud.tencent.com/document/product/213/46000
# https://github.com/redis-stack/redis-stack
# 运行docker
# systemctl start docker
# systemctl stop docker
# systemctl restart docker
# systemctl status docker
# sudo service docker restart
# 检查安装结果
# docker info
# 搜索镜像
# docker search redis
# 本地镜像
# docker images
# 正在运行镜像
# docker ps
# 安装镜像
# docker pull redis/redis-stack-server
# 删除镜像
# docker ps -a
# docker rm 容器id
# docker rmi redis/redis-stack-server
# 安装镜像失败, 修改或创建：
vi /etc/docker/daemon.json
# 添加内容：腾讯云
{
   "registry-mirrors": [
       "https://mirror.ccs.tencentyun.com"
  ]
}
# 阿里云:https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
{
  "registry-mirrors": ["https://3oitzcio.mirror.aliyuncs.com"]
}
#
sudo systemctl daemon-reload
sudo systemctl restart docker
# 重启docker
service docker restart
# 查看信息
docker info
```