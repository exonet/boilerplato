import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableHeader,
  TableHeaderItem,
  TableBody,
  TableRow,
  TableItem,
} from 'spectacle';

import { Heading, TableTextRight } from 'app/spectacle';

import time from './handlers/time';

const IssueStats = ({ jira }) => [
  <Heading key="s2-title">Issue statistics</Heading>,
  <Table key="s2-table">
    <TableHeader>
      <TableRow>
        <TableHeaderItem>Epic</TableHeaderItem>
        <TableHeaderItem>Completed</TableHeaderItem>
        <TableHeaderItem>Percentage</TableHeaderItem>
        <TableHeaderItem>Estimate</TableHeaderItem>
        <TableHeaderItem>Logged</TableHeaderItem>
      </TableRow>
    </TableHeader>
    <TableBody>
      {jira.epics.map((epic) => {
        console.dir(epic);

        return (
          <TableRow key={epic.id}>
            <TableItem>{epic.name}</TableItem>
            <TableItem>
              <TableTextRight>{`${epic.progress.completed}/${epic.progress.total}`}</TableTextRight>
            </TableItem>
            <TableItem>
              <TableTextRight>{`${epic.progress.percentage}%`}</TableTextRight>
            </TableItem>
            <TableItem>
              <TableTextRight>{time(epic.timeTracking.estimate).readable()}</TableTextRight>
            </TableItem>
            <TableItem>
              <TableTextRight>{time(epic.timeTracking.spent).readable()}</TableTextRight>
            </TableItem>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>,
];

IssueStats.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default IssueStats;
