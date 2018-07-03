import React from 'react';
import PropTypes from 'prop-types';
import { Deck, Slide, Text } from 'spectacle';
import { Heading } from 'app/spectacle';

// Higher order component data.
import withHandlers from './handlers';
import theme, { retroImage, endImage } from './handlers/theme';

// Local components.
import Goals from './components/Goals';
import Burndown from './components/Burndown';
import EpicStatistics from './components/EpicStatistics';
import Workload from './components/Workload';
import IssueStatistics from './components/IssueStatistics';
import Worklog from './components/Worklog';
import Retrospective from './components/Retrospective';
import Discuss from './components/Discuss';

// Local SCSS.
import './index.scss';

/**
 * Create the application using the BrowserRouter.
 *
 * @return {XML} The rendered application.
 */
const App = ({ jira }) => {
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
      <Slide><Workload jira={jira} /></Slide>
      <Slide><Burndown /></Slide>
      <Slide><Worklog jira={jira} users={SPRINTCONFIG.users} /></Slide>
      <Slide bgImage={retroImage()} bgDarken={0.75}><Retrospective /></Slide>
      <Slide><Discuss items={SPRINTCONFIG.discussion} /></Slide>
      <Slide bgImage={endImage()} bgDarken={0.2}>
        <Heading textColor="#FFFFFF">The end 👋🏻</Heading>
      </Slide>
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
