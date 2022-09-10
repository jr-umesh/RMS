/**
 * 1. assign teacher to semester for each subject. (take odd or even only)
 * 2. create initial routine for each semester.
 */

const fs = require('fs');

const { loadData } = require('./lib/loadData');
const { assignTeacher } = require('./lib/assignTeacher');
const { Semester } = require('./lib/Semester');
const { Slot } = require('./lib/Slot');
const { Subject } = require('./lib/Subject');
const { Teacher } = require('./lib/Teacher');
const { Time } = require('./lib/Time');

const { semesters, subjects, teachers, timeSlots } = loadData();

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

const oddSem = assignTeacher(
  semesters.filter(sem => sem.number % 2 !== 0),
  subjects
);

const isSafeSlot = (
  subjects,
  subject,
  dayRoutine,
  weekRoutine,
  mainRoutine,
  currentWeekDay,
  currentTimeSlot
) => {

  let isSafe = true;
  if (dayRoutine.find(slot => slot.subject === subject)) isSafe = false;

  let isTeacherReserve = false;
  Object.keys(mainRoutine).forEach(key => {
    const tempSlot = mainRoutine[key][currentWeekDay].find(slot => {
      return slot.time.isEqual(currentTimeSlot)
    })

    if (tempSlot === undefined) return;

    if (tempSlot.teacher === semesters.assignedTeacher[subject]) {
      isTeacherReserve = true;
    }

    if (isTeacherReserve) isSafe = false;

    const subWeekCount = weekRoutine.filter(day => {
      return !!day.find(slot => slot.subject === subject)
    }).length;

    const subjectLectureCount = subjects.find(s => s.alias === subject).lecture;

    if (subWeekCount > subjectLectureCount) isSafe = false;

    return isSafe;
  })
}

const generateRoutine = (semesters, subjects, timeSlots) => {
  semesters.forEach(semester => {
    const weekRoutine = [];

    for (let i = 0; i< 6; i++) {
      let dayRoutine = [];

      for (let j = 0; j < timeSlots.length; j++) {
        semesters.subjects.forEach(semSubject => {
          dayRoutine.push(
            new Slot(
              semester.assignedTeacher[semSubject],
              semSubject,
              timeSlots[j]
            )
          )

        })
      }
    }
  })
}

