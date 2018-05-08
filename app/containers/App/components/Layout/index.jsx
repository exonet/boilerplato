import React from 'react';

// Local components.
import Nav from './components/Nav';

// The content.
import Content from '../../../../routes';

// Local css.
if (__CLIENT__) require('./index.scss');

/**
 * Define a basic component to render the layout
 *
 * @return {XML} The application layout.
 */
export default () => (
  <div className="root">
    <Nav />
    <Content />
  </div>
);
