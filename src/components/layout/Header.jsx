import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../../superbase/superbaseClient";
import { ROUTES, APP_NAME } from "../../config/constants";
import Button from "../ui/Button";

// Utilisation des chemins publics pour les images (compatibilité production)
const Logo = "/images/logo-agnigban-gna.png";
const scane = "/images/qr-code.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userFirstName, setUserFirstName] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const handleSearchById = (e) => {
    e.preventDefault();
    const id = searchId.trim();
    if (id && !isNaN(id)) {
      navigate(`${ROUTES.PROPERTY_DETAIL}/${id}`);
      setSearchId("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
      setUserFirstName("");
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const navLinks = [
    { name: "Accueil", path: ROUTES.HOME },
    { name: "Propriétés", path: ROUTES.PROPERTIES },
    { name: "À propos", path: ROUTES.ABOUT },
    { name: "Blog", path: ROUTES.BLOG },
    { name: "Contact", path: ROUTES.CONTACT },
  ];

  return (
    <>
      <header
        className={`fixed top-0 p-5 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-white/95 backdrop-blur-sm py-4"
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
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Search by ID */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearchById} className="relative group">
                <input
                  type="number"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="ID du terrain..."
                  className="w-48 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-gray-400"
                  min="1"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-primary-600 hover:text-primary-700 opacity-0 group-focus-within:opacity-100 transition-opacity"
                >
                  ⏎
                </button>
              </form>
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Download Button */}
              <Button
                variant="outline"
                size="sm"
                icon={ArrowDownTrayIcon}
                onClick={() => setShowDownloadModal(true)}
              >
                Télécharger l'App
              </Button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <UserCircleIcon className="h-6 w-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {userFirstName || "Mon compte"}
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
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  {/* Search by ID - Mobile */}
                  <div className="px-4 mb-4">
                    <form
                      onSubmit={(e) => {
                        handleSearchById(e);
                        setIsMobileMenuOpen(false);
                      }}
                      className="relative group"
                    >
                      <input
                        type="number"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Entrez l'ID du terrain..."
                        className="w-full pl-10 pr-16 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        min="1"
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
                      >
                        Aller
                      </button>
                    </form>
                  </div>

                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "text-primary-600 bg-primary-50"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}

                  <hr className="my-4" />

                  {/* Download Button - Mobile */}
                  {/* <div className="px-4 mb-4">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    icon={ArrowDownTrayIcon}
                    onClick={() => {
                      setShowDownloadModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Télécharger l'app
                  </Button>
                </div> */}

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

                  {/* Download Button - Mobile */}
                  <div className="px-4 mb-4">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      icon={ArrowDownTrayIcon}
                      onClick={() => {
                        setShowDownloadModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Télécharger l'app
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Download Modal - Completely outside header */}
      <AnimatePresence>
        {showDownloadModal && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDownloadModal(false)}
              className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-20 flex left-[1rem] bottom-20 items-center justify-center z-[10000] w-full "
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        Télécharger l'application
                      </h3>
                      <p className="text-primary-100 text-sm">
                      Vérifier des terrains partout et à tout le temps
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDownloadModal(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Google Play Button */}
                  <a
                    href="#"
                    className="flex items-center p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all transform hover:scale-105 group"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="h-12 w-12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-300">Disponible sur</p>
                      <p className="text-xl font-semibold">Google Play</p>
                    </div>
                    <ArrowDownTrayIcon className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* App Store Button */}
                  <a
                    href="#"
                    className="flex items-center p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all transform hover:scale-105 group"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <svg
                        className="h-12 w-12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-300">Télécharger sur</p>
                      <p className="text-xl font-semibold">App Store</p>
                    </div>
                    <ArrowDownTrayIcon className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* Features */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-900 mb-3">
                        Fonctionnalités de l'app :
                      </p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                          Recherche rapide de terrains
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                          Localisation GPS intégrée
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                          Notifications en temps réel
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                          Gestion de favoris
                        </li>
                      </ul>
                    </div>

                    <div>
                      <img
                        src={scane}
                        alt="scanaire application "
                        className="w-[10rem] h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
