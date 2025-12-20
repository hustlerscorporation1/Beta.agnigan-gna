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
  ClockIcon,
  InformationCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  BellIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../superbase/superbaseClient';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ROUTES } from '../../config/constants';

const Profile = () => {
  const { t } = useTranslation();
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
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: t('profile.mock_notifications.notif1_title'),
      message: t('profile.mock_notifications.notif1_msg'),
      time: t('profile.mock_notifications.notif1_time'),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: t('profile.mock_notifications.notif2_title'),
      message: t('profile.mock_notifications.notif2_msg'),
      time: t('profile.mock_notifications.notif2_time'),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: t('profile.mock_notifications.notif3_title'),
      message: t('profile.mock_notifications.notif3_msg'),
      time: t('profile.mock_notifications.notif3_time'),
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: t('profile.mock_notifications.notif4_title'),
      message: t('profile.mock_notifications.notif4_msg'),
      time: t('profile.mock_notifications.notif4_time'),
      read: true
    }
  ]);

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return CheckCircleIcon;
      case 'warning':
        return ExclamationCircleIcon;
      case 'info':
        return InformationCircleIcon;
      default:
        return BellIcon;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      case 'info':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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

      setSuccess(t('profile.messages.success'));
      setIsEditing(false);
      loadUser(); // Recharger les données
    } catch (error) {
      setError(error.message || t('profile.messages.error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for user properties
  const userProperties = [
    {
      id: 1,
      title: t('profile.mock_properties.res'),
      location: 'Lomé, Agoènyivé',
      status: 'available',
      dateAdded: '15 Oct 2024'
    },
    {
      id: 2,
      title: t('profile.mock_properties.com'),
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
            <p className="text-gray-600">{t('profile.loading')}</p>
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
                    {t('profile.verified_badge')}
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
                      {t('profile.sell_land')}
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
                    <CardTitle>{t('profile.info_title')}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={PencilIcon}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? t('profile.cancel') : t('profile.edit')}
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
                        label={t('profile.form.first_name')}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={UserCircleIcon}
                      />

                      <Input
                        label={t('profile.form.last_name')}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={UserCircleIcon}
                      />
                    </div>

                    <Input
                      label={t('profile.form.phone')}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={PhoneIcon}
                    />

                    <Input
                      label={t('profile.form.address')}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={MapPinIcon}
                      placeholder={t('profile.form.address_placeholder')}
                    />

                    {isEditing && (
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={isLoading}
                        disabled={isLoading}
                      >
                        {t('profile.save_changes')}
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>

              {/* User Properties */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('profile.my_actions')}</CardTitle>
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
                                {t('profile.added_on', { date: property.dateAdded })}
                              </p>
                            </div>
                          </div>
                          <Badge variant={property.status === 'available' ? 'success' : 'warning'}>
                            {property.status === 'available' ? t('profile.status.available') : t('profile.status.reserved')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <HomeIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 mb-4">{t('profile.no_properties')}</p>
                      <Button
                        variant="primary"
                        onClick={() => navigate(ROUTES.DECLARE_PROPERTY)}
                      >
                        {t('profile.sell_first')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notifications Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle>{t('profile.notifications.title')}</CardTitle>
                      {unreadCount > 0 && (
                        <Badge variant="danger" className="rounded-full px-2 py-0.5 text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                      >
                        {t('profile.notifications.mark_all_read')}
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {notifications.length > 0 ? (
                    <div className="space-y-3">
                      {notifications.map((notification) => {
                        const Icon = getNotificationIcon(notification.type);
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className={`p-4 rounded-lg border transition-all ${
                              notification.read
                                ? 'bg-white border-gray-200'
                                : 'bg-blue-50 border-blue-200 shadow-sm'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                                <Icon className="h-5 w-5" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className={`font-semibold ${
                                    notification.read ? 'text-gray-700' : 'text-gray-900'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  <button
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                                  >
                                    <XMarkIcon className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <p className="text-xs text-gray-500 flex items-center">
                                    <ClockIcon className="h-3 w-3 mr-1" />
                                    {notification.time}
                                  </p>
                                  {!notification.read && (
                                    <button
                                      onClick={() => markAsRead(notification.id)}
                                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                      {t('profile.notifications.mark_read')}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BellIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600">{t('profile.notifications.empty_title')}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {t('profile.notifications.empty_desc')}
                      </p>
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
