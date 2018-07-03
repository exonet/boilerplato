import JiraClient from 'jira-connector';
import moment from 'moment';

class Client {
  /**
   * @type {JiraClient} The Jira API client, used to perform requests.
   */
  client;

  /**
   * Create the Jira client based on the provided username and password.
   *
   * @param {string} host The Jira host name to connect to.
   * @param {string} username The username of the Jira account.
   * @param {string} password The password of the Jira account.
   */
  constructor(host, username, password) {
    this.client = new JiraClient({
      host,
      basic_auth: { username, password },
    });
  }

  /**
   * Try finding the sprint by the given boardId and sprintId.
   *
   * @param {Number} boardId The ID of the board to get the sprints for.
   * @param {Number} sprintNumber The sprint to search for.
   *
   * @return {Promise} A promise to get the currently active Sprint.
   */
  getSprint({ boardId, sprintNumber }) {
    console.log('Getting sprint');
    return this.client.board.getSprintsForBoard({ boardId })
      .then(
        (response) => {
          // Try to find the sprint.
          const result = response.values.find(record => record.name === `Sprint ${sprintNumber}`);

          console.log('Got sprint');

          // If the sprint is found, result, if not reject.
          return typeof result !== 'undefined' ?
            Promise.resolve(result) :
            Promise.reject(new Error('Sprint not found.'));
        },
        () => Promise.reject(new Error('Unable to get sprints.')),
      );
  }

  /**
   * Get all the issues for a Sprint.
   *
   * @param {Object} sprint The sprint object containing the ID.
   *
   * @return {Promise} A promise to get all issues for a Sprint.
   */
  getIssuesBySprint(sprint) {
    console.log('Getting sprint issues');
    return this.client.sprint.getSprintIssues({
      sprintId: sprint.id,
      maxResults: 1000,
    }).then(
      (response) => {
        console.log('Got issues');

        return response.issues.length > 0 ?
          Promise.resolve(response.issues.map(issue => ({
            id: issue.id,
            key: issue.key,
            type: issue.fields.issuetype.name,
            epic: typeof issue.fields.epic !== 'undefined' && issue.fields.epic !== null ?
              issue.fields.epic.key :
              null,
            title: issue.fields.summary,
            assignee: issue.fields.assignee !== null ?
              issue.fields.assignee.name :
              null,
            completed: issue.fields.status.name === 'Done',
            created: issue.fields.created,
            worklogIds: issue.fields.worklog.worklogs.map(item => parseInt(item.id, 10)),
            worklogs: issue.fields.worklog.worklogs.map(item => ({
              id: parseInt(item.id, 10),
              issueId: item.issueId,
              assignee: item.author.name,
              timeSpent: item.timeSpentSeconds,
            })),
            timeTracking: {
              estimate: issue.fields.timetracking.originalEstimateSeconds || 0,
              spent: issue.fields.timetracking.timeSpentSeconds || 0,
              remaining: issue.fields.timetracking.remainingEstimateSeconds || 0,
            },
          }))) :
          Promise.reject(new Error(`Unable to get issues for sprint with ID: ${sprint.id}`));
      },
      () => Promise.reject(new Error('Unable to get issues.'))
    );
  }

  /**
   * Get all the issues by given key.
   *
   * @param {string[]} keys The issue keys to get the issues by.
   *
   * @return {Promise} A promise to get all issues for the given keys.
   */
  getEpicsByKeys(keys) {
    console.log('Getting epic issues');
    return this.client.search.search({ jql: `key in (${keys.join(',')})` })
      .then(
        (response) => {
          console.log('Got epics');

          return response.issues.length > 0 ?
            Promise.resolve(response.issues.map(issue => ({
              id: issue.id,
              key: issue.key,
              name: issue.fields.customfield_10008,
              title: issue.fields.summary,
              completed: issue.fields.status.name === 'Done',
            }))) :
            Promise.reject(new Error(`Unable to get issues for keys: ${keys.join(', ')}`));
        },
        () => Promise.reject(new Error('Unable to get issues.'))
      );
  }

  getWorklogsByDate(startDate, endDate) {
    return this.client.search.search({
      jql: `worklogDate >= ${moment(startDate).format('YYYY-MM-DD')} AND worklogDate < ${moment(endDate).add(1, 'd').format('YYYY-MM-DD')}`,
      fields: ['worklog'],
      maxResults: 1000,
    })
      .then((response) => {
        // Get the worklog IDs.
        if (response.issues.length === 0) {
          return Promise.resolve([]);
        }

        const nextItems = [];
        const worklogs = response.issues.reduce((items, issue) => {
          if (issue.fields.worklog.maxResults < issue.fields.worklog.total) {
            nextItems.push(issue);

            return items.concat([]);
          }

          return (
            items.concat(issue.fields.worklog.worklogs.map(item => ({
              issueId: item.issueId,
              assignee: item.author.name,
              timeSpent: item.timeSpentSeconds,
            }))));
        }, []);

        if (nextItems.length === 0) {
          return Promise.resolve(worklogs);
        }

        return Promise.all(nextItems.map(issue => (
          this.client.issue.getWorkLogs({ issueId: issue.id })
        ))).then(results => {
          const next = results.reduce((all, response) => (
            all.concat(response.worklogs.map(item => ({
              issueId: item.issueId,
              assignee: item.author.name,
              timeSpent: item.timeSpentSeconds,
            })))
          ), []);

          return Promise.resolve(worklogs.concat(next));
        });
      });
  }
}

export default Client;
