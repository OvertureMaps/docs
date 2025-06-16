// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');

const lightCodeTheme = themes.nightOwlLight;
const darkCodeTheme = themes.nightOwl;

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
    overtureRelease: '2025-05-21.0',
    pmtiles_path: 'https://d3c1b7bog2u1nn.cloudfront.net/2025-03-19'
  },
 /**
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: false, // rspack bundler doesn't work with our Webpack config for raw-loader and YAML files.
      mdxCrossCompilerCache: true,
    },
  }, */

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
    locales: ['en'],
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
        blogTitle: "Overture Release Notes and Schema Changelog",
        blogDescription: "Overture Maps Release Notes and Schema Changelog",
        showReadingTime: false,
        postsPerPage: 1,
        onUntruncatedBlogPosts: 'ignore',
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
          blogTitle: 'Overture Maps Data Blog',
          blogDescription: 'Data stories from the Overture Maps engineering team',
          blogSidebarTitle: 'Overture Maps Data Blog',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
        trackingID: 'G-JBXK7VCHV4',
        anonymizeIP: true, 
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
        additionalLanguages: ['bash', 'diff', 'json', 'sql','python'],
      },
    }),
};

module.exports = config;
