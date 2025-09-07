import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleAddWidgetModal, setSelectedCategory } from '../store/dashboardSlice';
import Widget from './Widget';
import './Category.css';

const Category = ({ category }) => {
  const dispatch = useDispatch();

  const handleAddWidget = () => {
    dispatch(setSelectedCategory(category.id));
    dispatch(toggleAddWidgetModal(true));
  };

  return (
    <div className="category">
      <div className="category-header">
        <h2 className="category-title">{category.name}</h2>
      </div>
      <div className="category-widgets">
        {category.widgets.map(widget => (
          <Widget 
            key={widget.id} 
            widget={widget} 
            categoryId={category.id} 
          />
        ))}
        <div className="add-widget-card" onClick={handleAddWidget}>
          <div className="add-widget-content">
            <span className="add-widget-text">+ Add Widget</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
