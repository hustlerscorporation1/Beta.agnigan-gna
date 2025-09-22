import React, { useState, useRef } from "react";
import "../Styles/Propriete.css";
import "../Styles/Accueil.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Polygon,
  useMap,
} from "react-leaflet";
import {
  getRegions,
  getPrefectures,
  getCommunes,
  getTerritoryData,
} from "../data/togoTerritories";
import { getTerritoryPolygon } from "../data/togoPolygons";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import heroImage from "../images/hero-image.jpg";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline";

function Propriete() {
  const [showFilter, setShowFilter] = useState(true);
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
      title: "Adjonou Kokouvi",
      price: "Titre Foncier : Privé",
      acteur: "Kara – Kara",
      coordinates: [9.386519, 1.001796],
    },
    {
      id: 2,
      image: heroImage,
      title: "Sogan Kokouvi",
      price: "Titre Foncier : En cours",
      acteur: "Mango – Savanes",
      coordinates: [10.619586, 0.562733],
    },
    {
      id: 3,
      image: heroImage,
      title: "Tchalla Sama",
      price: "73 000 000 Fcfa",
      acteur: "Atakpamé – Plateaux",
      coordinates: [7.016072, 1.002543],
    },
    {
      id: 4,
      image: heroImage,
      title: "Komlan Yendouma",
      price: "Titre Foncier : Privé",
      acteur: "Kara – Kara",
      coordinates: [9.587885, 1.035059],
    },
    {
      id: 5,
      image: heroImage,
      title: "Komlan Amegah",
      price: "153 000 000 Fcfa",
      acteur: "Badou – Plateaux",
      coordinates: [6.87456, 0.8787],
    },
    {
      id: 6,
      image: heroImage,
      title: "Komlan Adjo",
      price: "107 000 000 Fcfa",
      acteur: "Badou – Plateaux",
      coordinates: [6.968875, 1.026543],
    },
    {
      id: 7,
      image: heroImage,
      title: "Tchalla Atayi",
      price: "71 000 000 Fcfa",
      acteur: "Atakpamé – Plateaux",
      coordinates: [7.654419, 0.962045],
    },
    {
      id: 8,
      image: heroImage,
      title: "Ayité Mawuli",
      price: "36 000 000 Fcfa",
      acteur: "Mango – Savanes",
      coordinates: [10.850239, 0.18265],
    },

    {
      id: 10,
      image: heroImage,
      title: "Kokouvi Vincent",
      price: "Titre Foncier : En cours",
      acteur: "Bafilo – Kara",
      coordinates: [9.867747, 1.109543],
    },

    {
      id: 12,
      image: heroImage,
      title: "Sosougan Sama",
      price: "77 000 000 Fcfa",
      acteur: "Sokodé – Centrale",
      coordinates: [8.992611, 0.939704],
    },
    {
      id: 13,
      image: heroImage,
      title: "Adjonou Yaovi",
      price: "180 000 000 Fcfa",
      acteur: "Atakpamé – Plateaux",
      coordinates: [6.893691, 1.091363],
    },
    {
      id: 14,
      image: heroImage,
      title: "Tchalla Atayi",
      price: "135 000 000 Fcfa",
      acteur: "Sokodé – Centrale",
      coordinates: [8.710915, 1.025952],
    },
    {
      id: 15,
      image: heroImage,
      title: "Tchalla Komlan",
      price: "140 000 000 Fcfa",
      acteur: "Lomé – Maritime",
      coordinates: [6.424712, 0.921836],
    },
    {
      id: 16,
      image: heroImage,
      title: "Sogan Kokouvi",
      price: "47 000 000 Fcfa",
      acteur: "Blitta – Centrale",
      coordinates: [8.691007, 1.004937],
    },
    {
      id: 17,
      image: heroImage,
      title: "Vincent Komlan",
      price: "39 000 000 Fcfa",
      acteur: "Badou – Plateaux",
      coordinates: [7.675154, 1.20691],
    },
    {
      id: 18,
      image: heroImage,
      title: "Adjonou Yendouma",
      price: "Titre Foncier : Privé",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.172321, 0.891784],
    },
    {
      id: 19,
      image: heroImage,
      title: "Komlan Gnassingbé",
      price: "Titre Foncier : Privé",
      acteur: "Mango – Savanes",
      coordinates: [10.829896, 0.494578],
    },
    {
      id: 20,
      image: heroImage,
      title: "Ayité Djidjoho",
      price: "Titre Foncier : En cours",
      acteur: "Aného – Maritime",
      coordinates: [6.303018, 1.157843],
    },

    {
      id: 23,
      image: heroImage,
      title: "Komlan Mawuli",
      price: "59 000 000 Fcfa",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.799061, 1.064678],
    },
    {
      id: 24,
      image: heroImage,
      title: "Ayité Vincent",
      price: "Titre Foncier : En cours",
      acteur: "Atakpamé – Plateaux",
      coordinates: [6.907002, 1.083036],
    },
    {
      id: 25,
      image: heroImage,
      title: "Komlan Mawuli",
      price: "176 000 000 Fcfa",
      acteur: "Tchamba – Centrale",
      coordinates: [8.670927, 1.366167],
    },

    {
      id: 27,
      image: heroImage,
      title: "Tcharou Komlan",
      price: "Titre Foncier : Privé",
      acteur: "Kara – Kara",
      coordinates: [9.906164, 1.000191],
    },
    {
      id: 28,
      image: heroImage,
      title: "Tchalla Vincent",
      price: "43 000 000 Fcfa",
      acteur: "Dapaong – Savanes",
      coordinates: [10.842058, 0.444564],
    },
    {
      id: 29,
      image: heroImage,
      title: "Sogan Amegah",
      price: "197 000 000 Fcfa",
      acteur: "Atakpamé – Plateaux",
      coordinates: [7.60278, 1.297138],
    },
    {
      id: 30,
      image: heroImage,
      title: "Sogan Gnassingbé",
      price: "Titre Foncier : Libre",
      acteur: "Dapaong – Savanes",
      coordinates: [10.960659, 0.48646],
    },
    {
      id: 31,
      image: heroImage,
      title: "Yaovi Amegah",
      price: "Titre Foncier : En cours",
      acteur: "Tchamba – Centrale",
      coordinates: [8.762481, 1.368696],
    },

    {
      id: 33,
      image: heroImage,
      title: "Agbossou Djidjoho",
      price: "147 000 000 Fcfa",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.569809, 0.600225],
    },
    {
      id: 34,
      image: heroImage,
      title: "Yaovi Yaovi",
      price: "Titre Foncier : Libre",
      acteur: "Lomé – Maritime",
      coordinates: [6.549243, 1.20648],
    },
    {
      id: 35,
      image: heroImage,
      title: "Adjonou Amegah",
      price: "Titre Foncier : Libre",
      acteur: "Dapaong – Savanes",
      coordinates: [11.038815, 0.150682],
    },
    {
      id: 36,
      image: heroImage,
      title: "Yaovi Vincent",
      price: "123 000 000 Fcfa",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.433053, 0.760355],
    },
    {
      id: 37,
      image: heroImage,
      title: "Yaovi Atayi",
      price: "Titre Foncier : Privé",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.752543, 1.395314],
    },
    {
      id: 38,
      image: heroImage,
      title: "Sosougan Komlan",
      price: "101 000 000 Fcfa",
      acteur: "Sokodé – Centrale",
      coordinates: [9.054115, 1.589036],
    },

    {
      id: 40,
      image: heroImage,
      title: "Marvel Gnassingbé",
      price: "Titre Foncier : En cours",
      acteur: "Tchamba – Centrale",
      coordinates: [9.145064, 1.410804],
    },

    {
      id: 42,
      image: heroImage,
      title: "Vincent Afi",
      price: "32 000 000 Fcfa",
      acteur: "Sokodé – Centrale",
      coordinates: [8.310623, 1.10945],
    },
    {
      id: 43,
      image: heroImage,
      title: "Sogan Sama",
      price: "Titre Foncier : Libre",
      acteur: "Niamtougou – Kara",
      coordinates: [9.5494, 1.029691],
    },
    {
      id: 44,
      image: heroImage,
      title: "Yendouma Afi",
      price: "Titre Foncier : En cours",
      acteur: "Sokodé – Centrale",
      coordinates: [8.903767, 1.39541],
    },

    {
      id: 47,
      image: heroImage,
      title: "Tchalla Sama",
      price: "Titre Foncier : Privé",
      acteur: "Atakpamé – Plateaux",
      coordinates: [6.701599, 0.668273],
    },

    {
      id: 49,
      image: heroImage,
      title: "Mawuli Yaovi",
      price: "67 000 000 Fcfa",
      acteur: "Cinkassé – Savanes",
      coordinates: [10.81606, 0.021007],
    },
    {
      id: 50,
      image: heroImage,
      title: "Komlan Mawuli",
      price: "114 000 000 Fcfa",
      acteur: "Kara – Kara",
      coordinates: [9.524389, 1.077936],
    },
    {
      id: 51,
      image: heroImage,
      title: "Yaovi Komlan",
      price: "116 000 000 Fcfa",
      acteur: "Atakpamé – Plateaux",
      coordinates: [7.62842, 1.125046],
    },
    {
      id: 52,
      image: heroImage,
      title: "Sosougan Komlan",
      price: "157 000 000 Fcfa",
      acteur: "Lomé – Maritime",
      coordinates: [6.427323, 1.238343],
    },
    {
      id: 53,
      image: heroImage,
      title: "Vincent Komlan",
      price: "Titre Foncier : En cours",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.03462, 1.091997],
    },
    {
      id: 54,
      image: heroImage,
      title: "Mawuli Atayi",
      price: "160 000 000 Fcfa",
      acteur: "Cinkassé – Savanes",
      coordinates: [10.921153, 0.321437],
    },
    {
      id: 55,
      image: heroImage,
      title: "Yendouma Yendouma",
      price: "Titre Foncier : Privé",
      acteur: "Blitta – Centrale",
      coordinates: [8.436664, 1.026394],
    },
    {
      id: 56,
      image: heroImage,
      title: "Agbossou Atayi",
      price: "76 000 000 Fcfa",
      acteur: "Badou – Plateaux",
      coordinates: [7.260271, 1.263261],
    },
    {
      id: 57,
      image: heroImage,
      title: "Marvel Atayi",
      price: "172 000 000 Fcfa",
      acteur: "Bafilo – Kara",
      coordinates: [9.493638, 1.250046],
    },
    {
      id: 58,
      image: heroImage,
      title: "Tcharou Yaovi",
      price: "Titre Foncier : Libre",
      acteur: "Kara – Kara",
      coordinates: [9.939606, 1.27321],
    },
    {
      id: 59,
      image: heroImage,
      title: "Mawuli Komlan",
      price: "57 000 000 Fcfa",
      acteur: "Blitta – Centrale",
      coordinates: [8.204425, 0.96227],
    },
    {
      id: 60,
      image: heroImage,
      title: "Agbossou Yendouma",
      price: "155 000 000 Fcfa",
      acteur: "Tchamba – Centrale",
      coordinates: [8.028435, 1.039835],
    },
    {
      id: 61,
      image: heroImage,
      title: "Sosougan Kokouvi",
      price: "37 000 000 Fcfa",
      acteur: "Bafilo – Kara",
      coordinates: [9.400439, 1.129036],
    },
    {
      id: 62,
      image: heroImage,
      title: "Marvel Mawuli",
      price: "91 000 000 Fcfa",
      acteur: "Bafilo – Kara",
      coordinates: [9.525692, 1.051758],
    },

    {
      id: 64,
      image: heroImage,
      title: "Kokouvi Komlan",
      price: "Titre Foncier : Libre",
      acteur: "Badou – Plateaux",
      coordinates: [6.93962, 0.938495],
    },
    {
      id: 65,
      image: heroImage,
      title: "Adjonou Komlan",
      price: "167 000 000 Fcfa",
      acteur: "Bafilo – Kara",
      coordinates: [9.328541, 1.352731],
    },

    {
      id: 67,
      image: heroImage,
      title: "Tcharou Gnassingbé",
      price: "103 000 000 Fcfa",
      acteur: "Niamtougou – Kara",
      coordinates: [9.316429, 1.151805],
    },
    {
      id: 68,
      image: heroImage,
      title: "Yaovi Amouzou",
      price: "Titre Foncier : Privé",
      acteur: "Tsévié – Maritime",
      coordinates: [6.494125, 0.993892],
    },
    {
      id: 69,
      image: heroImage,
      title: "Kokouvi Yendouma",
      price: "Titre Foncier : Privé",
      acteur: "Aného – Maritime",
      coordinates: [6.567622, 1.212232],
    },
    {
      id: 70,
      image: heroImage,
      title: "Komlan Mawuli",
      price: "198 000 000 Fcfa",
      acteur: "Blitta – Centrale",
      coordinates: [8.845475, 0.950768],
    },
    {
      id: 71,
      image: heroImage,
      title: "Tcharou Adjo",
      price: "Titre Foncier : En cours",
      acteur: "Cinkassé – Savanes",
      coordinates: [10.804346, 0.188675],
    },
    {
      id: 72,
      image: heroImage,
      title: "Ayité Komlan",
      price: "Titre Foncier : En cours",
      acteur: "Lomé – Maritime",
      coordinates: [6.578217, 1.494932],
    },
    {
      id: 73,
      image: heroImage,
      title: "Ayité Amegah",
      price: "Titre Foncier : Privé",
      acteur: "Blitta – Centrale",
      coordinates: [8.165745, 0.997608],
    },
    {
      id: 74,
      image: heroImage,
      title: "Adjonou Afi",
      price: "89 000 000 Fcfa",
      acteur: "Sokodé – Centrale",
      coordinates: [8.853666, 1.228437],
    },

    {
      id: 76,
      image: heroImage,
      title: "Marvel Afi",
      price: "78 000 000 Fcfa",
      acteur: "Dapaong – Savanes",
      coordinates: [11.059011, 0.112279],
    },
    {
      id: 77,
      image: heroImage,
      title: "Yendouma Sama",
      price: "Titre Foncier : En cours",
      acteur: "Dapaong – Savanes",
      coordinates: [10.798921, 0.311295],
    },
    {
      id: 78,
      image: heroImage,
      title: "Adjonou Amouzou",
      price: "Titre Foncier : Privé",
      acteur: "Tchamba – Centrale",
      coordinates: [8.541446, 1.444878],
    },
    {
      id: 79,
      image: heroImage,
      title: "Kokouvi Mawuli",
      price: "Titre Foncier : Privé",
      acteur: "Atakpamé – Plateaux",
      coordinates: [7.543924, 1.133244],
    },
    {
      id: 80,
      image: heroImage,
      title: "Yendouma Djidjoho",
      price: "Titre Foncier : Privé",
      acteur: "Dapaong – Savanes",
      coordinates: [10.748806, 0.543584],
    },
    {
      id: 81,
      image: heroImage,
      title: "Adjonou Adjo",
      price: "73 000 000 Fcfa",
      acteur: "Lomé – Maritime",
      coordinates: [6.398159, 0.995015],
    },
    {
      id: 82,
      image: heroImage,
      title: "Marvel Djidjoho",
      price: "Titre Foncier : En cours",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.396741, 0.758245],
    },

    {
      id: 86,
      image: heroImage,
      title: "Yaovi Mawuli",
      price: "68 000 000 Fcfa",
      acteur: "Badou – Plateaux",
      coordinates: [6.760991, 0.721925],
    },
    {
      id: 87,
      image: heroImage,
      title: "Sogan Sama",
      price: "55 000 000 Fcfa",
      acteur: "Kpalimé – Plateaux",
      coordinates: [6.941184, 1.292225],
    },

    {
      id: 89,
      image: heroImage,
      title: "Vincent Atayi",
      price: "Titre Foncier : Privé",
      acteur: "Cinkassé – Savanes",
      coordinates: [10.616844, 0.202664],
    },
    {
      id: 90,
      image: heroImage,
      title: "Marvel Yaovi",
      price: "200 000 000 Fcfa",
      acteur: "Tchamba – Centrale",
      coordinates: [9.11709, 1.236737],
    },
    {
      id: 91,
      image: heroImage,
      title: "Labante Amouzou",
      price: "75 000 000 Fcfa",
      acteur: "Bafilo – Kara",
      coordinates: [9.528972, 1.119012],
    },

    {
      id: 93,
      image: heroImage,
      title: "Labante Kpétigo",
      price: "138 000 000 Fcfa",
      acteur: "Kara – Kara",
      coordinates: [9.840124, 1.123375],
    },
    {
      id: 94,
      image: heroImage,
      title: "Sosougan Kokouvi",
      price: "25 000 000 Fcfa",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.63328, 1.214477],
    },
    {
      id: 95,
      image: heroImage,
      title: "Vincent Amegah",
      price: "Titre Foncier : Privé",
      acteur: "Tchamba – Centrale",
      coordinates: [8.489336, 1.004721],
    },
    {
      id: 96,
      image: heroImage,
      title: "Mawuli Atayi",
      price: "192 000 000 Fcfa",
      acteur: "Aného – Maritime",
      coordinates: [6.471441, 1.574492],
    },
    {
      id: 97,
      image: heroImage,
      title: "Adjonou Mawuli",
      price: "187 000 000 Fcfa",
      acteur: "Dapaong – Savanes",
      coordinates: [10.906111, 0.018806],
    },

    {
      id: 100,
      image: heroImage,
      title: "Marvel Mawuli",
      price: "Titre Foncier : En cours",
      acteur: "Kpalimé – Plateaux",
      coordinates: [7.52257, 0.770434],
    },
  ];

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPrefecture, setSelectedPrefecture] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const mapRef = useRef(null);

  // Composant pour contrôler la carte
  const MapController = ({ center, zoom, bounds }) => {
    const map = useMap();

    React.useEffect(() => {
      if (bounds) {
        map.fitBounds(bounds, { padding: [20, 20] });
      } else if (center && zoom) {
        map.setView(center, zoom);
      }
    }, [map, center, zoom, bounds]);

    return null;
  };

  // Gestion des sélections
  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setSelectedPrefecture("");
    setSelectedCommune("");

    if (region) {
      const territoryData = getTerritoryData(region);
      if (territoryData && mapRef.current) {
        mapRef.current.setView(territoryData.center, territoryData.zoom);
      }
    }
  };

  const handlePrefectureChange = (e) => {
    const prefecture = e.target.value;
    setSelectedPrefecture(prefecture);
    setSelectedCommune("");

    if (prefecture && selectedRegion) {
      const territoryData = getTerritoryData(selectedRegion, prefecture);
      if (territoryData && mapRef.current) {
        mapRef.current.setView(territoryData.center, territoryData.zoom);
      }
    }
  };

  const handleCommuneChange = (e) => {
    const commune = e.target.value;
    setSelectedCommune(commune);

    if (commune && selectedRegion && selectedPrefecture) {
      const territoryData = getTerritoryData(
        selectedRegion,
        selectedPrefecture,
        commune
      );
      if (territoryData && mapRef.current) {
        mapRef.current.setView(territoryData.center, territoryData.zoom);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRegion || selectedPrefecture || selectedCommune) {
      const territoryData = getTerritoryData(
        selectedRegion,
        selectedPrefecture,
        selectedCommune
      );
      if (territoryData && mapRef.current) {
        mapRef.current.setView(territoryData.center, territoryData.zoom);
      }
    }
  };

  const handleReset = () => {
    setSelectedRegion("");
    setSelectedPrefecture("");
    setSelectedCommune("");
    if (mapRef.current) {
      mapRef.current.setView([8.6195, 0.8248], 7);
    }
  };

  const { BaseLayer } = LayersControl;

  // Icône personnalisé type "GPS"
  const customDivIcon = L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <!-- Cercle extérieur -->
        <div class="w-3 h-3 bg-[#7A94A4] rounded-full border border-white flex items-center justify-center">
          <!-- Cercle intérieur -->
          <div class="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    `,
    className: "",
    iconSize: [12, 12], // taille totale
    iconAnchor: [6, 6], // centre exact
  });

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Main Content */}
      <div className="relative">
        <div className="relative flex flex-col w-full h-screen pt-20">
          {/* search content */}

          {/* Icône toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-center fixed top-[7rem] right-[5rem] z-50 p-3  bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-110 group"
            style={{
              zIndex: "1001",
              borderRadius: "100%",
              width: "3rem",
              height: "3rem",
            }}
          >
            {showFilter ? (
              <XMarkIcon className="h-6 w-6 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
            ) : (
              <FunnelIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
            )}
          </button>

          {showFilter && (
            <div
              className="fixed top-[10rem] right-[4rem] w-80 max-w-[calc(100vw-2rem)] p-4 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200 backdrop-blur-sm max-h-[calc(100vh-12rem)] overflow-y-auto"
              style={{ zIndex: "1000" }}
            >
              <div className="flex items-center mb-4">
                {/* <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2"></div> */}
                <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Explorer le Togo
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Région */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    {/* <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> */}
                    Régions
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={handleRegionChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer"
                    >
                      <option value="">🌍 Sélectionner une région</option>
                      {getRegions().map((region) => (
                        <option key={region} value={region}>
                          📍 {region}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Préfecture */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    {/* <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> */}
                    Préfectures
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPrefecture}
                      onChange={handlePrefectureChange}
                      disabled={!selectedRegion}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {selectedRegion
                          ? "🏛️ Choisir une préfecture"
                          : "⏳ Sélectionnez d'abord une région"}
                      </option>
                      {selectedRegion &&
                        getPrefectures(selectedRegion).map((prefecture) => (
                          <option key={prefecture} value={prefecture}>
                            🏢 {prefecture}
                          </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Commune */}
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-semibold mb-2 flex items-center">
                    {/* <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span> */}
                    Communes
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCommune}
                      onChange={handleCommuneChange}
                      disabled={!selectedPrefecture}
                      className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white shadow-sm hover:shadow-md appearance-none cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {selectedPrefecture
                          ? "🏘️ Choisir une commune"
                          : "⏳ Sélectionnez d'abord une préfecture"}
                      </option>
                      {selectedRegion &&
                        selectedPrefecture &&
                        getCommunes(selectedRegion, selectedPrefecture).map(
                          (commune) => (
                            <option key={commune} value={commune}>
                              🏠 {commune}
                            </option>
                          )
                        )}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    Explorer
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold text-sm rounded-xl shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Reset
                  </button>
                </div>

                {/* Indicateur de sélection */}
                {(selectedRegion || selectedPrefecture || selectedCommune) && (
                  <div className="mt-3 p-2.5 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <div className="text-xs font-medium text-green-800 mb-1">
                      Sélection actuelle :
                    </div>
                    <div className="text-xs text-green-600 flex flex-wrap gap-1">
                      {selectedRegion && (
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                          📍 {selectedRegion}
                        </span>
                      )}
                      {selectedPrefecture && (
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                          🏢 {selectedPrefecture}
                        </span>
                      )}
                      {selectedCommune && (
                        <span className="inline-block bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">
                          🏠 {selectedCommune}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Map */}
          <div className="w-full h-full">
            <MapContainer
              center={[8.6195, 0.8248]}
              zoom={7}
              style={{ height: "100vh", width: "100%" }}
              ref={mapRef}
            >
              <MapController
                center={
                  selectedRegion || selectedPrefecture || selectedCommune
                    ? getTerritoryData(
                        selectedRegion,
                        selectedPrefecture,
                        selectedCommune
                      )?.center
                    : null
                }
                zoom={
                  selectedRegion || selectedPrefecture || selectedCommune
                    ? getTerritoryData(
                        selectedRegion,
                        selectedPrefecture,
                        selectedCommune
                      )?.zoom
                    : null
                }
                bounds={
                  selectedRegion || selectedPrefecture || selectedCommune
                    ? getTerritoryData(
                        selectedRegion,
                        selectedPrefecture,
                        selectedCommune
                      )?.bounds
                    : null
                }
              />
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

              {/* Polygones des territoires */}
              {selectedRegion &&
                (() => {
                  const polygon = getTerritoryPolygon(
                    selectedRegion,
                    selectedPrefecture
                  );
                  if (polygon) {
                    return (
                      <Polygon
                        positions={polygon.coordinates[0].map((coord) => [
                          coord[1],
                          coord[0],
                        ])}
                        pathOptions={polygon.style}
                      />
                    );
                  }
                  return null;
                })()}

              {/* Ajout des propriétés */}
              {properties.map((property) => (
                <Marker
                  position={property.coordinates}
                  key={property.id}
                  className="marker bg-black"
                  icon={customDivIcon}
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
                    <div className="text-blue-600">{property.acteur}</div>
                    <div className="text-blue-600">{property.description}</div>
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
