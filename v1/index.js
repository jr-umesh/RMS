/**
 * 1. assign teacher to semester for each subject. (take odd or even only)
 * 2. create initial routine for each semester.
 */

const fs = require('fs');

const {loadData} = require('./lib/loadData');
const {assignTeacher} = require('./lib/assignTeacher');
const {Semester} = require('./lib/Semester');
const {Slot} = require('./lib/Slot');
const {Subject} = require('./lib/Subject');
const {Teacher} = require('./lib/Teacher');
const {Time} = require('./lib/Time');

const {semesters, subjects, teachers, timeSlots} = loadData();

const oddSem = assignTeacher(
  semesters.filter(sem => sem.number % 2 !== 0),
  subjects
);

const mainRoutine = {};

oddSem.forEach(semester => {
  const weekRoutine = [];

  for (let i = 0; i < 6; i++) {
    let dayRoutine = [];

    let timeSlotCount = 0;
    while (timeSlotCount < timeSlots.length) {
      const randomSubject =
        semester.subjects[
          Math.floor(Math.random() * (semester.subjects.length - 0))
        ];

      // skip if no teacher assigned
      if (!semester.assignedTeacher[randomSubject]) continue;

      if (dayRoutine.find(slot => slot.subject === randomSubject)) continue;

      const subWeekCount = weekRoutine.filter(day => {
        return !!day.find(slot => slot.subject === randomSubject);
      }).length;

      if (subWeekCount > 6) continue;

      dayRoutine.push(
        new Slot(
          semester.assignedTeacher[randomSubject],
          randomSubject,
          timeSlots[timeSlotCount]
        )
      );

      timeSlotCount++;
    }

    weekRoutine.push(dayRoutine);
  }

  mainRoutine[semester.number] = weekRoutine;
});

// const evenSem = assignTeacher(
//   semesters.filter(sem => sem.number % 2 === 0),
//   subjects
// );

fs.writeFileSync(
  './result/[ODD]semester_assigned_teacher.json',
  JSON.stringify(oddSem)
);

fs.writeFileSync('./result/[ODD]routine.json', JSON.stringify(mainRoutine));

// fs.writeFileSync(
//   './result/[Even]semester_assigned_teacher.json',
//   JSON.stringify(evenSem)
// );
