import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const PropertiesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const properties = [
    {
      id: 1,
      title: 'Terrain Résidentiel Agoènyivé',
      location: 'Lomé, Agoènyivé',
      surface: '500 m²',
      price: '5,000,000',
      status: 'available',
      owner: 'KOUASSI Jean',
      date: '15 Oct 2024',
      views: 234
    },
    {
      id: 2,
      title: 'Terrain Commercial Centre-ville',
      location: 'Kara, Centre',
      surface: '800 m²',
      price: '12,000,000',
      status: 'pending',
      owner: 'AMOUZOU Marie',
      date: '10 Oct 2024',
      views: 456
    },
    {
      id: 3,
      title: 'Terrain Agricole Zone Rurale',
      location: 'Atakpamé',
      surface: '2000 m²',
      price: '3,500,000',
      status: 'sold',
      owner: 'AGBEKO Paul',
      date: '05 Oct 2024',
      views: 123
    },
    {
      id: 4,
      title: 'Terrain Industriel Zone Franche',
      location: 'Lomé, Bè',
      surface: '1500 m²',
      price: '25,000,000',
      status: 'available',
      owner: 'TOGO Industries',
      date: '01 Oct 2024',
      views: 789
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      available: { label: 'Disponible', icon: CheckCircleIcon, class: 'bg-green-100 text-green-700' },
      pending: { label: 'En attente', icon: null, class: 'bg-yellow-100 text-yellow-700' },
      sold: { label: 'Vendu', icon: XCircleIcon, class: 'bg-gray-100 text-gray-700' }
    };
    return badges[status] || badges.available;
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Terrains</h1>
          <p className="text-gray-600 mt-1">{properties.length} terrains au total</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter un terrain
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
              placeholder="Rechercher un terrain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="available">Disponibles</option>
              <option value="pending">En attente</option>
              <option value="sold">Vendus</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Terrain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Localisation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Surface</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Prix</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Propriétaire</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vues</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProperties.map((property, index) => {
                const badge = getStatusBadge(property.status);
                const StatusIcon = badge.icon;
                
                return (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{property.title}</p>
                        <p className="text-sm text-gray-500">{property.date}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-700">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                        {property.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{property.surface}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">{property.price} FCFA</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                        {StatusIcon && <StatusIcon className="h-3 w-3" />}
                        {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{property.owner}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-700">
                        <EyeIcon className="h-4 w-4 mr-1 text-gray-400" />
                        {property.views}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
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
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun terrain trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesManagement;
