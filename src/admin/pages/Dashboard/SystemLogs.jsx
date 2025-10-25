import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { AlertCircle, CheckCircle, Info, XCircle, Download, RefreshCw, Filter, Search } from 'lucide-react';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      
      // Récupérer les logs système (vous devrez créer cette table)
      const { data: logsData, error } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error && error.code !== 'PGRST116') {
        console.error('Erreur logs:', error);
        // Utiliser des logs de démonstration si la table n'existe pas
        setLogs(generateMockLogs());
      } else {
        setLogs(logsData || generateMockLogs());
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des logs:', error);
      setLogs(generateMockLogs());
    } finally {
      setLoading(false);
    }
  };

  const generateMockLogs = () => {
    const types = ['error', 'warning', 'info', 'success'];
    const actions = [
      'Connexion utilisateur',
      'Création de propriété',
      'Mise à jour profil',
      'Suppression utilisateur',
      'Modification configuration',
      'Export de données',
      'Erreur de connexion',
      'Tentative d\'accès non autorisé',
      'Backup automatique effectué',
      'Mise à jour système'
    ];

    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      type: types[Math.floor(Math.random() * types.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      user_email: `user${Math.floor(Math.random() * 100)}@example.com`,
      ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      details: 'Action effectuée avec succès',
      created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));
  };

  const exportLogs = () => {
    const csv = [
      ['Type', 'Action', 'Utilisateur', 'IP', 'Date', 'Détails'],
      ...filteredLogs.map(log => [
        log.type,
        log.action,
        log.user_email,
        log.ip_address,
        new Date(log.created_at).toLocaleString('fr-FR'),
        log.details
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${Date.now()}.csv`;
    a.click();
  };

  const getLogIcon = (type) => {
    switch (type) {
      case 'error':
        return <XCircle className="text-red-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getLogBadgeColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch = 
      log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Logs Système</h2>
            <p className="text-sm text-gray-600 mt-1">{filteredLogs.length} entrées</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogs}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} />
              <span>Actualiser</span>
            </button>
            <button
              onClick={exportLogs}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={18} />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher dans les logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les types</option>
            <option value="error">Erreurs</option>
            <option value="warning">Avertissements</option>
            <option value="info">Informations</option>
            <option value="success">Succès</option>
          </select>
        </div>
      </div>

      {/* Logs List */}
      <div className="max-h-[600px] overflow-y-auto">
        {filteredLogs.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getLogIcon(log.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLogBadgeColor(log.type)}`}>
                        {log.type.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{log.action}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.details}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>👤 {log.user_email}</span>
                      <span>🌐 {log.ip_address}</span>
                      <span>🕒 {new Date(log.created_at).toLocaleString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Info size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun log trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemLogs;
