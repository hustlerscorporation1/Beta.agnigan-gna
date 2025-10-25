import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  HeartIcon,
  SparklesIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import Layout from "../../components/layout/Layout";
import Container from "../../components/ui/Container";
import Card, { CardContent } from "../../components/ui/Card";
import heroVideo from "../../videos/Terrain du Sud __ Publicité TV Webm.webm";

const About = () => {
  const videoRef = useRef(null);

  const values = [
    {
      icon: ShieldCheckIcon,
      title: "Transparence",
      description:
        "Nous garantissons une totale transparence dans toutes nos transactions et processus.",
    },
    {
      icon: HeartIcon,
      title: "Confiance",
      description:
        "La confiance de nos clients est notre priorité. Nous travaillons avec intégrité.",
    },
    {
      icon: SparklesIcon,
      title: "Excellence",
      description:
        "Nous visons l'excellence dans chaque aspect de notre service client.",
    },
    {
      icon: TrophyIcon,
      title: "Satisfaction",
      description:
        "Votre satisfaction est notre plus grande récompense et motivation.",
    },
  ];

  const partners = [
    {
      img: "/images/partner1.png",
      title: "OTR Togo",
      description:
        "Nous garantissons une totale transparence dans toutes nos transactions et processus.",
    },
    {
      img: "/images/partner2.png",
      title: "CADRAC",
      description:
        "La confiance de nos clients est notre priorité. Nous travaillons avec intégrité.",
    },
    {
      img: "/images/partner3.png",
      title: "CIR",
      description:
        "Nous visons l'excellence dans chaque aspect de notre service client.",
    },
    {
      img: "/images/partner4.png",
      title: "Ministère de l'Intérieure",
      description:
        "Votre satisfaction est notre plus grande récompense et motivation.",
    },
  ];

  const stats = [
    { number: "0+", label: "Années d'expérience" },
    { number: "0+", label: "Terrains vendus" },
    { number: "0+", label: "Clients satisfaits" },
    { number: "0%", label: "Taux de satisfaction" },
  ];

  const team = [
    {
      name: "KOUASSI Jean",
      role: "Directeur Général",
      description: "Expert en immobilier avec 15 ans d'expérience",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    },
    {
      name: "AMOUZOU Marie",
      role: "Responsable Commercial",
      description: "Spécialiste en transactions immobilières",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    },
    {
      name: "AGBOSSOU Pierre",
      role: "Conseiller Juridique",
      description: "Expert en droit foncier et immobilier",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    },
  ];

  return (
    <Layout>
      {/* Hero Section with Video */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/webm" />
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary-900/70"></div>

        {/* Content */}
        <Container className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg"
            >
              À Propos de Nous
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg md:text-xl leading-relaxed drop-shadow-md"
            >
              Nous sommes la première plateforme digitale dédiée à l'achat et la
              vente de terrains au Togo. Notre mission est de rendre l'accès à
              la propriété foncière simple, sécurisé et transparent.
            </motion.p>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
              >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                </div>
              </motion.div>
            </motion.div>
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
                <h2 className="text-3xl font-bold text-gray-900">
                  Notre Mission
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Faciliter l'accès à la propriété foncière pour tous les Togolais
                et investisseurs en proposant une plateforme moderne, sécurisée
                et transparente. Nous nous engageons à offrir un service de
                qualité qui respecte les normes légales et protège les intérêts
                de nos clients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <UserGroupIcon className="h-10 w-10 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Notre Vision
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Devenir la référence incontournable dans le secteur immobilier
                au Togo et en Afrique de l'Ouest. Nous aspirons à créer un
                écosystème où chaque transaction foncière est simple, rapide et
                sécurisée, tout en contribuant au développement économique de
                notre pays.
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
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Nos partenaires */}
      <section className="section-padding gradient-bg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos <span className="text-gradient">Partenaires</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les partenaires qui nous soutiennent
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <img src={partner.img} alt={partner.title} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {partner.title}
                    </h3>
                    <p className="text-gray-600">{partner.description}</p>
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
                <div className="text-primary-200">{stat.label}</div>
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
              <a href="/contact" className="btn-primary bg-green-600">
                Nous contacter
              </a>
              <a
                href="/proprietes"
                className="btn-primary bg-gray-200 text-gray-900 hover:bg-gray-300"
              >
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
