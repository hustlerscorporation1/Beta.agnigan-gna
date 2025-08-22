import React from "react";
import {
  FaHome,
  FaMapMarkedAlt,
  FaFileContract,
  FaPhone,
  FaMobileAlt,
  FaEnvelope,
  FaFacebookF,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaLinkedin,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";
import heroImage from "../images/hero-image.jpg";
import { color } from "framer-motion";
import Client1 from "../images/Client 1.jpg";
import Client2 from "../images/Client 2.jpg";

const agents = [
  {
    name: "Terrell Norman",
    role: "Agent Foncier",
    office: "(228) 707-4989",
    mobile: "(228) 622-2842",
    email: "shrapnault@yahoo.ca",
    image: Client1,
  },
  {
    name: "ADOBOE Comlan Julien",
    role: "Agent Foncier et Dev",
    office: "(228) 70 14 61 80",
    mobile: "(228) 99 05 58 75",
    email: "julien.adoboe@digital.gouv.tg",
    image: Client2,
  },
];

function Apropos() {
  return (
    <div className="">
      {/* Section vidéo premium */}
      <section
        className="video-section rounded-2xl overflow-hidden shadow-xl mb-12 border border-blue-200 bg-white"
        style={{
          width: "100%",
          background: `url(${heroImage}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <div
          className=" relative w-full h-80 md:h-[400px]"
          style={{
            marginTop: "90px",
            height: "500px",
            background: "#f6f9fc1c",
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video-plan.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br backdrop-blur-sm"></div>
          <div className="absolute top-8 left-8 z-10">
            <h2
              className="text-4xl font-extrabold text-white drop-shadow mb-2"
              style={{
                color: "#ffe500",
              }}
            >
              Qui Somme Nous
            </h2>
            <p className="text-white text-lg underline cursor-pointer">
              Regarder la vidéo
            </p>
          </div>
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-full shadow-2xl transition duration-300 z-10 border-4 border-white"
            style={{
              backgroundColor: "#43a55d",
            }}
          >
            <svg width="40" height="40" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="absolute bottom-8 left-8 z-10 max-w-lg">
            <p className="text-white text-base md:text-lg drop-shadow">
              Lorem ipsum dolor sit amet consectetur. Morbi quis habitant donec
              aliquet malesuada. Mauris dictum bibendum tellus sed ultricies
              pharetra in lorem eget.
            </p>
          </div>
        </div>
        <div className="bg-white grid grid-cols-1 md:grid-cols-3 gap-6 py-10 px-6 text-center rounded-b-2xl">
          <div className="flex flex-col items-center">
            <FaHome
              className="text-4xl text-blue-600 mb-2"
              style={{
                color: "#d30731",
              }}
            />
            <span
              className="text-4xl font-extrabold text-blue-900 mb-1"
              style={{
                color: "#000000ff",
              }}
            >
              250
            </span>
            <span className="text-gray-700">Terrains vendus pour ce mois</span>
          </div>
          <div className="flex flex-col items-center">
            <FaMapMarkedAlt
              className="text-4xl text-blue-600 mb-2"
              style={{
                color: "#d30731",
              }}
            />
            <span
              className="text-4xl font-extrabold text-blue-900 mb-1"
              style={{
                color: "#000000ff",
              }}
            >
              320
            </span>
            <span className="text-gray-700">Terrains déjà vendus</span>
          </div>
          <div className="flex flex-col items-center">
            <FaFileContract
              className="text-4xl text-blue-600 mb-2"
              style={{
                color: "#d30731",
              }}
            />
            <span
              className="text-4xl font-extrabold text-blue-900 mb-1"
              style={{
                color: "#000000ff",
              }}
            >
              125
            </span>
            <span className="text-gray-700">
              Parcelles cédées avec leurs titres fonciers
            </span>
          </div>
        </div>
      </section>

      {/* Section agents premium */}
      <section
        className=" bg-white rounded-2xl p-8 mb-12"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="text-center mb-10">
          <h2
            className="text-3xl font-extrabold mb-2"
            style={{
              color: "#d30731",
            }}
          >
            Nos agents professionnels
          </h2>
          <p className="text-gray-600">
            Experts à votre service pour tous vos besoins fonciers
          </p>
        </div>
        <div
          className=""
          style={{
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            gap: "2rem",
          }}
        >
          {agents.map((agent, index) => (
            <div
              key={index}
              className="w-[39rem] max-w-full h-[17rem] from-blue-50 via-white to-blue-100  rounded-xl p-6 flex gap-6 border border-blue-100"
              style={{
                backgroundColor: "#f6f6f6",
              }}
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-30 h-30 object-cover rounded-xl border-4 border-blue-200 shadow"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                  <p
                    className=" font-semibold mb-2"
                    style={{
                      color: "#43a55d",
                    }}
                  >
                    {agent.role}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <FaPhone
                      className="inline mr-1 text-blue-500"
                      style={{
                        color: "#43a55d",
                      }}
                    />{" "}
                    Office: {agent.office}
                  </p>
                  <p className="text-sm text-gray-700 mb-1">
                    <FaMobileAlt
                      className="inline mr-1 text-blue-500"
                      style={{
                        color: "#43a55d",
                      }}
                    />{" "}
                    Mobile: {agent.mobile}
                  </p>
                  <p className="text-sm text-gray-700">
                    <FaEnvelope
                      className="inline mr-1 text-blue-500"
                      style={{
                        color: "#43a55d",
                      }}
                    />{" "}
                    {agent.email}
                  </p>
                </div>
                <div className="flex gap-3 mt-3 text-gray-500">
                  <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                  <FaTwitter className="cursor-pointer hover:text-blue-400" />
                  <FaInstagram className="cursor-pointer hover:text-pink-500" />
                  <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section expertise premium */}
      <section
        className="rounded-2xl  bg-gradient-to-br  via-white to-blue-100 p-8 mb-12"
        style={{
          backgroundColor: "#f6f9fc",
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img
            src={heroImage}
            alt="Conseiller foncier"
            className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
          />
          <div className="gap-6 flex flex-col w-full md:w-1/2">
            <div className="flex gap-4">
              <div
                className="trais"
                style={{
                  backgroundColor: "#43a55d",
                }}
              >
                .
              </div>
              <h2 className="text-2xl font-extrabold mb-4">
                Des conseils d'experts pour tous vos{" "}
                <span
                  style={{
                    color: "#d30731",
                  }}
                >
                  {" "}
                  besoins
                </span>{" "}
                Foncier
              </h2>
            </div>
            <p className="text-gray-700 mb-6">
              Pretium interdum risus risus facilisis cras pellentesque ipsum
              suspendisse venenatis. Morbi posuere semper enim imperdiet orci
              ut. Luctus odio nec massa porttitor curabitur in a. Faucibus ipsum
              lacinia aenean nec.
            </p>
            <button
              className="button-contact text-white font-semibold px-4 py-3 rounded-xl shadow transition"
              style={{
                backgroundColor: "#ffe500",
                color: "#000000",
              }}
            >
              CONTACTER
            </button>
          </div>
        </div>
      </section>

      {/* Section succès premium */}
      <section className="bg-white rounded-2xl  p-8 mb-12">
        <div className="text-center mb-10">
          <h3
            className="text-2xl font-extrabold mb-2"
            style={{
              marginTop: "30px",
            }}
          >
            Le succès de nos clients est notre{" "}
            <span
              className="text-4xl font-extrabold text-blue-900 mb-1"
              style={{
                color: "#d30731",
              }}
            >
              succès
            </span>
            .
          </h3>
          <p className="text-gray-600 mb-8">
            Leo morbi faucibus mattis pharetra tellus velit ultricies duis
            rhoncus. Porttitor fermentum eu urna eget
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div
            className="w-[20rem] text-white p-8 rounded-xl h-[20rem] shadow-lg flex flex-col items-center"
            style={{
              background: "#f6f9fc",
              color: "#000000",
            }}
          >
            <h4
              className="text-lg font-extrabold "
              style={{
                color: "#43a55d",
              }}
            >
              Déclarer Un Terrain
            </h4>
            <p className=" text-center mb-6">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus. Porttitor fermentum eu
            </p>
            <button
              className=" hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow transition "
              style={{
                border: "1px solid #000000ff",
                color: "#000000",
              }}
            >
              Déclarer
            </button>
          </div>
          <div
            className="bg-blue-900 text-white p-8 rounded-xl shadow-lg flex flex-col items-center"
            style={{
              background: "#43a55d",
              color: "#ffffff",
            }}
          >
            <h4
              className="text-lg font-bold mb-4"
              style={{
                color: "#ffffffff",
              }}
            >
              Acheter Un Terrain
            </h4>
            <p className="text-blue-100 text-center mb-6">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus. Porttitor fermentum eu
            </p>
            <button className="bg-yellow-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow transition">
              Trouver une propriété
            </button>
          </div>
          <div
            className=" text-white p-8 rounded-xl shadow-lg flex flex-col items-center"
            style={{
              background: "#f6f9fc",
              color: "#000000",
            }}
          >
            <h4
              className="text-lg font-bold mb-4"
              style={{
                color: "#43a55d",
              }}
            >
              Vendre Un Terrain
            </h4>
            <p className=" text-center mb-6">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus. Porttitor fermentum eu
            </p>
            <button
              className="hover:bg-green-600 text-white px-6 py-2 rounded-xl shadow transition"
              style={{
                border: "1px solid #000000ff",
                color: "#000000",
              }}
            >
              Plus
            </button>
          </div>
        </div>
      </section>

      {/* Section propriété premium */}
      <section className="rounded-2xl  overflow-hidden mb-12">
        <div className="relative w-full h-72 md:h-96">
          <img
            src={heroImage}
            alt="Terrain à vendre"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-700/40 to-blue-400/20 flex flex-col justify-center px-8"
            style={{
              background: "#0000007e",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow">
              Découvrez votre propriété
            </h2>
            <p className="text-white max-w-lg drop-shadow">
              Leo morbi faucibus mattis pharetra tellus velit ultricies duis
              rhoncus
            </p>
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
}

export default Apropos;
