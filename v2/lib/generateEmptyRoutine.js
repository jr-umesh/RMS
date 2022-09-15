const {WEEK_DAYS, TIME_SLOTS} = require('./constants');

const generateEmptyRoutine = () => {
  return [...Array(WEEK_DAYS.length)].map(e =>
    Array(TIME_SLOTS.length).fill(null)
  );
};

module.exports = {generateEmptyRoutine};
