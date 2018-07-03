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

const Goals = ({ jira }) => [
  <Heading key="s1-title">🔥 Goals</Heading>,
  <Table key="s1-table">
    <TableHeader>
      <TableRow>
        <TableHeaderItem>
          <TableTextLeft>Epic</TableTextLeft>
        </TableHeaderItem>
        <TableHeaderItem>
          <TableTextLeft>Description</TableTextLeft>
        </TableHeaderItem>
        <TableHeaderItem>
          <TableText>?</TableText>
        </TableHeaderItem>
      </TableRow>
    </TableHeader>
    <TableBody>
      {jira.epics.map(epic => (
        <TableRow key={epic.id}>
          <TableItem>
            <TableTextLeft>{epic.name}</TableTextLeft>
          </TableItem>
          <TableItem>
            <TableTextLeft>{epic.title}</TableTextLeft>
          </TableItem>
          <TableItem>
            <TableText>{epic.completed ? '😍' : '😭'}</TableText>
          </TableItem>
        </TableRow>
      ))}
    </TableBody>
  </Table>,
];

Goals.propTypes = {
  jira: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default Goals;
