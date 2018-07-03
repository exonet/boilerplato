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

import { Heading, TableFooterRow, TableTextLeft, TableTextRight } from 'app/spectacle';
import { time, guestimate } from 'app/utilities';

const EpicStatistics = ({ jira }) => {
  const epicIssues = jira.issues.filter(({ epic }) => epic !== null);
  const total = {
    completed: epicIssues.filter(({ completed }) => completed).length,
    total: epicIssues.length,
    estimate: epicIssues.reduce((acc, cur) => acc + cur.timeTracking.estimate, 0),
    spent: epicIssues.reduce((acc, cur) => acc + cur.timeTracking.spent, 0),
  };

  return [
    <Heading key="s2-title">🤓 Epic statistics</Heading>,
    <Table key="s2-table">
      <TableHeader>
        <TableRow>
          <TableHeaderItem><TableTextLeft>Epic</TableTextLeft></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Completed</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Percentage</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Estimate</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Logged</TableTextRight></TableHeaderItem>
          <TableHeaderItem><TableTextRight>Guestimate</TableTextRight></TableHeaderItem>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jira.epics.map(epic => (
          <TableRow key={epic.id}>
            <TableItem><TableTextLeft>{epic.name}</TableTextLeft></TableItem>
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
            <TableItem>
              <TableTextRight>
                {guestimate(epic.timeTracking.estimate, epic.timeTracking.spent).readable()}
              </TableTextRight>
            </TableItem>
          </TableRow>
        ))}
        <TableFooterRow key="total">
          <TableItem><TableTextLeft>Total</TableTextLeft></TableItem>
          <TableItem>
            <TableTextRight>{`${total.completed}/${total.total}`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{`${Math.round((total.completed / total.total) * 100)}%`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(total.estimate).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(total.spent).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>
              {guestimate(total.estimate, total.spent).readable()}
            </TableTextRight>
          </TableItem>
        </TableFooterRow>
      </TableBody>
    </Table>,
  ];
};

EpicStatistics.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default EpicStatistics;
