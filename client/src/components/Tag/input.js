import React from 'react';

const Tag = ({ studentId, tagInput, tags, onChange, onKeyPress }) => {
  return (
    <div>
      {tags.length > 0 && (
        <div className="tagContainer">
          {tags
            .filter(t => t.studentId === studentId)
            .map((tag, index) => (
              <span key={index} className="tag">
                {tag.value}
              </span>
            ))}
        </div>
      )}
      <input
        type="text"
        value={tagInput}
        placeholder="Add a tag"
        onKeyPress={onKeyPress.bind(tags, studentId)}
        onChange={onChange}
        className="studentInfo tagInput"
      />
    </div>
  );
};

export default Tag;
