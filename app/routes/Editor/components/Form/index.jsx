import React from 'react';
import PropTypes from 'prop-types';

import Location from './components/Location';
import Labels from './components/Labels';
import Customize from './components/Customize';
import Cart from './components/Cart';

// Local css.
if (__CLIENT__) require('./index.scss');

const Form = ({ active }) => (
  <section className="form">
    <Location visible={active === 'location'} />
    <Labels visible={active === 'labels'} />
    <Customize visible={active === 'customize'} />
    <Cart visible={active === 'cart'} />
  </section>
);

Form.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Form;
