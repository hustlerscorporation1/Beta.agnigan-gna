import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  MapPinIcon,
  XMarkIcon,
  MapIcon,
  ListBulletIcon
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

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const PropertiesWithMap = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const regions = [
    { value: 'all', label: 'Toutes les régions' },
    { value: 'Maritime', label: 'Maritime' },
    { value: 'Plateaux', label: 'Plateaux' },
    { value: 'Centrale', label: 'Centrale' },
    { value: 'Kara', label: 'Kara' },
    { value: 'Savanes', label: 'Savanes' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'available', label: 'Disponible' },
    { value: 'pending', label: 'En cours' },
    { value: 'private', label: 'Privé' }
  ];

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
            </div>
            <div className="flex gap-2">
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
              <Button
                variant="outline"
                icon={FunnelIcon}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filtres
              </Button>
            </div>
          </div>

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
                  className="fixed top-32 right-4 z-50 w-[350px] bg-white rounded-xl shadow-2xl border border-gray-200"
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

                {/* Content */}
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Région
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors"
                    >
                      {regions.map((region) => (
                        <option key={region.value} value={region.value}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors"
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
                      setSelectedStatus('all');
                      setSearchQuery('');
                    }}
                  >
                    Réinitialiser
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
                <Card className="overflow-hidden h-[600px]">
                  <MapContainer
                    center={[8.6195, 1.1664]}
                    zoom={7}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
                            <button
                              onClick={() => navigate(`/Dectailletairrain?id=${property.id}`)}
                              className="text-xs bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700"
                            >
                              Voir détails
                            </button>
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
                    onClick={() => navigate(`/Dectailletairrain?id=${property.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <Badge variant={statusColors[property.status]}>
                          {statusLabels[property.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <MapPinIcon className="h-4 w-4 inline mr-1" />
                        {property.acteur}
                      </p>
                      <p className="text-sm font-semibold text-primary-600">
                        {property.price}
                      </p>
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
                    onClick={() => navigate(`/Dectailletairrain?id=${property.id}`)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
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

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-xs text-gray-500">Surface</div>
                          <div className="text-sm font-semibold text-gray-900">{property.surface}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Prix</div>
                          <div className="text-sm font-bold text-primary-600">{property.price}</div>
                        </div>
                      </div>
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
            </div>
          )}
        </Container>
      </section>
    </LayoutNoFooter>
  );
};

export default PropertiesWithMap;
