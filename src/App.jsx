import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './Components/Home'
import Sheet from './Components/Sheet'
import Calender from './Components/Calender'
import MobileHome from './Components/MobileHome';

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Add a resize event listener to update the window width when the screen is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderHomeComponent = () => {
    if (windowWidth < 700) {
      return <MobileHome />;
    } else {
      return <Home />;
    }
  };


  return (
    <Router>
      <Routes>
        <Route path="/" element={renderHomeComponent()} />
        <Route path="/sheet" element={<Sheet />} />
        <Route path="/cal" element={<Calender />} />
      </Routes>
    </Router>
  )
}

export default App