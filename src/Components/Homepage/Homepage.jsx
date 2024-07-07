import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getAllCat = async () => {
      try {
        const data = await axios.get("http://127.0.0.1:8000/categories/");

        let sortedCategories = data.data.filter((c) => c.parent == null);
        setAllCategories(sortedCategories);
      } catch (error) {}
    };

    getAllCat();
  }, []);
  console.log(allCategories);

  return (
    <div className="my-homepage">
      <Container>
        <div className="home-logo">
          <img src="/image/logo.jpg" alt="" />
        </div>

        <div className="my-homepage-caterories">
          <Row>
            {allCategories.map((e, i) => (
              <Col key={i} xs={6} s={6} md={6} lg={6}>
                <NavLink
                  to={`/cat/${e.id}`}
                  className="my-homepage-cat"
                  href={/cat/i}>
                  <img src={e.logo} alt="" />
                  <div>{e.title}</div>
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
