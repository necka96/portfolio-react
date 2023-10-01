import React, { useEffect, useState } from "react";
import NavigationDats from "./../components/NavigationDats";
import SocialMedia from "./../components/SocialMedia";

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    const [date, setDate] = useState(null);
    useEffect(() => {
      setDate(new Date().getFullYear());
    }, []);

    return (
      <div
        id={idName}
        className={`app__container ${classNames ? classNames : ""}`}
      >
        <SocialMedia />
        <div className='app__wrapper app__flex'>
          <Component />
          <div className='copyright'>
            <p className='p-text ' style={{ color: "var(--white-color)" }}>
              @{date} Nemanja
            </p>
            <p className='p-text' style={{ color: "var(--white-color)" }}>
              All rights reserved
            </p>
          </div>
        </div>
        <NavigationDats active={idName} />
      </div>
    );
  };

export default AppWrap;
