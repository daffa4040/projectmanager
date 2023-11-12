import React, { useState } from 'react';

const SearchTeamForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search Team:
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchTeamForm;
