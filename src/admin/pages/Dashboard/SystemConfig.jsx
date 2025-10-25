import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { Settings, Save, Database, Mail, Shield, Globe, Bell, Upload } from 'lucide-react';

const SystemConfig = () => {
  const [config, setConfig] = useState({
    // Général
    site_name: 'Agnigban Gna',
    site_email: 'contact@agnigbangna.com',
    site_phone: '+228 XX XX XX XX',
    maintenance_mode: false,
    
    // Email
    smtp_host: 'smtp.gmail.com',
    smtp_port: '587',
    smtp_user: '',
    smtp_password: '',
    
    // Base de données
    db_backup_enabled: true,
    db_backup_frequency: 'daily',
    db_max_connections: '100',
    
    // Sécurité
    password_min_length: '8',
    session_timeout: '30',
    max_login_attempts: '5',
    two_factor_enabled: false,
    
    // Notifications
    email_notifications: true,
    sms_notifications: false,
    push_notifications: true,
    
    // API
    api_rate_limit: '1000',
    api_key_rotation_days: '90'
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('system_config')
        .select('*')
        .single();

      if (data) {
        setConfig(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.log('Configuration locale utilisée');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('system_config')
        .upsert(config);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Configuration sauvegardée avec succès!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const ConfigSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Icon className="text-green-600" size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  const InputField = ({ label, name, type = 'text', value, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => handleChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );

  const ToggleField = ({ label, name, value, description }) => (
    <div className="flex items-center justify-between">
      <div>
        <label className="block text-sm font-medium text-gray-900">{label}</label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => handleChange(name, !value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-green-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configuration Système</h2>
          <p className="text-gray-600 mt-1">Gérer tous les paramètres de la plateforme</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          <span>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</span>
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Général */}
      <ConfigSection title="Paramètres Généraux" icon={Globe}>
        <InputField
          label="Nom du site"
          name="site_name"
          value={config.site_name}
          placeholder="Nom de votre plateforme"
        />
        <InputField
          label="Email principal"
          name="site_email"
          type="email"
          value={config.site_email}
          placeholder="contact@exemple.com"
        />
        <InputField
          label="Téléphone"
          name="site_phone"
          type="tel"
          value={config.site_phone}
          placeholder="+228 XX XX XX XX"
        />
        <ToggleField
          label="Mode Maintenance"
          name="maintenance_mode"
          value={config.maintenance_mode}
          description="Mettre le site en maintenance pour les utilisateurs"
        />
      </ConfigSection>

      {/* Email/SMTP */}
      <ConfigSection title="Configuration Email" icon={Mail}>
        <InputField
          label="Serveur SMTP"
          name="smtp_host"
          value={config.smtp_host}
          placeholder="smtp.gmail.com"
        />
        <InputField
          label="Port SMTP"
          name="smtp_port"
          value={config.smtp_port}
          placeholder="587"
        />
        <InputField
          label="Utilisateur SMTP"
          name="smtp_user"
          type="email"
          value={config.smtp_user}
          placeholder="votre@email.com"
        />
        <InputField
          label="Mot de passe SMTP"
          name="smtp_password"
          type="password"
          value={config.smtp_password}
          placeholder="••••••••"
        />
      </ConfigSection>

      {/* Base de données */}
      <ConfigSection title="Base de Données" icon={Database}>
        <ToggleField
          label="Backup automatique"
          name="db_backup_enabled"
          value={config.db_backup_enabled}
          description="Effectuer des backups automatiques"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fréquence des backups</label>
          <select
            value={config.db_backup_frequency}
            onChange={(e) => handleChange('db_backup_frequency', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="hourly">Toutes les heures</option>
            <option value="daily">Quotidien</option>
            <option value="weekly">Hebdomadaire</option>
            <option value="monthly">Mensuel</option>
          </select>
        </div>
        <InputField
          label="Connexions maximales"
          name="db_max_connections"
          type="number"
          value={config.db_max_connections}
          placeholder="100"
        />
      </ConfigSection>

      {/* Sécurité */}
      <ConfigSection title="Sécurité" icon={Shield}>
        <InputField
          label="Longueur minimale du mot de passe"
          name="password_min_length"
          type="number"
          value={config.password_min_length}
          placeholder="8"
        />
        <InputField
          label="Délai d'expiration de session (minutes)"
          name="session_timeout"
          type="number"
          value={config.session_timeout}
          placeholder="30"
        />
        <InputField
          label="Tentatives de connexion max"
          name="max_login_attempts"
          type="number"
          value={config.max_login_attempts}
          placeholder="5"
        />
        <ToggleField
          label="Authentification à deux facteurs"
          name="two_factor_enabled"
          value={config.two_factor_enabled}
          description="Activer 2FA pour tous les utilisateurs"
        />
      </ConfigSection>

      {/* Notifications */}
      <ConfigSection title="Notifications" icon={Bell}>
        <ToggleField
          label="Notifications Email"
          name="email_notifications"
          value={config.email_notifications}
          description="Envoyer des notifications par email"
        />
        <ToggleField
          label="Notifications SMS"
          name="sms_notifications"
          value={config.sms_notifications}
          description="Envoyer des notifications par SMS"
        />
        <ToggleField
          label="Notifications Push"
          name="push_notifications"
          value={config.push_notifications}
          description="Envoyer des notifications push"
        />
      </ConfigSection>

      {/* API */}
      <ConfigSection title="API & Intégrations" icon={Settings}>
        <InputField
          label="Limite de requêtes API (par heure)"
          name="api_rate_limit"
          type="number"
          value={config.api_rate_limit}
          placeholder="1000"
        />
        <InputField
          label="Rotation des clés API (jours)"
          name="api_key_rotation_days"
          type="number"
          value={config.api_key_rotation_days}
          placeholder="90"
        />
      </ConfigSection>
    </div>
  );
};

export default SystemConfig;
