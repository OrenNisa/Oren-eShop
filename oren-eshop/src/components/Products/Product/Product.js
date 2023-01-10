import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../StoreContext";
import "./Product.css";

const Product = ({ imgLink, productName, price, productId }) => {
  const navigate = useNavigate();
  const { cart, setCart, prodInCart } = useCart();
  let prodIndex = cart.findIndex((product) => product.id === productId);
  // let amount = cart.length ? cart[prodIndex].amount : 0;

  const addProductToCart = () => {
    let tempCart = [...cart];
    //const prodIndex = tempCart.findIndex((product) => product.id === productId);
    if (prodIndex !== -1) {
      tempCart[prodIndex].amount++;
    } else {
      let newProduct = { id: productId, amount: 1 };
      tempCart.push(newProduct);
    }
    prodIndex = tempCart.findIndex((product) => product.id === productId);
    setCart(tempCart);
  };

  const removeProductToCart = () => {
    let tempCart = [...cart];
    //const prodIndex = tempCart.findIndex((product) => product.id === productId);
    if (prodIndex !== -1) {
      if (tempCart[prodIndex].amount === 1) {
        tempCart.splice(prodIndex, 1);
      } else {
        tempCart[prodIndex].amount--;
      }
    }
    setCart(tempCart);
  };
  console.log(cart[0]);
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
      <div>
        <button onClick={removeProductToCart} disabled={!prodInCart.productId}>
          -
        </button>
        <span>{cart.length ? cart[0].amount : 0}</span>
        <span>{cart}</span>
        <button onClick={addProductToCart}>+</button>
      </div>
    </div>
  );
};

export default Product;
