import React, { Component } from "react";
import { BallTriangle } from "react-loader-spinner";
import Slider from "react-slick";
import Navbar from "../Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProductDetailPage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    totalDiscountPercent: 10,
    bannerImage: "",
    description: null,
    name: "",
    blackLogo: null,
  };

  componentDidMount = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });
    try {
      //   await Promise.all([this.getCouponDetailByCouponCode()]);
      await this.getBrandDetails();
      this.setState({ apiStatus: apiStatusConstants.success });
    } catch (error) {
      console.log(error);
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  getBrandDetails = async () => {
    const { product, brands } = this.props;
    const { brand } = product;
    const brandName = brand[0].name;
    const shopItem = brands.filter((each) => each.name === brandName);
    const { shop } = shopItem[0];

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ shop }),
    };
    const response = await fetch(
      "https://api.furrl.in/api/v2/listing/getBrandByShop",
      options
    );
    if (response.ok === true) {
      const respData = await response.json();
      const { data } = respData;
      const { getBrandByShop } = data;
      const { bannerImage, description, name, logo } = getBrandByShop;
      const blackLogo = logo.black;
      this.setState({ bannerImage, description, name, blackLogo });
    } else {
      throw new Error("Failed to fetch brand details");
    }
  };

  getCouponDetailByCouponCode = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ couponCode: "FURRLNEW10" }),
    };
    const response = await fetch(
      "https://api.furrl.in/api/v2/coupon/getCouponDetailByCouponCode",
      options
    );
    if (response.ok === true) {
      const respData = await response.json();
      const { data } = respData;
      const { getCouponDetail } = data;
      const { totalDiscountPercent } = getCouponDetail;
      this.setState({ totalDiscountPercent });
    } else {
      throw new Error("Failed to fetch vibe by name");
    }
  };

  renderSuccessView = () => {
    const { product } = this.props;
    const { MRP, discountPercent, price, title } = product;
    const { totalDiscountPercent, bannerImage, description, name, blackLogo } =
      this.state;
    console.log("back", bannerImage);
    const { images } = product;
    const actualPrice = MRP.value;
    const priceAfterDisc = price.value;

    const priceAfterCoupon = Math.floor(
      priceAfterDisc - priceAfterDisc * (totalDiscountPercent / 100)
    );

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
    };
    return (
      <div className="carousal-container">
        <Slider {...settings}>
          {images.map((each, index) => (
            <div className="each-image" key={index}>
              <div
                style={{
                  backgroundImage: `url(${each.src})`,
                  height: "300px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                }}
              ></div>
            </div>
          ))}
        </Slider>
        <div className="title-container">
          <div className="title-cont">
            <p className="title">{title}</p>
            <img
              src="https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg"
              alt="bookmark"
            />
          </div>
          <div className="product-price-cont width">
            <p className="price-text">{`Rs ${priceAfterDisc}`}</p>
            <p className="actual-price-text">{`Rs ${actualPrice}`}</p>
            <div className="disc-cont">
              <p className="discount2">{`${discountPercent}%`}</p>
            </div>
          </div>
          <div className="coupon-container">
            <p className="c-text">Get it at just</p>
            <span className="red">{`Rs ${priceAfterCoupon}`}</span>
            <div className="vertical-seperator"></div>
            <p className="c-text">Use FURRLNEW10</p>
            <img
              src="https://web.furrl.in/_next/static/media/copy-icon.a48f889b.svg"
              alt="copy"
            />
          </div>
          <div className="q-section-div">
            <ul className="q-section">
              <li className="each-q">
                <input
                  type="checkbox"
                  id="delivery"
                  name="delivery"
                  className="input-1"
                />
                <label htmlFor="delivery" className="list-item col">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://web.furrl.in/_next/static/media/PdpDelivery.e17a58c0.svg"
                      alt="bus"
                      className="bus-icon"
                    />
                    Delivery
                  </div>
                </label>
                <div className="q-answer">
                  <span className="q-des">
                    Usually ships in 2-3 working days
                  </span>
                </div>
              </li>
              <li className="each-q">
                <input
                  type="checkbox"
                  id="returns"
                  name="returns"
                  className="input-1"
                />
                <label htmlFor="returns" className="list-item col">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://web.furrl.in/_next/static/media/PdpReturn.51ac31d1.svg"
                      alt="bus"
                      className="bus-icon"
                    />
                    Returns and size exchanges enabled
                  </div>
                </label>
                <div className="q-answer">
                  <span className="q-des">
                    Furrl takes pride in bringing you new-age homegrown brands
                    that create pieces for you with utmost care and pleasure!
                    <br /> - Easy returns and size exchanges enabled for this
                    product.
                    <br /> - Exchange or return requests should be raised within
                    7 days of delivery.
                    <br /> - In case of a product defect, a replacement or
                    return request needs to be raised within 3 days of delivery.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="brand-details">
          <div className="brand-title">
            <img
              src="https://web.furrl.in/_next/static/media/TagIcon.e1464e2f.svg"
              alt="tag"
              className="bus-icon"
            />
            <p className="font14">About the brand</p>
          </div>
          <div
            className="brand-content"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            <div className="brand-cont">
              <div className="brand-logo-cont">
                <img src={blackLogo} alt="logo" className="brand-logo" />
              </div>
              <div className="brand-name-cont">
                <p className="brand-name-prod">{name.toUpperCase()}</p>
                <p className="brand-desc">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <BallTriangle
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="failure"
        className="failure-img"
      />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  );

  getView = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.success:
        return this.renderSuccessView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    const { product } = this.props;
    console.log(product);

    return (
      <>
        <Navbar />
        <div className="product-item-detailed-container">{this.getView()}</div>
      </>
    );
  }
}

export default ProductDetailPage;
