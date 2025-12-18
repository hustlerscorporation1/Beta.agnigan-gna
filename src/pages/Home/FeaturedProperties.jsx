import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Card, { CardContent } from '../../components/ui/Card';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ROUTES, CITIES } from '../../config/constants';
import { properties } from '../../data/properties';
import { useTranslation } from 'react-i18next';

const FeaturedProperties = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Sélectionner les 4 premiers terrains disponibles comme terrains en vedette
  const featuredProperties = properties
    .filter(property => property.status === 'available')
    .slice(0, 4)
    .map(property => ({
      ...property,
      location: property.acteur // Utiliser acteur comme location
    }));

  const statusColors = {
    available: 'success',
    private: 'danger',
    pending: 'warning'
  };

  const statusLabels = {
    available: t('home.featured.stats.available'),
    private: t('home.featured.stats.private'),
    pending: t('home.featured.stats.pending')
  };

  return (
    <section className="section-padding gradient-bg">
      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('home.featured.title')} <span className="text-gradient">{t('home.featured.subtitle')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.featured.description')}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full overflow-hidden group cursor-pointer" onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${property.id}`)}>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="default" className="bg-black/70 text-black-600 border-0 backdrop-blur-sm">
                      ID: {property.id}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={statusColors[property.status]}>
                      {statusLabels[property.status]}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>

                  <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500">{t('home.featured.surface')}</div>
                      <div className="text-sm font-semibold text-gray-900">{property.surface}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{t('home.featured.price')}</div>
                      <div className="text-sm font-semibold text-primary-600">{property.price}</div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" fullWidth>
                    {t('home.featured.view_details')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cities Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            {t('home.featured.explore_cities')}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CITIES.map((city) => (
              <Button
                key={city.id}
                variant="outline"
                size="sm"
                onClick={() => navigate(`${ROUTES.PROPERTIES}?city=${city.slug}`)}
              >
                <MapPinIcon className="h-4 w-4 mr-2" />
                {city.name}
              </Button>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={ArrowRightIcon}
            iconPosition="right"
            onClick={() => navigate(ROUTES.PROPERTIES)}
          >
            {t('home.featured.view_all')}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedProperties;
