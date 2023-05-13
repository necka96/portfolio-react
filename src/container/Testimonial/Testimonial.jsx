import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { client, urlFor } from "../../client";
import { AppWrap } from "../../wrapper";
import "./Testimonial.scss";

const Testimonial = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  // console.log(brands);
  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  return (
    <>
      {/**   {testimonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img
              src={urlFor(testimonials[currentIndex].imgurl)}
              alt={testimonials[currentIndex].name}
            />
            <div className='app__testimonial-content'>
              <p className='p-text'>{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className='bold-text'>{testimonials[currentIndex].name}</h4>
                <h5 className='p-text'>{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>

          <div className='app__testimonial-btns app__flex'>
            <div
              className='app__flex'
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className='app__flex'
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>
        </>
      )} */}

      <motion.h2
        className='head-text'
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        Wath others <span>say</span>
      </motion.h2>
      <motion.div className='app__testimonilas-conatiner'>
        {testimonials.map((item) => (
          <motion.div
            whileInView={{ opacity: [0, 1], x: [100, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
            key={Math.random()}
            className='app__testimonial'
          >
            <div className='app__icon'>"</div>
            <p className='p-text' style={{ color: "white" }}>
              {item.feedback}
            </p>
            <div className='app__customer app__flex'>
              <div className='text app__flex'>
                <h4 className='p-text' style={{ color: "white" }}>
                  <span>@</span>
                  {item.name}
                </h4>
                <h5 className='p-text'>{item.company}</h5>
              </div>
              <img src={urlFor(item.imageurl)} alt='customer' />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className='  slider'>
        <motion.div
          className='slider-track app__flex'
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          {brands.map((brand) => (
            <div key={brand._id} className='slide app__flex '>
              <img src={urlFor(brand.imgURL)} alt={brand.name} />
            </div>
          ))}
        </motion.div>
        <motion.div
          className='slider-track animate-2 app__flex'
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
        >
          {brands.map((brand) => (
            <div key={brand._id} className='slide app__flex '>
              <img src={urlFor(brand.imgURL)} alt={brand.name} />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(Testimonial, "testimonial", "app__testimonial");
