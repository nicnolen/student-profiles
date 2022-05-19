import React, { useState, useEffect } from 'react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const studentsUrl = 'https://api.hatchways.io/assessment/students';

  const fetchData = async () => {
    try {
      const response = await fetch(studentsUrl);
      if (!response.ok) {
        throw new Error('Data was unable to be fetched.');
      }
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      setStudents({ errorMessage: error.toString() });
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(students);

  // // Extract the grades array from the students array object
  // const grades = students.map(student => {
  //   return student.grades;
  // });
  // console.log(grades);

  // let studentGradesSum = 0;
  // const sumGrades = () => {
  //   let gradeAverage = 0;

  //   for (let i = 0; i < grades.length; i++) {
  //     const studentGrades = grades[i];
  //     console.log(studentGrades);
  //     for (let grade of studentGrades) {
  //       console.log(grade);
  //     }

  //     console.log(studentGradesSum);
  //   }
  // };

  // console.log(sumGrades());

  // console.log(addScores)

  // // add up all the grades, starting from 0

  // const averageGrades = gradesSum / grades.length;
  // console.log(averageGrades);

  return (
    <div>
      {students.map(student => {
        return (
          <ul key={student.id}>
            <li>{student.pic}</li>
            <li>
              {student.firstName} {student.lastName}
            </li>
            <li>{student.email}</li>
            <li>{student.company}</li>
            <li>{student.skill}</li>
            <li>{student.grades}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Students;
