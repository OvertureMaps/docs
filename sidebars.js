/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting_started/access',
        'getting_started/build-a-map'
      ]
    },
    {
      type: 'category',
      label: 'Downloading Data',
      collapsed: false,
      items: [
        'downloading/athena'
      ]
    }
  ]
};

module.exports = sidebars;
