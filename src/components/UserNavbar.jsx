import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, Home, Menu, X, LogOut, Search } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const UserNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div 
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } min-h-screen bg-white border-r border-gray-200 px-3 py-6 transition-all duration-300 relative`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -left-0 top-6 bg-white rounded-full p-1.5 border border-gray-200 z-10 hover:bg-gray-50"
      >
        {isExpanded ? (
          <X size={18} className="text-sky-600" />
        ) : (
          <Menu size={18} className="text-sky-600" />
        )}
      </button>

      <div className="space-y-4">
        {isExpanded ? (
          <h2 className="text-xl px-5 mb-6">
            <span className="font-bold">Networkk</span>{' '}
            <span className="font-light">Service</span>
          </h2>
        ) : (
          <h2 className="text-xl font-bold px-5 mb-6 text-gray-800">N</h2>
        )}
        
        <NavLink 
          to="/" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          title="Home"
        >
          <Home size={20} />
          {isExpanded && <span>Home</span>}
        </NavLink>

        <NavLink 
          to="/search" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          title="Search"
        >
          <Search size={20} />
          {isExpanded && <span>Search</span>}
        </NavLink>

        <NavLink 
          to="/user-details" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          title="Profile Details"
        >
          <User size={20} />
          {isExpanded && <span>Profile Details</span>}
        </NavLink>

        <NavLink 
          to="/user-booking-status" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          title="My Bookings"
        >
          <ShoppingBag size={20} />
          {isExpanded && <span>My Bookings</span>}
        </NavLink>

        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full
            text-red-600 hover:bg-red-50
          `}
          title="Logout"
        >
          <LogOut size={20} />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default UserNavbar;