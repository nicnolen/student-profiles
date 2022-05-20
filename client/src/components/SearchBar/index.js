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

  const toggle = () => {
    setAllGrades(!allGrades);
  };

  const addTags = event => {
    if (event.key !== 'Enter' && event.target.value !== '') return;
    // Add the value to the tags array
    setTags([...tags, event.target.value]);
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
            student.lastName.toLowerCase().includes(input.toLowerCase()) ||
            (student.firstName + ' ' + student.lastName)
              .toLowerCase()
              .includes(input.toLowerCase())
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
                <p className="studentName">
                  {student.firstName.toUpperCase()}{' '}
                  {student.lastName.toUpperCase()}
                </p>
                <p className="studentInfo">Email: {student.email}</p>
                <p className="studentInfo">Company: {student.company}</p>
                <p className="studentInfo">Skill: {student.skill}</p>
                <p className="studentInfo studentGrades">
                  {allGrades
                    ? student.grades.map((grade, index) => (
                        <li className="li" key={grade.id}>
                          Test {index + 1}: {grade}%
                        </li>
                      ))
                    : 'Average: ' +
                      student.grades.reduce((a, b) => parseInt(b) + a, 0) /
                        student.grades.map(grade => grade).length +
                      '%'}
                </p>
                <p className="studentTags">
                  {tags.map((tag, index) => (
                    <ul>
                      <li key={index}>
                        <span className="tag">{tag}</span>
                      </li>
                    </ul>
                  ))}

                  <input
                    type="text"
                    placeholder="Add a tag"
                    onKeyUp={event => addTags(event)}
                    className="tagInput"
                  />
                </p>
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
