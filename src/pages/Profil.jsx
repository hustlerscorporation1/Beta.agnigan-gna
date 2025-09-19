import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../superbase/superbaseClient";
import "../App";
import "../Styles/Accueil.css";
import { FaCog, FaShoppingCart, FaTags, FaMapMarkedAlt } from "react-icons/fa";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("evenements");
  const [activeTab, setActiveTab] = useState("tousTerrain");

  // Récupérer utilisateur connecté
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/Connexion");
        return;
      }

      console.log("Utilisateur connecté :", user.id);
      // Récupérer les infos depuis la table "profiles"
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setUser({
          id: user.id,
          nom: data.nom || "",
          prenom: data.prenom || "",
          email: data.email || "",
          telephone: data.telephone || "",
          password: "", // ne jamais récupérer le mot de passe réel
        });
      }
    };
    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Gestion changement input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Sauvegarde les modifications
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("State user au moment de la sauvegarde :", user);

    // Vérification mot de passe si besoin
    if (user.password && user.password !== user.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    // if (!user.id) {
    //   alert(
    //     "Impossible de mettre à jour le profil : ID utilisateur manquant !"
    //   );
    //   return;
    // }

    const phoneValue =
      user.telephone && user.telephone.trim() !== ""
        ? parseInt(user.telephone.replace(/\D/g, ""))
        : null;

    const mailValue =
      user.email && user.telephone.trim() !== ""
        ? parseInt(user.email.replace(/\D/g, ""))
        : null;

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: user.nom || null,
        last_name: user.prenom || null,
        phone: phoneValue,
        email: mailValue,
      })

      .eq("id", user.id);

    if (error) alert("Erreur lors de la mise à jour : " + error.message);
    else alert("Profil mis à jour !");
  };

  const renderEvenements = () => {
    switch (activeTab) {
      case "tousTerrain":
        return (
          <p>
            Voici la liste de <b>tous</b> vos terrains.
          </p>
        );
      case "encoursTerrain":
        return <p>Voici la liste de tous vos demandes en cours.</p>;
      case "avenirTerrain":
        return <p>Voici vos prochains terrains.</p>;
      case "passesTerrain":
        return (
          <p>
            Voici la liste de vos demandes <b>passées</b>.
          </p>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "evenements":
      case "paiements":
      case "hotels":
        return (
          <div>
            {/* Onglets */}
            <ul className="flex gap-3 border-b mb-4">
              <li>
                <button
                  onClick={() => setActiveTab("tousTerrain")}
                  className={`px-3 py-2 ${
                    activeTab === "tousTerrain"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Tous
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("encoursTerrain")}
                  className={`px-3 py-2 ${
                    activeTab === "encoursTerrain"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  En cours
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("avenirTerrain")}
                  className={`px-3 py-2 ${
                    activeTab === "avenirTerrain"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  À venir
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("passesTerrain")}
                  className={`px-3 py-2 ${
                    activeTab === "passesTerrain"
                      ? "border-b-2 border-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Passés
                </button>
              </li>
            </ul>

            {/* Recherche */}
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

            {/* Contenu */}
            <div className="mt-3">{renderEvenements()}</div>
          </div>
        );

      case "parametres":
        return (
          <div>
            <p className="mb-2">Modifiez vos informations :</p>
            <form
              className="space-y-3"
              onSubmit={handleSave} // directement handleSave reçoit l'événement
            >
              <div className="flex gap-[5rem]">
                {/* Nom */}
                <div>
                  <label
                    className="block mt-5 mb-2 text-sm font-medium"
                    style={{ color: "#000000" }}
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    className="border rounded px-2 py-1"
                    value={user?.nom || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label
                    className="block mt-5 mb-2 text-sm font-medium"
                    style={{ color: "#000000" }}
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    className="border rounded px-2 py-1"
                    value={user?.prenom || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-[5rem]">
                {/* Email */}
                <div>
                  <label
                    className="block mt-5 mb-2 text-sm font-medium"
                    style={{ color: "#000000ff" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="border rounded px-2 py-1"
                    value={user?.email || ""}
                    onChange={handleChange} // maintenant modifiable
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label
                    className="block mt-5 mb-2 text-sm font-medium"
                    style={{ color: "#000000" }}
                  >
                    Numéro de Téléphone
                  </label>
                  <input
                    type="text"
                    name="telephone"
                    className="border rounded px-2 py-1"
                    value={user?.telephone || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-[5rem]">
                {/* Mot de passe */}
                <div>
                  <label
                    className="block mt-5 mb-2 text-sm font-medium"
                    style={{ color: "#000000ff" }}
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="border rounded px-2 py-1"
                    value={user?.password || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Confirmer mot de passe */}
                <div>
                  <label
                    className="block mt-5 mb-2 text-sm font-medium"
                    style={{ color: "#000000" }}
                  >
                    Confirmer Mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="border rounded px-2 py-1"
                    value={user?.confirmPassword || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-green-600 mt-5 text-white px-4 py-2 rounded"
              >
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
      <div
        className="flex flex-1"
        style={{ marginTop: "6rem", fontSize: "1.2rem" }}
      >
        {/* Sidebar */}
        <aside className="w-[350px] bg-white border-r p-4 flex flex-col gap-3">
          <button
            onClick={() => setActivePage("evenements")}
            className={`flex items-center gap-2 px-4 mt-4 py-2 rounded text-left ${
              activePage === "evenements"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <FaMapMarkedAlt className="h-6 w-6 text-black-500" /> Mes terrains
          </button>
          <button
            onClick={() => setActivePage("paiements")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-left ${
              activePage === "paiements"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <FaShoppingCart className="h-6 w-6 text-black-500" /> Mes achats
          </button>
          <button
            onClick={() => setActivePage("hotels")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-left ${
              activePage === "hotels"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <FaTags className="h-6 w-6 text-black-500" /> Mes ventes
          </button>
          <button
            onClick={() => setActivePage("parametres")}
            className={`flex items-center gap-2 px-4 py-2 rounded text-left ${
              activePage === "parametres"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <FaCog className="h-6 w-6 text-black-500" /> Paramètres
          </button>

          {user && (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded text-left text-red-600 border w-[320px] border-red-500 hover:bg-red-50"
            >
              ⏻ Déconnexion
            </button>
          )}
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          <h2
            className="font-bold text-red-600 text-xl mb-4"
            style={{ fontSize: "23px" }}
          >
            {activePage === "evenements"
              ? "Mes Terrains"
              : activePage === "paiements"
              ? "Mes Achat"
              : activePage === "hotels"
              ? "Mes Ventes"
              : activePage === "parametres"
              ? "Paramètres"
              : "Déconnexion "}
          </h2>
          <div>{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
