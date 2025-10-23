import React, { useState } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  UserIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    marketingEmails: false,
    twoFactorAuth: false,
    publicProfile: true
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsSections = [
    {
      title: 'Notifications',
      icon: BellIcon,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Notifications par email',
          description: 'Recevoir des notifications par email pour les événements importants'
        },
        {
          key: 'pushNotifications',
          label: 'Notifications push',
          description: 'Recevoir des notifications push sur votre appareil'
        },
        {
          key: 'weeklyReports',
          label: 'Rapports hebdomadaires',
          description: 'Recevoir un résumé hebdomadaire des activités'
        },
        {
          key: 'marketingEmails',
          label: 'Emails marketing',
          description: 'Recevoir des offres promotionnelles et nouveautés'
        }
      ]
    },
    {
      title: 'Sécurité',
      icon: ShieldCheckIcon,
      settings: [
        {
          key: 'twoFactorAuth',
          label: 'Authentification à deux facteurs',
          description: 'Ajouter une couche de sécurité supplémentaire à votre compte'
        },
        {
          key: 'publicProfile',
          label: 'Profil public',
          description: 'Rendre votre profil visible publiquement'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérer les paramètres de votre compte et de l'application</p>
      </div>

      {/* Settings Sections */}
      {settingsSections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {section.settings.map((setting) => (
                <div key={setting.key} className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{setting.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(setting.key)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      settings[setting.key] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        settings[setting.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserIcon className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Informations du Compte</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              defaultValue="Administrateur"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="admin@agnigbangna.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              defaultValue="+228 90 00 00 00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="pt-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <KeyIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Changer le Mot de Passe</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe actuel
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="pt-4">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Mettre à jour le mot de passe
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-xl border-2 border-red-200 p-6">
        <h2 className="text-xl font-bold text-red-900 mb-2">Zone Dangereuse</h2>
        <p className="text-red-700 mb-4">Ces actions sont irréversibles. Procédez avec prudence.</p>
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Supprimer le compte
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
