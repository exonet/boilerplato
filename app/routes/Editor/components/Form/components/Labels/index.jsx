import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Labels = ({ visible }) => (
  <div className={classNames('form-content', { visible })}>
    Labels
  </div>
);

Labels.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Labels;
