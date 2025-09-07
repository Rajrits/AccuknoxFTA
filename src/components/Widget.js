import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/dashboardSlice';
import { FaTimes } from 'react-icons/fa';
import './Widget.css';

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'chart':
        return renderChart(widget);
      case 'text':
      default:
        return (
          <div className="widget-text-content">
            <p>{widget.content || widget.text}</p>
          </div>
        );
    }
  };

  const renderChart = (widget) => {
    if (widget.chartType === 'circular') {
      return (
        <div className="circular-chart">
          <div className="chart-circle" style={{ backgroundColor: widget.color }}>
            <span className="chart-number">{widget.text}</span>
          </div>
          <p className="chart-label">Connected EC2</p>
        </div>
      );
    }
    
    if (widget.chartType === 'donut') {
      return (
        <div className="donut-chart">
          <div className="donut-center">
            <span className="donut-percentage">{widget.percentage}%</span>
          </div>
          <div className="donut-ring" style={{ borderColor: widget.color }}>
            <div className="donut-segment" style={{ borderColor: widget.color }}></div>
          </div>
          <p className="chart-label">Security Issues</p>
        </div>
      );
    }
    
    if (widget.chartType === 'bar') {
      return (
        <div className="bar-chart">
          <div className="bar-container">
            <div className="bar" style={{ backgroundColor: '#ef4444', width: '60%' }}></div>
            <div className="bar" style={{ backgroundColor: '#f59e0b', width: '40%' }}></div>
            <div className="bar" style={{ backgroundColor: '#eab308', width: '30%' }}></div>
            <div className="bar" style={{ backgroundColor: '#10b981', width: '20%' }}></div>
          </div>
          <p className="chart-label">{widget.name}</p>
        </div>
      );
    }
    
    return <div className="widget-text-content"><p>{widget.text}</p></div>;
  };

  return (
    <div className="widget">
      <button className="widget-remove-btn" onClick={handleRemove}>
        <FaTimes />
      </button>
      <div className="widget-header">
        <h3 className="widget-title">{widget.name}</h3>
      </div>
      <div className="widget-content">
        {renderWidgetContent()}
      </div>
    </div>
  );
};

export default Widget;
