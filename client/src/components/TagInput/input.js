import React from 'react';

const TagInput = ({ tagInput, tags, onChange, onKeyPress }) => {
  return (
    <>
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

export default TagInput;
