/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

// Material.
import injectTapEventPlugin from 'react-tap-event-plugin';

// Redux.
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

// Routing.
import Routes from './routes';

const store = configureStore();

const renderApp = () => {
  const App = require('./containers/App').default;

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App>
          <Routes />
        </App>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

injectTapEventPlugin();
renderApp();

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', renderApp);
}
