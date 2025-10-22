import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { 
  MagnifyingGlassIcon, 
  HomeIcon, 
  CurrencyDollarIcon,
  ShoppingCartIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/ui/Button';
import Container from '../../components/ui/Container';
import { ROUTES } from '../../config/constants';
import heroBgImage from '../../images/Hero-agnigban_gna.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const typedElement = useRef(null);

  // Style pour le curseur Typed.js
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .typing-container {
        display: inline-flex;
        align-items: center;
      }
      .typing-container .typed-cursor {
        opacity: 1;
        animation: blink 0.7s infinite;
        font-weight: 400;
        color:rgb(0, 0, 0);
        font-size: inherit;
        margin-left: 2px;
      }
      @keyframes blink {
        0%, 49% { opacity: 1; }
        50%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        'Bienvenue sur la plateforme officielle d\'achat et vente de terrains au Togo',
        'Trouvez le terrain de vos rêves en quelques clics',
        'Vendez votre terrain rapidement et en toute sécurité'
      ],
      typeSpeed: 60,           // Vitesse d'écriture (plus bas = plus rapide)
      backSpeed: 40,           // Vitesse d'effacement
      backDelay: 2000,         // Pause avant d'effacer
      startDelay: 500,         // Délai avant de commencer
      loop: true,              // Boucle infinie
      showCursor: true,        // Afficher le curseur
      cursorChar: '|',         // Caractère du curseur
      autoInsertCss: true,     // Insérer le CSS automatiquement
      attr: null,
      bindInputFocusEvents: false,
      contentType: 'html'      // Pour supporter le HTML si besoin
    });

    return () => typed.destroy();
  }, []);

  const quickActions = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Vérifier',
      description: 'l\'authenticité de votre terrain avant tout achat.',
      color: 'blue',
      action: () => navigate(ROUTES.PROPERTIES)
    },
    {
      icon: HomeIcon,
      title: 'Acheter',
      description: 'le terrain en toute sécurité et adapté à votre besoin.',
      color: 'green',
      action: () => navigate(ROUTES.BUY_PROCESS)
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Vendre',
      description: 'Vendez votre terrain l’acheteur idéal',
      color: 'orange',
      action: () => navigate(ROUTES.SELL_PROCESS)
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-blue-50/80"></div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl mt-12 md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Agnigban Gna,{' '}
              <span className="text-primary-600">Togo</span>
            </motion.h1>

            <div className="h-20 md:h-24 mb-8">
              <div className="typing-container text-center lg:text-left">
                <p 
                  ref={typedElement}
                  className="text-lg md:text-xl text-gray-600 font-medium inline"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                variant="success"
                size="lg"
                icon={ShoppingCartIcon}
                onClick={() => navigate(ROUTES.BUY_PROCESS)}
              >
                Acheter un terrain
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={BanknotesIcon}
                onClick={() => navigate(ROUTES.SELL_PROCESS)}
              >
                Procéder à une vente
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Terrains</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">0+</div>
                <div className="text-sm text-gray-600">Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-600">0%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Quick Actions Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-xl transition-all duration-300 cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-xl bg-${action.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <action.icon className={`h-7 w-7 text-${action.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
