import React from 'react';
import PropTypes from 'prop-types';
import { Deck, Slide, Text } from 'spectacle';
import { Heading } from 'app/spectacle';

// Higher order component data.
import withHandlers from './handlers';
import theme from './handlers/theme';

// Local components.
import Goals from './components/Goals';
import EpicStatistics from './components/EpicStatistics';
import IssueStatistics from './components/IssueStatistics';
import Worklog from './components/Worklog';

// Local SCSS.
import './index.scss';

/**
 * Create the application using the BrowserRouter.
 *
 * @return {XML} The rendered application.
 */
const App = ({ jira }) => {
  console.dir(jira);
  console.dir(SPRINTCONFIG);

  return (
    <Deck theme={theme}>
      <Slide>
        <div>
          <Heading>{jira.sprint.name}</Heading>
          <Text>{jira.sprint.goal || 'No goal set.'}</Text>
        </div>
      </Slide>
      <Slide><Goals jira={jira} /></Slide>
      <Slide><EpicStatistics jira={jira} /></Slide>
      <Slide><IssueStatistics jira={jira} /></Slide>
      <Slide><Worklog jira={jira} /></Slide>
    </Deck>
  );
};

App.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default withHandlers(App);
