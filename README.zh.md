# docs

```bash
# 创建
# https://docusaurus.io/zh-CN/docs/installation
npx create-docusaurus@latest docs classic --typescript
# 安装依赖
pnpm
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
