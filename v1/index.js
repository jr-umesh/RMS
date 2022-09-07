/**
 * 1. assign teacher to semester for each subject. (take odd or even only)
 * 2. create initial routine for each semester.
 */

const fs = require('fs');

const {loadData} = require('./lib/loadData');
const {assignTeacher} = require('./lib/assignTeacher');

const {semesters, subjects} = loadData();

const oddSem = assignTeacher(
  semesters.filter(sem => sem.number % 2 !== 0),
  subjects
);

const evenSem = assignTeacher(
  semesters.filter(sem => sem.number % 2 === 0),
  subjects
);

fs.writeFileSync(
  './result/[ODD]semester_assigned_teacher.json',
  JSON.stringify(oddSem)
);

fs.writeFileSync(
  './result/[Even]semester_assigned_teacher.json',
  JSON.stringify(evenSem)
);
