import { Component } from "react";
import { FiShare } from "react-icons/fi";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./index.css";

class Product extends Component {
  render() {
    const { each, index, handleClick } = this.props;

    const { MRP, brand, discountPercent, price, title, images } = each;
    const actualPrice = MRP.value;
    const image = images[0].src;
    const brandName = brand[0].name;
    const priceAfterDisc = price.value;

    return (
      <li
        className={`each-product-item-container ${
          (index + 1) % 5 === 0 ? "full-width" : ""
        }`}
        onClick={handleClick}
      >
        <div
          className="each-item-img"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <p className="brand-name">{brandName}</p>
        <p className="title-name">{title}</p>
        <div className="product-price-cont">
          <p className="price-text">{`Rs ${priceAfterDisc}`}</p>
          <p className="actual-price-text">{`Rs ${actualPrice}`}</p>
          <p className="discount">{`${discountPercent}%`}</p>
        </div>
      </li>
    );
  }
}

export default Product;
