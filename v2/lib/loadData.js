const fs = require('fs');

const {Semester} = require('./Semester');
const {Subject} = require('./Subject');
const {Department} = require('./Department');

exports.loadData = () => {
  const teachersFile = fs.readFileSync('../data/teachers.json');
  const semestersFile = fs.readFileSync('../data/semesters.json');
  const subjectsFile = fs.readFileSync('../data/subjects.json');
  const departmentsFile = fs.readFileSync('../data/departments.json');

  const teachersData = JSON.parse(teachersFile);
  const semestersData = JSON.parse(semestersFile);
  const subjectsData = JSON.parse(subjectsFile);
  const departmentsData = JSON.parse(departmentsFile);

  const departments = departmentsData.map(department => {
    const subjects = subjectsData[department].map(subject => {
      return new Subject(
        subject.name,
        subject.credit,
        subject.lecture,
        subject.practical,
        subject.alias
      );
    });

    const semesters = semestersData[department].map(semester => {
      return new Semester(semester.semester, semester.subjects);
    });

    return new Department(department, subjects, semesters);
  });

  const teachers = teachersData.map(teacher => {
    return {
      initial: teacher.teacher_initial,
      subjects: teacher.subject,
    };
  });

  departments.forEach(department => {
    department.subjects.forEach(subject => {
      const teacherArray = teachers.filter(teacher => {
        return !!teacher.subjects.find(s => s === subject.alias);
      });

      const randomTeacher =
        teacherArray[Math.floor(Math.random() * teacherArray.length)];

      department.assignTeacher(subject.alias, randomTeacher.initial);
    });
  });

  return {departments};
};
