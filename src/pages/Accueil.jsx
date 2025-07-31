// src/pages/Accueil.jsx
import React from "react";
import Navbar from "../Navbar";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import '../Styles/Accueil.css';
import '../Styles/Footer.css';
import logopartenaire from '../images/Logo_Hustler_AN-removebg-preview.png'


function Accueil() {
    return (
      <div className="body-accuiel">

          <section className="containt-element">
          {/* Hero section */}
              <section className="relative h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-center text-white" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Trouvez un terrain adapté à votre style de vie</h1>
                <div className="bg-white p-4 rounded shadow w-full max-w-2xl flex items-center gap-2">
                  <input type="text" placeholder="Rechercher une ville..." className="flex-1 p-2 border rounded" />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
                    <FaSearch />
                    Rechercher
                  </button>
                </div>
              </section>

            {/* Propriété vedette */}
              <section className="py-16 px-10 bg-gray-100">
                <h2 className="text-2xl font-bold mb-6">Découvrez votre propriété vedette</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((id) => (
                    <div key={id} className="bg-white rounded shadow overflow-hidden">
                      <img src={`/images/property${id}.jpg`} alt="Propriété" className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">Disponible</span>
                        <h3 className="font-semibold mt-2">Terrain à Lomé</h3>
                        <p className="text-sm text-gray-600">1000m² - Bord de route</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            {/* Section satisfaction */}
            <section className="bg-blue-900 text-white py-16 px-10 text-center">
              <h2 className="text-2xl font-bold mb-4">Mettre en œuvre un plan pour assurer votre satisfaction!</h2>
              <button className="mt-4 px-6 py-2 bg-white text-blue-900 font-semibold rounded">En savoir plus</button>
            </section>

            {/* Témoignage client */}
            <section className="py-16 px-10 text-center">
              <h3 className="text-xl mb-4 font-semibold">Ce que nos clients disent de nous</h3>
              <img src="/images/client.jpg" alt="Client" className="mx-auto w-32 h-32 rounded-full object-cover mb-4" />
              <p className="max-w-xl mx-auto text-gray-600">J'ai trouvé exactement ce que je cherchais grâce à cette plateforme. Service rapide et fiable.</p>
            </section>

            {/* Propriété commerciale */}
            <section className="py-16 px-10 bg-gray-100">
              <h2 className="text-2xl font-bold mb-6">Propriété commerciale</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[4, 5, 6].map((id) => (
                  <div key={id} className="bg-white rounded shadow overflow-hidden">
                    <img src={`/images/property${id}.jpg`} alt="Propriété" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <span className="bg-green-500 text-white px-2 py-1 text-xs rounded">Disponible</span>
                      <h3 className="font-semibold mt-2">Terrain Commercial à Lomé</h3>
                      <p className="text-sm text-gray-600">Grand espace, bien placé</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Formulaire de contact */}
            <section className="py-16 px-10 bg-blue-900 text-white grid md:grid-cols-2 gap-10 items-center">
              <form className="bg-white text-black p-6 rounded shadow">
                <h4 className="text-xl font-bold mb-4">Entrer en contact</h4>
                <input type="text" placeholder="Nom" className="w-full mb-4 p-2 border rounded" />
                <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" />
                <textarea placeholder="Message" className="w-full mb-4 p-2 border rounded"></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Envoyer</button>
              </form>

              <div>
                <h4 className="text-xl font-bold mb-4">Mettons en œuvre un plan pour assurer votre satisfaction!</h4>
              </div>
            </section>

            {/* Villes */}
            <section className="py-16 px-10">
              <h2 className="text-2xl font-bold mb-6">Dans quelle ville vivras-tu pour réaliser ton rêve ?</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((id) => (
                  <img key={id} src={`/images/city${id}.jpg`} alt={`Ville ${id}`} className="w-full h-48 object-cover rounded" />
                ))}
              </div>
            </section>



          </section>
            {/* Footer */}
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
                        <p>Julien@hustler.tg</p>
                      </div>
            
                      <div>
                        <h4 className="font-semibold mb-2">Property</h4>
                        <p>Terrain Lot 1</p>
                        <p>Terrain Lot 2</p>
                        <p>Terrain Lot 3</p>
                        <p>Terrain Lot 4</p>
                      </div>
            
                      <div>
                        <h4 className="font-semibold mb-2">Liens</h4>
                        <p><a href="">Accueil</a></p>
                        <p><a href="">Propriétés</a></p>
                        <p><a href="">À propos</a></p>
                        <p><a href="">Contact</a></p>
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
                            <button className="sabonne bg-blue-600 px-3 py-1 rounded text-white">S'abonner</button>
                        </div>
                      </div>
                    </div>
            
                    <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                        <div className="logopartenaire">
                            <img src={logopartenaire} alt="logopartenaire" />
                        </div>
                      <p>© Copyright Hustler 2025. Conception par hustler cooperation</p>
                    <div className="footer-reseau-sociaux">
                        <div><a href=""><FaFacebook /></a></div>
                        <div><a href=""><FaTwitter /></a></div>
                        <div><a href=""><FaInstagram /></a></div>
                        <div><a href=""><SiTiktok /></a></div>
                    </div>
                    </div>
            
            
            </footer>
        
      </div>
    );
}

export default Accueil;
