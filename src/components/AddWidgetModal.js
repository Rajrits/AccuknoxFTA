import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, toggleAddWidgetModal, setSelectedCategory } from '../store/dashboardSlice';
import { FaTimes } from 'react-icons/fa';
import './AddWidgetModal.css';

const AddWidgetModal = () => {
  const dispatch = useDispatch();
  const { showAddWidgetModal, selectedCategory, categories } = useSelector(state => state.dashboard);
  
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleClose = () => {
    dispatch(toggleAddWidgetModal(false));
    dispatch(setSelectedCategory(null));
    setWidgetName('');
    setWidgetText('');
    setSelectedCategories([]);
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!widgetName.trim() || !widgetText.trim() || selectedCategories.length === 0) {
      return;
    }

    const newWidget = {
      name: widgetName.trim(),
      text: widgetText.trim(),
      content: widgetText.trim()
    };

    selectedCategories.forEach(categoryId => {
      dispatch(addWidget({ categoryId, widget: newWidget }));
    });

    handleClose();
  };

  if (!showAddWidgetModal) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Widget</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="widget-name" className="form-label">
              Widget name
            </label>
            <input
              type="text"
              id="widget-name"
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              className="form-input"
              placeholder="Enter widget name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="widget-text" className="form-label">
              Widget text
            </label>
            <textarea
              id="widget-text"
              value={widgetText}
              onChange={(e) => setWidgetText(e.target.value)}
              className="form-textarea"
              placeholder="Enter widget text"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Category</label>
            <div className="category-checkboxes">
              {categories.map(category => (
                <label key={category.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">
                    {category.name}
                    {category.widgets.length > 0 && (
                      <span className="widget-count"> ({category.widgets.length})</span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWidgetModal;
