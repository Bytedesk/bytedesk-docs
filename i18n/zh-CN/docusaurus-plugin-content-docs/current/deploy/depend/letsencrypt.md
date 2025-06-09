---
sidebar_label: Letsencrypt
sidebar_position: 10
---

# Let's Encrypt SSL证书申请指南

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：4核8G内存
:::

[Let's Encrypt](https://letsencrypt.org) 是一个免费、开源的证书颁发机构，可以帮助您为网站获取SSL/TLS证书，启用HTTPS加密连接。本指南将引导您完成申请和安装过程。

## 什么是SSL证书？

SSL证书允许网站使用HTTPS协议（即安全的HTTP），保护用户与网站之间传输的数据安全。当您的网站启用HTTPS后：

- 数据在传输过程中被加密，防止被窃取
- 为用户提供更安全的浏览体验
- 提升网站在搜索引擎中的排名
- 显示安全锁图标，增加用户信任

## 安装Certbot工具

Certbot是申请Let's Encrypt证书的官方工具。以下是在Ubuntu系统上安装Certbot的步骤：

```bash
# 1. 更新系统软件包
sudo apt update

# 2. 安装snapd工具
sudo apt install snapd

# 3. 确保snapd是最新版本
sudo snap install core
sudo snap refresh core

# 4. 安装certbot
sudo snap install --classic certbot

# 5. 创建符号链接，确保certbot可执行
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## 申请证书的方法

### 方法1: 自动申请和配置（适合大多数情况）

如果您的服务器上运行着Nginx或Apache，可以使用自动配置：

```bash
# 自动申请证书并配置Nginx
sudo certbot --nginx

# 或者自动申请证书并配置Apache
sudo certbot --apache
```

此命令会:

1. 申请证书
2. 自动修改您的网站配置文件
3. 设置自动更新

### 方法2: 仅申请证书（不修改配置）

如果您希望手动配置服务器：

```bash
# 仅申请证书，不修改配置
sudo certbot certonly --nginx  # 针对Nginx
# 或
sudo certbot certonly --apache  # 针对Apache
```

### 方法3: 申请通配符证书（适用于多个子域名）

通配符证书可让您用一个证书保护多个子域名（如：*.example.com）：

```bash
# 申请通配符证书
sudo certbot certonly --manual --preferred-challenges=dns-01
```

#### 通配符证书申请步骤演示

下面是申请通配符证书的交互过程：

1. 运行命令后，输入您的域名（示例）：

   ```bash
   请输入您想要为证书添加的域名(用逗号或空格分隔):
   example.com,*.example.com
   ```

2. 系统会要求您添加DNS TXT记录来验证域名所有权：

   ```bash
   请在以下域名下添加DNS TXT记录:
   _acme-challenge.example.com
   
   TXT记录值:
   Ab5x7HcJK2LoQn... (这是一个随机生成的长字符串)
   ```

3. 登录您的DNS管理控制台（如阿里云、腾讯云等），添加该TXT记录
4. 添加完成并等待DNS记录生效后（通常需要几分钟），按回车继续
5. 验证成功后，证书会保存到服务器上：

   ```bash
   证书位置: /etc/letsencrypt/live/example.com/fullchain.pem
   私钥位置: /etc/letsencrypt/live/example.com/privkey.pem
   ```

## 证书更新

Let's Encrypt证书有效期为90天，需要定期更新。有两种方式：

### 自动更新

安装Certbot后，系统会自动添加定时任务，一般无需手动干预。可以测试更新过程：

```bash
sudo certbot renew --dry-run
```

### 手动更新

如果需要手动更新证书：

```bash
sudo certbot renew
```

## 配置Web服务器使用证书

### Nginx配置示例

```bash
server {
    listen 443 ssl;
    server_name example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    # 其他SSL配置...
    
    # 您的网站配置...
}

# 将HTTP重定向到HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

配置完成后重启Nginx：

```bash
sudo service nginx restart
```

## 注意事项

- 通配符证书可以保护一个域名的所有一级子域名，但不支持多级通配符（如 *.*.example.com）
- 手动申请的证书需要手动续期，请记得在到期前更新
- 证书文件位置：`/etc/letsencrypt/live/你的域名/`

## 参考资料

- [Let's Encrypt 官方网站](https://letsencrypt.org)
- [Certbot 使用文档](https://certbot.eff.org/instructions)
- [手动申请 Let's Encrypt 通配符证书教程](https://sspai.com/post/66008)
