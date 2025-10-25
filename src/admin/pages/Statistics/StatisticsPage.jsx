import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { LineChart, BarChart, DoughnutChart } from '../Dashboard/AdvancedCharts';
import { 
  TrendingUp, Users, Home, DollarSign, Eye, 
  Calendar, RefreshCw, Download, BarChart3,
  PieChart as PieChartIcon, Activity
} from 'lucide-react';

const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month'); // week, month, year
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalRevenue: 0,
    totalViews: 0,
    avgPrice: 0,
    conversionRate: 0,
    totalContacts: 0,
    activeProperties: 0,
    soldProperties: 0
  });

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
      values: [12000000, 15000000, 18000000, 22000000]
    },
    citiesData: {
      labels: ['Lomé', 'Kara', 'Sokodé', 'Atakpamé', 'Kpalimé'],
      values: [45, 22, 18, 10, 5]
    },
    statusData: {
      labels: ['Disponible', 'Vendu', 'En attente'],
      values: [0, 0, 0]
    }
  });

  const updateChartData = (properties) => {
    if (!properties || properties.length === 0) return;

    // Analyser les types de propriétés
    const types = {};
    properties.forEach(p => {
      const type = p.type || 'Autre';
      types[type] = (types[type] || 0) + 1;
    });

    // Analyser les statuts
    const statuses = {
      available: properties.filter(p => p.status === 'available').length,
      sold: properties.filter(p => p.status === 'sold').length,
      pending: properties.filter(p => p.status === 'pending').length
    };

    // Analyser les villes
    const cities = {};
    properties.forEach(p => {
      const city = p.location?.split(',')[0] || 'Autre';
      cities[city] = (cities[city] || 0) + 1;
    });

    // Trier et prendre top 5 villes
    const topCities = Object.entries(cities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const totalProps = properties.length;
    const cityPercentages = topCities.map(([_, count]) => 
      Math.round((count / totalProps) * 100)
    );

    setChartData(prev => ({
      ...prev,
      propertyTypes: {
        labels: Object.keys(types),
        values: Object.values(types)
      },
      statusData: {
        labels: ['Disponible', 'Vendu', 'En attente'],
        values: [statuses.available, statuses.sold, statuses.pending]
      },
      citiesData: {
        labels: topCities.map(([city]) => city),
        values: cityPercentages
      }
    }));
  };

  useEffect(() => {
    fetchStatistics();
  }, [timeRange]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);

      // Récupérer les propriétés
      const { data: properties, count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact' });

      // Récupérer les utilisateurs
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Récupérer les contacts
      const { count: contactsCount } = await supabase
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      // Calculer les statistiques
      const totalViews = properties?.reduce((sum, p) => sum + (p.views || 0), 0) || 0;
      const activeProperties = properties?.filter(p => p.status === 'available').length || 0;
      const soldProperties = properties?.filter(p => p.status === 'sold').length || 0;
      const avgPrice = properties?.length > 0 
        ? properties.reduce((sum, p) => {
            const price = parseInt(p.price?.replace(/[^0-9]/g, '') || 0);
            return sum + price;
          }, 0) / properties.length
        : 0;

      // Calculer le revenu total (propriétés vendues)
      const totalRevenue = properties?.filter(p => p.status === 'sold').reduce((sum, p) => {
        const price = parseInt(p.price?.replace(/[^0-9]/g, '') || 0);
        return sum + price;
      }, 0) || 0;

      setStats({
        totalProperties: propertiesCount || 0,
        totalUsers: usersCount || 0,
        totalRevenue: totalRevenue,
        totalViews: totalViews,
        avgPrice: avgPrice,
        conversionRate: propertiesCount > 0 ? ((soldProperties / propertiesCount) * 100).toFixed(1) : 0,
        totalContacts: contactsCount || 0,
        activeProperties: activeProperties,
        soldProperties: soldProperties
      });

      // Mettre à jour les données des graphiques avec vraies données
      updateChartData(properties);

    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportStatistics = () => {
    const data = {
      timeRange,
      stats,
      charts: chartData,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statistics-${Date.now()}.json`;
    a.click();
  };

  const MetricCard = ({ icon: Icon, title, value, change, color }) => (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <Icon size={32} className="opacity-80" />
        {change && (
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm opacity-90">{title}</p>
    </div>
  );

  const StatCard = ({ label, value, icon: Icon }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        {Icon && <Icon size={18} className="text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistiques & Analytics</h1>
          <p className="text-gray-600 mt-1">Analyse détaillée des performances</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
          <button
            onClick={fetchStatistics}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Actualiser
          </button>
          <button
            onClick={exportStatistics}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            Exporter
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={Home}
          title="Total Propriétés"
          value={stats.totalProperties}
          change={12}
          color="from-blue-500 to-blue-600"
        />
        <MetricCard
          icon={Users}
          title="Total Utilisateurs"
          value={stats.totalUsers}
          change={8}
          color="from-green-500 to-green-600"
        />
        <MetricCard
          icon={DollarSign}
          title="Revenus Totaux"
          value={`${(stats.totalRevenue / 1000000).toFixed(1)}M`}
          change={15}
          color="from-purple-500 to-purple-600"
        />
        <MetricCard
          icon={Eye}
          title="Vues Totales"
          value={stats.totalViews.toLocaleString()}
          change={-5}
          color="from-orange-500 to-orange-600"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Prix Moyen"
          value={`${(stats.avgPrice / 1000000).toFixed(2)}M FCFA`}
          icon={DollarSign}
        />
        <StatCard
          label="Taux de Conversion"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
        />
        <StatCard
          label="Temps Moyen sur Site"
          value="4min 32s"
          icon={Calendar}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Évolution Mensuelle */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Évolution des Propriétés</h2>
              <p className="text-sm text-gray-600">Par mois</p>
            </div>
            <BarChart3 className="text-gray-400" size={24} />
          </div>
          <div className="h-64">
            <BarChart data={chartData.monthly} title="Propriétés" />
          </div>
        </div>

        {/* Croissance Utilisateurs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Croissance Utilisateurs</h2>
              <p className="text-sm text-gray-600">Cumul mensuel</p>
            </div>
            <Activity className="text-gray-400" size={24} />
          </div>
          <div className="h-64">
            <LineChart data={chartData.userGrowth} title="Utilisateurs" />
          </div>
        </div>

        {/* Types de Propriétés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Types de Propriétés</h2>
              <p className="text-sm text-gray-600">Répartition</p>
            </div>
            <PieChartIcon className="text-gray-400" size={24} />
          </div>
          <div className="h-64">
            <DoughnutChart data={chartData.propertyTypes} title="Types" />
          </div>
        </div>

        {/* Revenus */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Revenus Hebdomadaires</h2>
              <p className="text-sm text-gray-600">En FCFA</p>
            </div>
            <DollarSign className="text-gray-400" size={24} />
          </div>
          <div className="h-64">
            <BarChart data={chartData.revenueData} title="Revenus" />
          </div>
        </div>

        {/* Statuts des Propriétés */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Statuts des Propriétés</h2>
              <p className="text-sm text-gray-600">Répartition par statut</p>
            </div>
            <PieChartIcon className="text-gray-400" size={24} />
          </div>
          <div className="h-64">
            <DoughnutChart data={chartData.statusData} title="Statuts" />
          </div>
        </div>

        {/* Métriques Détaillées */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Métriques Détaillées</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Propriétés actives</p>
                  <p className="text-xs text-gray-500">Disponibles à la vente</p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">{stats.activeProperties}</p>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Propriétés vendues</p>
                  <p className="text-xs text-gray-500">Total vendu</p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-600">{stats.soldProperties}</p>
            </div>
            <div className="flex items-center justify-between pb-3 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total vues</p>
                  <p className="text-xs text-gray-500">Toutes propriétés</p>
                </div>
              </div>
              <p className="text-lg font-bold text-purple-600">{stats.totalViews}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total contacts</p>
                  <p className="text-xs text-gray-500">Messages reçus</p>
                </div>
              </div>
              <p className="text-lg font-bold text-orange-600">{stats.totalContacts}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Villes Populaires</h2>
        <div className="space-y-4">
          {chartData.citiesData.labels.map((city, index) => (
            <div key={city} className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-gray-900">{city}</div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${chartData.citiesData.values[index]}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-right text-sm font-bold text-gray-900">
                {chartData.citiesData.values[index]}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Performance Globale</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taux de satisfaction</span>
              <span className="text-sm font-bold text-green-600">94%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taux de réponse</span>
              <span className="text-sm font-bold text-blue-600">87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Temps de traitement</span>
              <span className="text-sm font-bold text-purple-600">2.3h</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Tendances</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Propriétés actives</span>
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                <TrendingUp size={14} /> +12%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nouveaux utilisateurs</span>
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                <TrendingUp size={14} /> +8%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Taux de clics</span>
              <span className="text-sm font-bold text-red-600 flex items-center gap-1">
                <TrendingUp size={14} className="rotate-180" /> -3%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Objectifs</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Ventes mensuelles</span>
                <span className="text-sm font-bold text-gray-900">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Inscriptions</span>
                <span className="text-sm font-bold text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Revenus</span>
                <span className="text-sm font-bold text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
