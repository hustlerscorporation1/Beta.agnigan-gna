import React from "react";
import Navbar from "../Navbar";
import "../Styles/Declarer.css";
import AnimationImage from "../components/AnimationImage.jsx";

function Declarer() {
  return (
    <div className="body-declarer">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          Bienvenue sur la page Faire une déclaration
        </h1>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <AnimationImage />
        </div>
      </div>
    </div>
  );
}

export default Declarer;
