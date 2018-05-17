/* eslint-disable import/no-extraneous-dependencies,comma-dangle */
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ silent: true });

// Define the current environment.
const PRODUCTION = process.env.NODE_ENV === 'production';


const getExternals = () => {
  const nodeModules = fs.readdirSync(path.resolve(__dirname, 'node_modules'));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`; // eslint-disable-line no-param-reassign
    return ext;
  }, {});
};

module.exports = {
  target: 'node',
  mode: PRODUCTION ? 'production' : 'development',
  devtool: false,
  entry: './app/server/index.jsx',
  output: {
    path: path.join(__dirname, 'build/server'),
    filename: 'index.js',
  },
  externals: getExternals(),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        use: ['babel-loader', 'eslint-loader'],
        include: path.join(__dirname, 'app'),
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less|scss|svg|png|jpe?g|png)$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __CLIENT__: false,
      __SERVER__: true,
      __DEVELOPMENT__: false,
      __SSR__: process.env.SSR === 'true',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
  ],
};
