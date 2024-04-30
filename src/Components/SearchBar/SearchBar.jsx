import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProducts } from "../../Store/ProductReducer";
import { updateStatusOfSearch } from "../../Store/StatusOfSearchReducer";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://real-time-amazon-data.p.rapidapi.com/search",
        params: {
          query: searchQuery,
          page: "1",

          category_id: "aps",
        },
        headers: {
          "X-RapidAPI-Key":
            "23ea03a25cmshc0500faa19e674fp1140c4jsn9a9763290cfd",
          "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        dispatch(updateProducts({ products: response.data.data.products }));
        dispatch(updateStatusOfSearch({ status: response.data.status }));

        console.log(response.data);
      } catch (error) {
        console.log(error.response.status);
        dispatch(updateStatusOfSearch({ status: error.response.status }));
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, dispatch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(() => {
        setSearchQuery(value);
      }, 500)
    );
  };

  return (
    <div className="my-searchbar">
      <input
        type="text"
        onChange={(e) => handleInputChange(e)}
        placeholder="Enter product name"
      />
    </div>
  );
};

export default SearchBar;
