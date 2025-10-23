import React from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  EyeIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const AnalyticsPage = () => {
  const monthlyData = [
    { month: 'Jan', terrains: 12, users: 45, revenue: 5.2 },
    { month: 'Fév', terrains: 18, users: 67, revenue: 7.8 },
    { month: 'Mar', terrains: 15, users: 52, revenue: 6.5 },
    { month: 'Avr', terrains: 22, users: 89, revenue: 9.1 },
    { month: 'Mai', terrains: 28, users: 112, revenue: 12.3 },
    { month: 'Juin', terrains: 25, users: 98, revenue: 10.8 }
  ];

  const topLocations = [
    { city: 'Lomé', count: 45, percent: 35 },
    { city: 'Kara', count: 28, percent: 22 },
    { city: 'Sokodé', count: 22, percent: 17 },
    { city: 'Atakpamé', count: 18, percent: 14 },
    { city: 'Autres', count: 15, percent: 12 }
  ];

  const propertyTypes = [
    { type: 'Résidentiel', count: 68, percent: 44, color: 'bg-blue-500' },
    { type: 'Commercial', count: 42, percent: 27, color: 'bg-green-500' },
    { type: 'Agricole', count: 30, percent: 19, color: 'bg-yellow-500' },
    { type: 'Industriel', count: 16, percent: 10, color: 'bg-purple-500' }
  ];

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.terrains, d.users / 3)));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Statistiques & Analytics</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble des performances</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Vues</p>
              <h3 className="text-3xl font-bold mt-2">24,567</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4" />
                <span className="text-sm">+12.5% ce mois</span>
              </div>
            </div>
            <EyeIcon className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Nouveaux Utilisateurs</p>
              <h3 className="text-3xl font-bold mt-2">463</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4" />
                <span className="text-sm">+8.2% ce mois</span>
              </div>
            </div>
            <UserGroupIcon className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Revenus Totaux</p>
              <h3 className="text-3xl font-bold mt-2">51.7M</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUpIcon className="h-4 w-4" />
                <span className="text-sm">+23.1% ce mois</span>
              </div>
            </div>
            <CurrencyDollarIcon className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Évolution Mensuelle</h2>
          
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{data.terrains} terrains</span>
                    <span>{data.users} utilisateurs</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.terrains / maxValue) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((data.users / 3) / maxValue) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-green-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Terrains</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Utilisateurs</span>
            </div>
          </div>
        </div>

        {/* Property Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Types de Terrains</h2>
          
          <div className="space-y-4">
            {propertyTypes.map((type, index) => (
              <motion.div
                key={type.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">{type.type}</span>
                  <span className="text-sm text-gray-500">{type.count} ({type.percent}%)</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${type.percent}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className={`${type.color} h-3 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Villes Populaires</h2>
          
          <div className="space-y-4">
            {topLocations.map((location, index) => (
              <motion.div
                key={location.city}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{location.city}</span>
                    <span className="text-sm text-gray-500">{location.count} terrains</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                      style={{ width: `${location.percent}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Résumé des Performances</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Taux de conversion</p>
                <p className="text-2xl font-bold text-blue-600">18.5%</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-blue-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Temps moyen sur site</p>
                <p className="text-2xl font-bold text-green-600">4m 32s</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-green-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Taux de rebond</p>
                <p className="text-2xl font-bold text-orange-600">24.3%</p>
              </div>
              <TrendingDownIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
