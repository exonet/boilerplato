import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderItem,
  TableBody,
  TableItem,
} from 'spectacle';

import {
  Heading,
  TableText,
  TableTextLeft,
} from 'app/spectacle';

import { time } from 'app/utilities';

const Worklog = ({ jira }) => [
  <Heading key="s4-worklog">Worklog</Heading>,
  <Table key="s4-table">
    <TableHeader>
      <TableRow>
        <TableHeaderItem>
          <TableTextLeft>Name</TableTextLeft>
        </TableHeaderItem>
        <TableHeaderItem>
          <TableTextLeft>Days</TableTextLeft>
        </TableHeaderItem>
        <TableHeaderItem>
          <TableTextLeft>Expected</TableTextLeft>
        </TableHeaderItem>
        <TableHeaderItem>
          <TableTextLeft>Logged</TableTextLeft>
        </TableHeaderItem>
        <TableHeaderItem>
          <TableText>?</TableText>
        </TableHeaderItem>
      </TableRow>
    </TableHeader>
    <TableBody>
      {jira.users.map((user) => {
        const logged = jira.issues.filter(issue => (
          issue.worklogs.filter(({ assignee }) => assignee === user.name).length > 0
        ).reduce((acc, cur) => (
          acc + cur
            .filter(({ assignee }) => assignee === user.name)
            .reduce((acc2, cur2) => (cur2.timeSpent + acc2), 0)
        ), 0));
        console.log(logged);

        return (
          <TableRow key={user.name}>
            <TableItem>
              <TableTextLeft>{user.name}</TableTextLeft>
            </TableItem>
            <TableItem>
              <TableTextLeft>{SPRINTCONFIG.users[user.name].expected}</TableTextLeft>
            </TableItem>
            <TableItem>
              <TableTextLeft>
                {time(SPRINTCONFIG.users[user.name].expected * 7 * 60 * 60).readable()}
              </TableTextLeft>
            </TableItem>
            <TableItem>
              <TableText>{time(logged).readable()}</TableText>
            </TableItem>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>,
];

Worklog.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default Worklog;
