import React from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>
        <p className="text-gray-700 mb-6 text-center">Choose your account type:</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate("/user-login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            User
          </button>
          <button
            onClick={() => navigate("/seller-login")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Seller
          </button>
          <button
            onClick={() => navigate("/admin-login")}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
