import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BellAlertIcon,
  PaperAirplaneIcon,
  UsersIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const NotificationsManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    target: 'all',
    type: 'info'
  });

  const sentNotifications = [
    {
      id: 1,
      title: 'Nouvelle promotion',
      message: 'Profitez de 20% de réduction sur tous les terrains',
      target: 'Tous les utilisateurs',
      type: 'success',
      date: 'Il y a 2 heures',
      recipients: 1234
    },
    {
      id: 2,
      title: 'Maintenance planifiée',
      message: 'Le site sera indisponible de 2h à 4h du matin',
      target: 'Tous les utilisateurs',
      type: 'warning',
      date: 'Il y a 1 jour',
      recipients: 1234
    }
  ];

  const getTypeColor = (type) => {
    const colors = {
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      info: 'bg-blue-100 text-blue-700',
      danger: 'bg-red-100 text-red-700'
    };
    return colors[type] || colors.info;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Notification envoyée:', formData);
    alert('Notification envoyée avec succès!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Notifications</h1>
        <p className="text-gray-600 mt-1">Envoyer des notifications aux utilisateurs</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Envoyer une notification</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la notification
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ex: Nouvelle promotion"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Écrivez votre message..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinataires
                </label>
                <select
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">Tous les utilisateurs</option>
                  <option value="sellers">Vendeurs uniquement</option>
                  <option value="buyers">Acheteurs uniquement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="info">Information</option>
                  <option value="success">Succès</option>
                  <option value="warning">Avertissement</option>
                  <option value="danger">Urgent</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
              Envoyer la notification
            </button>
          </form>
        </div>

        {/* Sent Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications envoyées</h2>
          
          <div className="space-y-4">
            {sentNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                    {notification.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <UsersIcon className="h-4 w-4" />
                      {notification.recipients} destinataires
                    </span>
                    <span>{notification.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsManagement;
