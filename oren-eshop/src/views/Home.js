import React, { useState } from "react";
import "./Home.css";
import Nav from "../components/Nav/Nav";
import Products from "../components/Products/Products";
import CartDrawer from "../components/Cart/CartDrawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStore } from "../StoreContext";
import LoadingSpinner from "../components/Extras/LoadingSpinner";

const Home = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { isLoading } = useStore();

  const onClose = () => {
    setCartOpen(false);
  };
  if (isLoading === true) return <LoadingSpinner />;

  return (
    <div>
      <CartDrawer open={cartOpen}>
        <button onClick={onClose}>CLOSE DRAWER</button>
      </CartDrawer>
      <ShoppingCartIcon onClick={() => setCartOpen(true)} />

      <Nav />
      <Products />
    </div>
  );
};

export default Home;
