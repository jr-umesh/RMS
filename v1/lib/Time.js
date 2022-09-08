class Time {
  constructor(from, till) {
    this.from = from;
    this.till = till;
  }

  isEqual(obj) {
    return !!(this.from === obj.from && this.till === obj.till);
  }
}

module.exports = {Time};
