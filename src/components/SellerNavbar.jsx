import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { User, Package, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const SellerNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`${
        isExpanded ? 'w-64' : 'w-20'
      } min-h-screen bg-white border-r border-gray-200 px-3 py-6 transition-all duration-300 relative`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-9 bg-white rounded-full p-1.5 border border-gray-200"
      >
        {isExpanded ? (
          <ChevronLeft size={16} className="text-gray-600" />
        ) : (
          <ChevronRight size={16} className="text-gray-600" />
        )}
      </button>

      <div className="space-y-4">
        {isExpanded && (
          <h2 className="text-xl font-bold px-4 mb-6 text-gray-800">
            Seller Dashboard
          </h2>
        )}
        
        <NavLink 
          to="/seller-details" 
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
          to="/my-gigs" 
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${isActive 
              ? 'bg-sky-50 text-sky-600' 
              : 'text-gray-700 hover:bg-gray-50'
            }
          `}
          title="My Gigs"
        >
          <Package size={20} />
          {isExpanded && <span>My Gigs</span>}
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
          title="Create Gig"
        >
          <Plus size={20} />
          {isExpanded && <span>Create Gig</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default SellerNavbar;