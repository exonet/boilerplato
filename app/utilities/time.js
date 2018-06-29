class Time {
  time = {
    w: 0,
    d: 0,
    h: 0,
    m: 0,
  };

  constructor(seconds) {
    this.seconds = seconds;

    if (seconds > 0) {
      let remaining = this.seconds;

      // Get the weeks.
      const weeks = Math.floor(remaining / 60 / 60 / 7 / 5);
      remaining -= (weeks * 60 * 60 * 7 * 5);

      // Get the days.
      const days = Math.floor(remaining / 60 / 60 / 7);
      remaining -= (days * 60 * 60 * 7);

      // Get the hours.
      const hours = Math.floor(remaining / 60 / 60);
      remaining -= (hours * 60 * 60);

      // Get the minutes.
      const minutes = Math.floor(remaining / 60);

      this.time = {
        w: weeks,
        d: days,
        h: hours,
        m: minutes,
      };
    }
  }

  readable() {
    // Get the hours/minutes ago.
    return this.seconds === 0 ?
      '0m' :
      Object.keys(this.time)
        .filter(type => this.time[type] > 0)
        .map(type => `${this.time[type]}${type}`)
        .join(' ');
  }
}

export default seconds => new Time(seconds);

