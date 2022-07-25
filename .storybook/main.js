const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@/components"] = path.resolve(
      __dirname,
      "../components"
    );
    config.resolve.alias["@/pages"] = path.resolve(__dirname, "../pages");
    config.resolve.alias["@/styles"] = path.resolve(__dirname, "../styles");
    config.resolve.alias["@/hooks"] = path.resolve(__dirname, "../hooks");
    config.resolve.alias["@/utils"] = path.resolve(__dirname, "../utils");
    config.resolve.alias["@/store"] = path.resolve(__dirname, "../store");
    return config;
  },
};
