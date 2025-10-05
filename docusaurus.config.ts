import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from '@docusaurus/types/src/plugin';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  // https://docusaurus.io/zh-CN/docs/configuration
  title: "Bytedesk",
  tagline: "微语智能客服系统",
  favicon: "img/favicon.ico",
  // 网站描述信息
  // description: "微语智能客服系统官方文档中心，提供详细的功能介绍、部署指南和开发者文档",
  // 启用Mermaid图表支持
  markdown: {
    mermaid: true,
    // Moved from deprecated top-level onBrokenMarkdownLinks (present in v3, required in v4)
    // Cast to any because @docusaurus/types@3.x doesn't include `markdown.hooks` yet.
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  } as any,
  // 主题配置
  themes: ['@docusaurus/theme-mermaid', "docusaurus-theme-openapi-docs"],

  // https://docusaurus.io/zh-CN/docs/deployment
  // Set the production url of your site here
  url: "https://www.weiyuai.cn/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",
  // baseUrl: "/bytedesk/", // github pages
  // baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "bytedesk", // Usually your GitHub org/user name.
  projectName: "bytedesk-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  // onBrokenLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN", "zh-TW"],
    localeConfigs: {
      en: {
        label: "English", // 英文语言标签
      },
      "zh-CN": {
        label: "简体中文", // 中文语言标签
      },
      "zh-TW": {
        label: "繁体中文", // 繁体中文标签
      },
    },
    // 配置国际化文件的路径
    // path: "./i18n",
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi-docs
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({locale, docPath}) => {
            if (locale !== 'en') {
              return `https://github.com/bytedesk/bytedesk-docs/blob/main/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`;
            }
            return `https://github.com/bytedesk/bytedesk-docs/blob/main/docs/${docPath}`;
          },
          // 显示最后更新时间
          showLastUpdateTime: true,
          // 显示最后更新者
          showLastUpdateAuthor: true,
          // 版本化配置（暂时禁用，待网站内容稳定后启用）
          lastVersion: 'current',
          // versions: {...},
          // onlyIncludeVersions: [...],
          // 侧边栏配置
          sidebarCollapsible: true, // 侧边栏类别可折叠
          sidebarCollapsed: true,   // 默认折叠
          // Markdown增强功能
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          rehypePlugins: [],
        },
        blog: {
          showReadingTime: true,
          // 显示最后更新时间
          showLastUpdateTime: true,
          // 显示最后更新者
          showLastUpdateAuthor: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({locale, blogPath}) => {
            if (locale !== 'en') {
              return `https://github.com/bytedesk/bytedesk-docs/blob/main/i18n/${locale}/docusaurus-plugin-content-blog/${blogPath}`;
            }
            return `https://github.com/bytedesk/bytedesk-docs/blob/main/blog/${blogPath}`;
          },
        },
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./src/css/watermark.css",
            "./src/css/navbar-dropdown-fix.css",
            "./src/css/simple-dropdown-fix.css",
            "./src/css/ultimate-dropdown-fix.css",
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  
  // 配置插件
  plugins: [
    // 本地搜索插件
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // 配置选项
        hashed: true, // 为索引文件生成哈希值，确保内容更新时缓存可以被刷新
        language: ["en", "zh"], // 搜索支持的语言 - 对应国际化配置中的"en"、"zh-CN"和"zh-TW"
        // 注意：搜索插件使用"zh"同时支持简体和繁体中文，不需要分开配置
        indexDocs: true, // 索引文档页面
        indexBlog: true, // 索引博客页面
        indexPages: true, // 索引其他页面
        docsRouteBasePath: '/docs', // 文档的基础路径
        highlightSearchTermsOnTargetPage: true, // 在目标页面上高亮搜索词
        searchBarPosition: 'right', // 搜索栏位置
        searchBarShortcutHint: true, // 显示搜索快捷键提示
        searchResultLimits: 8, // 显示的搜索结果数量
        searchResultContextMaxLength: 50, // 搜索结果上下文的最大长度
        explicitSearchResultPath: true, // 在搜索结果中显示完整路径
      }
    ],
    // 需要运行下面命令重新生成docs： yarn docusaurus gen-api-docs all
    // 清理已生成的docs：yarn docusaurus clean-api-docs all
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          bytedesk: {
            specPath: "apidocs/bytedesk.yaml",
            outputDir: "docs/apidocs",
            // 可选：代理 URL，用于 API 请求
            // proxy: "http://localhost:3001",
            // 可选：下载 URL
            downloadUrl: "https://api.weiyuai.cn/v3/api-docs",
            // 可选：隐藏发送 API 请求按钮
            hideSendButton: false,
            // 可选：显示扩展信息
            showExtensions: false,
            // 可选：显示模式页面
            showSchemas: true,
            sidebarOptions: {
              groupPathsBy: "tagGroup",
              categoryLinkSource: "tag", // 使用 tag 描述作为分类链接
              sidebarCollapsible: true,
              sidebarCollapsed: true,
              customProps: {
                // 自定义侧边栏属性
                apiLabel: "API Reference",
              },
            },
            // 可选：版本配置
            // version: "1.0.0",
            // label: "Latest",
            // baseUrl: "/api/v1",
            // versions: {
            //   "1.0.0": {
            //     specPath: "examples/petstore-v1.yaml",
            //     outputDir: "docs/petstore/v1",
            //     label: "Version 1.0",
            //     baseUrl: "/api/v1",
            //   },
            //   "2.0.0": {
            //     specPath: "examples/petstore-v2.yaml", 
            //     outputDir: "docs/petstore/v2",
            //     label: "Version 2.0",
            //     baseUrl: "/api/v2",
            //   },
            // },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  

  // 添加自定义脚本（移除外部脚本，改由 clientModules 动态设置，避免路径/404 导致的 Unexpected token '<'）
  scripts: [],

  // React 配置
  clientModules: [
    require.resolve('./src/client-modules/react-config.js'),
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    // 站点公告横幅
    // announcementBar: {
    //   id: 'support_us',
    //   content: '🎉 最新版本V5.0已发布！查看<a target="_blank" rel="noopener noreferrer" href="/docs/docs/intro">新功能详情</a>',
    //   backgroundColor: '#fafbfc',
    //   textColor: '#091E42',
    //   isCloseable: true,
    // },
    // Google Analytics配置 
    // googleAnalytics: {
    //   trackingID: 'G-XXXXXXXXXX', // 替换为您的跟踪ID
    //   anonymizeIP: true,
    // },
    // SEO优化配置
    metadata: [
      {name: 'keywords', content: 'bytedesk, 微语, 客服系统, AI客服, 智能客服'},
      {name: 'description', content: '微语智能客服系统，支持网页、APP、微信公众号、小程序等多渠道接入，提供智能机器人、人工客服、工单系统等功能'},
      {name: 'og:title', content: 'Bytedesk微语智能客服系统'},
      {name: 'og:description', content: '微语智能客服系统官方文档，全面介绍系统功能、部署方案及集成指南'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    // 暗色模式配置
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // 目录导航配置
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    // 页面滚动配置
    docs: {
      sidebar: {
        hideable: true, // 允许隐藏侧边栏
        autoCollapseCategories: true, // 自动折叠其他类别
      },
    },
    // 提升代码块用户体验
    codeblock: {
      // 添加行号
      showLineNumbers: true,
      // 提供复制按钮
      copyButton: true,
    },
    navbar: {
      title: "Bytedesk",
      logo: {
        alt: "Bytedesk Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          to: "/docs/payment",
          label: "Price",
          position: "left",
        },
        {
          href: "https://api.weiyuai.cn/swagger-ui/index.html",
          label: "Swagger Apis",
          position: "left",
        },
        {
          href: "https://www.weiyuai.cn/apidocs/",
          label: "ApiDocs",
          position: "left",
        },
        {
          href: "https://www.weiyuai.cn/javadocs/",
          label: "Javadocs",
          position: "left",
        },
        {
          href: "https://www.weiyuai.cn/architecture.html",
          label: "Architecture",
          position: "left",
        },
        {
          label: "Trial",
          position: "left",
          items: [
            {
              label: "管理后台",
              href: "https://www.weiyuai.cn/admin/",
            },
            {
              label: "客服工作台",
              href: "https://www.weiyuai.cn/agent/",
            },
            {
              label: "访客端演示",
              href: "https://www.weiyuai.cn/reactdemo/",
            },
          ],
        },
        {
          type: "search",
          position: "right",
          className: "navbar-search-item",
        },
        {
          href: "https://github.com/bytedesk/bytedesk",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.weiyuai.cn/contact.html",
          label: "Contact",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // 文档部分
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "docs/intro",
            },
            {
              label: "Contact",
              href: "https://www.weiyuai.cn/contact.html",
            },
          ],
        },
        // 社区部分
        {
          title: "Community",
          items: [
            {
              label: "Twitter",
              href: "https://twitter.com/bytedeskai",
            },
            {
              label: "WeChat",
              href: "https://www.weiyuai.cn",
            },
            // {
            //   label: "Zhihu",
            //   href: "https://www.zhihu.com",
            // },
            // {
            //   label: "Forum",
            //   href: "https://www.weiyuai.cn/forum",
            // },
          ],
        },
        // 更多部分
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/bytedesk/bytedesk",
            },
            {
              label: "Pricing",
              to: "/docs/payment",
            },
            {
              label: "Privacy",
              href: "https://www.weiyuai.cn/privacy.html",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} www.weiyuai.cn, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // 添加更多语言支持
      additionalLanguages: ['java', 'kotlin', 'objectivec', 'swift', 'typescript', 'jsx', 'tsx', 'bash', 'json', 'yaml', 'docker', 'nginx'],
      // 启用特定行高亮
      magicComments: [
        // 默认类 - 高亮单行
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        // 添加重要突出显示
        {
          className: 'theme-code-block-important-line',
          line: 'important-next-line',
          block: { start: 'important-start', end: 'important-end' },
        },
        // 添加提示高亮
        {
          className: 'theme-code-block-info-line',
          line: 'info-next-line',
          block: { start: 'info-start', end: 'info-end' },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
