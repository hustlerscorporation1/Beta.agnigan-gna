import React from "react";
import "../Styles/Declarer.css";
import AnimationImage from "../components/AnimationImage.jsx";
import heroImage from "../images/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

function Declarer() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Dectailletairrain");
  };

  const MieuxComprendre = () => {
    navigate("/MieuxComprendre");
  };
  const VerifierAchete = () => {
    navigate("/Propriete");
  };

  const ProcederVente = () => {
    navigate("/ProcederVente");
  };

  const ProcederAchat = () => {
    navigate("/ProcederAchat");
  };
  return (
    <Layout>
      <div className="body-declarer">
        {/* les produits */}

        
     
      </div>
    </Layout>
  );
}

export default Declarer;
