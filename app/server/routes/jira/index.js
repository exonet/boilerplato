import Router from 'express/lib/router';
import Client from './client';

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

  router.get('/', (req, res) => {
    client.getSprint({ boardId: config.boardId, sprintNumber: config.sprintNumber })
      .then(
        (sprint) => res.send(sprint),
        (error) => res.send(error),
      );

    // client.getSprints()
    //   .then(
    //     result => res.send({
    //       id: result.id,
    //       attributes: {
    //         ...result,
    //       },
    //     }),
    //     error => console.log(error),
    //   );
  });

  return router;
};
