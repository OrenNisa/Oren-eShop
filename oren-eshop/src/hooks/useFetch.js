import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const getData = async () => {
      try {
        const response = await fetch(url);
        const answer = await response.json();
        setData(answer);
        setLoading(false); //stop loading when data is fetched
      } catch (error) {
        setLoading(false);
        setError("An error occurred. Awkward..");
      }
    };
    getData();
  }, [url]);

  return { data, loading, error };
};
