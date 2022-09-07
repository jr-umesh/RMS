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

module.exports = {Teacher};
