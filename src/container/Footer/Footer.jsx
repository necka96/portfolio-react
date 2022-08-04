import { motion } from "framer-motion";
import React, { useState } from "react";
import images from "../../constants/images";
import { client } from "./../../client";
import AppWrap from "./../../wrapper/AppWrap";
import "./Footer.scss";
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    number: "",
    message: "",
  });
  const [isFormSubmitt, setIsFormSubmitt] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, lastName, email, number, message } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      lastName: lastName,
      email: email,
      number: number,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitt(true);
    });
  };
  return (
    <>
      <motion.h2
        className='head-text'
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 0.5 }}
        style={{ color: "var(--white-color)" }}
      >
        Razgovarajte sa <span>mnom</span>
      </motion.h2>
      <motion.div
        className='app__footer-cards'
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
      >
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:nemanja2014@live.com' className='p-text'>
            nemanja2014@live.com
          </a>
        </div>
        <div className='app__footer-card'>
          <img src={images.tel} alt='email' />
          <a href='tel:+38163219277' className='p-text'>
            +38163219277
          </a>
        </div>
      </motion.div>

      {!isFormSubmitt ? (
        <motion.form
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, delayChildren: 0.5 }}
          onSubmit={handleSubmit}
          className='app__footer-form app__flex '
        >
          <div className='app__flex'>
            <input
              type='text'
              className='p-text'
              placeholder='Your Name'
              value={name}
              onChange={handleChange}
              name='name'
              required
            />
            <input
              type='text'
              className='p-text'
              placeholder='Your Last Name'
              value={lastName}
              onChange={handleChange}
              name='lastName'
              required
            />
          </div>
          <div className='app__flex'>
            <input
              type='email'
              className='p-text'
              placeholder='Your Email'
              value={email}
              onChange={handleChange}
              name='email'
              required
            />
            <input
              type='tel'
              className='p-text'
              placeholder='Your phone number'
              value={number}
              onChange={handleChange}
              name='number'
              pattern='[06789][0-9]{9}'
              title='Please enter valid phone number'
              required
            />
          </div>
          <div>
            <textarea
              className='p-text'
              placeholder='Your message'
              value={message}
              name='message'
              onChange={handleChange}
              required
            />
          </div>
          <button className=' btn'>
            <span> {!loading ? "Send Message" : "Sending..."}</span> <i></i>
          </button>
        </motion.form>
      ) : (
        <div>
          <motion.h3
            className='head-text'
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 0.5 }}
            style={{ color: "var(--white-color)" }}
          >
            Hvala Vam što ste me kontaktirali!
          </motion.h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(Footer, "contact");
