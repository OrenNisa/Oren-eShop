import React, { useState } from "react";
import "./Home.css";
import Nav from "../components/Nav/Nav";
import Products from "../components/Products/Products";
import CartDrawer from "../components/Cart/CartDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const onClose = () => {
    setCartOpen(false);
  };

  return (
    <div>
      <CartDrawer open={cartOpen}>
        something
        <button onClick={onClose}>CLOSE DRAWER</button>
      </CartDrawer>
      <ShoppingCartIcon onClick={() => setCartOpen(true)} />

      <Nav />
      <Products />
    </div>
  );
};

export default Home;
