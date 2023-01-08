import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Product.css";

const Product = ({ imgLink, productName, price, productId }) => {
  const navigate = useNavigate();
  //const params = useParams();
  return (
    <div className="product-card">
      <div className="product-image">
        <img
          onClick={() => {
            navigate(`product/${productId}`);
          }}
          src={imgLink}
          alt=""
        />
      </div>
      <div className="product-info">
        <h5>{productName}</h5>
        <h6>${price}</h6>
      </div>
    </div>
  );
};

export default Product;
