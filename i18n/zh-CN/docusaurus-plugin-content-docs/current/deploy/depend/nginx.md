---
sidebar_label: Nginx
sidebar_position: 4
---

# Nginx

``` bash
sudo apt update
sudo apt install nginx
# 查看是否安装成功
netstat -ntlp
# 如果80端口正常启动，则证明安装成功
# 停止nginx
# service nginx stop
# 启动nginx
# service nginx start
# 重启nginx:
# service nginx restart
# systemctl restart nginx
# 重新加载：
# service nginx force-reload
```

```bash
# 查看是否安装stream模块
nginx -V | grep stream # 注意是大写V
# 有输出内容证明已经安装
nginx version: nginx/1.18.0 (Ubuntu)
...
# 可以看到参数：--with-stream=dynamic，说明已经安装stream模块
# 对应报错：unknown directive "stream" in /etc/nginx/nginx.conf，需要在nginx.conf的第一行插入
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
# 缓存路径，创建文件夹，在nginx.conf文件中用到
mkdir -p /var/www/html/nginx/cache/webserver
# 对外开放端口号
http：80
https：443
# 另外
mysql：3306
redis：6379
# spring boot 端口：
9003
9883
9885
```

## SSL证书生成

``` bash
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
./certbot-auto certonly  -d "*.bytedesk.org" --manual --preferred-challenges dns-01  --server https://acme-v02.api.letsencrypt.org/directory
```

- [Letsencrypt](./nginx/letsencrypt/readme.md)

## 配置

- [nginx.conf](./nginx/nginx.conf)
- [sites-available](./nginx/sites-available/default)

``` bash
# 重新加载配置文件
nginx -s reload
# 或者 重启nginx
```

## Linux-TCP连接数修改

```bash
# 查看Linux系统用户最大打开的文件限制
ulimit -n 
# 65535
# 修改打开文件限制
vi /etc/security/limits.conf
root soft nofile 655350
root hard nofile 655350
nginx soft nofile 6553500
nginx hard nofile 6553500
* soft nofile 655350
* hard nofile 655350
# 其中root指定了要修改哪个用户的打开文件数限制。
# 可用'*'号表示修改所有用户的限制；soft或hard指定要修改软限制还是硬限制；
# 102400则指定了想要修改的新的限制值，即最大打开文件数(请注意软限制值要小于或等于硬限制)
# 注意：修改了/etc/security/limits.conf，关闭Terminal重新登录或重启服务器生效
# 查看 open files数
ulimit -a
```

## 常见问题

```shell
# 查看nginx log
cd /var/log/nginx
# 2020/12/16 08:11:44 [error] 11023#11023: *8510657 connect() failed (111: Connection refused) while connecting to upstream, client: ipXXX, server: 0.0.0.0:13883, upstream: "47.98.54.86:3883", bytes from/to client:0/0, bytes from/to upstream:0/0
# 解决方案

```

## 参考

- [letsencrypt](https://letsencrypt.org/)
- [LetsEncrypt通配符证书](https://www.jianshu.com/p/c5c9d071e395)
- [Ubuntu /etc/security/limits.conf 不生效问题](https://www.cnblogs.com/xiao987334176/p/11008812.html)
