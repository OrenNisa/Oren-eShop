import React from "react";
import Drawer from "@mui/material/Drawer";

const CartDrawer = ({ open, children }) => {
  return (
    <div style={{ width: "300px" }}>
      <Drawer anchor={"left"} open={open}>
        {children}
      </Drawer>
    </div>
  );
};

export default CartDrawer;
