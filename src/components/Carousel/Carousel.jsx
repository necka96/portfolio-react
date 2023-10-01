import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { urlFor } from "../../client";
import "./Carousel.scss";

const Carousel = ({ carousel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carousel.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, carousel.length]);

  return (
    <div className='app__carousel'>
      <div className='app__carousel-item'>
        <motion.img
          src={urlFor(carousel[currentIndex].asset._ref)}
          key={currentIndex}
          alt={`Slide ${currentIndex + 1}`}
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div className='app__carousel-dots'>
        {carousel.map((slide, index) => (
          <div
            key={index}
            className={`app__carousel-dot ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
