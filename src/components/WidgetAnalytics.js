import React from 'react';
import { useWidgetManager } from '../hooks/useWidgetManager';
import './WidgetAnalytics.css';

const WidgetAnalytics = ({ widgetId, isVisible }) => {
  const { getWidgetStats, updateAnalytics } = useWidgetManager();
  const stats = getWidgetStats(widgetId);

  React.useEffect(() => {
    if (isVisible && widgetId) {
      updateAnalytics(widgetId, 'views');
    }
  }, [isVisible, widgetId, updateAnalytics]);

  if (!isVisible) return null;

  return (
    <div className="widget-analytics">
      <div className="analytics-header">
        <span className="analytics-title">Widget Insights</span>
      </div>
      <div className="analytics-stats">
        <div className="stat-item">
          <span className="stat-label">Views</span>
          <span className="stat-value">{stats.views}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Edits</span>
          <span className="stat-value">{stats.edits}</span>
        </div>
        {stats.lastAccessed && (
          <div className="stat-item">
            <span className="stat-label">Last Access</span>
            <span className="stat-value">
              {new Date(stats.lastAccessed).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetAnalytics;
