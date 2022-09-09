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

module.exports = {Subject};
