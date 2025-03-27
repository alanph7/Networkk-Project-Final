// import React, { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaSearch, FaBars, FaUser } from 'react-icons/fa';
// import { AuthContext } from '../context/AuthContext';
// import axiosInstance from '../utils/axios';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const { isAuthenticated, setIsAuthenticated, userEmail, userType } = useContext(AuthContext);
 
  
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove all stored authentication data
//     localStorage.removeItem('token');
//     localStorage.removeItem('userEmail');
//     localStorage.removeItem('userType');
//     localStorage.removeItem('userId'); // Add this line
    
//     // Reset context
//     setIsAuthenticated(false);
//     setUserEmail(null);
//     setUserType(null);
    
//     navigate('/');
//   };

//   useEffect(() => {
//     const fetchProfilePic = async () => {
//       if (!isAuthenticated) return;
      
//       try {
//         const userData = userType === 'user' 
//           ? '/users/d/me' 
//           : '/serviceProviders/d/me';
        
//         const response = await axiosInstance.get(userData);
//         setProfilePicture(response.data.profilePicture);
//       } catch (error) {
//         console.error('Error fetching profile picture:', error);
//       }
//     };
  
//     fetchProfilePic();
//   }, [isAuthenticated, userType]);

//   const getInitial = (email) => {
//     return email ? email[0].toUpperCase() : 'U';
//   };


//   const UserIcon = () => (
//     <div className="relative">
//       <div className="h-8 w-8 rounded-full bg-sky-600 flex items-center justify-center text-white overflow-hidden">
//         {profilePicture ? (
//           <img 
//             src={profilePicture} 
//             alt="Profile" 
//             className="h-full w-full object-cover"
//             onError={(e) => {
//               e.target.src = null;
//               e.target.textContent = getInitial(userEmail);
//             }}
//           />
//         ) : (
//           getInitial(userEmail)
//         )}
//       </div>
//       <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
//         {userType === 'user' ? 'U' : 'S'}
//       </div>
//     </div>
//   );

//   return (
//     <nav className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side */}
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="text-2xl font-bold text-sky-800">Networkk</Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link to="/search" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Categories
//               </Link>
//               <Link to="/search" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                 Explore
//               </Link>
//               {!isAuthenticated && (
//                 <Link to="/seller-auth" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
//                   Become a Seller
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Right side */}
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search services"
//                 className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//               <FaSearch className="absolute right-3 top-3 text-gray-400" />
//             </div>

//             {!isAuthenticated ? (
//               <>
//                 <Link to="/user-auth" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500">
//                   Sign In
//                 </Link>
//                 <Link to="/seller-auth" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500">
//                   Join
//                 </Link>
//               </>
//             ) : (
//               <div className="ml-4 relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="bg-sky-600 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
//                 >
//                   <span className="sr-only">Open user menu</span>
//                   <UserIcon />
//                 </button>
                
//                 {/* Profile dropdown */}
//                 {isProfileOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <Link to={userType === 'seller' ? "/seller-details" : "/user-details"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
//                     <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="-mr-2 flex items-center sm:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//             >
//               <FaBars className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="sm:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             {/* ... existing mobile menu items ... */}
//             {isAuthenticated ? (
//               <>
//                 <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
//                   Profile
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//                 >
//                   Sign out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/user-auth" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
//                   Sign In
//                 </Link>
//                 <Link to="/user-auth" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
//                   Join
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaUser, FaAngleDown } from 'react-icons/fa';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../utils/axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userEmail, userType } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const UserIcon = () => (
    <div className="relative profile-menu">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white overflow-hidden shadow-md border-2 border-white">
        {profilePicture ? (
          <img 
            src={profilePicture} 
            alt="Profile" 
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentNode.textContent = getInitial(userEmail);
            }}
          />
        ) : (
          <span className="text-sm font-bold">{getInitial(userEmail)}</span>
        )}
      </div>
      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
        {userType === 'user' ? 'U' : 'S'}
      </div>
    </div>
  );

  // Active link style helper
  const isActiveLink = (path) => {
    return location.pathname === path ? 
      "border-sky-500 text-sky-600 font-medium" : 
      "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center mr-8">
              <Link to="/" className="flex items-center">
                {/* <img 
                  src="https://firebasestorage.googleapis.com/v0/b/network-c70d4.appspot.com/o/login%2Flogo.png?alt=media&token=9a2b39ed-c71e-483c-8d47-9a10bfde8e26" 
                  alt="Networkk Logo" 
                  className="h-8 w-auto mr-2"
                /> */}
                <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 text-transparent bg-clip-text">
                  Networkk
                </span>
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-8">
              <Link 
                to="/search" 
                className={`${isActiveLink('/search')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Categories
              </Link>
              <Link 
                to="/search" 
                className={`${isActiveLink('/explore')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Explore
              </Link>
              {!isAuthenticated && (
                <Link 
                  to="/seller-auth" 
                  className={`${isActiveLink('/seller-auth')} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  Become a Seller
                </Link>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <div className={`flex items-center transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-sky-300' : ''}`}>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-56 lg:w-64 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none"
                />
                <button 
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-r-full border border-sky-600 hover:border-sky-700 transition-colors"
                >
                  <FaSearch className="h-5 w-5" />
                </button>
              </div>
            </form>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/user-auth" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/seller-auth" 
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 shadow-sm hover:shadow transition-all"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="relative profile-menu">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-expanded={isProfileOpen}
                  aria-haspopup="true"
                >
                  <UserIcon />
                  <FaAngleDown className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile dropdown with animation */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                    >
                      <div className="py-2 border-b border-gray-100">
                        <div className="px-4 py-2">
                          <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                          <p className="text-xs text-gray-500">{userType === 'user' ? 'Customer' : 'Service Provider'}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link 
                          to={userType === 'seller' ? "/seller-details" : "/user-details"} 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FaUser className="mr-3 text-gray-400" />
                          Profile
                        </Link>
                        {/* <Link 
                          to="/settings" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="mr-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          Settings
                        </Link> */}
                      </div>
                      <div className="py-1 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <svg className="mr-3 h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 12.586V8z" clipRule="evenodd" />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {isAuthenticated && (
              <div className="relative mr-2 profile-menu">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center p-1"
                >
                  <UserIcon />
                </button>
                
                {/* Mobile profile dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <Link to={userType === 'seller' ? "/seller-details" : "/user-details"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
              {/* Search for mobile */}
              <form onSubmit={handleSearch} className="px-2 py-2">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                  <button 
                    type="submit"
                    className="bg-sky-600 text-white px-4 py-2 rounded-r-md border border-sky-600"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
              
              <Link 
                to="/search" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-100"
              >
                Categories
              </Link>
              <Link 
                to="/search" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-100"
              >
                Explore
              </Link>
              
              {!isAuthenticated ? (
                <div className="pt-2 pb-3 border-t border-gray-200">
                  <Link 
                    to="/user-auth" 
                    className="block mx-2 my-1 px-3 py-2 rounded-md text-base font-medium text-sky-600 hover:bg-sky-50 text-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/seller-auth" 
                    className="block mx-2 my-1 px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-center shadow-sm"
                  >
                    Join Now
                  </Link>
                </div>
              ) : (
                <div className="pt-2 pb-3 border-t border-gray-200">
                  <Link 
                    to={userType === 'seller' ? "/seller-details" : "/user-details"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;