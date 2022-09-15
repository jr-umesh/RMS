class Department {
  constructor(name, subjects, semesters) {
    this.name = name;
    this.subjects = subjects;
    this.semesters = semesters;
  }

  assignTeacher(subjectAlias, teacherAlias) {
    const subIdx = this.subjects.findIndex(sub => sub.alias === subjectAlias);
    const tempSub = this.subjects[subIdx];
    tempSub.setTeacher(teacherAlias);
  }
}

module.exports = {Department};
