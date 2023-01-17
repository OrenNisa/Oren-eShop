import { useState, useEffect } from "react";
import { dataURL } from "../config";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        setLoading(true);
        const response = await fetch(dataURL);
        const answer = await response.json();
        setData(answer);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    getDataFromServer();
  }, []);

  const getProductFromServer = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const answer = await response.json();
      setData(answer);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return { data, loading, error, getProductFromServer };
}
export default useFetch;
