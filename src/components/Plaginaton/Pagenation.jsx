import React from "react";
import "./Pagenation.scss";
const Pagenation = ({ totalPost, postPerPage, post, currentPage }) => {
  let page = [];
  for (let i = 1; i < Math.ceil(totalPost / postPerPage); i++) {
    page.push(i);
  }
  return (
    <div className='app__pagenation app__flex'>
      {page.map((item) => (
        <div
          className={`app__pagenation-btn app__flex ${
            currentPage === item ? "active" : ""
          }`}
          key={Math.random()}
          onClick={() => post(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Pagenation;
