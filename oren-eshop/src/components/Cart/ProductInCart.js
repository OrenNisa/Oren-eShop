import React from "react";
import "./ProductInCart.css";
import { useCart } from "../../StoreContext";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ProductInCart = () => {
  const { cart, setCart } = useCart();
  console.log("cart", cart);

  //   const listItems = cart.map((productId, product) => <h1>{product}</h1>);

  return (
    <div>
      {cart.forEach((value, key) => (
        <div key={key}>
          <h3>{value.productName}</h3>
          <p>Price: {value.price}</p>
          <p>Quantity: {value.amount}</p>
        </div>
      ))}
    </div>
  );
};
export default ProductInCart;
