import { useState } from "react";
import "../App";
import "../Styles/Accueil.css";
import "../Styles/ProcederUneVente.css";
import { useNavigate } from "react-router-dom";

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import FooterContaint from "../components/footerContaint";

import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";

const ProcederVente = () => {
  const navigate = useNavigate();
  const steps = [
    {
      title: "1. Recherche du terrain",
      description:
        "Trouvez le terrain qui correspond à vos besoins et à votre style de vie au Togo.",
    },
    {
      title: "2. Vérification du titre foncier",
      description:
        "Assurez-vous que le titre foncier est authentique et conforme aux réglementations.",
    },
    {
      title: "3. Négociation et accord",
      description:
        "Discutez le prix avec le vendeur et signez un accord de vente clair.",
    },
    {
      title: "4. Finalisation et paiement",
      description:
        "Effectuez le paiement et finalisez la transaction légalement.",
    },
    {
      title: "5. Transfert officiel",
      description:
        "Enregistrez le terrain à votre nom auprès des autorités foncières.",
    },
  ];

  const Contactpage = () => {
    navigate("/contact");
  };

  return (
    <div className=" w-full ">
      <div className="f">
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-green-600 text-white py-12 text-center">
            <h1 className="text-4xl mt-[6rem] font-bold mb-2">
              Procédure d'achat d'un terrain au Togo
            </h1>
            <p className="text-lg">
              Suivez ces étapes pour acheter un terrain en toute sécurité
            </p>
            <button className="bg-white text-green-600 mt-4 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition">
              Procéder maintenant
            </button>
          </header>

          {/* Steps Section */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-green-700 mb-4">
                    {step.title}
                  </h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex justify-center align-items-center mb-10">
            <button className="bg-green-600 text-white mt-4 font-bold px-6 py-3 rounded-full hover:bg-gray-100 hover:text-green-600 transition">
              Procéder maintenant
            </button>
          </div>

          {/* CTA Section */}
          <section className="bg-green-600 text-white py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Prêt à acheter votre terrain ?
            </h2>
            <p className="mb-6">
              Contactez-nous pour obtenir toutes les informations fiables sur
              les titres fonciers.
            </p>
            <button
              className="bg-white text-green-600 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition"
              onClick={Contactpage}
            >
              Contactez-nous
            </button>
          </section>
        </div>
      </div>
      {/* Footer */}
      <FooterContaint />
    </div>
  );
};

export default ProcederVente;
