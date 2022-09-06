const fs = require('fs');

const teacher_file = fs.readFileSync('./data/teacher.json');
const teacher_data = JSON.parse(teacher_file);
const time = [
  '7:00-8:30',
  '8:30-10:00',
  '10:40-12:10',
  '12:10-2:20',
  '2:20-3:50',
  '3:50-5:50',
];

let routine_final = [];

const day_generator = () => {
  let routine = [];
  let count = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      routine[i][j] = count++;
    }
  }
  console.log(routine);
  // return routine;
};

const check_teacher_in_column = (teacher, routine) => {
  let count = routine.filter(x => x == teacher.teacher_name).length;
  if (count < teacher.workload) {
    return true;
  } else {
    return false;
  }
};

// const generate_timetable = () => {
//   for (let i = 0; i < 6; i++) {
//     routine_final.push(day_generator());
//   }
// };

// const formatter = () => {
//   let routine_a = [];
//   routine_final.map(items => {
//     let routine_day = {};
//     items.map((item, index) => {
//       routine_day[time[index]] = item;
//     });
//     routine_a.push(routine_day);
//   });

//   routine_final = routine_a;
// };

// const write_to_json = () => {
//   const data = JSON.stringify(day_generator());
//   fs.writeFileSync('./result/main_timetable.json', data);
// };

// write_to_json();
day_generator();
