import { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { dataURL } from "./config";
import { fetchData } from "./services/fetchData";

const StoreContext = createContext(null);
const ProductsContext = createContext(null);

export function useStore() {
  return useContext(StoreContext);
}

export function useProducts() {
  return useContext(ProductsContext);
}

export function StoreProvider({ children }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All items");
  const [sortBy, setSortBy] = useState("Featured");
  const [isLoading, setLoading] = useState(true);

  // const {
  //   data,
  //   status: dataFetchedStatus,
  //   refetch,
  // } = useQuery("products", () => fetchData(dataURL));

  //refetch();
  // setLoading(false);

  useEffect(() => {
    (async () => {
      setData(fetchData(dataURL));
    })();
    //setData(fetchData(dataURL));
    //getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(dataURL);
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
    isLoading,
    setLoading,
    //dataFetchedStatus,
  };
  const ProductsValues = { data };

  return (
    <StoreContext.Provider value={StoreValues}>
      <ProductsContext.Provider value={ProductsValues}>
        {children}
      </ProductsContext.Provider>
    </StoreContext.Provider>
  );
}
