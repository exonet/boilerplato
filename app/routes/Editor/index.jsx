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
const Editor = ({ data, menu }) => (
  <div className="Editor">
    <Menu active={data.active} actions={menu} />
    <Form active={data.active} actions={menu} />
    <section className="preview">
      <div className="maps">
        hoi
      </div>
    </section>
  </div>
);

Editor.propTypes = {
  data: PropTypes.shape({
    active: PropTypes.string.isRequired,
  }).isRequired,
  menu: PropTypes.shape({
    goToLocation: PropTypes.func.isRequired,
    goToLabels: PropTypes.func.isRequired,
    goToCustomize: PropTypes.func.isRequired,
    goToCart: PropTypes.func.isRequired,
  }).isRequired,
};

export default withHandlers(Editor);
