// src/pages/Accueil.jsx

import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../Navbar";
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
import { FaArrowRight } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import "../Styles/Accueil.css";
import "../Styles/Footer.css";
import Lome from "../images/Lome.jpg";
import Vogan from "../images/Vogan.jpg";
import Aneho from "../images/Aneho.jpg";
import Notse from "../images/Notse.jpg";
import Tsevi from "../images/Tsévi.jpg";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";
import heroImage from "../images/hero-image.jpg";
import satisfaction from "../images/satisfaction.jpg";
import Slde from "../components/Slde";
import VideoBackground from "../pages/VideoBackgroud";
import { motion } from "framer-motion";
import AnimationImage from "../components/AnimationImage.jsx";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import Client1 from "../images/Client 1.jpg";
import Client2 from "../images/Client 2.jpg";

function Accueil() {
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
  const cities = [
    { name: "Lomé", image: "https://i.imgur.com/1.jpg", terrains: 32 },
    { name: "Vogan", image: "https://i.imgur.com/2.jpg", terrains: 32 },
    { name: "Notsé", image: "https://i.imgur.com/3.jpg", terrains: 32 },
    { name: "Tsévié", image: "https://i.imgur.com/4.jpg", terrains: 32 },
    { name: "Aného", image: "https://i.imgur.com/5.jpg", terrains: 32 },
  ];
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      name: "AGBOSSOU Anani",
      role: "Client",
      text: "Arcu laoreet malesuada nunc eget. Fermentum et dui enim aliquam habitant elit euismod erat praesent. Tincidunt semper interdum faucibus cras.",
      image: Client1,
    },
    {
      name: "KOFFI Marie",
      role: "Designer",
      text: "Suspendisse potenti. Vivamus non eros vel lacus tempor pretium vitae id est. Donec vehicula quam vel ligula facilisis posuere.",
      image: Client2,
    },
  ];

  const services = [
    {
      titre: "Vérifier Un Terrain",
      texte: "Verifier la localité d'un terrain adapté à votre besoin",
      bouton: "Vérification",
    },
    {
      titre: "Achetez un Terrain",
      texte: "Acheter le terrain adapté à votre besoin et votre mode de vie",
      bouton: "Acheter",
    },
    {
      titre: "Vendre un Terrain",
      texte: "Décrivez clairement votre terrain pour trouver l’acheteur idéal ",
      bouton: "Vendre",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const { name, role, text, image } = testimonials[index];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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

  const el = useRef(null); // élément cible
  const typedInstance = useRef(null); // pour stocker l’instance

  useEffect(() => {
    typedInstance.current = new Typed(el.current, {
      strings: [
        "Bienvenue sur le site officiel d'achat et vente de Terrain au togo",
        "Nous créons vos idées",
        "Découvrez nos services",
        "Contactez-nous",
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => {
      typedInstance.current.destroy();
    };
  }, []);

  return (
    <div className="body-accuiel">
      {/* Hero section */}
      <AnimationImage />
      <div
        className="hero relative w-full h-[500px] bg-cover bg-center"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Overlay sombre pour le contraste du texte */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Texte et boutons */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 hero-title title-hero">
            Anyigbã nya
            <br />
          </h1>
          <p className="hero-para mb-6 max-w-2xl text-sm md:text-base">
            Trouvez le terrain idéal, adapté à votre style de vie.
          </p>
          <div className="appli-button">
            <div className="store">
              <button className="appstore" onClick={VerifierAchete}>
                Vérifie et achète
              </button>
            </div>
            <div className="play">
              <button className="playstore" onClick={ProcederVente}>
                Procéder à une vente
              </button>
            </div>
          </div>

          <div className="description-container">
            <div className="trais">:</div>
            <p>
              <span ref={el}></span>
            </p>
          </div>

          {/* Formulaire de recherche */}
          <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-4xl flex flex-wrap justify-between gap-4 container-recherche">
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              placeholder="Entrez vôtre zone précise"
              style={{
                width: "169px",
                color: "#0000",
              }}
            />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              defaultValue=""
            >
              <option>Terrain résidentiel</option>

              <option>Terrain nu</option>
              <option>Terrain Commercial</option>
              <option>Terrain agricol</option>
              <option>Terrain industriel</option>
              <option>Terrain avec bâtiment existant</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              placeholder="Emplacement"
            >
              <option>Maritime</option>
              <option>Plateaux</option>
              <option>Central</option>
              <option>Kara</option>
              <option>Savane</option>
            </select>

            <button className="text-2xl text-gray-700 hover:text-black">
              {/* <FaSlidersH /> */}
              <HiAdjustmentsHorizontal className="search-icon" />
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md button-recherche">
              RECHERCHER{" "}
              <span className="search-icon">
                <FaSearch />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="font-sans">
        {/* Section 1: Header */}
        <section className="text-center py-12 bg-gray-50 section-veddete ">
          <div className="valeur">
            <div className="flex valeur-title">
              <div className="trais" style={{ background: "#146c54" }}>
                .
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Trouvez votre propriété parmi nos{" "}
                <span style={{ color: "#146c54" }}>meilleures offres</span>
              </h2>
            </div>
            <p className="text-gray-600 max-w-xl mx-auto paragraph-veddete">
              Que vous cherchiez à acheter ou vendre un terrain, une villa ou un
              immeuble , nous avons ce qu'il vous faut. Sélectionnez parmi les
              propriétés les plus attractives de la région et saisissez votre
              opportunité !
            </p>
          </div>
          <div className="cercle-container">
            <div
              className="cercle"
              style={{
                background: "#146c5501",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                margin: "0 auto",
                border: "2px solid #146c54",
              }}
            ></div>
            <div
              className="cercle"
              style={{
                background: "#146c5501",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                margin: "0 auto",
                border: "2px solid #146c54",
              }}
            ></div>
            <div
              className="cercle"
              style={{
                background: "#146c5501",
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                margin: "0 auto",
                border: "2px solid #146c54",
              }}
            ></div>
          </div>
          <div className="qodef-row-overlapping-text qodef-appear">TOGO!</div>
        </section>

        {/* Section 2: Cartes */}
        <section className="service bg-white py-12">
          <div className=" fonctionnalite-containt max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className=" nos-service bg-[#0b0b2b] text-white rounded-lg p-6 flex flex-col items-center text-center shadow-md"
              >
                <h3 className="text-lg font-bold mb-3">{service.titre}</h3>
                <p className="text-sm mb-6">{service.texte}</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
                  onClick={VerifierAchete}
                >
                  {service.bouton}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Satisfaction Plan */}
        <section className=" bg-indigo-950 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 section-satisfaction-image">
            <img
              src={satisfaction}
              alt="Clients heureux"
              className="rounded-xl w-full h-auto"
            />
            <div className="title-satisfaction">
              <div className="flex valeur-title">
                <div className="trais" style={{ background: "#146c54" }}>
                  .
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Mettre en œuvre un plan pour assurer votre{" "}
                  <span className="text-red-500">satisfaction !</span>
                </h3>
              </div>
              <p className="text-gray-300 mb-6">
                Utilisez notre outil et réalisez la vision de vos rêves.
                Saisissez l’opportunité qui s’offre à vous dès aujourd’hui.
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold"
                onClick={MieuxComprendre}
              >
                Mieux comprendre
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Témoignage */}
        <section className="bg-gray-100 py-10 px-4 temoignage">
          <div className="background-black">
            <div className="max-w-4xl mx-auto h-[370px] flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Texte */}
              <div className="w-1/2 p-8">
                <div className="flex gap-2">
                  <div className="trais" style={{ background: "#146c54" }}>
                    .
                  </div>
                  <h3 className="title-temoignage text-lg font-bold text-gray-800 mb-4">
                    Ce que nos <span className="clients">clients</span> disent
                    de nous
                  </h3>
                </div>
                <p className="text-gray-600 italic mb-6">"{text}"</p>
                <p className="font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>

              {/* Image */}
              <div className="w-1/2">
                <img src={image} alt={name} className=" h-full w-full " />
              </div>
            </div>
          </div>
        </section>

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

        <div className="bg-gray-100 min-h-screen">
          {/* Section villes */}
          <div className="px-6 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">
              Dans quelle ville vivras-tu pour réaliser ton rêve ?
            </h2>
            <p className="text-sm text-center text-gray-500 mb-10 max-w-md mx-auto">
              Chaque rêve mérite une ville pour l’accueillir.
            </p>

            <div className="ville-terrain grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="five-ville-content">
                <div className="four-ville">
                  <div className="two-ville">
                    <div
                      className="lome-terrain ville-terrain-card relative rounded-xl overflow-hidden bg-white shadow-md"
                      style={{ minHeight: "180px", maxWidth: "480px" }}
                    >
                      <img
                        src={Lome}
                        alt="Lomé"
                        className="w-full h-[11.4rem] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                        <span className="text-white font-semibold text-lg">
                          Lomé
                        </span>
                        <span className="text-white text-xs block">
                          32 Terrains
                        </span>
                      </div>
                    </div>

                    <div
                      className="Ville-fist-long ville-terrain-card relative rounded-xl overflow-hidden bg-white shadow-md"
                      style={{ minHeight: "180px", maxWidth: "480px" }}
                    >
                      <img
                        src={Tsevi}
                        alt="Lomé"
                        className="w-full h-[11.3rem] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                        <span className="text-white font-semibold text-lg">
                          Tsévié
                        </span>
                        <span className="text-white text-xs block">
                          51 Terrains
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      className="Ville-second-long ville-terrain-card relative rounded-xl overflow-hidden bg-white shadow-md"
                      style={{ minHeight: "180px", maxWidth: "480px" }}
                    >
                      <img
                        src={Vogan}
                        alt="Lomé"
                        className="w-full h-[11.4rem] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                        <span className="text-white font-semibold text-lg">
                          Vogan
                        </span>
                        <span className="text-white text-xs block">
                          42 Terrains
                        </span>
                      </div>
                    </div>

                    <div
                      className="aneho-ville ville-terrain-card relative rounded-xl overflow-hidden bg-white shadow-md"
                      style={{ minHeight: "80px", maxWidth: "480px" }}
                    >
                      <img
                        src={Aneho}
                        alt="Lomé"
                        className="w-full h-[11.3rem] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                        <span className="text-white font-semibold text-lg">
                          Aného
                        </span>
                        <span className="text-white text-xs block">
                          32 Terrains
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="one-ville">
                  <div
                    className="ville-terrain-card relative rounded-xl overflow-hidden bg-white shadow-md"
                    style={{ minHeight: "180px", maxWidth: "480px" }}
                  >
                    <img
                      src={Notse}
                      alt="Lomé"
                      className="w-full h-[24rem] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3">
                      <span className="text-white font-semibold text-lg">
                        Notsè
                      </span>
                      <span className="text-white text-xs block">
                        54 Terrains
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section contact + image */}
          <div
            className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          >
            <div
              className="contact-container bg-black bg-opacity-70 p-6 rounded-xl text-white w-80"
              style={{
                zIndex: 10,
                backgroundColor: "#100e2c",
              }}
            >
              <h2
                className="text-lg font-bold mb-3"
                style={{
                  fontSize: "30px",
                }}
              >
                Entrer en contact
              </h2>
              <p className="text-sm mb-4">
                Discutez avec notre équipe et obtenez l’assistance dont vous
                avez besoin
              </p>
              <form className="flex flex-col gap-2">
                <input
                  className="px-3 py-2 rounded text-black"
                  type="text"
                  placeholder="Votre nom"
                  required
                />
                <input
                  className="px-3 py-2 rounded text-black"
                  type="email"
                  placeholder="Votre Mail"
                  required
                />
                <input
                  className="px-3 py-2 rounded text-black"
                  type="text"
                  placeholder="Votre numéro whatsapp"
                  required
                />
                <textarea
                  className="px-3 py-2 rounded text-black"
                  placeholder="Votre message"
                  required
                ></textarea>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-2"
                  style={{
                    backgroundColor: "",
                  }}
                >
                  Envoyer message
                </button>
              </form>
            </div>
            <div
              className=" contact-title text-white ml-10 max-w-md hidden md:block"
              style={{
                zIndex: 10,
              }}
            >
              <h2 className="text-2xl font-bold mb-2">
                Nous sommes à votre écoute pour répondre à toutes vos questions
                et vous accompagner dans vos projets
              </h2>
              <p className="text-sm">
                Un conseiller est toujours disponible pour vous guider dans vos
                démarches.
              </p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
            <p>Julien@hustler.tg</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Property</h4>
            <p>Terrain Lot 1</p>
            <p>Terrain Lot 2</p>
            <p>Terrain Lot 3</p>
            <p>Terrain Lot 4</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Liens</h4>
            <p>
              <a href="/Accueil">Accueil</a>
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

export default Accueil;
