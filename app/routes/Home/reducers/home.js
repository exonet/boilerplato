const HOME_TOGGLE = 'boilerplato/app/HOME_TOGGLE';

/**
 * @type {Object} The initial state for the home page.
 */
const initialState = {
  toggle: false,
};

/**
 * Create a reducer to handle the home actions.
 *
 * @param {Object} state The current state.
 * @param {Object} action The action to apply.
 *
 * @returns {Object} The new state.
 */
export default (state = initialState, action) => {
  switch (action.type) {
    // Toggle the state.
    case HOME_TOGGLE:
      return {
        toggle: !state.toggle,
      };

    // By default return the current state.
    default:
      return state;
  }
};

export const homeToggle = () => ({ type: HOME_TOGGLE });
