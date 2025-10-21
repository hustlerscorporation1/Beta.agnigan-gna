import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  HeartIcon,
  SparklesIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import Layout from '../../components/layout/Layout';
import Container from '../../components/ui/Container';
import Card, { CardContent } from '../../components/ui/Card';

const About = () => {
  const values = [
    {
      icon: ShieldCheckIcon,
      title: 'Transparence',
      description: 'Nous garantissons une totale transparence dans toutes nos transactions et processus.'
    },
    {
      icon: HeartIcon,
      title: 'Confiance',
      description: 'La confiance de nos clients est notre priorité. Nous travaillons avec intégrité.'
    },
    {
      icon: SparklesIcon,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque aspect de notre service client.'
    },
    {
      icon: TrophyIcon,
      title: 'Satisfaction',
      description: 'Votre satisfaction est notre plus grande récompense et motivation.'
    }
  ];

  const stats = [
    { number: '5+', label: 'Années d\'expérience' },
    { number: '500+', label: 'Terrains vendus' },
    { number: '1000+', label: 'Clients satisfaits' },
    { number: '98%', label: 'Taux de satisfaction' }
  ];

  const team = [
    {
      name: 'KOUASSI Jean',
      role: 'Directeur Général',
      description: 'Expert en immobilier avec 15 ans d\'expérience',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
    },
    {
      name: 'AMOUZOU Marie',
      role: 'Responsable Commercial',
      description: 'Spécialiste en transactions immobilières',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    },
    {
      name: 'AGBOSSOU Pierre',
      role: 'Conseiller Juridique',
      description: 'Expert en droit foncier et immobilier',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              À Propos de Nous
            </h1>
            <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
              Nous sommes la première plateforme digitale dédiée à l'achat et la vente de terrains au Togo.
              Notre mission est de rendre l'accès à la propriété foncière simple, sécurisé et transparent.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <BuildingOfficeIcon className="h-10 w-10 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Faciliter l'accès à la propriété foncière pour tous les Togolais et investisseurs
                en proposant une plateforme moderne, sécurisée et transparente. Nous nous engageons
                à offrir un service de qualité qui respecte les normes légales et protège les
                intérêts de nos clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <UserGroupIcon className="h-10 w-10 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Notre Vision</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Devenir la référence incontournable dans le secteur immobilier au Togo et en
                Afrique de l'Ouest. Nous aspirons à créer un écosystème où chaque transaction
                foncière est simple, rapide et sécurisée, tout en contribuant au développement
                économique de notre pays.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-padding gradient-bg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-gradient">Valeurs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-200">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre <span className="text-gradient">Équipe</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des professionnels passionnés et expérimentés à votre service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-bg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rejoignez-nous dans cette aventure
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ensemble, construisons l'avenir de l'immobilier au Togo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Nous contacter
              </a>
              <a href="/proprietes" className="btn-primary bg-gray-200 text-gray-900 hover:bg-gray-300">
                Voir les terrains
              </a>
            </div>
          </motion.div>
        </Container>
      </section>
    </Layout>
  );
};

export default About;
