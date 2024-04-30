import React, { useState, useEffect } from "react";
import "./Homepage.css";
// import Navbar from "../Navbar/Navbar";
// import SearchBar from "../SearchBar/SearchBar";
import { Container } from "react-bootstrap";

const Homepage = () => {
  const [gifPlayed, setGifPlayed] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGifPlayed(true);
    }, 3000); // Swap image after 3000ms
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="my-homepage">
      <Container>
        <div className="home-logo">
          {gifPlayed ? (
            <img src="/image/logo2.png" alt="" />
          ) : (
            <img src="/image/logo2.gif" alt="GIF" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
