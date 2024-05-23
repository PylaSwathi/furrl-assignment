import React from "react";
import { useNavigate } from "react-router-dom";
import Product from "../Product";

const ProductWrapper = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const { each, brands } = props;
    navigate(`/product/${each.id}`, { state: { product: each, brands } });
  };

  return <Product {...props} handleClick={handleClick} />;
};

export default ProductWrapper;
