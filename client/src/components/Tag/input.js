import React from 'react';

const Tag = ({ studentId, tag, tags, onChange, onKeyPress }) => {
  return (
    <div>
      {tags.length > 0 && (
        <div>
          {tags
            .filter(t => t.studentId === studentId)
            .map((tag, index) => (
              <span key={index} className="tag">
                {tag.value}{' '}
              </span>
            ))}
        </div>
      )}
      <input
        type="text"
        value={tag}
        placeholder="Add a tag"
        onKeyPress={onKeyPress.bind(tags, studentId)}
        onChange={onChange}
      />
    </div>
  );
};

export default Tag;
