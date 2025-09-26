import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Styles/Accueil.css";

// Importe tes images ici
import image1 from "../images/Hero-agnigban_gna.jpg";
import image2 from "../images/Terrain-dans-n'importe-quelle-localité(4).jpg";
import image3 from "../images/Terrains-Agricols-(2).jpg";
import image4 from "../images/Terrains-avec-maison-(3).jpg";

const images = [image1, image2, image3, image4];

// Animation combinée : slide + scale + opacity
const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  animate: {
    x: 0,
    opacity: 10,
    scale: 1,
    transition: {
      duration: 1, // Zoom progressif sur 5 secondes
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
    }, 6000); // Change d'image toutes les 6 secondes (légèrement + que l'animation)

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="animation-image-container"
      style={{
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
    </div>
  );
};

export default AnimationImage;
