---
sidebar_label: Nginx
sidebar_position: 4
---

# Nginx

:::tip

- 操作系统：Ubuntu 20.04 LTS
- 服务器最低配置 2 核 4G 内存，推荐配置 4 核 8G 内存。如果本地运行 Ollama，则最低 8G 内存起

:::

## 安装

```bash
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
# ...
# 可以看到参数：--with-stream=dynamic，说明已经安装stream模块
# 对应报错：unknown directive "stream" in /etc/nginx/nginx.conf，需要在nginx.conf的第一行插入
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
# 缓存路径，创建文件夹，在nginx.conf文件中用到
mkdir -p /var/www/html/nginx/cache/webserver
# 重新加载配置文件
nginx -s reload
# 或者 重启nginx
service nginx restart
```

## 准备

- 将下载的 [server](https://www.weiyuai.cn/download/weiyu-server.zip) 文件解压，解压后的文件结构如下

```bash
(base) server % tree -L 1
.
├── admin
├── agent
├── bytedesk-starter-0.4.0.jar
├── chat
├── config
├── logs
├── readme.md
├── readme.zh.md
├── start.bat
├── start.sh
├── stop.bat
├── stop.sh
└── uploader

7 directories, 7 files
```

- 将其中的 admin，agent，chat 三个文件夹复制到 /var/www/html/weiyuai/ 文件夹下。
- 其中：admin 为管理后台，agent 为客服端，chat 为访客端
- 三者默认访问的服务器地址为: http://127.0.0.1:9003, 发布到线上时需要修改才能够正常使用，具体修改方法如下：
- 找到 admin/config.json 、 agent/config.json 和 chat/config.json 三个文件
- config.json 文件内容如下：

```json
{
  "enabled": false, // false 改为 true。只有修改为 true，下面的 apiHost 和 htmlHost 才能生效
  "apiHost": "api.weiyuai.cn", // 重要：改为线上 api 地址，如: api.example.com，不能够以 http 开头
  "htmlHost": "www.weiyuai.cn" // 修改为访问静态网页地址，如: www.example.com，不能够以 http 开头
}
```

- enabled 字段为是否启用自定义服务器地址，默认为 false。这里需要将 false 改为 true。只有修改为 true，下面的 apiHost 和 htmlHost 才能生效
- apiHost 字段为 api 地址，默认为：api.weiyuai.cn，请替换为自己的域名，不能够以 http 开头
- htmlHost 字段为静态网页地址，默认为：www.weiyuai.cn。请替换为自己的域名，不能够以 http 开头

## nginx.conf

```bash
# 创建缓存文件夹，在nginx.conf文件中用到
mkdir -p /var/www/html/nginx/cache/webserver
```

可直接拷贝到 nginx.conf 中，路径 /etc/nginx/nginx.conf

```conf
# nginx.conf 模板
# 记得添加，否则会报错：unknown directive "stream" in /etc/nginx/nginx.conf
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
#
user www-data;
# user root;
worker_processes auto;
pid /run/nginx.pid;
# https://blog.csdn.net/liupeifeng3514/article/details/79008079
# 报错500: nginx too many open files
worker_rlimit_nofile 65535;

events {
    use epoll;
    worker_connections 65535;
    accept_mutex off;
    multi_accept on;
}

http {
    ##
    # Basic Settings
    ##
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    # server_tokens off;

    # server_names_hash_bucket_size 64;
    # server_name_in_redirect off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    # 禁止ip黑名单访问服务器
    # include blackip.conf;

    ##
    # SSL Settings
    ##
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    ##
    # Logging Settings
    ##
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    ##
    # Gzip Settings
    ##

    gzip on;
    gzip_disable "msie6";

    # gzip_vary on;
    # gzip_proxied any;
    # gzip_comp_level 6;
    # gzip_buffers 16 8k;
    # gzip_http_version 1.1;
    # gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    ##
    # Virtual Host Configs
    ##
    ## http://blog.51cto.com/freeloda/1288553
    ## 设置缓存
    ## 注意：要放在/var/www/html目录下，否则会permission denied
    ## mkdir -p /var/www/html/nginx/cache/webserver
    proxy_cache_path /var/www/html/nginx/cache/webserver levels=1:2 keys_zone=webserver:20m max_size=1g;
    # use_temp_path=off;
    # nginx 出现413 Request Entity Too Large问题的解决方法
    client_max_body_size 1024m;

    ## 负载均衡
    upstream weiyuai {
        # round_robin; # 默认，轮流分配
        ip_hash; # 同一个ip访问同一台服务器, 这样来自同一个IP的访客固定访问一个后端服务器
        # least_conn; # 公平分配
        # server 172.16.81.2:9003     weight=2 max_fails=10 fail_timeout=60s;
        server 127.0.0.1:9003 weight=2 max_fails=10 fail_timeout=60s;
    }

    upstream weiyuaiwss {
        # round_robin; # 默认，轮流分配
        ip_hash; # 同一个ip访问同一台服务器, 这样来自同一个IP的访客固定访问一个后端服务器
        # least_conn; # 公平分配
        # server 172.16.81.2:9885     weight=2 max_fails=10 fail_timeout=60s;
        server 127.0.0.1:9885 weight=2 max_fails=10 fail_timeout=60s;
    }

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}

# 配置tcp ssl代理
stream {
    #tcp
    upstream weiyuaitcp {
        # 不能使用，否则无法启动nginx
        #ip_hash; # 同一个ip访问同一台服务器
        # server 172.16.81.2:9883     weight=2 max_fails=10 fail_timeout=60s;
        server 127.0.0.1:9883 weight=2 max_fails=10 fail_timeout=60s;
    }
}
```

## sites-available/default

```bash
# 创建目录
mkdir -p /var/www/html/weiyuai/download
```

- 如需 https 访问，需要提前准备证书，并修改此配置。参考[ssl 证书](./letsencrypt.md)
- 可直接拷贝到 sites-available/default 中，路径 /etc/nginx/sites-available/default
- 注意替换其中的域名和 ip 地址，以及相关路径

```conf
# 2024-03-12 weiyuai.cn
server {
    listen 80;
    listen [::]:80;

    # 注意：提前创建此目录路径
    root /var/www/html/weiyuai/;
    index index.html index.htm index.nginx-debian.html;

    # 注意：这里需要替换域名
    server_name api.weiyuai.cn;

    ## 反向代理
    # https代理stomp连接
    location /stomp {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuai/stomp;

        # 为记录真实ip地址，而不是反向代理服务器地址
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    ## 反向代理
    # https代理websocket连接
    location /websocket {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuaiwss/websocket;

        # 为记录真实ip地址，而不是反向代理服务器地址
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    #增加两头部
    add_header X-Via $server_addr;
    add_header X-Cache $upstream_cache_status;

    ## 反向代理
    location @springboot {
        # 将nginx所有请求均跳转到9003端口
        proxy_pass http://weiyuai;

        # 为记录真实ip地址，而不是反向代理服务器地址
        proxy_set_header  Host            $host;
        #  X-Real-IP 让日志的IP显示真实的客户端的IP
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;

        # 设置缓存
        # 为应答代码为200和302的设置缓存时间为10分钟，404代码缓存10分钟。
        #proxy_cache webserver;
        # proxy_cache_valid  200 302  10m;
        proxy_cache_valid  404      10m;
    }

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        # try_files $uri $uri/ =404;
        try_files $uri $uri/ @springboot;
    }
}

server {
    listen 80;
    listen [::]:80;

    # 注意：提前创建该目录
    root /var/www/html/weiyuai/;
    index index.html index.htm index.nginx-debian.html;

    # 注意：修改为自己的域名
    server_name weiyuai.cn *.weiyuai.cn;

    location / {
        # 匹配所有路径，并尝试首先提供文件，然后目录，最后回退到index.html
        try_files $uri $uri/ /index.html; # 这里应该指向根目录的index.html，而不是特定路径下的index.html
    }

    # 下载文件，不需要修改owner，修改了也没用，只需要修改nginx.conf的user为root即可
    location /download/ {
        # alias /root/weiyuai/download/;
        alias /var/www/html/weiyuai/download/;
        autoindex on;
        autoindex_format html; #以html风格将目录展示在浏览器中
        autoindex_exact_size off; #切换为 off 后，以可读的方式显示文件大小，单位为 KB、MB 或者 GB
        autoindex_localtime on; #以服务器的文件时间作为显示的时间
        client_max_body_size 4048M;
        proxy_max_temp_file_size 4048M;
        proxy_send_timeout 600; #后端服务器数据回传时间(代理发送超时)
        proxy_read_timeout 600; #连接成功后，后端服务器响应时间(代理接收超时)

        #符合条件，直接下载
        if ($request_filename ~* ^.*?\.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx)$){
            add_header Content-Disposition attachment;
        }
    }

    # 如果需要为每个子路径提供特定的index.html，您可以添加额外的location块
    location /admin/ {
        try_files $uri $uri/ /admin/index.html;
    }

    location /agent/ {
        try_files $uri $uri/ /agent/index.html;
    }

    location /chat/ {
        try_files $uri $uri/ /chat/index.html;
    }

    location /frame/ {
        try_files $uri $uri/ /chat/index.html;
    }

    location /docs/ {
        try_files $uri $uri/ /docs/index.html;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    # 注意：修改为自己的证书路径和私钥路径
    ssl_certificate /etc/letsencrypt/live/weiyuai.cn/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/weiyuai.cn/privkey.pem; # managed by Certbot

    # 注意：修改为自己的域名
    server_name api.weiyuai.cn;

    # 注意：修改为自己的根目录或创建此目录
    root /var/www/html/weiyuai;
    index index.html index.htm index.nginx-debian.html;

    ## 反向代理
    # https代理stomp连接
    location /stomp {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuai/stomp;

        # 为记录真实ip地址，而不是反向代理服务器地址
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    ## 反向代理
    # https代理websocket连接
    location /websocket {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuaiwss/websocket;

        # 为记录真实ip地址，而不是反向代理服务器地址
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    #增加两头部
    add_header X-Via $server_addr;
    add_header X-Cache $upstream_cache_status;

    ## 反向代理
    location @springboot {
        # 将nginx所有请求均跳转到9003端口
        proxy_pass http://weiyuai;

        # add_header Access-Control-Allow-Origin *; # 报错，不能添加，需要在spring boot中去掉相应的origin
        # 为记录真实ip地址，而不是反向代理服务器地址
        proxy_set_header  Host            $host;
        #  X-Real-IP 让日志的IP显示真实的客户端的IP
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;

        # 设置缓存
        # 为应答代码为200和302的设置缓存时间为10分钟，404代码缓存10分钟。
        #proxy_cache webserver;
        #proxy_cache_valid  200 302  10m;
        proxy_cache_valid  404      10m;
    }

    location / {
            # First attempt to serve request as file, then
    # as directory, then fall back to displaying a 404.
    # try_files $uri $uri/ =404;
    try_files $uri $uri/ @springboot;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    # 注意：修改为自己的证书路径和私钥路径
    ssl_certificate /etc/letsencrypt/live/weiyuai.cn/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/weiyuai.cn/privkey.pem; # managed by Certbot

    # 注意：修改为自己的域名
    server_name weiyuai.cn *.weiyuai.cn;

    # 注意：需要提前创建此路径，否则会报错
    root /var/www/html/weiyuai;
    index index.html index.htm index.nginx-debian.html;

    location / {
        # 匹配所有路径，并尝试首先提供文件，然后目录，最后回退到index.html
        try_files $uri $uri/ /index.html; # 这里应该指向根目录的index.html，而不是特定路径下的index.html
    }

    # 下载文件，不需要修改owner，修改了也没用，只需要修改nginx.conf的user为root即可
    # sudo chown -R www-data:www-data /root/weiyuai/download/
    location /download/ {
        # alias /root/weiyuai/download/;
        alias /var/www/html/weiyuai/download/;
        autoindex on;
        autoindex_format html; #以html风格将目录展示在浏览器中
        autoindex_exact_size off; #切换为 off 后，以可读的方式显示文件大小，单位为 KB、MB 或者 GB
        autoindex_localtime on; #以服务器的文件时间作为显示的时间
        client_max_body_size 4048M;
        proxy_max_temp_file_size 4048M;
        proxy_send_timeout 600; #后端服务器数据回传时间(代理发送超时)
        proxy_read_timeout 600; #连接成功后，后端服务器响应时间(代理接收超时)

        #符合条件，直接下载
        if ($request_filename ~* ^.*?\.(txt|doc|pdf|rar|gz|zip|docx|exe|xlsx|ppt|pptx)$){
            add_header Content-Disposition attachment;
        }
    }

    # 如果需要为每个子路径提供特定的index.html，您可以添加额外的location块
    location /admin/ {
        try_files $uri $uri/ /admin/index.html;
    }

    location /agent/ {
        try_files $uri $uri/ /agent/index.html;
    }

    location /chat/ {
        try_files $uri $uri/ /chat/index.html;
    }

    location /frame/ {
        try_files $uri $uri/ /chat/index.html;
    }

    location /docs/ {
        try_files $uri $uri/ /docs/index.html;
    }

}
```

## 对外开放端口

```bash
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

## TCP 连接数修改（可选）

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
```

## 参考

- [letsencrypt](https://letsencrypt.org/)
- [LetsEncrypt 通配符证书](https://www.jianshu.com/p/c5c9d071e395)
- [Ubuntu /etc/security/limits.conf 不生效问题](https://www.cnblogs.com/xiao987334176/p/11008812.html)
