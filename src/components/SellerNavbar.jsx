import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Package, Plus } from 'lucide-react';

const SellerNavbar = () => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 px-3 py-6">
      <div className="space-y-4">
        <h2 className="text-xl font-bold px-4 mb-6 text-gray-800">Seller Dashboard</h2>
        
        <NavLink 
          to="/seller-details" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <User size={20} />
          <span>Profile Details</span>
        </NavLink>

        <NavLink 
          to="/my-gigs" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <Package size={20} />
          <span>My Gigs</span>
        </NavLink>

        <NavLink 
          to="/gigcreate" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <Plus size={20} />
          <span>Create Gig</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SellerNavbar;