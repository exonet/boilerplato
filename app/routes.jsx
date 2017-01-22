import React from 'react';
import { Match, Miss } from 'react-router';

// Local components.
import NotFound from './components/NotFound';
import * as Routes from './config/Routes';

/**
 * Create the (rendered) routes component. Based on the Browser/ServerRouter the
 * appropriate component will be rendered.
 *
 * @return {XML} The (active) route.
 */
export default () => (
  <div className="content">
    <Match exactly pattern="/" component={Routes.Home} />
    <Match pattern="/about" component={Routes.About} />
    <Miss component={NotFound} />
  </div>
);
