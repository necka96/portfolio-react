import React from "react";

const NavigationDats = ({ active }) => {
  return (
    <div className='app__navigation'>
      {["home", "about", "work", "skills", "contact"].map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          className='app__navigation-dot'
          style={
            active === item ? { backgroundColor: "var(--secondary-color)" } : {}
          }
        />
      ))}
    </div>
  );
};

export default NavigationDats;
