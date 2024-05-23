import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ProductDetailPageWrapper from "./components/ProductDetailPageWrapper";

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="furrl-assignment">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailPageWrapper />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
