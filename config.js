// Load the .env variable.
require('dotenv').config({ silent: true });

/*
 |--------------------------------------------------------------------------
 | Config
 |--------------------------------------------------------------------------
 |
 | Create a Map that contains all config settings.
 |
 */
const config = {};

/*
 |--------------------------------------------------------------------------
 | Host settings
 |--------------------------------------------------------------------------
 |
 | The hostname and port for the Express and webpack server are defined.
 |
 */
config.host = process.env.HOST || 'localhost';
config.port = process.env.PORT || 3000;

module.exports = config;
