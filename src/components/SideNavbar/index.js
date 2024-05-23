import React, { Component } from "react";

import "./index.css";

class SideNavbar extends Component {
  closeSideNav = () => {
    console.log("Hi");
    const { toggleSidebar } = this.props;
    toggleSidebar();
  };

  render() {
    const { isVisible } = this.props;
    console.log(isVisible);

    return (
      <div className={`side-nav-bar-container ${isVisible ? "visible" : ""}`}>
        <div className="side-nav-bar-content-section">
          <button onClick={() => this.closeSideNav()} className="btn">
            <img
              src="https://web.furrl.in/_next/static/media/MenuClose.b09d5583.svg"
              alt="close"
              className="close-icon"
            />
          </button>

          <div className="offers-sec">
            <img
              src="https://cdn.furrl.in/vibes/TopOffers.png"
              alt="offers"
              className="offers-sec-icon"
            />
            <p className="offers-sec-para">Top offers</p>
            <img
              src="https://web.furrl.in/_next/static/media/ArrowsRightPurple.90b97b4d.svg"
              alt="right-arrow"
              className="right-arrow"
            />
          </div>

          <ul className="list-items-container">
            <li className="list-item-c">
              <input
                type="checkbox"
                id="apparel"
                name="apparel"
                className="input-1"
              />

              <label htmlFor="apparel" className="list-item">
                Apparel
              </label>
              <div className="list-item-detailed">
                <ul className="list-inner-section">
                  <li>Dresses & Jumpsuits</li>
                  <li>Sarees</li>
                  <li>Co-ords</li>
                  <li>Kurta & Kurta Sets</li>
                  <li>Topwear</li>
                  <li>Loungewear</li>
                  <li>Trousers & Skirts</li>
                  <li>Innerwear</li>
                  <li>Outerwear</li>
                </ul>
              </div>
            </li>
            <li className="list-item-c">
              <input
                type="checkbox"
                id="home-lifestyle"
                name="home-lifestyle"
                className="input-1"
              />

              <label htmlFor="home-lifestyle" className="list-item">
                Home & LifeStyle
              </label>
              <div className="list-item-detailed">
                <ul className="list-inner-section">
                  <li>Home Decor</li>
                  <li>Home Furnishing</li>
                  <li>Kitchen & Dining</li>
                </ul>
              </div>
            </li>
            <li className="list-item-c">
              <input
                type="checkbox"
                id="accessories"
                name="accessories"
                className="input-1"
              />

              <label htmlFor="accessories" className="list-item">
                Accessories
              </label>
              <div className="list-item-detailed">
                <ul className="list-inner-section">
                  <li>Footwear</li>
                  <li>Bags</li>
                  <li>Jewellery</li>
                  <li>Other Accessories</li>
                </ul>
              </div>
            </li>
            <li className="list-item-c">
              <input
                type="checkbox"
                id="others"
                name="others"
                className="input-1"
              />

              <label htmlFor="others" className="list-item">
                Others
              </label>
              <div className="list-item-detailed">
                <ul className="list-inner-section">
                  <li>Kids</li>
                  <li>Beauty</li>
                </ul>
              </div>
            </li>
            <li className="list-item-only">New Launches</li>
            <li className="list-item-only">Explore Feed</li>
            <li className="list-item-only">Login</li>
          </ul>
          <div className="footer-section">
            <ul className="footer-items-container">
              <li className="list-item-only">About Us</li>
              <li className="list-item-only">Careers</li>
              <li className="list-item-only">FAQ</li>
              <li className="list-item-only">Terms of Use</li>
            </ul>
            {/* <img
              src="https://web.furrl.in/_next/static/media/appDownload.c4354619.png"
              alt="app-download"
              className="app-download-img"
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavbar;
