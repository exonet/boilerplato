import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Local components.
import Layout from './components/Layout';

/**
 * Create the application using the BrowserRouter.
 *
 * @return {XML} The rendered application.
 */
export default () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);
