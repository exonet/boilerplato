/* eslint-disable no-shadow */
import React, { Component as ReactComponent } from 'react';

/**
 * Create a async loadable component by using the `asyncRoute` helper.
 *
 * @param {Function} getComponent The promise to get the component.
 */
const asyncRoute = getComponent => class AsyncComponent extends ReactComponent {
  /**
   * @type {null|Element} Keep track of the (to be) loaded component.
   */
  static Component = null;

  /**
   * @type {boolean} Keep track of whether or not the component has been mounted.
   */
  mounted = false;

  /**
   * @type {Object} Setup the state which will eventually contain the component.
   */
  state = {
    Component: AsyncComponent.Component,
  };

  /**
   * When the component will mount, and the component state is set to null,
   * call getComponent() which returns a promise wit the loaded component
   * whenever it finishes. If the component has already been mounted,
   * the state will be set.
   */
  componentWillMount() {
    if (this.state.Component === null) {
      getComponent().then(m => m.default).then((Component) => {
        AsyncComponent.Component = Component;
        if (this.mounted) {
          this.setState({ Component });
        }
      });
    }
  }

  /**
   * When the component is created and mounted, set mounted to true.
   */
  componentDidMount() {
    this.mounted = true;
  }

  /**
   * When the component is removed, set mounted to false.
   */
  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Render the component if it has been loaded from the state, else return
   * null.
   *
   * @return {XML|null} The component or null.
   */
  render() {
    const { Component } = this.state;

    if (Component !== null) {
      return <Component {...this.props} />;
    }
    return null;
  }
};

export default asyncRoute;
