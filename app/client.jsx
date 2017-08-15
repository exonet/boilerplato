import React from 'react';
import { render } from 'react-dom';

// Redux.
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Configure the store.
const store = configureStore();

/**
 * This method is capable of (re)-rendering the app.
 */
const renderApp = () => {
  const App = require('./containers/App').default; // eslint-disable-line global-require

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app'),
  );
};

// Actually render the app.
renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', renderApp);
}
