import React from "react";
import Navbar from "./Navbar";
import { UserIcon } from "@heroicons/react/24/outline";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Propriete from "./pages/Propriete";
import Contact from "./pages/Contact";
import Apropos from "./pages/Apropos";
import Declarer from "./pages/Declarer";
import Connexion from "./pages/Connexion";
import Dectailletairrain from "./pages/DetailleTairrain";
import MieuxComprendre from "./pages/MieuxComprendre";
import ProcederUnVente from "./pages/ProcederUneVente";
import ProcederAchat from "./pages/ProcedeAchat";

import MotPasseOublier from "./pages/MotePasseOublier";
import CreeUnCompte from "./pages/CreeUnCompte";
import Profil from "./pages/Profil";
import ChatBot from "./components/ChatBot";

import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <div>
      <Navbar />
      <ChatBot />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/propriete" element={<Propriete />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/declarer" element={<Declarer />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/Dectailletairrain" element={<Dectailletairrain />} />
        <Route path="/MieuxComprendre" element={<MieuxComprendre />} />
        <Route path="/ProcederUnVente" element={<ProcederUnVente />} />
        <Route path="/MotPasseOublier" element={<MotPasseOublier />} />
        <Route path="/CreeUnCompte" element={<CreeUnCompte />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/ProcederAchat" element={<ProcederAchat />} />
      </Routes>

      <div></div>
    </div>
  );
}

export default App;
