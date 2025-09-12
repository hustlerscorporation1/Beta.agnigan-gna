import { useState } from "react";
import "../App";
import "../Styles/Accueil.css";
import "../Styles/ProcederUneVente.css";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaSearch,
  FaLinkedin,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

import heroImage from "../images/hero-image.jpg";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";
import { Contact } from "lucide-react";

const ProcederVente = () => {
  const navigate = useNavigate();
  const steps = [
    {
      title: "1. Recherche du terrain",
      description:
        "Trouvez le terrain qui correspond à vos besoins et à votre style de vie au Togo.",
    },
    {
      title: "2. Vérification du titre foncier",
      description:
        "Assurez-vous que le titre foncier est authentique et conforme aux réglementations.",
    },
    {
      title: "3. Négociation et accord",
      description:
        "Discutez le prix avec le vendeur et signez un accord de vente clair.",
    },
    {
      title: "4. Finalisation et paiement",
      description:
        "Effectuez le paiement et finalisez la transaction légalement.",
    },
    {
      title: "5. Transfert officiel",
      description:
        "Enregistrez le terrain à votre nom auprès des autorités foncières.",
    },
  ];

  const Contactpage = () => {
    navigate("/contact");
  };

  return (
    <div className=" w-full ">
      <div className="f">
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-green-600 text-white py-12 text-center">
            <h1 className="text-4xl mt-[6rem] font-bold mb-2">
              Procédure d'achat d'un terrain au Togo
            </h1>
            <p className="text-lg">
              Suivez ces étapes pour acheter un terrain en toute sécurité
            </p>
            <button className="bg-white text-green-600 mt-4 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Procéder maintenant
            </button>
          </header>

          {/* Steps Section */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-green-700 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center align-items-center mb-10">
            <button className="bg-green-600 text-white mt-4 font-bold px-6 py-3 rounded-full hover:bg-gray-100 hover:text-green-600 transition">
              Procéder maintenant
            </button>
          </div>

          {/* CTA Section */}
          <section className="bg-green-600 text-white py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à acheter votre terrain ?
            </h2>
            <p className="mb-6">
              Contactez-nous pour obtenir toutes les informations fiables sur
              les titres fonciers.
            </p>
            <button
              className="bg-white text-green-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition"
              onClick={Contactpage}
            >
              Contactez-nous
            </button>
          </section>
        </div>
      </div>
      <footer className="bg-gray-900 text-gray-300 px-8 py-10 text-sm">
        <div className="info-footer md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Horaires d'ouverture</h4>
            <p>Lun-Ven: 09:00 - 20:00</p>
            <p>Sam-Dim: 09:00 - 14:00</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Trouvez-nous</h4>
            <p>8011 CDD, quartier Tokoin Wuiti</p>
            <p>MD 20743</p>
            <p>hustlerscorporation1@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Property</h4>
            <p>
              <a href="./propriete">Terrain Lot 1</a>
            </p>
            <p>
              <a href="./propriete">Terrain Lot 2</a>
            </p>
            <p>
              <a href="./propriete">Terrain Lot 3</a>
            </p>
            <p>
              <a href="./propriete">Terrain Lot 4</a>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Liens</h4>
            <p>
              <a href="/">Accueil</a>
            </p>
            <p>
              <a href="/Propriete">Vérifier</a>
            </p>
            <p>
              <a href="/declarer">Acheter</a>
            </p>
            <p>
              <a href="/Apropos">À propos</a>
            </p>
            <p>
              <a href="/Contact">Contact</a>
            </p>
          </div>

          <div className="newsletter gap-2">
            <h4>Newsletter</h4>
            <p>Abonnez-vous à notre newsletter</p>
            <div className="footer-input">
              <input
                type="email"
                placeholder="Votre email"
                className="px-3 py-1 rounded text-black"
              />
              <button className="sabonne bg-blue-600 px-3 py-1 rounded text-white">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
          <div className="logopartenaire">
            <img src={logopartenaire} alt="logopartenaire" />
          </div>
          <p> © Copyright Hustlers 2025. Conception de hustlers cooperation</p>
          <div className="footer-reseau-sociaux">
            <div>
              <a href="">
                <FaFacebook />
              </a>
            </div>
            <div>
              <a href="">
                <FaLinkedin size={20} />
              </a>
            </div>
            <div>
              <a href="">
                <FaInstagram />
              </a>
            </div>
            <div>
              <a href="">
                <SiTiktok />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProcederVente;
