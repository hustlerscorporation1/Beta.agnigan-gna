import React, { useState, useEffect } from 'react';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  Clock, Search, Eye, MapPin, 
  Download, RefreshCw, Calendar, DollarSign, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BuyingProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    totalValue: 0,
    avgPrice: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuyingProperties();
  }, []);

  const fetchBuyingProperties = async () => {
    try {
      setLoading(true);
      // Récupérer les propriétés avec statut 'buying' ou custom_status 'buying'
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or('status.eq.buying,custom_status.eq.buying,status.eq.pending')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const props = data || [];
      setProperties(props);
      
      const totalValue = props.reduce((sum, p) => {
        const price = parseInt(p.price?.replace(/[^0-9]/g, '') || 0);
        return sum + price;
      }, 0);
      
      setStats({
        total: props.length,
        totalValue,
        avgPrice: props.length > 0 ? totalValue / props.length : 0
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
      ['Titre', 'Localisation', 'Prix', 'Surface', 'Date de début'],
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
    a.download = `terrains-en-cours-achat-${Date.now()}.csv`;
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
            <Clock className="text-orange-600" size={28} />
            Terrains en Cours d'Achat
          </h1>
          <p className="text-gray-600 mt-1">{filteredProperties.length} terrain(s) en cours d'achat</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchBuyingProperties}
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
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Clock size={32} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats.total}</p>
          <p className="text-sm opacity-90">Terrains en Cours</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={32} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{(stats.totalValue / 1000000).toFixed(1)}M</p>
          <p className="text-sm opacity-90">Valeur en Transaction</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle size={32} className="opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{(stats.avgPrice / 1000000).toFixed(2)}M</p>
          <p className="text-sm opacity-90">Prix Moyen</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un terrain en cours..."
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
                    <Clock size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 flex items-center gap-1">
                    <Clock size={12} />
                    En Cours
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{property.title}</h3>
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
                  <span>Début le {new Date(property.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-3">
                  <p className="text-xs text-orange-800 flex items-center gap-1">
                    <AlertCircle size={12} />
                    Transaction en cours
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Eye size={16} />
                  Voir Détails
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Clock size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Aucun terrain en cours d'achat trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyingProperties;
