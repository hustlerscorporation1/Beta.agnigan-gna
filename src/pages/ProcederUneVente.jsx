import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  PhotoIcon,
  MapPinIcon,
  PencilSquareIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { ROUTES } from "../config/constants";
import heroBgImage from "../images/Terrain-dans-n'importe-quelle-localité(4).jpg";

const ProcessusVente = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: PencilSquareIcon,
      title: "Préparation de l'annonce",
      description:
        "Créez un titre accrocheur et une description détaillée de votre terrain pour attirer les acheteurs potentiels.",
      color: "orange",
      tips: [
        "Titre clair et précis (ex: Terrain 500m² à Kégué)",
        "Description détaillée du terrain",
        "Mentionnez les avantages et proximités",
      ],
    },
    {
      number: 2,
      icon: DocumentTextIcon,
      title: "Vérification des documents",
      description:
        "Rassemblez et vérifiez tous les documents légaux nécessaires pour prouver la légalité de votre terrain.",
      color: "blue",
      tips: [
        "Titre foncier original et authentique",
        "Certificat de propriété",
        "Plan cadastral à jour",
      ],
    },
    {
      number: 3,
      icon: PhotoIcon,
      title: "Photos et localisation",
      description:
        "Ajoutez des photos de qualité et indiquez précisément la localisation de votre terrain sur la carte.",
      color: "green",
      tips: [
        "Photos HD de plusieurs angles",
        "Localisation GPS précise",
        "Photos de l'environnement",
      ],
    },
    {
      number: 4,
      icon: CurrencyDollarIcon,
      title: "Fixation du prix",
      description:
        "Déterminez un prix compétitif basé sur le marché local et les caractéristiques de votre terrain.",
      color: "purple",
      tips: [
        "Étudiez les prix du marché",
        "Considérez la localisation",
        "Soyez prêt à négocier",
      ],
    },
    {
      number: 5,
      icon: UserGroupIcon,
      title: "Gestion des acheteurs",
      description:
        "Répondez aux demandes, organisez des visites et négociez avec les acheteurs intéressés.",
      color: "indigo",
      tips: [
        "Répondez rapidement aux messages",
        "Organisez des visites sécurisées",
        "Négociez de bonne foi",
      ],
    },
    {
      number: 6,
      icon: CheckCircleIcon,
      title: "Finalisation de la vente",
      description:
        "Signez les documents de vente, effectuez le transfert de propriété et recevez votre paiement.",
      color: "green",
      tips: [
        "Signez devant notaire",
        "Vérifiez le paiement",
        "Transférez le titre foncier",
      ],
    },
  ];

  const benefits = [
    {
      icon: ChartBarIcon,
      title: "Visibilité maximale",
      description:
        "Votre annonce est visible par des milliers d'acheteurs potentiels",
    },
    {
      icon: ShieldCheckIcon,
      title: "Transactions sécurisées",
      description:
        "Nous vérifions tous les documents pour des ventes sécurisées",
    },
    {
      icon: ClockIcon,
      title: "Vente rapide",
      description:
        "Vendez votre terrain rapidement grâce à notre plateforme efficace",
    },
  ];
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-yellow-50">
        {/* Hero Header */}
        <section className="relative bg-green-600 text-white py-20 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-green-600 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBgImage})` }}
          ></div>
          <div className="absolute inset-0  bg-green-600 from-green-600 to-green-600"></div>
          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <CurrencyDollarIcon className="h-20 w-20" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-16">
                Processus de Vente d'un Terrain
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-100">
                Suivez ces 6 étapes pour vendre votre terrain rapidement et en
                toute sécurité
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.DECLARE_PROPERTY)}
                  className=" border-none bg-white text-green-600 hover:bg-gray-100 hover:text-black"
                >
                  Publier une annonce
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Nous contacter
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Benefits Section */}
        <Container className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <benefit.icon className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>

        {/* Steps Section */}
        <Container className="py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Les 6 Étapes du Processus de Vente
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un parcours simple et efficace pour vendre votre terrain au
              meilleur prix
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 items-center`}
              >
                {/* Step Number and Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`relative w-32 h-32 bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 rounded-2xl flex items-center justify-center shadow-xl`}
                  >
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-gray-900">
                        {step.number}
                      </span>
                    </div>
                    <step.icon className="h-16 w-16 text-green-600" />
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    {step.description}
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-700">
                      Conseils pratiques:
                    </p>
                    <ul className="space-y-1">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <CheckCircleIcon className="h-5 w-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>

        {/* CTA Section */}
        <section className="relative bg-green-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à vendre votre terrain ?
              </h2>
              <p className="text-xl mb-8 text-orange-100">
                Publiez votre annonce dès maintenant et touchez des milliers
                d'acheteurs potentiels. Notre équipe vous accompagne tout au
                long du processus!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate(ROUTES.DECLARE_PROPERTY)}
                  className="bg-white text-black hover:bg-green hover:text-black"
                >
                  Publier mon annonce
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Contactez-nous
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </Layout>
  );
};

export default ProcessusVente;
