import { combineReducers } from 'redux';
import app from './reducers/app';

/**
 * @return {Object} The combined reducers.
 */
export default ({ local = {} } = {}) => combineReducers({
  app,
  local: Object.keys(local).length ?
    combineReducers(local) :
    (state = {}) => state,
});
