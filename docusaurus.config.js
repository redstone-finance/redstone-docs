// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from "prism-react-renderer";
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "RedStone Documentation",
  tagline: "Documentation for the RedStone protocol",
  url: "https://docs.redstone.finance",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "redstone-finance", // Usually your GitHub org/user name.
  projectName: "redstone-docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/redstone-finance/redstone-docs/tree/main",
          lastVersion: "current",
          includeCurrentVersion: true,
          versions: {
            current: {
              label: "Current",
              path: "/",
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  scripts: [
    // ,
    { src: "/js/custom.js", async: true },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Documentation",
        logo: {
          alt: "RedStone",
          src: "img/redstone-logo-full.svg",
          width: "120"
        },
        items: [
          {
            href: "https://github.com/redstone-finance",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      announcementBar: {
        content:
          '<strong>⭐️ If you like RedStone, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/redstone-finance/redstone-oracles-monorepo">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/redstone_defi">Twitter</a> ⭐️</strong>',
        backgroundColor: "#AE0822",
        textColor: "white",
      },
      algolia: {
        appId: "BXXQLGVS3Y",
        apiKey: "3e7ddfe0b2a2ce34495188bd1e433dd4",
        indexName: "redstone",
        contextualSearch: true,
        replaceSearchResultPathname: {
          from: "/next/",
          to: "/",
        },
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "👋 Community",
            items: [
              {
                label: "Website",
                href: "https://redstone.finance",
              },
              {
                label: "Discord",
                href: "https://redstone.finance/discord",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/redstone_defi",
              },
            ],
          },
          {
            title: "🚀 We are hiring",
            items: [
              {
                label: "Open Positions",
                href: "https://angel.co/company/redstonefinance",
              },
              {
                label: "Our Team",
                href: "https://redstone.finance/team",
              },
            ],
          },
          {
            title: "📚 More",
            items: [
              {
                label: "Blog",
                href: "https://medium.com/@RedStone_Finance",
              },
              {
                label: "GitHub",
                href: "https://github.com/redstone-finance",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} RedStone. <br/> Built with ❤️ and Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "solidity"],
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/docs/avs/running-avs-operator",
            to: "/docs/avs/running-avs-operator-testnet",
          },
        ],
      },
    ],
  ],
};

module.exports = config;
