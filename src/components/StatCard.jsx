import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  iconBgColor,
  onClick 
}) => {
  // Format the value based on whether it's a currency or number
  const formattedValue = typeof value === 'number' 
    ? title.toLowerCase().includes('budget') || title.toLowerCase().includes('profit')
      ? `$${value.toLocaleString()}`
      : value.toLocaleString()
    : value;

  // Determine if change is positive or negative
  const isPositive = change >= 0;
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={onClick}
      role={onClick ? "button" : "presentation"}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">
            {title}
          </h3>
          <p className="text-2xl font-semibold mt-2">
            {formattedValue}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <span className={`${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </span>
            {' '}Since last month
          </p>
        </div>
        <div className={`${iconBgColor} p-3 rounded-full`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

// PropTypes for better development experience
StatCard.defaultProps = {
  change: 0,
  iconBgColor: 'bg-blue-800',
  onClick: null
};

export default StatCard;