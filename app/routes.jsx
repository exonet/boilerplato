import React, { PropTypes } from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import 'default' components.
import NotFound from './components/NotFound';
import Home from './routes/Home';

const Routes = () => (
  <BrowserRouter>
    <div className="wrapper">
      <Match exactly pattern="/" component={Home} />
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>
);

Routes.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Routes;
