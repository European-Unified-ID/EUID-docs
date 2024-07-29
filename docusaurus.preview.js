const original = require('./docusaurus.original');

/*
 * N.B. This file is used for the preview site. 
 * `docusaurus.config.js` is renamed to `docusaurus.original.js`, this file is renamed to `docusaurus.config.js`, and
 * then this file is included (which will import the original file and update the settings for the preview site).
*/
config = {
  ...original,
  url: "https://european-unified-id.github.io/",
  baseUrl: "/euid-docs-preview/",
  organizationName: "European-Unified-ID", // Usually your GitHub org/user name.
  projectName: "euid-docs-preview", // Usually your repo name.
  themeConfig: {
    ...original.themeConfig,
    algolia: undefined
  }
};

module.exports = config;
