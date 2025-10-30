import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../superbase/superbaseClient';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, MapPin, 
  Download, RefreshCw, Grid, List, BarChart3,
  CheckSquare, Square, TrendingUp, Home, DollarSign,
  Calendar, Tag, Image as ImageIcon, X, Check
} from 'lucide-react';
import { ADMIN_ROUTES } from '../../config/adminRoutes';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [showStats, setShowStats] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    pending: 0,
    totalValue: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      // Requête optimisée - seulement les colonnes nécessaires
      const { data, error } = await supabase
        .from('properties')
        .select('id, title, location, price, area, type, status, image, created_at')
        .order('created_at', { ascending: false })
        .limit(100); // Limiter pour performance

      if (error) throw error;
      const props = data || [];
      setProperties(props);
      
      // Calculer les statistiques
      const available = props.filter(p => p.status === 'available').length;
      const sold = props.filter(p => p.status === 'sold').length;
      const pending = props.filter(p => p.status === 'pending').length;
      const totalValue = props.reduce((sum, p) => {
        const price = parseInt(p.price?.replace(/[^0-9]/g, '') || 0);
        return sum + price;
      }, 0);
      
      setStats({
        total: props.length,
        available,
        sold,
        pending,
        totalValue
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des propriétés:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setShowDeleteModal(false);
      setSelectedProperty(null);
      fetchProperties();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la propriété');
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Supprimer ${selectedProperties.length} propriétés ?`)) {
      try {
        const { error } = await supabase
          .from('properties')
          .delete()
          .in('id', selectedProperties);

        if (error) throw error;
        setSelectedProperties([]);
        fetchProperties();
      } catch (error) {
        console.error('Erreur suppression groupée:', error);
      }
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .in('id', selectedProperties);

      if (error) throw error;
      setSelectedProperties([]);
      fetchProperties();
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };

  const toggleSelectProperty = (id) => {
    setSelectedProperties(prev => 
      prev.includes(id) 
        ? prev.filter(pId => pId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map(p => p.id));
    }
  };

  const exportData = () => {
    const csv = [
      ['Titre', 'Localisation', 'Prix', 'Statut', 'Type', 'Surface', 'Date'],
      ...filteredProperties.map(p => [
        p.title,
        p.location,
        p.price,
        p.status,
        p.type || 'N/A',
        p.area || 'N/A',
        new Date(p.created_at).toLocaleDateString('fr-FR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `properties-${Date.now()}.csv`;
    a.click();
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp size={14} />
              {trend}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {property.image ? (
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={48} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => toggleSelectProperty(property.id)}
            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50"
          >
            {selectedProperties.includes(property.id) ? (
              <CheckSquare size={20} className="text-green-600" />
            ) : (
              <Square size={20} className="text-gray-400" />
            )}
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            property.status === 'available' ? 'bg-green-100 text-green-800' :
            property.status === 'sold' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {property.status === 'available' ? 'Disponible' :
             property.status === 'sold' ? 'Vendu' : 'En attente'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{property.title}</h3>
        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <MapPin size={14} />
          {property.location}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">{property.price}</span>
          {property.area && (
            <span className="text-sm text-gray-500">{property.area} m²</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedProperty(property)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye size={16} />
            Voir
          </button>
          <button
            onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Edit size={16} />
            Éditer
          </button>
          <button
            onClick={() => {
              setSelectedProperty(property);
              setShowDeleteModal(true);
            }}
            className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Propriétés</h1>
          <p className="text-gray-600 mt-1">{filteredProperties.length} sur {properties.length} propriétés</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchProperties}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={18} />
            Actualiser
          </button>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download size={18} />
            Exporter
          </button>
          <button
            onClick={() => navigate('/admin/properties/add')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            Ajouter
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Home}
            title="Total Propriétés"
            value={stats.total}
            color="bg-blue-500"
            trend="+12% ce mois"
          />
          <StatCard
            icon={Check}
            title="Disponibles"
            value={stats.available}
            color="bg-green-500"
            trend="+8% ce mois"
          />
          <StatCard
            icon={X}
            title="Vendues"
            value={stats.sold}
            color="bg-red-500"
          />
          <StatCard
            icon={DollarSign}
            title="Valeur Totale"
            value={`${(stats.totalValue / 1000000).toFixed(1)}M`}
            color="bg-purple-500"
            trend="+15% ce mois"
          />
        </div>
      )}

      {/* Actions Bar & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        {/* Bulk Actions */}
        {selectedProperties.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedProperties.length} propriété(s) sélectionnée(s)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkStatusChange('available')}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Marquer disponible
                </button>
                <button
                  onClick={() => handleBulkStatusChange('sold')}
                  className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Marquer vendu
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setSelectedProperties([])}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher une propriété..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="sold">Vendu</option>
            <option value="pending">En attente</option>
          </select>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">Tous les types</option>
            <option value="residential">Résidentiel</option>
            <option value="commercial">Commercial</option>
            <option value="agricultural">Agricole</option>
            <option value="industrial">Industriel</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Select All */}
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {selectedProperties.length === filteredProperties.length && filteredProperties.length > 0 ? (
              <CheckSquare size={20} className="text-green-600" />
            ) : (
              <Square size={20} />
            )}
            Tout
          </button>
        </div>
      </div>

      {/* Properties Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <Home size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Aucune propriété trouvée</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propriété
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localisation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedProperties.includes(property.id)}
                          onChange={() => toggleSelectProperty(property.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            {property.image ? (
                              <img src={property.image} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <ImageIcon size={20} className="text-gray-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {property.title}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {property.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MapPin size={14} />
                          {property.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          {property.price}
                        </div>
                        {property.area && (
                          <div className="text-xs text-gray-500">{property.area} m²</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {property.type || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          property.status === 'available' ? 'bg-green-100 text-green-800' :
                          property.status === 'sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {property.status === 'available' ? 'Disponible' :
                           property.status === 'sold' ? 'Vendu' : 'En attente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedProperty(property)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                            className="text-green-600 hover:text-green-900"
                            title="Modifier"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedProperty(property);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <Home size={48} className="mx-auto mb-2 text-gray-400" />
                      <p>Aucune propriété trouvée</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Property Detail Modal */}
      {selectedProperty && !showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Détails de la Propriété</h2>
              <button
                onClick={() => setSelectedProperty(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Image */}
              {selectedProperty.image && (
                <img 
                  src={selectedProperty.image} 
                  alt={selectedProperty.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
              
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Titre</p>
                  <p className="text-lg font-bold text-gray-900">{selectedProperty.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Prix</p>
                  <p className="text-lg font-bold text-green-600">{selectedProperty.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Localisation</p>
                  <p className="text-base text-gray-900">{selectedProperty.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedProperty.status === 'available' ? 'bg-green-100 text-green-800' :
                    selectedProperty.status === 'sold' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedProperty.status === 'available' ? 'Disponible' :
                     selectedProperty.status === 'sold' ? 'Vendu' : 'En attente'}
                  </span>
                </div>
                {selectedProperty.area && (
                  <div>
                    <p className="text-sm text-gray-600">Surface</p>
                    <p className="text-base text-gray-900">{selectedProperty.area} m²</p>
                  </div>
                )}
                {selectedProperty.type && (
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="text-base text-gray-900">{selectedProperty.type}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedProperty.description && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900">{selectedProperty.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    navigate(`/admin/properties/edit/${selectedProperty.id}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Edit size={20} />
                  Modifier
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer la propriété "<strong>{selectedProperty.title}</strong>" ? 
              Cette action est irréversible.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedProperty(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDelete(selectedProperty.id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
