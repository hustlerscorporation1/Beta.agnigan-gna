import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, change, trend, icon: Icon, color = 'blue' }) => {
  const colors = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      trend: 'text-blue-600'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      trend: 'text-green-600'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      trend: 'text-purple-600'
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
      trend: 'text-orange-600'
    }
  };

  const colorScheme = colors[color] || colors.blue;
  const isPositive = trend === 'up';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">{value}</h3>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </span>
            <span className="text-sm text-gray-500">ce mois</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorScheme.bg}`}>
          <Icon className={`h-6 w-6 ${colorScheme.text}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
