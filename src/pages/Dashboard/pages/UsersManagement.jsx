import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckBadgeIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'KOUASSI Jean',
      email: 'jean.kouassi@gmail.com',
      phone: '+228 90 12 34 56',
      role: 'seller',
      verified: true,
      properties: 3,
      joinDate: '15 Oct 2024',
      status: 'active'
    },
    {
      id: 2,
      name: 'AMOUZOU Marie',
      email: 'marie.amouzou@gmail.com',
      phone: '+228 91 23 45 67',
      role: 'buyer',
      verified: true,
      properties: 0,
      joinDate: '10 Oct 2024',
      status: 'active'
    },
    {
      id: 3,
      name: 'AGBEKO Paul',
      email: 'paul.agbeko@gmail.com',
      phone: '+228 92 34 56 78',
      role: 'seller',
      verified: false,
      properties: 1,
      joinDate: '05 Oct 2024',
      status: 'pending'
    },
    {
      id: 4,
      name: 'TOGO Industries',
      email: 'contact@togoindustries.com',
      phone: '+228 93 45 67 89',
      role: 'admin',
      verified: true,
      properties: 5,
      joinDate: '01 Sep 2024',
      status: 'active'
    }
  ];

  const getRoleBadge = (role) => {
    const badges = {
      admin: { label: 'Administrateur', class: 'bg-purple-100 text-purple-700' },
      seller: { label: 'Vendeur', class: 'bg-blue-100 text-blue-700' },
      buyer: { label: 'Acheteur', class: 'bg-green-100 text-green-700' }
    };
    return badges[role] || badges.buyer;
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Actif', class: 'bg-green-100 text-green-700' },
      pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-700' },
      suspended: { label: 'Suspendu', class: 'bg-red-100 text-red-700' }
    };
    return badges[status] || badges.active;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">{users.length} utilisateurs inscrits</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlusIcon className="h-5 w-5" />
          Ajouter un utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Tous les rôles</option>
              <option value="admin">Administrateurs</option>
              <option value="seller">Vendeurs</option>
              <option value="buyer">Acheteurs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredUsers.map((user, index) => {
          const roleBadge = getRoleBadge(user.role);
          const statusBadge = getStatusBadge(user.status);
          
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl font-bold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{user.name}</h3>
                      {user.verified && (
                        <CheckBadgeIcon className="h-5 w-5 text-blue-600" title="Compte vérifié" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${roleBadge.class}`}>
                        {roleBadge.label}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusBadge.class}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                  {user.phone}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-500">Terrains: </span>
                  <span className="font-semibold text-gray-900">{user.properties}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Inscrit le {user.joinDate}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
