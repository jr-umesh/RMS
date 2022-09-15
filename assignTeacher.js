const fs = require('fs');

const teacher_file = fs.readFileSync('./data/teacher.json');
const semester_file = fs.readFileSync('./data/semester.json');
const subject_file = fs.readFileSync('./data/subject.json');

const teacher_data = JSON.parse(teacher_file);
const semester_data = JSON.parse(semester_file);
const subject_data = JSON.parse(subject_file);

class Teacher {
  constructor(
    name,
    workload,
    initials,
    subjects,
    isAbsent,
    isFullTime,
    inTime,
    outTime
  ) {
    this.name = name;
    this.workload = workload;
    this.initials = initials;
    this.subjects = subjects;
    this.isAbsent = isAbsent;
    this.isFullTime = isFullTime;
    this.inTime = inTime;
    this.outTime = outTime;
  }

  isEqual(obj) {
    return !!(this.name === obj.name);
  }
}

class Subject {
  constructor(name, credit, lecture, practical, alias, teachers) {
    this.name = name;
    this.credit = credit;
    this.lecture = lecture;
    this.practical = practical;
    this.alias = alias;
    this.teachers = teachers || [];
  }

  isEqual(obj) {
    return !!(this.alias === obj.alias);
  }

  assignTeacher(teacher) {
    this.teachers.push(teacher);
  }
}

class Time {
  constructor(from, till) {
    this.from = from;
    this.till = till;
  }
}

class Slot {
  constructor(teacher, subject, time) {
    this.teacher = teacher;
    this.subject = subject;
    this.time = time;
  }
}

class Semester {
  constructor(number, subjects, assignedTeacher) {
    this.number = number;
    this.subjects = subjects;
    this.assignedTeacher = this.assignedTeacher || [];
  }

  isEqual(obj) {
    const isTrue = !!(this.number === obj.number);
    return !!isTrue;
  }

  assignTeacherToSubject(teacher, subject) {
    this.assignedTeacher.push([teacher, subject]);
  }
}

const time_slots = ['7:00-8:30', '8:30-10:00', '10:40-12:10', '12:10-1:20'].map(
  t => {
    const time = t.split('-');
    return new Time(time[0], time[1]);
  }
);

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

function assignTeacherToSemester() {
  const assignedTeacherRefTable = [];

  semesters.forEach(semester => {
    semester.subjects.forEach(subjectAlias => {
      const subject = subjects.find(s => s.alias === subjectAlias);

      const randomTeacher =
        subject.teachers[
          Math.floor(Math.random() * (subject.teachers.length - 0))
        ];

      // teacher can only be assigned once
      let isExist = false;

      assignedTeacherRefTable.forEach(teacher => {
        if (randomTeacher === undefined || teacher === undefined) return;

        if (randomTeacher === teacher) {
          isExist = true;
        }
      });

      if (isExist) return;

      assignedTeacherRefTable.push(randomTeacher);

      semester.assignTeacherToSubject(randomTeacher, subject.alias);
    });
  });
}

assignTeacherToSemester();

fs.writeFileSync('./result/semester_v1.json', JSON.stringify(semesters));
