const { ModuleFederationPlugin } = require('@rspack/core').container;
const path = require('path');

const TIGA_HEALTH_URL = 'https://phr-dev.tiga.health';

module.exports = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV || 'development',
  builtins: {
    css: {},
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3002/',
    uniqueName: 'tigaHealthPhr',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'tigaHealthPhr',
      filename: 'remoteEntry.js',
      remotes: {
        tigaHealthPhr: `tigaHealthPhr@${TIGA_HEALTH_URL}/remoteEntry.js`,
      },
      exposes: {
        './App': './src/App.tsx',
        './TigaHealthWrapper': './src/components/TigaHealthWrapper.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '18.2.0',
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: '^6.20.0',
        },
        'react-redux': {
          singleton: true,
          requiredVersion: '7.2.9',
        },
      },
    }),
  ],
};
