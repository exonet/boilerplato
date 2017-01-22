/* eslint-disable no-useless-escape, react/no-danger, react/forbid-prop-types */
import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * @param {Object} props The properties passed to the component.
 *
 * @return {XML} The rendered component, ready to be passed to the client.
 */
const Html = (props) => {
  // Gather the properties.
  const {
    component = false,
    initialState = {},
    assets,
  } = props;

  // Define the content.
  const content = component ? renderToString(component) : '';

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {!__DEVELOPMENT__ && <link type="text/css" rel="stylesheet" href={assets.main.css} />}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          charSet="UTF-8"
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE = ${JSON.stringify(initialState).replace('</', '<\/')};`,
          }}
        />
        <script src={`${__DEVELOPMENT__ ? '/build/static/js/vendor.js' : assets.vendor.js}`} />
        <script src={`${__DEVELOPMENT__ ? '/build/static/js/main.js' : assets.main.js}`} />
      </body>
    </html>
  );
};

/**
 * @type {Object} The <Html>-component requires children to render.
 */
Html.propTypes = {
  component: PropTypes.node,
  initialState: PropTypes.object,
  assets: PropTypes.object,
};

export default Html;
