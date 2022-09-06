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
}

class Subject {
  constructor(name, credit, lecture, practical, alias) {
    this.name = name;
    this.credit = credit;
    this.lecture = lecture;
    this.practical = practical;
    this.alias = alias;
  }

  isEqual(obj) {
    return !!(this.alias === obj.alias);
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
    this.assignedTeacher = this.assignedTeacher;
  }

  isEqual(obj) {
    return !!(this.number === obj.number);
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
    return subjects.find(sub => sub.alias === s);
  });

  return new Teacher(t.name, t.workload, t.teacher_initial, subject_map);
});

const semesters = semester_data.map(sem => {
  const subject_map = sem.subjects.map(s => {
    return subjects.find(sub => sub.isEqual(s));
  });

  return new Semester(sem.semester, subject_map);
});

let main_routine = [];

const day_generator = sem => {
  let routine = [];
  let time_slot_count = 0;
  while (time_slot_count <= 3) {
    const current_time_slot = time_slots[time_slot_count];

    let random_subject =
      sem.subjects[Math.floor(Math.random() * (sem.subjects.length - 0))];

    if (routine.find(s => s.isEqual(random_subject))) {
      continue;
    }

    let week_routine = [];
    main_routine.forEach(m_routine => {
      if (sem.isEqual(m_routine.semester)) {
        week_routine = m_routine.routine;
      }
    });

    const sub_week_count = week_routine.filter(day => {
      return !!day.find(sub => sub.isEqual(random_subject));
    }).length;

    if (sub_week_count <= 4) {
      routine.push(new Slot(null, random_subject, current_time_slot));
      ++time_slot_count;
    }
  }

  return routine;
};

semesters.forEach(sem => {
  let week_routine = [];
  for (let i = 0; i < 6; i++) {
    week_routine.push(day_generator(sem));
  }

  main_routine.push({semester: sem, routine: week_routine});
});

const write_to_json = () => {
  const data = JSON.stringify(main_routine);
  fs.writeFileSync('./result/teacher_timetable.json', data);
};

write_to_json();
