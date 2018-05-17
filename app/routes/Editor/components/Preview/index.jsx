/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';


// Local css.
if (__CLIENT__) require('./index.scss');

const Preview = ({ address }) => {
  const url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/static/${address.lng},${address.lat},10.0,0,0/1280x1280@2x?access_token=${__MAPBOX_API_KEY__}`;

  return (
    <section className="Preview">
      {address !== false && (
        <div className="poster">
          <div
            className="map"
            style={{ backgroundImage: 'url("' + url + '")' }}
          >
            <div className="label">
              {address.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

Preview.propTypes = {
  address: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  ]).isRequired,
};

export default Preview;
