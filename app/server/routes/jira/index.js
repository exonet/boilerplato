import Router from 'express/lib/router';
import Client from './client';
import format from './format';

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

          return client.getWorklogsByDate(data.sprint.startDate, data.sprint.endDate);

          // return client.getWorklogByIds(worklogIds);
        },
        error => res.send(error),
      )
      .then(
        (worklogs) => {
          data.worklogs = [...worklogs];

          return client.getEpicsByKeys(data.issues.filter(issue => issue.epic !== null).map(issue => issue.epic));
        },
        error => res.send(error),
      )
      .then(
        (epics) => {
          data.epics = [...epics];

          return res.send(format(data));
        },
        error => res.send(error),
      );
  });

  return router;
};
