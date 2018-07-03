import moment from 'moment';
import { mapProps } from 'recompose';

import { grabDefaultIssues, omitDefaultIssues } from 'app/utilities/issues';

const getStats = (label, totalTimeSpent, issues) => {
  const timeSpent = issues.reduce((acc, cur) => acc + cur.timeTracking.spent, 0);

  return {
    label,
    value: Math.round((timeSpent / totalTimeSpent) * 100),
  };
};

export default mapProps(({ jira, ...other }) => {
  const startDate = moment(jira.sprint.startDate);
  const totalTimeSpent = jira.issues.reduce((acc, cur) => acc + cur.timeTracking.spent, 0);
  const allIssues = jira.issues.filter(omitDefaultIssues);

  return {
    statistics: [
      getStats('Planned Epic Issues', totalTimeSpent, allIssues.filter(({ created, epic }) => (
        epic !== null && moment(created).isSameOrBefore(startDate)
      ))),
      getStats('Planned Other Issues', totalTimeSpent, allIssues.filter(({ created, epic }) => (
        epic === null && moment(created).isSameOrBefore(startDate)
      ))),
      getStats('Unplanned Epic Issues', totalTimeSpent, allIssues.filter(({ created, epic }) => (
        epic !== null && moment(created).isAfter(startDate)
      ))),
      getStats('Unplanned Other Issues', totalTimeSpent, allIssues.filter(({ created, epic }) => (
        epic === null && moment(created).isAfter(startDate)
      ))),
      getStats('Default Sprint Issues', totalTimeSpent, jira.issues.filter(grabDefaultIssues)),
    ],
    jira,
    ...other,
  };
});

