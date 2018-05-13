import React from 'react';
import PropTypes from 'prop-types';

import Menu from './components/Menu';
import Form from './components/Form';

// Higher order component data.
import withHandlers from './handlers';

// Local css.
if (__CLIENT__) require('./index.scss');

/**
 * The editor page.
 *
 * @return {XML} The rendered page.
 */
const Editor = ({ data, menu, actions }) => {
  console.dir(data.address);
  const url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/static/${data.address.lng},${data.address.lat},10.0,0,0/1280x1280@2x?access_token=${__MAPBOX_API_KEY__}`;

  return (
    <div className="Editor">
      <Menu active={data.active} actions={menu} />
      <Form data={data} actions={actions} />
      <section className="preview">
        <div className="maps">
          {data.address !== false && (
            <img src={url} alt="map" />
          )}
        </div>
      </section>
    </div>
  );
};

Editor.propTypes = {
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
  menu: PropTypes.shape({
    goToLocation: PropTypes.func.isRequired,
    goToLabels: PropTypes.func.isRequired,
    goToCustomize: PropTypes.func.isRequired,
    goToCart: PropTypes.func.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    handleAddressChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default withHandlers(Editor);
