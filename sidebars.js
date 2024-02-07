/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'index',
    {
      type: 'category',
      label: 'Accessing the Data',
      collapsed: false,
      items: [
        'accessing-the-data/cloud-services',
        'accessing-the-data/locally'
      ]
    },
    {
      type: 'category',
      label: 'Using the Data',
      collapsed: false,
      items: [
        'using-the-data/build-a-map',
        'using-the-data/community-projects'
      ]
    },
    {
      type: 'category',
      label: 'Visualizing Data',
      collapsed: false,
      items: [
        'visualizing_places_data/visualizing-places'
      ]
    }
  ]
};

module.exports = sidebars;
