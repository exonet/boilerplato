import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Location = ({ visible }) => (
  <div className={classNames('form-content', { visible })}>
    Location
  </div>
);

Location.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Location;
