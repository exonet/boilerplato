/* eslint-disable import/no-extraneous-dependencies */
require('babel-core/register');
require('dotenv').config({ silent: true });

/**
 * Define server constants.
 */
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__JIRA_HOST__ = process.env.JIRA_HOST;
global.__JIRA_USERNAME__ = process.env.JIRA_USERNAME;
global.__JIRA_PASSWORD__ = process.env.JIRA_PASSWORD;

global.navigator = { userAgent: 'all' };

// Load the app!
require('./server/index');
