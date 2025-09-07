import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/dashboardSlice';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector(state => state.dashboard);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search widgets..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
