import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AppWrap } from "../../wrapper";
import { client } from "./../../client";
import "./About.scss";
const About = () => {
  const [abouts, setAbouts] = useState([]);
  useEffect(() => {
    const query = '*[_type == "about"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <div>
      <motion.h2
        className='head-text'
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        About <span>me</span>
      </motion.h2>
      {abouts.map((about, index) => (
        <div className='app__about-holder' key={index}>
          <div />
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <p className='p-text' style={{ color: "var(--white-color)" }}>
              {about.info}
            </p>
            <a
              href={about.link}
              target='_blank'
              rel='noreferrer'
              className='btn '
            >
              <span>View cv</span>
              <i></i>
            </a>
          </motion.div>

          <div />
        </div>
      ))}
    </div>
  );
};

export default AppWrap(About, "about");
