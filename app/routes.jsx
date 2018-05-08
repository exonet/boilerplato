import React from 'react';
import { Switch, Route } from 'react-router-dom';

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
    <Switch>
      <Route exact path="/" component={Routes.Home} />
      <Route path="/about" component={Routes.About} />
      <Route path="/editor" component={Routes.Editor} />
      <Route component={NotFound} />
    </Switch>
  </div>
);
