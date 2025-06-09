import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
  },
  // 主题配置
  themes: ['@docusaurus/theme-mermaid'],

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
  onBrokenMarkdownLinks: "warn",

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/bytedesk/bytedesk-docs",
          // 版本化配置（暂时禁用，待网站内容稳定后启用）
          // lastVersion: 'current',
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/bytedesk/bytedesk",
        },
        theme: {
          customCss: "./src/css/custom.css",
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
        explicitSearchResultPath: true // 在搜索结果中显示完整路径
      }
    ],
  ],

  // 添加自定义脚本
  scripts: [
    {
      src: '/docs/feedback-config.js',
      async: false,
    },
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
      copyright: `Copyright © ${new Date().getFullYear()} www.weiyu.im, Inc.`,
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
