import React, { useState, useEffect } from 'react';
import UseFetch from '../UseFetch/index';
import StudentProfile from '../StudentProfile/index';

const SearchBar = () => {
  const [students] = UseFetch('https://api.hatchways.io/assessment/students');
  const [input, setInput] = useState('');
  const [tagSearch, setTagSearch] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);

  useEffect(() => {
    const filteredStudentsByNameAndTag = students.filter(student => {
      const firstName = student.firstName.toLowerCase();
      const lastName = student.lastName.toLowerCase();
      const fullName = firstName + ' ' + lastName;

      if (input === '' && tagSearch === '') {
        return student;
      } else if (fullName.includes(input.toLowerCase())) {
        if (tagSearch === '') {
          return student;
        } else if (
          student.tags.filter(tag => tag.toLowerCase().includes(tagSearch))
            .length >= 1
        ) {
          return student;
        }
      }
    });

    setFilterStudents(filteredStudentsByNameAndTag);
  }, [students, input, tagSearch]);

  return (
    <>
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
      </div>
      <div>
        {filterStudents.map(student => (
          <StudentProfile key={student.id} student={student} />
        ))}
      </div>
    </>
  );
};

export default SearchBar;
