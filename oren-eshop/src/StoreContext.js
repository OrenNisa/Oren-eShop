import { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { dataURL } from "./config";
import useFetch from "./hooks/useFetch";
import { fetchData } from "./services/fetchData";

const StoreContext = createContext(null);
const ProductsContext = createContext(null);
const CartContext = createContext(null);

export function useStore() {
  return useContext(StoreContext);
}

export function useProducts() {
  return useContext(ProductsContext);
}

export function useCart() {
  return useContext(CartContext);
}

export function StoreProvider({ children }) {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All items");
  const [sortBy, setSortBy] = useState("Featured");
  const [isLoading, setLoading] = useState(false);
  const [cart, setCart] = useState(new Map());
  //const { data, loading, error, getProductFromServer } = useFetch(dataURL);

  // const {
  //   data,
  //   status: dataFetchedStatus,
  //   refetch,
  // } = useQuery("products", () => fetchData(dataURL), {
  //   onSuccess: () => {
  //     setLoading(false);
  //     setData(data);
  //   },
  // });

  useEffect(() => {
    //refetch();
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(dataURL);
      const answer = await response.json();
      setData(answer);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const storeValues = {
    setCategory,
    category,
    setSortBy,
    sortBy,
    isLoading,
    setLoading,
    //dataFetchedStatus,
  };
  const productsValues = { data };

  const cartValues = { cart, setCart };

  return (
    <StoreContext.Provider value={storeValues}>
      <ProductsContext.Provider value={productsValues}>
        <CartContext.Provider value={cartValues}>
          {children}
        </CartContext.Provider>
      </ProductsContext.Provider>
    </StoreContext.Provider>
  );
}
