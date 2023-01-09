import { useState, useEffect } from "react";
import ProductContext from "./ProductContext";
import StoreContext from "./StoreContext";
import { Routes, Route } from "react-router-dom";
import { Home, About, ProductView } from "./views/Index";
import { useQuery } from "react-query";
import { fetchData } from "./services/fetchData";
import { dataURL } from "./config";

function Main() {
  //const [data, setData] = useState([]);
  const [category, setCategory] = useState("All items");
  const [sortBy, setSortBy] = useState("Featured");
  const [isLoading, setLoading] = useState(true);

  const {
    data,
    status: dataFetchedStatus,
    refetch,
  } = useQuery("products", () => fetchData(dataURL));

  useEffect(() => {
    //getData();
    refetch();
    setLoading(false);
  }, []);

  // const getData = async () => {
  //   try {
  //     const response = await fetch(dataURL);
  //     const answer = await response.json();
  //     setData(answer);
  //     setLoading(false); //stop loading when data is fetched
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const StoreValues = {
    setCategory,
    category,
    setSortBy,
    sortBy,
    isLoading,
    setLoading,
    dataFetchedStatus,
  };
  const ProductValues = { data };

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
