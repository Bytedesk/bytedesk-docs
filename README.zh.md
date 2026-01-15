# 微语文档

**语言 / Language:** [中文](README.zh.md) | [English](README.md)

## 开发步骤

```bash
# 创建
# https://docusaurus.io/zh-CN/docs/installation
npx create-docusaurus@latest docs classic --typescript
# 安装依赖
pnpm install
# 打包
pnpm build
# 打包上传到服务器，需要手动输入密码
pnpm release
# 翻译
pnpm write-translations
# https://docusaurus.io/zh-CN/docs/i18n/git
# docusaurus.config.ts中i18n添加en
# pnpm write-translations --locale en
# 
# mkdir -p i18n/en/docusaurus-plugin-content-docs/current
# cp -r docs/** i18n/en/docusaurus-plugin-content-docs/current
# #
# mkdir -p i18n/en/docusaurus-plugin-content-blog
# cp -r blog/** i18n/en/docusaurus-plugin-content-blog
# #
# mkdir -p i18n/en/docusaurus-plugin-content-pages
# cp -r src/pages/**.md i18n/en/docusaurus-plugin-content-pages
# cp -r src/pages/**.mdx i18n/en/docusaurus-plugin-content-pages
# 
# # docusaurus.config.ts中i18n添加zh-CN
pnpm write-translations --locale zh-CN
# 
mkdir -p i18n/zh-CN/docusaurus-plugin-content-docs/current
cp -r docs/** i18n/zh-CN/docusaurus-plugin-content-docs/current
#
mkdir -p i18n/zh-CN/docusaurus-plugin-content-blog
cp -r blog/** i18n/zh-CN/docusaurus-plugin-content-blog
#
mkdir -p i18n/zh-CN/docusaurus-plugin-content-pages
cp -r src/pages/**.md i18n/zh-CN/docusaurus-plugin-content-pages
cp -r src/pages/**.mdx i18n/zh-CN/docusaurus-plugin-content-pages
# pnpm start --locale zh-CN
pnpm start-cn
# 
# docusaurus.config.ts中i18n添加zh-TW
# pnpm write-translations --locale zh-TW
# # 
# mkdir -p i18n/zh-TW/docusaurus-plugin-content-docs/current
# cp -r docs/** i18n/zh-TW/docusaurus-plugin-content-docs/current
# #
# mkdir -p i18n/zh-TW/docusaurus-plugin-content-blog
# cp -r blog/** i18n/zh-TW/docusaurus-plugin-content-blog
# #
# mkdir -p i18n/zh-TW/docusaurus-plugin-content-pages
# cp -r src/pages/**.md i18n/zh-TW/docusaurus-plugin-content-pages
# cp -r src/pages/**.mdx i18n/zh-TW/docusaurus-plugin-content-pages
# 只有正式发布到生产环境才能够切换语言, 所以需要下面命令测试中文
# pnpm start --locale zh-TW
# pnpm start-tw
```

## 架构图

- [架构图](https://www.weiyuai.cn/architecture.html)

## 开源

- [服务器](https://github.com/Bytedesk/bytedesk)
- [桌面客户端](https://github.com/Bytedesk/bytedesk-desktop)
- [QT桌面客户端](https://github.com/Bytedesk/bytedesk-qt)
- [移动客户端](https://github.com/Bytedesk/bytedesk-mobile)
- [SipPhone](https://github.com/Bytedesk/bytedesk-phone)
- [视频会议](https://github.com/Bytedesk/bytedesk-conference)
- [Freeswitch Docker](https://github.com/Bytedesk/bytedesk-freeswitch)
- [Jitsi Docker](https://github.com/Bytedesk/bytedesk-jitsi)

## 开源Demo + SDK

| Project     | Description           | Forks          | Stars             |
|-------------|-----------------------|----------------|-------------------|
| [iOS](https://github.com/bytedesk/bytedesk-swift) | iOS  | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-swift) | ![GitHub Repo stars](https://img.shields.io/github/stars/Bytedesk/bytedesk-swift)                 |
| [Android](https://github.com/bytedesk/bytedesk-android) | Android | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-android) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-android)  |
| [Flutter](https://github.com/bytedesk/bytedesk-flutter) | Flutter | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-flutter)| ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-flutter) |
| [UniApp](https://github.com/bytedesk/bytedesk-uniapp) | Uniapp | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-uniapp) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-uniapp) |
| [Web](https://github.com/bytedesk/bytedesk-web) | Vue/React/Angular/Next.js/JQuery/... | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-web) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-web) |
| [Wordpress](https://github.com/bytedesk/bytedesk-wordpress) | Wordpress | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-wordpress) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-wordpress) |
| [Woocommerce](https://github.com/bytedesk/bytedesk-woocommerce) | woocommerce | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-woocommerce) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-woocommerce) |
<!-- | [Magento](https://github.com/bytedesk/bytedesk-magento) | Magento | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-magento) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-magento) |
| [Prestashop](https://github.com/bytedesk/bytedesk-prestashop) | Prestashop | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-prestashop) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-prestashop) |
| [Shopify](https://github.com/bytedesk/bytedesk-shopify) | Shopify | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-shopify) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-shopify) |
| [Opencart](https://github.com/bytedesk/bytedesk-opencart) | Opencart | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-opencart) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-opencart) |
| [Laravel](https://github.com/bytedesk/bytedesk-laravel) | Laravel | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-laravel) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-laravel) |
| [Django](https://github.com/bytedesk/bytedesk-django) | Django | ![GitHub forks](https://img.shields.io/github/forks/bytedesk/bytedesk-django) | ![GitHub Repo stars](https://img.shields.io/github/stars/bytedesk/bytedesk-django) | -->

