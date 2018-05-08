import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { HomeIcon, LabelIcon, FlaskIcon, CartIcon } from 'mdi-react';

// Local css.
if (__CLIENT__) require('./index.scss');

const Menu = ({ active, actions }) => (
  <section className="menu">
    <button
      className={classNames({ active: active === 'location' })}
      onClick={actions.goToLocation}
    >
      <HomeIcon />
      <span className="title">Location</span>
    </button>
    <button
      className={classNames({ active: active === 'labels' })}
      onClick={actions.goToLabels}
    >
      <LabelIcon />
      <span className="title">Labels</span>
    </button>
    <button
      className={classNames({ active: active === 'customize' })}
      onClick={actions.goToCustomize}
    >
      <FlaskIcon />
      <span className="title">Customize</span>
    </button>
    <button
      className={classNames({ active: active === 'cart' })}
      onClick={actions.goToCart}
    >
      <CartIcon />
      <span className="title">Cart</span>
    </button>
  </section>
);

Menu.propTypes = {
  active: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    goToLocation: PropTypes.func.isRequired,
    goToLabels: PropTypes.func.isRequired,
    goToCustomize: PropTypes.func.isRequired,
    goToCart: PropTypes.func.isRequired,
  }).isRequired,
};

export default Menu;
