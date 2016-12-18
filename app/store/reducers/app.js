const APP_MENU_OPEN = 'boilerplato/app/MENU_OPEN';
const APP_MENU_CLOSE = 'boilerplato/app/MENU_CLOSE';
const APP_MENU_TOGGLE = 'boilerplato/app/MENU_TOGGLE';

/**
 * @type {Object} The initial state for the app.
 */
const initialState = {
  menuOpen: false,
};

/**
 * Create a reducer to handle the app actions.
 *
 * @param {Object} state The current state.
 * @param {Object} action The action to apply.
 *
 * @returns {Object} The new state.
 */
export default (state = initialState, action) => {
  switch (action.type) {
    // Open the menu.
    case APP_MENU_OPEN:
      return {
        ...state,
        menuOpen: true,
      };

    // Open the menu.
    case APP_MENU_CLOSE:
      return {
        ...state,
        menuOpen: false,
      };

    // Toggle the menu.
    case APP_MENU_TOGGLE:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };

    // By default return the current state.
    default:
      return state;
  }
};

export const menuOpen = () => ({ type: APP_MENU_OPEN });
export const menuClose = () => ({ type: APP_MENU_CLOSE });
export const menuToggle = () => ({ type: APP_MENU_TOGGLE });
