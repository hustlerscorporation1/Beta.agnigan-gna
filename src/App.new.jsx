import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';

// Pages
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Profile from './pages/Auth/Profile';

// Old pages (to be migrated)
import Declarer from './pages/Declarer';
import Dectailletairrain from './pages/DetailleTairrain';
import MieuxComprendre from './pages/MieuxComprendre';
import ProcederUnVente from './pages/ProcederUneVente';
import ProcederAchat from './pages/ProcedeAchat';
import AuthCallback from './pages/AuthCallback';

// Components
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="app">
      <ChatBot />
      
      <Routes>
        {/* New Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROPERTIES} element={<Properties />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        
        {/* Old Routes (compatibility) */}
        <Route path="/propriete" element={<Properties />} />
        <Route path="/Apropos" element={<About />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/CreeUnCompte" element={<Register />} />
        <Route path="/MotPasseOublier" element={<ForgotPassword />} />
        <Route path="/Profil" element={<Profile />} />
        <Route path="/declarer" element={<Declarer />} />
        <Route path="/Dectailletairrain" element={<Dectailletairrain />} />
        <Route path="/MieuxComprendre" element={<MieuxComprendre />} />
        <Route path="/ProcederUnVente" element={<ProcederUnVente />} />
        <Route path="/ProcederAchat" element={<ProcederAchat />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;
