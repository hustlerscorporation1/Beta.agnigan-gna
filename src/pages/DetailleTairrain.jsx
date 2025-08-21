import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import "../App";
import "../Styles/Accueil.css";
import "../Styles/DetailleTairrain.css";
import heroImage from "../images/hero-image.jpg";
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
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est id cum
            itaque odit eveniet dolores? At quaerat fugit explicabo quasi
            repudiandae pariatur dolorum omnis, obcaecati ea magni quos itaque
            ipsum? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Provident dicta sit nesciunt in necessitatibus voluptatem aut
            commodi, assumenda illo incidunt pariatur adipisci facere rem
            eligendi sapiente inventore consequuntur aspernatur. Perspiciatis.
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            quas deserunt, nobis ab et magni! Modi dolores neque delectus quod,
            explicabo quia, officia vel praesentium tenetur assumenda, illo
            dolorum atque? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nam nesciunt sapiente distinctio non soluta facere deleniti
            porro eveniet? Dolores fugiat ducimus corrupti minus nesciunt totam
            esse autem sequi distinctio id.
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
          </div>
        </div>

        {/* Modal Formulaire */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 ">
            <div
              className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg relative"
              style={{
                marginTop: "250px",
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
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Terrain à Vendre – Opportunité à Saisir !
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>
              📍 Localisation : <span className="font-medium">Agoè, Lomé</span>
            </p>
            <p>
              📐 Superficie : <span className="font-medium">400 m²</span>
            </p>
            <p>
              📑 Statut :{" "}
              <span className="text-green-600 font-semibold">
                Titre foncier disponible
              </span>
            </p>
          </div>

          {/* Caractéristiques */}
          <h3 className="mt-6 text-lg font-semibold text-gray-700">
            Caractéristiques :
          </h3>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-600">
            <li>
              Accès facile par voie principale –{" "}
              <span className="text-blue-600 font-medium">80%</span>
            </li>
            <li>
              Idéal pour construction résidentielle ou commerciale –{" "}
              <span className="text-blue-600 font-medium">70%</span>
            </li>
            <li>
              Belle vue / Terrain plat, Environnement calme et sécurisé –{" "}
              <span className="text-blue-600 font-medium">100%</span>
            </li>
          </ul>

          {/* Proximité */}
          <h3 className="mt-6 text-lg font-semibold text-gray-700">
            À proximité :
          </h3>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>
              🏫 École Primaire Agoè –{" "}
              <span className="font-medium">300 m</span>
            </li>
            <li>
              🏥 Clinique Bon Secours –{" "}
              <span className="font-medium">500 m</span>
            </li>
            <li>
              🛒 Marché local, Pharmacie, Stations-services –{" "}
              <span className="font-medium">moins de 1 km</span>
            </li>
          </ul>
        </div>

        {/* --- Plan du terrain --- */}
        <div className="bg-indigo-950 text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-3">
            <p className="text-lg">
              📍{" "}
              <span className="font-semibold">Parcelle bien située à Agoè</span>
            </p>
            <p>
              À 5 minutes de la route principale, dans une zone résidentielle
              calme et sécurisée.
            </p>
            <p className="text-lg">
              📐{" "}
              <span className="font-semibold">400 m² – Foncier disponible</span>
            </p>
            <p>Prêt à bâtir, viabilisé (eau, électricité, accès direct).</p>
            <p className="text-lg">
              🏡{" "}
              <span className="font-semibold">Bon pour usage résidentiel</span>
            </p>
            <p>
              Possibilité de construction : villa, appartements, bureaux ou
              commerce.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-2">
            <img
              src="/plan-terrain.png"
              alt="Plan du terrain"
              className="rounded-md w-64"
            />
          </div>
        </div>

        {/* --- Bouton Voir en 3D --- */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShow3D(true)}
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Voir en 3D
          </button>
        </div>

        {/* --- Vidéo --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Vidéo</h3>
          <video controls className="w-full rounded-lg shadow-md">
            <source src="/terrain-video.mp4" type="video/mp4" />
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
              <div className="w-full h-[500px]">
                <iframe
                  src="https://sketchfab.com/models/7w7p7j3d4e/embed"
                  title="Terrain 3D"
                  className="w-full h-full rounded-lg border"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
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
};

export default TerrainDetails;
