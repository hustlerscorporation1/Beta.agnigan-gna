import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/constants';

// New Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact/index';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Profile from './pages/Auth/Profile';

// Properties page with map
import PropertiesWithMap from './pages/Properties/PropertiesWithMap';

// Property Detail (new)
import PropertyDetail from './pages/PropertyDetail';

// Process pages
import Declarer from './pages/Declarer';
import ProcederUnVente from './pages/ProcederUneVente';
import ProcederAchat from './pages/ProcedeAchat';
import AuthCallback from './pages/AuthCallback';

// Blog pages
import Blog from './pages/Blog';
import BlogDetail from './pages/Blog/BlogDetail';

// Components
import ChatBot from './components/ChatBot';

// Admin
import AdminApp from './admin/AdminApp';

function App() {
  return (
    <div className="app">
      <ChatBot />
      
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* New Routes with modern design */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PROPERTIES} element={<PropertiesWithMap />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        
        {/* Property Detail */}
        <Route path={`${ROUTES.PROPERTY_DETAIL}/:id`} element={<PropertyDetail />} />
        
        {/* Blog */}
        <Route path={ROUTES.BLOG} element={<Blog />} />
        <Route path={`${ROUTES.BLOG_DETAIL}/:slug`} element={<BlogDetail />} />
        
        {/* Buy and Sell Process Pages */}
        <Route path={ROUTES.BUY_PROCESS} element={<ProcederAchat />} />
        <Route path={ROUTES.SELL_PROCESS} element={<ProcederUnVente />} />
        <Route path={ROUTES.DECLARE_PROPERTY} element={<Declarer />} />
        
        {/* Auth Callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </div>
  );
}

export default App;
