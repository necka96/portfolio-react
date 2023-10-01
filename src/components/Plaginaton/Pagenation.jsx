import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import "./Pagenation.scss";
const Pagenation = ({
  totalPost,
  postPerPage,
  post,
  currentPage,
  selectedId,
}) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    page.push(i);
  }
  useEffect(() => {
    if (currentPage > page.length) {
      post(1);
    }
  }, [currentPage, page.length, post]);
  let mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className='app__pagenation app__flex'
    >
      {page.map((item, i) => (
        <AppIcon
          currentPage={currentPage}
          item={item}
          post={post}
          key={i}
          mouseX={mouseX}
          setSelectedId={selectedId}
        />
      ))}
    </div>
  );
};

export default Pagenation;

function AppIcon({ item, currentPage, post, mouseX, setSelectedId }) {
  let ref = useRef(null);
  let distance = useTransform(mouseX, (val) => {
    let bounce = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounce.x - bounce.width / 2;
  });
  let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const handleClick = (item) => {
    setSelectedId();
    post(item);
  };
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={`app__pagenation-btn app__flex ${
        currentPage === item ? "active" : ""
      }`}
      onClick={() => handleClick(item)}
    >
      {item}
    </motion.div>
  );
}
