import React from "react";
import { sortOptions } from "../../../config";
import "./Sort.css";

const Sort = () => {
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
