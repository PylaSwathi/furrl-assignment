import React, { Component } from "react";
import Navbar from "../Navbar";
import { Bars } from "react-loader-spinner";
import ProductWrapper from "../ProductWrapper";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    filters: [],
    products: [],
    currentPage: 1,
    totalProducts: null,
    totalPages: null,
    name: "",
    imageUrl: "",
    activeFilter: { id: "all", name: "All" },
    scrolling: false,
    brands: null,
  };

  componentDidMount() {
    this.loadInitialData();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  loadInitialData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    try {
      await Promise.all([
        this.getListingProducts(),
        this.getListingFilters(),
        this.getVibeByName(),
      ]);
      this.setState({ apiStatus: apiStatusConstants.success });
    } catch (error) {
      console.log(error);
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  handleScroll = () => {
    const { scrolling, totalPages, currentPage } = this.state;
    if (scrolling) return;
    if (currentPage >= totalPages) return;

    const lastItem = document.querySelector(
      ".home-products-display > li:last-child"
    );
    if (!lastItem) return;

    const lastItemOffset = lastItem.offsetTop + lastItem.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 20;

    if (pageOffset > lastItemOffset - bottomOffset) {
      this.loadMoreItems();
    }
  };

  loadMoreItems = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + 1,
        scrolling: true,
      }),
      this.getListingProducts
    );
  };

  getListingProducts = async () => {
    const { currentPage, products, activeFilter } = this.state;
    console.log(activeFilter);
    const payload = {
      input: {
        id: "#HomeHunts",
        entity: "vibe",
        page: currentPage,
        pageSize: 10,
        filters:
          activeFilter.name === "All"
            ? []
            : [{ id: activeFilter.id, type: "CATEGORY" }],
      },
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      "https://api.furrl.in/api/v2/listing/getListingProducts",
      options
    );
    if (response.ok === true) {
      const respData = await response.json();
      const { data } = respData;
      const { getListingProducts } = data;
      const {
        products: newProducts,
        totalPages,
        totalProducts,
      } = getListingProducts;
      this.setState({
        products: [...products, ...newProducts],
        totalPages,
        totalProducts,
        scrolling: false,
      });
    } else {
      throw new Error("Failed to fetch products");
    }
  };

  getListingFilters = async () => {
    const payload = { id: "#HomeHunts", entity: "vibe" };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      "https://api.furrl.in/api/v2/listing/getListingFilters",
      options
    );
    if (response.ok === true) {
      const res_data = await response.json();
      const { data } = res_data;
      const { getListingFilters } = data;
      const { easyFilters } = getListingFilters;
      this.setState({ filters: easyFilters });
    } else {
      throw new Error("Failed to fetch filters");
    }
  };

  getVibeByName = async () => {
    const { activeFilter } = this.state;
    console.log(activeFilter);
    const payload = { name: "#HomeHunts" };

    if (activeFilter.name !== "all") {
      payload.id = activeFilter.id;
      payload.type = "CATEGORY";
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      "https://api.furrl.in/api/v2/listing/getVibeByName",
      options
    );
    if (response.ok === true) {
      const respData = await response.json();
      const { data } = respData;
      const { getVibeByName } = data;
      const { imageUrl, name, brands } = getVibeByName;

      this.setState({ name, imageUrl, brands });
    } else {
      throw new Error("Failed to fetch vibe by name");
    }
  };

  setActiveFilter = (filter) => {
    this.setState(
      { activeFilter: filter, products: [], currentPage: 1, totalPages: null },
      this.getListingProducts
    );
  };

  renderSuccessView = () => {
    const {
      filters,
      products,
      totalProducts,
      name,
      imageUrl,
      activeFilter,
      brands,
    } = this.state;

    return (
      <div className="home-container">
        <div
          className="home-top-container"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <h1 className="home-top-container-title">{name}</h1>
        </div>
        <div className="home-total-products-count-section">
          <p className="font14">Shop Products</p>
          <span className="dot"></span>
          <p className="font12">{`${totalProducts} products`}</p>
        </div>
        <div className="home-filters-display-section">
          <ul className="home-filters-list-items">
            <li
              key="all"
              onClick={() => {
                this.setActiveFilter({ id: "all", name: "All" });
              }}
            >
              <button
                className={`filter-btn ${
                  activeFilter.name === "All" ? "active" : ""
                }`}
              >
                All
              </button>
            </li>
            {filters.map((each) => (
              <li
                key={each.uniqueId}
                onClick={() => {
                  this.setActiveFilter({ id: each.uniqueId, name: each.name });
                }}
              >
                <button
                  className={`filter-btn ${
                    activeFilter.name === each.name ? "active" : ""
                  }`}
                >
                  {each.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="home-products-display">
          {products.map((each, index) => (
            <ProductWrapper
              key={index}
              each={each}
              index={index}
              id={each.id}
              brands={brands}
            />
          ))}
        </ul>
      </div>
    );
  };

  renderLoadingView = () => (
    <div className="loader-container">
      <Bars
        height="80"
        width="80"
        radius="9"
        color="rgb(126, 89, 231)"
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
    return (
      <>
        <Navbar />
        <div className="home-container">{this.getView()}</div>
      </>
    );
  }
}

export default Home;
