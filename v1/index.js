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

const {semesters, subjects, teachers, timeSlots, weekDays} = loadData();

const oddSem = assignTeacher(
  semesters.filter(sem => sem.number % 2 !== 0),
  subjects
);

const mainRoutine = {};

oddSem.forEach(semester => {
  const weekRoutine = [];

  // for week excluding saturday
  for (let i = 0; i < 6; i++) {
    let dayRoutine = [];

    let timeSlotCount = 0;
    let loopCount = 0;

    // repeat until all the time slot filled for a day
    while (timeSlotCount < timeSlots.length) {
      const randomSubject =
        semester.subjects[
          Math.floor(Math.random() * (semester.subjects.length - 0))
        ];

      // skip if no teacher assigned
      if (!semester.assignedTeacher[randomSubject]) continue;

      // if subject already assigned for current day
      if (
        dayRoutine.find(
          slot => slot !== undefined && slot.subject === randomSubject
        )
      )
        continue;

      // if teacher busy for current time slot
      let isTeacherReserve = false;
      Object.keys(mainRoutine).forEach(key => {
        const tempSlot = mainRoutine[key][weekDays[i]].find(
          slot =>
            slot !== undefined && slot.time.isEqual(timeSlots[timeSlotCount])
        );

        // if for that time slot not assigned any teacher
        if (tempSlot === undefined) return;

        if (tempSlot.teacher === semester.assignedTeacher[randomSubject]) {
          isTeacherReserve = true;
        }
      });

      if (isTeacherReserve) continue;

      // if subject repeat more than subject week count
      const subWeekCount = weekRoutine.filter(day => {
        return !!day.find(
          slot => slot !== undefined && slot.subject === randomSubject
        );
      }).length;

      const subjectLectureCount = subjects.find(
        s => s.alias === randomSubject
      ).lecture;

      // TODO: we get stuck in this since naive way so impossible to fill all the time slot
      // if more than the total lecture for week
      ++loopCount;
      if (subWeekCount >= subjectLectureCount) {
        if (loopCount >= 100) break;
        else continue;
      }

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

  mainRoutine[semester.number] = weekRoutine.reduce(
    (acc, routine, idx) => ({
      ...acc,
      [weekDays[idx]]: routine,
    }),
    {}
  );
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
