const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  delete storybookBaseConfig.module.rules[0].query.presets;
  delete storybookBaseConfig.module.rules[0].query.plugins;

  storybookBaseConfig.module.rules[0].query.babelrc = true;
  storybookBaseConfig.module.rules.push({
    test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
    use: 'url-loader',
  });
  storybookBaseConfig.resolve.mainFields = ['module', 'browser', 'main'];

  // Return the altered config
  return storybookBaseConfig;
};
