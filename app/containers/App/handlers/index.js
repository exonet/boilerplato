import { lifecycle, withState, mapProps, branch, renderComponent, compose } from 'recompose';
import superAgent from 'superagent';

// Local components.
import Loading from '../components/Loading';

const addState = withState('data', 'updateData', {
  jira: false,
});

const addLifecycles = lifecycle({
  componentDidMount() {
    superAgent.get('/jira').then(({ body }) => this.props.updateData(current => ({
      ...current,
      jira: body,
    })));
  },
});

const addLoadingCheck = branch(
  ({ data }) => data.slides === false || data.jira === false,
  renderComponent(Loading),
);

const addMapping = mapProps(({ data }) => ({
  jira: data.jira,
}));


export default compose(
  addState,
  addLifecycles,
  addLoadingCheck,
  addMapping,
);
