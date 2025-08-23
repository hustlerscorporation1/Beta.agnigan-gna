import React, { useState } from "react";
import "../Styles/Propriete.css";
import "../Styles/Accueil.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import heroImage from "../images/hero-image.jpg";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

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

  const [region, setRegion] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [commune, setCommune] = useState("");

  // Données simplifiées du Togo
  const regions = {
    Maritime: {
      Golfe: ["Lomé Commune", "Aflao-Sagbado", "Aflao-Gakli"],
      Avé: ["Avé 1", "Avé 2", "Avé 3"],
      Lacs: ["Aného", "Lacs 1", "Lacs 2"],
    },
    Plateaux: {
      Agou: ["Agou 1", "Agou 2"],
      Kloto: ["Kpalimé", "Kloto 1", "Kloto 2"],
    },
    Kara: {
      Kozah: ["Kara Commune", "Pya"],
      Bassar: ["Kabou", "Bassar Ville"],
    },
    Centrale: {
      Tchamba: ["Tchamba 1", "Tchamba 2"],
      Sotouboua: ["Sotouboua Ville", "Sotouboua Rurale"],
    },
    Savanes: {
      Tone: ["Dapaong", "Tone 1", "Tone 2"],
      Cinkassé: ["Cinkassé Ville", "Cinkassé Rurale"],
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Région: ${region}, Préfecture: ${prefecture}, Commune: ${commune}`);
  };

  const { BaseLayer } = LayersControl;

  return (
    <div className="">
      {/* Main Content */}
      <div className="">
        <div className="relative flex flex-col w-full lg:grid-cols-3 gap-8 top-20">
          {/* search content */}

          <div className="absolute flex justify-end items-start w-full h-full pr-6">
            <div
              className="max-w-sm h-[390px] p-4 bg-white rounded-2xl shadow-lg border"
              style={{
                zIndex: "1000",
                marginTop: "7rem",
              }}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Zoomer sur un territoire
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Région */}
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Régions
                  </label>
                  <select
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      setPrefecture("");
                      setCommune("");
                    }}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">-- Choisir une région --</option>
                    {Object.keys(regions).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Préfecture */}
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Préfectures
                  </label>
                  <select
                    value={prefecture}
                    onChange={(e) => {
                      setPrefecture(e.target.value);
                      setCommune("");
                    }}
                    disabled={!region}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">-- Choisir une préfecture --</option>
                    {region &&
                      Object.keys(regions[region]).map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Commune */}
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Communes
                  </label>
                  <select
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    disabled={!prefecture}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                  >
                    <option value="">-- Choisir une commune --</option>
                    {prefecture &&
                      regions[region][prefecture].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Valider
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:col-span-2 h-[100%] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={[8.6195, 0.8248]}
              zoom={7}
              style={{ height: "100vh", width: "100%" }}
            >
              <LayersControl position="bottomleft" className="bg-gray-100">
                {/* Fond de carte OpenStreetMap */}
                <BaseLayer checked name="OpenStreetMap">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </BaseLayer>

                {/* Fond de carte CartoDB */}
                <BaseLayer name="CartoDB">
                  <TileLayer url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png" />
                </BaseLayer>

                {/* Fond de carte Esri */}
                <BaseLayer name="EsriWorldImagery">
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                </BaseLayer>
              </LayersControl>

              {/* Ajout des propriétés */}
              {properties.map((property) => (
                <Marker
                  position={property.coordinates}
                  key={property.id}
                  className="marker bg-black"
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
