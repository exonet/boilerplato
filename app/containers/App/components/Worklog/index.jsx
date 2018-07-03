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
  TableTextRight,
} from 'app/spectacle';

import { time } from 'app/utilities';

const Worklog = ({ jira, users }) => {
  const userData = jira.users.map((user) => {
    const timeSpent = jira.worklogs
      .filter(item => item.assignee === user.name)
      .reduce((total, worklog) => total + worklog.timeSpent, 0);

    return {
      name: user.name,
      days: users[user.name].expected,
      timeExpected: users[user.name].expected * 7 * 60 * 60,
      timeSpent,
    };
  });

  return [
    <Heading key="s4-worklog">🛠 Worklog</Heading>,
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
            <TableTextRight>Expected</TableTextRight>
          </TableHeaderItem>
          <TableHeaderItem>
            <TableTextRight>Logged</TableTextRight>
          </TableHeaderItem>
          <TableHeaderItem>
            <TableText>?</TableText>
          </TableHeaderItem>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map(user => (
          <TableRow key={user.name}>
            <TableItem>
              <TableTextLeft>{user.name}</TableTextLeft>
            </TableItem>
            <TableItem>
              <TableTextLeft>{user.days}</TableTextLeft>
            </TableItem>
            <TableItem>
              <TableTextRight>
                {time(user.timeExpected).readable()}
              </TableTextRight>
            </TableItem>
            <TableItem>
              <TableTextRight>
                {time(user.timeSpent).readable()}
              </TableTextRight>
            </TableItem>
            <TableItem>
              <TableText>{user.timeExpected <= user.timeSpent ? '👌' : '😭'}</TableText>
            </TableItem>
          </TableRow>
        ))}
      </TableBody>
    </Table>,
  ];
};

Worklog.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  users: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Worklog;
