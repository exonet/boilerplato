import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Table,
  TableHeader,
  TableHeaderItem,
  TableBody,
  TableRow,
  TableItem,
} from 'spectacle';

import { Heading, TableTextLeft, TableTextRight } from 'app/spectacle';
import { time, guestimate } from 'app/utilities';

const IssueStatistics = ({ jira }) => {
  const startDate = moment(jira.sprint.startDate);

  const plannedIssues = jira.issues.filter(({ created, epic }) => (
    epic === null && moment(created).isSameOrBefore(startDate)
  ));
  const planned = {
    completed: plannedIssues.filter(({ completed }) => completed).length,
    total: plannedIssues.length,
    estimate: plannedIssues.reduce((acc, cur) => acc + cur.timeTracking.estimate, 0),
    spent: plannedIssues.reduce((acc, cur) => acc + cur.timeTracking.spent, 0),
  };

  const unplannedIssues = jira.issues.filter(({ created }) => moment(created).isAfter(startDate));
  const unplanned = {
    completed: unplannedIssues.filter(({ completed }) => completed).length,
    total: unplannedIssues.length,
    estimate: unplannedIssues.reduce((acc, cur) => acc + cur.timeTracking.estimate, 0),
    spent: unplannedIssues.reduce((acc, cur) => acc + cur.timeTracking.spent, 0),
  };

  return [
    <Heading key="s3-title">Issue statistics</Heading>,
    <Table key="s3-table">
      <TableHeader>
        <TableRow>
          <TableHeaderItem><TableTextLeft>Type</TableTextLeft></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Completed</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Percentage</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Estimate</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Logged</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Guestimate</TableTextRight></TableHeaderItem>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key="unplanned">
          <TableItem><TableTextLeft>Unplanned</TableTextLeft></TableItem>
          <TableItem>
            <TableTextRight>{`${unplanned.completed}/${unplanned.total}`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{`${Math.round((unplanned.completed / unplanned.total) * 100)}%`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(unplanned.estimate).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(unplanned.spent).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>
              {guestimate(unplanned.estimate, unplanned.spent).readable()}
            </TableTextRight>
          </TableItem>
        </TableRow>
        <TableRow key="planned">
          <TableItem><TableTextLeft>Planned</TableTextLeft></TableItem>
          <TableItem>
            <TableTextRight>{`${planned.completed}/${planned.total}`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{`${Math.round((planned.completed / planned.total) * 100)}%`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(planned.estimate).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(planned.spent).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>
              {guestimate(planned.estimate, planned.spent).readable()}
            </TableTextRight>
          </TableItem>
        </TableRow>
      </TableBody>
    </Table>,
  ];
};

IssueStatistics.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default IssueStatistics;
