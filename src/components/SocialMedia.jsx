import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";
const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div>
        <a
          href='https://www.instagram.com/Necka96/'
          target='_blank'
          rel='noreferrer'
        >
          {" "}
          <FiInstagram />
        </a>
      </div>
      <div>
        <a
          href='https://www.facebook.com/GreenArrowSpectre'
          target='_blank'
          rel='noreferrer'
        >
          {" "}
          <FiFacebook />
        </a>
      </div>
      {/** 
        <div>
          <a href='#' target='_blank' rel='noreferrer'>
            <AiFillLinkedin />
          </a>
        </div>
      */}
    </div>
  );
};

export default SocialMedia;
