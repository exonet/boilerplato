/* eslint-disable no-console,import/no-extraneous-dependencies,global-require */
import express from 'express';

// React.
import React from 'react';
import { renderToString } from 'react-dom/server';

// Routing.
import { ServerRouter, createServerRenderContext } from 'react-router';

// Store.
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

// Local components.
import Html from './components/Html';
import Layout from '../containers/App/components/Layout';

// Store.
import config from '../../config';

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
 | Setup the main route.
 |--------------------------------------------------------------------------
 |
 | Matches the requested route with a component and returns the rendered
 | version of the component to the client.
 |
 */
app.all('*', (req, res) => {
  /*
   |--------------------------------------------------------------------------
   | Set the initialState.
   |--------------------------------------------------------------------------
   |
   | Get the initialState based on the session `me` and `app` properties.
   | `me` contains data about the logged in user.
   | `app` contains data about the state of the app.
   |
   */
  const initialState = {};

  /*
   |--------------------------------------------------------------------------
   | If SSR is disabled, immediately render the component.
   |--------------------------------------------------------------------------
   */
  if (!__SSR__) {
    return res.status(200).send(
      `<!doctype html>${renderToString(<Html assets={assets} initialState={initialState} />)}`,
    );
  }

  /*
   |--------------------------------------------------------------------------
   | Setup store, routing and history.
   |--------------------------------------------------------------------------
   */
  const store = configureStore();
  const context = createServerRenderContext();
  const view = (
    <Provider store={store}>
      <ServerRouter context={context} location={req.url}>
        {({ location }) => <Layout location={location} />}
      </ServerRouter>
    </Provider>
  );

  const result = context.getResult();

  if (result.redirect) {
    return res.redirect(result.redirect.pathname);
  } else if (result.missed) {
    console.log('missed!');
    return res.redirect('/');
  }

  return res.send(
    `<!doctype html>
    ${renderToString(
      <Html
        assets={assets}
        component={view}
        initialState={{}}
      />,
    )}`);
});

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
  console.log(`| Server side rendering: ${(__SSR__ ? 'yes' : 'no')}`);
  console.log('|');
  console.log('|--------------------------------------------------------------------------');
});
