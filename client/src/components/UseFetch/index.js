import { useState, useEffect } from 'react';

const UseFetch = studentsUrl => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(studentsUrl)
      .then(res => res.json())
      .then(students => {
        let newData = [];
        students.students.map(student => {
          student.tags = [];
          newData.push(student);
        });
        setStudents(newData);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [studentsUrl]);

  return [students];
};

export default UseFetch;
