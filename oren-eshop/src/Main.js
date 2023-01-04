import { useState, useEffect } from "react";
import ProductContext from "./ProductContext";
import StoreContext from "./StoreContext";
import { Routes, Route } from "react-router-dom";
import { Home, About, ProductView } from "./views/Index";

function Main() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All items");
  const [sortBy, setSortBy] = useState("Featured");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const url = "https://fakestoreapi.com/products";
    try {
      const response = await fetch(url);
      const answer = await response.json();
      setData(answer);
      setLoading(false); //stop loading when data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  const StoreValues = {
    setCategory,
    category,
    setSortBy,
    sortBy,
  };
  const ProductValues = { setData, data };

  return (
    <StoreContext.Provider value={StoreValues}>
      <ProductContext.Provider value={ProductValues}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="product/:productID" element={<ProductView />} />
        </Routes>
      </ProductContext.Provider>
    </StoreContext.Provider>
  );
}

export default Main;
