---
sidebar_label: Nginx
sidebar_position: 4
---

# Nginx

:::tip

- Operating System: Ubuntu 20.04 LTS
- Server minimum requirements: 2 CPU cores, 4GB RAM. Recommended: 4 CPU cores, 8GB RAM.

:::

## Installation

```bash
sudo apt update
sudo apt install nginx
# Check if installation successful
netstat -ntlp
# If port 80 starts normally, installation is successful
# Stop nginx
# service nginx stop
# Start nginx
# service nginx start
# Restart nginx:
# service nginx restart
# systemctl restart nginx
# Reload:
# service nginx force-reload
```

```bash
# Check if stream module is installed
nginx -V | grep stream # Note: capital V
# Output indicates it's installed
nginx version: nginx/1.18.0 (Ubuntu)
# ...
# You can see parameter: --with-stream=dynamic, indicating stream module is installed
# For error: unknown directive "stream" in /etc/nginx/nginx.conf, need to insert at first line of nginx.conf:
load_module /usr/lib/nginx/modules/ngx_stream_module.so;
# Create cache directory, used in nginx.conf
mkdir -p /var/www/html/nginx/cache/webserver
# Reload configuration
nginx -s reload
# Or restart nginx
service nginx restart
```

## Preparation

- Download and extract [server](https://www.weiyuai.cn/download/weiyu-server.zip) file, the extracted structure is as follows:

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

- Copy the admin, agent, chat folders to /var/www/html/weiyuai/
- Where: admin is for management dashboard, agent is for client, chat is for visitor interface
- The three components default to accessing server at: http://127.0.0.1:9003, this needs to be modified for production use, specifically:
- Find config.json files in admin/config.json, agent/config.json and chat/config.json
- The config.json content is as follows:

```json
{
    "enabled": false,
    "apiUrl": "https://api.weiyuai.cn",
    "websocketUrl": "wss://api.weiyuai.cn/websocket",
    "htmlUrl": "https://www.weiyuai.cn"
}
```

- enabled field determines whether to use custom server address, default is false. Change it to true here. Only when set to true will the apiHost and htmlHost below take effect
- apiUrl field is the API address, default is: api.weiyuai.cn, please replace with your domain
- websocketUrl field is the websocket address, default is: ws://api.weiyuai.cn/websocket, please replace with your domain
- htmlHost field is the static webpage address, default is: www.weiyuai.cn, please replace with your domain

## Example Using IP

- Replace domain with IP
- Replace https with http

```json
{
    "enabled": false,
    "apiUrl": "http://127.0.0.1:9003",
    "websocketUrl": "ws://127.0.0.1:9885/websocket",
    "htmlUrl": "http://127.0.0.1:9003"
}
```

## nginx.conf

Add the following content to the http module in nginx.conf:

```bash
#...
http {
    ##...
    
    ## REST API Load Balancing
    upstream weiyuai {
        # round_robin; # Default, round-robin distribution
        ip_hash; # Same IP accesses same server, so visitors from same IP are fixed to one backend server
        # least_conn; # Fair distribution
        # server 172.16.81.2:9003     weight=2 max_fails=10 fail_timeout=60s;
        server 127.0.0.1:9003 weight=2 max_fails=10 fail_timeout=60s;
    }

    # WebSocket Load Balancing
    upstream weiyuaiwss {
        # round_robin; # Default, round-robin distribution
        ip_hash; # Same IP accesses same server, so visitors from same IP are fixed to one backend server
        # least_conn; # Fair distribution
        # server 172.16.81.2:9885     weight=2 max_fails=10 fail_timeout=60s;
        server 127.0.0.1:9885 weight=2 max_fails=10 fail_timeout=60s;
    }

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

## sites-available

Create 4 files in the sites-available folder as follows:

### weiyuai_cn_80.conf

- Need to change server_name weiyuai.cn *.weiyuai.cn; to your domain or IP address

```bash
# weiyuai_cn_80.conf content
server {
    listen 80;
    listen [::]:80;

    root /var/www/html/weiyuai/;
    index index.html index.htm index.nginx-debian.html index.php;

    server_name weiyuai.cn *.weiyuai.cn;

    location / {
        # Match all paths, try to serve file first, then directory, finally fallback to index.html
        try_files $uri $uri/ /index.html; # This should point to root directory's index.html, not specific path's index.html
    }

    # If you need to provide specific index.html for each sub-path, you can add extra location blocks
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
}
```

### weiyuai_cn_443.conf

- Optional, only needed when SSL is enabled
- Need to change server_name weiyuai.cn *.weiyuai.cn; to your domain or IP address
- Port 443 configuration requires SSL certificate, here using Let's Encrypt free SSL certificate
- Need to modify SSL certificate paths

```bash
# weiyuai_cn_443.conf content
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/letsencrypt/live/weiyuai.cn/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/weiyuai.cn/privkey.pem; # managed by Certbot

    server_name weiyuai.cn *.weiyuai.cn;

    root /var/www/html/weiyuai;
    index index.html index.htm index.nginx-debian.html index.php;

    location / {
        # Match all paths, try to serve file first, then directory, finally fallback to index.html
        try_files $uri $uri/ /index.html; # This should point to root directory's index.html, not specific path's index.html
    }

    # If you need to provide specific index.html for each sub-path, you can add extra location blocks
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

### weiyuai_cn_api_80.conf

- Need to change server_name api.weiyuai.cn; to your domain or IP address

```bash
# weiyuai_cn_api_80.conf content
server {
    listen 80;
    listen [::]:80;

    root /var/www/html/weiyuai/;
    index index.html index.htm index.nginx-debian.html;

    server_name api.weiyuai.cn;

    ## Reverse Proxy
    # Proxy stomp connection
    location /stomp {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuai/stomp;

        # To record real IP address instead of reverse proxy server address
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    ## Reverse Proxy
    # Proxy websocket connection
    location /websocket {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuaiwss/websocket;

        # To record real IP address instead of reverse proxy server address
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    # Add two headers
    add_header X-Via $server_addr;
    add_header X-Cache $upstream_cache_status;

    ## Reverse Proxy
    location @springboot {
        # Forward all nginx requests to port 9003
        proxy_pass http://weiyuai;
        
        # To record real IP address instead of reverse proxy server address
        proxy_set_header  Host            $host;
        # X-Real-IP makes logs show real client IP
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;

        # Set cache
        # Set 10-minute cache for response codes 200 and 302, 10-minute cache for 404 code
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
```

### weiyuai_cn_api_443.conf

- Optional, only needed when SSL is enabled
- Need to change server_name api.weiyuai.cn; to your domain or IP address
- Port 443 configuration requires SSL certificate, here using Let's Encrypt free SSL certificate
- Need to modify SSL certificate paths

```bash
# weiyuai_cn_api_443.conf content
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    ssl_certificate /etc/letsencrypt/live/weiyuai.cn/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/weiyuai.cn/privkey.pem; # managed by Certbot

    server_name api.weiyuai.cn;

    root /var/www/html/weiyuai;
    index index.html index.htm index.nginx-debian.html;

    ## Reverse Proxy
    # Proxy stomp connection
    location /stomp {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuai/stomp;

        # To record real IP address instead of reverse proxy server address
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    ## Reverse Proxy
    # Proxy websocket connection
    location /websocket {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuaiwss/websocket;

        # To record real IP address instead of reverse proxy server address
        proxy_set_header  Host            $host;
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;
    }

    # Add two headers
    add_header X-Via $server_addr;
    add_header X-Cache $upstream_cache_status;

    ## Reverse Proxy
    location @springboot {
        # Forward all nginx requests to port 9003
        proxy_pass http://weiyuai;

        # add_header Access-Control-Allow-Origin *; # Error, cannot add, need to remove corresponding origin in spring boot
        # To record real IP address instead of reverse proxy server address
        proxy_set_header  Host            $host;
        # X-Real-IP makes logs show real client IP
        proxy_set_header  X-Real-IP       $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        include           fastcgi_params;

        # Set cache
        # Set 10-minute cache for response codes 200 and 302, 10-minute cache for 404 code
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
```

## Create Symbolic Links

```bash
# Create symbolic links
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_80.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_443.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_api_80.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_api_443.conf /etc/nginx/sites-enabled/
```

## Apply Configuration

```bash
# Reload nginx configuration
sudo nginx -s reload
# Or
sudo systemctl reload nginx
```

## Open Ports

```bash
# Ports to open externally
http: 80
https: 443
# Optional, may not need to be opened externally
mysql: 3306
redis: 6379
rest api: 9003
websocket: 9885
```

## Modify TCP Connections (Optional)

```bash
# Check maximum file limit for Linux system user
ulimit -n
# 65535
# Modify file limit
vi /etc/security/limits.conf
root soft nofile 655350
root hard nofile 655350
nginx soft nofile 6553500
nginx hard nofile 6553500
* soft nofile 655350
* hard nofile 655350
# root specifies which user's file limit to modify.
# '*' can be used to modify limit for all users;
# soft or hard specifies whether to modify soft or hard limit;
# 102400 specifies the new limit value, i.e. maximum open files
# (note: soft limit value must be less than or equal to hard limit)
# Note: After modifying /etc/security/limits.conf, close Terminal and re-login or restart server to take effect
# Check open files number
ulimit -a
```

## Common Issues

```shell
# View nginx log
cd /var/log/nginx
```

## References

- [letsencrypt](https://letsencrypt.org/)
- [LetsEncrypt Wildcard Certificate](https://www.jianshu.com/p/c5c9d071e395)
- [Ubuntu /etc/security/limits.conf Not Taking Effect](https://www.cnblogs.com/xiao987334176/p/11008812.html)
