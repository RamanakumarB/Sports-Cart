// src/components/Filter.js
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onFilterChange({ searchTerm: e.target.value, category });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({ searchTerm, category: e.target.value });
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="Football">Football</option>
        <option value="Basketball">Basketball</option>
        <option value="Tennis">Tennis</option>
        {/* Add more categories here */}
      </select>
    </div>
  );
};

export default Filter;
