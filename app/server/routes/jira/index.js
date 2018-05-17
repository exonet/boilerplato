import Router from 'express/lib/router';
import Client from './client';

/**
 * Get the routes for '/jira':
 *
 * - /issues-in-progress.
 * - /issue/:issueId.
 * - /active-sprint,
 *
 * @return {Router} The router with the Jira routes.
 */
export default () => {
  // Setup the jira client.
  const client = new Client(__JIRA_HOST__, __JIRA_USERNAME__, __JIRA_PASSWORD__);
  console.log(__JIRA_USERNAME__);
  console.log(__JIRA_PASSWORD__);

  // Setup the router.
  const router = new Router();

  router.get('/active-sprint', (req, res) => {
    client.getActiveSprint()
      .then(
        result => res.send({
          id: result.id,
          attributes: {
            ...result,
          },
        }),
        error => console.log(error),
      );
  });

  return router;
};
