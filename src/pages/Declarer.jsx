import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PhotoIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/layout/Layout';
import Container from '../components/ui/Container';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ROUTES, CITIES } from '../config/constants';
import { useTranslation } from 'react-i18next';

function Declarer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Informations de base
    title: '',
    description: '',
    price: '',
    surface: '',
    
    // Localisation
    region: '',
    city: '',
    district: '',
    address: '',
    
    // Type et statut
    type: 'residential',
    status: 'available',
    
    // Contact
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    
    // Documents
    hasTitleDeed: false,
    hasPropertyCertificate: false,
    hasAuthorization: false,
    
    // Médias
    images: [],
    videoUrl: '',
    view3dUrl: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Créer des URLs pour prévisualiser les images
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
      setErrors(prev => ({ ...prev, images: undefined }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = t('declarer.errors.title_required');
      if (!formData.description.trim()) newErrors.description = t('declarer.errors.description_required');
      if (!formData.price || formData.price <= 0) newErrors.price = t('declarer.errors.price_invalid');
      if (!formData.surface || formData.surface <= 0) newErrors.surface = t('declarer.errors.surface_invalid');
    }

    if (currentStep === 2) {
      if (!formData.region) newErrors.region = t('declarer.errors.region_required');
      if (!formData.city) newErrors.city = t('declarer.errors.city_required');
      if (!formData.district.trim()) newErrors.district = t('declarer.errors.district_required');
      if (!formData.address.trim()) newErrors.address = t('declarer.errors.address_required');
    }

    if (currentStep === 3) {
      if (!formData.ownerName.trim()) newErrors.ownerName = t('declarer.errors.name_required');
      if (!formData.ownerEmail.trim()) newErrors.ownerEmail = t('declarer.errors.email_required');
      if (!formData.ownerPhone.trim()) newErrors.ownerPhone = t('declarer.errors.phone_required');
      
      // Validation email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.ownerEmail && !emailRegex.test(formData.ownerEmail)) {
        newErrors.ownerEmail = t('declarer.errors.email_invalid');
      }

      // Validation téléphone
      if (formData.ownerPhone && formData.ownerPhone.length < 8) {
        newErrors.ownerPhone = t('declarer.errors.phone_invalid');
      }
    }

    if (currentStep === 4) {
      if (!formData.images || formData.images.length === 0) {
        newErrors.images = t('declarer.errors.image_required');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) setStep(step + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(t('declarer.error_fill_fields'));
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Vérifier si toutes les étapes précédentes sont valides (sans modifier l'état)
  const checkStepValidity = (stepNumber) => {
    if (stepNumber === 1) {
      return formData.title.trim() && 
             formData.description.trim() && 
             formData.price > 0 && 
             formData.surface > 0;
    }
    if (stepNumber === 2) {
      return formData.region && 
             formData.city && 
             formData.district.trim() && 
             formData.address.trim();
    }
    if (stepNumber === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return formData.ownerName.trim() && 
             formData.ownerEmail.trim() && 
             emailRegex.test(formData.ownerEmail) &&
             formData.ownerPhone.trim() && 
             formData.ownerPhone.length >= 8;
    }
    if (stepNumber === 4) {
      return formData.images && formData.images.length > 0;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valider toutes les étapes avant la soumission (y compris l'étape 4)
    for (let i = 1; i <= 4; i++) {
      if (!validateStep(i)) {
        const stepNames = {
          1: t('declarer.steps.info'),
          2: t('declarer.steps.location'),
          3: t('declarer.steps.contact_docs'),
          4: t('declarer.steps.media')
        };
        setErrorMessage(`❌ Erreur à l'étape ${i} (${stepNames[i]}) : Veuillez compléter tous les champs obligatoires avant de publier votre annonce.`);
        setShowError(true);
        setStep(i);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setShowError(false), 5000);
        return;
      }
    }

    setIsLoading(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Redirection après 3 secondes
      setTimeout(() => {
        navigate(ROUTES.PROPERTIES);
      }, 3000);
    }, 2000);
  };

  const steps = [
    { number: 1, title: t('declarer.steps.info'), icon: HomeIcon },
    { number: 2, title: t('declarer.steps.location'), icon: MapPinIcon },
    { number: 3, title: t('declarer.steps.contact_docs'), icon: DocumentTextIcon },
    { number: 4, title: t('declarer.steps.media'), icon: PhotoIcon }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-green-500/20 text-black py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('declarer.hero_title')}
            </h1>
            <p className="text-xl text-black">
              {t('declarer.hero_desc')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md text-center"
          >
            <CheckCircleIcon className="h-20 w-20 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('declarer.success_title')}
            </h2>
            <p className="text-gray-600">
              {t('declarer.success_desc')}
            </p>
          </motion.div>
        </div>
      )}

      {/* Error Alert */}
      {showError && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-full mx-4"
        >
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg shadow-lg">
            <div className="flex items-start">
              <XMarkIcon className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">{errorMessage}</p>
              </div>
              <button
                onClick={() => setShowError(false)}
                className="text-red-600 hover:text-red-800 ml-3"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Progress Steps */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Step Indicator */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {steps.map((s, index) => (
                  <React.Fragment key={s.number}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          step >= s.number
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step > s.number ? (
                          <CheckCircleIcon className="h-6 w-6" />
                        ) : (
                          <s.icon className="h-6 w-6" />
                        )}
                      </div>
                      <span className="text-xs mt-2 font-medium text-gray-600">
                        {s.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 transition-all ${
                          step > s.number ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form */}
            <Card>
              <CardContent className="p-8">
                {/* Avertissement */}
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-gray-700">
                    ⚠️ <strong>{t('common.important') || 'Important'} :</strong> {t('declarer.important_note')}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Informations de base */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t('declarer.form.title_label')}
                      </h2>

                      <div>
                        <Input
                          label={t('declarer.form.annonce_title')}
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          placeholder={t('declarer.form.annonce_placeholder')}
                        />
                        {errors.title && (
                          <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('declarer.form.description')} *
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          rows="5"
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:outline-none`}
                          placeholder={t('declarer.form.description_placeholder')}
                        />
                        {errors.description && (
                          <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            label={t('declarer.form.price_label')}
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            icon={CurrencyDollarIcon}
                            placeholder="5000000"
                          />
                          {errors.price && (
                            <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                          )}
                        </div>

                        <div>
                          <Input
                            label={t('declarer.form.surface_label')}
                            name="surface"
                            type="number"
                            value={formData.surface}
                            onChange={handleChange}
                            required
                            placeholder="500"
                          />
                          {errors.surface && (
                            <p className="text-red-600 text-sm mt-1">{errors.surface}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('declarer.form.type_label')}
                          </label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                          >
                            <option value="residential">{t('declarer.form.types.residential')}</option>
                            <option value="commercial">{t('declarer.form.types.commercial')}</option>
                            <option value="agricultural">{t('declarer.form.types.agricultural')}</option>
                            <option value="industrial">{t('declarer.form.types.industrial')}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('declarer.form.status_label')}
                          </label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                          >
                            <option value="available">{t('declarer.form.statuses.available')}</option>
                            <option value="pending">{t('declarer.form.statuses.pending')}</option>
                            <option value="private">{t('declarer.form.statuses.private')}</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Localisation */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t('declarer.form.location_title')}
                      </h2>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('declarer.form.region_label')} *
                          </label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.region ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:outline-none`}
                        >
                          <option value="">{t('declarer.form.region_placeholder')}</option>
                          <option value="Maritime">Maritime</option>
                          <option value="Plateaux">Plateaux</option>
                          <option value="Centrale">Centrale</option>
                          <option value="Kara">Kara</option>
                          <option value="Savanes">Savanes</option>
                        </select>
                        {errors.region && (
                          <p className="text-red-600 text-sm mt-1">{errors.region}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('declarer.form.city_label')} *
                        </label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className={`w-full px-4 py-2.5 rounded-lg border ${
                            errors.city ? 'border-red-500' : 'border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:outline-none`}
                        >
                          <option value="">{t('declarer.form.city_placeholder')}</option>
                          {CITIES.map(city => (
                            <option key={city.id} value={city.name}>{city.name}</option>
                          ))}
                        </select>
                        {errors.city && (
                          <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <Input
                          label={t('declarer.form.district_label')}
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          required
                          placeholder={t('declarer.form.district_placeholder')}
                        />
                        {errors.district && (
                          <p className="text-red-600 text-sm mt-1">{errors.district}</p>
                        )}
                      </div>

                      <div>
                        <Input
                          label={t('declarer.form.address_label')}
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          icon={MapPinIcon}
                          placeholder={t('declarer.form.address_placeholder')}
                        />
                        {errors.address && (
                          <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact & Documents */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t('declarer.form.contact_title')}
                      </h2>

                      <div className="bg-primary-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{t('declarer.form.contact_info_title')}</h3>
                        <p className="text-sm text-gray-600">{t('declarer.form.contact_info_desc')}</p>
                      </div>

                      <div>
                        <Input
                          label={t('declarer.form.owner_name')}
                          name="ownerName"
                          value={formData.ownerName}
                          onChange={handleChange}
                          required
                          placeholder={t('declarer.form.owner_name_placeholder')}
                        />
                        {errors.ownerName && (
                          <p className="text-red-600 text-sm mt-1">{errors.ownerName}</p>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Input
                            label={t('declarer.form.email_label')}
                            name="ownerEmail"
                            type="email"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                            required
                            placeholder="email@exemple.com"
                          />
                          {errors.ownerEmail && (
                            <p className="text-red-600 text-sm mt-1">{errors.ownerEmail}</p>
                          )}
                        </div>

                        <div>
                          <Input
                            label={t('declarer.form.phone_label')}
                            name="ownerPhone"
                            type="tel"
                            value={formData.ownerPhone}
                            onChange={handleChange}
                            required
                            placeholder="+228 XX XX XX XX"
                          />
                          {errors.ownerPhone && (
                            <p className="text-red-600 text-sm mt-1">{errors.ownerPhone}</p>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6 mt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">{t('declarer.docs_title')}</h3>
                        <div className="space-y-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="hasTitleDeed"
                              checked={formData.hasTitleDeed}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className="ml-3 text-gray-700">{t('declarer.docs.title_deed')}</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="hasPropertyCertificate"
                              checked={formData.hasPropertyCertificate}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className="ml-3 text-gray-700">{t('declarer.docs.property_cert')}</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="hasAuthorization"
                              checked={formData.hasAuthorization}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <span className="ml-3 text-gray-700">{t('declarer.docs.sale_auth')}</span>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Médias */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t('declarer.form_media.title')}
                      </h2>

                      {/* Avertissement si étapes incomplètes */}
                      {(!checkStepValidity(1) || !checkStepValidity(2) || !checkStepValidity(3) || !checkStepValidity(4)) && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg mb-6">
                          <p className="text-sm text-red-800 font-medium">
                            ⚠️ <strong>{t('common.attention')} :</strong> {t('declarer.form_media.warning_incomplete')}
                          </p>
                          <div className="mt-2 text-xs text-red-700">
                            {!checkStepValidity(1) && <p>• {t('declarer.form_media.error_step1')}</p>}
                            {!checkStepValidity(2) && <p>• {t('declarer.form_media.error_step2')}</p>}
                            {!checkStepValidity(3) && <p>• {t('declarer.form_media.error_step3')}</p>}
                            {!checkStepValidity(4) && <p>• {t('declarer.form_media.error_step4')}</p>}
                          </div>
                        </div>
                      )}

                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-gray-700">
                          📸 <strong>{t('declarer.form_media.photo_mandatory_title')}</strong> {t('declarer.form_media.photo_mandatory_desc')}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('declarer.form_media.photo_label')}
                        </label>
                        
                        {/* Zone d'upload */}
                        <label 
                          htmlFor="images"
                          className={`border-2 border-dashed rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer block ${
                            errors.images ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        >
                          <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600 mb-2">{t('common.select_file')}</p>
                          <p className="text-xs text-gray-500">{t('common.file_types')}</p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="images"
                          />
                        </label>
                        
                        {errors.images && (
                          <p className="text-red-600 text-sm mt-1">{errors.images}</p>
                        )}

                        {/* Prévisualisation des images */}
                        {formData.images.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              {formData.images.length === 1 
                                ? t('declarer.form_media.photos_selected', { count: formData.images.length })
                                : t('declarer.form_media.photos_selected_plural', { count: formData.images.length })}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {formData.images.map((img, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={img}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                  >
                                    <XMarkIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <Input
                        label={t('declarer.form_media.video_label')}
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        placeholder={t('declarer.form_media.video_placeholder')}
                      />

                      <Input
                        label={t('declarer.form_media.view3d_label')}
                        name="view3dUrl"
                        value={formData.view3dUrl}
                        onChange={handleChange}
                        placeholder={t('declarer.form_media.view3d_placeholder')}
                      />
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrev}
                        className="flex-1"
                      >
                        {t('common.previous')}
                      </Button>
                    )}

                    {step < 4 ? (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={handleNext}
                        className="flex-1"
                      >
                        {t('common.next')}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {t('common.publish')}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </Layout>
  );
}

export default Declarer;
