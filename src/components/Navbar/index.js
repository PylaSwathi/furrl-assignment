import React, { Component } from "react";
import SideNavbar from "../SideNavbar";
import "./index.css";

class Navbar extends Component {
  state = {
    isSidebarVisible: false,
  };

  toggleSidebar = () => {
    console.log("called");
    this.setState((prevState) => ({
      isSidebarVisible: !prevState.isSidebarVisible,
    }));
  };

  render() {
    const { isSidebarVisible } = this.state;

    console.log(isSidebarVisible);
    return (
      <>
        <nav className={`nav-bar-container ${isSidebarVisible ? "z" : ""}`}>
          <button className="nav-bar-icons-btn">
            <img
              src="https://web.furrl.in/_next/static/media/Menu.b5bc5303.svg"
              alt="menu"
              onClick={this.toggleSidebar}
            />
          </button>

          <img
            src="https://web.furrl.in/_next/static/media/Furrl.13550a62.svg"
            alt="logo"
          />
          <div className="nav-bar-icons-container">
            <button className="nav-bar-icons-btn">
              <a href="https://furrl.in/wishlist">
                <img
                  src="https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg"
                  alt="bookmark"
                />
              </a>
            </button>
            <button className="nav-bar-icons-btn">
              <a href="https://furrl.in/cart">
                <img
                  src="https://web.furrl.in/_next/static/media/Bag.b94fa005.svg"
                  alt="bag"
                />
              </a>
            </button>
          </div>
        </nav>
        <SideNavbar
          isVisible={isSidebarVisible}
          toggleSidebar={this.toggleSidebar}
        />
      </>
    );
  }
}

export default Navbar;
