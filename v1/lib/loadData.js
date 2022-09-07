const fs = require('fs');

const {Semester} = require('./Semester');
const {Slot} = require('./Slot');
const {Subject} = require('./Subject');
const {Teacher} = require('./Teacher');
const {Time} = require('./Time');

exports.loadData = () => {
  const teacher_file = fs.readFileSync('./data/teacher.json');
  const semester_file = fs.readFileSync('./data/semester.json');
  const subject_file = fs.readFileSync('./data/subject.json');

  const teacher_data = JSON.parse(teacher_file);
  const semester_data = JSON.parse(semester_file);
  const subject_data = JSON.parse(subject_file);

  const time_slots = [
    '7:00-8:30',
    '8:30-10:00',
    '10:40-12:10',
    '12:10-1:20',
  ].map(t => {
    const time = t.split('-');
    return new Time(time[0], time[1]);
  });

  const subjects = subject_data.map(s => {
    return new Subject(s.name, s.credit, s.lecture, s.practical, s.alias);
  });

  const teachers = teacher_data.map(t => {
    const subject_map = t.subject.map(s => {
      return subjects.find(sub => sub.alias === s).alias;
    });

    return new Teacher(t.name, t.workload, t.teacher_initial, subject_map);
  });

  subjects.forEach(subject => {
    teachers.forEach(teacher => {
      teacher.subjects.forEach(t_subject => {
        if (t_subject === undefined || subject === undefined) return;

        if (t_subject === subject.alias) {
          subject.assignTeacher(teacher.initials);
        }
      });
    });
  });

  const semesters = semester_data.map(sem => {
    const subject_map = sem.subjects.map(s => {
      return subjects.find(sub => {
        return sub.alias === s;
      }).alias;
    });

    return new Semester(sem.semester, subject_map);
  });

  return {semesters, subjects, teachers, time_slots};
};
