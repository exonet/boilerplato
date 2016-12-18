const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config({ silent: true });

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    `webpack-dev-server/client?http://${process.env.HOST || 'localhost:3000'}`,
    'webpack/hot/only-dev-server',
    './app/client'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
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
  ],
};
