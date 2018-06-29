/* eslint-disable import/no-extraneous-dependencies,comma-dangle */
const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('dotenv').config({ silent: true });

// Define the current environment.
const PRODUCTION = process.env.NODE_ENV === 'production';
const DEV = !PRODUCTION;

/**
 * @type {Object} Define the config.
 */
const config = {
  target: 'web',
  mode: PRODUCTION ? 'production' : 'development',
  performance: {
    hints: PRODUCTION ? 'warning' : false,
  },
  entry: {
    main: ['./app/client.jsx'],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
    ],
  },
  output: {
    path: path.join(__dirname, 'build/static'),
    filename: DEV ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: DEV ? 'js/[id].chunk.js' : 'js/[id].[chunkhash].chunk.js',
    publicPath: '/build/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'app/spectacle': path.resolve(__dirname, 'app/spectacle'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'app'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEV ? JSON.stringify('development') : JSON.stringify('production'),
      __CLIENT__: true,
      __SERVER__: false,
      __JIRA_HOST__: JSON.stringify(process.env.JIRA_HOST),
      __JIRA_USERNAME__: JSON.stringify(process.env.JIRA_USERNAME),
      __JIRA_PASSWORD__: JSON.stringify(process.env.JIRA_PASSWORD),
    }),
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      minChunks: 2
    },
    noEmitOnErrors: !PRODUCTION,
  },
};

if (DEV) {
  // Set the devtool.
  config.devtool = 'eval';

  // WebPack Hot Middleware client & HMR plugins
  config.entry.main.unshift(
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client'
  );

  // Push extra loaders.
  config.module.rules.push(
    {
      test: /\.js|.jsx$/,
      use: ['eslint-loader'],
      include: path.join(__dirname, 'app'),
    },
    {
      test: /\.scss|.css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }
  );

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
}

if (PRODUCTION) {
  // Set minimize to true.
  config.optimization.minimize = true;

  // Push extra loaders.
  config.module.rules.push({
    test: /\.scss|.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ],
  });

  // Push extra plugins.
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.NormalModuleReplacementPlugin(
      /^\.\/config\/Routes$/,
      './config/AsyncRoutes'
    ),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new AssetsPlugin({ filename: 'build/assets.json' })
  );
}

module.exports = config;
