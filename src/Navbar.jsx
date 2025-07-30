import React from "react";
import { Link } from "react-router-dom";
import { UserIcon } from '@heroicons/react/24/outline'
import { FaPhone } from 'react-icons/fa';
import './Styles/Navbar.css'; // Assuming you have a CSS file for styling


export default function Navbar() {
  return (
     
    <nav className="navbar bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-bold">TogoGnigban</div>

      <div className="linknav hidden md:flex space-x-6">
        <Link to="/Accueil" className="hover:underline">Accueil</Link>
        <Link to="/propriete" className="hover:underline">Propriété</Link>
        <Link to="/Apropos" className="hover:underline">À propos</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/declarer" className="hover:underline">Déclarer</Link>
      </div>
      <div className="header-compte">

        <div className="usercompte">
          <div className="userIcon"><UserIcon className="h-6 w-6 text-gray-500" /></div>
          <p>Se Connecter</p>
        </div>

        <div className="phoneNumber">
           <div>
              <FaPhone className="phoneicon text-xl" />
           </div>

           <div>
              <span>(228) 70 14 61 80</span> 
            </div>
        </div>

      </div>
    </nav>
  );
}
