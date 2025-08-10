import React from "react";

import Navbar from "../Navbar";
import "../Styles/Apropos.css";
import { FaHome, FaMapMarkedAlt, FaFileContract } from "react-icons/fa";
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

import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";

function Apropos() {
  const AgentsSection = () => {
    const agents = [
      {
        name: "Terrell Norman",
        role: "Agent Foncier",
        office: "(228) 707-4989",
        mobile: "(228) 622-2842",
        email: "shrapnault@yahoo.ca",
        image: "/agent1.jpg",
      },
      {
        name: "Terrell Norman",
        role: "Agent Foncier",
        office: "(228) 707-4989",
        mobile: "(228) 622-2842",
        email: "shrapnault@yahoo.ca",
        image: "/agent2.jpg",
      },
      {
        name: "ADOBOE Comlan Julien",
        role: "Agent Foncier et Dev",
        office: "(228) 70 14 61 80",
        mobile: "(228) 99 05 58 75",
        email: "julien.adoboe@digital.gouv.tg",
        image: "/agent3.jpg",
      },
      {
        name: "Terrell Norman",
        role: "Agent Foncier",
        office: "(228) 707-4989",
        mobile: "(228) 622-2842",
        email: "shrapnault@yahoo.ca",
        image: "/agent-placeholder.jpg",
      },
    ];
  };
  return (
    <div className="body-apropos">
      <div className="p-4">
        <section className=" apropos-video bg-white rounded-lg overflow-hidden shadow-md">
          {/* Partie vidéo */}
          <div className="relative w-full h-72 md:h-96">
            {/* Vidéo en background */}
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video-plan.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo en arrière-plan.
            </video>

            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* Titre et lien vidéo */}
            <div className="absolute top-6 left-6 text-white z-10">
              <h2 className="text-2xl font-bold">Qui Somme Nous</h2>
              <p className="text-sm mt-1 underline cursor-pointer">
                Regarder la vidéo
              </p>
            </div>

            {/* Bouton Play */}
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition duration-300 z-10">
              ▶
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 text-center py-8 gap-6 px-4">
            <div>
              <FaHome className="mx-auto text-3xl text-blue-500" />
              <p className="text-3xl font-bold">250</p>
              <p className="text-gray-600">Terrains vendus pour ce mois</p>
            </div>
            <div>
              <FaMapMarkedAlt className="mx-auto text-3xl text-blue-500" />
              <p className="text-3xl font-bold">320</p>
              <p className="text-gray-600">Terrains déjà vendus</p>
            </div>
            <div>
              <FaFileContract className="mx-auto text-3xl text-blue-500" />
              <p className="text-3xl font-bold">125</p>
              <p className="text-gray-600">
                Parcelles cédées avec leurs titres fonciers
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          {/* Bloc 1 : Conseils d'experts */}
          <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src="/expert.jpg" // Remplace par ton image
                alt="Conseiller foncier"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Texte */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">
                Des conseils d&apos;experts pour tous vos besoins Foncier
              </h2>
              <p className="text-gray-600 mb-6">
                Pretium interdum risus risus facilisis cras pellentesque ipsum
                suspendisse venenatis. Morbi posuere semper enim imperdiet orci
                ut. Luctus odio nec massa porttitor curabitur in a. Faucibus
                ipsum lacinia aenean nec.
              </p>
              <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                CONTACTER
              </button>
            </div>
          </div>

          {/* Bloc 2 : Le succès */}
          <div className="text-center px-6 py-12">
            <h3 className="text-2xl font-bold mb-2">
              Le succès de nos clients est notre succès.
            </h3>
            <p className="text-gray-600 mb-10">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus. Porttitor fermentum eu urna eget
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Card 1 */}
              <div className="bg-[#0d0c29] text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h4 className="text-lg font-bold mb-4">Déclarer Un Terrain</h4>
                <p className="text-gray-300 text-center mb-6">
                  Leo morbi faucibus mattis pharetra tellus velit ultricies duis
                  rhoncus. Porttitor fermentum eu
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition">
                  Déclarer
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0d0c29] text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h4 className="text-lg font-bold mb-4">Acheter Un Terrain</h4>
                <p className="text-gray-300 text-center mb-6">
                  Leo morbi faucibus mattis pharetra tellus velit ultricies duis
                  rhoncus. Porttitor fermentum eu
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition">
                  Trouver une propriété
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0d0c29] text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h4 className="text-lg font-bold mb-4">Vendre Un Terrain</h4>
                <p className="text-gray-300 text-center mb-6">
                  Leo morbi faucibus mattis pharetra tellus velit ultricies duis
                  rhoncus. Porttitor fermentum eu
                </p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition">
                  Plus
                </button>
              </div>
            </div>
          </div>

          {/* Bloc 3 : Découvrez votre propriété */}
          <div className="relative w-full h-72 md:h-96">
            <img
              src="/terrain-vendre.jpg" // Remplace par ton image
              alt="Terrain à vendre"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Découvrez votre propriété
              </h2>
              <p className="text-white max-w-lg">
                Leo morbi faucibus mattis pharetra tellus velit ultricies duis
                rhoncus
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white">
          {/* Titre */}
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold">Nos agents professionnels</h2>
            <p className="text-gray-600">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus
            </p>
          </div>

          {/* Liste des agents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
            {agents.map((agent, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg p-4 flex gap-4 border border-gray-100"
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-28 h-28 object-cover rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{agent.name}</h3>
                    <p className="text-gray-500">{agent.role}</p>
                    <p className="text-sm mt-1">
                      <FaPhone className="inline mr-1" /> Office: {agent.office}
                    </p>
                    <p className="text-sm">
                      <FaMobileAlt className="inline mr-1" /> Mobile:{" "}
                      {agent.mobile}
                    </p>
                    <p className="text-sm">
                      <FaEnvelope className="inline mr-1" /> {agent.email}
                    </p>
                  </div>
                  {/* Réseaux sociaux */}
                  <div className="flex gap-3 mt-2 text-gray-600">
                    <FaFacebookF className="cursor-pointer hover:text-blue-500" />
                    <FaTwitter className="cursor-pointer hover:text-blue-400" />
                    <FaInstagram className="cursor-pointer hover:text-pink-500" />
                    <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bloc AGNIGBAN GNA */}
          <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                AGNIGBAN GNA, <br /> personnalisé pour vous
              </h3>
              <p className="text-gray-600 mb-6">
                Pretium interdum risus risus facilisis cras pellentesque ipsum
                suspendisse venenatis. Morbi posuere semper enim imperdiet orci
                ut. Luctus odio nec massa porttitor curabitur in a. Faucibus
                ipsum lacinia aenean nec.
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow transition">
                Plus
              </button>
            </div>

            <div className="relative w-full h-64 md:h-80">
              <img
                src="/terrain-vendre.jpg"
                alt="Terrain à vendre"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center px-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white">
                  Découvrez votre propriété
                </h2>
              </div>
            </div>
          </div>
        </section>

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
    </div>
  );
}
export default Apropos;
