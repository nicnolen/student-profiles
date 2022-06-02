import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import TagInput from '../TagInput/input';

const SearchBar = ({ student }) => {
  const [allGrades, setAllGrades] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const addTags = () => {
    student.tags.push(tagInput);
    setTagInput('');
  };
  const onKeyPress = event => (event.key === 'Enter' ? addTags() : '');

  const toggle = studentId => {
    if (allGrades.includes(studentId)) {
      setAllGrades(allGrades.filter(id => id !== studentId));
    } else {
      let newOpen = [...allGrades];
      newOpen.push(studentId);
      setAllGrades(newOpen);
    }
  };

  return (
    <div className="container">
      <figure className="studentPic">
        <img
          src={student.pic}
          alt={student.firstName + ' ' + student.lastName}
        />
      </figure>
      <div className="studentProfile">
        <div className="studentNameContainer">
          <h1 className="studentName">
            {student.firstName.toUpperCase()} {student.lastName.toUpperCase()}
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
                  <li key={grade.id}>
                    Test {index + 1}: {grade}%
                  </li>
                ))}
              </ul>
            ) : null}
          </p>

          <div className="studentInfo">
            {student.tags.length > 0 && (
              <ul className="tagContainer">
                {student.tags.map((tag, index) => (
                  <li key={index} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <TagInput
              onChange={event => setTagInput(event.target.value)}
              onKeyPress={onKeyPress}
              tags={tags}
              tagInput={tagInput}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <button onClick={() => toggle(student.id)} className="toggleGrades">
          {allGrades.includes(student.id) ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
