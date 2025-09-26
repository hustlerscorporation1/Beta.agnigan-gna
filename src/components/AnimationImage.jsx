import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/Accueil.css";

// Importe tes images ici
import image1 from "../images/Hero-agnigban_gna.jpg";
import image2 from "../images/Terrain-dans-n'importe-quelle-localité(4).jpg";
import image3 from "../images/Terrains-Agricols-(2).jpg";
import image4 from "../images/Terrains-avec-maison-(3).jpg";

const images = [image1, image2, image3, image4];
const texts = [
  "Obtenir des informations fiables sur les titres fonciers des terrains au Togo et choisir celle qui s'adapte à votre style de vie.",
  "De Lomé à Cinkassé, trouvez votre terrain idéal partout au Togo. Notre solution vous offre une visibilité nationale, facilitant vos recherches où que vous soyez.",
  "Notre plateforme met directement en relation acheteurs et vendeurs de terres agricoles. Vous trouvez toutes les informations essentielles pour concrétiser vos projets de manière simple et sérieuse.",
  "Maison bâtie ou terrain avec construction, trouvez facilement des opportunités fiables et validées. Notre plateforme vous garantit des acheteurs adaptées à vos besoins.",
];

// Animation combinée : slide + scale + opacity
const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1, // Animation fluide pendant 1 seconde
      ease: "easeInOut",
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  }),
};

const AnimationImage = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Change d'image et de texte toutes les 6 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="animation-image-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        width: "100%",
        height: "640px",
        overflow: "hidden",
      }}
    >
      <AnimatePresence custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="rounded-lg shadow-lg"
          style={{
            position: "absolute",
            width: "100%",
            height: "640px",
            objectFit: "cover",
          }}
        />
      </AnimatePresence>

      {/* Animation pour le texte */}
      <AnimatePresence custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "2rem",
            bottom: "20px",

            color: "white",
            fontSize: "20px",
            maxWidth: "60%",
            textAlign: "center",
            zIndex: "10",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimationImage;
