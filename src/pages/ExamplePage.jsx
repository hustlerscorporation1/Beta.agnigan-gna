import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { UserContext } from "./UserContext";
import Accueil from "./pages/Accueil";
import Propriete from "./pages/Propriete";
import Contact from "./pages/Contact";
import Apropos from "./pages/Apropos";
import Declarer from "./pages/Declarer";
import Connexion from "./pages/Connexion";
import Dectailletairrain from "./pages/DetailleTairrain";
import MieuxComprendre from "./pages/MieuxComprendre";
import ProcederUnVente from "./pages/ProcederUneVente";
import MotPasseOublier from "./pages/MotePasseOublier";
import CreeUnCompte from "./pages/CreeUnCompte";
import Profil from "./pages/Profil";
import ChatBot from "./components/ChatBot";

function App() {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
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
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// Ensure there is no <Router> in this file. Page components should only render their content without wrapping it in a <Router>.
