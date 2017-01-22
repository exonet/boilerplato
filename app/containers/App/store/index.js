const SET_SIDER_COLLAPSED = 'boilerplato/app/SET_SIDER_COLLAPSED';

/**
 * @type {Object} The initial state for the application.
 */
const initialState = {
  siderCollapsed: false,
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
  const { type, payload = false } = action;

  switch (type) {
    // Set the sider state.
    case SET_SIDER_COLLAPSED:
      return {
        siderCollapsed: payload,
      };

    // By default return the current state.
    default:
      return state;
  }
};

export const setSiderCollapsed = payload => ({ type: SET_SIDER_COLLAPSED, payload });
