// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// const defaultUrl = 'https://labs.overturemaps.org/';
// const defaultBaseUrl = 'how-to/';

// While the page is _private_
const defaultUrl = 'https://ideal-adventure-qk1kgoe.pages.github.io/';
const defaultBaseUrl = '/';

function getFromEnvironment(variableName, defaultValue) {
  const environmentValue = process.env[variableName];
  return environmentValue ? environmentValue : defaultValue;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'How-To Guides for Overture Maps',
  tagline: '',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: getFromEnvironment('DOCUSAURUS_URL', defaultUrl),
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: getFromEnvironment('DOCUSAURUS_BASE_URL', defaultBaseUrl),

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OvertureMaps', // Usually your GitHub org/user name.
  projectName: 'how-to', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

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
          routeBasePath: '/'
        },
        blog: false,
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
            to: 'https://docs.overturemaps.org',
            label: 'Data Schema',
            target: ''
          },
          {
            to: 'https://docs.overturemaps.org/gers',
            label: 'Global Entity Reference System',
            target: '',
            className: 'header-github-link',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'How-to Guides',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Overture Maps Foundation. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
