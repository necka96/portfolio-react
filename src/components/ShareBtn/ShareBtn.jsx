import React from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { RiWhatsappLine } from "react-icons/ri";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  ViberShareButton,
  WhatsappShareButton,
} from "react-share";
import "./ShareBtn.scss";
const ShareButtons = ({ text, url }) => {
  return (
    <div className='icon'>
      <FacebookShareButton url={url} quote={text}>
        <div>
          <FiFacebook />
        </div>
      </FacebookShareButton>
      <WhatsappShareButton url={url} quote={text}>
        <div>
          <RiWhatsappLine />
        </div>
      </WhatsappShareButton>
      <ViberShareButton url={url} quote={text}>
        <div>
          <FaViber />
        </div>
      </ViberShareButton>
      <EmailShareButton url={url} quote={text}>
        <div>
          <MdOutlineMarkEmailRead />
        </div>
      </EmailShareButton>
      <LinkedinShareButton url={url} quote={text}>
        <div>
          <AiFillLinkedin />
        </div>
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
