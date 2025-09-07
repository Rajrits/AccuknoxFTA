export const initialDashboardData = {
  categories: [
    {
      id: 'cspm-dashboard',
      name: 'CSPM Dashboard',
      widgets: [
        {
          id: 'widget-1',
          name: 'Connected EC2',
          text: '1',
          type: 'chart',
          chartType: 'circular',
          color: '#3b82f6',
          complexity: 1,
          createdAt: '2024-01-15T10:30:00Z',
          version: 1
        },
        {
          id: 'widget-2',
          name: 'Security Issues',
          text: 'Critical (10), High (50), Medium (100), Low (1000), Passed (1000)',
          type: 'chart',
          chartType: 'donut',
          percentage: 58,
          color: '#10b981',
          complexity: 2,
          createdAt: '2024-01-14T14:20:00Z',
          version: 1
        },
        {
          id: 'widget-3',
          name: 'Integration Risk Assessment',
          text: 'Risk levels across different integrations',
          type: 'chart',
          chartType: 'bar',
          color: '#ef4444',
          complexity: 3,
          createdAt: '2024-01-13T09:15:00Z',
          version: 1
        }
      ]
    },
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'widget-4',
          name: 'Image Security Issues',
          text: 'Security assessment of container images',
          type: 'chart',
          chartType: 'bar',
          color: '#f59e0b',
          complexity: 2,
          createdAt: '2024-01-12T16:45:00Z',
          version: 1
        },
        {
          id: 'widget-5',
          name: 'Top 5 Misconfigured Specific Ports',
          text: 'Port configuration analysis',
          type: 'text',
          content: 'SSH (22), HTTP (80), HTTPS (443), MySQL (3306), Redis (6379)',
          complexity: 1,
          createdAt: '2024-01-11T11:30:00Z',
          version: 1
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'widget-6',
          name: 'Workload Media',
          text: 'Container workload analysis',
          type: 'text',
          content: 'Analyzing container workloads for security vulnerabilities',
          complexity: 1,
          createdAt: '2024-01-10T13:20:00Z',
          version: 1
        }
      ]
    }
  ]
};
