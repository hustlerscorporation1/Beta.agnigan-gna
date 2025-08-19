import React from "react";
import { Link } from "react-router-dom";
import { NavLink, Routes, Route } from "react-router-dom";

import { UserIcon } from "@heroicons/react/24/outline";
import { FaPhone } from "react-icons/fa";
import "./Styles/Navbar.css"; // Assuming you have a CSS file for styling
import Logo from "./images/LOGO_AGNIGBAN_GNA Trs Noir.png"; // Adjust the path as necessary
import Accueil from "./pages/Accueil";
import Propriete from "./pages/Propriete";
import Apropos from "./pages/Apropos";
import Contact from "./pages/Contact";
import Declarer from "./pages/Declarer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppStore from "./images/Nappe mariage - Passion Décor.jpeg";
import PlayStore from "./images/Google Play Badge Logo - PNG Logo Vector Brand Downloads (SVG, EPS).jpeg";
import PlayButton from "./images/Play_Button_free_icons_designed_by_Freepik-removebg-preview.png"; // Assuming you have a play button image
import CodeQR from "./images/Custom_QR_Code_Car_Decal_Personalized_Website_or_Social_Media_Business-removebg-preview.png"; // Assuming you have a QR code image
export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Connexion");
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">
        <a href="../pages/Accueil.jsx">
          <img
            src={Logo}
            alt="logo"
            style={{
              width: "150px",
              height: "auto",
            }}
          />
        </a>
      </div>

      <div className="linknav hidden md:flex space-x-6">
        <NavLink
          to="/Accueil"
          className={({ isActive }) =>
            `relative inline-block px-2 py-1 transition-colors duration-300 ${
              isActive
                ? "text-black-500 font-bold"
                : "text-black-600 hover:text-green-500"
            } 
            after:content-[''] after:absolute after:left-1.5 after:bottom-0 after:h-[2px] after:bg-green-500 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-500 
            ${
              isActive
                ? "after:scale-x-[0.85] after:left-0"
                : "hover:after:scale-x-[0.80]"
            }`
          }
        >
          Accueil
        </NavLink>

        <NavLink
          to="/propriete"
          className={({ isActive }) =>
            `relative inline-block px-2 py-1 transition-colors duration-300 ${
              isActive
                ? "text-black-500 font-bold"
                : "text-black-600 hover:text-green-500"
            } 
            after:content-[''] after:absolute after:left-1.5 after:bottom-0 after:h-[2px] after:bg-green-500 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-500 
            ${
              isActive
                ? "after:scale-x-[0.85] after:left-0"
                : "hover:after:scale-x-[0.80]"
            }`
          }
        >
          Vérifier Avant
        </NavLink>

        <NavLink
          to="/declarer"
          className={({ isActive }) =>
            `relative inline-block px-2 py-1 transition-colors duration-300 ${
              isActive
                ? "text-black-500 font-bold"
                : "text-black-600 hover:text-green-500"
            } 
            after:content-[''] after:absolute after:left-1.5 after:bottom-0 after:h-[2px] after:bg-green-500 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-500 
            ${
              isActive
                ? "after:scale-x-[0.80] after:left-0"
                : "hover:after:scale-x-[0.80]"
            }`
          }
        >
          Acheter
        </NavLink>

        <NavLink
          to="/Apropos"
          className={({ isActive }) =>
            `relative inline-block px-2 py-1 transition-colors duration-300 ${
              isActive
                ? "text-black-500 font-bold"
                : "text-black-600 hover:text-green-500"
            } 
            after:content-[''] after:absolute after:left-1.5 after:bottom-0 after:h-[2px] after:bg-green-500 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-500 
            ${
              isActive
                ? "after:scale-x-[0.85] after:left-0"
                : "hover:after:scale-x-[0.80]"
            }`
          }
        >
          À propos
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative inline-block px-2 py-1 transition-colors duration-300 ${
              isActive
                ? "text-black-500 font-bold"
                : "text-black-600 hover:text-green-500"
            } 
            after:content-[''] after:absolute after:left-1.5 after:bottom-0 after:h-[2px] after:bg-green-500 after:w-full after:scale-x-0 after:origin-left after:transition-transform after:duration-500 
            ${
              isActive
                ? "after:scale-x-[0.85] after:left-0"
                : "hover:after:scale-x-[0.80]"
            }`
          }
        >
          Contact
        </NavLink>
      </div>
      <div className="header-compte">
        <div className="usercompte">
          <button
            className="flex items-center space-x-2 "
            onClick={handleClick}
          >
            <div className="userIcon">
              <UserIcon className="usericon-l h-6 w-6 text-gray-500" />
            </div>
            <p>Se Connecter</p>
          </button>
        </div>

        <div className="usercompte">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-green-0 hover:bg-green-700 rounded-2xl shadow-lg transition-all duration-300"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.81)",
            }}
            onClick={() => setIsOpen(true)}
          >
            <div className="userIcon">
              <UserIcon className="usericon-l h-6 w-6 text-gray-500" />
            </div>
            <p>L'application</p>
          </button>

          <div className="overlay">
            {/* Overlay */}
            {isOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
                style={{
                  backdropFilter: "blur(5px)",
                  animationDuration: "0.5s",
                  animationName: "fadeIn",
                }}
              >
                {/* Popup container */}
                <div
                  className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative text-center
                transform transition-all duration-600 ease-out scale-95 opacity-0 animate-popup"
                >
                  {/* Bouton fermer */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                  >
                    &times;
                  </button>

                  {/* QR code image */}

                  <div className="flex justify-center mb-4">
                    <img src={CodeQR} alt="QR Code" className="w-32 h-32" />
                  </div>

                  {/* Titre */}
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Télecharger l'App Anyigbã nya
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Pour avoir ton terrain en toute sécurité.
                  </p>

                  {/* Boutons Google Play et App Store */}
                  <div className=" flex justify-center items-center gap-8">
                    <a
                      href=""
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center absolute"
                      style={{
                        top: "12%",
                        left: "12%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <img
                        src={PlayButton} // mets l’icône App Store dans /public
                        alt="Demo"
                        className="h-12"
                        // style={{
                        //   objectFit: "contain",
                        //   maxWidth: "80%",
                        //   maxHeight: "80%",
                        // }}
                      />
                      <span>Demo</span>
                    </a>

                    <a
                      href="https://play.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={PlayStore} // l’icône Google Play dans
                        alt="Google Play"
                        className="h-12"
                        // style={{
                        //   objectFit: "contain",
                        //   maxWidth: "80%",
                        //   maxHeight: "80%",
                        // }}
                      />
                    </a>
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={AppStore} //l’icône App Store dans
                        alt="App Store"
                        className="h-12"
                        // style={{
                        //   objectFit: "contain",
                        //   maxWidth: "80%",
                        //   maxHeight: "80%",
                        // }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
