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

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/propriete" element={<Propriete />} />
        <Route path="/Apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/declarer" element={<Declarer />} />
        <Route path="/connexion" element={<Connexion />} />
      </Routes>

      <div></div>
    </div>
  );
}

export default App;
