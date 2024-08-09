import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  // https://docusaurus.io/zh-CN/docs/configuration
  title: "Bytedesk",
  tagline: "微语",
  favicon: "img/favicon.ico",

  // https://docusaurus.io/zh-CN/docs/deployment
  // Set the production url of your site here
  url: "https://www.weiyuai.cn/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/docs/",
  // baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "bytedesk", // Usually your GitHub org/user name.
  projectName: "bytedesk", // Usually your repo name.

  onBrokenLinks: "throw",
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
          editUrl: "https://github.com/bytedesk/bytedesk",
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

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
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
          label: "Tutorial",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/bytedesk/bytedesk",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.weiyuai.cn/contact.html",
          label: "联系",
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
        {
          title: "Community",
          items: [
            {
              label: "Twitter",
              href: "https://twitter.com/bytedeskai",
            },
          ],
        },
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
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} www.weiyu.im, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
};

export default config;
