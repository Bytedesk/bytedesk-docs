---
sidebar_label: Janus
sidebar_position: 14
---

# Janus WebRTC Server

## 概述

## 安装

- 参考[Github Readme](https://github.com/meetecho/janus-gateway?tab=readme-ov-file)

## 配置文件

```bash
# 安装路径 /opt/janus
# 修改 /opt/janus/etc/janus/janus.transport.http.jcfg
general: {
    ip = "0.0.0.0"
}
admin: {
    admin_http = true
    admin_ip = "0.0.0.0"
}
# 配置文件
./etc/janus/janus.jcfg
```

## 部署 Web 页面

- [Nginx 安装](./nginx.md)

将 Janus Demos 放到 nginx 的静态资源目录下

```bash
cp -r janus-gateway/html/demos /var/www/html/janus
# 启动后访问：http://服务器ip/janus/admin.html
```

## 前台运行

```bash
# 安装路径
cd /opt/janus
# 前台启动
./bin/janus
# 查看端口占用情况
netstat -ntlp | grep janus
```

## 快捷脚本参考

- [下载脚本](https://gitee.com/270580156/weiyu/tree/main/deploy/janus)

## Coturn

- 参考[Coturn](./coturn.md)

## 相关链接

- [Janus 官网](https://janus.conf.meetecho.com/index.html)
- [Janus Github](https://github.com/meetecho/janus-gateway)
- [Janus Npm](https://www.npmjs.com/package/janus-gateway)
