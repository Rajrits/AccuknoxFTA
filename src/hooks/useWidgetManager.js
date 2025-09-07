import { useState, useCallback, useMemo } from 'react';
import { generateUniqueWidgetId, validateWidgetData, sanitizeWidgetContent, calculateWidgetComplexity } from '../utils/widgetHelpers';

export const useWidgetManager = () => {
  const [widgetHistory, setWidgetHistory] = useState([]);
  const [favoriteWidgets, setFavoriteWidgets] = useState(new Set());
  const [widgetAnalytics, setWidgetAnalytics] = useState({});

  const addToHistory = useCallback((action, widgetData) => {
    const historyEntry = {
      id: generateUniqueWidgetId(),
      action,
      widgetData,
      timestamp: new Date().toISOString(),
      complexity: calculateWidgetComplexity(widgetData)
    };
    
    setWidgetHistory(prev => [historyEntry, ...prev.slice(0, 49)]);
  }, []);

  const toggleFavorite = useCallback((widgetId) => {
    setFavoriteWidgets(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(widgetId)) {
        newFavorites.delete(widgetId);
      } else {
        newFavorites.add(widgetId);
      }
      return newFavorites;
    });
  }, []);

  const updateAnalytics = useCallback((widgetId, action) => {
    setWidgetAnalytics(prev => ({
      ...prev,
      [widgetId]: {
        ...prev[widgetId],
        [action]: (prev[widgetId]?.[action] || 0) + 1,
        lastAccessed: new Date().toISOString()
      }
    }));
  }, []);

  const getWidgetStats = useCallback((widgetId) => {
    return widgetAnalytics[widgetId] || {
      views: 0,
      edits: 0,
      lastAccessed: null
    };
  }, [widgetAnalytics]);

  const getMostActiveWidgets = useMemo(() => {
    return Object.entries(widgetAnalytics)
      .sort(([,a], [,b]) => (b.views + b.edits) - (a.views + a.edits))
      .slice(0, 5)
      .map(([id, stats]) => ({ id, ...stats }));
  }, [widgetAnalytics]);

  const createAdvancedWidget = useCallback((widgetData) => {
    const validation = validateWidgetData(widgetData);
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    const sanitizedData = {
      ...widgetData,
      name: sanitizeWidgetContent(widgetData.name),
      text: sanitizeWidgetContent(widgetData.text),
      id: generateUniqueWidgetId(),
      complexity: calculateWidgetComplexity(widgetData),
      createdAt: new Date().toISOString(),
      version: 1
    };

    addToHistory('create', sanitizedData);
    return sanitizedData;
  }, [addToHistory]);

  return {
    widgetHistory,
    favoriteWidgets,
    widgetAnalytics,
    addToHistory,
    toggleFavorite,
    updateAnalytics,
    getWidgetStats,
    getMostActiveWidgets,
    createAdvancedWidget
  };
};
