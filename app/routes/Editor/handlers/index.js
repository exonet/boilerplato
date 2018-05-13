import { withState, withHandlers, mapProps, compose } from 'recompose';

const addState = withState('data', 'updateData', {
  active: 'location',
  address: false,
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
  handleAddressChange: ({ updateData }) => (address = false) => updateData(current => ({
    ...current,
    address,
  })),
});

const addMapping = mapProps(({
  data,
  goToLocation,
  goToLabels,
  goToCustomize,
  goToCart,
  handleAddressChange,
}) => ({
  data,
  menu: {
    goToLocation,
    goToLabels,
    goToCustomize,
    goToCart,
  },
  actions: {
    handleAddressChange,
  },
}));

export default compose(
  addState,
  addHandlers,
  addMapping,
);
