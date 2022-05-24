import React from 'react';

const Tag = ({ studentId, tag, tags, onChange, onKeyPress }) => {
  console.log(tag);
  return (
    <div>
      {tags.length > 0 && (
        <div>
          {tags
            .filter(t => t.studentId === studentId)
            .map(tag => (
              <span key={tag.value} className="tag">
                {tag.value}{' '}
              </span>
            ))}
        </div>
      )}
      <input
        type="text"
        value={tag}
        placeholder="Add a tag"
        key="tag-input"
        onKeyPress={onKeyPress.bind(tags, studentId)}
        onChange={onChange}
      />
    </div>
  );
};

export default Tag;
