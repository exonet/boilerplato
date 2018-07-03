import React from 'react';
import PropTypes from 'prop-types';
import { Heading, List, ListItem, Appear } from 'spectacle';

const Discuss = ({ items }) => [
  <Heading key="s3-title">🍆 Discussion</Heading>,
  <List key="discussion-points">
    {items.map((item, index) => (
      <Appear key={index.toString()}>
        <ListItem>
          {item.title} ({item.user})
        </ListItem>
      </Appear>
    ))}
  </List>,
];

Discuss.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  })).isRequired,
};

export default Discuss;
