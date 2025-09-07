import { createSlice } from '@reduxjs/toolkit';
import { initialDashboardData } from '../data/dashboardData';
import { generateUniqueWidgetId, validateWidgetData, sanitizeWidgetContent } from '../utils/widgetHelpers';

const initialState = {
  categories: initialDashboardData.categories,
  searchTerm: '',
  showAddWidgetModal: false,
  selectedCategory: null,
  widgetHistory: [],
  favoriteWidgets: new Set(),
  viewMode: 'grid',
  sortBy: 'name',
  filterBy: 'all'
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      
      if (category) {
        const validation = validateWidgetData(widget);
        if (validation.isValid) {
          const newWidget = {
            ...widget,
            id: generateUniqueWidgetId(),
            name: sanitizeWidgetContent(widget.name),
            text: sanitizeWidgetContent(widget.text),
            type: 'text',
            createdAt: new Date().toISOString(),
            version: 1
          };
          
          category.widgets.push(newWidget);
          
          state.widgetHistory.unshift({
            id: generateUniqueWidgetId(),
            action: 'create',
            widgetData: newWidget,
            timestamp: new Date().toISOString()
          });
          
          if (state.widgetHistory.length > 50) {
            state.widgetHistory = state.widgetHistory.slice(0, 50);
          }
        }
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      
      if (category) {
        const widgetToRemove = category.widgets.find(w => w.id === widgetId);
        if (widgetToRemove) {
          state.widgetHistory.unshift({
            id: generateUniqueWidgetId(),
            action: 'delete',
            widgetData: widgetToRemove,
            timestamp: new Date().toISOString()
          });
          
          category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
          
          state.favoriteWidgets.delete(widgetId);
        }
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleAddWidgetModal: (state, action) => {
      state.showAddWidgetModal = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    toggleFavoriteWidget: (state, action) => {
      const widgetId = action.payload;
      if (state.favoriteWidgets.has(widgetId)) {
        state.favoriteWidgets.delete(widgetId);
      } else {
        state.favoriteWidgets.add(widgetId);
      }
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    clearWidgetHistory: (state) => {
      state.widgetHistory = [];
    }
  }
});

export const { 
  addWidget, 
  removeWidget, 
  setSearchTerm, 
  toggleAddWidgetModal, 
  setSelectedCategory,
  toggleFavoriteWidget,
  setViewMode,
  setSortBy,
  setFilterBy,
  clearWidgetHistory
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
