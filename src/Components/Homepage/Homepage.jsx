import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [gifPlayed, setGifPlayed] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGifPlayed(true);
    }, 3200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getAllCat = async () => {
      try {
        const data = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );

        setAllCategories(data.data);
      } catch (error) {}
    };

    getAllCat();
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

        <div className="my-homepage-caterories">
          <Row>
            {allCategories.map((e, i) => (
              <Col key={i} xs={6} s={6} md={6} lg={6}>
                <NavLink
                  to={`/cat/${e}`}
                  className="my-homepage-cat"
                  href={/cat/i}>
                  <img src="/image/cat-image.webp" alt="" />
                  <div>{e}</div>
                </NavLink>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
