/* eslint-disable import/no-extraneous-dependencies */
require('babel-core/register');
require('dotenv').config({ silent: true });

/**
 * Define server constants.
 */
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SERVER__ = true;

// To disable server side rendering, set the __DISABLE_SSR__ boolean to true.
global.__SSR__ = process.env.SSR;
global.navigator = { userAgent: 'all' };

// Load the app!
require('./server/index');
