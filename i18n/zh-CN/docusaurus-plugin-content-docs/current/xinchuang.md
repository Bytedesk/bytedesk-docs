---
sidebar_label: 等保信创
sidebar_position: 12
---

# 等保信创

本文档列出了系统在等保信创环境下的兼容性支持情况，包括CPU、操作系统、数据库等多方面的适配情况。

## 国产 CPU 芯片

我们的系统全面适配主流国产CPU架构：

- 兼容 x86 架构兆芯、海光等芯片
- 兼容 ARM 架构鲲鹏、海思、飞腾等芯片
- 兼容 LoongArch 架构 3A5000、3B5000 等芯片

## JDK 推荐版本

根据不同的CPU架构，我们推荐使用以下JDK版本：

| 架构/厂商 | 推荐 JDK |
|-----------|----------|
| 鲲鹏 / ARM64 | Huawei Bisheng JDK、Adoptium（ARM64） |
| 飞腾 / ARM64 | Huawei Bisheng JDK、Adoptium（ARM64） |
| 龙芯（LoongArch） | 龙芯 JDK、LoongArch JDK |
| 龙芯（MIPS） | LoongArch JDK（部分兼容） |
| 兆芯 / 海光 | Adoptium、Oracle JDK（x86_64） |

## 国产中间件

支持多种国产中间件解决方案：

- 部署支持采用东方通TongHttpServer、宝兰德BES WebServer 等负载均衡方案
- 部署支持采用东方通 TongRDS、宝兰德BES CacheDB等缓存方案

<!-- ## 国产浏览器

前端界面兼容主流国密浏览器：

- 兼容 360 安全浏览器、奇安信可信浏览器等国密浏览器 -->

## 国产操作系统

全面支持主流国产操作系统：

- 部署支持采用统信 UOS、麒麟 Kylin、华为 OpenEuler、优麒麟 Ubuntu Kylin、方德、麒麟信安等操作系统

## 国产数据库

适配多种国产数据库解决方案：

- 部署支持采用 TiDB、腾讯 TDSQL、GoldenDB、万里、瀚高、爱可生等数据库方案
- 支持纳管人大金仓、达梦等国产数据库
- 数据存储支持采用SM4国密算法进行加密

<!-- ## 国产认证、加密卡

提供安全可靠的国密方案：

- 支持宁盾等国密加密认证方案
- 一体机支持配置 PCIE 加密卡、 -->

## 参考链接

- [java环境对国产服务器的硬件环境要求？](https://blog.27nk.com/article/8498)