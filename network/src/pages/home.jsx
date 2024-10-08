// create a home page with tailwind css

import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-gray-700">This is the home page of our website.</p>
      </div>
    </div>
  );
};

export default Home;
