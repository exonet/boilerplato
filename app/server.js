/* eslint-disable import/no-extraneous-dependencies */
require('babel-core/register');
require('dotenv').config({ silent: true });

/**
 * Define server constants.
 */
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SERVER__ = true;

global.navigator = { userAgent: 'all' };

// Load the app!
require('./server/index');
