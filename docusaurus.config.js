// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import { themes } from "prism-react-renderer";

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "European Unified ID",
  tagline:
    "European Unified ID (EUID) uses encrypted email data to provide a privacy-conscious and accurate identity standard for the digital advertising ecosystem.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://euid.eu",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "European-Unified-ID", // Usually your GitHub org/user name.
  projectName: "EUID-docs", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  scripts: [
    // String format.
    "//pages.thetradedesk.com/js/forms2/js/forms2.js",
  ],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-K3NQMDX",
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/European-Unified-ID/EUID-docs/blob/main/",
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        sitemap: {
          changefreq: "daily",
          lastmod: "datetime",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/social-sharing-default-card.png",
      colorMode: {
        defaultMode: "light",
      },

      navbar: {
        title: "",
        logo: {
          alt: "European Unified ID logo",
          src: "img/logo-dark.svg",
          srcDark: "/img/logo-white.svg",
        },
        items: [
          {
            to: "/request-access",
            label: "Request access",
            className: "mobile-only menu__cta button button--nav",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-publishers",
            label: "Publishers",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-advertisers",
            label: "Advertisers",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-dsps",
            label: "DSPs",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-data-providers",
            label: "Data Providers",
            position: "left",
          },
          {
            type: "doc",
            docId: "intro",
            label: "Documentation",
            position: "left",
          },

          {
            type: "search",
            position: "right",
            className: "desktop-only hide-on-marketing-page",
          },
          {
            type: "custom-NavbarColorModeToggle",
            position: "right",
            className: "desktop-only hide-on-marketing-page",
          },
          {
            type: "custom-NavbarSeparator",
            position: "right",
            classNames: "desktop-only hide-on-marketing-page navbar__divider",
          },
          {
            type: "custom-NavbarCta",
            href: "/request-access",
            label: "Request access",
            position: "right",
            className: "desktop-only navbar__item navbar__link",
          },
        ],
      },
      footer: {
        logo: {
          alt: "European Unified ID logo",
          src: "img/logo-dark.svg",
          srcDark: "/img/logo-white.svg",
        },
        links: [
          {
            items: [
              {
                label: "EUID GitHub",
                href: "https://github.com/European-Unified-ID/EUID-docs/blob/main/README.md",
              },
              {
                type: "doc",
                label: "Prebid",
                to: "https://docs.prebid.org/dev-docs/modules/userid-submodules/euid.html",
              },
              {
                label: "UID2",
                href: "https://unifiedid.com/",
              },
            ],
          },
          {
            items: [
              {
                label: "Report a Vulnerability",
                href: "https://www.thetradedesk.com/us/trust/report-a-vulnerability",
              },
              {
                label: "Website Privacy Policy",
                href: "https://www.thetradedesk.com/us/website-privacy-policy",
              },
              {
                label: "Opt-out",
                href: "https://transparentadvertising.eu/",
              },
              {
                label: "Do not sell my data",
                href: "https://www.adsrvr.org/",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp", "java"],
      },
      algolia: {
        // N.B. per Algolia, these are public values - once we get them, we can commit them to the open source repo.
        appId: "7AS88HZE0W", //prod
        apiKey: "a2570205a9dee84db0870157430e3d8a", //prod
        indexName: "euid", //prod
        //enabling due to possible indexing issue that needs to be corrected on the Algolia side
        //https://docusaurus.io/docs/search#algolia-no-search-results
        contextualSearch: false,
      },
      zoom: {
        selector: ".markdown :not(em) > img",
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
        },
      },
    }),
};

export default config;
