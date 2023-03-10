import React from "react";
import { useProducts, useStore } from "../../StoreContext";
import LoadingSpinner from "../Extras/LoadingSpinner";
import Product from "./Product/Product";
import "./Products.css";

const Products = () => {
  const { category, isLoading } = useStore();
  const { data } = useProducts();
  const listItemsFiltered = data.filter((product) => {
    return category === "All items" ? product : product.category === category;
  });
  const listItems = listItemsFiltered.map((product, index) => (
    <Product
      key={`${product} ${index}`}
      productId={product._id}
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
