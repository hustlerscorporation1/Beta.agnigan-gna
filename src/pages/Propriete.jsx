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
import Dectailletairrain from "./DetailleTairrain";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Ruler,
  FileText,
  School,
  Hospital,
  ShoppingBag,
} from "lucide-react";

function Propriete() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Dectailletairrain");
  };
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
      {/* Main Content */}
      <div className="">
        <div className="flex flex-col lg:grid-cols-3 gap-8 top-20">
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
                      onClick={handleClick}
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
  );
}

export default Propriete;
