import React from "react";
import Drawer from "@mui/material/Drawer";

const CartDrawer = ({ cartOpen, setCartOpen, children }) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: 800,
        },
      }}
      anchor={"left"}
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      onBackdropClick={() => setCartOpen(false)}
    >
      {children}
    </Drawer>
  );
};

export default CartDrawer;
