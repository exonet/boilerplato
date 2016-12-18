import { bindActionCreators } from 'redux';
import { homeToggle } from '../reducers/home';

export default dispatch => ({
  actions: bindActionCreators({
    homeToggle,
  }, dispatch),
});
