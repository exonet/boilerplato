import React from 'react';
import PropTypes from 'prop-types';
import { Deck, Slide, Text, Table, TableHeader, TableHeaderItem, TableBody, TableRow, TableItem } from 'spectacle';

// Higher order component data.
import withHandlers from './handlers';

// Local SCSS.
import './index.scss';

/**
 * Create the application using the BrowserRouter.
 *
 * @return {XML} The rendered application.
 */
const App = ({ jira }) => {
  console.dir(jira);

  return (
    <Deck>
      <Slide>
        <div>
          <Text>{jira.sprint.name}</Text>
          <Text>{jira.sprint.goal || 'No goal set.'}</Text>
        </div>
      </Slide>
      <Slide>
        <Text>Goals</Text>
        <Table>
          <TableHeader>
            <TableHeaderItem>Epic</TableHeaderItem>
            <TableHeaderItem>Description</TableHeaderItem>
            <TableHeaderItem>?</TableHeaderItem>
          </TableHeader>
          <TableBody>
            {jira.epics.map(epic => (
              <TableRow key={epic.id}>
                <TableItem>{epic.name}</TableItem>
                <TableItem>{epic.title}</TableItem>
                <TableItem>{epic.completed ? '👌' : '😭'}</TableItem>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Slide>
    </Deck>
  );
};

App.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default withHandlers(App);
