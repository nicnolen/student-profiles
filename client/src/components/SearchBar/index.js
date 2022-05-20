import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [students, setStudents] = useState([]);
  const [input, setInput] = useState('');
  const [allGrades, setAllGrades] = useState(false);
  const [tags, setTags] = React.useState([]);
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

  // get the grades array
  const studentGrades = students.map(student => {
    return student.grades;
  });

  console.log(studentGrades);

  //! FIX THESE
  const studentGradeAverage = () => {
    let gradeAverage = 0;
    // get the grades from each array
    for (const grade of studentGrades) {
      const studentAverage =
        grade.reduce((a, b) => a + parseInt(b), 0) / grade.length;
      gradeAverage += studentAverage;
    }
    return gradeAverage;
  };

  const studentGradesArr = () => {
    let grades = [];

    for (let i = 0; i < studentGrades.length; i++) {
      const gradesArr = studentGrades[i];
      console.log(gradesArr);
      for (let i = 0; i < gradesArr.length; i++) {
        const grade = gradesArr[i];
        // console.log(grade)
        grades.push(grade);
      }
    }
    console.log(grades);
    return grades;
  };

  // console.log(studentGradesArr());

  // const studentGradeAverage = () => {
  //   let gradeAverage = [];
  //   // get the grades from each array
  //   for (const grade of studentGrades) {
  //     const studentAverage =
  //       grade.reduce((a, b) => a + parseInt(b), 0) / grade.length;
  //     gradeAverage.push(studentAverage);
  //   }
  //   return gradeAverage;
  // };

  console.log(studentGradeAverage());

  const toggle = () => {
    setAllGrades(!allGrades);
  };

  const addTags = event => {
    if (event.key !== 'Enter') return;
    // Get the value of the input
    const value = event.target.value;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setTags([...tags, value]);
    // Clear the input
    event.target.value = '';
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        onChange={event => {
          setInput(event.target.value);
        }}
        className="nameSearchInput"
      />
      <input
        type="text"
        placeholder="Search by tag"
        onChange={event => {
          setInput(event.target.value);
        }}
        className="tagSearchInput"
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
                    {student.firstName.toUpperCase()}{' '}
                    {student.lastName.toUpperCase()}
                  </li>
                  <li className="studentInfo">{student.email}</li>
                  <li className="studentInfo">{student.company}</li>
                  <li className="studentInfo">{student.skill}</li>
                  <li className="studentInfo studentGrades">
                    {allGrades ? studentGradesArr() : studentGradeAverage()}
                  </li>
                  <li>
                    {tags.map((tag, index) => (
                      <div key={index}>
                        <span>{tag}</span>
                      </div>
                    ))}

                    <input
                      type="text"
                      placeholder="Add a tag"
                      onKeyUp={event => addTags(event)}
                      className="tagInput"
                    />
                  </li>
                </ul>
              </div>

              <button onClick={toggle} className="toggle">
                {allGrades ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default SearchBar;
