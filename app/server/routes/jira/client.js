import JiraClient from 'jira-connector';

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

  getWorklogByIds(ids) {
    console.log('Getting worklogs');

    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    return this.client.worklog.worklogList({ ids })
      .then(
        (response) => {
          console.log('Got worklogs');

          return response.length > 0 ?
            Promise.resolve(response.map(worklog => ({
              issueId: worklog.issueId,
              assignee: worklog.author.name,
              timeSpent: worklog.timeSpentSeconds,
            }))) :
            Promise.reject(new Error(`Unable to get worklogs for IDs: ${ids.join(', ')}`));
        },
        (error) => {
          console.dir(error);
          Promise.reject(new Error('Unable to get worklogs.'));
        }
      );
  }
}

export default Client;
