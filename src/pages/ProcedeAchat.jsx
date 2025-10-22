import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  MagnifyingGlassIcon, 
  DocumentCheckIcon, 
  ChatBubbleLeftRightIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { ROUTES } from '../config/constants';
import heroBgImage from '../images/hero-image.jpg';

const ProcessusAchat = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: MagnifyingGlassIcon,
      title: "Recherche du terrain",
      description: "Explorez notre catalogue de terrains et trouvez celui qui correspond à vos besoins et à votre budget au Togo.",
      color: "blue",
      tips: [
        "Définissez votre budget",
        "Choisissez la localisation idéale",
        "Vérifiez la superficie"
      ]
    },
    {
      number: 2,
      icon: DocumentCheckIcon,
      title: "Vérification du titre foncier",
      description: "Assurez-vous que le titre foncier est authentique et conforme aux réglementations togolaises.",
      color: "purple",
      tips: [
        "Consultez le registre foncier",
        "Vérifiez l'authenticité du TF",
        "Validez les limites du terrain"
      ]
    },
    {
      number: 3,
      icon: ChatBubbleLeftRightIcon,
      title: "Négociation et accord",
      description: "Discutez le prix avec le vendeur et parvenez à un accord satisfaisant pour les deux parties.",
      color: "green",
      tips: [
        "Comparez les prix du marché",
        "Négociez les modalités",
        "Rédigez un accord préalable"
      ]
    },
    {
      number: 4,
      icon: BanknotesIcon,
      title: "Finalisation et paiement",
      description: "Effectuez le paiement selon les modalités convenues et signez tous les documents nécessaires.",
      color: "orange",
      tips: [
        "Utilisez des moyens sécurisés",
        "Conservez tous les reçus",
        "Signez devant notaire"
      ]
    },
    {
      number: 5,
      icon: BuildingLibraryIcon,
      title: "Transfert officiel",
      description: "Enregistrez le terrain à votre nom auprès des autorités foncières compétentes.",
      color: "indigo",
      tips: [
        "Préparez les documents requis",
        "Payez les frais d'enregistrement",
        "Obtenez votre nouveau titre"
      ]
    },
    {
      number: 6,
      icon: CheckBadgeIcon,
      title: "Validation finale",
      description: "Recevez votre certificat de propriété et assurez-vous que tous les documents sont en ordre.",
      color: "green",
      tips: [
        "Vérifiez tous les documents",
        "Conservez les copies certifiées",
        "Célébrez votre acquisition!"
      ]
    }
  ];

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Sécurité garantie",
      description: "Tous nos terrains ont des titres fonciers vérifiés et authentiques"
    },
    {
      icon: PhoneIcon,
      title: "Accompagnement personnalisé",
      description: "Notre équipe vous guide à chaque étape du processus d'achat"
    },
    {
      icon: DocumentCheckIcon,
      title: "Documents légaux",
      description: "Tous les documents nécessaires sont préparés et vérifiés par nos experts"
    }
  ];

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-green-600/70"></div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <ShoppingCartIcon className="h-20 w-20" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-16">
              Processus d'Achat d'un Terrain
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Suivez ces 6 étapes simples pour acheter votre terrain en toute sécurité au Togo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(ROUTES.PROPERTIES)}
                className="bg-white text-black hover:bg-gray-100"
              >
                Explorer les terrains
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="border-white text-white hover:bg-white hover:text-green-600"
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
              <benefit.icon className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
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
            Les 6 Étapes du Processus
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un parcours simple et sécurisé pour devenir propriétaire
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
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              {/* Step Number and Icon */}
              <div className="flex-shrink-0">
                <div className={`relative w-32 h-32 bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 rounded-2xl flex items-center justify-center shadow-xl`}>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-gray-900">{step.number}</span>
                  </div>
                  <step.icon className="h-16 w-16 text-green-600" />
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4 text-lg">{step.description}</p>
                <div className="space-y-2">
                  <p className="font-semibold text-gray-700">Conseils pratiques:</p>
                  <ul className="space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckBadgeIcon className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
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
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à acheter votre terrain ?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Notre équipe d'experts est là pour vous accompagner à chaque étape.
              Contactez-nous dès aujourd'hui pour commencer votre projet!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="xl"
                onClick={() => navigate(ROUTES.PROPERTIES)}
                className="bg-white text-black hover:bg-gray-100"
              >
                Voir les terrains disponibles
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="border-white text-white hover:bg-white hover:text-green-600"
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

export default ProcessusAchat;
