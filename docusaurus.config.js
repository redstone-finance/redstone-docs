// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'RedStone Documentation',
  tagline: 'Documentation for the RedStone oracles protocol',
  url: 'https://docs.redstone.finance',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'redstone-finance', // Usually your GitHub org/user name.
  projectName: 'redstone-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/redstone-finance/redstone-docs/tree/main',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Documentation',
        logo: {
          alt: 'RedStone',
          src: 'img/redstone-logo-full.svg',
        },
        items: [
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/redstone-finance',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '👋 Community',
            items: [
              {
                label: 'Website',
                href: 'https://redstone.finance',
              },
              {
                label: 'Discord',
                href: 'https://redstone.finance/discord',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/redstone_defi',
              },
            ],
          },
          {
            title: '🚀 We are hiring',
            items: [
              {
                label: 'Open Positions',
                href: 'https://angel.co/company/redstonefinance',
              },
              {
                label: 'Our Team',
                href: 'https://redstone.finance/team',
              },
            ],
          },
          {
            title: '📚 More',
            items: [
              {
                label: 'Blog',
                href: 'https://medium.com/@RedStone_Finance',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/redstone-finance',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} RedStone Oracles. <br/> Built with ❤️ and Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
