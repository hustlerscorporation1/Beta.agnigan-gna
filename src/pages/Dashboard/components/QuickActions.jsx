import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircleIcon,
  UserPlusIcon,
  BellAlertIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Nouveau Terrain',
      description: 'Ajouter un nouveau terrain',
      icon: PlusCircleIcon,
      color: 'green',
      action: () => navigate('/dashboard/properties')
    },
    {
      title: 'Nouvel Utilisateur',
      description: 'Créer un compte utilisateur',
      icon: UserPlusIcon,
      color: 'blue',
      action: () => navigate('/dashboard/users')
    },
    {
      title: 'Envoyer Notification',
      description: 'Notifier les utilisateurs',
      icon: BellAlertIcon,
      color: 'purple',
      action: () => navigate('/dashboard/notifications')
    },
    {
      title: 'Rapports',
      description: 'Voir les statistiques',
      icon: DocumentTextIcon,
      color: 'orange',
      action: () => navigate('/dashboard/analytics')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200'
    };
    return colors[color] || colors.green;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={action.action}
              className={`p-4 rounded-lg transition-all ${getColorClasses(action.color)} text-left`}
            >
              <Icon className="h-8 w-8 mb-2" />
              <h3 className="font-semibold text-gray-900">{action.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
