import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Cart = ({ visible }) => (
  <div className={classNames('form-content', { visible })}>
    Cart
  </div>
);

Cart.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default Cart;
