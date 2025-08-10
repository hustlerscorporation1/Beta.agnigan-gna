import React, { useState } from "react";
import Navbar from "../Navbar";
import "../Styles/Propriete.css";
import "../Styles/Accueil.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
import "leaflet/dist/leaflet.css";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";

function Propriete() {
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    location: "",
  });

  const properties = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200?text=Terrain+Togo+2000",
      title: "Togo 2000 routier de la Division",
      price: "250 000 000 Fcfa",
      coordinates: [6.130419, 1.215829],
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200?text=Terrain+Lomé",
      title: "Résidence du Lac, Lomé",
      price: "180 000 000 Fcfa",
      coordinates: [6.135419, 1.225829],
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200?text=Terrain+Lomé",
      title: "Résidence du Lac, Lomé",
      price: "180 000 000 Fcfa",
      coordinates: [6.139, 1.225859],
    },
  ];

  return (
    <div className="p-4">
      <div className="containt-map">
        <div className="min-h-screen bg-gray-50 containt-map-children">
          {/* Hero Banner */}
          <div className="bg-blue-600 text-white py-20 px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Trouvez un terrain adapté à votre style de vie
            </h1>
            <p className="text-xl">
              Toujours le terrain idéal, adapté à votre style de vie. En ville
              ou en périphérie, trouvez l'endroit où vous vous sentirez chez
              vous.
            </p>
          </div>

          {/* Search Bar */}
          <div className="container mx-auto px-4 py-8 bg-white shadow-lg -mt-10 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
              >
                <option value="">Catégorie</option>
                <option value="residential">Résidentiel</option>
                <option value="commercial">Commercial</option>
              </select>

              <select
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">Type de propriété</option>
                <option value="land">Terrain</option>
                <option value="house">Maison</option>
              </select>

              <select
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              >
                <option value="">Emplacement</option>
                <option value="lome">Lomé</option>
                <option value="kara">Kara</option>
              </select>

              <button className="bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
                RECHERCHE
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Property Listings */}
              <div className="lg:col-span-1 space-y-6">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">
                        {property.title}
                      </h3>
                      <p className="text-blue-600 font-bold text-xl mb-4">
                        {property.price}
                      </p>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Acheter
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                  center={[6.130419, 1.215829]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {properties.map((property) => (
                    <Marker position={property.coordinates} key={property.id}>
                      <Popup>
                        <div className="font-bold">{property.title}</div>
                        <div className="text-blue-600">{property.price}</div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
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

export default Propriete;
