import React from 'react';
import { Clock, User, Home, MessageSquare } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'user':
        return <User size={16} className="text-blue-600" />;
      case 'property':
        return <Home size={16} className="text-green-600" />;
      case 'message':
        return <MessageSquare size={16} className="text-purple-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <Clock size={12} />
          {activity.timestamp}
        </p>
      </div>
    </div>
  );
};

const RecentActivities = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Activités Récentes</h2>
      </div>
      <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune activité récente</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
