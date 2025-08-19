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
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import "leaflet/dist/leaflet.css";
import heroImage from "../images/hero-image.jpg";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Propriete() {
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    location: "",
  });

  const properties = [
    {
      id: 1,
      image: heroImage,
      title: "Togo 2000 routier de la Division",
      price: "250 000 000 Fcfa",
      coordinates: [6.130419, 1.215829],
    },
    {
      id: 2,
      image: heroImage,
      title: "Résidence du Lac, Lomé",
      price: "180 000 000 Fcfa",
      coordinates: [6.135419, 1.225829],
    },
    {
      id: 3,
      image: heroImage,
      title: "Résidence du Lac, Lomé",
      price: "180 000 000 Fcfa",
      coordinates: [6.139, 1.225859],
    },
  ];

  return (
    <div className="">
      <div className="min-h-screen flex flex-col gap-4 justify-center align-items-center bg-gray-50 containt-map-children">
        {/* Hero Banner */}
        <div
          className="absolute inset-0 flex flex-col justify-center py-40"
          style={{
            background: "#0000007e",
            height: "40rem",
          }}
        ></div>
        <div
          className="bg-blue-600 text-white py-40 px-4 text-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "40rem",
          }}
        >
          <div
            className="container mx-auto text-center relative flex flex-col justify-center align-items-center"
            style={{
              width: "100%",
              maxWidth: "69rem",
              margin: "0 auto",
            }}
          >
            <h1
              className="mb-10"
              style={{
                textAlign: "center",
                marginTop: "100px",
                zIndex: "10000",
                textShadow: "black 0.1em 0.1em 0.2em",
                fontSize: "60px",
                fontWeight: "800",
                lineHeight: "55px",
                letterSpacing: "0px",
                marginLeft: "0",
              }}
            >
              Trouvez un terrain adapté à votre style de vie
            </h1>
            <p
              className="text-xl"
              style={{
                width: "50rem",
              }}
            >
              Toujours le terrain idéal, adapté à votre style de vie. En ville
              ou en périphérie, trouvez l'endroit où vous vous sentirez chez
              vous.
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="searche-contain">
          <div className=" searche-bar bg-white rounded-xl shadow-lg p-4 w-full max-w-4xl flex flex-wrap justify-between gap-4 container-recherche">
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto"
              placeholder="Entrez vôtre zone précise"
              style={{
                width: "169px",
              }}
            />
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
              <HiAdjustmentsHorizontal className="search-icon" />
            </button>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md button-recherche">
              RECHERCHE{" "}
              <span className="search-icon">
                <FaSearch />
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden shadow-lg">
              <MapContainer
                center={[6.130419, 1.215829]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {properties.map((property) => (
                  <Marker
                    position={property.coordinates}
                    key={property.id}
                    className
                  >
                    <Popup>
                      <img
                        src={property.image}
                        alt={property.title}
                        width="200"
                      />
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
