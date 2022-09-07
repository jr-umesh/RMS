const fs = require('fs');

/**
 * assigns for each semesters teachers for each subjects taught
 * - only single teacher per subject per semester
 *
 * @returns Array[Semester] semesters
 */
exports.assignTeacher = () => {
  const {loadData} = require('./lib/loadData');
  const {semesters, subjects} = loadData();

  const assignedTeacherRefTable = [];

  semesters.forEach(semester => {
    if (semester.number % 2 === 0) return;

    semester.subjects.forEach(subjectAlias => {
      const subject = subjects.find(s => s.alias === subjectAlias);

      const randomTeacher =
        subject.teachers[
          Math.floor(Math.random() * (subject.teachers.length - 0))
        ];

      // teacher can only be assigned once
      let isExist = false;

      assignedTeacherRefTable.forEach(teacher => {
        if (randomTeacher === teacher) {
          isExist = true;
        }
      });

      if (isExist) return;

      assignedTeacherRefTable.push(randomTeacher);

      semester.assignTeacherToSubject(randomTeacher, subject.alias);
    });
  });

  return semesters;
};

fs.writeFileSync(
  './result/[ODD]semester_assigned_teacher.json',
  JSON.stringify(this.assignTeacher())
);
