import { useState } from "react";
import "../App";
import "../Styles/Accueil.css";
import heroImage from "../images/hero-image.jpg";
import Logo from "../images/LOGO_AGNIGBAN_GNA Trs Noir.png";

function App() {
  const [activePage, setActivePage] = useState("evenements");
  const [activeTab, setActiveTab] = useState("tous"); // Onglet actif pour "Mes évènements"

  const renderEvenements = () => {
    switch (activeTab) {
      case "tous":
        return (
          <p>
            Voici la liste de <b>tous</b> vos évènements.
          </p>
        );
      case "encours":
        return (
          <p>
            Voici vos évènements <b>en cours</b>.
          </p>
        );
      case "avenir":
        return (
          <p>
            Voici vos évènements <b>à venir</b>.
          </p>
        );
      case "passes":
        return (
          <p>
            Voici vos évènements <b>passés</b>.
          </p>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "evenements":
        return (
          <div>
            {/* Onglets de navigation */}
            <ul className="flex gap-3 border-b mb-4">
              <li>
                <button
                  onClick={() => setActiveTab("tous")}
                  className={`px-3 py-2 ${
                    activeTab === "tous"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Tous
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("encours")}
                  className={`px-3 py-2 ${
                    activeTab === "encours"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  En cours
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("avenir")}
                  className={`px-3 py-2 ${
                    activeTab === "avenir"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  À venir
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("passes")}
                  className={`px-3 py-2 ${
                    activeTab === "passes"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Passés
                </button>
              </li>
            </ul>

            {/* Zone de recherche */}
            <div className="flex gap-2 bg-white p-4 rounded-xl shadow mb-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 border-none outline-none"
              />
              <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
                Rechercher
              </button>
            </div>

            {/* Contenu selon l’onglet */}
            <div className="mt-3">{renderEvenements()}</div>
          </div>
        );
      case "paiements":
        return (
          <div>
            {/* Onglets de navigation */}
            <ul className="flex gap-3 border-b mb-4">
              <li>
                <button
                  onClick={() => setActiveTab("tous")}
                  className={`px-3 py-2 ${
                    activeTab === "tous"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Tous
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("encours")}
                  className={`px-3 py-2 ${
                    activeTab === "encours"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  En cours
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("avenir")}
                  className={`px-3 py-2 ${
                    activeTab === "avenir"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  À venir
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("passes")}
                  className={`px-3 py-2 ${
                    activeTab === "passes"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Passés
                </button>
              </li>
            </ul>

            {/* Zone de recherche */}
            <div className="flex gap-2 bg-white p-4 rounded-xl shadow mb-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 border-none outline-none"
              />
              <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
                Rechercher
              </button>
            </div>

            {/* Contenu selon l’onglet */}
            <div className="mt-3">{renderEvenements()}</div>
          </div>
        );
      case "hotels":
        return (
          <div>
            {/* Onglets de navigation */}
            <ul className="flex gap-3 border-b mb-4">
              <li>
                <button
                  onClick={() => setActiveTab("tous")}
                  className={`px-3 py-2 ${
                    activeTab === "tous"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Tous
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("encours")}
                  className={`px-3 py-2 ${
                    activeTab === "encours"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  En cours
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("avenir")}
                  className={`px-3 py-2 ${
                    activeTab === "avenir"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  À venir
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("passes")}
                  className={`px-3 py-2 ${
                    activeTab === "passes"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Passés
                </button>
              </li>
            </ul>

            {/* Zone de recherche */}
            <div className="flex gap-2 bg-white p-4 rounded-xl shadow mb-4">
              <input
                type="text"
                placeholder="Rechercher..."
                className="flex-1 border-none outline-none"
              />
              <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
                Rechercher
              </button>
            </div>

            {/* Contenu selon l’onglet */}
            <div className="mt-3">{renderEvenements()}</div>
          </div>
        );
      case "parametres":
        return (
          <div>
            <p className="mb-2">Modifiez vos informations :</p>
            <form className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  className="w-full border rounded px-2 py-1"
                  defaultValue="Julien"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-2 py-1"
                  defaultValue="julien@example.com"
                />
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Enregistrer
              </button>
            </form>
          </div>
        );
      case "logout":
        return (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Vous avez été déconnecté avec succès !
          </div>
        );
      default:
        return <p>Sélectionnez une option dans le menu.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main */}
      <div
        className="flex flex-1"
        style={{
          marginTop: "6rem",
          fontSize: "1.2rem",
        }}
      >
        {/* Sidebar */}
        <aside className="w-[350px] bg-white border-r p-4  flex flex-col gap-3">
          <button
            onClick={() => setActivePage("evenements")}
            className={`px-4 py-2 rounded text-left ${
              activePage === "evenements"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            📅 Mes évènements
          </button>
          <button
            onClick={() => setActivePage("paiements")}
            className={`px-4 py-2 rounded text-left ${
              activePage === "paiements"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            💳 Mes paiements d'évènement
          </button>
          <button
            onClick={() => setActivePage("hotels")}
            className={`px-4 py-2 rounded text-left ${
              activePage === "hotels"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            🏨 Mes réservations d'hôtels
          </button>
          <button
            onClick={() => setActivePage("parametres")}
            className={`px-4 py-2 rounded text-left ${
              activePage === "parametres"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            ⚙️ Paramètres
          </button>
          <button
            onClick={() => setActivePage("logout")}
            className="px-4 py-2 rounded text-left text-red-600 border w-[320px] border-red-500 hover:bg-red-50"
          >
            ⏻ Déconnexion
          </button>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <h2 className="font-bold text-xl mb-4">
            {activePage === "evenements"
              ? "Mes évènements"
              : activePage === "paiements"
              ? "Mes paiements d'évènement"
              : activePage === "hotels"
              ? "Mes réservations d'hôtels"
              : activePage === "parametres"
              ? "Paramètres"
              : "Déconnexion"}
          </h2>
          <div>{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
