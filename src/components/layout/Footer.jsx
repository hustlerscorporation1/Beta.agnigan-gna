import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok
} from 'react-icons/fa';
import { ROUTES, APP_NAME, CONTACT_INFO, SOCIAL_LINKS } from '../../config/constants';
import Container from '../ui/Container';
import Logo from '../../images/LOGO_AGNIGBAN_GNA Trs Noir2 (2).png';
import entityLogo from '../../images/Logo_Hustler_AN-removebg-preview.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'À propos', path: ROUTES.ABOUT },
      { name: 'Contact', path: ROUTES.CONTACT },
      { name: 'Blog', path: '/blog' }
    ],
    services: [
      { name: 'Acheter un terrain', path: ROUTES.BUY_PROCESS },
      { name: 'Vendre un terrain', path: ROUTES.SELL_PROCESS },
      { name: 'Vérifier un terrain', path: ROUTES.PROPERTIES }
    ],
    legal: [
      { name: 'Conditions d\'utilisation', path: '/conditions' },
      { name: 'Politique de confidentialité', path: '/confidentialite' },
      { name: 'Mentions légales', path: '/mentions-legales' }
    ]
  };

  const socialIcons = [
    { Icon: FaFacebook, link: SOCIAL_LINKS.facebook, label: 'Facebook' },
    { Icon: FaTwitter, link: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { Icon: FaInstagram, link: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { Icon: FaLinkedin, link: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { Icon: FaTiktok, link: SOCIAL_LINKS.tiktok, label: 'TikTok' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8">
      <Container>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div className="space-y-4">
            <Link to={ROUTES.HOME}>
              <img 
                src={Logo} 
                alt={APP_NAME}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre plateforme de confiance pour l'achat et la vente de terrains au Togo. 
              Transparence, sécurité et professionnalisme.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3 pt-4">
              {socialIcons.map(({ Icon, link, label }) => (
                <motion.a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <MapPinIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <PhoneIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <img src={entityLogo} alt="Entity Logo" className="h-16 w-auto " />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {APP_NAME}. Tous droits réservés.
            </p>
            
            <div className="flex space-x-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
