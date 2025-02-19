import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, List, Search } from 'lucide-react';
import SellerNavbar from '../components/SellerNavbar';

import { useDashboard } from '../context/DashboardContext';
import { useAuth } from '../context/AuthContext';

import StatCard from '../components/StatCard';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('overview');
  const { dashboardData } = useDashboard();
  const { stats, salesData, trafficSource } = dashboardData;
  
  console.log('Traffic Source Data:', trafficSource);
  
  const { sellerName } = useAuth();

  const COLORS = ['#4c51bf', '#f6ad55', '#38b2ac'];




  return (
    <div className="flex h-screen bg-gray-100">
      <SellerNavbar />

      <div className="flex-1 overflow-auto ml-20">

        <div className="p-8">
          {/* Search bar and User greeting */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center w-full max-w-2xl bg-white rounded-lg shadow-sm border border-gray-300 p-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2 text-sm border-none outline-none"
              />
              <button className="text-gray-500 p-2">
                <Search size={20} />
              </button>
            </div>
            {sellerName && (
              <div className="text-gray-700 font-medium text-lg">
                Welcome back, {sellerName}!
              </div>
            )}

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="TOTAL REVENUE"
              value={stats.budget.value}
              icon={DollarSign}
              change={stats.budget.change}
              iconBgColor="bg-green-500"
            />
            <StatCard
              title="JOBS"
              value={stats.customers.value}
              icon={Users}
              change={stats.customers.change}
              iconBgColor="bg-red-500"
            />
            <StatCard
              title="TASK STATUS"
              value={`${stats.taskProgress.value}%`}
              icon={List}
              change={stats.taskProgress.change}
              iconBgColor="bg-orange-500"
            />
            <StatCard
              title="TIPS"
              value={stats.totalProfit.value}
              icon={DollarSign}
              change={stats.totalProfit.change}
              iconBgColor="bg-blue-800"
            />
          </div>

          {/* Bar Chart and Traffic Source side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Revenue Chart</h2>
                <button className="flex items-center text-gray-500">
                  <span className="mr-2">Sync</span>
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#357cd2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Traffic Source</h2>
              <div className="flex justify-between items-center">
                <div className="w-64 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSource}
                        dataKey="value"
                        nameKey="source"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={5}
                        labelLine={false}
                      >
                        {trafficSource.map((entry, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend for traffic sources */}
                <div className="flex flex-col gap-4">
                  {trafficSource.map((item) => (
                    <div key={item.source} className="flex items-center gap-2">
                      {/* Color dot */}
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      {/* Text */}
                      <div className="text-sm text-gray-600">{item.source}</div>
                      <div className="text-sm font-medium">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
