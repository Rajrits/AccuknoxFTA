import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode, setSortBy, setFilterBy, clearWidgetHistory } from '../store/dashboardSlice';
import { FaTh, FaList, FaCompress, FaSort, FaFilter, FaTrash } from 'react-icons/fa';
import './DashboardControls.css';

const DashboardControls = () => {
  const dispatch = useDispatch();
  const { viewMode, sortBy, filterBy, widgetHistory } = useSelector(state => state.dashboard);

  const viewModes = [
    { id: 'grid', label: 'Grid', icon: FaTh },
    { id: 'list', label: 'List', icon: FaList },
    { id: 'compact', label: 'Compact', icon: FaCompress }
  ];

  const sortOptions = [
    { id: 'name', label: 'Name' },
    { id: 'date', label: 'Date Created' },
    { id: 'complexity', label: 'Complexity' }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Widgets' },
    { id: 'favorites', label: 'Favorites Only' },
    { id: 'recent', label: 'Recently Added' }
  ];

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear the widget history?')) {
      dispatch(clearWidgetHistory());
    }
  };

  return (
    <div className="dashboard-controls">
      <div className="controls-section">
        <h3 className="controls-title">View Options</h3>
        <div className="view-mode-buttons">
          {viewModes.map(mode => {
            const IconComponent = mode.icon;
            return (
              <button
                key={mode.id}
                className={`view-mode-btn ${viewMode === mode.id ? 'active' : ''}`}
                onClick={() => dispatch(setViewMode(mode.id))}
                title={mode.label}
              >
                <IconComponent />
                <span className="btn-label">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="controls-section">
        <h3 className="controls-title">Sort By</h3>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          {sortOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="controls-section">
        <h3 className="controls-title">Filter</h3>
        <select
          className="filter-select"
          value={filterBy}
          onChange={(e) => dispatch(setFilterBy(e.target.value))}
        >
          {filterOptions.map(option => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="controls-section">
        <h3 className="controls-title">History</h3>
        <div className="history-info">
          <span className="history-count">
            {widgetHistory.length} actions
          </span>
          <button
            className="clear-history-btn"
            onClick={handleClearHistory}
            disabled={widgetHistory.length === 0}
            title="Clear widget history"
          >
            <FaTrash />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardControls;
