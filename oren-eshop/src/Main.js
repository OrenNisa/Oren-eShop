import { Routes, Route } from "react-router-dom";
import { Home, About, ProductView } from "./views/Index";
import { StoreProvider } from "./StoreContext";

function Main() {
  return (
    <StoreProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="product/:productID" element={<ProductView />} />
      </Routes>
    </StoreProvider>
  );
}

export default Main;
