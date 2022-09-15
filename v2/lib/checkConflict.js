const {loadData} = require('./loadData');
const {faculties} = loadData();

const WEEK_DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

const TIME_SLOTS = ['7:00-8:30', '8:30-10:00', '10:40-12:10', '12:10-1:20'];

/**
 *
 * return true if conflict
 *
 * @param {Object} faculties
 * @param {Object} semester
 * @param {String} subjectAlias
 * @param {String} teacherAlias
 * @param {Number} weekDayIdx
 * @param {Number} timeSlotIdx
 * @returns {Boolean} isConflict
 */
const checkIsConflict = (
  faculties,
  semester,
  subjectAlias,
  teacherAlias,
  weekDayIdx,
  timeSlotIdx
) => {
  // check if sub repeat in that day
  let subRepeatCount = 0;
  for (let i = 0; i < TIME_SLOTS.length; i++) {
    if (semester.routine[weekDayIdx][i] === subjectAlias) ++subRepeatCount;
  }

  if (subRepeatCount > 1) return true;

  // check if teacher repeat in same day & time slot for all semester and faculties

  let teacherRepeatCount = 0;
  faculties.forEach(faculty => {
    faculty.semesters.forEach(semester => {
      const teacherForSub = faculties.subjects.find(
        s => s.alias === semester.routine[weekDayIdx][timeSlotIdx]
      );

      if (teacherForSub === teacherAlias) ++teacherRepeatCount;
    });
  });

  if (teacherRepeatCount > 1) return true;

  return false;
};

module.exports = {checkIsConflict};
