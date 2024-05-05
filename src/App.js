import React from "react";
import Homepage from "./Components/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./Components/SearchBar/SearchBar";

const App = () => {
  return (
    <div className="my-app">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cat/:id" element={<SearchBar />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
