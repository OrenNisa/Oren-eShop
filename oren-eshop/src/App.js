import { useState, useEffect } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import ProductContext from "./ProductContext";
import Products from "./components/Products/Products";
import StoreContext from "./StoreContext";

function App() {
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
        <div className="App">
          <Nav />
          <Products isLoading={isLoading} />
        </div>
      </ProductContext.Provider>
    </StoreContext.Provider>
  );
}

export default App;
