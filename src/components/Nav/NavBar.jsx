import { motion } from "framer-motion";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import "./NavBar.scss";
const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <h2>
          <a href='#home' style={{ color: "var(--white-color)" }}>
            Nemanja <span>Đorđević</span>
          </a>
        </h2>
      </div>
      <ul className='app__navbar-links'>
        {["home", "about", "work", "skills", "contact"].map((item, index) => (
          <li key={index} className='app__flex p-text'>
            <div />
            <a href={`#${item}`} style={{ color: "var(--white-color)" }}>
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div className='app__navbar-menu'>
        <BiMenu onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <IoMdClose onClick={() => setToggle(false)} />
            <ul>
              {["home", "about", "work", "skills", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    onClick={() => setToggle(false)}
                    style={{ color: "var(--white-color)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
