import React from "react";
import Navbar from "../Navbar";
import "../Styles/Declarer.css";
import AnimationImage from "../components/AnimationImage.jsx";
import heroImage from "../images/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";
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
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

function Declarer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Dectailletairrain");
  };

  const MieuxComprendre = () => {
    navigate("/MieuxComprendre");
  };
  const VerifierAchete = () => {
    navigate("/Propriete");
  };

  const ProcederVente = () => {
    navigate("/ProcederVente");
  };

  const ProcederAchat = () => {
    navigate("/ProcederAchat");
  };
  return (
    <div className="body-declarer">
      {/* les produits */}

      <AnimationImage />
      <div
        className="hero relative w-full h-[500px] bg-cover bg-center"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Overlay sombre pour le contraste du texte */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Texte et boutons */}
        <div className=" relative z-10 flex flex-col items-center justify-center text-white h-full px-4 text-center">
          <h1
            className="responsive-title text-4xl font-bold mb-7  "
            style={{
              fontSize: "5rem",
            }}
          >
            Acheter en toute confiance
            <br />
          </h1>
          <p
            className="responsive-para mb-6 max-w-2xl  text-sm md:text-base"
            style={{
              marginTop: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
            neque facilis pariatur iure nulla quidem sed numquam temporibus
            molestias.
          </p>

          <div>
            <button
              onClick={ProcederAchat}
              className="procedureAchat bg-green-500 text-white mt-4 font-bold px-6 py-3 rounded-full transition"
            >
              Lire la procedure d'achat
            </button>
          </div>
        </div>
      </div>

      <section className="flex flex-wrap justify-center gap-6 px-4 mb-16 section-terrain">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md w-80 overflow-hidden"
          >
            <div className="bg-white rounded-lg shadow-md w-80 overflow-hidden max-w-sm rounded-2xl overflow-hidden shadow-lg border bg-white hover:shadow-xl transition-all duration-300">
              {/* Image du terrain */}
              <div
                className="first-image relative h-48 bg-cover bg-center bg-white rounded-lg shadow-md w-80 overflow-hidden"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <span className="title-vendre absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  À Vendre
                </span>
                {/* <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                            Privé
                          </span> */}
              </div>

              {/* Infos */}
              <div className="px-5 py-4">
                <h2 className="font-bold text-lg text-gray-800 mb-1">
                  Togo 2000 - Routier de la Division
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  506 Division 2000, Pembroke Pines, FL 33028
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-xl font-semibold text-green-600">
                    250 000 000 FCFA
                  </p>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                    onClick={handleClick}
                  >
                    Acheter
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <footer className="bg-gray-900 text-gray-300 px-8 py-10 text-sm">
        <div className=" info-footer md:grid-cols-4 gap-6 mb-6">
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

        <div className="footer-container border-t border-gray-700 pt-4 flex justify-between items-center">
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
}

export default Declarer;
