// @ts-check
const date = {
  addWeekDays: (/** @type {Date} */ startDate, /** @type {Number} */ count) =>
    Array.from({ length: count }).reduce((date) => {
      date = new Date(date.setDate(date.getDate() + 1));
      if (date.getDay() % 6 === 0)
        date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
      return date;
    }, startDate),
  addMinutesToDate: (
    /** @type {string | number | Date} */ date,
    /** @type {number} */ n
  ) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 60000);
    return new Date(d.toISOString().split('.')[0].replace('T', ' '));
  },
};

module.exports = {
  date,
};
