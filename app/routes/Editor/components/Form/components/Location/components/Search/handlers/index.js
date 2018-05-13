import { lifecycle, withState, withHandlers, compose } from 'recompose';

const GOOGLE_API = "https://maps.google.com/maps/api/geocode/json";

const addState = withState('data', 'updateData', ({
  value: null,
}));

const addHandlers = withHandlers({
  onInputChange: ({ updateData }) => {

  },
})

const addCycles = lifecycle({
  componentDidMount() {

  }
});
export default compose();
