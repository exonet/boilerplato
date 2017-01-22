import React from 'react';
import { render } from 'react-dom';

// Hot Reloading.
import { AppContainer } from 'react-hot-loader';

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
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

// Actually render the app.
renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', renderApp);
}
