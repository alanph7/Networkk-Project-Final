import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      budget: { value: 24000, change: 12 },
      customers: { value: 1600, change: -16 },
      taskProgress: { value: 75.5, change: 0 },
      totalProfit: { value: 15000, change: 0 }
    },
    salesData: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i).toLocaleString('default', { month: 'short' }),
      value: Math.floor(Math.random() * 20000)
    })),
    trafficSource: [
      { source: 'Carpentry', value: 45, color: 'bg-indigo-500' },
      { source: 'Plumbing', value: 30, color: 'bg-orange-500' },
      { source: 'Electrical', value: 25, color: 'bg-emerald-500' }
    ]
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          budget: {
            value: prev.stats.budget.value + Math.floor(Math.random() * 1000 - 500),
            change: Math.floor(Math.random() * 20 - 10)
          },
          customers: {
            value: prev.stats.customers.value + Math.floor(Math.random() * 100 - 50),
            change: Math.floor(Math.random() * 20 - 10)
          }
        },
        salesData: prev.salesData.map(item => ({
          ...item,
          value: item.value + Math.floor(Math.random() * 1000 - 500)
        }))
      }));
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const updateTrafficSource = (source, newValue) => {
    setDashboardData(prev => ({
      ...prev,
      trafficSource: prev.trafficSource.map(item =>
        item.source === source ? { ...item, value: newValue } : item
      )
    }));
  };

  return (
    <DashboardContext.Provider value={{ dashboardData, updateTrafficSource }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};