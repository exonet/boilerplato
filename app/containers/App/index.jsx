import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Menu from './components/Menu';

import mapStateToProps from './utilities/mapStateToProps';
import mapDispatchToProps from './utilities/mapDispatchToProps';

/**
 *
 * @param children
 * @constructor
 */
const App = ({ children }) => {
  const menuWidth = 250;
  const padding = menuWidth + 15;

  return (
    <MuiThemeProvider>
      <div className="app" style={{ paddingLeft: `${padding}px` }}>
        <Menu width={menuWidth} />
        {children}
      </div>
    </MuiThemeProvider>
  );
};

/**
 *
 * @type {{app: *, actions: *, children: *}}
 */
App.propTypes = {
  children: PropTypes.element.isRequired,
};

/**
 *
 */
export default connect(mapStateToProps, mapDispatchToProps)(App);
