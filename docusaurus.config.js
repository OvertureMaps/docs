// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

const lightCodeTheme = themes.nightOwlLight;
const darkCodeTheme = themes.nightOwl;

const defaultUrl = 'https://docs.overturemaps.org';
const defaultBaseUrl = '/';

function getFromEnvironment(variableName, defaultValue) {
  const environmentValue = process.env[variableName];
  return environmentValue ? environmentValue : defaultValue;
}

function getLatestOvertureRelease() {
  const fallback = '2026-01-21.0';
  try {
    const { execSync } = require('child_process');
    const response = execSync('curl -s https://stac.overturemaps.org/catalog.json', {
      encoding: 'utf-8',
      timeout: 10000,
    });
    const catalog = JSON.parse(response);
    return catalog.latest || fallback;
  } catch (error) {
    console.warn(error);
    console.warn('Failed to fetch latest Overture release, using fallback:', fallback);
    return fallback;
  }
}

const latestOvertureRelease = getLatestOvertureRelease();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Overture Maps Documentation',
  tagline: '',
  favicon: 'img/favicon.png',

  customFields: {
    overtureRelease: latestOvertureRelease,
    pmtiles_path: 'https://tiles.overturemaps.org/' + latestOvertureRelease,
  },

  future: {
    v4: true,
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
    },
  },

  // Set the production url of your site here
  url: getFromEnvironment('DOCUSAURUS_URL', defaultUrl),
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: getFromEnvironment('DOCUSAURUS_BASE_URL', defaultBaseUrl),

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OvertureMaps', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'warn',

  onBrokenMarkdownLinks: 'warn',

  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [],

  plugins: [
    [
      '@docusaurus/plugin-content-pages',
      {
        id: 'community',
        path: './community',
        routeBasePath: 'community',
        showLastUpdateTime: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          showLastUpdateTime: true,
        },
        blog: {
          blogTitle: 'Overture Maps Engineering Blog',
          blogDescription: 'Building Overture Maps',
          blogSidebarTitle: 'Posts from the Overture Maps engineering team',
          blogSidebarCount: 20,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag:
          process.env.DOCUSAURUS_URL === defaultUrl
            ? {
                trackingID: 'G-JBXK7VCHV4',
                anonymizeIP: true,
              }
            : false,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/omf_logo_transparent.png',
      navbar: {
        title: 'Overture Maps',
        logo: {
          alt: 'Overture Maps Foundation Logo',
          src: 'img/omf_logo_transparent.png',
          href: 'https://overturemaps.org',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'schema',
            position: 'left',
            label: 'Schema Reference',
          },
          {
            to: 'blog',
            label: 'Blog',
            position: 'left',
          },
          {
            to: 'community',
            label: 'Community',
            position: 'left',
          },
          {
            to: 'https://github.com/OvertureMaps/docs',
            position: 'right',
            target: '_blank',
            className: 'github-link',
          },
        ],
      },
      algolia: {
        appId: 'MK8X1051PQ',
        //this is the public search API key; ok to commit
        apiKey: '29fe3f5bc0dabfade01c016695919c8d',
        indexName: 'overturemaps',
        contextualSearch: true,

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Overture Maps Foundation.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'diff', 'json', 'sql', 'python'],
      },
    }),
};

module.exports = config;
