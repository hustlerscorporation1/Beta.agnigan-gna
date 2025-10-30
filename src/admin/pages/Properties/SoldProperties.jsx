import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  CheckCircle, Search, Eye, MapPin, 
  Download, RefreshCw, Calendar, DollarSign, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SoldProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    totalRevenue: 0,
    avgPrice: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSoldProperties();
  }, []);

  const fetchSoldProperties = async () => {
    try {
      setLoading(true);
      // Requête optimisée - seulement les colonnes nécessaires
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, location, price, area, image, status, created_at')
        .eq('status', 'sold')
        .order('created_at', { ascending: false })
        .limit(50); // Limiter pour performance

      if (error) throw error;
      const props = data || [];
      setProperties(props);
      
      const totalRevenue = props.reduce((sum, p) => {
        const price = parseInt(p.price?.replace(/[^0-9]/g, '') || 0);
        return sum + price;
      }, 0);
      
      setStats({
        total: props.length,
        totalRevenue,
        avgPrice: props.length > 0 ? totalRevenue / props.length : 0
      });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const exportData = () => {
    const csv = [
      ['Titre', 'Localisation', 'Prix', 'Surface', 'Date de vente'],
      ...filteredProperties.map(p => [
        p.title,
        p.location,
        p.price,
        p.area || 'N/A',
        new Date(p.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `terrains-vendus-${Date.now()}.csv`;
    a.click();
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle className="text-green-600" size={28} />
            Terrains Vendus
          </h1>
          <p className="text-gray-600 mt-1">{filteredProperties.length} terrain(s) vendu(s)</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchSoldProperties}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Actualiser
          </button>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={18} />
            Exporter
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle size={32} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.total}</p>
          <p className="text-sm opacity-90">Total Terrains Vendus</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-sm opacity-90">Revenus Totaux</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={32} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{(stats.avgPrice / 1000000).toFixed(2)}M</p>
          <p className="text-sm opacity-90">Prix Moyen de Vente</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un terrain vendu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gray-200">
                {property.image ? (
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <CheckCircle size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Vendu
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate flex-1">{property.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-2 font-mono">ID: {property.id}</p>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                  <MapPin size={14} />
                  {property.location}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-green-600">{property.price}</span>
                  {property.area && (
                    <span className="text-sm text-gray-500">{property.area} m²</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Calendar size={14} />
                  <span>Vendu le {new Date(property.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <button
                  onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Eye size={16} />
                  Voir Détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <CheckCircle size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Aucun terrain vendu trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoldProperties;
