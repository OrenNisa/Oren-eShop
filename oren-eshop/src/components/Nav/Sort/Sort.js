import React from "react";
import "./Sort.css";

const Sort = () => {
  const sortOptions = [
    "Featured",
    "Best Selling",
    "Alphabetically, A-Z",
    "Alphabetically, Z-A",
    "Price, low to high",
    "Price, high to low",
    "Date, new to old",
    "Date, old to new",
  ];
  const sortOptionsAsCmp = sortOptions.map((option, index) => (
    <option key={index} value={option}>
      {option}
    </option>
  ));

  return (
    <div className="collection-sort">
      <label>Sort by:</label>
      <select>{sortOptionsAsCmp}</select>
    </div>
  );
};

export default Sort;
