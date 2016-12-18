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

export const injectReducers = (store, reducers) => {
  Object.keys(reducers).forEach((name) => {
    store.local[name] = reducers[name]; // eslint-disable-line no-param-reassign
  });

  store.replaceReducer(createReducer({ local: store.local }));
};
