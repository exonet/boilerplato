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
    return this.client.board.getSprintsForBoard({ boardId: this.boardId })
      .then((response) => {
        // Try to find the sprint.
        const result = response.values.find(record => record.name === `Sprint ${sprintNumber}`);

        // If the sprint is found, result, if not reject.
        return typeof result !== 'undefined' ?
          Promise.resolve(result) :
          Promise.reject('Sprint not found');
      });
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
