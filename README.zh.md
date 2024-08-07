<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-05-05 13:49:10
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-08-07 09:52:42
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# docs

```bash
# 创建
# https://docusaurus.io/zh-CN/docs/installation
npx create-docusaurus@latest my-website classic --typescript
# 安装依赖
yarn
# 打包发布
yarn build
# 翻译
yarn write-translations
# https://docusaurus.io/zh-CN/docs/i18n/git
# docusaurus.config.ts中i18n添加en
# yarn write-translations --locale en
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
yarn write-translations --locale zh-CN
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
# yarn start --locale zh-CN
yarn start-cn
# 
# docusaurus.config.ts中i18n添加zh-TW
# yarn write-translations --locale zh-TW
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
# yarn start --locale zh-TW
# yarn start-tw
```
