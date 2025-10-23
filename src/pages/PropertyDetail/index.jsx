import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ShoppingCartIcon,
  CubeIcon,
  PlayCircleIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { properties } from '../../data/properties';
import { ROUTES } from '../../config/constants';

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const propertyId = parseInt(id);
  
  const property = properties.find(p => p.id === propertyId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [show3DView, setShow3DView] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mapLayer, setMapLayer] = useState('osm'); // 'osm', 'cartodb', 'esri'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <Layout>
        <Container className="py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Terrain non trouvé</h2>
          <Button onClick={() => navigate(ROUTES.PROPERTIES)}>
            Retour aux propriétés
          </Button>
        </Container>
      </Layout>
    );
  }

  const images = property.images || [property.image];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowContactForm(false);
    alert('Votre demande a été envoyée avec succès !');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  return (
    <Layout>
      {/* Back Button */}
      <section className="bg-gray-50 py-4 border-b">
        <Container>
          <Button
            variant="ghost"
            icon={ArrowLeftIcon}
            onClick={() => navigate(ROUTES.PROPERTIES)}
          >
            Retour aux propriétés
          </Button>
        </Container>
      </section>

      {/* Header */}
      <section className="bg-white py-8 border-b">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={statusColors[property.status]}>
                  {statusLabels[property.status]}
                </Badge>
                <Badge variant="default" className="bg-gray-900 text-white">
                  ID: {property.id}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2" />
                <span className="text-lg">{property.acteur}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">Prix</p>
              <p className="text-4xl font-bold text-primary-600">{property.price}</p>
              <p className="text-sm text-gray-500 mt-1">Surface: {property.surface}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Image Gallery */}
      <section className="bg-gray-50 py-8">
        <Container>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="md:col-span-2 relative group">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative h-[500px] rounded-xl overflow-hidden"
              >
                <img
                  src={images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
                
              </motion.div>
            </div>

            {/* Thumbnails & Map */}
            <div className="space-y-4 z-10">
              {/* Thumbnails */}
              <div className="grid grid-cols-2 gap-2">
                {images.slice(0, 4).map((img, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`h-32 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      index === currentImageIndex ? 'border-primary-600' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={img} alt={`Vue ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>

              {/* Boutons 3D et Vidéo */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  fullWidth
                  icon={CubeIcon}
                  onClick={() => setShow3DView(true)}
                  className="bg-primary-600 text-white hover:text-primary-600 border-0"
                >
                  Voir en Réalité
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={VideoCameraIcon}
                  onClick={() => setShowVideoModal(true)}
                  className="bg-white text-primary-600 hover:text-primary-600 border-0"
                >
                  Voir la vidéo
                </Button>
              </div>

              {/* Map */}
              <div>
                <div className="mb-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setMapLayer('osm')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      mapLayer === 'osm'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    🗺️ OSM
                  </button>
                  <button
                    onClick={() => setMapLayer('cartodb')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      mapLayer === 'cartodb'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    🌍 CartoDB
                  </button>
                  <button
                    onClick={() => setMapLayer('esri')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      mapLayer === 'esri'
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    🛫 Satellite
                  </button>
                </div>
   
                <Card className="overflow-hidden z-3 h-64">
                  <MapContainer
                    center={property.coordinates}
                    zoom={15}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer 
                      key={mapLayer}
                      url={mapLayers[mapLayer].url}
                      attribution={mapLayers[mapLayer].attribution}
                    />
                    <Marker position={property.coordinates}>
                      <Popup>{property.title}</Popup>
                    </Marker>
                  </MapContainer>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed text-justify">
                    {property.description || `Magnifique terrain de ${property.surface} situé à ${property.acteur} dans la région ${property.region}. 
                    Ce terrain offre une excellente opportunité d'investissement dans une zone en plein développement. 
                    Avec tous les documents en règle et un accès facile, c'est l'emplacement idéal pour votre projet immobilier.
                    Le quartier bénéficie de toutes les commodités nécessaires et d'un excellent potentiel de valorisation.`}
                  </p>
                </CardContent>
              </Card>

              {/* Caractéristiques */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Caractéristiques</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <HomeIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Surface</p>
                        <p className="text-gray-600">{property.surface}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPinIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Région</p>
                        <p className="text-gray-600">{property.region}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <DocumentTextIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Statut</p>
                        <p className="text-gray-600">{statusLabels[property.status]}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CurrencyDollarIcon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Prix</p>
                        <p className="text-gray-600">{property.price}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              {property.documents && property.documents.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Documents Disponibles</h2>
                    <div className="space-y-3">
                      {property.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <DocumentTextIcon className="h-6 w-6 text-primary-600" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">{doc.description}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Télécharger
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {property.status === 'available' ? 'Acheter ce terrain' : 'Intéressé ?'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {property.status === 'available' 
                        ? 'Ce terrain est disponible à la vente. Contactez-nous pour finaliser votre achat.'
                        : 'Contactez-nous pour plus d\'informations sur ce terrain ou pour planifier une visite.'}
                    </p>
                    <div className="space-y-3">
                      {property.status === 'available' && (
                        <Button
                          variant="success"
                          fullWidth
                          size="lg"
                          icon={ShoppingCartIcon}
                          onClick={() => setShowContactForm(true)}
                        >
                          Acheter maintenant
                        </Button>
                      )}
                      <Button
                        variant={property.status === 'available' ? 'outline' : 'primary'}
                        fullWidth
                        size="lg"
                        onClick={() => setShowContactForm(true)}
                      >
                        Demander des informations
                      </Button>
                      <Button
                        variant="outline"
                        fullWidth
                        icon={PhoneIcon}
                        onClick={() => window.location.href = 'tel:+22890000000'}
                      >
                        Appeler maintenant
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Seller Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Vendeur</h3>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{property.acteur}</p>
                        <p className="text-sm text-gray-500">Agent vérifié</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {property.region}, Togo
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Safety Tips */}
                <Card className="bg-primary-50 border-primary-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Conseils de sécurité</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Vérifiez toujours les documents du terrain</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Visitez le terrain avant tout engagement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Ne payez jamais sans contrat officiel</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Demande d'information</h2>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Nom complet"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    icon={UserIcon}
                  />

                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    icon={EnvelopeIcon}
                  />

                  <Input
                    label="Téléphone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    icon={PhoneIcon}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
                      placeholder={`Je suis intéressé par le terrain "${property.title}"`}
                    />
                  </div>

                  <Button type="submit" variant="primary" fullWidth size="lg">
                    Envoyer la demande
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Vue 3D */}
      <AnimatePresence>
        {show3DView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow3DView(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <CubeIcon className="h-8 w-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Visite Virtuelle 3D</h2>
                  </div>
                  <button
                    onClick={() => setShow3DView(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Vue 3D Iframe ou Contenu */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-blue-300">
                  <CubeIcon className="h-24 w-24 text-blue-400 mb-6 animate-bounce" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Visite 3D Interactive
                  </h3>
                  <p className="text-gray-600 mb-6 text-center max-w-md">
                    Explorez ce terrain en 3D avec une vue à 360°. Déplacez-vous librement et découvrez chaque détail.
                  </p>
                  
                  {/* Placeholder - À remplacer par une vraie intégration 3D */}
                  <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                      <p className="text-sm text-gray-600 mb-2">Surface totale</p>
                      <p className="text-xl font-bold text-blue-600">{property.surface}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                      <p className="text-sm text-gray-600 mb-2">Localisation</p>
                      <p className="text-xl font-bold text-blue-600">{property.region}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-6 italic">
                    💡 Astuce: Cette vue 3D sera disponible prochainement avec une visite interactive complète
                  </p>
                  
                  {/* Pour intégrer une vraie vue 3D, décommentez et ajoutez votre URL:
                  <iframe
                    src="URL_DE_LA_VISITE_3D"
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Vidéo */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideoModal(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <VideoCameraIcon className="h-8 w-8 text-red-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Vidéo du Terrain</h2>
                  </div>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Vidéo du terrain */}
                <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video">
                  {/* Placeholder - À remplacer par une vraie vidéo */}
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-900 to-pink-900 text-white">
                    <PlayCircleIcon className="h-32 w-32 mb-6 animate-pulse" />
                    <h3 className="text-2xl font-bold mb-3">Visite Vidéo du Terrain</h3>
                    <p className="text-red-100 mb-4 text-center max-w-md px-4">
                      Découvrez ce magnifique terrain en vidéo HD avec des vues aériennes et au sol.
                    </p>
                    <p className="text-sm text-red-200 italic">
                      📹 La vidéo sera disponible prochainement
                    </p>
                  </div>

                  {/* Pour intégrer une vraie vidéo YouTube, décommentez et ajoutez votre ID:
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title="Vidéo du terrain"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  */}

                  {/* Pour une vidéo locale, décommentez:
                  <video
                    className="w-full h-full"
                    controls
                    autoPlay
                    src="/videos/terrain-video.mp4"
                  >
                    Votre navigateur ne supporte pas la vidéo.
                  </video>
                  */}
                </div>

                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>📹 À propos de cette vidéo:</strong> Cette visite vidéo vous permet de voir le terrain sous tous les angles. 
                    Idéal pour avoir une première impression avant de planifier votre visite sur place.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default PropertyDetail;
