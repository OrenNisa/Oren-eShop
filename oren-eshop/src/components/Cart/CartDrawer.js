import React from "react";
import Drawer from "@mui/material/Drawer";

const CartDrawer = ({ open, children }) => {
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: 800,
        },
      }}
      anchor={"left"}
      open={open}
    >
      {children}
    </Drawer>
  );
};

export default CartDrawer;
