import React from 'react';

const Tag = ({ tagInput, tags, onChange, onKeyPress }) => {
  return (
    <>
      {tags.length > 0 && (
        <ul className="tagContainer">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        value={tagInput}
        placeholder="Add a tag"
        onKeyPress={onKeyPress}
        onChange={onChange}
        className="studentInfo tagInput"
      />
    </>
  );
};

export default Tag;
