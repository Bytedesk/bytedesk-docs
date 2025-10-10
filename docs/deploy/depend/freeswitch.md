---
sidebar_label: Freeswitch
sidebar_position: 6
---

# Freeswitch 安装指南

:::tip 系统要求

- 操作系统：Ubuntu 22.04 LTS
- 服务器推荐配置：2核4G内存
- [微语Freeswitch Docker镜像Github](https://github.com/Bytedesk/bytedesk-freeswitch)
- 拉取海外Freeswitch Docker镜像: docker pull bytedesk/freeswitch:latest
- 拉取国内Freeswitch Docker镜像: docker pull registry.cn-hangzhou.aliyuncs.com/bytedesk/freeswitch:latest
:::

:::info 第三方组件说明
以下说明仅供参考，具体配置和使用方法请参考 [FreeSwitch 官方文档](https://freeswitch.org/confluence/display/FREESWITCH/FreeSWITCH+Explained)。
:::

## 简介

FreeSwitch 是一个开源的通信软件平台，用于搭建微语呼叫中心模块，如果不需要呼叫中心，可不安装。本文档将指导您完成 FreeSwitch 1.10.12 版本的安装过程。

源码编译方式请参考中文文档中的详细说明，包含所有模块配置和编译选项。

## Docker 方式安装（推荐）

请参考中文文档的 Docker Compose 配置示例和详细说明。

## 参考链接

- [LinPhone下载](https://www.linphone.org/en/download/)
- [中文完整文档](/zh-CN/docs/deploy/depend/freeswitch)
