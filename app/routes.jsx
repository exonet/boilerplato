import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import LazyRoute from 'lazy-route';

// Import 'default' components.
import NotFound from './components/NotFound';

const Routes = () => (
  <BrowserRouter>
    <div className="wrapper">
      <Match
        pattern="/"
        render={props => <LazyRoute {...props} component={import('./routes/Home')} />}
      />
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);

Routes.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/no-unused-prop-types,react/forbid-prop-types
};

export default Routes;
