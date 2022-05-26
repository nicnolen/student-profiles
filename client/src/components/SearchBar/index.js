import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Tag from '../Tag/input';

const SearchBar = () => {
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);
  const [input, setInput] = useState('');
  const [tagSearch, setTagSearch] = useState([]);
  const [allGrades, setAllGrades] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

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

  const handleTagAdded = (tag, studentId) => {
    setStudents(prevStudents => {
      studentId = studentId - 1;
      // We copy object here as the student we're accessing
      // is an object, and objects are always stored by reference.
      // If we didn't do this, we would be directly mutating
      // the student at the index, which is bad practice
      const changedStudent = { ...prevStudents[studentId] };
      // console.log(changedStudent);
      // Check if student has 'tags` and add it if it doesn't.
      if (!(tags in changedStudent)) {
        changedStudent.tags = [];
      }

      // Add new tag to array
      changedStudent.tags.push(tag);
      // console.log(changedStudent.tags);

      // Copy array so we can change it
      const mutableStudents = [...prevStudents];
      mutableStudents[studentId] = changedStudent;
      // console.log(mutableStudents[studentId]);

      // The state will be set to this array with the student
      // at the index we were given changed
      return mutableStudents;
    });
  };

  useEffect(() => {
    // Array.filter() is perfect for this situation //
    const filteredStudentsByNameAndTag = students.filter(student => {
      const firstName = student.firstName.toLowerCase();
      const lastName = student.lastName.toLowerCase();
      const fullName = firstName + ' ' + lastName;
      const studentTags = [];

      if (tags in student) {
        const filterTags = student.tags.filter(tag => {
          // console.log(tags);
          tag.includes(tagSearch.toLowerCase());
        });
        studentTags.push(filterTags);
      }

      return fullName.includes(input.toLowerCase());
    });

    setFilterStudents(filteredStudentsByNameAndTag);
  }, [students, input, tags, tagSearch]);

  // console.log(filterStudents);

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
      console.log(newTagArr);
      // Clear the input
      setTagInput('');

      // handleTagAdded(tagInput, studentId);
    }
  };

  const toggle = () => {
    setAllGrades(!allGrades);
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
          setTagSearch(event.target.value);
        }}
        className="tagSearchInput"
      />
      {filterStudents.map(student => {
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
              <button onClick={toggle} className="toggleGrades">
                {allGrades ? (
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
