import React from "react";
import Navbar from "../Navbar";
import "../Styles/Declarer.css";
import AnimationImage from "../components/AnimationImage.jsx";
import heroImage from "../images/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import FooterContaint from "../components/footerContaint";
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
        <div className="absolute inset-0 bg-black bg-opacity-45"></div>

        {/* Texte et boutons */}
        <div className=" relative z-10 flex flex-col gap-[10rem] items-center justify-center text-white h-full px-4 text-center">
          <h1
            className="responsive-title text-4xl font-bold mb-7  "
            style={{
              fontSize: "5rem",
            }}
          >
            Acheter en toute confiance
            <br />
          </h1>

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
      {/* Footer */}
      <FooterContaint />
    </div>
  );
}

export default Declarer;
