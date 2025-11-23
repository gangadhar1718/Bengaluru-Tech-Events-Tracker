import React from 'react';
import '../styles/FilterControls.css';

const FilterControls = ({
  searchText,
  statusFilter,
  categoryFilter,
  sortOption,
  onSearchChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onSortChange
}) => {
  return (
    <div className="filter-controls glass-card">
      <div className="filter-row">
        <div className="filter-group search-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or category..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="None">None</option>
            <option value="Registered">Registered</option>
            <option value="Waiting">Waiting</option>
            <option value="Confirmed">Confirmed</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Cloud">Cloud</option>
            <option value="AI">AI</option>
            <option value="DevOps">DevOps</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-option">Sort By</label>
          <select
            id="sort-option"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="filter-select"
          >
            <option value="soonest">Soonest Date First</option>
            <option value="latest">Latest Date First</option>
            <option value="name">Name A-Z</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
