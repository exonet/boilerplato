/* eslint-disable no-console,import/no-extraneous-dependencies,global-require */
import express from 'express';

// React.
import React from 'react';
import { renderToString } from 'react-dom/server';

// Local components.
import Html from './components/Html';

// Routes.
import jiraRoutes from './routes/jira';

// Store.
import config from '../../config';

// Get sprint config.
import sprintConfig from '../../sprint';

// Define the assets.
let assets = {};

/*
 |--------------------------------------------------------------------------
 | Setup the server instance.
 |--------------------------------------------------------------------------
 */
const app = express();

/*
 |--------------------------------------------------------------------------
 | [Development] - Use Hot Module Replacement.
 |--------------------------------------------------------------------------
 |
 | If development is enabled, enable hot module replacement.
 |
 */
if (__DEVELOPMENT__) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../webpack.config');

  // Setup compiler and middleware,
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    contentBase: 'app',
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      reasons: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false,
    },
  }));
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    log: console.log,
  }));
} else {
  assets = require('../../build/assets.json'); // eslint-disable-line import/no-unresolved

  app.use('/build/static', express.static('./build/static'));
}

/*
 |--------------------------------------------------------------------------
 | Static routing.
 |--------------------------------------------------------------------------
 |
 | 'static' contains files like images and icons provided by react-shared
 |
 */
app.use('/static', express.static('build/static'));

/*
 |--------------------------------------------------------------------------
 | Custom routing.
 |--------------------------------------------------------------------------
 |
 | 'jira' accesses the JIRA api and returns sprint results.
 |
 */
app.use('/jira', jiraRoutes(sprintConfig));

/*
 |--------------------------------------------------------------------------
 | Setup the main route.
 |--------------------------------------------------------------------------
 |
 | Matches the requested route with a component and returns the rendered
 | version of the component to the client.
 |
 */
app.all('*', (req, res) => (res.status(200).send(`<!doctype html>${renderToString(<Html assets={assets} />)}`)));

/*
 |--------------------------------------------------------------------------
 | Start the server.
 |--------------------------------------------------------------------------
 |
 | Listen to the provided host and port in the config.
 | If an error occurs, output it to the console.
 |
 */
app.listen(config.port, config.host, () => {
  console.log('|--------------------------------------------------------------------------');
  console.log('| [boilerplato] application started.');
  console.log('|--------------------------------------------------------------------------');
  console.log('|');
  console.log(`| Listening at http://${config.host}:${config.port}`);
  console.log('|');
  console.log(`| Running in ${process.env.NODE_ENV} mode.`);
  console.log('|');
  console.log('|--------------------------------------------------------------------------');
});
