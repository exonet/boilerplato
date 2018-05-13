import React from 'react';
import PropTypes from 'prop-types';

import Location from './components/Location';
import Labels from './components/Labels';
import Customize from './components/Customize';
import Cart from './components/Cart';

// Local css.
if (__CLIENT__) require('./index.scss');

const Form = ({ data, actions }) => (
  <section className="form">
    <Location
      visible={data.active === 'location'}
      address={data.address}
      actions={actions}
    />
    <Labels visible={data.active === 'labels'} />
    <Customize visible={data.active === 'customize'} />
    <Cart visible={data.active === 'cart'} />
  </section>
);

Form.propTypes = {
  data: PropTypes.shape({
    active: PropTypes.string.isRequired,
    address: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }),
    ]).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    handleAddressChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default Form;
