import { useContext, createContext, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { dataURL } from "./config";
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
  const [isLoading, setLoading] = useState(true);
  const [cart, setCart] = useState(new Set());
  const [prodInCart, setProdInCart] = useState({});

  // const {
  //   data,
  //   status: dataFetchedStatus,
  //   refetch,
  // } = useQuery("products", () => fetchData(dataURL));
  //refetch();
  // setLoading(false);

  useEffect(() => {
    getData();
    fillProductsOnCart();
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

  function addToCart(item) {
    setCart((prevCart) => new Set(prevCart).add(item));
  }

  function removeFromCart(item) {
    setCart((prevCart) => {
      const newCart = new Set(prevCart);
      newCart.delete(item);
      return newCart;
    });
  }

  function isInCart(item) {
    return cart.has(item);
  }

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

  const cartValues = { cart, addToCart, removeFromCart, isInCart };

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
