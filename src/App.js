import React, { useEffect, useState } from "react";
import "./App.scss";
import { NavBar } from "./components";
import { About, Footer, Header, Skills, Testimonial, Works } from "./container";
import { Preloader } from "./wrapper";
const App = () => {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setPreloader(false);
    }, 2500);

    return () => {
      clearInterval(time);
      setPreloader(false);
    };
  }, []);

  return (
    <Preloader loading={preloader}>
      <div className='app'>
        <NavBar />
        <Header />
        <About />
        <Works />
        <Skills />
        <Testimonial />
        <Footer />
      </div>
    </Preloader>
  );
};

export default App;
