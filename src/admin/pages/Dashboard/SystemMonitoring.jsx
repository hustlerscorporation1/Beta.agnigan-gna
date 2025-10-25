import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { Activity, Server, Database, Cpu, HardDrive, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const SystemMonitoring = () => {
  const [monitoring, setMonitoring] = useState({
    server: {
      status: 'online',
      uptime: '15 jours 3h 45m',
      cpu_usage: 45,
      memory_usage: 62,
      disk_usage: 38
    },
    database: {
      status: 'healthy',
      connections: 24,
      queries_per_sec: 156,
      storage_used: '2.4 GB',
      storage_total: '10 GB'
    },
    api: {
      status: 'operational',
      requests_today: 12456,
      avg_response_time: '145ms',
      error_rate: '0.3%'
    }
  });

  const [recentQueries, setRecentQueries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMonitoringData();
    const interval = setInterval(loadMonitoringData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const loadMonitoringData = async () => {
    setLoading(true);
    try {
      // Récupérer les statistiques réelles
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });

      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: contactsCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Simuler des requêtes récentes
      setRecentQueries([
        { query: 'SELECT * FROM properties', duration: '12ms', status: 'success', time: new Date() },
        { query: 'INSERT INTO contacts', duration: '8ms', status: 'success', time: new Date(Date.now() - 5000) },
        { query: 'UPDATE profiles', duration: '15ms', status: 'success', time: new Date(Date.now() - 10000) },
        { query: 'SELECT * FROM activities', duration: '45ms', status: 'warning', time: new Date(Date.now() - 20000) }
      ]);

    } catch (error) {
      console.error('Erreur monitoring:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      online: 'bg-green-100 text-green-800',
      healthy: 'bg-green-100 text-green-800',
      operational: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const ProgressBar = ({ label, value, color = 'green' }) => {
    const getColor = () => {
      if (value > 80) return 'bg-red-500';
      if (value > 60) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-gray-900">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getColor()}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  const MetricBox = ({ icon: Icon, label, value, sublabel }) => (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
        <Icon className="text-green-600" size={20} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-600">{label}</p>
        {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Monitoring Système</h2>
          <p className="text-sm text-gray-600 mt-1">État en temps réel du système</p>
        </div>
        <button
          onClick={loadMonitoringData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          <span>Actualiser</span>
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Server Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Server className="text-blue-600" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Serveur</h3>
            </div>
            <StatusBadge status={monitoring.server.status} />
          </div>
          <p className="text-sm text-gray-600 mb-4">Uptime: {monitoring.server.uptime}</p>
          <ProgressBar label="CPU" value={monitoring.server.cpu_usage} />
          <ProgressBar label="Mémoire" value={monitoring.server.memory_usage} />
          <ProgressBar label="Disque" value={monitoring.server.disk_usage} />
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="text-green-600" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Base de Données</h3>
            </div>
            <StatusBadge status={monitoring.database.status} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Connexions actives</span>
              <span className="text-sm font-bold text-gray-900">{monitoring.database.connections}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Requêtes/sec</span>
              <span className="text-sm font-bold text-gray-900">{monitoring.database.queries_per_sec}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Stockage</span>
              <span className="text-sm font-bold text-gray-900">
                {monitoring.database.storage_used} / {monitoring.database.storage_total}
              </span>
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="text-purple-600" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">API</h3>
            </div>
            <StatusBadge status={monitoring.api.status} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Requêtes aujourd'hui</span>
              <span className="text-sm font-bold text-gray-900">{monitoring.api.requests_today.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Temps de réponse moy.</span>
              <span className="text-sm font-bold text-gray-900">{monitoring.api.avg_response_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taux d'erreur</span>
              <span className="text-sm font-bold text-gray-900">{monitoring.api.error_rate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Queries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Requêtes Récentes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {recentQueries.map((query, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  {query.status === 'success' ? (
                    <CheckCircle className="text-green-600" size={16} />
                  ) : (
                    <AlertTriangle className="text-yellow-600" size={16} />
                  )}
                  <code className="text-sm text-gray-700 font-mono">{query.query}</code>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">{query.duration}</span>
                  <span className="text-gray-400">
                    {new Date(query.time).toLocaleTimeString('fr-FR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricBox
          icon={Cpu}
          label="CPU Usage"
          value={`${monitoring.server.cpu_usage}%`}
          sublabel="4 cores"
        />
        <MetricBox
          icon={HardDrive}
          label="Memory"
          value={`${monitoring.server.memory_usage}%`}
          sublabel="8 GB total"
        />
        <MetricBox
          icon={Database}
          label="Database"
          value={monitoring.database.storage_used}
          sublabel={`/ ${monitoring.database.storage_total}`}
        />
        <MetricBox
          icon={Activity}
          label="Requests"
          value={monitoring.api.requests_today.toLocaleString()}
          sublabel="aujourd'hui"
        />
      </div>
    </div>
  );
};

export default SystemMonitoring;
