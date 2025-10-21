import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  HomeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../superbase/superbaseClient';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ROUTES } from '../../config/constants';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate(ROUTES.LOGIN);
        return;
      }

      setUser(session.user);
      setFormData({
        firstName: session.user.user_metadata?.first_name || '',
        lastName: session.user.user_metadata?.last_name || '',
        phone: session.user.user_metadata?.phone || '',
        address: session.user.user_metadata?.address || ''
      });
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address: formData.address
        }
      });

      if (error) throw error;

      setSuccess('Profil mis à jour avec succès !');
      setIsEditing(false);
      loadUser(); // Recharger les données
    } catch (error) {
      setError(error.message || 'Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for user properties
  const userProperties = [
    {
      id: 1,
      title: 'Terrain Résidentiel',
      location: 'Lomé, Agoènyivé',
      status: 'available',
      dateAdded: '15 Oct 2024'
    },
    {
      id: 2,
      title: 'Terrain Commercial',
      location: 'Vogan',
      status: 'reserved',
      dateAdded: '10 Oct 2024'
    }
  ];

  if (!user) {
    return (
      <Layout>
        <Container className="py-20">
          <div className="text-center">
            <p className="text-gray-600">Chargement...</p>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding gradient-bg">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - User Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserCircleIcon className="h-16 w-16 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  
                  <Badge variant="success" className="mb-6">
                    Compte vérifié
                  </Badge>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center text-sm text-gray-600">
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      {user.email}
                    </div>
                    {formData.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="h-5 w-5 mr-2" />
                        {formData.phone}
                      </div>
                    )}
                    {formData.address && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="h-5 w-5 mr-2" />
                        {formData.address}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => navigate(ROUTES.DECLARE_PROPERTY)}
                    >
                      Déclarer un terrain
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Edit Profile */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Informations du profil</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={PencilIcon}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Annuler' : 'Modifier'}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">✓ {success}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Prénom"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={UserCircleIcon}
                      />

                      <Input
                        label="Nom"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={UserCircleIcon}
                      />
                    </div>

                    <Input
                      label="Téléphone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={PhoneIcon}
                    />

                    <Input
                      label="Adresse"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={MapPinIcon}
                      placeholder="Votre adresse"
                    />

                    {isEditing && (
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        Enregistrer les modifications
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* User Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>Mes terrains déclarés</CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  {userProperties.length > 0 ? (
                    <div className="space-y-4">
                      {userProperties.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                        >
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <HomeIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{property.title}</h4>
                              <p className="text-sm text-gray-600 flex items-center mt-1">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                {property.location}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center mt-1">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Ajouté le {property.dateAdded}
                              </p>
                            </div>
                          </div>
                          <Badge variant={property.status === 'available' ? 'success' : 'warning'}>
                            {property.status === 'available' ? 'Disponible' : 'Réservé'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <HomeIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 mb-4">Aucun terrain déclaré</p>
                      <Button
                        variant="primary"
                        onClick={() => navigate(ROUTES.DECLARE_PROPERTY)}
                      >
                        Déclarer mon premier terrain
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Profile;
