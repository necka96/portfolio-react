import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import Pagenation from "../../components/Plaginaton/Pagenation";
import { client, urlFor } from "./../../client";
import AppWrap from "./../../wrapper/AppWrap";
import "./Works.scss";
const Works = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(3);
  useEffect(() => {
    const query = '*[_type == "works"] ';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWorks(data);
    });
  }, []);

  function post(item) {
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      setCurrentPage(item);
    }, 500);
  }
  const latsPostIndex = currentPage * postPerPage;
  const firstPostIndex = latsPostIndex - postPerPage;

  const currentPost = filterWorks.slice(firstPostIndex, latsPostIndex);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === "All") {
        setFilterWorks(works);
      } else {
        setFilterWorks(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };
  return (
    <>
      <motion.h2
        className='head-text'
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 0.5 }}
        style={{ color: "var(--white-color)" }}
      >
        My <span>portfolio</span>
      </motion.h2>
      <div className='app__work-filter'>
        {[
          "All",
          "Vanilla JS",
          "React Js",
          "Jquery",
          "Bootstrap",
          "Tailwind css",
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? "item-active" : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'
      >
        {currentPost.map((work, index) => (
          <div className='app__work-item app__flex' key={index}>
            <div
              className='app__work-img app__flex'
              style={{
                backgroundImage: `url(${urlFor(work.imageUrl)})`,
              }}
            >
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className='app__work-hover app__flex'
              >
                <a href={work.projectLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target='_blank' rel='noreferrer'>
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>
            <div className='app__work-content app__flex'>
              <h4 className='bold-text'>{work.title}</h4>
              <p
                className='p-text'
                style={{ marginTop: 10, textAlign: "center" }}
              >
                {work.description}
              </p>
              <div className='app__work-tag app__flex'>
                <p className='p-text'>{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
      <Pagenation
        totalPost={filterWorks.length}
        postPerPage={postPerPage}
        post={post}
        currentPage={currentPage}
      />
    </>
  );
};

export default AppWrap(Works, "work");
