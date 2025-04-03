const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  // Add fallbacks for various Node.js core modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    vm: require.resolve('vm-browserify')
  });
  config.resolve.fallback = fallback;

  // Add plugins for polyfilling process and Buffer
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: require.resolve('process'),
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  
  config.resolve.alias = {
    ...config.resolve.alias,
    'event-bus': path.resolve(__dirname, '../event-bus/src')
  };
  
  return config;
};
