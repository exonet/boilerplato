/* eslint-disable import/no-extraneous-dependencies */
require('babel-core/register');
require('dotenv').config({ silent: true });
const path = require('path');

/**
 * Define server constants.
 */
global.__ROOT_PATH__ = path.join(__dirname, '../');
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SERVER__ = true;

// To disable server side rendering, set the __DISABLE_SSR__ boolean to true.
global.__SSR__ = process.env.SSR === 'true';
global.navigator = { userAgent: 'all' };

// Load the app!
require('./server/index');
