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

module.exports = {Semester};
