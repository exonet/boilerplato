/* eslint-disable import/no-extraneous-dependencies,comma-dangle */
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const getExternals = () => {
  const nodeModules = fs.readdirSync(path.resolve(__dirname, 'node_modules'));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`; // eslint-disable-line no-param-reassign
    return ext;
  }, {});
};

module.exports = {
  target: 'node',
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
    loaders: [
      {
        loaders: ['babel-loader', 'eslint-loader'],
        test: /\.js|.jsx$/,
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
      __SSR__: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: {
        screw_ie8: true,
        except: []
      },
      comments: false,
      compress: {
        screw_ie8: true,
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        unsafe: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        cascade: true,
        warnings: false,
        negate_iife: true,
        pure_getters: true,
        pure_funcs: null,
        drop_console: false,
        keep_fargs: false,
        keep_fnames: false
      }
    }),
    new webpack.IgnorePlugin(/(react-hot-loader)/),
  ],
};
