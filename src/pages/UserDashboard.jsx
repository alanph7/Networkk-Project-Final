import React, { useState, useEffect } from 'react';
import { DollarSign, Users, List, Search, User2Icon, Wallet } from 'lucide-react';
import UserNavbar from '../components/UserNavbar';

import { useDashboard } from '../context/DashboardContext';
import StatCard from '../components/StatCard';

const UserDashboard = () => {
  const [activePage, setActivePage] = useState('overview');
  const { dashboardData } = useDashboard();
  const { stats, salesData, trafficSource } = dashboardData;
  
  // For demo purposes, assuming the user data is fetched from login
  const [user, setUser] = useState(null); // Replace with actual user data fetch logic
  const COLORS = ['#4c51bf', '#f6ad55', '#38b2ac'];

  useEffect(() => {
    // Simulate fetching user data after login
    const fetchedUser = { name: "Alan" }; // Replace with actual fetch logic
    setUser(fetchedUser);
  }, []);

  // Ongoing tasks example data
  const ongoingTasks = [
    { id: 1, taskName: "House Renovation", status: "In Progress", progress: 60 },
    { id: 2, taskName: "Door Fix", status: "In Progress", progress: 30 },
    { id: 3, taskName: "Plumbing", status: "Completed", progress: 100 },
  ];

  // Filter completed tasks to display the last completed task for review
  const completedTasks = ongoingTasks.filter(task => task.status === "Completed");
  const lastCompletedTask = completedTasks.length > 0 ? completedTasks[completedTasks.length - 1] : null;

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleSubmitReview = (event) => {
    event.preventDefault();
    // Handle the review submission logic (e.g., send it to the server)
    console.log("Review Submitted:", review, "Rating:", rating);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <UserNavbar />

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
            {user && (
              <div className="text-gray-700 font-medium text-lg">
                Welcome back, {user.name+"!"}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="MEMBER SINCE"
              value="2 Years"
              icon={User2Icon}
              
              iconBgColor="bg-orange-500"
            />
            <StatCard
              title="BOOKINGS"
              value={stats.customers.value}
              icon={Users}
              change={stats.customers.change}
              iconBgColor="bg-red-500"
            />
            <StatCard
              title="WALLET"
              value={`${stats.taskProgress.value}`}
              icon={Wallet}
              change={stats.taskProgress.change}
              iconBgColor="bg-green-500"
            />
          </div>

          {/* Ongoing Work Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-6">Ongoing Work</h2>
            <div className="space-y-4">
              {ongoingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold">
                      <List size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{task.taskName}</h3>
                      <p className="text-sm text-gray-500">Status: {task.status}</p>
                    </div>
                  </div>

                  {/* Progress bar for in-progress tasks */}
                  {task.status === 'In Progress' && (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-24 h-2 bg-gray-300 rounded-full relative">
                        <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500">{task.progress}% Completed</span>
                    </div>
                  )}

                  {/* Show a "Completed" label for completed tasks */}
                  {task.status === 'Completed' && (
                    <div className="flex items-center text-sm text-green-500 font-medium">
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Last Completed Work for Review Section */}
          {lastCompletedTask && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-4">Leave a Review for Recent Work: {lastCompletedTask.taskName}</h2>
              <p className="text-sm text-gray-500 mb-4">This task has been marked as completed. Please leave your rating and review below.</p>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label htmlFor="rating" className="block text-sm font-medium mb-2">Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={handleRatingChange}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value} {value === 1 ? "Star" : "Stars"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="review" className="block text-sm font-medium mb-2">Your Review</label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={handleReviewChange}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                    rows="4"
                    placeholder="Write your review here..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-md"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {/* Debugging Message */}
          {!lastCompletedTask && (
            <div className="bg-red-100 p-4 text-red-700 rounded-md">
              <p>No completed tasks found. Please check your tasks and ensure there are completed tasks to review.</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;








 {/* 
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

            
                <div className="flex flex-col gap-4">
                  {trafficSource.map((item) => (
                    <div key={item.source} className="flex items-center gap-2">
                    
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  
                      <div className="text-sm text-gray-600">{item.source}</div>
                      <div className="text-sm font-medium">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div> */}
