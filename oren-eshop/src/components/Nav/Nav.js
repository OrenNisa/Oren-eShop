import React from "react";
import Filter from "./Filter/Filter";
import Sort from "./Sort/Sort";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="product-filter">
      <h1>Oren eShops</h1>
      <div className="sort">
        <Filter />
        <Sort />
      </div>
    </nav>
  );
};

export default Nav;
