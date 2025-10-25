import React from 'react';
import { Home, Users, MessageSquare, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Propriétés"
        value={stats?.totalProperties || 0}
        icon={Home}
        trend="up"
        trendValue="+12% ce mois"
        color="bg-blue-500"
      />
      <StatCard
        title="Utilisateurs"
        value={stats?.totalUsers || 0}
        icon={Users}
        trend="up"
        trendValue="+8% ce mois"
        color="bg-green-500"
      />
      <StatCard
        title="Messages"
        value={stats?.totalMessages || 0}
        icon={MessageSquare}
        trend="up"
        trendValue="+23% ce mois"
        color="bg-purple-500"
      />
      <StatCard
        title="Revenus"
        value={`${stats?.totalRevenue || 0} FCFA`}
        icon={TrendingUp}
        trend="up"
        trendValue="+15% ce mois"
        color="bg-orange-500"
      />
    </div>
  );
};

export default DashboardStats;
