import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import AppWrap from "../../wrapper/AppWrap";
import { client, urlFor } from "./../../client";
import "./Skills.scss";
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const query = '*[_type == "skills"] ';
    const exquery = '*[_type == "experiences"] ';

    client.fetch(query).then((data) => {
      setSkills(data);
    });
    client.fetch(exquery).then((data) => {
      setExperiences(data);
    });
  }, []);

  return (
    <>
      <motion.h2
        className='head-text'
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 0.5 }}
        style={{ color: "var(--white-color)" }}
      >
        My <span>skills</span> and <span>experience</span>
      </motion.h2>
      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={index}
            >
              <div
                className='app__flex'
                style={{ backgroundColor: skill.bgColor }}
                data-tip
                data-for={skill.description}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
                {skill.description && (
                  <ReactTooltip
                    id={skill.description}
                    effect='solid'
                    arrowColor='#fff'
                    className='skills-tooltip-2'
                  >
                    {skill.description}
                  </ReactTooltip>
                )}
              </div>
              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className='app__skills-exp'>
          {experiences.map((experience, index) => (
            <motion.div className='app__skills-exp-item' key={index}>
              <div className='app__skills-exp-year'>
                <p className='bold-text'>{experience.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience.works.map((work, index) => (
                  <div key={index} className='app__flex app-skill'>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work'
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <p className='p-text'>{work.company}</p>
                    </motion.div>
                    {work.description && (
                      <ReactTooltip
                        id={work.name}
                        effect='solid'
                        arrowColor='#fff'
                        className='skills-tooltip'
                      >
                        {work.description}
                      </ReactTooltip>
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(Skills, "skills");
