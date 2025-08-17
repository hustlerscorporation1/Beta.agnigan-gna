import { useState } from "react";
import "../App";
import "../Styles/Accueil.css";
import heroImage from "../images/hero-image.jpg";

function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Partie gauche */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 md:px-16 py-10">
        <div className="mb-10">
          <span className="text-white bg-red-600 px-4 py-1 text-sm font-bold rounded">
            LOGO
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mot de passe oublié ?</h1>
          <p className="text-sm text-gray-500">
            Retourner à la page de{" "}
            <a
              href="/connexion"
              className="text-blue-600 font-medium underline"
            >
              connexion
            </a>
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Entrez votre adresse mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-xs text-gray-500 mb-4">
          Entrez votre adresse mail, un lien de réinitialisation vous sera
          envoyé afin de créer un nouveau mot de passe.
        </p>

        <button className="bg-blue-600 text-white font-semibold py-2 rounded-md w-full hover:bg-blue-700 transition duration-300">
          Envoyer
        </button>
      </div>

      {/* Partie droite */}
      <div
        className="w-full md:w-1/2 relative bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay foncé */}
        <div
          className="absolute top-90 inset-0 bg-black/50"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Contenu */}

          <div
            className="relative z-10 p-8 text-white max-w-lg"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              marginTop: "10rem",
              background: "#F7FAFC",
              borderRadius: "1rem",
              color: "#000",
            }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Découvrez nos meilleures offres
            </h2>
            <p className="text-sm md:text-base text-black-200 mb-6">
              Trouvez le terrain idéal, adapté à votre style de vie. En ville ou
              en périphérie, nous vous aidons à choisir le bon investissement.
            </p>
            <button
              className=" py-2 bg-green-500 text-white font-medium rounded shadow hover:bg-yellow-500 transition"
              style={{
                color: "#ffffffff",
              }}
            >
              En savoir plus
            </button>
          </div>
          <div
            className="carre-price-standard absolute"
            style={{
              backgroundColor: "#FFF",
              borderRadius: "0.5rem",
              zIndex: "1000",
              marginTop: "24.5rem",
              marginLeft: "21.2rem",
              padding: "0.5rem",
            }}
          >
            <div className="mt-4 flex justify-between gap-2 items-center text-sm text-gray-600">
              <div>
                <span>📊 </span>
              </div>

              <div className="price-lot flex flex-col gap-1">
                <div>
                  <span>Prix standard de 1 lot</span>
                </div>

                <div>
                  <span className="font-bold text-black">1 000 000 Fcfa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            marginTop: "31rem",
            width: "70%",
            color: "#ffffffff",
            zIndex: "1000",
          }}
        >
          <h2
            className=""
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "",
              marginBottom: "1rem",
            }}
          >
            Sur Anyigbã nya
          </h2>
          <p
            style={{
              color: "#ffffffff",
              textAlign: "left",
            }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis odit
            illo doloremque voluptates commodi, animi atque. Veritatis, beatae
            fugiat illum obcaecati nihil nemo optio a dignissimos eos et non
            doloremque.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
