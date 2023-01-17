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

  if (isLoading === true) return <LoadingSpinner />;

  return (
    <div>
      <CartDrawer cartOpen={cartOpen} setCartOpen={setCartOpen}>
        {/* <button onClick={handleClose}>CLOSE DRAWER</button> */}
      </CartDrawer>
      <ShoppingCartIcon onClick={() => setCartOpen(!cartOpen)} />

      <Nav />
      <Products />
    </div>
  );
};

export default Home;
