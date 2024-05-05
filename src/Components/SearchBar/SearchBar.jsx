import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../Store/ProductReducer";
import { updateStatusOfSearch } from "../../Store/StatusOfSearchReducer";
import { Container, Row, Col } from "react-bootstrap";

const SearchBar = () => {
  const products = useSelector((state) => state.products);
  const statusofsearch = useSelector((state) => state.statusofsearch);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const fetchData = async (query) => {
    const options = {
      method: "GET",
      url: "https://fakestoreapi.com/products",
      // params: {
      //   query: query,
      //   page: "1",
      //   category_id: "aps",
      // },
      // headers: {
      //   "X-RapidAPI-Key": "23ea03a25cmshc0500faa19e674fp1140c4jsn9a9763290cfd",
      //   "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      // },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      dispatch(updateProducts({ products: response.data }));
      dispatch(updateStatusOfSearch({ status: response.status }));
    } catch (error) {
      console.error(error);
      const status = error.response ? error.response.status : "error";
      dispatch(updateStatusOfSearch({ status: status }));
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(() => {
        if (value.trim() !== "") {
          fetchData(value);
        }
      }, 1000)
    );
  };

  return (
    <div className="my-searchbar">
      <Container>
        <Navbar />

        <div className="search-div">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="all-products">
          <Row>
            {statusofsearch === 200 && products.length > 0 ? (
              products.map((product, index) => (
                <Col
                  key={index}
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  style={{ marginBottom: "10px" }}>
                  <div className="item-card">
                    <img src={product.image} alt="" />
                    <div>{product.title}</div>
                    <div className="item-card-price">${product.price}</div>
                  </div>
                </Col>
              ))
            ) : (
              <div>No products have found :(</div>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SearchBar;
