import React, { useState } from 'react';
import { BarChart, Users, LucideStar, UserCircle, Settings, LucideLogOut, HomeIcon, AlertCircle } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick, collapsed }) => (
  <div
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg cursor-pointer
      ${active ? 'bg-blue-800 text-white' : 'text-gray-400 hover:bg-gray-700'} 
      ${collapsed ? 'justify-center' : 'justify-start'}`}
  >
    {/* Active state only applies to the icon */}
    <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400'}`} />
    {/* Show label only if not collapsed */}
    {!collapsed && <span className="ml-3">{label}</span>}
  </div>
);

const Sidebar = ({ activePage, onPageChange }) => {
  const [collapsed, setCollapsed] = useState(false); // State for the collapsed sidebar

  const menuItems = [
    { icon: BarChart, label: 'Overview', id: 'overview' },
    { icon: Users, label: 'Bookings', id: 'bookings' },
    { icon: LucideStar, label: 'Reviews', id: 'reviews' },
    { icon: UserCircle, label: 'Account', id: 'account' },
    { icon: HomeIcon, label: 'Home', id: 'home' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: LucideLogOut, label: 'LogOut', id: 'logout' },
    { icon: AlertCircle, label: 'Help', id: 'help' }
  ];

  return (
    <div className={`relative ${collapsed ? 'w-24' : 'w-64'} bg-gray-900 p-4 h-screen transition-all duration-300`}>
      {/* Toggle Button (3 lines or X) */}
      <button 
        onClick={() => setCollapsed(!collapsed)} 
        className=" top-4 left-4 text-white focus:outline-none z-10"
      >
        <div className={`space-y-1 ${collapsed ? 'rotate-90' : ''} transition-all duration-300`}>
          <div className={`w-6 h-0.5 bg-white transform ${collapsed ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white ${collapsed ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-white transform ${collapsed ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </button>

      {/* Sidebar Header (only visible when expanded) */}
      {!collapsed && (
        <div className="flex items-center mb-8">
          <div className="text-white text-lg font-semibold">Networkk</div>
          <div className="text-gray-400 text-sm ml-2">Production</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activePage === item.id}
            onClick={() => onPageChange(item.id)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer Section (only visible when expanded) */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-gray-400 text-sm">
            <p>Need more features?</p>
            <p className="text-gray-500">Check out our Pro version.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
