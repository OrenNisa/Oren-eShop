import React from "react";
import "./Home.css";
import Nav from "../components/Nav/Nav";
import Products from "../components/Products/Products";

const Home = () => {
  return (
    <div>
      <Nav />
      <Products />
      {/* <Products isLoading={isLoading} /> */}
    </div>
  );
};

export default Home;
