import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  Save, User, Lock, Bell, Globe, Palette, Shield,
  Mail, Phone, MapPin, Camera, Eye, EyeOff
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile Settings
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: ''
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    weekly_report: true,
    marketing_emails: false
  });

  // Security Settings
  const [security, setSecuritySettings] = useState({
    two_factor_enabled: false,
    session_timeout: '30',
    login_alerts: true
  });

  // Password Change
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    language: 'fr',
    sidebar_collapsed: false,
    compact_mode: false
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile({
            full_name: profileData.full_name || '',
            email: profileData.email || user.email || '',
            phone: profileData.phone || '',
            bio: profileData.bio || '',
            avatar: profileData.avatar || ''
          });
        }
      }
    } catch (error) {
      console.error('Erreur chargement:', error);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          bio: profile.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès!' });
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const changePassword = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (passwords.new_password.length < 8) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 8 caractères' });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new_password
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Mot de passe modifié avec succès!' });
      setPasswords({ old_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors du changement de mot de passe' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-green-50 text-green-600 font-medium'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const InputField = ({ label, value, onChange, type = 'text', placeholder, icon: Icon }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
        />
      </div>
    </div>
  );

  const ToggleSwitch = ({ label, checked, onChange, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-green-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Gérer votre compte et vos préférences</p>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-2">
            <TabButton id="profile" icon={User} label="Profil" />
            <TabButton id="security" icon={Lock} label="Sécurité" />
            <TabButton id="notifications" icon={Bell} label="Notifications" />
            <TabButton id="appearance" icon={Palette} label="Apparence" />
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Informations du Profil</h2>
                  <p className="text-sm text-gray-600">Mettez à jour vos informations personnelles</p>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-3xl font-bold text-green-600">
                    {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Camera size={18} />
                      Changer la photo
                    </button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF. Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Nom complet"
                    value={profile.full_name}
                    onChange={(value) => setProfile({ ...profile, full_name: value })}
                    placeholder="Votre nom"
                    icon={User}
                  />
                  <InputField
                    label="Email"
                    value={profile.email}
                    onChange={(value) => setProfile({ ...profile, email: value })}
                    placeholder="email@exemple.com"
                    icon={Mail}
                    type="email"
                  />
                  <InputField
                    label="Téléphone"
                    value={profile.phone}
                    onChange={(value) => setProfile({ ...profile, phone: value })}
                    placeholder="+228 XX XX XX XX"
                    icon={Phone}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows="4"
                    placeholder="Parlez de vous..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>
                </div>

                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Sécurité</h2>
                  <p className="text-sm text-gray-600">Gérer la sécurité de votre compte</p>
                </div>

                {/* Change Password */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Changer le mot de passe</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showOldPassword ? 'text' : 'password'}
                          value={passwords.old_password}
                          onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwords.new_password}
                          onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="password"
                          value={passwords.confirm_password}
                          onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={changePassword}
                      disabled={saving}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Changement...' : 'Changer le mot de passe'}
                    </button>
                  </div>
                </div>

                {/* Security Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Options de sécurité</h3>
                  <div className="space-y-4">
                    <ToggleSwitch
                      label="Authentification à deux facteurs"
                      checked={security.two_factor_enabled}
                      onChange={(value) => setSecuritySettings({ ...security, two_factor_enabled: value })}
                      description="Ajouter une couche de sécurité supplémentaire"
                    />
                    <ToggleSwitch
                      label="Alertes de connexion"
                      checked={security.login_alerts}
                      onChange={(value) => setSecuritySettings({ ...security, login_alerts: value })}
                      description="Recevoir un email lors de nouvelles connexions"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Délai d'expiration de session
                      </label>
                      <select
                        value={security.session_timeout}
                        onChange={(e) => setSecuritySettings({ ...security, session_timeout: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 heure</option>
                        <option value="120">2 heures</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Notifications</h2>
                  <p className="text-sm text-gray-600">Gérer vos préférences de notification</p>
                </div>

                <div className="space-y-4">
                  <ToggleSwitch
                    label="Notifications Email"
                    checked={notifications.email_notifications}
                    onChange={(value) => setNotifications({ ...notifications, email_notifications: value })}
                    description="Recevoir des notifications par email"
                  />
                  <ToggleSwitch
                    label="Notifications SMS"
                    checked={notifications.sms_notifications}
                    onChange={(value) => setNotifications({ ...notifications, sms_notifications: value })}
                    description="Recevoir des notifications par SMS"
                  />
                  <ToggleSwitch
                    label="Notifications Push"
                    checked={notifications.push_notifications}
                    onChange={(value) => setNotifications({ ...notifications, push_notifications: value })}
                    description="Recevoir des notifications push"
                  />
                  <ToggleSwitch
                    label="Rapport hebdomadaire"
                    checked={notifications.weekly_report}
                    onChange={(value) => setNotifications({ ...notifications, weekly_report: value })}
                    description="Recevoir un résumé hebdomadaire"
                  />
                  <ToggleSwitch
                    label="Emails marketing"
                    checked={notifications.marketing_emails}
                    onChange={(value) => setNotifications({ ...notifications, marketing_emails: value })}
                    description="Recevoir des offres et actualités"
                  />
                </div>

                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  Enregistrer les préférences
                </button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Apparence</h2>
                  <p className="text-sm text-gray-600">Personnaliser l'interface</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thème</label>
                    <select
                      value={appearance.theme}
                      onChange={(e) => setAppearance({ ...appearance, theme: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                      <option value="auto">Automatique</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                    <select
                      value={appearance.language}
                      onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <ToggleSwitch
                    label="Sidebar compacte"
                    checked={appearance.sidebar_collapsed}
                    onChange={(value) => setAppearance({ ...appearance, sidebar_collapsed: value })}
                    description="Réduire la barre latérale"
                  />
                  <ToggleSwitch
                    label="Mode compact"
                    checked={appearance.compact_mode}
                    onChange={(value) => setAppearance({ ...appearance, compact_mode: value })}
                    description="Affichage plus condensé"
                  />
                </div>

                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  Enregistrer les préférences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
