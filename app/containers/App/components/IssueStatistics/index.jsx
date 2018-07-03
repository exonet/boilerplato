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

import { Heading, TableTextLeft, TableTextRight } from 'app/spectacle';
import { time, guestimate } from 'app/utilities';

import IssueRow from './components/IssueRow';

import withHandlers from './handlers';

const IssueStatistics = ({ statistics }) => [
  <Heading key="s3-title">🧐 Issue statistics</Heading>,
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
      {statistics.map(({
        label,
        level,
        completed,
        total,
        estimate,
        spent,
      }) => (
        <IssueRow level={level} key={label}>
          <TableItem><TableTextLeft>{label}</TableTextLeft></TableItem>
          <TableItem>
            <TableTextRight>{`${completed}/${total}`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{`${Math.round((completed / total) * 100)}%`}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(estimate).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>{time(spent).readable()}</TableTextRight>
          </TableItem>
          <TableItem>
            <TableTextRight>
              {guestimate(estimate, spent).readable()}
            </TableTextRight>
          </TableItem>
        </IssueRow>
      ))}
    </TableBody>
  </Table>,
];

IssueStatistics.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    completed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    estimate: PropTypes.number.isRequired,
    spent: PropTypes.number.isRequired,
  })).isRequired,
};

export default withHandlers(IssueStatistics);
