<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-06-19 22:51:02
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-06-19 23:16:09
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

## 安装

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

## 配置

``` bash
# 将 nginx.conf和sites-available文件夹，直接上传到/etc/nginx/目录下覆盖原有文件
# 重新加载配置文件
nginx -s reload
# 或者 重启nginx
```
