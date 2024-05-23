import React from "react";
import { useLocation } from "react-router-dom";
import ProductDetailPage from "../ProductItemDetail";

const ProductDetailPageWrapper = () => {
  const location = useLocation();
  const product = location.state?.product;
  const brands = location.state?.brands;

  return <ProductDetailPage product={product} brands={brands} />;
};

export default ProductDetailPageWrapper;
