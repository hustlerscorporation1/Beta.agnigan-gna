import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { AlignJustify, X } from "lucide-react";
import "../App";
import "../Styles/Accueil.css";
import "../Styles/DetailleTairrain.css";
import heroImage from "../images/hero-image.jpg";
import PlanTerrain from "../images/implantation du projet sur le terrain_.jpeg";

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

import {
  MapPin,
  Ruler,
  FileText,
  School,
  Hospital,
  ShoppingBag,
} from "lucide-react";

const TerrainDetails = () => {
  const [open, setOpen] = useState(false);
  const [show3D, setShow3D] = useState(false);

  return (
    <div className="">
      <div className="max-w-6xl mx-auto p-6 ">
        {/* Header */}
        <div
          className="flex justify-between items-center"
          style={{
            marginTop: "100px",
          }}
        >
          <div className="flex flex-col space-y-2">
            <div>
              <button
                onClick={() => setOpen(true)}
                className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 shadow-md transition"
              >
                Acheter
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Terrain à Agoè – 400 m², Titre Foncier
            </h2>
            <p className="text-lg mb-3 text-gray-500">ID : 123423EDDT34TRY</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-700 mt-2">
              250 000 000 Fcfa
            </p>
            <p className="text-sm mb- text-gray-400">100 000 Fcfa / m²</p>
          </div>
        </div>

        {/* Image principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <img
            src={heroImage}
            alt="Terrain"
            className="rounded-xl shadow-md w-full h-[28.5rem] object-cover md:col-span-2"
          />
          <div className="space-y-4 md:col-span-1 ">
            <div className="relative rounded-lg overflow-hidden shadow-md h-[13.5rem]">
              <img
                src={heroImage}
                alt="terrain photos"
                className="rounded-lg shadow-md h-36 w-full object-cover h-[13.5rem]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium text-lg rounded-lg">
                Afficher tout (12 photos)
              </span>
            </div>
            <div className="h-36 rounded-lg h-[13.5rem] shadow-md bg-gray-100 flex items-center justify-center text-gray-600">
              🗺️ Map intégrée ici
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h3
            className="text-xl font-semibold mb-9"
            style={{
              fontSize: "2rem",
            }}
          >
            Description
          </h3>
          <p className="text-gray-600 text-justify leading-relaxed">
            Terrain de 400 m² situé à Agoè, avec titre foncier disponible et
            garanti. Il bénéficie d’un excellent emplacement, facilement
            accessible par route, à seulement quelques minutes des axes
            principaux. Bien délimité, ce terrain dispose d’un titre foncier en
            règle, d’une accessibilité facilitée grâce à des routes praticables
            et à la proximité des transports, et se trouve dans un quartier
            calme en plein développement. Il est idéal aussi bien pour un projet
            d’habitation, agricole, commercial que pour un investissement. Cette
            parcelle représente une opportunité unique pour sécuriser un
            patrimoine dans une zone en pleine expansion, offrant à la fois une
            valeur ajoutée à long terme et une mise en valeur immédiate pour vos
            projets.
          </p>
        </div>

        {/* Titres formels */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-3">
            Titres formels pour documents officiels
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <p className="font-medium">
                  📄 Fiche d’Identification du Terrain
                </p>
                <p className="text-sm text-gray-500">
                  Titre foncier disponible, eau et électricité sur place
                </p>
              </div>
              <a
                href="#"
                className="text-blue-600 font-medium hover:underline"
                download
              >
                Télécharger PDF
              </a>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <p className="font-medium">
                  📄 Note d’Information Foncière – Parcelle N° [2345]
                </p>
                <p className="text-sm text-gray-500">
                  Superficie 400 m², zone résidentielle
                </p>
              </div>
              <a
                href="#"
                className="text-blue-600 font-medium hover:underline"
                download
              >
                Télécharger PDF
              </a>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <p className="font-medium">
                  📄 Note d’Information Foncière – Parcelle N° [245]
                </p>
                <p className="text-sm text-gray-500">
                  Superficie 400 m², zone résidentielle
                </p>
              </div>
              <a
                href="#"
                className="text-blue-600 font-medium hover:underline"
                download
              >
                Télécharger PDF
              </a>
            </div>
          </div>
        </div>

        {/* Modal Formulaire */}
        {open && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
            style={{
              backdropFilter: "blur(5px)",
              animationDuration: "0.5s",
              animationName: "fadeIn",
            }}
          >
            <div
              className="bg-white h p-8 rounded-2xl shadow-lg w-full max-w-lg absolute"
              style={{
                marginTop: "10rem",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                ✖
              </button>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Demande d’Achat du Terrain
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Votre numéro"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Votre message"
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>

                {/* Upload fichiers */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Pièces jointes (PDF, image)
                  </label>
                  <input
                    type="file"
                    className="w-full border p-2 rounded-lg cursor-pointer"
                    multiple
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* second partie 3D */}
      <div className="max-w-6xl mx-auto p-6">
        {/* --- Description principale --- */}
        <div
          className="flex bg-white shadow-md rounded-xl p-6 mb-8"
          style={{
            Display: "flex",
            flexDirection: "column",
            gap: "1rem",
            AlignJustify: "center",
          }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-[3rem] text-center">
            Terrain à Vendre – Opportunité à Saisir !
          </h2>

          {/* Infos principales */}
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <tbody className="divide-y mb-6 divide-gray-200 text-gray-700">
              <tr className="mb-6">
                <td className="bg-gray-50 font-semibold px-4 py-2">
                  📍 Localisation
                </td>
                <td className="px-4 py-2">Agoè, Lomé</td>
              </tr>
              <tr>
                <td className="bg-gray-50 font-semibold px-4 py-2">
                  📐 Superficie
                </td>
                <td className="px-4 py-2">400 m²</td>
              </tr>
              <tr>
                <td className="bg-gray-50 font-semibold px-4 py-2">
                  📑 Statut
                </td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  Titre foncier disponible
                </td>
              </tr>
            </tbody>
          </table>

          {/* Caractéristiques */}
          <h3 className="mt-8 text-lg font-semibold text-gray-800">
            Caractéristiques
          </h3>
          <table className="w-full border border-gray-200 rounded-lg mt-2">
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="bg-gray-50 px-4 py-2">
                  Accès facile par voie principale
                </td>
                <td className="px-4 py-2 text-blue-600 font-medium">80%</td>
              </tr>
              <tr>
                <td className="bg-gray-50 px-4 py-2">
                  Idéal pour construction résidentielle ou commerciale
                </td>
                <td className="px-4 py-2 text-blue-600 font-medium">70%</td>
              </tr>
              <tr>
                <td className="bg-gray-50 px-4 py-2">
                  Belle vue / Terrain plat, Environnement calme et sécurisé
                </td>
                <td className="px-4 py-2 text-blue-600 font-medium">100%</td>
              </tr>
            </tbody>
          </table>

          {/* Proximité */}
          <h3 className="mt-8 text-lg font-semibold text-gray-800">
            À proximité
          </h3>
          <table className="w-full border border-gray-200 rounded-lg mt-2">
            <tbody className="divide-y divide-gray-200 text-gray-700">
              <tr>
                <td className="bg-gray-50 px-4 py-2">🏫 École Primaire Agoè</td>
                <td className="px-4 py-2">300 m</td>
              </tr>
              <tr>
                <td className="bg-gray-50 px-4 py-2">
                  🏥 Clinique Bon Secours
                </td>
                <td className="px-4 py-2">500 m</td>
              </tr>
              <tr>
                <td className="bg-gray-50 px-4 py-2">
                  🛒 Marché local, Pharmacie, Stations-services
                </td>
                <td className="px-4 py-2">moins de 1 km</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- Plan du terrain --- */}
        <div
          className="flex  bg-white shadow-2xl rounded-2xl p-8 mb-10"
          style={{
            Display: "flex",
            flexDirection: "column",
            gap: "3rem",
            AlignJustify: "center",
          }}
        >
          <h2 className="text-2xl font-bold text-black-900 mb-6 text-center">
            Parcelle bien située à Agoè
          </h2>

          <div className="grid justify-between md:grid-cols-2 gap">
            {/* Tableau des infos */}
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="bg-gray-50 font-semibold px-[2rem] py-3">
                    📍 Localisation
                  </td>
                  <td className="px-4 py-3">
                    À 5 min de la route principale – Zone calme et sécurisée
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 font-semibold px-4 py-3">
                    📐 Superficie
                  </td>
                  <td className="px-4 py-3">400 m²</td>
                </tr>
                <tr>
                  <td className="bg-gray-50 font-semibold px-4 py-3">
                    📑 Statut
                  </td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    Foncier disponible
                  </td>
                </tr>
                <tr>
                  <td className="bg-gray-50 font-semibold px-4 py-3">
                    ⚡ Viabilisation
                  </td>
                  <td className="px-4 py-3">Eau, électricité, accès direct</td>
                </tr>
                <tr>
                  <td className="bg-gray-50 font-semibold px-4 py-3">
                    🏡 Usage
                  </td>
                  <td className="px-4 py-3">
                    Résidentiel ou commercial (villa, appartements, bureaux,
                    commerce)
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Image premium */}
            <div className="flex justify-center items-center  ">
              <div className=" bg-gray-100 rounded-xl p-3 shadow-md hover:scale-105 transition-transform duration-300">
                <img
                  src={PlanTerrain}
                  alt="Plan du terrain"
                  className=" rounded-lg w-[27rem] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex justify-between mt-6 ">
            <div>
              <button className="px-6 py-3 bg-green-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition duration-300">
                Demander plus d’infos
              </button>
            </div>
            <div>
              <button
                onClick={() => setShow3D(true)}
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                Voir en 3D
              </button>
            </div>
          </div>
        </div>

        {/* --- Vidéo --- */}
        <div className="h-[30rem]">
          <h3 className="text-lg font-semibold mb-3">Vidéo</h3>
          <video controls className="w-full h-[27rem] rounded-lg shadow-md">
            <source
              src="../videos/Terrain du Sud __ Publicité TV (1).mp4"
              type="video/mp4"
            />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>

        {/* --- Modal 3D --- */}
        {show3D && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-11/12 md:w-3/4 relative">
              <button
                onClick={() => setShow3D(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl"
              >
                ✖
              </button>
              <h3 className="text-2xl font-bold text-center mb-4">
                Visualisation 3D du Terrain
              </h3>

              {/* Exemple avec un iframe (tu peux remplacer par react-three-fiber) */}
              <div className="w-full h-full">
                <div className="w-full h-full sketchfab-embed-wrapper">
                  <iframe
                    className="w-full h-[40rem] rounded-lg border"
                    title="Mountain terrain - Haytor Dartmoor National Park"
                    frameBorder="0"
                    allowFullScreen
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    xr-spatial-tracking
                    execution-while-out-of-viewport
                    execution-while-not-rendered
                    web-share
                    src="https://sketchfab.com/models/6d15587128a5451d9e29d6b50061045e/embed"
                  ></iframe>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "normal",
                      margin: "5px",
                      color: "#4A4A4A",
                    }}
                  >
                    Le terrain N°:111ETR4356POK de ADOBOE En 3D Toute Droit
                    Réservers - 2023
                  </p>
                </div>

                {/* <iframe
                  src="https://sketchfab.com/models/7w7p7j3d4e/embed"
                  title="Terrain 3D"
                  className="w-full h-full rounded-lg border"
                  allowFullScreen
                ></iframe> */}
              </div>
            </div>
          </div>
        )}
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

export default TerrainDetails;
