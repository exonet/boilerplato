import { withState, withHandlers, mapProps, compose } from 'recompose';

const addState = withState('data', 'updateData', {
  active: 'location',
});

const addHandlers = withHandlers({
  goToLocation: ({ updateData }) => () => updateData(current => ({
    ...current,
    active: 'location',
  })),
  goToLabels: ({ updateData }) => () => updateData(current => ({
    ...current,
    active: 'labels',
  })),
  goToCustomize: ({ updateData }) => () => updateData(current => ({
    ...current,
    active: 'customize',
  })),
  goToCart: ({ updateData }) => () => updateData(current => ({
    ...current,
    active: 'cart',
  })),
});

const addMapping = mapProps(({
  data,
  goToLocation,
  goToLabels,
  goToCustomize,
  goToCart,
}) => ({
  data,
  menu: {
    goToLocation,
    goToLabels,
    goToCustomize,
    goToCart,
  },
}));

export default compose(
  addState,
  addHandlers,
  addMapping,
);
