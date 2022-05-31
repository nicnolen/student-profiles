import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import UseFetch from '../UseFetch/index';
import Tag from '../Tag/input';

const SearchBar = () => {
  const [students] = UseFetch('https://api.hatchways.io/assessment/students');
  const [filterStudents, setFilterStudents] = useState([]);
  const [input, setInput] = useState('');
  const [tagSearch, setTagSearch] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  console.log(students)
  useEffect(() => {
    // Array.filter() is perfect for this situation //
    const filteredStudentsByNameAndTag = students.filter(student => {
      const firstName = student.firstName.toLowerCase();
      const lastName = student.lastName.toLowerCase();
      const fullName = firstName + ' ' + lastName;
      const studentTags = [];

      // if (tags in student) {
      //   const filterTags = student.tags.filter(tag => {
      //     // console.log(tags);
      //     tag.includes(tagSearch.toLowerCase());
      //   });
      //   studentTags.push(filterTags);
      // }

      return fullName.includes(input.toLowerCase());
    });

    setFilterStudents(filteredStudentsByNameAndTag);
  }, [students, input, tags, tagSearch]);

  // const filterTags = event => {
  //   // setTagSearch(event.target.value);
  //   if (students.tags) {
  //     const filteredStudentTags = students.filter(student => {
  //       return student.tags.includes(tagSearch);
  //     });
  //     // console.log(filteredStudentTags());
  //     return filteredStudentTags;
  //   }
  // };
  // console.log(filterTags);

  const onKeyPress = (studentId, event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      // Add the value to the tags array
      const newTagArr = [...tags, { studentId, value: event.target.value }];

      setTags(newTagArr);
      // console.log(newTagArr);
      // Clear the input
      setTagInput('');

      // handleTagAdded(tagInput, studentId);
    }
  };

  console.log(allGrades);
  const toggle= (studentId) => {
    if (allGrades.includes(studentId)) {
     setAllGrades(allGrades.filter(id => id !== studentId))
    } else {
     let newOpen = [...allGrades]
     newOpen.push(studentId)
     setAllGrades(newOpen)
    }
  }

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
          setTagSearch(event.target.value);
        }}
        className="tagSearchInput"
      />
      {filterStudents && filterStudents.map(student => {
        return (
          <div className="container" key={student.id}>
            <figure className="studentPic">
              <img
                src={student.pic}
                alt={student.firstName + ' ' + student.lastName}
              />
            </figure>
            <div className="studentProfile">
              <div className="studentNameContainer">
                <h1 className="studentName">
                  {student.firstName.toUpperCase()}{' '}
                  {student.lastName.toUpperCase()}
                </h1>
              </div>

              <div className="studentTextContainer">
                <p className="studentInfo">Email: {student.email}</p>
                <p className="studentInfo">Company: {student.company}</p>
                <p className="studentInfo">Skill: {student.skill}</p>
                <p className="studentInfo">
                  Average:
                  {' ' +
                    student.grades.reduce((a, b) => parseInt(b) + a, 0) /
                      student.grades.map(grade => grade).length +
                    '%'}
                  {allGrades.includes(student.id) ? (
                    <ul className="studentGrades">
                      {student.grades.map((grade, index) => (
                        <li  key={grade.id}>
                          Test {index + 1}: {grade}%
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </p>
                <Tag
                  onChange={event => setTagInput(event.target.value)}
                  onKeyPress={onKeyPress}
                  tags={tags}
                  tagInput={tagInput}
                  studentId={student.id}
                />
              </div>
            </div>
            <div className="right">
              <button
                onClick={() => toggle(student.id)}
                className="toggleGrades">
                {allGrades.includes(student.id) ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchBar;
