---
sidebar_label: Letsencrypt
sidebar_position: 5
---

# Letsencrypt

```bash
# 更新源
sudo apt update
# 安装snapd
sudo apt install snapd
# 查看snapd版本
snap version
# 更新snap到最新版
sudo snap install core; sudo snap refresh core
# 删除之前安装的certbot，如果之前没有安装过certbot，则忽略
# sudo apt-get remove certbot 或 sudo dnf remove certbot, 或 sudo yum remove certbot
# 重新安装certbot
sudo snap install --classic certbot
# 检查certbot是否正常运行
sudo ln -s /snap/bin/certbot /usr/bin/certbot
# 安装证书并更新nginx
# sudo certbot --nginx
# 仅用于安装证书，不更新nginx
# sudo certbot certonly --nginx
# 生成证书，支持通配符
sudo certbot certonly --manual --preferred-challenges=dns-01
# 修正：续约的时候使用这个才成功：sudo certbot --manual --preferred-challenges dns certonly
# 自动更新证书
sudo certbot renew --dry-run
# The command to renew certbot is installed in one of the following locations:
# /etc/crontab/
# /etc/cron.*/*
# systemctl list-timers
# 修改nginx配置文件 site-available 
# 重启
service nginx restart
# 打开浏览器确认是否正常运行
# 暂时不支持3级域名 *.*.bytedesk.com
# The server will not issue certificates for the identifier :: Error creating new order :: Cannot issue for "*.*.bytedesk.com": Domain name has more than one wildcard
```

## 运行

```bash
sudo certbot certonly --manual --preferred-challenges=dns-01
```

## 参考

- [letsencrypt](https://letsencrypt.org)
- [手动申请 Let's Encrypt 通配符证书](https://sspai.com/post/66008)
- [参考网站](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal)
