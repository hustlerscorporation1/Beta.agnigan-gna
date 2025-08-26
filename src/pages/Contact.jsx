import React, { useState } from "react";
import Navbar from "../Navbar";
import "../Styles/Contact.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import TogoMap from "../pages/TogoMap";
import "../Styles/TogoMap.css";
import "../Styles/Footer.css";
import VideoBackground from "../pages/VideoBackgroud";
import MaVideo from "../videos/Terrain du Sud __ Publicité TV (1).mp4";
import MonImagebureau1 from "../images/MonImagebureau1.jpg";
import MonImagebureau2 from "../images/MonImagebureau2.jpg";
import MonImagebureau3 from "../images/MonImagebureau3.jpg";

import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";

function Contact() {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Données des régions du Togo (simplifiées pour l'exemple)
  const regionsData = {
    Savanes: { capital: "Dapaong", population: "Environ 900 000" },
    Kara: { capital: "Kara", population: "Environ 770 000" },
    Centrale: { capital: "Sokodé", population: "Environ 710 000" },
    Plateaux: { capital: "Atakpamé", population: "Environ 1 400 000" },
    Maritime: { capital: "Lomé", population: "Environ 2 600 000" },
  };

  const handleRegionHover = (regionName) => {
    setHoveredRegion(regionName);
  };

  const handleRegionLeave = () => {
    setHoveredRegion(null);
  };

  const videoSources = [
    {
      src: "../videos/Terrain du Sud __ Publicité TV (1).mp4",
      type: "video/mp4",
    },
    {
      src: "../videos/Terrain du Sud __ Publicité TV Webm",
      type: "video/webm",
    },
    // Ajoutez d'autres formats si nécessaire
  ];

  return (
    <div className="body-contact">
      <div className="Video-arr">
        <VideoBackground
          videoSrc={MaVideo}
          posterSrc="../images/Logo_Hustler_AN.png"
        >
          <div className="descrip-video">
            {/* <h1>Bienvenue en React !</h1>
                    <p>Ceci est votre contenu superposé à l'arrière-plan vidéo.</p>
                    <button>Découvrir</button> */}
          </div>
        </VideoBackground>
      </div>

      <section className="contact-serction flex flex-wrap md:flex-nowrap gap-8 p-8 items-start">
        {/* Contact Form */}
        <div className="formulaire-contact bg-white p-6 shadow rounded w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">On garde le contact</h2>
          <div>
            <p>
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus
            </p>
          </div>{" "}
          <br />
          <form className="space-y-4">
            <input
              className="w-full border px-4 py-2 rounded"
              type="text"
              placeholder="Votre nom"
            />
            <input
              className="w-full border px-4 py-2 rounded"
              type="email"
              placeholder="Votre e-mail"
            />
            <input
              className="w-full border px-4 py-2 rounded"
              type="tel"
              placeholder="Votre numéro"
            />
            <textarea
              className="w-full border px-4 py-2 rounded"
              placeholder="Votre message"
              rows="4"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              type="submit"
            >
              Envoi le message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className=" contact-info w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">
            N'hésitez pas à nous contacter.
          </h2>
          <div>
            <p>Leo morbi faucibus mattis pharetra </p>
          </div>
          <br />
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> 8011 CDD Tchikoni, Wuiti, MD 20743
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> (+228) 70 01 46 80
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> (+228) 90 05 58 75
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> hustlerscorporation1@gmail.com
            </li>
          </ul>

          <div className="mt-6 search-locate">
            <select
              name=""
              id=""
              className="border px-3 py-2 rounded"
              type="text"
              placeholder="Trouver une région"
            >
              <option value="volvo">Maritime </option>
              <option value="saab">Plateaux</option>
              <option value="opel">Centrale</option>
              <option value="audi">Kara</option>
            </select>

            {/* <input className="border px-3 py-2 rounded" type="text" placeholder="Trouver une région" /> */}

            <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
              RECHERCHE
            </button>
          </div>
        </div>

        {/* Contact Carte */}
        <div className="mt-6">
          <div className="App">
            <div className="map-container">
              <TogoMap
                onRegionHover={handleRegionHover}
                onRegionLeave={handleRegionLeave}
              />
              <div className="region-info">
                {hoveredRegion ? (
                  <>
                    <h2>{hoveredRegion}</h2>
                    <p>Capitale : {regionsData[hoveredRegion]?.capital}</p>
                    <p>
                      Population (estimée) :{" "}
                      {regionsData[hoveredRegion]?.population}
                    </p>
                    {/* Ajoutez d'autres informations ici */}
                  </>
                ) : (
                  <p className="affiche-region">
                    <FaMapMarkerAlt className="aside-icon" />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Bureaux */}
      <section className="bg-white px-8 py-12">
        <h2
          className="flex justify-center align-middle gap-2  text-3xl font-bold text-gray-800 mb-2"
          style={{
            fontSize: "3rem",
          }}
        >
          Nos <span style={{ color: "#146c54" }}>bureaux</span>
        </h2>
        <div className="flex justify-center align-middle para-bureaux h-[150px] w-full">
          <p className="text-center text-gray-600 w-[630px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            earum.Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio earum.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Distinctio earum.
          </p>
        </div>
        <div className="md:grid-cols-3 gap-6 bureau">
          <div className="shadow contetaint-bureau rounded overflow-hidden">
            <img src={MonImagebureau1} alt="Lomé" />
            <div className="p-4">
              <h3 className="titile-bureau font-semibold text-red-600 text-lg">
                Lomé Agoè
              </h3>
              <p>555555, Agoè A. A, Togo</p>
              <p>Tél : +228 92-27-86-09</p>
              <p>Email : smartcity@corporation</p>
            </div>
          </div>

          <div className="shadow contetaint-bureau rounded overflow-hidden">
            <img src={MonImagebureau2} alt="Kara" />
            <div className="p-4">
              <h3 className="titile-bureau font-semibold text-red-600  text-lg">
                Kara
              </h3>
              <p>Ville de Kara, MD 66565</p>
              <p>Tél : +228 92-27-86-09</p>
              <p>Email : smartcity@corporation</p>
            </div>
          </div>

          <div className="shadow contetaint-bureau rounded overflow-hidden">
            <img src={MonImagebureau3} alt="Vogan" />
            <div className="p-4">
              <h3 className="titile-bureau font-semibold text-red-600  text-lg">
                Vogan, centre ville
              </h3>
              <p>Vogan centre ville, MD 77614</p>
              <p>Tél : +228 92-27-86-09</p>
              <p>Email : smartcity@corporation</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 px-8 py-10 text-sm">
        <div className="info-footer md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold  mb-2">Horaires d'ouverture</h4>
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
}

export default Contact;
