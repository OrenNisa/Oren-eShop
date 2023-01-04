import React, { useContext } from "react";
import ProductContext from "../../ProductContext";
import StoreContext from "../../StoreContext";
import LoadingSpinner from "../Extras/LoadingSpinner";
import Product from "./Product/Product";
import "./Products.css";

const Products = ({ isLoading }) => {
  const { data } = useContext(ProductContext);
  const { category } = useContext(StoreContext);
  const listItemsFiltered = data.filter((product) => {
    return category === "All items" ? product : product.category === category;
  });
  const listItems = listItemsFiltered.map((product, index) => (
    <Product
      key={`${product} ${index}`}
      productId={product.id}
      imgLink={product.image}
      productName={product.title}
      price={product.price}
    />
  ));
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <section className="products">{listItems}</section>
  );
};

export default Products;
