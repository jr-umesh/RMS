const {generateEmptyRoutine} = require('./generateEmptyRoutine');

class Semester {
  constructor(semester, subjects, routine) {
    this.semester = semester;
    this.subjects = subjects;
    this.routine = routine || generateEmptyRoutine();
  }

  isEqual(obj) {
    const isTrue = !!(this.number === obj.number);
    return !!isTrue;
  }

  setRoutine(routine) {
    this.routine = routine;
  }
}

module.exports = {Semester};
