/* eslint-disable import/no-extraneous-dependencies,comma-dangle */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

require('dotenv').config({ silent: true });

// Define the current environment.
const PRODUCTION = process.env.NODE_ENV === 'production';
const DEV = !PRODUCTION;

/**
 * @type {Object} Define the config.
 */
const config = {
  target: 'web',
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
  },
  module: {
    loaders: [
      {
        loaders: ['babel-loader'],
        test: /\.js|.jsx$/,
        include: path.join(__dirname, 'app'),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEV ? JSON.stringify('development') : JSON.stringify('production'),
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2,
    }),
  ],
};

if (DEV) {
  // Set the devtool.
  config.devtool = 'eval';

  // WebPack Hot Middleware client & HMR plugins
  config.entry.main.unshift(
    'webpack-hot-middleware/client',
    'react-hot-loader/patch'
  );

  // Push extra loaders.
  config.module.loaders.push(
    {
      loaders: ['eslint-loader'],
      test: /\.js|.jsx$/,
      include: path.join(__dirname, 'app'),
    },
    {
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      test: /\.scss|.css$/,
    }
  );

  // Push extra plugins.
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

if (PRODUCTION) {
  // Push extra loaders.
  config.module.loaders.push({
    test: /\.scss|.css$/,
    loader: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',
      loader: [
        {
          loader: 'css-loader',
          query: {
            sourceMap: false,
            // safe: true,
            calc: false,
            zindex: false,
            discardComments: {
              removeAll: true
            }
          }
        },
        {
          loader: 'sass-loader',
          query: {
            sourceMap: false,
            outputStyle: 'compact',
            precision: 6
          }
        }
      ]
    })
  });

  // Push extra plugins.
  config.plugins.push(
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
        drop_console: true,
        keep_fargs: false,
        keep_fnames: false
      }
    }),
    new webpack.IgnorePlugin(/(react-hot-loader)/),
    new webpack.NormalModuleReplacementPlugin(
      /^\.\/config\/Routes$/,
      './config/AsyncRoutes'
    ),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      disable: false,
      allChunks: true
    }),
    new AssetsPlugin({ filename: 'build/assets.json' })
  );
}

module.exports = config;
