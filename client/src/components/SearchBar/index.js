import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [students, setStudents] = useState([]);
  const studentsUrl = 'https://api.hatchways.io/assessment/students';
  const [input, setInput] = useState('');

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

  return (
    <div>
      <input
        type="text"
        placeholder="Search Name"
        onChange={event => {
          setInput(event.target.value);
        }}
        className="nameInput"
      />
      {students
        /* eslint-disable-next-line */
        .filter(student => {
          if (input === '') {
            return student;
          } else if (
            student.firstName.toLowerCase().includes(input.toLowerCase()) ||
            student.lastName.toLowerCase().includes(input.toLowerCase())
          ) {
            return student;
          }
        })
        .map(student => {
          return (
            <div className="container" key={student.id}>
              <div className="studentPic">
                <img src={student.pic} alt="student profile" />
              </div>
              <div className="studentText">
                <ul>
                  <li className="studentName">
                    {student.firstName} {student.lastName}
                  </li>
                  <li className="studentInfo">{student.email}</li>
                  <li className="studentInfo">{student.company}</li>
                  <li className="studentInfo">{student.skill}</li>
                  <li className="studentInfo">{student.grades}</li>
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchBar;
