import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth to get seller information


const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      budget: { value: 24000, change: 12 },
      customers: { value: 1600, change: -16 },
      taskProgress: { value: 75.5, change: 0 },
      totalProfit: { value: 15000, change: 0 }
    },
    salesData: [], // Initialize salesData as an empty array
    trafficSource: []
  });

  // Fetch cumulative revenue data
  useEffect(() => {
    const fetchCumulativeRevenue = async () => {
      try {
        const response = await fetch('http://localhost:3002/payments/cumulative-revenue');
        const data = await response.json(); // Fetch the data from the response

        
        if (data.success) {
          setDashboardData(prev => ({
            ...prev,
            salesData: data.data // Update salesData with fetched cumulative revenue
          }));
        }
      } catch (error) {
        console.error('Error fetching cumulative revenue:', error);
      }
    };

    fetchCumulativeRevenue();
  }, []);


  // Simulate real-time updates
  useEffect(() => {
    const fetchTrafficData = async () => {
      try {
        const response = await fetch('http://localhost:3002/bookings/categories');
        const data = await response.json();
        
        if (data.success) {
          const totalBookings = data.categories.reduce((sum, cat) => sum + cat.count, 0);
          const trafficSource = data.categories.map(cat => ({
            source: cat.category,
            value: Math.round((cat.count / totalBookings) * 100),
            color: getCategoryColor(cat.category)
          }));
          
          setDashboardData(prev => ({
            ...prev,
            trafficSource
          }));
        }
      } catch (error) {
        console.error('Error fetching traffic data:', error);
      }
    };

    // Initial fetch
    fetchTrafficData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchTrafficData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Carpentry': return 'bg-indigo-500';
      case 'Plumbing': return 'bg-orange-500';
      case 'Electrical': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

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
