import React from 'react';
import { useSelector } from 'react-redux';
import Category from './Category';
import './Dashboard.css';

const Dashboard = () => {
  const { categories, searchTerm } = useSelector(state => state.dashboard);

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (widget.content && widget.content.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.widgets.length > 0);

  return (
    <div className="dashboard">
      {filteredCategories.map(category => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Dashboard;
