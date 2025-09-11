import React from "react";
import { motion } from "framer-motion";
import heroImage from "../images/Hero-agnigban_gna.jpg";

const AnimationImage = () => {
  return (
    <div>
      <motion.img
        src={heroImage}
        alt="Terrain à vendre"
        initial={{ opacity: 1, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 5 }}
        whileHover={{ scale: 1.1, rotate: 0 }}
        className="rounded-lg shadow-lg"
        style={{
          position: "relative",
          width: "100%",
          height: "640px",
        }}
      />
    </div>
  );
};

export default AnimationImage;
