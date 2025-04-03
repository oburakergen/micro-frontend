const WebpackRTLPlugin = require('@automattic/webpack-rtl-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
  mode: 'development',
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new WebpackRTLPlugin(),
  ],
  devtool: 'source-map',
  resolve: {
    fallback: {
      crypto: false
    }
  }
};
