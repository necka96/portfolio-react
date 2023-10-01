import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import Carousel from "../../components/Carousel/Carousel";
import Pagenation from "../../components/Plaginaton/Pagenation";
import ShareButtons from "../../components/ShareBtn/ShareBtn";
import { client, urlFor } from "./../../client";
import AppWrap from "./../../wrapper/AppWrap";
import "./Works.scss";
const Works = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWorks, setFilterWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);
  const [selectedId, setSelectedId] = useState(null);
  console.log(selectedId);
  useEffect(() => {
    const query = '*[_type == "works"] ';
    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWorks(data);
    });
  }, []);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 568px)");

  //   function handleChangePostPerPage(e) {
  //     if (e.matches) {
  //       setPostPerPage(6);
  //     } else {
  //       setPostPerPage(4);
  //     }
  //   }

  //   mediaQuery.addListener(handleChangePostPerPage);
  //   handleChangePostPerPage(mediaQuery); // Proverava veličinu ekrana pri prvom renderiranju

  //   return () => {
  //     mediaQuery.removeListener(handleChangePostPerPage);
  //   };
  // }, []);
  function changeState() {
    setSelectedId(null);
  }
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
    setCurrentPage(1);
    setSelectedId(null);
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
          "JQUERY",
          "React.js",
          "Node.js",
          "WordPress",
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
        transition={{
          duration: 0.5,
          delayChildren: 0.5,
          ease: "easeInOut",
          type: "tween",
        }}
        className='app__work-portfolio'
      >
        {/**   {currentPost.map((work, index) => (
          <div className='app__work-item app__flex' key={index}>
            <div className='app__work-img app__flex'>
              <img
                src={urlFor(work.imageUrl)}
                alt={work.title}
                loading='lazy'
              />
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
        ))} */}
        {currentPost.map((work) => (
          <motion.div
            layoutId={work._id}
            key={work._id}
            onClick={() => setSelectedId(work._id)}
            className='app__work-image'
          >
            <img src={urlFor(work.imageUrl)} alt={work.title} loading='lazy' />
          </motion.div>
        ))}

        <AnimatePresence>
          {selectedId &&
            currentPost
              .filter((item) => item._id === selectedId)
              .map((item) => (
                <motion.div
                  key={item._id}
                  layoutId={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='popup'
                >
                  <div className='close' onClick={() => setSelectedId(null)}>
                    <IoCloseSharp />
                  </div>
                  <h3 className='bold-text'>{item.title}</h3>
                  <div className='holder'>
                    <div className='app__carousel'>
                      <Carousel carousel={item.imageArr} />
                    </div>
                    <motion.div
                      className='about'
                      whileInView={{ opacity: [0, 1], x: [100, 0] }}
                      transition={{
                        duration: 0.6,
                        staggerChildren: 0.4,
                        delay: 0.6,
                      }}
                    >
                      <div className='desc'>
                        <h4 className='bold-text'>Project Info:</h4>
                        <p className='p-text'>{item.description}</p>
                      </div>
                      <h4 className='bold-text'>Project Details:</h4>
                      <div className='details'>
                        {item.client && (
                          <div className='app__flex'>
                            <h5>Client:</h5>
                            <p className='p-text'>{item.client}</p>
                          </div>
                        )}
                        {item.technologies && (
                          <div className='app__flex'>
                            <h5>Technologies:</h5>
                            <p>{item.technologies}</p>
                          </div>
                        )}
                        {item.date && (
                          <div className='app__flex'>
                            <h5>Date:</h5>
                            <p>{item.date}</p>
                          </div>
                        )}
                        <div className='app__flex'>
                          <h5>Links:</h5>
                          <div className='flex'>
                            {item.codeLink && (
                              <a
                                href={item.codeLink}
                                target='_blank'
                                rel='noreferrer'
                              >
                                <motion.div>
                                  <AiFillGithub />
                                </motion.div>
                              </a>
                            )}
                            {item.projectLink && (
                              <a
                                href={item.projectLink}
                                target='_blank'
                                rel='noreferrer'
                              >
                                <motion.div>
                                  <AiFillEye />
                                </motion.div>
                              </a>
                            )}
                          </div>
                        </div>
                        <div className='app__flex'>
                          <h5>Share:</h5>
                          <ShareButtons
                            text={item.quote}
                            url={item.projectLink}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
        </AnimatePresence>
      </motion.div>

      <Pagenation
        totalPost={filterWorks.length}
        postPerPage={postPerPage}
        post={post}
        currentPage={currentPage}
        selectedId={changeState}
      />
    </>
  );
};

export default AppWrap(Works, "work");
