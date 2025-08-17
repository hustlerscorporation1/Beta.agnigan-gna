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

export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Connexion");
  };

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
          Vérifier Propriété
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
          <button className="flex items-center space-x-2">
            <div className="userIcon">
              <UserIcon className="usericon-l h-6 w-6 text-gray-500" />
            </div>
            <p>Télécharger</p>
          </button>
        </div>
      </div>
    </nav>
  );
}
