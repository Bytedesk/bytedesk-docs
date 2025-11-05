---
sidebar_label: Nginx
sidebar_position: 4
---

# Nginx配置微语前端反向代理

:::tip
本文介绍如何使用Nginx配置微语系统的反向代理，实现访问管理后台(admin)、客服工作台(agent)和访客端(chat)。
微语Docker镜像中已经包含了admin/agent/chat三个模块，默认可以直接使用。下面要说明的是使用前后分离的方式部署前端，
后端可以是Docker镜像部署、源码部署、jar包部署、宝塔部署均可，为方便升级，建议使用前后分离的方式。
下面介绍中使用到两个二级域名：api.weiyuai.cn和www.weiyuai.cn（**重要：请在实际部署时替换为自己的域名**），其中：api.weiyuai.cn 用于Api请求，指向后端服务器，www.weiyuai.cn 用于访问前端html页面，
二者可以部署在相同或不同服务器均可。

- 操作系统：Ubuntu 22.04 LTS
- 推荐配置：4 核 CPU，8G 内存

> **特别注意**：本文档中所有出现的 `weiyuai.cn` 域名仅作为示例，在实际部署中必须替换为你自己的域名。
<!-- > 查看[域名替换说明](./domain_notice.md)获取完整替换指南。 -->

:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [Nginx 官方文档](http://nginx.org/en/docs/)。
:::

## 安装Nginx

首先需要在服务器上安装Nginx：

```bash
sudo apt update
sudo apt install nginx
sudo apt -y install libnginx-mod-stream
mkdir -p /var/www/html/weiyuai
sudo chmod -R 755 /var/www/html/weiyuai/

# 验证安装是否成功(查看80端口是否启动)
netstat -ntlp

# 常用命令参考
# sudo service nginx start    # 启动nginx
# sudo service nginx stop     # 停止nginx
# sudo service nginx restart  # 重启nginx
# sudo nginx -s reload        # 重新加载配置
```

安装完成后，检查stream模块是否已安装（用于TCP和UDP代理）：

```bash
# 检查stream模块
nginx -V | grep stream  # 注意是大写V

# 如有需要，创建缓存文件夹
mkdir -p /var/www/html/nginx/cache/webserver
```

## 方式一：直接反向代理到后端服务器（前后一体）

可以直接配置nginx反向代理到后端服务器，实现访问域名时直接访问到后端服务器。可以直接跳转到 [Nginx主配置文件](#nginx主配置文件) 直接进行反向代理。

## 方式二：反向代理到后端服务器并配置前端文件（前后分离）

### 1. 下载微语前端文件

有两种方式获取前端文件：

- 方式一：从[Github仓库](https://github.com/Bytedesk/bytedesk/tree/main/starter/src/main/resources/static)下载，最新，推荐
- 方式二：从[Github Release](https://github.com/Bytedesk/bytedesk/releases) 下载

下载解压后的文件结构如下：

```bash
server/
├── admin         # 管理后台
├── agent         # 客服工作台
├── agenticflow   # AI代理流程模块，用于编辑工作流和工单流程
├── notebase      # 知识库模块，用于知识库编辑
├── kanban        # 看板模块，用于项目看板
├── chat          # 访客端
├── bytedesk-starter-xxx.jar  # 后端服务
└── ...其他文件
```

### 2. 配置前端文件

1. 将各个前端模块复制到`/var/www/html/weiyuai/`文件夹下
   - `admin`：管理后台模块，用于系统管理员配置和监控整个系统
   - `agent`：客服工作台模块，客服人员使用的操作界面
   - `agenticflow`：AI代理流程模块，用于编辑工作流和工单流程
   - `notebase`：知识库模块，用于知识库编辑
   - `kanban`：看板模块，用于项目看板管理
   - `chat`：访客端模块，供最终用户访问的聊天界面
2. 修改各个模块的配置文件，使其指向正确的服务器地址

每个模块都有一个`config.json`配置文件，配置方式有以下几种情况（**根据实际环境二选一**）。注意，`agenticflow`、`notebase`和`kanban`这三个模块的配置文件与`agent`文件夹中的`config.json`配置相同：

### 方法1：使用域名（线上环境）

如果您使用域名部署，配置如下：

```json
// admin和agent的config.json内容
{
    "enabled": true,         // 必须设置为true才能启用模块
    "apiUrl": "https://api.weiyuai.cn",      // API服务器地址 (请替换为自己的域名)
    "websocketUrl": "wss://api.weiyuai.cn/websocket", // WebSocket连接地址 (请替换为自己的域名)
    "htmlUrl": "https://www.weiyuai.cn"      // 网站根地址 (请替换为自己的域名)
}

// chat的config.json内容
{
    "enabled": true,         // 必须设置为true才能启用模块
    "apiUrl": "https://api.weiyuai.cn",      // (请替换为自己的域名)
    "websocketUrl": "wss://api.weiyuai.cn/stomp", // 注意：chat使用stomp协议 (请替换为自己的域名)
    "htmlUrl": "https://www.weiyuai.cn"      // (请替换为自己的域名)
}
```

### 方法2：使用服务器IP（无域名环境）

如果您没有域名或者在使用服务器IP部署，需要将配置中的域名替换为服务器IP地址，https替换为http：

```json
// admin、agent模块的config.json配置示例
{
    "enabled": true,          // 必须设置为true才能启用模块
    "apiUrl": "http://服务器IP:9003",           // API地址改为服务器IP
    "websocketUrl": "ws://服务器IP:9885/websocket", // WebSocket改为ws协议
    "htmlUrl": "http://服务器IP:9003"           // HTML地址改为服务器IP
}

// chat模块的config.json配置示例
{
    "enabled": true,          // 必须设置为true才能启用模块
    "apiUrl": "http://服务器IP:9003",
    "websocketUrl": "ws://服务器IP:9003/stomp", // chat模块使用stomp协议
    "htmlUrl": "http://服务器IP:9003"
}
```

### Nginx主配置文件

首先配置Nginx的主配置文件，去[gitee查看](https://github.com/Bytedesk/bytedesk/tree/main/deploy/nginx/weiyuai.cn)，在`/etc/nginx/nginx.conf`的http块中添加负载均衡配置：

```bash
# 在nginx.conf文件中的http模块中添加
http {
    # ... 已有配置 ...
    
    # 配置REST API服务的负载均衡（可以根据需要修改upstream名称，例如替换"weiyuai"为你的系统名称）
    upstream weiyuai {
        ip_hash;  # 同一IP访问同一服务器，保持会话一致性
        server 127.0.0.1:9003 weight=2 max_fails=10 fail_timeout=60s;
        # 如有多台服务器，可添加更多server行
        # server 172.16.81.2:9003 weight=2 max_fails=10 fail_timeout=60s;
    }

    # 配置WebSocket服务的负载均衡（可以根据需要修改upstream名称，例如替换"weiyuaiwss"为你的系统名称+wss）
    upstream weiyuaiwss {
        ip_hash;  # WebSocket连接必须保持会话一致性
        server 127.0.0.1:9885 weight=2 max_fails=10 fail_timeout=60s;
        # 如有多台服务器，可添加更多server行
    }

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### 网站配置文件

接下来，我们需要创建网站配置文件。去[gitee查看](https://github.com/Bytedesk/bytedesk/tree/main/deploy/nginx/weiyuai.cn)，在`/etc/nginx/sites-available/`目录下创建以下配置文件：

#### 1. 主站点HTTP配置 (weiyuai_cn_80.conf)

此配置用于处理访问微语前端的HTTP请求：

```bash
# weiyuai_cn_80.conf - 主站点HTTP配置（文件名中的weiyuai_cn可替换为你的域名）
server {
    listen 80;
    listen [::]:80;

    # 网站根目录，存放前端文件
    root /var/www/html/weiyuai/;
    index index.html index.htm;

    # 将域名替换为你自己的域名或IP地址（重要提示：必须替换为自己的域名！）
    server_name weiyuai.cn *.weiyuai.cn;

    # 主路径配置
    location / {
        # 尝试提供文件或目录，如果不存在则返回根index.html
        try_files $uri $uri/ /index.html;
    }

    # 管理后台配置
    location /admin/ {
        try_files $uri $uri/ /admin/index.html;
    }

    # 客服工作台配置
    location /agent/ {
        try_files $uri $uri/ /agent/index.html;
    }
    
    # AI代理流程模块配置
    location /agenticflow/ {
        try_files $uri $uri/ /agenticflow/index.html;
    }
    
    # 知识库模块配置
    location /notebase/ {
        try_files $uri $uri/ /notebase/index.html;
    }
    
    # 看板模块配置
    location /kanban/ {
        try_files $uri $uri/ /kanban/index.html;
    }

    # 访客端聊天界面配置
    location /chat/ {
        try_files $uri $uri/ /chat/index.html;
    }

    # 嵌入式聊天框架配置
    location /frame/ {
        try_files $uri $uri/ /chat/index.html;
    }
}
```

#### 2. 主站点HTTPS配置 (weiyuai_cn_443.conf)

如果需要启用HTTPS，去[gitee查看](https://github.com/Bytedesk/bytedesk/tree/main/deploy/nginx/weiyuai.cn)，可以创建以下配置（可选）：

```bash
# weiyuai_cn_443.conf - 主站点HTTPS配置（文件名中的weiyuai_cn可替换为你的域名）
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    # SSL证书配置（必须替换为你自己的证书路径和域名）
    ssl_certificate /etc/letsencrypt/live/weiyuai.cn/fullchain.pem;  # 替换weiyuai.cn为你的域名
    ssl_certificate_key /etc/letsencrypt/live/weiyuai.cn/privkey.pem; # 替换weiyuai.cn为你的域名

    # 将域名替换为你自己的域名（重要提示：必须替换为自己的域名！）
    server_name weiyuai.cn *.weiyuai.cn;

    root /var/www/html/weiyuai;
    index index.html index.htm;

    # 主路径配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 管理后台配置
    location /admin/ {
        try_files $uri $uri/ /admin/index.html;
    }

    # 客服工作台配置
    location /agent/ {
        try_files $uri $uri/ /agent/index.html;
    }
    
    # AI代理流程模块配置
    location /agenticflow/ {
        try_files $uri $uri/ /agenticflow/index.html;
    }
    
    # 知识库模块配置
    location /notebase/ {
        try_files $uri $uri/ /notebase/index.html;
    }
    
    # 看板模块配置
    location /kanban/ {
        try_files $uri $uri/ /kanban/index.html;
    }

    # 访客端聊天界面配置
    location /chat/ {
        try_files $uri $uri/ /chat/index.html;
    }

    # 嵌入式聊天框架配置
    location /frame/ {
        try_files $uri $uri/ /chat/index.html;
    }

    # 文档配置
    location /docs/ {
        try_files $uri $uri/ /docs/index.html;
    }
}
```

#### 3. API服务HTTP配置 (weiyuai_cn_api_80.conf)

去[gitee查看](https://github.com/Bytedesk/bytedesk/tree/main/deploy/nginx/weiyuai.cn)，此配置用于处理API请求和WebSocket连接：

```bash
# weiyuai_cn_api_80.conf - API服务HTTP配置（文件名中的weiyuai_cn可替换为你的域名）
server {
    listen 80;
    listen [::]:80;

    # 将域名替换为你自己的API域名（重要提示：必须替换为自己的域名！）
    server_name api.weiyuai.cn;

    # API请求代理配置
    location / {
        # 将请求代理到后端服务
        proxy_pass http://weiyuai;
        
        # 传递请求头，保留客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
    }

    # 访客WebSocket连接(STOMP协议)
    location /stomp {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuai/stomp;
        
        # 传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
    }

    # 客服WebSocket连接
    location /websocket {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuaiwss/websocket;
        
        # 传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
    }

    # 添加响应头信息
    add_header X-Via $server_addr;
    add_header X-Cache $upstream_cache_status;

    # 默认路径处理
    location @springboot {
        proxy_pass http://weiyuai;
        
        # 传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
        
        # 缓存配置
        proxy_cache_valid 404 10m;
    }
}
```

#### 4. API服务HTTPS配置 (weiyuai_cn_api_443.conf)

如果需要启用API的HTTPS访问，去[gitee查看](https://github.com/Bytedesk/bytedesk/tree/main/deploy/nginx/weiyuai.cn)，可以创建以下配置（可选）：

```bash
# weiyuai_cn_api_443.conf - API服务HTTPS配置（文件名中的weiyuai_cn可替换为你的域名）
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    # SSL证书配置（必须替换为你自己的证书路径和域名）
    ssl_certificate /etc/letsencrypt/live/weiyuai.cn/fullchain.pem;  # 替换weiyuai.cn为你的域名
    ssl_certificate_key /etc/letsencrypt/live/weiyuai.cn/privkey.pem; # 替换weiyuai.cn为你的域名

    # 将域名替换为你自己的API域名（重要提示：必须替换为自己的域名！）
    server_name api.weiyuai.cn;

    # API请求代理配置
    location / {
        proxy_pass http://weiyuai;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
    }

    # 访客WebSocket连接(STOMP协议)
    location /stomp {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuai/stomp;
        
        # 传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
    }

    # 客服WebSocket连接
    location /websocket {
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://weiyuaiwss/websocket;
        
        # 传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
    }

    # 添加响应头信息
    add_header X-Via $server_addr;
    add_header X-Cache $upstream_cache_status;

    # 默认路径处理
    location @springboot {
        proxy_pass http://weiyuai;
        
        # 传递客户端信息
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include fastcgi_params;
        
        # 缓存配置
        proxy_cache_valid 404 10m;
    }
}
```

## 启用配置

### 1. 创建符号链接

将配置文件链接到`sites-enabled`目录，使其生效：

```bash
# 创建符号链接（注意：如果你修改了配置文件名称，这里也需要相应修改）
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_80.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_api_80.conf /etc/nginx/sites-enabled/

# 如果启用HTTPS，还需要链接这两个文件
# sudo ln -s /etc/nginx/sites-available/weiyuai_cn_443.conf /etc/nginx/sites-enabled/
# sudo ln -s /etc/nginx/sites-available/weiyuai_cn_api_443.conf /etc/nginx/sites-enabled/
```

### 2. 重新加载Nginx配置

```bash
# 检查配置是否有语法错误
sudo nginx -t

# 重新加载配置
sudo nginx -s reload
# 或使用systemd命令
# sudo systemctl reload nginx
```

### 3. 配置防火墙

确保服务器防火墙开放必要的端口：

```bash
# 必须开放的端口
- 80端口：HTTP访问
- 443端口：HTTPS访问（如果配置了SSL）

# 以下端口通常仅在内网开放，无需对外
- 9003端口：后端服务API端口
- 9885端口：WebSocket服务端口
- 3306端口：MySQL数据库（可选）
- 6379端口：Redis缓存（可选）
```

## 优化配置（可选）

### 增加TCP连接数限制

对于高并发场景，需要增加系统文件描述符限制：

```bash
# 查看当前最大打开文件数限制
ulimit -n

# 修改系统限制，编辑/etc/security/limits.conf文件
sudo vi /etc/security/limits.conf

# 添加以下内容
root soft nofile 655350
root hard nofile 655350
nginx soft nofile 6553500
nginx hard nofile 6553500
* soft nofile 655350
* hard nofile 655350

# 说明:
# - 设置root用户和nginx用户的文件描述符限制
# - * 表示所有用户都适用的限制
# - soft是软限制，hard是硬限制
# - 修改后需要重新登录或重启服务器才能生效

# 验证修改是否生效
ulimit -a
```

## 故障排查

如果配置后无法正常访问，可以通过以下方式排查问题：

```bash
# 检查Nginx配置是否有语法错误
sudo nginx -t

# 查看Nginx日志
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# 检查服务是否正常运行
sudo systemctl status nginx

# 检查端口是否正常监听
sudo netstat -tulpn | grep nginx
```

## 更多参考资料

- [Nginx官方文档](https://nginx.org/en/docs/)
- [Let's Encrypt免费SSL证书](https://letsencrypt.org/)
- [LetsEncrypt通配符证书申请教程](https://www.jianshu.com/p/c5c9d071e395)
- [Ubuntu系统文件描述符限制配置](https://www.cnblogs.com/xiao987334176/p/11008812.html)
