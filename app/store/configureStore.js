import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './createReducer';

export default (initialState = {}) => {
  const store = createStore(
    createReducer(),
    initialState,
    applyMiddleware(thunk),
  );

  return {
    ...store,
    local: {},
  };
};


/**
 * Inject local reducers loaded at a later state into the store.
 *
 * @param {Object} store The current store.
 * @param {Object} localReducers The local reducers to inject.
 */
export const injectLocalReducer = (store, localReducers) => {
  const localNames = Object.keys(localReducers).filter(name => (
    typeof store.local[name] === 'undefined'
  ));

  if (localNames.length > 0) {
    localNames.forEach((name) => {
      store.local[name] = localReducers[name]; // eslint-disable-line no-param-reassign, max-len
    });

    store.replaceReducer(createReducer({
      local: store.local,
    }));
  }
};
