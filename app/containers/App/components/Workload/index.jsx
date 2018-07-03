import React from 'react';
import PropTypes from 'prop-types';

import { Heading } from 'app/spectacle';
import { Pie } from 'react-chartjs-2';

import withHandlers from './handlers';

import { primaryColor } from '../../handlers/theme';

const IssueCharts = ({ statistics }) => {
  console.log(statistics.map(issue => issue.value));
  const data = {
    labels: statistics.map(issue => issue.label),
    datasets: [{
      data: statistics.map(issue => issue.value),
      backgroundColor: [
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
      ],
      borderColor: primaryColor,
    }],
  };

  const options = {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontSize: 20,
      },
    },
  };

  return [
    <Heading key="s3-title">🍰 Workload</Heading>,
    <div key="s3-graph">
      <Pie data={data} options={options} />
    </div>,
  ];
};

IssueCharts.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
};

export default withHandlers(IssueCharts);
