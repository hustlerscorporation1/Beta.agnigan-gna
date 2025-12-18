import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  DocumentCheckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../config/constants';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: MagnifyingGlassIcon,
      title: t('home.services.items.verify.title'),
      description: t('home.services.items.verify.desc'),
      features: [
        t('home.services.items.verify.f1'),
        t('home.services.items.verify.f2'),
        t('home.services.items.verify.f3')
      ],
      color: 'blue',
      link: ROUTES.PROPERTIES
    },
    {
      icon: HomeIcon,
      title: t('home.services.items.buy.title'),
      description: t('home.services.items.buy.desc'),
      features: [
        t('home.services.items.buy.f1'),
        t('home.services.items.buy.f2'),
        t('home.services.items.buy.f3')
      ],
      color: 'green',
      link: ROUTES.BUY_PROCESS
    },
    {
      icon: CurrencyDollarIcon,
      title: t('home.services.items.sell.title'),
      description: t('home.services.items.sell.desc'),
      features: [
        t('home.services.items.sell.f1'),
        t('home.services.items.sell.f2'),
        t('home.services.items.sell.f3')
      ],
      color: 'orange',
      link: ROUTES.SELL_PROCESS
    }
  ];

  const advantages = [
    {
      icon: ShieldCheckIcon,
      title: t('home.services.advantages.security'),
      description: t('home.services.advantages.security_desc')
    },
    {
      icon: DocumentCheckIcon,
      title: t('home.services.advantages.docs'),
      description: t('home.services.advantages.docs_desc')
    },
    {
      icon: UserGroupIcon,
      title: t('home.services.advantages.support'),
      description: t('home.services.advantages.support_desc')
    }
  ];

  return (
    <section className="section-padding bg-white">
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
            {t('home.services.title')} <span className="text-gradient">{t('home.services.subtitle')}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.services.description')}
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full group cursor-pointer" onClick={() => navigate(service.link)}>
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-8 w-8 text-${service.color}-600`} />
                  </div>
                  
                  <CardTitle className="mb-3">{service.title}</CardTitle>
                  <CardDescription className="mb-6">{service.description}</CardDescription>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="ghost" size="sm" fullWidth>
                    {t('home.services.learn_more')}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            {t('home.services.why_choose_us')}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <advantage.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h4>
                <p className="text-gray-600">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Services;
