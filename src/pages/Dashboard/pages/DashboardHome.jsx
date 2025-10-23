import React from 'react';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  UsersIcon,
  BanknotesIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import StatCard from '../components/StatCard';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Total Terrains',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: BuildingOfficeIcon,
      color: 'blue'
    },
    {
      title: 'Utilisateurs',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: UsersIcon,
      color: 'green'
    },
    {
      title: 'Revenus (FCFA)',
      value: '45.2M',
      change: '+23%',
      trend: 'up',
      icon: BanknotesIcon,
      color: 'purple'
    },
    {
      title: 'Vues Totales',
      value: '8,432',
      change: '-5%',
      trend: 'down',
      icon: EyeIcon,
      color: 'orange'
    }
  ];

  const recentProperties = [
    {
      id: 1,
      title: 'Terrain Résidentiel à Lomé',
      location: 'Agoènyivé',
      price: '5,000,000',
      status: 'available',
      date: 'Il y a 2h'
    },
    {
      id: 2,
      title: 'Terrain Commercial à Kara',
      location: 'Centre-ville',
      price: '12,000,000',
      status: 'pending',
      date: 'Il y a 5h'
    },
    {
      id: 3,
      title: 'Terrain Agricole à Atakpamé',
      location: 'Zone rurale',
      price: '3,500,000',
      status: 'sold',
      date: 'Il y a 1j'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'KOUASSI Jean',
      email: 'jean.kouassi@gmail.com',
      date: 'Il y a 30min',
      avatar: 'JK'
    },
    {
      id: 2,
      name: 'AMOUZOU Marie',
      email: 'marie.amouzou@gmail.com',
      date: 'Il y a 1h',
      avatar: 'AM'
    },
    {
      id: 3,
      name: 'AGBEKO Paul',
      email: 'paul.agbeko@gmail.com',
      date: 'Il y a 3h',
      avatar: 'PA'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      available: { label: 'Disponible', class: 'bg-green-100 text-green-700' },
      pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
      sold: { label: 'Vendu', class: 'bg-gray-100 text-gray-700' }
    };
    return badges[status] || badges.available;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-gray-600 mt-1">Bienvenue sur votre panneau d'administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Derniers Terrains</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentProperties.map((property) => {
                const badge = getStatusBadge(property.status);
                return (
                  <div
                    key={property.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BuildingOfficeIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {property.location}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-medium text-green-600">
                          {property.price} FCFA
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${badge.class}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 flex items-center flex-shrink-0">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      {property.date}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Nouveaux Utilisateurs</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">{user.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                  <span className="text-xs text-gray-500 flex items-center flex-shrink-0">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {user.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default DashboardHome;
