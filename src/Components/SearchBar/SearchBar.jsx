import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../Store/ProductReducer";
// import { updateStatusOfSearch } from "../../Store/StatusOfSearchReducer";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import {
  addProduct,
  incrementProduct,
  decrementProduct,
} from "../../Store/SelectedProductsReducer";

const SearchBar = () => {
  const products = useSelector((state) => state.products);
  const statusofsearch = useSelector((state) => state.statusofsearch);
  const selectedProducts = useSelector((state) => state.selectedProducts);

  const dispatch = useDispatch();
  const params = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [allSubCat, setAllSubCat] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState({ id: null, index: 0 });

  /* eslint-disable */
  const getAllSubCategories = async () => {
    try {
      const data = await axios.get("http://127.0.0.1:8000/categories/");
      console.log(data.data);
      console.log(params);
      let sortedSubCat = data.data.filter((c) => c.parent == params.id);
      setAllSubCat(sortedSubCat);
      return sortedSubCat;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async (subcat) => {
    try {
      const data = await axios.get("http://127.0.0.1:8000/products/");
      let sortedProducts = data.data.filter((c) =>
        [...subcat.map((sc) => sc.id), params.id * 1].includes(c.category)
      );
      // console.log([...allSubCat.map((sc) => sc.id), params.id * 1].includes(1));
      // console.log(sortedProducts);
      dispatch(updateProducts({ products: sortedProducts }));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(selectedSubCat);
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        const subCats = await getAllSubCategories();
        await getAllProducts(subCats);
      } catch (error) {}
    };

    fetchData2();
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  useEffect(() => {
    if (selectedSubCat.id) {
      getAllProducts([selectedSubCat]);
    } else {
      getAllProducts(allSubCat);
    }
  }, [selectedSubCat]);
  /* eslint-enable */

  const fetchData = async (query) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/products/?search=${query}`
      );
      console.log(response);
      // setAllSubCat(response.data);
      dispatch(updateProducts({ products: response.data }));
      // dispatch(updateStatusOfSearch({ status: response.status }));
    } catch (error) {
      console.error(error);
      // const status = error.response ? error.response.status : "error";
      // dispatch(updateStatusOfSearch({ status: status }));
    }
  };

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

        <div className="search-bar-sub-cat">
          {[{ title: "All" }, ...allSubCat].map((c, i) => (
            <div
              key={i}
              style={{ minWidth: "12vw", textAlign: "center" }}
              className={selectedSubCat.index === i ? "selected-sub-cat" : ""}
              onClick={() => {
                if (c.title === "All") {
                  setSelectedSubCat({ index: i, id: c.id, allSelected: true });
                } else {
                  setSelectedSubCat({ index: i, id: c.id, allSelected: false });
                }
              }}>
              {c.title}
            </div>
          ))}
        </div>

        <div className="all-products">
          <Row>
            {products.map((product) => (
              <Col xs={6} sm={6} md={6} lg={6} style={{ marginBottom: "10px" }}>
                <div className="item-card">
                  <img src={product.image} alt="" />
                  <div className="item-card-title">{product.title}</div>
                  <div className="item-card-price">${product.unit_price}</div>

                  {(!selectedProducts.filter(
                    (p) => p.details["id"] === product["id"]
                  ).length > 0 ||
                    selectedProducts.filter(
                      (p) => p.details["id"] === product["id"]
                    )[0].num === 0) && (
                    <div style={{ alignSelf: "flex-end" }}>
                      <button
                        className="add-button"
                        onClick={() => dispatch(addProduct(product))}>
                        Add
                      </button>
                    </div>
                  )}

                  {selectedProducts.filter(
                    (p) => p.details["id"] === product["id"]
                  ).length > 0 &&
                    selectedProducts.filter(
                      (p) => p.details["id"] === product["id"]
                    )[0].num > 0 && (
                      <div className="buttons-container">
                        <button
                          className="minus-button"
                          onClick={() => dispatch(decrementProduct(product))}>
                          <FontAwesomeIcon
                            icon={faMinus}
                            style={{ fontSize: "20px" }}
                          />
                        </button>
                        <span className="number-of-selected-item">
                          {
                            selectedProducts.filter(
                              (p) => p.details.id === product["id"]
                            )[0].num
                          }
                        </span>
                        <button
                          className="plus-button"
                          onClick={() => dispatch(incrementProduct(product))}>
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ fontSize: "20px" }}
                          />
                        </button>
                      </div>
                    )}
                </div>
              </Col>
            ))}

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
              <div></div>
            )}
          </Row>
        </div>
      </Container>

      <NavLink to={"/view-order"}>
        <div className="view-order">VIEW ORDER </div>
      </NavLink>
    </div>
  );
};

export default SearchBar;
