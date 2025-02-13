import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaUser } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const { isAuthenticated, setIsAuthenticated, userEmail, userType } = useContext(AuthContext);
 
  
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove all stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId'); // Add this line
    
    // Reset context
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserType(null);
    
    navigate('/');
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!isAuthenticated) return;
      
      try {
        const userData = userType === 'user' 
          ? '/users/d/me' 
          : '/serviceProviders/d/me';
        
        const response = await axiosInstance.get(userData);
        setProfilePicture(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
  
    fetchProfilePic();
  }, [isAuthenticated, userType]);

  const getInitial = (email) => {
    return email ? email[0].toUpperCase() : 'U';
  };


  const UserIcon = () => (
    <div className="relative">
      <div className="h-8 w-8 rounded-full bg-sky-600 flex items-center justify-center text-white overflow-hidden">
        {profilePicture ? (
          <img 
            src={profilePicture} 
            alt="Profile" 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = null;
              e.target.textContent = getInitial(userEmail);
            }}
          />
        ) : (
          getInitial(userEmail)
        )}
      </div>
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
        {userType === 'user' ? 'U' : 'S'}
      </div>
    </div>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600">Networkk</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/search" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Categories
              </Link>
              <Link to="/search" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Explore
              </Link>
              {!isAuthenticated && (
                <Link to="/seller-auth" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Become a Seller
                </Link>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services"
                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            {!isAuthenticated ? (
              <>
                <Link to="/user-auth" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Sign In
                </Link>
                <Link to="/seller-auth" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500">
                  Join
                </Link>
              </>
            ) : (
              <div className="ml-4 relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="bg-sky-600 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <UserIcon />
                </button>
                
                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to={userType === 'seller' ? "/seller-details" : "/user-details"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
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
            {/* ... existing mobile menu items ... */}
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/user-auth" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Sign In
                </Link>
                <Link to="/user-auth" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;