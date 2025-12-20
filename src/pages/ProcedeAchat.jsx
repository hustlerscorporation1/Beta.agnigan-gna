import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  DocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import { ROUTES } from "../config/constants";
import { useTranslation } from "react-i18next";
import heroBgImage from "../images/hero-image.jpg";

const ProcessusAchat = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: MagnifyingGlassIcon,
      title: t('buy_process.steps.1.title'),
      description: t('buy_process.steps.1.desc'),
      color: "blue",
      tips: t('buy_process.steps.1.tips', { returnObjects: true }),
    },
    {
      number: 2,
      icon: DocumentCheckIcon,
      title: t('buy_process.steps.2.title'),
      description: t('buy_process.steps.2.desc'),
      color: "purple",
      tips: t('buy_process.steps.2.tips', { returnObjects: true }),
    },
    {
      number: 3,
      icon: ChatBubbleLeftRightIcon,
      title: t('buy_process.steps.3.title'),
      description: t('buy_process.steps.3.desc'),
      color: "green",
      tips: t('buy_process.steps.3.tips', { returnObjects: true }),
    },
    {
      number: 4,
      icon: BanknotesIcon,
      title: t('buy_process.steps.4.title'),
      description: t('buy_process.steps.4.desc'),
      color: "orange",
      tips: t('buy_process.steps.4.tips', { returnObjects: true }),
    },
    {
      number: 5,
      icon: BuildingLibraryIcon,
      title: t('buy_process.steps.5.title'),
      description: t('buy_process.steps.5.desc'),
      color: "indigo",
      tips: t('buy_process.steps.5.tips', { returnObjects: true }),
    },
    {
      number: 6,
      icon: CheckBadgeIcon,
      title: t('buy_process.steps.6.title'),
      description: t('buy_process.steps.6.desc'),
      color: "green",
      tips: t('buy_process.steps.6.tips', { returnObjects: true }),
    },
  ];

  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: t('buy_process.benefits.security.title'),
      description: t('buy_process.benefits.security.desc'),
    },
    {
      icon: PhoneIcon,
      title: t('buy_process.benefits.support.title'),
      description: t('buy_process.benefits.support.desc'),
    },
    {
      icon: DocumentCheckIcon,
      title: t('buy_process.benefits.legal.title'),
      description: t('buy_process.benefits.legal.desc'),
    },
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
          <div className="absolute inset-0 bg-green-600"></div>
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
                {t('buy_process.hero_title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                {t('buy_process.hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.PROPERTIES)}
                  className="bg-white text-black hover:bg-green-600 hover:text-black"
                >
                  {t('buy_process.explore_btn')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  {t('buy_process.contact_btn')}
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
              {t('buy_process.steps_title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('buy_process.steps_subtitle')}
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
                      {t('buy_process.tips_label')}
                    </p>
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
                {t('buy_process.cta.title')}
              </h2>

              <p className="text-xl mb-8 text-green-100">
                {t('buy_process.cta.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate(ROUTES.PROPERTIES)}
                  className="bg-white text-black hover:bg-gray-100 hover:text-black"
                >
                  {t('buy_process.cta.view_lands')}
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  {t('buy_process.cta.contact')}
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
