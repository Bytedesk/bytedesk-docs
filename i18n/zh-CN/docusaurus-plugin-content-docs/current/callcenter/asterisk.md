---
sidebar_label: Asterisk
sidebar_position: 18
---

# Asterisk

## 安装命令

```bash
sudo apt update
sudo apt install -y asterisk
sudo systemctl enable --now asterisk
```

## 验证命令

```bash
asterisk -V
systemctl status asterisk --no-pager
asterisk -rx 'core show version'
asterisk -rx 'module show like res_pjsip.so'
# 查看运行端口号
netstat -tunlp
```

当前服务器上的验证结果:

- `asterisk -V` 输出 `Asterisk 20.6.0~dfsg+~cs6.13.40431414-2build5`
- `asterisk -rx 'core show version'` 可正常返回版本信息
- `res_pjsip.so` 已加载

## 常用目录

- 配置目录: `/etc/asterisk`
- 日志目录: `/var/log/asterisk`
- 数据目录: `/var/lib/asterisk`
- 模块目录: `/usr/lib/x86_64-linux-gnu/asterisk/modules`

## 常用命令

```bash
sudo systemctl restart asterisk
sudo systemctl stop asterisk
sudo systemctl start asterisk
sudo asterisk -rvvv
sudo fwconsole reload
```
