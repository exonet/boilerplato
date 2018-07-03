import moment from 'moment';

export default ({ sprint, epics, issues, worklogs }) => {
  const totalIssues = issues.length;
  const completedIssues = issues.filter(issue => issue.completed).length;

  // Get users.
  const users = [...new Set(issues
    .filter(issue => issue.assignee !== null)
    .map(issue => issue.assignee)
    .sort(),
  )].map((name) => {
    const assigned = issues.filter(issue => issue.assignee === name);
    const completed = assigned.filter(issue => issue.completed).length;

    return {
      name,
      progress: {
        total: assigned.length,
        completed: completed,
        percentage: Math.round((completed / assigned.length) * 100),
      },
      issues: assigned,
    };
  });

  // Get epics.
  const data = {
    sprint: {
      name: sprint.name,
      goal: sprint.goal,
      startDate: moment(sprint.startDate),
      endDate: moment(sprint.endDate),
      progress: {
        total: totalIssues,
        completed: completedIssues,
        percentage: Math.round((completedIssues / totalIssues) * 100),
      },
    },
    users,
    epics: epics.map((epic) => {
      const epicIssues = issues.filter(issue => issue.epic === epic.key);
      const completed = epicIssues.filter(issue => issue.completed).length;

      return {
        ...epic,
        completed: epicIssues.length === completed,
        progress: {
          total: epicIssues.length,
          completed: completed,
          percentage: Math.round((completed / epicIssues.length) * 100),
        },
        timeTracking: {
          estimate: epicIssues.reduce((total, issue) => (total + issue.timeTracking.estimate), 0),
          spent: epicIssues.reduce((total, issue) => (total + issue.timeTracking.spent), 0),
          remaining: epicIssues.reduce((total, issue) => (total + issue.timeTracking.remaining), 0),
        },
        issues: epicIssues,
      };
    }).sort((a, b) => a.key.localeCompare(b.key, 'en', { numeric: true })),
  };

  return {
    ...data,
    worklogs,
    issues,
  };
};
