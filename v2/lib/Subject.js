class Subject {
  constructor(name, credit, lecture, practical, alias, teacher) {
    this.name = name;
    this.credit = credit;
    this.lecture = lecture;
    this.practical = practical;
    this.alias = alias;
    this.teacher = teacher;
  }

  isEqual(obj) {
    return !!(this.alias === obj.alias);
  }

  setTeacher(teacher) {
    this.teacher = teacher;
  }
}

module.exports = {Subject};
