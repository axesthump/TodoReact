import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearch, term }) => {
  return (
    <input type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={e => {
        onSearch(e.target.value)
      }} />
  );
};

export default SearchPanel;
