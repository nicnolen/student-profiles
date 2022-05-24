import React from 'react';

const Tag = ({ tag, tags, onChange, onKeyPress }) => {
  return (
    <div>
      {tags.length > 0 && (
        <div>
          {tags.map(tag => (
            <span key={tag} className="tag">{tag.value}</span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={tag}
        placeholder="Add a tag"
        key="tag-input"
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </div>
  );
};

export default Tag;
