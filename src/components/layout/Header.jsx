import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserCircleIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { supabase } from '../../superbase/superbaseClient';
import { ROUTES, APP_NAME } from '../../config/constants';
import Button from '../ui/Button';
import Logo from '../../images/LOGO_AGNIGBAN_GNA Trs Noir2 (2).png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userFirstName, setUserFirstName] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Vérifier si un utilisateur est connecté
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        if (session.user.user_metadata?.first_name) {
          setUserFirstName(session.user.user_metadata.first_name);
        }
      }
    });

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user?.user_metadata?.first_name) {
        setUserFirstName(session.user.user_metadata.first_name);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserFirstName('');
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const navLinks = [
    { name: 'Accueil', path: ROUTES.HOME },
    { name: 'Propriétés', path: ROUTES.PROPERTIES },
    { name: 'À propos', path: ROUTES.ABOUT },
    { name: 'Contact', path: ROUTES.CONTACT }
  ];

  return (
    <header
      className={`fixed top-0 p-5 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-3'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <img 
              src={Logo} 
              alt={APP_NAME}
              className="h-[4rem] w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <UserCircleIcon className="h-6 w-6 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {userFirstName || 'Mon compte'}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      <Link
                        to={ROUTES.PROFILE}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Mon profil
                      </Link>
                      <Link
                        to={ROUTES.DECLARE_PROPERTY}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Déclarer un terrain
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Déconnexion
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Connexion
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Inscription
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                <hr className="my-4" />

                {user ? (
                  <>
                    <Link
                      to={ROUTES.PROFILE}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Mon profil
                    </Link>
                    <Link
                      to={ROUTES.DECLARE_PROPERTY}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Déclarer un terrain
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 px-4">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        navigate(ROUTES.LOGIN);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Connexion
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        navigate(ROUTES.REGISTER);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Inscription
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
