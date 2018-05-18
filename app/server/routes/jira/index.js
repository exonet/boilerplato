import Router from 'express/lib/router';
import moment from 'moment';
import Client from './client';

const prepare = ({ sprint, issues, epics }) => {
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
        issues: epicIssues,
      };
    }),
  };

  console.dir(data);

  return {
    ...data,
    issues,
  };
};

/**
 * Get the routes for '/jira':
 *
 * @param {Object} config The jira sprint config object.
 *
 * @return {Router} The router with the Jira routes.
 */
export default (config) => {
  // Setup the jira client.
  const client = new Client(__JIRA_HOST__, __JIRA_USERNAME__, __JIRA_PASSWORD__);

  // Setup the router.
  const router = new Router();
  const data = {
    sprint: {},
    issues: [],
    epics: [],
  };

  router.get('/', (req, res) => {
    client.getSprint({ boardId: config.boardId, sprintNumber: config.sprintNumber })
      .then(
        (sprint) => {
          // Append the sprint to the data.
          data.sprint = { ...sprint };

          // Get issues for the current sprint.
          return client.getIssuesBySprint(data.sprint);
        },
        error => res.send(error),
      )
      .then(
        (issues) => {
          data.issues = [...issues];

          return client.getEpicsByKeys(data.issues.filter(issue => issue.epic !== null).map(issue => issue.epic));
        },
        error => res.send(error),
      )
      .then(
        (epics) => {
          data.epics = [...epics];

          return res.send(prepare(data));
        },
        error => res.send(error),
      );
  });

  return router;
};
