import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../config/constants';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à Trouver Votre Terrain Idéal ?
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10 leading-relaxed">
            Rejoignez des milliers de clients satisfaits qui ont trouvé leur terrain grâce à notre plateforme.
            Commencez votre recherche dès aujourd'hui !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(ROUTES.PROPERTIES)}
                icon={ArrowRightIcon}
                iconPosition="right"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Commencer maintenant
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(ROUTES.CONTACT)}
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Nous contacter
              </Button>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white"
          >
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-200">Terrains disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0+</div>
              <div className="text-primary-200">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0%</div>
              <div className="text-primary-200">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Support client</div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CallToAction;
