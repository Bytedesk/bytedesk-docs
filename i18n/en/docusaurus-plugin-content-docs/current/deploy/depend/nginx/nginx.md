<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-06-19 22:51:02
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-10-24 09:48:21
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# Nginx

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
# Test Nginx configuration file to ensure changes are correct
# sudo nginx -t
# If no errors, run following command to reload modified configuration
# sudo nginx -s reload
```

```bash
# Check if stream module is installed
nginx -V | grep stream # Note: capital V
# Output indicates it's installed
# Create cache directory, used in nginx.conf
mkdir -p /var/www/html/nginx/cache/webserver
# Ports to open externally
http: 80
https: 443
# Additionally
mysql: 3306
redis: 6379
# spring boot ports:
9003
# 9883
9885
```

## Configuration

```bash
# If download file error:
 open() "/root/weiyuai/uploader/20240821080529_weiyuai.exe" failed (13: Permission denied),
# Modify nginx.conf's
# user www-data;
# to
# user root;
# then restart
# Check nginx processes
ps -aux | grep nginx
# Upload nginx.conf and sites-available folder directly to /etc/nginx/ directory to overwrite original files
# Reload configuration
nginx -s reload
# Or restart nginx
service nginx restart
sudo systemctl restart nginx
```

```bash
# Create symbolic links
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_80.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_443.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_api_80.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/weiyuai_cn_api_443.conf /etc/nginx/sites-enabled/
# Delete symbolic links
sudo unlink /etc/nginx/sites-enabled/weiyuai_cn_80.conf
sudo unlink /etc/nginx/sites-enabled/weiyuai_cn_443.conf
sudo unlink /etc/nginx/sites-enabled/weiyuai_cn_api_80.conf
sudo unlink /etc/nginx/sites-enabled/weiyuai_cn_api_443.conf
# 
sudo unlink /etc/nginx/sites-enabled/default
# View symbolic links
ls -l /etc/nginx/sites-enabled/
# Reload nginx configuration
sudo nginx -s reload
# Or
sudo systemctl reload nginx
```
