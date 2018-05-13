import React, { Component } from 'react';
import PropTypes from 'prop-types';
import superAgent from 'superagent';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
  };

  handleKeyUp = (event) => {
    if (event.keyCode !== 13) {
      return;
    }

    superAgent
      .get(`https://maps.google.com/maps/api/geocode/json?address=${encodeURI(this.state.value)}&key=${__GOOGLE_API_KEY__}`)
      .then(
        // Success
        (response) => {
          const { results } = response.body;
          if (results.length === 0) {
            console.log('No address found.');

            return;
          }

          // Get the address from the results.
          const address = results.pop();

          // Update the state.
          this.props.handleAddressChange({
            lat: address.geometry.location.lat,
            lng: address.geometry.location.lng,
            title: address.formatted_address,
          });
        },
        // Error.
        (error) => {
          console.error(error);
        },
      );
  };

  render() {
    const { value } = this.state;
    const { address } = this.props;

    return (
      <div className="Search">
        <input
          type="text"
          value={value}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
        {address !== false && (
          <div className="result">
            <h5>
              {address.title}
            </h5>
              <span className="lat-long">
                {address.lat},{address.lng}
              </span>
          </div>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  address: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  ]).isRequired,
  handleAddressChange: PropTypes.func.isRequired,
};

export default Search;
