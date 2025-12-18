import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  XMarkIcon,
  MapIcon,
  ListBulletIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LayoutNoFooter from '../../components/layout/LayoutNoFooter';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { properties } from '../../data/properties';
import { 
  regions, 
  statusOptions, 
  getPrefectures, 
  getCommunes, 
  getCantons, 
  getQuartiers 
} from '../../data/togoLocations';
import { ROUTES } from '../../config/constants';

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const PropertiesWithMap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Gérer le paramètre de recherche de l'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(decodeURIComponent(search));
    }
  }, [location.search]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPrefecture, setSelectedPrefecture] = useState('all');
  const [selectedCommune, setSelectedCommune] = useState('all');
  const [selectedCanton, setSelectedCanton] = useState('all');
  const [selectedQuartier, setSelectedQuartier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [mapLayer, setMapLayer] = useState('osm'); // 'osm', 'cartodb', 'esri'

  // Options dynamiques basées sur les sélections
  const prefectureOptions = [
    { value: 'all', label: 'Toutes les préfectures' },
    ...getPrefectures(selectedRegion)
  ];

  const communeOptions = [
    { value: 'all', label: 'Toutes les communes' },
    ...getCommunes(selectedRegion, selectedPrefecture)
  ];

  const cantonOptions = [
    { value: 'all', label: 'Tous les cantons' },
    ...getCantons(selectedRegion, selectedPrefecture, selectedCommune)
  ];

  const quartierOptions = [
    { value: 'all', label: 'Tous les quartiers' },
    ...getQuartiers(selectedRegion, selectedPrefecture, selectedCommune)
  ];

  // Réinitialiser les filtres dépendants lors du changement
  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    setSelectedPrefecture('all');
    setSelectedCommune('all');
    setSelectedCanton('all');
    setSelectedQuartier('all');
  };

  const handlePrefectureChange = (value) => {
    setSelectedPrefecture(value);
    setSelectedCommune('all');
    setSelectedCanton('all');
    setSelectedQuartier('all');
  };

  const handleCommuneChange = (value) => {
    setSelectedCommune(value);
    setSelectedCanton('all');
    setSelectedQuartier('all');
  };

  // Map layers configuration
  const mapLayers = {
    osm: {
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    cartodb: {
      name: 'CartoDB',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    esri: {
      name: 'Esri World Imagery',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  };

  const statusColors = {
    available: 'success',
    pending: 'warning',
    private: 'danger'
  };

  const statusLabels = {
    available: 'Disponible',
    pending: 'En cours',
    private: 'Privé'
  };

  // Filtrage avec vraies données
  const filteredProperties = properties.filter((property) => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.acteur.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || property.region === selectedRegion;
    const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Masquer la carte automatiquement si aucun terrain n'est trouvé
  useEffect(() => {
    if (filteredProperties.length === 0) {
      setShowMap(false);
    }
  }, [filteredProperties.length]);

  return (
    <LayoutNoFooter>
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Propriétés au Togo
            </h1>
            <p className="text-lg text-primary-100">
              {filteredProperties.length} terrain(s) disponible(s) dans toutes les régions
            </p>
          </motion.div>
        </Container>
      </section> */}

      {/* Search and View Toggle */}
      <section className="py-6 bg-white shadow-md sticky top-1 z-40">
        <Container>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Rechercher par nom, ville, région..."
                icon={MagnifyingGlassIcon}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 Vous connaissez l'ID du terrain ? Utilisez la barre de recherche en haut pour y accéder directement !
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="success"
                className="hidden lg:flex"
                onClick={() => navigate(`${ROUTES.CONTACT}?subject=Demande%20Particulière`)}
              >
                Soumettre une demande particulière
              </Button>
              <Button
                variant={showMap ? 'primary' : 'outline'}
                icon={MapIcon}
                onClick={() => setShowMap(true)}
              >
                Carte
              </Button>
              <Button
                variant={!showMap ? 'primary' : 'outline'}
                icon={ListBulletIcon}
                onClick={() => setShowMap(false)}
              >
                Liste
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  icon={FunnelIcon}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filtres
                </Button>
                {(selectedRegion !== 'all' || selectedPrefecture !== 'all' || selectedCommune !== 'all' || selectedCanton !== 'all' || selectedQuartier !== 'all' || selectedStatus !== 'all') && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {[selectedRegion, selectedPrefecture, selectedCommune, selectedCanton, selectedQuartier, selectedStatus].filter(f => f !== 'all').length}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedRegion !== 'all' || selectedPrefecture !== 'all' || selectedCommune !== 'all' || selectedCanton !== 'all' || selectedQuartier !== 'all' || selectedStatus !== 'all') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {selectedRegion !== 'all' && (
                <Badge variant="primary" className="px-3 py-1">
                  Région: {regions.find(r => r.value === selectedRegion)?.label}
                </Badge>
              )}
              {selectedPrefecture !== 'all' && (
                <Badge variant="primary" className="px-3 py-1">
                  Préfecture: {prefectureOptions.find(p => p.value === selectedPrefecture)?.label}
                </Badge>
              )}
              {selectedCommune !== 'all' && (
                <Badge variant="primary" className="px-3 py-1">
                  Commune: {communeOptions.find(c => c.value === selectedCommune)?.label}
                </Badge>
              )}
              {selectedCanton !== 'all' && (
                <Badge variant="primary" className="px-3 py-1">
                  Canton: {selectedCanton}
                </Badge>
              )}
              {selectedQuartier !== 'all' && (
                <Badge variant="primary" className="px-3 py-1">
                  Quartier: {selectedQuartier}
                </Badge>
              )}
              {selectedStatus !== 'all' && (
                <Badge variant={statusColors[selectedStatus]} className="px-3 py-1">
                  {statusLabels[selectedStatus]}
                </Badge>
              )}
            </motion.div>
          )}

          {/* Filters Panel - Floating */}
          <AnimatePresence>
            {showFilters && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 z-40"
                  onClick={() => setShowFilters(false)}
                />
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="fixed top-32 right-4 z-50 w-[350px] max-h-[calc(100vh-150px)] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col"
                >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FunnelIcon className="h-5 w-5 mr-2" />
                    Filtres de recherche
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Content - Scrollable */}
                <div className="p-4 space-y-4 overflow-y-auto flex-1">
  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🇬 Région
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => handleRegionChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white"
                    >
                      {regions.map((region) => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedRegion !== 'all' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏛️ Préfecture
                      </label>
                      <select
                        value={selectedPrefecture}
                        onChange={(e) => handlePrefectureChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white"
                      >
                        {prefectureOptions.map((prefecture) => (
                          <option key={prefecture.value} value={prefecture.value}>
                            {prefecture.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedPrefecture !== 'all' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏘️ Commune
                      </label>
                      <select
                        value={selectedCommune}
                        onChange={(e) => handleCommuneChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white"
                      >
                        {communeOptions.map((commune) => (
                          <option key={commune.value} value={commune.value}>
                            {commune.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedCommune !== 'all' && cantonOptions.length > 1 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏞️ Canton
                      </label>
                      <select
                        value={selectedCanton}
                        onChange={(e) => setSelectedCanton(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white"
                      >
                        {cantonOptions.map((canton) => (
                          <option key={canton.value} value={canton.value}>
                            {canton.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {selectedCommune !== 'all' && quartierOptions.length > 1 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏘️ Quartier
                      </label>
                      <select
                        value={selectedQuartier}
                        onChange={(e) => setSelectedQuartier(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white"
                      >
                        {quartierOptions.map((quartier) => (
                          <option key={quartier.value} value={quartier.value}>
                            {quartier.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📄 Statut
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors bg-white"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => {
                      setSelectedRegion('all');
                      setSelectedPrefecture('all');
                      setSelectedCommune('all');
                      setSelectedCanton('all');
                      setSelectedQuartier('all');
                      setSelectedStatus('all');
                      setSearchQuery('');
                    }}
                  >
                    Réinitialiser tout
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => setShowFilters(false)}
                  >
                    Appliquer
                  </Button>
                </div>
              </motion.div>
            </>
          )}
          </AnimatePresence>
        </Container>
      </section>

      {/* Content */}
      <section className="section mt-2 gradient-bg">
        <Container>
          {showMap ? (
            /* Map View */
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 z-10">
                {/* Map Layer Selector */}
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setMapLayer('osm')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      mapLayer === 'osm'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    🗺️ OpenStreetMap
                  </button>
                  <button
                    onClick={() => setMapLayer('cartodb')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      mapLayer === 'cartodb'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    🌍 CartoDB
                  </button>
                  <button
                    onClick={() => setMapLayer('esri')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      mapLayer === 'esri'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    🛫 Satellite
                  </button>
                </div>

                <Card className="overflow-hidden h-[600px]">
                  <MapContainer
                    center={[8.6195, 1.1664]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      key={mapLayer}
                      url={mapLayers[mapLayer].url}
                      attribution={mapLayers[mapLayer].attribution}
                    />
                    {filteredProperties.map((property) => (
                      <Marker
                        key={property.id}
                        position={property.coordinates}
                      >
                        <Popup>
                          <div className="text-center">
                            <h3 className="font-bold text-gray-900">{property.title}</h3>
                            <p className="text-sm text-gray-600">{property.acteur}</p>
                            <p className="text-sm font-semibold text-primary-600 my-2">
                              {property.price}
                            </p>
                            <div className="flex flex-col gap-2">
                              {property.status === 'available' && (
                                <button
                                  onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}
                                  className="text-xs bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 font-semibold"
                                >
                                  🛒 Acheter
                                </button>
                              )}
                              <button
                                onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}
                                className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700"
                              >
                                Voir détails
                              </button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </Card>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredProperties.map((property) => (
                  <Card
                    key={property.id}
                    hover
                    className="cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2" onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}>
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <Badge variant={statusColors[property.status]}>
                          {statusLabels[property.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1" onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}>
                        <MapPinIcon className="h-4 w-4 inline mr-1" />
                        {property.acteur}
                      </p>
                      <p className="text-sm font-semibold text-primary-600 mb-3" onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}>
                        {property.price}
                      </p>
                      {property.status === 'available' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-3 rounded transition-colors duration-200 flex items-center justify-center gap-1"
                        >
                          <ShoppingCartIcon className="h-4 w-4" />
                          Acheter
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            /* List View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    hover
                    className="h-full overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="default" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                          ID: {property.id}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant={statusColors[property.status]}>
                          {statusLabels[property.status]}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                        {property.title}
                      </h3>

                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {property.acteur}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-4">
                        <div>
                          <div className="text-xs text-gray-500">Surface</div>
                          <div className="text-sm font-semibold text-gray-900">{property.surface}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Prix</div>
                          <div className="text-sm font-bold text-primary-600">{property.price}</div>
                        </div>
                      </div>
                      
                      {/* Bouton Acheter pour terrains disponibles */}
                      {property.status === 'available' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <ShoppingCartIcon className="h-5 w-5" />
                          Acheter ce terrain
                        </button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <XMarkIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun terrain trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('all');
                    setSelectedStatus('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
                <Button
                  variant="success"
                  onClick={() => navigate(`${ROUTES.CONTACT}?subject=Demande%20Particulière`)}
                >
                  Soumettre une demande particulière
                </Button>
              </div>
            </div>
          )}
          
          {filteredProperties.length > 0 && !showMap && (
            <div className="mt-12 text-center p-8 bg-primary-50 rounded-2xl border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vous ne trouvez pas votre bonheur ?</h3>
              <p className="text-gray-600 mb-6">Faites-nous part de vos besoins spécifiques et nous trouverons le terrain idéal pour vous.</p>
              <Button
                variant="success"
                onClick={() => navigate(`${ROUTES.CONTACT}?subject=Demande%20Particulière`)}
              >
                Soumettre une demande particulière
              </Button>
            </div>
          )}
        </Container>
      </section>
    </LayoutNoFooter>
  );
};

export default PropertiesWithMap;
