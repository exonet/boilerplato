import React from 'react';
import { Link } from 'react-router';

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
  <div className="app">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <section className="content">
      <Content />
    </section>
  </div>
);
