// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

const lightCodeTheme = themes.nightOwlLight;
const darkCodeTheme = themes.nightOwl;

const defaultUrl = 'https://docs.overturemaps.org';
const defaultBaseUrl = '/';

// SCHEMA_PREVIEW is set by the schema repo's CI when building a PR preview of the
// schema reference docs (see OvertureMaps/schema/.github/workflows/schema-pr-preview.yml).
// When true, only the schema reference section is built — blog, community pages, and
// navbar items unrelated to the schema are excluded to keep the preview fast and focused.
const isSchemaPreview = process.env.SCHEMA_PREVIEW === 'true';

function getFromEnvironment(variableName, defaultValue) {
  const environmentValue = process.env[variableName];
  return environmentValue ? environmentValue : defaultValue;
}

function getLatestOvertureRelease() {
  const fallback = '2026-03-18.0';
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

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [],

  plugins: isSchemaPreview
    ? []
    : [
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
          breadcrumbs: false,  
        },
        blog: isSchemaPreview
          ? false
          : {
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
      docs: {
        sidebar: {
          hideable: true,
         },
        },
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
            to: '/',
            position: 'left',
            label: 'Docs',
          },
          ...(!isSchemaPreview
            ? [
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
              ]
            : []),
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