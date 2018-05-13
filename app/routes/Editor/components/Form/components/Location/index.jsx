import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Search from './components/Search';

const Location = ({ visible, address, actions }) => (
  <div className={classNames('form-content', { visible })}>
    <h2>Location</h2>
    <Search
      address={address}
      handleAddressChange={actions.handleAddressChange}
    />
  </div>
);

Location.propTypes = {
  visible: PropTypes.bool.isRequired,
  address: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  ]).isRequired,
  actions: PropTypes.shape({
    handleAddressChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default Location;
