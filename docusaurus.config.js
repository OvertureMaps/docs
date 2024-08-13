// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const defaultUrl = 'https://docs.overturemaps.org';
const defaultBaseUrl = '/';

function getFromEnvironment(variableName, defaultValue) {
  const environmentValue = process.env[variableName];
  return environmentValue ? environmentValue : defaultValue;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Overture Maps Documentation',
  tagline: '',
  favicon: 'img/favicon.png',

  customFields: {
    overtureRelease: '2024-07-22.0',
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

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en','zh-Hant'],
    localeConfigs:{
      'en': {
        label: 'English',
        direction: 'ltr',
      },
      'zh-Hant': {
        label: '繁體中文', 
        direction: 'ltr', 
      }
    }
  },

  themes: ["docusaurus-json-schema-plugin"],

  plugins: [
    () => ({
      name: 'custom-docusaurus-plugin',
      configureWebpack() {
        return {
          module: {
            rules: [
              {
                test: /\.pmtiles$/,
                use: 'raw-loader'
              },
              {
                test: /\.yaml$/,
                use: 'raw-loader'
              },
              {
                resolve: {
                  symlinks: false
                }
              }
            ],
          },
        };
      },
    }),
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'release-blog',
        blogSidebarTitle: 'Releases',
        blogTitle: "Overture Release Notes and Changelog",
        blogDescription: "Overture Maps Release Notes and Changelog",
        showReadingTime: false,
        postsPerPage: 1,
        blogSidebarCount: 'ALL',
        routeBasePath: 'release',
        path: './release-blog',
      },
    ],
    [
      '@docusaurus/plugin-content-pages',
      {
        id: 'community',
        path: './community',
        routeBasePath: 'community',
        showLastUpdateTime: true,
      }
    ]
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
          blogTitle: 'Overture Maps Engineering',
          blogDescription: 'Technical posts from the Overture Maps engineering team',
          blogSidebarTitle: 'Overture Maps Engineering Blog',
          blogSidebarCount: 'ALL',
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
      // Replace with your project's social card
      image: 'img/omf_logo_transparent.png',
      navbar: {
        title: 'Overture Maps',
        logo: {
          alt: 'Overture Maps Foundation Logo',
          src: 'img/omf_logo_transparent.png',
          href: 'https://overturemaps.org'
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
            to: 'release/latest',
            label: 'Releases',
            position: 'left',
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
          },        {
            type: 'localeDropdown', // switch language dropdown
            position: 'right',
          },
        ],
      },
      algolia: {
        appId: 'MK8X1051PQ',
        //this is the public search API key; ok to commit
        apiKey:'29fe3f5bc0dabfade01c016695919c8d',
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
        additionalLanguages: ['bash', 'diff', 'json'],
      },
    }),
};

module.exports = config;
