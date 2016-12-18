import React, { PropTypes } from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

/**
 * @constructor
 */
const Menu = ({ width }) => (
  <Drawer open width={width}>
    <MenuItem>Test</MenuItem>
  </Drawer>
);

Menu.propTypes = {
  width: PropTypes.number.isRequired,
};

export default Menu;
