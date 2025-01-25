// client/config-overrides.js
const path = require("path");

module.exports = function override(config) {
  // Adding aliases for utils and components
  config.resolve.alias = {
    ...config.resolve.alias,
    "@utils": path.resolve(__dirname, "src/utils"), // Alias for utils folder
    "@components": path.resolve(__dirname, "src/components"), // Alias for components folder
  };

  return config;
};
