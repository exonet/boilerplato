import JiraClient from 'jira-connector';

class Client {
  /**
   * @type {JiraClient} The Jira API client, used to perform requests.
   */
  client;

  /**
   * @type {number} Set the default maximum results that can be returned.
   */
  maxResults = 1000;

  /**
   * @type {number} The ID of the board to fetch the Sprints for.
   */
  boardId = 2;

  /**
   * Create the Jira client based on the provided username and password.
   *
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
   * Get the currently active Sprint and gather the issue information about the Sprint.
   *
   * @return {Promise} A promise to get the currently active Sprint.
   */
  getActiveSprint() {
    return this.client.board.getSprintsForBoard({
      boardId: this.boardId,
      state: 'active',
    }).then(sprintResponse => (
      this.getSprintIssues(sprintResponse.values[0].id)
        .then(issuesResponse => ({
          ...sprintResponse.values[0],
          issues_total: issuesResponse.total,
          issues_done: issuesResponse.issues.filter(issue => (
            issue.fields.status.name.toLowerCase() === 'done'
          )).length,
        }))
    ));
  }

  /**
   * Get all the issues for a Sprint.
   *
   * @param {number} sprintId The ID of the Sprint to get the issues for.
   *
   * @return {Promise} A promise to get all issues for a Sprint.
   */
  getSprintIssues(sprintId) {
    return this.client.sprint.getSprintIssues({
      sprintId,
      maxResults: this.maxResults,
    });
  }
}

export default Client;
