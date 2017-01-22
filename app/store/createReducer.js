import { combineReducers } from 'redux';
import appReducer from '../containers/App/store';

/**
 * @return {Object} The combined reducers.
 */
export default ({ local = {} } = {}) => combineReducers({
  app: appReducer,
  local: Object.keys(local).length ?
    combineReducers(local) :
    (state = {}) => state,
});
