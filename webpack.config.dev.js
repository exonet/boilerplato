const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ silent: true });

module.exports = {
  entry: {
    main: [
      'react-hot-loader/patch',
      'babel-polyfill',
      `webpack-dev-server/client?http://${process.env.HOST || 'localhost:3000'}`,
      'webpack/hot/only-dev-server',
      './app/client'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'redux',
      'material-ui',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: 'js/[id].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        loaders: ['babel-loader', 'eslint-loader'],
        test: /\.js|.jsx$/,
        include: path.join(__dirname, 'app'),
      },
      {
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.css|.scss$/,
        include: path.join(__dirname, 'app'),
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.hbs'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
  ],
};
