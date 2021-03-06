import React from "react";
export function Index({
  a,
  b,
  parseInt,
  allGrades,
  grade,
  index,
  event,
  setTagInput,
  onKeyPress,
  tags,
  tagInput,
  toggle,
  faMinus,
  faPlus
}) {
  return <div className="container" key={student.id}>
            <figure className="studentPic">
              <img src={student.pic} alt={student.firstName + ' ' + student.lastName} />
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
                  Average:
                  {' ' + student.grades.reduce((a, b) => parseInt(b) + a, 0) / student.grades.map(grade => grade).length + '%'}
                  {allGrades ? student.grades.map((grade, index) => <li className="li" key={student.id}>
                          Test {index + 1}: {grade}%
                        </li>) : null}
                </p>
                <Tag onChange={event => setTagInput(event.target.value)} onKeyPress={onKeyPress} tags={tags} tagInput={tagInput} studentId={student.id} />
              </div>
            </div>
            <div className="right">
              <button onClick={toggle} className="toggleGrades">
                {allGrades ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
              </button>
            </div>
          </div>;
}
