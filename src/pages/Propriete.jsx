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
      id: 41,
      image: heroImage,
      title: "Labante Yendouma",
      price: "Titre Foncier : En cours",
      acteur: "Bafilo – Kara",
      coordinates: [9.921823, 1.384957],
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

  const customDivIcon = L.divIcon({
    html: `
    <div class="custom-marker w-[12.5px] h-[12.5px] bg-red-600 rounded-full border-2 border-white shadow-md"></div>
  `,
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

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
