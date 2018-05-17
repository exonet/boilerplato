/* eslint-disable no-console */
import Router from 'express/lib/router';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';

// API calls.
import superAgent from 'superagent';

// Local utilities.
import md5 from './md5';

/**
 * @type {string} The destination path to cache the maps.
 */
const destinationPath = path.join(__ROOT_PATH__, 'storage/maps');

/**
 * @type {Promise} The body parser middleware that makes the JSON body available.
 */
const requestBodyParser = bodyParser.json();

/**
 * Create the '/s/maps/*' routes.
 *
 * @param {Object} config An object containing the API config settings.
 *
 * @return {Router} A router object for the Apple Push Notification Service routes.
 */
export default (config) => {
  // Define a router which contains the settings for the /s/maps/ routes.
  const router = new Router();

  router.get('/',
    requestBodyParser,
    (req, res) => {
      const {
        lat,
        lng,
        style = 'outdoors-v10',
        zoom = 10,
        width = 1280,
        height = 1280,
      } = req.params;

      const base = 'https://api.mapbox.com/styles/v1';
      const parts = [
        style,
        'static',
        `${lng},${lat},${zoom},0,0`,
        `${width}x${height}@2x`,
      ];

      const url = `${base}/${parts.join('/')}?access_token=${__MAPBOX_API_KEY__}`;
      const filePath = `${destinationPath}/${md5(url)}.png`;

      const exists = fs.readFileSync(filePath);
      if (exists) {
        return res.send(exists);
      }

      superAgent.get(url)
        .then((response) => {

          // Save the image to the directory.

          // Return the response.
          res.send(response);
        });
    });

  return router;
};
