import React from 'react';
import {
  UserPlusIcon,
  BuildingOfficeIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'user',
      icon: UserPlusIcon,
      color: 'blue',
      title: 'Nouvel utilisateur inscrit',
      description: 'KOUASSI Jean s\'est inscrit sur la plateforme',
      time: 'Il y a 5 minutes'
    },
    {
      id: 2,
      type: 'property',
      icon: BuildingOfficeIcon,
      color: 'green',
      title: 'Nouveau terrain publié',
      description: 'Terrain Résidentiel à Lomé a été ajouté',
      time: 'Il y a 15 minutes'
    },
    {
      id: 3,
      type: 'sale',
      icon: CheckCircleIcon,
      color: 'purple',
      title: 'Vente confirmée',
      description: 'Terrain Commercial à Kara a été vendu',
      time: 'Il y a 1 heure'
    },
    {
      id: 4,
      type: 'notification',
      icon: BellIcon,
      color: 'orange',
      title: 'Notification envoyée',
      description: '150 utilisateurs ont reçu une notification',
      time: 'Il y a 2 heures'
    },
    {
      id: 5,
      type: 'update',
      icon: PencilIcon,
      color: 'gray',
      title: 'Profil mis à jour',
      description: 'AMOUZOU Marie a modifié son profil',
      time: 'Il y a 3 heures'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-100 text-gray-600'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Activités Récentes</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${getColorClasses(activity.color)} flex-shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
