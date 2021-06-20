export class ClassRoom {
      constructor(name, teacher, students){
            this.id = 'RN-TN-01';
            this.name = name;
            this.teacher = teacher;
            this.students = students;
      }

      sortStudentByName(sort = 'asc') {
           this.students.sort(function(s1, s2) {
            var nameA = s1.getName.toUpperCase();
            var nameB = s2.getName.toUpperCase();

            if (nameA < nameB) {
              return sort === 'asc' ? -1 : 1;
            }
            if (nameA > nameB) {
              return sort === 'asc' ? 1 : -1;
            }
            return 0;
            })
      }

      groupStudentByAge(){
            const group = this.students.reduce((result, curValue) => {
                  (result[curValue['age']] = result[curValue['age']] || []).push(curValue);
                  return result
            }, {});
            return Object.entries(group).map(([k,v])=> {
                  return {age: k, students: v}
            })
      }

      get getListStudents() {
            return this.students;
      }

      bestAndWorstStudent(age) {
            var groupAge = this.groupStudentByAge();
            var studentsByAge = groupAge.find(item => item.age === age.toString());
            console.log(studentsByAge);
            const maxScore = studentsByAge?.students.reduce(function(prev, current){
                  return (parseFloat(prev.averageScore) > parseFloat(current.averageScore)) ? prev : current
            })
            const minScore = studentsByAge?.students.reduce(function(prev, current){
                  return (parseFloat(prev.averageScore) < parseFloat(current.averageScore)) ? prev : current
            })

           return({maxScore, minScore});
      }

      sortStudentByScore(sort = 'asc') {
            this.students.sort(function(s1, s2) {
                  if(sort === 'asc'){
                        return parseFloat(s1.averageScore) - parseFloat(s2.averageScore)
                  }else{
                        return parseFloat(s2.averageScore) - parseFloat(s1.averageScore)
                  }
             })
       }

       getTop3Student() {
             this.sortStudentByScore('desc');
             const top3 = this.students.slice(0, 3);
             return top3; 
       }

       averageScoreClassroom(){
            const average = this.students.reduce((result, curValue) => {
                  return (parseFloat(result) + parseFloat(curValue.averageScore));
             }, 0);

             return (average/(this.students.length)).toFixed(2);
       }

       getBestStudentWithProps({...rest}){
             const {name, age, address, score1, score2, score3} = rest || {};
             this.sortStudentByScore('desc');
             const filter = this.students.filter(student => {
                   if(!rest){
                         return student;
                   }else{
                       return (name ? student.name.toUpperCase().includes(name.toUpperCase()) : true) && 
                              (age ? student.age === parseInt(age) : true) &&
                              (address ? student.address.toUpperCase().includes(address.toUpperCase()) : true) &&
                              (score1 ? student.score1 === parseFloat(score1) : true) &&
                              (score2 ? student.score2 === parseFloat(score1) : true) &&
                              (score3 ? student.score3 === parseFloat(score1) : true);
                   }
             });

             const result = filter.length === 0 ? [] : filter[0];
             return result;
       }
 
}

export class Person {
      constructor(id, name, age, address){
            this.id = id;
            this.name = name;
            this.age = age;
            this.address = address;
      }
}

export class Student extends Person {
      constructor (id, name, age, address, score1, score2, score3){
            super(id, name, age, address);
            this.score1 = score1;
            this.score2 = score2;
            this.score3 = score3
      }

      get getName() {
            return this.name
      }

      get averageScore() {
            return ((this.score1 + this.score2 + this.score3) / 3).toFixed(2)
      }
}

export class Teacher extends Person {
      constructor (id, name, age, address, position){
            super(id, name, age, address);
            this.position = position;
      }
}

const student1 = new Student(1, 'Hoa', 18, 'abc', 5, 5, 5);
const student2 = new Student(2, 'Nam', 18, 'Han jo', 5, 5, 5);
const student3 = new Student(3, 'N1123am', 19, 'Han jo', 10, 10, 10);
const student4 = new Student(3, 'N1123am', 20, 'Han jo', 10, 10, 10);
const student5 = new Student(3, 'N1123am', 18, 'Han jo', 10, 10, 10);
const classRom = new ClassRoom('RN Training', 'kqb', [student3, student1, student2, student4, student5])
