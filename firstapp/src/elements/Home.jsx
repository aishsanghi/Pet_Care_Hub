import React from "react";
import Navbar from "./home/Navbar";
import Slider from "./home/Slider";

import Category from "./home/Category";
import Products from "./home/Products";
import Footer_ from "./home/Footer_";
import Vendors from "./home/Vendors";

const Home = () => {
  return (
    <>
      <Slider />
      <Category />
      <Products />
      <Vendors />
    </>
  );
};

export default Home;
