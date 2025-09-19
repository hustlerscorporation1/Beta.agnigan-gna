import Navbar from "../Navbar";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import "../Styles/Accueil.css";

import logopartenaire from "../images/Logo_Hustler_AN-removebg-preview.png";

function footer() {
  return (
    <div className=" containt-accuiel">
      {/* Footer */}
      <footer className=" bg-gray-900 justify-between text-gray-300 px-8 py-10 text-sm">
        <div className="  flex justify-between info-footer md:grid-cols-4 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Horaires d'ouverture</h4>
            <p>Lun-Ven: 09:00 - 20:00</p>
            <p>Sam-Dim: 09:00 - 14:00</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Trouvez-nous</h4>
            <p>8011 CDD, quartier Tokoin Wuiti</p>
            <p>MD 20743</p>
            <p>hustlerscorporation1@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Property</h4>
            <p>
              <a href="./propriete">Terrain Lot 1</a>
            </p>
            <p>
              <a href="./propriete">Terrain Lot 2</a>
            </p>
            <p>
              <a href="./propriete">Terrain Lot 3</a>
            </p>
            <p>
              <a href="./propriete">Terrain Lot 4</a>
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Liens</h4>
            <p>
              <a href="/">Accueil</a>
            </p>
            <p>
              <a href="/Propriete">Vérifier</a>
            </p>
            <p>
              <a href="/declarer">Acheter</a>
            </p>
            <p>
              <a href="/Apropos">À propos</a>
            </p>
            <p>
              <a href="/Contact">Contact</a>
            </p>
          </div>

          <div className="newsletter gap-2">
            <h4>Newsletter</h4>
            <p>Abonnez-vous à notre newsletter</p>
            <div className="footer-input">
              <div>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-3 py-1 rounded text-black"
                />
              </div>
              <div>
                <button className="sabonne bg-blue-600 px-3 py-1 rounded text-white">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-container border-t border-gray-700 pt-4 flex justify-between items-center">
          <div className="logopartenaire">
            <img src={logopartenaire} alt="logopartenaire" />
          </div>
          <p> © Copyright Hustlers 2025. Conception de hustlers corporation</p>
          <div className="footer-reseau-sociaux">
            <div>
              <a href="">
                <FaFacebook />
              </a>
            </div>
            <div>
              <a href="">
                <FaLinkedin size={20} />
              </a>
            </div>
            <div>
              <a href="">
                <FaInstagram />
              </a>
            </div>
            <div>
              <a href="">
                <SiTiktok />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default footer;
