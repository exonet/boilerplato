import React from 'react';
import time from './time';

class Guestimate {
  constructor(estimate, spent) {
    this.estimate = estimate;
    this.spent = spent;
  }

  readable() {
    const offset = this.estimate - this.spent;

    if (offset === 0) {
      return '👍';
    }

    if (offset < 0) {
      return (<span style={{ color: 'red' }}>{`+${time(offset * -1).readable()}`}</span>);
    }

    return (<span style={{ color: 'green' }}>{`-${time(offset).readable()}`}</span>);
  }
}

export default (estimate, spent) => new Guestimate(estimate, spent);

