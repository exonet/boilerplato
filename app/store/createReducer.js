import { combineReducers } from 'redux';

/**
 * @return {Object} The combined reducers.
 */
export default ({ local = {} } = {}) => combineReducers({
  local: Object.keys(local).length ?
    combineReducers(local) :
    (state = {}) => state,
});
