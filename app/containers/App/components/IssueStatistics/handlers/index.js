import moment from 'moment';
import { mapProps } from 'recompose';

import { grabDefaultIssues, omitDefaultIssues } from 'app/utilities/issues';

const getStats = (label, level, issues) => ({
  label,
  level,
  completed: issues.filter(({ completed }) => completed).length,
  total: issues.length,
  estimate: issues.reduce((acc, cur) => acc + cur.timeTracking.estimate, 0),
  spent: issues.reduce((acc, cur) => acc + cur.timeTracking.spent, 0),
});


export default mapProps(({ jira, ...other }) => {
  const startDate = moment(jira.sprint.startDate);
  const allIssues = jira.issues.filter(omitDefaultIssues);

  return {
    statistics: [
      getStats('Planned Epic Issues', 0, allIssues.filter(({ created, epic }) => (
        epic !== null && moment(created).isSameOrBefore(startDate)
      ))),
      getStats('Planned Other Issues', 0, allIssues.filter(({ created, epic }) => (
        epic === null && moment(created).isSameOrBefore(startDate)
      ))),
      getStats('Planned Issues', 1, allIssues.filter(({ created }) => (
        moment(created).isSameOrBefore(startDate)
      ))),
      getStats('Unplanned Epic Issues', 0, allIssues.filter(({ created, epic }) => (
        epic !== null && moment(created).isAfter(startDate)
      ))),
      getStats('Unplanned Other Issues', 0, allIssues.filter(({ created, epic }) => (
        epic === null && moment(created).isAfter(startDate)
      ))),
      getStats('Unplanned Issues', 1, allIssues.filter(({ created }) => (
        moment(created).isAfter(startDate)
      ))),
      getStats('Default Sprint Issues', 0, jira.issues.filter(grabDefaultIssues)),
      getStats('Total', 2, jira.issues),
    ],
    jira,
    ...other,
  };
});

