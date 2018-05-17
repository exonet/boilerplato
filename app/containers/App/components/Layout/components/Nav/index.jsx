import React from 'react';
import { Link } from 'react-router-dom';

// Local css.
if (__CLIENT__) require('./index.scss');

const Nav = () => (
  <nav className="top">
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/">Home</Link></li>
    </ul>
  </nav>
);

export default Nav;
