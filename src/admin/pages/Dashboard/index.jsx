import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import DashboardStats from './DashboardStats';
import RecentActivities from './RecentActivities';
import SystemLogs from './SystemLogs';
import SystemConfig from './SystemConfig';
import SystemMonitoring from './SystemMonitoring';
import { LineChart, BarChart, DoughnutChart, MetricCard } from './AdvancedCharts';
import { 
  BarChart3, Download, Settings, Activity, FileText, 
  TrendingUp, Users, Home, MessageSquare, DollarSign,
  Eye, RefreshCw, Calendar
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalMessages: 0,
    totalRevenue: 0,
    totalViews: 0,
    activeUsers: 0
  });
  const [activities, setActivities] = useState([]);
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données pour les graphiques
  const [chartData, setChartData] = useState({
    monthly: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
      values: [12, 19, 15, 25, 22, 30]
    },
    userGrowth: {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
      values: [150, 230, 380, 520, 640, 780]
    },
    propertyTypes: {
      labels: ['Résidentiel', 'Commercial', 'Agricole', 'Industriel'],
      values: [45, 25, 20, 10]
    },
    revenueData: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      values: [12000, 15000, 18000, 22000]
    }
  });

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Récupérer les propriétés
      const { data: properties, count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .limit(5);

      // Récupérer les utilisateurs
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Récupérer les messages
      const { count: messagesCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Récupérer les activités récentes
      const { data: recentActivities, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Calculer les statistiques
      const totalViews = properties?.reduce((sum, prop) => sum + (prop.views || 0), 0) || 0;
      
      setStats({
        totalProperties: propertiesCount || 0,
        totalUsers: usersCount || 0,
        totalMessages: messagesCount || 0,
        totalRevenue: 45200000, // À calculer depuis vos données réelles
        totalViews: totalViews,
        activeUsers: Math.floor((usersCount || 0) * 0.3) // 30% d'utilisateurs actifs
      });

      setRecentProperties(properties || []);

      // Formater les activités
      if (recentActivities && !activitiesError) {
        const formattedActivities = recentActivities.map(activity => ({
          type: activity.type,
          title: activity.title,
          description: activity.description,
          timestamp: new Date(activity.created_at).toLocaleString('fr-FR'),
        }));
        setActivities(formattedActivities);
      } else {
        // Activités de démonstration
        setActivities([
          { type: 'property', title: 'Nouvelle propriété', description: 'Terrain ajouté à Lomé', timestamp: new Date().toLocaleString('fr-FR') },
          { type: 'user', title: 'Nouvel utilisateur', description: 'Jean Kouassi inscrit', timestamp: new Date().toLocaleString('fr-FR') },
          { type: 'message', title: 'Nouveau message', description: 'Contact reçu', timestamp: new Date().toLocaleString('fr-FR') }
        ]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = (format = 'csv') => {
    const data = {
      stats: stats,
      properties: recentProperties,
      exportDate: new Date().toISOString()
    };

    if (format === 'csv') {
      const csv = [
        ['Métrique', 'Valeur'],
        ['Total Propriétés', stats.totalProperties],
        ['Total Utilisateurs', stats.totalUsers],
        ['Total Messages', stats.totalMessages],
        ['Revenus', stats.totalRevenue],
        ['Vues Totales', stats.totalViews]
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-stats-${Date.now()}.csv`;
      a.click();
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-data-${Date.now()}.json`;
      a.click();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec onglets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Administratif</h1>
            <p className="text-gray-600 mt-1">Vue complète de votre plateforme</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={fetchDashboardData}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} />
              Actualiser
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download size={18} />
                Exporter
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block z-10">
                <button 
                  onClick={() => exportData('csv')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-t-lg"
                >
                  Exporter en CSV
                </button>
                <button 
                  onClick={() => exportData('json')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-b-lg"
                >
                  Exporter en JSON
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={18} />
              Vue d'ensemble
            </div>
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'monitoring'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity size={18} />
              Monitoring
            </div>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'logs'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText size={18} />
              Logs Système
            </div>
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'config'
                ? 'border-green-600 text-green-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings size={18} />
              Configuration
            </div>
          </button>
        </div>
      </div>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <DashboardStats stats={stats} />

          {/* Métriques avec graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Propriétés ce mois"
              value={stats.totalProperties}
              change={12}
              chartData={chartData.monthly}
              chartType="line"
            />
            <MetricCard
              title="Croissance Utilisateurs"
              value={stats.totalUsers}
              change={8}
              chartData={chartData.userGrowth}
              chartType="line"
            />
            <MetricCard
              title="Revenus Mensuels"
              value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
              change={15}
              chartData={chartData.revenueData}
              chartType="bar"
            />
          </div>

          {/* Graphiques et Activités */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graphique en barres */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Évolution Mensuelle</h2>
                <BarChart3 size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <BarChart data={chartData.monthly} title="Propriétés publiées" />
              </div>
            </div>

            {/* Graphique circulaire */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Types de Propriétés</h2>
                <TrendingUp size={20} className="text-gray-400" />
              </div>
              <div className="h-64">
                <DoughnutChart data={chartData.propertyTypes} title="Distribution" />
              </div>
            </div>
          </div>

          {/* Activités Récentes et Propriétés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivities activities={activities} />
            
            {/* Propriétés Récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Propriétés Récentes</h2>
              </div>
              <div className="p-4 space-y-3">
                {recentProperties.length > 0 ? (
                  recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Home size={20} className="text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                        <p className="text-xs text-gray-500">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{property.price}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye size={12} />
                          {property.views || 0}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Home size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Aucune propriété récente</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistiques supplémentaires */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <Eye size={24} />
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Total</span>
              </div>
              <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
              <p className="text-sm opacity-90">Vues totales</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <Users size={24} />
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Actifs</span>
              </div>
              <p className="text-3xl font-bold">{stats.activeUsers}</p>
              <p className="text-sm opacity-90">Utilisateurs actifs</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare size={24} />
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Messages</span>
              </div>
              <p className="text-3xl font-bold">{stats.totalMessages}</p>
              <p className="text-sm opacity-90">Messages reçus</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <DollarSign size={24} />
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Revenus</span>
              </div>
              <p className="text-3xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-sm opacity-90">FCFA</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && <SystemMonitoring />}
      {activeTab === 'logs' && <SystemLogs />}
      {activeTab === 'config' && <SystemConfig />}
    </div>
  );
};

export default Dashboard;
