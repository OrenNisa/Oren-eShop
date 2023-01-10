import React from "react";
import { useProducts, useStore } from "../../../StoreContext";
import "./Filter.css";

//.map((p) => p.category.charAt(0).toUpperCase() + p.category.slice(1))
const Filter = () => {
  const { setCategory } = useStore();
  const { data } = useProducts();
  const categories = data
    .map((p) => p.category)
    .filter((value, index, array) => array.indexOf(value) === index);
  categories.splice(0, 0, "All items");

  const filterOptionsAsCmp = categories.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="collection-sort">
      <label>Filter by:</label>
      <select onChange={(e) => setCategory(e.target.value)}>
        {filterOptionsAsCmp}
      </select>
    </div>
  );
};

export default Filter;
