import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Customize = ({ visible }) => (
  <div className={classNames('form-content', { visible })}>
    Customize
  </div>
);

Customize.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Customize;
