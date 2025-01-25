// client/config/webpack.config.js
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "../src/utils"), // Alias for utils
      "@components": path.resolve(__dirname, "../src/components"), // Alias for components
    },
  },
  // Other Webpack configurations, such as loaders, plugins, etc.
};
