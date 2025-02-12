import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userEmail, userType } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    setIsAuthenticated(false);
    navigate('/admin-auth');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/admin-dash" className="text-2xl font-bold text-indigo-600">Admin Panel</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/gigs-request" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Service Requests
              </Link>
              {/* Add more admin-specific links here */}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated && userType === 'admin' ? (
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/admin-auth" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Admin Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/gigs-request" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              Service Requests
            </Link>
            {/* Add more mobile admin-specific links here */}
            {isAuthenticated && userType === 'admin' ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/admin-auth" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                Admin Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;