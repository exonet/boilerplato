import { bindActionCreators } from 'redux';
import { setSiderCollapsed } from './index';

export default dispatch => ({
  actions: bindActionCreators({
    setSiderCollapsed,
  }, dispatch),
});
