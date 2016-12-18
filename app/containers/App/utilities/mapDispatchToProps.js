import { bindActionCreators } from 'redux';
import { menuToggle } from '../../../store/reducers/app';

export default dispatch => ({
  actions: bindActionCreators({
    menuToggle,
  }, dispatch),
});
