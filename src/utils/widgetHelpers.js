export const generateUniqueWidgetId = () => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 9);
  return `custom-widget-${timestamp}-${randomSuffix}`;
};

export const validateWidgetData = (widgetData) => {
  const errors = [];
  
  if (!widgetData.name || widgetData.name.trim().length < 2) {
    errors.push('Widget name must be at least 2 characters long');
  }
  
  if (!widgetData.text || widgetData.text.trim().length < 5) {
    errors.push('Widget text must be at least 5 characters long');
  }
  
  if (widgetData.name && widgetData.name.length > 50) {
    errors.push('Widget name cannot exceed 50 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeWidgetContent = (content) => {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
};

export const calculateWidgetComplexity = (widget) => {
  let complexity = 1;
  
  if (widget.type === 'chart') complexity += 2;
  if (widget.text && widget.text.length > 100) complexity += 1;
  if (widget.name && widget.name.split(' ').length > 3) complexity += 1;
  
  return Math.min(complexity, 5);
};

export const getWidgetColorScheme = (complexity) => {
  const colorSchemes = {
    1: { primary: '#10b981', secondary: '#d1fae5' },
    2: { primary: '#3b82f6', secondary: '#dbeafe' },
    3: { primary: '#8b5cf6', secondary: '#ede9fe' },
    4: { primary: '#f59e0b', secondary: '#fef3c7' },
    5: { primary: '#ef4444', secondary: '#fee2e2' }
  };
  
  return colorSchemes[complexity] || colorSchemes[1];
};
