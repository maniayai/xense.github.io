// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'test1',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  scripts: [
    // String format.
    'https://docusaurus.org.cn/script.js',
    // Object format.
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js',
      async: true,
    },
  ],

  stylesheets: [
    // String format.
    'https://docusaurus.org.cn/style.css',
    // Object format.
    {
      href: 'http://mydomain.com/style.css',
    },
  ],

  // Set the production url of your site here
  url: 'https://maniayai.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/xense.github.io/',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // 拥有该仓库的 GitHub 用户或组织
  organizationName: 'maniayai', // Usually your GitHub org/user name.
  // GitHub仓库名称
  projectName: 'xense.github.io', // Usually your repo name.
  // 部署静态文件的分支名称。
  deploymentBranch: 'docs',
  // Docusaurus 检测到任何损坏链接时的行为。
  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    localeConfigs: {
      zh: {
        label: '中文',
        path: 'zh',
      },
      en: {
        label: 'English',
        path: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),

    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',      // 默认使用亮色模式
        disableSwitch: false,      // 不禁止用户切换主题（显示切换按钮）
        respectPrefersColorScheme: true,  // 按照系统偏好
      },
      // 自动折叠侧边栏类别 展开一个类别时折叠所有同级类别
      docs: {
        sidebar: {
          // 可隐藏侧边栏
          hideable: true,
          // 自动隐藏侧边栏 打开一个菜单会自动关闭其它菜单
          autoCollapseCategories: true,
        },
      },

      // 导航栏
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
          width: 32,     // logo图片的大小
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
          type: 'dropdown',
          label: '生态',        // 下拉菜单的显示名称
          position: 'left',    // 显示位置: 'left' 或 'right'
          items: [   
              // {
              //   label: 'React',
              //   to: '/shared_file/shared1.md',  // 指向存在的文档
              // },
              // {
              //   label: 'Vue',
              //   to: '/shared_file/shared2.md',  // 指向存在的文档
              // },          // 下拉菜单里的选项
              {
                label: 'GitHub',
                href: 'https://github.com', // 链接到站外
              },
            // 还可以添加更多项...
          ],
        },
         {
          type: 'docsVersionDropdown',
          versions: {
            current: {label: 'Version 4.0'},
            '1.1.0': {label: 'Version 3.0'},
            '1.1.1': {label: 'Version 2.0'},
          },
        },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  plugins: [

  ],

  // themes:['@docusaurus/theme-classic']
};

export default config;
