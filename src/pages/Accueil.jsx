// src/pages/Accueil.jsx

import React, { useEffect, useState } from "react";
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
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import { FaSlidersH } from "react-icons/fa";
import "../Styles/Accueil.css";
import "../Styles/Footer.css";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";
import heroImage from "../images/hero-image.jpg";
import satisfaction from "../images/satisfaction.jpg";
import Slde from "../components/Slde";
import VideoBackground from "../pages/VideoBackgroud";

function Accueil() {
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
      image: satisfaction,
    },
    {
      name: "KOFFI Marie",
      role: "Designer",
      text: "Suspendisse potenti. Vivamus non eros vel lacus tempor pretium vitae id est. Donec vehicula quam vel ligula facilisis posuere.",
      image: satisfaction,
    },
  ];

  const services = [
    {
      titre: "Vérifier Un Terrain",
      texte:
        "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu",
      bouton: "Vérification",
    },
    {
      titre: "Achetez un Terrain",
      texte:
        "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu",
      bouton: "Acheter",
    },
    {
      titre: "Vendre un Terrain",
      texte:
        "Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus. Porttitor fermentum eu",
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

  return (
    <div className="body-accuiel">
      {/* Hero section */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay sombre pour le contraste du texte */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Texte et boutons */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 title-hero">
            Trouvez un terrain
            <br />
            adapté à votre style de vie.
          </h1>
          <p className="mb-6 max-w-2xl text-sm md:text-base">
            Trouvez le terrain idéal, adapté à votre style de vie. En ville ou
            en périphérie, nous vous aidons à concrétiser votre projet, là où
            vous vous sentirez vraiment chez vous. Télécharger l'application
          </p>
          <div className="flex gap-4 mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium playstore">
              APP STORE
            </button>
            <button className="border border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition playstore">
              PLAY STORE
            </button>
          </div>

          {/* Formulaire de recherche */}
          <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-4xl flex flex-wrap justify-between gap-4 container-recherche">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              placeholder="Catégorie"
            >
              <option>Catégorie</option>
              <option>Résidentiel</option>
              <option>Commercial</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              defaultValue=""
            >
              <option value="" disabled>
                Type de propriété
              </option>
              <option>Terrain nu</option>
              <option>Terrain viabilisé</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              placeholder="Emplacement"
            >
              <option>Emplacement</option>
              <option>Lomé</option>
              <option>Kara</option>
              <option>Sokodé</option>
            </select>

            <button className="text-2xl text-gray-700 hover:text-black">
              {/* <FaSlidersH /> */}
              <HiAdjustmentsHorizontal />
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md button-recherche">
              RECHERCHE{" "}
              <span className="search-icon">
                <FaSearch />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="font-sans">
        {/* Section 1: Header */}
        <section className="text-center py-12 bg-gray-50 section-veddete">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Découvrez votre propriété vedette
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto paragraph-veddete">
            Découvrez votre propriété vedette parmi nos meilleures offres. Que
            vous cherchiez un terrain, une villa ou un immeuble, nous avons ce
            qu'il vous faut. Sélectionnez parmi les propriétés les plus
            attractives de la région et saisissez votre opportunité !
          </p>
        </section>

        {/* Section 2: Cartes */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className=" nos-service bg-[#0b0b2b] text-white rounded-lg p-6 flex flex-col items-center text-center shadow-md"
              >
                <h3 className="text-lg font-bold mb-3">{service.titre}</h3>
                <p className="text-sm mb-6">{service.texte}</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                  {service.bouton}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Satisfaction Plan */}
        <section className="bg-indigo-950 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 section-satisfaction-image">
            <img
              src={satisfaction}
              alt="Clients heureux"
              className="rounded-xl w-full h-auto"
            />
            <div className="title-satisfaction">
              <h3 className="text-2xl font-bold mb-4">
                Mettre en œuvre un plan pour assurer votre satisfaction !
              </h3>
              <p className="text-gray-300 mb-6">
                Utilisez notre outil et réalisez la vision de vos rêves.
                Saisissez l’opportunité qui s’offre à vous dès aujourd’hui. Sed
                feugiat risus et pharetra adipiscing dictum.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold">
                Apprendre encore plus
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Témoignage */}
        <section className="bg-gray-100 py-10 px-4 temoignage">
          <div className="background-black">
            <div className="max-w-4xl mx-auto flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Texte */}
              <div className="w-1/2 p-8">
                <h3 className="title-temoignage text-lg font-bold text-gray-800 mb-4">
                  Ce que nos clients disent de nous
                </h3>
                <p className="text-gray-600 italic mb-6">"{text}"</p>
                <p className="font-semibold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
              </div>

              {/* Image */}
              <div className="w-1/2">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover"
                />
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
                  <span className="absolute bottom-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                    Privé
                  </span>
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
                    <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg">
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
              Leo motivi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus. Porttitor fermentum eu urna eget.
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
                        src="https://i.imgur.com/1.jpg"
                        alt="Lomé"
                        className="w-full h-32 object-cover"
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
                        src="https://i.imgur.com/1.jpg"
                        alt="Lomé"
                        className="w-full h-32 object-cover"
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
                        src="https://i.imgur.com/1.jpg"
                        alt="Lomé"
                        className="w-full h-32 object-cover"
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
                      style={{ minHeight: "180px", maxWidth: "480px" }}
                    >
                      <img
                        src="https://i.imgur.com/1.jpg"
                        alt="Lomé"
                        className="w-full h-32 object-cover"
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
                      src="https://i.imgur.com/1.jpg"
                      alt="Lomé"
                      className="w-full h-32 object-cover"
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
              className=" bg-black bg-opacity-70 p-6 rounded-xl text-white w-80"
              style={{
                zIndex: 10,
                backgroundColor: "#100E2C",
              }}
            >
              <h2 className="text-lg font-bold mb-3">Entrer en contact</h2>
              <p className="text-sm mb-4">
                Léo motivi faucibus mattis pharetra tellus velit ultricies duis
                rhoncus.
              </p>
              <form className="flex flex-col gap-2">
                <input
                  className="px-3 py-2 rounded text-black"
                  type="text"
                  placeholder="Votre nom"
                />
                <input
                  className="px-3 py-2 rounded text-black"
                  type="email"
                  placeholder="Votre Mail"
                />
                <input
                  className="px-3 py-2 rounded text-black"
                  type="text"
                  placeholder="Votre numéro whatsapp"
                />
                <textarea
                  className="px-3 py-2 rounded text-black"
                  placeholder="Votre message"
                ></textarea>
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-2">
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
                Mettre en œuvre un plan pour assurer votre satisfaction !
              </h2>
              <p className="text-sm">
                Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam
                habitant elit.
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
              <a href="">Accueil</a>
            </p>
            <p>
              <a href="">Propriétés</a>
            </p>
            <p>
              <a href="">À propos</a>
            </p>
            <p>
              <a href="">Contact</a>
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
          <p>© Copyright Hustler 2025. Conception par hustler cooperation</p>
          <div className="footer-reseau-sociaux">
            <div>
              <a href="">
                <FaFacebook />
              </a>
            </div>
            <div>
              <a href="">
                <FaTwitter />
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
